-- Update knowledge_base table to replace MVPBlocks with Proof of Concepts
UPDATE public.knowledge_base
SET 
  title = REPLACE(title, 'MVPBlocks', 'Proof of Concepts'),
  content = REPLACE(content, 'MVPBlocks', 'Proof of Concepts')
WHERE 
  title LIKE '%MVPBlocks%' 
  OR content LIKE '%MVPBlocks%';