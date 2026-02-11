import { NextRequest,NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export async function POST(request:Request){
    try{
      const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    //the request is a stream in nextjs, so you need a wait and change it to json.
      const body = await request.json();
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { error: "Name:, email and password are required" },
          {status: 400}
        )
      }

      // Check if the email already in the database
      const existingUser = await prisma.user.findUnique({
        where: {email: email}
      })

      // If email found, don't create a duplicate
      if (existingUser) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        )
      }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await prisma.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword
      }
    })


    return NextResponse.json(user)
}catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
    }


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        passwordHash: false
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

  export async function DELETE() {
	console.log("delete");
}
