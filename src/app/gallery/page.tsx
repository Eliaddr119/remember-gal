import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "גלריה | לזכות גל",
  description: "תמונות וזיכרונות חזותיים של גל",
};

export default async function GalleryPage() {
  const items = await getGalleryItems();
  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

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
        <GalleryGrid items={items} />

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
