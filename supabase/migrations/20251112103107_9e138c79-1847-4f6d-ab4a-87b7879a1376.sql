-- Drop existing policy that's causing 42501 error
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Create new policy with PUBLIC role (consistent with chat_messages table)
CREATE POLICY "Anyone can insert leads" 
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);