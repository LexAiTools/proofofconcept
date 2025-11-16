import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RequestAccessPopup } from "@/components/RequestAccessPopup";
import { Play, Calendar, User } from "lucide-react";
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
  const { i18n } = useTranslation();
  const [podcastEpisodes, setPodcastEpisodes] = useState<PodcastEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, [i18n.language]);

  const fetchPodcasts = async () => {
    try {
      const currentLanguage = i18n.language;
      
      const { data, error } = await supabase
        .from("podcasts")
        .select("*")
        .eq("language", currentLanguage)
        .order("episode_number", { ascending: false });

      if (error) throw error;
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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-secondary">
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
            Meet <span className="text-primary">Proof of Concept</span> podcast
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Join industry leaders as they interview forward-thinking developer community 
            builders, machine learning experts, and innovators from across our portfolio of brands - 
            all united under the <span className="text-primary font-semibold">Proof of Concept</span> vision.
          </p>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-12">
              {podcastEpisodes.map((episode) => (
                <Card key={episode.id} className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Episode Card */}
                    <div className={`bg-gradient-to-br ${episode.company_color} p-8 text-white relative`}>
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
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                          Episode #{episode.episode_number}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(episode.episode_date).toLocaleDateString('en-US', { 
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

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="default" className="group">
                            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Watch Episode
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYouTubeId(episode.youtube_url)}`}
                              title={episode.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
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
            Start improving developer experience
            <br />
            and reducing support now.
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Explore NestAi.tools with the founding team and spin up a demo 
            environment in less than 24 hours.
          </p>
          <RequestAccessPopup>
            <Button variant="hero" size="xl" className="group">
              Request Access
              <Play className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
            </Button>
          </RequestAccessPopup>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;