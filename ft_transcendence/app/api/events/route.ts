import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      date,
      timeFrom,
      timeTo,
      location,
      organizer,
      image,
      description,
    } = body;

    const user = await prisma.user.create({
      data: {
        title: title,
        date: date,
        timeFrom: timeFrom,
        timeTo: timeTo,
        location: location,
        organizer: organizer,
        image: image,
        description: description,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  const events = await prisma.events.findMany();
  return NextResponse.json(events);
}
