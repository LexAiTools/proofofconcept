import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Settings, 
  Rocket, 
  BarChart, 
  Shield, 
  Users,
  Check,
  ChevronDown
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation(['pricing', 'common']);
  const [formData, setFormData] = useState({
    email: "",
    problem: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from("leads").insert({
        email: formData.email,
        problem: formData.problem,
        source_form: "pricing",
        status: "new",
      });

      if (error) throw error;

      toast.success(t('pricing:messages.success'));
      setFormData({
        email: "",
        problem: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t('pricing:messages.error'));
    }
  };

  const features = [
    MessageCircle,
    Settings,
    Rocket,
    BarChart,
    Shield,
    Users
  ];

  const trustedLogos = [
    "logitech", "docker", "reddit", "monday.com"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              
              {/* Left Column - Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {t('pricing:hero.title')} <br />
                  {t('pricing:hero.titleHighlight')}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  {t('pricing:hero.subtitle')}
                </p>

                <div className="space-y-4 mb-8">
                  {(t('pricing:benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-primary flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 opacity-60">
                  {trustedLogos.map((logo, index) => (
                    <div key={index} className="text-muted-foreground font-semibold">
                      {logo}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Form */}
              <div>
                <Card className="bg-card border-border">
                  <CardContent className="p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <Label htmlFor="email" className="text-foreground font-medium">
                          {t('pricing:form.email.label')}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('pricing:form.email.placeholder')}
                          className="mt-2 bg-input border-border"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="problem" className="text-foreground font-medium">
                          {t('pricing:form.problem.label')}
                        </Label>
                        <Textarea
                          id="problem"
                          placeholder={t('pricing:form.problem.placeholder')}
                          className="mt-2 bg-input border-border min-h-[120px]"
                          value={formData.problem}
                          onChange={(e) => setFormData({...formData, problem: e.target.value})}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                        size="lg"
                      >
                        {t('pricing:form.submit')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
            </div>
          </div>
        </section>

        {/* Trusted By Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('pricing:trustedBy.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {(t('pricing:stats', { returnObjects: true }) as Array<{number: string, description: string, company: string}>).map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    {stat.number}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {stat.description}
                  </p>
                  <div className="text-sm font-semibold text-foreground">
                    {stat.company}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Companies Choose Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('pricing:whyChoose.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {(t('pricing:features', { returnObjects: true }) as Array<{title: string, description: string}>).map((feature, index) => {
                const Icon = features[index];
                return (
                  <Card key={index} className="bg-card border-border hover:shadow-glow/20 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-4">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {(t('pricing:testimonials', { returnObjects: true }) as Array<{quote: string, author: string, position: string}>).map((testimonial, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-8">
                    <blockquote className="text-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.author.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">
              {t('pricing:faq.title')}
            </h2>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {(t('pricing:faq.questions', { returnObjects: true }) as Array<{question: string, answer: string}>).map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;