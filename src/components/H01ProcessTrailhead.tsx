import { useEffect, useLayoutEffect, useRef } from 'react'
import { content } from '../content.ts'
import { track } from '../analytics.ts'
import { clamp01, computeState, type H01State } from '../motion.ts'
import { NODES, RouteOverlay } from './RouteOverlay.tsx'

const SCENE_W = 1586
const SCENE_H = 992
/** Figures drift slightly toward the frame edges (% of scene width) while the valley opens. */
const PEOPLE_SHIFT = { guide: 6, client: 8 }
/** Mountains are enlarged from their outer edges so at START they close the whole valley view. */
const MOUNTAIN_SCALE = 1.75
const END_HOLD_VH = 1.3 // scroll distance the finished REVEAL (with logo) stays pinned
const STACKED_DISTANCE_VH = 1.1 // keep in sync with .h01__main::after height in index.css
const PIN_QUERY = '(min-width: 1200px)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/** Label i is attached to NODES[i + 1] (node 0 is the origin on the map). */
const LABELS = content.route.labels.map((text, i) => ({
  text,
  left: (NODES[i + 1].x / SCENE_W) * 100,
  top: (NODES[i + 1].y / SCENE_H) * 100,
}))

function applyState(root: HTMLElement, s: H01State) {
  const q = <T extends HTMLElement | SVGElement>(sel: string) => root.querySelectorAll<T>(sel)
  q<HTMLElement>('[data-mountain="left"]').forEach((el) => {
    el.style.transform = `translate3d(${-s.mountain * 90}%,0,0) scale(${MOUNTAIN_SCALE})`
  })
  q<HTMLElement>('[data-mountain="right"]').forEach((el) => {
    el.style.transform = `translate3d(${s.mountain * 68}%,0,0) scale(${MOUNTAIN_SCALE})`
  })
  q<HTMLElement>('[data-person="guide"]').forEach((el) => {
    el.style.transform = `translate3d(${-s.mountain * PEOPLE_SHIFT.guide}%,0,0)`
  })
  q<HTMLElement>('[data-person="client"]').forEach((el) => {
    el.style.transform = `translate3d(${s.mountain * PEOPLE_SHIFT.client}%,0,0)`
  })
  q<HTMLElement>('[data-logo]').forEach((el) => {
    el.style.opacity = String(s.logo)
    el.style.setProperty('--dy', `${(1 - s.logo) * 6}px`)
  })
  q<SVGPathElement>('.h01__segment').forEach((el, i) => {
    el.style.strokeDashoffset = String(1 - s.segments[i])
  })
  q<SVGCircleElement>('.h01__node').forEach((el) => {
    const i = Number(el.dataset.node)
    const v = i === 0 ? s.origin : s.checkpoints[i - 1]
    el.style.opacity = String(v)
    el.style.transform = `scale(${0.7 + 0.3 * v})`
  })
  q<HTMLElement>('[data-cp]').forEach((el) => {
    const v = s.checkpoints[Number(el.dataset.cp)]
    el.style.opacity = String(v)
    el.style.setProperty('--dy', `${(1 - v) * 4}px`)
  })
}

