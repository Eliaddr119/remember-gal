"use client";

import { useState } from "react";
import Link from "next/link";
import FormShell from "./FormShell";
import Field, { inputCls, textareaCls } from "./Field";
import type { StoryCategory } from "@/lib/stories";

interface StoryRow {
  author?: string | null;
  relation?: string | null;
  date?: string | null;
  content_markdown?: string | null;
  category_id?: number | null;
}

interface Props {
  story: StoryRow | null;
  isNew: boolean;
  storyId: string;
  categories: StoryCategory[];
}

export default function StoryForm({ story, isNew, storyId, categories }: Props) {
  const [author, setAuthor] = useState(story?.author ?? "");
  const [relation, setRelation] = useState(story?.relation ?? "");
  const [date, setDate] = useState(story?.date ?? "");
  const [categoryId, setCategoryId] = useState(
    story?.category_id != null ? String(story.category_id) : ""
  );
  const [content, setContent] = useState(story?.content_markdown ?? "");

  async function handleSave() {
    const payload = {
      author,
      relation,
      date: date || null,
      category_id: categoryId ? Number(categoryId) : null,
      content_markdown: content,
      content_html: "",
    };
    const url = isNew ? "/api/stories" : `/api/stories/${storyId}`;
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { error: data.error || "שגיאה בשמירה" };
    }
    return {};
  }

  return (
    <FormShell backHref="/admin/stories" onSubmit={handleSave}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="שם המחבר">
            <input value={author} onChange={(e) => setAuthor(e.target.value)} required className={inputCls} />
          </Field>
          <Field label="קשר לגל" hint="לדוגמה: חברה מהצבא">
            <input value={relation} onChange={(e) => setRelation(e.target.value)} className={inputCls} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="תאריך" hint="לדוגמה: 2025">
            <input value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </Field>
          <Field label="קטגוריה">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className={inputCls}
            >
              <option value="">ללא קטגוריה</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Link
              href="/admin/stories/categories"
              className="inline-block mt-1.5 text-xs text-orange-600 hover:text-orange-800"
            >
              ניהול קטגוריות ←
            </Link>
          </Field>
        </div>
        <Field label="תוכן הסיפור" hint="Markdown נתמך">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            className={textareaCls + " font-mono text-xs leading-relaxed"}
          />
        </Field>
      </div>
    </FormShell>
  );
}
