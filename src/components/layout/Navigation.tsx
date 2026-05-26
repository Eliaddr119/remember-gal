"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/navigation";

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export function Navigation({ className = "", onItemClick }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="ניווט ראשי">
      <ul className="flex items-center gap-0.5 xl:gap-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className={`whitespace-nowrap text-sm xl:text-base px-2 xl:px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-earth-700 text-ivory-50 shadow-warm"
                    : "text-earth-700 hover:bg-sunflower-300/50 hover:text-earth-800"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
