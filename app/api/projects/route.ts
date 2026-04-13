import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";
import { getImageKit } from "@/lib/imagekit";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ FIX: use formData instead of json
    const formData = await request.formData();

    const projectName = formData.get("projectName") as string;
    const oneLiner = formData.get("oneLiner") as string;
    const link = formData.get("link") as string;
    const techStack = formData.get("techStack") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File | null;

    let imageUrl: string | null = null;
    let imagekitFileId: string | null = null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const imagekit = getImageKit();

      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: "projects",
      });

      imageUrl = uploadResponse.url ?? null;
      imagekitFileId = uploadResponse.fileId ?? null;
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        oneLiner,
        link,
        techStack,
        description,
        image: imageUrl,
        imagekitFileId,
        creatorId: session.userId,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
