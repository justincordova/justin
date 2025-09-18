import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#skills", label: "Skills" },
      { href: "#experience", label: "Experience" },
      { href: "#projects", label: "Projects" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      let found = false;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }
      // If at the very top, clear highlight
      const firstSection = document.getElementById(sections[0]);
      if (firstSection && window.scrollY < firstSection.offsetTop - 50) {
        setActiveSection("");
      } else if (!found) {
        // If not at top and no section found, keep previous
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-center w-full gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold bg-gradient-text bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              justin cordova
            </button>
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`hover:bg-portfolio-glow/20 transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "text-portfolio-glow bg-portfolio-glow/10"
                      : "text-muted-foreground hover:text-portfolio-glow"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex items-center justify-between w-full">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg font-bold bg-gradient-text bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            >
              justin cordova
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`justify-start hover:bg-portfolio-glow/20 transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "text-portfolio-glow bg-portfolio-glow/10"
                      : "text-muted-foreground hover:text-portfolio-glow"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
