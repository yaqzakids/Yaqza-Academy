-- Explorer + Discoverer + Thinker lesson: Hilf al-Fudul (lesson 8)
-- Collection: The Life of Prophet Muhammad ﷺ (life-of-prophet-muhammad)
-- Primary source: Sh. Dr. Yasir Qadhi Seerah Ep. 008 (Sahih al-Bukhari)
-- Run after apply_seerah_25_lesson_curriculum.sql

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS usul_theme text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS quran_connection text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS quran_reference text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hadith_connection text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hadith_reference text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS islamic_reflection text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS take_action text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reflection_question text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS activity_cards jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS fun_facts jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS vocabulary jsonb DEFAULT '[]'::jsonb;

ALTER TABLE public.quizzes
  ADD COLUMN IF NOT EXISTS title text DEFAULT 'Article Quiz',
  ADD COLUMN IF NOT EXISTS passing_score integer DEFAULT 70,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS randomize_questions boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS randomize_answers boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_explanations boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS allow_retries boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS stars_awarded integer DEFAULT 25;

CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  options jsonb NOT NULL,
  explanation text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.quiz_questions
  ADD COLUMN IF NOT EXISTS age_group text DEFAULT 'explorer',
  ADD COLUMN IF NOT EXISTS question_type text DEFAULT 'multiple_choice',
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS difficulty text DEFAULT 'medium';

-- ---------------------------------------------------------------------------
-- Full lesson content (Explorer + Discoverer + Thinker) — same layout as Year of the Elephant
-- ---------------------------------------------------------------------------
UPDATE public.articles
SET
  title = 'Hilf al-Fudul (حلف الفضول)',
  slug = 'hilf-al-fudul',
  excerpt = 'Before prophethood, Muhammad ﷺ witnessed a pact in Makkah to stand with the oppressed — and years later as Prophet, he said he would still uphold it.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 16,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/hilf-al-fudul.png',
  usul_theme = 'justice',
  content_explorer = $article$Before We Begin

Have you ever seen someone treated unfairly?

Long ago in Makkah, a merchant from far away was cheated by a rich and powerful man. At first, nobody wanted to help him.

Then the leaders of Makkah made a special promise — to stand with anyone who was wronged, even if the wrongdoer was powerful.

This promise became known as Hilf al-Fudul.

A Merchant Comes to Makkah

A Merchant Comes to Makkah

When Muhammad ﷺ was a young man, a merchant traveled from Yemen to Makkah to sell his goods.

He sold everything to a wealthy leader named al-As ibn Wa'il.

Al-As promised, "I will pay you after Hajj."

But after Hajj, he kept saying, "Come back tomorrow."

The merchant realized he might never get his money.

No One Would Help

The merchant asked different families in Quraysh for help.

But many made excuses, because al-As was rich and powerful.

The merchant's own tribe was far away in Yemen. He felt alone.

A Poem at the Ka'bah

So he stood near the Ka'bah and spoke a poem aloud, telling everyone what had happened.

News spread quickly through Makkah.

A Pact for Justice

Al-Zubayr ibn Abdul-Muttalib — an uncle from the Prophet's ﷺ family — heard what happened.

He called the leaders of Quraysh to meet at the house of Abdullah ibn Jud'an.

They made a promise together:

They would help the person who was wronged, even if the wrongdoer was powerful.

They would stand with the oppressed — no matter which tribe they came from.

Muhammad ﷺ Was There

Muhammad ﷺ was present at this meeting. He was about twenty years old — one of the youngest there.

Years later, when he was the Messenger of Allah, he said he was proud to have been part of this pact.

He said that even after Islam came, he would still uphold this treaty of justice.

You Learned

• Hilf al-Fudul was a promise to help the oppressed.
• A Yemeni merchant was cheated by al-As ibn Wa'il.
• Quraysh leaders met at the house of Abdullah ibn Jud'an.
• Muhammad ﷺ witnessed the pact in his early twenties.
• Standing for justice is part of being a believer.

Today's Mission

Choose one:

• Stand up for someone who is being treated unfairly — with kindness and courage.
• Return something that belongs to someone else.
• Tell the truth when others might stay silent.

Then write: Justice means standing with those who are wronged.

