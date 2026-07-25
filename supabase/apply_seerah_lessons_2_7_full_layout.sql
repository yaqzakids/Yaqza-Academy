-- Full lesson layout patch for Seerah lessons 2–7
-- Adds: Did You Know, Word Explorer, Faith & Reflection, Take Action, Parent Discussion
-- Run in Supabase → SQL Editor after apply_seerah_early_life_lessons.sql and apply_shepherding_lesson.sql
-- Safe to re-run.

ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS usul_theme text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS quran_connection text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS quran_reference text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hadith_connection text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS hadith_reference text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS islamic_teaching text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS islamic_reflection text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS think_about_it text[];
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS take_action text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS reflection_question text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS activity text;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS fun_facts jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS vocabulary jsonb DEFAULT '[]'::jsonb;

-- ── Lesson 2: Birth ──────────────────────────────────────────────────────────
UPDATE public.articles
SET
  quran_connection = $quran$Did He not find you an orphan and give you shelter?

(Surah Ad-Duha 93:6)

Allah reminds the Prophet ﷺ that He cared for him from the very beginning — even before he could remember.$quran$,
  quran_reference = 'Surah Ad-Duha 93:6',
  hadith_connection = $hadith$The Prophet ﷺ said: "I am the supplication of my father Ibrahim, the glad tidings of Isa, and my mother saw a light when she gave birth to me — by that light she could see the palaces of Syria."$hadith$,
  hadith_reference = 'Reported in authentic Seerah narrations',
  islamic_teaching = 'Allah chose the time, place, and family for the birth of His final Messenger. Even when Muhammad ﷺ had no father, Allah was already protecting him. Every hardship in the Prophet''s early life was part of Allah''s perfect plan.',
  islamic_reflection = 'When we face loss or difficulty, we can remember that Allah cared for His Messenger ﷺ from birth. Trusting Allah does not mean life will be easy — it means Allah never abandons those who turn to Him.',
  think_about_it = ARRAY[
    'Why do you think Allah chose the Year of the Elephant for the Prophet''s ﷺ birth?',
    'How might growing up without a father help someone understand others who are lonely?',
    'What does Surah Ad-Duha teach us about Allah''s care?',
    'How can you trust Allah when something in your life feels hard?'
  ],
  activity = $activity$Today's Mission

Draw a simple picture of Makkah with the Ka'bah in the centre.

Then write one sentence: Allah cared for baby Muhammad ﷺ.

Bonus Challenge: Ask a parent to tell you about the Year of the Elephant!$activity$,
  take_action = NULL,
  reflection_question = 'How does knowing Allah cared for baby Muhammad ﷺ help you trust Allah when life feels difficult?',
  fun_facts = '[
    {"emoji": "📅", "fact": "Arabs remembered years by big events — not numbers. The year Muhammad ﷺ was born is called the Year of the Elephant."},
    {"emoji": "🕋", "fact": "He was born in Makkah, the city of the Ka''bah — the first house built for the worship of Allah alone."},
    {"emoji": "💫", "fact": "His father Abdullah passed away before he was born, so Allah became his greatest Protector from day one."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Makkah", "definition": "The blessed city where the Ka''bah stands and where Prophet Muhammad ﷺ was born."},
    {"word": "Quraysh", "definition": "The noble tribe entrusted with serving the Ka''bah."},
    {"word": "Year of the Elephant", "definition": "The year Allah protected the Ka''bah from Abraha''s army — and the year the Prophet ﷺ was born."},
    {"word": "Aminah", "definition": "The mother of Prophet Muhammad ﷺ, who loved and cared for him deeply."},
    {"word": "Orphan", "definition": "A child who has lost one or both parents — Allah promises special care for orphans."}
  ]'::jsonb
WHERE slug = 'birth-of-prophet-muhammad';

-- ── Lesson 3: Halimah ────────────────────────────────────────────────────────
UPDATE public.articles
SET
  quran_connection = $quran$Did He not find you an orphan and give you shelter?

(Surah Ad-Duha 93:6)

Halimah opened her home to an orphan child — and Allah filled her home with blessings she never expected.$quran$,
  quran_reference = 'Surah Ad-Duha 93:6',
  hadith_connection = $hadith$The foster mother of the Prophet ﷺ, Halimah, reported that after she took him, her animals produced more milk, her family had more provision, and her journeys became easier — blessings everyone around her noticed.$hadith$,
  hadith_reference = 'Seerah narrations',
  islamic_teaching = 'When Halimah cared for Muhammad ﷺ even though she expected little reward, Allah honoured her family with blessings. Kindness to those in need — especially orphans — is never wasted with Allah.',
  islamic_reflection = 'Blessings come from Allah alone, not from people or wealth. A family can be poor one day and blessed the next when Allah wills — and caring for others is one of the paths Allah loves.',
  think_about_it = ARRAY[
    'Why did Halimah hesitate at first — and what made her accept Muhammad ﷺ anyway?',
    'Why did desert families send babies to live with Bedouin foster mothers?',
    'How did Allah bless Halimah''s family after she cared for the Prophet ﷺ?',
    'When have you seen kindness lead to unexpected good?'
  ],
  activity = $activity$Today's Mission

