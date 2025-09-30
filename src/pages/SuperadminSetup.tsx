import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Shield, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function SuperadminSetup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminExists, setAdminExists] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  useEffect(() => {
    checkIfAdminExists();
  }, []);

  const checkIfAdminExists = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setAdminExists(true);
        toast.error('Administrator już istnieje w systemie');
      }
    } catch (error: any) {
      console.error('Error checking admin:', error);
    } finally {
      setCheckingAdmin(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (adminExists) {
      toast.error('Administrator już istnieje. Ta strona jest jednorazowa.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Hasła nie są identyczne');
      return;
    }

    if (password.length < 6) {
      toast.error('Hasło musi mieć minimum 6 znaków');
      return;
    }

    try {
      setIsLoading(true);

      // Create user account
      const { data: authData, error: signUpError } = await signUp(email, password);

      if (signUpError || !authData.data?.user) {
        throw signUpError || new Error('Nie udało się utworzyć konta');
      }

      const userId = authData.data.user.id;

      // Assign admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'admin'
        });

      if (roleError) {
        console.error('Error assigning admin role:', roleError);
        toast.error('Konto utworzone, ale nie przypisano roli administratora. Skontaktuj się z pomocą techniczną.');
        return;
      }

      toast.success('Konto SUPERADMIN utworzone pomyślnie!');
      console.log('SUPERADMIN created successfully');
      
      // Redirect to admin panel
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error: any) {
      console.error('Error in superadmin setup:', error);
      toast.error(error.message || 'Błąd podczas tworzenia konta SUPERADMIN');
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Sprawdzanie systemu...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
        <Card className="w-full max-w-md border-destructive">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle>Dostęp zabroniony</CardTitle>
            <CardDescription>
              Administrator już istnieje w systemie. Ta strona służy tylko do utworzenia pierwszego konta SUPERADMIN.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              onClick={() => navigate('/admin-login')}
            >
              Przejdź do logowania
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Konfiguracja SUPERADMIN</CardTitle>
          <CardDescription>
            Utwórz pierwsze konto administratora portalu. Ta strona jest jednorazowa i będzie niedostępna po utworzeniu pierwszego administratora.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email administratora</Label>
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
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potwierdź hasło</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Tworzenie konta...' : 'Utwórz konto SUPERADMIN'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
