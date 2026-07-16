import type { RegionMapRow } from '../passportPageData'

export default function JourneyMapPageContent({
  rows,
  onSelectRegion,
}: {
  rows: RegionMapRow[]
  onSelectRegion?: (regionId: string) => void
}) {
  return (
    <>
      <h2 className="passport-page-title">Journey Map</h2>
      <p className="passport-page-subtitle">Regions of the Muslim world</p>
      <div
        className="rounded-md border flex-1 min-h-0 overflow-hidden mb-1"
        style={{ borderColor: 'rgba(201, 168, 76, 0.45)', backgroundColor: 'rgba(253, 246, 227, 0.5)' }}
        aria-hidden
      >
        <svg viewBox="0 0 320 120" className="h-full w-full opacity-80">
          <rect width="320" height="120" fill="rgba(180, 206, 223, 0.35)" />
          <ellipse cx="160" cy="70" rx="95" ry="42" fill="rgba(49, 95, 71, 0.18)" stroke="#315f47" strokeWidth="1" />
          <ellipse cx="110" cy="58" rx="28" ry="18" fill="rgba(201, 168, 76, 0.25)" stroke="#c9a84c" strokeWidth="0.8" />
          <ellipse cx="200" cy="62" rx="32" ry="20" fill="rgba(53, 92, 125, 0.2)" stroke="#355c7d" strokeWidth="0.8" />
        </svg>
      </div>
      <ul className="m-0 list-none p-0 space-y-0.5 overflow-y-auto flex-1 min-h-0">
        {rows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              disabled={row.locked}
              onClick={() => onSelectRegion?.(row.id)}
              className="flex w-full items-center justify-between gap-2 rounded px-1 py-0.5 text-left hover:bg-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2aafa0] disabled:opacity-50 disabled:cursor-default"
            >
              <span className="passport-field-value text-[0.72rem]">
                {row.name}
                {row.locked ? ' — Locked' : ''}
              </span>
              <span className="passport-field-label text-[0.55rem]">
                {row.locked ? '🔒' : row.percent >= 100 ? '✓' : `${row.percent}%`}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
