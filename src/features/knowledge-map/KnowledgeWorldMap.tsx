import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import MapParchmentTexture from './MapParchmentTexture'
import MapRegionTooltip from './MapRegionTooltip'
import MapTimelineDrawer from './MapTimelineDrawer'
import RegionalMapOverlay from './RegionalMapOverlay'
import { DEBUG_COORDINATES } from './mapDebug'
import { CAMERA_ANIMATION_MS } from './mapCamera'
import { MUSLIM_MAP_ASPECT } from './mapConstants'
import { MAP_ATLAS } from './mapSvgStyles'
import { ENABLE_PARCHMENT_TEXTURE } from './mapTexture'
import type { useMapCamera } from './useMapCamera'
import InteractiveMuslimWorldMap from './InteractiveMuslimWorldMap'
import type { KnowledgeRegion, MapViewLevel } from './types'

const EASE = [0.42, 0, 0.58, 1] as const

export interface KnowledgeWorldMapProps {
  regions: KnowledgeRegion[]
  viewLevel: MapViewLevel
  selectedRegion: KnowledgeRegion | null
  selectedRegionId: string | null
  selectedLocationId: string | null
  regionalOverlayVisible: boolean
  onSelectRegion: (regionId: string) => void
  onSelectLocation: (locationId: string) => void
  onResetWorld: () => void
  onContextMenu: (e: React.MouseEvent) => void
  camera: ReturnType<typeof useMapCamera>
  onMapSvgReady?: (svg: SVGSVGElement | null) => void
  regionDrawer?: ReactNode
  locationDrawer?: ReactNode
  /** Split-layout hub: map fills column height; hide redundant back control. */
  embeddedInHub?: boolean
}

