import { KNOWLEDGE_ERAS, KNOWLEDGE_REGION_OPTIONS } from './knowledgeMapData'
import type { KnowledgeMapFilters } from './types'

const DIFFICULTIES = [
  { value: 'all', label: 'All Difficulties' },
  { value: 'explorer', label: 'Explorer' },
  { value: 'discoverer', label: 'Discoverer' },
  { value: 'thinker', label: 'Thinker' },
] as const

export interface KnowledgeFiltersProps {
  filters: KnowledgeMapFilters
  onChange: (filters: KnowledgeMapFilters) => void
  onHowToPlay: () => void
}

export default function KnowledgeFilters({ filters, onChange, onHowToPlay }: KnowledgeFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <label className="sr-only" htmlFor="km-era">
          Era filter
        </label>
        <select
          id="km-era"
          value={filters.era}
          onChange={(e) => onChange({ ...filters, era: e.target.value as KnowledgeMapFilters['era'] })}
          className="shrink-0 rounded-full border border-[#C8D8F0] bg-white px-4 py-2 text-sm font-bold text-[#1B2F5E] focus:border-[#2AAFA0] focus:outline-none focus:ring-2 focus:ring-[#2AAFA0]/30"
        >
          {KNOWLEDGE_ERAS.map((era) => (
            <option key={era} value={era}>
              {era === 'all' ? 'All Eras' : era}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="km-region">
          Region filter
        </label>
        <select
          id="km-region"
          value={filters.region}
          onChange={(e) => onChange({ ...filters, region: e.target.value })}
          className="shrink-0 rounded-full border border-[#C8D8F0] bg-white px-4 py-2 text-sm font-bold text-[#1B2F5E] focus:border-[#2AAFA0] focus:outline-none focus:ring-2 focus:ring-[#2AAFA0]/30"
        >
          {KNOWLEDGE_REGION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="km-difficulty">
          Difficulty filter
        </label>
        <select
          id="km-difficulty"
          value={filters.difficulty}
          onChange={(e) =>
            onChange({ ...filters, difficulty: e.target.value as KnowledgeMapFilters['difficulty'] })
          }
          className="shrink-0 rounded-full border border-[#C8D8F0] bg-white px-4 py-2 text-sm font-bold text-[#1B2F5E] focus:border-[#2AAFA0] focus:outline-none focus:ring-2 focus:ring-[#2AAFA0]/30"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onHowToPlay}
        className="shrink-0 rounded-full border border-[#1B2F5E]/20 bg-white px-4 py-2 text-sm font-extrabold text-[#1B2F5E] hover:bg-[#EEF4FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
      >
        ? How to Play
      </button>
    </div>
  )
}
