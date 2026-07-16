export interface ArabiaTimelineEvent {
  id: string
  year: string
  title: string
  summary: string
  locationId?: string
  unlocked: boolean
}

/** Key moments from pre-Islamic Arabia through the early Muslim community. */
export const ARABIA_TIMELINE: ArabiaTimelineEvent[] = [
  {
    id: 'trade-routes',
    year: 'Ancient',
    title: 'Caravan Routes Cross the Desert',
    summary: 'Merchants link Arabia to Africa, Persia, and the Mediterranean.',
    unlocked: true,
  },
  {
    id: 'year-elephant',
    year: '570 CE',
    title: 'The Year of the Elephant',
    summary: 'Abraha’s army marches toward Makkah and is turned back.',
    unlocked: true,
  },
  {
    id: 'first-revelation',
    year: '610 CE',
    title: 'The First Revelation',
    summary: 'The message begins in the quiet of Cave Hira.',
    locationId: 'mount-hira',
    unlocked: true,
  },
  {
    id: 'public-preaching',
    year: '613 CE',
    title: 'The Message Spreads in Makkah',
    summary: 'A small community gathers around the call to One God.',
    locationId: 'makkah',
    unlocked: true,
  },
  {
    id: 'aqabah',
    year: '621 CE',
    title: 'The Pledge of Aqabah',
    summary: 'The people of Madinah invite the believers to safety.',
    unlocked: true,
  },
  {
    id: 'hijrah',
    year: '622 CE',
    title: 'The Hijrah to Madinah',
    summary: 'A migration that plants the first Muslim community.',
    locationId: 'madinah',
    unlocked: true,
  },
  {
    id: 'badr',
    year: '624 CE',
    title: 'The Battle of Badr',
    summary: 'Faith and courage at a desert valley.',
    locationId: 'badr',
    unlocked: true,
  },
  {
    id: 'uhud',
    year: '625 CE',
    title: 'The Battle of Uhud',
    summary: 'Lessons in patience near the mountains of Madinah.',
    locationId: 'uhud',
    unlocked: true,
  },
  {
    id: 'trench',
    year: '627 CE',
    title: 'The Battle of the Trench',
    summary: 'Madinah is defended by a dug barrier and unity.',
    unlocked: false,
  },
  {
    id: 'hudaybiyyah',
    year: '628 CE',
    title: 'The Treaty of Hudaybiyyah',
    summary: 'A peace agreement that opens the door to greater victory.',
    unlocked: false,
  },
  {
    id: 'makkah-opening',
    year: '630 CE',
    title: 'The Opening of Makkah',
    summary: 'The city welcomes the message with mercy.',
    locationId: 'makkah',
    unlocked: false,
  },
  {
    id: 'farewell',
    year: '632 CE',
    title: 'The Farewell Pilgrimage',
    summary: 'Final lessons shared at the plain of Arafat.',
    unlocked: false,
  },
]

export const ARABIA_TIMELINE_UNLOCKED = ARABIA_TIMELINE.filter((e) => e.unlocked).length
