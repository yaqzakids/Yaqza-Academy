import { motion } from 'framer-motion'
import { LOCKED_REGION_HOVER_MESSAGE, regionGroupForSlug } from './regionCountryGroups'
import { MAP_ATLAS } from './mapSvgStyles'
import type { KnowledgeRegion } from './types'

export interface MapRegionTooltipProps {
  region: KnowledgeRegion
  x: number
  y: number
}

export default function MapRegionTooltip({ region, x, y }: MapRegionTooltipProps) {
  const isLocked = region.status === 'locked'
  const group = regionGroupForSlug(region.slug)
  const countries = group?.countryLabels ?? []

  return (
    <motion.div
      role="tooltip"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.12 }}
      className="fixed z-[200] pointer-events-none max-w-[200px]"
      style={{ left: x, top: y, transform: 'translate(-50%, -100%) translateY(-10px)' }}
    >
      <div
        className="rounded-md px-3 py-2.5 text-left shadow-lg border"
        style={{
          backgroundColor: MAP_ATLAS.navy,
          borderColor: `${MAP_ATLAS.selectedGlow}30`,
          color: MAP_ATLAS.parchment,
        }}
      >
        <p className="m-0 text-[13px] font-semibold leading-tight tracking-tight">
          {group?.label ?? region.name}
        </p>

        {countries.length > 0 && (
          <ul className="m-0 mt-2 list-none space-y-0.5 p-0">
            {countries.map((country) => (
              <li key={country} className="text-[10px] font-medium leading-snug" style={{ color: `${MAP_ATLAS.parchment}bb` }}>
                {country}
              </li>
            ))}
          </ul>
        )}

        {isLocked ? (
          <p className="m-0 mt-2 text-[10px] font-medium leading-snug" style={{ color: MAP_ATLAS.selectedGlow }}>
            {LOCKED_REGION_HOVER_MESSAGE}
          </p>
        ) : (
          <>
            <p className="m-0 mt-2 text-[10px] font-medium" style={{ color: `${MAP_ATLAS.parchment}99` }}>
              {region.totalLocations} {region.totalLocations === 1 ? 'location' : 'locations'}
            </p>
            <p className="m-0 mt-1.5 text-[10px] font-medium" style={{ color: MAP_ATLAS.selectedGlow }}>
              Click to Explore →
            </p>
          </>
        )}
      </div>
    </motion.div>
  )
}
