-- Split early-life Seerah lessons (Birth, Halimah, Opening of Chest, Death of Aminah, Abu Talib)
-- Replaces bundled childhood-of-prophet-muhammad lesson (lessons 2–6)
-- Run after apply_seerah_25_lesson_curriculum.sql

-- Remove empty birth stub if legacy childhood article still holds the content
DELETE FROM public.articles stub
WHERE stub.slug = 'birth-of-prophet-muhammad'
  AND stub.published = false
  AND EXISTS (
    SELECT 1 FROM public.articles legacy
    WHERE legacy.slug IN ('childhood-of-prophet-muhammad', 'history-seerah-childhood')
      AND legacy.id <> stub.id
  );

-- ── Lesson 2: Birth ──────────────────────────────────────────────────────────
UPDATE public.articles
SET
  title = 'The Birth of Prophet Muhammad ﷺ',
  slug = 'birth-of-prophet-muhammad',
  excerpt = 'In the blessed city of Makkah, during the Year of the Elephant, Allah brought into the world the baby who would become the final Messenger.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 10,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/birth-of-prophet-muhammad.png',
  usul_theme = 'revelation',
  content_explorer = $article$A Baby Chosen by Allah

Long ago, in the blessed city of Makkah, a very special baby was born. His name was Muhammad ﷺ.

He was born into the respected tribe of Quraysh, the tribe that cared for the Ka'bah. Allah had a special plan for him, even before anyone knew what that plan would be.

The Year of the Elephant

Muhammad ﷺ was born during a year the Arabs called the Year of the Elephant.

That year, an army with elephants had tried to destroy the Ka'bah — but Allah protected His Sacred House.

The Arabs remembered that year because it showed that Allah Himself guards what is holy.

Before He Was Born

Muhammad's father was named Abdullah.

Before baby Muhammad ﷺ was born, his father passed away.

This meant Muhammad ﷺ entered the world without a father.

Even though he had no father, Allah watched over him every step of the way.

His Mother Loved Him

His mother was Aminah. She loved her son deeply and cared for him with great affection.

Allah had chosen this family and this moment for something extraordinary — the birth of the final Prophet to all of humanity.
$article$,
  content_discoverer = $discoverer$Learning Goals

By the end of this lesson, you will be able to:

• Describe when and where Prophet Muhammad ﷺ was born.
• Explain why his birth year is called the Year of the Elephant.
• Understand how Allah protected him from the very beginning.
• Recognize that Allah's plans often begin long before we see them.

Born in the Year of the Elephant

Prophet Muhammad ﷺ was born in the blessed city of Makkah during the famous Year of the Elephant.

The Arabs at that time did not use numbered calendars like we do today. Instead, they remembered years by important events.

The Year of the Elephant was named after Abraha's failed attempt to destroy the Ka'bah, when Allah protected His Sacred House with birds carrying stones of baked clay (Surah Al-Fil).

Before Muhammad ﷺ was born, his father, Abdullah ibn Abdul-Muttalib, passed away.

This meant Muhammad ﷺ entered the world already an orphan from his father's side.

Although this was a great sadness, Allah was already protecting His future Messenger.

His Mother: Aminah

His mother was Aminah bint Wahb from the noble tribe of Banu Zuhrah.

She loved her son deeply and cared for him with great affection.

Muhammad ﷺ was born into the tribe of Quraysh — the tribe entrusted with serving the Ka'bah.

Allah had chosen this family, this city, and this moment for the birth of the final Prophet.

Key Takeaways

• Muhammad ﷺ was born in Makkah during the Year of the Elephant.
• His father Abdullah passed away before he was born.
• His mother Aminah loved and cared for him.
• Allah protected him from the very first moments of his life.
$discoverer$,
  content_thinker = $thinker$Learning Goals

By the end of this lesson, you will be able to:

• Analyze the significance of the Year of the Elephant in Seerah chronology.
• Explain the wisdom behind the Prophet's ﷺ orphanhood from birth.
• Connect the Prophet's birth to Qur'anic themes of divine protection.
• Reflect on how Allah prepares His messengers before revelation begins.

Born During the Year of the Elephant

