import type { MapAnchor, RegionalMapConfig, RegionalMapTheme } from './types'

/** Default regional map config by theme for regions without bespoke art. */
const THEME_DEFAULTS: Record<RegionalMapTheme, Omit<RegionalMapConfig, 'theme'>> = {
  desert: {
    type: 'placeholder',
    visualElements: ['sand dunes', 'desert sky', 'trade paths'],
  },
  river: {
    type: 'placeholder',
    visualElements: ['river', 'fertile banks', 'boats'],
  },
  garden: {
    type: 'placeholder',
    visualElements: ['gardens', 'arches', 'geometric patterns'],
  },
  library: {
    type: 'placeholder',
    visualElements: ['scrolls', 'books', 'rivers'],
  },
  mountain: {
    type: 'placeholder',
    visualElements: ['mountains', 'caravan routes', 'tile patterns'],
  },
  coastal: {
    type: 'placeholder',
    visualElements: ['coastline', 'harbor', 'trade winds'],
  },
  city: {
    type: 'placeholder',
    visualElements: ['city walls', 'minarets', 'markets'],
  },
}

export const REGIONAL_MAP_CONFIGS: Record<string, RegionalMapConfig> = {
  arabia: {
    type: 'placeholder',
    theme: 'desert',
    visualElements: [
      'Arabian Peninsula',
      'desert dunes',
      'mountains',
      'camel routes',
      'Makkah',
      'Madinah',
      'Mount Hira',
      'Badr',
      'Uhud',
    ],
  },
  egypt: {
    type: 'placeholder',
    theme: 'river',
    visualElements: [
      'Nile river',
      'Cairo',
      'Alexandria',
      'Fustat',
      'Sinai',
      'desert',
      'pyramids',
    ],
  },
  andalusia: {
    type: 'placeholder',
    theme: 'garden',
    visualElements: [
      'Iberian Peninsula',
      'Córdoba',
      'Granada',
      'Seville',
      'olive trees',
      'arches',
      'gardens',
      'geometric patterns',
    ],
  },
  iraq: {
    type: 'placeholder',
    theme: 'library',
    visualElements: [
      'Mesopotamia',
      'Baghdad',
      'Basra',
      'Kufa',
      'river paths',
      'House of Wisdom',
      'books',
      'scrolls',
    ],
  },
  'central-asia': {
    type: 'placeholder',
    theme: 'mountain',
    visualElements: [
      'Samarkand',
      'Bukhara',
      'Tashkent',
      'mountains',
      'caravan routes',
      'blue tile patterns',
    ],
  },
  'ash-sham': {
    type: 'placeholder',
    theme: 'garden',
    visualElements: [
      'Jerusalem',
      'Damascus',
      'Gaza',
      'Hebron',
      'olive trees',
      'hills',
      'mosque silhouettes',
      'parchment routes',
    ],
  },
  persia: {
    type: 'placeholder',
    theme: 'mountain',
    visualElements: ['Isfahan', 'Shiraz', 'Nishapur', 'mountains', 'caravan routes', 'tile patterns'],
  },
  'north-africa': {
    type: 'placeholder',
    theme: 'desert',
    visualElements: ['Sahara edge', 'Kairouan', 'Fez', 'Marrakech', 'caravan routes'],
  },
  anatolia: {
    type: 'placeholder',
    theme: 'city',
    visualElements: ['Istanbul', 'Bursa', 'Konya', 'hills', 'mosque silhouettes'],
  },
  balkans: {
    type: 'placeholder',
    theme: 'mountain',
    visualElements: ['Sarajevo', 'Skopje', 'mountain valleys', 'bridges'],
  },
  'indian-subcontinent': {
    type: 'placeholder',
    theme: 'river',
    visualElements: ['Delhi', 'Lahore', 'Agra', 'rivers', 'gardens'],
  },
  'east-africa': {
    type: 'placeholder',
    theme: 'coastal',
    visualElements: ['Mogadishu', 'Zanzibar', 'coastline', 'trade routes'],
  },
  'southeast-asia': {
    type: 'placeholder',
    theme: 'coastal',
    visualElements: ['Aceh', 'Malacca', 'Jakarta', 'islands', 'spice routes'],
  },
  china: {
    type: 'placeholder',
    theme: 'city',
    visualElements: ["Xi'an", 'Silk Road gateway', 'mountains', 'pagodas'],
  },
}

