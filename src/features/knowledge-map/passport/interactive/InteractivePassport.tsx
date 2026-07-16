/* ============================================================
   src/features/knowledge-map/passport/interactive/InteractivePassport.tsx

   CLEAN REWRITE. Single self-contained file.
   No sub-pages. No absolute-positioned content panels.
   No overlapping sections.

   HOW TO USE:
     import InteractivePassport from '.../InteractivePassport'
     <InteractivePassport data={passportData} onClose={...} />
   ============================================================ */

import { useRef, useState, type ReactNode } from 'react'
import type {
  CollectibleCategory,
  PassportData,
  Rarity,
  StampColor,
} from '../passportTypes'

// ─────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────
interface Props {
  data: PassportData
  onClose?: () => void
}

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const STAMP_BORDER: Record<StampColor, string> = {
  green: '#1a6b1a',
  blue: '#1a3a8b',
  rust: '#8b1a1a',
  brown: '#6b3008',
}

const RARITY_COLORS: Record<Rarity, string> = {
  common: '#8a7a5a',
  uncommon: '#4a7a3a',
  rare: '#2a4a8b',
  legendary: '#8b4a00',
}

const AGE_GROUP_LABEL: Record<string, string> = {
  explorer: 'Explorer',
  discoverer: 'Discoverer',
  thinker: 'Thinker',
}

const LANGUAGE_LABEL: Record<string, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
}

const CATEGORY_EMOJI: Record<CollectibleCategory, string> = {
  artifact: '🏺',
  coin: '🪙',
  map: '🗺️',
  manuscript: '📜',
  architecture: '🏛️',
  tool: '🧭',
  nature: '🌿',
  token: '⭐',
}

// ─────────────────────────────────────────────────────────────
// Tiny reusable pieces
// ─────────────────────────────────────────────────────────────

/** Ornate corner flourish — auto-mirrored via CSS transform on parent */
function CornerSVG() {
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 51L3 12Q3 3 12 3L51 3" stroke="#c9a030" strokeWidth="1.6" />
      <path d="M8 46L8 15Q8 8 15 8L46 8" stroke="#c9a030" strokeWidth="0.8" />
      <path
        d="M14 40L14 18Q14 14 18 14L40 14"
        stroke="#c9a030"
        strokeWidth="0.4"
        opacity="0.45"
      />
      <circle cx="5.5" cy="5.5" r="2.5" fill="#c9a030" />
      <circle cx="11" cy="11" r="1.2" fill="#c9a030" opacity="0.7" />
    </svg>
  )
}

/** Section divider with ✦ text ✦ */
function Divider({ text }: { text: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: '10px 0 8px',
        flexShrink: 0,
      }}
    >
      <div style={{ flex: 1, height: 1, background: '#c9a030' }} />
      <span
        style={{
          fontFamily: 'Cinzel, "Palatino Linotype", Georgia, serif',
          fontSize: 9,
          color: '#c9a030',
          letterSpacing: 2,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        ✦ {text} ✦
      </span>
      <div style={{ flex: 1, height: 1, background: '#c9a030' }} />
    </div>
  )
}

/** Compass rose used in stamp + right page */
function CompassRose({ size = 40 }: { size?: number }) {
  const c = size / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx={c} cy={c} r={c - 1} stroke="#c9a030" strokeWidth="0.9" />
      <circle
        cx={c}
        cy={c}
        r={c * 0.65}
        stroke="#c9a030"
        strokeWidth="0.5"
        strokeDasharray="2 3"
      />
      <polygon
        points={`${c},${c * 0.18} ${c + 2.5},${c - 1} ${c},${c} ${c - 2.5},${c - 1}`}
        fill="#c9a030cc"
      />
      <polygon
        points={`${c},${c * 1.82} ${c + 2.5},${c + 1} ${c},${c} ${c - 2.5},${c + 1}`}
        fill="#c9a03055"
      />
      <polygon
        points={`${c * 0.18},${c} ${c - 1},${c - 2.5} ${c},${c} ${c - 1},${c + 2.5}`}
        fill="#c9a03055"
      />
      <polygon
        points={`${c * 1.82},${c} ${c + 1},${c - 2.5} ${c},${c} ${c + 1},${c + 2.5}`}
        fill="#c9a03055"
      />
      <text
        x={c}
        y={c * 0.36}
        textAnchor="middle"
        fontSize={size * 0.16}
        fill="#c9a030"
        fontFamily="Cinzel, serif"
        fontWeight="600"
      >
        N
      </text>
      <text
        x={c}
        y={size - 2}
        textAnchor="middle"
        fontSize={size * 0.13}
        fill="#c9a030"
        fontFamily="Cinzel, serif"
      >
        S
      </text>
    </svg>
  )
}

