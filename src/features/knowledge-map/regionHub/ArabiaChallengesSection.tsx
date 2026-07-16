import { Check, Compass, Lock } from 'lucide-react'
import compassArt from '@/assets/knowledge-map/arabia-hub/arabia-explorer-compass.png'
import { ARABIA_CHALLENGES, ARABIA_CHALLENGES_COMPLETED, type ArabiaChallenge } from './arabiaChallenges'
import { HUB_COLORS } from './regionHubTheme'

function statusLabel(status: ArabiaChallenge['status']) {
  switch (status) {
    case 'completed':
      return 'Complete'
    case 'in_progress':
      return 'In progress'
    default:
      return 'Locked'
  }
}

function statusColor(status: ArabiaChallenge['status']) {
  switch (status) {
    case 'completed':
      return HUB_COLORS.emerald
    case 'in_progress':
      return HUB_COLORS.gold
    default:
      return HUB_COLORS.textMuted
  }
}

export default function ArabiaChallengesSection() {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-sm"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold m-0" style={{ color: HUB_COLORS.emerald }}>
            Explorer Challenges
          </h3>
          <span className="text-xs font-extrabold shrink-0" style={{ color: HUB_COLORS.teal }}>
            {ARABIA_CHALLENGES_COMPLETED} / {ARABIA_CHALLENGES.length}
          </span>
        </div>
        <p className="text-sm font-medium mt-1 m-0" style={{ color: HUB_COLORS.textMuted }}>
          Complete challenges to earn badges, scrolls, and collectibles.
        </p>
      </div>

      <div className="px-4 pb-4">
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: HUB_COLORS.border }}
        >
          <img
            src={compassArt}
            alt="Watercolor illustration of a brass compass resting on an old map"
            className="w-full object-cover"
          />
        </div>
      </div>

      <ul className="flex flex-col gap-2 px-4 pb-4 m-0 list-none">
        {ARABIA_CHALLENGES.map((challenge) => (
          <li
            key={challenge.id}
            className={`rounded-lg border px-3 py-3 ${challenge.status === 'locked' ? 'opacity-75' : ''}`}
            style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    challenge.status === 'completed'
                      ? `${HUB_COLORS.emerald}18`
                      : challenge.status === 'in_progress'
                        ? `${HUB_COLORS.gold}22`
                        : `${HUB_COLORS.border}80`,
                  color:
                    challenge.status === 'completed'
                      ? HUB_COLORS.emerald
                      : challenge.status === 'in_progress'
                        ? HUB_COLORS.gold
                        : HUB_COLORS.textMuted,
                }}
                aria-hidden
              >
                {challenge.status === 'completed' ? (
                  <Check className="h-4 w-4" />
                ) : challenge.status === 'locked' ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  <Compass className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                    {challenge.title}
                  </p>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wide"
                    style={{ color: statusColor(challenge.status) }}
                  >
                    {statusLabel(challenge.status)}
                  </span>
                </div>
                <p className="text-xs font-medium m-0 mt-1" style={{ color: HUB_COLORS.textMuted }}>
                  {challenge.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ backgroundColor: `${HUB_COLORS.gold}18`, color: HUB_COLORS.emerald }}
                  >
                    Reward: {challenge.reward}
                  </span>
                  {challenge.progress && (
                    <span className="text-[10px] font-extrabold" style={{ color: HUB_COLORS.teal }}>
                      {challenge.progress}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
