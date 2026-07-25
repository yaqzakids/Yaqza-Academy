import { useMemo } from 'react'
import { articleDisplayTitle } from '@/lib/admin/articleI18n'
import { lessonHeroImage } from '@/lib/adventure/lessonDisplay'
import {
  CHILDHOOD_OF_PROPHET_COVER,
  LIFE_WITH_HALIMAH_COVER,
  THE_FIRST_REVELATION_COVER,
  YEAR_OF_ELEPHANT_COVER,
} from '@/lib/journey/continueLessonCover'
import lifeWithHalimahCover from '@/assets/articles/life-with-halimah.jpg'
import type { AdventureArticle, AdventurePath } from '@/lib/adventure/types'

const SLUG_FALLBACKS: Record<string, string> = {
  'history-seerah-the-year-of-the-elephant': YEAR_OF_ELEPHANT_COVER,
  'childhood-of-prophet-muhammad': CHILDHOOD_OF_PROPHET_COVER,
  'birth-of-prophet-muhammad': CHILDHOOD_OF_PROPHET_COVER,
  'life-with-halimah': LIFE_WITH_HALIMAH_COVER,
  'the-first-revelation': THE_FIRST_REVELATION_COVER,
}

function isHalimahLesson(article: AdventureArticle): boolean {
  const title = articleDisplayTitle(article).toLowerCase()
  const slug = (article.slug ?? '').toLowerCase()
  const excerpt = (article.excerpt ?? '').toLowerCase()
  return slug.includes('halimah') || title.includes('halimah') || excerpt.includes('halimah')
}

function resolveHeroSrc(article: AdventureArticle, path?: AdventurePath | null): string | null {
  if (isHalimahLesson(article)) return lifeWithHalimahCover

  const fromLesson = lessonHeroImage(article, path)
  if (fromLesson) return fromLesson

  const slug = article.slug?.trim() ?? ''
  if (slug && SLUG_FALLBACKS[slug]) return SLUG_FALLBACKS[slug]

  return article.cover_image_url?.trim() ?? null
}

interface LessonHeroImageProps {
  article: AdventureArticle
  path?: AdventurePath | null
  className?: string
}

export default function LessonHeroImage({ article, path, className = '' }: LessonHeroImageProps) {
  const src = useMemo(() => resolveHeroSrc(article, path), [article, path])

  if (!src) return null

  return (
    <figure className={`w-full mb-5 ${className}`.trim()}>
      <img
        src={src}
        alt=""
        loading="eager"
        decoding="async"
        className="w-full h-auto max-h-[480px] object-cover block rounded-2xl"
      />
    </figure>
  )
}
