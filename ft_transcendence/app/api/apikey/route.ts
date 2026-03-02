import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    const result = await request.json()

    console.log("test my api", result)

    return NextResponse.json({success:true},{status:200})
}


