import { ARABIA_HUB_HERO, arabiaHubCardArt } from './arabiaHubAssets'
import type { RegionHubCardType } from './arabiaRegionHubData'

export function ArabiaHeroBanner({ className = '' }: { className?: string }) {
  return (
    <img
      src={ARABIA_HUB_HERO.kaaba}
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
    />
  )
}

export function ArabiaHeroPalms({ className = '' }: { className?: string }) {
  return (
    <img
      src={ARABIA_HUB_HERO.palms}
      alt=""
      aria-hidden
      className={`object-contain ${className}`}
    />
  )
}

export function CardIllustration({
  type,
  className = '',
}: {
  type: RegionHubCardType | string
  className?: string
}) {
  return (
    <img
      src={arabiaHubCardArt(type)}
      alt=""
      aria-hidden
      className={className}
    />
  )
}
