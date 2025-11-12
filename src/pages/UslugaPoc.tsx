import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const UslugaPoc = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Proof of Concept (PoC)
            </h1>
            <p className="text-2xl text-primary font-semibold mb-8">
              Zamień pomysł w działający produkt w godzinę
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Our PoC Section */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Dlaczego warto wybrać nasze PoC?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Oszczędź czas i pieniądze na rozwoju produktu
                </h3>
                <p className="text-muted-foreground">
                  Zamiast czekać miesiące na rozwój aplikacji i wydawać dziesiątki tysięcy złotych, otrzymasz działający prototyp w godzinę. Twój pomysł zamieni się w klikalne demo, które możesz od razu pokazać klientom lub inwestorom.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Pokaż zamiast tłumaczyć
                </h3>
                <p className="text-muted-foreground">
                  Przestań tracić czas na długie prezentacje PowerPoint i niekończące się wyjaśnienia. Dzięki wizualnej prezentacji Twojego produktu, każdy od razu zrozumie, o co Ci chodzi. Interaktywny prototyp mówi więcej niż tysiąc słów.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Zweryfikuj pomysł przed dużą inwestycją
                </h3>
                <p className="text-muted-foreground">
                  Nie ryzykuj dużych budżetów na niepewny pomysł. Za ułamek kosztów tradycyjnego MVP sprawdzisz, czy Twoja idea ma sens biznesowy. Zbierz opinie użytkowników i potencjalnych klientów na prawdziwym, działającym produkcie.
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
            Nasze usługi
          </h2>
          <div className="space-y-8 max-w-5xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-primary mb-2">1. Szybki Start - Formularz PoC</div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Napisz, zobaczysz od razu efekt
                    </h3>
                    <p className="text-muted-foreground">
                      Wypełnij prosty formularz z opisem swojego pomysłu, a my natychmiast rozpoczniemy pracę nad Twoim prototypem.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-primary mb-2">2. Interaktywna Aplikacja PoC</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Klikalna aplikacja w React - gotowa do prezentacji
                  </h3>
                  <p className="text-muted-foreground mb-4">Stworzysz z nami:</p>
                  <ul className="space-y-2 text-muted-foreground ml-6 mb-4">
                    <li className="list-disc">Interfejs aplikacji webowej lub mobilnej</li>
                    <li className="list-disc">Klikalne demo, które działa jak prawdziwa aplikacja</li>
                    <li className="list-disc">Prototyp gotowy do pokazania inwestorom i klientom</li>
                  </ul>
                  <p className="text-foreground font-semibold">
                    Twój produkt będzie wyglądał jak gotowa aplikacja, nie jak szkic na papierze.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-foreground/80 mb-2">3. PAKIET KOMPLETNY</div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Prezentacja Produktu
                  </h3>
                  <div className="text-3xl font-bold text-primary-foreground mb-4">
                    2500 zł / 581 EUR
                  </div>
                  <p className="text-primary-foreground/90 mb-4">Wszystko, czego potrzebujesz do skutecznej prezentacji</p>
                  <div className="space-y-2 text-primary-foreground/90 mb-4">
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span><strong>Film explainer</strong> - profesjonalne wideo prezentujące Twój produkt</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span><strong>Landing Page</strong> - strona internetowa do zbierania leadów</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span><strong>Treść</strong> - gotowe teksty sprzedażowe</span>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 mb-6">
                    To kompletne rozwiązanie do prezentacji produktu inwestorom, partnerom biznesowym lub pierwszym klientom.
                  </p>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/book-demo')}>
                    Zamów Pakiet Kompletny
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="mb-4">
                  <div className="text-sm font-semibold text-primary mb-2">4. Projekt Szytej na Miarę</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Masz nietypowe wymagania? Skontaktuj się z nami
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Każdy pomysł jest inny. Jeśli standardowe pakiety nie odpowiadają Twoim potrzebom, opracujemy indywidualną ofertę dopasowaną do Twojego projektu.
                  </p>
                  <Button variant="outline" onClick={() => navigate('/contact')}>
                    Skontaktuj się
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-foreground/80 mb-2">5. PAKIET</div>
                  <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                    Profesjonalna Strona Internetowa
                  </h3>
                  <div className="text-3xl font-bold text-primary-foreground mb-4">
                    3500 zł / 814 EUR
                  </div>
                  <p className="text-primary-foreground/90 mb-4">Twoja strona gotowa w godzinę</p>
                  <div className="space-y-2 text-primary-foreground/90 mb-4">
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Nowoczesny, responsywny interfejs</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Analitykę internetową do śledzenia użytkowników</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Formularze kontaktowe zintegrowane z Twoim systemem</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>3-4 podstrony + dedykowana strona kontaktowa</span>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Działającą stronę gotową do publikacji w godzinę</span>
                    </div>
                  </div>
                  <p className="text-primary-foreground/90 mb-6 font-semibold">
                    Zapomnij o miesiącach oczekiwania na stronę internetową.
                  </p>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/book-demo')}>
                    Zamów Stronę
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
            Jak to działa?
          </h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-xl font-semibold">Model "Płać i Miej"</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Bez ukrytych kosztów, bez niespodzianek. Płacisz ustaloną cenę i natychmiast otrzymujesz działający prototyp. Proste, przejrzyste, skuteczne.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="text-xl font-semibold">Panel Administracyjny</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Po zakupie otrzymujesz dostęp do panelu administracyjnego (admin.corballyconcepts.com), gdzie zarządzasz swoimi projektami i usługami PoC.
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
            Dla kogo jest PoC?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Startupy</h3>
                <p className="text-muted-foreground">które potrzebują MVP do prezentacji inwestorom</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Przedsiębiorcy</h3>
                <p className="text-muted-foreground">testujący nowe pomysły biznesowe</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Firmy</h3>
                <p className="text-muted-foreground">chcące szybko zweryfikować nową funkcjonalność</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Innowatorzy</h3>
                <p className="text-muted-foreground">potrzebujący szybkiego prototypu do prezentacji</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-gradient-primary text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Zacznij już dziś
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Nie trać czasu na długie procesy rozwojowe. Zamień swój pomysł w działający produkt w godzinę i zacznij zbierać feedback od prawdziwych użytkowników.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" onClick={() => navigate('/book-demo')}>
              Wypełnij Formularz PoC
            </Button>
            <Button variant="glass" size="lg" onClick={() => navigate('/contact')}>
              Skontaktuj się z nami
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UslugaPoc;
