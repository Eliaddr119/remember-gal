/**
 * Migration script — copies data from Supabase (DB + Storage) to Railway (PostgreSQL + bucket)
 *
 * Run with:
 *   npx tsx scripts/migrate-to-railway.ts
 *
 * Requires .env.local with both Supabase and Railway credentials.
 */

import postgres from "postgres";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

// ─── Clients ──────────────────────────────────────────────────────────────────

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
});

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "auto",
  endpoint: process.env.AWS_ENDPOINT_URL_S3!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: false,
});

const BUCKET = process.env.BUCKET_NAME!;
const ENDPOINT_HOST = new URL(process.env.AWS_ENDPOINT_URL_S3!).host;

function getPublicUrl(key: string) {
  return `https://${BUCKET}.${ENDPOINT_HOST}/${key}`;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSupabaseUrl(url: string) {
  return typeof url === "string" && url.includes(".supabase.co/storage");
}

async function migrateFile(supabaseUrl: string): Promise<string> {
  const res = await fetch(supabaseUrl);
  if (!res.ok) throw new Error(`Failed to download ${supabaseUrl}: ${res.status}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") ?? "application/octet-stream";

  // Extract the storage path from the Supabase URL
  // e.g. .../storage/v1/object/public/images/gallery/photo.webp → gallery/photo.webp
  const match = supabaseUrl.match(/\/object\/public\/[^/]+\/(.+)$/);
  const key = match ? match[1] : `migrated/${Date.now()}-${Math.random().toString(36).slice(2)}`;

  await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: buffer, ContentType: contentType }));
  const newUrl = getPublicUrl(key);
  console.log(`  ✓ ${key}`);
  return newUrl;
}

async function migrateUrl(url: string): Promise<string> {
  if (!isSupabaseUrl(url)) return url;
  try {
    return await migrateFile(url);
  } catch (e) {
    console.error(`  ✗ failed: ${url} — ${e instanceof Error ? e.message : e}`);
    return url; // keep original if migration fails
  }
}

async function migrateArray(urls: unknown): Promise<string[]> {
  if (!Array.isArray(urls)) return [];
  return Promise.all(urls.map((u) => migrateUrl(String(u))));
}

// ─── Tables ───────────────────────────────────────────────────────────────────

async function migratePosts() {
  console.log("\nMigrating posts...");
  const rows = await sql`SELECT id, image_url FROM posts WHERE image_url IS NOT NULL AND image_url != ''`;
  for (const row of rows) {
    const newUrl = await migrateUrl(row.image_url);
    if (newUrl !== row.image_url) {
      await sql`UPDATE posts SET image_url = ${newUrl} WHERE id = ${row.id}`;
    }
  }
  console.log(`  Done (${rows.length} rows)`);
}

async function migrateGallery() {
  console.log("\nMigrating gallery...");
  const rows = await sql`SELECT id, image_url FROM gallery WHERE image_url IS NOT NULL AND image_url != ''`;
  for (const row of rows) {
    const newUrl = await migrateUrl(row.image_url);
    if (newUrl !== row.image_url) {
      await sql`UPDATE gallery SET image_url = ${newUrl} WHERE id = ${row.id}`;
    }
  }
  console.log(`  Done (${rows.length} rows)`);
}

async function migrateEvents() {
  console.log("\nMigrating events...");
  const rows = await sql`SELECT id, photos, videos FROM events`;
  for (const row of rows) {
    const newPhotos = await migrateArray(row.photos);
    const newVideos = await migrateArray(row.videos);
    await sql`UPDATE events SET photos = ${JSON.stringify(newPhotos)}, videos = ${JSON.stringify(newVideos)} WHERE id = ${row.id}`;
  }
  console.log(`  Done (${rows.length} rows)`);
}

async function migrateTravelingHat() {
  console.log("\nMigrating traveling_hat...");
  const rows = await sql`SELECT id, image_urls FROM traveling_hat`;
  for (const row of rows) {
    const newUrls = await migrateArray(row.image_urls);
    await sql`UPDATE traveling_hat SET image_urls = ${JSON.stringify(newUrls)} WHERE id = ${row.id}`;
  }
  console.log(`  Done (${rows.length} rows)`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Starting migration to Railway...");
  console.log(`  DB: ${process.env.DATABASE_URL?.split("@")[1]}`);
  console.log(`  Bucket: ${BUCKET} @ ${ENDPOINT_HOST}`);

  await migratePosts();
  await migrateGallery();
  await migrateEvents();
  await migrateTravelingHat();

  await sql.end();
  console.log("\nMigration complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
