"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";

interface EventPhotoGridProps {
  photos: string[];
  videos?: string[];
  eventTitle: string;
}

function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(url);
}

export function EventPhotoGrid({ photos, videos = [], eventTitle }: EventPhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0 && videos.length === 0) return null;

  const allMedia = [...photos, ...videos];

  const lightboxItems = allMedia.map((media, i) => ({
    src: media,
    alt: isVideo(media)
      ? `${eventTitle} - סרטון ${i - photos.length + 1}`
      : `${eventTitle} - תמונה ${i + 1}`,
    type: isVideo(media) ? "video" as const : "image" as const,
  }));

  return (
    <>
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {allMedia.map((media, i) => (
          <button
            key={i}
            type="button"
            className="relative aspect-square rounded-md overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sunflower-400 focus:ring-offset-2"
            onClick={() => setSelectedIndex(i)}
            aria-label={
              isVideo(media)
                ? `${eventTitle} - סרטון ${i - photos.length + 1}, לחצו לצפייה`
                : `${eventTitle} - תמונה ${i + 1}, לחצו לצפייה מוגדלת`
            }
          >
            {isVideo(media) ? (
              <>
                <video
                  src={media}
                  className="w-full h-full object-cover"
                  preload="metadata"
                  muted
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8 drop-shadow-lg">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                </div>
              </>
            ) : (
              <Image
                src={media}
                alt={`${eventTitle} - תמונה ${i + 1}`}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          images={lightboxItems}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
