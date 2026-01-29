import { NextRequest,NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10)

if (!Number.isInteger(SALT_ROUNDS) || SALT_ROUNDS <= 0) {
  throw new Error("Invalid SALT_ROUNDS env value")
}


export async function POST(request:Request){
    try{
    //the request is a stream in nextjs, so you need a wait and change it to json.
    const body = await request.json()
    const{username, password} = body
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await prisma.user.create({
        data:{username:username,passwordHash:hashedPassword}
    })
  

    return NextResponse.json(user)
}catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
    }


export async function GET(){

    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}