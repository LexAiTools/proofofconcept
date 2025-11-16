import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowLeft } from "lucide-react";
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

const PodcastEpisode = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('podcast');
  const [episode, setEpisode] = useState<PodcastEpisode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisode();
  }, [id]);

  const fetchEpisode = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setEpisode(data);
    } catch (error) {
      console.error("Error fetching episode:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const generateStructuredData = (episode: PodcastEpisode) => {
    const videoId = extractYouTubeId(episode.youtube_url);
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": episode.title,
      "description": episode.description,
      "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      "uploadDate": episode.episode_date,
      "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
      "embedUrl": `https://www.youtube.com/embed/${videoId}`,
      "publisher": {
        "@type": "Organization",
        "name": episode.platform_name,
        "logo": {
          "@type": "ImageObject",
          "url": "https://app.proof-of-concept.pl/favicon.ico"
        }
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-3xl font-bold mb-4">Episode not found</h1>
          <Button onClick={() => navigate('/podcast')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Podcast
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const videoId = extractYouTubeId(episode.youtube_url);

  return (
    <>
      <Helmet>
        <title>{`${episode.title} - ${episode.platform_name} Podcast`}</title>
        <meta name="description" content={episode.description} />
        
        {/* Open Graph tags for video */}
        <meta property="og:type" content="video.other" />
        <meta property="og:title" content={episode.title} />
        <meta property="og:description" content={episode.description} />
        <meta property="og:video" content={`https://www.youtube.com/embed/${videoId}`} />
        <meta property="og:video:secure_url" content={`https://www.youtube.com/embed/${videoId}`} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        <meta property="og:image" content={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} />
        <meta property="og:url" content={`https://app.proof-of-concept.pl/podcast/${episode.id}`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={episode.title} />
        <meta name="twitter:description" content={episode.description} />
        <meta name="twitter:image" content={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} />
        <meta name="twitter:player" content={`https://www.youtube.com/embed/${videoId}`} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://app.proof-of-concept.pl/podcast/${episode.id}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData(episode))}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-6 py-24">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/podcast')}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('episode.badge')}{episode.episode_number}
          </Button>

          <div className="max-w-5xl mx-auto">
            {/* Video Player */}
            <div className="relative w-full pb-[56.25%] mb-8 rounded-lg overflow-hidden bg-muted">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={episode.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Episode Details */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border">
              <div className="flex items-center gap-2 mb-4">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: episode.company_color }}
                >
                  {episode.company}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {t('episode.badge')}{episode.episode_number}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {episode.title}
              </h1>

              {episode.episode_film_title && (
                <p className="text-xl text-muted-foreground mb-6 italic">
                  "{episode.episode_film_title}"
                </p>
              )}

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {episode.description}
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('episode.host')}</p>
                    <p className="font-semibold text-foreground">{episode.host_name}</p>
                    <p className="text-sm text-muted-foreground">{episode.host_role}</p>
                  </div>
                </div>

                {episode.guest_name && (
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('episode.guest')}</p>
                      <p className="font-semibold text-foreground">{episode.guest_name}</p>
                      <p className="text-sm text-muted-foreground">{episode.guest_role}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t('episode.date')}</p>
                    <p className="font-semibold text-foreground">
                      {new Date(episode.episode_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PodcastEpisode;
