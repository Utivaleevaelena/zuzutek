import { useEffect, useState, type RefObject } from 'react'
import { isVisibleEnough } from '../guided/hooks.ts'
import { useReducedMotion } from '../workflow/hooks.ts'

interface Reveal {
  revealed: boolean
  /** Completed at once, with no stagger: the block was jumped to, scrolled past, or motion is reduced. */
  instant: boolean
}

/**
 * One-shot reveal for a whole block. Plays once when the block is visible enough; a block that is already above
 * the viewport, or that is landed on by a jump (hash, fast scroll), completes immediately with no catch-up queue.
 * Reduced motion and missing IntersectionObserver render the completed state from the first paint. Never resets.
 */
export function useOneShotReveal(ref: RefObject<Element | null>, ratio = 0.35) {
  const reduced = useReducedMotion()
  const [state, setState] = useState<Reveal>(() =>
    typeof IntersectionObserver === 'undefined' ? { revealed: true, instant: true } : { revealed: false, instant: false },
  )

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || state.revealed) return
    let prevY = window.scrollY
    let jumpedAt = -Infinity
    const done = (instant: boolean) => {
      setState({ revealed: true, instant })
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const passed = !e.isIntersecting && e.boundingClientRect.bottom <= 0
          // A single scroll step of more than half a screen just happened (hash, jump) and the block is now in view.
          const landed = e.isIntersecting && performance.now() - jumpedAt < 400
          if (passed || (e.isIntersecting && isVisibleEnough(e, ratio))) return done(passed || landed)
        }
      },
      { threshold: [0, 0.1, 0.2, ratio, 0.5, 0.6] },
    )
    // A jump past the block gives the observer no crossing to report, so also check on scroll.
    const onScroll = () => {
      if (Math.abs(window.scrollY - prevY) > window.innerHeight * 0.5) jumpedAt = performance.now()
      prevY = window.scrollY
      if (el.getBoundingClientRect().bottom <= 0) done(true)
    }
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ref, ratio, reduced, state.revealed])

  return reduced ? { revealed: true, instant: true } : state
}
