import { useEffect, useState } from 'react'
import { MAP_ATLAS } from './mapSvgStyles'

const ERAS = ['632 CE', '1000 CE', '1500 CE'] as const

export interface MapTimelineDrawerProps {
  open: boolean
  onClose: () => void
}

export default function MapTimelineDrawer({ open, onClose }: MapTimelineDrawerProps) {
  const [eraIndex, setEraIndex] = useState(0)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="absolute inset-0 z-40 flex items-end pointer-events-none">
      <button
        type="button"
        className="absolute inset-0 pointer-events-auto bg-[#1B2F5E]/20"
        aria-label="Close timeline"
        onClick={onClose}
      />
      <div
        className="relative z-50 w-full pointer-events-auto border-t px-6 py-5 shadow-2xl"
        style={{
          backgroundColor: MAP_ATLAS.parchment,
          borderColor: `${MAP_ATLAS.border}60`,
        }}
        role="dialog"
        aria-label="Timeline era"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-md text-center">
          <p className="m-0 text-[10px] font-semibold uppercase tracking-widest" style={{ color: MAP_ATLAS.textDark }}>
            Timeline Era
          </p>
          <p className="m-0 mt-1 text-lg font-semibold" style={{ color: MAP_ATLAS.navy }}>
            {ERAS[eraIndex]}
          </p>
          <input
            type="range"
            min={0}
            max={ERAS.length - 1}
            step={1}
            value={eraIndex}
            onChange={(e) => setEraIndex(Number(e.target.value))}
            className="mt-4 w-full accent-[#174A34]"
            aria-label="Timeline era"
            aria-valuetext={ERAS[eraIndex]}
          />
          <div className="mt-2 flex justify-between text-[10px] font-medium" style={{ color: `${MAP_ATLAS.textDark}88` }}>
            {ERAS.map((era) => (
              <span key={era}>{era.replace(' CE', '')}</span>
            ))}
          </div>
          <p className="m-0 mt-3 text-[10px] font-medium" style={{ color: `${MAP_ATLAS.textDark}77` }}>
            Routes and cities will appear as you explore each era.
          </p>
        </div>
      </div>
    </div>
  )
}
