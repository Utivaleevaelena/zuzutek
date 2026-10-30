import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { isVisibleEnough } from '../guided/hooks.ts'

interface MarkerProgress {
  seen: number
  /** Markers that complete immediately: jumped to, or skipped over, instead of entered in order. */
  instant: boolean[]
}

/**
 * C02: markers register in order while the list is read. A marker reached by a jump (earlier ones never seen)
 * or already scrolled past is `instant`, and every marker skipped on the way is `instant` too. A marker reached
 * while scrolling fast is instant as well, and a direct jump to the form completes every marker already above the
 * viewport, so a fast scroll or a jump leaves no stagger and no catch-up queue. Never rolls back.
 */
export function useMarkerProgress(count: number, formRef: RefObject<Element | null>) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [state, setState] = useState<MarkerProgress>(() =>
    typeof IntersectionObserver === 'undefined'
      ? { seen: count - 1, instant: Array<boolean>(count).fill(true) }
      : { seen: -1, instant: Array<boolean>(count).fill(false) },
  )

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // Scroll speed in px/ms, only trusted while the scroll is recent.
    let lastY = window.scrollY
    let lastT = performance.now()
    let speed = 0
    const onScroll = () => {
      const t = performance.now()
      if (t > lastT) speed = Math.abs(window.scrollY - lastY) / (t - lastT)
      lastY = window.scrollY
      lastT = t
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = refs.current.indexOf(e.target as HTMLElement)
          if (i < 0) continue
          const passed = !e.isIntersecting && e.boundingClientRect.bottom <= 0
          if (!passed && !(e.isIntersecting && isVisibleEnough(e, 0.6))) continue
          const fast = speed > 1.5 && performance.now() - lastT < 150
          setState((prev) => {
            if (i <= prev.seen) return prev
            const instant = prev.instant.slice()
            for (let k = prev.seen + 1; k < i; k++) instant[k] = true
            if (passed || fast || i - prev.seen > 1) instant[i] = true
            return { seen: i, instant }
          })
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 1] },
    )
    refs.current.forEach((el) => el && io.observe(el))

    // A jump straight to the form leaves C02 above the viewport without any marker crossing it: every marker
    // that is already scrolled past completes at once.
    const form = formRef.current
    const formIo = form
      ? new IntersectionObserver((entries) => {
          if (!entries.some((e) => e.isIntersecting)) return
          let last = -1
          refs.current.forEach((el, k) => {
            if (el && el.getBoundingClientRect().bottom <= 0) last = k
          })
          if (last < 0) return
          setState((prev) => {
            if (last <= prev.seen) return prev
            const instant = prev.instant.slice()
            for (let k = prev.seen + 1; k <= last; k++) instant[k] = true
            return { seen: last, instant }
          })
        })
      : null
    if (form) formIo?.observe(form)

    return () => {
      io.disconnect()
      formIo?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [count, formRef])

  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      refs.current[i] = el
    },
    [],
  )
  return { seen: state.seen, instant: state.instant, setRef }
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/**
 * Bounded scroll motion for the rocket scene, written straight to a CSS variable (no React state per frame):
 * `--warm` (0..1) builds up the smoke as the page is scrolled. Nothing is pinned or scrubbed per pixel.
 */
export function useSceneMotion(ref: RefObject<HTMLElement | null>, disabled: boolean) {
  useEffect(() => {
    const el = ref.current
    if (!el || disabled) return
    let frame = 0
    const update = () => {
      frame = 0
      const p = clamp01(window.scrollY / (window.innerHeight * 0.9))
      el.style.setProperty('--warm', p.toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref, disabled])
}
