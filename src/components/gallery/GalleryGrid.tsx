"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryItem } from "@/lib/gallery";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lightboxImages = items.map((item) => ({
    src: item.src,
    alt: item.alt,
  }));

  return (
    <section aria-label="גלריית תמונות" className="max-w-6xl mx-auto">
      <ul
        role="list"
        className="columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4 md:gap-5"
        aria-label={`${items.length} תמונות בגלריה`}
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
              aria-label={`${item.alt} - לחצו לצפייה בתמונה`}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="w-full h-auto group-hover:scale-[1.03] transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
            </article>
          </li>
        ))}
      </ul>

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
