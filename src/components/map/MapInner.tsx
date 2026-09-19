"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
// Leaflet ships CSS without TypeScript declarations.
// @ts-expect-error -- the stylesheet is handled by the Next.js bundler.
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import type { MapPin } from "@/lib/traveling-hat";
import { Lightbox } from "@/components/ui/Lightbox";
import { WARM_BLUR_PLACEHOLDER } from "@/lib/image-placeholder";

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

// CARTO's Voyager basemap labels the whole world in English. It needs a (free,
// non-commercial) key — without one every tile is stamped "API KEY REQUIRED", so
// fall back to plain OpenStreetMap, which labels each country in its own script.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY;

const basemap = CARTO_KEY
  ? {
      url: `https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  : {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    };

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
function FullscreenTrigger({ pin, imageIndex, onOpen, isMobile }: { pin: MapPin; imageIndex: number; onOpen: (pin: MapPin, index: number) => void; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => {
      e.stopPropagation();
      onOpen(pin, imageIndex);
    };
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [pin, imageIndex, onOpen]);

  const w = isMobile ? 180 : 280;
  const h = isMobile ? 130 : 200;

  return (
    <div ref={ref} style={{ width: w, height: h }} className="relative rounded-lg overflow-hidden mx-auto cursor-pointer">
      <Image
        src={pin.imageUrls[imageIndex]}
        alt={pin.title}
        fill
        className="object-cover"
        sizes={`${w}px`}
        placeholder="blur"
        blurDataURL={WARM_BLUR_PLACEHOLDER}
        priority
      />
      <div className="absolute top-2 left-2 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-3.5 h-3.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
        </svg>
      </div>
      {pin.imageUrls.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
          {imageIndex + 1}/{pin.imageUrls.length}
        </div>
      )}
    </div>
  );
}

// Image carousel for popups with multiple images
function PopupImageCarousel({ pin, onOpen, isMobile }: { pin: MapPin; onOpen: (pin: MapPin, index: number) => void; isMobile: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;
    if (!prevEl || !nextEl) return;
    const prevHandler = (e: Event) => {
      e.stopPropagation();
      setCurrentIndex((i) => (i - 1 + pin.imageUrls.length) % pin.imageUrls.length);
    };
    const nextHandler = (e: Event) => {
      e.stopPropagation();
      setCurrentIndex((i) => (i + 1) % pin.imageUrls.length);
    };
    prevEl.addEventListener("click", prevHandler);
    nextEl.addEventListener("click", nextHandler);
    return () => {
      prevEl.removeEventListener("click", prevHandler);
      nextEl.removeEventListener("click", nextHandler);
    };
  }, [pin.imageUrls.length]);

  return (
    <div className="relative">
      <FullscreenTrigger pin={pin} imageIndex={currentIndex} onOpen={onOpen} isMobile={isMobile} />
      {pin.imageUrls.length > 1 && (
        <>
          <button
            ref={prevRef}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            aria-label="תמונה קודמת"
          >
            &#8250;
          </button>
          <button
            ref={nextRef}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            aria-label="תמונה הבאה"
          >
            &#8249;
          </button>
        </>
      )}
    </div>
  );
}

// Centers the popup on the map viewport after it opens
function CenterOnPopupOpen() {
  const map = useMap();

  useMapEvents({
    popupopen(e) {
      // Wait a frame so the popup DOM is fully laid out
      requestAnimationFrame(() => {
        const popupEl = e.popup.getElement();
        if (!popupEl) return;
        const popupHeight = popupEl.clientHeight;
        const px = map.project(e.popup.getLatLng()!);
        // Shift up by half the popup height so it's visually centered
        px.y -= popupHeight / 2;
        map.panTo(map.unproject(px), { animate: true });
      });
    },
  });

  return null;
}

// Flies to a pin when triggered from the list, then opens popup
// CenterOnPopupOpen handles the final centering once the popup is visible
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
      // Open popup after fly animation completes; CenterOnPopupOpen will re-center
      map.once("moveend", () => {
        marker.openPopup();
      });
    }
  }, [targetPin, map, markerRefs]);

  return null;
}

interface MapInnerProps {
  pins: MapPin[];
}

export default function MapInner({ pins }: MapInnerProps) {
  const [lightboxPin, setLightboxPin] = useState<MapPin | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [targetPin, setTargetPin] = useState<MapPin | null>(null);
  const openLightbox = useCallback((pin: MapPin, index: number) => {
    setLightboxPin(pin);
    setLightboxIndex(index);
  }, []);
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
            attribution={basemap.attribution}
            url={basemap.url}
            detectRetina
          />
          <CenterOnPopupOpen />
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
                  {pin.imageUrls.length > 0 ? (
                    <PopupImageCarousel pin={pin} onOpen={openLightbox} isMobile={isMobile} />
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
                  <span className="shrink-0 inline-block w-5 h-5">
                    <svg viewBox="0 0 24 24" className="w-full h-full" style={{ filter: "drop-shadow(0 1px 2px rgba(255,119,0,0.3))" }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF7700" stroke="#FBBF24" strokeWidth="1.5" />
                      <circle cx="12" cy="9" r="3" fill="#FFFBEB" />
                    </svg>
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
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lightboxPin && lightboxPin.imageUrls.length > 0 && (
        <Lightbox
          images={lightboxPin.imageUrls.map((url) => ({ src: url, alt: lightboxPin.title }))}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxPin(null)}
        />
      )}
    </>
  );
}
