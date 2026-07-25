export interface LessonQuizStatusCardProps {
  quizUnlocked: boolean
  quizPassed: boolean
  hasQuiz: boolean
  onStartQuiz?: () => void
}

export default function LessonQuizStatusCard({
  quizUnlocked,
  quizPassed,
  hasQuiz,
  onStartQuiz,
}: LessonQuizStatusCardProps) {
  if (!hasQuiz) return null

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
        <span aria-hidden>📝</span> Lesson Quiz
      </h3>

      {quizPassed ? (
        <div className="rounded-xl bg-teal/10 border border-teal/30 p-4">
          <p className="text-2xl mb-1 text-center" aria-hidden>
            ✅
          </p>
          <p className="text-sm font-extrabold text-teal text-center">Quiz passed!</p>
          <p className="text-xs text-muted mt-1 text-center mb-3">You can read this lesson anytime and practice again.</p>
          <button
            type="button"
            onClick={onStartQuiz}
            className="w-full px-4 py-2.5 rounded-full bg-navy text-white text-sm font-extrabold hover:opacity-90"
          >
            Retake quiz
          </button>
        </div>
      ) : quizUnlocked ? (
        <div className="rounded-xl bg-[#FFFBF0] border border-gold/40 p-4">
          <p className="text-xs font-extrabold text-gold uppercase mb-1">Ready</p>
          <p className="text-sm text-navy mb-3">Test what you learned — you can try as many times as you need.</p>
          <button
            type="button"
            onClick={onStartQuiz}
            className="w-full px-4 py-2.5 rounded-full bg-gold text-white text-sm font-extrabold hover:opacity-90"
          >
            {quizUnlocked ? 'Take quiz' : 'Start quiz'}
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
          <p className="text-xs font-extrabold text-muted uppercase mb-1 flex items-center gap-1">
            <span aria-hidden>🔒</span> Locked
          </p>
          <p className="text-sm text-navy leading-relaxed">
            Finish reading the lesson to unlock the quiz.
          </p>
        </div>
      )}
    </div>
  )
}
