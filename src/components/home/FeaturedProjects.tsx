import { ArrowRight } from "lucide-react";
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
  const { data: repos, isLoading, isError, error, refetch } = useGitHubProjects(FEATURED_PROJECTS);
  const rateLimited = error instanceof ApiError && error.isRateLimited;

  return (
    <section className="px-6">
      <div className="mx-auto max-w-container">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.15em] text-faint/60">
          Featured
        </p>

        <div className="border-t border-edge/40">
          {isLoading && (
            <div>
              {Array.from({ length: 4 }).map((_, i) => (
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
              />
            </div>
          )}

          {repos && (
            <div>
              {[...repos]
                .sort((a, b) => featuredOrder(a.name) - featuredOrder(b.name))
                .map((repo, i) => (
                  <ProjectRow key={repo.name} repo={repo} index={i} />
                ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-content"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
