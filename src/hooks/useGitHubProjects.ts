import { useQuery } from "@tanstack/react-query";
import { fetchRepos } from "@/lib/github";
import type { GitHubRepo } from "@/types/github";

export function useGitHubProjects(repoNames: readonly string[]) {
  return useQuery<GitHubRepo[]>({
    queryKey: ["github-projects", ...repoNames],
    queryFn: () => fetchRepos([...repoNames]),
  });
}