export function regionalMapForSlug(slug: string): RegionalMapConfig {
  return (
    REGIONAL_MAP_CONFIGS[slug] ?? {
      ...THEME_DEFAULTS.desert,
      theme: 'desert',
      visualElements: ['exploration paths', 'landmarks'],
    }
  )
}

/**
 * Location positions on regional illustrations (percentage 0–100).
 * Separate from world-map anchors.
 */
export const REGIONAL_LOCATION_ANCHORS: Record<string, Record<string, { x: number; y: number }>> = {
  arabia: {
    makkah: { x: 48, y: 68 },
    madinah: { x: 43, y: 42 },
    'mount-hira': { x: 51, y: 63 },
    badr: { x: 45, y: 50 },
    uhud: { x: 44, y: 39 },
  },
  egypt: {
    cairo: { x: 58, y: 40 },
    alexandria: { x: 45, y: 24 },
    fustat: { x: 56, y: 44 },
    sinai: { x: 72, y: 45 },
  },
  iraq: {
    baghdad: { x: 52, y: 42 },
    basra: { x: 62, y: 70 },
    kufa: { x: 48, y: 58 },
  },
  andalusia: {
    cordoba: { x: 45, y: 45 },
    granada: { x: 57, y: 62 },
    seville: { x: 35, y: 58 },
  },
  'central-asia': {
    samarkand: { x: 45, y: 42 },
    bukhara: { x: 38, y: 55 },
    tashkent: { x: 58, y: 35 },
  },
  'ash-sham': {
    jerusalem: { x: 46, y: 66 },
    damascus: { x: 55, y: 38 },
    gaza: { x: 40, y: 72 },
    hebron: { x: 47, y: 74 },
  },
  persia: {
    isfahan: { x: 48, y: 52 },
    nishapur: { x: 62, y: 38 },
    shiraz: { x: 42, y: 68 },
  },
  'north-africa': {
    kairouan: { x: 52, y: 45 },
    fez: { x: 35, y: 38 },
    marrakech: { x: 28, y: 58 },
    tunis: { x: 58, y: 32 },
  },
  anatolia: {
    istanbul: { x: 48, y: 28 },
    bursa: { x: 42, y: 48 },
    konya: { x: 58, y: 58 },
  },
  balkans: {
    sarajevo: { x: 48, y: 48 },
    skopje: { x: 58, y: 55 },
  },
  'indian-subcontinent': {
    delhi: { x: 48, y: 38 },
    lahore: { x: 55, y: 32 },
    agra: { x: 52, y: 48 },
  },
  'east-africa': {
    mogadishu: { x: 62, y: 55 },
    zanzibar: { x: 58, y: 68 },
  },
  'southeast-asia': {
    aceh: { x: 38, y: 35 },
    malacca: { x: 48, y: 62 },
    jakarta: { x: 55, y: 72 },
  },
  china: {
    xian: { x: 48, y: 45 },
  },
}

/** Decorative route paths on regional maps (percentage coords). */
export const REGIONAL_ROUTE_PATHS: Record<string, string> = {
  arabia: 'M 45 50 Q 47 58 48 68 M 48 68 Q 46 55 43 42 M 51 63 Q 49 52 44 39',
  egypt: 'M 45 24 Q 52 32 58 40 M 58 40 Q 64 42 72 45',
  iraq: 'M 52 42 Q 50 50 48 58 T 62 70',
  andalusia: 'M 35 58 Q 40 50 45 45 T 57 62',
  'central-asia': 'M 38 55 Q 42 48 45 42 T 58 35',
  'ash-sham': 'M 55 38 Q 50 52 46 66 M 46 66 Q 43 69 40 72',
}

export function regionalAnchorForLocation(
  regionSlug: string,
  locationId: string,
  index: number,
  total: number,
): MapAnchor {
  const preset = REGIONAL_LOCATION_ANCHORS[regionSlug]?.[locationId]
  if (preset) return preset
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 - Math.PI / 2
  const radius = 22
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  }
}
