import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import UseCases from "./pages/UseCases";
import Pricing from "./pages/Pricing";
import Engine from "./pages/Engine";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookDemo from "./pages/BookDemo";
import Signin from "./pages/Signin";
import AdminLogin from "./pages/AdminLogin";
import ResetPassword from "./pages/ResetPassword";
import SuperadminSetup from "./pages/SuperadminSetup";
import Podcast from "./pages/Podcast";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import AdminPodcasts from "./pages/AdminPodcasts";
import AdminDocuments from "./pages/AdminDocuments";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UslugaPoc from "./pages/UslugaPoc";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/engine" element={<Engine />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/superadmin-setup" element={<SuperadminSetup />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/podcasts" element={<AdminPodcasts />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/usluga-poc" element={<UslugaPoc />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
