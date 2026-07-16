import type { KnowledgeRegion, RegionalMapTheme } from './types'
import { REGIONAL_ROUTE_PATHS } from './regionalMapData'

const THEME_BG: Record<RegionalMapTheme, string> = {
  desert: 'from-[#E8D5A8] via-[#D4B896] to-[#C4A574]',
  river: 'from-[#F5E6C8] via-[#E8E0C8] to-[#C4B896]',
  garden: 'from-[#F5E6C8] via-[#E8E8C8] to-[#C8D8A8]',
  library: 'from-[#F5E6C8] via-[#E8DCC8] to-[#D4C4A8]',
  mountain: 'from-[#F5E6C8] via-[#E0D8C8] to-[#C8C0A8]',
  coastal: 'from-[#E8F4F8] via-[#F5E6C8] to-[#E8DCC8]',
  city: 'from-[#ECEFF1] via-[#F5E6C8] to-[#D4C4B0]',
}

export interface RegionalMapIllustrationProps {
  region: KnowledgeRegion
}

export default function RegionalMapIllustration({ region }: RegionalMapIllustrationProps) {
  const { regionalMap } = region
  const routePath = REGIONAL_ROUTE_PATHS[region.slug]

  if (regionalMap.type === 'image' && regionalMap.imageSrc) {
    return (
      <img
        src={regionalMap.imageSrc}
        alt=""
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
      />
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 bg-gradient-to-b ${THEME_BG[regionalMap.theme]}`} />
      <ThemeLayer theme={regionalMap.theme} slug={region.slug} />
      {routePath && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-35"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d={routePath} fill="none" stroke="#8B6914" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      )}
    </div>
  )
}

function ThemeLayer({ theme, slug }: { theme: RegionalMapTheme; slug: string }) {
  switch (theme) {
    case 'desert':
      return <DesertLayer slug={slug} />
    case 'river':
      return <RiverLayer slug={slug} />
    case 'garden':
      return <GardenLayer />
    case 'library':
      return <LibraryLayer />
    case 'mountain':
      return <MountainLayer />
    case 'coastal':
      return <CoastalLayer />
    case 'city':
      return <CityLayer />
    default:
      return null
  }
}

function DesertLayer({ slug }: { slug: string }) {
  return (
    <>
      <svg className="absolute bottom-[15%] left-0 right-0 h-[35%] w-full opacity-50" viewBox="0 0 100 35" preserveAspectRatio="none">
        <path d="M0 28 Q20 12 40 22 T80 18 T100 25 L100 35 L0 35Z" fill="#B8956A" />
        <path d="M0 30 Q30 20 60 26 T100 28 L100 35 L0 35Z" fill="#A08050" opacity="0.5" />
      </svg>
      <MountainSilhouette x={12} y={38} w={16} h={22} />
      <MountainSilhouette x={75} y={40} w={18} h={18} />
      {slug === 'arabia' && (
        <>
          <span className="absolute bottom-[42%] left-[28%] text-sm opacity-40" aria-hidden>🌴</span>
          <span className="absolute bottom-[38%] left-[62%] text-xs opacity-35" aria-hidden>🐪</span>
        </>
      )}
    </>
  )
}

function RiverLayer({ slug }: { slug: string }) {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full opacity-45" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 58 0 Q 54 35 56 55 Q 58 75 55 100" fill="none" stroke="#4A90A4" strokeWidth="3" />
        <path d="M 62 55 Q 75 58 85 62" fill="none" stroke="#4A90A4" strokeWidth="1.5" opacity="0.6" />
      </svg>
      {slug === 'egypt' && (
        <>
          <Pyramid x={38} y={48} />
          <Pyramid x={42} y={52} size={0.65} />
        </>
      )}
    </>
  )
}

function GardenLayer() {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <pattern id="garden-tiles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#7CB342" opacity="0.3" />
          <path d="M5 0 V10 M0 5 H10" stroke="#558B2F" strokeWidth="0.3" />
        </pattern>
        <rect width="100" height="60" y="40" fill="url(#garden-tiles)" />
      </svg>
      <ArchShape x={22} y={42} />
      <ArchShape x={68} y={46} />
      <span className="absolute bottom-[32%] left-[18%] text-sm opacity-45" aria-hidden>🫒</span>
    </>
  )
}

function LibraryLayer() {
  return (
    <>
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M 25 100 Q 30 65 35 50 Q 50 30 65 50 Q 70 65 75 100" fill="#8D6E63" opacity="0.25" />
        <path d="M 15 70 Q 50 58 85 70" fill="none" stroke="#5D4037" strokeWidth="1" opacity="0.4" />
      </svg>
      <span className="absolute top-[32%] left-1/2 -translate-x-1/2 text-2xl opacity-50" aria-hidden>📚</span>
      <span className="absolute bottom-[38%] left-[30%] text-base opacity-40" aria-hidden>📜</span>
      <span className="absolute bottom-[40%] right-[32%] text-base opacity-40" aria-hidden>📜</span>
    </>
  )
}

function MountainLayer() {
  return (
    <>
      <MountainSilhouette x={8} y={28} w={24} h={32} color="#7A9EAF" />
      <MountainSilhouette x={38} y={32} w={28} h={28} color="#6B8E9F" />
      <MountainSilhouette x={68} y={30} w={22} h={30} color="#8AAFBF" />
      <span className="absolute bottom-[36%] left-[48%] text-sm opacity-40" aria-hidden>🐪</span>
    </>
  )
}

function CoastalLayer() {
  return (
    <>
      <div className="absolute bottom-[30%] left-0 right-0 h-[20%] bg-[#4A90A4]/25" />
      <svg className="absolute bottom-[30%] left-0 right-0 h-[4%] w-full" viewBox="0 0 100 4" preserveAspectRatio="none">
        <path d="M0 2 Q15 0 30 2 T60 2 T100 2 L100 4 L0 4Z" fill="#4DD0E1" opacity="0.4" />
      </svg>
    </>
  )
}

function CityLayer() {
  return (
    <>
      <BuildingBlock x={22} h={22} />
      <BuildingBlock x={38} h={30} />
      <BuildingBlock x={56} h={24} />
      <BuildingBlock x={72} h={28} />
      <span className="absolute bottom-[46%] left-[44%] text-lg opacity-50" aria-hidden>🕌</span>
    </>
  )
}

function MountainSilhouette({
  x,
  y,
  w,
  h,
  color = '#8B7355',
}: {
  x: number
  y: number
  w: number
  h: number
  color?: string
}) {
  return (
    <svg
      className="absolute pointer-events-none opacity-60"
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polygon points="50,0 100,100 0,100" fill={color} />
    </svg>
  )
}

function Pyramid({ x, y, size = 1 }: { x: number; y: number; size?: number }) {
  const s = 7 * size
  return (
    <svg
      className="absolute pointer-events-none opacity-50"
      style={{ left: `${x}%`, top: `${y}%`, width: `${s}%`, height: `${s * 1.1}%` }}
      viewBox="0 0 100 100"
    >
      <polygon points="50,8 92,92 8,92" fill="#C4A574" />
    </svg>
  )
}

function ArchShape({ x, y }: { x: number; y: number }) {
  return (
    <svg
      className="absolute pointer-events-none opacity-30"
      style={{ left: `${x}%`, top: `${y}%`, width: '10%', height: '14%' }}
      viewBox="0 0 100 100"
    >
      <path d="M12 90 L12 42 Q50 8 88 42 L88 90Z" fill="none" stroke="#2E7D32" strokeWidth="5" />
    </svg>
  )
}

function BuildingBlock({ x, h }: { x: number; h: number }) {
  return (
    <div
      className="absolute bottom-[38%] rounded-t-sm opacity-45 bg-[#78909C]"
      style={{ left: `${x}%`, width: '7%', height: `${h}%` }}
    />
  )
}
