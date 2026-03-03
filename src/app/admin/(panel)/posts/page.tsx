import { apiFetch } from "@/lib/api-fetch";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

interface PostRow {
  id: number;
  title: string | null;
  image_url: string | null;
}

export default async function PostsAdmin() {
  const posts = await apiFetch<PostRow[]>("/api/posts") ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">פוסטים</h1>
          <p className="text-sm text-gray-500 mt-0.5">{posts.length} פוסטים</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
        >
          + פוסט חדש
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {posts.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-sm">אין פוסטים עדיין</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase w-14">תמונה</th>
                <th className="text-right px-5 py-3 text-gray-500 font-medium text-xs uppercase">כותרת</th>
                <th className="px-5 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    {post.image_url ? (
                      <img src={post.image_url} alt="" className="w-10 h-10 object-cover rounded-lg" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                    )}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-800">{post.title || <span className="text-gray-400 italic">ללא כותרת</span>}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-3 justify-end items-center">
                      <Link href={`/admin/posts/${post.id}`} className="text-orange-600 hover:text-orange-800 text-sm">ערוך</Link>
                      <DeleteButton id={String(post.id)} resource="posts" />
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