Reward: +10 Stars

MashaAllah! You learned about Hilf al-Fudul. Today you discovered that standing with the oppressed is beloved to Allah.
$article$,
  content_discoverer = $discoverer$Summary

In his early twenties, Muhammad ﷺ witnessed one of the most famous acts of justice in pre-Islamic Makkah. After a Yemeni merchant was cheated by a wealthy Qurayshi leader, the chiefs of Makkah agreed to a pact called Hilf al-Fudul — a promise to stand with the oppressed against the oppressor.

Years later, as Prophet ﷺ, he praised this pact in Sahih al-Bukhari and said he would uphold it even in Islam.

This lesson teaches us about justice, courage, and standing for what is right — even when it is difficult.

Makkah Before Islam

At that time, Makkah was a tribal society. Wealth and status often protected the powerful.

A merchant from the tribe of Zubayd in Yemen came to trade in Makkah. He sold goods to al-As ibn Wa'il, a Qurayshi chieftain and the father of the future companion Amr ibn al-As.

Al-As promised to pay after Hajj. But when the merchant returned, al-As kept delaying payment until the merchant realized he would not be paid.

The Merchant Seeks Help

The merchant asked several subtribes of Quraysh for support, including Banu Hashim. But many refused, because al-As was influential and wealthy.

With no tribal backup in Makkah, the merchant made his case public by reciting a poem near the Ka'bah.

The Gathering at Abdullah ibn Jud'an's House

Al-Zubayr ibn Abdul-Muttalib, an uncle of Muhammad ﷺ, called senior members of Quraysh to meet at the house of Abdullah ibn Jud'an.

They agreed to a treaty:

• They would side with the oppressed against the oppressor.
• This would apply even if the wronged person was from a distant tribe.
• This would apply even if the wrongdoer was from Quraysh itself.

Hilf al-Mutayyabin

They affirmed the pact near the Ka'bah. Because most people could not write, they dipped their hands in perfume and placed their mark on the Ka'bah.

This is why it is also called Hilf al-Mutayyabin — the Pact of Those Who Perfumed Themselves.

When al-As heard about it, he complained that they got involved in something that was "fuduli" — none of their business. That complaint gave the pact its famous name: Hilf al-Fudul.

The Prophet's ﷺ Testimony

Years later, the Prophet ﷺ said:

"I witnessed in the house of Abdullah ibn Jud'an a treaty that, were I asked to uphold it even in Islam, I would do so. And I would not be willing to give up my place for a lot of red camels."

He also said they agreed that rights would be returned to those who deserved them, and that no oppressor would have the upper hand over the oppressed.

Muhammad ﷺ was among the youngest present — about twenty years old — which shows that even then, people saw in him honesty and leadership.

Why Is This Event Important?

Hilf al-Fudul shows that justice is a universal value.

It reminds us that Muslims should stand with the oppressed, not with the powerful.

It also shows that Muhammad ﷺ was known for justice long before he received revelation.
$discoverer$,
  content_thinker = $thinker$Lesson Summary

Before prophethood, Muhammad ﷺ witnessed a cross-tribal pact in Makkah known as Hilf al-Fudul. Formed after a Yemeni merchant was cheated by the Qurayshi elite al-As ibn Wa'il, the treaty established a principle: support the oppressed against the oppressor regardless of lineage or status.

The Prophet ﷺ later affirmed this pact in Sahih al-Bukhari, stating he would uphold it even in the Islamic era.

This lesson explores the historical background, the Prophet's testimony, Qur'anic principles of justice, and lessons for Muslims today.

Context in Jahiliyyah Makkah

By his early twenties, Muhammad ﷺ had earned the title Al-Amīn. Society was tribal, commercial, and hierarchical.

When a merchant from Banu Zubayd sold goods to al-As ibn Wa'il, al-As refused to honour the contract through repeated delay. Appeals to Quraysh subtribes failed largely because of al-As's wealth and political influence.

Public poetry near the Ka'bah became the merchant's only recourse.

The Formation of Hilf al-Fudul

Al-Zubayr ibn Abdul-Muttalib convened Quraysh leadership at the house of Abdullah ibn Jud'an during Dhu al-Qa'dah, a sacred month.

