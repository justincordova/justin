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
      </div>
    </div>
  );
}
