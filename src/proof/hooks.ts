import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { clamp01 } from '../motion.ts'

export interface ProofState {
  index: number
  /** The state was reached by a jump (selector, hash, fast scroll over several bands): no transition is played. */
  instant: boolean
}

const headerHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--h01-header-height')) || 72

/** True once the element is within `margin` of the viewport. Never resets. */
export function useNear(ref: RefObject<Element | null>, margin = '900px 0px') {
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || near) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin, near])
  return near
}

/**
 * Bounded scroll progress of a tall track mapped onto `count` stable bands. The active index is React state, but it
 * only changes when a band boundary is crossed (never per scroll pixel). A scroll that skips bands lands on the
 * current band at once; there is no catch-up queue. Scroll work only runs while the track is near the viewport.
 * `select` jumps to an exact band and aligns the page scroll to the middle of that band.
 */
export function useProofScroll(trackRef: RefObject<HTMLElement | null>, count: number, scrollDriven: boolean) {
  const [state, setState] = useState<ProofState>({ index: 0, instant: true })

  const geometry = useCallback(() => {
    const track = trackRef.current
    const stage = track?.firstElementChild as HTMLElement | null
    if (!track || !stage) return null
    const header = headerHeight()
    const rect = track.getBoundingClientRect()
    const scrollable = rect.height - stage.offsetHeight
    return { header, rect, scrollable }
  }, [trackRef])

  useEffect(() => {
    const track = trackRef.current
    if (!track || !scrollDriven) return
    let frame = 0
    const update = () => {
      frame = 0
      const g = geometry()
      if (!g || g.scrollable <= 0) return
      const progress = clamp01((g.header - g.rect.top) / g.scrollable)
      const next = Math.min(count - 1, Math.floor(progress * count))
      setState((prev) => (prev.index === next ? prev : { index: next, instant: Math.abs(next - prev.index) > 1 }))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    let listening = false
    const listen = (on: boolean) => {
      if (on === listening) return
      listening = on
      const op = on ? 'addEventListener' : 'removeEventListener'
      window[op]('scroll', onScroll)
      window[op]('resize', onScroll)
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Pause scroll work outside the section; one last update lands the state when the track has been left.
        listen(entries.some((e) => e.isIntersecting))
        onScroll()
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(track)
    onScroll()
    return () => {
      io.disconnect()
      listen(false)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [trackRef, count, scrollDriven, geometry])

  const select = useCallback(
    (index: number) => {
      const i = Math.min(count - 1, Math.max(0, index))
      setState({ index: i, instant: true })
      if (!scrollDriven) return
      const g = geometry()
      if (!g || g.scrollable <= 0) return
      // Middle of the band, so the scroll handler derives the same index.
      const top = window.scrollY + g.rect.top - g.header + ((i + 0.5) / count) * g.scrollable
      window.scrollTo({ top, behavior: 'auto' })
    },
    [count, scrollDriven, geometry],
  )

  return { index: state.index, instant: state.instant, select }
}

/** Preloads the active image and the next two once the section is near; at most three, never all seven at once. */
export function useProofPrefetch(srcs: readonly string[], index: number, enabled: boolean) {
  const cache = useRef(new Map<string, HTMLImageElement>())
  useEffect(() => {
    if (!enabled) return
    for (const src of srcs.slice(index, index + 3)) {
      if (cache.current.has(src)) continue
      const img = new Image()
      img.src = src
      cache.current.set(src, img)
    }
  }, [srcs, index, enabled])
}

/**
 * Compact list: each case is revealed once, when it approaches the lower-middle of the viewport. A case that is
 * already above the viewport (hash, jump, fast scroll) completes at once. Never resets. Without IntersectionObserver
 * or with `skip` (reduced motion) everything is shown completed.
 */
export function useListReveal(listRef: RefObject<HTMLElement | null>, count: number, skip: boolean) {
  const unsupported = typeof IntersectionObserver === 'undefined'
  const [seen, setSeen] = useState<(false | 'in' | 'instant')[]>(() => Array<false | 'in' | 'instant'>(count).fill(false))

  useEffect(() => {
    const list = listRef.current
    if (!list || skip || unsupported) return
    const items = Array.from(list.children) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const passed = !e.isIntersecting && e.boundingClientRect.top < 0
          if (!e.isIntersecting && !passed) continue
          const i = items.indexOf(e.target as HTMLElement)
          if (i < 0) continue
          io.unobserve(e.target)
          setSeen((prev) => {
            if (prev[i]) return prev
            const next = prev.slice()
            next[i] = passed ? 'instant' : 'in'
            return next
          })
        }
      },
      { rootMargin: '0px 0px -22% 0px', threshold: 0 },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [listRef, skip, unsupported])

  return { armed: !skip && !unsupported, seen }
}
