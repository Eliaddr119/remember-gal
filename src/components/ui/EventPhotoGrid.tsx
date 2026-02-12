"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

interface EventPhotoGridProps {
  photos: string[];
  eventTitle: string;
}

export function EventPhotoGrid({ photos, eventTitle }: EventPhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const lightboxImages = photos.map((photo, i) => ({
    src: photo,
    alt: `${eventTitle} - תמונה ${i + 1}`,
  }));

  return (
    <>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            type="button"
            className="relative aspect-square rounded-md overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sunflower-400 focus:ring-offset-2"
            onClick={() => setSelectedIndex(i)}
            aria-label={`${eventTitle} - תמונה ${i + 1}, לחצו לצפייה מוגדלת`}
          >
            <Image
              src={photo}
              alt={`${eventTitle} - תמונה ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
