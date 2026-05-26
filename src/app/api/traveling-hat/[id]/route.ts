import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import sql from "@/lib/db";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [data] = await sql`SELECT * FROM traveling_hat WHERE id = ${params.id}`;
    if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json();
    const [data] = await sql`UPDATE traveling_hat SET ${sql(body, ...Object.keys(body))} WHERE id = ${params.id} RETURNING *`;
    revalidatePath("/admin", "layout");
    revalidatePath("/traveling-hat");
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  try {
    await sql`DELETE FROM traveling_hat WHERE id = ${params.id}`;
    revalidatePath("/admin", "layout");
    revalidatePath("/traveling-hat");
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}
