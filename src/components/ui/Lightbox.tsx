"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const hasMultiple = images.length > 1;
  const touchStartX = useRef<number | null>(null);
  const scrollY = useRef(0);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

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

    // iOS-safe scroll lock: fix the body in place
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

  // Swipe handlers — only for the image area
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (diff > threshold) {
      goPrev();
    } else if (diff < -threshold) {
      goNext();
    }
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
        <div
          className="absolute inset-0 bg-earth-900/90"
          aria-hidden="true"
        />

        {/* Close button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 left-3 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white/20 text-white active:bg-white/40 transition-colors"
          aria-label="סגור תצוגה"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-7 h-7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute left-2 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white active:bg-white/40 transition-colors"
              aria-label="תמונה הבאה"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-7 h-7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </>
        )}

        {/* Image — tapping the image area does NOT close the lightbox, swipe navigates */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative z-20 w-[92vw] max-w-5xl"
          style={{ height: "70dvh" }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="92vw"
            priority
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
