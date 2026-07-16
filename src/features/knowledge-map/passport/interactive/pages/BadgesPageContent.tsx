import PassportEarnedBadge from '../../PassportEarnedBadge'
import type { KnowledgeBadge } from '../../../types'

const EXTRA_BADGES: KnowledgeBadge[] = [
  { id: 'quran-explorer', name: "Qur'an Explorer", icon: '📖', earned: true },
  { id: 'history-seeker', name: 'History Seeker', icon: '🏛️', earned: true },
  { id: 'great-traveller', name: 'Great Traveller', icon: '🧭', earned: false },
  { id: 'knowledge-star', name: 'Knowledge Star', icon: '⭐', earned: true },
  { id: 'story-master', name: 'Story Master', icon: '📜', earned: false },
  { id: 'mosque-explorer', name: 'Mosque Explorer', icon: '🕌', earned: true },
  { id: 'civilization-expert', name: 'Civilization Expert', icon: '🌍', earned: false },
]

export default function BadgesPageContent({ badges }: { badges: KnowledgeBadge[] }) {
  const merged = [...badges]
  for (const badge of EXTRA_BADGES) {
    if (!merged.some((b) => b.id === badge.id)) merged.push(badge)
  }

  return (
    <>
      <h2 className="passport-page-title">Badges Earned</h2>
      <p className="passport-page-subtitle">Shield emblems of achievement</p>
      <div className="flex flex-wrap gap-2 justify-center content-start flex-1 overflow-y-auto py-1">
        {merged.map((badge, index) => (
          <div key={badge.id} className="flex flex-col items-center w-[72px]" title={badge.name}>
            <PassportEarnedBadge badge={badge} index={index} size={badge.earned ? 'lg' : 'sm'} />
            <p className="passport-field-label text-[0.45rem] text-center mt-0.5 m-0">{badge.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}
