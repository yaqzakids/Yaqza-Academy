import { supabase } from '@/lib/supabase'
import { fetchAdminArticle } from '@/lib/admin/articles'
import type { AdventureArticle, AdventurePath, AdventureQuiz } from '@/lib/adventure/types'

const PREVIEW_PATH: AdventurePath = {
  id: 'admin-preview',
  pillar_id: '',
  title: 'Lesson Preview',
  slug: 'preview',
  description: null,
  difficulty_level: 'medium',
  is_free: true,
  badge_reward_id: null,
  cover_image_url: null,
  sort_order: 0,
}

export interface AdminLessonPreviewContext {
  article: AdventureArticle
  quiz: AdventureQuiz | null
  path: AdventurePath
}

export async function fetchAdminLessonPreviewContext(
  articleId: string,
): Promise<AdminLessonPreviewContext | null> {
  const article = await fetchAdminArticle(articleId)

  const [{ data: quiz }, { data: pathRow }] = await Promise.all([
    supabase.from('quizzes').select('*').eq('article_id', articleId).maybeSingle(),
    supabase
      .from('path_articles')
      .select('adventure_path:adventure_paths(*)')
      .eq('article_id', articleId)
      .order('sort_order')
      .limit(1)
      .maybeSingle(),
  ])

  const pathRaw = pathRow?.adventure_path
  const path = (Array.isArray(pathRaw) ? pathRaw[0] : pathRaw) as AdventurePath | null

  return {
    article,
    quiz: (quiz as AdventureQuiz | null) ?? null,
    path: path ?? PREVIEW_PATH,
  }
}

export function adminLessonPreviewUrl(articleId: string, ageGroup?: string): string {
  const base = `/admin/lessons/${articleId}/preview`
  if (!ageGroup) return base
  return `${base}?age=${ageGroup}`
}
