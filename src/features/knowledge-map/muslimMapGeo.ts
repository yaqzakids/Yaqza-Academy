import type { MapAnchor } from './types'

/**
 * Affine fit from WGS84 to muslim-world-map.svg percentages (viewBox 1010×666).
 * Calibrated on Mecca and Jerusalem.
 */
const LON_TO_X_SCALE = 0.52
const LON_TO_X_OFFSET = 39.39
const LAT_TO_Y_SCALE = -0.493
const LAT_TO_Y_OFFSET = 70.36

function round1(n: number): number {
  return Math.round(n * 10) / 10
}

/** Convert WGS84 latitude/longitude to muslimMapAnchor percentages. */
export function geoToMuslimMapAnchor(lat: number, lon: number): MapAnchor {
  return {
    x: round1(lon * LON_TO_X_SCALE + LON_TO_X_OFFSET),
    y: round1(lat * LAT_TO_Y_SCALE + LAT_TO_Y_OFFSET),
  }
}

/** Kaaba, Masjid al-Haram — Mecca. */
export const MECCA_GEO = {
  lat: 21.422487,
  lon: 39.826206,
} as const

/** Mecca on the full-world map. */
export const MECCA_MUSLIM_MAP_ANCHOR: MapAnchor = geoToMuslimMapAnchor(MECCA_GEO.lat, MECCA_GEO.lon)
