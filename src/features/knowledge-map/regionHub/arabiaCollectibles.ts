export interface ArabiaCollectible {
  id: string
  name: string
  hint: string
  found: boolean
}

/** Twenty treasures hidden across Arabia — six found so far. */
export const ARABIA_COLLECTIBLES: ArabiaCollectible[] = [
  { id: 'ancient-scroll', name: 'Ancient Scroll', hint: 'Earned in Makkah', found: true },
  { id: 'mosque-badge', name: 'Mosque Badge', hint: 'Earned in Madinah', found: true },
  { id: 'manuscript-fragment', name: 'Manuscript Fragment', hint: 'Found near Mount Hira', found: true },
  { id: 'explorer-compass', name: 'Explorer Compass', hint: 'Discovered at Badr', found: true },
  { id: 'scholar-badge', name: 'Scholar Badge', hint: 'Collected at Uhud', found: true },
  { id: 'caravan-coin', name: 'Caravan Coin', hint: 'Trade routes of the Hijaz', found: true },
  { id: 'desert-rose', name: 'Desert Rose', hint: 'Hidden in the Empty Quarter', found: false },
  { id: 'gulf-pearl', name: 'Pearl of the Gulf', hint: 'Divers off the eastern coast', found: false },
  { id: 'incense-bundle', name: 'Incense Bundle', hint: 'From the mountains of Yemen', found: false },
  { id: 'date-token', name: 'Date Palm Token', hint: 'Oasis gardens of Madinah', found: false },
  { id: 'zamzam-vial', name: 'Zamzam Vial', hint: 'Beside the sacred house', found: false },
  { id: 'camel-bell', name: 'Hijrah Camel Bell', hint: 'Along the road north', found: false },
  { id: 'quraish-seal', name: 'Quraysh Seal', hint: 'Markets of Makkah', found: false },
  { id: 'madinah-jar', name: 'Madinah Date Jar', hint: 'Shared at the first mosque', found: false },
  { id: 'cave-lamp', name: 'Cave Lamp', hint: 'Light on the mountain path', found: false },
  { id: 'badr-banner', name: 'Badr Banner Fragment', hint: 'Valley of the first battle', found: false },
  { id: 'uhud-pebble', name: 'Uhud Pebble', hint: 'Mountain of patience', found: false },
  { id: 'astrolabe-disc', name: 'Astrolabe Disc', hint: 'Scholars of the desert sky', found: false },
  { id: 'gold-dinar', name: 'Gold Dinar', hint: 'Mint of early Islam', found: false },
  { id: 'master-seal', name: 'Master Explorer Seal', hint: 'Complete all Arabia challenges', found: false },
]

export const ARABIA_COLLECTIBLES_FOUND = ARABIA_COLLECTIBLES.filter((c) => c.found).length
