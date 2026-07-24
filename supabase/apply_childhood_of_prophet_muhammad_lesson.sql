-- Explorer + Discoverer + Thinker lesson: The Childhood of Prophet Muhammad ﷺ
-- SUPERSEDED: Split into lessons 2–6 in apply_seerah_early_life_lessons.sql
-- This file is kept for reference; run apply_seerah_25_lesson_curriculum.sql to archive it.
-- Collection: The Life of Prophet Muhammad ﷺ (life-of-prophet-muhammad)
-- Path: History & Civilization (ancient-egypt / history-civilization)
-- Run in Supabase → SQL Editor (after apply_history_path_collections_seed.sql)

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

-- Honor per-quiz stars_awarded when awarding quiz pass points
CREATE OR REPLACE FUNCTION public.record_quiz_attempt(
  p_child_id uuid,
  p_quiz_id uuid,
  p_score_percentage numeric,
  p_answers jsonb DEFAULT NULL
)
RETURNS public.quiz_attempts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_attempt_num integer;
  v_passed boolean;
  v_article_id uuid;
  v_row public.quiz_attempts;
  v_path_id uuid;
  v_ap public.article_progress;
  v_passing_score integer;
  v_stars_awarded integer;
  v_already_passed boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF NOT public.parent_owns_child(p_child_id) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  SELECT article_id, passing_score, stars_awarded
  INTO v_article_id, v_passing_score, v_stars_awarded
  FROM public.quizzes
  WHERE id = p_quiz_id;

  IF v_article_id IS NULL THEN
    RAISE EXCEPTION 'Quiz not found';
  END IF;
  IF NOT public.can_access_article(auth.uid(), v_article_id) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  PERFORM public.assert_rate_limit('quiz_attempt', 40, 3600);

  SELECT COALESCE(quiz_passed, false) INTO v_already_passed
  FROM public.article_progress
  WHERE child_profile_id = p_child_id AND article_id = v_article_id;

  SELECT COALESCE(MAX(attempt_number), 0) + 1 INTO v_attempt_num
  FROM public.quiz_attempts
  WHERE child_profile_id = p_child_id AND quiz_id = p_quiz_id;

  v_passed := p_score_percentage >= COALESCE(v_passing_score, 70);

  INSERT INTO public.quiz_attempts (
    child_profile_id, quiz_id, score_percentage, passed, attempt_number, answers
  )
  VALUES (p_child_id, p_quiz_id, p_score_percentage, v_passed, v_attempt_num, p_answers)
  RETURNING * INTO v_row;

  IF v_passed THEN
    INSERT INTO public.article_progress (child_profile_id, article_id, quiz_passed, updated_at)
    VALUES (p_child_id, v_article_id, true, now())
    ON CONFLICT (child_profile_id, article_id) DO UPDATE SET
      quiz_passed = true,
      updated_at = now()
    RETURNING * INTO v_ap;

    IF NOT v_already_passed THEN
      PERFORM public.award_points(
        p_child_id,
        COALESCE(v_stars_awarded, 25),
        'quiz_pass',
        'quiz',
        p_quiz_id
      );

      UPDATE public.child_profiles
      SET total_quizzes_completed = total_quizzes_completed + 1
      WHERE id = p_child_id;
    END IF;

    UPDATE public.article_progress
    SET completed_at = COALESCE(completed_at, now()), updated_at = now()
    WHERE child_profile_id = p_child_id AND article_id = v_article_id
      AND read_completed = true AND quiz_passed = true AND completed_at IS NULL;

    FOR v_path_id IN
      SELECT adventure_path_id FROM public.path_articles WHERE article_id = v_article_id
    LOOP
      PERFORM public.recalculate_path_progress(p_child_id, v_path_id);
    END LOOP;
  END IF;

  RETURN v_row;
END;
$$;

-- Explorer + Discoverer + Thinker lesson (updates seeded stub history-seerah-childhood)
UPDATE public.articles
SET
  title = 'The Childhood of Prophet Muhammad ﷺ',
  slug = 'childhood-of-prophet-muhammad',
  excerpt = 'In the blessed city of Makkah, Allah watched over baby Muhammad ﷺ — through the desert with Halimah, through loss, and through the love of those who cared for him.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 18,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/childhood-of-prophet-muhammad.png',
  usul_theme = 'revelation',
  content_explorer = $article$A Baby Chosen by Allah

Long ago, in the blessed city of Makkah, a very special baby was born. His name was Muhammad ﷺ.

He was born into the respected tribe of Quraysh, the tribe that cared for the Ka'bah. Allah had a special plan for him, even before anyone knew what that plan would be.

Before He Was Born

Muhammad's father was named Abdullah.

Before baby Muhammad ﷺ was born, his father passed away.

This meant Muhammad ﷺ entered the world without a father.

Even though he had no father, Allah watched over him every step of the way.

Life with Halimah

When Muhammad ﷺ was still a little baby, he went to live for a few years with a kind woman named Halimah and her family in the desert.

At that time, many families in Makkah sent their babies to live in the fresh desert air, where children learned beautiful Arabic and grew up healthy and strong.

Before Halimah took Muhammad ﷺ, her family was very poor. Their animals had little milk, and life was difficult.

But after baby Muhammad ﷺ joined their family, Allah placed many blessings in their home.

Their animals became healthier.
They had more milk.
They had more food.

Everyone noticed that something wonderful had changed.

Allah was blessing the family caring for His future Prophet ﷺ.

Losing His Mother

