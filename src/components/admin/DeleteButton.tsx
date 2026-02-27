"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({
  id,
  resource,
}: {
  id: string;
  resource: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/${resource}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = res.status === 204 ? null : await res.json().catch(() => null);
        throw new Error(data?.error || `שגיאה (${res.status})`);
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה במחיקה");
      setLoading(false);
      setConfirming(false);
    }
  }

  if (error) {
    return (
      <span className="text-xs text-red-500 flex items-center gap-1">
        {error}
        <button onClick={() => setError("")} className="underline">סגור</button>
      </span>
    );
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded disabled:opacity-50"
        >
          {loading ? "..." : "אישור"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-500 hover:text-gray-700 px-2 py-0.5 rounded border border-gray-200"
        >
          ביטול
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-red-500 hover:text-red-700 text-sm"
    >
      מחק
    </button>
  );
}
