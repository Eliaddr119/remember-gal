import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";
import { invalidateCache } from "@/lib/cache";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabaseServer
    .from("traveling_hat")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const body = await req.json();
  const { data, error } = await supabaseServer
    .from("traveling_hat")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidateCache("traveling-hat");
  revalidatePath("/admin", "layout");
  revalidatePath("/traveling-hat");
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const { error } = await supabaseServer
    .from("traveling_hat")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  invalidateCache("traveling-hat");
  revalidatePath("/admin", "layout");
  revalidatePath("/traveling-hat");
  return new NextResponse(null, { status: 204 });
}