When Muhammad ﷺ was six years old, his mother, Aminah, took him on a journey to visit his father's family.

On the way home, she became very sick and passed away.

Muhammad ﷺ became an orphan.

Losing his mother was very sad, but Allah never stopped caring for him.

His Grandfather's Love

After his mother's death, Muhammad ﷺ lived with his grandfather, Abdul-Muttalib.

His grandfather loved him dearly. He cared for him, protected him, and treated him with great kindness.

His Uncle Protected Him

A few years later, Abdul-Muttalib also passed away.

Muhammad ﷺ then went to live with his kind uncle, Abu Talib.

Abu Talib looked after him like one of his own children and protected him for many years.

Allah continued to provide loving people to care for Muhammad ﷺ throughout his childhood.

A Boy Everyone Trusted

As Muhammad ﷺ grew older, people noticed something very special about him.

He always told the truth.
He never cheated.
He never broke his promises.
He treated people fairly and kindly.

Because everyone trusted him, the people of Makkah gave him a special nickname:

Al-Amīn — The Trustworthy.

One day, this honest young man would receive the greatest responsibility ever given to a human being.
$article$,
  content_discoverer = $discoverer$Learning Goals

By the end of this lesson, you will be able to:

• Describe the early childhood of Prophet Muhammad ﷺ.
• Explain how Allah protected and prepared him from a young age.
• Identify the important people who cared for him.
• Understand how Allah's wisdom can be found even during difficult times.
• Recognize the qualities of patience, trust in Allah, and compassion that shaped the Prophet ﷺ.

A Childhood Planned by Allah

Every prophet chosen by Allah had a unique journey. Before Prophet Muhammad ﷺ received revelation, Allah carefully prepared him through many experiences during his childhood.

Although he faced hardships that many children never experience, every event in his life was part of Allah's perfect plan.

Each challenge helped him grow into a compassionate, patient, honest, and trustworthy person who would one day guide all of humanity.

His childhood reminds us that even when life is difficult, Allah is always caring for us in ways we may not yet understand.

Born in the Year of the Elephant

Prophet Muhammad ﷺ was born in the blessed city of Makkah during the famous Year of the Elephant.

The Arabs at that time did not use numbered calendars like we do today. Instead, they remembered years by important events.

The Year of the Elephant was named after Abraha's failed attempt to destroy the Ka'bah, when Allah protected His Sacred House.

Before Muhammad ﷺ was born, his father, Abdullah ibn Abdul-Muttalib, passed away.

This meant Muhammad ﷺ entered the world already an orphan from his father's side.

Although this was a great sadness, Allah was already protecting His future Messenger.

His Mother: Aminah

His mother was Aminah bint Wahb.

She loved her son deeply and cared for him with great affection.

Like many noble families in Makkah, she followed the custom of sending her baby to live with a Bedouin family in the desert.

Children who grew up in the desert benefited from:

• Cleaner and healthier air.
• Strong physical development.
• Pure and beautiful Arabic.
• Independence and resilience.

Allah had already chosen a special family to care for Muhammad ﷺ.

Halimah As-Sa'diyyah

Muhammad ﷺ was placed in the care of Halimah bint Abi Dhu'ayb from the tribe of Banu Sa'd.

At first, Halimah hoped to care for a baby whose family could offer generous gifts. Since Muhammad ﷺ was an orphan, she expected very little support and was hesitant to choose him.

Before returning home without a child, she decided to care for Muhammad ﷺ anyway.

That decision brought incredible blessings.

By Allah's permission:

• Her riding animal became stronger.
• Her family's animals produced more milk.
• Their home became filled with greater ease and provision.

Everyone around Halimah noticed these blessings.

Allah was honoring the family that cared for His final Prophet ﷺ.

The Opening of the Chest

While Muhammad ﷺ was still living with Halimah, something extraordinary happened.

One day, Angel Jibril (عليه السلام) came by Allah's command and opened the young Prophet's chest.

Allah purified his heart and prepared him for the great mission he would receive later in life.

When Halimah learned what had happened, she became frightened and worried for Muhammad ﷺ.

She decided it would be safest to return him to his mother in Makkah.

This remarkable event showed that Allah was preparing His Messenger long before revelation began.

Returning to His Mother

After spending several years in the desert, Muhammad ﷺ returned to live with his mother, Aminah.

She was overjoyed to have her son home again.

Not long afterward, she took him on a journey to Yathrib (later called Madinah) to visit relatives from his father's family.

During this journey, Muhammad ﷺ also visited the place where his father had been buried.

Losing His Mother

On the journey back to Makkah, Aminah became seriously ill.

She passed away at a place called Al-Abwa'.

Muhammad ﷺ was only about six years old.

He had now lost both his father and his mother.

Imagine how difficult this must have been for such a young child.

Yet Allah never abandoned him.

His Grandfather's Love

After Aminah passed away, Muhammad ﷺ was cared for by his grandfather, Abdul-Muttalib.

Abdul-Muttalib was one of the most respected leaders of Quraysh.

He loved his grandson dearly and showed him great affection.

Muhammad ﷺ often sat beside him near the Ka'bah, where the leaders of Makkah gathered.

Everyone noticed the special bond between grandfather and grandson.

His Uncle Abu Talib

When Muhammad ﷺ was about eight years old, his grandfather also passed away.

Once again, Allah provided someone to care for him.

His uncle, Abu Talib, became his guardian.

Although Abu Talib was not wealthy, he loved Muhammad ﷺ like one of his own children.

He protected him, cared for him, and remained by his side for many years.

