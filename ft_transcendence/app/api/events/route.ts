import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    //convert the date into DateTime for prisma
    const date = new Date(body.date);
    const timeFrom = new Date(`${body.date}T${body.timeFrom}`);
    const timeTo = new Date(`${body.date}T${body.timeTo}`);

    const event = await prisma.event.create({
      data: {
        title: body.title,
        date,
        timeFrom,
        timeTo,
        location: body.location,
        organizer: body.organizer,
        image: body.image,
        description: body.description,
      },
    });

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
  const events = await prisma.event.findMany();
  return NextResponse.json(events);
}
