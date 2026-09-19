import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const body = await req.json();
  const patch: { name?: string; sort_order?: number } = {};

  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) return NextResponse.json({ error: "חסר שם קטגוריה" }, { status: 400 });
    patch.name = name;
  }
  if (typeof body.sort_order === "number") patch.sort_order = body.sort_order;

  const { data, error } = await supabaseServer
    .from("story_categories")
    .update(patch)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/admin", "layout");
  revalidatePath("/stories");
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  // Stories keep their content; the FK is ON DELETE SET NULL.
  const { error } = await supabaseServer
    .from("story_categories")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/admin", "layout");
  revalidatePath("/stories");
  return new NextResponse(null, { status: 204 });
}
