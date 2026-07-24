-- History & Civilization path library seed
-- Run AFTER apply_history_path_collections.sql

DO $$
DECLARE
  v_path_id uuid;
  v_pillar_id uuid;
  v_collection_id uuid;
  v_sub_id uuid;
  v_article_id uuid;
  v_sort integer;
  v_title text;
  v_slug text;
  v_lesson record;
BEGIN
  SELECT id INTO v_path_id
  FROM public.adventure_paths
  WHERE public_slug = 'history-civilization' OR slug = 'ancient-egypt'
  LIMIT 1;

  SELECT id INTO v_pillar_id
  FROM public.pillars
  WHERE slug IN ('history-civilizations', 'history-civilization', 'history')
  ORDER BY CASE slug WHEN 'history-civilizations' THEN 0 WHEN 'history-civilization' THEN 1 ELSE 2 END
  LIMIT 1;

  IF v_path_id IS NULL THEN
    RAISE EXCEPTION 'History & Civilization adventure path not found.';
  END IF;

  IF v_pillar_id IS NULL THEN
    SELECT id INTO v_pillar_id FROM public.pillars ORDER BY sort_order LIMIT 1;
  END IF;

  -- Helper: upsert collection by slug
  CREATE TEMP TABLE IF NOT EXISTS _history_collections (
    slug text PRIMARY KEY,
    id uuid NOT NULL
  ) ON COMMIT DROP;
  DELETE FROM _history_collections;

  INSERT INTO public.content_collections (
    title, slug, description, collection_type, is_featured, status, sort_order,
    adventure_path_id, difficulty_level, estimated_minutes, certificate_title
  ) VALUES
    (
      'The Life of Prophet Muhammad ﷺ',
      'life-of-prophet-muhammad',
      'From the Year of the Elephant through the Final Sermon — a complete journey through the Seerah.',
      'path_library', true, 'published', 1,
      v_path_id, 'all', 120,
      'Seerah Explorer Certificate'
    ),
    (
      'The Companions (Sahabah)',
      'companions',
      'Meet the men and women who stood beside the Prophet ﷺ and shaped the early Ummah.',
      'path_library', false, 'published', 2,
      v_path_id, 'all', 180,
      'Companion of the Prophet Certificate'
    ),
    (
      'Prophets',
      'prophets',
      'Stories, timelines, and lessons from every Prophet — from Adam (AS) to Muhammad ﷺ.',
      'path_library', false, 'published', 3,
      v_path_id, 'all', 240,
      'Stories of the Prophets Certificate'
    ),
    (
      'The Rightly Guided Caliphs',
      'rightly-guided-caliphs',
      'Leadership, justice, and challenges during the era of Abu Bakr, Umar, Uthman, and Ali (RA).',
      'path_library', false, 'published', 4,
      v_path_id, 'discoverer', 60,
      'Khulafa Rashidun Certificate'
    ),
    (
      'Great Muslim Leaders',
      'great-muslim-leaders',
      'Salahuddin, Umar ibn Abdul Aziz, Muhammad Al-Fatih, and leaders who changed history with faith.',
      'path_library', false, 'published', 5,
      v_path_id, 'discoverer', 75,
      'Muslim Leadership Certificate'
    ),
    (
      'Great Muslim Scholars',
      'great-muslim-scholars',
      'Imams of fiqh, hadith, and knowledge who preserved and spread Islamic learning.',
      'path_library', false, 'published', 6,
      v_path_id, 'thinker', 90,
      'Islamic Scholarship Certificate'
    ),
    (
      'Muslim Scientists & Inventors',
      'muslim-scientists-inventors',
      'Ibn Sina, Ibn Al-Haytham, Al-Khwarizmi, and pioneers of science in the Islamic world.',
      'path_library', false, 'published', 7,
      v_path_id, 'all', 80,
      'Islamic Science Certificate'
    ),
    (
      'Great Islamic Civilizations',
      'islamic-civilizations',
      'Madinah, Baghdad, Cordoba, Cairo, and cities that carried knowledge and faith across centuries.',
      'path_library', false, 'published', 8,
      v_path_id, 'all', 100,
      'Civilizations Explorer Certificate'
    ),
    (
      'Islamic Architecture',
      'islamic-architecture',
      'The Ka''bah, Al-Masjid Al-Haram, Al-Masjid An-Nabawi, and Al-Masjid Al-Aqsa — sacred spaces of the Ummah.',
      'path_library', false, 'published', 9,
      v_path_id, 'all', 70,
      'Architecture Explorer Certificate'
    ),
    (
      'Major Events in Islamic History',
      'major-events-in-islamic-history',
      'Turning points that shaped the Ummah — the Hijrah, Treaty of Hudaybiyyah, Opening of Makkah, and more.',
      'path_library', false, 'published', 10,
      v_path_id, 'all', 55,
      'Major Events Certificate'
    )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    collection_type = EXCLUDED.collection_type,
    is_featured = EXCLUDED.is_featured,
    status = EXCLUDED.status,
    sort_order = EXCLUDED.sort_order,
    adventure_path_id = EXCLUDED.adventure_path_id,
    difficulty_level = EXCLUDED.difficulty_level,
    estimated_minutes = EXCLUDED.estimated_minutes,
    certificate_title = EXCLUDED.certificate_title,
    updated_at = now();

  INSERT INTO _history_collections (slug, id)
  SELECT slug, id FROM public.content_collections
  WHERE slug IN (
    'life-of-prophet-muhammad', 'companions', 'prophets', 'rightly-guided-caliphs',
    'great-muslim-leaders', 'great-muslim-scholars', 'muslim-scientists-inventors',
    'islamic-civilizations', 'islamic-architecture', 'major-events-in-islamic-history'
  );

  UPDATE public.content_collections
  SET status = 'archived', updated_at = now()
  WHERE slug IN ('important-battles', 'islamic-timeline', 'stories-that-changed-history');

  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'companions';

  INSERT INTO public.content_collections (
    title, slug, description, collection_type, status, sort_order,
    adventure_path_id, parent_collection_id, difficulty_level, estimated_minutes, certificate_title
  ) VALUES
    ('The First Muslims', 'the-first-muslims', 'Khadijah, Abu Bakr, Ali, and Zayd (RA) — the earliest believers.', 'subcollection', 'published', 1, v_path_id, v_collection_id, 'all', 40, NULL),
    ('The Early Believers (As-Sabiqun al-Awwalun)', 'early-believers', 'Who they were, why they were special, and their sacrifices.', 'subcollection', 'published', 2, v_path_id, v_collection_id, 'discoverer', 35, NULL),
    ('The Muhajirun', 'the-muhajirun', 'Meaning, Hijrah, sacrifice, and brotherhood of those who migrated.', 'subcollection', 'published', 3, v_path_id, v_collection_id, 'discoverer', 35, NULL),
    ('The Ansar', 'the-ansar', 'Those who welcomed the Muslims to Madinah with generosity and support.', 'subcollection', 'published', 4, v_path_id, v_collection_id, 'discoverer', 35, NULL),
    ('The Ten Promised Paradise', 'ten-promised-paradise', 'One lesson for each of the ten companions promised Jannah.', 'subcollection', 'published', 5, v_path_id, v_collection_id, 'all', 90, NULL),
    ('Women of the Sahabah', 'women-of-the-sahabah', 'Khadijah, Aisha, Fatimah, Asma, Umm Salamah, and Nusaybah (RA).', 'subcollection', 'published', 6, v_path_id, v_collection_id, 'all', 50, NULL),
    ('Young Heroes', 'young-heroes', 'Abdullah ibn Abbas, Abdullah ibn Umar, Usamah, Hasan, and Husayn (RA).', 'subcollection', 'published', 7, v_path_id, v_collection_id, 'explorer', 45, NULL)
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    parent_collection_id = EXCLUDED.parent_collection_id,
    sort_order = EXCLUDED.sort_order,
    updated_at = now();

  -- Seerah lessons (25-lesson curriculum)
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'life-of-prophet-muhammad';

  CREATE TEMP TABLE IF NOT EXISTS _seerah_lessons (
    sort_order integer PRIMARY KEY,
    title text NOT NULL,
    slug text NOT NULL
  ) ON COMMIT DROP;
  DELETE FROM _seerah_lessons;

  INSERT INTO _seerah_lessons (sort_order, title, slug) VALUES
    (1,  'The Year of the Elephant', 'history-seerah-the-year-of-the-elephant'),
    (2,  'The Birth of Prophet Muhammad ﷺ', 'birth-of-prophet-muhammad'),
    (3,  'Life with Halimah', 'life-with-halimah'),
    (4,  'The Opening of the Chest', 'opening-of-the-chest'),
    (5,  'The Death of Aminah', 'death-of-aminah'),
    (6,  'Abu Talib, the Guardian', 'abu-talib-guardian'),
    (7,  'The Shepherd of Makkah', 'shepherding-in-makkah'),
    (8,  'Hilf al-Fudul', 'hilf-al-fudul'),
    (9,  'Marriage to Khadijah (RA)', 'marriage-to-khadijah'),
    (10, 'Rebuilding the Ka''bah', 'rebuilding-the-kabah'),
    (11, 'Cave Hira', 'cave-hira'),
    (12, 'The First Revelation', 'the-first-revelation'),
    (13, 'Da''wah in Secret', 'dawah-in-secret'),
    (14, 'The Public Call', 'history-seerah-the-public-call'),
    (15, 'Migration to Abyssinia', 'migration-to-abyssinia'),
    (16, 'The Boycott', 'history-seerah-the-boycott'),
    (17, 'The Journey to Ta''if', 'journey-to-taif'),
    (18, 'Isra'' & Mi''raj', 'history-seerah-isra-mi-raj'),
    (19, 'The Hijrah', 'history-seerah-the-hijrah'),
    (20, 'Battle of Badr', 'history-seerah-battle-of-badr'),
    (21, 'Battle of Uhud', 'history-seerah-battle-of-uhud'),
    (22, 'Battle of the Trench', 'history-seerah-battle-of-the-trench'),
    (23, 'Treaty of Hudaybiyyah', 'history-seerah-treaty-of-hudaybiyyah'),
    (24, 'Conquest of Makkah', 'history-seerah-conquest-of-makkah'),
    (25, 'Farewell Pilgrimage', 'history-seerah-farewell-pilgrimage');

  FOR v_lesson IN
    SELECT sort_order, title, slug FROM _seerah_lessons ORDER BY sort_order
  LOOP
    v_sort := v_lesson.sort_order;
    v_title := v_lesson.title;
    v_slug := v_lesson.slug;
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — part of The Life of Prophet Muhammad ﷺ collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Ten Promised Paradise lessons
  SELECT id INTO v_collection_id FROM public.content_collections WHERE slug = 'ten-promised-paradise';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Abu Bakr (RA)', 'Umar ibn Al-Khattab (RA)', 'Uthman ibn Affan (RA)', 'Ali ibn Abi Talib (RA)',
    'Talhah ibn Ubaydullah (RA)', 'Az-Zubayr ibn Al-Awwam (RA)', 'Abdur-Rahman ibn Awf (RA)',
    'Sa''d ibn Abi Waqqas (RA)', 'Sa''id ibn Zayd (RA)', 'Abu Ubaydah ibn Al-Jarrah (RA)',
    'What Made Them Special?'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-ashara-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — The Ten Promised Paradise collection.', false, 7)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- First Muslims
  SELECT id INTO v_collection_id FROM public.content_collections WHERE slug = 'the-first-muslims';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Khadijah (RA)', 'Abu Bakr (RA)', 'Ali ibn Abi Talib (RA)', 'Zayd ibn Harithah (RA)'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-first-muslims-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — The First Muslims collection.', false, 7)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Rightly Guided Caliphs
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'rightly-guided-caliphs';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY['Abu Bakr (RA)', 'Umar ibn Al-Khattab (RA)', 'Uthman ibn Affan (RA)', 'Ali ibn Abi Talib (RA)'] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-caliph-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Rightly Guided Caliphs collection.', false, 10)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Major Events in Islamic History
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'major-events-in-islamic-history';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'The Hijrah', 'Treaty of Hudaybiyyah', 'Conquest of Makkah', 'Compilation of the Qur''an'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-event-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Major Events in Islamic History collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Great Muslim Leaders
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'great-muslim-leaders';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Salahuddin Al-Ayyubi', 'Muhammad Al-Fatih', 'Tariq ibn Ziyad'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-leader-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Great Muslim Leaders collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Great Muslim Scholars
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'great-muslim-scholars';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Imam Malik', 'Imam Abu Hanifah', 'Imam Ash-Shafi''i', 'Imam Ahmad', 'Imam Al-Bukhari'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-scholar-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Great Muslim Scholars collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Muslim Scientists & Inventors
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'muslim-scientists-inventors';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Ibn Sina', 'Al-Khwarizmi', 'Ibn Al-Haytham', 'Al-Jazari'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-scientist-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Muslim Scientists & Inventors collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Great Islamic Civilizations
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'islamic-civilizations';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Madinah', 'Baghdad', 'Cordoba', 'Jerusalem', 'Cairo', 'Istanbul'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-civilization-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Great Islamic Civilizations collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  -- Islamic Architecture
  SELECT id INTO v_collection_id FROM _history_collections WHERE slug = 'islamic-architecture';
  v_sort := 0;
  FOREACH v_title IN ARRAY ARRAY[
    'Ka''bah', 'Al-Masjid Al-Haram', 'Al-Masjid An-Nabawi', 'Al-Masjid Al-Aqsa'
  ] LOOP
    v_sort := v_sort + 1;
    v_slug := 'history-architecture-' || regexp_replace(lower(v_title), '[^a-z0-9]+', '-', 'g');
    INSERT INTO public.articles (pillar_id, title, slug, excerpt, published, reading_time_minutes)
    VALUES (v_pillar_id, v_title, v_slug, 'Coming soon — Islamic Architecture collection.', false, 8)
    ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
    RETURNING id INTO v_article_id;

    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, v_sort, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;
  END LOOP;

  UPDATE public.adventure_paths
  SET
    certificate_enabled = true,
    certificate_title = 'History & Civilization Library Certificate',
    mission_statement = COALESCE(mission_statement, 'Discover how people lived, built, and shaped the world through time — one collection at a time.')
  WHERE id = v_path_id;

END $$;

NOTIFY pgrst, 'reload schema';
