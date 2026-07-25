-- Set cover image for Life with Halimah (lesson 3)
-- Image file: public/articles/covers/life-with-halimah.png

UPDATE public.articles
SET cover_image_url = '/articles/covers/life-with-halimah.png'
WHERE slug = 'life-with-halimah';

NOTIFY pgrst, 'reload schema';
