export interface ArabiaCity {
  id: string
  name: string
  country: string
  tagline: string
  /** Knowledge map location id when the city is explorable on the atlas. */
  locationId?: string
  explored: boolean
}

/** Nine cities across the Arabian Peninsula — five explorable on the map so far. */
export const ARABIA_CITIES: ArabiaCity[] = [
  {
    id: 'makkah',
    name: 'Makkah',
    country: 'Saudi Arabia',
    tagline: 'The sacred city of the Ka‘bah',
    locationId: 'makkah',
    explored: true,
  },
  {
    id: 'madinah',
    name: 'Madinah',
    country: 'Saudi Arabia',
    tagline: 'The illuminated city of the Prophet ﷺ',
    locationId: 'madinah',
    explored: true,
  },
  {
    id: 'taif',
    name: 'Ta’if',
    country: 'Saudi Arabia',
    tagline: 'Mountain gardens above the Hijaz',
    explored: true,
  },
  {
    id: 'aden',
    name: 'Aden',
    country: 'Yemen',
    tagline: 'Ancient port at the crossroads of trade',
    explored: true,
  },
  {
    id: 'sanaa',
    name: 'Sana’a',
    country: 'Yemen',
    tagline: 'City of tall mud-brick towers',
    explored: false,
  },
  {
    id: 'muscat',
    name: 'Muscat',
    country: 'Oman',
    tagline: 'Harbor gates between sea and mountains',
    explored: true,
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    tagline: 'Pearl-diving creek and desert routes',
    explored: false,
  },
  {
    id: 'doha',
    name: 'Doha',
    country: 'Qatar',
    tagline: 'Coastal market on the Persian Gulf',
    explored: false,
  },
  {
    id: 'kuwait-city',
    name: 'Kuwait City',
    country: 'Kuwait',
    tagline: 'Desert edge and Gulf trade winds',
    explored: false,
  },
]

export const ARABIA_CITIES_EXPLORED = ARABIA_CITIES.filter((c) => c.explored).length
