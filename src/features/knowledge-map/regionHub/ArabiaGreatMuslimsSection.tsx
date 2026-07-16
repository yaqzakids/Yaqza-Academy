import { BookOpen, Lock } from 'lucide-react'
import greatMuslimsArt from '@/assets/knowledge-map/arabia-hub/arabia-great-muslims.png'
import { ARABIA_GREAT_MUSLIMS, ARABIA_GREAT_MUSLIMS_EXPLORED } from './arabiaGreatMuslims'
import { HUB_COLORS } from './regionHubTheme'

export default function ArabiaGreatMuslimsSection() {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Great Muslims
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_GREAT_MUSLIMS_EXPLORED} / {ARABIA_GREAT_MUSLIMS.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Companions, caliphs, and scholars who shaped the story of Arabia — learn through books and scrolls, not portraits.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={greatMuslimsArt}
            alt="Historical illustration of Muslim scholars in traditional dress with desert mountains in the background"
            className="w-full object-cover"
          />
        </div>
        <p className="text-[11px] font-semibold text-center mt-2 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Symbolic scene — each figure is explored through stories and scrolls
        </p>
      </div>

      <ul className="flex flex-col gap-2 px-4 pb-4 m-0 list-none">
        {ARABIA_GREAT_MUSLIMS.map((figure) => {
          if (figure.explored) {
            return (
              <li
                key={figure.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-3"
                style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${HUB_COLORS.gold}22`, color: HUB_COLORS.emerald }}
                  aria-hidden
                >
                  <BookOpen className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                    {figure.name}
                  </p>
                  <p className="text-xs font-medium m-0 mt-0.5" style={{ color: HUB_COLORS.textMuted }}>
                    {figure.role} · {figure.era}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wide shrink-0"
                  style={{ color: HUB_COLORS.emerald }}
                >
                  Learned
                </span>
              </li>
            )
          }

          return (
            <li
              key={figure.id}
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
                  {figure.name}
                </p>
                <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                  {figure.role} · {figure.era}
                </p>
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-wide shrink-0"
                style={{ color: HUB_COLORS.textMuted }}
              >
                Soon
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
