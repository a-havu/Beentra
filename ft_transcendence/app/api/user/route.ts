import { NextRequest,NextResponse } from 'next/server'
import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export async function POST(request:Request){
    //the request is a stream in nextjs, so you need a wait and change it to json.
    const body = await request.json()
    const{username, password} = body

    console.log("username: ", username)
    console.log("passowrd: ", password)
    //salt rounds are 10
    const saltRounds = bcrypt.genSaltSync(10);
    const hasedPassword = await bcrypt.hash(password, saltRounds)
    console.log("hasedPassword: ", hasedPassword)
    const user = await prisma.user.create({
        data:{username:username,passwordHash:hasedPassword}
    })
  

    return NextResponse.json(user)
    }


export async function GET(){

    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}