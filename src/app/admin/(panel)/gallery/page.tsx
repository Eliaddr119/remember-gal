import { apiFetch } from "@/lib/api-fetch";
import GalleryAdminClient from "@/components/admin/GalleryAdminClient";

interface GalleryItem {
  id: number;
  image_url: string;
  thumb_url: string | null;
  width: number | null;
  height: number | null;
}

export default async function GalleryAdmin() {
  const items = await apiFetch<GalleryItem[]>("/api/gallery") ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">גלריה</h1>
      <GalleryAdminClient initialItems={items} />
    </div>
  );
}
