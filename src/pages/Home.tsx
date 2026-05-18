import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import { useSpaceScrollToHero } from "@/hooks/useSpaceScrollToHero";

export default function Home() {
  useSpaceScrollToHero();

  return (
    <div>
      <Hero />

      <div id="content" className="pt-24 md:pt-32">
        <div className="mx-auto max-w-container px-6">
          <div className="h-px bg-edge/30" />
        </div>

        <div className="pt-12">
          <FeaturedProjects />
        </div>

        <div className="mx-auto max-w-container px-6 pt-12">
          <div className="h-px bg-edge/30" />
        </div>

        <section className="animate-fade-up stagger-2 px-6 pt-12">
          <div className="mx-auto max-w-container">
            <p
              className="mb-4 text-[11px] uppercase tracking-[0.15em] text-faint/60"
              style={{ fontFamily: "'Geist Mono', ui-monospace, monospace" }}
            >
              About
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              I build full-stack applications — from C# and .NET backends to React and TypeScript
              frontends. Always exploring new tools and looking for the next thing to ship.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
