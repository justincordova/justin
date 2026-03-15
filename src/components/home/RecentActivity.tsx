import { GitCommit, ExternalLink } from "lucide-react";
import { useGitHubCommits } from "@/hooks/useGitHubCommits";
import { CommitItemSkeleton } from "@/components/shared/SkeletonLoader";
import ErrorMessage from "@/components/shared/ErrorMessage";

function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  const intervals: [number, string][] = [
    [31536000, "y"],
    [2592000, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];

  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }

  return "just now";
}

export default function RecentActivity() {
  const { data: commits, isLoading, isError, refetch } = useGitHubCommits(5);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-ctp-surface1 bg-ctp-surface0">
      <div className="border-b border-ctp-surface1/50 px-4 py-3">
        <h2 className="font-sans text-sm font-semibold text-ctp-text">Recent Commits</h2>
      </div>

      <div className="overflow-y-auto">
        {isLoading && (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <CommitItemSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <div className="p-4">
            <ErrorMessage
              message="Failed to load recent activity."
              onRetry={() => refetch()}
            />
          </div>
        )}

        {commits && commits.length > 0 &&
          commits.map((commit, i) => (
            <a
              key={`${commit.commitUrl}-${i}`}
              href={commit.commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 border-b border-ctp-surface1/50 px-4 py-3 transition-colors last:border-b-0 hover:bg-ctp-surface1/30"
            >
              <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-ctp-mauve" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ctp-text">
                  {commit.message.split("\n")[0]}
                </p>
                <div className="mt-0.5 flex gap-2 text-xs text-ctp-overlay1">
                  <span className="font-mono text-ctp-blue">{commit.repoName}</span>
                  <span className="text-ctp-overlay0">{timeAgo(commit.timestamp)}</span>
                </div>
              </div>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ctp-surface2 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))
        }

        {commits && commits.length === 0 && (
          <p className="px-4 py-3 text-sm text-ctp-overlay0">No recent commits.</p>
        )}
      </div>
    </div>
  );
}
