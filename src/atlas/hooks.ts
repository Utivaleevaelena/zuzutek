import { useEffect, useRef, useState } from 'react'

export type SpyState = 'current' | 'completed' | 'upcoming'

const idFromHash = () => {
  try {
    return decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return ''
  }
}

/**
 * Scrollspy for the service atlas. The current category is the one crossing a band near the upper third of
 * the viewport; every category up to the furthest one reached is completed and never rolls back. A direct
 * hash marks its target current on the first render, and skipped categories are completed at once (no queue).
 */
export function useCategorySpy(ids: readonly string[], reduced: boolean) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const initial = ids.findIndex((id) => id === idFromHash())
  const [current, setCurrent] = useState(initial)
  const [reached, setReached] = useState(initial)

  useEffect(() => {
    const onHash = () => {
      const i = ids.findIndex((id) => id === idFromHash())
      if (i < 0) return
      setCurrent(i)
      setReached((prev) => Math.max(prev, i))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [ids])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const i = refs.current.indexOf(e.target as HTMLElement)
          if (i < 0) continue
          setCurrent(i)
          setReached((prev) => Math.max(prev, i))
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [ids])

  const stateOf = (i: number): SpyState => {
    if (reduced) return 'completed'
    if (i === current) return 'current'
    if (i <= reached) return 'completed'
    return 'upcoming'
  }
  return { refs, current, stateOf }
}

/** After render, jump to the #hash target (the app renders after load, so the browser cannot do it). */
export function useScrollToHash() {
  useEffect(() => {
    const id = idFromHash()
    if (!id) return
    const t = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => window.cancelAnimationFrame(t)
  }, [])
}
