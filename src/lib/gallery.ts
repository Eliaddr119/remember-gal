import { apiFetch } from "@/lib/api-fetch";

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  type: "image" | "video";
}

interface GalleryRow {
  id: number;
  image_url: string;
  width: number | null;
  height: number | null;
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i.test(url);
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await apiFetch<GalleryRow[]>("/api/gallery", { revalidate: 300 });

  return (data || []).map((row) => {
    const type = isVideoUrl(row.image_url) ? "video" : "image";
    return {
      id: row.id,
      src: row.image_url,
      alt: type === "video" ? "סרטון של גל" : "תמונה של גל",
      width: row.width || 800,
      height: row.height || 800,
      type,
    };
  });
}
