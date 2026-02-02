"use client";

import Link from "next/link";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "../ui/Logo";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-sunflower-100 to-sunflower-200 border-b border-sunflower-300 shadow-warm" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo on the right (RTL) */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="לזכרה של גל חפץ ז״ל - חזרה לדף הבית">
            <Logo size="md" className="w-16 h-16 md:w-20 md:h-20 transition-transform group-hover:scale-105" />
            <span className="text-base md:text-lg font-bold text-earth-800 group-hover:text-earth-600 transition-colors" aria-hidden="true">
              לזכרה של גל חפץ ז״ל
            </span>
          </Link>

          {/* Desktop Navigation on the left (RTL) */}
          <Navigation className="hidden md:flex" />

          {/* Mobile Menu Button - shows on screens smaller than md (768px) */}
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
