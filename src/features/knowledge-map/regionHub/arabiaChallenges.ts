export type ChallengeStatus = 'completed' | 'in_progress' | 'locked'

export interface ArabiaChallenge {
  id: string
  title: string
  description: string
  reward: string
  status: ChallengeStatus
  progress?: string
}

/** Five explorer challenges across the Arabia region. */
export const ARABIA_CHALLENGES: ArabiaChallenge[] = [
  {
    id: 'find-arabia',
    title: 'Desert Navigator',
    description: 'Find Arabia on the world map and open the region hub.',
    reward: 'Explorer Compass',
    status: 'completed',
  },
  {
    id: 'sacred-cities',
    title: 'Sacred Cities',
    description: 'Explore Makkah and Madinah on the atlas.',
    reward: 'Mosque Badge',
    status: 'completed',
    progress: '2 / 2',
  },
  {
    id: 'story-seeker',
    title: 'Story Seeker',
    description: 'Read five stories from the scrolls of Arabia.',
    reward: 'Ancient Scroll',
    status: 'in_progress',
    progress: '3 / 5',
  },
  {
    id: 'landmark-hunter',
    title: 'Landmark Hunter',
    description: 'Discover four great landmarks across the peninsula.',
    reward: 'Landmark Token',
    status: 'in_progress',
    progress: '2 / 4',
  },
  {
    id: 'master-explorer',
    title: 'Master Explorer',
    description: 'Complete every Arabia region discovery.',
    reward: 'Master Explorer Badge',
    status: 'locked',
  },
]

export const ARABIA_CHALLENGES_COMPLETED = ARABIA_CHALLENGES.filter((c) => c.status === 'completed').length
