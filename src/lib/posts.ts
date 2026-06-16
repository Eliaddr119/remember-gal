import { apiFetch } from "@/lib/api-fetch";
import { withCache } from "@/lib/cache";

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  caption: string;
  mediaType: "image" | "video";
}

export interface PostRow {
  id: number;
  image_url: string | null;
  title: string | null;
  content: string | null;
}

function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|avi|mkv)(\?.*)?$/i.test(url);
}

export async function getPosts(): Promise<Post[]> {
  return withCache("posts", async () => {
    const data = await apiFetch<PostRow[]>("/api/posts", { revalidate: 300 });
    return (data || []).map((row) => {
      const imageUrl = row.image_url || "";
      return {
        id: row.id,
        imageUrl,
        title: row.title || "",
        caption: row.content || "",
        mediaType: isVideoUrl(imageUrl) ? "video" : "image",
      };
    });
  });
}
