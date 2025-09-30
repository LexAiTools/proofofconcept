-- Fix security issues from previous migration

-- 1. Fix function search path - update function with proper search_path (no need to drop)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Move vector extension to extensions schema (if not already there)
-- Note: We skip this as it requires CASCADE which would break existing functionality
-- The warning about extension in public is low priority and can be addressed later