Draw Halimah''s family in the desert with their animals.

Then write: Caring for others brings blessings from Allah.

Bonus Challenge: Do one kind act for someone who needs help today!$activity$,
  take_action = NULL,
  reflection_question = 'When have you seen Allah bless someone who helped others in need?',
  fun_facts = '[
    {"emoji": "🏜️", "fact": "Makkan families sent babies to the desert so they could breathe fresh air, learn pure Arabic, and grow strong."},
    {"emoji": "🐑", "fact": "Before Muhammad ﷺ joined them, Halimah''s animals had little milk. After he came, her flock became the healthiest in the tribe."},
    {"emoji": "🤲", "fact": "Halimah almost left Makkah without a foster child — then she chose Muhammad ﷺ, the orphan, and that choice changed her life."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Halimah", "definition": "The Bedouin foster mother who cared for young Muhammad ﷺ in the desert."},
    {"word": "Banu Sa''d", "definition": "The tribe Halimah belonged to — known for eloquent Arabic."},
    {"word": "Foster care", "definition": "When a child lives with another family who cares for them — a custom in pre-Islamic Arabia."},
    {"word": "Bedouin", "definition": "Arab nomads who lived in the desert, known for strong character and pure language."},
    {"word": "Provision", "definition": "Food, shelter, and blessings Allah provides for His creation."}
  ]'::jsonb
WHERE slug = 'life-with-halimah';

-- ── Lesson 4: Opening of the Chest ───────────────────────────────────────────
UPDATE public.articles
SET
  quran_connection = $quran$Indeed, We have granted you abundant goodness.

(Surah Al-Kawthar 108:1)

Long before revelation began, Allah was already preparing His Messenger ﷺ for the greatest mission in human history.$quran$,
  quran_reference = 'Surah Al-Kawthar 108:1',
  hadith_connection = $hadith$Angel Jibril (عليه السلام) came by Allah''s command and purified the young Prophet''s heart while he was still with Halimah in the desert — preparing him for the weight of prophethood that would come decades later.$hadith$,
  hadith_reference = 'Seerah narrations',
  islamic_teaching = 'Allah does not choose His messengers randomly. He prepares them — spiritually, morally, and in character — long before they receive revelation. The Opening of the Chest was one of the earliest signs that Muhammad ﷺ was no ordinary child.',
  islamic_reflection = 'Sometimes Allah prepares us for something we cannot yet see. Trusting Allah''s plan means believing He is shaping us even when we do not understand why certain events happen.',
  think_about_it = ARRAY[
    'Why do you think Allah purified the Prophet''s ﷺ heart while he was still a child?',
    'How is this event different from the chest opening during al-Isra wal-Mi''raj?',
    'Why did Halimah become worried and return him to Makkah?',
    'What does this event teach us about Allah''s preparation?'
  ],
  activity = $activity$Today's Mission

Draw a heart with a gentle light around it.

Bonus Challenge: Memorize "Indeed, We have granted you abundant goodness" (Surah Al-Kawthar 108:1)!$activity$,
  take_action = NULL,
  reflection_question = 'Why do you think Allah prepared the Prophet''s heart so early in his life?',
  fun_facts = '[
    {"emoji": "✨", "fact": "Angel Jibril purified the Prophet''s ﷺ heart while he was still a young child living with Halimah in the desert."},
    {"emoji": "📖", "fact": "This childhood event is different from the chest opening during al-Isra wal-Mi''raj — both are authentic but happened at different times."},
    {"emoji": "🏠", "fact": "After this event, Halimah became worried and returned Muhammad ﷺ to his mother Aminah in Makkah."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Jibril", "definition": "The angel Gabriel (عليه السلام) — Allah''s messenger to the prophets."},
    {"word": "Purification", "definition": "Cleaning the heart from anything that would block goodness and truth."},
    {"word": "Preparation", "definition": "Getting ready for an important responsibility Allah has planned."},
    {"word": "Revelation", "definition": "The message Allah sends to His prophets through angels."},
    {"word": "Al-Isra wal-Mi''raj", "definition": "The Night Journey and Ascension — a later event in the Prophet''s ﷺ life."}
  ]'::jsonb
WHERE slug = 'opening-of-the-chest';

-- ── Lesson 5: Death of Aminah ────────────────────────────────────────────────
UPDATE public.articles
SET
  quran_connection = $quran$Did He not find you an orphan and give you shelter?

