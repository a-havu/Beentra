import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// export async function DELETE() {
//   try {
//     const status = await prisma.event.delete(id)
//     return NextResponse.json(status);
//   } catch (error) {
//     console.error("Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

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