The resulting pact affirmed perfumed handprints near the Ka'bah — Hilf al-Mutayyabin. Al-As's dismissive remark that the matter was "fuduli" (not their business) gave the pact the name Hilf al-Fudul.

Prophetic Endorsement

The Prophet ﷺ's testimony is remarkable: he would uphold the treaty even in Islam and would not trade his place in it for "a lot of red camels."

This affirms that justice transcends religious labels. Oppression remains oppression whether the oppressor shares our faith or not.

The Youngest Witness

Muhammad ﷺ was approximately twenty — likely the youngest participant. His inclusion signals that Quraysh already recognized his moral authority before revelation.

Qur'anic Alignment

Allah commands believers to stand firm for justice as witnesses for Allah, even against oneself or one's relatives (Surah An-Nisa 4:135).

Hilf al-Fudul embodied this spirit decades before revelation.

Lessons for Today

• Justice is not limited to explicitly religious causes.
• Muslims should engage in fair treatment of the vulnerable in society.
• Character and civic trust are built before public da'wah.
• Standing with the oppressed reflects sincere faith.

Research Activity — Justice Pact Comparison

Create a two-column chart.

Column 1: Facts from the Seerah about Hilf al-Fudul (merchant, al-As, Abdullah ibn Jud'an, Prophet's testimony).

Column 2: One modern example of standing for justice (fair trade, anti-bullying, civil rights, charity for the poor).

Discuss how the Prophet's ﷺ example applies today.
$thinker$,
  islamic_teaching = 'Justice is one of the greatest values in Islam. Hilf al-Fudul shows that standing with the oppressed is not only allowed — it is honourable. The Prophet ﷺ praised this pact throughout his life because it reflected the justice Allah loves.',
  islamic_reflection = 'Hilf al-Fudul reminds us that oppression is oppression, whether the oppressor is Muslim or not. Muslims are called to be at the forefront of justice in their communities — with wisdom, courage, and sincerity.',
  quran_connection = $quran$"O you who believe, stand firm for justice as witnesses for Allah, even if it is against yourselves, your parents, or your relatives."

(Surah An-Nisa 4:135)

Hilf al-Fudul embodied this spirit decades before revelation — standing with the wronged even when the wrongdoer was powerful.$quran$,
  quran_reference = 'Surah An-Nisa 4:135',
  hadith_connection = $hadith$The Messenger of Allah ﷺ said:

"I witnessed in the house of Abdullah ibn Jud'an a treaty that, were I asked to uphold it even in Islam, I would do so. And I would not be willing to give up my place for a lot of red camels."

He also said they agreed that rights would be returned to those who deserved them, and that no oppressor would have the upper hand over the oppressed.$hadith$,
  hadith_reference = 'Sahih al-Bukhari',
  think_about_it = ARRAY[
    'Why do you think many Quraysh leaders hesitated to help the merchant at first?',
    'What does it mean that Muhammad ﷺ was among the youngest witnesses?',
    'How can Muslims stand for justice in their schools and communities today?',
    'Why did the Prophet ﷺ praise this pact even after Islam came?'
  ],
  activity = $activity$Today's Mission

Choose one:

• Stand up for someone who is being treated unfairly — with kindness and courage.
• Return something that belongs to someone else.
• Tell the truth when others might stay silent.

Then write: Justice means standing with those who are wronged.

Reward: +10 Stars

