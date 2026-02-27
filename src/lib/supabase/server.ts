import { createClient } from "@supabase/supabase-js";

// The Supabase JS client needs the project URL (https://xxx.supabase.co),
// not the PostgreSQL connection string. Use NEXT_PUBLIC_SUPABASE_URL as the URL.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
  global: {
    fetch: (url, options = {}) => fetch(url, { ...options, cache: "no-store" }),
  },
});
