import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";
import Home from "@/pages/Home";
import Pics from "@/pages/Pics";
import Projects from "@/pages/Projects";

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitioning(true);
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitioning(false);
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      key={displayLocation.pathname}
      className={`transition-opacity duration-120 ${transitioning ? "opacity-0" : "opacity-100"}`}
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
          <Route path="/pics" element={<Pics />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