MashaAllah! You learned about Hilf al-Fudul. Today you discovered that standing with the oppressed is beloved to Allah.$activity$,
  take_action = NULL,
  activity_cards = '[
    {
      "id": "hilf-al-fudul-timeline",
      "type": "timeline",
      "title": "Timeline of Hilf al-Fudul",
      "emoji": "🤝",
      "intro": "Put these events in order:",
      "age_groups": ["discoverer"],
      "steps": [
        {"title": "A Yemeni merchant sells goods to al-As ibn Wa''il."},
        {"title": "Al-As keeps delaying payment after Hajj."},
        {"title": "The merchant recites a poem near the Ka''bah."},
        {"title": "Al-Zubayr ibn Abdul-Muttalib calls the leaders to meet."},
        {"title": "Quraysh agree to stand with the oppressed."},
        {"title": "Leaders mark the pact with perfumed handprints."},
        {"title": "Muhammad ﷺ witnesses the treaty at about age twenty."},
        {"title": "Years later, the Prophet ﷺ praises Hilf al-Fudul in Islam."}
      ]
    }
  ]'::jsonb,
  reflection_question = 'When have you seen someone stand up for a person who was treated unfairly? What can you learn from that?',
  fun_facts = '[
    {"emoji": "🤝", "fact": "Hilf al-Fudul is also called Hilf al-Mutayyabin because the leaders marked the pact with perfumed handprints near the Ka''bah."},
    {"emoji": "🐪", "fact": "The Prophet ﷺ said he would not give up his place in this pact even for a lot of red camels — one of the most valuable things in Arabia."},
    {"emoji": "📜", "fact": "Muhammad ﷺ was about twenty years old when he witnessed Hilf al-Fudul — likely the youngest person at the gathering."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Hilf al-Fudul", "definition": "The Pact of Virtue — a treaty to defend the oppressed against the oppressor in pre-Islamic Makkah."},
    {"word": "Hilf al-Mutayyabin", "definition": "The Pact of Those Who Perfumed Themselves — another name for the same treaty."},
    {"word": "Al-As ibn Wa''il", "definition": "A wealthy Qurayshi chieftain who delayed paying the Yemeni merchant."},
    {"word": "Al-Zubayr ibn Abdul-Muttalib", "definition": "An uncle of Muhammad ﷺ who called the gathering that formed the pact."},
    {"word": "Abdullah ibn Jud''an", "definition": "The host whose house in Makkah was where Quraysh leaders agreed to the treaty."},
    {"word": "Banu Zubayd", "definition": "The Yemeni tribe the wronged merchant belonged to."},
    {"word": "Al-Amīn", "definition": "The Trustworthy — the nickname Makkah gave Muhammad ﷺ before prophethood."},
    {"word": "Jahiliyyah", "definition": "The time before Islam in Arabia — often called the Age of Ignorance."},
    {"word": "Oppressed", "definition": "Someone who is treated unfairly and denied their rights."},
    {"word": "Adl (Justice)", "definition": "Justice — giving everyone their due rights."}
  ]'::jsonb
WHERE slug IN ('hilf-al-fudul', 'history-seerah-hilf-al-fudul');

-- Quiz (Explorer: 5 · Discoverer: 10 · Thinker: 15 — 70% pass · 25 stars)
DO $$
DECLARE
  v_article_id uuid;
  v_quiz_id uuid := '88888888-8888-8888-8888-888888888912';
  v_has_legacy boolean;
