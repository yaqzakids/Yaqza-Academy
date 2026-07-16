import { mapPercentToContainerPx } from './mapViewport'
import type { MapCamera } from './types'

export const CAMERA_MIN_ZOOM = 1
export const CAMERA_MAX_ZOOM = 4
export const CAMERA_REGION_ZOOM = 2.6
export const CAMERA_REGION_ZOOM_LOCKED = 2.2
export const CAMERA_REGION_ZOOM_UNLOCKED = 2.6
export const CAMERA_LOCATION_ZOOM = 3
export const CAMERA_ANIMATION_MS = 600

/** Insets covering drawer chrome so focus centers in the visible map area. */
export interface MapViewportInsets {
  rightPx?: number
  bottomPx?: number
}

export const WORLD_CAMERA: MapCamera = {
  x: 0,
  y: 0,
  zoom: 1,
  focusX: 50,
  focusY: 50,
}

export function clampZoom(zoom: number): number {
  return Math.min(CAMERA_MAX_ZOOM, Math.max(CAMERA_MIN_ZOOM, zoom))
}

/** Pan in pixels so world point (focusX%, focusY%) sits at viewport center after scale. */
export function cameraToFocusPoint(
  focusX: number,
  focusY: number,
  zoom: number,
  viewWidth: number,
  viewHeight: number,
  insets: MapViewportInsets = {},
): MapCamera {
  return centerMapOnPoint(focusX, focusY, zoom, viewWidth, viewHeight, insets)
}

export function zoomForRegionStatus(status: 'locked' | 'in_progress' | 'completed'): number {
  return status === 'locked' ? CAMERA_REGION_ZOOM_LOCKED : CAMERA_REGION_ZOOM_UNLOCKED
}

/** Measure how much of the map viewport is covered by an open drawer panel. */
export function measureDrawerInsets(
  viewportEl: HTMLElement,
  panelEl: HTMLElement,
): MapViewportInsets {
  const vRect = viewportEl.getBoundingClientRect()
  const pRect = panelEl.getBoundingClientRect()
  const isSideDrawer = pRect.left > vRect.left + vRect.width * 0.35
  if (isSideDrawer) {
    return { rightPx: Math.max(0, vRect.right - pRect.left), bottomPx: 0 }
  }
  return { rightPx: 0, bottomPx: Math.max(0, vRect.bottom - pRect.top) }
}

/** Center the map on a Muslim World percentage point at the given zoom level. */
export function centerMapOnPoint(
  focusX: number,
  focusY: number,
  zoom: number,
  viewWidth: number,
  viewHeight: number,
  insets: MapViewportInsets = {},
): MapCamera {
  const z = clampZoom(zoom)
  const { px, py } = mapPercentToContainerPx({ x: focusX, y: focusY }, viewWidth, viewHeight)
  const rightInset = insets.rightPx ?? 0
  const bottomInset = insets.bottomPx ?? 0
  const cx = (viewWidth - rightInset) / 2
  const cy = (viewHeight - bottomInset) / 2
  return {
    x: cx - px * z,
    y: cy - py * z,
    zoom: z,
    focusX,
    focusY,
  }
}

export function clampCameraPan(
  camera: MapCamera,
  viewWidth: number,
  viewHeight: number,
): MapCamera {
  const marginX = viewWidth * 0.15
  const marginY = viewHeight * 0.15
  const minX = viewWidth - viewWidth * camera.zoom - marginX
  const maxX = marginX
  const minY = viewHeight - viewHeight * camera.zoom - marginY
  const maxY = marginY
  return {
    ...camera,
    x: Math.min(maxX, Math.max(minX, camera.x)),
    y: Math.min(maxY, Math.max(minY, camera.y)),
  }
}

export function viewLevelFromZoom(zoom: number): 'world' | 'region' | 'location' {
  if (zoom < 1.8) return 'world'
  if (zoom < 2.6) return 'region'
  return 'location'
}

export function layerVisibility(zoom: number) {
  return {
    regions: zoom < 2.4,
    cities: zoom >= 1.9,
    landmarks: zoom >= 2.7,
    activities: zoom >= 3.5,
    tradeRoutes: zoom >= 2,
    labels: zoom >= 2.2,
  }
}
