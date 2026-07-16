import { formatStampDate, stampColorForIndex, stampMotifForLocation } from './passportUtils'
import StampMotif from './StampMotif'
import type { PassportRecentVisit } from '../types'

const INK: Record<string, string> = {
  green: '#315f47',
  blue: '#355c7d',
  rust: '#9b4d35',
  brown: '#6b4a2e',
}

export default function RecentVisitStamp({
  visit,
  index,
  compact = false,
  onSelect,
}: {
  visit: PassportRecentVisit
  index: number
  compact?: boolean
  onSelect?: () => void
}) {
  const colorKey = stampColorForIndex(index)
  const ink = INK[colorKey]
  const rotation = compact ? 0 : ((index % 3) - 1) * 1.5

  const inner = (
    <div
      className={compact ? 'passport-stamp-compact' : 'rounded-lg border-2 p-2 text-center transition-transform hover:-translate-y-0.5 hover:shadow-md'}
      style={
        compact
          ? undefined
          : {
              borderColor: ink,
              backgroundColor: 'rgba(253, 246, 227, 0.92)',
              transform: `rotate(${rotation}deg)`,
            }
      }
      title={`${visit.title} — ${visit.regionName}`}
    >
      <div className={`flex justify-center ${compact ? 'mb-0.5' : 'mb-1'}`}>
        <StampMotif motif={stampMotifForLocation(visit.id)} color={ink} />
      </div>
      <p className={`passport-field-value m-0 line-clamp-1 ${compact ? 'text-[0.5rem]' : 'text-[0.62rem]'}`}>
        {visit.title}
      </p>
      {!compact && (
        <>
          <p className="passport-field-label text-[0.45rem] m-0">{visit.regionName}</p>
          <p className="passport-field-label text-[0.42rem] m-0 mt-0.5">{formatStampDate(visit.completedAt)}</p>
        </>
      )}
    </div>
  )

  if (onSelect) {
    return (
      <button type="button" onClick={onSelect} className="bg-transparent border-0 p-0 cursor-pointer text-left w-full h-full">
        {inner}
      </button>
    )
  }

  return inner
}
