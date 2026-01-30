import { Metadata } from "next";
import { SunflowerDecoration } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "גלריה | לזכר גל",
  description: "תמונות וזיכרונות חזותיים של גל",
};

const galleryItems = [
  { id: 1, alt: "תמונה 1" },
  { id: 2, alt: "תמונה 2" },
  { id: 3, alt: "תמונה 3" },
  { id: 4, alt: "תמונה 4" },
  { id: 5, alt: "תמונה 5" },
  { id: 6, alt: "תמונה 6" },
  { id: 7, alt: "תמונה 7" },
  { id: 8, alt: "תמונה 8" },
  { id: 9, alt: "תמונה 9" },
];

export default function GalleryPage() {
  return (
    <div className="bg-warm-gradient min-h-screen relative">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 opacity-5 pointer-events-none">
        <SunflowerDecoration className="w-96 h-96 -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-earth-800">
            גלריה
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-10 max-w-2xl mx-auto text-lg">
          רגעים מיוחדים שנשמרו בתמונות
        </p>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-gradient-to-br from-ivory-100 to-ivory-200 rounded-2xl overflow-hidden border-2 border-dashed border-earth-300 hover:border-sunflower-400 transition-all duration-300 cursor-pointer group shadow-warm hover:shadow-warm-lg hover:-translate-y-1"
            >
              <div className="w-full h-full flex items-center justify-center text-earth-400 group-hover:text-sunflower-600 transition-colors">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-14 h-14 mx-auto mb-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p className="text-sm font-medium">{item.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about adding photos */}
        <div className="mt-16 max-w-xl mx-auto">
          <div className="bg-sunflower-gradient rounded-2xl p-6 text-center shadow-warm relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-sunflower-400/30 rounded-full blur-xl"></div>
            <p className="text-earth-700 relative z-10">
              יש לכם תמונות של גל שתרצו לשתף? צרו קשר עם המשפחה
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
