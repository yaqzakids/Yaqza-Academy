import { REGION_COUNTRY_GROUPS } from '../regionCountryGroups'
import type { RegionHubData } from './arabiaRegionHubData'

/** Display names for hub UI (full names for children). */
const COUNTRY_DISPLAY_NAMES: Record<string, string> = {
  uae: 'United Arab Emirates',
}

export interface ArabiaCountry {
  name: string
  slug: string
}

const arabiaGroup = REGION_COUNTRY_GROUPS.arabia

export const ARABIA_COUNTRIES: ArabiaCountry[] = arabiaGroup.countries.map((slug, index) => ({
  slug,
  name: COUNTRY_DISPLAY_NAMES[slug] ?? arabiaGroup.countryLabels[index] ?? slug,
}))

export function arabiaCountriesForHub(): ArabiaCountry[] {
  return ARABIA_COUNTRIES
}

export function syncArabiaCountries(data: RegionHubData): RegionHubData {
  return {
    ...data,
    countries: ARABIA_COUNTRIES.map((c) => c.name),
  }
}
