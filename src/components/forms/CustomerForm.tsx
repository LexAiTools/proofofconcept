import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, Phone, Mail, User, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";

const customerFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  comments: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void;
  onBack: () => void;
  showBackButton: boolean;
}

export const CustomerForm = ({ onSubmit, onBack, showBackButton }: CustomerFormProps) => {
  const { t } = useTranslation('forms');
  
  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      company: "",
      comments: "",
    },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2">{t('customer.title')}</h3>
        <p className="text-muted-foreground mb-6 text-sm md:text-base">
          {t('customer.subtitle')}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium text-sm">{t('customer.fields.firstName')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder={t('customer.fields.placeholders.firstName')}
                          className="pl-10 bg-input border-border focus:border-primary focus:ring-primary h-10 md:h-11"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium text-sm">{t('customer.fields.lastName')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                          placeholder={t('customer.fields.placeholders.lastName')}
                          className="pl-10 bg-input border-border focus:border-primary focus:ring-primary h-10 md:h-11"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium text-sm">{t('customer.fields.phone')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">🇺🇸</span>
                      </div>
                      <Input 
                        placeholder={t('customer.fields.placeholders.phone')}
                        className="pl-16 bg-input border-border focus:border-primary focus:ring-primary h-10 md:h-11"
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
                  <FormLabel className="text-foreground font-medium text-sm">{t('customer.fields.email')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder={t('customer.fields.placeholders.email')}
                        type="email"
                        className="pl-10 bg-input border-border focus:border-primary focus:ring-primary h-10 md:h-11"
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium text-sm">{t('customer.fields.company')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder={t('customer.fields.placeholders.company')}
                        className="pl-10 bg-input border-border focus:border-primary focus:ring-primary h-10 md:h-11"
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
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium text-sm">{t('customer.fields.comments')}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea 
                        placeholder={t('customer.fields.placeholders.comments')}
                        className="pl-10 bg-input border-border focus:border-primary focus:ring-primary min-h-[80px] md:min-h-[100px] resize-none"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4 md:pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={!showBackButton}
                className={showBackButton ? "text-muted-foreground hover:text-foreground h-9 md:h-10" : "invisible"}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common:buttons.back')}
              </Button>
              
              <Button
                type="submit"
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 h-9 md:h-10"
              >
                {t('common:buttons.submit')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};