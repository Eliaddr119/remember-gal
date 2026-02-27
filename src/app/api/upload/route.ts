import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "images";
    const folder = (formData.get("folder") as string) || "";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const raw = Buffer.from(await file.arrayBuffer());
    const isImage = file.type.startsWith("image/");

    let uploadBuffer: Buffer;
    let contentType: string;
    let fileName: string;

    if (isImage) {
      uploadBuffer = await sharp(raw)
        .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 82 })
        .toBuffer();
      contentType = "image/webp";
      fileName = `${folder ? folder + "/" : ""}${Date.now()}.webp`;
    } else {
      uploadBuffer = raw;
      contentType = file.type || "video/mp4";
      const ext = file.name.split(".").pop() ?? "mp4";
      fileName = `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;
    }

    const { error } = await supabaseServer.storage
      .from(bucket)
      .upload(fileName, uploadBuffer, { contentType, upsert: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { data: urlData } = supabaseServer.storage.from(bucket).getPublicUrl(fileName);
    return NextResponse.json({ url: urlData.publicUrl }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "שגיאה בהעלאה";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
