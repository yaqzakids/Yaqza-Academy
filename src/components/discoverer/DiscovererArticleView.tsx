import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import ParentGateLink from '@/components/parent/ParentGateLink'
import ArticleProgressButton from '@/components/adventure/ArticleProgressButton'
import LessonSidebar from '@/components/adventure/lesson/LessonSidebar'
import LessonQuizModal from '@/components/adventure/lesson/LessonQuizModal'
import QuizCelebrationModal from '@/components/adventure/lesson/QuizCelebrationModal'
import ReadingCompleteModal from '@/components/adventure/lesson/ReadingCompleteModal'
import {
  LessonFaithReflectionSection,
  LessonFunFactsSection,
  LessonMainContentSection,
  LessonParentDiscussionSection,
  LessonTakeActionSection,
  LessonTopicTags,
  LessonVocabularySection,
} from '@/components/adventure/lesson/LessonSections'
import { fetchArticleProgress, markArticleRead } from '@/lib/adventure/service'
import LessonActivityCardsSection from '@/components/adventure/lesson/LessonActivityCardsSection'
import {
  LESSON_MAIN_COLUMN_CLASS,
  LESSON_MOBILE_SIDEBAR_CLASS,
  LESSON_PAGE_GRID_CLASS,
  LESSON_SIDEBAR_COLUMN_CLASS,
} from '@/components/adventure/lesson/lessonLayout'
import LessonHeroImage from '@/components/adventure/lesson/LessonHeroImage'
import {
  lessonAgeLabel,
  lessonFamilyDiscussion,
  lessonFunFacts,
  lessonMetadataCategory,
  lessonPathLabel,
  lessonPathUrl,
  lessonThemes,
  lessonTopicTags,
  lessonVocabulary,
  usulThemeBlurb,
} from '@/lib/adventure/lessonDisplay'
import { lessonActivityCards } from '@/lib/adventure/lessonActivityCards'
import {
  pickLocalizedField,
  pickLocalizedThinkAbout,
  usulThemeLabel,
  fetchRelatedDiscovererArticles,
  resolveArticleUrl,
} from '@/lib/discoverer'
import { buildArticleReadAloudBody } from '@/lib/voice/readAloudText'
import { useLessonFlow } from '@/hooks/useLessonFlow'
import { useLessonReadingProgress } from '@/hooks/useLessonReadingProgress'
import { useOpenQuizFromQuery } from '@/hooks/useOpenQuizFromQuery'
import type { AdventureArticle, AdventurePath, ArticleProgress } from '@/lib/adventure/types'
import type { AgeGroup, Language } from '@/lib/types'

interface DiscovererArticleViewProps {
  path: AdventurePath
  article: AdventureArticle
  quizId: string | null
  progress: ArticleProgress | null
  childId: string
  localized: {
    title: string
    content: string
    islamic_teaching: string | null
    think_about_it: string[] | null
    activity: string | null
  }
  language: Language
  ageGroup: AgeGroup
  onProgressUpdated: (p: ArticleProgress | null) => void
}

