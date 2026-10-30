import { useEffect, useRef } from 'react'
import '../manifest.css'
import { track } from '../analytics.ts'
import { manifestContent } from '../manifest/content.ts'
import { usePlateProgress } from '../manifest/hooks.ts'
import { Stations } from '../manifest/Stations.tsx'
import { S01OfferHero } from '../components/S01OfferHero.tsx'
import { S02PackageLadder } from '../components/S02PackageLadder.tsx'
import { S02aGoodFit } from '../components/S02aGoodFit.tsx'
import { S04Cards } from '../components/S04ExampleOutcomes.tsx'
import { S07PricingLedger } from '../components/S07PricingLedger.tsx'
import { S08Faq } from '../components/S08Faq.tsx'
import { S09OfferCta } from '../components/S09OfferCta.tsx'
import { outcomesContent } from '../outcomes/content.ts'
import { useMediaQuery, useReducedMotion } from '../workflow/hooks.ts'

const TITLE = 'AI Business Automation — ZuzuTek'
const SOURCE = 'ai-automation-control-manifest'

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

/** One continuous mobile spine: a node at the top of each plate; the line is drawn per plate and joins the next. */
const Spine = ({ end }: { end?: boolean }) => (
  <>
    <span className={`cm-spine${end ? ' cm-spine--end' : ''}`} aria-hidden="true" />
    <span className="cm-node" aria-hidden="true" />
  </>
)

/** Decorative topographic contours: one seamless tile repeated by an SVG pattern (code-drawn, no raster). */
const Contours = () => (
  <svg className="cm-contours" aria-hidden="true" focusable="false">
    <defs>
      <pattern id="cm-contour-tile" width="640" height="440" patternUnits="userSpaceOnUse">
        <g>
          <path d="M-10 60 C 90 20, 190 110, 320 70 S 540 20, 650 60" />
          <path d="M-10 110 C 100 70, 200 160, 330 120 S 550 70, 650 110" />
          <path d="M-10 160 C 110 120, 210 210, 340 170 S 560 120, 650 160" />
          <path d="M-10 300 C 120 250, 230 350, 350 300 S 560 250, 650 300" />
          <path d="M-10 350 C 130 300, 240 400, 360 350 S 570 300, 650 350" />
          <path d="M470 230 C 500 200, 560 210, 575 245 S 540 300, 500 285 S 450 255, 470 230Z" />
          <path d="M488 240 C 508 222, 544 228, 552 248 S 534 278, 510 270 S 478 254, 488 240Z" />
          <path d="M60 235 C 85 215, 130 225, 140 250 S 110 285, 80 275 S 42 252, 60 235Z" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#cm-contour-tile)" />
  </svg>
)

