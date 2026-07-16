export interface ArabiaLandmark {
  id: string
  name: string
  place: string
  tagline: string
  /** Knowledge map location id when explorable on the atlas. */
  locationId?: string
  explored: boolean
}

/** Twelve sacred sites and historic landmarks — four explorable on the map so far. */
export const ARABIA_LANDMARKS: ArabiaLandmark[] = [
  {
    id: 'kabah',
    name: 'The Ka‘bah',
    place: 'Makkah',
    tagline: 'The sacred house at the heart of Islam',
    locationId: 'makkah',
    explored: true,
  },
  {
    id: 'masjid-nabawi',
    name: 'Masjid an-Nabawi',
    place: 'Madinah',
    tagline: 'The Prophet’s Mosque and its green dome',
    locationId: 'madinah',
    explored: true,
  },
  {
    id: 'cave-hira',
    name: 'Cave of Hira',
    place: 'Jabal al-Nur',
    tagline: 'A quiet cave where the first revelation came',
    locationId: 'mount-hira',
    explored: true,
  },
  {
    id: 'mount-uhud',
    name: 'Mount Uhud',
    place: 'Madinah',
    tagline: 'A mountain of patience and trust',
    locationId: 'uhud',
    explored: true,
  },
  {
    id: 'quba',
    name: 'Masjid Quba',
    place: 'Madinah',
    tagline: 'The first mosque built in Islam',
    explored: false,
  },
  {
    id: 'qiblatayn',
    name: 'Masjid al-Qiblatayn',
    place: 'Madinah',
    tagline: 'Where the qiblah turned toward Makkah',
    explored: false,
  },
  {
    id: 'jabal-thawr',
    name: 'Cave of Thawr',
    place: 'Jabal Thawr',
    tagline: 'A refuge on the journey to Madinah',
    explored: false,
  },
  {
    id: 'zamzam',
    name: 'Well of Zamzam',
    place: 'Makkah',
    tagline: 'Blessed water beside the Ka‘bah',
    explored: false,
  },
  {
    id: 'baqi',
    name: 'Al-Baqi‘',
    place: 'Madinah',
    tagline: 'A garden of remembrance near the Prophet’s Mosque',
    explored: false,
  },
  {
    id: 'hijr-ismail',
    name: 'Hijr Isma‘il',
    place: 'Makkah',
    tagline: 'A sacred boundary within the Haram',
    explored: false,
  },
  {
    id: 'mount-arafat',
    name: 'Mount Arafat',
    place: 'Makkah',
    tagline: 'The plain of standing on the Hajj journey',
    explored: false,
  },
  {
    id: 'badr',
    name: 'Battlefield of Badr',
    place: 'Badr',
    tagline: 'A valley where faith and courage met',
    locationId: 'badr',
    explored: false,
  },
]

export const ARABIA_LANDMARKS_EXPLORED = ARABIA_LANDMARKS.filter((l) => l.explored).length