Muhammad ﷺ was born during the famous Year of the Elephant — the year in which Allah protected the Ka'bah from Abraha's invading army (Surah Al-Fil).

The Arabs did not number their years as we do today. Instead, they remembered history through important events.

The Year of the Elephant became one of the greatest turning points in the history of Arabia because it demonstrated that Allah Himself protects His Sacred House.

Muhammad ﷺ was born into the noble tribe of Quraysh, the tribe entrusted with serving the Ka'bah.

Yet before he was even born, his father, Abdullah ibn Abdul-Muttalib, passed away.

From the very beginning of his life, Allah decreed that His final Messenger would grow up without a father.

The Wisdom of Early Orphanhood

Scholars explain that growing up without a father helped prepare Muhammad ﷺ to understand the pain of orphans and the vulnerable.

Later, when he became a Prophet, he would care deeply for orphans — a mercy shaped by his own experience.

Allah reminds us of this blessing in the Qur'an:

"Did He not find you an orphan and give you shelter?"

(Surah Ad-Duha 93:6)

Even before prophethood, Allah was already caring for His Messenger in ways that would shape his character for decades to come.

Key Takeaways

• The Year of the Elephant marks both a divine miracle and the Prophet's birth year.
• Orphanhood from birth was part of Allah's preparation, not a sign of abandonment.
• Surah Ad-Duha connects the Prophet's early life to Allah's constant care.
• Every detail of his birth was part of a perfect divine plan.
$thinker$,
  quran_connection = 'Did He not find you an orphan and give you shelter?',
  quran_reference = 'Surah Ad-Duha 93:6',
  reflection_question = 'How does knowing Allah cared for baby Muhammad ﷺ help you trust Allah when life feels difficult?',
  updated_at = now()
WHERE slug IN ('birth-of-prophet-muhammad', 'history-seerah-childhood', 'childhood-of-prophet-muhammad');

-- ── Lesson 3: Halimah ────────────────────────────────────────────────────────
UPDATE public.articles
SET
  title = 'Life with Halimah',
  slug = 'life-with-halimah',
  excerpt = 'Baby Muhammad ﷺ went to live with Halimah in the desert — and Allah placed blessings in her home that everyone could see.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 12,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/life-with-halimah.png',
  usul_theme = 'revelation',
  content_explorer = $article$Life in the Desert

When Muhammad ﷺ was still a little baby, he went to live for a few years with a kind woman named Halimah and her family in the desert.

At that time, many families in Makkah sent their babies to live in the fresh desert air. Children learned beautiful Arabic and grew up healthy and strong.

A Family in Need

Before Halimah took Muhammad ﷺ, her family was very poor. Their animals had little milk, and life was difficult.

At first, Halimah was hesitant. Because Muhammad ﷺ was an orphan, she did not expect his family to give the gifts that foster families usually received.

But before leaving Makkah without a child, she decided to care for him anyway.

Blessings in Her Home

After baby Muhammad ﷺ joined their family, Allah placed many blessings in their home.

Their animals became healthier.
They had more milk.
They had more food.

Everyone noticed that something wonderful had changed.

Allah was blessing the family caring for His future Prophet ﷺ.
$article$,
  content_discoverer = $discoverer$Learning Goals

By the end of this lesson, you will be able to:

• Explain why Makkan families sent babies to live in the desert.
• Describe who Halimah was and why she hesitated at first.
• Understand how Allah blessed her family after she cared for Muhammad ﷺ.
• Recognize that blessings come from Allah alone.

The Custom of Desert Foster Care

Like many noble families in Makkah, Aminah sent her young son to live among the Bedouins.

Children who grew up in the desert benefited from cleaner air, strong physical development, pure Arabic, and independence.

Allah had already chosen a special family to care for Muhammad ﷺ.

Halimah As-Sa'diyyah

Muhammad ﷺ was placed in the care of Halimah bint Abi Dhu'ayb from the tribe of Banu Sa'd.

At first, Halimah hoped to care for a baby whose family could offer generous gifts. Since Muhammad ﷺ was an orphan, she expected very little support and was hesitant to choose him.

Before returning home without a child, she accepted him anyway.

That decision brought incredible blessings.

