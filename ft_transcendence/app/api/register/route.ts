import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';
import { registerSchema } from "@/components/registration/RegistrationForm";

export async function POST(request: Request) {

   // try {
        const body  = await(request.json());
        const result = registerSchema.safeParse(body);

        if (!result) {
            return ({
                status: 400
            })
        }

        console.log("Received body :", body );
        return NextResponse.json({ message: "Registration successful", data: body  });
    /*} catch (error) {
        console.error("Error processing registration:", error);
        return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
    //}*/

}