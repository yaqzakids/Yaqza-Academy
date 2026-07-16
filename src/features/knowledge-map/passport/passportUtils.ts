import { getLevelProgress } from '@/lib/adventure/levels'
import type { KnowledgePassport } from '../types'

export type StampColor = 'green' | 'blue' | 'rust' | 'brown'

const STAMP_COLORS: StampColor[] = ['green', 'blue', 'rust', 'brown']

export function stampColorForIndex(index: number): StampColor {
  return STAMP_COLORS[index % STAMP_COLORS.length]
}

export function formatPassportDate(value?: string | null): string {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatStampDate(value?: string | null): string {
  if (!value) return '—'
  const d = new Date(value)
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

export function travelerLevel(totalStars: number): string {
  return getLevelProgress(totalStars).currentLevel
}

export function explorerIdForChild(childId: string): string {
  const year = new Date().getFullYear()
  const suffix = childId.replace(/-/g, '').slice(0, 6).toUpperCase()
  return `YK-${year}-${suffix}`
}

const AGE_GROUP_LABELS: Record<string, string> = {
  explorer: 'Explorer',
  discoverer: 'Discoverer',
  thinker: 'Thinker',
}

export function learningPathLabel(ageGroup?: string | null): string {
  if (!ageGroup) return 'Explorer'
  return AGE_GROUP_LABELS[ageGroup] ?? 'Explorer'
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  fr: 'French',
  ar: 'Arabic',
}

export function homeLanguageLabel(language?: string | null): string {
  if (!language) return 'English'
  return LANGUAGE_LABELS[language] ?? language
}

export function buildSeedCompletionDates(
  locations: { id: string; completed: boolean }[],
): Record<string, string> {
  const seed: Record<string, string> = {}
  let day = 12
  locations
    .filter((l) => l.completed)
    .forEach((l) => {
      seed[l.id] = new Date(2024, 4, day).toISOString()
      day += 3
    })
  return seed
}

export function roundStat(value: number): number {
  return Math.round(value)
}

export function stampMotifForLocation(locationId: string): 'mosque' | 'minaret' | 'dome' | 'mountain' | 'trade' | 'library' {
  const map: Record<string, ReturnType<typeof stampMotifForLocation>> = {
    makkah: 'mosque',
    madinah: 'minaret',
    kufa: 'mosque',
    basra: 'trade',
    baghdad: 'library',
    sinai: 'mountain',
    cairo: 'dome',
    jerusalem: 'dome',
    cordoba: 'mosque',
    delhi: 'minaret',
  }
  return map[locationId] ?? 'dome'
}

export function passportStatsFrom(passport: KnowledgePassport) {
  return [
    { key: 'cities', label: 'Cities Visited', value: `${passport.citiesVisited} / ${passport.totalCities}`, icon: '🏙️' },
    { key: 'regions', label: 'Regions Unlocked', value: `${passport.regionsUnlocked} / ${passport.totalRegions}`, icon: '🗺️' },
    { key: 'collectibles', label: 'Collectibles Found', value: `${passport.collectiblesFound} / ${passport.totalCollectibles}`, icon: '📦' },
    { key: 'badges', label: 'Badges Earned', value: `${passport.badgesEarned} / ${passport.totalBadges}`, icon: '🛡️' },
  ] as const
}
