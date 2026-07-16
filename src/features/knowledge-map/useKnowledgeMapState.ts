import { useCallback, useMemo, useState } from 'react'
import {
  INITIAL_BADGES,
  INITIAL_COLLECTIBLES,
  INITIAL_REGIONS,
} from './knowledgeMapData'
import { withMuslimMapAnchors } from './locationLayout'
import { buildSeedCompletionDates } from './passport/passportUtils'
import type {
  KnowledgeMapFilters,
  KnowledgePassport,
  KnowledgeRegion,
  KnowledgeRegionStatus,
  MapViewLevel,
} from './types'
import { applyStartingProgression, muslimMapAnchorForRegion } from './worldMapLayout'
function deriveRegionStatus(locations: KnowledgeRegion['locations']): KnowledgeRegionStatus {
  const unlocked = locations.filter((l) => !l.locked)
  if (unlocked.length === 0) return 'locked'
  const completed = unlocked.filter((l) => l.completed).length
  if (completed === unlocked.length) return 'completed'
  if (completed > 0) return 'in_progress'
  return 'in_progress'
}

function syncRegion(region: KnowledgeRegion): KnowledgeRegion {
  const completedLocations = region.locations.filter((l) => l.completed).length
  const locations = withMuslimMapAnchors(region.slug, region.locations)
  const status = deriveRegionStatus(locations)
  return {
    ...region,
    muslimMapAnchor: muslimMapAnchorForRegion(region.slug),
    locations,
    completedLocations,
    totalLocations: locations.length,
    status,
  }
}

export function useKnowledgeMapState() {
  const [regions, setRegions] = useState<KnowledgeRegion[]>(() =>
    applyStartingProgression(
      INITIAL_REGIONS.map((r) => syncRegion({ ...r, locations: r.locations.map((l) => ({ ...l })) })),
    ),
  )
  const [collectibles, setCollectibles] = useState(INITIAL_COLLECTIBLES.map((c) => ({ ...c })))
  const [badges, setBadges] = useState(INITIAL_BADGES.map((b) => ({ ...b })))
  const [totalStars, setTotalStars] = useState(950)
  const [completionDates, setCompletionDates] = useState<Record<string, string>>(() => {
    const allLocs = INITIAL_REGIONS.flatMap((r) => r.locations)
    return buildSeedCompletionDates(allLocs)
  })
  const [filters, setFilters] = useState<KnowledgeMapFilters>({
    era: 'all',
    region: 'all',
    difficulty: 'all',
  })
  const [viewLevel, setViewLevel] = useState<MapViewLevel>('world')
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null)
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [passportOpen, setPassportOpen] = useState(false)

  const filteredRegions = useMemo(() => {
    return regions.filter((region) => {
      if (filters.region !== 'all' && region.slug !== filters.region) return false
      if (filters.era !== 'all') {
        const hasEra = region.locations.some((l) => l.era === filters.era)
        if (!hasEra) return false
      }
      if (filters.difficulty !== 'all') {
        const hasDifficulty = region.locations.some((l) => l.difficulty === filters.difficulty)
        if (!hasDifficulty) return false
      }
      return true
    })
  }, [regions, filters])

  const selectedRegion = useMemo(
    () => regions.find((r) => r.id === selectedRegionId) ?? null,
    [regions, selectedRegionId],
  )

  const selectedLocation = useMemo(() => {
    if (!selectedRegion || !selectedLocationId) return null
    return selectedRegion.locations.find((l) => l.id === selectedLocationId) ?? null
  }, [selectedRegion, selectedLocationId])

  const passport = useMemo((): KnowledgePassport => {
    const allLocations = regions.flatMap((r) => r.locations)
    const completedLocations = allLocations.filter((l) => l.completed)
    const unlockedRegions = regions.filter((r) => r.status !== 'locked')
    const totalCities = allLocations.filter((l) => !l.locked).length

    const recentlyVisited = completedLocations
      .slice()
      .reverse()
      .slice(0, 8)
      .map((l) => {
        const region = regions.find((r) => r.id === l.regionId)
        return {
          id: l.id,
          title: l.title,
          regionName: region?.name ?? '',
          regionId: l.regionId,
          completed: l.completed,
          completedAt: completionDates[l.id],
        }
      })

    const journeyStarted =
      Object.values(completionDates).sort()[0] ?? new Date(2024, 4, 12).toISOString()

    return {
      citiesVisited: completedLocations.length,
      totalCities,
      regionsUnlocked: unlockedRegions.length,
      totalRegions: regions.length,
      collectiblesFound: collectibles.reduce((sum, c) => sum + c.count, 0),
      totalCollectibles: 100,
      badgesEarned: badges.filter((b) => b.earned).length,
      totalBadges: badges.length,
      totalStars,
      journeyStarted,
      recentlyVisited,
      topCollectibles: collectibles.slice(0, 8),
      badges,
    }
  }, [regions, collectibles, badges, totalStars, completionDates])

  const resetToWorld = useCallback(() => {
    setViewLevel('world')
    setSelectedRegionId(null)
    setSelectedLocationId(null)
    setDrawerOpen(false)
  }, [])

  const selectRegion = useCallback((regionId: string) => {
    setSelectedRegionId(regionId)
    setSelectedLocationId(null)
    setViewLevel('region')
    setDrawerOpen(true)
  }, [])

  const selectLocation = useCallback((locationId: string) => {
    setSelectedLocationId(locationId)
    setViewLevel('location')
    setDrawerOpen(true)
  }, [])

  const openRegionDrawer = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const closeRegionView = useCallback(() => {
    setViewLevel('world')
    setSelectedRegionId(null)
    setSelectedLocationId(null)
    setDrawerOpen(false)
  }, [])

  const closeDrawer = useCallback(() => {
    if (viewLevel === 'location') {
      setSelectedLocationId(null)
      setViewLevel('region')
      setDrawerOpen(true)
    } else {
      closeRegionView()
    }
  }, [viewLevel, closeRegionView])

  const openPassport = useCallback(() => {
    document.getElementById('explorer-passport')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setPassportOpen(true)
  }, [])

  const markLocationCompleted = useCallback((regionId: string, locationId: string) => {
    setRegions((prev) => {
      const region = prev.find((r) => r.id === regionId)
      const location = region?.locations.find((l) => l.id === locationId)
      if (location?.collectibleReward) {
        setCollectibles((cPrev) =>
          cPrev.map((c) =>
            c.name === location.collectibleReward ? { ...c, count: c.count + 1 } : c,
          ),
        )
      }
      if (locationId === 'hebron') {
        setBadges((bPrev) =>
          bPrev.map((b) => (b.id === 'landmark-collector' ? { ...b, earned: true } : b)),
        )
      }
      return prev.map((r) => {
        if (r.id !== regionId) return r
        const locations = r.locations.map((l) =>
          l.id === locationId ? { ...l, completed: true, locked: false } : l,
        )
        return syncRegion({ ...r, locations })
      })
    })
    setTotalStars((s) => s + 10)
    setCompletionDates((prev) => ({
      ...prev,
      [locationId]: new Date().toISOString(),
    }))

    setPassportOpen(true)
  }, [])

  const startLocationJourney = useCallback(
    (locationId: string) => {
      if (!selectedRegionId) return
      markLocationCompleted(selectedRegionId, locationId)
    },
    [selectedRegionId, markLocationCompleted],
  )

  return {
    regions,
    filteredRegions,
    filters,
    setFilters,
    viewLevel,
    selectedRegion,
    selectedRegionId,
    selectedLocation,
    selectedLocationId,
    drawerOpen,
    passport,
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
    markLocationCompleted,
  }
}
