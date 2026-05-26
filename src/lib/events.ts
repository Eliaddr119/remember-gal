import sql from "@/lib/db";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  photos: string[];
  videos: string[];
}

export interface EventRow {
  id: string;
  title: string;
  date: string | null;
  time: string | null;
  location: string | null;
  description: string | null;
  photos: unknown;
  videos: unknown;
}

export async function getEvents(): Promise<Event[]> {
  const rows = await sql`SELECT * FROM events ORDER BY date DESC`;
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    date: row.date || "",
    time: row.time || "",
    location: row.location || "",
    description: row.description || "",
    photos: Array.isArray(row.photos) ? (row.photos as string[]) : [],
    videos: Array.isArray(row.videos) ? (row.videos as string[]) : [],
  }));
}
