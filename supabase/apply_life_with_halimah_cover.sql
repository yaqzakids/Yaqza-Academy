-- Set cover image for Life with Halimah (lesson 3)
-- Image file: public/articles/covers/life-with-halimah.jpg
-- Run this entire block in the Supabase SQL Editor.

UPDATE public.articles
SET cover_image_url = '/articles/covers/life-with-halimah.jpg'
WHERE slug = 'life-with-halimah'
   OR title ILIKE '%halimah%'
   OR excerpt ILIKE '%halimah%';
