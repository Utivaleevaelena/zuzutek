import { useEffect, useState, type RefObject } from 'react'

const ENTER_RATIO = 0.35
const LEAVE_RATIO = 0.15

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')

/**
 * True while ~35% of the element is in the viewport and the document is visible.
 * Hysteresis (leave below 15%) avoids flapping at the threshold.
 */
export function useSceneActive(ref: RefObject<Element | null>) {
  const [inView, setInView] = useState(false)
  const [docVisible, setDocVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio
        setInView((prev) => (r >= ENTER_RATIO ? true : r < LEAVE_RATIO ? false : prev))
      },
      { threshold: [0, LEAVE_RATIO, ENTER_RATIO, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  useEffect(() => {
    const onVisibility = () => setDocVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return inView && docVisible
}
