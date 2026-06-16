const store = new Map<string, { data: unknown; expiresAt: number }>();

const ONE_HOUR = 60 * 60 * 1000;

export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl = ONE_HOUR
): Promise<T> {
  const hit = store.get(key);
  if (hit && hit.expiresAt > Date.now()) return hit.data as T;
  const data = await fn();
  store.set(key, { data, expiresAt: Date.now() + ttl });
  return data;
}

export function invalidateCache(key: string) {
  store.delete(key);
}