export default function KnowledgeWorldMap({
  regions,
  viewLevel,
  selectedRegion,
  selectedRegionId,
  selectedLocationId,
  regionalOverlayVisible,
  onSelectRegion,
  onSelectLocation,
  onResetWorld,
  onContextMenu,
  camera,
  onMapSvgReady,
  regionDrawer,
  locationDrawer,
  embeddedInHub = false,
}: KnowledgeWorldMapProps) {
  const isWorldView = viewLevel === 'world'
  const isRegionView = viewLevel === 'region' || viewLevel === 'location'
  const [debugCoord, setDebugCoord] = useState<{ x: number; y: number } | null>(null)
  const [hoveredRegionSlug, setHoveredRegionSlug] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [timelineOpen, setTimelineOpen] = useState(false)

  const selectedRegionSlug = selectedRegion?.slug ?? null
  const mapSelectedSlug = isWorldView && !selectedRegionId ? null : selectedRegionSlug

  const hoveredRegion = useMemo(
    () => (hoveredRegionSlug ? regions.find((r) => r.slug === hoveredRegionSlug) ?? null : null),
    [hoveredRegionSlug, regions],
  )

  const handleRegionHover = useCallback((regionSlug: string | null, clientX: number, clientY: number) => {
    setHoveredRegionSlug(regionSlug)
    if (regionSlug) setTooltipPos({ x: clientX, y: clientY })
  }, [])

  const handleDebugMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!DEBUG_COORDINATES) return
    const el = camera.viewportRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const localX = e.clientX - rect.left
    const localY = e.clientY - rect.top
    const { x, y, zoom } = camera.camera
    const mapX = (localX - x) / zoom
    const mapY = (localY - y) / zoom
    setDebugCoord({
      x: Math.round((mapX / rect.width) * 1000) / 10,
      y: Math.round((mapY / rect.height) * 1000) / 10,
    })
  }

  return (
    <div
      className={`relative overflow-hidden shadow-lg ring-1 ring-[#B89C6A]/50 ${embeddedInHub ? 'h-full rounded-none lg:rounded-l-2xl' : 'rounded-2xl'}`}
      style={{ backgroundColor: MAP_ATLAS.water }}
    >
      <div
        className={`flex h-full w-full justify-center ${embeddedInHub ? 'items-center' : ''}`}
        style={{ backgroundColor: MAP_ATLAS.water }}
      >
        <div
          ref={camera.viewportRef}
          className={`relative touch-none select-none overflow-hidden ${
            embeddedInHub
              ? 'w-full max-h-full aspect-[1010/666] h-auto min-h-[200px]'
              : 'h-[min(72vh,640px)] w-[min(100%,calc(min(72vh,640px)*var(--km-aspect)))] rounded-t-2xl'
          }`}
          style={{ cursor: 'grab', backgroundColor: MAP_ATLAS.water, '--km-aspect': MUSLIM_MAP_ASPECT } as React.CSSProperties}
          onPointerDown={camera.handlePointerDown}
          onPointerMove={camera.handlePointerMove}
          onPointerUp={camera.handlePointerUp}
          onPointerCancel={camera.handlePointerUp}
          onContextMenu={onContextMenu}
          onDoubleClick={camera.handleDoubleClick}
          onTouchStart={camera.handleTouchStart}
          onTouchMove={camera.handleTouchMove}
          onTouchEnd={camera.handleTouchEnd}
          onMouseMove={handleDebugMouseMove}
          onMouseLeave={() => {
            setDebugCoord(null)
            setHoveredRegionSlug(null)
          }}
        >
          <motion.div
            className="absolute inset-0 z-10 h-full w-full"
            style={{ transformOrigin: '0 0' }}
            aria-label="Muslim World map layer"
            animate={{
              x: camera.camera.x,
              y: camera.camera.y,
              scale: camera.camera.zoom,
            }}
            transition={
              camera.isAnimating
                ? { duration: CAMERA_ANIMATION_MS / 1000, ease: EASE }
                : { duration: 0.15, ease: 'easeOut' }
            }
          >
            <div className="relative h-full w-full">
              <InteractiveMuslimWorldMap
                regions={regions}
                selectedRegionSlug={mapSelectedSlug}
                hoveredRegionSlug={isWorldView ? hoveredRegionSlug : null}
                interactive={isWorldView}
                onRegionHover={handleRegionHover}
                onRegionSelect={onSelectRegion}
                onSvgReady={onMapSvgReady}
              />

              {ENABLE_PARCHMENT_TEXTURE && <MapParchmentTexture />}

              {isRegionView && selectedRegion && (
                <RegionalMapOverlay
                  region={selectedRegion}
                  selectedLocationId={selectedLocationId}
                  visible={regionalOverlayVisible}
                  onSelectLocation={onSelectLocation}
                />
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {hoveredRegion && isWorldView && (
              <MapRegionTooltip region={hoveredRegion} x={tooltipPos.x} y={tooltipPos.y} />
            )}
          </AnimatePresence>

          {isRegionView && !embeddedInHub && (
            <div className="absolute top-4 left-4 z-30 pointer-events-auto">
              <button
                type="button"
                onClick={onResetWorld}
                className="rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7A66]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  borderColor: `${MAP_ATLAS.border}60`,
                  color: MAP_ATLAS.navy,
                }}
              >
                ← World
              </button>
            </div>
          )}

          {embeddedInHub && isRegionView && selectedRegion && (
            <div className="absolute top-3 right-3 z-30 pointer-events-none hidden md:flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold shadow-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderColor: `${MAP_ATLAS.border}60`,
                color: MAP_ATLAS.navy,
              }}
            >
              <span style={{ color: '#6B7280' }}>Atlas</span>
              <span aria-hidden>›</span>
              <span>{selectedRegion.name}</span>
            </div>
          )}

          {isWorldView && (
            <div className="absolute bottom-4 right-4 z-30 pointer-events-auto">
              <button
                type="button"
                onClick={() => setTimelineOpen(true)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3E7A66]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.88)',
                  borderColor: `${MAP_ATLAS.border}50`,
                  color: MAP_ATLAS.navy,
                }}
              >
                🕰 Timeline
              </button>
            </div>
          )}

          <MapTimelineDrawer open={timelineOpen} onClose={() => setTimelineOpen(false)} />

          {DEBUG_COORDINATES && debugCoord && (
            <div className="absolute bottom-3 right-3 z-[110] pointer-events-none rounded-lg bg-black/80 text-white text-[11px] font-mono px-2.5 py-1.5 shadow-lg leading-snug">
              map %<br />X: {debugCoord.x}% · Y: {debugCoord.y}%
            </div>
          )}

          {regionDrawer}
          {locationDrawer}
        </div>
      </div>
    </div>
  )
}
