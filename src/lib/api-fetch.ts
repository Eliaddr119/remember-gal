function baseUrl() {
  return (process.env.NEXTAUTH_URL || "http://localhost:3000").replace(/\/$/, "");
}

export async function apiFetch<T = unknown>(
  path: string,
  options?: { revalidate?: number }
): Promise<T | null> {
  const cacheOption: RequestInit =
    options?.revalidate !== undefined
      ? { next: { revalidate: options.revalidate } }
      : { cache: "no-store" };
  try {
    const res = await fetch(`${baseUrl()}${path}`, cacheOption);
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}
