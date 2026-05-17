import { useMemo } from "react";
import ProjectRow from "@/components/projects/ProjectRow";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ProjectRowSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { useSpacePageScroll } from "@/hooks/useSpacePageScroll";
import { ApiError, CURATED_PROJECTS, FEATURED_PROJECTS } from "@/lib/github";
import type { GitHubRepo } from "@/types/github";

const FEATURED_SET = new Set<string>(FEATURED_PROJECTS.map((name) => name.toLowerCase()));
const MONO_FONT = "'Geist Mono', ui-monospace, monospace";

function groupByYear(repos: GitHubRepo[]): Array<[number, GitHubRepo[]]> {
  const groups = new Map<number, GitHubRepo[]>();

  for (const repo of repos) {
    const created = new Date(repo.created_at);
    if (Number.isNaN(created.getTime())) continue;
    const year = created.getFullYear();
    const list = groups.get(year);
    if (list) {
      list.push(repo);
    } else {
      groups.set(year, [repo]);
    }
  }

  for (const list of groups.values()) {
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
}

function getYearRange(repos: GitHubRepo[]): { min: number; max: number } | null {
  const years = repos
    .map((r) => new Date(r.created_at).getFullYear())
    .filter((y) => Number.isFinite(y));
  if (years.length === 0) return null;
  return { min: Math.min(...years), max: Math.max(...years) };
}

export default function Projects() {
  useSpacePageScroll();

  const { data: repos, isLoading, isError, error, refetch } = useGitHubProjects(CURATED_PROJECTS);
  const rateLimited = error instanceof ApiError && error.isRateLimited;

  const grouped = useMemo(() => (repos ? groupByYear(repos) : []), [repos]);
  const yearRange = useMemo(() => (repos ? getYearRange(repos) : null), [repos]);
  const totalCount = repos?.length ?? 0;

  return (
    <div className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-container">
        {/* Header */}
        {repos && (
          <header className="animate-fade-up stagger-1 mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h1
              className="tracking-tight text-content"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
              }}
            >
              Projects
            </h1>
            {yearRange && (
              <p
                className="truncate text-xs text-faint"
                style={{ fontFamily: MONO_FONT }}
              >
                {totalCount} project{totalCount === 1 ? "" : "s"}
                {" · "}
                {yearRange.min === yearRange.max
                  ? yearRange.min
                  : `${yearRange.min} – ${yearRange.max}`}
              </p>
            )}
          </header>
        )}

        {isLoading && (
          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectRowSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <ErrorMessage
            tone={rateLimited ? "info" : "error"}
            message={
              rateLimited
                ? "GitHub is rate-limiting us right now. Try again in a minute."
                : "Failed to load projects."
            }
            onRetry={() => refetch()}
          />
        )}

        {repos && (
          <div>
            {grouped.map(([year, group], groupIndex) => {
              // Cumulative index across all groups so stagger is continuous
              const offset = grouped
                .slice(0, groupIndex)
                .reduce((acc, [, g]) => acc + g.length, 0);
              return (
                <section key={year} className={groupIndex === 0 ? "" : "mt-12"}>
                  <div
                    className="sticky z-10 mb-2 flex items-center gap-4 bg-bg/80 py-2 backdrop-blur-sm"
                    style={{ top: "var(--nav-h)" }}
                  >
                    <span
                      className="text-xs tracking-[0.15em] text-muted"
                      style={{ fontFamily: MONO_FONT }}
                    >
                      {year}
                    </span>
                    <div className="h-px flex-1 bg-edge/40" />
                  </div>
                  <div>
                    {group.map((repo, i) => (
                      <ProjectRow
                        key={repo.name}
                        repo={repo}
                        featured={FEATURED_SET.has(repo.name.toLowerCase())}
                        index={offset + i}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
