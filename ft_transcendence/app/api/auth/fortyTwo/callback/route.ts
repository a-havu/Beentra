import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, createTempToken } from "@/lib/auth";

interface FortyTwoUser {
  id: number;
  login: string;
  image: { link: string | null };
  email: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code: string | null = searchParams.get("code");

  if (!code) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=no_code`,
    );
  }

  const tokenResponse = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.FORTY_TWO_CLIENT_ID!,
      client_secret: process.env.FORTY_TWO_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.FORTY_TWO_REDIRECT_URI!,
    }),
  });

  const data = (await tokenResponse.json()) as { access_token?: string };

  console.log("42 token response status:", tokenResponse.status);
  console.log("42 token response data:", data);

  const access_token = data.access_token;

  if (!access_token) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=no_token`,
    );
  }

  const userRes = await fetch("https://api.intra.42.fr/v2/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    },
  });

  const fortyTwoUser: FortyTwoUser = await userRes.json();

  const primaryEmail = fortyTwoUser.email;

  if (!primaryEmail) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=no_email`,
    );
  }

  const userAccount = await prisma.oauthAccount.findUnique({
    where: {
      provider_providerUserId: {
        provider: "42",
        providerUserId: String(fortyTwoUser.id),
      },
    },
    include: { user: true },
  });

  let user;
  if (userAccount) {
    user = userAccount.user;
  } else {
    user = await prisma.user.findUnique({
      where: { email: primaryEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: primaryEmail,
          username: fortyTwoUser.login,
          avatarUrl: fortyTwoUser.image?.link ?? null,
        },
      });
    }

    await prisma.oauthAccount.create({
      data: {
        userId: user.id,
        provider: "42",
        providerUserId: String(fortyTwoUser.id),
        accessToken: access_token,
      },
    });
  }

  if (user.twoFactorEnabled) {
    const tempToken = await createTempToken({ userId: user.id });
    const response = NextResponse.redirect(new URL("/logintfa", request.url));
    response.cookies.set("tfa-temp-token", tempToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 5,
      path: "/",
    });
    return response;
  }

  const token = await createToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    avatar_url: user.avatarUrl,
  });

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
