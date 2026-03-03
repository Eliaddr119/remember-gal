import { apiFetch } from "@/lib/api-fetch";

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryRow {
  id: number;
  image_url: string;
  width: number | null;
  height: number | null;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await apiFetch<GalleryRow[]>("/api/gallery");

  return (data || []).map((row) => ({
    id: row.id,
    src: row.image_url,
    alt: "תמונה של גל",
    width: row.width || 800,
    height: row.height || 800,
  }));
}
