import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";
import ImageKit from "imagekit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = projectSchema.safeParse(body);
    if (!result.success) {
      console.error("Validation errors:", result.error.issues);
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      );
    }

    const uploadResponse = await imagekit.upload({
      file: body.image,
      fileName: body.imageName ?? "project-image",
      folder: "projects",
    });

    const project = await prisma.project.create({
      data: {
        projectName: body.projectName,
        oneLiner: body.oneLiner,
        link: body.link,
        techStack: body.techStack,
        description: body.description,
        image: uploadResponse.url,
        imagekitFileId: uploadResponse.fileId,
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