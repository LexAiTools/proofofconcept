import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation('home');
  
  return (
    <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      {/* Hero image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="AI-powered business intelligence dashboard" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Trusted by badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-muted-foreground mb-8">
          {t('hero.trustedBy')}
        </div>

        {/* Main headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          {t('hero.headline')}{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            {t('hero.headlineHighlight')}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          {t('hero.subheadline')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/contact">
            <Button variant="hero" size="xl" className="group">
              {t('hero.stats.clients', { defaultValue: 'Get Started Now' })}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="glass" size="xl" className="group">
                <PlayCircle className="w-5 h-5 mr-2" />
                {t('common:buttons.watchDemo')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/YXzHFuPhN9I"
                  title="Product Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">{t('hero.stats.clients')}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10M+</div>
            <div className="text-muted-foreground">{t('hero.stats.dataPoints')}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">{t('hero.stats.uptime')}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">{t('hero.stats.support')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};