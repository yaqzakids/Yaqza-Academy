import { usulThemeLabel } from '@/lib/discoverer'
import { articleDisplayTitle } from '@/lib/admin/articleI18n'
import { getLearningPathBySlug, adventurePathDisplayTitle } from '@/lib/learningPaths'
import { resolveContinueLessonCover } from '@/lib/journey/continueLessonCover'
import type { AdventureArticle, AdventurePath } from '@/lib/adventure/types'
import type { ArticleFunFact, ArticleVocabEntry } from '@/lib/types'

const USUL_THEME_BLURBS: Record<string, string> = {
  tawhid: 'Everything begins with knowing Allah is One.',
  revelation: 'The Quran guides how we understand the world.',
  purpose: 'Allah created us with a meaningful purpose.',
  akhlaq: 'Good character shows what we truly believe.',
  akhirah: 'Our choices today shape our forever.',
  stewardship: 'We care for what Allah entrusted to us.',
  justice: 'Fairness and mercy go together.',
  knowledge: 'Seeking knowledge is an act of worship.',
}

export function lessonHeroImage(article: AdventureArticle, path?: AdventurePath | null): string | null {
  return resolveContinueLessonCover({
    articleCoverUrl: article.cover_image_url,
    articleSlug: article.slug,
    articleTitle: articleDisplayTitle(article),
    pathCoverUrl: path?.cover_image_url ?? null,
  })
}

export function lessonAgeLabel(article: AdventureArticle): string {
  return `Ages ${article.age_min}–${article.age_max}`
}

export function lessonFunFacts(article: AdventureArticle): ArticleFunFact[] {
  return (article.fun_facts ?? []).filter((f) => f.fact?.trim())
}

export function lessonVocabulary(article: AdventureArticle): ArticleVocabEntry[] {
  return (article.vocabulary ?? []).filter((v) => v.word?.trim())
}

/** Per-lesson topic chips when path + usul theme alone are not enough. */
const LESSON_SLUG_TAGS: Record<string, string[]> = {
  'honest-tongue': ['Honesty', 'Truthfulness', 'Trustworthy'],
  'the-kind-heart': ['Kindness', 'Compassion', 'Mercy', 'Character'],
  'respecting-parents': ['Respect', 'Parents', 'Gratitude', 'Family'],
  'history-seerah-the-year-of-the-elephant': ['Seerah', 'Makkah', 'Tawakkul', 'Surah Al-Fil'],
  'birth-of-prophet-muhammad': ['Seerah', 'Makkah', 'Year of the Elephant', 'Surah Ad-Duha'],
  'life-with-halimah': ['Seerah', 'Halimah', 'Desert', 'Surah Ad-Duha'],
  'opening-of-the-chest': ['Seerah', 'Jibril', 'Preparation', 'Revelation'],
  'death-of-aminah': ['Seerah', 'Orphan', 'Aminah', 'Surah Ad-Duha'],
  'abu-talib-guardian': ['Seerah', 'Al-Amīn', 'Abu Talib', 'Character'],
  'shepherding-in-makkah': ['Seerah', 'Leadership', 'Honest Work', 'Surah Ad-Duha'],
  'hilf-al-fudul': ['Seerah', 'Justice', 'Hilf al-Fudul', 'Surah An-Nisa'],
  'childhood-of-prophet-muhammad': ['Seerah', 'Makkah', 'Al-Amīn', 'Surah Ad-Duha'],
  'the-first-revelation': ['Seerah', 'Jahiliyyah', 'Iqra', 'Surah Al-Alaq'],
  'the-secret-call': ['Seerah', "Da'wah", 'Sabr', 'Surah An-Nahl'],
  'dawah-in-secret': ['Seerah', "Da'wah", 'Sabr', 'Surah An-Nahl'],
}

