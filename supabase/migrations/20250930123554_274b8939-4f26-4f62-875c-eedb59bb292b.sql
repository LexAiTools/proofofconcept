-- Create podcasts table
CREATE TABLE public.podcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  episode_number INTEGER NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  host_name TEXT NOT NULL,
  host_role TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  guest_role TEXT NOT NULL,
  company TEXT NOT NULL,
  company_color TEXT NOT NULL,
  episode_date DATE NOT NULL,
  youtube_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view podcasts" 
ON public.podcasts 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can insert podcasts" 
ON public.podcasts 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update podcasts" 
ON public.podcasts 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete podcasts" 
ON public.podcasts 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_podcasts_updated_at
BEFORE UPDATE ON public.podcasts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();