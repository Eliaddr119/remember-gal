import { apiFetch } from "@/lib/api-fetch";

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

interface EventRow {
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
  const data = await apiFetch<EventRow[]>("/api/events");

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
}
