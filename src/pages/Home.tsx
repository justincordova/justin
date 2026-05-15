import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import LocationWidget from "@/components/home/LocationWidget";
import RecentActivity from "@/components/home/RecentActivity";
import { useSpaceScrollToHero } from "@/hooks/useSpaceScrollToHero";

export default function Home() {
  useSpaceScrollToHero();

  return (
    <div>
      <Hero />

      <div id="content">
        <FeaturedProjects />

        <section className="px-6 pt-8 pb-0">
          <div className="mx-auto max-w-container">
            <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_280px]">
              <RecentActivity />
              <LocationWidget />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
