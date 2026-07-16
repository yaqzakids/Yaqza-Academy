export interface ArabiaStory {
  id: string
  title: string
  theme: string
  teaser: string
  locationId?: string
  read: boolean
}

/** Thirty-eight tales of Arabia — eleven read so far. */
export const ARABIA_STORIES: ArabiaStory[] = [
  { id: 'year-elephant', title: 'The Year of the Elephant', theme: 'History', teaser: 'When Abraha marched toward the Ka‘bah', read: true },
  { id: 'caravan-routes', title: 'Caravans Across the Desert', theme: 'Trade', teaser: 'How merchants crossed the sands', read: true },
  { id: 'zamzam-legend', title: 'The Blessing of Zamzam', theme: 'Makkah', teaser: 'Water that appeared in a dry valley', read: true },
  { id: 'cave-of-hira', title: 'Nights in the Cave', theme: 'Seerah', teaser: 'A quiet mountain above Makkah', locationId: 'mount-hira', read: true },
  { id: 'first-revelation', title: 'The First Revelation', theme: 'Seerah', teaser: '“Read in the name of your Lord”', locationId: 'mount-hira', read: true },
  { id: 'early-makkah', title: 'The Message in Makkah', theme: 'Seerah', teaser: 'A small group gathers in secret', locationId: 'makkah', read: true },
  { id: 'pact-aqabah', title: 'The Pledge of Aqabah', theme: 'Seerah', teaser: 'The Ansar welcome the believers', read: true },
  { id: 'hijrah', title: 'The Journey to Madinah', theme: 'Seerah', teaser: 'A migration that changed history', locationId: 'madinah', read: true },
  { id: 'quba-mosque', title: 'The First Mosque', theme: 'Madinah', teaser: 'Prayer under the open sky at Quba', read: true },
  { id: 'battle-badr', title: 'Faith at Badr', theme: 'Seerah', teaser: 'A small army trusts in Allah', locationId: 'badr', read: true },
  { id: 'patience-uhud', title: 'Lessons from Uhud', theme: 'Seerah', teaser: 'Patience after a hard day', locationId: 'uhud', read: true },
  { id: 'trench', title: 'The Trench of Madinah', theme: 'Seerah', teaser: 'Digging together to defend the city', read: false },
  { id: 'hudaybiyyah', title: 'The Treaty of Hudaybiyyah', theme: 'Seerah', teaser: 'Peace before a great victory', read: false },
  { id: 'conquest-makkah', title: 'The Opening of Makkah', theme: 'Seerah', teaser: 'Mercy at the gates of the city', locationId: 'makkah', read: false },
  { id: 'farewell-pilgrimage', title: 'The Farewell Pilgrimage', theme: 'Seerah', teaser: 'Lessons spoken at Arafat', read: false },
  { id: 'incense-road', title: 'The Incense Road', theme: 'Trade', teaser: 'Frankincense from the south', read: false },
  { id: 'spice-ships', title: 'Spice Ships of Aden', theme: 'Trade', teaser: 'Harbor winds and distant markets', read: false },
  { id: 'desert-stars', title: 'Stars Over the Empty Quarter', theme: 'Desert', teaser: 'How travelers found their way', read: false },
  { id: 'oasis-rest', title: 'Rest at the Oasis', theme: 'Desert', teaser: 'Palms, water, and shared bread', read: false },
  { id: 'camel-caravan', title: 'The Camel Caravan', theme: 'Trade', teaser: 'Ships of the desert carry goods north', read: false },
  { id: 'poets-market', title: 'Poets at the Market', theme: 'Culture', teaser: 'Words hung on the cloth of a tent', read: false },
  { id: 'justice-umar', title: 'A Night Walk for Justice', theme: 'Khulafa', teaser: 'A caliph listens in the dark streets', read: false },
  { id: 'quran-collection', title: 'Gathering the Qur’an', theme: 'Khulafa', teaser: 'Pages brought together in one book', read: false },
  { id: 'bilal-adhan', title: 'The First Adhan', theme: 'Community', teaser: 'A voice rises above Madinah', read: false },
  { id: 'brotherhood', title: 'Brothers of Madinah', theme: 'Community', teaser: 'Muhajirun and Ansar share homes', read: false },
  { id: 'date-harvest', title: 'The Date Harvest', theme: 'Madinah', teaser: 'Sweet fruit from the oasis gardens', read: false },
  { id: 'mount-arafat', title: 'Standing at Arafat', theme: 'Hajj', teaser: 'A plain where hearts turn to Allah', read: false },
  { id: 'mina-pebbles', title: 'The Valley of Mina', theme: 'Hajj', teaser: 'Stones and remembrance on the journey', read: false },
  { id: 'red-sea-crossing', title: 'Crossing the Red Sea', theme: 'Trade', teaser: 'Goods flow between Africa and Arabia', read: false },
  { id: 'muscat-harbor', title: 'Harbor Lights of Muscat', theme: 'Trade', teaser: 'Dhows sail the Gulf at dawn', read: false },
  { id: 'sanaa-towers', title: 'Towers of Sana’a', theme: 'History', teaser: 'Mud-brick skyscrapers in the highlands', read: false },
  { id: 'najd-winds', title: 'Winds of the Najd', theme: 'Desert', teaser: 'Sand, silence, and endurance', read: false },
  { id: 'well-bir-maw', title: 'Wells Along the Way', theme: 'Desert', teaser: 'Where caravans stopped to drink', read: false },
  { id: 'letter-kisra', title: 'A Letter to the Emperor', theme: 'History', teaser: 'An invitation carried across empires', read: false },
  { id: 'market-ukaz', title: 'The Fair of Ukaz', theme: 'Culture', teaser: 'Poetry and trade in one gathering', read: false },
  { id: 'hira-moon', title: 'Moonlight on Jabal al-Nur', theme: 'Seerah', teaser: 'A mountain lit by quiet nights', read: false },
  { id: 'madinah-charter', title: 'The Charter of Madinah', theme: 'Community', teaser: 'Neighbors agree to live in peace', read: false },
  { id: 'scroll-keepers', title: 'Keepers of the Scroll', theme: 'Scholarship', teaser: 'Scribes who wrote what they heard', read: false },
]

export const ARABIA_STORIES_READ = ARABIA_STORIES.filter((s) => s.read).length
