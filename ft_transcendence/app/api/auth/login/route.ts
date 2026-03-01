import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';
import bcrypt from 'bcryptjs'
import { loginZodSchema } from '@/types/zodScemas'
import { createTempToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const zresult = loginZodSchema.safeParse(body)

    if (!zresult.success) {
      return Response.json({ error: zresult.error.issues[0].message }, { status: 400 })
    }



    const { userEmail, password } = body
    if (!userEmail || !password) {
      return NextResponse.json({
        errorMessage: "missing Email or Password"
      }, { status: 400 })
    }

    const result = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    })
    if (!result) {
      return NextResponse.json({
        success: false,
        message: "cannot find this Email, please register first"
      }, { status: 401 })
    }

    if (!result.passwordHash) {
      return NextResponse.json({
        success: false,
        message: "your are not registed by credintials please user github or other providers"
      }, { status: 401 })
    }


    const isValid = await bcrypt.compare(password, result.passwordHash)
    if (!isValid) {
      return NextResponse.json({
        success: false,
        message: "password entered is not correct, please try again"
      }, { status: 401 })
    }

    if (result.twoFactorEnabled) {
      const tempToken = await createTempToken({ userId: result.id });
      const response = NextResponse.json({
        sucess: true, twoFactor: true
      }, { status: 200 })
      response.cookies.set('tfa-temp-token', tempToken, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 5,
        path: '/',
      });
      return response;
    }

    const token = await createToken({
      userId: result.id, email: result.email, role: result.role, avatar_url: result.avatarUrl,
    })


    const response = NextResponse.json({ success: true, message: "you are logged in", token: token }, { status: 200 })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    })


    return response
  } catch (e) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })

  }
}
