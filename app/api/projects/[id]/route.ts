import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getImageKit } from "@/lib/imagekit";

import { projectSchema } from "@/lib/validation";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (project.imagekitFileId) {
    const imagekit = getImageKit();
    await imagekit.deleteFile(project.imagekitFileId);
  }

  await prisma.project.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const existing = await prisma.project.findUnique({ where: { id } });

  if (
    parsed.data.imagekitFileId &&
    existing?.imagekitFileId &&
    parsed.data.imagekitFileId !== existing.imagekitFileId
  ) {
    try {
      const imagekit = getImageKit();
      await imagekit.deleteFile(existing.imagekitFileId);
    } catch (err) {
      console.error("ImageKit delete old image failed:", err);
    }
  }

  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...parsed.data,
      image: parsed.data.image ?? existing?.image,
      imagekitFileId: parsed.data.imagekitFileId ?? existing?.imagekitFileId,
    },
  });

  return Response.json(updated);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  return Response.json(project);
}
