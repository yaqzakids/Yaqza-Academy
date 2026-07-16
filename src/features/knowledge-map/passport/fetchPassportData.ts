/* ============================================================
   src/features/knowledge-map/passport/fetchPassportData.ts

   Maps your existing Supabase tables → PassportData contract.
   Adjust table/column names if they differ from what's listed
   in the comments — everything else stays the same.
   ============================================================ */

import { supabase } from '@/lib/supabase'
import type {
  AgeGroup,
  CollectibleCategory,
  EarnedBadge,
  Language,
  PassportData,
  PassportSummary,
  PassportVisit,
  Rarity,
  StampColor,
  TopCollectible,
  UnlockedRegion,
  ChildPassportProfile,
} from './passportTypes'

// ── Helpers ──────────────────────────────────────────────────
function generatePassportNumber(createdAt: string, id: string): string {
  const year = new Date(createdAt).getFullYear()
  const suffix = id.replace(/-/g, '').slice(0, 6).toUpperCase()
  return `YK-${year}-${suffix}`
}

function uniqueByLocation<T extends { locationId: string }>(visits: T[]): T[] {
  const seen = new Set<string>()
  return visits.filter((v) => {
    if (seen.has(v.locationId)) return false
    seen.add(v.locationId)
    return true
  })
}

const STAMP_COLORS: StampColor[] = ['green', 'blue', 'rust', 'brown']

function asAgeGroup(value: unknown): AgeGroup {
  if (value === 'discoverer' || value === 'thinker') return value
  return 'explorer'
}

function asLanguage(value: unknown): Language {
  if (value === 'fr' || value === 'ar') return value
  return 'en'
}

function asStampColor(value: unknown, fallback: StampColor): StampColor {
  if (
    value === 'green' ||
    value === 'blue' ||
    value === 'rust' ||
    value === 'brown'
  ) {
    return value
  }
  return fallback
}

function asCollectibleCategory(value: unknown): CollectibleCategory {
  const categories: CollectibleCategory[] = [
    'artifact',
    'coin',
    'map',
    'manuscript',
    'architecture',
    'tool',
    'nature',
    'token',
  ]
  return categories.includes(value as CollectibleCategory)
    ? (value as CollectibleCategory)
    : 'artifact'
}

function asRarity(value: unknown): Rarity {
  const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'legendary']
  return rarities.includes(value as Rarity) ? (value as Rarity) : 'common'
}

/** Optional tables (passport_visits, child_collectibles) may not exist yet. */
function dataOrEmpty<T>(res: { data: T | null; error: { code?: string } | null }): T {
  if (res.error?.code === 'PGRST205' || res.error?.code === '42P01') {
    return [] as T
  }
  return (res.data ?? []) as T
}

type ProfileRow = {
  id: string
  name: string
  avatar_url: string | null
  age_group: string | null
  language: string | null
  level: number | null
  points: number | null
  xp_points: number | null
  streak_days: number | null
  created_at: string
  total_articles_read: number | null
  total_quizzes_completed: number | null
}

type VisitRow = {
  id: string
  child_id: string
  region_id: string
  region_name: string
  location_id: string
  location_name: string
  visited_at: string
  completed_at: string | null
  completion_percent: number | null
  stamp_image_url: string | null
  stamp_color: string | null
}

type CollectibleJoinRow = {
  quantity: number | null
  last_earned_at: string
  collectible:
    | {
        id: string
        slug: string
        name: string
        description: string | null
        category: string | null
        image_url: string | null
        region_id: string | null
        location_id: string | null
        rarity: string | null
      }
    | {
        id: string
        slug: string
        name: string
        description: string | null
        category: string | null
        image_url: string | null
        region_id: string | null
        location_id: string | null
        rarity: string | null
      }[]
    | null
}

type BadgeJoinRow = {
  awarded_at: string
  badge:
    | {
        id: string
        name: string
        description: string | null
        image_url: string | null
        icon: string | null
      }
    | {
        id: string
        name: string
        description: string | null
        image_url: string | null
        icon: string | null
      }[]
    | null
}

type PathProgressRow = {
  adventure_path_id: string
  completion_percentage: number | null
  created_at: string
  path: { title: string } | { title: string }[] | null
}

// ── Profile mapper ───────────────────────────────────────────
function mapProfile(raw: ProfileRow): ChildPassportProfile {
  return {
    id: raw.id,
    name: raw.name,
    avatarUrl: raw.avatar_url ?? null,
    ageGroup: asAgeGroup(raw.age_group),
    preferredLanguage: asLanguage(raw.language),
    level: raw.level ?? 1,
    totalStars: raw.points ?? raw.xp_points ?? 0,
    currentStreak: raw.streak_days ?? 0,
    journeyStartedAt: raw.created_at,
    favoriteRegionId: null,
    passportNumber: generatePassportNumber(raw.created_at, raw.id),
  }
}

function unwrapJoin<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null
  return Array.isArray(value) ? (value[0] ?? null) : value
}

