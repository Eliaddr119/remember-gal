"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { StoryCategory } from "@/lib/stories";
import { inputCls } from "./Field";

interface Props {
  categories: StoryCategory[];
  /** category id → number of stories using it */
  counts: Record<number, number>;
}

export default function StoryCategoriesClient({ categories, counts }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(categories);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  // Optimistic edits above are replaced by server truth once router.refresh() lands.
  useEffect(() => setItems(categories), [categories]);

  async function send(url: string, method: string, body?: unknown) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const data = res.status === 204 ? null : await res.json().catch(() => null);
        throw new Error(data?.error || `שגיאה (${res.status})`);
      }
      router.refresh();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function handleAdd() {
    const name = newName.trim();
    if (!name) return;
    if (await send("/api/story-categories", "POST", { name })) setNewName("");
  }

  async function handleRename(id: number) {
    const name = editingName.trim();
    setEditingId(null);
    const current = items.find((c) => c.id === id);
    if (!name || name === current?.name) return;
    setItems(items.map((c) => (c.id === id ? { ...c, name } : c)));
    await send(`/api/story-categories/${id}`, "PUT", { name });
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next); // optimistic — the tab row reorders immediately
    await send("/api/story-categories", "PUT", { order: next.map((c) => c.id) });
  }

  async function handleDelete(id: number) {
    setConfirmDelete(null);
    setItems(items.filter((c) => c.id !== id));
    await send(`/api/story-categories/${id}`, "DELETE");
  }

  return (
    <div className="space-y-5 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {items.length === 0 ? (
          <div className="py-14 text-center text-gray-400 text-sm">אין קטגוריות עדיין</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((cat, index) => (
              <li key={cat.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={busy || index === 0}
                    aria-label={`העבר את ${cat.name} למעלה`}
                    className="w-6 h-5 rounded border border-gray-200 text-gray-500 text-xs leading-none hover:bg-gray-50 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={busy || index === items.length - 1}
                    aria-label={`העבר את ${cat.name} למטה`}
                    className="w-6 h-5 rounded border border-gray-200 text-gray-500 text-xs leading-none hover:bg-gray-50 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>

                <span className="text-xs text-gray-400 w-5 text-center">{index + 1}</span>

                <div className="flex-1 min-w-0">
                  {editingId === cat.id ? (
                    <input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onBlur={() => handleRename(cat.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(cat.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      className={inputCls}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(cat.id);
                        setEditingName(cat.name);
                      }}
                      className="text-right font-medium text-gray-800 hover:text-orange-700"
                    >
                      {cat.name}
                    </button>
                  )}
                </div>

                <span className="text-xs text-gray-400 shrink-0">
                  {counts[cat.id] ?? 0} סיפורים
                </span>

                {confirmDelete === cat.id ? (
                  <span className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDelete(cat.id)}
                      className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded"
                    >
                      אישור
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(null)}
                      className="text-xs text-gray-500 px-2 py-0.5 rounded border border-gray-200"
                    >
                      ביטול
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(cat.id)}
                    className="text-red-500 hover:text-red-700 text-sm shrink-0"
                  >
                    מחק
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">קטגוריה חדשה</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="לדוגמה: הלוויה"
            className={inputCls}
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={busy || !newName.trim()}
          className="bg-orange-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          הוסף
        </button>
      </div>

      <p className="text-xs text-gray-500">
        הסדר כאן הוא הסדר של הלשוניות בעמוד הסיפורים. לחיצה על שם קטגוריה מאפשרת לשנות אותו.
        מחיקת קטגוריה לא מוחקת סיפורים — הם פשוט יעברו ללשונית &rdquo;אחר&ldquo;.
      </p>
    </div>
  );
}
