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

// Cap the number of retained entries. Cache keys are derived from request
// params (e.g. the sorted repo-name list), so the keyspace is influenced by
// callers. Without a bound, distinct param combinations would accumulate
// entries for the lifetime of the warm instance. A Map preserves insertion
// order, so evicting the first key approximates LRU when reads re-insert.
const MAX_ENTRIES = 64;

const store = new Map<string, Entry<unknown>>();

export function setCache<T>(key: string, value: T): void {
  // Delete first so re-setting an existing key moves it to the newest
  // position (LRU recency).
  store.delete(key);
  store.set(key, { value, storedAt: Date.now() });
  while (store.size > MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

export function getCache<T>(key: string): { value: T; ageMs: number } | null {
  const entry = store.get(key) as Entry<T> | undefined;
  if (!entry) return null;
  // Refresh recency on read so frequently-served fallbacks aren't evicted
  // ahead of stale, never-read entries.
  store.delete(key);
  store.set(key, entry);
  return { value: entry.value, ageMs: Date.now() - entry.storedAt };
}
