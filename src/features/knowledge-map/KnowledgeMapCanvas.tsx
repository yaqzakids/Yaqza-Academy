import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import LocationDetailDrawer from './LocationDetailDrawer'
import KnowledgeWorldMap from './KnowledgeWorldMap'
import RegionDetailDrawer from './RegionDetailDrawer'
import ArabiaRegionHub from './regionHub/ArabiaRegionHub'
import type { RegionHubTab } from './regionHub/arabiaRegionHubData'
import { CAMERA_ANIMATION_MS, measureDrawerInsets, type MapViewportInsets } from './mapCamera'
import { getRegionCentroidPercent } from './InteractiveMuslimWorldMap'
import { zoomForRegion } from './worldMapLayout'
import { muslimMapAnchorForLocation } from './locationLayout'
import type { KnowledgeRegion } from './types'
import type { MapViewLevel } from './types'
import { useMapCamera } from './useMapCamera'

export interface KnowledgeMapCanvasProps {
  regions: KnowledgeRegion[]
  viewLevel: MapViewLevel
  selectedRegionId: string | null
  selectedLocationId: string | null
  selectedRegion: KnowledgeRegion | null
  drawerOpen: boolean
  onSelectRegion: (regionId: string) => void
  onSelectLocation: (locationId: string) => void
  onResetWorld: () => void
  onOpenRegionDrawer: () => void
  onCloseDrawer: () => void
  onCloseRegionView: () => void
  onStartLocationJourney: (locationId: string) => void
  onViewPassport?: () => void
}

function focusRegion(
  region: KnowledgeRegion,
  camera: ReturnType<typeof useMapCamera>,
  mapSvg: SVGSVGElement | null,
) {
  const centroid = mapSvg ? getRegionCentroidPercent(mapSvg, region.slug) : null
  const anchor = centroid ?? region.muslimMapAnchor
  const zoom = zoomForRegion(region.slug, region.status)
  camera.centerMapOnPoint(anchor.x, anchor.y, zoom)
}

export default function KnowledgeMapCanvas({
  regions,
  viewLevel,
  selectedRegionId,
  selectedLocationId,
  selectedRegion,
  drawerOpen,
  onSelectRegion,
  onSelectLocation,
  onResetWorld,
  onCloseDrawer,
  onCloseRegionView,
  onStartLocationJourney,
  onViewPassport,
}: KnowledgeMapCanvasProps) {
  const [isPointerOverDrawer, setIsPointerOverDrawer] = useState(false)
  const [regionalOverlayVisible, setRegionalOverlayVisible] = useState(false)
  const [drawerInsets, setDrawerInsets] = useState<MapViewportInsets>({})
  const [hubTab, setHubTab] = useState<RegionHubTab>('overview')
  const [mobileAtlasOpen, setMobileAtlasOpen] = useState(false)
  const drawerPanelRef = useRef<HTMLDivElement>(null)
  const hubPanelRef = useRef<HTMLDivElement>(null)
  const mapSvgRef = useRef<SVGSVGElement | null>(null)

  const arabiaHubActive =
    selectedRegion?.slug === 'arabia' && viewLevel !== 'world' && drawerOpen

  const camera = useMapCamera({
    mapInteractionBlocked: isPointerOverDrawer,
    drawerInsets,
  })

  useLayoutEffect(() => {
    // Split hub panel sits beside the map — it does not cover the viewport.
    if (arabiaHubActive) {
      setDrawerInsets({})
      return
    }

    const viewport = camera.viewportRef.current
    const panel = drawerPanelRef.current
    const shouldMeasure = drawerOpen
    if (!viewport || !panel || !shouldMeasure) {
      setDrawerInsets({})
      return
    }

    const syncInsets = () => {
      setDrawerInsets(measureDrawerInsets(viewport, panel))
    }

    syncInsets()
    const ro = new ResizeObserver(syncInsets)
    ro.observe(viewport)
    ro.observe(panel)
    return () => ro.disconnect()
  }, [arabiaHubActive, drawerOpen, viewLevel, selectedRegionId, camera.viewportRef])

  useEffect(() => {
    if (!arabiaHubActive) {
      setHubTab('overview')
      setMobileAtlasOpen(false)
    }
  }, [arabiaHubActive])

  useEffect(() => {
    if (viewLevel === 'world') {
      setRegionalOverlayVisible(false)
    }
  }, [viewLevel])

  useEffect(() => {
    if (viewLevel === 'world' || !selectedRegionId) return

    setRegionalOverlayVisible(false)
    const overlayTimer = window.setTimeout(() => setRegionalOverlayVisible(true), CAMERA_ANIMATION_MS)

    return () => {
      window.clearTimeout(overlayTimer)
    }
  }, [selectedRegionId, viewLevel])

  useEffect(() => {
    if (viewLevel === 'world') {
      camera.flyToWorld()
      return
    }
    if (!selectedRegion) return

    focusRegion(selectedRegion, camera, mapSvgRef.current)

    if (viewLevel === 'location' && selectedLocationId) {
      const location = selectedRegion.locations.find((l) => l.id === selectedLocationId)
      if (location) {
        const locAnchor = muslimMapAnchorForLocation(
          selectedRegion.slug,
          location.id,
          selectedRegion.locations.findIndex((l) => l.id === selectedLocationId),
          selectedRegion.locations.length,
        )
        camera.flyToLocation(locAnchor.x, locAnchor.y)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewLevel, selectedRegionId, selectedLocationId, drawerInsets])

  const handleSelectRegion = useCallback(
    (regionId: string) => {
      onSelectRegion(regionId)
      const region = regions.find((r) => r.id === regionId)
      if (region) focusRegion(region, camera, mapSvgRef.current)
    },
    [camera, onSelectRegion, regions],
  )

  const handleResetWorld = () => {
    camera.flyToWorld()
    onResetWorld()
  }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    handleResetWorld()
  }

  const handleDrawerPointerEnter = () => setIsPointerOverDrawer(true)
  const handleDrawerPointerLeave = () => setIsPointerOverDrawer(false)

  const mapElement = (
    <KnowledgeWorldMap
      regions={regions}
      viewLevel={viewLevel}
      selectedRegion={selectedRegion}
      selectedRegionId={selectedRegionId}
      selectedLocationId={selectedLocationId}
      regionalOverlayVisible={regionalOverlayVisible}
      onSelectRegion={handleSelectRegion}
      onSelectLocation={onSelectLocation}
      onResetWorld={handleResetWorld}
      onContextMenu={handleContextMenu}
      camera={camera}
      embeddedInHub={arabiaHubActive}
      onMapSvgReady={(svg) => {
        mapSvgRef.current = svg
        if (svg && selectedRegion && viewLevel !== 'world') {
          focusRegion(selectedRegion, camera, svg)
        }
      }}
      regionDrawer={
        !arabiaHubActive ? (
          <RegionDetailDrawer
            region={selectedRegion}
            open={drawerOpen && viewLevel === 'region'}
            onClose={onCloseRegionView}
            onSelectLocation={onSelectLocation}
            onPointerEnter={handleDrawerPointerEnter}
            onPointerLeave={handleDrawerPointerLeave}
            panelRef={drawerPanelRef}
          />
        ) : null
      }
      locationDrawer={
        <LocationDetailDrawer
          location={selectedRegion?.locations.find((l) => l.id === selectedLocationId) ?? null}
          regionName={selectedRegion?.name ?? ''}
          open={drawerOpen && viewLevel === 'location'}
          onClose={onCloseDrawer}
          onStartJourney={onStartLocationJourney}
          onPointerEnter={handleDrawerPointerEnter}
          onPointerLeave={handleDrawerPointerLeave}
          panelRef={arabiaHubActive ? undefined : drawerPanelRef}
        />
      }
    />
  )

  if (!arabiaHubActive) {
    return mapElement
  }

  return (
    <div
      className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#B89C6A]/50 flex flex-col lg:flex-row min-h-[min(72vh,640px)]"
      style={{ backgroundColor: '#B4CEDF' }}
    >
      {/* Map column — hidden on mobile unless atlas overlay is open */}
      <div
        className={`lg:w-[48%] shrink-0 ${
          mobileAtlasOpen ? 'fixed inset-0 z-50 flex flex-col' : 'hidden md:block'
        }`}
      >
        {mobileAtlasOpen && (
          <button
            type="button"
            onClick={() => setMobileAtlasOpen(false)}
            className="absolute top-4 right-4 z-[60] rounded-full border bg-white px-3 py-1.5 text-xs font-bold shadow-md"
            style={{ borderColor: '#E7D7B8', color: '#1B2F5E' }}
          >
            Close Atlas
          </button>
        )}
        <div className={mobileAtlasOpen ? 'h-full' : 'h-full min-h-[360px] lg:min-h-[520px]'}>
          {mapElement}
        </div>
      </div>

      {/* Arabia Region Hub */}
      <div
        ref={hubPanelRef}
        className="flex-1 lg:w-[52%] min-h-0 border-[#E7D7B8] lg:border-l"
      >
        <ArabiaRegionHub
          region={selectedRegion!}
          activeTab={hubTab}
          onTabChange={setHubTab}
          onBack={onCloseRegionView}
          onViewPassport={() => onViewPassport?.()}
          onSelectLocation={onSelectLocation}
          showAtlasCard
          onShowAtlas={() => setMobileAtlasOpen(true)}
        />
      </div>
    </div>
  )
}
