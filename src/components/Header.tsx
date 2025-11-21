import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Header = () => {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        setIsAdmin(!!data);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-foreground">ProofOfConcepts</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/use-cases" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.useCases')}
            </Link>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link to="/engine" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.engine')}
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.contact')}
            </Link>
            <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.chat')}
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              onClick={() => navigate('/usluga-poc')}
              className="flex-shrink-0"
            >
              POC
            </Button>
            <Button 
              variant="default" 
              onClick={() => navigate('/book-demo')}
              className="flex-shrink-0"
            >
              {t('buttons.bookDemo')}
            </Button>
            {isAdmin && (
              <Button 
                variant="secondary" 
                onClick={() => navigate('/admin')}
                className="flex-shrink-0"
              >
                {t('buttons.adminPanel')}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/use-cases" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.useCases')}
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.pricing')}
              </Link>
              <Link to="/engine" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.engine')}
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.contact')}
              </Link>
              <Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.chat')}
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <div className="flex gap-2">
                  <ThemeSwitcher />
                  <LanguageSwitcher />
                </div>
                <Button 
                  variant="ghost" 
                  className="justify-start w-full"
                  onClick={() => {
                    navigate('/usluga-poc');
                    setIsMenuOpen(false);
                  }}
                >
                  POC
                </Button>
                <Button 
                  variant="default" 
                  className="justify-start w-full"
                  onClick={() => {
                    navigate('/book-demo');
                    setIsMenuOpen(false);
                  }}
                >
                  {t('buttons.bookDemo')}
                </Button>
                {isAdmin && (
                  <Button 
                    variant="secondary" 
                    className="justify-start w-full"
                    onClick={() => {
                      navigate('/admin');
                      setIsMenuOpen(false);
                    }}
                  >
                    {t('buttons.adminPanel')}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};