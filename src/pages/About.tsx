import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Globe, Users, Lightbulb } from "lucide-react";
import { RequestAccessPopup } from "@/components/RequestAccessPopup";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const About = () => {
  const { t, i18n } = useTranslation('about');
  const location = useLocation();
  
  const currentUrl = `https://app.proof-of-concept.pl${location.pathname}`;
  const altLang = i18n.language === 'pl' ? 'en' : 'pl';
  const altUrl = i18n.language === 'pl' ? `https://app.proof-of-concept.pl/en${location.pathname}` : `https://app.proof-of-concept.pl${location.pathname}`;
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('about:meta.title')}</title>
        <meta name="description" content={t('about:meta.description')} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('about:meta.title')} />
        <meta property="og:description" content={t('about:meta.description')} />
        <meta property="og:url" content={currentUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('about:meta.title')} />
        <meta name="twitter:description" content={t('about:meta.description')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang={i18n.language} href={currentUrl} />
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://app.proof-of-concept.pl/about" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-4xl mx-auto">
              {t('hero.title')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('hero.subtitle')}
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
                {t('partnership.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('partnership.description')}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{t('partnership.jointTeam')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{t('partnership.innovationFocus')}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-sm text-muted-foreground">{t('partnership.stats.yearsPartnership')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">{t('partnership.stats.countries')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-muted-foreground">{t('partnership.stats.projects')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-muted-foreground">{t('partnership.stats.coreTechnologies')}</div>
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
              {t('members.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('members.subtitle')}
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
                    <h3 className="text-2xl font-bold text-foreground">{t('members.nestai.name')}</h3>
                    <p className="text-primary font-medium">{t('members.nestai.website')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{t('members.nestai.location')}</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {t('members.nestai.description')}
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">{t('members.nestai.expertise')}</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('members.nestai.expertiseList.architecture')}</li>
                    <li>• {t('members.nestai.expertiseList.ml')}</li>
                    <li>• {t('members.nestai.expertiseList.backend')}</li>
                    <li>• {t('members.nestai.expertiseList.optimization')}</li>
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
                    <h3 className="text-2xl font-bold text-foreground">{t('members.corbally.name')}</h3>
                    <p className="text-primary font-medium">{t('members.corbally.website')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{t('members.corbally.location')}</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {t('members.corbally.description')}
                </p>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">{t('members.corbally.expertise')}</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('members.corbally.expertiseList.ui')}</li>
                    <li>• {t('members.corbally.expertiseList.poc')}</li>
                    <li>• {t('members.corbally.expertiseList.frontend')}</li>
                    <li>• {t('members.corbally.expertiseList.ux')}</li>
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
              {t('technology.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('technology.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t('technology.ai.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('technology.ai.description')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• {t('technology.ai.features.nlp')}</li>
                  <li>• {t('technology.ai.features.ml')}</li>
                  <li>• {t('technology.ai.features.conversational')}</li>
                  <li>• {t('technology.ai.features.automation')}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t('technology.blockchain.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('technology.blockchain.description')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• {t('technology.blockchain.features.smartContracts')}</li>
                  <li>• {t('technology.blockchain.features.dapps')}</li>
                  <li>• {t('technology.blockchain.features.architecture')}</li>
                  <li>• {t('technology.blockchain.features.crypto')}</li>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 max-w-4xl mx-auto">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <RequestAccessPopup>
            <Button 
              variant="default" 
              size="lg"
            >
              {t('cta.button')}
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