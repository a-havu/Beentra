import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";
/**
 * first the provider response with code.
 * then we send this by POST to the provider with the clientid and the secret.
 * if it is correct the provider will send back data, has tokens.
 *
 */
interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  email: string | null;
}

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code: string | null = searchParams.get("code");

  if (!code) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=no_code`,
    );
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.AUTH_GITHUB_ID!,
        client_secret: process.env.AUTH_GITHUB_SECRET!,
        code,
      }),
    },
  );

  const data = (await tokenResponse.json()) as { access_token?: string };
  const access_token = data.access_token;

  if (!access_token) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=no_token`,
    );
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${access_token}`,
      Accept: "application/json",
    },
  });

  const gitHubUser: GitHubUser = await userRes.json();

  const emailRes = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `token ${access_token}`,
      Accept: "application/json",
    },
  });

  const emails = (await emailRes.json()) as GitHubEmail[];
  const primaryEmail = emails.find((e) => e.primary)?.email;

  if (!primaryEmail) {
    return Response.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=no_email`,
    );
  }

  const userAccount = await prisma.oauthAccount.findUnique({
    where: {
      provider_providerUserId: {
        provider: "github",
        providerUserId: String(gitHubUser.id),
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
          username: gitHubUser.login,
          avatarUrl: gitHubUser.avatar_url,
        },
      });
    }

    //when user is registered by credintials already then we have to link it.
    await prisma.oauthAccount.create({
      data: {
        userId: user.id,
        provider: "github",
        providerUserId: String(gitHubUser.id),
        accessToken: access_token,
      },
    });
  }

  const token = await createToken({
    userId: user.id,
    email: primaryEmail,
    role: user.role,
  });

  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
