import { motion } from 'framer-motion'
import type { KnowledgeRegion } from './types'

export interface RegionPinTooltipProps {
  region: KnowledgeRegion
  id: string
}

/** Compact navy tooltip on marker hover. */
export default function RegionPinTooltip({ region, id }: RegionPinTooltipProps) {
  const isLocked = region.status === 'locked'
  const subtitle = isLocked
    ? 'Locked — keep exploring to unlock'
    : `${region.completedLocations} / ${region.totalLocations} locations`

  return (
    <motion.div
      id={id}
      role="tooltip"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-[100] pointer-events-none"
    >
      <div className="relative rounded-lg bg-[#1B2F5E] text-white shadow-lg px-3 py-2 text-left whitespace-nowrap">
        <p className="m-0 text-xs font-extrabold leading-tight">
          {!isLocked && <span aria-hidden>{region.icon} </span>}
          {region.name}
        </p>
        <p className="m-0 mt-0.5 text-[10px] font-semibold text-white/70">{subtitle}</p>
        <span
          className="absolute left-1/2 top-full -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-[#1B2F5E]"
          aria-hidden
        />
      </div>
    </motion.div>
  )
}