export default function DiscovererArticleView({
  path,
  article,
  quizId,
  progress,
  childId,
  localized,
  language,
  ageGroup,
  onProgressUpdated,
}: DiscovererArticleViewProps) {
  const endSentinelRef = useRef<HTMLDivElement>(null)
  const endAutoMarkedRef = useRef(false)
  const [relatedArticles, setRelatedArticles] = useState<AdventureArticle[]>([])
  const [relatedUrls, setRelatedUrls] = useState<Record<string, string>>({})
  const [starsAwarded, setStarsAwarded] = useState(25)

  const topicTags = lessonTopicTags(article, path)
  const funFacts = lessonFunFacts(article)
  const vocabulary = lessonVocabulary(article)
  const activityCards = lessonActivityCards(article, ageGroup)
  const themes = lessonThemes(article)
  const familyDiscussion = lessonFamilyDiscussion(article)
  const hasQuiz = Boolean(quizId)

  const islamicReflection = pickLocalizedField(
    article.islamic_reflection ?? localized.islamic_teaching,
    article.islamic_reflection_i18n,
    language
  )
  const thinkAbout = pickLocalizedThinkAbout(
    article.think_about_it ?? localized.think_about_it,
    article.think_about_it_i18n,
    language
  )
  const takeAction = pickLocalizedField(
    article.take_action ?? localized.activity,
    article.take_action_i18n,
    language
  )
  const usulTheme = article.usul_theme
  const themeBlurb = usulThemeBlurb(usulTheme)

  const { scrollPercent, reachedEnd } = useLessonReadingProgress(endSentinelRef)

  const {
    readCompleted,
    quizUnlocked,
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
  } = useLessonFlow({
    initialProgress: progress,
    hasQuiz,
    onProgressUpdated,
  })

  useOpenQuizFromQuery({
    enabled: hasQuiz && readCompleted,
    onOpenQuiz: startQuiz,
  })

  const readAloudContent = buildArticleReadAloudBody({
    content: localized.content,
    islamic_teaching: localized.islamic_teaching,
    think_about_it: localized.think_about_it,
    activity: localized.activity,
  })

  useEffect(() => {
    if (!reachedEnd || readCompleted || endAutoMarkedRef.current) return
    endAutoMarkedRef.current = true
    void markArticleRead(childId, article.id)
      .then((p) => handleReadComplete(p))
      .catch(() => {
        endAutoMarkedRef.current = false
      })
  }, [reachedEnd, readCompleted, childId, article.id, handleReadComplete])

  useEffect(() => {
    void fetchRelatedDiscovererArticles(article.id, 4).then(async (articles) => {
      setRelatedArticles(articles)
      const urls: Record<string, string> = {}
      for (const a of articles) {
        const u = await resolveArticleUrl(a.id)
        if (u) urls[a.id] = u
      }
      setRelatedUrls(urls)
    })
  }, [article.id])

  const refreshProgress = async () => {
    const updated = await fetchArticleProgress(childId, article.id)
    onProgressUpdated(updated)
    return updated
  }

  const parentThemesPanel =
    themes.length > 0 ? (
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <h3 className="font-bold text-navy mb-3">For Parents</h3>
        <p className="text-xs font-extrabold text-muted uppercase mb-2">Lesson Themes</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {themes.map((t) => (
            <span
              key={t}
              className="text-xs bg-[#EEF4FF] text-navy px-2 py-1 rounded-full font-bold"
            >
              {t}
            </span>
          ))}
        </div>
        <ParentGateLink to="/parent/dashboard" className="text-teal text-sm font-extrabold">
          View parent dashboard →
        </ParentGateLink>
      </div>
    ) : null

  const sidebar = (
    <LessonSidebar
      lessonTitle={localized.title}
      readAloudContent={readAloudContent}
      language={language}
      articleId={article.id}
      ageGroup={ageGroup}
      scrollPercent={scrollPercent}
      quizUnlocked={quizUnlocked}
      quizPassed={quizPassed}
      hasQuiz={hasQuiz}
      onStartQuiz={startQuiz}
      parentThemes={parentThemesPanel}
    />
  )

  return (
    <div className="min-h-screen bg-[#EEF4FF] page-transition">
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
          childId={childId}
          quizId={quizId}
          ageGroup={ageGroup}
          language={language}
          lessonTitle={localized.title}
          onClose={() => setShowQuizModal(false)}
          onPassed={async (result) => {
            if (result?.starsAwarded) setStarsAwarded(result.starsAwarded)
            await refreshProgress()
            handleQuizPassed()
          }}
        />
      )}

      <QuizCelebrationModal
        open={showCelebration}
        lessonTitle={localized.title}
        starsAwarded={starsAwarded}
        continueUrl={`/adventures/${path.slug}`}
        onClose={() => setShowCelebration(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">
        <nav className="text-sm text-muted mb-4">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/discoverer' },
              { label: 'Explore', to: '/discoverer/explore' },
              { label: lessonPathLabel(path), to: lessonPathUrl(path) },
              { label: localized.title },
            ]}
          />
        </nav>

        <div className={LESSON_MOBILE_SIDEBAR_CLASS}>{sidebar}</div>

        <LessonHeroImage article={article} path={path} />

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-3 break-words">
          {localized.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted mb-4">
          <span className="bg-teal/10 text-teal px-3 py-1 rounded-full font-bold text-xs">
            {lessonMetadataCategory(article, path)}
          </span>
          <span aria-hidden>•</span>
          <span>{article.reading_time_minutes} min read</span>
          <span aria-hidden>•</span>
          <span>{lessonAgeLabel(article)}</span>
        </div>

        <LessonTopicTags tags={topicTags} className="mb-4" />

        {readCompleted && quizPassed && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal/10 text-teal px-4 py-1.5 text-xs font-extrabold">
            ✅ Completed — reviewing this lesson
          </p>
        )}
        {readCompleted && !quizPassed && hasQuiz && (
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/15 text-[#92400E] px-4 py-1.5 text-xs font-extrabold">
            📖 Read — retake the quiz from the sidebar when you&apos;re ready.
          </p>
        )}

        {article.excerpt && (
          <p className="text-navy font-semibold text-lg leading-relaxed mb-6">{article.excerpt}</p>
        )}

        <LessonFunFactsSection facts={funFacts} />

        <div className={LESSON_PAGE_GRID_CLASS}>
          <div className={LESSON_MAIN_COLUMN_CLASS}>
            <LessonMainContentSection content={localized.content} language={language} />

            <LessonVocabularySection vocabulary={vocabulary} />

            <LessonFaithReflectionSection
              article={article}
              islamicTeaching={islamicReflection || localized.islamic_teaching}
              thinkAbout={thinkAbout}
              variant="discoverer"
              usulThemeLabel={usulTheme ? usulThemeLabel(usulTheme) : undefined}
              usulThemeBlurb={themeBlurb}
            />

            {activityCards.length > 0 ? (
              <LessonActivityCardsSection cards={activityCards} />
            ) : (
              <LessonTakeActionSection takeAction={takeAction} activity={localized.activity} />
            )}

            <LessonParentDiscussionSection
              question={familyDiscussion}
              childId={childId}
              articleId={article.id}
            />

            <div ref={endSentinelRef} className="h-1" aria-hidden />

            <div className="mt-6 mb-8">
              <ArticleProgressButton
                childId={childId}
                articleId={article.id}
                initialProgress={progress}
                onUpdated={onProgressUpdated}
                onReadComplete={handleReadComplete}
              />
            </div>

            {relatedArticles.length > 0 && (
              <section className="mb-6" aria-labelledby="lesson-related-heading">
                <h2 id="lesson-related-heading" className="font-display text-xl font-bold text-navy mb-4">
                  More To Explore
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedArticles.map((a) => (
                    <Link
                      key={a.id}
                      to={relatedUrls[a.id] ?? '/discoverer/explore'}
                      className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:border-teal/40 transition-colors"
                    >
                      {a.cover_image_url && (
                        <img
                          src={a.cover_image_url}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                      )}
                      <div>
                        <p className="font-bold text-navy text-sm line-clamp-2">{a.title}</p>
                        <p className="text-xs text-muted mt-1">{a.reading_time_minutes} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className={LESSON_SIDEBAR_COLUMN_CLASS}>{sidebar}</div>
        </div>
      </div>
    </div>
  )
}
