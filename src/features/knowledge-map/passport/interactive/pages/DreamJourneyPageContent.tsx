import { useState } from 'react'
import type { DreamRegion } from '../passportPageData'

export default function DreamJourneyPageContent({ regions }: { regions: DreamRegion[] }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleExploreNext = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      <h2 className="passport-page-title">My Dream Journey</h2>
      <p className="passport-page-subtitle">Places you may explore next</p>
      <ul className="m-0 list-none p-0 space-y-2 flex-1 min-h-0 overflow-y-auto">
        {regions.map((region) => (
          <li key={region.id}>
            <button
              type="button"
              onClick={() => toggleExploreNext(region.id)}
              className="flex w-full items-center justify-between rounded border px-2 py-1.5 text-left hover:bg-white/25 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2aafa0]"
              style={{ borderColor: 'rgba(201, 168, 76, 0.45)', backgroundColor: 'rgba(253, 246, 227, 0.88)' }}
            >
              <span className="passport-field-value text-[0.72rem]">{region.name}</span>
              <span className="passport-field-label text-[0.5rem]">
                {favorites.has(region.id) ? '★ Explore Next' : 'Mark Explore Next'}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {favorites.size > 0 && (
        <p className="passport-page-subtitle m-0 mt-1 text-center">
          Favorite destination saved for your next adventure.
        </p>
      )}
    </>
  )
}
