import type { AdventureArticle } from '@/lib/adventure/types'
import type { AgeGroup, ArticleActivityCard } from '@/lib/types'

export function lessonActivityCards(
  article: AdventureArticle,
  ageGroup: AgeGroup,
): ArticleActivityCard[] {
  const cards = (article.activity_cards ?? []).filter(
    (card) => card?.title?.trim() && Array.isArray(card.steps) && card.steps.length > 0,
  )

  return cards.filter((card) => {
    if (!card.age_groups?.length) return true
    return card.age_groups.includes(ageGroup)
  })
}
