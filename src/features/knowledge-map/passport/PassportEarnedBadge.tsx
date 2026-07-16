import type { KnowledgeBadge } from '../types'

const SHIELD_COLORS = ['#315f47', '#c9a84c', '#355c7d', '#8b5a3c']

export default function PassportEarnedBadge({
  badge,
  index = 0,
  size = 'md',
}: {
  badge: KnowledgeBadge
  index?: number
  size?: 'sm' | 'md' | 'lg'
}) {
  const dim = size === 'lg' ? 56 : size === 'sm' ? 36 : 44
  const color = SHIELD_COLORS[index % SHIELD_COLORS.length]

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: dim,
        height: dim * 1.15,
        clipPath: 'polygon(50% 0%, 100% 28%, 82% 100%, 18% 100%, 0% 28%)',
        background: badge.earned ? color : 'rgba(107, 90, 69, 0.25)',
        opacity: badge.earned ? 1 : 0.45,
        fontSize: size === 'lg' ? '1.4rem' : size === 'sm' ? '0.85rem' : '1.1rem',
      }}
      title={badge.name}
      aria-label={badge.earned ? `${badge.name} earned` : `${badge.name} locked`}
    >
      <span aria-hidden>{badge.icon}</span>
    </div>
  )
}
