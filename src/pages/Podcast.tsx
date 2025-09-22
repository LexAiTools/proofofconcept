import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Calendar, User } from "lucide-react";

const Podcast = () => {
  const podcastEpisodes = [
    {
      id: 11,
      title: "Serving +10 Million Developers: Building an AI-Ready Docs Infrastructure at Twilio",
      description: "In this episode Wade Christensen, PM for the Twilio Developer Platform shares a deep dive into Twilio's massive documentation migration—5,000+ pages, 20,000 code examples, and how they're building AI-ready infrastructure.",
      date: "Jul 1, 2025",
      host: "Emil Sorensen",
      guest: "Wade Christensen",
      guestRole: "PM, Developer Platform",
      company: "Twilio",
      companyColor: "from-pink-500 to-red-500"
    },
    {
      id: 10,
      title: "VP of DevRel at Confluent Shares Lessons from 10+ Years of Developer Education",
      description: "In this episode Tim Berglund shares a ton about what he's learned from 10+ years of developer education at places like GitHub, Confluent and StarTree.",
      date: "Nov 1, 2024",
      host: "Emil Sorensen",
      guest: "Tim Berglund",
      guestRole: "VP Developer Relations",
      company: "Confluent",
      companyColor: "from-purple-500 to-pink-500"
    },
    {
      id: 9,
      title: "Building Developer-First API Tools with Modern Documentation",
      description: "Exploring how modern API documentation tools are revolutionizing developer experience and reducing time-to-first-success for technical integrations.",
      date: "Jul 20, 2023",
      host: "Emil Sorensen",
      guest: "Sarah Chen",
      guestRole: "Head of Developer Experience",
      company: "Postman",
      companyColor: "from-orange-500 to-red-400"
    },
    {
      id: 8,
      title: "How to Build an AI-First Database Startup with Modern Tools",
      description: "Hey everyone! Thank you so much for watching this episode. In this episode our guest shares his story of building a modern database company and how he sees the future of AI-powered development tools.",
      date: "Mar 7, 2023",
      host: "Emil Sorensen",
      guest: "Alex Rodriguez",
      guestRole: "Co-Founder",
      company: "VectorDB",
      companyColor: "from-blue-500 to-purple-500"
    },
    {
      id: 7,
      title: "The Future of Developer Community Building with AI",
      description: "Our guest shares his views of the future of community building and how he sees developer communities evolving with the use of AI tools and platforms.",
      date: "Mar 1, 2023",
      host: "Emil Sorensen",
      guest: "Mike Thompson",
      guestRole: "Dev Advocate",
      company: "GitHub",
      companyColor: "from-gray-700 to-gray-900"
    }
  ];

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
          <div className="space-y-12">
            {podcastEpisodes.map((episode) => (
              <Card key={episode.id} className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Episode Card */}
                  <div className={`bg-gradient-to-br ${episode.companyColor} p-8 text-white relative`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <span className="font-semibold">NestAi.tools</span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-sm font-medium">{episode.company}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-6 leading-tight">
                      {episode.title}
                    </h3>

                    <div className="flex items-center space-x-6 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{episode.host}</p>
                          <p className="text-xs text-white/80">Co-Founder</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{episode.guest}</p>
                          <p className="text-xs text-white/80">{episode.guestRole}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Episode Details */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        Episode #{episode.id}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {episode.date}
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
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
          <Button variant="hero" size="xl" className="group">
            Request Access
            <Play className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Podcast;