import {
  ArrowLeft,
  BookOpen,
  Building2,
  ChevronRight,
  Clock,
  Compass,
  Gem,
  Globe,
  Landmark,
  MapPin,
  Scroll,
  Target,
  Users,
} from 'lucide-react'
import type { KnowledgeRegion } from '../types'
import { arabiaRegion, REGION_HUB_TABS, type RegionHubTab } from './arabiaRegionHubData'
import ArabiaCountriesSection from './ArabiaCountriesSection'
import ArabiaCitiesSection from './ArabiaCitiesSection'
import ArabiaLandmarksSection from './ArabiaLandmarksSection'
import ArabiaGreatMuslimsSection from './ArabiaGreatMuslimsSection'
import ArabiaStoriesSection from './ArabiaStoriesSection'
import ArabiaTimelineSection from './ArabiaTimelineSection'
import ArabiaChallengesSection from './ArabiaChallengesSection'
import ArabiaCollectiblesSection from './ArabiaCollectiblesSection'
import { ArabiaHeroBanner, ArabiaHeroPalms, CardIllustration } from './RegionHubIllustrations'
import { HUB_COLORS } from './regionHubTheme'

export interface ArabiaRegionHubProps {
  region: KnowledgeRegion
  activeTab: RegionHubTab
  onTabChange: (tab: RegionHubTab) => void
  onBack: () => void
  onViewPassport?: () => void
  onSelectLocation?: (locationId: string) => void
  onShowAtlas?: () => void
  showAtlasCard?: boolean
}

function tabIcon(tab: RegionHubTab) {
  const cls = 'h-4 w-4 shrink-0'
  switch (tab) {
    case 'overview':
      return <Compass className={cls} />
    case 'countries':
      return <MapPin className={cls} />
    case 'cities':
      return <Building2 className={cls} />
    case 'landmarks':
      return <Landmark className={cls} />
    case 'great-muslims':
      return <Users className={cls} />
    case 'stories':
      return <Scroll className={cls} />
    case 'timeline':
      return <Clock className={cls} />
    case 'challenges':
      return <Compass className={cls} />
    case 'collectibles':
      return <Gem className={cls} />
    default:
      return <MapPin className={cls} />
  }
}

function cardHeaderIcon(type: string) {
  const cls = 'h-3 w-3 shrink-0 mt-0.5'
  switch (type) {
    case 'countries':
      return <Globe className={cls} style={{ color: '#3B82C4' }} />
    case 'cities':
      return <Building2 className={cls} style={{ color: '#9A7B4F' }} />
    case 'landmarks':
      return <Landmark className={cls} style={{ color: '#9A7B4F' }} />
    case 'great-muslims':
      return <Users className={cls} style={{ color: HUB_COLORS.teal }} />
    case 'stories':
      return <Users className={cls} style={{ color: '#9A7B4F' }} />
    case 'timeline':
      return <Clock className={cls} style={{ color: HUB_COLORS.emerald }} />
    case 'challenges':
      return <Target className={cls} style={{ color: '#C94C4C' }} />
    case 'collectibles':
      return <Gem className={cls} style={{ color: '#9A7B4F' }} />
    default:
      return <MapPin className={cls} style={{ color: HUB_COLORS.gold }} />
  }
}

function OverviewCard({
  title,
  subtitle,
  type,
  onClick,
}: {
  title: string
  subtitle: string
  type: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border text-left transition-all hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
      style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
    >
      <div className="flex h-10 shrink-0 items-start gap-1 px-1 pt-1 pb-0 min-w-0">
        {cardHeaderIcon(type)}
        <div className="min-w-0 flex-1">
          <p
            className="font-display text-[10px] font-bold m-0 leading-tight line-clamp-2"
            style={{ color: HUB_COLORS.navy }}
          >
            {title}
          </p>
          <p
            className="text-[9px] font-semibold m-0 leading-tight truncate"
            style={{ color: HUB_COLORS.textMuted }}
          >
            {subtitle}
          </p>
        </div>
        <ChevronRight
          className="h-3 w-3 shrink-0 mt-0.5 opacity-40 transition-opacity group-hover:opacity-100"
          style={{ color: HUB_COLORS.gold }}
        />
      </div>
      <CardIllustration
        type={type}
        className="block w-full aspect-[232/271] object-cover object-center leading-[0]"
      />
    </button>
  )
}

