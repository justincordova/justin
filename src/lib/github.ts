import type { GitHubRepo, CommitActivity } from "@/types/github";

const GITHUB_USERNAME = "justincordova";
const BASE_URL = "https://api.github.com";

async function githubFetch<T>(endpoint: string): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchRepo(repoName: string): Promise<GitHubRepo> {
  return githubFetch<GitHubRepo>(`/repos/${GITHUB_USERNAME}/${repoName}`);
}

export async function fetchRepos(repoNames: string[]): Promise<GitHubRepo[]> {
  const results = await Promise.allSettled(repoNames.map(fetchRepo));
  return results
    .filter(
      (r): r is PromiseFulfilledResult<GitHubRepo> => r.status === "fulfilled"
    )
    .map((r) => r.value);
}

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

export async function fetchRecentCommits(
  limit = 5
): Promise<CommitActivity[]> {
  const data = await githubFetch<SearchCommitsResponse>(
    `/search/commits?q=author:${GITHUB_USERNAME}&sort=author-date&order=desc&per_page=${limit}`
  );

  return data.items.map((item) => ({
    message: item.commit.message,
    repoName: item.repository.name,
    timestamp: item.commit.author.date,
    commitUrl: item.html_url,
  }));
}

export const CURATED_PROJECTS = [
  "findu",
  "dotcor",
  "JobDaemon",
  "student-depression-prediction",
  "Min-OSS",
  "bunso",
  "PlushPals",
  "CookieBoy",
  "LetsType",
  "expense-tracker",
  "task-manager",
  "to-do-app",
  "sort-algos",
  "decode-sec",
  "rotating-image-gallery",
  "mini-calendar",
  "image-generator",
  "file-downloader",
  "cspathfinder",
] as const;

export const FEATURED_PROJECTS = ["dotcor", "findu", "bunso"] as const;
