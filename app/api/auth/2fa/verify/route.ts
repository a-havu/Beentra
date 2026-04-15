import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { verify } from "otplib";
import { verifyToken, createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { code, temptoken } = await request.json();

    if (!code || code.length !== 6 || !temptoken)
      return NextResponse.json(
        { error: "Code must be 6 digits" },
        { status: 400 },
      );

    const decodedToken = await verifyToken(temptoken);
    if (!decodedToken)
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    if (!user.twoFactorSecret)
      return NextResponse.json(
        { error: "No 2FA secret found" },
        { status: 400 },
      );

    const isValid = await verify({ secret: user.twoFactorSecret, token: code });

    if (!isValid)
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });

    const token = await createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      avatar_url: user.avatarUrl,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    response.cookies.delete('tfa-temp-token');
    return response;
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Something went wrong" },
      { status: 500 },
    );
  }
}
