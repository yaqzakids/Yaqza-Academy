import { useCallback, useEffect, useRef, useState } from 'react'
import type { ArticleActivityCard } from '@/lib/types'

function TimelineSteps({ steps }: { steps: ArticleActivityCard['steps'] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(maxScroll > 4 && el.scrollLeft < maxScroll - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollHints()

    const observer = new ResizeObserver(updateScrollHints)
    observer.observe(el)

    return () => observer.disconnect()
  }, [steps.length, updateScrollHints])

  const scrollBy = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'right' ? 280 : -280,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative mt-1">
      {canScrollRight && (
        <p className="flex items-center justify-end gap-1 text-xs font-bold text-teal m-0 mb-2 pr-1">
          <span>Scroll to see all {steps.length} events</span>
          <span aria-hidden className="animate-pulse">
            →
          </span>
        </p>
      )}

      <div className="relative">
        {canScrollLeft && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#F5F3FF] to-transparent"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => scrollBy('left')}
              className="absolute left-1 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-teal/30 bg-white text-teal shadow-md hover:bg-teal/5"
              aria-label="Scroll timeline left"
            >
              ‹
            </button>
          </>
        )}

        {canScrollRight && (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#F5F3FF] via-[#F5F3FF]/90 to-transparent"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => scrollBy('right')}
              className="absolute right-1 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-teal/30 bg-white text-teal shadow-md hover:bg-teal/5 animate-pulse"
              aria-label="Scroll timeline right"
            >
              ›
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollHints}
          className="overflow-x-auto pb-3 -mx-1 px-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#2AAFA0_#E8F8F6]"
        >
          <ol className="flex items-start m-0 p-0 list-none min-w-max py-2 pr-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start shrink-0 snap-start">
                <div className="flex flex-col items-center w-[128px] sm:w-[148px] px-1">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-white text-xs font-extrabold shadow-sm ring-4 ring-[#F5F3FF]"
                    aria-hidden
                  >
                    {index + 1}
                  </div>
                  <p className="text-center text-[11px] sm:text-xs text-navy font-semibold mt-2.5 leading-snug m-0">
                    {step.title}
                  </p>
                  {step.description?.trim() && (
                    <p className="text-center text-[10px] sm:text-xs text-muted mt-1 mb-0 leading-snug">
                      {step.description}
                    </p>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div
                    className="flex items-center shrink-0 self-start mt-[14px] mx-0.5 sm:mx-1 text-teal"
                    aria-hidden
                  >
                    <span className="block h-0.5 w-4 sm:w-6 bg-teal/35" />
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 -ml-0.5"
                      fill="currentColor"
                    >
                      <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </li>
            ))}

            <li className="flex items-start shrink-0 self-start mt-[10px] ml-0.5 snap-start" aria-hidden>
              <svg viewBox="0 0 32 24" className="h-6 w-8 text-teal" fill="currentColor">
                <path d="M0 11h22l-6-6 1.4-1.4L32 12l-14.6 8.4L16 19l6-6H0v-2z" />
              </svg>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function ActivityCardPanel({ card }: { card: ArticleActivityCard }) {
  return (
    <div className="px-5 pb-5 pt-1 border-t border-purple/10">
      {card.intro?.trim() && (
        <p className="text-sm text-muted leading-relaxed mb-4 mt-4">{card.intro}</p>
      )}
      {card.type === 'timeline' ? (
        <TimelineSteps steps={card.steps} />
      ) : (
        <ul className="space-y-2 m-0 pl-5 list-disc text-sm text-navy leading-relaxed">
          {card.steps.map((step, index) => (
            <li key={index}>
              {step.title}
              {step.description?.trim() ? ` — ${step.description}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function LessonActivityCardsSection({ cards }: { cards: ArticleActivityCard[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  if (cards.length === 0) return null

  return (
    <section className="mb-6 md:mb-8" aria-labelledby="lesson-activities-heading">
      <h2 id="lesson-activities-heading" className="font-bold text-navy text-lg mb-4">
        Activities
      </h2>
      <div className="space-y-3">
        {cards.map((card) => {
          const isOpen = openId === card.id
          return (
            <div
              key={card.id}
              className="rounded-2xl border border-purple/20 bg-[#F5F3FF] shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : card.id)}
                aria-expanded={isOpen}
                aria-controls={`activity-panel-${card.id}`}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-purple/5 transition-colors"
              >
                <span className="text-3xl shrink-0" aria-hidden>
                  {card.emoji || '🎯'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold text-purple uppercase m-0 mb-1">
                    {card.type === 'timeline' ? 'Timeline Activity' : 'Activity'}
                  </p>
                  <p className="font-bold text-navy m-0">{card.title}</p>
                  {!isOpen && (
                    <p className="text-xs text-muted mt-1 mb-0">Tap to view the timeline →</p>
                  )}
                </div>
                <span
                  className={`text-purple font-bold text-lg shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
              {isOpen && (
                <div id={`activity-panel-${card.id}`}>
                  <ActivityCardPanel card={card} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
