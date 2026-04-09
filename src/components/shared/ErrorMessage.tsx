import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-edge/40 bg-surface/30 p-8 text-center">
      <AlertCircle className="h-6 w-6 text-red-400/80" />
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
