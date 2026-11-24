import { useRef } from "react";

const SWIPE_THRESHOLD_PX = 50;

/**
 * Touch handlers for horizontal swipe navigation. Swiping left calls
 * `onNext`, swiping right calls `onPrev`. Mostly-vertical drags and
 * multi-finger gestures are ignored so they don't fight scroll or pinch.
 */
export function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) {
      start.current = null;
      return;
    }
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const origin = start.current;
    start.current = null;
    if (!origin) return;
    const dx = e.changedTouches[0].clientX - origin.x;
    const dy = e.changedTouches[0].clientY - origin.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  return { onTouchStart, onTouchEnd };
}