/** Collection label for history-path lessons (shown instead of legacy path title). */
const LESSON_COLLECTION_LABELS: Record<string, string> = {
  'history-seerah-the-year-of-the-elephant': 'Life of Prophet Muhammad ﷺ',
  'birth-of-prophet-muhammad': 'Life of Prophet Muhammad ﷺ',
  'life-with-halimah': 'Life of Prophet Muhammad ﷺ',
  'opening-of-the-chest': 'Life of Prophet Muhammad ﷺ',
  'death-of-aminah': 'Life of Prophet Muhammad ﷺ',
  'abu-talib-guardian': 'Life of Prophet Muhammad ﷺ',
  'shepherding-in-makkah': 'Life of Prophet Muhammad ﷺ',
  'hilf-al-fudul': 'Life of Prophet Muhammad ﷺ',
  'childhood-of-prophet-muhammad': 'Life of Prophet Muhammad ﷺ',
  'the-first-revelation': 'Life of Prophet Muhammad ﷺ',
  'the-secret-call': 'Life of Prophet Muhammad ﷺ',
  'dawah-in-secret': 'Life of Prophet Muhammad ﷺ',
}

/** Public learning-path name (e.g. History & Civilization instead of Ancient Egypt). */
export function lessonPathLabel(path?: AdventurePath | null): string {
  if (!path?.title?.trim()) return ''
  return adventurePathDisplayTitle(path)
}

export function lessonCollectionLabel(articleSlug: string): string | null {
  return LESSON_COLLECTION_LABELS[articleSlug]?.trim() || null
}

/** Primary category chip under the lesson title. */
export function lessonMetadataCategory(article: AdventureArticle, path?: AdventurePath | null): string {
  return lessonCollectionLabel(article.slug) ?? lessonPathLabel(path)
}

/** Breadcrumb link for the parent learning path. */
export function lessonPathUrl(path?: AdventurePath | null): string {
  if (!path?.slug) return '/paths'
  const marketing = getLearningPathBySlug(path.slug)
  if (marketing) return `/paths/${marketing.slug}`
  return `/adventures/${path.slug}`
}

/** Topic chips shown under the hero — derived from lesson metadata only (not vocabulary). */
export function lessonTopicTags(article: AdventureArticle, path?: AdventurePath | null): string[] {
  const tags: string[] = []

  if (article.usul_theme) {
    tags.push(usulThemeLabel(article.usul_theme))
  }

  const slugTags = LESSON_SLUG_TAGS[article.slug] ?? []
  for (const tag of slugTags) {
    if (tag.trim()) tags.push(tag.trim())
  }

  // Path/collection label is shown in the metadata row — avoid duplicating it here.
  const category = lessonMetadataCategory(article, path)
  return [...new Set(tags)]
    .filter((tag) => tag !== category && tag !== 'Ancient Egypt')
    .slice(0, 6)
}

/** Theme labels for parent sidebar and summaries. */
export function lessonThemes(article: AdventureArticle): string[] {
  const themes: string[] = []
  if (article.usul_theme) {
    themes.push(usulThemeLabel(article.usul_theme))
  }
  return themes
}

export function usulThemeBlurb(theme: AdventureArticle['usul_theme']): string | null {
  if (!theme) return null
  return USUL_THEME_BLURBS[theme] ?? null
}

export function splitQuranConnection(text: string | null | undefined): {
  arabic: string | null
  translation: string | null
} {
  if (!text?.trim()) return { arabic: null, translation: null }

  const trimmed = text.trim()
  const blocks = trimmed.split(/\n\s*\n/)
  if (blocks.length >= 2) {
    return {
      arabic: blocks[0].trim(),
      translation: blocks.slice(1).join('\n\n').trim(),
    }
  }

  const lines = trimmed.split('\n')
  const arabicLines: string[] = []
  const otherLines: string[] = []

  for (const line of lines) {
    if (/[\u0600-\u06FF]/.test(line)) arabicLines.push(line)
    else if (line.trim()) otherLines.push(line)
  }

  if (arabicLines.length > 0) {
    return {
      arabic: arabicLines.join('\n'),
      translation: otherLines.join('\n') || null,
    }
  }

  return { arabic: null, translation: trimmed }
}

export function lessonFamilyDiscussion(article: AdventureArticle): string | null {
  const q = article.reflection_question?.trim()
  return q || null
}
