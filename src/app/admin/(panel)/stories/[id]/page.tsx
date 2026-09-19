import { apiFetch } from "@/lib/api-fetch";
import StoryForm from "@/components/admin/StoryForm";
import type { StoryRow, StoryCategory } from "@/lib/stories";

export default async function StoryEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const [story, categories] = await Promise.all([
    isNew ? null : apiFetch<StoryRow>(`/api/stories/${params.id}`),
    apiFetch<StoryCategory[]>("/api/story-categories"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isNew ? "סיפור חדש" : "עריכת סיפור"}
      </h1>
      <StoryForm story={story} isNew={isNew} storyId={params.id} categories={categories ?? []} />
    </div>
  );
}
