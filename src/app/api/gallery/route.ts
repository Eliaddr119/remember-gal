import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import sql from "@/lib/db";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM gallery ORDER BY id ASC`;
    const res = NextResponse.json(data);
    res.headers.set("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res;
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json();
    const [data] = await sql`INSERT INTO gallery ${sql(body)} RETURNING *`;
    revalidatePath("/admin", "layout");
    revalidatePath("/gallery");
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  try {
    await sql`DELETE FROM gallery WHERE id = ${id}`;
    revalidatePath("/admin", "layout");
    revalidatePath("/gallery");
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}
