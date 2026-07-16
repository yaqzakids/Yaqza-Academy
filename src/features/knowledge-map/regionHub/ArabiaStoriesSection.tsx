import { ChevronRight, Lock, Scroll } from 'lucide-react'
import storiesScroll from '@/assets/knowledge-map/arabia-hub/arabia-stories-scroll.png'
import { ARABIA_STORIES, ARABIA_STORIES_READ } from './arabiaStories'
import { HUB_COLORS } from './regionHubTheme'

export interface ArabiaStoriesSectionProps {
  onSelectLocation?: (locationId: string) => void
}

export default function ArabiaStoriesSection({ onSelectLocation }: ArabiaStoriesSectionProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Stories of Arabia
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_STORIES_READ} / {ARABIA_STORIES.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Scrolls of seerah, trade caravans, desert journeys, and the early Muslim community.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={storiesScroll}
            alt="Watercolor illustration of an unrolled parchment scroll with a quill and inkwell"
            className="w-full object-cover"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-2 px-4 pb-4 m-0 list-none">
        {ARABIA_STORIES.map((story) => {
          const linked = Boolean(story.locationId && story.read)

          if (linked && story.locationId) {
            return (
              <li key={story.id}>
                <button
                  type="button"
                  onClick={() => onSelectLocation?.(story.locationId!)}
                  className="group flex w-full items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
                  style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${HUB_COLORS.gold}22`, color: HUB_COLORS.emerald }}
                    aria-hidden
                  >
                    <Scroll className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                      {story.title}
                    </p>
                    <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                      {story.teaser} · {story.theme}
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

          if (story.read) {
            return (
              <li
                key={story.id}
                className="flex items-center gap-3 rounded-lg border px-3 py-3"
                style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${HUB_COLORS.gold}22`, color: HUB_COLORS.emerald }}
                  aria-hidden
                >
                  <Scroll className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                    {story.title}
                  </p>
                  <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                    {story.teaser} · {story.theme}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wide shrink-0"
                  style={{ color: HUB_COLORS.emerald }}
                >
                  Read
                </span>
              </li>
            )
          }

          return (
            <li
              key={story.id}
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
                  {story.title}
                </p>
                <p className="text-xs font-medium m-0 mt-0.5 truncate" style={{ color: HUB_COLORS.textMuted }}>
                  {story.teaser} · {story.theme}
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
