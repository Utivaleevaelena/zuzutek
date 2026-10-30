import { useEffect, useState, type RefObject } from 'react'

/** Visible enough: share of the element, or (for tall elements) share of the viewport height. */
export function isVisibleEnough(entry: IntersectionObserverEntry, ratio: number) {
  return entry.intersectionRatio >= ratio || entry.intersectionRect.height >= window.innerHeight * 0.45
}

/** Flips to true once, the first time the element is visible enough. Never resets. */
export function useRevealOnce(ref: RefObject<Element | null>, ratio = 0.35) {
  const [revealed, setRevealed] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || revealed) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && isVisibleEnough(e, ratio))) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: [0, 0.1, 0.2, ratio, 0.5] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, ratio, revealed])
  return revealed
}
