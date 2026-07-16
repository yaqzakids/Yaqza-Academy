/* ============================================================
   src/features/knowledge-map/PassportSidebar.tsx

   Wrapper that fetches passport data and renders the passport.
   ============================================================ */

import { useEffect, useState } from 'react'
import { useSelectedChild } from '@/context/SelectedChildContext'
import InteractivePassport from './passport/interactive/InteractivePassport'
import { fetchPassportData } from './passport/fetchPassportData'
import type { PassportData } from './passport/passportTypes'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function PassportSidebar({ isOpen, onClose }: Props) {
  const { selectedChild } = useSelectedChild()
  const [data, setData] = useState<PassportData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen || !selectedChild?.id) return
    setLoading(true)
    setError(null)
    fetchPassportData(selectedChild.id)
      .then((d) => {
        setData(d)
        setLoading(false)
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : String(e))
        setLoading(false)
      })
  }, [isOpen, selectedChild?.id])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 12px',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {loading && (
        <div
          style={{
            color: '#c9a030',
            fontFamily: 'Cinzel, serif',
            fontSize: 16,
            letterSpacing: 2,
          }}
        >
          Loading passport…
        </div>
      )}

      {error && (
        <div
          style={{
            color: '#e06060',
            fontFamily: 'sans-serif',
            background: 'rgba(26,8,0,0.9)',
            padding: '20px 28px',
            borderRadius: 8,
            border: '1px solid #8b1a1a',
            maxWidth: 400,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 14, marginBottom: 8 }}>Could not load passport</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>{error}</div>
          <button
            onClick={onClose}
            style={{
              marginTop: 14,
              padding: '6px 18px',
              background: 'transparent',
              border: '1px solid #8b1a1a',
              borderRadius: 4,
              color: '#e06060',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}

      {!loading && !error && !selectedChild?.id && (
        <div
          style={{
            color: '#f4e5c6',
            fontFamily: 'sans-serif',
            background: 'rgba(26,8,0,0.9)',
            padding: '20px 28px',
            borderRadius: 8,
            border: '1px solid #c9a030',
            maxWidth: 400,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 14, marginBottom: 8 }}>Sign in to view your passport</div>
          <button
            onClick={onClose}
            style={{
              marginTop: 14,
              padding: '6px 18px',
              background: 'transparent',
              border: '1px solid #c9a030',
              borderRadius: 4,
              color: '#c9a030',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <InteractivePassport data={data} onClose={onClose} />
      )}
    </div>
  )
}
