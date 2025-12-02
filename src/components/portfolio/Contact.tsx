import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Github, Linkedin, Download, Eye } from "lucide-react";
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
    <section className="py-16 sm:py-20 px-4 sm:px-6" id="contact">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-lg sm:text-xl text-muted-foreground mt-4 sm:mt-6 max-w-3xl mx-auto px-4">
            Whether you want to chat about tech, team up on a project, or just
            say hi, I’d love to connect!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={method.label}
                  className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-105 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <a
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="block"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-${method.color}/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-${method.color}/30 transition-colors duration-300`}
                      >
                        <IconComponent
                          className={`h-5 w-5 sm:h-6 sm:w-6 text-${method.color} group-hover:scale-110 transition-transform duration-300`}
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                        {method.label}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm text-muted-foreground group-hover:text-${method.color} transition-colors duration-300 break-all`}
                      >
                        {method.value}
                      </p>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center space-y-6 sm:space-y-8">
            <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-portfolio-glow">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base px-4">
                  I'm always open to connecting—whether it's to collaborate on a
                  project, join a team, or chat about web development and AI/ML.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105 w-full sm:w-auto sm:min-w-[200px]"
                    asChild
                  >
                    <a href="mailto:justinavodroc@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Me an Email
                    </a>
                  </Button>
                  <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-portfolio-accent/30 hover:border-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-300 w-full sm:w-auto sm:min-w-[200px]"
                        onClick={() => setResumeOpen(true)}
                      >
                        <Eye className="mr-2 h-5 w-5" />
                        Preview Resume
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
                          src="/resume.pdf"
                          title="Resume Preview"
                          className="w-full h-full border-0"
                          loading="lazy"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 sm:p-6 bg-portfolio-section/50 rounded-lg border border-border/30">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="text-portfolio-glow font-medium">
                  Currently:
                </span>{" "}
                Available for internships, part-time opportunities, and
                projects. Expected graduation: December 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
