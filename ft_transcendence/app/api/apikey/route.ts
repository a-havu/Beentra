import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";


export async function POST(request:NextRequest){
    try{

        const {userEmail} = await request.json()
    const hashedKey = await bcrypt.hash(userEmail,10)

    const newKey = await prisma.apikey.create({
        data:{
            email:userEmail,
            key : hashedKey
        }
    }
        )
    return NextResponse.json({success:true},{status:200})
    }catch(e){
        
    }
    
}