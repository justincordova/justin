import { childLogger, logHttp } from "./logger";

const log = childLogger("github");

const GITHUB_USERNAME = "justincordova";
const BASE_URL = "https://api.github.com";

export async function githubFetch<T>(endpoint: string): Promise<T> {
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

  logHttp("GET", url, res.status, Date.now() - start);

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
