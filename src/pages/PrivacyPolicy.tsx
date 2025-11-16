import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function PrivacyPolicy() {
  const { t, i18n } = useTranslation('pages');
  const location = useLocation();
  
  const currentUrl = `https://app.proof-of-concept.pl${location.pathname}`;
  const altLang = i18n.language === 'pl' ? 'en' : 'pl';
  const altUrl = i18n.language === 'pl' ? `https://app.proof-of-concept.pl/en${location.pathname}` : `https://app.proof-of-concept.pl${location.pathname}`;
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('pages:meta.privacyPolicy.title')}</title>
        <meta name="description" content={t('pages:meta.privacyPolicy.description')} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('pages:meta.privacyPolicy.title')} />
        <meta property="og:description" content={t('pages:meta.privacyPolicy.description')} />
        <meta property="og:url" content={currentUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('pages:meta.privacyPolicy.title')} />
        <meta name="twitter:description" content={t('pages:meta.privacyPolicy.description')} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang={i18n.language} href={currentUrl} />
        <link rel="alternate" hrefLang={altLang} href={altUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://app.proof-of-concept.pl/privacy-policy" />
      </Helmet>
      <Header />

      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: November 12, 2025</p>

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information that you provide directly to us, including your name, email address, phone
                number, and any other information you choose to provide when using our services. We also automatically
                collect certain information about your device and how you interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Protect against fraudulent or illegal activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please note that no method of transmission over the Internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and hold certain
                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may employ third-party companies and individuals to facilitate our service, provide the service on
                our behalf, perform service-related services, or assist us in analyzing how our service is used. These
                third parties have access to your personal information only to perform these tasks on our behalf.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-foreground mt-4">Email: contact@proofofconcepts.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