Allah continued to provide loving people to protect His Messenger throughout his childhood.

Allah Was Preparing His Messenger

Some people might think Muhammad ﷺ had an unhappy childhood because he lost many family members.

But Allah's wisdom is always perfect.

Growing up as an orphan helped Muhammad ﷺ understand the feelings of people who were lonely, poor, or in need.

He learned compassion.

He learned patience.

He learned humility.

He learned to place his trust completely in Allah.

These experiences helped prepare him to become a Prophet who would care deeply for every person he met.

Allah reminds us of this blessing in the Qur'an:

"Did He not find you an orphan and give you shelter?"

(Surah Ad-Duha 93:6)

Allah protected Prophet Muhammad ﷺ during every stage of his childhood.

Key Takeaways

• Prophet Muhammad ﷺ was born during the Year of the Elephant.
• His father passed away before he was born.
• He spent his early childhood with Halimah in the desert.
• Allah blessed Halimah's family after she cared for him.
• Angel Jibril (عليه السلام) purified the Prophet's heart while he was young.
• His mother Aminah passed away when he was about six years old.
• His grandfather Abdul-Muttalib cared for him until he passed away.
• His uncle Abu Talib became his guardian.
• Allah protected and prepared Prophet Muhammad ﷺ throughout his childhood.
• Every experience in his early life was part of Allah's perfect wisdom and preparation for prophethood.
$discoverer$,
  content_thinker = $thinker$Learning Goals

By the end of this lesson, you will be able to:

• Analyze how Allah prepared Prophet Muhammad ﷺ long before revelation.
• Explain the wisdom behind the major events of his childhood.
• Examine how hardship shaped the Prophet's character and leadership.
• Connect the Prophet's early life to Qur'anic teachings about trust in Allah.
• Reflect on how Allah's plans often become clear only in hindsight.

Preparation Before Prophethood

When many people study the Seerah, they begin with the first revelation in the Cave of Hira.

But Allah's preparation of Prophet Muhammad ﷺ began decades before Jibril (عليه السلام) first descended with revelation.

Every stage of his childhood was carefully planned by Allah.

His orphanhood.

His years in the desert.

The people who cared for him.

The hardships he experienced.

None of these events happened by chance.

Allah was preparing the heart, character, and mindset of the man who would become the final Messenger to humanity.

The Seerah teaches us that Allah often prepares His servants long before they understand His purpose.

Born During the Year of the Elephant

Muhammad ﷺ was born during the famous Year of the Elephant, the year in which Allah protected the Ka'bah from Abraha's invading army.

The Arabs did not number their years as we do today. Instead, they remembered history through important events.

The Year of the Elephant became one of the greatest turning points in the history of Arabia because it demonstrated that Allah Himself protected His Sacred House.

Muhammad ﷺ was born into the noble tribe of Quraysh, the tribe entrusted with serving the Ka'bah.

Yet before he was even born, his father, Abdullah ibn Abdul-Muttalib, passed away.

From the very beginning of his life, Allah decreed that His final Messenger would grow up without a father.

Life with Halimah

Like many noble families in Makkah, Aminah sent her young son to live among the Bedouins.

This tradition provided children with:

• healthier surroundings,
• stronger physical development,
• eloquent Arabic,
• resilience,
• and independence.

Allah chose Halimah bint Abi Dhu'ayb from the tribe of Banu Sa'd to become Muhammad's foster mother.

At first, Halimah hesitated to take him.

Because Muhammad ﷺ was an orphan, she expected his family would not be able to offer the gifts that foster families usually received.

Before leaving Makkah empty-handed, she accepted him anyway.

That decision changed her family's life.

By Allah's permission:

• their animals produced more milk,
• their provisions increased,
• their journeys became easier,
• and blessings filled their household.

These blessings did not come from the infant Muhammad ﷺ himself.

Rather, Allah honored the family who cared for His beloved Prophet.

This reminds us that every blessing comes from Allah alone.

The Opening of the Chest

While Muhammad ﷺ was still living with Halimah, one of the most extraordinary events of his childhood took place.

Angel Jibril (عليه السلام) came by Allah's command and opened the young Prophet's chest.

His heart was purified before being returned to him.

Scholars explain that this was one of the earliest signs that Allah was preparing Muhammad ﷺ for the immense responsibility of prophethood.

Halimah became frightened after learning what had happened and returned him to his mother in Makkah.

Long before revelation began, Allah had already started preparing His Messenger.

The Wisdom of Orphanhood

After returning to Makkah, Muhammad ﷺ spent only a short time with his mother.

When he was about six years old, Aminah passed away during their return journey from Yathrib.

He then came under the care of his grandfather, Abdul-Muttalib, and after his grandfather's death two years later, his uncle Abu Talib became his guardian.

To many people, this sequence of losses appears heartbreaking.

But the Qur'an teaches us to look beyond appearances.

Allah says:

"Did He not find you an orphan and give you shelter?"

(Surah Ad-Duha 93:6)

Allah did not ask why the Prophet ﷺ became an orphan.

Instead, He reminded him that He never abandoned him.

Growing up without parents taught Muhammad ﷺ lessons that no ordinary childhood could have taught.

He understood grief.

He understood loneliness.

He understood dependence upon Allah.

He understood the struggles of vulnerable people.

This is one reason why caring for orphans became one of the great moral teachings of Islam.

Allah's Method of Building Leaders

One of the remarkable patterns found throughout the Qur'an is that Allah often prepares His greatest servants through hardship before giving them responsibility.

