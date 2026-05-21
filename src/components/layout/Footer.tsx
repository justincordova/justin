import { useEffect, useState } from "react";
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

function LatestCommit() {
  const { data: commits } = useGitHubCommits(1);
  const latest = commits?.[0];
  const timestamp = latest?.timestamp;

  // Force a re-render every minute so the relative time stays accurate
  // without waiting on the next TanStack Query refetch (5min staleTime).
  // Stops ticking once the commit is older than an hour — at that point
  // timeAgo returns the same value (Nh / Nd / ...) regardless of the tick.
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!timestamp) return;
    const ageMs = Date.now() - new Date(timestamp).getTime();
    if (ageMs > 60 * 60 * 1000) return;
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, [timestamp]);

  // Reserve vertical space even when the commit hasn't loaded yet so the
  // footer doesn't visibly shift on cold-start renders. 14px ≈ the rendered
  // line height of the [11px] mono line below.
  if (!latest) return <div aria-hidden="true" className="h-[14px]" />;

  const message = latest.message.split("\n")[0];

  return (
    <a
      href={latest.commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex max-w-full items-center gap-2 truncate font-mono text-[11px] text-muted transition-colors hover:text-content"
    >
      <span
        aria-hidden="true"
        className="animate-pulse-soft inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
      />
      <span className="uppercase tracking-[0.15em] text-faint">last commit</span>
      <span className="text-faint/60">·</span>
      <span className="truncate text-muted group-hover:text-content">{message}</span>
      <span className="text-faint/60">·</span>
      <span className="text-faint">{latest.repoName}</span>
      <span className="text-faint/60">·</span>
      <span className="text-faint">{timeAgo(latest.timestamp)}</span>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="px-6 py-8 text-center">
      <div className="mx-auto flex max-w-container flex-col items-center gap-3">
        <LatestCommit />
        <p className="text-xs tracking-wider text-faint">
          &copy; {new Date().getFullYear()} Justin Cordova
        </p>
      </div>
    </footer>
  );
}