/** /ai-automation — S01 offer, S02 package ladder, S02A fit, then the manifest route S03 → S04 → S05 → S06, then S07 pricing, S08 FAQ, S09 CTA. */
export function AiAutomation() {
  const { s03, s05, s06 } = manifestContent
  const reduced = useReducedMotion()
  const wide = useMediaQuery('(min-width: 1200px)')
  const { s04 } = outcomesContent
  const { refs, reached, instant } = usePlateProgress(4)
  const viewed = useRef(false)

  useEffect(() => {
    const previous = document.title
    document.title = TITLE
    if (!viewed.current) {
      viewed.current = true
      track('offer_view')
    }
    return () => {
      document.title = previous
    }
  }, [])

  const plate = (i: number) => (el: HTMLElement | null) => {
    refs.current[i] = el
  }
  const scopeOn = reduced || reached >= 2
  const plateCls = (i: number) => `cm-plate${reduced || reached >= i ? ' is-reached' : ''}${instant[i] || reduced ? ' is-instant' : ''}`

  return (
    <>
      <S01OfferHero />
      <S02PackageLadder />
      <S02aGoodFit />
      <div className="cm">
      <Contours />
      <section id={s03.id} ref={plate(0)} className={`${plateCls(0)} cm-plate--first`} aria-labelledby="cm-s03-title">
        <div className="cm-inner">
          <div className="cm-body">
            <Spine />
            <header className="cm-head">
              <p className="cm-eyebrow">{s03.eyebrow}</p>
              <h2 id="cm-s03-title" className="cm-title">
                {s03.title}
              </h2>
            </header>
            <Stations
              items={s03.deliverables}
              label="Deliverables in order"
              variant="deliver"
              wide={wide}
              plateDone={reached >= 0}
              skipped={reached > 0}
              instant={instant[0] || reduced}
              reduced={reduced}
              stepMs={270}
            />
            <a
              className="cm-link"
              href={s03.primaryCta.href}
              onClick={() => track('primary_cta_click', { cta_id: 'ai-s03-how-delivery-works', source: SOURCE })}
            >
              {s03.primaryCta.label}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section id={s04.id} ref={plate(1)} className={plateCls(1)} aria-labelledby="cm-s04-title">
        <div className="cm-inner">
          <div className="cm-body">
            <Spine />
            <header className="cm-head">
              <p className="cm-eyebrow">{s04.eyebrow}</p>
              <h2 id="cm-s04-title" className="cm-title">
                {s04.title}
              </h2>
            </header>
            <S04Cards on={reduced || reached >= 1} instant={instant[1] || reduced} />
          </div>
        </div>
      </section>

      <section id={s05.id} ref={plate(2)} className={plateCls(2)} aria-labelledby="cm-s05-title">
        <div className="cm-inner">
          <div className="cm-body">
            <Spine />
            <header className="cm-head">
              <p className="cm-eyebrow">{s05.eyebrow}</p>
              <h2 id="cm-s05-title" className="cm-title">
                {s05.title}
              </h2>
            </header>
            <ul className={`cm-zones${scopeOn ? ' is-on' : ''}`} aria-label="Scope zones">
              {s05.zones.map((z) => (
                <li key={z.id} className={`cm-zone cm-zone--${z.id}`}>
                  <span className="cm-zone__mark" aria-hidden="true" />
                  <div>
                    <h3 className="cm-zone__label">{z.label}</h3>
                    <p className="cm-zone__body">{z.body}</p>
                  </div>
                  {z.id === 'in' && <span className="cm-zone__route" aria-hidden="true" />}
                </li>
              ))}
              <li className="cm-branch" aria-hidden="true">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
                  <path d="M0 50 C 45 50, 50 25, 100 25" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id={s06.id} ref={plate(3)} className={plateCls(3)} aria-labelledby="cm-s06-title">
        <div className="cm-inner">
          <div className="cm-body">
            <Spine end />
            <header className="cm-head">
              <p className="cm-eyebrow">{s06.eyebrow}</p>
              <h2 id="cm-s06-title" className="cm-title">
                {s06.title}
              </h2>
            </header>
            <Stations
              items={s06.checkpoints}
              label="Human checkpoints in order"
              variant="checkpoint"
              wide={wide}
              plateDone={reached >= 3}
              skipped={false}
              instant={instant[3] || reduced}
              reduced={reduced}
              stepMs={420}
            />
          </div>
          <div className="cm-actions">
            <a
              className="btn btn--primary cm-cta"
              href={s06.primaryCta.href}
              onClick={() => track('primary_cta_click', { cta_id: 'ai-s06-see-how-delivery-works', source: SOURCE })}
            >
              {s06.primaryCta.label}
              <ArrowIcon />
            </a>
            <a
              className="cm-link cm-link--inline"
              href={s06.secondaryCta.href}
              onClick={() => track('primary_cta_click', { cta_id: 'ai-s06-free-discovery-call', source: SOURCE })}
            >
              {s06.secondaryCta.label}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
      </div>

      <S07PricingLedger />
      <S08Faq />
      <S09OfferCta />
    </>
  )
}
