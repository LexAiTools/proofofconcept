import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const UslugaPoc = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('poc');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Our PoC Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            {t('whyChoose.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('whyChoose.saveMoney.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.saveMoney.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('whyChoose.showDontTell.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.showDontTell.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('whyChoose.verify.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('whyChoose.verify.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            {t('services.title')}
          </h2>
          <div className="space-y-8 max-w-5xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-primary mb-2">{t('services.quickStart.label')}</div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {t('services.quickStart.title')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('services.quickStart.description')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-primary mb-2">{t('services.interactiveApp.label')}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t('services.interactiveApp.title')}
                  </h3>
                  <p className="text-muted-foreground mb-4">{t('services.interactiveApp.description')}</p>
                  <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                    <li className="list-disc">{t('services.interactiveApp.feature1')}</li>
                    <li className="list-disc">{t('services.interactiveApp.feature2')}</li>
                    <li className="list-disc">{t('services.interactiveApp.feature3')}</li>
                  </ul>
                  <p className="text-foreground font-semibold">
                    {t('services.interactiveApp.highlight')}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-foreground/80 mb-2">{t('services.completePackage.label')}</div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    {t('services.completePackage.title')}
                  </h3>
                  <div className="text-3xl font-bold text-primary-foreground mb-4">
                    {t('services.completePackage.price')}
                  </div>
                  <p className="text-primary-foreground/90 mb-4">{t('services.completePackage.subtitle')}</p>
                  <div className="space-y-2 text-primary-foreground/90 mb-4">
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span><strong>{t('services.completePackage.feature1Title')}</strong> - {t('services.completePackage.feature1Desc')}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span><strong>{t('services.completePackage.feature2Title')}</strong> - {t('services.completePackage.feature2Desc')}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span><strong>{t('services.completePackage.feature3Title')}</strong> - {t('services.completePackage.feature3Desc')}</span>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 mb-6">
                    {t('services.completePackage.description')}
                  </p>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/book-demo')}>
                    {t('services.completePackage.button')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-primary mb-2">{t('services.custom.label')}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {t('services.custom.title')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('services.custom.description')}
                  </p>
                  <Button variant="outline" onClick={() => navigate('/contact')}>
                    {t('services.custom.button')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-foreground/80 mb-2">{t('services.websitePackage.label')}</div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    {t('services.websitePackage.title')}
                  </h3>
                  <div className="text-3xl font-bold text-primary-foreground mb-4">
                    {t('services.websitePackage.price')}
                  </div>
                  <p className="text-primary-foreground/90 mb-4">{t('services.websitePackage.subtitle')}</p>
                  <div className="space-y-2 text-primary-foreground/90 mb-4">
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{t('services.websitePackage.feature1')}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{t('services.websitePackage.feature2')}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{t('services.websitePackage.feature3')}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{t('services.websitePackage.feature4')}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>{t('services.websitePackage.feature5')}</span>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 mb-6 font-semibold">
                    {t('services.websitePackage.highlight')}
                  </p>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/book-demo')}>
                    {t('services.websitePackage.button')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            {t('howItWorks.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-xl font-semibold">{t('howItWorks.payAndHave.title')}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('howItWorks.payAndHave.description')}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-xl font-semibold">{t('howItWorks.adminPanel.title')}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('howItWorks.adminPanel.description')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            {t('targetAudience.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('targetAudience.startups.title')}</h3>
                <p className="text-muted-foreground">{t('targetAudience.startups.description')}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('targetAudience.entrepreneurs.title')}</h3>
                <p className="text-muted-foreground">{t('targetAudience.entrepreneurs.description')}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('targetAudience.companies.title')}</h3>
                <p className="text-muted-foreground">{t('targetAudience.companies.description')}</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{t('targetAudience.innovators.title')}</h3>
                <p className="text-muted-foreground">{t('targetAudience.innovators.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-gradient-primary text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={() => navigate('/book-demo')}>
              {t('cta.buttonForm')}
            </Button>
            <Button variant="glass" size="lg" onClick={() => navigate('/contact')}>
              {t('cta.buttonContact')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UslugaPoc;
