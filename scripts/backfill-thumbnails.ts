/**
 * Backfill thumbnails for existing gallery images.
 *
 * For every gallery row that is an image and has no thumb_url yet, this
 * downloads the original from Supabase Storage, generates a ~600px webp
 * thumbnail, uploads it next to the original, and updates the row with the
 * thumb_url plus real width/height. Idempotent — safe to re-run.
 *
 * Prerequisite: run scripts/add-thumb-url.sql first.
 *
 * Run with:
 *   npx tsx scripts/backfill-thumbnails.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import path from "path";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const BUCKET = "images";
const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

sharp.concurrency(1);
sharp.cache(false);

const VIDEO_RE = /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i;

interface GalleryRow {
  id: number;
  image_url: string;
  thumb_url: string | null;
}

// Turn a public URL into the object path within the bucket, e.g.
// https://x.supabase.co/storage/v1/object/public/images/gallery/g-1.jpg
//   -> gallery/g-1.jpg
function storagePathFromUrl(url: string): string | null {
  const marker = `/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + marker.length).split("?")[0]);
}

// gallery/g-1.jpg -> gallery/g-1_thumb.webp
function thumbPathFor(objectPath: string): string {
  const dir = path.posix.dirname(objectPath);
  const stem = path.posix.basename(objectPath, path.posix.extname(objectPath));
  const name = `${stem}_thumb.webp`;
  return dir === "." ? name : `${dir}/${name}`;
}

async function main() {
  const { data, error } = await supabase
    .from("gallery")
    .select("id, image_url, thumb_url")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to read gallery:", error.message);
    process.exit(1);
  }

  const rows = (data as GalleryRow[]) ?? [];
  let done = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of rows) {
    if (row.thumb_url) { skipped++; continue; }
    if (VIDEO_RE.test(row.image_url)) { skipped++; continue; }

    const objectPath = storagePathFromUrl(row.image_url);
    if (!objectPath) {
      console.warn(`  #${row.id}: cannot parse storage path from ${row.image_url} — skipping`);
      failed++;
      continue;
    }

    try {
      const dl = await supabase.storage.from(BUCKET).download(objectPath);
      if (dl.error || !dl.data) throw new Error(dl.error?.message || "download failed");

      const raw = Buffer.from(await dl.data.arrayBuffer());
      // resolveWithObject gives the OUTPUT dimensions after EXIF rotation, so
      // stored width/height match how the image actually displays (correct ratio).
      const { data: thumbBuffer, info: meta } = await sharp(raw)
        .rotate()
        .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 72 })
        .toBuffer({ resolveWithObject: true });

      const thumbPath = thumbPathFor(objectPath);
      const up = await supabase.storage
        .from(BUCKET)
        .upload(thumbPath, thumbBuffer, {
          contentType: "image/webp",
          cacheControl: "2592000",
          upsert: true,
        });
      if (up.error) throw new Error(up.error.message);

      const thumbUrl = supabase.storage.from(BUCKET).getPublicUrl(thumbPath).data.publicUrl;
      const upd = await supabase
        .from("gallery")
        .update({ thumb_url: thumbUrl, width: meta.width ?? null, height: meta.height ?? null })
        .eq("id", row.id);
      if (upd.error) throw new Error(upd.error.message);

      done++;
      console.log(`  #${row.id}: ${thumbPath} (${meta.width}x${meta.height})`);
    } catch (e) {
      failed++;
      console.warn(`  #${row.id}: ${e instanceof Error ? e.message : e}`);
    }
  }

  console.log(`\nDone. created=${done} skipped=${skipped} failed=${failed} total=${rows.length}`);
}

main();
