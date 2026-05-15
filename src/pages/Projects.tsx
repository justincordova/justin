import { useMemo } from "react";
import ProjectRow from "@/components/projects/ProjectRow";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ProjectRowSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { CURATED_PROJECTS, FEATURED_PROJECTS } from "@/lib/github";
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
  const { data: repos, isLoading, isError, refetch } = useGitHubProjects(CURATED_PROJECTS);

  const grouped = useMemo(() => (repos ? groupByYear(repos) : []), [repos]);
  const yearRange = useMemo(() => (repos ? getYearRange(repos) : null), [repos]);
  const totalCount = repos?.length ?? 0;

  return (
    <div className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-container">
        {/* Header */}
        {repos && (
          <div className="animate-fade-up stagger-1 mb-12 flex items-baseline justify-between gap-4">
            <p
              className="text-[11px] uppercase tracking-[0.15em] text-faint/60"
              style={{ fontFamily: MONO_FONT }}
            >
              Projects
            </p>
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
          </div>
        )}

        {isLoading && (
          <div>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectRowSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <ErrorMessage message="Failed to load projects." onRetry={() => refetch()} />
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
                  <div className="mb-2 flex items-center gap-4">
                    <span
                      className="text-xs tracking-[0.15em] text-faint/60"
                      style={{ fontFamily: MONO_FONT }}
                    >
                      {year}
                    </span>
                    <div className="h-px flex-1 bg-edge/30" />
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
