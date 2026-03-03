"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import Field, { inputCls, textareaCls } from "./Field";
import ImageUpload from "./ImageUpload";

interface PostRow {
  title?: string | null;
  image_url?: string | null;
  content?: string | null;
}

interface Props {
  post: PostRow | null;
  isNew: boolean;
  postId: string;
}

export default function PostForm({ post, isNew, postId }: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [imageUrl, setImageUrl] = useState(post?.image_url ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleSave() {
    const payload = { title, image_url: imageUrl || null, content };
    const url = isNew ? "/api/posts" : `/api/posts/${postId}`;
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
    <FormShell backHref="/admin/posts" onSubmit={handleSave} disabled={uploading}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <Field label="כותרת">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>

        <Field label="תמונה">
          <div className="space-y-3">
            {imageUrl && (
              <div className="relative inline-block">
                <img src={imageUrl} alt="" className="h-40 rounded-lg object-cover border border-gray-200" />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-1 left-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-black"
                >
                  ×
                </button>
              </div>
            )}
            <ImageUpload
              onUpload={(url) => setImageUrl(url)}
              onUploadingChange={setUploading}
              bucket="images"
              folder="posts"
              label="העלאת תמונה"
            />
          </div>
        </Field>

        <Field label="תוכן הפוסט">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className={textareaCls} />
        </Field>
      </div>
    </FormShell>
  );
}
