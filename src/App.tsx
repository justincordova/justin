import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Photos from "@/pages/Photos";
import Projects from "@/pages/Projects";

// Length of the fade in/out between routes. Must match the Tailwind duration
// class below so the timeout fires after the fade-out actually finishes.
const PAGE_FADE_MS = 150;

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitioning(true);
      const timeout = setTimeout(() => {
        // Scroll first so the new page mounts at the top, not at the previous
        // page's scroll position (which causes a visible jump on slow nets).
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setDisplayLocation(location);
        setTransitioning(false);
      }, PAGE_FADE_MS);
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      key={displayLocation.pathname}
      className={`transition-opacity duration-150 ${transitioning ? "opacity-0" : "opacity-100"}`}
    >
      <Routes location={displayLocation}>{children}</Routes>
    </div>
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <PageTransition>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photos" element={<Photos />} />
          {/* Legacy URL — page was previously called /pics. Preserve any
              external links by redirecting to the new path. */}
          <Route path="/pics" element={<Navigate to="/photos" replace />} />
          <Route path="*" element={<NotFound />} />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
