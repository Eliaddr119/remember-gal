import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const { bucket, folder, filename } = await req.json();
  const ext = (filename as string)?.split(".").pop() ?? "mp4";
  const path = `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;

  const { data, error } = await supabaseServer.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: urlData } = supabaseServer.storage.from(bucket).getPublicUrl(path);

  return NextResponse.json({ signedUrl: data.signedUrl, publicUrl: urlData.publicUrl });
}
