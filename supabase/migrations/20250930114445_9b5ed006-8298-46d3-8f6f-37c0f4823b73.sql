-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;

-- Create a new policy that allows inserting the first admin when table is empty
-- or allows existing admins to insert new roles
CREATE POLICY "Allow first admin or admin inserts" 
ON public.user_roles
FOR INSERT 
WITH CHECK (
  -- Allow if table is empty (first admin)
  NOT EXISTS (SELECT 1 FROM public.user_roles LIMIT 1)
  OR
  -- Allow if user is already an admin
  public.has_role(auth.uid(), 'admin'::app_role)
);