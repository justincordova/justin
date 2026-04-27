import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ProjectCard from "@/components/projects/ProjectCard";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ProjectCardSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { FEATURED_PROJECTS } from "@/lib/github";

export default function FeaturedProjects() {
  const { data: repos, isLoading, isError, refetch } = useGitHubProjects(FEATURED_PROJECTS);

  return (
    <section className="animate-fade-up stagger-2 px-6 pt-4 pb-0">
      <div className="mx-auto max-w-container">
        {isLoading && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && <ErrorMessage message="Failed to load projects." onRetry={() => refetch()} />}

        {repos && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...repos]
              .sort((a, b) => {
                const order =
                  FEATURED_PROJECTS.indexOf(a.name as (typeof FEATURED_PROJECTS)[number]) -
                  FEATURED_PROJECTS.indexOf(b.name as (typeof FEATURED_PROJECTS)[number]);
                return order;
              })
              .map((repo) => (
                <ProjectCard key={repo.name} repo={repo} />
              ))}
          </div>
        )}

        <div className="mt-4 text-center">
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
