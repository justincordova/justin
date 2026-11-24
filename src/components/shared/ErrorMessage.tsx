import { AlertCircle, Clock, Loader2 } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
  /** True while a retry is in flight — disables the button and shows progress. */
  retrying?: boolean;
  /**
   * Visual tone. "error" (default) is for genuine failures; "info" is for
   * expected/recoverable issues like rate limits where alarming red would
   * be misleading.
   */
  tone?: "error" | "info";
}

export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
  retrying = false,
  tone = "error",
}: ErrorMessageProps) {
  const Icon = tone === "info" ? Clock : AlertCircle;
  const iconClass = tone === "info" ? "text-muted" : "text-red-400/80";

  return (
    <div
      role={tone === "info" ? "status" : "alert"}
      className="flex flex-col items-center gap-4 rounded-lg border border-edge/40 bg-surface/30 p-8 text-center"
    >
      <Icon className={`h-6 w-6 ${iconClass}`} aria-hidden="true" />
      <p className="text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="inline-flex items-center gap-2 rounded-lg border border-edge px-4 py-1.5 text-xs font-medium tracking-wide text-muted transition-[color,border-color,scale] duration-150 ease-out hover:border-primary/50 hover:text-primary active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
        >
          {retrying && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
          {retrying ? "Retrying…" : "Try again"}
        </button>
      )}
    </div>
  );
}
