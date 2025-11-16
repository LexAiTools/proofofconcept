import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { VercelV0Chat } from "@/components/VercelV0Chat";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation('home');
  
  const currentUrl = `https://app.proof-of-concept.pl${location.pathname}`;
  const altLang = i18n.language === 'pl' ? 'en' : 'pl';
  const altUrl = i18n.language === 'pl' ? `https://app.proof-of-concept.pl/en${location.pathname}` : `https://app.proof-of-concept.pl${location.pathname}`;

  const handleMessageSubmit = (message: string) => {
    navigate('/chat', { state: { initialMessage: message } });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('home:meta.title')}</title>
        <meta name="description" content={t('home:meta.description')} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('home:meta.title')} />
        <meta property="og:description" content={t('home:meta.description')} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content="https://app.proof-of-concept.pl/hero-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home:meta.title')} />
        <meta name="twitter:description" content={t('home:meta.description')} />
        <meta name="twitter:image" content="https://app.proof-of-concept.pl/hero-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang={i18n.language} href={currentUrl} />
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://app.proof-of-concept.pl/" />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NestAi & Corbally Concepts",
            "url": "https://app.proof-of-concept.pl",
            "logo": "https://app.proof-of-concept.pl/logo.png",
            "description": "AI-Powered Business Intelligence Platform for Proof of Concepts",
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+48-22-123-4567",
              "contactType": "customer service",
              "areaServed": "PL",
              "availableLanguage": ["Polish", "English"]
            }]
          })}
        </script>
        
        {/* Structured Data - WebSite */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Proof of Concept",
            "url": "https://app.proof-of-concept.pl",
            "description": "Get your Proof of Concept in an hour, not months",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://app.proof-of-concept.pl/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      <Header />
      <main className="pt-16">
        <Hero />
        <VercelV0Chat onMessageSubmit={handleMessageSubmit} />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
