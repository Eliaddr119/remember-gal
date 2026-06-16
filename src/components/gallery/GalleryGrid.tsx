"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryItem } from "@/lib/gallery";
import { WARM_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [preloadSrc, setPreloadSrc] = useState<string | null>(null);

  const lightboxImages = items.map((item) => ({
    src: item.src,
    alt: item.alt,
    type: item.type,
  }));

  return (
    <section aria-label="גלריית מדיה" className="max-w-6xl mx-auto">
      <ul
        role="list"
        className="columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4 md:gap-5"
        aria-label={`${items.length} פריטים בגלריה`}
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            className="mb-3 sm:mb-4 md:mb-5 break-inside-avoid list-none"
          >
            <article
              className="rounded-2xl overflow-hidden border border-earth-200/60 hover:border-sunflower-400 transition-all duration-300 cursor-pointer group shadow-warm hover:shadow-warm-lg"
              tabIndex={0}
              role="button"
              aria-label={`${item.alt} - לחצו לצפייה`}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={() => item.type !== "video" && setPreloadSrc(item.src)}
              onMouseLeave={() => setPreloadSrc(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              {item.type === "video" ? (
                <div className="relative w-full">
                  <video
                    src={item.src}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
                      <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={WARM_BLUR_PLACEHOLDER}
                  priority={index < 6}
                />
              )}
            </article>
          </li>
        ))}
      </ul>

      {/* Preload full-size image on hover so it's ready before click */}
      {preloadSrc && (
        <div aria-hidden="true" style={{ position: "fixed", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none", top: 0, left: 0 }}>
          <Image src={preloadSrc} alt="" fill sizes="92vw" priority />
        </div>
      )}

      {selectedIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
