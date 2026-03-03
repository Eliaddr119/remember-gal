import { apiFetch } from "@/lib/api-fetch";
import PostForm from "@/components/admin/PostForm";
import type { PostRow } from "@/lib/posts";

export default async function PostEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const post = isNew ? null : await apiFetch<PostRow>(`/api/posts/${params.id}`);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isNew ? "פוסט חדש" : "עריכת פוסט"}
      </h1>
      <PostForm post={post} isNew={isNew} postId={params.id} />
    </div>
  );
}
