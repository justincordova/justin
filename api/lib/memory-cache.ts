/**
 * Module-level in-memory cache used as a graceful-degradation fallback.
 *
 * Vercel functions are stateless across cold starts, so this only helps
 * within a warm instance. That's fine — its job is to keep a recently-
 * warm function returning data when upstream (GitHub) is rate-limited,
 * not to be a real cache. The CDN (s-maxage on the response) handles
 * cross-invocation caching for happy-path requests.
 */

interface Entry<T> {
  value: T;
  storedAt: number;
}

const store = new Map<string, Entry<unknown>>();

export function setCache<T>(key: string, value: T): void {
  store.set(key, { value, storedAt: Date.now() });
}

export function getCache<T>(key: string): { value: T; ageMs: number } | null {
  const entry = store.get(key) as Entry<T> | undefined;
  if (!entry) return null;
  return { value: entry.value, ageMs: Date.now() - entry.storedAt };
}
