import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GitHubRateLimitError, githubFetch, GITHUB_USERNAME, HttpBatch } from "../lib/github.js";
import { logError } from "../lib/logger.js";
import { getCache, setCache } from "../lib/memory-cache.js";

// All upstream calls in this handler go through Promise.allSettled, so a
// rate-limit on any individual repo fetch is reflected in the rejected
// results — never thrown out of the try block. The catch only fires on
// bugs inside our own code (cache, headers, JSON serialization).

interface GitHubRepoResponse {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

const CACHE_KEY_PREFIX = "repos:";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const param = req.query.repos ?? req.query.names;
  if (!param || typeof param !== "string") {
    return res.status(400).json({ error: "Missing 'repos' query parameter" });
  }

  const repoNames = param.split(",").filter(Boolean);
  if (repoNames.length === 0) {
    return res.status(400).json({ error: "No repo names provided" });
  }

  const cacheKey = CACHE_KEY_PREFIX + repoNames.slice().sort().join(",");

  try {
    const batch = new HttpBatch();

    const results = await Promise.allSettled(
      repoNames.map((name) =>
        githubFetch<GitHubRepoResponse>(`/repos/${GITHUB_USERNAME}/${name}`, batch),
      ),
    );

    batch.flush("GET /api/github/repos");

    const repos = results
      .filter((r): r is PromiseFulfilledResult<GitHubRepoResponse> => r.status === "fulfilled")
      .map((r) => r.value);

    // If we got nothing back AND at least one failure was a rate limit,
    // fall through to the cached path so the user still sees something.
    const allFailed = repos.length === 0 && results.length > 0;
    const anyRateLimited = results.some(
      (r) => r.status === "rejected" && r.reason instanceof GitHubRateLimitError,
    );

    if (allFailed && anyRateLimited) {
      const cached = getCache<GitHubRepoResponse[]>(cacheKey);
      if (cached) {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("X-Data-Stale", "true");
        res.setHeader("X-Data-Age-Ms", String(cached.ageMs));
        return res.status(200).json(cached.value);
      }
      // No cache, can't recover — surface a typed error so the client can
      // show a friendlier message.
      return res
        .status(503)
        .json({ error: "rate_limited", message: "GitHub API rate limit exceeded" });
    }

    // Cache the latest good result for future fallback use.
    if (repos.length > 0) {
      setCache(cacheKey, repos);
    }

    // If we got a partial result (some rate-limited, some not), still
    // return what we have but mark the response.
    if (anyRateLimited) {
      res.setHeader("X-Data-Partial", "true");
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(repos);
  } catch (error) {
    logError("Failed to fetch repos", error);
    return res.status(500).json({ error: "Failed to fetch repos" });
  }
}
