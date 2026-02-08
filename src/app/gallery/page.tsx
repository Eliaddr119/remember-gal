import { Metadata } from "next";
import { SunflowerDecoration } from "@/components/ui/Logo";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "גלריה | לזכר גל",
  description: "תמונות וזיכרונות חזותיים של גל",
};

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

        {/* Masonry Photo Grid */}
        <GalleryGrid />

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
