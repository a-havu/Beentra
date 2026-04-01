import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: { isOnline: true },
    });
    const eventCount = await prisma.event.count();
    const projectCount = await prisma.project.count();

    return NextResponse.json({
      users: userCount,
      activeUsers: activeUsers,
      events: eventCount,
      projects: projectCount,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
