"use client";

import { useState, useRef } from "react";

interface VideoUploadProps {
  onUpload: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  bucket?: string;
  folder?: string;
}

export default function VideoUpload({
  onUpload,
  onUploadingChange,
  bucket = "images",
  folder = "",
}: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("video/")) {
      setError("נא לבחור קובץ וידאו בלבד");
      return;
    }
    if (file.size > 150 * 1024 * 1024) {
      setError("הסרטון חורג מ-150 MB");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError("");
    onUploadingChange?.(true);

    try {
      // 1. Get a signed upload URL from the server (no file bytes sent here)
      const res = await fetch("/api/upload/signed-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bucket, folder, filename: file.name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "שגיאה ביצירת כתובת העלאה");

      const { signedUrl, publicUrl } = json as { signedUrl: string; publicUrl: string };

      // 2. Upload directly from the browser to Supabase — bypasses Vercel's 4.5 MB limit
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", signedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error("שגיאה בהעלאת הסרטון")));
        xhr.onerror = () => reject(new Error("שגיאה בהעלאת הסרטון"));
        xhr.send(file);
      });

      onUpload(publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה בהעלאה");
    } finally {
      setUploading(false);
      setProgress(0);
      onUploadingChange?.(false);
    }
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center gap-1 border-2 border-dashed rounded-lg px-4 py-3 cursor-pointer transition-colors text-sm border-gray-300 hover:border-gray-400 bg-gray-50"
      >
        {uploading ? (
          <div className="w-full text-center space-y-1">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-gray-500 text-xs">מעלה... {progress}%</span>
          </div>
        ) : (
          <>
            <span className="text-gray-400 text-xl">🎬</span>
            <span className="text-gray-600 font-medium">הוסף סרטון</span>
            <span className="text-gray-400 text-xs">MP4, MOV, WEBM · עד 150 MB</span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1 p-2 bg-red-50 rounded">{error}</p>}
    </div>
  );
}
