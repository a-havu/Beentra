import { NextResponse } from "next/server";

export async function POST(request: Request) {

    try {
        const result = await(request.json());
        console.log("Received result:", result);
        return NextResponse.json({ message: "Registration successful", data: result });
    } catch (error) {
        console.error("Error processing registration:", error);
        return NextResponse.json({ error: "Failed to process registration" }, { status: 500 });
    }
}