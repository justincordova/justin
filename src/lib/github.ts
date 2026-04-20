import type { CommitActivity, GitHubRepo } from "@/types/github";

export const CURATED_PROJECTS = [
  "seshr",
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
] as const;

export const FEATURED_PROJECTS = ["findu", "dotcor", "seshr"] as const;

export async function fetchRepos(repoNames: string[]): Promise<GitHubRepo[]> {
  const res = await fetch(`/api/github/repos?names=${repoNames.join(",")}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function fetchRecentCommits(limit = 5): Promise<CommitActivity[]> {
  const res = await fetch(`/api/github/commits?limit=${limit}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
