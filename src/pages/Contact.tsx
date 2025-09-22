import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    dataSources: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const features = [
    "Free consultation",
    "Custom AI solutions",
    "Enterprise support",
    "SOC II compliant"
  ];

  const companies = [
    "OpenAI", "Microsoft", "Google", "Amazon", "Meta", "Apple", "Tesla", "Stripe"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Form */}
            <div className="bg-gradient-to-br from-muted/50 to-background p-8 rounded-2xl border border-border/50">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Start using our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-primary">
                    AI solutions
                  </span> for free
                </h1>
                <p className="text-muted-foreground text-lg">
                  What data sources would you like to integrate with our AI platform?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dataSources">Data sources you want to use *</Label>
                  <Textarea
                    id="dataSources"
                    name="dataSources"
                    placeholder="Documentation, support center, reports, wiki, etc."
                    value={formData.dataSources}
                    onChange={handleInputChange}
                    className="min-h-[100px] bg-background/50"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your project..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:opacity-90"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              {/* Features */}
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-border/50">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                By clicking "Start", you agree to our{" "}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a> and{" "}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>.
              </p>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-8">
              {/* Testimonial */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">AI Consortium</div>
                      <div className="text-sm text-muted-foreground">NestAI & CorballyConcepts</div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "Our AI solutions demonstrate how advanced artificial intelligence systems can be implemented in real business scenarios, delivering measurable results."
                  </blockquote>
                </CardContent>
              </Card>

              {/* Trusted By */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Trusted by leading companies and startups
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {companies.map((company, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-center h-12 bg-muted/30 rounded-lg border border-border/50"
                    >
                      <span className="text-sm font-medium text-muted-foreground">{company}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Poland Office</div>
                      <div className="text-sm text-muted-foreground">Cieszyn, Poland</div>
                      <div className="text-sm text-muted-foreground">NestAI - Engine Development</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Ireland Office</div>
                      <div className="text-sm text-muted-foreground">Dublin, Ireland</div>
                      <div className="text-sm text-muted-foreground">CorballyConcepts - Interface & PoCs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">NestAI Email</div>
                      <div className="text-sm text-muted-foreground">info@nestai.tools</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">CorballyConcepts Email</div>
                      <div className="text-sm text-muted-foreground">contact@corballyconcepts.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;