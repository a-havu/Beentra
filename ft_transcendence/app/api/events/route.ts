import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const date = new Date(body.date);
    const datePart = body.date.split("T")[0];
    const timeFrom = new Date(`${datePart}T${body.timeFrom}:00`);
    const timeTo = new Date(`${datePart}T${body.timeTo}:00`);

    if (isNaN(timeFrom.getTime()) || isNaN(timeTo.getTime())) {
      return new NextResponse("Invalid timeFrom or timeTo", { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title: body.title,
        date,
        timeFrom,
        timeTo,
        location: body.location,
        organizer: body.organizer,
        image: body.image || null,
        description: body.description || "",
      },
    });

    console.log("DEBUG\n", body.date, body.timeFrom, body.timeTo);
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// export async function DELETE() {
//   try {
//     const status = await prisma.event.delete(id)
//     return NextResponse.json(status);
//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
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
