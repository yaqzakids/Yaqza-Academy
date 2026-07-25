import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelectedChild } from '@/context/SelectedChildContext'
import ArticleProgressButton from '@/components/adventure/ArticleProgressButton'
import StarsDisplay from '@/components/adventure/StarsDisplay'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import DiscovererArticleView from '@/components/discoverer/DiscovererArticleView'
import LessonSidebar from '@/components/adventure/lesson/LessonSidebar'
import LessonQuizModal from '@/components/adventure/lesson/LessonQuizModal'
import QuizCelebrationModal from '@/components/adventure/lesson/QuizCelebrationModal'
import ReadingCompleteModal from '@/components/adventure/lesson/ReadingCompleteModal'
import {
  fetchAdventureArticle,
  fetchArticleProgress,
  markArticleRead,
} from '@/lib/adventure/service'
import { getLocalizedArticleFields } from '@/lib/admin/articleI18n'
import { STORAGE_KEYS } from '@/lib/constants'
import type { AdventureArticle, AdventurePath, ArticleProgress } from '@/lib/adventure/types'
import {
  lessonAgeLabel,
  lessonFamilyDiscussion,
  lessonFunFacts,
  lessonPathLabel,
  lessonPathUrl,
  lessonTopicTags,
  lessonVocabulary,
} from '@/lib/adventure/lessonDisplay'
import {
  LessonFaithReflectionSection,
  LessonFunFactsSection,
  LessonMainContentSection,
  LessonParentDiscussionSection,
  LessonTakeActionSection,
  LessonTopicTags,
  LessonVocabularySection,
} from '@/components/adventure/lesson/LessonSections'
import {
  LESSON_MAIN_COLUMN_CLASS,
  LESSON_MOBILE_SIDEBAR_CLASS,
  LESSON_PAGE_GRID_CLASS,
  LESSON_SIDEBAR_COLUMN_CLASS,
} from '@/components/adventure/lesson/lessonLayout'
import LessonActivityCardsSection from '@/components/adventure/lesson/LessonActivityCardsSection'
import LessonHeroImage from '@/components/adventure/lesson/LessonHeroImage'
import { lessonActivityCards } from '@/lib/adventure/lessonActivityCards'
import { buildArticleReadAloudBody } from '@/lib/voice/readAloudText'
import { resolveReadAloudLanguage } from '@/lib/voice/language'
import { useLessonFlow } from '@/hooks/useLessonFlow'
import { useLessonReadingProgress } from '@/hooks/useLessonReadingProgress'
import { useOpenQuizFromQuery } from '@/hooks/useOpenQuizFromQuery'
import type { AgeGroup } from '@/lib/types'

