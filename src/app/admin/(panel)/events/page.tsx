import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

interface EventRow {
  id: string;
  title: string;
  date: string | null;
  photos: unknown;
}

export default async function EventsAdmin() {
  const events = await apiFetch<EventRow[]>("/api/events") ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">אירועים</h1>
          <p className="text-sm text-gray-500 mt-0.5">{events.length} אירועים</p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          + אירוע חדש
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {events.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">אין אירועים עדיין</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">כותרת</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">תאריך</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">תמונות</th>
                <th className="px-5 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{event.title}</td>
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{event.date}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">
                    {Array.isArray(event.photos) ? event.photos.length : 0} תמונות
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-3 justify-end items-center">
                      <Link href={`/admin/events/${event.id}`} className="text-orange-600 hover:text-orange-800 text-sm">ערוך</Link>
                      <DeleteButton id={String(event.id)} resource="events" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
