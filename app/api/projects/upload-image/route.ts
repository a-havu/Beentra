import { NextRequest, NextResponse } from "next/server";
import { getImageKit } from "@/lib/imagekit";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const imagekit = getImageKit();

  const uploadResponse = await imagekit.upload({
    file: buffer,
    fileName: file.name,
    folder: "projects",
  });

  return NextResponse.json({
    imageUrl: uploadResponse.url,
    imagekitFileId: uploadResponse.fileId,
  });
}
