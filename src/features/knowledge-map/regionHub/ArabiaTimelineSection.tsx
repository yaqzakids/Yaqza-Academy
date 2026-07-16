import { ChevronRight, Clock, Lock } from 'lucide-react'
import hourglass from '@/assets/knowledge-map/arabia-hub/arabia-timeline-hourglass.png'
import { ARABIA_TIMELINE, ARABIA_TIMELINE_UNLOCKED } from './arabiaTimeline'
import { HUB_COLORS } from './regionHubTheme'

export interface ArabiaTimelineSectionProps {
  onSelectLocation?: (locationId: string) => void
}

export default function ArabiaTimelineSection({ onSelectLocation }: ArabiaTimelineSectionProps) {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Timeline
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_TIMELINE_UNLOCKED} / {ARABIA_TIMELINE.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Key events from ancient trade routes through the rise of Islam in Arabia.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={hourglass}
            alt="Watercolor illustration of a wooden hourglass with sand flowing between glass bulbs"
            className="w-full object-cover"
          />
        </div>
      </div>

      <ol className="relative m-0 list-none px-4 pb-4">
        {ARABIA_TIMELINE.map((event, index) => {
          const isLast = index === ARABIA_TIMELINE.length - 1
          const linked = Boolean(event.locationId && event.unlocked)

          const dot = (
            <span
              className="absolute left-[1.65rem] z-10 flex h-3 w-3 -translate-x-1/2 rounded-full border-2"
              style={{
                top: '1.35rem',
                borderColor: event.unlocked ? HUB_COLORS.emerald : HUB_COLORS.border,
                backgroundColor: event.unlocked ? HUB_COLORS.emerald : '#FFFDF8',
              }}
              aria-hidden
            />
          )

          const connector = !isLast && (
            <span
              className="absolute left-6 w-0.5 -translate-x-1/2"
              style={{
                top: '2rem',
                bottom: '-0.5rem',
                backgroundColor: `${HUB_COLORS.border}`,
              }}
              aria-hidden
            />
          )

          const content = (
            <>
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wide" style={{ color: HUB_COLORS.gold }}>
                  {event.year}
                </span>
              </div>
              <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                {event.title}
              </p>
              <p className="text-xs font-medium m-0 mt-1" style={{ color: HUB_COLORS.textMuted }}>
                {event.summary}
              </p>
            </>
          )

          if (linked && event.locationId) {
            return (
              <li key={event.id} className="relative pl-10 pb-4">
                {dot}
                {connector}
                <button
                  type="button"
                  onClick={() => onSelectLocation?.(event.locationId!)}
                  className="group flex w-full items-start justify-between gap-2 rounded-lg border px-3 py-3 text-left transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
                  style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
                >
                  <div className="min-w-0">{content}</div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 mt-1 opacity-40 transition-opacity group-hover:opacity-100"
                    style={{ color: HUB_COLORS.gold }}
                  />
                </button>
              </li>
            )
          }

          if (event.unlocked) {
            return (
              <li
                key={event.id}
                className="relative pl-10 pb-4 rounded-lg border px-3 py-3 ml-0"
                style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment, paddingLeft: '2.5rem' }}
              >
                {dot}
                {connector}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">{content}</div>
                  <Clock className="h-4 w-4 shrink-0 mt-0.5" style={{ color: HUB_COLORS.teal }} aria-hidden />
                </div>
              </li>
            )
          }

          return (
            <li
              key={event.id}
              className="relative pl-10 pb-4 opacity-75"
            >
              {dot}
              {connector}
              <div
                className="rounded-lg border px-3 py-3"
                style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">{content}</div>
                  <Lock className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: HUB_COLORS.textMuted }} aria-hidden />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
