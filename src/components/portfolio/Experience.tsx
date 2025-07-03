import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

const Experience = () => {
  return (
    <section className="py-20 px-6" id="experience">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-text bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-500">
            <CardHeader className="pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-portfolio-glow mb-2">
                    TNT Fireworks Associate
                  </CardTitle>
                  <p className="text-lg text-portfolio-accent font-medium">TNT Fireworks</p>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Jun 2024 – July 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Easton, PA</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="p-4 bg-portfolio-section rounded-lg border border-border/30">
                  <h4 className="font-semibold text-portfolio-glow mb-2">Customer Transaction Management</h4>
                  <p className="text-muted-foreground">
                    Delivered fast and accurate checkout experiences by processing <strong>100+ customer transactions</strong> daily 
                    during peak fireworks season, helping maintain steady sales flow and reducing wait times.
                  </p>
                </div>
                
                <div className="p-4 bg-portfolio-section rounded-lg border border-border/30">
                  <h4 className="font-semibold text-portfolio-accent mb-2">Operational Efficiency</h4>
                  <p className="text-muted-foreground">
                    Improved store efficiency by restocking <strong>200+ items</strong> per shift and ensuring a clean, organized 
                    environment, contributing to a <strong>15% faster customer turnaround</strong> and positive in-store experience.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-3 text-foreground">Key Skills Developed</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="hover:bg-portfolio-glow/20 transition-colors duration-300">
                    Customer Service
                  </Badge>
                  <Badge variant="secondary" className="hover:bg-portfolio-accent/20 transition-colors duration-300">
                    Time Management
                  </Badge>
                  <Badge variant="secondary" className="hover:bg-portfolio-glow/20 transition-colors duration-300">
                    Problem Solving
                  </Badge>
                  <Badge variant="secondary" className="hover:bg-portfolio-accent/20 transition-colors duration-300">
                    Team Collaboration
                  </Badge>
                  <Badge variant="secondary" className="hover:bg-portfolio-glow/20 transition-colors duration-300">
                    Process Optimization
                  </Badge>
                </div>
              </div>

              <div className="p-6 bg-gradient-primary/10 rounded-lg border border-portfolio-glow/30">
                <p className="text-sm text-muted-foreground italic">
                  "This experience taught me the importance of maintaining high performance under pressure 
                  while delivering exceptional customer service – skills that directly translate to 
                  software development and team collaboration."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;