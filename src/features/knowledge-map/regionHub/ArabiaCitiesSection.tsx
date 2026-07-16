import { Building2, ChevronRight, Lock } from 'lucide-react'
import desertCity from '@/assets/knowledge-map/arabia-hub/arabia-desert-city.png'
import { ARABIA_CITIES, ARABIA_CITIES_EXPLORED } from './arabiaCities'
import { HUB_COLORS } from './regionHubTheme'

export interface ArabiaCitiesSectionProps {
  onSelectLocation?: (locationId: string) => void
}

export default function ArabiaCitiesSection({ onSelectLocation }: ArabiaCitiesSectionProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Explore Cities
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_CITIES_EXPLORED} / {ARABIA_CITIES.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Desert trade towns, sacred cities, and Gulf harbors across the peninsula.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={desertCity}
            alt="Watercolor illustration of a traditional desert city with mud-brick buildings, a minaret, and palm trees"
            className="w-full object-cover"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-2 px-4 pb-4 m-0 list-none">
        {ARABIA_CITIES.map((city) => {
          const playable = Boolean(city.locationId && city.explored)
          const discovered = city.explored && !city.locationId

          if (playable && city.locationId) {
            return (
              <li key={city.id}>
                <button
                  type="button"
                  onClick={() => onSelectLocation?.(city.locationId!)}
                  className="group flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
                  style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${HUB_COLORS.emerald}18`, color: HUB_COLORS.emerald }}
                    aria-hidden
                  >
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                      {city.name}
                    </p>
                    <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                      {city.tagline} · {city.country}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
                    style={{ color: HUB_COLORS.gold }}
                  />
                </button>
              </li>
            )
          }

          if (discovered) {
            return (
              <li
                key={city.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-3"
                style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm"
                  style={{ backgroundColor: `${HUB_COLORS.emerald}18`, color: HUB_COLORS.emerald }}
                  aria-hidden
                >
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                    {city.name}
                  </p>
                  <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                    {city.tagline} · {city.country}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide shrink-0" style={{ color: HUB_COLORS.emerald }}>
                  Visited
                </span>
              </li>
            )
          }

          return (
            <li
              key={city.id}
              className="flex items-center gap-3 rounded-lg border px-3 py-3 opacity-75"
              style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${HUB_COLORS.border}80`, color: HUB_COLORS.textMuted }}
                aria-hidden
              >
                <Lock className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                  {city.name}
                </p>
                <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                  {city.tagline} · {city.country}
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide shrink-0" style={{ color: HUB_COLORS.textMuted }}>
                Soon
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
