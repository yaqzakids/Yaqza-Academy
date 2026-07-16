import { MapPin } from 'lucide-react'
import peninsulaMap from '@/assets/knowledge-map/arabia-hub/arabia-peninsula-map.png'
import { ARABIA_COUNTRIES } from './arabiaCountries'
import { HUB_COLORS } from './regionHubTheme'

export default function ArabiaCountriesSection() {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
          Countries Included
        </h3>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Seven countries make up the Arabian Peninsula on the Atlas map.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={peninsulaMap}
            alt="Map of the Arabian Peninsula showing Saudi Arabia, Yemen, Oman, UAE, Qatar, Bahrain, and Kuwait highlighted in green"
            className="w-full object-cover"
          />
        </div>
        <p className="text-[11px] font-semibold text-center mt-2 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Highlighted in green on the Knowledge Map
        </p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 px-4 pb-4 m-0 p-0 list-none">
        {ARABIA_COUNTRIES.map((country) => (
          <li
            key={country.slug}
            className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm font-semibold"
            style={{ borderColor: HUB_COLORS.border, color: HUB_COLORS.navy, backgroundColor: HUB_COLORS.parchment }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${HUB_COLORS.emerald}18`, color: HUB_COLORS.emerald }}
              aria-hidden
            >
              <MapPin className="h-3.5 w-3.5" />
            </span>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
