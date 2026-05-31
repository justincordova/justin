import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GitHubRateLimitError, githubFetch, GITHUB_USERNAME, HttpBatch } from "../lib/github.js";
import { logError } from "../lib/logger.js";
import { getCache, setCache } from "../lib/memory-cache.js";

interface SearchCommitsResponse {
  items: Array<{
    sha: string;
    html_url: string;
    commit?: {
      message?: string;
      author?: {
        date?: string;
      };
    };
    repository: {
      name: string;
      full_name: string;
    };
  }>;
}

interface CommitDetail {
  sha: string;
  stats: {
    additions: number;
    deletions: number;
  };
}

interface CommitActivity {
  message: string;
  repoName: string;
  timestamp: string;
  commitUrl: string;
  additions: number;
  deletions: number;
}

const CACHE_KEY_PREFIX = "commits:";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Clamp to a positive integer in [1, 20]. Number() can yield negatives,
  // fractions, or NaN from arbitrary query input; an unclamped value would
  // produce a malformed per_page (e.g. -3, 2.5) in the GitHub request.
  const parsed = Math.floor(Number(req.query.limit));
  const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 20) : 5;
  const cacheKey = `${CACHE_KEY_PREFIX}${limit}`;

  try {
    const batch = new HttpBatch();

    const data = await githubFetch<SearchCommitsResponse>(
      `/search/commits?q=author:${GITHUB_USERNAME}&sort=author-date&order=desc&per_page=${limit}`,
      batch,
    );

    // Guard against a malformed upstream body. The happy path always returns
    // an `items` array; defending here keeps a degraded GitHub response from
    // throwing inside the map below and collapsing into a generic 500.
    const items = Array.isArray(data.items)
      ? data.items.filter((item) => item?.repository?.full_name && item.sha)
      : [];

    const details = await Promise.allSettled(
      items.map((item) =>
        githubFetch<CommitDetail>(`/repos/${item.repository.full_name}/commits/${item.sha}`, batch),
      ),
    );

    batch.flush("GET /api/github/commits");

    const anyRateLimited = details.some(
      (r) => r.status === "rejected" && r.reason instanceof GitHubRateLimitError,
    );

    const commits: CommitActivity[] = items.map((item, i) => {
      const result = details[i];
      const detail = result?.status === "fulfilled" ? result.value : null;
      return {
        message: item.commit?.message ?? "",
        repoName: item.repository.name,
        timestamp: item.commit?.author?.date ?? new Date(0).toISOString(),
        commitUrl: item.html_url,
        additions: detail?.stats?.additions ?? 0,
        deletions: detail?.stats?.deletions ?? 0,
      };
    });

    // Only cache when every detail fetch succeeded. Caching partial data
    // would poison the fallback cache with zero-stat entries that look
    // legitimate on subsequent rate-limited requests.
    if (!anyRateLimited) {
      setCache(cacheKey, commits);
    } else {
      res.setHeader("X-Data-Partial", "true");
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(commits);
  } catch (error) {
    if (error instanceof GitHubRateLimitError) {
      const cached = getCache<CommitActivity[]>(cacheKey);
      if (cached) {
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("X-Data-Stale", "true");
        res.setHeader("X-Data-Age-Ms", String(cached.ageMs));
        return res.status(200).json(cached.value);
      }
      return res
        .status(503)
        .json({ error: "rate_limited", message: "GitHub API rate limit exceeded" });
    }

    logError("Failed to fetch commits", error);
    return res.status(500).json({ error: "Failed to fetch commits" });
  }
}