By Allah's permission, her riding animal became stronger, her family's animals produced more milk, and their home became filled with greater ease and provision.

Everyone around Halimah noticed these blessings.

Allah was honoring the family that cared for His final Prophet ﷺ.

Key Takeaways

• Desert foster care helped children develop health, language, and character.
• Halimah hesitated because Muhammad ﷺ was an orphan, but accepted him anyway.
• Allah blessed her household after she cared for him.
• Every blessing comes from Allah alone.
$discoverer$,
  content_thinker = $thinker$Learning Goals

By the end of this lesson, you will be able to:

• Analyze the social and cultural reasons for Bedouin foster care in pre-Islamic Arabia.
• Explain Halimah's initial hesitation and what changed after she accepted Muhammad ﷺ.
• Examine how Allah honored those who cared for His Messenger.
• Reflect on how caring for others can bring unexpected blessings.

Life with Halimah

Like many noble families in Makkah, Aminah sent her young son to live among the Bedouins.

This tradition provided children with healthier surroundings, stronger physical development, eloquent Arabic, resilience, and independence.

Allah chose Halimah bint Abi Dhu'ayb from the tribe of Banu Sa'd to become Muhammad's foster mother.

At first, Halimah hesitated to take him. Because Muhammad ﷺ was an orphan, she expected his family would not be able to offer the gifts that foster families usually received.

Before leaving Makkah empty-handed, she accepted him anyway.

That decision changed her family's life.

By Allah's permission, their animals produced more milk, their provisions increased, their journeys became easier, and blessings filled their household.

These blessings did not come from the infant Muhammad ﷺ himself. Rather, Allah honored the family who cared for His beloved Prophet.

This reminds us that every blessing comes from Allah alone — and that showing kindness to those in need is never wasted.

Key Takeaways

• Bedouin foster care was a deliberate preparation for leadership and eloquence.
• Halimah's acceptance despite financial hesitation shows sincerity over gain.
• Divine blessings followed care for the future Prophet — a sign of his special status.
• Kindness toward the vulnerable is always rewarded by Allah, in ways seen or unseen.
$thinker$,
  quran_connection = 'Did He not find you an orphan and give you shelter?',
  quran_reference = 'Surah Ad-Duha 93:6',
  reflection_question = 'When have you seen Allah bless someone who helped others in need?',
  updated_at = now()
WHERE slug = 'life-with-halimah';

-- ── Lesson 4: Opening of the Chest ───────────────────────────────────────────
UPDATE public.articles
SET
  title = 'The Opening of the Chest',
  slug = 'opening-of-the-chest',
  excerpt = 'While Muhammad ﷺ lived with Halimah, Angel Jibril came by Allah''s command and purified his heart — a sign that Allah was preparing His Messenger.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 10,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/opening-of-the-chest.png',
  usul_theme = 'revelation',
  content_explorer = $article$Something Extraordinary

While Muhammad ﷺ was still living with Halimah in the desert, something extraordinary happened.

One day, Angel Jibril (عليه السلام) came by Allah's command.

Allah purified the young Prophet's heart and prepared him for the great mission he would receive later in life.

Halimah Becomes Worried

When Halimah learned what had happened, she became frightened and worried for Muhammad ﷺ.

She decided it would be safest to return him to his mother in Makkah.

This remarkable event showed that Allah was preparing His Messenger long before revelation began in the Cave of Hira.
$article$,
  content_discoverer = $discoverer$Learning Goals

By the end of this lesson, you will be able to:

• Describe what happened during the Opening of the Chest.
• Explain who carried out this event and why.
• Understand that Allah was preparing the Prophet ﷺ long before prophethood.
• Recognize why Halimah returned him to Makkah.

The Opening of the Chest

While Muhammad ﷺ was still living with Halimah, something extraordinary happened.

One day, Angel Jibril (عليه السلام) came by Allah's command and opened the young Prophet's chest.

Allah purified his heart and prepared him for the great mission he would receive later in life.

Scholars explain that this was one of the earliest signs that Allah was preparing Muhammad ﷺ for the immense responsibility of prophethood.

When Halimah learned what had happened, she became frightened and worried for Muhammad ﷺ.

