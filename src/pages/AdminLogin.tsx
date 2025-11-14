import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { signIn, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in as admin
    if (user) {
      checkAdminAndRedirect();
    }
  }, [user]);

  const checkAdminAndRedirect = async () => {
    if (!user) return;

    try {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleData) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        // Check if user is admin
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleData) {
          navigate('/admin', { replace: true });
        } else {
          navigate('/home', { replace: true });
        }
      }
    } catch (error) {
      console.error("Error during admin login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);
      
      if (!error) {
        setResetEmailSent(true);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Panel SUPERADMIN</CardTitle>
            <CardDescription className="text-base mt-2">
              Logowanie dla administratorów portalu. Zarządzaj leadami i ustawieniami systemu.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {!showResetForm ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logowanie...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Zaloguj się jako SUPERADMIN
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  onClick={() => setShowResetForm(true)}
                  className="text-primary"
                >
                  Zapomniałeś hasła?
                </Button>
              </div>
            </>
          ) : (
            <>
              {!resetEmailSent ? (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      'Wyślij link resetujący'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowResetForm(false)}
                    disabled={isLoading}
                  >
                    Powrót do logowania
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                    <p className="text-sm text-foreground">
                      Link do resetowania hasła został wysłany na adres <strong>{email}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Sprawdź swoją skrzynkę pocztową i kliknij link, aby zresetować hasło.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setShowResetForm(false);
                      setResetEmailSent(false);
                    }}
                  >
                    Powrót do logowania
                  </Button>
                </div>
              )}
            </>
          )}
          
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/home')}
              className="text-muted-foreground"
            >
              Powrót do strony głównej
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
