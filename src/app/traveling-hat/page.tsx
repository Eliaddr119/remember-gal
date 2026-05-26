export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { SunflowerBackground } from "@/components/ui/SunflowerBackground";
import TravelingHatMap from "@/components/map/TravelingHatMap";
import { getPins } from "@/lib/traveling-hat";

export const metadata: Metadata = {
  title: "הכובע מטייל | לזכות גל",
  description: "הכובע של גל מטייל בעולם - מפה אינטראקטיבית",
};

export default async function TravelingHatPage() {
  const pins = await getPins();

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

        {/* Form popup button */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-sunflower-gradient rounded-xl p-6 text-center shadow-warm">
            <h2 className="text-xl md:text-2xl font-bold text-earth-800 mb-2">
              הכובע היה איתכם? שתפו אותנו!
            </h2>
            <p className="text-earth-600 text-sm md:text-base mb-4">
              לחצו כדי לשתף תמונה מהמסע של הכובע
            </p>
            <button
              type="button"
              data-tally-open="q4dDG8"
              data-tally-layout="modal"
              data-tally-align-left="1"
              className="inline-block bg-earth-700 text-ivory-50 px-6 py-2.5 rounded-lg font-bold text-sm md:text-base hover:bg-earth-800 active:bg-earth-900 transition-colors shadow-warm"
            >
              שיתוף תמונה
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
