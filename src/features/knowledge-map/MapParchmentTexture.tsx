/** Subtle atlas parchment grain — style only, no map geometry changes. */
export default function MapParchmentTexture() {
  return (
    <div
      className="knowledge-map-texture pointer-events-none absolute inset-0 z-[5] rounded-[inherit]"
      aria-hidden
      style={{
        opacity: 0.07,
        mixBlendMode: 'multiply',
        backgroundImage: [
          'radial-gradient(circle at 20% 30%, rgba(120, 90, 45, 0.08), transparent 18%)',
          'radial-gradient(circle at 75% 60%, rgba(120, 90, 45, 0.06), transparent 20%)',
          'repeating-radial-gradient(circle, rgba(80, 60, 30, 0.035) 0 1px, transparent 1px 4px)',
        ].join(', '),
      }}
    />
  )
}
