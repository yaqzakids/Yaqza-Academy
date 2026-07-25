import { useEffect, useState } from 'react'
import { lessonHeroImage } from '@/lib/adventure/lessonDisplay'
import { CHILDHOOD_OF_PROPHET_COVER, LIFE_WITH_HALIMAH_COVER, THE_FIRST_REVELATION_COVER, YEAR_OF_ELEPHANT_COVER } from '@/lib/journey/continueLessonCover'
import type { AdventureArticle, AdventurePath } from '@/lib/adventure/types'

const SLUG_FALLBACKS: Record<string, string> = {
  'history-seerah-the-year-of-the-elephant': YEAR_OF_ELEPHANT_COVER,
  'childhood-of-prophet-muhammad': CHILDHOOD_OF_PROPHET_COVER,
  'birth-of-prophet-muhammad': CHILDHOOD_OF_PROPHET_COVER,
  'life-with-halimah': LIFE_WITH_HALIMAH_COVER,
  'the-first-revelation': THE_FIRST_REVELATION_COVER,
}

interface LessonHeroImageProps {
  article: AdventureArticle
  path?: AdventurePath | null
  /** Extra classes on the wrapper (e.g. rounded-none for full-bleed explorer hero). */
  className?: string
}

export default function LessonHeroImage({ article, path, className = '' }: LessonHeroImageProps) {
  const resolved = lessonHeroImage(article, path) ?? SLUG_FALLBACKS[article.slug] ?? null
  const [src, setSrc] = useState(resolved)

  useEffect(() => {
    setSrc(lessonHeroImage(article, path) ?? SLUG_FALLBACKS[article.slug] ?? null)
  }, [article, path])

  if (!src) return null

  const fallback = SLUG_FALLBACKS[article.slug]

  return (
    <figure className={`mb-5 ${className}`.trim()}>
      <img
        src={src}
        alt=""
        loading="eager"
        decoding="async"
        className="w-full h-auto max-w-full block rounded-2xl"
        onError={() => {
          if (fallback && fallback !== src) setSrc(fallback)
        }}
      />
    </figure>
  )
}
