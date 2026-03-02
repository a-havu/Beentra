import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    const {userEmail} = await request.json()

    return NextResponse.json({success:true},{status:200})
}