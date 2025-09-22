import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Ticket, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const UseCases = () => {
  const trustedLogos = [
    "Logitech", "OpenAI", "Docker", "Reddit", "Juniper",
    "Amplitude", "Monday.com", "CircleCI", "Netlify"
  ];

  const useCases = [
    {
      icon: MessageCircle,
      title: "Ask AI",
      subtitle: "External Data",
      description: "Embed AI chat in docs and products",
      details: "Ready-made, configurable website widgets, Slack/Discord bots, and API SDKs for building custom solutions",
      stat: "+90% faster user onboarding, higher CSAT, lower user churn",
      gradient: "from-primary/20 to-primary-glow/20"
    },
    {
      icon: Ticket,
      title: "Ticket Deflector",
      subtitle: "Internal Data", 
      description: "Instantly reduce support tickets",
      details: "Simple 1-line script integration with existing support form",
      stat: "20-40% of incoming support tickets are deflected",
      gradient: "from-accent/20 to-primary/20"
    },
    {
      icon: Users,
      title: "Internal Technical Assistant",
      subtitle: "Internal Data",
      description: "Internal chat optimized for teams",
      details: "Secure chat app that has access to your internal sources",
      stat: "6 hours saved per AE, SDRs, Support, and CSMs",
      gradient: "from-primary-glow/20 to-accent/20"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        
        {/* Trusted By Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Trusted by over <br />
                200 leading <br />
                teams
              </h1>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {trustedLogos.map((logo, index) => (
                <div key={index} className="text-muted-foreground font-semibold text-lg">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Gradient Section */}
        <section className="py-20 mx-6 my-16 rounded-3xl bg-gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
              The same RAG chatbot <br />
              used by top AI <br />
              practitioners.
            </h2>
            
            <Link to="/book-demo">
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
              >
                Book Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
                Deploy PoC where your <br />
                customers and team members <br />
                will ask questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Instant technical answers that increase your company's value.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <Card key={index} className="bg-card border-border overflow-hidden hover:shadow-glow/20 transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Image/Icon Section */}
                        <div className={`p-12 bg-gradient-to-br ${useCase.gradient} flex items-center justify-center`}>
                          <div className="relative">
                            <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                              <Icon className="w-12 h-12 text-primary" />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"></div>
                            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-glow/50 rounded-full"></div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-8 lg:p-12">
                          <div className="mb-4">
                            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {useCase.subtitle}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                            {useCase.title}
                          </h3>
                          
                          <p className="text-lg text-muted-foreground mb-4">
                            {useCase.description}
                          </p>
                          
                          <p className="text-muted-foreground mb-6">
                            {useCase.details}
                          </p>

                          <div className="flex items-center text-sm font-medium text-foreground bg-primary/5 p-4 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {useCase.stat}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <Button variant="default" size="lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
};

export default UseCases;