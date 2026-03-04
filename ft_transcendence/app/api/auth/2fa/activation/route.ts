import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { verify } from "otplib";

export async function PUT(request: NextRequest) {
  try {
    const { code } = await request.json();

    // get user and their secret from DB
    const session = await getSession();
    const user = await prisma.user.findUnique({
      where: { id: session?.userId },
    });
    if (!user)
      return NextResponse.json(
        { error: "cannot find the user id" },
        { status: 400 },
      );
    if (user.twoFactorEnabled)
      return NextResponse.json({ error: "already verified" }, { status: 400 });

    if (!user.twoFactorSecret)
      return NextResponse.json(
        { error: "no tfa secret stored" },
        { status: 400 },
      );

    const isValid = await verify({ secret: user.twoFactorSecret, token: code });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user?.id },
      data: { twoFactorEnabled: true },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Something went wrong" },
      { status: 500 },
    );
  }
}
