"use client";

interface GalleryItem {
  id: number;
  alt: string;
  width: number;
  height: number;
}

const PhotoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg>
);

// Photos with their actual dimensions - aspect ratio is calculated from width/height
const galleryItems: GalleryItem[] = [
  { id: 1, alt: "תמונה 1", width: 4, height: 3 },
  { id: 2, alt: "תמונה 2", width: 3, height: 4 },
  { id: 3, alt: "תמונה 3", width: 16, height: 9 },
  { id: 4, alt: "תמונה 4", width: 1, height: 1 },
  { id: 5, alt: "תמונה 5", width: 2, height: 3 },
  { id: 6, alt: "תמונה 6", width: 1, height: 1 },
  { id: 7, alt: "תמונה 7", width: 3, height: 2 },
  { id: 8, alt: "תמונה 8", width: 9, height: 16 },
  { id: 9, alt: "תמונה 9", width: 4, height: 5 },
  { id: 10, alt: "תמונה 10", width: 5, height: 4 },
  { id: 11, alt: "תמונה 11", width: 1, height: 1 },
  { id: 12, alt: "תמונה 12", width: 3, height: 4 },
];

export default function GalleryGrid() {
  return (
    <section aria-label="גלריית תמונות" className="max-w-6xl mx-auto">
      <ul
        role="list"
        className="columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4 md:gap-5"
        aria-label={`${galleryItems.length} תמונות בגלריה`}
      >
        {galleryItems.map((item) => (
          <li
            key={item.id}
            className="mb-3 sm:mb-4 md:mb-5 break-inside-avoid list-none"
          >
            <article
              className="bg-gradient-to-br from-ivory-100 to-ivory-200 rounded-2xl overflow-hidden border-2 border-dashed border-earth-300 hover:border-sunflower-400 transition-all duration-300 cursor-pointer group shadow-warm hover:shadow-warm-lg"
              tabIndex={0}
              role="button"
              aria-label={`${item.alt} - לחצו לצפייה בתמונה`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Future: open lightbox
                }
              }}
            >
              <figure
                className="w-full flex items-center justify-center text-earth-400 group-hover:text-sunflower-600 transition-colors"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <div className="text-center p-2 sm:p-4">
                  <PhotoIcon />
                  <figcaption className="text-xs sm:text-sm font-medium">{item.alt}</figcaption>
                </div>
              </figure>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
