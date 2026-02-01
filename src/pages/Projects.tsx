import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { CURATED_PROJECTS } from "@/lib/github";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectCardSkeleton } from "@/components/shared/SkeletonLoader";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function Projects() {
  const { data: repos, isLoading, isError, refetch } = useGitHubProjects(CURATED_PROJECTS);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h1 className="mb-8 text-3xl tracking-tight text-ctp-text">Projects</h1>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
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
      </div>
    </div>
  );
}
