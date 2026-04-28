import ProjectCard from "@/components/projects/ProjectCard";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { ProjectCardSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubProjects } from "@/hooks/useGitHubProjects";
import { CURATED_PROJECTS } from "@/lib/github";

export default function Projects() {
  const { data: repos, isLoading, isError, refetch } = useGitHubProjects(CURATED_PROJECTS);

  return (
    <div className="px-6 py-10">
      <div className="mx-auto max-w-container">
        <h1 className="animate-fade-up stagger-1 mb-8 text-3xl tracking-tight text-content">
          Projects
        </h1>

        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && <ErrorMessage message="Failed to load projects." onRetry={() => refetch()} />}

        {repos && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...repos]
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((repo, i) => {
                const levels = [
                  "stagger-1",
                  "stagger-2",
                  "stagger-3",
                  "stagger-4",
                  "stagger-5",
                  "stagger-6",
                ];
                const stagger = levels[Math.min(i, levels.length - 1)];
                return (
                  <div key={repo.name} className={`animate-fade-up h-full ${stagger}`}>
                    <ProjectCard repo={repo} className="h-full" />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
