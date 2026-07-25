import QuizComponent from '@/components/adventure/QuizComponent'
import type { AgeGroup, Language } from '@/lib/types'

export interface LessonQuizModalProps {
  open: boolean
  childId?: string
  quizId: string
  ageGroup: AgeGroup
  language: Language
  lessonTitle: string
  previewMode?: boolean
  onClose: () => void
  onPassed?: (result?: { starsAwarded: number }) => void
}

export default function LessonQuizModal({
  open,
  childId,
  quizId,
  ageGroup,
  language,
  lessonTitle,
  previewMode = false,
  onClose,
  onPassed,
}: LessonQuizModalProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#EEF4FF]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-quiz-modal-title"
    >
      <header className="shrink-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-extrabold text-muted uppercase">Lesson Quiz</p>
          <h2 id="lesson-quiz-modal-title" className="font-bold text-navy truncate">
            {lessonTitle}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-extrabold text-navy hover:bg-gray-50"
        >
          Close
        </button>
      </header>
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-3xl mx-auto w-full">
        <QuizComponent
          childId={childId}
          quizId={quizId}
          ageGroup={ageGroup}
          language={language}
          previewMode={previewMode}
          onPassed={onPassed}
        />
      </div>
    </div>
  )
}
