import { useCallback, useEffect, useRef, useState, type RefObject, type WheelEvent } from 'react'
import type { MapCamera } from './types'
import {
  CAMERA_ANIMATION_MS,
  CAMERA_LOCATION_ZOOM,
  CAMERA_MAX_ZOOM,
  CAMERA_MIN_ZOOM,
  CAMERA_REGION_ZOOM,
  WORLD_CAMERA,
  cameraToFocusPoint,
  centerMapOnPoint,
  clampCameraPan,
  clampZoom,
  type MapViewportInsets,
} from './mapCamera'

interface UseMapCameraOptions {
  onAnimationComplete?: () => void
  /** When true, wheel zoom and pinch are ignored (e.g. drawer open or pointer over drawer). */
  mapInteractionBlocked?: boolean
  /** Right/bottom chrome covering the map (e.g. open drawer). Re-centers focus when changed. */
  drawerInsets?: MapViewportInsets
}

interface FocusTarget {
  focusX: number
  focusY: number
  zoom: number
}

function readViewportSize(ref: RefObject<HTMLDivElement | null>) {
  const rect = ref.current?.getBoundingClientRect()
  if (!rect || rect.width < 8 || rect.height < 8) return null
  return { width: rect.width, height: rect.height }
}

export function useMapCamera(options: UseMapCameraOptions = {}) {
  const onAnimationCompleteRef = useRef(options.onAnimationComplete)
  onAnimationCompleteRef.current = options.onAnimationComplete
  const mapInteractionBlockedRef = useRef(options.mapInteractionBlocked ?? false)
  mapInteractionBlockedRef.current = options.mapInteractionBlocked ?? false
  const drawerInsetsRef = useRef<MapViewportInsets>(options.drawerInsets ?? {})
  drawerInsetsRef.current = options.drawerInsets ?? {}
  const viewportRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<FocusTarget | null>(null)
  const [camera, setCamera] = useState<MapCamera>(WORLD_CAMERA)
  const [isAnimating, setIsAnimating] = useState(false)
  const [size, setSize] = useState({ width: 1, height: 1 })
  const dragRef = useRef({ active: false, startX: 0, startY: 0, camX: 0, camY: 0 })
  const pinchRef = useRef<{ dist: number; zoom: number } | null>(null)

  const applyCamera = useCallback(
    (next: MapCamera, animate = true) => {
      const viewport = readViewportSize(viewportRef) ?? size
      const clamped = clampCameraPan(next, viewport.width, viewport.height)
      setCamera(clamped)
      if (animate) {
        setIsAnimating(true)
        window.setTimeout(() => {
          setIsAnimating(false)
          onAnimationCompleteRef.current?.()
        }, CAMERA_ANIMATION_MS)
      }
    },
    [size],
  )

  const applyFocus = useCallback(
    (focusX: number, focusY: number, zoom: number, animate = true) => {
      const viewport = readViewportSize(viewportRef)
      if (!viewport) {
        focusRef.current = { focusX, focusY, zoom }
        return false
      }

      focusRef.current = { focusX, focusY, zoom }
      const next = centerMapOnPoint(
        focusX,
        focusY,
        zoom,
        viewport.width,
        viewport.height,
        drawerInsetsRef.current,
      )
      applyCamera(next, animate)
      return true
    },
    [applyCamera],
  )

  const scheduleFocus = useCallback(
    (focusX: number, focusY: number, zoom: number, animate = true) => {
      if (applyFocus(focusX, focusY, zoom, animate)) return
      requestAnimationFrame(() => {
        if (!applyFocus(focusX, focusY, zoom, animate)) {
          requestAnimationFrame(() => applyFocus(focusX, focusY, zoom, animate))
        }
      })
    },
    [applyFocus],
  )

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return

    const syncSizeAndFocus = () => {
      const viewport = readViewportSize(viewportRef)
      if (!viewport) return
      setSize(viewport)

      const focus = focusRef.current
      if (!focus || focus.zoom <= 1.01) return

      const next = centerMapOnPoint(
        focus.focusX,
        focus.focusY,
        focus.zoom,
        viewport.width,
        viewport.height,
        drawerInsetsRef.current,
      )
      setCamera(clampCameraPan(next, viewport.width, viewport.height))
    }

    syncSizeAndFocus()
    const ro = new ResizeObserver(syncSizeAndFocus)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const focus = focusRef.current
    if (!focus || focus.zoom <= 1.01) return
    applyFocus(focus.focusX, focus.focusY, focus.zoom, false)
  }, [options.drawerInsets, applyFocus])

  const flyToWorld = useCallback(() => {
    focusRef.current = { focusX: 50, focusY: 50, zoom: 1 }
    applyCamera({ ...WORLD_CAMERA }, true)
  }, [applyCamera])

  const flyToPoint = useCallback(
    (focusX: number, focusY: number, zoom: number) => {
      scheduleFocus(focusX, focusY, zoom, true)
    },
    [scheduleFocus],
  )

  const centerMapOn = useCallback(
    (focusX: number, focusY: number, zoom: number) => scheduleFocus(focusX, focusY, zoom, true),
    [scheduleFocus],
  )

  const flyToRegion = useCallback(
    (focusX: number, focusY: number, zoom = CAMERA_REGION_ZOOM) =>
      scheduleFocus(focusX, focusY, zoom, true),
    [scheduleFocus],
  )

  const flyToLocation = useCallback(
    (focusX: number, focusY: number) => scheduleFocus(focusX, focusY, CAMERA_LOCATION_ZOOM, true),
    [scheduleFocus],
  )

  const zoomBy = useCallback(
    (delta: number, focalX?: number, focalY?: number) => {
      const viewport = readViewportSize(viewportRef) ?? size
      setCamera((prev) => {
        const nextZoom = clampZoom(prev.zoom + delta)
        if (nextZoom === prev.zoom) return prev
        const fx = focalX ?? prev.focusX
        const fy = focalY ?? prev.focusY
        focusRef.current = { focusX: fx, focusY: fy, zoom: nextZoom }
        const next = cameraToFocusPoint(fx, fy, nextZoom, viewport.width, viewport.height)
        return clampCameraPan(
          { ...next, x: prev.x + (next.x - prev.x) * 0.5, y: prev.y + (next.y - prev.y) * 0.5 },
          viewport.width,
          viewport.height,
        )
      })
    },
    [size],
  )

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (mapInteractionBlockedRef.current) return
      e.preventDefault()
      const rect = viewportRef.current?.getBoundingClientRect()
      if (!rect) return
      const focalX = ((e.clientX - rect.left) / rect.width) * 100
      const focalY = ((e.clientY - rect.top) / rect.height) * 100
      const delta = e.deltaY > 0 ? -0.15 : 0.15
      zoomBy(delta, focalX, focalY)
    },
    [zoomBy],
  )

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const listener = (e: globalThis.WheelEvent) => handleWheel(e as unknown as WheelEvent)
    el.addEventListener('wheel', listener, { passive: false })
    return () => el.removeEventListener('wheel', listener)
  }, [handleWheel])

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (mapInteractionBlockedRef.current) return
      if (e.button !== 0) return
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        camX: camera.x,
        camY: camera.y,
      }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    },
    [camera.x, camera.y],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current.active) return
      const viewport = readViewportSize(viewportRef) ?? size
      const dx = e.clientX - dragRef.current.startX
      const dy = e.clientY - dragRef.current.startY
      setCamera((prev) =>
        clampCameraPan(
          { ...prev, x: dragRef.current.camX + dx, y: dragRef.current.camY + dy },
          viewport.width,
          viewport.height,
        ),
      )
    },
    [size],
  )

  const handlePointerUp = useCallback(() => {
    dragRef.current.active = false
  }, [])

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      flyToWorld()
    },
    [flyToWorld],
  )

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = viewportRef.current?.getBoundingClientRect()
      if (!rect) return
      const focalX = ((e.clientX - rect.left) / rect.width) * 100
      const focalY = ((e.clientY - rect.top) / rect.height) * 100
      zoomBy(0.4, focalX, focalY)
    },
    [zoomBy],
  )

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2) {
        const [a, b] = [e.touches[0], e.touches[1]]
        const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
        pinchRef.current = { dist, zoom: camera.zoom }
      }
    },
    [camera.zoom],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (mapInteractionBlockedRef.current) return
      if (e.touches.length !== 2 || !pinchRef.current) return
      e.preventDefault()
      const viewport = readViewportSize(viewportRef) ?? size
      const [a, b] = [e.touches[0], e.touches[1]]
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      const scale = dist / pinchRef.current.dist
      const nextZoom = clampZoom(pinchRef.current.zoom * scale)
      const rect = viewportRef.current?.getBoundingClientRect()
      if (!rect) return
      const focalX = (((a.clientX + b.clientX) / 2 - rect.left) / rect.width) * 100
      const focalY = (((a.clientY + b.clientY) / 2 - rect.top) / rect.height) * 100
      focusRef.current = { focusX: focalX, focusY: focalY, zoom: nextZoom }
      const next = cameraToFocusPoint(focalX, focalY, nextZoom, viewport.width, viewport.height)
      setCamera(clampCameraPan(next, viewport.width, viewport.height))
    },
    [size],
  )

  const handleTouchEnd = useCallback(() => {
    pinchRef.current = null
  }, [])

  return {
    viewportRef,
    camera,
    isAnimating,
    flyToWorld,
    flyToRegion,
    flyToLocation,
    flyToPoint,
    centerMapOnPoint: centerMapOn,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleContextMenu,
    handleDoubleClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    minZoom: CAMERA_MIN_ZOOM,
    maxZoom: CAMERA_MAX_ZOOM,
  }
}
