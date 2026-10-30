import { useEffect, useRef, useState } from 'react'
import '../guided.css'
import { track } from '../analytics.ts'
import { guidedContent, type Stage } from '../guided/content.ts'
import { isVisibleEnough } from '../guided/hooks.ts'
import { ArrowRight, FOOTER_ICONS, STAGE_ICONS } from '../guided/icons.tsx'
import { StagePhoto } from '../guided/StagePhoto.tsx'
import { W06AccessBoundaries } from '../components/W06AccessBoundaries.tsx'
import { W07OptionalCare } from '../components/W07OptionalCare.tsx'
import { W08ProcessCta } from '../components/W08ProcessCta.tsx'
import { useMediaQuery, useReducedMotion } from '../workflow/hooks.ts'
import { sitePath } from '../sitePaths.ts'

const TITLE = 'How It Works — ZuzuTek'

/** Stage activation along the route: current (amber ring), completed (stays), next (outline). */
function useStageProgress(count: number, ratio: number, reduced: boolean) {
  const refs = useRef<(HTMLElement | null)[]>([])
  const [current, setCurrent] = useState(-1)
  const [reached, setReached] = useState(-1)
  const seen = useRef(new Set<number>())

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const ratios = new Map<number, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = refs.current.indexOf(e.target as HTMLElement)
          if (i < 0) continue
          ratios.set(i, e.isIntersecting && isVisibleEnough(e, ratio) ? e.intersectionRatio || 0.01 : 0)
        }
        let best = -1
        let bestRatio = 0
        ratios.forEach((r, i) => {
          if (r > bestRatio) {
            best = i
            bestRatio = r
          }
        })
        if (best < 0) return
        setCurrent(best)
        // Fast scroll: everything before the newest reached stage becomes completed at once.
        setReached((prev) => Math.max(prev, best))
        if (!seen.current.has(best)) {
          seen.current.add(best)
          track('how_it_works_stage_view', { stage_id: guidedContent.stages[best].id })
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.35, 0.45, 0.6, 0.8, 1] },
    )
    refs.current.slice(0, count).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [count, ratio])

  const stateOf = (i: number): 'completed' | 'current' | 'next' | 'upcoming' => {
    if (reduced) return 'completed'
    if (i === current) return 'current'
    if (i <= reached) return 'completed'
    if (i === reached + 1) return 'next'
    return 'upcoming'
  }
  return { refs, stateOf, reached }
}

export function HowItWorks() {
  const { w01, stages } = guidedContent
  const reduced = useReducedMotion()
  const mobile = useMediaQuery('(max-width: 767px)')
  const { refs, stateOf, reached } = useStageProgress(stages.length, mobile ? 0.45 : 0.35, reduced)

  useEffect(() => {
    const previous = document.title
    document.title = TITLE
    track('how_it_works_view')
    return () => {
      document.title = previous
    }
  }, [])

  // The app renders after load, so the browser cannot jump to a #stage-* anchor by itself.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const t = window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => window.cancelAnimationFrame(t)
  }, [])

  return (
    <>
      <section id="w01-process-overview" className="gw gw--w01" aria-labelledby="w01-title">
        <div className="gw-inner">
          <p className="gw-eyebrow">{w01.eyebrow}</p>
          <h1 id="w01-title" className="gw-title gw-title--page">
            {w01.title}
          </h1>
          <p className="gw-body">{w01.body}</p>
          <ol className="gw-steps">
            {w01.steps.map((step, i) => (
              <li key={step} className="gw-step">
                <span className="gw-step__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="gw-step__label">{step}</span>
              </li>
            ))}
          </ol>
          <a
            className="btn btn--primary gw-cta"
            href={sitePath(w01.cta.href)}
            onClick={() => track('how_it_works_cta_click', { cta_id: 'w01-fit-call' })}
          >
            {w01.cta.label}
            <span className="gw-cta__arrow" aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
        </div>
      </section>

      <div className={`gw gw--w${reduced ? ' is-reduced' : ''}`}>
        {stages.map((s, i) => (
          <Chapter
            key={s.id}
            stage={s}
            index={i}
            last={i === stages.length - 1}
            state={stateOf(i)}
            drawn={reduced || i <= reached}
            setRef={(el) => {
              refs.current[i] = el
            }}
          />
        ))}
      </div>

      <W06AccessBoundaries />
      <W07OptionalCare />
      <W08ProcessCta />
    </>
  )
}

interface ChapterProps {
  stage: Stage
  index: number
  last: boolean
  state: 'completed' | 'current' | 'next' | 'upcoming'
  drawn: boolean
  setRef: (el: HTMLElement | null) => void
}

function Chapter({ stage: s, index, last, state, drawn, setRef }: ChapterProps) {
  const Icon = STAGE_ICONS[s.id]
  const Foot = FOOTER_ICONS[s.id]
  const headingId = `${s.id}-title`
  return (
    <section
      id={`stage-${s.id}`}
      ref={setRef}
      className={`gw-chapter is-${state}${drawn ? ' is-drawn' : ''}${index % 2 ? ' is-flip' : ''}`}
      aria-labelledby={headingId}
      data-state={state}
    >
      <div className="gw-spine" aria-hidden="true">
        <span className="gw-spine__line" />
        <span className="gw-spine__cp">
          <Icon />
        </span>
      </div>
      <div className="gw-chapter__media">
        <StagePhoto stage={s} eager={index === 0} />
      </div>
      <div className="gw-chapter__copy">
        <p className="gw-kicker">
          <span className="gw-kicker__num">{s.number}</span>
          <span className="gw-kicker__label">{s.businessLabel}</span>
          <span className="gw-kicker__role">{s.role}</span>
        </p>
        <h2 id={headingId} className="gw-chapter__title">
          {s.detailTitle}
        </h2>
        <p className="gw-body">{s.detailBody}</p>
        <ul className="gw-labels" aria-label={`${s.businessLabel} checkpoints`}>
          {s.labels.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        {last && (
          <p className="gw-ownership">
            <span className="gw-ownership__icon" aria-hidden="true">
              <Foot />
            </span>
            <span>OWNERSHIP / CLIENT IN CONTROL</span>
          </p>
        )}
        {last ? (
          <a
            className="btn btn--primary gw-cta"
            href={sitePath(s.nextHref)}
            onClick={() => track('how_it_works_cta_click', { cta_id: 'w05-free-consultation' })}
          >
            {s.nextLabel}
            <span className="gw-cta__arrow" aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
        ) : (
          <a className="gw-next" href={sitePath(s.nextHref)}>
            <span className="gw-next__icon" aria-hidden="true">
              <Foot />
            </span>
            {s.nextLabel}
            <span className="gw-next__arrow" aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
        )}
      </div>
    </section>
  )
}
