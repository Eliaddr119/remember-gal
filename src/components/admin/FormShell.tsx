"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  backHref: string;
  onSubmit: () => Promise<{ error?: string }>;
  children: React.ReactNode;
  submitLabel?: string;
  disabled?: boolean;
}

export default function FormShell({ backHref, onSubmit, children, submitLabel = "שמור", disabled = false }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const result = await onSubmit();

    if (result.error) {
      setError(result.error);
      setSaving(false);
    } else {
      setSuccess(true);
      router.refresh();
      setTimeout(() => router.push(backHref), 900);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {children}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          ✓ נשמר בהצלחה
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || success || disabled}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 disabled:opacity-50 transition-colors"
        >
          {success ? "✓ נשמר" : saving ? "שומר..." : disabled ? "מעלה תמונה..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push(backHref)}
          className="px-5 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
