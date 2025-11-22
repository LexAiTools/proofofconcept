import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Globe, Users, Lightbulb, CheckCircle, Zap, Settings, Presentation, TrendingDown, Target, Rocket, CircleDollarSign, Puzzle, Shield, Award, Briefcase } from "lucide-react";
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

      {/* Introduction - PoC Story */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {t('introduction.title')}
              </h2>
              <p className="text-xl text-primary font-semibold mb-8">
                {t('introduction.subtitle')}
              </p>
            </div>
            <Card className="p-8 md:p-12 border-primary/20">
              <CardContent className="p-0">
                <div className="space-y-6 text-lg text-muted-foreground">
                  {(t('introduction.story', { returnObjects: true }) as string[]).map((paragraph, index) => (
                    <p key={index} className={index === 1 ? "text-foreground font-semibold text-xl" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
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

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 max-w-5xl mx-auto">
              {t('whyChooseUs.title')}
            </h2>
          </div>
          <div className="grid gap-8 max-w-6xl mx-auto">
            {(t('whyChooseUs.reasons', { returnObjects: true }) as any[]).map((reason, index) => {
              const icons = [CheckCircle, Zap, Settings, Presentation, TrendingDown];
              const Icon = icons[index];
              
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 border-primary/20">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-4xl font-bold text-primary">{reason.number}</span>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground">{reason.title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-4">{reason.description}</p>
                        {reason.technologies && (
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {reason.technologies.map((tech: string, techIndex: number) => (
                                <span key={techIndex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <p className="text-foreground font-medium">{reason.conclusion}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Cards */}
      <section className="py-16">
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

      {/* Client Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {t('clientBenefits.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {(t('clientBenefits.benefits', { returnObjects: true }) as any[]).map((benefit, index) => {
              const iconMap: { [key: string]: any } = {
                target: Target,
                rocket: Rocket,
                dollar: CircleDollarSign,
                puzzle: Puzzle,
                shield: Shield,
                award: Award
              };
              const Icon = iconMap[benefit.icon];
              
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20">
                  <CardContent className="p-0 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-foreground font-semibold">{benefit.title}</p>
                  </CardContent>
                </Card>
              );
            })}
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

      {/* Team Experience & CTA */}
      <section className="py-16 relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
                {t('teamExperience.title')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {(t('teamExperience.stats', { returnObjects: true }) as any[]).map((stat, index) => (
                  <Card key={index} className="p-6 border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {t('teamExperience.description')}
              </p>
              <p className="text-xl font-bold text-foreground">
                {t('teamExperience.conclusion')}
              </p>
            </div>
            
            <div className="relative py-12 px-8 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t('teamExperience.ctaTitle')}
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  {t('teamExperience.ctaSubtitle')}
                </p>
                <RequestAccessPopup>
                  <Button 
                    variant="default" 
                    size="lg"
                    className="shadow-glow"
                  >
                    {t('teamExperience.ctaButton')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestAccessPopup>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;