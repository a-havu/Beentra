import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    console.log("ID = ", id);
    const body = await request.json();
    //VALIDATION
    const date = new Date(body.date);
    const timeFrom = new Date(`${body.date}T${body.timeFrom}`);
    const timeTo = new Date(`${body.date}T${body.timeTo}`);
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: body.title,
        date: date,
        timeFrom: timeFrom,
        timeTo: timeTo,
        location: body.location,
        organizer: body.organizer,
        description: body.description,
        image: body.image,
      },
    });
    return NextResponse.json(updatedEvent);
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    // edit event
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
