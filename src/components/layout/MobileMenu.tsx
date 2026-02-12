"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navigation } from "./Navigation";
import { Logo } from "../ui/Logo";

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className = "" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={className}>
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-sunflower-300/50 transition-colors"
        aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="mobile-menu-panel"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-earth-700"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-earth-900/40 z-40 transition-opacity duration-200 ease-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal={isOpen}
        aria-label="תפריט ניווט"
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-ivory-50 to-ivory-200 shadow-warm-lg z-50 transition-transform duration-200 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header with logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={() => setIsOpen(false)} aria-label="חזרה לדף הבית">
              <Logo size="sm" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-sunflower-300/50 transition-colors"
              aria-label="סגור תפריט"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-earth-700"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-2 mb-6" aria-hidden="true">
            <span className="flex-1 h-px bg-gradient-to-r from-sunflower-400 to-transparent"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-sunflower-400"></span>
          </div>

          {/* Navigation */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-warm">
            <Navigation
              className="flex flex-col gap-1 mobile-nav"
              onItemClick={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
