import { REGION_COUNTRY_GROUPS } from '../regionCountryGroups'

export type RegionHubCardType =
  | 'countries'
  | 'cities'
  | 'landmarks'
  | 'great-muslims'
  | 'stories'
  | 'timeline'
  | 'challenges'
  | 'collectibles'

export type RegionHubTab = RegionHubCardType | 'overview'

export interface RegionHubOverviewCard {
  title: string
  subtitle: string
  type: RegionHubCardType
}

export interface RegionHubProgress {
  percent: number
  cities: string
  stories: string
  greatMuslims: string
  landmarks: string
  collectibles: string
}

export interface RegionHubData {
  id: string
  name: string
  subtitle: string
  description: string
  countries: string[]
  progress: RegionHubProgress
  overviewCards: RegionHubOverviewCard[]
}

const arabiaCountryNames = REGION_COUNTRY_GROUPS.arabia.countryLabels.map((label, i) => {
  const slug = REGION_COUNTRY_GROUPS.arabia.countries[i]
  return slug === 'uae' ? 'United Arab Emirates' : label
})

export const arabiaRegion: RegionHubData = {
  id: 'arabia',
  name: 'Arabia',
  subtitle: 'The Heart of Islam',
  description: 'Deserts, trade routes, revelation, and the birth of the Muslim Ummah.',
  countries: arabiaCountryNames,
  progress: {
    percent: 62,
    cities: '5 / 9',
    stories: '11 / 38',
    greatMuslims: '8 / 27',
    landmarks: '4 / 12',
    collectibles: '6 / 20',
  },
  overviewCards: [
    { title: 'Countries Included', subtitle: '7 countries', type: 'countries' },
    { title: 'Explore Cities', subtitle: '9 cities', type: 'cities' },
    { title: 'Great Landmarks', subtitle: '12 landmarks', type: 'landmarks' },
    { title: 'Great Scholars', subtitle: '27 scholars', type: 'great-muslims' },
    { title: 'Stories of Arabia', subtitle: '38 stories', type: 'stories' },
    { title: 'Timeline', subtitle: 'Key events', type: 'timeline' },
    { title: 'Explorer Challenges', subtitle: '5 challenges', type: 'challenges' },
    { title: 'Collectibles', subtitle: '20 collectibles', type: 'collectibles' },
  ],
}

export const REGION_HUB_TABS: { id: RegionHubTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'countries', label: 'Countries' },
  { id: 'cities', label: 'Cities' },
  { id: 'landmarks', label: 'Landmarks' },
  { id: 'great-muslims', label: 'Great Muslims' },
  { id: 'stories', label: 'Stories' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'collectibles', label: 'Collectibles' },
]
