import type { KnowledgeCollectible } from '../types'

export default function PassportCollectibleCard({ item }: { item: KnowledgeCollectible }) {
  return (
    <div
      className="rounded border p-1.5 text-center"
      style={{ borderColor: 'rgba(201, 168, 76, 0.5)', backgroundColor: 'rgba(253, 246, 227, 0.9)' }}
    >
      <span className="text-lg" aria-hidden>
        {item.icon}
      </span>
      <p className="passport-field-value text-[0.6rem] m-0 mt-0.5 line-clamp-2">{item.name}</p>
      <p className="passport-field-label text-[0.45rem] m-0">×{item.count}</p>
    </div>
  )
}