/** Shield badge */
function ShieldBadge({
  imageUrl,
  name,
  color,
  stroke,
}: {
  imageUrl?: string | null
  name: string
  color: string
  stroke: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        flex: 1,
      }}
    >
      <div style={{ position: 'relative', width: 58, height: 68 }}>
        <svg
          width="58"
          height="68"
          viewBox="0 0 58 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M29 3L55 13V38Q55 56 29 65Q3 56 3 38V13Z"
            stroke={stroke}
            strokeWidth="1.5"
            fill={color}
          />
        </svg>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            style={{
              position: 'absolute',
              top: '22%',
              left: '18%',
              width: '64%',
              height: '44%',
              objectFit: 'contain',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: '22%',
              left: '18%',
              width: '64%',
              height: '44%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              opacity: 0.3,
            }}
          >
            🏅
          </div>
        )}
      </div>
      <span
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 7.5,
          color: '#b8860b',
          textAlign: 'center',
          letterSpacing: 0.4,
          lineHeight: 1.3,
          maxWidth: 70,
        }}
      >
        {name}
      </span>
    </div>
  )
}

/** Stamp card for recently visited */
function StampCard({
  visit,
  borderColor,
}: {
  visit: PassportData['recentVisits'][number] | null
  borderColor: string
}) {
  const isComplete = visit && visit.completedAt !== null

  return (
    <div
      style={{
        minHeight: 96,
        borderRadius: 7,
        background: '#f0e2a8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        gap: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 5,
          borderRadius: 5,
          border: `1.5px dashed ${borderColor}`,
          pointerEvents: 'none',
        }}
      />

      {!visit ? (
        <span
          style={{
            fontSize: 9,
            color: 'rgba(184,134,11,0.4)',
            fontStyle: 'italic',
            zIndex: 1,
          }}
        >
          Not yet visited
        </span>
      ) : (
        <>
          {visit.stampImageUrl ? (
            <img
              src={visit.stampImageUrl}
              alt={visit.locationName}
              style={{
                width: 36,
                height: 36,
                objectFit: 'contain',
                zIndex: 1,
                opacity: isComplete ? 1 : 0.5,
              }}
            />
          ) : (
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: borderColor + '22',
                border: `1.5px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                zIndex: 1,
                opacity: isComplete ? 1 : 0.6,
              }}
            >
              {visit.locationName.charAt(0)}
            </div>
          )}

          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#1c0e02',
              textAlign: 'center',
              zIndex: 1,
              lineHeight: 1.2,
            }}
          >
            {visit.locationName}
          </span>
          <span
            style={{
              fontSize: 8.5,
              color: '#b8860b',
              textAlign: 'center',
              fontStyle: 'italic',
              zIndex: 1,
            }}
          >
            {visit.regionName}
          </span>

          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              fontSize: 7.5,
              fontFamily: 'Cinzel, serif',
              color: isComplete ? '#1a6b1a' : '#8b6010',
              background: isComplete ? '#1a6b1a22' : '#c9a03022',
              border: `0.5px solid ${isComplete ? '#1a6b1a88' : '#c9a03088'}`,
              borderRadius: 3,
              padding: '1px 5px',
              zIndex: 2,
              letterSpacing: 0.5,
            }}
          >
            {isComplete ? '✓ Done' : `${Math.round(visit.completionPercent)}%`}
          </div>
        </>
      )}
    </div>
  )
}

/** Collectible card */
function CollectibleCard({
  coll,
}: {
  coll: PassportData['topCollectibles'][number] | null
}) {
  return (
    <div
      style={{
        border: '1.5px solid #c9a030',
        borderRadius: 6,
        background: '#f0e2a8',
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        padding: 6,
        position: 'relative',
      }}
    >
      {!coll ? (
        <span style={{ fontSize: 20, color: 'rgba(184,134,11,0.2)' }}>?</span>
      ) : (
        <>
          {coll.imageUrl ? (
            <img
              src={coll.imageUrl}
              alt={coll.name}
              style={{ width: 32, height: 32, objectFit: 'contain' }}
            />
          ) : (
            <span style={{ fontSize: 22 }}>{CATEGORY_EMOJI[coll.category] ?? '📦'}</span>
          )}
          <span
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 7,
              color: '#b8860b',
              textAlign: 'center',
              letterSpacing: 0.3,
              lineHeight: 1.3,
            }}
          >
            {coll.name}
          </span>
          <div
            style={{
              position: 'absolute',
              top: 4,
              right: 5,
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: RARITY_COLORS[coll.rarity] ?? '#8a7a5a',
            }}
          />
          {coll.quantity > 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: 3,
                right: 4,
                fontSize: 7,
                fontFamily: 'Cinzel, serif',
                color: '#8a6020',
                background: '#c9a03022',
                border: '0.5px solid #c9a03066',
                borderRadius: 3,
                padding: '0 4px',
              }}
            >
              ×{coll.quantity}
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Page shell — handles border, corners, parchment texture
// ─────────────────────────────────────────────────────────────
function Page({ children, isLeft }: { children: ReactNode; isLeft: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        background: '#fdf4d4',
        borderRadius: isLeft ? '4px 0 0 4px' : '0 4px 4px 4px',
        padding: '26px 22px 22px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 700,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `repeating-linear-gradient(
          0deg, transparent, transparent 28px,
          rgba(180,140,40,0.04) 28px, rgba(180,140,40,0.04) 29px
        )`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 10,
          border: '1.5px solid #c9a030',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 15,
          border: '0.5px solid rgba(200,160,40,0.35)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 3,
          left: 3,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <CornerSVG />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 3,
          right: 3,
          zIndex: 3,
          pointerEvents: 'none',
          transform: 'scaleX(-1)',
        }}
      >
        <CornerSVG />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 3,
          left: 3,
          zIndex: 3,
          pointerEvents: 'none',
          transform: 'scaleY(-1)',
        }}
      >
        <CornerSVG />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 3,
          right: 3,
          zIndex: 3,
          pointerEvents: 'none',
          transform: 'scale(-1,-1)',
        }}
      >
        <CornerSVG />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export default function InteractivePassport({ data, onClose }: Props) {
  const { child, summary, recentVisits, topCollectibles, earnedBadges } = data

  const fileRef = useRef<HTMLInputElement>(null)
  const [photoSrc, setPhotoSrc] = useState<string | null>(child.avatarUrl ?? null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoSrc((ev.target?.result as string) ?? null)
    reader.readAsDataURL(file)
  }

  function pad<T>(arr: T[], len: number): (T | null)[] {
    return [...arr, ...Array(Math.max(0, len - arr.length)).fill(null)]
  }

  const visitSlots = pad(recentVisits.slice(0, 4), 4)
  const collSlots = pad(topCollectibles.slice(0, 4), 4)
  const badgeSlots = pad(earnedBadges.slice(0, 3), 3)

  const VISIT_COLORS: StampColor[] = ['green', 'rust', 'blue', 'brown']

  const FIELD_KEY: React.CSSProperties = {
    fontFamily: 'Cinzel, "Palatino Linotype", serif',
    fontSize: 7.5,
    color: '#b8860b',
    letterSpacing: 2,
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 1,
  }
  const FIELD_VAL: React.CSSProperties = {
    fontFamily: '"EB Garamond", Georgia, serif',
    fontSize: 14,
    fontWeight: 600,
    color: '#1c0e02',
    display: 'block',
    borderBottom: '1px dashed rgba(184,134,11,0.45)',
    paddingBottom: 3,
    marginBottom: 9,
    minHeight: 20,
    lineHeight: 1.2,
  }
  const OV_LABEL: React.CSSProperties = {
    fontFamily: 'Cinzel, serif',
    fontSize: 7.5,
    color: '#b8860b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 2,
  }
  const OV_VALUE: React.CSSProperties = {
    fontFamily: '"EB Garamond", Georgia, serif',
    fontSize: 24,
    fontWeight: 700,
    color: '#1c0e02',
    lineHeight: 1,
    display: 'block',
  }

  const startDate = new Date(child.journeyStartedAt)
  const formattedDate = isNaN(startDate.getTime())
    ? child.journeyStartedAt
    : startDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

  return (
    <div
      style={{
        fontFamily: '"EB Garamond", Georgia, serif',
        background: '#1a0800',
        borderRadius: 8,
        padding: 7,
        display: 'flex',
        gap: 0,
        position: 'relative',
        width: '100%',
        maxWidth: 1020,
        margin: '0 auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 7,
          bottom: 7,
          width: 22,
          transform: 'translateX(-50%)',
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(26,8,0,0.15) 40%, rgba(26,8,0,0.15) 60%, rgba(0,0,0,0.6) 100%)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close passport"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 30,
            background: 'rgba(26,8,0,0.75)',
            border: '1px solid #c9a030',
            borderRadius: '50%',
            width: 30,
            height: 30,
            cursor: 'pointer',
            color: '#c9a030',
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      )}

      <Page isLeft={true}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 5,
            }}
          >
            <span style={{ fontSize: 13, color: '#c9a030' }}>✦</span>
            <h1
              style={{
                fontFamily: 'Cinzel, "Palatino Linotype", serif',
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 5,
                color: '#1c0e02',
                textTransform: 'uppercase',
                lineHeight: 1,
                margin: 0,
              }}
            >
              My Passport
            </h1>
            <span style={{ fontSize: 13, color: '#c9a030' }}>✦</span>
          </div>
          <p
            style={{
              fontSize: 12,
              color: '#b8860b',
              fontStyle: 'italic',
              letterSpacing: 0.5,
            }}
          >
            Your journey · Your knowledge · Your legacy
          </p>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload passport photo"
            onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
            style={{
              width: 102,
              minHeight: 128,
              flexShrink: 0,
              border: '2px solid #8b1a1a',
              borderRadius: 4,
              background: '#f5e8cc',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 5,
                border: '0.5px solid rgba(139,26,26,0.3)',
                borderRadius: 2,
                pointerEvents: 'none',
              }}
            />

            {photoSrc ? (
              <img
                src={photoSrc}
                alt={`${child.name}'s photo`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 3,
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                  zIndex: 1,
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  stroke="#b8860b"
                  strokeWidth="1.3"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="22" height="22" rx="3" />
                  <circle cx="13" cy="11" r="4" />
                  <path d="M4 25c0-5 4-9 9-9s9 4 9 9" />
                </svg>
                <span
                  style={{
                    fontSize: 8,
                    color: '#b8860b',
                    textAlign: 'center',
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  Tap to upload
                  <br />
                  your photo
                </span>
                <span
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: 7,
                    color: '#8b1a1a',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  Upload photo
                </span>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              aria-hidden="true"
            />
          </div>

          <div style={{ flex: 1 }}>
            <span style={FIELD_KEY}>Traveler</span>
            <span style={{ ...FIELD_VAL, fontSize: 17 }}>{child.name}</span>

            <span style={FIELD_KEY}>Explorer ID</span>
            <span
              style={{
                ...FIELD_VAL,
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: 2,
                color: '#5a3208',
                fontWeight: 400,
              }}
            >
              {child.passportNumber}
            </span>

            <span style={FIELD_KEY}>Learning path</span>
            <span style={{ ...FIELD_VAL, fontSize: 16 }}>
              {AGE_GROUP_LABEL[child.ageGroup] ?? child.ageGroup}
            </span>

            <span style={FIELD_KEY}>Journey started</span>
            <span style={FIELD_VAL}>{formattedDate}</span>

            <span style={FIELD_KEY}>Current level</span>
            <span style={FIELD_VAL}>Level {child.level}</span>

            <span style={FIELD_KEY}>Current streak</span>
            <span style={FIELD_VAL}>{child.currentStreak} days 🔥</span>

            <span style={FIELD_KEY}>Language</span>
            <span style={FIELD_VAL}>
              {LANGUAGE_LABEL[child.preferredLanguage] ?? child.preferredLanguage}
            </span>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
              <div
                style={{
                  width: 66,
                  height: 66,
                  border: '1.5px dashed #c9a030',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(245,232,180,0.3)',
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    border: '1px solid #c9a030',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(248,237,190,0.5)',
                  }}
                >
                  <CompassRose size={38} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Divider text="Passport Overview" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            border: '1.5px solid #c9a030',
            background: '#f0e2a8',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              borderRight: '1px solid #c9a030',
              borderBottom: '1px solid #c9a030',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 36 36"
              fill="none"
              stroke="#b8860b"
              strokeWidth="1.2"
              opacity="0.7"
              aria-hidden="true"
            >
              <path d="M3 32V15L10 7L17 15L24 7L31 15V32" />
              <rect x="13" y="22" width="8" height="10" />
              <rect x="5" y="18" width="4" height="5" fill="#b8860b33" />
              <rect x="24" y="18" width="4" height="5" fill="#b8860b33" />
            </svg>
            <div>
              <span style={OV_LABEL}>Cities visited</span>
              <span style={OV_VALUE}>{Math.round(summary.citiesVisited)}</span>
            </div>
          </div>
          <div
            style={{
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              borderBottom: '1px solid #c9a030',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 36 36"
              fill="none"
              stroke="#b8860b"
              strokeWidth="1.2"
              opacity="0.7"
              aria-hidden="true"
            >
              <circle cx="18" cy="18" r="14" />
              <ellipse cx="18" cy="18" rx="7" ry="14" />
              <line x1="4" y1="18" x2="32" y2="18" />
              <line x1="6" y1="11" x2="30" y2="11" />
              <line x1="6" y1="25" x2="30" y2="25" />
            </svg>
            <div>
              <span style={OV_LABEL}>Regions unlocked</span>
              <span style={OV_VALUE}>{Math.round(summary.regionsUnlocked)}</span>
            </div>
          </div>
          <div
            style={{
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              borderRight: '1px solid #c9a030',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 36 36"
              fill="none"
              stroke="#b8860b"
              strokeWidth="1.2"
              opacity="0.7"
              aria-hidden="true"
            >
              <rect x="4" y="11" width="28" height="20" rx="2" />
              <path d="M10 11V8Q10 3 18 3Q26 3 26 8V11" />
              <circle cx="18" cy="21" r="3.5" fill="#b8860b33" />
            </svg>
            <div>
              <span style={OV_LABEL}>Collectibles found</span>
              <span style={OV_VALUE}>{Math.round(summary.collectiblesFound)}</span>
            </div>
          </div>
          <div
            style={{
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 36 36"
              fill="none"
              stroke="#b8860b"
              strokeWidth="1.2"
              opacity="0.7"
              aria-hidden="true"
            >
              <path d="M8 4L8 32L18 26L28 32L28 4Z" />
              <path d="M8 4Q18 1 28 4" />
              <line x1="12" y1="13" x2="24" y2="13" stroke="#b8860b66" />
              <line x1="12" y1="18" x2="20" y2="18" stroke="#b8860b66" />
            </svg>
            <div>
              <span style={OV_LABEL}>Badges earned</span>
              <span style={OV_VALUE}>{Math.round(summary.badgesEarned)}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            border: '1.5px solid #c9a030',
            background: '#f0e2a8',
            padding: 12,
            textAlign: 'center',
            marginTop: 'auto',
          }}
        >
          <div style={{ fontSize: 26, color: '#c9a030', lineHeight: 1, marginBottom: 2 }}>★</div>
          <div
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: 34,
              fontWeight: 700,
              color: '#1c0e02',
              lineHeight: 1,
            }}
          >
            {Math.round(child.totalStars)}
          </div>
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 8,
              color: '#b8860b',
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              marginTop: 3,
            }}
          >
            Total Stars
          </div>
        </div>
      </Page>

      <Page isLeft={false}>
        <Divider text="Recently Visited" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 14,
          }}
        >
          {visitSlots.map((visit, i) => (
            <StampCard
              key={i}
              visit={visit}
              borderColor={
                STAMP_BORDER[visit ? visit.stampColor : VISIT_COLORS[i]]
              }
            />
          ))}
        </div>

        <Divider text="Top-Collectibles" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 7,
            marginBottom: 14,
          }}
        >
          {collSlots.map((coll, i) => (
            <CollectibleCard key={i} coll={coll} />
          ))}
        </div>

        <Divider text="Total Stars" />

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 10,
            padding: '6px 0 4px',
          }}
        >
          {badgeSlots.map((badge, i) => (
            <ShieldBadge
              key={i}
              imageUrl={badge?.imageUrl}
              name={badge?.name ?? '—'}
              color={badge ? 'rgba(184,134,11,0.2)' : 'rgba(240,226,168,0.12)'}
              stroke={badge ? '#b8860b' : '#c9a03066'}
            />
          ))}

          <div
            style={{
              width: 66,
              height: 66,
              border: '1.5px solid #c9a030',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0e2a8',
              flexShrink: 0,
            }}
          >
            <CompassRose size={54} />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <span
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontSize: 30,
              fontWeight: 700,
              color: '#1c0e02',
            }}
          >
            {Math.round(child.totalStars)}
          </span>
          <span style={{ fontSize: 22, color: '#c9a030' }}> ★</span>
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 8,
              color: '#b8860b',
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginTop: 3,
            }}
          >
            Stars collected
          </div>
        </div>
      </Page>
    </div>
  )
}
