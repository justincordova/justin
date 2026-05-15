import { useEffect } from "react";

/**
 * Counted body scroll lock. Multiple components can call this concurrently
 * and the body will stay locked until *every* lock has been released. This
 * prevents one modal's cleanup from prematurely unlocking the body while
 * another modal/gallery is still open.
 *
 * Calling code passes `active`. When the count transitions 0 → 1 the body
 * style is set; when it returns to 0 the previous style is restored.
 */

let lockCount = 0;
let previousOverflow: string | null = null;

function acquire() {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function release() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow ?? "";
    previousOverflow = null;
  }
}

export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    acquire();
    return () => {
      release();
    };
  }, [active]);
}
