import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-portfolio-glow opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-portfolio-accent opacity-15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-text bg-clip-text text-transparent animate-pulse">
                justin cordova
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Computer Science Student @NJIT passionate
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>about
              <span className="text-portfolio-glow font-semibold">
                {" "}
                software engineering
              </span>{" "}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6 sm:pt-8">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              asChild
            >
              <a href="mailto:justinavodroc@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 pt-6 sm:pt-8">
            <a
              href="https://linkedin.com/in/justinalolorcordova"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-portfolio-glow/20 transition-all duration-300 hover:shadow-glow hover:scale-110"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-portfolio-glow" />
            </a>
            <a
              href="https://github.com/JustinCordova"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-portfolio-accent/20 transition-all duration-300 hover:shadow-glow hover:scale-110"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 text-portfolio-accent" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
