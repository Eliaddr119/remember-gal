import fs from "fs";
import path from "path";
import sizeOf from "image-size";

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

const galleryDir = path.join(process.cwd(), "public/images/gallery");

export function getGalleryItems(): GalleryItem[] {
  const files = fs.readdirSync(galleryDir).filter((f) =>
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  const items = files.map((file) => {
    const match = file.match(/gallery-(\d+)/);
    const id = match ? parseInt(match[1], 10) : 0;
    const filePath = path.join(galleryDir, file);
    const buffer = fs.readFileSync(filePath);
    const dimensions = sizeOf(new Uint8Array(buffer));

    return {
      id,
      src: `/images/gallery/${file}`,
      alt: "תמונה של גל",
      width: dimensions.width || 800,
      height: dimensions.height || 800,
    };
  });

  items.sort((a, b) => a.id - b.id);
  return items;
}
