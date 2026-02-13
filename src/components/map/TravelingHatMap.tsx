"use client";

import dynamic from "next/dynamic";
import type { MapPin } from "@/lib/traveling-hat";

// Dynamically import the map to avoid SSR issues with Leaflet
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] sm:h-[600px] rounded-2xl bg-ivory-100 flex items-center justify-center shadow-warm">
      <p className="text-earth-500 text-lg">טוען מפה...</p>
    </div>
  ),
});

interface TravelingHatMapProps {
  pins: MapPin[];
}

export default function TravelingHatMap({ pins }: TravelingHatMapProps) {
  return <MapInner pins={pins} />;
}
