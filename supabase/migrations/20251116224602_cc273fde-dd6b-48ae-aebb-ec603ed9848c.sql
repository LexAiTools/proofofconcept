-- Add slug column to podcasts table
ALTER TABLE podcasts ADD COLUMN slug TEXT;

-- Add unique constraint (slug must be unique per language)
ALTER TABLE podcasts ADD CONSTRAINT unique_slug_per_language UNIQUE (slug, language);

-- Add index for performance
CREATE INDEX idx_podcasts_slug ON podcasts(slug);

-- Add comment for documentation
COMMENT ON COLUMN podcasts.slug IS 'SEO-friendly URL slug generated from title';