import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2, Check } from "lucide-react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [error, setError] = useState("");
  const { updatePassword, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no session, redirect to admin login
    if (!session) {
      navigate('/admin-login', { replace: true });
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate password length
    if (newPassword.length < 8) {
      setError("Hasło musi mieć minimum 8 znaków");
      return;
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      setError("Hasła nie są identyczne");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await updatePassword(newPassword);
      
      if (!error) {
        setPasswordReset(true);
        // Redirect to admin login after 3 seconds
        setTimeout(() => {
          navigate('/admin-login', { replace: true });
        }, 3000);
      }
    } catch (error) {
      console.error("Error during password update:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            {passwordReset ? (
              <Check className="w-8 h-8 text-primary" />
            ) : (
              <Shield className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl">
              {passwordReset ? "Hasło zostało zmienione" : "Resetowanie hasła"}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {passwordReset 
                ? "Za chwilę zostaniesz przekierowany do strony logowania"
                : "Wprowadź nowe hasło dla konta administratora"
              }
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {!passwordReset ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nowe hasło</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 znaków
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Potwierdź hasło</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetowanie...
                  </>
                ) : (
                  'Zresetuj hasło'
                )}
              </Button>
            </form>
          ) : (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
              <p className="text-foreground">
                Twoje hasło zostało pomyślnie zmienione.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Przekierowanie za 3 sekundy...
              </p>
            </div>
          )}
          
          {!passwordReset && (
            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => navigate('/admin-login')}
                className="text-muted-foreground"
                disabled={isLoading}
              >
                Powrót do logowania
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
