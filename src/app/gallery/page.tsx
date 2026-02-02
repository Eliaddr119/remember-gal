import { Metadata } from "next";
import { SunflowerDecoration } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "גלריה | לזכר גל",
  description: "תמונות וזיכרונות חזותיים של גל",
};

interface GalleryItem {
  id: number;
  alt: string;
  width: number;
  height: number;
}

// Photos with their actual dimensions - aspect ratio is calculated from width/height
const galleryItems: GalleryItem[] = [
  { id: 1, alt: "תמונה 1", width: 4, height: 3 },      // landscape
  { id: 2, alt: "תמונה 2", width: 3, height: 4 },      // portrait
  { id: 3, alt: "תמונה 3", width: 16, height: 9 },     // wide landscape
  { id: 4, alt: "תמונה 4", width: 1, height: 1 },      // square
  { id: 5, alt: "תמונה 5", width: 2, height: 3 },      // portrait
  { id: 6, alt: "תמונה 6", width: 1, height: 1 },      // square
  { id: 7, alt: "תמונה 7", width: 3, height: 2 },      // landscape
  { id: 8, alt: "תמונה 8", width: 9, height: 16 },     // tall portrait
  { id: 9, alt: "תמונה 9", width: 4, height: 5 },      // portrait
  { id: 10, alt: "תמונה 10", width: 5, height: 4 },    // landscape
  { id: 11, alt: "תמונה 11", width: 1, height: 1 },    // square
  { id: 12, alt: "תמונה 12", width: 3, height: 4 },    // portrait
];

const PhotoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
    />
  </svg>
);

export default function GalleryPage() {
  return (
    <div className="bg-warm-gradient min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 opacity-5 pointer-events-none hidden sm:block">
        <SunflowerDecoration className="w-96 h-96 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-3 sm:mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-800">
            גלריה
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-6 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg px-2">
          רגעים מיוחדים שנשמרו בתמונות
        </p>

        {/* Masonry Photo Grid using CSS columns */}
        <div className="max-w-6xl mx-auto columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4 md:gap-5">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="mb-3 sm:mb-4 md:mb-5 break-inside-avoid bg-gradient-to-br from-ivory-100 to-ivory-200 rounded-2xl overflow-hidden border-2 border-dashed border-earth-300 hover:border-sunflower-400 transition-all duration-300 cursor-pointer group shadow-warm hover:shadow-warm-lg"
            >
              <div
                className="w-full flex items-center justify-center text-earth-400 group-hover:text-sunflower-600 transition-colors"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                <div className="text-center p-2 sm:p-4">
                  <PhotoIcon />
                  <p className="text-xs sm:text-sm font-medium">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about adding photos */}
        <div className="mt-10 sm:mt-16 max-w-xl mx-auto px-2">
          <div className="bg-sunflower-gradient rounded-2xl p-4 sm:p-6 text-center shadow-warm relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-sunflower-400/30 rounded-full blur-xl"></div>
            <p className="text-earth-700 relative z-10 text-sm sm:text-base">
              יש לכם תמונות של גל שתרצו לשתף? צרו קשר עם המשפחה
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
