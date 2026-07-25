import yearOfElephantCover from '@/assets/articles/the-year-of-the-elephant.png'
import childhoodOfProphetCover from '@/assets/articles/childhood-of-prophet-muhammad.png'
import theFirstRevelationCover from '@/assets/articles/the-first-revelation.png'
import lifeWithHalimahCover from '@/assets/articles/life-with-halimah.jpg'

export const HONEST_TONGUE_COVER = '/articles/covers/the-honest-tongue.png'
export const KIND_HEART_COVER = '/articles/covers/the-kind-heart.png'
export const LIFE_WITH_HALIMAH_COVER = lifeWithHalimahCover
export const YEAR_OF_ELEPHANT_COVER = yearOfElephantCover
export const CHILDHOOD_OF_PROPHET_COVER = childhoodOfProphetCover
export const THE_FIRST_REVELATION_COVER = theFirstRevelationCover

const ARTICLE_COVER_OVERRIDES: Record<string, string> = {
  'honest-tongue': HONEST_TONGUE_COVER,
  'the-kind-heart': KIND_HEART_COVER,
  'history-seerah-the-year-of-the-elephant': YEAR_OF_ELEPHANT_COVER,
  'childhood-of-prophet-muhammad': CHILDHOOD_OF_PROPHET_COVER,
  'birth-of-prophet-muhammad': CHILDHOOD_OF_PROPHET_COVER,
  'life-with-halimah': LIFE_WITH_HALIMAH_COVER,
  'opening-of-the-chest': CHILDHOOD_OF_PROPHET_COVER,
  'death-of-aminah': CHILDHOOD_OF_PROPHET_COVER,
  'abu-talib-guardian': CHILDHOOD_OF_PROPHET_COVER,
  'shepherding-in-makkah': CHILDHOOD_OF_PROPHET_COVER,
  'hilf-al-fudul': CHILDHOOD_OF_PROPHET_COVER,
  'the-first-revelation': THE_FIRST_REVELATION_COVER,
  'the-secret-call': '/articles/covers/dawah-in-secret.png',
  'dawah-in-secret': '/articles/covers/dawah-in-secret.png',
}

export function resolveContinueLessonCover(options: {
  articleCoverUrl?: string | null
  articleSlug?: string | null
  articleTitle?: string | null
  pathCoverUrl?: string | null
}): string | null {
  const { articleCoverUrl, articleSlug, articleTitle, pathCoverUrl } = options

  // Curated lesson covers always win over stale DB values (e.g. path cover copied onto article).
  if (articleSlug && ARTICLE_COVER_OVERRIDES[articleSlug]) {
    return ARTICLE_COVER_OVERRIDES[articleSlug]
  }

  const normalizedSlug = articleSlug?.trim().toLowerCase() ?? ''
  if (normalizedSlug.includes('halimah')) {
    return LIFE_WITH_HALIMAH_COVER
  }

  const normalizedTitle = articleTitle?.trim().toLowerCase() ?? ''
  if (normalizedTitle.includes('honest tongue')) {
    return HONEST_TONGUE_COVER
  }

  if (normalizedTitle.includes('kind heart')) {
    return KIND_HEART_COVER
  }

  if (normalizedTitle.includes('year of the elephant')) {
    return YEAR_OF_ELEPHANT_COVER
  }

  if (normalizedTitle.includes('life with halimah') || normalizedTitle.includes('halimah')) {
    return LIFE_WITH_HALIMAH_COVER
  }

  if (normalizedTitle.includes('birth of prophet') || normalizedTitle.includes('childhood of prophet') ||
      normalizedTitle.includes('opening of the chest') ||
      normalizedTitle.includes('death of aminah') || normalizedTitle.includes('abu talib') ||
      normalizedTitle.includes('shepherd of makkah') || normalizedTitle.includes('hilf al-fudul')) {
    return CHILDHOOD_OF_PROPHET_COVER
  }

  if (normalizedTitle.includes('first revelation')) {
    return THE_FIRST_REVELATION_COVER
  }

  if (normalizedTitle.includes('dawah in secret') || normalizedTitle.includes('secret call')) {
    return '/articles/covers/dawah-in-secret.png'
  }

  const trimmedCover = articleCoverUrl?.trim()
  if (trimmedCover) return trimmedCover

  if (pathCoverUrl?.trim()) return pathCoverUrl

  return null
}
