import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { RequestAccessPopup } from "./RequestAccessPopup";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CTA = () => {
  const { t } = useTranslation('home');
  
  return (
    <section className="py-24 bg-gradient-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 break-words px-2">
            {t('cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed px-2">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group">
                {t('testimonials.ctaButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <RequestAccessPopup>
              <Button variant="glass" size="xl" className="group">
                <Calendar className="w-5 h-5 mr-2" />
                {t('cta.button')}
              </Button>
            </RequestAccessPopup>
          </div>
          
          <div className="text-sm text-muted-foreground">
            No credit card required • 30-day free trial • Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};