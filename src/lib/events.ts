import { apiFetch } from "@/lib/api-fetch";
import { withCache } from "@/lib/cache";

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
  return withCache("events", async () => {
    const data = await apiFetch<EventRow[]>("/api/events", { revalidate: 300 });
    return (data || []).map((row) => ({
      id: row.id,
      title: row.title,
      date: row.date || "",
      time: row.time || "",
      location: row.location || "",
      description: row.description || "",
      photos: Array.isArray(row.photos) ? (row.photos as string[]) : [],
      videos: Array.isArray(row.videos) ? (row.videos as string[]) : [],
    }));
  });
}
