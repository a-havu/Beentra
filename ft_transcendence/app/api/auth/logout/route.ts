import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (session?.userId) {
      await prisma.user.update({
        where: {
          id: session.userId,
        },
        data: {
          isOnline: false,
        },
      });
    }

    const response = NextResponse.json({ success: "true" });
    response.cookies.delete("auth-token");

    return response;
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
