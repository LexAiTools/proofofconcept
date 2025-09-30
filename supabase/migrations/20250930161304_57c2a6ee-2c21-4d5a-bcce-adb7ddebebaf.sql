-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', true);

-- Create RLS policies for documents bucket
CREATE POLICY "Anyone can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

CREATE POLICY "Admins can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND has_role(auth.uid(), 'admin'::app_role));

-- Create documents table for metadata
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on documents table
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for documents table
CREATE POLICY "Anyone can view documents"
ON public.documents FOR SELECT
USING (true);

CREATE POLICY "Admins can insert documents"
ON public.documents FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update documents"
ON public.documents FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete documents"
ON public.documents FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON public.documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();