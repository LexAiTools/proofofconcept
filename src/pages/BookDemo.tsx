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
import { DocumentsSection } from "@/components/documents/DocumentsSection";
import { useTranslation } from "react-i18next";
import { WaitlistPopup } from "@/components/WaitlistPopup";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { ActiveUsers } from "@/components/ActiveUsers";

const BookDemo = () => {
  const { t, i18n } = useTranslation(['bookDemo', 'common']);
  const location = useLocation();
  
  const currentUrl = `https://app.proof-of-concept.pl${location.pathname}`;
  const altLang = i18n.language === 'pl' ? 'en' : 'pl';
  const altUrl = i18n.language === 'pl' ? `https://app.proof-of-concept.pl/en${location.pathname}` : `https://app.proof-of-concept.pl${location.pathname}`;
  
  const [formData, setFormData] = useState({
    source: '',
    email: '',
    company: '',
    message: ''
  });
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistSource, setWaitlistSource] = useState<'download' | 'documentation'>('download');

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

      toast.success(t('bookDemo:messages.success'));
      setFormData({
        source: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t('bookDemo:messages.error'));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('bookDemo:meta.title')}</title>
        <meta name="description" content={t('bookDemo:meta.description')} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('bookDemo:meta.title')} />
        <meta property="og:description" content={t('bookDemo:meta.description')} />
        <meta property="og:url" content={currentUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('bookDemo:meta.title')} />
        <meta name="twitter:description" content={t('bookDemo:meta.description')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang={i18n.language} href={currentUrl} />
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://app.proof-of-concept.pl/book-demo" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('bookDemo:hero.title')} <span className="text-primary">{t('bookDemo:hero.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t('bookDemo:hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="group"
                onClick={() => {
                  setWaitlistSource('download');
                  setWaitlistOpen(true);
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                {t('bookDemo:hero.downloadButton')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="xl"
                onClick={() => {
                  setWaitlistSource('documentation');
                  setWaitlistOpen(true);
                }}
              >
                {t('bookDemo:hero.documentationButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Active Users */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <ActiveUsers />
          </div>
        </div>
      </section>

      {/* Plugin Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('bookDemo:features.title')}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('bookDemo:features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-border bg-card">
              <CardHeader>
                <Settings className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('bookDemo:features.integration.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('bookDemo:features.integration.description')}
                </p>
                <ul className="space-y-2 text-sm">
                  {(t('bookDemo:features.integration.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CreditCard className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('bookDemo:features.credits.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('bookDemo:features.credits.description')}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">0.00</span>
                    <Badge variant="secondary">{t('bookDemo:features.credits.available')}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">10</div>
                    <div>{t('bookDemo:features.credits.credits')}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">50</div>
                    <div>{t('bookDemo:features.credits.credits')}</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <div className="font-semibold">100</div>
                    <div>{t('bookDemo:features.credits.credits')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <Database className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('bookDemo:features.knowledgeBase.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t('bookDemo:features.knowledgeBase.description')}
                </p>
                <div className="space-y-2 text-sm">
                  {(t('bookDemo:features.knowledgeBase.items', { returnObjects: true }) as string[]).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      {item}
                    </div>
                  ))}
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
              {t('bookDemo:installation.title')}
            </h2>
            
            <div className="space-y-8">
              {(t('bookDemo:installation.steps', { returnObjects: true }) as Array<{title: string, description: string}>).map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <DocumentsSection />

      {/* Demo Request Form */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                {t('bookDemo:demoForm.title')} <span className="text-primary">{t('bookDemo:demoForm.titleHighlight')}</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('bookDemo:demoForm.subtitle')}
              </p>
            </div>

            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('bookDemo:demoForm.fields.dataSources.label')} *
                    </label>
                    <Textarea
                      placeholder={t('bookDemo:demoForm.fields.dataSources.placeholder')}
                      value={formData.source}
                      onChange={(e) => setFormData({...formData, source: e.target.value})}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('bookDemo:demoForm.fields.email.label')} *
                    </label>
                    <Input
                      type="email"
                      placeholder={t('bookDemo:demoForm.fields.email.placeholder')}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('bookDemo:demoForm.fields.company.label')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('bookDemo:demoForm.fields.company.placeholder')}
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('bookDemo:demoForm.fields.requirements.label')}
                    </label>
                    <Textarea
                      placeholder={t('bookDemo:demoForm.fields.requirements.placeholder')}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="xl" className="w-full">
                    {t('bookDemo:demoForm.submit')}
                  </Button>

                  <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                    {(t('bookDemo:demoForm.benefits', { returnObjects: true }) as string[]).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {index === 2 ? <Shield className="w-4 h-4 text-primary" /> : <Check className="w-4 h-4 text-primary" />}
                        {benefit}
                      </div>
                    ))}
                  </div>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t('bookDemo:demoForm.privacy.text')}{" "}
              <a href="/privacy-policy" className="text-primary hover:underline">{t('bookDemo:demoForm.privacy.link')}</a> {t('bookDemo:demoForm.privacy.suffix')}
            </p>
          </div>
        </div>
      </section>

      <WaitlistPopup 
        open={waitlistOpen} 
        onOpenChange={setWaitlistOpen}
        source={waitlistSource}
      />
    </div>
  );
};

export default BookDemo;