Prophet Yusuf (عليه السلام) experienced betrayal and imprisonment before becoming a leader.

Prophet Musa (عليه السلام) grew up away from his biological family before confronting Pharaoh.

Likewise, Prophet Muhammad ﷺ experienced orphanhood, loss, and dependence upon Allah before receiving revelation.

The Seerah teaches us that leadership is not built through comfort.

It is built through faith, patience, humility, and trust in Allah.

Divine Preparation

Nothing in the Prophet's childhood was accidental.

Every experience served a purpose.

His orphanhood nurtured compassion.

His years in the desert strengthened his language and resilience.

The blessings surrounding Halimah reminded people that Allah had chosen this child for something extraordinary.

The purification of his heart prepared him spiritually.

The love shown by Abdul-Muttalib and Abu Talib demonstrated that Allah always provides the means to protect His servants.

Only years later would the wisdom behind these events become fully clear.

This is one of the greatest lessons of the Seerah:

Allah's plan often becomes understandable only after we have lived through it.

Key Takeaways

• Allah began preparing Prophet Muhammad ﷺ decades before revelation.
• His orphanhood was part of Allah's wisdom, not a sign of abandonment.
• Halimah's family experienced blessings because Allah honored the child in their care.
• The Opening of the Chest was an early sign of Allah preparing His Messenger.
• Abdul-Muttalib and Abu Talib were among the means Allah used to protect him.
• Hardship helped shape the Prophet ﷺ into a compassionate, humble, and trustworthy leader.
• The Seerah teaches us that Allah's wisdom often becomes clear only after events have unfolded.
$thinker$,
  islamic_teaching = $teaching$From the Prophet's childhood we learn:

• Allah prepares His servants long before they understand His purpose.
• Hardship can be part of Allah's wisdom, not a sign of abandonment.
• Leadership is built through faith, patience, humility, and trust in Allah.
• Caring for orphans is beloved to Allah.
• Every blessing ultimately comes from Allah alone.
• Allah's plan often becomes clear only in hindsight.$teaching$,
  islamic_reflection = $reflection$Key takeaways from this lesson:

• Allah began preparing Prophet Muhammad ﷺ decades before revelation.
• His orphanhood was part of Allah's wisdom, not a sign of abandonment.
• Halimah's family experienced blessings because Allah honored the child in their care.
• The Opening of the Chest was an early sign of Allah preparing His Messenger.
• Abdul-Muttalib and Abu Talib were among the means Allah used to protect him.
• Hardship helped shape the Prophet ﷺ into a compassionate, humble, and trustworthy leader.
• The Seerah teaches us that Allah's wisdom often becomes clear only after events have unfolded.$reflection$,
  quran_connection = $quran$"Did He not find you an orphan and give you shelter?"

(Surah Ad-Duha 93:6)

This verse is not simply a reminder of the Prophet's past. It is evidence that Allah's care is constant, even when life appears uncertain.$quran$,
  quran_reference = 'Surah Ad-Duha 93:6',
  hadith_connection = $hadith$The Prophet ﷺ said:

"I and the one who cares for an orphan will be like this in Paradise," and he held his index and middle fingers close together.

Because the Prophet ﷺ experienced orphanhood himself, he encouraged Muslims to care for orphaned children with love and kindness.$hadith$,
  hadith_reference = 'Sahih al-Bukhari',
  think_about_it = ARRAY[
    'Why do you think Allah chose orphanhood as part of the Prophet''s preparation?',
    'How might growing up without wealth or privilege have strengthened his leadership?',
    'Why is hardship often a better teacher than comfort?',
    'Can you think of a challenge in your own life that later helped you become stronger?'
  ],
  activity = $activity$Today's Mission

Practice being Al-Amīn today!

• Tell the truth, even if it is difficult.
• Keep a promise you made.
• Return something that belongs to someone else.
• Help someone without expecting a reward.

Reward: +10 Stars

MashaAllah! You learned about the birth of Prophet Muhammad ﷺ. Today you discovered that being honest and trustworthy are qualities loved by Allah.$activity$,
  take_action = $takeaction$Today's Mission

Choose one challenge:

• Read the translation and tafsir of Surah Ad-Duha.
• Support an organization that cares for orphans.
• Write about a difficult experience that helped you grow closer to Allah.
• Perform an act of kindness for someone who may be struggling.
• Thank Allah for the people He has placed in your life to guide and support you.

Reward: +10 Stars

