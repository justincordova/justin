import type { VercelRequest, VercelResponse } from "@vercel/node";
import { githubFetch, GITHUB_USERNAME } from "../lib/github";
import { logError } from "../lib/logger";

interface SearchCommitsResponse {
  items: Array<{
    sha: string;
    html_url: string;
    commit: {
      message: string;
      author: {
        date: string;
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const limit = Math.min(Number(req.query.limit) || 5, 20);

  try {
    const data = await githubFetch<SearchCommitsResponse>(
      `/search/commits?q=author:${GITHUB_USERNAME}&sort=author-date&order=desc&per_page=${limit}`,
    );

    const details = await Promise.allSettled(
      data.items.map((item) =>
        githubFetch<CommitDetail>(`/repos/${item.repository.full_name}/commits/${item.sha}`),
      ),
    );

    const commits = data.items.map((item, i) => {
      const detail = details[i].status === "fulfilled" ? details[i].value : null;
      return {
        message: item.commit.message,
        repoName: item.repository.name,
        timestamp: item.commit.author.date,
        commitUrl: item.html_url,
        additions: detail?.stats.additions ?? 0,
        deletions: detail?.stats.deletions ?? 0,
      };
    });

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(commits);
  } catch (error) {
    logError("Failed to fetch commits", error);
    return res.status(500).json({ error: "Failed to fetch commits" });
  }
}
