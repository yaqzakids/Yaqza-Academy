import { MAP_COLORS } from './mapTheme'
import { MUSLIM_MAP_ASPECT } from './mapConstants'

/**
 * Crisp vector Muslim World map — parchment base, teal waters, gold accents.
 * Coordinates use viewBox 0 0 1066 546 (matches mapConstants).
 */
export default function MuslimWorldMapSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1066 546"
      className={`absolute inset-0 block h-full w-full select-none pointer-events-none ${className}`}
      style={{ aspectRatio: MUSLIM_MAP_ASPECT }}
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="km-parchment" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF0DC" />
          <stop offset="45%" stopColor={MAP_COLORS.parchment} />
          <stop offset="100%" stopColor="#E0C99A" />
        </linearGradient>
        <linearGradient id="km-water" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8ED4D0" />
          <stop offset="100%" stopColor={MAP_COLORS.waterDeep} />
        </linearGradient>
        <linearGradient id="km-desert" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDE0C4" />
          <stop offset="100%" stopColor={MAP_COLORS.desert} />
        </linearGradient>
        <radialGradient id="km-glow-teal" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={MAP_COLORS.teal} stopOpacity="0.12" />
          <stop offset="100%" stopColor={MAP_COLORS.teal} stopOpacity="0" />
        </radialGradient>
        <filter id="km-paper-texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" />
        </filter>
        <pattern id="km-desert-dots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill={MAP_COLORS.parchmentDeep} opacity="0.25" />
        </pattern>
        <pattern id="km-mountain-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={MAP_COLORS.mountain} strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Parchment base */}
      <rect width="1066" height="546" fill="url(#km-parchment)" filter="url(#km-paper-texture)" />

      {/* Decorative frame */}
      <rect
        x="12"
        y="12"
        width="1042"
        height="522"
        fill="none"
        stroke={MAP_COLORS.gold}
        strokeWidth="2"
        opacity="0.35"
        rx="4"
      />
      <rect
        x="18"
        y="18"
        width="1030"
        height="510"
        fill="none"
        stroke={MAP_COLORS.landStroke}
        strokeWidth="1"
        opacity="0.2"
        rx="2"
      />

      {/* Water bodies */}
      <g fill="url(#km-water)" opacity="0.85">
        {/* Mediterranean */}
        <path d="M80 80 Q200 40 380 55 Q520 65 580 95 Q480 130 350 125 Q200 118 80 100Z" />
        {/* Black Sea */}
        <ellipse cx="400" cy="72" rx="55" ry="22" />
        {/* Red Sea */}
        <path d="M340 155 Q355 200 360 280 Q365 360 350 420 Q340 380 335 300 Q330 220 340 155Z" />
        {/* Arabian Sea / Indian Ocean west */}
        <path d="M300 420 Q450 480 620 500 Q780 510 900 480 L900 546 L280 546 Q290 480 300 420Z" />
        {/* Persian Gulf */}
        <path d="M490 250 Q510 270 520 295 Q515 310 500 300 Q485 280 490 250Z" />
        {/* Caspian */}
        <ellipse cx="560" cy="68" rx="70" ry="18" />
      </g>

      {/* Land masses — crisp vector coastlines */}
      <g
        fill={MAP_COLORS.land}
        stroke={MAP_COLORS.landStroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Iberia & Andalusia */}
        <path d="M95 95 L130 75 L155 82 L148 110 L115 125 L85 115Z" />
        {/* North Africa / Maghreb */}
        <path d="M115 130 Q180 118 240 135 Q280 155 270 200 Q250 250 210 280 Q160 290 130 260 Q100 220 105 170Z" />
        {/* Egypt & Nile delta */}
        <path d="M270 200 Q310 185 340 195 Q360 210 355 250 Q340 290 310 310 Q285 300 275 260 Q268 230 270 200Z" />
        {/* Levant / Ash-Sham */}
        <path d="M355 155 Q390 145 420 160 Q435 185 425 210 Q400 225 375 215 Q355 195 355 155Z" />
        {/* Anatolia */}
        <path d="M340 95 Q400 80 450 95 Q470 115 455 140 Q420 155 380 145 Q345 130 340 95Z" />
        {/* Balkans */}
        <path d="M300 95 Q330 75 360 82 Q375 95 365 115 Q340 125 310 115Z" />
        {/* Arabian Peninsula */}
        <path d="M360 280 Q400 265 450 275 Q490 295 480 340 Q460 390 420 410 Q380 400 360 360 Q350 320 360 280Z" />
        {/* Mesopotamia / Iraq */}
        <path d="M430 195 Q470 185 510 200 Q530 220 520 250 Q500 270 470 265 Q440 250 430 220Z" />
        {/* Persia / Iran */}
        <path d="M510 170 Q570 155 620 175 Q640 200 630 240 Q610 280 560 290 Q520 280 505 240 Q500 200 510 170Z" />
        {/* Central Asia */}
        <path d="M580 55 Q660 40 720 60 Q750 90 730 130 Q690 155 630 140 Q590 115 580 55Z" />
        {/* Indian Subcontinent */}
        <path d="M620 260 Q680 240 720 270 Q740 310 720 360 Q680 400 640 390 Q610 350 620 260Z" />
        {/* East Africa / Horn */}
        <path d="M350 400 Q400 385 440 400 Q460 430 440 470 Q400 490 360 475 Q340 440 350 400Z" />
        {/* Southeast Asia */}
        <path d="M780 300 Q840 280 900 310 Q920 350 880 390 Q840 410 800 380 Q770 340 780 300Z" />
        {/* China fringe */}
        <path d="M750 55 Q820 45 880 70 Q900 100 860 130 Q800 145 760 120 Q740 90 750 55Z" />
      </g>

      {/* Desert texture — Arabia & Sahara */}
      <g fill="url(#km-desert-dots)" opacity="0.7">
        <path d="M360 280 Q450 275 480 340 Q460 390 420 410 Q380 400 360 360Z" />
        <path d="M115 130 Q240 135 270 200 Q250 250 160 270 Q120 240 105 170Z" />
      </g>

      {/* Mountain ranges */}
      <g fill={MAP_COLORS.mountain} opacity="0.35">
        <path d="M520 175 L535 145 L550 175Z" />
        <path d="M545 168 L560 138 L575 168Z" />
        <path d="M570 162 L590 125 L610 162Z" />
        <path d="M600 155 L625 115 L650 155Z" />
        <path d="M380 100 L395 78 L410 100Z" />
        <path d="M405 95 L420 72 L435 95Z" />
        <path d="M650 250 L670 215 L690 250Z" />
        <path d="M675 245 L700 205 L725 245Z" />
      </g>
      <g fill="url(#km-mountain-hatch)" opacity="0.5">
        <rect x="510" y="120" width="150" height="60" />
        <rect x="370" y="70" width="80" height="40" />
        <rect x="640" y="200" width="90" height="55" />
      </g>

      {/* Trade route accents (gold dashed) */}
      <g
        fill="none"
        stroke={MAP_COLORS.gold}
        strokeWidth="1.2"
        strokeDasharray="6 8"
        opacity="0.35"
      >
        <path d="M150 150 Q280 180 420 220 Q520 260 620 280" />
        <path d="M420 220 Q450 300 400 380" />
      </g>

      {/* Teal highlight glow on heartland */}
      <ellipse cx="450" cy="300" rx="180" ry="120" fill="url(#km-glow-teal)" />

      {/* Compass rose */}
      <g transform="translate(980, 480)" opacity="0.45">
        <circle r="22" fill={MAP_COLORS.parchment} stroke={MAP_COLORS.gold} strokeWidth="1" />
        <path d="M0 -16 L4 0 L0 16 L-4 0Z" fill={MAP_COLORS.navy} />
        <path d="M-16 0 L0 -4 L16 0 L0 4Z" fill={MAP_COLORS.teal} opacity="0.7" />
        <text y="32" textAnchor="middle" fontSize="9" fill={MAP_COLORS.landStroke} fontWeight="bold">
          N
        </text>
      </g>

      {/* Corner flourishes */}
      <g stroke={MAP_COLORS.gold} strokeWidth="1.5" fill="none" opacity="0.4">
        <path d="M30 30 L30 55 M30 30 L55 30" />
        <path d="M1036 30 L1036 55 M1036 30 L1011 30" />
        <path d="M30 516 L30 491 M30 516 L55 516" />
        <path d="M1036 516 L1036 491 M1036 516 L1011 516" />
      </g>
    </svg>
  )
}
