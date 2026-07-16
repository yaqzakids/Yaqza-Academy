import type { KnowledgeLocation, KnowledgeLocationInput, MapAnchor } from './types'
import { MUSLIM_MAP_REGION_ANCHORS } from './worldMapLayout'

/**
 * City-pin anchors on muslim-world-map.svg (full world viewBox 1010×666).
 * Derived from WGS84 coordinates via geoToMuslimMapAnchor.
 */
export const MUSLIM_MAP_LOCATION_ANCHORS: Record<string, Record<string, MapAnchor>> = {
  arabia: {
    makkah: { x: 60.1, y: 59.8 },
    madinah: { x: 59.2, y: 57.6 },
    'mount-hira': { x: 60.4, y: 59.4 },
    badr: { x: 58.6, y: 58.8 },
    uhud: { x: 59.6, y: 58.0 },
  },
  egypt: {
    cairo: { x: 55.6, y: 55.5 },
    alexandria: { x: 54.9, y: 55.0 },
    fustat: { x: 55.6, y: 55.6 },
    sinai: { x: 57.0, y: 56.3 },
  },
  iraq: {
    baghdad: { x: 62.5, y: 53.9 },
    kufa: { x: 62.5, y: 54.6 },
    basra: { x: 64.2, y: 55.3 },
  },
  andalusia: {
    cordoba: { x: 36.9, y: 51.7 },
    granada: { x: 37.5, y: 52.0 },
    seville: { x: 36.3, y: 51.9 },
  },
  'ash-sham': {
    jerusalem: { x: 57.7, y: 54.7 },
    damascus: { x: 58.3, y: 53.8 },
    gaza: { x: 57.3, y: 54.8 },
    hebron: { x: 57.6, y: 54.8 },
  },
  anatolia: {
    istanbul: { x: 54.5, y: 50.1 },
    bursa: { x: 54.5, y: 50.5 },
    konya: { x: 56.3, y: 51.7 },
  },
  'central-asia': {
    samarkand: { x: 74.2, y: 50.8 },
    bukhara: { x: 72.9, y: 50.8 },
    tashkent: { x: 75.4, y: 50.0 },
  },
  persia: {
    isfahan: { x: 66.3, y: 54.3 },
    nishapur: { x: 70.0, y: 52.5 },
    shiraz: { x: 66.7, y: 55.8 },
  },
  'north-africa': {
    kairouan: { x: 44.6, y: 52.8 },
    fez: { x: 36.8, y: 53.6 },
    marrakech: { x: 35.2, y: 54.8 },
    tunis: { x: 44.7, y: 52.2 },
  },
  'indian-subcontinent': {
    delhi: { x: 79.5, y: 56.3 },
    lahore: { x: 78.0, y: 54.8 },
    agra: { x: 80.0, y: 57.0 },
  },
  'east-africa': {
    mogadishu: { x: 63.0, y: 69.4 },
    zanzibar: { x: 59.8, y: 73.4 },
  },
  'southeast-asia': {
    aceh: { x: 89.0, y: 67.6 },
    malacca: { x: 92.6, y: 69.3 },
    jakarta: { x: 94.9, y: 73.4 },
  },
  china: {
    xian: { x: 96.0, y: 53.4 },
  },
  balkans: {
    sarajevo: { x: 49.0, y: 48.7 },
    skopje: { x: 50.5, y: 49.7 },
  },
}

export function muslimMapAnchorForLocation(
  regionSlug: string,
  locationId: string,
  index: number,
  total: number,
): MapAnchor {
  const preset = MUSLIM_MAP_LOCATION_ANCHORS[regionSlug]?.[locationId]
  if (preset) return preset
  const region = MUSLIM_MAP_REGION_ANCHORS[regionSlug]
  if (!region) return { x: 50, y: 50 }

  const angle = (index / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2
  const radius = Math.min(3.5, 2 + total * 0.3)
  return {
    x: region.x + Math.cos(angle) * radius,
    y: region.y + Math.sin(angle) * radius,
  }
}

export function withMuslimMapAnchors(
  regionSlug: string,
  locations: KnowledgeLocationInput[],
): KnowledgeLocation[] {
  return locations.map((location, index) => {
    const muslimMapAnchor = muslimMapAnchorForLocation(
      regionSlug,
      location.id,
      index,
      locations.length,
    )
    return {
      ...location,
      muslimMapAnchor,
    }
  })
}

export function routePathForLocations(
  regionSlug: string,
  locations: KnowledgeLocation[],
): string | null {
  if (locations.length < 2) return null
  return locations
    .map((l, i) => {
      const a = muslimMapAnchorForLocation(regionSlug, l.id, i, locations.length)
      return `${i === 0 ? 'M' : 'L'} ${a.x} ${a.y}`
    })
    .join(' ')
}

export const LOCATION_ICONS: Record<string, string> = {
  city: '🏛️',
  landmark: '⛰️',
  battle: '⚔️',
  scholar: '📚',
  mosque: '🕌',
  trade_route: '🐪',
  discovery: '⭐',
}

export function iconForLocation(location: KnowledgeLocation): string {
  const byId: Record<string, string> = {
    makkah: '🕋',
    madinah: '🕌',
    'mount-hira': '⛰',
    badr: '🏕',
    uhud: '⛰',
  }
  if (byId[location.id]) return byId[location.id]
  if (location.type === 'landmark' && location.id.includes('hira')) return '⛰'
  return LOCATION_ICONS[location.type] ?? '📍'
}
