import { motion } from 'framer-motion'
import { useId, useState } from 'react'
import { muslimMapAnchorForLocation, iconForLocation } from './locationLayout'
import type { KnowledgeLocation } from './types'

const STAGGER_S = 0.08
const FADE_DURATION_S = 0.35

export interface LocationPinProps {
  location: KnowledgeLocation
  regionSlug: string
  index: number
  totalLocations: number
  selected?: boolean
  highlight?: boolean
  onSelect: (locationId: string) => void
}

export default function LocationPin({
  location,
  regionSlug,
  index,
  totalLocations,
  selected,
  highlight,
  onSelect,
}: LocationPinProps) {
  const tooltipId = useId()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const anchor = muslimMapAnchorForLocation(regionSlug, location.id, index, totalLocations)
  const icon = iconForLocation(location)
  const isActive = hovered || focused || selected
  const showTooltip = hovered || focused

  const statusLabel = location.locked
    ? 'Locked'
    : location.completed
      ? 'Completed'
      : 'Ready to explore'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        delay: index * STAGGER_S,
        duration: FADE_DURATION_S,
        ease: [0.42, 0, 0.58, 1],
      }}
      className={['absolute -translate-x-1/2 -translate-y-1/2', isActive ? 'z-40' : 'z-20'].join(' ')}
      style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
    >
      {showTooltip && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
        >
          <div className="relative whitespace-nowrap rounded-lg bg-[#1B2F5E] text-white shadow-lg px-3 py-1.5 text-center text-[10px] font-bold">
            {location.title}
            <span className="block text-white/70 font-semibold">{statusLabel}</span>
            <span
              className="absolute left-1/2 top-full -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-[#1B2F5E]"
              aria-hidden
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(location.id)
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={`Explore ${location.title}, ${statusLabel.toLowerCase()}`}
        aria-describedby={showTooltip ? tooltipId : undefined}
        aria-pressed={selected}
        className={[
          'group relative flex flex-col items-center bg-transparent border-0 p-0 cursor-pointer',
          'transition-transform duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2AAFA0] rounded-md',
          selected ? 'scale-125' : 'hover:scale-110',
          location.locked ? 'opacity-60' : 'opacity-100',
        ].join(' ')}
      >
        {/* Pin diamond */}
        <div className="relative">
          <div
            className={[
              'w-5 h-5 sm:w-6 sm:h-6 rotate-45 rounded-sm border shadow-sm transition-shadow',
              location.completed
                ? 'bg-[#E8F8F6] border-[#2AAFA0]/60'
                : location.locked
                  ? 'bg-[#EDE8E0] border-gray-300'
                  : 'bg-[#FFF8ED] border-[#F5A623]/50',
              highlight ? 'shadow-[0_0_12px_rgba(245,166,35,0.55)] ring-1 ring-[#F5A623]' : '',
            ].join(' ')}
            aria-hidden
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm -rotate-45"
            aria-hidden
          >
            {location.locked ? '🔒' : icon}
          </span>
        </div>

        {location.completed && (
          <span
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#2AAFA0] text-white text-[7px] flex items-center justify-center font-bold border border-[#FFF8ED]"
            aria-hidden
          >
            ✓
          </span>
        )}
      </button>
    </motion.div>
  )
}
