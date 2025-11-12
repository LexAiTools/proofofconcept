import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface LeadCaptureInput {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  conversationId: string;
}

export const useLeadCapture = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation('leads');

  const submitLead = async (data: LeadCaptureInput): Promise<boolean> => {
    setIsSubmitting(true);

    try {
      // Insert lead into leads table
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          message: data.message || null,
          source_form: 'chat-lead-capture',
          status: 'new',
          metadata: {
            conversation_id: data.conversationId,
            captured_at: new Date().toISOString(),
          },
        })
        .select('id')
        .single();

      if (leadError) throw leadError;

      // Update conversation metadata
      const { error: convError } = await supabase
        .from('chat_conversations')
        .update({
          email: data.email,
          name: data.name,
          phone: data.phone || null,
          metadata: {
            lead_captured: true,
            lead_id: leadData.id,
            captured_at: new Date().toISOString(),
          },
        })
        .eq('id', data.conversationId);

      if (convError) {
        console.warn('Failed to update conversation:', convError);
      }

      toast({
        title: t('success'),
        description: t('successDescription'),
      });

      return true;
    } catch (error) {
      console.error('Lead capture error:', error);
      toast({
        title: t('error'),
        description: t('errorDescription'),
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitLead,
    isSubmitting,
  };
};
