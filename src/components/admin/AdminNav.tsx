"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "לוח בקרה", icon: "⊞" },
  { href: "/admin/stories", label: "סיפורים", icon: "✍" },
  { href: "/admin/posts", label: "פוסטים", icon: "📝" },
  { href: "/admin/events", label: "אירועים", icon: "📅" },
  { href: "/admin/traveling-hat", label: "הכובע מטייל", icon: "🗺" },
  { href: "/admin/gallery", label: "גלריה", icon: "🖼" },
];

export default function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <nav className="bg-white border-l border-gray-200 w-52 min-h-screen flex flex-col shadow-sm">
      <div className="px-4 py-5 border-b border-gray-100">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">ממשק ניהול</p>
      </div>

      <ul className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors
                ${isActive(item.href)
                  ? "bg-orange-50 text-orange-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-3 border-t border-gray-100">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-50 mb-1"
        >
          <span>↗</span> צפה באתר
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-500 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <span>←</span> התנתק
        </button>
      </div>
    </nav>
  );
}
