import { useEffect } from "react";

/**
 * Counted body scroll lock. Multiple components can call this concurrently
 * and the body will stay locked until *every* lock has been released. This
 * prevents one modal's cleanup from prematurely unlocking the body while
 * another modal/gallery is still open.
 *
 * Calling code passes `active`. When the count transitions 0 → 1 the body
 * style is locked; when it returns to 0 the inline overflow is cleared so
 * the page's stylesheet takes over.
 *
 * We do NOT snapshot `body.style.overflow` before locking. Snapshotting
 * caused a subtle bug: if any non-hook code (browser extension, theme
 * layer, other modal library) set overflow while a hook lock was held,
 * the snapshot was the locked value ("hidden"), and the snapshot-restore
 * on release would erase the unrelated change. Clearing the inline
 * property always lands in a predictable, stylesheet-driven state.
 */

let lockCount = 0;

function acquire() {
  if (lockCount === 0) {
    // On systems with classic (non-overlay) scrollbars, hiding the scrollbar
    // widens the page and everything jumps sideways. Pad the body by the
    // scrollbar's width so the layout stays put. Zero on overlay scrollbars.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

function release() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("padding-right");
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
