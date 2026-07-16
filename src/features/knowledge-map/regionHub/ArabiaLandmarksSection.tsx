import { ChevronRight, Landmark, Lock } from 'lucide-react'
import greenDome from '@/assets/knowledge-map/arabia-hub/arabia-green-dome.png'
import { ARABIA_LANDMARKS, ARABIA_LANDMARKS_EXPLORED } from './arabiaLandmarks'
import { HUB_COLORS } from './regionHubTheme'

export interface ArabiaLandmarksSectionProps {
  onSelectLocation?: (locationId: string) => void
}

export default function ArabiaLandmarksSection({ onSelectLocation }: ArabiaLandmarksSectionProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Great Landmarks
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_LANDMARKS_EXPLORED} / {ARABIA_LANDMARKS.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Sacred mosques, mountain caves, and historic valleys across Arabia.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={greenDome}
            alt="Watercolor illustration of Masjid an-Nabawi in Madinah with its green dome and minarets"
            className="w-full object-cover"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-2 px-4 pb-4 m-0 list-none">
        {ARABIA_LANDMARKS.map((landmark) => {
          const playable = Boolean(landmark.locationId && landmark.explored)

          if (playable && landmark.locationId) {
            return (
              <li key={landmark.id}>
                <button
                  type="button"
                  onClick={() => onSelectLocation?.(landmark.locationId!)}
                  className="group flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
                  style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${HUB_COLORS.emerald}18`, color: HUB_COLORS.emerald }}
                    aria-hidden
                  >
                    <Landmark className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                      {landmark.name}
                    </p>
                    <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                      {landmark.tagline} · {landmark.place}
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

          if (landmark.explored) {
            return (
              <li
                key={landmark.id}
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
                    {landmark.name}
                  </p>
                  <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                    {landmark.tagline} · {landmark.place}
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
              key={landmark.id}
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
                  {landmark.name}
                </p>
                <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                  {landmark.tagline} · {landmark.place}
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
