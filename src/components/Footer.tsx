import { Linkedin, Twitter, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation('common');
  
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-foreground">ProofOfConcepts</span>
            </div>
            <p className="text-muted-foreground">
              Transforming businesses with intelligent AI solutions that deliver real results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('footer.solutions')}</h3>
            <ul className="space-y-2">
              <li><Link to="/book-demo" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.solutionsLinks.wordpressPlugin')}</Link></li>
              <li><Link to="/engine" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.engine')}</Link></li>
              <li><Link to="/use-cases" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.useCases')}</Link></li>
              <li><Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.chat')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('footer.company')}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.companyLinks.about')}</Link></li>
              <li><Link to="/podcast" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.podcast')}</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.companyLinks.contact')}</Link></li>
              <li><Link to="/usluga-poc" className="text-muted-foreground hover:text-foreground transition-colors">POC</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">{t('footer.resourcesLinks.pricing')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm">
            © 2024 ProofOfConcepts. {t('footer.copyright')}
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t('footer.legalLinks.privacy')}
            </Link>
            <Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              {t('footer.legalLinks.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};