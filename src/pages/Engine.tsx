import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { VercelV0Chat } from "@/components/VercelV0Chat";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Engine = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['engine', 'common']);
  const location = useLocation();
  
  const currentUrl = `https://app.proof-of-concept.pl${location.pathname}`;
  const altLang = i18n.language === 'pl' ? 'en' : 'pl';
  const altUrl = i18n.language === 'pl' ? `https://app.proof-of-concept.pl/en${location.pathname}` : `https://app.proof-of-concept.pl${location.pathname}`;

  const handleMessageSubmit = (message: string) => {
    navigate('/chat', { state: { initialMessage: message } });
  };

  const handleRequestDemo = () => {
    navigate('/chat', { state: { initialMessage: 'Chce zapytać o demo' } });
  };

  const handleFeatureClick = (featureKey: string) => {
    navigate('/chat', { 
      state: { 
        initialMessage: `Wyjaśnij funkcję: ${featureKey}`,
        featureKey: featureKey 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('engine:meta.title')}</title>
        <meta name="description" content={t('engine:meta.description')} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('engine:meta.title')} />
        <meta property="og:description" content={t('engine:meta.description')} />
        <meta property="og:url" content={currentUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('engine:meta.title')} />
        <meta name="twitter:description" content={t('engine:meta.description')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang={i18n.language} href={currentUrl} />
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://app.proof-of-concept.pl/engine" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t('engine:hero.title')}
            </h1>
            <p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12"
              dangerouslySetInnerHTML={{ __html: t('engine:hero.description') }}
            />

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto mb-16">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{t('engine:hero.stats.answers.value')}</div>
                <p className="text-muted-foreground">{t('engine:hero.stats.answers.label')}</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">{t('engine:hero.stats.companies.value')}</div>
                <p className="text-muted-foreground">{t('engine:hero.stats.companies.label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="font-semibold">{t('engine:testimonials.sonatype.company')}</span>
                </div>
                <p 
                  className="text-muted-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: `"${t('engine:testimonials.sonatype.quote')}"` }}
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">{t('engine:testimonials.sonatype.author')}</p>
                    <p className="text-muted-foreground text-xs">{t('engine:testimonials.sonatype.position')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">I</span>
                  </div>
                  <span className="font-semibold">{t('engine:testimonials.ionic.company')}</span>
                </div>
                <p 
                  className="text-muted-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: `"${t('engine:testimonials.ionic.quote')}"` }}
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">{t('engine:testimonials.ionic.author')}</p>
                    <p className="text-muted-foreground text-xs">{t('engine:testimonials.ionic.position')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <span className="font-semibold">{t('engine:testimonials.prisma.company')}</span>
                </div>
                <p 
                  className="text-muted-foreground mb-4"
                  dangerouslySetInnerHTML={{ __html: `"${t('engine:testimonials.prisma.quote')}"` }}
                />
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">{t('engine:testimonials.prisma.author')}</p>
                    <p className="text-muted-foreground text-xs">{t('engine:testimonials.prisma.position')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {t('engine:philosophy.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              {t('engine:philosophy.subtitle')}
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <div>
                <p 
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: t('engine:philosophy.paragraphs.custom') }}
                />
              </div>
              <div>
                <p 
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: t('engine:philosophy.paragraphs.frameworks') }}
                />
              </div>
              <div>
                <p 
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: t('engine:philosophy.paragraphs.refinement') }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <VercelV0Chat onMessageSubmit={handleMessageSubmit} />

      {/* How the Engine Works */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {t('engine:howItWorks.title')}
            </h2>
            <p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: t('engine:howItWorks.subtitle') }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Features Grid */}
            <div className="space-y-8">
              <Card 
                className="bg-card border-border cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleFeatureClick('multiProduct')}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('engine:howItWorks.features.multiProduct.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('engine:howItWorks.features.multiProduct.description')}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('engine:howItWorks.features.multiProduct.example.question')}</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p dangerouslySetInnerHTML={{ __html: t('engine:howItWorks.features.multiProduct.example.answer') }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-card border-border cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleFeatureClick('queryUnderstanding')}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('engine:howItWorks.features.queryUnderstanding.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('engine:howItWorks.features.queryUnderstanding.description')}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm text-muted-foreground">{t('engine:howItWorks.features.queryUnderstanding.example.question')}</div>
                      <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
                        <div>→ {t('engine:howItWorks.features.queryUnderstanding.example.subQuestions.0')}</div>
                        <div>→ {t('engine:howItWorks.features.queryUnderstanding.example.subQuestions.1')}</div>
                        <div>→ {t('engine:howItWorks.features.queryUnderstanding.example.subQuestions.2')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-card border-border cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleFeatureClick('multilingual')}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('engine:howItWorks.features.multilingual.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('engine:howItWorks.features.multilingual.description')}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('engine:howItWorks.features.multilingual.example.question')}</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p dangerouslySetInnerHTML={{ __html: t('engine:howItWorks.features.multilingual.example.answer') }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card 
                className="bg-card border-border cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleFeatureClick('groundedAnswers')}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('engine:howItWorks.features.groundedAnswers.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('engine:howItWorks.features.groundedAnswers.description')}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('engine:howItWorks.features.groundedAnswers.example.question')}</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p dangerouslySetInnerHTML={{ __html: t('engine:howItWorks.features.groundedAnswers.example.answer') }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-card border-border cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleFeatureClick('knowledgeSources')}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('engine:howItWorks.features.knowledgeSources.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('engine:howItWorks.features.knowledgeSources.description')}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('engine:howItWorks.features.knowledgeSources.example.question')}</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p dangerouslySetInnerHTML={{ __html: t('engine:howItWorks.features.knowledgeSources.example.answer') }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="bg-card border-border cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                onClick={() => handleFeatureClick('staysOnTopic')}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {t('engine:howItWorks.features.staysOnTopic.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {t('engine:howItWorks.features.staysOnTopic.description')}
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">{t('engine:howItWorks.features.staysOnTopic.example.question')}</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p>{t('engine:howItWorks.features.staysOnTopic.example.answer')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground text-center mb-12">
              {t('engine:faq.title')}
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {t('engine:faq.questions.llm.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('engine:faq.questions.llm.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {t('engine:faq.questions.accuracy.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('engine:faq.questions.accuracy.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {t('engine:faq.questions.hallucinations.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('engine:faq.questions.hallucinations.answer')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  {t('engine:faq.questions.fineTuning.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('engine:faq.questions.fineTuning.answer')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-primary text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            {t('engine:cta.title')}
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {t('engine:cta.subtitle')}
          </p>
          <Button variant="secondary" size="lg" onClick={handleRequestDemo}>
            {t('engine:cta.button')}
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Engine;