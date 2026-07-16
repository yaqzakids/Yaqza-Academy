import { roundStat, type JourneySummaryData } from '../passportPageData'

const DISPLAY_STATS: {
  key: keyof JourneySummaryData
  label: string
  max: number
}[] = [
  { key: 'storiesCompleted', label: 'Stories Read', max: 200 },
  { key: 'citiesVisited', label: 'Cities Visited', max: 50 },
  { key: 'challengesCompleted', label: 'Challenges Completed', max: 24 },
  { key: 'greatScholarsLearned', label: 'Quizzes Passed', max: 61 },
  { key: 'badgesEarned', label: 'Badges Earned', max: 14 },
  { key: 'collectiblesFound', label: 'Collectibles Found', max: 100 },
]

export default function StatisticsPageContent({ summary }: { summary: JourneySummaryData }) {
  return (
    <>
      <h2 className="passport-page-title">Statistics</h2>
      <p className="passport-page-subtitle">Progress across your journey</p>
      <div className="passport-summary-panel flex-1 overflow-y-auto">
        {DISPLAY_STATS.map((stat) => {
          const value = roundStat(summary[stat.key])
          const pct = Math.min(100, Math.round((value / stat.max) * 100))
          return (
            <div key={stat.label} className="passport-progress-row">
              <div className="passport-progress-label">
                <span>{stat.label}</span>
                <span>{value}</span>
              </div>
              <div className="passport-progress-bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={stat.max}>
                <div className="passport-progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