She decided it would be safest to return him to his mother in Makkah.

Long before revelation began, Allah had already started preparing His Messenger.

Key Takeaways

• Angel Jibril purified the young Prophet's heart by Allah's command.
• This happened while Muhammad ﷺ was still with Halimah in the desert.
• Halimah returned him to Makkah out of concern for his safety.
• Allah's preparation began decades before the first revelation.
$discoverer$,
  content_thinker = $thinker$Learning Goals

By the end of this lesson, you will be able to:

• Analyze the significance of the Opening of the Chest in the Prophet's preparation.
• Distinguish this childhood event from the chest opening during al-Isra wal-Mi'raj.
• Explain scholarly views on the purpose of heart purification.
• Reflect on how Allah prepares His servants before revealing their mission.

The Opening of the Chest

While Muhammad ﷺ was still living with Halimah, one of the most extraordinary events of his childhood took place.

Angel Jibril (عليه السلام) came by Allah's command and opened the young Prophet's chest.

His heart was purified before being returned to him.

Scholars explain that this was one of the earliest signs that Allah was preparing Muhammad ﷺ for the immense responsibility of prophethood.

It is important to note that this childhood event is distinct from the chest opening that occurred during al-Isra wal-Mi'raj before the Night Journey — both are authentic but occurred at different stages of his life.

Halimah became frightened after learning what had happened and returned him to his mother in Makkah.

Long before revelation began in Cave Hira, Allah had already started preparing His Messenger at the deepest level — purifying his heart for the weight of the message he would one day carry.

Key Takeaways

• Heart purification by Jibril was an early sign of divine preparation.
• This event is separate from the Isra/Mi'raj chest opening.
• Halimah's fear and return to Makkah show human concern alongside divine plan.
• Allah prepares His messengers internally long before their public mission begins.
$thinker$,
  reflection_question = 'Why do you think Allah prepared the Prophet''s heart so early in his life?',
  updated_at = now()
WHERE slug = 'opening-of-the-chest';

-- ── Lesson 5: Death of Aminah ────────────────────────────────────────────────
UPDATE public.articles
SET
  title = 'The Death of Aminah',
  slug = 'death-of-aminah',
  excerpt = 'When Muhammad ﷺ was about six years old, he lost his beloved mother Aminah — yet Allah never stopped caring for him.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 12,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/death-of-aminah.png',
  usul_theme = 'revelation',
  content_explorer = $article$Back with His Mother

After spending several years in the desert, Muhammad ﷺ returned to live with his mother, Aminah.

She was overjoyed to have her son home again.

A Sad Journey

When Muhammad ﷺ was six years old, his mother took him on a journey to visit his father's family.

On the way home, she became very sick and passed away at a place called Al-Abwa'.

Muhammad ﷺ became an orphan.

Losing his mother was very sad, but Allah never stopped caring for him.

His Grandfather's Love

After his mother's death, Muhammad ﷺ lived with his grandfather, Abdul-Muttalib.

His grandfather loved him dearly. He cared for him, protected him, and treated him with great kindness.

Allah continued to provide loving people to care for Muhammad ﷺ.
$article$,
  content_discoverer = $discoverer$Learning Goals

By the end of this lesson, you will be able to:

• Describe the journey that led to Aminah's death.
• Explain how old Muhammad ﷺ was when his mother passed away.
• Identify who cared for him after Aminah.
• Understand that Allah protects His servants even through loss.

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

Yet Allah never abandoned him.

His Grandfather's Love

After Aminah passed away, Muhammad ﷺ was cared for by his grandfather, Abdul-Muttalib.

Abdul-Muttalib was one of the most respected leaders of Quraysh.

He loved his grandson dearly and showed him great affection.

Muhammad ﷺ often sat beside him near the Ka'bah, where the leaders of Makkah gathered.

Key Takeaways

• Aminah passed away at Al-Abwa' when Muhammad ﷺ was about six.
• He had now lost both parents.
• Abdul-Muttalib lovingly cared for him after his mother's death.
• Allah provided protection through family even in the deepest grief.
$discoverer$,
  content_thinker = $thinker$Learning Goals

