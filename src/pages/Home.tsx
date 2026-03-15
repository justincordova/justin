import Hero from "@/components/home/Hero";
import CompanyBadges from "@/components/home/CompanyBadges";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentActivity from "@/components/home/RecentActivity";
import LocationWidget from "@/components/home/LocationWidget";

export default function Home() {
  return (
    <div>
      <Hero />
      <CompanyBadges />
      <FeaturedProjects />

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-container items-stretch gap-6 lg:grid-cols-[1fr_280px]">
          <RecentActivity />
          <LocationWidget />
        </div>
      </section>
    </div>
  );
}
