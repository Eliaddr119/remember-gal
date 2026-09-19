import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("story_categories")
    .select("*")
    .order("sort_order", { ascending: true })
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
  const name = String(body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "חסר שם קטגוריה" }, { status: 400 });

  // New categories go to the end of the tab row.
  const { data: last } = await supabaseServer
    .from("story_categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data, error } = await supabaseServer
    .from("story_categories")
    .insert({ name, sort_order: (last?.sort_order ?? 0) + 1 })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath("/admin", "layout");
  revalidatePath("/stories");
  return NextResponse.json(data, { status: 201 });
}

/** Bulk reorder: body is { order: number[] } — category ids in display order. */
export async function PUT(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;

  const body = await req.json();
  const order: unknown = body.order;
  if (!Array.isArray(order) || order.some((id) => typeof id !== "number")) {
    return NextResponse.json({ error: "order חייב להיות מערך של מזהים" }, { status: 400 });
  }

  const results = await Promise.all(
    (order as number[]).map((id, index) =>
      supabaseServer.from("story_categories").update({ sort_order: index + 1 }).eq("id", id)
    )
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  revalidatePath("/admin", "layout");
  revalidatePath("/stories");
  return NextResponse.json({ ok: true });
}
