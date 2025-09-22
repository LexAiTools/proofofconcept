import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const Engine = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Accuracy is everything.
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            We optimize kapa for one thing: providing the <span className="text-foreground font-semibold">most accurate answers</span> about your product. That system is what we call the <span className="text-foreground font-semibold">Answer Engine</span>.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-12 max-w-2xl mx-auto mb-16">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+250k</div>
              <p className="text-muted-foreground">AI answers generated per month by kapa.ai.</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">+100</div>
              <p className="text-muted-foreground">Companies trust kapa.ai in production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="font-semibold">Sonatype</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Kapa.ai is the <span className="text-foreground font-semibold">only LLM-based system I trust</span> to put in front of our customers"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Rusty Wilson</p>
                    <p className="text-muted-foreground text-xs">VP Support @ Sonatype</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">I</span>
                  </div>
                  <span className="font-semibold">Ionic</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Our team did its best to stump kapa.ai, and time and time again, it <span className="text-foreground font-semibold">delivered helpful, accurate responses</span>."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Michael Ellis</p>
                    <p className="text-muted-foreground text-xs">Developer Lead @ Ionic</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold">P</span>
                  </div>
                  <span className="font-semibold">Prisma</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Kapa.ai is much <span className="text-foreground font-semibold">better at answering questions about Prisma than ChatGPT is</span>"
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-muted rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium text-sm">Soren Schmidt</p>
                    <p className="text-muted-foreground text-xs">CEO @ Prisma</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our philosophy: Evaluation-Driven Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Academic benchmarks and leaderboards only take you so far.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
            <div>
              <p className="text-muted-foreground">
                You need <span className="text-foreground font-semibold">custom evaluations</span> to align AI models. And at <span className="text-primary">kapa.ai</span>, our mission is to help companies to deploy reliable AI assistants to <span className="text-foreground font-semibold">answer technical product questions</span>.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                So we have <span className="text-foreground font-semibold">developed specialized evolution frameworks for answering technical product questions</span> that go beyond generic metrics, incorporating real-world customer feedback.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">
                This approach allows us to <span className="text-foreground font-semibold">continuously refine our system and deploy latest research and models</span>, only when it improves accuracy for all users of kapa.ai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the Engine Works */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              How the Answer Engine works
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              The Answer Engine is our <span className="text-foreground font-semibold">end-to-end system optimized for answering technical product questions</span>. It's model-agnostic, meaning it changes over time as new techniques and models come out, and is <span className="text-foreground font-semibold">designed for production</span> use-cases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Features Grid */}
            <div className="space-y-8">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Multi-Product and Multi-Version Support
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Handles queries across different product versions and deployment options.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">How do I get started with ExampleDB?</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p>That depends. If you use the open-source version follow the <span className="text-primary">Self-hosted Guide</span> and if you use the cloud <span className="text-primary underline">sign up for an account</span>.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Query Understanding
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Breaks down challenging and vague users queries into specific sub-questions to improve answer quality.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm text-muted-foreground">How do I use it?</div>
                      <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
                        <div>→ What are steps to set up?</div>
                        <div>→ Are there any prerequisites?</div>
                        <div>→ Where can I find tutorials?</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Multilingual By Design
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Processes content in one language and responds in the user's preferred language.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">🇧🇷 Quantos idiomas são suportados?</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p>Suportamos mais de 60 idiomas, incluindo inglês, espanhol e mandarim, conforme mencionado em nosso <span className="text-primary">📖 Help Center</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Grounded Answers with Citations
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Provides answers based only on your knowledge content, reducing hallucinations.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">How do I create a table in ExampleDB?</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p>Use the <code className="bg-background px-1 rounded">CREATE TABLE</code> command. For Syntax details see our <span className="text-primary">📖 Table Creation Guide</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Optimized For Combining Knowledge Sources
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Synthesizes information from multiple sources to provide comprehensive answers.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">How do I fix "Memory allocation" error?</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p>Increase <code className="bg-background px-1 rounded">max_memory_allocation</code> (see <span className="text-primary">📖 Documentation</span> or try the workaround mentioned in this <span className="text-primary">🔗 Github Issue</span></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Stays On Topic
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Answers questions only specific to your product, to be safely deployed to customers.
                  </p>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">How do I get started with OtherDB?</p>
                    <div className="bg-primary/20 rounded p-3 text-sm">
                      <p>I'm sorry, but as an AI assistant for ExampleDB, I'm tuned to answer questions about ExampleDB.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                What LLM do you use?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We use a combination of state-of-the-art language models, optimized specifically for technical product questions. Our system is model-agnostic and continuously evolves as new models become available.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                How accurate is kapa?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our accuracy rates consistently exceed 90% for technical product questions. We continuously evaluate and improve our system using real-world customer feedback and specialized evaluation frameworks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                How do you solve hallucinations?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We use grounded generation techniques that ensure answers are based only on your knowledge content. Our system provides citations and stays strictly on topic to minimize hallucinations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                Do you use fine-tuning or RAG?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We use a hybrid approach that combines the best of both techniques, along with our proprietary Answer Engine optimizations for technical product questions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-primary text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Turn your knowledge base into a production-ready AI assistant
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Request a demo to try kapa.ai on your data sources today
          </p>
          <Link to="/book-demo">
            <Button variant="secondary" size="lg">
              Request Demo →
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Engine;