import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const Contact = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "justinavodroc@gmail.com",
      href: "mailto:justinavodroc@gmail.com",
      color: "portfolio-glow",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "justinalolorcordova",
      href: "https://linkedin.com/in/justinalolorcordova",
      color: "portfolio-glow",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "JustinCordova",
      href: "https://github.com/JustinCordova",
      color: "portfolio-accent",
    },
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6" id="contact">
      <div className="container max-w-5xl mx-auto">
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-6">
            Let's Connect
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-8 max-w-2xl">
            I'm always open to connecting, whether it's to collaborate on a
            project, join a team, or chat about tech.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-12">
          {/* Contact Links */}
          <div className="flex flex-wrap gap-6">
            {contactMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      {method.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {method.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Main CTA */}
          <div className="pt-8 border-t border-border/30">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">
                Get in Touch
              </h3>
              <p className="text-muted-foreground max-w-2xl">
                Send me an email or check out my resume to learn more about my
                experience and projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] sm:w-auto"
                  asChild
                >
                  <a href="mailto:justinavodroc@gmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Send Email
                  </a>
                </Button>

                <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      View Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className="max-w-[95vw] sm:max-w-3xl w-full p-0 overflow-hidden flex flex-col"
                    style={{ height: "85vh" }}
                  >
                    <div
                      className="relative w-full flex-1 flex flex-col"
                      style={{ paddingTop: "2.5rem" }}
                    >
                      <iframe
                        src="/justincordova.pdf"
                        title="Resume Preview"
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">Currently:</span> Available
              for internships, part-time opportunities, and projects. Expected
              graduation: December 2026.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-border/20 text-center">
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
