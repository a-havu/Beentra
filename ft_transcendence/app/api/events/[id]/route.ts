import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchemaServer } from "@/lib/validation";
import { getSession } from "@/lib/auth";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Only creator (or events with no creator) can edit
    if (existing.creatorId && existing.creatorId !== session.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const result = eventSchemaServer.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 },
      );
    }

    const {
      title,
      type,
      date,
      timeFrom,
      timeTo,
      location,
      organizer,
      image,
      description,
      maxSpots,
    } = result.data;
    const datePart = date.toISOString().split("T")[0];

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        type,
        date,
        timeFrom: new Date(`${datePart}T${timeFrom}:00`),
        timeTo: new Date(`${datePart}T${timeTo}:00`),
        location,
        organizer,
        image: image ?? null,
        description: description ?? "",
        maxSpots: maxSpots ?? 0,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    const userId = session?.userId;

    const { id } = await context.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: { select: { subscriptions: true } },
        subscriptions: userId ? { where: { userId } } : false,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const { subscriptions, _count, ...rest } = event;
    return NextResponse.json({
      ...rest,
      subscriberCount: _count.subscriptions,
      isSubscribed: userId ? subscriptions.length > 0 : false,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id } });

    if (!event) {
      return NextResponse.json({ error: "event not found" }, { status: 404 });
    }

    if (event.creatorId && event.creatorId !== session.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.event.delete({ where: { id } });

    return NextResponse.json(
      { message: "event deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