By the end of this lesson, you will be able to:

• Analyze the emotional and spiritual impact of losing both parents in childhood.
• Explain the significance of the journey to Yathrib and visit to Abdullah's grave.
• Examine how Abdul-Muttalib's leadership shaped the young Muhammad ﷺ.
• Connect the Prophet's orphanhood to Surah Ad-Duha and his later mercy toward orphans.

The Wisdom of Orphanhood

When Muhammad ﷺ was about six years old, Aminah passed away during their return journey from Yathrib at Al-Abwa'.

He had now lost both his father and his mother.

Imagine how difficult this must have been for such a young child.

Yet Allah never abandoned him.

Scholars explain that growing up as an orphan helped Muhammad ﷺ understand the feelings of people who were lonely, poor, or in need.

He learned compassion, patience, humility, and complete trust in Allah.

These experiences helped prepare him to become a Prophet who would care deeply for every person he met.

Allah reminds us of this blessing in the Qur'an:

"Did He not find you an orphan and give you shelter?"

(Surah Ad-Duha 93:6)

Abdul-Muttalib's Care

After Aminah's death, Abdul-Muttalib — one of the most respected leaders of Quraysh — became the young Muhammad's guardian.

The special bond between grandfather and grandson was visible to everyone in Makkah.

Muhammad ﷺ sat among the leaders near the Ka'bah, learning by observation how Quraysh conducted its affairs.

Even in grief, Allah was preparing him for leadership.

Key Takeaways

• Double orphanhood deepened the Prophet's compassion for the vulnerable.
• Surah Ad-Duha affirms Allah's shelter after parental loss.
• Abdul-Muttalib provided love and exposure to tribal leadership.
• Hardship in childhood was divine preparation, not divine abandonment.
$thinker$,
  quran_connection = 'Did He not find you an orphan and give you shelter?',
  quran_reference = 'Surah Ad-Duha 93:6',
  reflection_question = 'How can losing someone we love teach us to be more compassionate toward others?',
  updated_at = now()
WHERE slug = 'death-of-aminah';

-- ── Lesson 6: Abu Talib ───────────────────────────────────────────────────────
UPDATE public.articles
SET
  title = 'Abu Talib, the Guardian',
  slug = 'abu-talib-guardian',
  excerpt = 'After losing his grandfather, Muhammad ﷺ was raised and protected by his uncle Abu Talib — and grew into Al-Amīn, the Trustworthy.',
  age_min = 5,
  age_max = 16,
  reading_time_minutes = 12,
  is_premium = false,
  published = true,
  cover_image_url = '/articles/covers/abu-talib-guardian.png',
  usul_theme = 'akhlaq',
  content_explorer = $article$His Uncle Protected Him

A few years after his mother passed away, his grandfather Abdul-Muttalib also passed away.

Muhammad ﷺ then went to live with his kind uncle, Abu Talib.

Abu Talib looked after him like one of his own children and protected him for many years.

Although Abu Talib was not wealthy, he loved Muhammad ﷺ deeply.

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

• Explain who Abu Talib was and why he became the Prophet's guardian.
• Describe how Abu Talib cared for Muhammad ﷺ despite limited wealth.
• Understand the meaning of Al-Amīn (The Trustworthy).
• Recognize how childhood character prepared the Prophet ﷺ for prophethood.

His Uncle Abu Talib

When Muhammad ﷺ was about eight years old, his grandfather Abdul-Muttalib passed away.

Once again, Allah provided someone to care for him.

His uncle, Abu Talib, became his guardian.

Although Abu Talib was not wealthy, he loved Muhammad ﷺ like one of his own children.

He protected him, cared for him, and remained by his side for many years — even into adulthood.

Allah continued to provide loving people to protect His Messenger throughout his childhood.

Al-Amīn — The Trustworthy

As Muhammad ﷺ grew older, people throughout Makkah noticed his remarkable character.

He always spoke the truth.
He never cheated in trade.
He kept his promises.
He treated everyone with fairness and kindness.

Because of this, the people of Makkah gave him an honoured title: Al-Amīn — The Trustworthy.

This reputation would matter greatly when he later claimed prophethood — those who knew him best had already witnessed his integrity for decades.

