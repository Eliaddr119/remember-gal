import { apiFetch } from "@/lib/api-fetch";

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  caption: string;
}

export interface PostRow {
  id: number;
  image_url: string | null;
  title: string | null;
  content: string | null;
}

export async function getPosts(): Promise<Post[]> {
  const data = await apiFetch<PostRow[]>("/api/posts");

  return (data || []).map((row) => ({
    id: row.id,
    imageUrl: row.image_url || "",
    title: row.title || "",
    caption: row.content || "",
  }));
}
