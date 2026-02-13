import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import TravelingHatMap from "@/components/map/TravelingHatMap";
import { getPins } from "@/lib/traveling-hat";

export const metadata: Metadata = {
  title: "הכובע מטייל | לזכות גל",
  description: "הכובע של גל מטייל בעולם - מפה אינטראקטיבית",
};

export default function TravelingHatPage() {
  const pins = getPins();

  return (
    <div className="min-h-screen bg-warm-gradient relative">
      <SunflowerBackground />

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 relative z-10">
        {/* Page Header */}
        <div className="page-header mb-3 sm:mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-800">
            הכובע מטייל
          </h1>
        </div>
        <p className="text-center text-earth-500 mb-6 sm:mb-10 max-w-2xl mx-auto text-base sm:text-lg px-2">
          הכובע של גל ממשיך לטייל בעולם. לחצו על סימון במפה כדי לראות תמונה מהמקום.
        </p>

        {/* Interactive Map + Location List */}
        <TravelingHatMap pins={pins} />
      </div>
    </div>
  );
}
