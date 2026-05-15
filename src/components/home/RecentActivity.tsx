import ErrorMessage from "@/components/shared/ErrorMessage";
import { CommitRowSkeleton } from "@/components/shared/SkeletonLoader";
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
    <section className="px-6">
      <div className="mx-auto max-w-container">
        <p
          className="mb-6 text-[11px] uppercase tracking-[0.15em] text-faint/60"
          style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
        >
          Recent
        </p>

        {isLoading && (
          <div className="flex flex-col gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <CommitRowSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <ErrorMessage message="Failed to load recent activity." onRetry={() => refetch()} />
        )}

        {commits && commits.length > 0 && (
          <div className="flex flex-col gap-5">
            {commits.map((commit, i) => {
              const hasDelta = commit.additions > 0 || commit.deletions > 0;
              return (
                <a
                  key={`${commit.commitUrl}-${i}`}
                  href={commit.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block min-w-0"
                >
                  <p className="truncate text-sm text-content transition-colors duration-150 group-hover:text-primary">
                    {commit.message.split("\n")[0]}
                  </p>
                  <p
                    className="mt-1 truncate text-xs text-faint"
                    style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
                  >
                    <span>{commit.repoName}</span>
                    <span> · </span>
                    <span>{timeAgo(commit.timestamp)}</span>
                    {hasDelta && (
                      <>
                        <span> · </span>
                        {commit.additions > 0 && (
                          <span className="text-emerald-500/70">
                            +{formatDelta(commit.additions)}
                          </span>
                        )}
                        {commit.additions > 0 && commit.deletions > 0 && <span> </span>}
                        {commit.deletions > 0 && (
                          <span className="text-red-400/70">
                            -{formatDelta(commit.deletions)}
                          </span>
                        )}
                      </>
                    )}
                  </p>
                </a>
              );
            })}
          </div>
        )}

        {commits && commits.length === 0 && (
          <p className="text-sm text-faint">No recent commits.</p>
        )}
      </div>
    </section>
  );
}
