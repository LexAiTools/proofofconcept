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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { RequestAccessPopup } from "@/components/RequestAccessPopup";
import { QuickStartPocForm } from "@/components/QuickStartPocForm";
import { InteractiveAppPocForm } from "@/components/InteractiveAppPocForm";
import { CompletePackagePocForm } from "@/components/CompletePackagePocForm";
import { ProfessionalWebsitePocForm } from "@/components/ProfessionalWebsitePocForm";

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
            
            {/* Watch Video Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="glass" size="lg" className="group">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  {t('hero.watchVideo')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full">
                <div className="aspect-video w-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="PoC Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              </DialogContent>
            </Dialog>
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
                <div className="text-sm font-semibold text-primary mb-2">
                  {t('services.quickStart.label')}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t('services.quickStart.title')}
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  {t('services.quickStart.price')}
                </div>
                <p className="text-muted-foreground mb-4">
                  {t('services.quickStart.description')}
                </p>
                <p className="text-foreground font-semibold mb-2">
                  {t('services.quickStart.subtitle')}
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                  <li className="list-disc">{t('services.quickStart.feature1')}</li>
                  <li className="list-disc">{t('services.quickStart.feature2')}</li>
                  <li className="list-disc">{t('services.quickStart.feature3')}</li>
                </ul>
                <p className="text-muted-foreground mb-6">
                  {t('services.quickStart.highlight')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <QuickStartPocForm>
                    <Button variant="default" size="lg">
                      {t('services.quickStart.button')}
                    </Button>
                  </QuickStartPocForm>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('https://kolejkowo.corballyconcepts.com/', '_blank')}
                  >
                    {t('services.quickStart.example')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-primary mb-2">
                  {t('services.interactiveApp.label')}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t('services.interactiveApp.title')}
                </h3>
                <div className="text-3xl font-bold text-primary mb-4">
                  {t('services.interactiveApp.price')}
                </div>
                <p className="text-muted-foreground mb-4">
                  {t('services.interactiveApp.description')}
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                  <li className="list-disc">{t('services.interactiveApp.feature1')}</li>
                  <li className="list-disc">{t('services.interactiveApp.feature2')}</li>
                  <li className="list-disc">{t('services.interactiveApp.feature3')}</li>
                  <li className="list-disc">{t('services.interactiveApp.feature4')}</li>
                </ul>
                <p className="text-muted-foreground mb-6">
                  {t('services.interactiveApp.highlight')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <InteractiveAppPocForm>
                    <Button variant="default" size="lg">
                      {t('services.interactiveApp.button')}
                    </Button>
                  </InteractiveAppPocForm>
                  <Button
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('https://developer-corballyconcepts.lovable.app', '_blank')}
                  >
                    {t('services.interactiveApp.example')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-primary-foreground/80 mb-2">
                  {t('services.completePackage.label')}
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  {t('services.completePackage.title')}
                </h3>
                <div className="text-3xl font-bold text-primary-foreground mb-4">
                  {t('services.completePackage.price')}
                </div>
                <p className="text-primary-foreground/90 mb-4">
                  {t('services.completePackage.subtitle')}
                </p>
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
                <div className="flex flex-col sm:flex-row gap-3">
              <CompletePackagePocForm>
                <Button variant="secondary" size="lg">
                  {t('services.completePackage.button')}
                </Button>
              </CompletePackagePocForm>
                  <Select onValueChange={(value) => window.open(value, '_blank')}>
                    <SelectTrigger className="w-full sm:w-auto h-11 bg-glass backdrop-blur-sm border-white/20 text-primary-foreground hover:bg-white/10 transition-colors">
                      <SelectValue placeholder={t('services.completePackage.example')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm border-border z-50">
                      <SelectItem 
                        value="https://poznaj.artopen.pl/produkt"
                        className="cursor-pointer hover:bg-accent"
                      >
                        Przykład 1: Artopen PoC
                      </SelectItem>
                      <SelectItem 
                        value="https://pocexapmle.lovable.app"
                        className="cursor-pointer hover:bg-accent"
                      >
                        Przykład 2: WRLDS AI Integration
                      </SelectItem>
                      <SelectItem 
                        value="https://sklep-sprzedaz-live.lovable.app"
                        className="cursor-pointer hover:bg-accent"
                      >
                        Przykład 3: Sklep Sprzedaż Live
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-primary mb-2">
                  {t('services.custom.label')}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('services.custom.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('services.custom.description')}
                </p>
                <RequestAccessPopup>
                  <Button variant="default" size="lg">
                    {t('services.custom.button')}
                  </Button>
                </RequestAccessPopup>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-border">
              <CardContent className="p-8">
                <div className="text-sm font-semibold text-primary-foreground/80 mb-2">
                  {t('services.websitePackage.label')}
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  {t('services.websitePackage.title')}
                </h3>
                <div className="text-3xl font-bold text-primary-foreground mb-4">
                  {t('services.websitePackage.price')}
                </div>
                <p className="text-primary-foreground/90 mb-4">
                  {t('services.websitePackage.subtitle')}
                </p>
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
                  <div className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{t('services.websitePackage.feature6')}</span>
                  </div>
                </div>
                <p className="text-primary-foreground/90 mb-6 font-semibold">
                  {t('services.websitePackage.highlight')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <ProfessionalWebsitePocForm>
                    <Button variant="secondary" size="lg">
                      {t('services.websitePackage.button')}
                    </Button>
                  </ProfessionalWebsitePocForm>
                  <Select onValueChange={(value) => window.open(value, '_blank')}>
                    <SelectTrigger className="w-full sm:w-auto h-11 bg-glass backdrop-blur-sm border-white/20 text-primary-foreground hover:bg-white/10 transition-colors">
                      <SelectValue placeholder={t('services.websitePackage.example')} />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm border-border">
                      <SelectItem 
                        value="https://poznaj.artopen.pl"
                        className="cursor-pointer hover:bg-accent"
                      >
                        Przykład 1: Artopen
                      </SelectItem>
                      <SelectItem 
                        value="https://decentral-art-poc.lovable.app"
                        className="cursor-pointer hover:bg-accent"
                      >
                        Przykład 2: Decentral Art PoC
                      </SelectItem>
                      <SelectItem 
                        value="https://kurs-corbally-concepts.lovable.app"
                        className="cursor-pointer hover:bg-accent"
                      >
                        Przykład 3: Kurs Corbally Concepts
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-foreground text-center mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            {t('howItWorks.subtitle')}
          </p>

          {/* Model "Płać i Miej" */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">{t('howItWorks.payAndHave.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">
                {t('howItWorks.payAndHave.description')}
              </p>
            </CardContent>
          </Card>

          {/* Dlaczego to działa? */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              {t('howItWorks.whyItWorks.title')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t('howItWorks.whyItWorks.items.transparency.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('howItWorks.whyItWorks.items.transparency.description')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t('howItWorks.whyItWorks.items.immediateStart.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('howItWorks.whyItWorks.items.immediateStart.description')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t('howItWorks.whyItWorks.items.predictableTimeline.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('howItWorks.whyItWorks.items.predictableTimeline.description')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t('howItWorks.whyItWorks.items.projectControl.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('howItWorks.whyItWorks.items.projectControl.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t('howItWorks.whyItWorks.items.qualityGuarantee.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t('howItWorks.whyItWorks.items.qualityGuarantee.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Jak to wygląda w praktyce? */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                {t('howItWorks.howItLooksInPractice.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <div className="font-bold text-primary md:min-w-[140px] w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step1.time')}
            </div>
            <div className="text-muted-foreground w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step1.action')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <div className="font-bold text-primary md:min-w-[140px] w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step2.time')}
            </div>
            <div className="text-muted-foreground w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step2.action')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <div className="font-bold text-primary md:min-w-[140px] w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step3.time')}
            </div>
            <div className="text-muted-foreground w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step3.action')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <div className="font-bold text-primary md:min-w-[140px] w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step4.time')}
            </div>
            <div className="text-muted-foreground w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step4.action')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <div className="font-bold text-primary md:min-w-[140px] w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step5.time')}
            </div>
            <div className="text-muted-foreground w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step5.action')}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <div className="font-bold text-primary md:min-w-[140px] w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step6.time')}
            </div>
            <div className="text-muted-foreground w-full md:w-auto">
              {t('howItWorks.howItLooksInPractice.timeline.step6.action')}
            </div>
          </div>

              <div className="mt-6 flex justify-center px-4 md:px-0">
                <Button 
                  onClick={() => navigate('/chat', { 
                    state: { initialMessage: t('howItWorks.howItLooksInPractice.footer') }
                  })}
                  variant="default"
                  size="lg"
                  className="font-semibold w-full md:w-auto max-w-lg"
                >
                  <span className="md:hidden">{t('howItWorks.howItLooksInPractice.footerMobile')}</span>
                  <span className="hidden md:inline">{t('howItWorks.howItLooksInPractice.footer')}</span>
                </Button>
              </div>
              </div>
            </CardContent>
          </Card>

          {/* Panel Administracyjny */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{t('howItWorks.adminPanel.title')}</CardTitle>
              <p className="text-muted-foreground">{t('howItWorks.adminPanel.subtitle')}</p>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-semibold">{t('howItWorks.adminPanel.description')}</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">
                    {t('howItWorks.adminPanel.features.access')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">
                    {t('howItWorks.adminPanel.features.dashboard')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">
                    {t('howItWorks.adminPanel.features.communication')}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">
                    {t('howItWorks.adminPanel.features.notifications')}
                  </span>
                </li>
              </ul>
              <p className="text-muted-foreground italic">
                {t('howItWorks.adminPanel.footer')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            {t('faq.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {Array.from({ length: 15 }).map((_, index) => (
                <AccordionItem 
                  key={`faq-${index}`} 
                  value={`faq-${index}`} 
                  className="border border-border rounded-lg px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="text-lg font-semibold">
                      {t(`faq.items.${index}.question`)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {t(`faq.items.${index}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* JSON-LD Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Array.from({ length: 15 }).map((_, index) => ({
              "@type": "Question",
              "name": t(`faq.items.${index}.question`),
              "acceptedAnswer": {
                "@type": "Answer",
                "text": t(`faq.items.${index}.answer`)
              }
            }))
          })}
        </script>
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
            <RequestAccessPopup>
              <Button variant="secondary" size="lg">
                {t('cta.buttonForm')}
              </Button>
            </RequestAccessPopup>
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
