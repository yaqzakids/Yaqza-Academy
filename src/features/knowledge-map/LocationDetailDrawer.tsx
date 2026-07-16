import MapDrawerShell from './MapDrawerShell'
import { iconForLocation } from './locationLayout'
import type { KnowledgeLocation } from './types'
import type { Ref } from 'react'

export interface LocationDetailDrawerProps {
  location: KnowledgeLocation | null
  regionName: string
  open: boolean
  onClose: () => void
  onStartJourney?: (locationId: string) => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
  panelRef?: Ref<HTMLDivElement>
}

export default function LocationDetailDrawer({
  location,
  regionName,
  open,
  onClose,
  onStartJourney,
  onPointerEnter,
  onPointerLeave,
  panelRef,
}: LocationDetailDrawerProps) {
  if (!location) return null

  const icon = iconForLocation(location)

  return (
    <MapDrawerShell
      open={open}
      onClose={onClose}
      titleId="location-drawer-title"
      ariaLabel="Close location details"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      panelRef={panelRef}
      header={
        <>
          <p className="text-2xl mb-1" aria-hidden>
            {location.locked ? '🔒' : icon}
          </p>
          <p className="text-xs font-bold text-[#6B7280] m-0 mb-1">{regionName}</p>
          <h2 id="location-drawer-title" className="font-display text-xl font-bold text-[#1B2F5E] m-0">
            {location.title}
          </h2>
          <p className="text-xs font-semibold text-[#6B7280] mt-1 m-0">{location.era}</p>
        </>
      }
    >
      <div className="space-y-5 -mt-1">
        <p className="text-sm text-[#1B2F5E]/80 leading-relaxed m-0">{location.description}</p>

        <div className="rounded-xl border border-[#F5A623]/30 bg-[#FFF8ED]/60 px-4 py-3">
          <p className="text-xs font-extrabold text-[#6B7280] m-0 mb-1">Collectible reward</p>
          <p className="text-sm font-bold text-[#1B2F5E] m-0">✨ {location.collectibleReward}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {location.quizAvailable && (
            <span className="text-xs font-bold bg-[#EEF4FF] text-[#1B2F5E] px-3 py-1 rounded-full">
              📝 Quiz available
            </span>
          )}
          {location.activityAvailable && (
            <span className="text-xs font-bold bg-[#EEF4FF] text-[#1B2F5E] px-3 py-1 rounded-full">
              🎯 Activity available
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 pt-1 pb-safe">
          {!location.locked && !location.completed && onStartJourney && (
            <button
              type="button"
              onClick={() => onStartJourney(location.id)}
              className="w-full py-3 rounded-full bg-[#F5A623] text-white font-extrabold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2"
            >
              Start Journey →
            </button>
          )}
          {location.quizAvailable && !location.locked && (
            <button
              type="button"
              className="w-full py-3 rounded-full border-2 border-[#2AAFA0] text-[#2AAFA0] font-extrabold hover:bg-[#EEF4FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
            >
              Take Quiz
            </button>
          )}
        </div>
      </div>
    </MapDrawerShell>
  )
}
