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
        <div className="space-y-8 sm:space-y-10">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight leading-tight">
              <span className="text-foreground">justin</span>
              <br />
              <span className="bg-gradient-text bg-clip-text text-transparent animate-pulse">
                cordova
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 font-light">
              <span className="text-primary font-medium">CS @NJIT & SDE Intern @PureTechInc</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-[1.02] w-full sm:w-auto"
              asChild
            >
              <a href="mailto:justinavodroc@gmail.com" className="font-medium">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <a
              href="https://linkedin.com/in/justinalolorcordova"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/60 hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary" />
            </a>
            <a
              href="https://github.com/JustinCordova"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/60 hover:bg-portfolio-accent/20 transition-all duration-300 hover:scale-110 group"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 text-portfolio-accent group-hover:text-portfolio-accent" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
