import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-surface-2/40 via-surface-2/20 to-surface-2/40 bg-[length:200%_100%] animate-shimmer",
        className,
      )}
    />
  );
}

export function ProjectRowSkeleton() {
  // Mirrors ProjectRow's actual structure: square 28px logo (most real logos
  // are square images, not circular avatars), title row, description, topics.
  return (
    <div className="flex items-center gap-5 border-b border-edge/40 px-2 py-5 last:border-b-0">
      <Skeleton className="h-7 w-7 shrink-0 rounded-md" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="mt-1.5 h-3 w-3/4" />
        <Skeleton className="mt-1.5 h-3 w-2/5" />
      </div>
    </div>
  );
}
