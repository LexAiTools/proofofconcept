-- Allow everyone to read the count of waitlist entries
-- This policy allows SELECT but will be combined with the admin policy using OR logic
CREATE POLICY "Anyone can view waitlist count"
ON plugin_waitlist
FOR SELECT
TO public
USING (true);