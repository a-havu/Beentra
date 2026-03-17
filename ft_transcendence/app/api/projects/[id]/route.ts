import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { imagekit } from "@/lib/imagekit";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await prisma.project.findUnique({
    where: { id },
  });
  
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (project.imagekitFileId) {
    await imagekit.deleteFile(project.imagekitFileId);
  }

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}