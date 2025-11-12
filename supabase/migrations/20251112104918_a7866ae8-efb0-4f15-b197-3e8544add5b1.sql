-- Create plugin_waitlist table
CREATE TABLE public.plugin_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source_button TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.plugin_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (join waitlist)
CREATE POLICY "Anyone can join waitlist"
ON public.plugin_waitlist
FOR INSERT
WITH CHECK (true);

-- Only admins can view waitlist
CREATE POLICY "Admins can view waitlist"
ON public.plugin_waitlist
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index on email for faster lookups
CREATE INDEX idx_plugin_waitlist_email ON public.plugin_waitlist(email);

-- Create index on created_at for counting
CREATE INDEX idx_plugin_waitlist_created_at ON public.plugin_waitlist(created_at);