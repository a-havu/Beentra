import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchemaServer } from "@/lib/validation";
import { getSession } from "@/lib/auth";

async function getPublicCreatorId(request: NextRequest): Promise<string | null> {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey) return null;
  const publicUser = await prisma.publicApiUser.findUnique({ where: { key: apiKey } });
  return publicUser?.id ?? null;
}

function canModify(
  event: { creatorId: string | null; publicCreatorId: string | null },
  session: { userId: string; role: string } | null,
  publicCreatorId: string | null,
): boolean {
  if (session?.role === "admin") return true;
  if (session?.userId && event.creatorId === session.userId) return true;
  if (publicCreatorId && event.publicCreatorId === publicCreatorId) return true;
  return false;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    const publicCreatorId = await getPublicCreatorId(request);

    if (!session && !publicCreatorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;                    // ← from URL, not body
    const body = await request.json();              // ← read body only once
    const result = eventSchemaServer.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 },
      );
    }

    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (!canModify(existing, session, publicCreatorId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const {
      title, type, date, timeFrom, timeTo,
      location, organizer, image, description, maxSpots,
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    const userId = session?.userId;
    const { id } = await params;

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
    console.error("Error fetching event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    const publicCreatorId = await getPublicCreatorId(request);

    if (!session && !publicCreatorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (!canModify(event, session, publicCreatorId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
