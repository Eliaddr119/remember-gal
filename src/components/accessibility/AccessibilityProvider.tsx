"use client";

import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import {
  ACCESSIBILITY_STORAGE_KEY,
  FONT_SIZES,
  FontSize,
} from "@/lib/constants";

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
}

interface AccessibilityContextType extends AccessibilityState {
  setFontSize: (size: FontSize) => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  announce: (message: string) => void;
}

const defaultState: AccessibilityState = {
  fontSize: "normal",
  highContrast: false,
};

export const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

const fontSizeOrder: FontSize[] = ["small", "normal", "large", "xlarge"];

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<AccessibilityState>(defaultState);
  const [mounted, setMounted] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const announcementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(ACCESSIBILITY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState(parsed);
      } catch {
        // Invalid stored data, use defaults
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(state));

    // Apply font scale
    document.documentElement.style.setProperty(
      "--font-scale",
      String(FONT_SIZES[state.fontSize])
    );

    // Apply high contrast
    if (state.highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [state, mounted]);

  const setFontSize = useCallback((size: FontSize) => {
    setState((prev) => ({ ...prev, fontSize: size }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setState((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const increaseFontSize = useCallback(() => {
    setState((prev) => {
      const currentIndex = fontSizeOrder.indexOf(prev.fontSize);
      const nextIndex = Math.min(currentIndex + 1, fontSizeOrder.length - 1);
      return { ...prev, fontSize: fontSizeOrder[nextIndex] };
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setState((prev) => {
      const currentIndex = fontSizeOrder.indexOf(prev.fontSize);
      const nextIndex = Math.max(currentIndex - 1, 0);
      return { ...prev, fontSize: fontSizeOrder[nextIndex] };
    });
  }, []);

  const announce = useCallback((message: string) => {
    if (announcementTimeoutRef.current) {
      clearTimeout(announcementTimeoutRef.current);
    }
    setAnnouncement("");
    announcementTimeoutRef.current = setTimeout(() => {
      setAnnouncement(message);
    }, 100);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        setFontSize,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
        announce,
      }}
    >
      {children}
      {/* Screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </AccessibilityContext.Provider>
  );
}
