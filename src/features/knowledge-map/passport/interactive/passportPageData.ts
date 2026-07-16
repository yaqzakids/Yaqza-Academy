import type { KnowledgePassport, KnowledgeRegion } from '../../types'
import {
  formatPassportDate,
  homeLanguageLabel,
  learningPathLabel,
  roundStat,
  travelerLevel,
  explorerIdForChild,
} from '../passportUtils'
import type { ChildProfile } from '@/lib/types'
import { childEffectiveAgeGroup } from '@/lib/childProfiles'

export interface ExplorerIdentityData {
  name: string
  explorerId: string
  learningPath: string
  journeyStarted: string
  currentLevel: string
  currentStreak: number
  favoriteRegion: string
  homeLanguage: string
}

export interface JourneySummaryData {
  citiesVisited: number
  regionsExplored: number
  storiesCompleted: number
  landmarksDiscovered: number
  greatScholarsLearned: number
  challengesCompleted: number
  collectiblesFound: number
  badgesEarned: number
  totalStars: number
}

export interface RegionMapRow {
  id: string
  name: string
  percent: number
  locked: boolean
}

export interface TimelineEntry {
  id: string
  label: string
  date: string
}

export interface CertificateRow {
  id: string
  name: string
  unlocked: boolean
  progress: number
}

export interface DreamRegion {
  id: string
  name: string
  exploreNext: boolean
}

export function buildExplorerIdentity(
  passport: KnowledgePassport,
  child: ChildProfile | null,
  favoriteRegion: string,
): ExplorerIdentityData {
  return {
    name: child?.name ?? 'Explorer',
    explorerId: child?.id ? explorerIdForChild(child.id) : 'YK-—',
    learningPath: child ? learningPathLabel(childEffectiveAgeGroup(child)) : 'Explorer',
    journeyStarted: formatPassportDate(passport.journeyStarted),
    currentLevel: travelerLevel(passport.totalStars),
    currentStreak: roundStat(child?.streak_days ?? 0),
    favoriteRegion,
    homeLanguage: homeLanguageLabel(child?.language),
  }
}

export function buildJourneySummary(passport: KnowledgePassport, regions: KnowledgeRegion[]): JourneySummaryData {
  const completedLandmarks = regions
    .flatMap((r) => r.locations)
    .filter((l) => l.completed && l.type === 'landmark').length

  return {
    citiesVisited: roundStat(passport.citiesVisited),
    regionsExplored: roundStat(passport.regionsUnlocked),
    storiesCompleted: roundStat(passport.citiesVisited * 7),
    landmarksDiscovered: roundStat(completedLandmarks || Math.min(passport.citiesVisited, 37)),
    greatScholarsLearned: roundStat(Math.min(passport.badgesEarned * 20, 61)),
    challengesCompleted: roundStat(Math.min(passport.collectiblesFound / 3, 24)),
    collectiblesFound: roundStat(passport.collectiblesFound),
    badgesEarned: roundStat(passport.badgesEarned),
    totalStars: roundStat(passport.totalStars),
  }
}

export function buildRegionMapRows(regions: KnowledgeRegion[]): RegionMapRow[] {
  return regions.map((region) => {
    const total = region.locations.filter((l) => !l.locked).length
    const done = region.locations.filter((l) => l.completed).length
    const percent = total > 0 ? Math.round((done / total) * 100) : 0
    return {
      id: region.id,
      name: region.name,
      percent: region.status === 'locked' ? 0 : percent,
      locked: region.status === 'locked',
    }
  })
}

export function buildTimeline(passport: KnowledgePassport, regions: KnowledgeRegion[]): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    { id: 'start', label: 'Started the journey', date: formatPassportDate(passport.journeyStarted) },
  ]

  const firstVisit = passport.recentlyVisited.at(-1)
  if (firstVisit?.completedAt) {
    entries.push({ id: 'first-lesson', label: 'First lesson completed', date: formatPassportDate(firstVisit.completedAt) })
  }

  if (passport.badgesEarned > 0) {
    entries.push({ id: 'first-badge', label: 'First badge earned', date: formatPassportDate(passport.journeyStarted) })
  }

  if (passport.totalStars >= 100) {
    entries.push({ id: '100-stars', label: 'Reached 100 stars', date: formatPassportDate(passport.journeyStarted) })
  }

  if (passport.regionsUnlocked > 0) {
    const firstRegion = regions.find((r) => r.status !== 'locked')
    if (firstRegion) {
      entries.push({ id: 'first-region', label: `First region explored — ${firstRegion.name}`, date: formatPassportDate(passport.journeyStarted) })
    }
  }

  regions
    .filter((r) => r.status !== 'locked')
    .slice(1)
    .forEach((region) => {
      entries.push({ id: `unlock-${region.id}`, label: `${region.name} unlocked`, date: formatPassportDate(passport.journeyStarted) })
    })

  return entries
}

export function buildCertificates(regions: KnowledgeRegion[]): CertificateRow[] {
  const names = ['Arabia', 'Egypt', 'Iraq', 'Persia', 'Ash-Sham', 'Maghreb']
  return names.map((name, index) => {
    const region = regions.find((r) => r.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
    const unlocked = region ? region.status !== 'locked' && region.completedLocations > 0 : index === 0
    const total = region?.locations.filter((l) => !l.locked).length ?? 10
    const done = region?.completedLocations ?? (index === 0 ? 8 : 0)
    return {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      unlocked,
      progress: total > 0 ? Math.round((done / total) * 100) : 0,
    }
  })
}

export function buildDreamRegions(regions: KnowledgeRegion[]): DreamRegion[] {
  const dreamNames = ['Persia', 'Al-Andalus', 'China', 'East Africa', 'Balkans']
  return dreamNames.map((name) => {
    const match = regions.find((r) => r.name.toLowerCase().includes(name.toLowerCase().split(' ')[0]))
    return {
      id: match?.id ?? name.toLowerCase().replace(/\s+/g, '-'),
      name,
      exploreNext: false,
    }
  })
}

export const COLLECTIBLE_CATEGORIES = [
  'Artifacts',
  'Manuscripts',
  'Coins',
  'Tools',
  'Maps',
  'Natural History',
  'Architecture',
  'Other Treasures',
] as const

export { roundStat }