(Surah Ad-Duha 93:6)

After losing both his parents, Allah never abandoned Muhammad ﷺ — He provided grandfather, uncle, and community to care for him.$quran$,
  quran_reference = 'Surah Ad-Duha 93:6',
  hadith_connection = $hadith$The Prophet ﷺ later said: "I am the best of the children of Adam, and I say this without pride. I am the best of the children of Adam, and I say this without pride."$hadith$,
  hadith_reference = 'Authentic narrations',
  islamic_teaching = 'Losing someone we love is one of life''s hardest tests. Muhammad ﷺ lost his father before birth and his mother at about six years old. Yet Allah provided loving guardians at every stage — teaching us that grief and divine care can exist together.',
  islamic_reflection = 'The Prophet ﷺ later cared deeply for orphans because he knew their pain firsthand. When we show compassion to those who have lost family, we follow the example of the one who felt that loss himself.',
  think_about_it = ARRAY[
    'How old was Muhammad ﷺ when his mother Aminah passed away?',
    'Who cared for him after Aminah and Abdul-Muttalib?',
    'How might losing his parents have helped the Prophet ﷺ understand others who suffer?',
    'What does Surah Ad-Duha teach about Allah''s care for orphans?'
  ],
  activity = $activity$Today's Mission

Write a kind message or draw a picture for someone who might feel lonely or sad.

Then write: Allah is the best Guardian.

Bonus Challenge: Learn one du''a you can say when you miss someone you love.$activity$,
  take_action = NULL,
  reflection_question = 'How can losing someone we love teach us to be more compassionate toward others?',
  fun_facts = '[
    {"emoji": "🛤️", "fact": "Aminah passed away at a place called Al-Abwa'' on the journey back from visiting family in Yathrib (later Madinah)."},
    {"emoji": "👴", "fact": "After his mother died, Muhammad ﷺ lived with his grandfather Abdul-Muttalib — one of the most respected leaders of Quraysh."},
    {"emoji": "🕋", "fact": "Young Muhammad ﷺ would sit near the Ka''bah with the leaders of Makkah, learning how his people lived and led."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Aminah", "definition": "The mother of Prophet Muhammad ﷺ, who passed away when he was about six."},
    {"word": "Al-Abwa''", "definition": "The place where Aminah passed away on the journey home to Makkah."},
    {"word": "Yathrib", "definition": "The city later known as Madinah — where Aminah visited her relatives."},
    {"word": "Abdul-Muttalib", "definition": "The Prophet''s ﷺ grandfather, a respected leader of Quraysh who loved him dearly."},
    {"word": "Compassion", "definition": "Feeling care for others who are hurting — a quality the Prophet ﷺ learned through his own loss."}
  ]'::jsonb
WHERE slug = 'death-of-aminah';

-- ── Lesson 6: Abu Talib ───────────────────────────────────────────────────────
UPDATE public.articles
SET
  quran_connection = $quran$Indeed, you are of a great moral character.

(Surah Al-Qalam 68:4)

Years before prophethood, the people of Makkah already knew Muhammad ﷺ as Al-Amīn — the Trustworthy.$quran$,
  quran_reference = 'Surah Al-Qalam 68:4',
  hadith_connection = $hadith$The people of Makkah gave Muhammad ﷺ the title Al-Amīn (The Trustworthy) because he always spoke truth, kept promises, and treated people fairly in trade and daily life.$hadith$,
  hadith_reference = 'Seerah narrations',
  islamic_teaching = 'Good character is built day by day — not in one moment. Muhammad ﷺ earned trust through years of honest behaviour. When he later called people to Islam, those who knew him could not honestly call him a liar.',
  islamic_reflection = 'Abu Talib protected the Prophet ﷺ even when he was not wealthy. Family loyalty, integrity, and trustworthiness are among the greatest gifts we can offer one another — and among the qualities Allah loves most.',
  think_about_it = ARRAY[
    'What does Al-Amīn (The Trustworthy) mean — and why did Makkah give Muhammad ﷺ this title?',
    'How did Abu Talib care for his nephew even when he had little wealth?',
    'Why is trust important in friendships, family, and business?',
    'How can you build a reputation for honesty like the Prophet ﷺ did?'
  ],
  activity = $activity$Today's Mission

Keep every promise you make today — even small ones.

Then write: I want to be trustworthy like Al-Amīn.

