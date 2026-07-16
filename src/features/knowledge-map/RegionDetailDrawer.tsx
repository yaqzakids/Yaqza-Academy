import MapDrawerShell from './MapDrawerShell'
import { iconForLocation } from './locationLayout'
import { MAP_ATLAS } from './mapSvgStyles'
import type { KnowledgeLocation, KnowledgeRegion } from './types'
import type { Ref } from 'react'

export interface RegionDetailDrawerProps {
  region: KnowledgeRegion | null
  open: boolean
  onClose: () => void
  onSelectLocation?: (locationId: string) => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
  panelRef?: Ref<HTMLDivElement>
}

function regionTagline(region: KnowledgeRegion): string {
  const taglines: Record<string, string> = {
    arabia: 'Heart of Islam',
    'ash-sham': 'The Blessed Levant',
    iraq: 'Land of Wisdom',
    persia: 'Crossroads of Empires',
    'north-africa': 'Gateway of the West',
    egypt: 'Land of the Nile',
    anatolia: 'Bridge of Civilizations',
    balkans: 'Where East Meets West',
    'central-asia': 'Silk Road Lands',
    'indian-subcontinent': 'Garden of Scholars',
    'east-africa': 'Coasts of Trade',
    'southeast-asia': 'Islands of Faith',
    china: 'Eastern Horizons',
    andalusia: 'Light of Al-Andalus',
  }
  return taglines[region.slug] ?? region.description.split('—')[0].trim().slice(0, 48)
}

function regionStats(region: KnowledgeRegion) {
  return {
    cities: region.locations.filter((l) => l.type === 'city').length,
    landmarks: region.locations.filter((l) =>
      ['landmark', 'mosque', 'battle', 'discovery'].includes(l.type),
    ).length,
    greatMuslims: region.locations.filter((l) => l.type === 'scholar').length,
    stories: region.locations.length,
    challenges: region.locations.filter((l) => l.quizAvailable || l.type === 'battle').length,
    collectibles: region.locations.filter((l) => Boolean(l.collectibleReward)).length,
  }
}

export default function RegionDetailDrawer({
  region,
  open,
  onClose,
  onSelectLocation,
  onPointerEnter,
  onPointerLeave,
  panelRef,
}: RegionDetailDrawerProps) {
  if (!region) return null

  const isLocked = region.status === 'locked'
  const progressPct = region.totalLocations
    ? Math.round((region.completedLocations / region.totalLocations) * 100)
    : 0
  const stats = regionStats(region)

  return (
    <MapDrawerShell
      open={open}
      onClose={onClose}
      titleId="region-drawer-title"
      ariaLabel="Close region details"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      panelRef={panelRef}
      header={
        <div className="space-y-1">
          <h2 id="region-drawer-title" className="font-display text-xl font-semibold m-0" style={{ color: MAP_ATLAS.navy }}>
            {region.name}
          </h2>
          <p className="text-sm font-medium m-0" style={{ color: `${MAP_ATLAS.textDark}99` }}>
            {regionTagline(region)}
          </p>
          {!isLocked && (
            <p className="text-xs m-0 pt-1" style={{ color: `${MAP_ATLAS.textDark}77` }}>
              {region.completedLocations} of {region.totalLocations} explored
            </p>
          )}
        </div>
      }
    >
      <div className="space-y-6 -mt-1">
        {!isLocked && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider m-0 mb-2" style={{ color: `${MAP_ATLAS.textDark}77` }}>
              Progress
            </p>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${MAP_ATLAS.water}55` }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, backgroundColor: MAP_ATLAS.hoverRegion }}
              />
            </div>
          </div>
        )}

        {isLocked && (
          <p
            className="rounded-lg border px-4 py-3 text-sm m-0"
            style={{
              borderColor: `${MAP_ATLAS.border}50`,
              backgroundColor: `${MAP_ATLAS.surroundingLand}60`,
              color: `${MAP_ATLAS.textDark}99`,
            }}
          >
            Complete journeys in Arabia, Egypt, and Iraq to unlock more of the map.
          </p>
        )}

        <section>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Cities', value: stats.cities },
              { label: 'Landmarks', value: stats.landmarks },
              { label: 'Great Muslims', value: stats.greatMuslims },
              { label: 'Stories', value: stats.stories },
              { label: 'Challenges', value: stats.challenges },
              { label: 'Collectibles', value: stats.collectibles },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="m-0 text-[9px] font-semibold uppercase tracking-wide" style={{ color: `${MAP_ATLAS.textDark}66` }}>
                  {stat.label}
                </p>
                <p className="m-0 text-sm font-semibold mt-0.5" style={{ color: MAP_ATLAS.navy }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[10px] font-semibold uppercase tracking-wider m-0 mb-3" style={{ color: `${MAP_ATLAS.textDark}77` }}>
            Explore
          </p>
          <ul className="space-y-3 m-0 p-0 list-none">
            {region.locations.map((location) => (
              <LocationCard
                key={location.id}
                location={location}
                onSelect={onSelectLocation}
              />
            ))}
          </ul>
        </section>
      </div>
    </MapDrawerShell>
  )
}

function LocationCard({
  location,
  onSelect,
}: {
  location: KnowledgeLocation
  onSelect?: (id: string) => void
}) {
  const clickable = !location.locked && Boolean(onSelect)

  return (
    <li>
      <div
        className={[
          'rounded-xl border p-4 transition-colors',
          location.completed ? 'border-[#3E7A66]/30' : 'border-[#B89C6A]/35',
          clickable ? 'hover:bg-white/60' : '',
        ].join(' ')}
        style={{ backgroundColor: location.completed ? `${MAP_ATLAS.hoverRegion}08` : `${MAP_ATLAS.parchment}` }}
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-xl"
            style={{ backgroundColor: 'white', borderColor: `${MAP_ATLAS.border}50` }}
            aria-hidden
          >
            {location.locked ? '🔒' : iconForLocation(location)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 text-sm font-semibold flex items-center gap-2" style={{ color: MAP_ATLAS.navy }}>
              {location.title}
              {location.completed && (
                <span className="text-xs font-medium" style={{ color: MAP_ATLAS.hoverRegion }} aria-label="Completed">
                  ✓
                </span>
              )}
            </p>
            <p className="m-0 mt-1 text-xs leading-relaxed" style={{ color: `${MAP_ATLAS.textDark}99` }}>
              {location.description}
            </p>
            <p className="m-0 mt-2 text-[10px] font-medium" style={{ color: `${MAP_ATLAS.textDark}66` }}>
              {location.era} · {location.difficulty}
            </p>
            {clickable && (
              <button
                type="button"
                onClick={() => onSelect?.(location.id)}
                className="mt-3 text-xs font-semibold border-0 bg-transparent p-0 cursor-pointer transition-opacity hover:opacity-70"
                style={{ color: MAP_ATLAS.hoverRegion }}
              >
                Explore →
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
