import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import StoriesAdminClient, { type AdminStoryRow } from "@/components/admin/StoriesAdminClient";
import type { StoryCategory } from "@/lib/stories";

export default async function StoriesAdmin() {
  const [stories, categories] = await Promise.all([
    apiFetch<AdminStoryRow[]>("/api/stories"),
    apiFetch<StoryCategory[]>("/api/story-categories"),
  ]);

  const list = stories ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">סיפורים</h1>
          <p className="text-sm text-gray-500 mt-0.5">{list.length} סיפורים</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/stories/categories"
            className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            קטגוריות
          </Link>
          <Link
            href="/admin/stories/new"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            + סיפור חדש
          </Link>
        </div>
      </div>

      <StoriesAdminClient stories={list} categories={categories ?? []} />
    </div>
  );
}
