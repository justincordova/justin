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

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-surface">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-2.5">
        <Skeleton className="mb-2 h-3 w-2/5" />
        <Skeleton className="mb-1.5 h-3 w-full" />
        <Skeleton className="mb-2 h-3 w-3/4" />
        <div className="flex gap-1">
          <Skeleton className="h-4 w-10 rounded-md" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function CommitItemSkeleton() {
  return (
    <div className="border-b border-edge/50 px-4 py-3 last:border-b-0">
      <Skeleton className="mb-2 h-4 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
