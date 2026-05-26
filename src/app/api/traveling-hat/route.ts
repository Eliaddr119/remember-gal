import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import sql from "@/lib/db";
import { requireAuth } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const data = await sql`SELECT * FROM traveling_hat ORDER BY created_at ASC`;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const unauth = await requireAuth(req);
  if (unauth) return unauth;
  try {
    const body = await req.json();
    const [data] = await sql`INSERT INTO traveling_hat ${sql(body)} RETURNING *`;
    revalidatePath("/admin", "layout");
    revalidatePath("/traveling-hat");
    return NextResponse.json(data, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Database error" }, { status: 500 });
  }
}
