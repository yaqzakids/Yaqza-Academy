import type { KnowledgeRegion, MapAnchor } from './types'
import { CAMERA_REGION_ZOOM } from './mapCamera'

/** Regions shown on the focused Muslim World Map. */
export const MUSLIM_WORLD_REGION_SLUGS = new Set([
  'andalusia',
  'north-africa',
  'egypt',
  'ash-sham',
  'arabia',
  'iraq',
  'persia',
  'anatolia',
  'central-asia',
  'indian-subcontinent',
  'east-africa',
  'southeast-asia',
  'china',
  'balkans',
])

/**
 * Region pin positions on the full-world SVG map (viewBox 1010×666).
 * Calibrated from country-path centroids on muslim-world-map.svg.
 */
export const MUSLIM_MAP_REGION_ANCHORS: Record<string, MapAnchor> = {
  andalusia: { x: 43.3, y: 53.3 },
  'north-africa': { x: 48.1, y: 57.9 },
  egypt: { x: 55.6, y: 57.8 },
  'ash-sham': { x: 57.7, y: 54.7 },
  arabia: { x: 60.1, y: 59.8 },
  iraq: { x: 59.2, y: 54.7 },
  persia: { x: 61.9, y: 55.0 },
  anatolia: { x: 56.8, y: 51.7 },
  'central-asia': { x: 65.6, y: 49.1 },
  'indian-subcontinent': { x: 69.0, y: 59.7 },
  'east-africa': { x: 57.2, y: 67.2 },
  'southeast-asia': { x: 79.8, y: 67.4 },
  china: { x: 76.0, y: 52.3 },
  balkans: { x: 53.2, y: 50.8 },
}

/** Optional per-region camera zoom override (defaults to status-based zoom). */
export const REGION_CAMERA_ZOOM: Partial<Record<string, number>> = {
  arabia: 3.35,
}

export function zoomForRegion(slug: string, status?: 'locked' | 'in_progress' | 'completed'): number {
  if (REGION_CAMERA_ZOOM[slug] !== undefined) return REGION_CAMERA_ZOOM[slug]!
  if (status) return status === 'locked' ? 2.2 : 2.6
  return CAMERA_REGION_ZOOM
}

export function muslimMapAnchorForRegion(slug: string): MapAnchor {
  return MUSLIM_MAP_REGION_ANCHORS[slug] ?? { x: 50, y: 50 }
}

export function isMuslimWorldRegion(slug: string): boolean {
  return MUSLIM_WORLD_REGION_SLUGS.has(slug)
}

/** Regions unlocked at the start of the adventure path. */
export const STARTING_UNLOCKED_REGIONS = new Set(['arabia', 'egypt', 'iraq'])

/** Fog coverage scale per locked region (larger = more hidden). */
export const REGION_FOG_SCALE: Partial<Record<string, number>> = {
  andalusia: 1.3,
  'north-africa': 1.2,
  'ash-sham': 1.15,
  persia: 1.25,
  anatolia: 1.2,
  balkans: 1.15,
  'central-asia': 1.4,
  'indian-subcontinent': 1.35,
  'east-africa': 1.3,
  'southeast-asia': 1.4,
  china: 1.35,
}

export function fogScaleForRegion(slug: string): number {
  return REGION_FOG_SCALE[slug] ?? 1.15
}

export function applyStartingProgression(regions: KnowledgeRegion[]): KnowledgeRegion[] {
  return regions.map((region) => {
    if (STARTING_UNLOCKED_REGIONS.has(region.slug)) return region
    return {
      ...region,
      status: 'locked',
      completedLocations: 0,
      locations: region.locations.map((l) => ({ ...l, locked: true, completed: false })),
    }
  })
}
