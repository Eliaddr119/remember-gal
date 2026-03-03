"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

interface GalleryRow {
  id: number;
  image_url: string;
  width: number | null;
  height: number | null;
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i.test(url);
}

export default function GalleryAdminClient({ initialItems }: { initialItems: GalleryRow[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function handleUpload(url: string) {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: url, width: null, height: null }),
    });
    if (res.ok) {
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      router.refresh();
    }
  }

  async function handleDelete(id: number) {
    setDeleting(id);
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setConfirmDelete(null);
    setDeleting(null);
    router.refresh();
  }

  const mediaCount = items.length;
  const videoCount = items.filter((i) => isVideoUrl(i.image_url)).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">הוספת מדיה</h2>
        <div className="grid grid-cols-2 gap-3">
          <ImageUpload
            onUpload={handleUpload}
            bucket="images"
            folder="gallery"
            label="בחר תמונה לגלריה"
          />
          <VideoUpload
            onUpload={handleUpload}
            bucket="images"
            folder="gallery"
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-3">
          {mediaCount} פריטים בגלריה
          {videoCount > 0 && ` (${videoCount} סרטונים)`}
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {items.map((item) => (
            <div key={item.id} className="relative group aspect-square">
              {isVideoUrl(item.image_url) ? (
                <video
                  src={item.image_url}
                  preload="metadata"
                  muted
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
              ) : (
                <img
                  src={item.image_url}
                  alt=""
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
              )}

              {confirmDelete === item.id ? (
                <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col items-center justify-center gap-2">
                  <p className="text-white text-xs">למחוק?</p>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      {deleting === item.id ? "..." : "כן"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="bg-white/20 text-white text-xs px-2 py-1 rounded hover:bg-white/30"
                    >
                      לא
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(item.id)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 py-16 text-center">
            <p className="text-gray-400 text-sm">הגלריה ריקה — העלה תמונה או סרטון ראשון</p>
          </div>
        )}
      </div>
    </div>
  );
}
