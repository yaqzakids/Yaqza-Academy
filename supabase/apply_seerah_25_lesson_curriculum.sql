-- Restructure Life of Prophet Muhammad ﷺ collection to 25-lesson curriculum
-- Run in Supabase → SQL Editor after apply_history_path_collections_seed.sql
-- Safe to re-run: upserts collection order and archives the bundled childhood lesson.

DO $$
DECLARE
  v_collection_id uuid;
  v_childhood_id uuid;
BEGIN
  SELECT id INTO v_collection_id
  FROM public.content_collections
  WHERE slug = 'life-of-prophet-muhammad';

  IF v_collection_id IS NULL THEN
    RAISE EXCEPTION 'Collection life-of-prophet-muhammad not found.';
  END IF;

  -- Archive bundled childhood lesson (replaced by lessons 2–6)
  SELECT id INTO v_childhood_id
  FROM public.articles
  WHERE slug IN ('childhood-of-prophet-muhammad', 'history-seerah-childhood')
  LIMIT 1;

  IF v_childhood_id IS NOT NULL THEN
    UPDATE public.articles
    SET published = false, updated_at = now()
    WHERE id = v_childhood_id;

    DELETE FROM public.collection_items
    WHERE collection_id = v_collection_id AND article_id = v_childhood_id;
  END IF;

  -- Remove legacy lessons not in the 25-lesson plan
  DELETE FROM public.collection_items ci
  USING public.articles a
  WHERE ci.collection_id = v_collection_id
    AND ci.article_id = a.id
    AND a.slug IN (
      'history-seerah-before-islam',
      'history-seerah-madinah',
      'history-seerah-final-sermon',
      'the-secret-call'
    );

  -- Canonical slug aliases → published lesson slugs
  UPDATE public.articles SET slug = 'dawah-in-secret', title = 'Da''wah in Secret'
  WHERE slug IN ('the-secret-call', 'history-seerah-the-secret-call')
    AND slug <> 'dawah-in-secret';

  UPDATE public.articles SET slug = 'the-first-revelation', title = 'The First Revelation'
  WHERE slug = 'history-seerah-the-first-revelation'
    AND slug <> 'the-first-revelation';

  -- Ensure all 25 lessons exist and are linked with correct sort order
  WITH lesson_order(slug, sort_order) AS (
    VALUES
      ('history-seerah-the-year-of-the-elephant', 1),
      ('birth-of-prophet-muhammad', 2),
      ('life-with-halimah', 3),
      ('opening-of-the-chest', 4),
      ('death-of-aminah', 5),
      ('abu-talib-guardian', 6),
      ('shepherding-in-makkah', 7),
      ('hilf-al-fudul', 8),
      ('marriage-to-khadijah', 9),
      ('rebuilding-the-kabah', 10),
      ('cave-hira', 11),
      ('the-first-revelation', 12),
      ('dawah-in-secret', 13),
      ('history-seerah-the-public-call', 14),
      ('migration-to-abyssinia', 15),
      ('history-seerah-the-boycott', 16),
      ('journey-to-taif', 17),
      ('history-seerah-isra-mi-raj', 18),
      ('history-seerah-the-hijrah', 19),
      ('history-seerah-battle-of-badr', 20),
      ('history-seerah-battle-of-uhud', 21),
      ('history-seerah-battle-of-the-trench', 22),
      ('history-seerah-treaty-of-hudaybiyyah', 23),
      ('history-seerah-conquest-of-makkah', 24),
      ('history-seerah-farewell-pilgrimage', 25)
  )
  INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
  SELECT v_collection_id, a.id, lo.sort_order, 'lesson'
  FROM lesson_order lo
  JOIN public.articles a ON a.slug = lo.slug
  ON CONFLICT (collection_id, article_id) DO UPDATE
    SET sort_order = EXCLUDED.sort_order, item_type = 'lesson';
END $$;

NOTIFY pgrst, 'reload schema';
