import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  const softSkills = [
    "Reliability", "Adaptability", "Creativity", "Flexibility", "Positive Attitude"
  ];

  return (
    <section className="py-20 px-6" id="about">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-glow">Profile</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Computer Science student at NJIT with hands-on experience in full-stack development, 
                software engineering, and a strong passion for AI/ML. I specialize in building 
                full-stack applications and writing clean, efficient code that makes a difference.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-portfolio-accent">Education</h4>
                  <div className="bg-portfolio-section p-4 rounded-lg border border-border/30">
                    <h5 className="font-medium text-foreground">New Jersey Institute of Technology</h5>
                    <p className="text-muted-foreground">B.S. Computer Science</p>
                    <p className="text-sm text-portfolio-glow">Expected Fall 2026 • Newark, New Jersey</p>
                    <div className="mt-2">
                      <Badge variant="secondary" className="mr-2">Highlander Achievement Scholarship</Badge>
                      <Badge variant="secondary">Dean's Scholar</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-accent">Soft Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <div
                    key={skill}
                    className="group p-4 bg-portfolio-section rounded-lg border border-border/30 hover:border-portfolio-glow/50 transition-all duration-300 hover:shadow-glow/20"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-primary rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-sm font-medium text-foreground group-hover:text-portfolio-glow transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-portfolio-section rounded-lg border border-border/30">
                <h4 className="text-lg font-semibold mb-3 text-portfolio-glow">Current Focus</h4>
                <p className="text-muted-foreground">
                  Currently diving deep into machine learning and full-stack development, 
                  while building projects that combine both worlds to create intelligent, 
                  user-friendly applications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;