BEGIN
  SELECT id INTO v_article_id FROM public.articles WHERE slug = 'hilf-al-fudul';

  IF v_article_id IS NULL THEN
    RAISE EXCEPTION 'Article hilf-al-fudul not found. Run apply_seerah_25_lesson_curriculum.sql first.';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'quizzes' AND column_name = 'question_en'
  ) INTO v_has_legacy;

  IF EXISTS (SELECT 1 FROM public.quizzes WHERE article_id = v_article_id) THEN
    SELECT id INTO v_quiz_id FROM public.quizzes WHERE article_id = v_article_id LIMIT 1;
    UPDATE public.quizzes
    SET
      title = 'Hilf al-Fudul — Quiz',
      passing_score = 70,
      randomize_questions = true,
      randomize_answers = true,
      show_explanations = true,
      allow_retries = true,
      stars_awarded = 25
    WHERE id = v_quiz_id;
  ELSIF EXISTS (SELECT 1 FROM public.quizzes WHERE id = v_quiz_id) THEN
    UPDATE public.quizzes
    SET
      article_id = v_article_id,
      title = 'Hilf al-Fudul — Quiz',
      passing_score = 70,
      randomize_questions = true,
      randomize_answers = true,
      show_explanations = true,
      allow_retries = true,
      stars_awarded = 25
    WHERE id = v_quiz_id;
  ELSIF v_has_legacy THEN
    INSERT INTO public.quizzes (
      id, article_id, question_en, option_a_en, option_b_en, option_c_en, option_d_en, correct_answer,
      title, passing_score, randomize_questions, randomize_answers, show_explanations, allow_retries, stars_awarded
    ) VALUES (
      v_quiz_id, v_article_id,
      'What was Hilf al-Fudul?',
      'A battle', 'A pact to help the oppressed', 'A trade route', 'A new idol',
      'B',
      'Hilf al-Fudul — Quiz', 70, true, true, true, true, 25
    );
  ELSE
    INSERT INTO public.quizzes (
      id, article_id, title, passing_score,
      randomize_questions, randomize_answers, show_explanations, allow_retries, stars_awarded
    ) VALUES (
      v_quiz_id, v_article_id, 'Hilf al-Fudul — Quiz', 70,
      true, true, true, true, 25
    );
  END IF;

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id AND age_group = 'explorer';

  INSERT INTO public.quiz_questions (id, quiz_id, question_text, options, explanation, sort_order, age_group, question_type, difficulty) VALUES
  ('88888888-8888-8888-8888-888888888c01', v_quiz_id, 'What was Hilf al-Fudul?',
   '[{"text": "A battle between tribes", "is_correct": false}, {"text": "A pact to stand with the oppressed", "is_correct": true}, {"text": "A new idol in Makkah", "is_correct": false}, {"text": "A Hajj ritual", "is_correct": false}]'::jsonb,
   'It was a treaty to defend those who were wronged.', 1, 'explorer', 'multiple_choice', 'easy'),
  ('88888888-8888-8888-8888-888888888c02', v_quiz_id, 'Who cheated the merchant from Yemen?',
   '[{"text": "Abu Talib", "is_correct": false}, {"text": "Al-As ibn Wa''il", "is_correct": true}, {"text": "Abdul-Muttalib", "is_correct": false}, {"text": "Abu Bakr", "is_correct": false}]'::jsonb,
   'Al-As ibn Wa''il kept delaying payment after buying the merchant''s goods.', 2, 'explorer', 'multiple_choice', 'easy'),
  ('88888888-8888-8888-8888-888888888c03', v_quiz_id, 'Where did the leaders meet to make the pact?',
   '[{"text": "Cave Hira", "is_correct": false}, {"text": "House of Abdullah ibn Jud''an", "is_correct": true}, {"text": "Ta''if", "is_correct": false}, {"text": "Madinah", "is_correct": false}]'::jsonb,
   'The senior members of Quraysh gathered at his house.', 3, 'explorer', 'multiple_choice', 'easy'),
  ('88888888-8888-8888-8888-888888888c04', v_quiz_id, 'True or False: Muhammad ﷺ was present when Hilf al-Fudul was made.',
   '[{"text": "True", "is_correct": true}, {"text": "False", "is_correct": false}]'::jsonb,
   'He witnessed the pact in his early twenties.', 4, 'explorer', 'true_false', 'easy'),
  ('88888888-8888-8888-8888-888888888c05', v_quiz_id, 'What did the Prophet ﷺ say about this pact after Islam?',
   '[{"text": "He rejected it completely.", "is_correct": false}, {"text": "He would still uphold it for justice.", "is_correct": true}, {"text": "He forgot about it.", "is_correct": false}, {"text": "He said it was only for pagans.", "is_correct": false}]'::jsonb,
   'He praised it in Sahih al-Bukhari and said he would uphold it even in Islam.', 5, 'explorer', 'multiple_choice', 'easy');

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id AND age_group = 'discoverer';

  INSERT INTO public.quiz_questions (id, quiz_id, question_text, options, explanation, sort_order, age_group, question_type, difficulty) VALUES
  ('88888888-8888-8888-8888-888888888c11', v_quiz_id, 'Why is it also called Hilf al-Mutayyabin?',
   '[{"text": "They fought with swords", "is_correct": false}, {"text": "They marked the pact with perfumed handprints on the Ka''bah", "is_correct": true}, {"text": "They wore white clothes", "is_correct": false}, {"text": "They prayed all night", "is_correct": false}]'::jsonb,
   'Leaders dipped their hands in perfume and placed marks near the Ka''bah.', 1, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c12', v_quiz_id, 'Why did many Quraysh leaders refuse to help the merchant at first?',
   '[{"text": "They did not understand Arabic", "is_correct": false}, {"text": "Al-As was wealthy and powerful", "is_correct": true}, {"text": "The merchant had no goods", "is_correct": false}, {"text": "It was Ramadan", "is_correct": false}]'::jsonb,
   'Many made excuses because al-As was an influential elite.', 2, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c13', v_quiz_id, 'Who called the gathering that led to Hilf al-Fudul?',
   '[{"text": "Al-Zubayr ibn Abdul-Muttalib", "is_correct": true}, {"text": "Abu Lahab", "is_correct": false}, {"text": "Khadijah", "is_correct": false}, {"text": "Abraha", "is_correct": false}]'::jsonb,
   'He was an uncle of Muhammad ﷺ from Banu Hashim.', 3, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c14', v_quiz_id, 'What principle did the pact establish?',
   '[{"text": "Tribes should only help their own members", "is_correct": false}, {"text": "Support the oppressed against the oppressor", "is_correct": true}, {"text": "Wealthy people always win disputes", "is_correct": false}, {"text": "Merchants should not trade in Makkah", "is_correct": false}]'::jsonb,
   'Justice was placed above tribal loyalty.', 4, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c15', v_quiz_id, 'How did the merchant make his case public?',
   '[{"text": "He wrote a letter to Rome", "is_correct": false}, {"text": "He recited a poem near the Ka''bah", "is_correct": true}, {"text": "He left Makkah forever", "is_correct": false}, {"text": "He destroyed the Ka''bah", "is_correct": false}]'::jsonb,
   'Public poetry was a common way to call for justice.', 5, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c16', v_quiz_id, 'Approximately how old was Muhammad ﷺ at Hilf al-Fudul?',
   '[{"text": "About 10", "is_correct": false}, {"text": "About 20", "is_correct": true}, {"text": "About 40", "is_correct": false}, {"text": "About 60", "is_correct": false}]'::jsonb,
   'He was in his early twenties and among the youngest present.', 6, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c17', v_quiz_id, 'In which hadith collection is the Prophet''s ﷺ praise of the pact found?',
   '[{"text": "Sahih al-Bukhari", "is_correct": true}, {"text": "It is not authentic", "is_correct": false}, {"text": "Only in poetry books", "is_correct": false}, {"text": "Sunan al-Nasa''i only", "is_correct": false}]'::jsonb,
   'The Prophet''s testimony is narrated in Sahih al-Bukhari.', 7, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c18', v_quiz_id, 'What does "fuduli" mean in the name Hilf al-Fudul?',
   '[{"text": "Sacred", "is_correct": false}, {"text": "None of their business (al-As''s complaint)", "is_correct": true}, {"text": "Perfumed", "is_correct": false}, {"text": "Warrior", "is_correct": false}]'::jsonb,
   'Al-As complained they got involved in something not their business.', 8, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c19', v_quiz_id, 'Where was the merchant from?',
   '[{"text": "Yemen (Banu Zubayd)", "is_correct": true}, {"text": "Madinah", "is_correct": false}, {"text": "Egypt", "is_correct": false}, {"text": "Persia", "is_correct": false}]'::jsonb,
   'He was from the tribe of Zubayd in Yemen.', 9, 'discoverer', 'multiple_choice', 'medium'),
  ('88888888-8888-8888-8888-888888888c1a', v_quiz_id, 'What is one lesson Muslims learn from Hilf al-Fudul?',
   '[{"text": "Only help Muslims", "is_correct": false}, {"text": "Stand for justice even when it is difficult", "is_correct": true}, {"text": "Avoid all involvement in society", "is_correct": false}, {"text": "Wealth determines who is right", "is_correct": false}]'::jsonb,
   'The Prophet ﷺ upheld justice regardless of religion.', 10, 'discoverer', 'multiple_choice', 'medium');

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id AND age_group = 'thinker';

  INSERT INTO public.quiz_questions (id, quiz_id, question_text, options, explanation, sort_order, age_group, question_type, difficulty) VALUES
  ('88888888-8888-8888-8888-888888888c21', v_quiz_id, 'Why is the Prophet''s ﷺ "red camels" statement significant?',
   '[{"text": "He valued the pact more than great wealth", "is_correct": true}, {"text": "He wanted to buy camels", "is_correct": false}, {"text": "Camels were forbidden", "is_correct": false}, {"text": "It was a joke", "is_correct": false}]'::jsonb,
   'He would not trade his place in the just pact for immense riches.', 1, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c22', v_quiz_id, 'How does Hilf al-Fudul relate to Surah An-Nisa 4:135?',
   '[{"text": "They contradict each other", "is_correct": false}, {"text": "Both call for standing firm for justice", "is_correct": true}, {"text": "The surah rejects such pacts", "is_correct": false}, {"text": "The surah is unrelated", "is_correct": false}]'::jsonb,
   'The Qur''an commands justice even against personal interest.', 2, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c23', v_quiz_id, 'What does the Prophet''s youth at the pact suggest?',
   '[{"text": "He was ignored", "is_correct": false}, {"text": "Quraysh already recognized his moral leadership", "is_correct": true}, {"text": "He was forced to attend", "is_correct": false}, {"text": "Only elders could witness treaties", "is_correct": false}]'::jsonb,
   'His inclusion at ~20 shows early trust in his integrity.', 3, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c24', v_quiz_id, 'Why might scholars cite Hilf al-Fudul for Muslim civic engagement?',
   '[{"text": "Muslims should only engage in religious debates", "is_correct": false}, {"text": "Justice causes transcend purely religious labels", "is_correct": true}, {"text": "Pre-Islamic pacts are binding law today", "is_correct": false}, {"text": "Muslims should avoid non-Muslim society", "is_correct": false}]'::jsonb,
   'The Prophet ﷺ endorsed standing against oppression broadly.', 4, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c25', v_quiz_id, 'What structural problem did the merchant face in Makkah?',
   '[{"text": "No tribal backup and elite impunity", "is_correct": true}, {"text": "He spoke no Arabic", "is_correct": false}, {"text": "Hajj was cancelled", "is_correct": false}, {"text": "The Ka''bah was closed", "is_correct": false}]'::jsonb,
   'His people were in Yemen; al-As''s power discouraged intervention.', 5, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c26', v_quiz_id, 'What did the pact promise about oppressors?',
   '[{"text": "They would always win", "is_correct": false}, {"text": "They would not have the upper hand over the oppressed", "is_correct": true}, {"text": "They would be ignored", "is_correct": false}, {"text": "They would lead Quraysh", "is_correct": false}]'::jsonb,
   'The Prophet ﷺ said rights would return to those who deserved them.', 6, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c27', v_quiz_id, 'Why is public poetry mentioned in the Seerah?',
   '[{"text": "It was entertainment only", "is_correct": false}, {"text": "It was a way to call society to account", "is_correct": true}, {"text": "It replaced written law", "is_correct": false}, {"text": "It was forbidden", "is_correct": false}]'::jsonb,
   'The merchant used poetry to make injustice visible.', 7, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c28', v_quiz_id, 'What does Hilf al-Fudul show about Jahiliyyah Makkah?',
   '[{"text": "There was no goodness at all", "is_correct": false}, {"text": "Some virtues of justice still existed", "is_correct": true}, {"text": "Everyone was equal", "is_correct": false}, {"text": "Trade was forbidden", "is_correct": false}]'::jsonb,
   'Allah sent the Prophet ﷺ to revive virtues still present in society.', 8, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c29', v_quiz_id, 'How does this episode connect to later prophetic credibility?',
   '[{"text": "It has no connection", "is_correct": false}, {"text": "He was known for justice before preaching Islam", "is_correct": true}, {"text": "It made people hate him", "is_correct": false}, {"text": "It was secret", "is_correct": false}]'::jsonb,
   'Quraysh could not say he ignored society''s problems.', 9, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c2a', v_quiz_id, 'Which value did Hilf al-Fudul prioritize over tribal loyalty?',
   '[{"text": "Wealth", "is_correct": false}, {"text": "Justice for the wronged", "is_correct": true}, {"text": "Poetry", "is_correct": false}, {"text": "Silence", "is_correct": false}]'::jsonb,
   'The pact sided with the oppressed even against powerful Quraysh.', 10, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c2b', v_quiz_id, 'When did the pact occur according to the Seerah?',
   '[{"text": "During a sacred month (Dhu al-Qa''dah)", "is_correct": true}, {"text": "During Ramadan after Islam", "is_correct": false}, {"text": "After the Hijrah", "is_correct": false}, {"text": "During the Year of the Elephant", "is_correct": false}]'::jsonb,
   'It took place in Dhu al-Qa''dah in Makkah.', 11, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c2c', v_quiz_id, 'Who was al-As ibn Wa''il in relation to later Islamic history?',
   '[{"text": "Father of Amr ibn al-As", "is_correct": true}, {"text": "Father of Ali", "is_correct": false}, {"text": "First Muslim", "is_correct": false}, {"text": "King of Yemen", "is_correct": false}]'::jsonb,
   'Al-As was a Qurayshi elite and father of the companion Amr ibn al-As.', 12, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c2d', v_quiz_id, 'What is the best summary of the Prophet''s ﷺ later stance?',
   '[{"text": "Reject all pre-Islamic customs", "is_correct": false}, {"text": "Uphold justice wherever it appears", "is_correct": true}, {"text": "Only support Muslim causes", "is_correct": false}, {"text": "Avoid public life", "is_correct": false}]'::jsonb,
   'He would uphold the just pact even in the Islamic era.', 13, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c2e', v_quiz_id, 'Why might the Prophet''s involvement matter for da''wah strategy?',
   '[{"text": "He avoided society until prophethood", "is_correct": false}, {"text": "Societal trust built before the Message was proclaimed", "is_correct": true}, {"text": "He only debated theologians", "is_correct": false}, {"text": "Justice harms da''wah", "is_correct": false}]'::jsonb,
   'People knew him as someone who stood for justice.', 14, 'thinker', 'multiple_choice', 'hard'),
  ('88888888-8888-8888-8888-888888888c2f', v_quiz_id, 'Which lesson applies to Muslims in non-Muslim societies today?',
   '[{"text": "Withdraw from all civic life", "is_correct": false}, {"text": "Engage in justice alongside sincere faith", "is_correct": true}, {"text": "Only speak about theology", "is_correct": false}, {"text": "Ignore oppression outside the ummah", "is_correct": false}]'::jsonb,
   'The Prophet ﷺ modelled active membership in society for justice.', 15, 'thinker', 'multiple_choice', 'hard');
