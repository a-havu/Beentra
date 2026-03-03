import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchemaServer } from "@/lib/validation";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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

    const updatedEvent = await prisma.event.update({
      where: { id },
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

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const event = await prisma.event.findUnique({
      where: { id },
    });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if event exists
    const { id } = await params;
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json({ error: "event not found" }, { status: 404 });
    }

    // WE NEED TO CHECK IF YOU CAN DELETE EVENT -> rights

    // Delete the event
    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
