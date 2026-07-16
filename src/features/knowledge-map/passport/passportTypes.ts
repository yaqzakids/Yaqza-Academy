/* ============================================================
   src/features/knowledge-map/passport/passportTypes.ts
   Single source of truth for all passport data shapes.
   ============================================================ */

// ── Child profile ────────────────────────────────────────────
export type AgeGroup = 'explorer' | 'discoverer' | 'thinker'
export type Language = 'en' | 'fr' | 'ar'
export type StampColor = 'green' | 'blue' | 'rust' | 'brown'
export type CollectibleCategory =
  | 'artifact'
  | 'coin'
  | 'map'
  | 'manuscript'
  | 'architecture'
  | 'tool'
  | 'nature'
  | 'token'
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary'

export interface ChildPassportProfile {
  id: string
  name: string
  avatarUrl: string | null
  ageGroup: AgeGroup
  preferredLanguage: Language
  level: number
  totalStars: number
  currentStreak: number
  journeyStartedAt: string // ISO date string
  favoriteRegionId: string | null
  passportNumber: string // generated: YK-YYYY-XXXXXX
}

// ── Recently visited (geographic locations) ──────────────────
export interface PassportVisit {
  id: string
  childId: string
  regionId: string
  regionName: string
  locationId: string
  locationName: string
  visitedAt: string // ISO
  completedAt: string | null // ISO — null = in progress
  completionPercent: number // 0–100
  stampImageUrl: string | null
  stampColor: StampColor
}

// ── Collectibles ─────────────────────────────────────────────
export interface CollectibleDefinition {
  id: string
  slug: string
  name: string
  description: string
  category: CollectibleCategory
  imageUrl: string
  regionId: string | null
  locationId: string | null
  rarity: Rarity
}

export interface ChildCollectible {
  id: string
  childId: string
  collectibleId: string
  quantity: number
  firstEarnedAt: string
  lastEarnedAt: string
}

export type TopCollectible = CollectibleDefinition & {
  quantity: number
  earnedAt: string
}

// ── Badges ───────────────────────────────────────────────────
export interface EarnedBadge {
  id: string
  name: string
  description: string
  imageUrl: string
  earnedAt: string
}

// ── Summary ──────────────────────────────────────────────────
export interface PassportSummary {
  citiesVisited: number
  totalCities: number
  regionsUnlocked: number
  totalRegions: number
  storiesCompleted: number
  landmarksDiscovered: number
  scholarsLearned: number
  challengesCompleted: number
  collectiblesFound: number
  totalCollectibles: number
  badgesEarned: number
  totalBadges: number
  totalStars: number
}

// ── Unlocked regions ─────────────────────────────────────────
export interface UnlockedRegion {
  id: string
  name: string
  completionPercent: number
  firstVisitedAt: string | null
}

// ── Root data contract ───────────────────────────────────────
export interface PassportData {
  child: ChildPassportProfile
  summary: PassportSummary
  recentVisits: PassportVisit[]
  topCollectibles: TopCollectible[]
  earnedBadges: EarnedBadge[]
  unlockedRegions: UnlockedRegion[]
}