// ── Main fetcher ─────────────────────────────────────────────
export async function fetchPassportData(childId: string): Promise<PassportData> {
  const [profileRes, visitsRes, collectiblesRes, badgesRes, pathProgressRes] =
    await Promise.all([
      // 1. Child profile
      supabase
        .from('child_profiles')
        .select(
          `
        id, name, avatar_url, age_group, language,
        level, points, xp_points, streak_days,
        created_at, total_articles_read, total_quizzes_completed
      `,
        )
        .eq('id', childId)
        .single(),

      // 2. Passport visits (geographic locations)
      // Table: passport_visits — returns [] if table not deployed yet
      supabase
        .from('passport_visits')
        .select(
          `
        id, child_id,
        region_id, region_name,
        location_id, location_name,
        visited_at, completed_at, completion_percent,
        stamp_image_url, stamp_color
      `,
        )
        .eq('child_id', childId)
        .order('visited_at', { ascending: false })
        .limit(20),

      // 3. Child collectibles joined with definitions
      // Tables: child_collectibles + collectibles
      supabase
        .from('child_collectibles')
        .select(
          `
        id, child_id, collectible_id, quantity,
        first_earned_at, last_earned_at,
        collectible:collectibles (
          id, slug, name, description, category,
          image_url, region_id, location_id, rarity
        )
      `,
        )
        .eq('child_id', childId)
        .order('last_earned_at', { ascending: false })
        .limit(10),

      // 4. Earned badges (child_badges.awarded_at in schema)
      supabase
        .from('child_badges')
        .select(
          `
        id, awarded_at,
        badge:badges ( id, name, description, image_url, icon )
      `,
        )
        .eq('child_profile_id', childId)
        .order('awarded_at', { ascending: false })
        .limit(3),

      // 5. Path progress for summary stats + unlocked regions
      supabase
        .from('path_progress')
        .select(
          `
        adventure_path_id, completion_percentage, created_at,
        path:adventure_paths ( title )
      `,
        )
        .eq('child_profile_id', childId),
    ])

  if (profileRes.error || !profileRes.data) {
    throw new Error(`Could not load child profile: ${profileRes.error?.message}`)
  }
  const child = mapProfile(profileRes.data as ProfileRow)
  const profile = profileRes.data as ProfileRow

  const rawVisits = dataOrEmpty<VisitRow[]>(visitsRes)
  const recentVisits: PassportVisit[] = uniqueByLocation(
    rawVisits.map((v, i) => ({
      id: v.id,
      childId: v.child_id,
      regionId: v.region_id,
      regionName: v.region_name,
      locationId: v.location_id,
      locationName: v.location_name,
      visitedAt: v.visited_at,
      completedAt: v.completed_at ?? null,
      completionPercent: v.completion_percent ?? 0,
      stampImageUrl: v.stamp_image_url ?? null,
      stampColor: asStampColor(v.stamp_color, STAMP_COLORS[i % 4]),
    })),
  ).slice(0, 4)

  const rawColls = dataOrEmpty<CollectibleJoinRow[]>(collectiblesRes)
  const topCollectibles: TopCollectible[] = rawColls
    .map((row) => {
      const def = unwrapJoin(row.collectible)
      if (!def) return null
      return {
        id: def.id,
        slug: def.slug,
        name: def.name,
        description: def.description ?? '',
        category: asCollectibleCategory(def.category),
        imageUrl: def.image_url ?? '',
        regionId: def.region_id ?? null,
        locationId: def.location_id ?? null,
        rarity: asRarity(def.rarity),
        quantity: row.quantity ?? 1,
        earnedAt: row.last_earned_at,
      }
    })
    .filter((item): item is TopCollectible => item !== null)
    .slice(0, 4)

  const rawBadges = (badgesRes.data ?? []) as BadgeJoinRow[]
  if (badgesRes.error) {
    throw new Error(`Could not load badges: ${badgesRes.error.message}`)
  }

  const earnedBadges: EarnedBadge[] = rawBadges
    .map((row) => {
      const badge = unwrapJoin(row.badge)
      if (!badge) return null
      return {
        id: badge.id,
        name: badge.name,
        description: badge.description ?? '',
        imageUrl: badge.image_url ?? badge.icon ?? '',
        earnedAt: row.awarded_at,
      }
    })
    .filter((item): item is EarnedBadge => item !== null)

  const pathRows = (pathProgressRes.data ?? []) as PathProgressRow[]
  if (pathProgressRes.error) {
    throw new Error(`Could not load path progress: ${pathProgressRes.error.message}`)
  }

  const unlockedRegions: UnlockedRegion[] = pathRows.map((p) => ({
    id: p.adventure_path_id,
    name: unwrapJoin(p.path)?.title ?? '',
    completionPercent: Math.round(p.completion_percentage ?? 0),
    firstVisitedAt: p.created_at ?? null,
  }))

  const citiesVisited = recentVisits.length
  const regionsUnlocked = new Set(recentVisits.map((v) => v.regionId)).size

  const summary: PassportSummary = {
    citiesVisited,
    totalCities: 20,
    regionsUnlocked,
    totalRegions: 14,
    storiesCompleted: profile.total_articles_read ?? 0,
    landmarksDiscovered: recentVisits.filter((v) => v.completedAt).length,
    scholarsLearned: 0,
    challengesCompleted: profile.total_quizzes_completed ?? 0,
    collectiblesFound: topCollectibles.length,
    totalCollectibles: 50,
    badgesEarned: earnedBadges.length,
    totalBadges: 20,
    totalStars: child.totalStars,
  }

  return {
    child,
    summary,
    recentVisits,
    topCollectibles,
    earnedBadges,
    unlockedRegions,
  }
}