export default function ArabiaRegionHub({
  region: _region,
  activeTab,
  onTabChange,
  onBack,
  onViewPassport,
  onSelectLocation,
  onShowAtlas,
  showAtlasCard = false,
}: ArabiaRegionHubProps) {
  const data = arabiaRegion
  const { progress } = data

  const stats = [
    { label: 'Cities', value: progress.cities, icon: Building2 },
    { label: 'Stories', value: progress.stories, icon: BookOpen },
    { label: 'Great Muslims', value: progress.greatMuslims, icon: Users },
    { label: 'Landmarks', value: progress.landmarks, icon: Landmark },
    { label: 'Collectibles', value: progress.collectibles, icon: Gem },
  ]

  const handleCardClick = (type: RegionHubTab) => {
    if (type === 'overview') return
    onTabChange(type)
  }

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden"
      style={{ backgroundColor: HUB_COLORS.parchment }}
    >
      {/* Header */}
      <header
        className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
        style={{ borderColor: HUB_COLORS.border }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white shadow-sm transition-colors hover:bg-[#FFFDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
            style={{ borderColor: HUB_COLORS.border, color: HUB_COLORS.navy }}
            aria-label="Back to world map"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <nav className="hidden sm:flex items-center gap-1 text-xs font-semibold min-w-0" aria-label="Breadcrumb">
            <span style={{ color: HUB_COLORS.textMuted }}>Atlas</span>
            <ChevronRight className="h-3 w-3 shrink-0" style={{ color: HUB_COLORS.textMuted }} />
            <span style={{ color: HUB_COLORS.navy }}>{data.name}</span>
          </nav>
        </div>
        {onViewPassport && (
          <button
            type="button"
            onClick={onViewPassport}
            className="flex shrink-0 items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-bold shadow-sm transition-colors hover:bg-[#FFFDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
            style={{ borderColor: HUB_COLORS.border, color: HUB_COLORS.emerald }}
          >
            <span aria-hidden>🛂</span>
            Explorer Passport
          </button>
        )}
      </header>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        {showAtlasCard && onShowAtlas && (
          <button
            type="button"
            onClick={onShowAtlas}
            className="mx-4 mt-4 flex w-[calc(100%-2rem)] items-center gap-3 rounded-xl border p-3 text-left shadow-sm transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0] md:hidden"
            style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-lg"
              style={{ backgroundColor: HUB_COLORS.emerald, color: 'white' }}
            >
              🌍
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold m-0" style={{ color: HUB_COLORS.navy }}>
                View on Atlas
              </p>
              <p className="text-xs font-medium m-0 mt-0.5" style={{ color: HUB_COLORS.textMuted }}>
                See where Arabia is on the world map
              </p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0" style={{ color: HUB_COLORS.gold }} />
          </button>
        )}

        {/* Hero */}
        <section className="px-4 pt-5 pb-4 sm:px-5">
          <div className="flex gap-2 sm:gap-3 items-start">
            <div className="w-14 sm:w-20 md:w-24 shrink-0 self-center sm:self-start pt-1">
              <ArabiaHeroPalms className="w-full h-auto max-h-[88px] sm:max-h-[110px] object-contain object-bottom" />
            </div>
            <div className="min-w-0 flex-1">
              <h1
                className="font-display text-3xl sm:text-4xl font-bold m-0 leading-tight"
                style={{ color: HUB_COLORS.emerald }}
              >
                {data.name}
              </h1>
              <span
                className="mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold"
                style={{
                  borderColor: `${HUB_COLORS.gold}80`,
                  backgroundColor: `${HUB_COLORS.gold}18`,
                  color: HUB_COLORS.emerald,
                }}
              >
                <span className="text-[10px]" aria-hidden>
                  ◆
                </span>
                {data.subtitle}
              </span>
              <p className="text-sm font-medium mt-3 m-0 leading-relaxed" style={{ color: HUB_COLORS.textMuted }}>
                {data.description}
              </p>
            </div>
            <div className="w-28 sm:w-36 md:w-44 shrink-0 self-center sm:self-start pt-1">
              <ArabiaHeroBanner className="w-full h-auto max-h-[88px] sm:max-h-[110px] object-contain object-bottom" />
            </div>
          </div>
        </section>

        {/* Progress */}
        <section className="px-4 pb-4 sm:px-5">
          <div
            className="rounded-xl border p-4 shadow-sm"
            style={{ borderColor: HUB_COLORS.border, backgroundColor: '#FFFDF8' }}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: HUB_COLORS.navy }}>
                Region Progress
              </span>
              <span className="text-sm font-extrabold" style={{ color: HUB_COLORS.emerald }}>
                {progress.percent}%
              </span>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: `${HUB_COLORS.border}80` }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress.percent}%`, backgroundColor: HUB_COLORS.emerald }}
              />
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {stats.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-1.5 min-w-0">
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: HUB_COLORS.teal }} />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide m-0 truncate" style={{ color: HUB_COLORS.textMuted }}>
                      {label}
                    </p>
                    <p className="text-xs font-extrabold m-0" style={{ color: HUB_COLORS.navy }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <nav
          className="sticky top-0 z-10 border-y px-2 sm:px-4 overflow-x-auto"
          style={{ borderColor: HUB_COLORS.border, backgroundColor: HUB_COLORS.parchment }}
          aria-label="Region sections"
        >
          <div className="flex gap-0.5 min-w-max py-1">
            {REGION_HUB_TABS.map(({ id, label }) => {
              const active = activeTab === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onTabChange(id)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0]"
                  style={{
                    color: active ? HUB_COLORS.emerald : HUB_COLORS.textMuted,
                    backgroundColor: active ? `${HUB_COLORS.emerald}12` : 'transparent',
                  }}
                >
                  {tabIcon(id)}
                  {label}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Tab content */}
        <section className={`px-2 sm:px-3 pb-5 ${activeTab === 'overview' ? 'pt-1' : 'py-4'}`}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-4 gap-x-1 gap-y-4 auto-rows-fr">
              {data.overviewCards.map((card) => (
                <OverviewCard
                  key={card.type}
                  title={card.title}
                  subtitle={card.subtitle}
                  type={card.type}
                  onClick={() => handleCardClick(card.type)}
                />
              ))}
            </div>
          )}

          {activeTab === 'countries' && <ArabiaCountriesSection />}

          {activeTab === 'cities' && (
            <ArabiaCitiesSection onSelectLocation={onSelectLocation} />
          )}

          {activeTab === 'landmarks' && (
            <ArabiaLandmarksSection onSelectLocation={onSelectLocation} />
          )}

          {activeTab === 'great-muslims' && <ArabiaGreatMuslimsSection />}

          {activeTab === 'stories' && (
            <ArabiaStoriesSection onSelectLocation={onSelectLocation} />
          )}

          {activeTab === 'timeline' && (
            <ArabiaTimelineSection onSelectLocation={onSelectLocation} />
          )}

          {activeTab === 'challenges' && <ArabiaChallengesSection />}

          {activeTab === 'collectibles' && <ArabiaCollectiblesSection />}
        </section>
      </div>
    </div>
  )
}
