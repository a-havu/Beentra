import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { subscribeSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth";

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: eventId } = await context.params;
    const result = subscribeSchema.safeParse({ eventId, userId: session.userId });
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { subscriptions: true } } },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.creatorId === session.userId) {
      return NextResponse.json({ error: "Creator cannot subscribe to own event" }, { status: 400 });
    }

    if (event.maxSpots > 0 && event._count.subscriptions >= event.maxSpots) {
      return NextResponse.json({ error: "Event is full" }, { status: 409 });
    }

    const subscription = await prisma.eventSubscription.upsert({
      where: { eventId_userId: { eventId, userId: session.userId } },
      create: { eventId, userId: session.userId },
      update: {},
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    console.error("Error subscribing to event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: eventId } = await context.params;
    const result = subscribeSchema.safeParse({ eventId, userId: session.userId });
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    await prisma.eventSubscription.delete({
      where: { eventId_userId: { eventId, userId: session.userId } },
    });

    return NextResponse.json({ message: "Unsubscribed successfully" });
  } catch (error) {
    console.error("Error unsubscribing from event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
