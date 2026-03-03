"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import Field, { inputCls, textareaCls } from "./Field";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

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

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i.test(url);
}

export default function PostForm({ post, isNew, postId }: Props) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [mediaUrl, setMediaUrl] = useState(post?.image_url ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleSave() {
    const payload = { title, image_url: mediaUrl || null, content };
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

  const hasVideo = mediaUrl && isVideoUrl(mediaUrl);
  const hasImage = mediaUrl && !hasVideo;

  return (
    <FormShell backHref="/admin/posts" onSubmit={handleSave} disabled={uploading}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <Field label="כותרת">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </Field>

        <Field label="מדיה (תמונה או סרטון)">
          <div className="space-y-3">
            {hasImage && (
              <div className="relative inline-block">
                <img src={mediaUrl} alt="" className="h-40 rounded-lg object-cover border border-gray-200" />
                <button
                  type="button"
                  onClick={() => setMediaUrl("")}
                  className="absolute top-1 left-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-black"
                >
                  ×
                </button>
              </div>
            )}
            {hasVideo && (
              <div className="relative group border border-gray-200 rounded-lg overflow-hidden bg-black">
                <video src={mediaUrl} controls preload="metadata" className="w-full max-h-64 object-contain" />
                <button
                  type="button"
                  onClick={() => setMediaUrl("")}
                  className="absolute top-2 left-2 bg-black/60 text-white rounded-full w-7 h-7 text-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
            {!mediaUrl && (
              <div className="grid grid-cols-2 gap-3">
                <ImageUpload
                  onUpload={setMediaUrl}
                  onUploadingChange={setUploading}
                  bucket="images"
                  folder="posts"
                  label="העלאת תמונה"
                />
                <VideoUpload
                  onUpload={setMediaUrl}
                  onUploadingChange={setUploading}
                  bucket="images"
                  folder="posts"
                />
              </div>
            )}
          </div>
        </Field>

        <Field label="תוכן הפוסט">
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className={textareaCls} />
        </Field>
      </div>
    </FormShell>
  );
}
