import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

interface StoryRow {
  id: number;
  author: string;
  relation: string | null;
  date: string | null;
}

export default async function StoriesAdmin() {
  const stories = await apiFetch<StoryRow[]>("/api/stories") ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">סיפורים</h1>
          <p className="text-sm text-gray-500 mt-0.5">{stories.length} סיפורים</p>
        </div>
        <Link
          href="/admin/stories/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          + סיפור חדש
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {stories.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">אין סיפורים עדיין</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">מחבר</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">קשר</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">תאריך</th>
                <th className="px-5 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stories.map((story) => (
                <tr key={story.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{story.author}</td>
                  <td className="px-5 py-3.5 text-gray-500">{story.relation}</td>
                  <td className="px-5 py-3.5 text-gray-400 text-xs">{story.date}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-3 justify-end items-center">
                      <Link href={`/admin/stories/${story.id}`} className="text-orange-600 hover:text-orange-800 text-sm">
                        ערוך
                      </Link>
                      <DeleteButton id={String(story.id)} resource="stories" />
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
