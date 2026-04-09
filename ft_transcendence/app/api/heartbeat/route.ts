import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST() {
	try {
		const session = await getSession();
		if (!session?.userId) {
			return NextResponse.json(
				{ success: false },
				{ status: 401 }
			);
		}

		await prisma.user.update({
			where: { id: session.userId },
			data: {
				isOnline: true,
				lastActive: new Date(),
			},
		});

		return NextResponse.json(
			{ success: true }
		);
	} catch {
		return NextResponse.json(
			{ error: "Server error" },
			{ status: 500 }
		);
	}
}