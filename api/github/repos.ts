import type { VercelRequest, VercelResponse } from "@vercel/node";
import { githubFetch, GITHUB_USERNAME, HttpBatch } from "../lib/github.js";
import { logError } from "../lib/logger.js";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const names = req.query.names;
  if (!names || typeof names !== "string") {
    return res.status(400).json({ error: "Missing 'names' query parameter" });
  }

  const repoNames = names.split(",").filter(Boolean);
  if (repoNames.length === 0) {
    return res.status(400).json({ error: "No repo names provided" });
  }

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

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(repos);
  } catch (error) {
    logError("Failed to fetch repos", error);
    return res.status(500).json({ error: "Failed to fetch repos" });
  }
}
