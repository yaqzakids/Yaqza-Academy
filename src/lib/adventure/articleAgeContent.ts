import type { AgeGroup } from '@/lib/types'

const AGE_CONTENT_KEY: Record<AgeGroup, 'content_explorer' | 'content_discoverer' | 'content_thinker'> = {
  explorer: 'content_explorer',
  discoverer: 'content_discoverer',
  thinker: 'content_thinker',
}

type AgeContentFields = {
  content_explorer?: string | null
  content_discoverer?: string | null
  content_thinker?: string | null
}

/** True when the article has body text for this age band (or any band as fallback). */
export function articleHasAgeContent(article: AgeContentFields, ageGroup: AgeGroup): boolean {
  const primary = article[AGE_CONTENT_KEY[ageGroup]]
  if (typeof primary === 'string' && primary.trim()) return true
  return Boolean(
    article.content_explorer?.trim() ||
      article.content_discoverer?.trim() ||
      article.content_thinker?.trim()
  )
}

/** Seeded stub slugs → published lesson slugs (Life of Prophet Muhammad ﷺ collection). */
export const SEERAH_LESSON_CANONICAL_SLUGS: Record<string, string> = {
  'history-seerah-childhood': 'birth-of-prophet-muhammad',
  'childhood-of-prophet-muhammad': 'birth-of-prophet-muhammad',
  'birth-of-prophet-muhammad': 'birth-of-prophet-muhammad',
  'history-seerah-the-first-revelation': 'the-first-revelation',
  'history-seerah-the-secret-call': 'dawah-in-secret',
  'the-secret-call': 'dawah-in-secret',
  'history-seerah-the-shepherd-of-makkah': 'shepherding-in-makkah',
}

export function seerahCanonicalSlug(slug: string): string {
  return SEERAH_LESSON_CANONICAL_SLUGS[slug] ?? slug
}