END $$;

DO $$
DECLARE
  v_collection_id uuid;
  v_path_id uuid;
  v_article_id uuid;
BEGIN
  SELECT id INTO v_collection_id FROM public.content_collections WHERE slug = 'life-of-prophet-muhammad';
  SELECT id INTO v_path_id FROM public.adventure_paths
  WHERE slug = 'ancient-egypt' OR public_slug = 'history-civilization' LIMIT 1;
  SELECT id INTO v_article_id FROM public.articles WHERE slug = 'hilf-al-fudul';

  IF v_collection_id IS NOT NULL AND v_article_id IS NOT NULL THEN
    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, 8, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = 8;
  END IF;

  IF v_path_id IS NOT NULL AND v_article_id IS NOT NULL THEN
    INSERT INTO public.path_articles (adventure_path_id, article_id, sort_order)
    VALUES (v_path_id, v_article_id, 8)
    ON CONFLICT (adventure_path_id, article_id) DO UPDATE SET sort_order = 8;
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- Verification (should show published=true, fun_facts=3, quiz_questions=30)
-- ---------------------------------------------------------------------------
SELECT
  a.slug,
  a.title,
  a.published,
  jsonb_array_length(COALESCE(a.fun_facts, '[]'::jsonb)) AS fun_facts_count,
  jsonb_array_length(COALESCE(a.vocabulary, '[]'::jsonb)) AS vocabulary_count,
  jsonb_array_length(COALESCE(a.activity_cards, '[]'::jsonb)) AS activity_cards_count,
  (SELECT count(*) FROM public.quiz_questions qq JOIN public.quizzes q ON q.id = qq.quiz_id WHERE q.article_id = a.id) AS quiz_question_count
FROM public.articles a
WHERE a.slug = 'hilf-al-fudul';

NOTIFY pgrst, 'reload schema';
