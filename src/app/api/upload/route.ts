import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { uploadBuffer } from "@/lib/storage";
import { requireAuth } from "@/lib/auth-helpers";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;  // 20 MB
const MAX_VIDEO_SIZE = 150 * 1024 * 1024; // 150 MB

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: "Only image and video files are allowed" }, { status: 400 });
    }

    const sizeLimit = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    if (file.size > sizeLimit) {
      return NextResponse.json({ error: `File exceeds ${isImage ? "20" : "150"} MB limit` }, { status: 400 });
    }

    const raw = Buffer.from(await file.arrayBuffer());
    let buffer: Buffer;
    let contentType: string;
    let key: string;

    if (isImage) {
      buffer = await sharp(raw)
        .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      contentType = "image/webp";
      key = `${folder ? folder + "/" : ""}${Date.now()}.webp`;
    } else {
      buffer = raw;
      contentType = file.type;
      const ext = file.name.split(".").pop() ?? "mp4";
      key = `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;
    }

    const url = await uploadBuffer(key, buffer, contentType);
    return NextResponse.json({ url }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "שגיאה בהעלאה" }, { status: 500 });
  }
}
