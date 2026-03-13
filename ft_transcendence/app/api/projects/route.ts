import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";
import ImageKit from "imagekit";
import { getSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {

    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

  let imageUrl: string | null = null;
  let imagekitFileId: string | null = null;

    if (body.image) {
    const uploadResponse = await imagekit.upload({
      file: body.image,
      fileName: body.imageName ?? "project-image",
      folder: "projects",
    });
      imageUrl = uploadResponse.url;
      imagekitFileId = uploadResponse.fileId;
  }


    const project = await prisma.project.create({
      data: {
        projectName: body.projectName,
        oneLiner: body.oneLiner,
        link: body.link,
        techStack: body.techStack,
        description: body.description,
        image: imageUrl,
        imagekitFileId: imagekitFileId,
        creatorId: session.userId,
      },
    });
    
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});