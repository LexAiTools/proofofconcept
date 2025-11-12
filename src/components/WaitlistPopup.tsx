import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle2, Loader2, Users, TrendingUp } from 'lucide-react';

interface WaitlistPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: 'download' | 'documentation';
}

const emailSchema = z.string().email().trim().toLowerCase();

const MAX_SPOTS = 14000;
const INITIAL_OFFSET = 8744; // Display offset - database starts at 0, display starts at 8744

export const WaitlistPopup = ({ open, onOpenChange, source }: WaitlistPopupProps) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [signedUpCount, setSignedUpCount] = useState(INITIAL_OFFSET);

  const spotsLeft = MAX_SPOTS - signedUpCount;

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from('plugin_waitlist')
        .select('*', { count: 'exact', head: true });
      
      if (count !== null) {
        // Add offset to database count for display
        setSignedUpCount(count + INITIAL_OFFSET);
      }
    };
    
    if (open) {
      fetchCount();
      setShowSuccess(false);
      setEmail('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validEmail = emailSchema.parse(email);
      
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('plugin_waitlist')
        .insert({
          email: validEmail,
          source_button: source,
          metadata: {
            signed_up_at: new Date().toISOString(),
            language: i18n.language
          }
        });
      
      if (error) {
        if (error.code === '23505') {
          toast.error(t('bookDemo:waitlist.errors.alreadyRegistered'));
        } else {
          toast.error(t('bookDemo:waitlist.errors.failed'));
        }
        return;
      }
      
      setShowSuccess(true);
      setSignedUpCount(prev => prev + 1);
      
      setTimeout(() => {
        onOpenChange(false);
        setShowSuccess(false);
        setEmail('');
      }, 4000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(t('bookDemo:waitlist.errors.invalidEmail'));
      } else {
        toast.error(t('bookDemo:waitlist.errors.failed'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCounterColor = () => {
    if (spotsLeft > 1000) return 'text-muted-foreground';
    if (spotsLeft > 100) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {t('bookDemo:waitlist.title')}
              </DialogTitle>
              <DialogDescription className="text-base">
                {t('bookDemo:waitlist.subtitle')}
              </DialogDescription>
            </DialogHeader>

            <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">
                {t('bookDemo:waitlist.info')}
              </p>
              
              <div className="flex items-center justify-between text-sm pt-2 border-t border-primary/10">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {t('bookDemo:waitlist.counter.max')}: <span className="font-semibold text-foreground">{MAX_SPOTS.toLocaleString()}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {t('bookDemo:waitlist.counter.signedUp')}: <span className="font-semibold text-foreground">{signedUpCount.toLocaleString()}</span>
                  </span>
                </div>
              </div>
              
              <div className={`text-center pt-2 ${getCounterColor()} ${spotsLeft < 100 ? 'animate-pulse' : ''}`}>
                <span className="font-bold text-lg">
                  {spotsLeft.toLocaleString()} {t('bookDemo:waitlist.counter.spotsLeft')} ⚡
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waitlist-email">
                  {t('bookDemo:waitlist.form.email')}
                </Label>
                <Input
                  id="waitlist-email"
                  type="email"
                  placeholder={t('bookDemo:waitlist.form.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || !email}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('bookDemo:waitlist.form.submitting')}
                  </>
                ) : (
                  t('bookDemo:waitlist.form.submit')
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              {t('bookDemo:waitlist.success.title')}
            </DialogTitle>
            <DialogDescription className="text-base">
              {t('bookDemo:waitlist.success.message')}
            </DialogDescription>
            <p className="text-sm text-muted-foreground">
              {t('bookDemo:waitlist.success.reminder')}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
