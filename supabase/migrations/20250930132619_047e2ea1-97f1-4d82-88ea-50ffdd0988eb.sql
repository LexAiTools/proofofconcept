-- Add missing DELETE policy for chat_conversations (admin only)
CREATE POLICY "Admins can delete conversations"
ON public.chat_conversations
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add UPDATE policy for chat_messages (admin only)
CREATE POLICY "Admins can update messages"
ON public.chat_messages
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add DELETE policy for chat_messages (admin only)
CREATE POLICY "Admins can delete messages"
ON public.chat_messages
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Add comment to document PII storage
COMMENT ON TABLE public.chat_conversations IS 'Contains PII (email, phone, name). Access restricted to admins via RLS.';
COMMENT ON TABLE public.leads IS 'Contains PII (email, phone, name, company). Access restricted to admins via RLS.';