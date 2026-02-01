import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { FEATURED_PROJECTS } from "@/lib/github";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/shared/SkeletonLoader";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function FeaturedProjects() {
  const { data: repos, isLoading, isError, refetch } = useGitHubProjects(FEATURED_PROJECTS);

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h2 className="mb-6 text-2xl tracking-tight text-ctp-mauve">
          Featured Projects
        </h2>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <ErrorMessage
            message="Failed to load projects."
            onRetry={() => refetch()}
          />
        )}

        {repos && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <ProjectCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ctp-mauve transition-colors hover:text-ctp-text"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