MashaAllah! You explored the childhood of Prophet Muhammad ﷺ in depth. Today you discovered that Allah's wisdom often becomes clear only after we have lived through His plan.$takeaction$,
  reflection_question = 'Why do you think Allah chose orphanhood as part of the Prophet''s preparation?',
  fun_facts = '[
    {"emoji": "📖", "fact": "The Opening of the Chest was one of the earliest signs that Allah was preparing Muhammad ﷺ for prophethood — long before revelation in Cave Hira."},
    {"emoji": "👨‍👩‍👧", "fact": "The Prophet ﷺ spent time living with four different caregivers during his childhood: his mother Aminah, his foster mother Halimah, his grandfather Abdul-Muttalib, and his uncle Abu Talib."},
    {"emoji": "🐘", "fact": "He was born during the Year of the Elephant — named after Abraha''s failed attempt to destroy the Ka''bah."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Year of the Elephant", "definition": "The year named after Abraha''s failed attack on the Ka''bah — when Prophet Muhammad ﷺ was born."},
    {"word": "Halimah As-Sa''diyyah", "definition": "The foster mother from Banu Sa''d who cared for Muhammad ﷺ in the desert."},
    {"word": "Banu Sa''d", "definition": "The Bedouin tribe Halimah belonged to."},
    {"word": "Yathrib", "definition": "The city later known as Madinah, which Aminah visited on her journey."},
    {"word": "Al-Abwa''", "definition": "The place where Aminah passed away during the return journey to Makkah."},
    {"word": "Opening of the Chest", "definition": "The event when Angel Jibril purified the young Prophet''s heart by Allah''s command."},
    {"word": "Makkah", "definition": "The blessed city where Prophet Muhammad ﷺ was born."},
    {"word": "Orphan", "definition": "A child whose mother or father has passed away."},
    {"word": "Al-Amīn", "definition": "The Trustworthy — a special nickname given to Prophet Muhammad ﷺ."},
    {"word": "Aminah bint Wahb", "definition": "The beloved mother of Prophet Muhammad ﷺ."},
    {"word": "Abdul-Muttalib", "definition": "The Prophet''s grandfather who lovingly cared for him after Aminah''s death."},
    {"word": "Abu Talib", "definition": "The Prophet''s uncle who became his guardian and protected him for many years."}
  ]'::jsonb
WHERE slug IN ('history-seerah-childhood', 'childhood-of-prophet-muhammad', 'birth-of-prophet-muhammad');

-- Quiz (Explorer: 5 · Discoverer: 10 · Thinker: 15 · 70% pass · 10 stars)
DO $$
DECLARE
  v_quiz_id uuid := '88888888-8888-8888-8888-888888888903';
  v_article_id uuid;
  v_has_legacy boolean;
