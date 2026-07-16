import type { KnowledgeRegion } from './types'

export interface RegionalMapViewProps {
  region: KnowledgeRegion
  onBackToWorld: () => void
}

/** Header chrome for zoomed region view — same Muslim World parchment map. */
export default function RegionalMapView({ region, onBackToWorld }: RegionalMapViewProps) {
  const progressPct = region.totalLocations
    ? Math.round((region.completedLocations / region.totalLocations) * 100)
    : 0

  return (
    <div className="absolute top-3 left-3 right-3 z-30 flex items-start justify-between gap-3 pointer-events-none">
      <button
        type="button"
        onClick={onBackToWorld}
        className="pointer-events-auto rounded-full bg-white/95 border border-[#C4A574]/50 shadow-md px-3 py-1.5 text-xs sm:text-sm font-extrabold text-[#1B2F5E] hover:bg-[#FFF8ED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
      >
        ← Back to Muslim World
      </button>

      <div className="pointer-events-none text-right bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-[#E5D4B8]/60 shadow-sm max-w-[55%]">
        <p className="m-0 text-sm sm:text-base font-display font-bold text-[#1B2F5E] flex items-center justify-end gap-1.5">
          <span aria-hidden>{region.icon}</span>
          {region.name}
        </p>
        <p className="m-0 mt-0.5 text-[10px] sm:text-xs font-bold text-[#6B7280]">
          {region.completedLocations} / {region.totalLocations} explored · {progressPct}%
        </p>
        <div className="mt-1.5 h-1 rounded-full bg-[#EEF4FF] overflow-hidden">
          <div
            className="h-full bg-[#2AAFA0] rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
