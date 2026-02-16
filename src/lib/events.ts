import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  photos: string[];
  videos: string[];
}

const eventsDirectory = path.join(process.cwd(), "content/events");

export function getEvents(): Event[] {
  const fileNames = fs.readdirSync(eventsDirectory);

  const events = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id as string,
        title: data.title as string,
        date: data.date as string,
        time: (data.time as string) || "",
        location: (data.location as string) || "",
        description: content.trim(),
        photos: Array.isArray(data.photos) ? (data.photos as string[]) : [],
        videos: Array.isArray(data.videos) ? (data.videos as string[]) : [],
      };
    });

  // Sort by date descending (newest first)
  events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return events;
}