export default function AdventureArticlePage() {
  const { pathSlug, articleSlug } = useParams<{ pathSlug: string; articleSlug: string }>()
  const { selectedChild } = useSelectedChild()
  const [path, setPath] = useState<AdventurePath | null>(null)
  const [article, setArticle] = useState<AdventureArticle | null>(null)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [progress, setProgress] = useState<ArticleProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [starsAwarded, setStarsAwarded] = useState(25)
  const endSentinelRef = useRef<HTMLDivElement>(null)
  const endAutoMarkedRef = useRef(false)

  const ageGroup = (localStorage.getItem(STORAGE_KEYS.ageGroup) as AgeGroup) ?? selectedChild?.age_group ?? 'explorer'
  const readAloudLanguage = resolveReadAloudLanguage({
    childLanguage: selectedChild?.language,
    storedLanguage: localStorage.getItem(STORAGE_KEYS.language),
  })

  const load = async () => {
    if (!pathSlug || !articleSlug || !selectedChild) return
    setLoading(true)
    try {
      const data = await fetchAdventureArticle(pathSlug, articleSlug)
      if (!data) {
        setError('Article not found.')
        return
      }
      setPath(data.path)
      setArticle(data.article)
      setQuizId(data.quiz?.id ?? null)

      const prog = await fetchArticleProgress(selectedChild.id, data.article.id)
      setProgress(prog)
    } catch {
      setError('Could not load article.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [pathSlug, articleSlug, selectedChild?.id])

  const { scrollPercent, reachedEnd } = useLessonReadingProgress(endSentinelRef)
  const hasQuiz = Boolean(quizId)

  const {
    readCompleted,
    quizUnlocked,
    quizPassed,
    showReadingModal,
    showQuizModal,
    showCelebration,
    setShowReadingModal,
    setShowCelebration,
    setShowQuizModal,
    handleReadComplete,
    startQuiz,
    handleQuizPassed,
  } = useLessonFlow({
    initialProgress: progress,
    hasQuiz,
    onProgressUpdated: setProgress,
  })

  useOpenQuizFromQuery({
    enabled: hasQuiz && readCompleted,
    onOpenQuiz: startQuiz,
  })

  useEffect(() => {
    if (!article || !selectedChild || !reachedEnd || readCompleted || endAutoMarkedRef.current) return
    endAutoMarkedRef.current = true
    void markArticleRead(selectedChild.id, article.id)
      .then((p) => handleReadComplete(p))
      .catch(() => {
        endAutoMarkedRef.current = false
      })
  }, [reachedEnd, readCompleted, article, selectedChild, handleReadComplete])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !article || !path || !selectedChild) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <ErrorMessage message={error ?? 'Not found'} />
      </div>
    )
  }

  const localized = getLocalizedArticleFields(article, readAloudLanguage, ageGroup)
  const content = localized.content
  const topicTags = lessonTopicTags(article, path)
  const funFacts = lessonFunFacts(article)
  const vocabulary = lessonVocabulary(article)
  const familyDiscussion = lessonFamilyDiscussion(article)
  const activityCards = lessonActivityCards(article, ageGroup)
  const activityForSection =
    ageGroup === 'explorer'
      ? localized.activity?.trim() || null
      : ageGroup === 'thinker'
        ? null
        : localized.activity?.trim() || article.take_action?.trim() || null

  if (ageGroup === 'discoverer') {
    return (
      <DiscovererArticleView
        path={path}
        article={article}
        quizId={quizId}
        progress={progress}
        childId={selectedChild.id}
        localized={localized}
        language={readAloudLanguage}
        ageGroup={ageGroup}
        onProgressUpdated={setProgress}
      />
    )
  }

  const readAloudContent = buildArticleReadAloudBody({
    content,
    islamic_teaching: localized.islamic_teaching,
    think_about_it: localized.think_about_it,
    activity: localized.activity,
  })

  const sidebar = (
    <LessonSidebar
      lessonTitle={localized.title}
      readAloudContent={readAloudContent}
      language={readAloudLanguage}
      articleId={article.id}
      ageGroup={ageGroup}
      scrollPercent={scrollPercent}
      quizUnlocked={quizUnlocked}
      quizPassed={quizPassed}
      hasQuiz={hasQuiz}
      onStartQuiz={startQuiz}
    />
  )

  return (
    <div className="min-h-screen bg-bg page-transition">
      <ReadingCompleteModal
        lessonTitle={localized.title}
        open={showReadingModal}
        hasQuiz={hasQuiz && !quizPassed}
        onStartQuiz={startQuiz}
        onLater={() => setShowReadingModal(false)}
      />

      {quizId && (
        <LessonQuizModal
          open={showQuizModal}
          childId={selectedChild.id}
          quizId={quizId}
          ageGroup={ageGroup}
          language={readAloudLanguage}
          lessonTitle={localized.title}
          onClose={() => setShowQuizModal(false)}
          onPassed={async (result) => {
            if (result?.starsAwarded) setStarsAwarded(result.starsAwarded)
            await load()
            handleQuizPassed()
          }}
        />
      )}

      <QuizCelebrationModal
        open={showCelebration}
        lessonTitle={localized.title}
        starsAwarded={starsAwarded}
        continueUrl={lessonPathUrl(path)}
        onClose={() => setShowCelebration(false)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <LessonHeroImage article={article} path={path} className="mb-0 [&_img]:rounded-2xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <Link to={lessonPathUrl(path)} className="text-teal text-sm font-bold hover:underline">
          ← Back to {lessonPathLabel(path)}
        </Link>

        {readCompleted && quizPassed && (
          <p className="mt-4 mb-0 inline-flex items-center gap-2 rounded-full bg-teal/10 text-teal px-4 py-1.5 text-xs font-extrabold">
            ✅ Completed — you&apos;re reviewing this lesson
          </p>
        )}
        {readCompleted && !quizPassed && hasQuiz && (
          <p className="mt-4 mb-0 inline-flex items-center gap-2 rounded-full bg-gold/15 text-[#92400E] px-4 py-1.5 text-xs font-extrabold">
            📖 Read — quiz not passed yet. Use the quiz card to try again.
          </p>
        )}

        <div className="flex flex-wrap justify-between items-start gap-4 mt-4 mb-2">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy min-w-0 flex-1 break-words">{localized.title}</h1>
          <StarsDisplay childId={selectedChild?.id ?? null} />
        </div>

        <LessonTopicTags tags={topicTags} className="mb-3" />

        <p className="text-muted text-sm mb-6">
          ⏱ {article.reading_time_minutes} min read · {lessonAgeLabel(article)}
        </p>

        <div className={LESSON_MOBILE_SIDEBAR_CLASS}>{sidebar}</div>

        <LessonFunFactsSection facts={funFacts} />

        <div className={LESSON_PAGE_GRID_CLASS}>
          <div className={LESSON_MAIN_COLUMN_CLASS}>
            <LessonMainContentSection
              content={content}
              excerpt={article.excerpt}
              language={readAloudLanguage}
            />

            <LessonVocabularySection vocabulary={vocabulary} />

            <LessonFaithReflectionSection
              article={article}
              islamicTeaching={localized.islamic_teaching}
              thinkAbout={localized.think_about_it}
              variant="explorer"
            />

            {activityCards.length > 0 ? (
              <LessonActivityCardsSection cards={activityCards} />
            ) : (
              <LessonTakeActionSection takeAction={null} activity={activityForSection} />
            )}

            <LessonParentDiscussionSection question={familyDiscussion} />

            <div ref={endSentinelRef} className="h-1" aria-hidden />

            <div className="mt-6">
              <ArticleProgressButton
                childId={selectedChild.id}
                articleId={article.id}
                initialProgress={progress}
                onUpdated={setProgress}
                onReadComplete={handleReadComplete}
              />
            </div>
          </div>

          <div className={LESSON_SIDEBAR_COLUMN_CLASS}>{sidebar}</div>
        </div>
      </div>
    </div>
  )
}
