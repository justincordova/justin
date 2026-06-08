import type { CommitActivity, GitHubRepo } from "@/types/github";

export const CURATED_PROJECTS = [
  "seshr",
  "findu",
  "rumi",
  "arcadeai",
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

export const FEATURED_PROJECTS = ["rumi", "seshr", "arcadeai", "findu"] as const;

/** User-facing copy for the project-loading error states (shared by the home
 *  and projects views so the wording stays in sync). */
export const PROJECTS_ERROR_COPY = {
  rateLimited: "GitHub is rate-limiting us right now. Try again in a minute.",
  generic: "Failed to load projects.",
} as const;

/**
 * Thrown by fetch helpers when the API responds with a non-ok status.
 * Carries the HTTP status and an optional error code so callers (hooks,
 * error UI) can branch on rate-limit vs generic failures.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string | null;

  constructor(status: number, code: string | null, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }

  get isRateLimited(): boolean {
    return this.code === "rate_limited" || this.status === 429;
  }
}

async function parseError(res: Response): Promise<ApiError> {
  let code: string | null = null;
  let message = `API error: ${res.status}`;
  try {
    const body = (await res.json()) as { error?: string; message?: string };
    if (typeof body?.error === "string") code = body.error;
    if (typeof body?.message === "string") message = body.message;
  } catch {
    // body wasn't json — keep defaults
  }
  return new ApiError(res.status, code, message);
}

export async function fetchRepos(repoNames: string[]): Promise<GitHubRepo[]> {
  const res = await fetch(`/api/github/repos?repos=${encodeURIComponent(repoNames.join(","))}`);
  if (!res.ok) throw await parseError(res);
  return res.json();
}

export async function fetchRecentCommits(limit = 5): Promise<CommitActivity[]> {
  const res = await fetch(`/api/github/commits?limit=${limit}`);
  if (!res.ok) throw await parseError(res);
  return res.json();
}
