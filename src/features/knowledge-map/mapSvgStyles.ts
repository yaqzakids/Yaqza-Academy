/** Minimal historical atlas palette — geography unchanged, style only. */
export const MAP_ATLAS = {
  parchment: '#F6ECD2',
  surroundingLand: '#EAD8B8',
  muslimWorldBase: '#A9BE8F',
  hoverRegion: '#3E7A66',
  selectedRegion: '#174A34',
  selectedGlow: '#F5C76B',
  border: '#B89C6A',
  water: '#BFD6E5',
  navy: '#1B2F5E',
  textDark: '#17365D',
} as const

export const MAP_OCEAN_FILL = MAP_ATLAS.water
export const MAP_CONTEXT_LAND_FILL = MAP_ATLAS.surroundingLand
export const MAP_CONTEXT_LAND_STROKE = MAP_ATLAS.border
export const MAP_COUNTRY_DEFAULT_FILL = MAP_ATLAS.muslimWorldBase
export const MAP_COUNTRY_DEFAULT_STROKE = MAP_ATLAS.border
export const MAP_COUNTRY_HOVER_FILL = MAP_ATLAS.hoverRegion
export const MAP_COUNTRY_SELECTED_FILL = MAP_ATLAS.selectedRegion
export const MAP_COUNTRY_SELECTED_STROKE = MAP_ATLAS.selectedGlow
export const MAP_COUNTRY_LOCKED_FILL = MAP_ATLAS.muslimWorldBase
export const MAP_COUNTRY_COMPLETED_STROKE = MAP_ATLAS.border

/** @deprecated */
export const MAP_COUNTRY_HIGHLIGHT_FILL = MAP_ATLAS.selectedRegion
export const MAP_COUNTRY_HIGHLIGHT_STROKE = MAP_ATLAS.border
