import { useCallback, useEffect, useRef, useState } from 'react'
import { isVisibleEnough } from '../guided/hooks.ts'

interface PlateProgress {
  reached: number
  /** Plates that completed immediately: jumped to, or skipped over, instead of entered in order. */
  instant: boolean[]
}

/**
 * Furthest plate that has been reached (visible enough, or already scrolled past). A plate entered right
 * after the previous one plays its sequence; a plate reached by a jump (earlier plates never reached) or
 * already passed is `instant`, and every plate skipped on the way is `instant` too, so a fast scroll leaves
 * no stagger and no catch-up queue. Never rolls back.
 */
export function usePlateProgress(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [state, setState] = useState<PlateProgress>(() =>
    typeof IntersectionObserver === 'undefined'
      ? { reached: count, instant: Array<boolean>(count).fill(true) }
      : { reached: -1, instant: Array<boolean>(count).fill(false) },
  )

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const firstSeen = new Set<number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = refs.current.indexOf(e.target as HTMLElement)
          if (i < 0) continue
          // Normal entry: the plate's first report is a sliver coming into view. Landing on it already mostly
          // visible after the page was scrolled (hash, jump, fast flick) is a jump.
          let landed = false
          if (e.isIntersecting && !firstSeen.has(i)) {
            firstSeen.add(i)
            landed =
              i > 0 &&
              window.scrollY > 100 &&
              (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.6)
          }
          const passed = !e.isIntersecting && e.boundingClientRect.bottom <= 0
          if (!passed && !(e.isIntersecting && isVisibleEnough(e, 0.35))) continue
          setState((prev) => {
            if (i <= prev.reached) return prev
            const instant = prev.instant.slice()
            for (let k = prev.reached + 1; k < i; k++) instant[k] = true
            if (passed || landed || i - prev.reached > 1 || (i > 0 && instant[i - 1])) instant[i] = true
            return { reached: i, instant }
          })
        }
      },
      { threshold: [0, 0.1, 0.2, 0.35, 0.5] },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [count])

  return { refs, reached: state.reached, instant: state.instant }
}

/** Per-item progress for the vertical layout: items up to the furthest one seen are complete. */
export function useItemProgress(count: number) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [seen, setSeen] = useState(-1)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = refs.current.indexOf(e.target as HTMLElement)
          if (i < 0) continue
          const passed = !e.isIntersecting && e.boundingClientRect.bottom <= 0
          if (passed || (e.isIntersecting && isVisibleEnough(e, 0.6))) setSeen((prev) => Math.max(prev, i))
        }
      },
      { threshold: [0, 0.3, 0.6, 1] },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [count])

  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      refs.current[i] = el
    },
    [],
  )
  return { seen, setRef }
}
