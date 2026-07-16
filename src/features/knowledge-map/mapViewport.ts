/**
 * Full world viewport on muslim-world-map.svg (@svg-maps/world).
 * Shows all continents and countries; Muslim World regions remain interactive on top.
 */
export const WORLD_VIEWBOX = {
  x: 0,
  y: 0,
  width: 1010,
  height: 666,
} as const

export const WORLD_VIEWBOX_STRING = `${WORLD_VIEWBOX.x} ${WORLD_VIEWBOX.y} ${WORLD_VIEWBOX.width} ${WORLD_VIEWBOX.height}`

export interface MapPercentPoint {
  x: number
  y: number
}

/** Map anchor (0–100%) → viewBox user units. */
export function mapPercentToViewBox(point: MapPercentPoint) {
  return {
    x: (point.x / 100) * WORLD_VIEWBOX.width,
    y: (point.y / 100) * WORLD_VIEWBOX.height,
  }
}

/**
 * Map anchor (0–100%) → container-local pixel position when SVG uses xMidYMid meet.
 * Keeps pins and camera aligned with land when the viewport aspect differs from the map.
 */
export function mapPercentToContainerPx(
  point: MapPercentPoint,
  containerWidth: number,
  containerHeight: number,
) {
  const scale = Math.min(
    containerWidth / WORLD_VIEWBOX.width,
    containerHeight / WORLD_VIEWBOX.height,
  )
  const renderedW = WORLD_VIEWBOX.width * scale
  const renderedH = WORLD_VIEWBOX.height * scale
  const offsetX = (containerWidth - renderedW) / 2
  const offsetY = (containerHeight - renderedH) / 2
  const { x: svgX, y: svgY } = mapPercentToViewBox(point)
  return {
    px: offsetX + svgX * scale,
    py: offsetY + svgY * scale,
  }
}

/** @deprecated Use WORLD_VIEWBOX — kept for any lingering imports during migration. */
export const OLD_WORLD_VIEWBOX = WORLD_VIEWBOX
export const OLD_WORLD_VIEWBOX_STRING = WORLD_VIEWBOX_STRING
