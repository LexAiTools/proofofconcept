-- Fix security vulnerabilities in chat tables
-- Remove overly permissive policies that expose customer PII

-- Drop existing insecure policies on chat_conversations
DROP POLICY IF EXISTS "Anyone can read their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Anyone can update their own conversations" ON chat_conversations;

-- Drop existing insecure policies on chat_messages  
DROP POLICY IF EXISTS "Anyone can read messages" ON chat_messages;

-- Create secure admin-only policies for chat_conversations
CREATE POLICY "Admins can view all conversations"
  ON chat_conversations
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update conversations"
  ON chat_conversations
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create secure admin-only policy for chat_messages
CREATE POLICY "Admins can view all messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Note: INSERT policies remain unchanged as the edge function needs to create records
-- The edge function uses service_role key which bypasses RLS, so it can still:
-- 1. Create new conversations and messages
-- 2. Read conversations for chat context
-- 3. Update conversation metadata
-- Only admins can view this sensitive data through the client