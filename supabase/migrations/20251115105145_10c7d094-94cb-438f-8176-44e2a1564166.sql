-- Add RLS policy for admins to delete waitlist entries
CREATE POLICY "Admins can delete waitlist entries"
ON plugin_waitlist
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));