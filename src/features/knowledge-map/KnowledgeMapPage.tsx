import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PublicLayout from '@/components/layout/PublicLayout'
import PageSeo from '@/components/seo/PageSeo'
import HowToPlayModal from './HowToPlayModal'
import KnowledgeFilters from './KnowledgeFilters'
import KnowledgeMapCanvas from './KnowledgeMapCanvas'
import PassportSidebar from './PassportSidebar'
import { useKnowledgeMapState } from './useKnowledgeMapState'
import { isMuslimWorldRegion } from './worldMapLayout'

export default function KnowledgeMapPage() {
  const [howToPlayOpen, setHowToPlayOpen] = useState(false)
  const {
    filteredRegions,
    filters,
    setFilters,
    viewLevel,
    selectedRegion,
    selectedRegionId,
    selectedLocationId,
    drawerOpen,
    passportOpen,
    setPassportOpen,
    openPassport,
    selectRegion,
    selectLocation,
    resetToWorld,
    openRegionDrawer,
    closeDrawer,
    closeRegionView,
    startLocationJourney,
  } = useKnowledgeMapState()

  const mapRegions = useMemo(
    () => filteredRegions.filter((r) => isMuslimWorldRegion(r.slug)),
    [filteredRegions],
  )

  return (
    <PublicLayout bg="bg-[#EEF4FF]">
      <PageSeo
        title="Atlas of Islamic Civilization"
        description="Explore the lands where Muslim civilizations flourished on an interactive historical atlas."
        path="/knowledge-map"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <header className="mb-6 md:mb-8">
          <Link
            to="/games"
            className="text-sm font-extrabold text-[#2AAFA0] hover:underline mb-3 inline-block"
          >
            ← Back to Games
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1B2F5E] m-0">
                Atlas of Islamic Civilization
              </h1>
              <p className="text-sm md:text-base text-[#6B7280] font-semibold mt-2 m-0">
                Explore the lands where Muslim civilizations flourished.
              </p>
            </div>
          </div>
        </header>

        <div className="mb-5">
          <KnowledgeFilters
            filters={filters}
            onChange={setFilters}
            onHowToPlay={() => setHowToPlayOpen(true)}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          <main>
            {mapRegions.length === 0 ? (
              <div className="rounded-2xl border border-[#E5E7EB] bg-white p-12 text-center">
                <p className="text-4xl mb-4" aria-hidden>
                  🗺️
                </p>
                <p className="font-bold text-[#1B2F5E] m-0">
                  No discoveries here yet. Try another region, era, or difficulty.
                </p>
              </div>
            ) : (
              <KnowledgeMapCanvas
                regions={mapRegions}
                viewLevel={viewLevel}
                selectedRegionId={selectedRegionId}
                selectedLocationId={selectedLocationId}
                selectedRegion={selectedRegion}
                drawerOpen={drawerOpen}
                onSelectRegion={selectRegion}
                onSelectLocation={selectLocation}
                onResetWorld={resetToWorld}
                onOpenRegionDrawer={openRegionDrawer}
                onCloseDrawer={closeDrawer}
                onCloseRegionView={closeRegionView}
                onStartLocationJourney={startLocationJourney}
                onViewPassport={openPassport}
              />
            )}
          </main>
        </div>

        <div
          id="explorer-passport"
          className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8 w-screen bg-[#EEF4FF] py-6 lg:mt-10 lg:py-8"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="relative mx-auto flex w-full max-w-[1020px] cursor-pointer flex-col items-center justify-center rounded-lg bg-gradient-to-br from-[#3d2e24] via-[#2b211a] to-[#1f1814] px-6 py-16 shadow-[0_18px_32px_rgba(43,33,26,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a84c]"
              onClick={openPassport}
              aria-label="Open Explorer Passport"
            >
              <span className="text-center font-['Playfair_Display',serif] text-[clamp(1.1rem,3vw,1.75rem)] font-bold uppercase tracking-[0.14em] text-[#f4e5c6]">
                Explorer Passport
                <span className="mt-2 block text-[clamp(0.7rem,1.6vw,0.9rem)] font-normal normal-case italic tracking-[0.06em] text-[rgba(244,229,198,0.85)]">
                  Your journey. Your knowledge. Your legacy.
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <PassportSidebar
        isOpen={passportOpen}
        onClose={() => setPassportOpen(false)}
      />

      <HowToPlayModal open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />
    </PublicLayout>
  )
}
