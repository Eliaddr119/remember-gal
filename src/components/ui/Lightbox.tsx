"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxImage {
  src: string;
  alt: string;
  type?: "image" | "video";
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hasMultiple = images.length > 1;
  const touchStartX = useRef<number | null>(null);
  const scrollY = useRef(0);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Reset loading state on every image change
  useEffect(() => {
    setImageLoaded(false);
  }, [currentIndex]);

  // SSR guard for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard + scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && hasMultiple) {
        goPrev();
      } else if (e.key === "ArrowLeft" && hasMultiple) {
        goNext();
      }
    };

    scrollY.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY.current);
    };
  }, [onClose, goNext, goPrev, hasMultiple]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) goPrev();
    else if (diff < -50) goNext();
    touchStartX.current = null;
  };

  const current = images[currentIndex];

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ height: "100dvh" }}
        role="dialog"
        aria-modal="true"
        aria-label="תצוגת תמונה מוגדלת"
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-earth-900/90" aria-hidden="true" />

        {/* Preload prev + next images while viewing current */}
        {hasMultiple && [-1, 1].map((offset) => {
          const idx = (currentIndex + offset + images.length) % images.length;
          const img = images[idx];
          if (img.type === "video") return null;
          return (
            <div
              key={idx}
              aria-hidden="true"
              style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
            >
              <Image src={img.src} alt="" fill sizes="92vw" priority />
            </div>
          );
        })}

        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 left-3 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/20 text-white active:bg-white/40 transition-colors"
          aria-label="סגור תצוגה"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image counter */}
        {hasMultiple && (
          <div className="absolute top-4 right-4 z-30 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute right-2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white active:bg-white/40 transition-colors"
              aria-label="תמונה קודמת"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute left-2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white active:bg-white/40 transition-colors"
              aria-label="תמונה הבאה"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Media */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 w-[92vw] max-w-5xl flex items-center justify-center"
          style={{ height: "70dvh" }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {current.type === "video" ? (
            <video
              src={current.src}
              className="max-w-full max-h-full rounded-lg"
              controls
              autoPlay
              aria-label={current.alt}
            />
          ) : (
            <>
              {/* Blurry CDN image shown instantly while optimized version loads */}
              {!imageLoaded && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-contain scale-110 blur-xl opacity-70 pointer-events-none"
                  />
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="w-9 h-9 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  </div>
                </>
              )}
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className={`object-contain transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="92vw"
                priority
                onLoad={() => setImageLoaded(true)}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
