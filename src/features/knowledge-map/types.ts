export type KnowledgeRegionStatus = 'locked' | 'in_progress' | 'completed'

export type KnowledgeLocationType =
  | 'city'
  | 'landmark'
  | 'battle'
  | 'scholar'
  | 'mosque'
  | 'trade_route'
  | 'discovery'

export type KnowledgeDifficulty = 'explorer' | 'discoverer' | 'thinker'

export type KnowledgeEra =
  | 'Seerah Era'
  | 'Khulafa Rashidun'
  | 'Umayyad'
  | 'Abbasid'
  | 'Andalusian Golden Age'
  | 'Ottoman'
  | 'Modern Reflection'

export type RegionalMapTheme =
  | 'desert'
  | 'river'
  | 'garden'
  | 'library'
  | 'mountain'
  | 'coastal'
  | 'city'

export interface RegionalMapConfig {
  type: 'placeholder' | 'image'
  imageSrc?: string
  theme: RegionalMapTheme
  visualElements: string[]
}

/** Percentage position (0–100) on a map layer. */
export interface MapAnchor {
  x: number
  y: number
}

/** Raw location before muslimMapAnchor is assigned. */
export type KnowledgeLocationInput = Omit<KnowledgeLocation, 'muslimMapAnchor'>

export interface KnowledgeLocation {
  id: string
  title: string
  regionId: string
  era: KnowledgeEra
  type: KnowledgeLocationType
  difficulty: KnowledgeDifficulty
  description: string
  locked: boolean
  completed: boolean
  collectibleReward: string
  quizAvailable: boolean
  activityAvailable: boolean
  /** Position on muslim-world-map-parchment.png as percentage (0–100). */
  muslimMapAnchor: MapAnchor
}

export interface KnowledgeRegion {
  id: string
  name: string
  slug: string
  muslimMapAnchor: MapAnchor
  icon: string
  description: string
  totalLocations: number
  completedLocations: number
  status: KnowledgeRegionStatus
  locations: KnowledgeLocation[]
  regionalMap: RegionalMapConfig
}

export interface KnowledgeCollectible {
  id: string
  name: string
  icon: string
  count: number
}

export interface KnowledgeBadge {
  id: string
  name: string
  icon: string
  earned: boolean
}

export interface PassportRecentVisit {
  id: string
  title: string
  regionName: string
  regionId: string
  completed: boolean
  completedAt?: string
}

export interface KnowledgePassport {
  citiesVisited: number
  totalCities: number
  regionsUnlocked: number
  totalRegions: number
  collectiblesFound: number
  totalCollectibles: number
  badgesEarned: number
  totalBadges: number
  totalStars: number
  journeyStarted: string
  recentlyVisited: PassportRecentVisit[]
  topCollectibles: KnowledgeCollectible[]
  badges: KnowledgeBadge[]
}

export interface KnowledgeMapFilters {
  era: KnowledgeEra | 'all'
  region: string
  difficulty: KnowledgeDifficulty | 'all'
}

export type MapViewLevel = 'world' | 'region' | 'location'

export interface MapCamera {
  x: number
  y: number
  zoom: number
  focusX: number
  focusY: number
}
