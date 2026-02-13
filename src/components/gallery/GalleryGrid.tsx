"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

interface GalleryItem {
  id: number;
  alt: string;
  width: number;
  height: number;
}

const galleryItems: GalleryItem[] = [
  { id: 1, alt: "תמונה של גל", width: 1320, height: 1760 },
  { id: 2, alt: "תמונה של גל", width: 1200, height: 1600 },
  { id: 3, alt: "תמונה של גל", width: 1600, height: 900 },
  { id: 4, alt: "תמונה של גל", width: 1320, height: 992 },
  { id: 5, alt: "תמונה של גל", width: 2012, height: 2677 },
  { id: 6, alt: "תמונה של גל", width: 1536, height: 2048 },
  { id: 7, alt: "תמונה של גל", width: 1158, height: 1524 },
  { id: 8, alt: "תמונה של גל", width: 1200, height: 1600 },
  { id: 9, alt: "תמונה של גל", width: 1179, height: 1382 },
  { id: 10, alt: "תמונה של גל", width: 1200, height: 1600 },
  { id: 11, alt: "תמונה של גל", width: 1687, height: 2048 },
  { id: 12, alt: "תמונה של גל", width: 900, height: 1600 },
  { id: 13, alt: "תמונה של גל", width: 1536, height: 2048 },
  { id: 14, alt: "תמונה של גל", width: 2048, height: 1968 },
  { id: 15, alt: "תמונה של גל", width: 1320, height: 1650 },
  { id: 16, alt: "תמונה של גל", width: 1600, height: 1200 },
  { id: 17, alt: "תמונה של גל", width: 1600, height: 900 },
  { id: 18, alt: "תמונה של גל", width: 1320, height: 979 },
];

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lightboxImages = galleryItems.map((item) => ({
    src: `/images/gallery/gallery-${item.id}.jpg`,
    alt: item.alt,
  }));

  return (
    <section aria-label="גלריית תמונות" className="max-w-6xl mx-auto">
      <ul
        role="list"
        className="columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4 md:gap-5"
        aria-label={`${galleryItems.length} תמונות בגלריה`}
      >
        {galleryItems.map((item, index) => (
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
                src={`/images/gallery/gallery-${item.id}.jpg`}
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
