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
