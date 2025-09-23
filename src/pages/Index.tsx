import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WaitlistSection } from "@/components/WaitlistSection";
import { TrustedBy } from "@/components/TrustedBy";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <WaitlistSection />
      <TrustedBy />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
