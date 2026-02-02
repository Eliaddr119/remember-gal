"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "@/hooks/useAccessibility";

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    fontSize,
    highContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    announce,
  } = useAccessibility();

  const fontSizeLabels: Record<string, string> = {
    small: "קטן",
    normal: "רגיל",
    large: "גדול",
    xlarge: "גדול מאוד",
  };

  // Handle keyboard navigation and close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleIncreaseFontSize = () => {
    increaseFontSize();
    const nextSizeIndex = Math.min(
      ["small", "normal", "large", "xlarge"].indexOf(fontSize) + 1,
      3
    );
    const nextSize = ["small", "normal", "large", "xlarge"][nextSizeIndex];
    announce(`גודל טקסט: ${fontSizeLabels[nextSize]}`);
  };

  const handleDecreaseFontSize = () => {
    decreaseFontSize();
    const nextSizeIndex = Math.max(
      ["small", "normal", "large", "xlarge"].indexOf(fontSize) - 1,
      0
    );
    const nextSize = ["small", "normal", "large", "xlarge"][nextSizeIndex];
    announce(`גודל טקסט: ${fontSizeLabels[nextSize]}`);
  };

  const handleToggleHighContrast = () => {
    toggleHighContrast();
    announce(highContrast ? "ניגודיות גבוהה: כבוי" : "ניגודיות גבוהה: פעיל");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" ref={menuRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            role="dialog"
            aria-label="הגדרות נגישות"
            aria-modal="true"
            className="absolute bottom-16 left-0 bg-ivory-50 rounded-xl shadow-warm-lg p-5 min-w-[220px] border border-earth-200"
          >
            <h3 id="accessibility-title" className="font-bold text-earth-700 mb-4 text-lg">נגישות</h3>

            <div className="space-y-5">
              {/* Font Size Controls */}
              <fieldset>
                <legend className="text-sm text-earth-500 mb-3">גודל טקסט</legend>
                <div className="flex items-center gap-3" role="group" aria-label="שליטה בגודל טקסט">
                  <button
                    onClick={handleDecreaseFontSize}
                    className="w-10 h-10 rounded-full bg-ivory-200 hover:bg-sunflower-200 border border-earth-300 flex items-center justify-center text-lg font-bold text-earth-700 transition-colors"
                    aria-label="הקטן טקסט"
                    disabled={fontSize === "small"}
                    aria-disabled={fontSize === "small"}
                  >
                    א-
                  </button>
                  <span
                    className="text-sm flex-1 text-center text-earth-600 font-medium"
                    aria-live="polite"
                  >
                    {fontSizeLabels[fontSize]}
                  </span>
                  <button
                    onClick={handleIncreaseFontSize}
                    className="w-10 h-10 rounded-full bg-ivory-200 hover:bg-sunflower-200 border border-earth-300 flex items-center justify-center text-lg font-bold text-earth-700 transition-colors"
                    aria-label="הגדל טקסט"
                    disabled={fontSize === "xlarge"}
                    aria-disabled={fontSize === "xlarge"}
                  >
                    א+
                  </button>
                </div>
              </fieldset>

              {/* High Contrast Toggle */}
              <div>
                <button
                  onClick={handleToggleHighContrast}
                  className={`w-full py-2.5 px-4 rounded-lg border transition-all duration-200 ${
                    highContrast
                      ? "bg-earth-700 text-ivory-50 border-earth-700"
                      : "bg-ivory-200 hover:bg-sunflower-200 border-earth-300 text-earth-700"
                  }`}
                  aria-pressed={highContrast}
                  role="switch"
                  aria-checked={highContrast}
                >
                  {highContrast ? "ניגודיות גבוהה: פעיל" : "ניגודיות גבוהה"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-earth-600 to-earth-700 hover:from-earth-500 hover:to-earth-600 text-ivory-50 shadow-warm-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
        aria-label={isOpen ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 12.5c0 .28-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5H10v-4.5H9c-.28 0-.5-.22-.5-.5v-1c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V16h1.5c.28 0 .5.22.5.5v1z" />
        </svg>
      </button>
    </div>
  );
}
