import { childLogger, logHttp } from "./logger.js";

const log = childLogger("github");

const GITHUB_USERNAME = "justincordova";
const BASE_URL = "https://api.github.com";

type BatchEntry = { method: string; url: string; status: number; duration: number };

export class HttpBatch {
  private entries: BatchEntry[] = [];

  add(entry: BatchEntry) {
    this.entries.push(entry);
  }

  flush(label: string) {
    if (this.entries.length === 0) return;
    const total = this.entries.reduce((sum, e) => sum + e.duration, 0);
    const logger = childLogger("http");
    logger.info(`${label} (${this.entries.length} requests, ${total}ms total)`, {
      requests: this.entries,
      total,
    });
    this.entries = [];
  }
}

/**
 * Error thrown when GitHub API responds with a 403 + remaining=0 (primary
 * rate limit) or a 429 (secondary/abuse rate limit). Callers can catch this
 * specifically to serve cached data or surface a friendlier error.
 */
export class GitHubRateLimitError extends Error {
  readonly status: number;
  readonly resetAt: Date | null;

  constructor(status: number, resetAt: Date | null) {
    super(
      `GitHub API rate limit exceeded${resetAt ? ` (resets at ${resetAt.toISOString()})` : ""}`,
    );
    this.name = "GitHubRateLimitError";
    this.status = status;
    this.resetAt = resetAt;
  }
}

function parseResetAt(res: Response): Date | null {
  const reset = res.headers.get("x-ratelimit-reset");
  if (!reset) return null;
  const seconds = Number(reset);
  if (!Number.isFinite(seconds)) return null;
  return new Date(seconds * 1000);
}

function isRateLimited(res: Response): boolean {
  if (res.status === 429) return true;
  if (res.status === 403) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    if (remaining === "0") return true;
  }
  return false;
}

export async function githubFetch<T>(
  endpoint: string,
  batch?: HttpBatch,
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const start = Date.now();
  const url = `${BASE_URL}${endpoint}`;
  const res = await fetch(url, { headers });
  const duration = Date.now() - start;

  if (batch) {
    batch.add({ method: "GET", url, status: res.status, duration });
  } else {
    logHttp("GET", url, res.status, duration);
  }

  if (!res.ok) {
    if (isRateLimited(res)) {
      const resetAt = parseResetAt(res);
      log.warn("GitHub rate limit hit", {
        status: res.status,
        endpoint,
        resetAt: resetAt?.toISOString() ?? null,
      });
      throw new GitHubRateLimitError(res.status, resetAt);
    }

    log.error("GitHub API error", {
      status: res.status,
      statusText: res.statusText,
      endpoint,
    });
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export { GITHUB_USERNAME };
