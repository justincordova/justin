import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ProjectRow from "@/components/projects/ProjectRow";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ProjectRowSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { FEATURED_PROJECTS } from "@/lib/github";

export default function FeaturedProjects() {
  const { data: repos, isLoading, isError, refetch } = useGitHubProjects(FEATURED_PROJECTS);

  return (
    <section className="animate-fade-up stagger-2 px-6">
      <div className="mx-auto max-w-container">
        <p
          className="mb-6 text-[11px] uppercase tracking-[0.15em] text-faint/60"
          style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
        >
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
              <ErrorMessage message="Failed to load projects." onRetry={() => refetch()} />
            </div>
          )}

          {repos && (
            <div>
              {[...repos]
                .sort(
                  (a, b) =>
                    FEATURED_PROJECTS.indexOf(a.name as (typeof FEATURED_PROJECTS)[number]) -
                    FEATURED_PROJECTS.indexOf(b.name as (typeof FEATURED_PROJECTS)[number]),
                )
                .map((repo) => (
                  <ProjectRow key={repo.name} repo={repo} />
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
