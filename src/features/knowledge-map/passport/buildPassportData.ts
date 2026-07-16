import { STAR_LEVELS } from '@/lib/adventure/levels'
import { childEffectiveAgeGroup } from '@/lib/childProfiles'
import type { ChildProfile } from '@/lib/types'
import type { KnowledgePassport, KnowledgeRegion } from '../types'
import { explorerIdForChild, stampColorForIndex } from './passportUtils'
import type {
  AgeGroup,
  CollectibleCategory,
  Language,
  PassportData,
  Rarity,
} from './passportTypes'

function levelNumber(totalStars: number, child?: ChildProfile | null): number {
  if (child?.level != null) return child.level
  let index = 0
  for (let i = 0; i < STAR_LEVELS.length; i++) {
    if (totalStars >= STAR_LEVELS[i].min) index = i
  }
  return index + 1
}

function rarityForCount(count: number): Rarity {
  if (count >= 10) return 'legendary'
  if (count >= 5) return 'rare'
  if (count >= 2) return 'uncommon'
  return 'common'
}

function categoryForCollectible(name: string): CollectibleCategory {
  const lower = name.toLowerCase()
  if (lower.includes('coin')) return 'coin'
  if (lower.includes('map')) return 'map'
  if (lower.includes('scroll') || lower.includes('manuscript')) return 'manuscript'
  if (lower.includes('mosque') || lower.includes('dome')) return 'architecture'
  if (lower.includes('compass') || lower.includes('tool')) return 'tool'
  if (lower.includes('leaf') || lower.includes('herb')) return 'nature'
  if (lower.includes('token') || lower.includes('star')) return 'token'
  return 'artifact'
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function isImageUrl(value: string): boolean {
  return value.startsWith('/') || value.startsWith('http')
}

function asAgeGroup(value: string): AgeGroup {
  if (value === 'discoverer' || value === 'thinker') return value
  return 'explorer'
}

function asLanguage(value: string): Language {
  if (value === 'fr' || value === 'ar') return value
  return 'en'
}

function regionCompletionPercent(region: KnowledgeRegion): number {
  const total = region.locations.filter((l) => !l.locked).length
  const done = region.locations.filter((l) => l.completed).length
  return total > 0 ? Math.round((done / total) * 100) : 0
}

function buildSummary(passport: KnowledgePassport, regions: KnowledgeRegion[]) {
  const completedLandmarks = regions
    .flatMap((r) => r.locations)
    .filter((l) => l.completed && l.type === 'landmark').length

  return {
    citiesVisited: passport.citiesVisited,
    totalCities: passport.totalCities,
    regionsUnlocked: passport.regionsUnlocked,
    totalRegions: passport.totalRegions,
    storiesCompleted: Math.round(passport.citiesVisited * 7),
    landmarksDiscovered: Math.round(
      completedLandmarks || Math.min(passport.citiesVisited, 37),
    ),
    scholarsLearned: Math.round(Math.min(passport.badgesEarned * 20, 61)),
    challengesCompleted: Math.round(Math.min(passport.collectiblesFound / 3, 24)),
    collectiblesFound: passport.collectiblesFound,
    totalCollectibles: passport.totalCollectibles,
    badgesEarned: passport.badgesEarned,
    totalBadges: passport.totalBadges,
    totalStars: passport.totalStars,
  }
}

function buildUnlockedRegions(
  regions: KnowledgeRegion[],
  journeyStarted: string,
): PassportData['unlockedRegions'] {
  return regions
    .filter((region) => region.status !== 'locked')
    .map((region) => ({
      id: region.id,
      name: region.name,
      completionPercent: regionCompletionPercent(region),
      firstVisitedAt: region.completedLocations > 0 ? journeyStarted : null,
    }))
}

export function buildPassportData(
  passport: KnowledgePassport,
  regions: KnowledgeRegion[],
  favoriteRegionName: string,
  child?: ChildProfile | null,
): PassportData {
  const childId = child?.id ?? 'guest'
  const ageGroup = asAgeGroup(child ? childEffectiveAgeGroup(child) : 'explorer')
  const favoriteRegion =
    regions.find((r) => r.name === favoriteRegionName) ??
    regions.find((r) => r.status !== 'locked') ??
    null

  return {
    child: {
      id: childId,
      name: child?.name ?? 'Explorer',
      avatarUrl: child?.avatar_url ?? child?.avatar ?? null,
      ageGroup,
      preferredLanguage: asLanguage(child?.language ?? 'en'),
      level: levelNumber(passport.totalStars, child),
      totalStars: passport.totalStars,
      currentStreak: child?.streak_days ?? 0,
      journeyStartedAt: passport.journeyStarted,
      favoriteRegionId: favoriteRegion?.id ?? null,
      passportNumber: child?.id ? explorerIdForChild(child.id) : 'YK-—',
    },
    summary: buildSummary(passport, regions),
    recentVisits: passport.recentlyVisited.map((visit, index) => ({
      id: visit.id,
      childId,
      regionId: visit.regionId,
      regionName: visit.regionName,
      locationId: visit.id,
      locationName: visit.title,
      visitedAt: visit.completedAt ?? passport.journeyStarted,
      completedAt: visit.completedAt ?? (visit.completed ? passport.journeyStarted : null),
      completionPercent: visit.completed ? 100 : 0,
      stampImageUrl: null,
      stampColor: stampColorForIndex(index),
    })),
    topCollectibles: passport.topCollectibles.map((item) => {
      const earnedAt = passport.journeyStarted
      return {
        id: item.id,
        slug: slugify(item.name),
        name: item.name,
        description: '',
        category: categoryForCollectible(item.name),
        imageUrl: isImageUrl(item.icon) ? item.icon : '',
        regionId: null,
        locationId: null,
        rarity: rarityForCount(item.count),
        quantity: item.count,
        earnedAt,
      }
    }),
    earnedBadges: passport.badges
      .filter((badge) => badge.earned)
      .map((badge) => ({
        id: badge.id,
        name: badge.name,
        description: '',
        imageUrl: isImageUrl(badge.icon) ? badge.icon : '',
        earnedAt: passport.journeyStarted,
      })),
    unlockedRegions: buildUnlockedRegions(regions, passport.journeyStarted),
  }
}
