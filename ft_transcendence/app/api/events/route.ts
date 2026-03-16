import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { eventSchemaServer } from "@/lib/validation";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

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

    const event = await prisma.event.create({
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
        creatorId: session?.userId ?? null,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getSession();
    const userId = session?.userId;

    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        _count: { select: { subscriptions: true } },
        subscriptions: userId ? { where: { userId } } : false,
      },
    });

    const mapped = events.map((e) => {
      const { subscriptions, _count, ...rest } = e;
      return {
        ...rest,
        subscriberCount: _count.subscriptions,
        isSubscribed: userId ? subscriptions.length > 0 : false,
      };
    });

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
