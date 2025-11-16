-- Add language column for PL/EN filtering
ALTER TABLE podcasts 
ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'pl';

-- Add platform_name column (editable instead of hardcoded "NestAi.tools")
ALTER TABLE podcasts 
ADD COLUMN IF NOT EXISTS platform_name text NOT NULL DEFAULT 'NestAi.tools';

-- Add episode_film_title column (second title for video card)
ALTER TABLE podcasts 
ADD COLUMN IF NOT EXISTS episode_film_title text;

-- Make guest_name and guest_role optional
ALTER TABLE podcasts 
ALTER COLUMN guest_name DROP NOT NULL,
ALTER COLUMN guest_role DROP NOT NULL;