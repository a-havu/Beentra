import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body
    if (!username || !password) {
      return NextResponse.json({
        errorMessage: "missing Username or Password"
      }, { status: 400 })
    }

    const result = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (!result) {
      return NextResponse.json({
        errorMessage: "cannot find this username, please register first"
      }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, result.passwordHash)
    if(!isValid){      return NextResponse.json({
        errorMessage: "password entered is not correct, please try again"
      }, { status: 401 })}

    return NextResponse.json("you are logged in",{status:200})
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })

  }
}