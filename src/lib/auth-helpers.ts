import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Returns null if the request is authenticated, or a 401 NextResponse if not.
 * Use in API route handlers: const unauth = await requireAuth(req); if (unauth) return unauth;
 */
export async function requireAuth(req: NextRequest): Promise<NextResponse | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
