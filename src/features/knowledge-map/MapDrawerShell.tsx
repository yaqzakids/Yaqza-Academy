import { useEffect, type ReactNode, type Ref } from 'react'

export interface MapDrawerShellProps {
  open: boolean
  onClose: () => void
  titleId: string
  ariaLabel: string
  children: ReactNode
  header: ReactNode
  onPointerEnter?: () => void
  onPointerLeave?: () => void
  panelRef?: Ref<HTMLDivElement>
}

/** Drawer overlay: backdrop z-30, panel z-50, close control z-50. */
export default function MapDrawerShell({
  open,
  onClose,
  titleId,
  ariaLabel,
  children,
  header,
  onPointerEnter,
  onPointerLeave,
  panelRef,
}: MapDrawerShellProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const stopMapScroll = (e: React.SyntheticEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-end justify-end pointer-events-none"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 z-30 pointer-events-auto bg-[#1B2F5E]/30 backdrop-blur-[1px]"
        aria-label="Click outside to close"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        onWheel={stopMapScroll}
        onTouchMove={stopMapScroll}
        onMouseEnter={onPointerEnter}
        onMouseLeave={onPointerLeave}
        className={[
          'relative z-50 pointer-events-auto flex flex-col bg-white shadow-2xl overflow-hidden',
          'w-full max-h-[85vh] rounded-t-2xl',
          'sm:max-w-md sm:max-h-[90vh] sm:rounded-2xl sm:m-4',
          'lg:max-w-sm lg:max-h-screen lg:h-full lg:rounded-none lg:m-0',
        ].join(' ')}
      >
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-5 py-4 flex items-start justify-between gap-3 shrink-0 z-50">
          <div className="min-w-0 flex-1">{header}</div>
          <button
            type="button"
            onClick={onClose}
            className="relative z-50 shrink-0 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-[#E5E7EB] text-[#1B2F5E] text-xl font-bold hover:bg-[#EEF4FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0] pointer-events-auto"
            aria-label={ariaLabel}
          >
            ×
          </button>
        </div>

        <div
          className="overflow-y-auto overscroll-contain flex-1 min-h-0 max-h-full px-5 py-5"
          onWheel={stopMapScroll}
          onTouchMove={stopMapScroll}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
