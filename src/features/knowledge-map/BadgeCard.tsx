import type { KnowledgeBadge } from './types'

export default function BadgeCard({ badge }: { badge: KnowledgeBadge }) {
  return (
    <div
      className={[
        'flex flex-col items-center gap-1 min-w-[72px]',
        !badge.earned ? 'opacity-40 grayscale' : '',
      ].join(' ')}
    >
      <div
        className={[
          'w-12 h-12 rounded-full flex items-center justify-center text-xl border-2',
          badge.earned
            ? 'bg-[#EEF4FF] border-[#2AAFA0]/40'
            : 'bg-gray-100 border-gray-200',
        ].join(' ')}
      >
        {badge.icon}
      </div>
      <span className="text-[10px] font-bold text-[#1B2F5E] text-center leading-tight">{badge.name}</span>
    </div>
  )
}
