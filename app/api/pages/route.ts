
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchemaServer } from "@/lib/validation";
import { getSession } from "@/lib/auth";

export async function GET() {
	try {
		const pages = await prisma.page.findMany();
		
		return NextResponse.json(pages);
	} catch (err) {
		console.error("Error fetching pages: ", err);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}