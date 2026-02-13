"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import type { MapPin } from "@/lib/traveling-hat";
import { Lightbox } from "@/components/ui/Lightbox";

// Fix Leaflet default icon issue in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;

const pinIcon = new L.DivIcon({
  className: "",
  html: `<div style="
    width: 28px;
    height: 28px;
    background: #FF7700;
    border: 3px solid #FBBF24;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 8px rgba(255,119,0,0.4);
  "><div style="
    width: 10px;
    height: 10px;
    background: #FFFBEB;
    border-radius: 50%;
    margin: 6px auto;
  "></div></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Wrapper that uses native click to bypass Leaflet's event swallowing
function FullscreenTrigger({ pin, onOpen, isMobile }: { pin: MapPin; onOpen: (pin: MapPin) => void; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => {
      e.stopPropagation();
      onOpen(pin);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [pin, onOpen]);

  const w = isMobile ? 180 : 280;
  const h = isMobile ? 130 : 200;

  return (
    <div ref={ref} style={{ width: w, height: h }} className="relative rounded-lg overflow-hidden mx-auto cursor-pointer">
      <Image
        src={pin.imageUrl}
        alt={pin.title}
        fill
        className="object-cover"
        sizes={`${w}px`}
      />
      <div className="absolute top-2 left-2 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
        </svg>
      </div>
    </div>
  );
}

// Centers the map on any marker that is clicked so the popup is fully visible
function CenterOnMarkerClick() {
  const map = useMap();

  useMapEvents({
    popupopen(e) {
      const px = map.project(e.popup.getLatLng()!);
      px.y -= e.popup.getElement()!.clientHeight / 2;
      map.panTo(map.unproject(px), { animate: true });
    },
  });

  return null;
}

// Flies to a pin when triggered from the list
function FlyToPin({ targetPin, markerRefs }: {
  targetPin: MapPin | null;
  markerRefs: React.MutableRefObject<Record<string, L.Marker>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!targetPin) return;
    map.flyTo(targetPin.coordinates, 8, { duration: 1 });
    const marker = markerRefs.current[targetPin.id];
    if (marker) {
      setTimeout(() => marker.openPopup(), 600);
    }
  }, [targetPin, map, markerRefs]);

  return null;
}

interface MapInnerProps {
  pins: MapPin[];
}

export default function MapInner({ pins }: MapInnerProps) {
  const [lightboxPin, setLightboxPin] = useState<MapPin | null>(null);
  const [targetPin, setTargetPin] = useState<MapPin | null>(null);
  const openLightbox = useCallback((pin: MapPin) => setLightboxPin(pin), []);
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const imgW = isMobile ? 180 : 280;
  const imgH = isMobile ? 130 : 200;
  const popupMaxW = isMobile ? 220 : 320;
  const popupMinW = isMobile ? 190 : 280;

  const handleListClick = useCallback((pin: MapPin) => {
    mapContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => setTargetPin(pin), 300);
  }, []);

  return (
    <>
      <div ref={mapContainerRef} className="w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden shadow-warm border-2 border-sunflower-200">
        <MapContainer
          center={[30, 20]}
          zoom={3}
          minZoom={2}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenterOnMarkerClick />
          <FlyToPin targetPin={targetPin} markerRefs={markerRefs} />
          {pins.map((pin) => (
            <Marker
              key={pin.id}
              position={pin.coordinates}
              icon={pinIcon}
              ref={(ref) => {
                if (ref) markerRefs.current[pin.id] = ref;
              }}
            >
              <Popup maxWidth={popupMaxW} minWidth={popupMinW}>
                <div className="text-center" dir="rtl">
                  {pin.imageUrl ? (
                    <FullscreenTrigger pin={pin} onOpen={openLightbox} isMobile={isMobile} />
                  ) : (
                    <div
                      style={{ width: imgW, height: imgH }}
                      className="rounded-lg bg-gradient-to-br from-sunflower-100 to-ivory-200 flex items-center justify-center mx-auto"
                    >
                      <span className={isMobile ? "text-4xl" : "text-5xl"}>🎩</span>
                    </div>
                  )}
                  <div className="mt-2 sm:mt-3 mb-1">
                    <p className="font-bold text-earth-800 text-sm sm:text-base m-0">
                      {pin.title}
                    </p>
                    {pin.photographer && (
                      <p className="text-earth-500 text-xs mt-1 m-0">
                        צולם ע״י {pin.photographer}
                        {pin.photographerRelation && (
                          <span className="text-earth-400"> ({pin.photographerRelation})</span>
                        )}
                      </p>
                    )}
                    {pin.description && (
                      <p className="text-earth-500 text-xs sm:text-sm mt-1 m-0">
                        {pin.description}
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Scrollable location list */}
      {pins.length > 0 && (
        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-earth-800 text-center mb-4">
            המיקומים
          </h2>
          <ul className="divide-y divide-earth-100 rounded-2xl border border-earth-200/60 bg-white shadow-warm overflow-hidden max-h-[320px] overflow-y-auto">
            {pins.map((pin) => (
              <li key={pin.id}>
                <button
                  type="button"
                  onClick={() => handleListClick(pin)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-sunflower-50 transition-colors"
                  dir="rtl"
                >
                  <span className="text-xl shrink-0">
                    {pin.imageUrl ? "📸" : "🎩"}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-earth-800 text-sm sm:text-base m-0">
                      {pin.title}
                    </p>
                    {pin.photographer && (
                      <p className="text-earth-400 text-xs m-0 mt-0.5">
                        צולם ע״י {pin.photographer}
                        {pin.photographerRelation && (
                          <span> ({pin.photographerRelation})</span>
                        )}
                      </p>
                    )}
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-earth-300 shrink-0 mr-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lightboxPin && lightboxPin.imageUrl && (
        <Lightbox
          images={[{ src: lightboxPin.imageUrl, alt: lightboxPin.title }]}
          initialIndex={0}
          onClose={() => setLightboxPin(null)}
        />
      )}
    </>
  );
}