Key Takeaways

• Abu Talib raised and protected Muhammad ﷺ after Abdul-Muttalib's death.
• Despite poverty, Abu Talib showed deep love and loyalty.
• The title Al-Amīn reflected decades of honest character.
• Allah used family, character, and community trust to prepare His Messenger.
$discoverer$,
  content_thinker = $thinker$Learning Goals

By the end of this lesson, you will be able to:

• Analyze Abu Talib's role as guardian and protector through the pre-prophetic years.
• Explain how the title Al-Amīn functioned as social capital in Jahiliyyah Makkah.
• Examine the relationship between early character and later prophetic credibility.
• Reflect on how integrity built over years becomes the foundation of leadership.

Abu Talib as Guardian

When Abdul-Muttalib passed away, Abu Talib — though not among the wealthiest of Quraysh — took responsibility for his nephew.

He raised Muhammad ﷺ alongside his own children, protecting him through the vulnerable years of youth and early manhood.

Abu Talib's loyalty would later be tested when Muhammad ﷺ proclaimed Islam, but during these formative years he provided the stability of family and belonging.

The Phenomenon of Al-Amīn

In a society where tribal honour and verbal contracts governed commerce and dispute resolution, trustworthiness was not merely a virtue — it was currency.

Muhammad ﷺ earned the title Al-Amīn through consistent truthfulness, fair dealing, and reliability over many years.

When he later stood on Mount Safa and called his people to Islam, his integrity was not a new claim — it was a reputation verified by an entire city.

This is why Khadijah (RA) trusted him with her trade, and why the Quraysh later could not easily dismiss him as a liar.

Allah Was Preparing His Messenger

Some might think Muhammad ﷺ had an unhappy childhood because he lost many family members.

But Allah's wisdom is always perfect.

Growing up under Abu Talib's care, developing Al-Amīn's reputation, and experiencing both loss and loyalty prepared him for a mission that would require the highest moral authority on earth.

Key Takeaways

• Abu Talib provided familial protection through youth and early adulthood.
• Al-Amīn was earned through decades of verified character, not proclaimed status.
• Social trust in Makkah became a foundation for prophetic credibility.
• Allah's preparation included character formation, not only survival.
$thinker$,
  reflection_question = 'What does it mean to be someone people can truly trust — and how can you build that reputation?',
  updated_at = now()
WHERE slug = 'abu-talib-guardian';

-- Collection links (lessons 2–6)
DO $$
DECLARE
  v_collection_id uuid;
  v_path_id uuid;
  v_article_id uuid;
  rec record;
BEGIN
  SELECT id INTO v_collection_id FROM public.content_collections WHERE slug = 'life-of-prophet-muhammad';
  SELECT id INTO v_path_id FROM public.adventure_paths
  WHERE slug = 'ancient-egypt' OR public_slug = 'history-civilization' LIMIT 1;

  FOR rec IN
    SELECT * FROM (VALUES
      ('birth-of-prophet-muhammad', 2),
      ('life-with-halimah', 3),
      ('opening-of-the-chest', 4),
      ('death-of-aminah', 5),
      ('abu-talib-guardian', 6)
    ) AS t(slug, sort_order)
  LOOP
    SELECT id INTO v_article_id FROM public.articles WHERE slug = rec.slug;
    IF v_collection_id IS NOT NULL AND v_article_id IS NOT NULL THEN
      INSERT INTO public.collection_items (collection_id, article_id, sort_order, item_type)
      VALUES (v_collection_id, v_article_id, rec.sort_order, 'lesson')
      ON CONFLICT (collection_id, article_id) DO UPDATE SET sort_order = rec.sort_order;
    END IF;
    IF v_path_id IS NOT NULL AND v_article_id IS NOT NULL THEN
      INSERT INTO public.path_articles (adventure_path_id, article_id, sort_order)
      VALUES (v_path_id, v_article_id, rec.sort_order)
      ON CONFLICT (adventure_path_id, article_id) DO UPDATE SET sort_order = rec.sort_order;
    END IF;
  END LOOP;
END $$;

NOTIFY pgrst, 'reload schema';
