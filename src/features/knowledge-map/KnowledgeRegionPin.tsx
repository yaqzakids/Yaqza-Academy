import { AnimatePresence } from 'framer-motion'
import { useId, useState } from 'react'
import RegionPinTooltip from './RegionPinTooltip'
import { MAP_COLORS } from './mapTheme'
import { muslimMapAnchorForRegion } from './worldMapLayout'
import type { KnowledgeRegion } from './types'

export interface KnowledgeRegionPinProps {
  region: KnowledgeRegion
  selected?: boolean
  dimmed?: boolean
  onSelect: (regionId: string) => void
}

function UnlockedMarker({
  region,
  selected,
}: {
  region: KnowledgeRegion
  selected: boolean
}) {
  const isCompleted = region.status === 'completed'
  const glowColor = isCompleted ? MAP_COLORS.tealGlow : MAP_COLORS.goldGlow

  return (
    <div className="relative flex flex-col items-center">
      {/* Subtle glow — no white bubble */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full pointer-events-none transition-transform duration-300"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: selected ? 'translateX(-50%) scale(1.2)' : 'translateX(-50%) scale(1)',
        }}
        aria-hidden
      />

      {/* Icon — max 48px */}
      <span
        className={[
          'relative text-[2rem] leading-none drop-shadow-sm transition-transform duration-200',
          selected ? 'scale-110' : 'scale-100',
        ].join(' ')}
        style={{ maxWidth: 48, maxHeight: 48 }}
        aria-hidden
      >
        {region.icon}
      </span>

      {/* Compact banner label */}
      <span
        className={[
          'relative mt-1 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-extrabold tracking-wide whitespace-nowrap',
          'border shadow-sm transition-all duration-200',
          isCompleted
            ? 'bg-[#E8F8F6] border-[#2AAFA0]/50 text-[#1B2F5E]'
            : 'bg-[#FFF8ED] border-[#F5A623]/45 text-[#1B2F5E]',
          selected ? 'scale-105 shadow-md' : '',
        ].join(' ')}
      >
        {region.name}
      </span>

      {isCompleted && (
        <span
          className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#2AAFA0] text-white text-[8px] flex items-center justify-center font-bold border border-[#FFF8ED] shadow-sm"
          aria-hidden
        >
          ✓
        </span>
      )}
    </div>
  )
}

function LockedMarker({ selected }: { selected: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Soft cloud cluster */}
      <svg
        viewBox="0 0 80 52"
        className={[
          'w-16 h-10 sm:w-[4.5rem] sm:h-11 drop-shadow-sm transition-transform duration-200',
          selected ? 'scale-105' : '',
        ].join(' ')}
        aria-hidden
      >
        <defs>
          <radialGradient id="lock-cloud" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8F4EE" />
            <stop offset="100%" stopColor="#DDD8D0" />
          </radialGradient>
        </defs>
        <ellipse cx="40" cy="30" rx="36" ry="20" fill="url(#lock-cloud)" opacity="0.95" />
        <ellipse cx="28" cy="26" rx="22" ry="14" fill="#F5F0E8" opacity="0.9" />
        <ellipse cx="54" cy="28" rx="20" ry="13" fill="#EDE8E0" opacity="0.85" />
      </svg>

      {/* Tiny lock */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[11px] opacity-70"
        aria-hidden
      >
        🔒
      </span>
    </div>
  )
}

export default function KnowledgeRegionPin({
  region,
  selected,
  dimmed,
  onSelect,
}: KnowledgeRegionPinProps) {
  const tooltipId = useId()
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const isLocked = region.status === 'locked'
  const progress = `${region.completedLocations} / ${region.totalLocations}`
  const statusLabel =
    region.status === 'locked'
      ? 'locked'
      : region.status === 'completed'
        ? 'completed'
        : 'in progress'
  const ariaLabel = isLocked
    ? `Explore ${region.name} region, locked`
    : `Open ${region.name} region, ${progress} ${statusLabel}`
  const isActive = hovered || focused
  const showTooltip = isActive && !selected
  const anchor = muslimMapAnchorForRegion(region.slug)

  return (
    <div
      className={[
        'absolute -translate-x-1/2 -translate-y-1/2',
        isActive || selected ? 'z-[60]' : 'z-20',
      ].join(' ')}
      style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
    >
      <AnimatePresence>
        {showTooltip && <RegionPinTooltip key="tooltip" region={region} id={tooltipId} />}
      </AnimatePresence>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onSelect(region.id)
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={ariaLabel}
        aria-describedby={showTooltip ? tooltipId : undefined}
        aria-pressed={selected}
        className={[
          'group relative flex flex-col items-center bg-transparent border-0 p-0 cursor-pointer',
          'transition-transform duration-200 ease-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2AAFA0] rounded-lg',
          selected ? 'scale-110' : 'hover:scale-105',
          dimmed && !selected ? 'opacity-45 saturate-50' : 'opacity-100',
        ].join(' ')}
      >
        {isLocked ? (
          <LockedMarker selected={!!selected} />
        ) : (
          <UnlockedMarker region={region} selected={!!selected} />
        )}
      </button>
    </div>
  )
}
