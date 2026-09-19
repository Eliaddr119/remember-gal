import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";
import StoryCategoriesClient from "@/components/admin/StoryCategoriesClient";
import type { StoryCategory, StoryRow } from "@/lib/stories";

export default async function StoryCategoriesAdmin() {
  const [categories, stories] = await Promise.all([
    apiFetch<StoryCategory[]>("/api/story-categories"),
    apiFetch<StoryRow[]>("/api/stories"),
  ]);

  const counts: Record<number, number> = {};
  for (const story of stories ?? []) {
    if (story.category_id != null) {
      counts[story.category_id] = (counts[story.category_id] ?? 0) + 1;
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/stories" className="text-sm text-gray-500 hover:text-gray-700">
          → חזרה לסיפורים
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">קטגוריות סיפורים</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          הלשוניות שמופיעות בעמוד הסיפורים, לפי הסדר שלהן
        </p>
      </div>

      <StoryCategoriesClient categories={categories ?? []} counts={counts} />
    </div>
  );
}