export function H01ProcessTrailhead() {
  const rootRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  // Scroll-driven, reversible progress. Everything derives from the current scroll position:
  // no timers, no queues, so fast scrolling lands on the right state immediately.
  useLayoutEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    const main = mainRef.current
    const copy = copyRef.current
    if (!root || !scene || !main || !copy) return
    const reduced = window.matchMedia(REDUCED_QUERY)
    const pinned = window.matchMedia(PIN_QUERY)

    let frame = 0
    const progress = () => {
      const vh = window.innerHeight
      if (pinned.matches) {
        // animation completes 130vh before the pin releases: the page only starts to leave once REVEAL is done
        const r = root.getBoundingClientRect()
        return clamp01(-r.top / Math.max(1, r.height - vh - vh * END_HOLD_VH))
      }
      if (vh < 500) return 1 // short landscape phone: static REVEAL
      // stacked layout: the scene sticks under the header while the animation runs
      const header = parseFloat(getComputedStyle(root).getPropertyValue('--h01-header-height')) || 64
      const mainTop = main.getBoundingClientRect().top
      const sceneNaturalTop = mainTop + copy.offsetHeight
      return clamp01((header + 8 - sceneNaturalTop) / (vh * STACKED_DISTANCE_VH))
    }
    const update = () => {
      frame = 0
      applyState(root, computeState(progress()))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const enable = () => {
      root.classList.toggle('is-enhanced', !reduced.matches)
      root.classList.toggle('is-pinned', !reduced.matches && pinned.matches)
      if (reduced.matches) {
        applyState(root, computeState(1)) // static REVEAL
        return
      }
      update()
    }
    enable()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    reduced.addEventListener('change', enable)
    pinned.addEventListener('change', enable)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      reduced.removeEventListener('change', enable)
      pinned.removeEventListener('change', enable)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track('home_hero_view')
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const { hero, route, proofStrip } = content

  return (
    <section
      id="h01-process-trailhead"
      className="h01"
      ref={rootRef}
      aria-labelledby="h01-title"
    >
      <div className="h01__pin">
        <div className="h01__stage" ref={heroRef}>
          <div className="h01__main" ref={mainRef}>
            <div className="h01__copy" ref={copyRef}>
              <p className="h01__eyebrow">{hero.eyebrow}</p>
              <h1 id="h01-title" className="h01__title">
                {hero.title}
              </h1>
              <p className="h01__body">{hero.body}</p>
              <div className="h01__actions">
                <a
                  className="btn btn--primary"
                  href={hero.primaryCta.href}
                  data-analytics-event={hero.primaryCta.analyticsEvent}
                  onClick={() => track('primary_cta_click')}
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  className="link-arrow"
                  href={hero.secondaryCta.href}
                  data-analytics-event={hero.secondaryCta.analyticsEvent}
                  onClick={() => track('secondary_cta_click')}
                >
                  {hero.secondaryCta.label}
                  <svg viewBox="0 0 20 12" width="20" height="12" aria-hidden="true" focusable="false">
                    <path d="M1 6h17M13 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="h01__visual" aria-hidden="true">
              <div className="h01__scene" ref={sceneRef}>
                <div className="h01__backdrop">
                  <img className="h01__layer h01__layer--valley" src="/assets/h01/valley-base-reveal.png" width={SCENE_W} height={SCENE_H} alt="" decoding="async" />
                  <RouteOverlay />
                  <img className="h01__layer h01__layer--mountain" data-mountain="left" src="/assets/h01/mountain-left.png" width={SCENE_W} height={SCENE_H} alt="" decoding="async" />
                  <img className="h01__layer h01__layer--mountain" data-mountain="right" src="/assets/h01/mountain-right.png" width={SCENE_W} height={SCENE_H} alt="" decoding="async" />
                </div>
                <img className="h01__layer h01__layer--people" data-person="guide" src="/assets/h01/guide-orange.png" width={SCENE_W} height={SCENE_H} alt="" decoding="async" />
                <img className="h01__layer h01__layer--people" data-person="client" src="/assets/h01/client-gray-map.png" width={SCENE_W} height={SCENE_H} alt="" decoding="async" />
                <img
                  className="h01__sky-logo"
                  data-logo=""
                  src="/assets/h01/zuzutek-logo.png"
                  width={2172}
                  height={724}
                  alt=""
                  decoding="async"
                  style={{ left: `${(950 / SCENE_W) * 100}%`, top: `${(125 / SCENE_H) * 100}%` }}
                />
                {LABELS.map((l, i) => (
                  <span
                    key={l.text}
                    className="h01__label"
                    data-cp={i}
                    data-dest={i === LABELS.length - 1 ? '' : undefined}
                    style={{ left: `${l.left}%`, top: `${l.top}%` }}
                  >
                    {l.text}
                  </span>
                ))}
                <span
                  className="h01__label h01__label--merged"
                  data-cp={2}
                  style={{ left: `${LABELS[2].left}%`, top: `${LABELS[2].top}%` }}
                >
                  BUILD + CHECK
                </span>
              </div>
            </div>
            <p className="sr-only">{route.accessibleSummary}</p>
          </div>

          <ul className="h01__proof">
            {proofStrip.map((text, i) => (
              <li key={text}>
                <ProofIcon index={i} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProofIcon({ index }: { index: number }) {
  const common = { width: 34, height: 34, viewBox: '0 0 34 34', fill: 'none', stroke: 'currentColor', strokeWidth: 2, 'aria-hidden': true, focusable: false } as const
  if (index === 0)
    return (
      <svg {...common}>
        <circle cx="6" cy="27" r="3" />
        <path d="M9 25c4-8 8-12 12-10s6 0 9-6" strokeLinecap="round" />
        <circle cx="28" cy="9" r="3" fill="currentColor" />
      </svg>
    )
  if (index === 1)
    return (
      <svg {...common} strokeLinejoin="round">
        <path d="M17 4l13 7-13 7-13-7z" />
        <path d="M4 17l13 7 13-7M4 23l13 7 13-7" />
      </svg>
    )
  return (
    <svg {...common} strokeLinecap="round">
      <circle cx="17" cy="10" r="5" />
      <path d="M6 29c1-7 5-10 11-10s10 3 11 10z" />
    </svg>
  )
}
