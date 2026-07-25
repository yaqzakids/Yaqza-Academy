import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorMessage from '@/components/ErrorMessage'
import LessonHeroImage from '@/components/adventure/lesson/LessonHeroImage'
import LessonSidebar from '@/components/adventure/lesson/LessonSidebar'
import LessonQuizModal from '@/components/adventure/lesson/LessonQuizModal'
import LessonActivityCardsSection from '@/components/adventure/lesson/LessonActivityCardsSection'
import {
  LESSON_MAIN_COLUMN_CLASS,
  LESSON_MOBILE_SIDEBAR_CLASS,
  LESSON_PAGE_GRID_CLASS,
  LESSON_SIDEBAR_COLUMN_CLASS,
} from '@/components/adventure/lesson/lessonLayout'
import {
  LessonFaithReflectionSection,
  LessonFunFactsSection,
  LessonMainContentSection,
  LessonParentDiscussionSection,
  LessonTakeActionSection,
  LessonTopicTags,
  LessonVocabularySection,
} from '@/components/adventure/lesson/LessonSections'
import { getLocalizedArticleFields } from '@/lib/admin/articleI18n'
import { fetchAdminLessonPreviewContext } from '@/lib/admin/lessonPreview'
import { lessonActivityCards } from '@/lib/adventure/lessonActivityCards'
import {
  lessonAgeLabel,
  lessonFamilyDiscussion,
  lessonFunFacts,
  lessonMetadataCategory,
  lessonPathLabel,
  lessonTopicTags,
  lessonVocabulary,
  usulThemeBlurb,
} from '@/lib/adventure/lessonDisplay'
import { pickLocalizedField, pickLocalizedThinkAbout, usulThemeLabel } from '@/lib/discoverer'
import { buildArticleReadAloudBody } from '@/lib/voice/readAloudText'
import type { AdventureArticle, AdventurePath } from '@/lib/adventure/types'
import type { AgeGroup, Language } from '@/lib/types'

const AGE_TABS: { id: AgeGroup; label: string; emoji: string }[] = [
  { id: 'explorer', label: 'Explorer', emoji: '🌱' },
  { id: 'discoverer', label: 'Discoverer', emoji: '🔍' },
  { id: 'thinker', label: 'Thinker', emoji: '🌍' },
]

function parseAgeGroup(value: string | null): AgeGroup {
  if (value === 'discoverer' || value === 'thinker') return value
  return 'explorer'
}

export default function AdminLessonPreviewPage() {
  const { id = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const ageGroup = parseAgeGroup(searchParams.get('age'))
  const [language] = useState<Language>('en')
  const [article, setArticle] = useState<AdventureArticle | null>(null)
  const [path, setPath] = useState<AdventurePath | null>(null)
  const [quizId, setQuizId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [scrollPercent] = useState(100)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    void (async () => {
      setLoading(true)
      setError(null)
      try {
        const ctx = await fetchAdminLessonPreviewContext(id)
        if (cancelled) return
        if (!ctx) {
          setError('Lesson not found.')
          return
        }
        setArticle(ctx.article)
        setPath(ctx.path)
        setQuizId(ctx.quiz?.id ?? null)
      } catch {
        if (!cancelled) setError('Could not load lesson preview.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [id])

  const localized = useMemo(() => {
    if (!article) return null
    return getLocalizedArticleFields(article, language, ageGroup)
  }, [article, language, ageGroup])

  const setAgeGroup = (next: AgeGroup) => {
    setSearchParams({ age: next }, { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error || !article || !path || !localized) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <ErrorMessage message={error ?? 'Lesson not found'} />
      </div>
    )
  }

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
  const hasQuiz = Boolean(quizId)
  const isDiscoverer = ageGroup === 'discoverer'

  const islamicReflection = pickLocalizedField(
    article.islamic_reflection ?? localized.islamic_teaching,
    article.islamic_reflection_i18n,
    language,
  )
  const thinkAbout = pickLocalizedThinkAbout(
    article.think_about_it ?? localized.think_about_it,
    article.think_about_it_i18n,
    language,
  )
  const takeAction = pickLocalizedField(
    article.take_action ?? localized.activity,
    article.take_action_i18n,
    language,
  )
  const themeBlurb = usulThemeBlurb(article.usul_theme)

  const readAloudContent = buildArticleReadAloudBody({
    content: localized.content,
    islamic_teaching: localized.islamic_teaching,
    think_about_it: localized.think_about_it,
    activity: localized.activity,
  })

  const sidebar = (
    <LessonSidebar
      lessonTitle={localized.title}
      readAloudContent={readAloudContent}
      language={language}
      articleId={article.id}
      ageGroup={ageGroup}
      scrollPercent={scrollPercent}
      quizUnlocked
      quizPassed={false}
      hasQuiz={hasQuiz}
      onStartQuiz={() => setShowQuizModal(true)}
    />
  )

  const pageShellClass = isDiscoverer ? 'min-h-screen bg-[#EEF4FF]' : 'min-h-screen bg-bg'

  return (
    <div className={pageShellClass}>
      <div className="sticky top-0 z-40 bg-[#1B2F5E] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#F5A623] m-0 mb-1">
              Admin lesson preview
            </p>
            <p className="text-sm font-bold m-0 truncate">{article.title}</p>
            {!article.published && (
              <p className="text-xs text-white/70 m-0 mt-1">Draft — not visible to children until published.</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/admin/lessons/${article.id}/edit`}
              className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-extrabold no-underline hover:bg-white/20"
            >
              ← Back to editor
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex flex-wrap gap-2">
          {AGE_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setAgeGroup(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-extrabold transition-colors ${
                ageGroup === tab.id
                  ? 'bg-[#F5A623] text-[#1B2F5E]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {quizId && (
        <LessonQuizModal
          open={showQuizModal}
          quizId={quizId}
          ageGroup={ageGroup}
          language={language}
          lessonTitle={localized.title}
          previewMode
          onClose={() => setShowQuizModal(false)}
        />
      )}

      {isDiscoverer ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 md:py-8">
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
                usulThemeLabel={article.usul_theme ? usulThemeLabel(article.usul_theme) : undefined}
                usulThemeBlurb={themeBlurb}
              />
              {activityCards.length > 0 ? (
                <LessonActivityCardsSection cards={activityCards} />
              ) : (
                <LessonTakeActionSection takeAction={takeAction} activity={localized.activity} />
              )}
              <LessonParentDiscussionSection question={familyDiscussion} />
            </div>
            <div className={LESSON_SIDEBAR_COLUMN_CLASS}>{sidebar}</div>
          </div>
        </div>
      ) : (
        <>
          <LessonHeroImage article={article} path={path} className="mb-0 [&_img]:rounded-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
            <p className="text-sm text-muted mb-4">
              Previewing as <span className="font-bold text-navy">{lessonPathLabel(path)}</span>
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy mb-3 break-words">
              {localized.title}
            </h1>
            <LessonTopicTags tags={topicTags} className="mb-3" />
            <p className="text-muted text-sm mb-6">
              ⏱ {article.reading_time_minutes} min read · {lessonAgeLabel(article)}
            </p>
            <div className={LESSON_MOBILE_SIDEBAR_CLASS}>{sidebar}</div>
            <LessonFunFactsSection facts={funFacts} />
            <div className={LESSON_PAGE_GRID_CLASS}>
              <div className={LESSON_MAIN_COLUMN_CLASS}>
                <LessonMainContentSection
                  content={localized.content}
                  excerpt={article.excerpt}
                  language={language}
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
              </div>
              <div className={LESSON_SIDEBAR_COLUMN_CLASS}>{sidebar}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
