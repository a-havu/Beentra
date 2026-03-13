
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST() {
	try {
		const session = await getSession();

		if (!session?.email) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		await prisma.user.update({
			where: { email: session.email },
			data: { lastActive: new Date() }
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Activity error: ", err);
		return NextResponse.json({ error: "Failed" }, { status: 500 });
	}
}