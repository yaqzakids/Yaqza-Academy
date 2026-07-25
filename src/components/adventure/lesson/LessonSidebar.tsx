import ReadAloudPlayer from '@/components/voice/ReadAloudPlayer'
import LessonQuizStatusCard from '@/components/adventure/lesson/LessonQuizStatusCard'
import type { AgeGroup, Language } from '@/lib/types'

export interface LessonSidebarProps {
  lessonTitle: string
  readAloudContent: string
  language: Language
  articleId: string
  ageGroup: AgeGroup
  scrollPercent: number
  quizUnlocked: boolean
  quizPassed: boolean
  hasQuiz: boolean
  onStartQuiz?: () => void
  parentThemes?: React.ReactNode
}

export default function LessonSidebar({
  lessonTitle,
  readAloudContent,
  language,
  articleId,
  ageGroup,
  scrollPercent,
  quizUnlocked,
  quizPassed,
  hasQuiz,
  onStartQuiz,
  parentThemes,
}: LessonSidebarProps) {
  return (
    <aside className="space-y-5 md:sticky md:top-24 w-full max-w-[280px] md:max-w-none">
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
          <span aria-hidden>🎧</span> Listen to this Lesson
        </h3>
        <ReadAloudPlayer
          label="Lesson audio"
          title={lessonTitle}
          content={readAloudContent}
          language={language}
          articleId={articleId}
          ageGroup={ageGroup}
        />
        <div className="mt-4">
          <div className="flex justify-between text-xs font-bold text-muted mb-1.5">
            <span>Reading progress</span>
            <span>{scrollPercent}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden" aria-hidden>
            <div
              className="h-full bg-teal rounded-full transition-all duration-300"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
        </div>
      </div>

      <LessonQuizStatusCard
        hasQuiz={hasQuiz}
        quizUnlocked={quizUnlocked}
        quizPassed={quizPassed}
        onStartQuiz={onStartQuiz}
      />

      {parentThemes}
    </aside>
  )
}
