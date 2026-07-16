import { MAP_COLORS } from './mapTheme'

export interface RegionFogOverlayProps {
  slug: string
  x: number
  y: number
  /** 1 = default size, larger = more coverage */
  scale?: number
}

/** Soft atmospheric fog hiding unexplored regions. */
export default function RegionFogOverlay({
  slug,
  x,
  y,
  scale = 1,
}: RegionFogOverlayProps) {
  const w = 140 * scale
  const h = 100 * scale
  const gradId = `fog-grad-${slug}`
  const blurId = `fog-blur-${slug}`

  return (
    <div
      className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x}%`, top: `${y}%`, width: w, height: h }}
      aria-hidden
    >
      <svg viewBox="0 0 140 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id={gradId} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#F8F4EE" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#E8E4DC" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#E8E4DC" stopOpacity="0" />
          </radialGradient>
          <filter id={blurId}>
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <ellipse cx="70" cy="50" rx="68" ry="48" fill={`url(#${gradId})`} filter={`url(#${blurId})`} />
        <ellipse cx="45" cy="42" rx="38" ry="28" fill="#F5F0E8" opacity="0.55" />
        <ellipse cx="95" cy="55" rx="32" ry="24" fill="#F0EBE3" opacity="0.45" />
      </svg>
      {/* Subtle mist edge */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${MAP_COLORS.parchment}22 100%)`,
        }}
      />
    </div>
  )
}
