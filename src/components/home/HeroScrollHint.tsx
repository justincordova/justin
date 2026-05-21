import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroScrollHint() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const vh = window.innerHeight || 1;
      const fadeDistance = vh * 0.3;
      const next = Math.max(0, 1 - window.scrollY / fadeDistance);
      setOpacity(next);
      frame = 0;
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handleClick = () => {
    const content = document.getElementById("content");
    if (!content) return;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    content.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to content"
      style={{ opacity }}
      className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-faint transition-colors duration-150 hover:text-muted motion-reduce:transition-none"
    >
      {/* "Press space" only renders on viewports that actually have a
          spacebar. On touch the chevron alone is a sufficient cue. */}
      <span className="hidden text-[10px] uppercase tracking-[0.15em] md:inline">Press space</span>
      <ChevronDown
        className="h-3.5 w-3.5 animate-bounce-soft motion-reduce:animate-none"
        aria-hidden="true"
      />
    </button>
  );
}
