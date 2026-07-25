import { Link } from 'react-router-dom'

export interface QuizCelebrationModalProps {
  open: boolean
  lessonTitle: string
  starsAwarded?: number
  continueUrl: string
  continueLabel?: string
  onClose: () => void
}

export default function QuizCelebrationModal({
  open,
  lessonTitle,
  starsAwarded = 25,
  continueUrl,
  continueLabel = 'Continue Journey',
  onClose,
}: QuizCelebrationModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-celebration-title"
    >
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
        <p className="text-5xl mb-4" aria-hidden>
          ⭐
        </p>
        <h2 id="quiz-celebration-title" className="font-display text-2xl font-bold text-navy mb-2">
          Amazing!
        </h2>
        <p className="text-sm text-muted mb-1">You passed the quiz for</p>
        <p className="font-bold text-navy text-lg mb-4">{lessonTitle}</p>
        <p className="text-gold font-extrabold text-lg mb-6">+{starsAwarded} Stars earned!</p>
        <p className="text-sm text-muted mb-6">
          Your progress, path, and Today&apos;s Quest have been updated.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            to={continueUrl}
            className="px-6 py-3 rounded-full bg-teal text-white font-extrabold text-sm hover:opacity-90 no-underline"
            onClick={onClose}
          >
            {continueLabel}
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-full border-2 border-gray-200 text-navy font-extrabold text-sm hover:bg-gray-50"
          >
            Stay on this lesson
          </button>
        </div>
      </div>
    </div>
  )
}
