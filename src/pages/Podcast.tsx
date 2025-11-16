import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RequestAccessPopup } from "@/components/RequestAccessPopup";
import { Calendar, User, ArrowRight, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PodcastEpisode {
  id: string;
  episode_number: number;
  title: string;
  episode_film_title?: string;
  description: string;
  host_name: string;
  host_role: string;
  guest_name?: string;
  guest_role?: string;
  company: string;
  company_color: string;
  episode_date: string;
  youtube_url: string;
  language: string;
  platform_name: string;
}

const Podcast = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('podcast');
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, [i18n.language]);

  const fetchPodcasts = async () => {
    try {
      const currentLanguage = i18n.language;
      console.log("Fetching podcasts for language:", currentLanguage);
      
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .eq("language", currentLanguage)
        .order("episode_number", { ascending: false });

      if (error) throw error;
      console.log("Fetched podcasts:", data?.length || 0, "episodes");
      setPodcastEpisodes(data || []);
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      <Helmet>
        <title>Proof of Concept Podcast - {t('hero.description')}</title>
        <meta name="description" content={t('hero.description')} />
        <link rel="canonical" href="https://app.proof-of-concept.pl/podcast" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-secondary relative">
        <div className="container mx-auto px-6 text-center">
          {/* Host Avatars */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex -space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary border-4 border-background flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-primary border-4 border-background flex items-center justify-center z-10">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-primary border-4 border-background flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span> podcast
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-primary" />
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-12 md:py-24 min-h-screen">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-muted-foreground">Ładowanie odcinków...</p>
            </div>
          ) : podcastEpisodes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Brak dostępnych odcinków</p>
            </div>
          ) : (
            <div className="space-y-12">
              {podcastEpisodes.map((episode) => (
                <Card key={episode.id} className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Episode Card */}
                    <div className={`bg-gradient-to-br ${episode.company_color} p-4 md:p-8 text-white relative`}>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">N</span>
                          </div>
                          <span className="font-semibold">{episode.platform_name}</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                          <span className="text-sm font-medium">{episode.company}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold mb-6 leading-tight">
                        {episode.episode_film_title || episode.title}
                      </h3>

                      <div className="flex items-center space-x-6 mt-auto">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{episode.host_name}</p>
                            <p className="text-xs text-white/80">{episode.host_role}</p>
                          </div>
                        </div>
                        
                      {episode.guest_name && episode.guest_role && (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{episode.guest_name}</p>
                            <p className="text-xs text-white/80">{episode.guest_role}</p>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>

                    {/* Episode Details */}
                    <div className="p-4 md:p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          {t('episode.badge')}{episode.episode_number}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(episode.episode_date).toLocaleDateString(i18n.language === 'pl' ? 'pl-PL' : 'en-US', {
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">
                        {episode.title}
                      </h3>

                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        {episode.description}
                      </p>

                      <Button 
                        onClick={() => navigate(`/podcast/${episode.id}`)}
                        variant="default" 
                        className="group"
                      >
                        {t('episode.watchButton')}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {t('cta.description')}
          </p>
          <RequestAccessPopup>
            <Button variant="hero" size="xl" className="group">
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </RequestAccessPopup>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Podcast;