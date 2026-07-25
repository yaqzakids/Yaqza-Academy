import { useEffect, useState, type RefObject } from 'react'

/** Tracks how far the child has scrolled through the lesson page (0–100). */
export function useLessonReadingProgress(endSentinelRef: RefObject<HTMLElement | null>) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [reachedEnd, setReachedEnd] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      if (max <= 0) {
        setScrollPercent(100)
        return
      }
      setScrollPercent(Math.min(100, Math.round((window.scrollY / max) * 100)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = endSentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setReachedEnd(true)
      },
      { threshold: 0.4, rootMargin: '0px 0px -80px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [endSentinelRef])

  return { scrollPercent, reachedEnd }
}
