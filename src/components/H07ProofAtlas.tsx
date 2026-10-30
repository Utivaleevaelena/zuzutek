import { useId, useRef, type KeyboardEvent } from 'react'
import '../proof.css'
import { track } from '../analytics.ts'
import { proofContent } from '../proof/content.ts'
import { useListReveal, useNear, useProofPrefetch, useProofScroll } from '../proof/hooks.ts'
import { useMediaQuery, useReducedMotion } from '../workflow/hooks.ts'
import { sitePath } from '../sitePaths.ts'

type ProofCase = (typeof proofContent.h07.cases)[number]

/** Intrinsic sizes of the approved runtime images (ASSET-MANIFEST.md): case 01 is the redacted derivative. */
const dimensions = (c: ProofCase) => (c.number === '01' ? { width: 1551, height: 1014 } : { width: 1240, height: 811 })

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

/** Decorative topography only: hidden from assistive technology. */
const Contours = () => (
  <svg className="pa-contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <path d="M-40 140C180 60 330 190 540 120S900 40 1100 130 1380 90 1500 40" />
    <path d="M-40 230C170 150 340 290 560 210S910 140 1110 230 1390 190 1500 150" />
    <path d="M-40 640C200 560 360 700 600 620S940 560 1140 650 1400 610 1500 570" />
    <path d="M-40 730C190 650 380 790 620 710S960 650 1160 740 1410 700 1500 660" />
    <path d="M-40 820C210 740 400 880 640 800S980 740 1180 830 1420 790 1500 750" />
  </svg>
)

/** H07 (Home): seven owner-approved projects as factual interface evidence on one bounded route. */
export function H07ProofAtlas() {
  const { h07 } = proofContent
  const { cases, ctas } = h07
  const uid = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const reduced = useReducedMotion()
  // Tall enough and wide enough for the evidence stage; otherwise the cases are a normal-flow vertical list.
  const stage = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const sticky = stage && !reduced

  const near = useNear(sectionRef)
  const { index, instant, select } = useProofScroll(trackRef, cases.length, sticky)
  useProofPrefetch(
    cases.map((c) => sitePath(c.image)),
    index,
    stage && near,
  )
  const { armed, seen } = useListReveal(listRef, cases.length, reduced || stage)

  const active = cases[index]
  const tabId = (i: number) => `${uid}-tab-${i}`
  const panelId = `${uid}-panel`

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = cases.length - 1
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? (index + 1) % cases.length
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? (index + last) % cases.length
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : -1
    if (next < 0) return
    e.preventDefault()
    select(next)
    tabRefs.current[next]?.focus({ preventScroll: true })
  }

  const cls = [
    'proof-atlas',
    stage ? 'pa--stage' : 'pa--list',
    sticky ? 'pa--sticky' : '',
    armed ? 'pa--armed' : '',
    instant || reduced ? 'is-instant' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={h07.id} ref={sectionRef} className={cls} aria-labelledby="pa-title">
      <Contours />
      <div className="pa-track" ref={trackRef}>
        <div className="pa-sticky">
          <div className="pa-stage">
            <div className="pa-intro">
              <header>
                <p className="pa-eyebrow">{h07.eyebrow}</p>
                <h2 id="pa-title" className="pa-title">
                  {h07.title}
                </h2>
                <p className="pa-lead">{h07.body}</p>
              </header>
              {stage && (
                <div className="pa-tabs" role="tablist" aria-orientation="vertical" aria-label={h07.eyebrow} onKeyDown={onKeyDown}>
                  {cases.map((c, i) => (
                    <button
                      key={c.number}
                      ref={(el) => {
                        tabRefs.current[i] = el
                      }}
                      id={tabId(i)}
                      className={`pa-tab${i === index ? ' is-active' : ''}`}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-controls={panelId}
                      tabIndex={i === index ? 0 : -1}
                      onClick={() => select(i)}
                    >
                      <span className="pa-tab__node" aria-hidden="true" />
                      <span className="pa-tab__num">{c.number}</span>
                      <span className="pa-tab__name">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {stage ? (
              <>
                <div id={panelId} className="pa-panel" role="tabpanel" aria-labelledby={tabId(index)}>
                  <div key={index} className="pa-case">
                    <div className="pa-case__head">
                      <p className="pa-case__cat">
                        <span aria-hidden="true">{active.number}</span>
                        {active.category}
                      </p>
                      <p className="pa-chip">{active.status}</p>
                    </div>
                    <figure className="pa-shot">
                      <img
                        src={sitePath(active.image)}
                        alt={active.alt}
                        {...dimensions(active)}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                    <div className="pa-note">
                      <div>
                        <h3 className="pa-note__name">{active.name}</h3>
                        <p className="pa-note__evidence">{active.evidence}</p>
                      </div>
                      <p className="pa-note__disclosure">{active.disclosure}</p>
                    </div>
                  </div>
                </div>
                <ol className="pa-route" aria-hidden="true">
                  {cases.map((c, i) => (
                    <li key={c.number} className={i < index ? 'is-done' : i === index ? 'is-active' : ''}>
                      <span>{c.number}</span>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <ol className="pa-list" ref={listRef}>
                {cases.map((c, i) => (
                  <li
                    key={c.number}
                    className={`pa-item${i === 0 ? ' is-first' : ''}${seen[i] || !armed ? ' is-in' : ''}${seen[i] === 'instant' ? ' is-instant' : ''}`}
                  >
                    <span className="pa-item__rail" aria-hidden="true">
                      <span className="pa-item__node">{c.number}</span>
                    </span>
                    <article className="pa-card">
                      <figure className="pa-card__shot">
                        <img src={sitePath(c.image)} alt={c.alt} {...dimensions(c)} loading="lazy" decoding="async" />
                      </figure>
                      <div className="pa-card__head">
                        <p className="pa-card__cat">{c.category}</p>
                        <h3 className="pa-card__name">{c.name}</h3>
                        <p className="pa-card__evidence">{c.evidence}</p>
                        <p className="pa-chip">{c.status}</p>
                      </div>
                      <p className="pa-card__disclosure">{c.disclosure}</p>
                    </article>
                  </li>
                ))}
              </ol>
            )}

            <div className="pa-cta">
              {ctas.map((cta, i) => (
                <a
                  key={cta.ctaId}
                  className={`btn pa-btn${i === 0 ? ' btn--primary' : ' pa-btn--ghost'}`}
                  href={sitePath(cta.href)}
                  onClick={() => track('primary_cta_click', { cta_id: cta.ctaId, source: cta.source })}
                >
                  {cta.label}
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