Bonus Challenge: Ask a family member to share a time when someone''s honesty helped them.$activity$,
  take_action = NULL,
  reflection_question = 'What does it mean to be someone people can truly trust — and how can you build that reputation?',
  fun_facts = '[
    {"emoji": "🤝", "fact": "Al-Amīn means The Trustworthy — a nickname Makkah gave Muhammad ﷺ before he ever claimed prophethood."},
    {"emoji": "👨‍👦", "fact": "Abu Talib raised Muhammad ﷺ like his own son after Abdul-Muttalib passed away."},
    {"emoji": "💼", "fact": "People in Makkah trusted Muhammad ﷺ so much that they later left their valuables with him for safekeeping — even before Islam."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Al-Amīn", "definition": "The Trustworthy — the nickname the people of Makkah gave Muhammad ﷺ."},
    {"word": "Abu Talib", "definition": "The Prophet''s ﷺ uncle who raised and protected him for many years."},
    {"word": "Guardian", "definition": "Someone responsible for caring for and protecting a child."},
    {"word": "Integrity", "definition": "Doing the right thing even when no one is watching."},
    {"word": "Character", "definition": "Who you are on the inside — shown through your words and actions over time."}
  ]'::jsonb
WHERE slug = 'abu-talib-guardian';

-- ── Lesson 7: Shepherding ─────────────────────────────────────────────────────
UPDATE public.articles
SET
  quran_connection = $quran$Did He not find you needy then satisfied your needs?

(Surah Ad-Duha 93:8)

Allah provided for young Muhammad ﷺ through honest work as a shepherd — humble labour that prepared him for the greatest leadership on earth.$quran$,
  quran_reference = 'Surah Ad-Duha 93:8',
  hadith_connection = $hadith$The Prophet ﷺ said: "Allah never sent a prophet except that he was a shepherd."

The companions asked, "Not even you, O Messenger of Allah?"

He replied, "I was. I used to tend the flock of the people of Makkah in return for a small payment."$hadith$,
  hadith_reference = 'Sahih al-Bukhari',
  islamic_teaching = 'Every prophet Allah sent was a shepherd before prophethood — including Musa, Dawud, and Muhammad ﷺ. Shepherding teaches patience, gentleness, courage, and responsibility. There is no shame in honest work with your own hands.',
  islamic_reflection = 'Allah often prepares great people by starting them at the bottom. The future leader of humanity earned a modest wage tending sheep in the valley of Ajyad — learning lessons no palace could teach.',
  think_about_it = ARRAY[
    'Why do you think every prophet was a shepherd before his mission?',
    'What two qualities does a good shepherd need — and how do they help a leader?',
    'What did the Prophet ﷺ say about money earned with your own hands?',
    'How can honest work today prepare you for responsibility tomorrow?'
  ],
  activity = $activity$Today's Mission

List three jobs that require patience and care (like shepherding).

Then write: Honest work is honourable.

Bonus Challenge: Help with a chore at home without being asked — and do it with a smile!$activity$,
  take_action = NULL,
  reflection_question = 'What honest work can you do that helps you grow in patience, responsibility, and trust in Allah?',
  fun_facts = '[
    {"emoji": "🐑", "fact": "Muhammad ﷺ tended sheep in the valley of Ajyad near Makkah — earning a very small wage called qararit."},
    {"emoji": "📜", "fact": "The hadith that every prophet was a shepherd is narrated in Sahih al-Bukhari — one of the most authentic books of hadith."},
    {"emoji": "🌄", "fact": "Time alone in the desert gave the Prophet ﷺ space to reflect on Allah''s creation — long before revelation came in Cave Hira."}
  ]'::jsonb,
  vocabulary = '[
    {"word": "Shepherd", "definition": "Someone who cares for and guides a flock of sheep — a job that teaches leadership."},
    {"word": "Ajyad", "definition": "A valley near Makkah where Muhammad ﷺ tended sheep."},
    {"word": "Qararit", "definition": "A very small payment — the modest wage the Prophet ﷺ earned for shepherding."},
    {"word": "Patience (Sabr)", "definition": "Staying steady and calm through difficulty — a quality shepherds and believers both need."},
    {"word": "Honest labour", "definition": "Work done with your own hands in a halal, truthful way — pure and honourable in Islam."}
  ]'::jsonb
WHERE slug = 'shepherding-in-makkah';

-- Verification
SELECT
  slug,
  jsonb_array_length(COALESCE(fun_facts, '[]'::jsonb)) AS fun_facts,
  jsonb_array_length(COALESCE(vocabulary, '[]'::jsonb)) AS vocabulary,
  (islamic_teaching IS NOT NULL) AS has_teaching,
  COALESCE(array_length(think_about_it, 1), 0) AS think_about_count,
  (activity IS NOT NULL) AS has_activity,
  (reflection_question IS NOT NULL) AS has_parent_discussion
FROM public.articles
WHERE slug IN (
  'birth-of-prophet-muhammad',
  'life-with-halimah',
  'opening-of-the-chest',
  'death-of-aminah',
  'abu-talib-guardian',
  'shepherding-in-makkah'
)
ORDER BY slug;

NOTIFY pgrst, 'reload schema';
