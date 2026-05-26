import { NextRequest, NextResponse } from "next/server";
import { createPresignedUploadUrl } from "@/lib/storage";
import { requireAuth } from "@/lib/auth-helpers";

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const { folder, filename } = await req.json();
  const ext = (filename as string)?.split(".").pop() ?? "mp4";
  const key = `${folder ? folder + "/" : ""}${Date.now()}.${ext}`;

  try {
    const { signedUrl, publicUrl } = await createPresignedUploadUrl(key, "video/*");
    return NextResponse.json({ signedUrl, publicUrl });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "שגיאה" }, { status: 500 });
  }
}
