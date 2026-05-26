import sql from "@/lib/db";

export interface MapPin {
  id: string;
  title: string;
  coordinates: [number, number];
  imageUrls: string[];
  description: string;
  photographer: string;
  photographerRelation: string;
}

export interface PinRow {
  id: string;
  title: string;
  lat: string | number | null;
  lng: string | number | null;
  image_urls: unknown;
  photographer: string | null;
  photographer_relation: string | null;
  description: string | null;
}

export async function getPins(): Promise<MapPin[]> {
  const rows = await sql`SELECT * FROM traveling_hat ORDER BY created_at ASC`;
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    coordinates: [parseFloat(String(row.lat)), parseFloat(String(row.lng))] as [number, number],
    imageUrls: Array.isArray(row.image_urls) ? (row.image_urls as string[]) : [],
    photographer: row.photographer || "",
    photographerRelation: row.photographer_relation || "",
    description: row.description || "",
  }));
}
