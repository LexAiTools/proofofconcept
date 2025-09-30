import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Settings, Database, CreditCard, Shield, Check } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BookDemo = () => {
  const [formData, setFormData] = useState({
    source: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from("leads").insert({
        email: formData.email,
        company: formData.company,
        data_sources: formData.source,
        additional_requirements: formData.message,
        source_form: "book-demo",
        status: "new",
      });

      if (error) throw error;

      toast.success("Dziękujemy! Skontaktujemy się z Tobą wkrótce.");
      setFormData({
        source: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Experience Our AI <span className="text-primary">WordPress Plugin</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your WordPress site with our powerful AI assistant. Download, install, and start using advanced AI capabilities in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Download className="w-5 h-5 mr-2" />
                Download Plugin
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Plugin Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              WordPress Plugin Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our NestAI WordPress plugin brings enterprise-grade AI capabilities directly to your website with easy setup and powerful features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-border bg-card">
              <CardHeader>
                <Settings className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Integration Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Configure your AI assistant with custom settings including system name, API key integration, and response style preferences.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Custom assistant name
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Secure API key management
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Response style customization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CreditCard className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Credit Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Monitor your AI usage with real-time credit tracking and flexible top-up packages to suit your needs.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">0.00</span>
                    <Badge variant="secondary">Available Credits</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">10</div>
                    <div>credits</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">50</div>
                    <div>credits</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">100</div>
                    <div>credits</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Database className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Knowledge Base RAG</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload and manage your knowledge base with support for multiple file formats and intelligent document processing.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    PDF, TXT, CSV, DOCX, XLSX
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Drag & drop upload
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    WordPress data integration
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-12 text-center">
              Easy Installation Process
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Download the Plugin</h3>
                  <p className="text-muted-foreground">Download the NestAI WordPress plugin from our secure server. The plugin is regularly updated with new features and security improvements.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Install in WordPress</h3>
                  <p className="text-muted-foreground">Upload the plugin through your WordPress admin panel or via FTP. Activate it with one click and access the configuration panel.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Configure Your AI</h3>
                  <p className="text-muted-foreground">Set up your AI assistant name, add your API key, and customize the response style to match your brand voice and requirements.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Start Using AI</h3>
                  <p className="text-muted-foreground">Begin leveraging AI capabilities immediately. Upload documents to your knowledge base and start providing intelligent responses to your users.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Start Using AI in Your <span className="text-primary">Content Today</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Request a personalized demo and see how our AI can transform your WordPress site with intelligent content generation and user interactions.
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      What data sources do you want to use? *
                    </label>
                    <Textarea
                      placeholder="Documentation, help center, reports, wiki etc."
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Business email address *
                    </label>
                    <Input
                      type="email"
                      placeholder="Your business email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional requirements
                    </label>
                    <Textarea
                      placeholder="Tell us about your specific needs and use cases..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full">
                    Request Demo & Proof-of-Concept
                  </Button>

                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      7-day free trial
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      Full content access
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      SOC II compliant
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              By clicking "Request Demo", you agree to the processing of your data in accordance with our{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for marketing purposes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemo;