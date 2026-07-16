import { useCallback, useEffect, useRef } from 'react'
import MuslimWorldMapSvg from '@/assets/knowledge-map/muslim-world-map.svg?react'
import {
  COUNTRY_TO_REGION,
  countriesForRegionSlug,
  normalizeCountryId,
  UNIFIED_TERRITORY_PATHS,
} from './regionCountryGroups'
import {
  MAP_CONTEXT_LAND_FILL,
  MAP_CONTEXT_LAND_STROKE,
  MAP_COUNTRY_DEFAULT_FILL,
  MAP_COUNTRY_DEFAULT_STROKE,
  MAP_COUNTRY_HOVER_FILL,
  MAP_COUNTRY_LOCKED_FILL,
  MAP_COUNTRY_SELECTED_FILL,
  MAP_COUNTRY_SELECTED_STROKE,
  MAP_OCEAN_FILL,
  MAP_ATLAS,
} from './mapSvgStyles'
import { WORLD_VIEWBOX, WORLD_VIEWBOX_STRING } from './mapViewport'
import type { KnowledgeRegion } from './types'

export interface InteractiveMuslimWorldMapProps {
  regions: KnowledgeRegion[]
  selectedRegionSlug: string | null
  hoveredRegionSlug: string | null
  interactive?: boolean
  onRegionHover: (regionSlug: string | null, clientX: number, clientY: number) => void
  onRegionSelect: (regionId: string) => void
  onSvgReady?: (svg: SVGSVGElement | null) => void
}

function regionBySlug(regions: KnowledgeRegion[], slug: string | null) {
  if (!slug) return null
  return regions.find((r) => r.slug === slug) ?? null
}

export function getRegionCentroidPercent(
  svg: SVGSVGElement,
  regionSlug: string,
): { x: number; y: number } | null {
  const countryIds = countriesForRegionSlug(regionSlug)
  if (!countryIds.length) return null

  const viewBox = svg.viewBox.baseVal
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let found = false

  for (const id of countryIds) {
    const path = svg.querySelector<SVGPathElement>(`#${CSS.escape(id)}`)
    if (!path) continue
    const box = path.getBBox()
    minX = Math.min(minX, box.x)
    minY = Math.min(minY, box.y)
    maxX = Math.max(maxX, box.x + box.width)
    maxY = Math.max(maxY, box.y + box.height)
    found = true
  }

  if (!found) return null
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  return {
    x: ((cx - viewBox.x) / viewBox.width) * 100,
    y: ((cy - viewBox.y) / viewBox.height) * 100,
  }
}

function bringPathsToFront(layer: SVGGElement, ids: string[]) {
  for (const id of ids) {
    const path = layer.querySelector<SVGPathElement>(`#${CSS.escape(id)}`)
    if (path) layer.appendChild(path)
  }
}

export default function InteractiveMuslimWorldMap({
  regions,
  selectedRegionSlug,
  hoveredRegionSlug,
  interactive = true,
  onRegionHover,
  onRegionSelect,
  onSvgReady,
}: InteractiveMuslimWorldMapProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const activeRegionRef = useRef<string | null>(null)

  const applyPathStyles = useCallback(
    (hovered: string | null, selected: string | null) => {
      const svg = svgRef.current
      if (!svg) return

      const paths = svg.querySelectorAll<SVGPathElement>('path[id]')
      paths.forEach((path) => {
        const countryId = normalizeCountryId(path.id)
        const regionSlug = COUNTRY_TO_REGION.get(countryId)
        const region = regionBySlug(regions, regionSlug ?? null)
        const isMapped = Boolean(regionSlug && region)
        const isSelected = Boolean(regionSlug && regionSlug === selected)
        const isHovered = Boolean(regionSlug && regionSlug === hovered && !isSelected)
        const isLocked = region?.status === 'locked'
        const noInternalBorder = UNIFIED_TERRITORY_PATHS.has(countryId)

        path.style.transition = 'fill 0.35s ease, stroke 0.35s ease, filter 0.35s ease'

        if (!isMapped) {
          path.style.fill = MAP_CONTEXT_LAND_FILL
          path.style.stroke = MAP_CONTEXT_LAND_STROKE
          path.style.strokeWidth = '0.3'
          path.style.opacity = '1'
          path.style.pointerEvents = 'none'
          path.style.cursor = 'default'
          path.style.filter = ''
          return
        }

        path.style.pointerEvents = interactive ? 'auto' : 'none'
        path.style.cursor = interactive ? 'pointer' : 'default'
        path.style.opacity = '1'

        if (isSelected) {
          path.style.fill = MAP_COUNTRY_SELECTED_FILL
          path.style.stroke = MAP_COUNTRY_SELECTED_STROKE
          path.style.strokeWidth = noInternalBorder ? '0.45' : '0.55'
          path.style.filter = `drop-shadow(0 0 1px ${MAP_ATLAS.selectedGlow}88)`
        } else if (isHovered) {
          path.style.fill = MAP_COUNTRY_HOVER_FILL
          path.style.stroke = noInternalBorder ? 'none' : MAP_COUNTRY_DEFAULT_STROKE
          path.style.strokeWidth = noInternalBorder ? '0' : '0.35'
          path.style.filter = 'none'
        } else {
          path.style.fill = isLocked ? MAP_COUNTRY_LOCKED_FILL : MAP_COUNTRY_DEFAULT_FILL
          path.style.stroke = noInternalBorder ? 'none' : MAP_COUNTRY_DEFAULT_STROKE
          path.style.strokeWidth = noInternalBorder ? '0' : '0.35'
          path.style.filter = 'none'
        }
      })
    },
    [interactive, regions],
  )

  useEffect(() => {
    applyPathStyles(hoveredRegionSlug, selectedRegionSlug)
  }, [applyPathStyles, hoveredRegionSlug, selectedRegionSlug])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const svg = wrapper.querySelector('svg')
    if (!svg) return

    svgRef.current = svg
    onSvgReady?.(svg)
    svg.setAttribute('viewBox', WORLD_VIEWBOX_STRING)
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
    svg.style.display = 'block'

    let ocean = svg.querySelector('#km-ocean')
    if (!ocean) {
      ocean = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      ocean.setAttribute('id', 'km-ocean')
      ocean.setAttribute('x', String(WORLD_VIEWBOX.x))
      ocean.setAttribute('y', String(WORLD_VIEWBOX.y))
      ocean.setAttribute('width', String(WORLD_VIEWBOX.width))
      ocean.setAttribute('height', String(WORLD_VIEWBOX.height))
      ocean.setAttribute('pointer-events', 'none')
      svg.insertBefore(ocean, svg.firstChild)
    }
    ocean.setAttribute('fill', MAP_OCEAN_FILL)

    let interactiveLayer = svg.querySelector('#km-interactive-layer')
    if (!interactiveLayer) {
      interactiveLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      interactiveLayer.setAttribute('id', 'km-interactive-layer')
      svg.appendChild(interactiveLayer)
    }

    const paths = svg.querySelectorAll<SVGPathElement>('path[id]')
    paths.forEach((path) => {
      const countryId = normalizeCountryId(path.id)
      if (COUNTRY_TO_REGION.has(countryId)) {
        interactiveLayer!.appendChild(path)
      }
    })

    bringPathsToFront(interactiveLayer as SVGGElement, countriesForRegionSlug('ash-sham'))
    bringPathsToFront(interactiveLayer as SVGGElement, [...UNIFIED_TERRITORY_PATHS])

    const interactivePaths = interactiveLayer.querySelectorAll<SVGPathElement>('path[id]')
    const cleanups: Array<() => void> = []

    interactivePaths.forEach((path) => {
      const countryId = normalizeCountryId(path.id)
      const regionSlug = COUNTRY_TO_REGION.get(countryId)
      if (!regionSlug) return

      const handleEnter = (e: MouseEvent) => {
        if (!interactive) return
        activeRegionRef.current = regionSlug
        onRegionHover(regionSlug, e.clientX, e.clientY)
      }

      const handleMove = (e: MouseEvent) => {
        if (!interactive || activeRegionRef.current !== regionSlug) return
        onRegionHover(regionSlug, e.clientX, e.clientY)
      }

      const handleLeave = () => {
        if (!interactive) return
        if (activeRegionRef.current === regionSlug) {
          activeRegionRef.current = null
          onRegionHover(null, 0, 0)
        }
      }

      const handleClick = (e: MouseEvent) => {
        if (!interactive) return
        e.stopPropagation()
        const region = regionBySlug(regions, regionSlug)
        if (region) onRegionSelect(region.id)
      }

      const handlePointerDown = (e: PointerEvent) => {
        if (!interactive) return
        e.stopPropagation()
      }

      path.addEventListener('mouseenter', handleEnter)
      path.addEventListener('mousemove', handleMove)
      path.addEventListener('mouseleave', handleLeave)
      path.addEventListener('click', handleClick)
      path.addEventListener('pointerdown', handlePointerDown)

      cleanups.push(() => {
        path.removeEventListener('mouseenter', handleEnter)
        path.removeEventListener('mousemove', handleMove)
        path.removeEventListener('mouseleave', handleLeave)
        path.removeEventListener('click', handleClick)
        path.removeEventListener('pointerdown', handlePointerDown)
      })
    })

    applyPathStyles(null, selectedRegionSlug)

    return () => {
      cleanups.forEach((fn) => fn())
      onSvgReady?.(null)
      svgRef.current = null
    }
  }, [applyPathStyles, interactive, onRegionHover, onRegionSelect, onSvgReady, regions, selectedRegionSlug])

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 h-full w-full [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:max-w-full"
      style={{ backgroundColor: MAP_OCEAN_FILL }}
    >
      <MuslimWorldMapSvg aria-label="Interactive Muslim World map" preserveAspectRatio="xMidYMid meet" />
    </div>
  )
}
