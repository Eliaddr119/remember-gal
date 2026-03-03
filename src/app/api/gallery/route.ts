import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("gallery")
    .select("*")
    .order("id", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const res = NextResponse.json(data);
  res.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res;
}

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const body = await req.json();
  const { data, error } = await supabaseServer
    .from("gallery")
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/admin", "layout");
  revalidatePath("/gallery");
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { error } = await supabaseServer
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/admin", "layout");
  revalidatePath("/gallery");
  return new NextResponse(null, { status: 204 });
}
