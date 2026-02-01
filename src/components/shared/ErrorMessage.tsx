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
    <div className="flex flex-col items-center gap-4 rounded-lg border border-ctp-surface1/40 bg-ctp-surface0/30 p-8 text-center">
      <AlertCircle className="h-6 w-6 text-ctp-red/80" />
      <p className="text-sm text-ctp-subtext0">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-ctp-surface1 px-4 py-1.5 text-xs font-medium tracking-wide text-ctp-subtext1 transition-all duration-200 hover:border-ctp-mauve/50 hover:text-ctp-mauve"
        >
          Retry
        </button>
      )}
    </div>
  );
}
