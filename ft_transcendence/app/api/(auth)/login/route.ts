import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createToken } from '@/lib/auth';
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
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
      return NextResponse.json({success:false,
        message: "cannot find this Email, please register first"
      }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, result.passwordHash)
    if(!isValid){      return NextResponse.json({
      success:false,
        message: "password entered is not correct, please try again"
      }, { status: 401 })}

    const token = await createToken({userId:result.id, email: result.email, role:result.role})

    const response = NextResponse.json({success:true, message: "you are logged in", token:token},{status:200})

    response.cookies.set('auth-token',token, {
      httpOnly:true,
      sameSite:'lax',
      maxAge:60 * 60 * 24
    })

    
    return response
  } catch (e) {
    return NextResponse.json({ success:false, error: "Server error" }, { status: 500 })

  }
}