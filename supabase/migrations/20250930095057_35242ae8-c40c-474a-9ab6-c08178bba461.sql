-- Fix security vulnerabilities in chat tables - robust version
-- This handles cases where policies may already exist

-- ===== CHAT CONVERSATIONS =====

-- Drop all existing policies on chat_conversations
DROP POLICY IF EXISTS "Anyone can read their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Anyone can update their own conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Admins can view all conversations" ON chat_conversations;
DROP POLICY IF EXISTS "Admins can update conversations" ON chat_conversations;

-- Create secure admin-only SELECT policy
CREATE POLICY "Admins can view all conversations"
  ON chat_conversations
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create secure admin-only UPDATE policy
CREATE POLICY "Admins can update conversations"
  ON chat_conversations
  FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ===== CHAT MESSAGES =====

-- Drop all existing policies on chat_messages
DROP POLICY IF EXISTS "Anyone can read messages" ON chat_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON chat_messages;

-- Create secure admin-only SELECT policy
CREATE POLICY "Admins can view all messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ===== SUMMARY =====
-- INSERT policies remain unchanged - the edge function can still create records
-- The rag-chat edge function uses service_role key which bypasses RLS
-- Only authenticated admins can now view the sensitive customer data (emails, phones, messages)