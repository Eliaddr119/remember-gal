import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MapPin {
  id: string;
  title: string;
  coordinates: [number, number];
  imageUrls: string[];
  description: string;
  photographer: string;
  photographerRelation: string;
}

const pinsDirectory = path.join(process.cwd(), "content/traveling-hat");

export function getPins(): MapPin[] {
  const fileNames = fs.readdirSync(pinsDirectory);

  const pins = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(pinsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      // Support both imageUrls (array) and legacy imageUrl (string)
      let imageUrls: string[] = [];
      if (Array.isArray(data.imageUrls)) {
        imageUrls = data.imageUrls as string[];
      } else if (data.imageUrl) {
        imageUrls = [data.imageUrl as string];
      }

      return {
        id: data.id as string,
        title: data.title as string,
        coordinates: data.coordinates as [number, number],
        imageUrls,
        photographer: (data.photographer as string) || "",
        photographerRelation: (data.photographerRelation as string) || "",
        description: content.trim(),
      };
    });

  return pins;
}
