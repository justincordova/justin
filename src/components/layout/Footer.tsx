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
  if (!latest) return null;

  const message = latest.message.split("\n")[0];

  return (
    <a
      href={latest.commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex max-w-full items-center gap-2 truncate text-[11px] text-faint transition-colors hover:text-muted"
      style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
    >
      <span className="uppercase tracking-[0.15em] text-faint/60">last commit</span>
      <span className="text-faint/60">·</span>
      <span className="truncate text-faint group-hover:text-muted">{message}</span>
      <span className="text-faint/60">·</span>
      <span>{latest.repoName}</span>
      <span className="text-faint/60">·</span>
      <span>{timeAgo(latest.timestamp)}</span>
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
