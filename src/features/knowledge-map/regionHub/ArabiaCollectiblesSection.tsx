import { Gem, Lock } from 'lucide-react'
import chestArt from '@/assets/knowledge-map/arabia-hub/arabia-collectibles-chest.png'
import { ARABIA_COLLECTIBLES, ARABIA_COLLECTIBLES_FOUND } from './arabiaCollectibles'
import { HUB_COLORS } from './regionHubTheme'

export default function ArabiaCollectiblesSection() {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Collectibles
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_COLLECTIBLES_FOUND} / {ARABIA_COLLECTIBLES.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Scrolls, coins, badges, and desert treasures waiting across Arabia.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={chestArt}
            alt="Watercolor illustration of a treasure chest with gold coins and an ornate golden medallion"
            className="w-full object-cover"
          />
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 px-4 pb-4 m-0 list-none">
        {ARABIA_COLLECTIBLES.map((item) => (
          <li
            key={item.id}
            className={`rounded-lg border px-2.5 py-2.5 ${item.found ? '' : 'opacity-70'}`}
            style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
          >
            <div className="flex items-start gap-2">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm"
                style={{
                  backgroundColor: item.found ? `${HUB_COLORS.gold}28` : `${HUB_COLORS.border}80`,
                  color: item.found ? HUB_COLORS.gold : HUB_COLORS.textMuted,
                }}
                aria-hidden
              >
                {item.found ? <Gem className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className="text-xs font-bold m-0 leading-snug"
                  style={{ color: item.found ? HUB_COLORS.navy : HUB_COLORS.textMuted }}
                >
                  {item.found ? item.name : '???'}
                </p>
                <p className="text-[10px] font-medium m-0 mt-0.5 line-clamp-2" style={{ color: HUB_COLORS.textMuted }}>
                  {item.found ? item.hint : 'Not yet discovered'}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
