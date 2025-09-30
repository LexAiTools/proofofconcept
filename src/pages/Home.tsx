import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { VercelV0Chat } from "@/components/VercelV0Chat";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleMessageSubmit = (message: string) => {
    navigate('/chat', { state: { initialMessage: message } });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <VercelV0Chat onMessageSubmit={handleMessageSubmit} />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
