/**
 * Seed script — reads local markdown/image files and populates Supabase.
 *
 * Run with:
 *   npx tsx scripts/seed.ts
 *
 * Requires a .env.local file with:
 *   SUPABASE_URL=...
 *   SUPABASE_SERVICE_ROLE_KEY=...
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const ROOT = process.cwd();

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function uploadFile(
  localPath: string,
  bucket: string,
  storagePath: string
): Promise<string> {
  const buffer = fs.readFileSync(localPath);
  const ext = path.extname(localPath).slice(1);
  const contentType = ext.match(/jpe?g/i)
    ? "image/jpeg"
    : ext.match(/png/i)
    ? "image/png"
    : ext.match(/webp/i)
    ? "image/webp"
    : "application/octet-stream";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (error) throw new Error(`Upload failed for ${localPath}: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

// Resolve a local URL like /images/gallery/gallery-1.jpg → absolute path
function resolvePublicPath(url: string): string {
  return path.join(ROOT, "public", url);
}

// ─── Stories ──────────────────────────────────────────────────────────────────

async function seedStories() {
  console.log("Seeding stories...");
  const dir = path.join(ROOT, "content/stories");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content: md } = matter(content);
    const processed = await remark().use(html).process(md);
    const contentHtml = processed.toString();

    const { error } = await supabase.from("stories").upsert({
      id: data.id,
      author: data.author,
      relation: data.relation || null,
      date: data.date || null,
      content_markdown: md,
      content_html: contentHtml,
    });

    if (error) console.error(`Story ${file}: ${error.message}`);
    else console.log(`  ✓ story: ${data.author}`);
  }
}

// ─── Posts ────────────────────────────────────────────────────────────────────

async function seedPosts() {
  console.log("Seeding posts...");
  const dir = path.join(ROOT, "content/posts");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content: caption } = matter(content);

    let imageUrl = data.imageUrl || "";
    if (imageUrl && imageUrl.startsWith("/")) {
      const localPath = resolvePublicPath(imageUrl);
      if (fs.existsSync(localPath)) {
        const storagePath = `posts/${path.basename(localPath)}`;
        imageUrl = await uploadFile(localPath, "images", storagePath);
      }
    }

    const { error } = await supabase.from("posts").upsert({
      id: data.id,
      image_url: imageUrl,
      title: data.title || "",
      content: caption.trim(),
    });

    if (error) console.error(`Post ${file}: ${error.message}`);
    else console.log(`  ✓ post ${data.id}: ${data.title}`);
  }
}

// ─── Events ───────────────────────────────────────────────────────────────────

async function seedEvents() {
  console.log("Seeding events...");
  const dir = path.join(ROOT, "content/events");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content: description } = matter(content);

    // Upload photos
    const photos: string[] = [];
    for (const photo of Array.isArray(data.photos) ? data.photos : []) {
      if (photo.startsWith("/")) {
        const localPath = resolvePublicPath(photo);
        if (fs.existsSync(localPath)) {
          const storagePath = `events/${path.basename(path.dirname(photo))}/${path.basename(localPath)}`;
          const url = await uploadFile(localPath, "images", storagePath);
          photos.push(url);
        } else {
          photos.push(photo);
        }
      } else {
        photos.push(photo);
      }
    }

    const { error } = await supabase.from("events").upsert({
      id: data.id,
      title: data.title,
      date: data.date || null,
      time: data.time || null,
      location: data.location || null,
      description: description.trim(),
      photos,
      videos: Array.isArray(data.videos) ? data.videos : [],
    });

    if (error) console.error(`Event ${file}: ${error.message}`);
    else console.log(`  ✓ event: ${data.id}`);
  }
}

// ─── Traveling Hat ────────────────────────────────────────────────────────────

async function seedTravelingHat() {
  console.log("Seeding traveling-hat...");
  const dir = path.join(ROOT, "content/traveling-hat");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(content);

    // Parse imageUrls — the YAML may have unquoted paths
    let rawImageUrls: string[] = [];
    if (Array.isArray(data.imageUrls)) {
      rawImageUrls = data.imageUrls.map(String);
    } else if (data.imageUrl) {
      rawImageUrls = [String(data.imageUrl)];
    }

    const imageUrls: string[] = [];
    for (const imgUrl of rawImageUrls) {
      const normalized = imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`;
      const localPath = resolvePublicPath(normalized);
      if (fs.existsSync(localPath)) {
        const storagePath = `traveling-hat/${data.id}/${path.basename(localPath)}`;
        const url = await uploadFile(localPath, "images", storagePath);
        imageUrls.push(url);
      } else {
        imageUrls.push(normalized);
      }
    }

    const [lat, lng] = Array.isArray(data.coordinates)
      ? data.coordinates
      : [0, 0];

    const { error } = await supabase.from("traveling_hat").upsert({
      id: data.id,
      title: data.title,
      lat,
      lng,
      image_urls: imageUrls,
      photographer: data.photographer || null,
      photographer_relation: data.photographerRelation || null,
      description: "",
    });

    if (error) console.error(`Pin ${file}: ${error.message}`);
    else console.log(`  ✓ pin: ${data.id}`);
  }
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

async function seedGallery() {
  console.log("Seeding gallery...");
  const galleryDir = path.join(ROOT, "public/images/gallery");
  const files = fs
    .readdirSync(galleryDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  for (const file of files) {
    const match = file.match(/gallery-(\d+)/);
    const id = match ? parseInt(match[1], 10) : null;
    if (!id) continue;

    const localPath = path.join(galleryDir, file);
    const storagePath = `gallery/${file}`;
    const url = await uploadFile(localPath, "images", storagePath);

    const { error } = await supabase.from("gallery").upsert({
      id,
      image_url: url,
      width: null,
      height: null,
    });

    if (error) console.error(`Gallery ${file}: ${error.message}`);
    else console.log(`  ✓ gallery: ${file}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Starting seed...\n");
  await seedStories();
  await seedPosts();
  await seedEvents();
  await seedTravelingHat();
  await seedGallery();
  console.log("\nSeed complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
