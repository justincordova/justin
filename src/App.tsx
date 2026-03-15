import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Pics from "@/pages/Pics";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

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
      <Routes location={displayLocation}>
        {children}
      </Routes>
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
          <Route path="/about" element={<About />} />
          <Route path="/pics" element={<Pics />} />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
