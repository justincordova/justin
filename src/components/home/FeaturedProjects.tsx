import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";
import ProjectRow from "@/components/projects/ProjectRow";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ProjectRowSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { ApiError, FEATURED_PROJECTS, PROJECTS_ERROR_COPY } from "@/lib/github";

// GitHub returns each repo's canonical stored casing in `name`, which may not
// match the lowercase FEATURED_PROJECTS entries. Compare case-insensitively
// and sink any unmatched repo to the end (instead of -1, which would float it
// to the front and silently break the curated order).
function featuredOrder(name: string): number {
  const i = FEATURED_PROJECTS.findIndex((p) => p.toLowerCase() === name.toLowerCase());
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

export default function FeaturedProjects() {
  const {
    data: repos,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useGitHubProjects(FEATURED_PROJECTS);
  const rateLimited = error instanceof ApiError && error.isRateLimited;

  const ordered = useMemo(
    () => (repos ? [...repos].sort((a, b) => featuredOrder(a.name) - featuredOrder(b.name)) : []),
    [repos],
  );

  return (
    <section aria-labelledby="featured-heading" className="px-6">
      <div className="mx-auto max-w-container">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2
            id="featured-heading"
            className="font-sans text-lg font-medium tracking-tight text-content"
          >
            Featured projects
          </h2>
          <Link
            to="/projects"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-content"
          >
            View all projects
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="border-t border-edge/40">
          {isLoading && (
            <div>
              {Array.from({ length: FEATURED_PROJECTS.length }).map((_, i) => (
                <ProjectRowSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="py-5">
              <ErrorMessage
                tone={rateLimited ? "info" : "error"}
                message={
                  rateLimited ? PROJECTS_ERROR_COPY.rateLimited : PROJECTS_ERROR_COPY.generic
                }
                onRetry={() => refetch()}
                retrying={isFetching}
              />
            </div>
          )}

          {repos && (
            <div>
              {ordered.map((repo, i) => (
                <ProjectRow key={repo.name} repo={repo} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
