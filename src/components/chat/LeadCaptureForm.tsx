import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, User, Phone, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLeadCapture } from "@/hooks/useLeadCapture";

const leadCaptureSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export type LeadCaptureData = z.infer<typeof leadCaptureSchema>;

interface LeadCaptureFormProps {
  conversationId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  lastUserMessage?: string;
}

export const LeadCaptureForm = ({ 
  conversationId, 
  onSuccess, 
  onCancel,
  lastUserMessage 
}: LeadCaptureFormProps) => {
  const { t } = useTranslation('leads');
  const { submitLead, isSubmitting } = useLeadCapture();
  
  const form = useForm<LeadCaptureData>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: lastUserMessage || "",
    },
  });

  const handleSubmit = async (data: LeadCaptureData) => {
    const success = await submitLead({
      ...data,
      conversationId,
    });
    
    if (success) {
      form.reset();
      onSuccess?.();
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg border border-border p-4 my-4 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{t('title')}</h3>
          <p className="text-sm text-muted-foreground mt-1">{t('description')}</p>
        </div>
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{t('fields.name')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder={t('fields.name')}
                      className="pl-10 h-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{t('fields.email')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="email"
                      placeholder={t('fields.email')}
                      className="pl-10 h-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{t('fields.phone')}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder={t('fields.phone')}
                      className="pl-10 h-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">{t('fields.message')}</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={t('fields.message')}
                    className="min-h-[80px] resize-none"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? t('actions.submitting') : t('actions.submit')}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {t('actions.cancel')}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