BEGIN
  SELECT id INTO v_article_id
  FROM public.articles
  WHERE slug = 'childhood-of-prophet-muhammad';

  IF v_article_id IS NULL THEN
    SELECT id INTO v_article_id
    FROM public.articles
    WHERE slug IN ('birth-of-prophet-muhammad', 'history-seerah-childhood')
    LIMIT 1;
  END IF;

  IF v_article_id IS NULL THEN
    RAISE EXCEPTION 'Article childhood-of-prophet-muhammad not found. Run apply_history_path_collections_seed.sql first.';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'quizzes' AND column_name = 'question_en'
  ) INTO v_has_legacy;

  IF EXISTS (SELECT 1 FROM public.quizzes WHERE article_id = v_article_id) THEN
    SELECT id INTO v_quiz_id FROM public.quizzes WHERE article_id = v_article_id LIMIT 1;
    UPDATE public.quizzes
    SET
      title = 'The Childhood of Prophet Muhammad ﷺ — Quiz',
      passing_score = 70,
      randomize_questions = true,
      randomize_answers = true,
      show_explanations = true,
      allow_retries = true,
      stars_awarded = 10
    WHERE id = v_quiz_id;
  ELSIF EXISTS (SELECT 1 FROM public.quizzes WHERE id = v_quiz_id) THEN
    UPDATE public.quizzes
    SET
      article_id = v_article_id,
      title = 'The Childhood of Prophet Muhammad ﷺ — Quiz',
      passing_score = 70,
      randomize_questions = true,
      randomize_answers = true,
      show_explanations = true,
      allow_retries = true,
      stars_awarded = 10
    WHERE id = v_quiz_id;
  ELSIF v_has_legacy THEN
    INSERT INTO public.quizzes (
      id, article_id, question_en, option_a_en, option_b_en, option_c_en, option_d_en, correct_answer,
      title, passing_score, randomize_questions, randomize_answers, show_explanations, allow_retries, stars_awarded
    ) VALUES (
      v_quiz_id, v_article_id,
      'Where was Prophet Muhammad ﷺ born?',
      'Madinah', 'Makkah', 'Jerusalem', 'Cairo',
      'B',
      'The Childhood of Prophet Muhammad ﷺ — Quiz', 70, true, true, true, true, 10
    );
  ELSE
    INSERT INTO public.quizzes (
      id, article_id, title, passing_score,
      randomize_questions, randomize_answers, show_explanations, allow_retries, stars_awarded
    ) VALUES (
      v_quiz_id, v_article_id, 'The Childhood of Prophet Muhammad ﷺ — Quiz', 70,
      true, true, true, true, 10
    );
  END IF;

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id AND age_group = 'explorer';

  INSERT INTO public.quiz_questions (
    id, quiz_id, question_text, options, explanation, sort_order, age_group, question_type, difficulty
  ) VALUES
  (
    '88888888-8888-8888-8888-888888888931',
    v_quiz_id,
    'Where was Prophet Muhammad ﷺ born?',
    '[{"text": "Madinah", "is_correct": false}, {"text": "Makkah", "is_correct": true}, {"text": "Jerusalem", "is_correct": false}, {"text": "Cairo", "is_correct": false}]'::jsonb,
    'Prophet Muhammad ﷺ was born in Makkah.',
    1, 'explorer', 'multiple_choice', 'easy'
  ),
  (
    '88888888-8888-8888-8888-888888888932',
    v_quiz_id,
    'What special nickname did people give Prophet Muhammad ﷺ?',
    '[{"text": "The Brave", "is_correct": false}, {"text": "The Wise", "is_correct": false}, {"text": "Al-Amīn", "is_correct": true}, {"text": "The King", "is_correct": false}]'::jsonb,
    'Al-Amīn means The Trustworthy.',
    2, 'explorer', 'multiple_choice', 'easy'
  ),
  (
    '88888888-8888-8888-8888-888888888933',
    v_quiz_id,
    'Who looked after Prophet Muhammad ﷺ when he was a baby in the desert?',
    '[{"text": "Khadijah", "is_correct": false}, {"text": "Aisha", "is_correct": false}, {"text": "Halimah", "is_correct": true}, {"text": "Fatimah", "is_correct": false}]'::jsonb,
    'Halimah cared for Muhammad ﷺ during his early childhood.',
    3, 'explorer', 'multiple_choice', 'easy'
  ),
  (
    '88888888-8888-8888-8888-888888888934',
    v_quiz_id,
    'True or False: Allah always cared for Prophet Muhammad ﷺ.',
    '[{"text": "True", "is_correct": true}, {"text": "False", "is_correct": false}]'::jsonb,
    'Even through difficult times, Allah always protected and guided him.',
    4, 'explorer', 'true_false', 'easy'
  ),
  (
    '88888888-8888-8888-8888-888888888935',
    v_quiz_id,
    'What happened to Muhammad''s ﷺ father before he was born?',
    '[{"text": "He travelled to Madinah.", "is_correct": false}, {"text": "He passed away.", "is_correct": true}, {"text": "He became a merchant.", "is_correct": false}, {"text": "He moved to the desert.", "is_correct": false}]'::jsonb,
    'Abdullah passed away before baby Muhammad ﷺ was born, but Allah watched over him.',
    5, 'explorer', 'multiple_choice', 'easy'
  );

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id AND age_group = 'discoverer';

  INSERT INTO public.quiz_questions (
    id, quiz_id, question_text, options, explanation, sort_order, age_group, question_type, difficulty
  ) VALUES
  (
    '88888888-8888-8888-8888-888888888941',
    v_quiz_id,
    'Why is the year of the Prophet''s birth called the "Year of the Elephant"?',
    '[{"text": "An elephant lived in Makkah.", "is_correct": false}, {"text": "It was named after an important event involving an army with elephants.", "is_correct": true}, {"text": "People worshipped elephants.", "is_correct": false}, {"text": "Elephants lived around the Ka''bah.", "is_correct": false}]'::jsonb,
    'Arabs often named years after major events. The failed attack on the Ka''bah by Abraha''s army made this year memorable.',
    1, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888942',
    v_quiz_id,
    'What was the name of the Prophet''s mother?',
    '[{"text": "Khadijah", "is_correct": false}, {"text": "Fatimah", "is_correct": false}, {"text": "Aminah bint Wahb", "is_correct": true}, {"text": "Halimah", "is_correct": false}]'::jsonb,
    'Aminah was the beloved mother of Prophet Muhammad ﷺ.',
    2, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888943',
    v_quiz_id,
    'Who became the Prophet''s foster mother?',
    '[{"text": "Safiyyah", "is_correct": false}, {"text": "Halimah bint Abi Dhu''ayb", "is_correct": true}, {"text": "Asma''", "is_correct": false}, {"text": "Sumayyah", "is_correct": false}]'::jsonb,
    'Halimah from the tribe of Banu Sa''d cared for him during his early childhood.',
    3, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888944',
    v_quiz_id,
    'Why were babies often raised in the desert?',
    '[{"text": "To learn hunting.", "is_correct": false}, {"text": "For healthier living conditions and pure Arabic.", "is_correct": true}, {"text": "To become traders.", "is_correct": false}, {"text": "To avoid school.", "is_correct": false}]'::jsonb,
    'Desert life was healthier and helped children develop strong language and character.',
    4, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888945',
    v_quiz_id,
    'How old was the Prophet ﷺ when his mother passed away?',
    '[{"text": "About 3", "is_correct": false}, {"text": "About 6", "is_correct": true}, {"text": "About 10", "is_correct": false}, {"text": "About 12", "is_correct": false}]'::jsonb,
    'Aminah passed away during the return journey from Yathrib.',
    5, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888946',
    v_quiz_id,
    'Who cared for him after his mother''s death?',
    '[{"text": "Abu Bakr", "is_correct": false}, {"text": "Abdul-Muttalib", "is_correct": true}, {"text": "Umar", "is_correct": false}, {"text": "Uthman", "is_correct": false}]'::jsonb,
    'His grandfather lovingly cared for him until his own death.',
    6, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888947',
    v_quiz_id,
    'Who became his guardian after Abdul-Muttalib passed away?',
    '[{"text": "Abu Talib", "is_correct": true}, {"text": "Hamzah", "is_correct": false}, {"text": "Abbas", "is_correct": false}, {"text": "Abu Lahab", "is_correct": false}]'::jsonb,
    'Abu Talib raised and protected his nephew for many years.',
    7, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888948',
    v_quiz_id,
    'What remarkable event happened while Muhammad ﷺ was living with Halimah?',
    '[{"text": "Angel Jibril purified his heart.", "is_correct": true}, {"text": "He became king of Makkah.", "is_correct": false}, {"text": "He built the Ka''bah.", "is_correct": false}, {"text": "He travelled to Madinah alone.", "is_correct": false}]'::jsonb,
    'Allah commanded Angel Jibril to purify the young Prophet''s heart — a sign of divine preparation.',
    8, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-888888888949',
    v_quiz_id,
    'Which surah reminds the Prophet ﷺ that Allah cared for him as an orphan?',
    '[{"text": "Al-Fatihah", "is_correct": false}, {"text": "Al-Kawthar", "is_correct": false}, {"text": "Ad-Duha", "is_correct": true}, {"text": "Al-Falaq", "is_correct": false}]'::jsonb,
    'Surah Ad-Duha reminds the Prophet ﷺ of Allah''s constant care and blessings.',
    9, 'discoverer', 'multiple_choice', 'medium'
  ),
  (
    '88888888-8888-8888-8888-88888888894a',
    v_quiz_id,
    'What is one important lesson from the Prophet''s childhood?',
    '[{"text": "Hardships can strengthen our faith and character.", "is_correct": true}, {"text": "Wealth is the most important blessing.", "is_correct": false}, {"text": "Only adults can be patient.", "is_correct": false}, {"text": "Leaders never experience difficulties.", "is_correct": false}]'::jsonb,
    'Allah used every stage of the Prophet''s childhood to prepare him for his mission and teach us that patience and trust in Allah lead to goodness.',
    10, 'discoverer', 'multiple_choice', 'medium'
  );

  DELETE FROM public.quiz_questions WHERE quiz_id = v_quiz_id AND age_group = 'thinker';

  INSERT INTO public.quiz_questions (
    id, quiz_id, question_text, options, explanation, sort_order, age_group, question_type, difficulty
  ) VALUES
  (
    '88888888-8888-8888-8888-888888888951',
    v_quiz_id,
    'Why is the Prophet''s birth associated with the Year of the Elephant?',
    '[{"text": "Because elephants lived in Makkah.", "is_correct": false}, {"text": "Because Arabs named years after major historical events.", "is_correct": true}, {"text": "Because the Ka''bah contained elephant statues.", "is_correct": false}, {"text": "Because the Prophet rode an elephant.", "is_correct": false}]'::jsonb,
    'Arabs remembered years by significant events, and Allah''s protection of the Ka''bah made this year unforgettable.',
    1, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888952',
    v_quiz_id,
    'What was one purpose of sending children to live with Bedouin families?',
    '[{"text": "Military training.", "is_correct": false}, {"text": "Learning pure Arabic and developing strength.", "is_correct": true}, {"text": "Preparing for trade.", "is_correct": false}, {"text": "Avoiding taxes.", "is_correct": false}]'::jsonb,
    'The desert environment promoted health, eloquent language, and independence.',
    2, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888953',
    v_quiz_id,
    'Why did Halimah initially hesitate to take Muhammad ﷺ?',
    '[{"text": "She feared travelling.", "is_correct": false}, {"text": "He was an orphan and unlikely to bring financial support.", "is_correct": true}, {"text": "She already had many children.", "is_correct": false}, {"text": "She did not know his family.", "is_correct": false}]'::jsonb,
    'Foster families were normally compensated by wealthy families.',
    3, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888954',
    v_quiz_id,
    'What changed after Muhammad ﷺ entered Halimah''s household?',
    '[{"text": "Their home became larger.", "is_correct": false}, {"text": "Allah blessed their provisions and animals.", "is_correct": true}, {"text": "They moved to Makkah.", "is_correct": false}, {"text": "They became tribal leaders.", "is_correct": false}]'::jsonb,
    'These blessings came from Allah as an honour for His future Messenger.',
    4, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888955',
    v_quiz_id,
    'Where did Aminah pass away?',
    '[{"text": "Mina.", "is_correct": false}, {"text": "Al-Abwa''.", "is_correct": true}, {"text": "Ta''if.", "is_correct": false}, {"text": "Badr.", "is_correct": false}]'::jsonb,
    'She passed away while returning from Yathrib.',
    5, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888956',
    v_quiz_id,
    'Approximately how old was Muhammad ﷺ when his mother died?',
    '[{"text": "Four.", "is_correct": false}, {"text": "Six.", "is_correct": true}, {"text": "Eight.", "is_correct": false}, {"text": "Ten.", "is_correct": false}]'::jsonb,
    'He was still a young child.',
    6, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888957',
    v_quiz_id,
    'Who became his guardian after Aminah''s death?',
    '[{"text": "Abu Talib.", "is_correct": false}, {"text": "Abdul-Muttalib.", "is_correct": true}, {"text": "Hamzah.", "is_correct": false}, {"text": "Abbas.", "is_correct": false}]'::jsonb,
    'His grandfather cared for him until his own death.',
    7, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888958',
    v_quiz_id,
    'Who became responsible for him after Abdul-Muttalib?',
    '[{"text": "Abu Talib.", "is_correct": true}, {"text": "Abu Bakr.", "is_correct": false}, {"text": "Umar.", "is_correct": false}, {"text": "Uthman.", "is_correct": false}]'::jsonb,
    'Abu Talib lovingly protected his nephew for many years.',
    8, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-888888888959',
    v_quiz_id,
    'What took place during the Opening of the Chest?',
    '[{"text": "Angel Jibril purified the young Prophet''s heart.", "is_correct": true}, {"text": "Muhammad ﷺ became king of Makkah.", "is_correct": false}, {"text": "He memorized the entire Qur''an.", "is_correct": false}, {"text": "He travelled to Egypt.", "is_correct": false}]'::jsonb,
    'Scholars explain this was an early sign of Allah preparing His Messenger for prophethood.',
    9, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-88888888895a',
    v_quiz_id,
    'What pattern do we see in how Allah prepares great prophets?',
    '[{"text": "They are given wealth and comfort first.", "is_correct": false}, {"text": "They are often prepared through hardship before responsibility.", "is_correct": true}, {"text": "They never face loss.", "is_correct": false}, {"text": "They avoid all difficulty.", "is_correct": false}]'::jsonb,
    'Like Yusuf and Musa (peace be upon them), Muhammad ﷺ was prepared through trials before prophethood.',
    10, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-88888888895b',
    v_quiz_id,
    'Which surah contains the verse, "Did He not find you an orphan and give you shelter?"',
    '[{"text": "Al-Fatihah.", "is_correct": false}, {"text": "Ad-Duha.", "is_correct": true}, {"text": "Al-Ikhlas.", "is_correct": false}, {"text": "Al-Asr.", "is_correct": false}]'::jsonb,
    'Surah Ad-Duha reminds the Prophet ﷺ of Allah''s continuous care.',
    11, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-88888888895c',
    v_quiz_id,
    'What major lesson does the Prophet''s childhood teach about hardship?',
    '[{"text": "Hardship means Allah is displeased.", "is_correct": false}, {"text": "Hardship can be part of Allah''s preparation for greater responsibilities.", "is_correct": true}, {"text": "Hardship should always be avoided.", "is_correct": false}, {"text": "Only prophets face hardship.", "is_correct": false}]'::jsonb,
    'Allah often prepares His servants through life''s challenges.',
    12, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-88888888895d',
    v_quiz_id,
    'Why did the Prophet ﷺ develop special compassion for orphans?',
    '[{"text": "Because he studied orphan care.", "is_correct": false}, {"text": "Because he experienced orphanhood himself.", "is_correct": true}, {"text": "Because Quraysh required it.", "is_correct": false}, {"text": "Because shepherds cared for orphans.", "is_correct": false}]'::jsonb,
    'His personal experiences shaped his mercy.',
    13, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-88888888895e',
    v_quiz_id,
    'Which statement best summarizes Allah''s plan for the Prophet''s childhood?',
    '[{"text": "It was a series of random events.", "is_correct": false}, {"text": "Every stage prepared him for prophethood.", "is_correct": true}, {"text": "It delayed his mission.", "is_correct": false}, {"text": "It separated him from society.", "is_correct": false}]'::jsonb,
    'Allah''s wisdom was present in every stage of his upbringing.',
    14, 'thinker', 'multiple_choice', 'hard'
  ),
  (
    '88888888-8888-8888-8888-88888888895f',
    v_quiz_id,
    'Which lesson is most relevant for Muslims today?',
    '[{"text": "Success depends only on wealth.", "is_correct": false}, {"text": "Trust Allah''s wisdom, even when life is difficult.", "is_correct": true}, {"text": "Hardship should be hidden.", "is_correct": false}, {"text": "Leadership comes naturally without preparation.", "is_correct": false}]'::jsonb,
    'The Prophet''s childhood reminds believers that Allah''s plan is always wiser than what we can immediately see.',
    15, 'thinker', 'multiple_choice', 'hard'
  );
