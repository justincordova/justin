import { Loader2, X } from "lucide-react";
import { useState } from "react";
import FocusLock from "react-focus-lock";

import FeaturedProjects from "@/components/home/FeaturedProjects";
import Hero from "@/components/home/Hero";
import LocationWidget from "@/components/home/LocationWidget";
import RecentActivity from "@/components/home/RecentActivity";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  return (
    <div>
      <Hero />
      <FeaturedProjects />

      <section className="px-6 pt-8 pb-0">
        <div className="mx-auto max-w-container">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_280px]">
            <RecentActivity />
            <LocationWidget />
          </div>
        </div>
      </section>

      <section className="px-6 pt-12 pb-0">
        <div className="mx-auto flex max-w-container flex-col items-center gap-6 sm:gap-8">
          <img
            src="/about.png"
            alt="Justin Cordova"
            width={256}
            height={256}
            onClick={() => {
              setImageLoading(true);
              setSelectedImage("/about.png");
            }}
            className="h-48 w-auto cursor-pointer rounded-xl border border-edge object-cover transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-edge/50 sm:h-64"
          />
          <div className="max-w-[600px] space-y-4 text-center text-lg leading-relaxed text-muted sm:text-2xl">
            <p>
              I'm a software developer intern at{" "}
              <span className="text-accent underline decoration-dotted underline-offset-4">
                Pure Technology Inc
              </span>
              , building software for a <span className="text-accent">POS</span> system: utilities,
              extensions, services, and everything in between with{" "}
              <span className="text-accent">C# and .NET</span>.
            </p>
            <p>
              I have a lot of experience with the usual full-stack tooling:{" "}
              <span className="text-accent">TypeScript</span>,{" "}
              <span className="text-accent">React</span>,{" "}
              <span className="text-accent">Node.js</span>,{" "}
              <span className="text-accent">Express</span>,{" "}
              <span className="text-accent">Next.js</span>, and more.
            </p>
            <p>
              I've also been learning <span className="text-accent">Go</span>, building backend
              projects and small CLI tools.
            </p>
            <p>
              My go-to AI tool is <span className="text-accent">Claude</span>, I use it across all
              my projects. I also use <span className="text-accent">GLM</span> on the side as a
              cheaper alternative.
            </p>
            <p>
              Outside of code, I play <span className="text-accent">racquetball</span> and{" "}
              <span className="text-accent">tennis</span>, hit the gym, and run a few times a week.
              I also enjoy <span className="text-accent">photography</span>, and I'm always down to
              explore new places.
            </p>
            <p>
              If you wanna say hi, you can find me on{" "}
              <a
                href="https://www.linkedin.com/in/justinalolorcordova/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {selectedImage && (
        <FocusLock returnFocus>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
              className="absolute right-3 top-3 z-10 rounded-full bg-surface p-2 text-content transition-colors hover:bg-surface-2"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            {imageLoading && <Loader2 className="absolute h-12 w-12 animate-spin text-primary" />}
            <img
              src={selectedImage}
              alt="Justin Cordova"
              onLoad={() => setImageLoading(false)}
              onClick={(e) => e.stopPropagation()}
              className={`max-h-[90vh] max-w-[90vw] rounded-lg object-contain ${imageLoading ? "opacity-0" : "animate-zoom-in"}`}
            />
          </div>
        </FocusLock>
      )}
    </div>
  );
}
