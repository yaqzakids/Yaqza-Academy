import type { KnowledgeCollectible } from './types'

export default function CollectibleCard({ item }: { item: KnowledgeCollectible }) {
  return (
    <div className="flex flex-col items-center gap-1 min-w-[72px]">
      <div className="w-12 h-12 rounded-full bg-[#FFF8ED] border border-[#F5A623]/30 flex items-center justify-center text-xl">
        {item.icon}
      </div>
      <span className="text-[10px] font-bold text-[#1B2F5E] text-center leading-tight">{item.name}</span>
      <span className="text-xs font-extrabold text-[#F5A623]">{item.count}</span>
    </div>
  )
}
