import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";

// Keep libvips lean: its thread pool defaults to the CPU count (Railway reports
// many cores) and it keeps an operation cache — both hold memory we don't need
// for occasional admin uploads.
sharp.concurrency(1);
sharp.cache(false);

const ALLOWED_BUCKETS = new Set(["images"]);
const MAX_IMAGE_SIZE = 20 * 1024 * 1024;  // 20 MB
const MAX_VIDEO_SIZE = 150 * 1024 * 1024; // 150 MB

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "images";
    const folder = (formData.get("folder") as string) || "";

    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    if (!ALLOWED_BUCKETS.has(bucket)) {
      return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
    }

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: "Only image and video files are allowed" }, { status: 400 });
    }

    const sizeLimit = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    if (file.size > sizeLimit) {
      return NextResponse.json(
        { error: `File exceeds ${isImage ? "20" : "150"} MB limit` },
        { status: 400 }
      );
    }

    const raw = Buffer.from(await file.arrayBuffer());
    const base = `${folder ? folder + "/" : ""}${Date.now()}`;
    // These assets are timestamp-named and never change, so cache them hard.
    const cacheControl = "2592000"; // 30 days
    const publicUrl = (name: string) =>
      supabaseServer.storage.from(bucket).getPublicUrl(name).data.publicUrl;

    if (isImage) {
      // One decode, two outputs: a display-size original and a small grid thumb.
      const pipeline = sharp(raw).rotate(); // honour EXIF orientation
      const [mainBuffer, thumbBuffer] = await Promise.all([
        pipeline
          .clone()
          .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 82 })
          .toBuffer(),
        // ~600px is plenty for the multi-column grid, at a fraction of the bytes.
        pipeline
          .clone()
          .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true })
          .webp({ quality: 72 })
          .toBuffer(),
      ]);
      const meta = await sharp(mainBuffer).metadata();

      const mainName = `${base}.webp`;
      const thumbName = `${base}_thumb.webp`;
      const opts = { contentType: "image/webp", cacheControl, upsert: false };
      const [mainRes, thumbRes] = await Promise.all([
        supabaseServer.storage.from(bucket).upload(mainName, mainBuffer, opts),
        supabaseServer.storage.from(bucket).upload(thumbName, thumbBuffer, opts),
      ]);
      if (mainRes.error) return NextResponse.json({ error: mainRes.error.message }, { status: 500 });
      if (thumbRes.error) return NextResponse.json({ error: thumbRes.error.message }, { status: 500 });

      return NextResponse.json(
        {
          url: publicUrl(mainName),
          thumbUrl: publicUrl(thumbName),
          width: meta.width ?? null,
          height: meta.height ?? null,
        },
        { status: 201 }
      );
    }

    // Video — stored as-is (no thumbnail).
    const ext = file.name.split(".").pop() ?? "mp4";
    const videoName = `${base}.${ext}`;
    const { error } = await supabaseServer.storage
      .from(bucket)
      .upload(videoName, raw, { contentType: file.type, cacheControl, upsert: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ url: publicUrl(videoName) }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "שגיאה בהעלאה";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
