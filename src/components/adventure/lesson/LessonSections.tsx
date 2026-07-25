import { useState } from 'react'
import RichTextContent from '@/components/article/RichTextContent'
import { saveReflectionResponse } from '@/lib/discoverer'
import { splitQuranConnection } from '@/lib/adventure/lessonDisplay'
import type { AdventureArticle } from '@/lib/adventure/types'
import type { ArticleFunFact, ArticleVocabEntry, Language } from '@/lib/types'

export function LessonFunFactsSection({ facts }: { facts: ArticleFunFact[] }) {
  if (facts.length === 0) return null

  const fitsInGrid = facts.length <= 3

  const isTriple = facts.length === 3

  return (
    <section className="mb-6 md:mb-8 w-full max-w-full" aria-labelledby="lesson-fun-facts-heading">
      <h2 id="lesson-fun-facts-heading" className="font-bold text-navy text-lg mb-4">
        Did You Know? 🤔
      </h2>
      <div
        className={
          isTriple
            ? 'grid w-full max-w-full grid-cols-1 md:grid-cols-3 gap-3 md:gap-3'
            : fitsInGrid
              ? 'grid w-full max-w-full grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'
              : 'flex gap-3 md:gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory'
        }
      >
        {facts.map((f, i) => (
          <div
            key={i}
            className={
              fitsInGrid
                ? 'min-w-0 w-full bg-teal text-white rounded-xl p-4'
                : 'shrink-0 w-[min(16rem,80vw)] md:w-64 snap-start bg-teal text-white rounded-xl p-4'
            }
          >
            <p className="text-2xl mb-2">{f.emoji || '✨'}</p>
            <p className="text-sm leading-relaxed">{f.fact}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function LessonVocabularySection({ vocabulary }: { vocabulary: ArticleVocabEntry[] }) {
  if (vocabulary.length === 0) return null

  return (
    <section className="mb-6 md:mb-8" aria-labelledby="lesson-vocabulary-heading">
      <h2 id="lesson-vocabulary-heading" className="font-bold text-navy text-lg mb-4">
        Word Explorer 📚
      </h2>
      <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
        {vocabulary.map((v) => (
          <div key={v.word} className="bg-[#EEF4FF] rounded-xl p-4">
            <p className="font-extrabold text-navy">{v.word}</p>
            <p className="text-sm text-muted mt-1">{v.definition}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export interface LessonMainContentSectionProps {
  content: string
  excerpt?: string | null
  language: Language
  className?: string
}

export function LessonMainContentSection({
  content,
  excerpt,
  language,
  className = '',
}: LessonMainContentSectionProps) {
  if (!content?.trim() && !excerpt?.trim()) return null

  const arabicStyle =
    language === 'ar'
      ? { fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", lineHeight: 1.9 as const }
      : undefined

  return (
    <section className={`mb-6 md:mb-8 ${className}`} aria-labelledby="lesson-main-heading">
      <h2 id="lesson-main-heading" className="sr-only">
        Lesson story
      </h2>
      <div
        className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm"
        dir={language === 'ar' ? 'rtl' : 'ltr'}
      >
        {excerpt?.trim() && (
          <p className="text-navy font-semibold text-lg leading-relaxed border-b border-gray-100 pb-4 mb-4">
            {excerpt}
          </p>
        )}
        <RichTextContent
          html={content}
          className="text-navy leading-relaxed text-base md:leading-[1.8]"
          style={arabicStyle}
        />
      </div>
    </section>
  )
}

export interface LessonFaithReflectionSectionProps {
  article: AdventureArticle
  islamicTeaching: string | null
  thinkAbout: string[] | null
  /** Discoverer shows a richer faith layout with Usul theme card. */
  variant?: 'explorer' | 'discoverer'
  usulThemeLabel?: string
  usulThemeBlurb?: string | null
}

export function LessonFaithReflectionSection({
  article,
  islamicTeaching,
  thinkAbout,
  variant = 'explorer',
  usulThemeLabel,
  usulThemeBlurb,
}: LessonFaithReflectionSectionProps) {
  const quranRaw = article.quran_connection?.trim()
  const { arabic: quranArabic, translation: quranTranslation } = splitQuranConnection(quranRaw)
  const quranRef = article.quran_reference?.trim()
  const hadithText = article.hadith_connection?.trim()
  const hadithRef = article.hadith_reference?.trim()
  const hasThinkAbout = Boolean(thinkAbout?.length)
  const hasFaithBlock = Boolean(quranRaw || hadithText || islamicTeaching || hasThinkAbout)

  if (!hasFaithBlock && variant !== 'discoverer') return null
  if (
    variant === 'discoverer' &&
    !hasFaithBlock &&
    !usulThemeLabel
  ) {
    return null
  }

  return (
    <section className="mb-6 md:mb-8" aria-labelledby="lesson-faith-heading">
      <h2 id="lesson-faith-heading" className="font-bold text-navy text-lg mb-4">
        Faith &amp; Reflection
      </h2>

      {variant === 'discoverer' ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#F5A623]">
              <p className="font-bold text-navy mb-3">🕌 Quran Connection</p>
              {quranArabic || quranTranslation ? (
                <>
                  {quranArabic && (
                    <p
                      dir="rtl"
                      className="text-xl leading-loose mb-3 pr-3 border-r-4 border-[#F5A623]"
                      style={{
                        fontFamily: "'Amiri', 'Traditional Arabic', serif",
                        color: '#1B2F5E',
                      }}
                    >
                      {quranArabic}
                    </p>
                  )}
                  {quranTranslation && (
                    <p className="text-sm text-navy/80 leading-relaxed italic">{quranTranslation}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted italic">No Qur&apos;an connection for this lesson yet.</p>
              )}
              {quranRef && <p className="text-xs font-bold text-teal mt-3">{quranRef}</p>}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-navy mb-3">🌙 Islamic Teaching</p>
              <RichTextContent
                html={islamicTeaching || 'Islamic reflection for this lesson is coming soon.'}
                className="text-sm text-navy leading-relaxed"
              />
            </div>

            {usulThemeLabel && (
              <div className="bg-[#1B2F5E] rounded-2xl p-5 text-white">
                <p className="text-xs font-extrabold uppercase text-white/60 mb-1">Usul Theme</p>
                <p className="font-display text-2xl font-bold text-[#F5A623] mb-2">{usulThemeLabel}</p>
                {usulThemeBlurb && <p className="text-sm text-white/80">{usulThemeBlurb}</p>}
              </div>
            )}
          </div>

          {hadithText && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#F5A623]">
              <p className="font-bold text-navy mb-2">🌙 Sunnah Connection</p>
              <p className="text-sm text-navy leading-relaxed">{hadithText}</p>
              {hadithRef && <p className="text-xs font-bold text-teal mt-2">{hadithRef}</p>}
            </div>
          )}

          {hasThinkAbout && thinkAbout && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="font-bold text-navy mb-3">💭 Think About It</p>
              <ul className="space-y-2 m-0 pl-0 list-none">
                {thinkAbout.map((q, i) => (
                  <li key={i} className="text-sm text-navy flex gap-2">
                    <span className="text-gold font-extrabold shrink-0">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {quranRaw && (
            <div className="bg-[#EEF4FF] rounded-xl p-4 border-l-4 border-[#1B2F5E]">
              <p className="text-xs font-extrabold text-[#1B2F5E] uppercase mb-2">📖 Qur&apos;an Connection</p>
              {quranArabic && (
                <p
                  className="text-base text-[#1B2F5E] leading-relaxed mb-2"
                  dir="rtl"
                  style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }}
                >
                  {quranArabic}
                </p>
              )}
              {quranTranslation && (
                <p className="text-sm text-[#1B2F5E] leading-relaxed italic m-0">{quranTranslation}</p>
              )}
              {quranRef && <p className="text-xs font-semibold text-[#6B7280] mt-2 mb-0">— {quranRef}</p>}
            </div>
          )}

          {hadithText && (
            <div className="bg-[#FFF8ED] rounded-xl p-4 border-l-4 border-[#F5A623]">
              <p className="text-xs font-extrabold text-[#D4820A] uppercase mb-2">🌙 Sunnah Connection</p>
              <p className="text-sm text-[#1B2F5E] leading-relaxed m-0">{hadithText}</p>
              {hadithRef && <p className="text-xs font-semibold text-[#6B7280] mt-2 mb-0">— {hadithRef}</p>}
            </div>
          )}

          {islamicTeaching && (
            <div className="bg-[#F0FBF5] rounded-xl p-4 border-l-4 border-teal">
              <p className="text-xs font-extrabold text-teal uppercase mb-2">☪️ Islamic Teaching</p>
              <RichTextContent html={islamicTeaching} className="text-sm text-navy leading-relaxed" />
            </div>
          )}

          {hasThinkAbout && thinkAbout && (
            <div className="bg-[#FFFBF0] rounded-xl p-4 border-l-4 border-gold">
              <p className="text-xs font-extrabold text-gold uppercase mb-2">💡 Think About It</p>
              <ul className="space-y-2 m-0 pl-0 list-none">
                {thinkAbout.map((q, i) => (
                  <li key={i} className="text-sm text-navy flex gap-2">
                    <span className="text-gold font-extrabold shrink-0">{i + 1}.</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export interface LessonTakeActionSectionProps {
  takeAction: string | null
  activity: string | null
}

export function LessonTakeActionSection({ takeAction, activity }: LessonTakeActionSectionProps) {
  const activityText = takeAction?.trim() || activity?.trim()
  if (!activityText) return null

  return (
    <section className="mb-6 md:mb-8" aria-labelledby="lesson-action-heading">
      <h2 id="lesson-action-heading" className="font-bold text-navy text-lg mb-4">
        Take Action
      </h2>
      <div className="bg-[#F5F3FF] rounded-2xl p-5 md:p-6 border-l-4 border-purple shadow-sm">
        <p className="text-xs font-extrabold text-purple uppercase mb-2">🎯 Your Activity</p>
        <RichTextContent html={activityText} className="text-sm md:text-base text-navy leading-relaxed" />
      </div>
    </section>
  )
}

export interface LessonParentDiscussionSectionProps {
  question: string | null
  childId?: string
  articleId?: string
  onReflectionSaved?: () => void
}

export function LessonParentDiscussionSection({
  question,
  childId,
  articleId,
  onReflectionSaved,
}: LessonParentDiscussionSectionProps) {
  const [reflectionText, setReflectionText] = useState('')
  const [reflectionSaved, setReflectionSaved] = useState(false)

  if (!question?.trim()) return null

  const handleSave = async () => {
    if (!reflectionText.trim() || !childId || !articleId) return
    await saveReflectionResponse(childId, articleId, reflectionText)
    setReflectionSaved(true)
    onReflectionSaved?.()
  }

  return (
    <section className="mb-6 md:mb-8" aria-labelledby="lesson-parent-heading">
      <h2 id="lesson-parent-heading" className="font-bold text-navy text-lg mb-4">
        Parent Discussion
      </h2>
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-[#E2EBF8]">
        <p className="text-xs font-extrabold text-[#2AAFA0] uppercase mb-2">👨‍👩‍👧 Talk With Your Family</p>
        <p className="text-sm md:text-base text-navy leading-relaxed mb-4">{question}</p>
        {childId && articleId && (
          <>
            <p className="text-xs font-extrabold text-muted uppercase mb-2">Your Reflection</p>
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm mb-3 focus:border-teal focus:outline-none"
              placeholder="Write your reflection…"
            />
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={!reflectionText.trim() || reflectionSaved}
              className="px-5 py-2 bg-teal text-white rounded-full text-sm font-extrabold disabled:opacity-50"
            >
              {reflectionSaved ? 'Saved ✓' : 'Save My Reflection'}
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export function LessonTopicTags({
  tags,
  className = '',
}: {
  tags: string[]
  className?: string
}) {
  if (tags.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-white rounded-full text-xs font-bold text-navy border border-gray-200 shadow-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
