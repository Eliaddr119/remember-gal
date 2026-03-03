"use client";

import { useState, useRef, DragEvent } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  bucket?: string;
  folder?: string;
  label?: string;
}

export default function ImageUpload({
  onUpload,
  onUploadingChange,
  bucket = "images",
  folder = "",
  label = "העלאת תמונה",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("נא לבחור קובץ תמונה בלבד");
      return;
    }
    setUploading(true);
    onUploadingChange?.(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "שגיאה בהעלאה");
      onUpload(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה בהעלאה");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer transition-colors text-sm
          ${dragging ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 bg-gray-50"}`}
      >
        {uploading ? (
          <span className="text-gray-500">מעלה...</span>
        ) : (
          <>
            <span className="text-gray-400 text-xl">☁</span>
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-400 text-xs">גרור לכאן או לחץ לבחירה</span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1 p-2 bg-red-50 rounded">{error}</p>
      )}
    </div>
  );
}
