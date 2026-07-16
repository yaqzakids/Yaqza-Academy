import { useEffect } from 'react'

export default function HowToPlayModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-[#1B2F5E]/50 backdrop-blur-sm"
        aria-label="Close how to play"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="how-to-play-title"
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8"
      >
        <h2 id="how-to-play-title" className="font-display text-2xl font-bold text-[#1B2F5E] mb-4 m-0">
          How to Play
        </h2>
        <ol className="space-y-3 text-sm text-[#1B2F5E]/85 m-0 pl-5">
          <li>Choose an era, region, or difficulty from the filters above the map.</li>
          <li>Tap a region card on the map to explore its cities and landmarks.</li>
          <li>Start a journey to learn, complete quizzes, and earn stars.</li>
          <li>Collect scrolls, badges, and tokens as you explore.</li>
          <li>Unlock new regions as you complete more journeys.</li>
        </ol>
        <p className="text-xs text-[#6B7280] mt-4 m-0">
          Explore with respect — we use symbolic art only, never images of prophets or companions.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-full bg-[#2AAFA0] text-white font-extrabold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AAFA0] focus-visible:ring-offset-2"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
