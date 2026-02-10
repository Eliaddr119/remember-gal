import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Story {
  id: number;
  author: string;
  relation: string;
  contentHtml: string;
  date: string;
}

const storiesDirectory = path.join(process.cwd(), "content/stories");

export async function getStories(): Promise<Story[]> {
  const fileNames = fs.readdirSync(storiesDirectory);

  const stories = await Promise.all(
    fileNames
      .filter((name) => name.endsWith(".md"))
      .map(async (fileName) => {
        const filePath = path.join(storiesDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        const processed = await remark().use(html).process(content);
        const contentHtml = processed.toString();

        return {
          id: data.id as number,
          author: data.author as string,
          relation: data.relation as string,
          date: data.date as string,
          contentHtml,
        };
      })
  );

  return stories.sort((a, b) => a.id - b.id);
}
