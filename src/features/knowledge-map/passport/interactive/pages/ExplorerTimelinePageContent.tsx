import type { TimelineEntry } from '../passportPageData'

export default function ExplorerTimelinePageContent({ entries }: { entries: TimelineEntry[] }) {
  return (
    <>
      <h2 className="passport-page-title">Explorer Timeline</h2>
      <p className="passport-page-subtitle">Milestones along the way</p>
      <ol className="m-0 list-none p-0 space-y-2 flex-1 min-h-0 overflow-y-auto">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="rounded border px-2 py-1.5"
            style={{ borderColor: 'rgba(201, 168, 76, 0.45)', backgroundColor: 'rgba(253, 246, 227, 0.88)' }}
          >
            <p className="passport-field-value text-[0.68rem] m-0">{entry.label}</p>
            <p className="passport-field-label m-0 text-[0.5rem]">{entry.date}</p>
          </li>
        ))}
      </ol>
    </>
  )
}
