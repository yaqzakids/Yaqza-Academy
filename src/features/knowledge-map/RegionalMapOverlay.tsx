import { AnimatePresence, motion } from 'framer-motion'
import { muslimMapAnchorForLocation, iconForLocation } from './locationLayout'
import { mapPercentToViewBox, WORLD_VIEWBOX_STRING } from './mapViewport'
import type { KnowledgeLocation, KnowledgeRegion } from './types'

const STAGGER_S = 0.06
const MARKER_SIZE = 44

export interface RegionalMapOverlayProps {
  region: KnowledgeRegion
  selectedLocationId: string | null
  visible: boolean
  onSelectLocation: (locationId: string) => void
}

function routePathInViewBox(regionSlug: string, locations: KnowledgeLocation[]): string | null {
  if (locations.length < 2) return null
  return locations
    .map((location, index) => {
      const anchor = muslimMapAnchorForLocation(regionSlug, location.id, index, locations.length)
      const { x, y } = mapPercentToViewBox(anchor)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

/** Regional detail layer — cities, routes, landmarks. Shares SVG viewBox with the world map. */
export default function RegionalMapOverlay({
  region,
  selectedLocationId,
  visible,
  onSelectLocation,
}: RegionalMapOverlayProps) {
  const locations = region.locations
  const routePath = routePathInViewBox(region.slug, locations)

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.svg
        key={region.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox={WORLD_VIEWBOX_STRING}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden={false}
      >
        {routePath && (
          <path
            d={routePath}
            fill="none"
            stroke="#B89C6A"
            strokeWidth={2.5}
            strokeDasharray="6 5"
            opacity={0.45}
          />
        )}

        {locations.map((location, index) => (
          <RegionalMarker
            key={location.id}
            location={location}
            regionSlug={region.slug}
            index={index}
            total={locations.length}
            selected={selectedLocationId === location.id}
            onSelect={onSelectLocation}
          />
        ))}
      </motion.svg>
    </AnimatePresence>
  )
}

function RegionalMarker({
  location,
  regionSlug,
  index,
  total,
  selected,
  onSelect,
}: {
  location: KnowledgeLocation
  regionSlug: string
  index: number
  total: number
  selected: boolean
  onSelect: (id: string) => void
}) {
  const anchor = muslimMapAnchorForLocation(regionSlug, location.id, index, total)
  const { x, y } = mapPercentToViewBox(anchor)
  const icon = iconForLocation(location)
  const half = MARKER_SIZE / 2

  return (
    <foreignObject
      x={x - half}
      y={y - half}
      width={MARKER_SIZE}
      height={MARKER_SIZE}
      className="pointer-events-auto overflow-visible"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * STAGGER_S + 0.2, duration: 0.3 }}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          if (!location.locked) onSelect(location.id)
        }}
        disabled={location.locked}
        aria-label={location.title}
        className={[
          'flex h-full w-full flex-col items-center justify-center gap-0.5 border-0 bg-transparent p-0',
          location.locked ? 'cursor-default opacity-40' : 'cursor-pointer',
          selected ? 'z-30' : 'z-20',
        ].join(' ')}
      >
        <span
          className={[
            'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] shadow-sm transition-transform',
            selected ? 'scale-110' : '',
            location.completed
              ? 'border-[#3E7A66] bg-[#F6ECD2]'
              : 'border-[#B89C6A]/70 bg-white/90',
          ].join(' ')}
          aria-hidden
        >
          {location.locked ? '·' : icon}
        </span>
        {!location.locked && (
          <span
            className={[
              'h-1 w-1 rounded-full',
              location.completed ? 'bg-[#3E7A66]' : 'bg-[#B89C6A]',
            ].join(' ')}
            aria-hidden
          />
        )}
      </motion.button>
    </foreignObject>
  )
}
