"use client";

import { useState } from "react";
import FormShell from "./FormShell";
import Field, { inputCls, textareaCls } from "./Field";
import ImageUpload from "./ImageUpload";

interface PinRow {
  id?: string;
  title?: string;
  lat?: number | string | null;
  lng?: number | string | null;
  image_urls?: unknown;
  photographer?: string | null;
  photographer_relation?: string | null;
  description?: string | null;
}

interface Props {
  pin: PinRow | null;
  isNew: boolean;
  pinId: string; // the actual ID from URL params (for PUT)
}

export default function TravelingHatForm({ pin, isNew, pinId }: Props) {
  const [id, setId] = useState(isNew ? "" : pinId);
  const [title, setTitle] = useState(pin?.title ?? "");
  const [lat, setLat] = useState(pin?.lat != null ? String(pin.lat) : "");
  const [lng, setLng] = useState(pin?.lng != null ? String(pin.lng) : "");
  const [imageUrls, setImageUrls] = useState<string[]>(
    Array.isArray(pin?.image_urls) ? (pin.image_urls as string[]) : []
  );
  const [photographer, setPhotographer] = useState(pin?.photographer ?? "");
  const [photographerRelation, setPhotographerRelation] = useState(
    pin?.photographer_relation ?? ""
  );
  const [description, setDescription] = useState(pin?.description ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleSave() {
    const payload = {
      ...(isNew ? { id } : {}),
      title,
      lat: parseFloat(lat) || 0,
      lng: parseFloat(lng) || 0,
      image_urls: imageUrls,
      photographer,
      photographer_relation: photographerRelation,
      description,
    };
    const url = isNew ? "/api/traveling-hat" : `/api/traveling-hat/${pinId}`;
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
    <FormShell backHref="/admin/traveling-hat" onSubmit={handleSave} disabled={uploading}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {isNew && (
          <Field label="מזהה" hint="slug, לדוגמה: eilat">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              placeholder="eilat"
              className={inputCls}
              style={{ maxWidth: 200 }}
            />
          </Field>
        )}

        <Field label="כותרת המיקום">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="קו רוחב (lat)">
            <input
              type="number"
              step="any"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              required
              className={inputCls}
              placeholder="29.5577"
            />
          </Field>
          <Field label="קו אורך (lng)">
            <input
              type="number"
              step="any"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              required
              className={inputCls}
              placeholder="34.9519"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="שם הצלם">
            <input
              value={photographer}
              onChange={(e) => setPhotographer(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="קשר הצלם לגל">
            <input
              value={photographerRelation}
              onChange={(e) => setPhotographerRelation(e.target.value)}
              className={inputCls}
              placeholder="חבר, אמא..."
            />
          </Field>
        </div>

        <Field label="תיאור">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={textareaCls}
          />
        </Field>

        <Field label="תמונות">
          <div className="space-y-3">
            {imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={url}
                      alt=""
                      className="h-20 w-20 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setImageUrls(imageUrls.filter((_, j) => j !== i))}
                      className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 text-xs items-center justify-center hidden group-hover:flex hover:bg-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <ImageUpload
              onUpload={(url) => setImageUrls([...imageUrls, url])}
              onUploadingChange={setUploading}
              bucket="images"
              folder="traveling-hat"
              label="הוסף תמונה"
            />
          </div>
        </Field>
      </div>
    </FormShell>
  );
}
