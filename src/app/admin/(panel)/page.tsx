import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";

async function getCounts() {
  const [stories, posts, events, pins, gallery] = await Promise.all([
    apiFetch<unknown[]>("/api/stories"),
    apiFetch<unknown[]>("/api/posts"),
    apiFetch<unknown[]>("/api/events"),
    apiFetch<unknown[]>("/api/traveling-hat"),
    apiFetch<unknown[]>("/api/gallery"),
  ]);
  return {
    stories: stories?.length ?? 0,
    posts: posts?.length ?? 0,
    events: events?.length ?? 0,
    pins: pins?.length ?? 0,
    gallery: gallery?.length ?? 0,
  };
}

const sections = [
  { href: "/admin/stories", label: "סיפורים", icon: "✍", key: "stories" as const },
  { href: "/admin/posts", label: "פוסטים", icon: "📝", key: "posts" as const },
  { href: "/admin/events", label: "אירועים", icon: "📅", key: "events" as const },
  { href: "/admin/traveling-hat", label: "הכובע מטייל", icon: "🗺", key: "pins" as const },
  { href: "/admin/gallery", label: "גלריה", icon: "🖼", key: "gallery" as const },
];

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">לוח בקרה</h1>
      <p className="text-gray-500 text-sm mb-8">ברוך הבא לממשק ניהול האתר</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all group"
          >
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="text-2xl font-bold text-gray-800 mb-0.5">{counts[s.key]}</div>
            <div className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
