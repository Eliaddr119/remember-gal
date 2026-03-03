import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

interface PinRow {
  id: string;
  title: string;
  photographer: string | null;
  image_urls: unknown;
}

export default async function TravelingHatAdmin() {
  const pins = await apiFetch<PinRow[]>("/api/traveling-hat") ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">הכובע מטייל</h1>
          <p className="text-sm text-gray-500 mt-0.5">{pins.length} מסעות</p>
        </div>
        <Link
          href="/admin/traveling-hat/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          + מסע חדש
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {pins.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">אין מסעות עדיין</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase w-14">תמונה</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">כותרת</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">צלם</th>
                <th className="px-5 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pins.map((pin) => {
                const thumb = Array.isArray(pin.image_urls) ? (pin.image_urls as string[])[0] : null;
                return (
                  <tr key={pin.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      {thumb ? (
                        <img src={thumb} alt="" className="w-10 h-10 object-cover rounded-lg" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-800">{pin.title}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{pin.photographer}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-3 justify-end items-center">
                        <Link href={`/admin/traveling-hat/${pin.id}`} className="text-orange-600 hover:text-orange-800 text-sm">ערוך</Link>
                        <DeleteButton id={String(pin.id)} resource="traveling-hat" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
