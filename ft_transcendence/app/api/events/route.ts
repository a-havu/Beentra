import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchemaServer } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = eventSchemaServer.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const { title, date, timeFrom, timeTo, location, organizer, image, description } = result.data;
    const datePart = date.toISOString().split("T")[0];

    const event = await prisma.event.create({
      data: {
        title,
        date,
        timeFrom: new Date(`${datePart}T${timeFrom}:00`),
        timeTo: new Date(`${datePart}T${timeTo}:00`),
        location,
        organizer,
        image: image ?? null,
        description: description ?? "",
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
