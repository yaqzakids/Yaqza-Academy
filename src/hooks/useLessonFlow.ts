import { useCallback, useEffect, useState } from 'react'
import type { ArticleProgress } from '@/lib/adventure/types'

export interface UseLessonFlowOptions {
  initialProgress?: ArticleProgress | null
  hasQuiz: boolean
  onProgressUpdated?: (progress: ArticleProgress) => void
}

export function useLessonFlow({
  initialProgress,
  onProgressUpdated,
}: UseLessonFlowOptions) {
  const [readCompleted, setReadCompleted] = useState(initialProgress?.read_completed ?? false)
  const [quizPassed, setQuizPassed] = useState(initialProgress?.quiz_passed ?? false)
  const [showReadingModal, setShowReadingModal] = useState(false)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    setReadCompleted(initialProgress?.read_completed ?? false)
    setQuizPassed(initialProgress?.quiz_passed ?? false)
  }, [initialProgress?.read_completed, initialProgress?.quiz_passed])

  const handleReadComplete = useCallback(
    (progress: ArticleProgress) => {
      setReadCompleted(true)
      onProgressUpdated?.(progress)
      setShowReadingModal(true)
    },
    [onProgressUpdated]
  )

  const startQuiz = useCallback(() => {
    setShowReadingModal(false)
    setShowQuizModal(true)
  }, [])

  const handleQuizPassed = useCallback(
    (progress?: ArticleProgress) => {
      setQuizPassed(true)
      setShowQuizModal(false)
      setShowCelebration(true)
      if (progress) onProgressUpdated?.(progress)
    },
    [onProgressUpdated]
  )

  return {
    readCompleted,
    quizUnlocked: readCompleted,
    quizPassed,
    showReadingModal,
    showQuizModal,
    showCelebration,
    setShowReadingModal,
    setShowQuizModal,
    setShowCelebration,
    handleReadComplete,
    startQuiz,
    handleQuizPassed,
  }
}
