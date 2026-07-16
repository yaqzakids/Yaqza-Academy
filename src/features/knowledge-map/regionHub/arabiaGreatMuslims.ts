export interface ArabiaGreatMuslim {
  id: string
  name: string
  role: string
  era: string
  explored: boolean
}

/**
 * Scholars, companions, and builders connected to Arabia.
 * List uses text only — no individual portraits (Islamic visual guidelines).
 */
export const ARABIA_GREAT_MUSLIMS: ArabiaGreatMuslim[] = [
  { id: 'khadijah', name: 'Khadijah bint Khuwaylid', role: 'Beloved supporter of the early message', era: 'Seerah Era', explored: true },
  { id: 'abu-bakr', name: 'Abu Bakr as-Siddiq', role: 'First Caliph and close companion', era: 'Seerah Era', explored: true },
  { id: 'umar', name: 'Umar ibn al-Khattab', role: 'Second Caliph, leader of justice', era: 'Khulafa Rashidun', explored: true },
  { id: 'uthman', name: 'Uthman ibn Affan', role: 'Third Caliph, keeper of the Qur’an', era: 'Khulafa Rashidun', explored: true },
  { id: 'ali', name: 'Ali ibn Abi Talib', role: 'Fourth Caliph, scholar of Madinah', era: 'Khulafa Rashidun', explored: true },
  { id: 'bilal', name: 'Bilal ibn Rabah', role: 'First mu’adhdhin of Islam', era: 'Seerah Era', explored: true },
  { id: 'salman', name: 'Salman al-Farsi', role: 'Seeker of truth from distant lands', era: 'Seerah Era', explored: true },
  { id: 'abu-hurayrah', name: 'Abu Hurayrah', role: 'Preserver of prophetic teachings', era: 'Seerah Era', explored: true },
  { id: 'zayd', name: 'Zayd ibn Thabit', role: 'Scribe of revelation', era: 'Seerah Era', explored: false },
  { id: 'ibn-masud', name: 'Abdullah ibn Mas‘ud', role: 'Teacher of Qur’an in Makkah', era: 'Seerah Era', explored: false },
  { id: 'aisha', name: 'Aisha bint Abi Bakr', role: 'Scholar and narrator of hadith', era: 'Seerah Era', explored: false },
  { id: 'fatimah', name: 'Fatimah bint Muhammad', role: 'Daughter of the Prophet ﷺ', era: 'Seerah Era', explored: false },
  { id: 'khalid', name: 'Khalid ibn al-Walid', role: 'Strategist of the early community', era: 'Khulafa Rashidun', explored: false },
  { id: 'amr', name: 'Amr ibn al-As', role: 'Diplomat and governor', era: 'Khulafa Rashidun', explored: false },
  { id: 'muadh', name: 'Mu‘adh ibn Jabal', role: 'Judge and teacher sent to Yemen', era: 'Seerah Era', explored: false },
  { id: 'abdullah-rawahah', name: 'Abdullah ibn Rawahah', role: 'Poet and companion of Madinah', era: 'Seerah Era', explored: false },
  { id: 'jabir', name: 'Jabir ibn Abdullah', role: 'Narrator of Madinah’s stories', era: 'Seerah Era', explored: false },
  { id: 'anas', name: 'Anas ibn Malik', role: 'Long-serving companion in Madinah', era: 'Seerah Era', explored: false },
  { id: 'hassan', name: 'Hassan ibn Thabit', role: 'Poet who defended the message', era: 'Seerah Era', explored: false },
  { id: 'najashi', name: 'Ashama ibn Abjar', role: 'Just ruler who sheltered the Muslims', era: 'Seerah Era', explored: false },
  { id: 'imam-malik', name: 'Imam Malik', role: 'Founder of the Maliki school in Madinah', era: 'Abbasid', explored: false },
  { id: 'imam-shafii', name: 'Imam ash-Shafi‘i', role: 'Scholar who studied in Makkah', era: 'Abbasid', explored: false },
  { id: 'imam-ahmad', name: 'Imam Ahmad ibn Hanbal', role: 'Collector of hadith traditions', era: 'Abbasid', explored: false },
  { id: 'rabia', name: 'Rabi‘a al-Adawiyya', role: 'Early woman of devotion from Basra', era: 'Abbasid', explored: false },
  { id: 'kindi', name: 'Al-Kindi', role: 'Philosopher of the Abbasid age', era: 'Abbasid', explored: false },
  { id: 'jahiz', name: 'Al-Jahiz', role: 'Writer from the Gulf of knowledge', era: 'Abbasid', explored: false },
  { id: 'tabari', name: 'At-Tabari', role: 'Historian of the Muslim world', era: 'Abbasid', explored: false },
]

export const ARABIA_GREAT_MUSLIMS_EXPLORED = ARABIA_GREAT_MUSLIMS.filter((f) => f.explored).length
