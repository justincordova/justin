import { AlertCircle, Clock } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
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
  tone = "error",
}: ErrorMessageProps) {
  const Icon = tone === "info" ? Clock : AlertCircle;
  const iconClass = tone === "info" ? "text-muted" : "text-red-400/80";

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-edge/40 bg-surface/30 p-8 text-center">
      <Icon className={`h-6 w-6 ${iconClass}`} />
      <p className="text-sm text-muted">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg border border-edge px-4 py-1.5 text-xs font-medium tracking-wide text-muted transition-all duration-200 hover:border-primary/50 hover:text-primary"
        >
          Retry
        </button>
      )}
    </div>
  );
}
