import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  id: number;
  imageUrl: string;
  title: string;
  caption: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id as number,
        imageUrl: data.imageUrl as string,
        title: (data.title as string) || "",
        caption: content.trim(),
      };
    });

  return posts.sort((a, b) => a.id - b.id);
}
