"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import Field, { inputCls, textareaCls } from "./Field";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";

interface EventRow {
  title?: string | null;
  date?: string | null;
  time?: string | null;
  location?: string | null;
  description?: string | null;
  photos?: unknown;
  videos?: unknown;
}

interface Props {
  event: EventRow | null;
  isNew: boolean;
  eventId: string;
}

export default function EventForm({ event, isNew, eventId }: Props) {
  const [id, setId] = useState(isNew ? "" : eventId);
  const [title, setTitle] = useState(event?.title ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [time, setTime] = useState(event?.time ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [photos, setPhotos] = useState<string[]>(
    Array.isArray(event?.photos) ? (event.photos as string[]) : []
  );
  const [videos, setVideos] = useState<string[]>(
    Array.isArray(event?.videos) ? (event.videos as string[]) : []
  );
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  async function handleSave() {
    const payload = {
      ...(isNew ? { id } : {}),
      title,
      date: date || null,
      time: time || null,
      location: location || null,
      description,
      photos,
      videos,
    };
    const url = isNew ? "/api/events" : `/api/events/${eventId}`;
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
    <FormShell backHref="/admin/events" onSubmit={handleSave} disabled={uploading || uploadingVideo}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {isNew && (
          <Field label="מזהה" hint="slug, לדוגמה: costume-fair">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="costume-fair"
              className={inputCls}
              style={{ maxWidth: 260 }}
            />
          </Field>
        )}

        <Field label="כותרת">
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="תאריך">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </Field>
          <Field label="שעה">
            <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="10:00" className={inputCls} />
          </Field>
          <Field label="מיקום">
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} />
          </Field>
        </div>

        <Field label="תיאור">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={textareaCls} />
        </Field>

        <Field label="תמונות">
          <div className="space-y-3">
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((p, i) => (
                  <div key={i} className="relative group">
                    <img src={p} alt="" className="h-20 w-20 object-cover rounded-lg border border-gray-200" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                      className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs items-center justify-center hidden group-hover:flex hover:bg-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <ImageUpload
              onUpload={(url) => setPhotos([...photos, url])}
              onUploadingChange={setUploading}
              bucket="images"
              folder="events"
              label="הוסף תמונה"
            />
          </div>
        </Field>

        <Field label="סרטונים">
          <div className="space-y-3">
            {videos.length > 0 && (
              <div className="flex flex-col gap-3">
                {videos.map((v, i) => (
                  <div key={i} className="relative group border border-gray-200 rounded-lg overflow-hidden bg-black">
                    <video
                      src={v}
                      controls
                      preload="metadata"
                      className="w-full max-h-64 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setVideos(videos.filter((_, j) => j !== i))}
                      className="absolute top-2 left-2 bg-black/60 text-white rounded-full w-7 h-7 text-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <VideoUpload
              onUpload={(url) => setVideos((prev) => [...prev, url])}
              onUploadingChange={setUploadingVideo}
              bucket="images"
              folder="events"
            />
          </div>
        </Field>
      </div>
    </FormShell>
  );
}