END $$;

-- Collection link (Life of Prophet Muhammad ﷺ, lesson 2) + path link
DO $$
DECLARE
  v_collection_id uuid;
  v_path_id uuid;
  v_article_id uuid;
BEGIN
  SELECT id INTO v_collection_id
  FROM public.content_collections
  WHERE slug = 'life-of-prophet-muhammad';

  SELECT id INTO v_path_id
  FROM public.adventure_paths
  WHERE slug = 'ancient-egypt' OR public_slug = 'history-civilization'
  LIMIT 1;

  SELECT id INTO v_article_id
  FROM public.articles
  WHERE slug = 'childhood-of-prophet-muhammad';

  IF v_article_id IS NULL THEN
    SELECT id INTO v_article_id
    FROM public.articles
    WHERE slug IN ('birth-of-prophet-muhammad', 'history-seerah-childhood')
    LIMIT 1;
  END IF;

  IF v_collection_id IS NOT NULL AND v_article_id IS NOT NULL THEN
    INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
    VALUES (v_collection_id, v_article_id, 2, 'lesson')
    ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = 2, item_type = 'lesson';

    WITH lesson_order(slug, sort_order) AS (
      VALUES
        ('history-seerah-the-year-of-the-elephant', 1),
        ('childhood-of-prophet-muhammad', 2),
        ('birth-of-prophet-muhammad', 2),
        ('the-first-revelation', 3),
        ('history-seerah-before-islam', 4),
        ('history-seerah-the-secret-call', 5),
        ('history-seerah-the-public-call', 6),
        ('history-seerah-the-boycott', 7),
        ('history-seerah-isra-mi-raj', 8),
        ('history-seerah-the-hijrah', 9),
        ('history-seerah-madinah', 10),
        ('history-seerah-battle-of-badr', 11),
        ('history-seerah-battle-of-uhud', 12),
        ('history-seerah-battle-of-the-trench', 13),
        ('history-seerah-treaty-of-hudaybiyyah', 14),
        ('history-seerah-conquest-of-makkah', 15),
        ('history-seerah-farewell-pilgrimage', 16),
        ('history-seerah-final-sermon', 17)
    )
    UPDATE public.collection_items ci
    SET sort_order = lo.sort_order
    FROM lesson_order lo
    JOIN public.articles a ON a.slug = lo.slug
    WHERE ci.collection_id = v_collection_id
      AND ci.article_id = a.id;
  END IF;

  IF v_path_id IS NOT NULL AND v_article_id IS NOT NULL THEN
    INSERT INTO public.path_articles (adventure_path_id, article_id, sort_order)
    VALUES (v_path_id, v_article_id, 2)
    ON CONFLICT (adventure_path_id, article_id) DO UPDATE SET sort_order = 2;
  END IF;
END $$;

NOTIFY pgrst, 'reload schema';
