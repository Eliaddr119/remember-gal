import { supabaseServer } from "@/lib/supabase/server";

export interface SiteConfig {
  main_photo_url: string;
  about_photo_url: string;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const { data } = await supabaseServer
    .from("site_config")
    .select("key, value");

  const config: Record<string, string> = {};
  for (const row of (data || []) as { key: string; value: string }[]) {
    config[row.key] = row.value;
  }

  return {
    main_photo_url: config.main_photo_url || "",
    about_photo_url: config.about_photo_url || "",
  };
}
