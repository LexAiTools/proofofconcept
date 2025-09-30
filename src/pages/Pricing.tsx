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

const Pricing = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Explainable and accurate answers",
      description: "Minimal hallucinations with state-of-the-art answer engine grounded in source materials, rigorously tested across 100+ deployments."
    },
    {
      icon: Settings,
      title: "Comprehensive integrations", 
      description: "30+ data source integrations that are optimized for LLMs and automatically refresh, ensuring up-to-date information."
    },
    {
      icon: Rocket,
      title: "Off-the-shelf deployments",
      description: "1-click deployments including website chatbot widgets, Slack bots, Discord bots, and APIs for easy integration."
    },
    {
      icon: BarChart,
      title: "Actionable analytics suite",
      description: "Get insight in to real user intentions by analyzing conversations and use the platform to find gaps in your documentation."
    },
    {
      icon: Shield,
      title: "Enterprise-grade security",
      description: "Secure by design with SOC II Type II certification and advanced PII detection & masking technology for data security."
    },
    {
      icon: Users,
      title: "End-to-end implementation success",
      description: "Full support from our technical team including answer debugging, managed source setup, and custom onboarding to ensure your successful deployment"
    }
  ];

  const pricingBenefits = [
    "AI platform fee based on your needs incl. optional add-ons",
    "Flexible scaled pricing based on answers per month", 
    "Support and integration with your tools included with every plan"
  ];

  const trustedLogos = [
    "logitech", "docker", "reddit", "monday.com"
  ];

  const stats = [
    {
      number: "10k+",
      description: "Monthly questions answered unblocking thousands of developers instantly.",
      company: "Docker"
    },
    {
      number: "24/7", 
      description: "Global self-help coverage with multi-language tech support.",
      company: "OpenAI"
    },
    {
      number: "28%",
      description: "Improvement in support response time with AI-Powered Developer Support.",
      company: "CircleCI"
    },
    {
      number: "20%",
      description: "Decrease in support tickets with instant AI answers.",
      company: "Mapbox"
    }
  ];

  const testimonials = [
    {
      quote: "CorballyConcepts is the only LLM-based system I trust to put in front of our customers",
      author: "Rusty Wilson",
      position: "VP Support @ Sonatype",
      company: "Sonatype"
    },
    {
      quote: "Our team did its best to stump CorballyConcepts, and time and time again, it delivered helpful, accurate responses.",
      author: "Michael Ellis", 
      position: "Developer Lead @ Ionic",
      company: "Ionic"
    },
    {
      quote: "CorballyConcepts is much better at answering questions about Prisma than ChatGPT is",
      author: "Soren Schmidt",
      position: "CEO @ Prisma", 
      company: "Prisma"
    }
  ];

  const faqs = [
    {
      question: "What LLM do you use?",
      answer: "We use a combination of state-of-the-art language models optimized for technical documentation and customer support scenarios."
    },
    {
      question: "How accurate is CorballyConcepts?",
      answer: "Our platform maintains industry-leading accuracy through rigorous testing across 100+ deployments and continuous improvement of our answer engine."
    },
    {
      question: "How do you solve hallucinations?",
      answer: "We use advanced grounding techniques, source citation, and confidence scoring to minimize hallucinations and ensure reliable answers."
    },
    {
      question: "Do you use fine-tuning or RAG?",
      answer: "We use a hybrid approach combining the best of both RAG (Retrieval-Augmented Generation) and fine-tuning for optimal performance."
    },
    {
      question: "What support does CorballyConcepts provide?",
      answer: "We offer comprehensive support including technical onboarding, answer debugging, managed source setup, and ongoing optimization assistance."
    },
    {
      question: "Do you have a special tier for non-commercial OSS?",
      answer: "Yes, we offer special pricing for open source projects and non-commercial use cases. Contact our team for details."
    },
    {
      question: "Who do I reach out to for commercial and billing questions?",
      answer: "Please contact our sales team at sales@corballyconcepts.com for all commercial inquiries and billing questions."
    }
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
                  Get started with <br />
                  CorballyConcepts pricing
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8">
                  CorballyConcepts' pricing is tailored to your specific team's needs.
                </p>

                <div className="space-y-4 mb-8">
                  {pricingBenefits.map((benefit, index) => (
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
                    <form className="space-y-6">
                      <div>
                        <Label htmlFor="email" className="text-foreground font-medium">
                          Work Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@acme.com"
                          className="mt-2 bg-input border-border"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="problem" className="text-foreground font-medium">
                          What problem are you trying to solve?
                        </Label>
                        <Textarea
                          id="problem"
                          placeholder="Building an AI assistant for my docs, rolling out internal support agent etc."
                          className="mt-2 bg-input border-border min-h-[120px]"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
                        size="lg"
                      >
                        Request pricing
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
              Trusted by leading teams
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
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
              Why companies choose CorballyConcepts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
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
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-8">
                    <blockquote className="text-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.author.split(' ').map(n => n[0]).join('')}
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
              Frequently asked questions
            </h2>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
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