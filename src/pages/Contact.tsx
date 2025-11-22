import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail, MapPin, Phone, ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const Contact = () => {
  const { t, i18n } = useTranslation(['contact', 'common']);
  const location = useLocation();
  
  const currentUrl = `https://app.proof-of-concept.pl${location.pathname}`;
  const altLang = i18n.language === 'pl' ? 'en' : 'pl';
  const altUrl = i18n.language === 'pl' ? `https://app.proof-of-concept.pl/en${location.pathname}` : `https://app.proof-of-concept.pl${location.pathname}`;
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        data_sources: formData.dataSources,
        message: formData.message,
        source_form: "contact",
        status: "new",
      });

      if (error) throw error;

      toast.success(t('contact:messages.success'));
      setFormData({
        name: "",
        email: "",
        company: "",
        dataSources: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t('contact:messages.error'));
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('contact:meta.title')}</title>
        <meta name="description" content={t('contact:meta.description')} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('contact:meta.title')} />
        <meta property="og:description" content={t('contact:meta.description')} />
        <meta property="og:url" content={currentUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('contact:meta.title')} />
        <meta name="twitter:description" content={t('contact:meta.description')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang={i18n.language} href={currentUrl} />
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://app.proof-of-concept.pl/contact" />
      </Helmet>
      <Header />
      
      <section className="pt-24 sm:pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Column - Form */}
            <div className="bg-gradient-to-br from-muted/50 to-background p-4 sm:p-6 lg:p-8 rounded-2xl border border-border/50">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {t('contact:title')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-primary">
                    {t('contact:titleHighlight')}
                  </span> {t('contact:titleEnd')}
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  {t('contact:subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dataSources">{t('contact:form.dataSources.label')} *</Label>
                  <Textarea
                    id="dataSources"
                    name="dataSources"
                    placeholder={t('contact:form.dataSources.placeholder')}
                    value={formData.dataSources}
                    onChange={handleInputChange}
                    className="min-h-[100px] bg-background/50"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact:form.name.label')} *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder={t('contact:form.name.placeholder')}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t('contact:form.company.label')}</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder={t('contact:form.company.placeholder')}
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t('contact:form.email.label')} *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('contact:form.email.placeholder')}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact:form.message.label')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t('contact:form.message.placeholder')}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold bg-gradient-primary hover:opacity-90"
                >
                  {t('contact:form.submit')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              {/* Features */}
              <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50">
                {[
                  t('contact:features.consultation'),
                  t('contact:features.solutions'),
                  t('contact:features.support'),
                  t('contact:features.compliant')
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-6">
                {t('contact:privacy.text')}{" "}
                <a href="#" className="text-primary hover:underline">{t('contact:privacy.privacyPolicy')}</a> {t('contact:privacy.and')}{" "}
                <a href="#" className="text-primary hover:underline">{t('contact:privacy.termsOfService')}</a>.
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
                      <div className="font-semibold text-foreground">{t('contact:testimonial.company')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact:testimonial.subtitle')}</div>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{t('contact:testimonial.quote')}"
                  </blockquote>
                </CardContent>
              </Card>

              {/* Trusted By */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t('contact:trustedBy')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {["OpenAI", "Microsoft", "Google", "Amazon", "Meta", "Apple", "Tesla", "Stripe"].map((company, index) => (
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
                <h3 className="text-lg font-semibold text-foreground">{t('contact:contactInfo.title')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t('contact:contactInfo.polandOffice.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact:contactInfo.polandOffice.location')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact:contactInfo.polandOffice.description')}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <a 
                          href="https://t.me/bartekblicharski" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          @bartekblicharski
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{t('contact:contactInfo.irelandOffice.title')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact:contactInfo.irelandOffice.location')}</div>
                      <div className="text-sm text-muted-foreground">{t('contact:contactInfo.irelandOffice.description')}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <a 
                          href="https://t.me/DecArtTom" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          @DecArtTom
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">{t('contact:contactInfo.nestaiEmail')}</div>
                      <div className="text-sm text-muted-foreground">info@nestai.tools</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-foreground">{t('contact:contactInfo.corballyEmail')}</div>
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