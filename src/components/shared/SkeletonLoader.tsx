import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-ctp-surface1/40 via-ctp-surface1/20 to-ctp-surface1/40 bg-[length:200%_100%] animate-shimmer",
        className
      )}
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-ctp-surface1 bg-ctp-surface0 p-5">
      <Skeleton className="mb-3 h-5 w-3/5" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-md" />
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-5 w-12 rounded-md" />
      </div>
    </div>
  );
}

export function CommitItemSkeleton() {
  return (
    <div className="border-b border-ctp-surface1/50 px-4 py-3 last:border-b-0">
      <Skeleton className="mb-2 h-4 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
