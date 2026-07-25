import { useEffect, useMemo, useState } from 'react'
import {
  fetchAdventureQuizById,
  fetchQuizQuestions,
  shuffleOptions,
  shuffleQuestions,
  submitQuizAttempt,
} from '@/lib/adventure/service'
import { QUIZ_PASSING_SCORE } from '@/lib/adventure/constants'
import type { QuizOption, QuizQuestion } from '@/lib/adventure/types'
import type { AgeGroup } from '@/lib/types'
import LoadingSpinner from '@/components/LoadingSpinner'
import { buildQuizQuestionText } from '@/lib/voice/readAloudText'
import ReadAloudPlayer from '@/components/voice/ReadAloudPlayer'

interface ShuffledQuestion extends QuizQuestion {
  shuffledOptions: QuizOption[]
}

interface QuizComponentProps {
  childId?: string
  quizId: string
  ageGroup?: AgeGroup
  language?: 'en' | 'fr' | 'ar'
  previewMode?: boolean
  onPassed?: (result?: { starsAwarded: number }) => void
}

function isReflectionQuestion(q: QuizQuestion): boolean {
  return q.question_type === 'reflection'
}

export default function QuizComponent({
  childId,
  quizId,
  ageGroup = 'explorer',
  language = 'en',
  previewMode = false,
  onPassed,
}: QuizComponentProps) {
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [loading, setLoading] = useState(true)
  const [explanations, setExplanations] = useState<Record<string, string>>({})
  const [passingScore, setPassingScore] = useState(QUIZ_PASSING_SCORE)
  const [starsAwarded, setStarsAwarded] = useState(25)
  const [showExplanations, setShowExplanations] = useState(true)
  const [allowRetries, setAllowRetries] = useState(true)
  const [quizTitle, setQuizTitle] = useState('Adventure Quiz')

  const loadQuestions = async () => {
    setLoading(true)
    const [quiz, qs] = await Promise.all([
      fetchAdventureQuizById(quizId),
      fetchQuizQuestions(quizId, ageGroup),
    ])

    if (quiz) {
      setPassingScore(quiz.passing_score ?? QUIZ_PASSING_SCORE)
      setStarsAwarded(quiz.stars_awarded ?? 25)
      setShowExplanations(quiz.show_explanations !== false)
      setAllowRetries(quiz.allow_retries !== false)
      setQuizTitle(quiz.title ?? 'Adventure Quiz')
    }

    const ordered = quiz?.randomize_questions !== false ? shuffleQuestions(qs) : qs
    const shuffled = ordered.map((q) => ({
      ...q,
      shuffledOptions: quiz?.randomize_answers !== false ? shuffleOptions(q.options) : q.options,
    }))
    setQuestions(shuffled)
    setAnswers({})
    setSubmitted(false)
    setExplanations({})
    setLoading(false)
  }

  useEffect(() => {
    void loadQuestions()
  }, [quizId, ageGroup, attempt])

  const gradableQuestions = useMemo(
    () => questions.filter((q) => !isReflectionQuestion(q)),
    [questions]
  )

  const allAnswered = useMemo(
    () => questions.length > 0 && questions.every((q) => answers[q.id] !== undefined),
    [questions, answers]
  )

  const handleSubmit = async () => {
    let correct = 0
    const newExplanations: Record<string, string> = {}

    questions.forEach((q) => {
      const selectedIdx = answers[q.id]
      const selected = q.shuffledOptions[selectedIdx]
      if (isReflectionQuestion(q)) {
        newExplanations[q.id] = q.explanation
        return
      }
      if (selected?.is_correct) correct++
      if (showExplanations) newExplanations[q.id] = q.explanation
    })

    const gradedTotal = gradableQuestions.length || questions.length
    const scorePct = gradedTotal ? Math.round((correct / gradedTotal) * 100) : 100
    setScore(scorePct)
    setExplanations(newExplanations)
    setSubmitted(true)

    if (!previewMode && childId) {
      await submitQuizAttempt(childId, quizId, scorePct, answers)
    }
    const didPass = scorePct >= passingScore
    setPassed(didPass)
    if (didPass) onPassed?.({ starsAwarded })
  }

  const handleRetry = () => {
    setAttempt((a) => a + 1)
  }

  if (loading) return <LoadingSpinner />

  if (questions.length === 0) {
    return <p className="text-muted text-sm">No quiz questions for this article yet.</p>
  }

  return (
    <div className="space-y-6">
      {previewMode && (
        <p className="text-sm font-semibold text-[#92400E] bg-[#FFFBF0] border border-[#F5D78E] rounded-xl px-4 py-3 m-0">
          Admin preview — quiz scores are not saved and no stars are awarded.
        </p>
      )}
      <div>
        <h2 className="font-display text-2xl font-bold text-navy">🎯 {quizTitle}</h2>
        <p className="text-sm text-muted mt-1">
          {questions.length} questions · Pass with {passingScore}% or higher to earn ⭐ {starsAwarded} stars
          {allowRetries ? ' · Unlimited retries!' : ''}
        </p>
      </div>

      {questions.map((q, qi) => (
        <div key={q.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
            <p className="font-bold text-navy flex-1 min-w-0 break-words">
              {qi + 1}. {q.question_text}
            </p>
            <ReadAloudPlayer
              variant="compact"
              label="Read Question"
              content={buildQuizQuestionText(q.question_text, q.shuffledOptions.map((opt) => opt.text))}
              language={language}
              cacheKeyPrefix={`quiz:${quizId}:${q.id}`}
            />
          </div>
          {q.image_url && (
            <img src={q.image_url} alt="" className="mb-3 max-h-48 rounded-xl object-cover w-full" />
          )}
          <div className="space-y-2">
            {q.shuffledOptions.map((opt, oi) => {
              const selected = answers[q.id] === oi
              const showResult = submitted && showExplanations
              const isCorrect = opt.is_correct
              return (
                <button
                  key={oi}
                  type="button"
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-colors ${
                    showResult && isCorrect
                      ? 'border-teal bg-teal/10 text-teal'
                      : showResult && selected && !isCorrect
                      ? 'border-coral bg-coral/10 text-coral'
                      : selected
                      ? 'border-gold bg-gold/10 text-navy'
                      : 'border-gray-200 hover:border-gold text-navy'
                  }`}
                >
                  {opt.text}
                </button>
              )
            })}
          </div>
          {submitted && showExplanations && explanations[q.id] && (
            <p className="mt-3 text-sm text-muted bg-[#FFFBF0] rounded-xl p-3 border-l-4 border-gold">
              💡 {explanations[q.id]}
            </p>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="bg-gold text-white px-8 py-3 rounded-full font-extrabold disabled:opacity-50 hover:opacity-90"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="text-center py-6 bg-white rounded-2xl border border-gray-200 px-4">
          <p className="text-4xl mb-2">{passed ? '🎉' : '💪'}</p>
          <p className="font-display text-2xl font-bold text-navy">Score: {score}%</p>
          <p className={`text-lg font-bold mt-2 ${passed ? 'text-teal' : 'text-coral'}`}>
            {passed ? 'Passed!' : 'Not quite — keep learning!'}
          </p>
          {passed ? (
            <p className="text-gold font-bold mt-2">
              {previewMode ? 'Preview pass — no stars awarded.' : `⭐ +${starsAwarded} Stars earned!`}
            </p>
          ) : (
            <p className="text-muted mt-2">You need {passingScore}% to pass.</p>
          )}
          {!passed && allowRetries && (
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 bg-navy text-white px-6 py-3 rounded-full font-bold hover:opacity-90"
            >
              Try Again
            </button>
          )}
        </div>
      )}
    </div>
  )
}
