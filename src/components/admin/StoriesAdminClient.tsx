"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteButton from "./DeleteButton";
import type { StoryCategory } from "@/lib/stories";

export interface AdminStoryRow {
  id: number;
  author: string;
  relation: string | null;
  date: string | null;
  category_id: number | null;
}

const UNCATEGORIZED = "none";

interface Props {
  /** already in display order (sort_order, then id) */
  stories: AdminStoryRow[];
  categories: StoryCategory[];
}

export default function StoriesAdminClient({ stories, categories }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(stories);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Optimistic reorders are replaced by server truth once router.refresh() lands.
  useEffect(() => setItems(stories), [stories]);

  const groups = useMemo(() => {
    const known = new Set(categories.map((c) => c.id));
    const byKey = new Map<string, AdminStoryRow[]>();
    for (const story of items) {
      const key =
        story.category_id && known.has(story.category_id)
          ? String(story.category_id)
          : UNCATEGORIZED;
      const bucket = byKey.get(key);
      if (bucket) bucket.push(story);
      else byKey.set(key, [story]);
    }

    const ordered = categories
      .filter((c) => byKey.has(String(c.id)))
      .map((c) => ({ key: String(c.id), label: c.name, rows: byKey.get(String(c.id))! }));

    const loose = byKey.get(UNCATEGORIZED);
    if (loose) ordered.push({ key: UNCATEGORIZED, label: "ללא קטגוריה", rows: loose });

    return ordered;
  }, [items, categories]);

  /** Swap two stories inside one category and persist the whole list's order. */
  async function move(groupKey: string, index: number, direction: -1 | 1) {
    const group = groups.find((g) => g.key === groupKey);
    if (!group) return;
    const target = index + direction;
    if (target < 0 || target >= group.rows.length) return;

    const swapped = [...group.rows];
    [swapped[index], swapped[target]] = [swapped[target], swapped[index]];

    // Rebuild the flat list with this group's new internal order.
    const next = groups.flatMap((g) => (g.key === groupKey ? swapped : g.rows));
    setItems(next);

    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/stories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: next.map((s) => s.id) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `שגיאה (${res.status})`);
      }
      router.refresh();
    } catch (e) {
      setItems(stories); // put the optimistic swap back
      setError(e instanceof Error ? e.message : "שגיאה בשמירת הסדר");
    } finally {
      setBusy(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400 text-sm">
        אין סיפורים עדיין
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {groups.map((group) => (
        <div key={group.key} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-700">{group.label}</h2>
            <span className="text-xs text-gray-400">{group.rows.length} סיפורים</span>
          </div>

          <ul className="divide-y divide-gray-100">
            {group.rows.map((story, index) => (
              <li key={story.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => move(group.key, index, -1)}
                    disabled={busy || index === 0}
                    aria-label={`העבר את הסיפור של ${story.author} למעלה`}
                    className="w-6 h-5 rounded border border-gray-200 text-gray-500 text-xs leading-none hover:bg-gray-100 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => move(group.key, index, 1)}
                    disabled={busy || index === group.rows.length - 1}
                    aria-label={`העבר את הסיפור של ${story.author} למטה`}
                    className="w-6 h-5 rounded border border-gray-200 text-gray-500 text-xs leading-none hover:bg-gray-100 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>

                <span className="text-xs text-gray-400 w-5 text-center shrink-0">{index + 1}</span>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{story.author}</p>
                  {story.relation && (
                    <p className="text-xs text-gray-500 truncate">{story.relation}</p>
                  )}
                </div>

                <span className="text-xs text-gray-400 shrink-0">{story.date}</span>

                <div className="flex gap-3 items-center shrink-0">
                  <Link
                    href={`/admin/stories/${story.id}`}
                    className="text-orange-600 hover:text-orange-800 text-sm"
                  >
                    ערוך
                  </Link>
                  <DeleteButton id={String(story.id)} resource="stories" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="text-xs text-gray-500">
        החיצים משנים את סדר הסיפורים בתוך הקטגוריה — זהו הסדר שיוצג באתר.
        כדי להעביר סיפור לקטגוריה אחרת, ערכו אותו ובחרו קטגוריה.
      </p>
    </div>
  );
}
