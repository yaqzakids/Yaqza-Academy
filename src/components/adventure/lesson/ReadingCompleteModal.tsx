export interface ReadingCompleteModalProps {
  lessonTitle: string
  open: boolean
  hasQuiz: boolean
  onStartQuiz: () => void
  onLater: () => void
}

export default function ReadingCompleteModal({
  lessonTitle,
  open,
  hasQuiz,
  onStartQuiz,
  onLater,
}: ReadingCompleteModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reading-complete-title"
    >
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 text-center">
        <p className="text-5xl mb-4" aria-hidden>
          🎉
        </p>
        <h2 id="reading-complete-title" className="font-display text-2xl font-bold text-navy mb-2">
          Great Job!
        </h2>
        <p className="text-muted text-sm mb-1">You&apos;ve finished reading:</p>
        <p className="font-bold text-navy text-lg mb-6">{lessonTitle}</p>
        {hasQuiz ? (
          <p className="text-sm text-navy mb-6">Ready to test your knowledge?</p>
        ) : (
          <p className="text-sm text-navy mb-6">Keep exploring — more adventures await!</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {hasQuiz && (
            <button
              type="button"
              onClick={onStartQuiz}
              className="px-6 py-3 rounded-full bg-gold text-white font-extrabold text-sm hover:opacity-90"
            >
              Start Quiz
            </button>
          )}
          <button
            type="button"
            onClick={onLater}
            className="px-6 py-3 rounded-full border-2 border-gray-200 text-navy font-extrabold text-sm hover:bg-gray-50"
          >
            {hasQuiz ? 'Maybe Later' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
