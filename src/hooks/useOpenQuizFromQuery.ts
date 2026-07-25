import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

/** Opens the lesson quiz once when ?quiz=1 is present (e.g. from path "Retry quiz" links). */
export function useOpenQuizFromQuery({
  enabled,
  onOpenQuiz,
}: {
  enabled: boolean
  onOpenQuiz: () => void
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const openedRef = useRef(false)

  useEffect(() => {
    if (!enabled || openedRef.current) return
    if (searchParams.get('quiz') !== '1') return

    openedRef.current = true
    onOpenQuiz()

    const next = new URLSearchParams(searchParams)
    next.delete('quiz')
    setSearchParams(next, { replace: true })
  }, [enabled, onOpenQuiz, searchParams, setSearchParams])
}
