import { ExternalLink, GitCommit } from "lucide-react";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { CommitItemSkeleton } from "@/components/shared/SkeletonLoader";
import { useGitHubCommits } from "@/hooks/useGitHubCommits";

function timeAgo(dateString: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);

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

function formatDelta(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function RecentActivity() {
  const { data: commits, isLoading, isError, refetch } = useGitHubCommits(3);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-edge bg-surface min-w-0">
      <div className="px-4 py-3">
        <h2 className="font-sans text-sm font-semibold text-content">Recent Commits</h2>
      </div>

      <div className="min-w-0 overflow-y-auto">
        {isLoading && (
          <div>
            {Array.from({ length: 3 }).map((_, i) => (
              <CommitItemSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <div className="p-4">
            <ErrorMessage message="Failed to load recent activity." onRetry={() => refetch()} />
          </div>
        )}

        {commits &&
          commits.length > 0 &&
          commits.map((commit, i) => (
            <a
              key={`${commit.commitUrl}-${i}`}
              href={commit.commitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex max-w-full items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-2/30"
            >
              <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-content">{commit.message.split("\n")[0]}</p>
                <div className="mt-0.5 flex items-center gap-2 overflow-hidden text-xs">
                  <span className="shrink-0 font-mono text-primary">{commit.repoName}</span>
                  <span className="shrink-0 text-faint">{timeAgo(commit.timestamp)}</span>
                  {(commit.additions > 0 || commit.deletions > 0) && (
                    <span className="flex items-center gap-1 font-mono">
                      {commit.additions > 0 && (
                        <span className="text-emerald-500">+{formatDelta(commit.additions)}</span>
                      )}
                      {commit.deletions > 0 && (
                        <span className="text-red-400">-{formatDelta(commit.deletions)}</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          ))}

        {commits && commits.length === 0 && (
          <p className="px-4 py-3 text-sm text-faint">No recent commits.</p>
        )}
      </div>
    </div>
  );
}
