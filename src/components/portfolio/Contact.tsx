import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Github, Linkedin, Download } from "lucide-react";

const Contact = () => {
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
    <section className="py-20 px-6" id="contact">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl mx-auto">
            Ready to discuss opportunities, collaborate on projects, or just
            have a great conversation about technology? I'd love to hear from
            you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <Card
                  key={method.label}
                  className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500 hover:scale-105 group cursor-pointer flex-1 min-w-[220px] max-w-xs"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
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
                        className={`w-12 h-12 bg-${method.color}/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${method.color}/30 transition-colors duration-300`}
                      >
                        <IconComponent
                          className={`h-6 w-6 text-${method.color} group-hover:scale-110 transition-transform duration-300`}
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {method.label}
                      </h3>
                      <p
                        className={`text-sm text-muted-foreground group-hover:text-${method.color} transition-colors duration-300 break-all`}
                      >
                        {method.value}
                      </p>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center space-y-8">
            <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-portfolio-glow">
                  Ready to Work Together?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Whether you're looking for a passionate developer for your
                  team, have an exciting project in mind, or want to discuss the
                  latest in web development and AI/ML, I'm always excited to
                  connect with fellow innovators.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                    asChild
                  >
                    <a href="mailto:justinavodroc@gmail.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Me an Email
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="border-portfolio-accent/30 hover:border-portfolio-accent hover:bg-portfolio-accent/10 transition-all duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-portfolio-section/50 rounded-lg border border-border/30">
              <p className="text-sm text-muted-foreground">
                <span className="text-portfolio-glow font-medium">
                  Currently:
                </span>{" "}
                Available for internships, part-time opportunities, and exciting
                projects. Expected graduation: Fall 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
