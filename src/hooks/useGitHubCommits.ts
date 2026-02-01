import { useQuery } from "@tanstack/react-query";
import { fetchRecentCommits } from "@/lib/github";
import type { CommitActivity } from "@/types/github";

export function useGitHubCommits(limit = 5) {
  return useQuery<CommitActivity[]>({
    queryKey: ["github-commits", limit],
    queryFn: () => fetchRecentCommits(limit),
  });
}
