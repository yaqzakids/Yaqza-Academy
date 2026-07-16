/** Historical region groupings — country ids match muslim-world-map.svg path ids. */
export interface RegionCountryGroup {
  slug: string
  label: string
  countries: string[]
  countryLabels: string[]
  /** Countries listed in design spec but absent as separate SVG paths. */
  needsPathSeparation?: string[]
}

export const REGION_COUNTRY_GROUPS: Record<string, RegionCountryGroup> = {
  maghreb: {
    slug: 'north-africa',
    label: 'Maghreb',
    countries: ['morocco', 'western-sahara', 'algeria', 'tunisia', 'libya', 'mauritania'],
    countryLabels: ['Morocco', 'Algeria', 'Tunisia', 'Libya', 'Mauritania'],
  },
  ashSham: {
    slug: 'ash-sham',
    label: 'Ash-Sham',
    countries: ['syria', 'jordan', 'lebanon', 'palestine', 'palestine-interior'],
    countryLabels: ['Syria', 'Jordan', 'Lebanon', 'Palestine'],
  },
  arabia: {
    slug: 'arabia',
    label: 'Arabia',
    countries: ['saudi-arabia', 'yemen', 'oman', 'uae', 'qatar', 'bahrain', 'kuwait'],
    countryLabels: ['Saudi Arabia', 'Yemen', 'Oman', 'UAE', 'Qatar', 'Bahrain', 'Kuwait'],
  },
  egypt: {
    slug: 'egypt',
    label: 'Egypt',
    countries: ['egypt'],
    countryLabels: ['Egypt'],
  },
  iraq: {
    slug: 'iraq',
    label: 'Iraq',
    countries: ['iraq'],
    countryLabels: ['Iraq'],
  },
  persia: {
    slug: 'persia',
    label: 'Persia',
    countries: ['iran'],
    countryLabels: ['Iran'],
  },
  anatolia: {
    slug: 'anatolia',
    label: 'Anatolia',
    countries: ['turkey'],
    countryLabels: ['Türkiye'],
  },
  alAndalus: {
    slug: 'andalusia',
    label: 'Al-Andalus',
    countries: ['spain', 'portugal'],
    countryLabels: ['Spain', 'Portugal'],
  },
  balkans: {
    slug: 'balkans',
    label: 'Balkans',
    countries: [
      'bosnia-herzegovina',
      'albania',
      'north-macedonia',
      'montenegro',
      'serbia',
      'greece',
      'bulgaria',
    ],
    countryLabels: [
      'Bosnia and Herzegovina',
      'Albania',
      'North Macedonia',
      'Montenegro',
      'Serbia',
      'Greece',
      'Bulgaria',
    ],
    needsPathSeparation: ['kosovo'],
  },
  centralAsia: {
    slug: 'central-asia',
    label: 'Central Asia',
    countries: ['afghanistan', 'uzbekistan', 'kazakhstan', 'kyrgyzstan', 'tajikistan', 'turkmenistan'],
    countryLabels: ['Afghanistan', 'Uzbekistan', 'Kazakhstan', 'Kyrgyzstan', 'Tajikistan', 'Turkmenistan'],
  },
  indianSubcontinent: {
    slug: 'indian-subcontinent',
    label: 'Indian Subcontinent',
    countries: ['india', 'pakistan', 'bangladesh'],
    countryLabels: ['India', 'Pakistan', 'Bangladesh'],
  },
  eastAfrica: {
    slug: 'east-africa',
    label: 'East Africa',
    countries: ['somalia', 'djibouti', 'eritrea', 'kenya', 'tanzania', 'sudan'],
    countryLabels: ['Somalia', 'Djibouti', 'Eritrea', 'Kenya', 'Tanzania', 'Sudan'],
  },
  southeastAsia: {
    slug: 'southeast-asia',
    label: 'Southeast Asia',
    countries: ['malaysia', 'indonesia', 'brunei', 'thailand'],
    countryLabels: ['Malaysia', 'Indonesia', 'Brunei', 'Thailand'],
    needsPathSeparation: ['southern-thailand'],
  },
  china: {
    slug: 'china',
    label: 'China',
    countries: ['china'],
    countryLabels: ['China'],
  },
}

export const LOCKED_REGION_HOVER_MESSAGE = 'Complete Arabia and Iraq to unlock.'

/** Palestine is one territory across two SVG paths; both belong to Ash-Sham. */
export const PALESTINE_PATH_IDS = ['palestine', 'palestine-interior'] as const

/** Paths drawn as one territory — no stroke on shared internal borders (Palestine only). */
export const UNIFIED_TERRITORY_PATHS = new Set<string>(PALESTINE_PATH_IDS)

export function normalizeCountryId(id: string): string {
  return id.toLowerCase().trim()
}

export function buildCountryToRegionMap(): Map<string, string> {
  const map = new Map<string, string>()
  for (const group of Object.values(REGION_COUNTRY_GROUPS)) {
    for (const countryId of group.countries) {
      if (!map.has(countryId)) map.set(countryId, group.slug)
    }
  }
  return map
}

export const COUNTRY_TO_REGION = buildCountryToRegionMap()

export function regionGroupForSlug(regionSlug: string): RegionCountryGroup | undefined {
  return Object.values(REGION_COUNTRY_GROUPS).find((g) => g.slug === regionSlug)
}

export function countriesForRegionSlug(regionSlug: string): string[] {
  return regionGroupForSlug(regionSlug)?.countries ?? []
}
