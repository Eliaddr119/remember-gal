import sql from "@/lib/db";
import { remark } from "remark";
import html from "remark-html";

export interface Story {
  id: number;
  author: string;
  relation: string;
  contentHtml: string;
  date: string;
}

export interface StoryRow {
  id: number;
  author: string;
  relation: string | null;
  date: string | null;
  content_html: string | null;
  content_markdown: string | null;
}

export async function getStories(): Promise<Story[]> {
  const rows = await sql`SELECT * FROM stories ORDER BY id ASC`;
  return Promise.all(
    rows.map(async (row) => {
      let contentHtml = row.content_html || "";
      if (!contentHtml && row.content_markdown) {
        const processed = await remark().use(html).process(row.content_markdown);
        contentHtml = processed.toString();
      }
      return {
        id: row.id,
        author: row.author,
        relation: row.relation || "",
        date: row.date || "",
        contentHtml,
      };
    })
  );
}
