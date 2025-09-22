import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Globe, Users, Lightbulb } from "lucide-react";
import { RequestAccessPopup } from "@/components/RequestAccessPopup";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
              About Our <br />
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Consortium
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A decade-long partnership between two innovative companies, building the future of AI and blockchain technology.
            </p>
          </div>
        </div>
      </section>

      {/* Partnership Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                10 Years of Innovation Together
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our consortium brings together complementary expertise in AI engine development and user interface design. 
                For over a decade, we've been collaborating on cutting-edge projects in Blockchain and Artificial Intelligence.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Joint Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Innovation Focus</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Years Partnership</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">Core Technologies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Consortium Members
            </h2>
            <p className="text-lg text-muted-foreground">
              Two specialized companies working as one unified team
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* NestAI Card */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">NestAI</h3>
                    <p className="text-primary font-medium">nestai.tools</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Cieszyn, Poland</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Specializes in AI engine development and core technology infrastructure. 
                  Our engine team focuses on building robust, scalable AI systems that power modern applications.
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Core Expertise:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI Engine Architecture</li>
                    <li>• Machine Learning Systems</li>
                    <li>• Backend Infrastructure</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* CorballyConcepts Card */}
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-primary/20">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">CorballyConcepts</h3>
                    <p className="text-primary font-medium">corballyconcepts.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Dublin, Ireland</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Builds user interfaces and develops proof-of-concepts that bring AI technology to life. 
                  Our design team creates intuitive experiences that make complex AI accessible.
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Core Expertise:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• User Interface Design</li>
                    <li>• Proof-of-Concept Development</li>
                    <li>• Frontend Architecture</li>
                    <li>• User Experience Strategy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Technology Focus
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              For a decade, we've been at the forefront of two revolutionary technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Artificial Intelligence</h3>
                <p className="text-muted-foreground mb-6">
                  Building intelligent systems that understand, learn, and adapt. From natural language processing 
                  to machine learning algorithms, we create AI solutions that solve real-world problems.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Natural Language Processing</li>
                  <li>• Machine Learning Models</li>
                  <li>• Conversational AI Systems</li>
                  <li>• Intelligent Automation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Blockchain Technology</h3>
                <p className="text-muted-foreground mb-6">
                  Developing decentralized solutions that ensure transparency, security, and trust. 
                  Our blockchain expertise spans from smart contracts to distributed systems architecture.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Smart Contract Development</li>
                  <li>• Decentralized Applications</li>
                  <li>• Blockchain Architecture</li>
                  <li>• Cryptocurrency Solutions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto">
            Ready to work with <br />
            our consortium?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our combined expertise can bring your AI and blockchain projects to life.
          </p>
          <RequestAccessPopup>
            <Button 
              variant="glass" 
              size="lg"
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </RequestAccessPopup>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;