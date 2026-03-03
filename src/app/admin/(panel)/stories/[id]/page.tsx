import { apiFetch } from "@/lib/api-fetch";
import StoryForm from "@/components/admin/StoryForm";
import type { StoryRow } from "@/lib/stories";

export default async function StoryEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const story = isNew ? null : await apiFetch<StoryRow>(`/api/stories/${params.id}`);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isNew ? "סיפור חדש" : "עריכת סיפור"}
      </h1>
      <StoryForm story={story} isNew={isNew} storyId={params.id} />
    </div>
  );
}
