import type { stampMotifForLocation } from './passportUtils'

const MOTIF_PATHS: Record<ReturnType<typeof stampMotifForLocation>, string> = {
  mosque: 'M8 28 L16 8 L24 28 Z M6 28 H26',
  minaret: 'M14 6 H18 V10 M16 10 V28 M12 28 H20',
  dome: 'M6 28 Q16 6 26 28 Z M8 28 H24',
  mountain: 'M4 28 L12 12 L18 20 L28 8 L28 28 Z',
  trade: 'M6 20 H26 M10 20 V12 M20 20 V12 M8 28 H24',
  library: 'M8 10 H24 V28 H8 Z M12 14 H20 M12 18 H20',
}

export default function StampMotif({ motif, color }: { motif: ReturnType<typeof stampMotifForLocation>; color: string }) {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" aria-hidden>
      <path d={MOTIF_PATHS[motif]} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
