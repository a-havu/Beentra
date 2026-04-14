import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();

    const fiveMinutes = new Date(Date.now() - 5 * 60 * 1000);

    const activeUsers = await prisma.user.count({
      where: {
        lastActive: { gte: fiveMinutes },
      },
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
