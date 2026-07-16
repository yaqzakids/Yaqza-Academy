import heroKaaba from '@/assets/knowledge-map/arabia-hub/hero-kaaba.png'
import heroPalms from '@/assets/knowledge-map/arabia-hub/hero-palms.png'
import cardCountries from '@/assets/knowledge-map/arabia-hub/card-countries.png'
import cardCities from '@/assets/knowledge-map/arabia-hub/card-cities.png'
import cardLandmarks from '@/assets/knowledge-map/arabia-hub/card-landmarks.png'
import cardGreatMuslims from '@/assets/knowledge-map/arabia-hub/card-great-muslims.png'
import cardStories from '@/assets/knowledge-map/arabia-hub/card-stories.png'
import cardTimeline from '@/assets/knowledge-map/arabia-hub/card-timeline.png'
import cardChallenges from '@/assets/knowledge-map/arabia-hub/card-challenges.png'
import cardCollectibles from '@/assets/knowledge-map/arabia-hub/card-collectibles.png'
import type { RegionHubCardType } from './arabiaRegionHubData'

export const ARABIA_HUB_HERO = {
  kaaba: heroKaaba,
  palms: heroPalms,
} as const

const CARD_ART: Record<RegionHubCardType, string> = {
  countries: cardCountries,
  cities: cardCities,
  landmarks: cardLandmarks,
  'great-muslims': cardGreatMuslims,
  stories: cardStories,
  timeline: cardTimeline,
  challenges: cardChallenges,
  collectibles: cardCollectibles,
}

export function arabiaHubCardArt(type: RegionHubCardType | string): string {
  return CARD_ART[type as RegionHubCardType] ?? cardCountries
}
