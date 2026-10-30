import { useEffect, useRef } from 'react'
import '../guided.css'
import { track } from '../analytics.ts'
import { guidedContent } from '../guided/content.ts'
import { useRevealOnce } from '../guided/hooks.ts'
import { useReducedMotion } from '../workflow/hooks.ts'
import { ArrowRight, FOOTER_ICONS, STAGE_ICONS } from '../guided/icons.tsx'
import { StagePhoto } from '../guided/StagePhoto.tsx'
import { sitePath } from '../sitePaths.ts'

/** Seconds-based delays from ANIMATION-SCENARIO.md: segment i starts at SEG[i]; checkpoint + card at CARD[i]. */
const SEG_DELAY_MS = [0, 420, 840, 1260]
const CARD_DELAY_MS = [260, 680, 1100, 1500]

export function H04GuidedWorlds() {
  const { h04, stages } = guidedContent
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const revealed = useRevealOnce(listRef, 0.35)
  const viewed = useRef(false)

  useEffect(() => {
    if (revealed && !viewed.current) {
      viewed.current = true
      track('guided_worlds_h04_view')
    }
  }, [revealed])

  const cls = ['gw', 'gw--h04', 'is-enhanced', (revealed || reduced) && 'is-revealed', reduced && 'is-reduced']
    .filter(Boolean)
    .join(' ')

  return (
    <section id="guided-worlds" className={cls} aria-labelledby="gw-h04-title">
      <svg className="gw-contours" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <g>
          <path d="M-20 120 C 180 40, 330 190, 520 110 S 860 30, 1220 130" />
          <path d="M-20 170 C 190 100, 340 240, 530 160 S 870 90, 1220 185" />
          <path d="M-20 225 C 200 160, 350 290, 540 215 S 880 150, 1220 240" />
          <path d="M-20 520 C 160 450, 320 600, 560 520 S 900 430, 1220 540" />
          <path d="M-20 575 C 170 510, 330 650, 570 575 S 910 490, 1220 595" />
          <path d="M-20 630 C 180 570, 340 700, 580 630 S 920 550, 1220 650" />
          <path d="M-20 700 C 200 650, 360 760, 600 700 S 940 630, 1220 715" />
        </g>
      </svg>
      <div className="gw-inner">
        <header className="gw-head">
          <p className="gw-eyebrow">{h04.eyebrow}</p>
          <h2 id="gw-h04-title" className="gw-title">
            {h04.title}
          </h2>
          <p className="gw-body">{h04.body}</p>
          <a className="btn btn--primary gw-cta" href={sitePath(h04.cta.href)}>
            {h04.cta.label}
            <span className="gw-cta__arrow" aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
        </header>

        <p className="sr-only">
          Four stages in order:{' '}
          {stages.map((s, i) => `${i + 1}. ${s.businessLabel}, ${s.role.toLowerCase()}`).join('; ')}.
        </p>

        <ol ref={listRef} className="gw-stages">
          {stages.map((s, i) => {
            const Icon = STAGE_ICONS[s.id]
            const Foot = FOOTER_ICONS[s.id]
            return (
              <li
                key={s.id}
                className="gw-stage"
                style={
                  {
                    '--seg-delay': `${SEG_DELAY_MS[i]}ms`,
                    '--card-delay': `${CARD_DELAY_MS[i]}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="gw-route" aria-hidden="true">
                  <span className="gw-route__label">
                    <span className="gw-route__icon">
                      <Icon />
                    </span>
                    <span className="gw-route__num">{s.number}</span>
                    <span className="gw-route__name">{s.businessLabel}</span>
                  </span>
                  <span className="gw-cp" />
                  <span className={`gw-seg${i === stages.length - 1 ? ' gw-seg--end' : ''}`} />
                  <span className={`gw-curve${i === stages.length - 1 ? ' gw-curve--end' : ''}`}>
                    <svg viewBox="0 0 100 24" preserveAspectRatio="none" focusable="false">
                      <path d="M0 12 C 14 12, 28 3, 50 12 C 72 21, 86 12, 100 12" />
                    </svg>
                  </span>
                </div>
                <a
                  className="gw-card"
                  href={sitePath(s.href)}
                  onClick={() => track('guided_worlds_stage_select', { stage_id: s.id })}
                >
                  <div className="gw-paper">
                    <div className="gw-paper__mat">
                      <StagePhoto stage={s} eager={i === 0} />
                    </div>
                  </div>
                  <span className="gw-card__num">{s.number}</span>
                  <span className="gw-card__label">{s.businessLabel}</span>
                  <span className="gw-card__role">{s.role}</span>
                  <span className="gw-card__body">{s.homeBody}</span>
                  <span className="gw-card__foot">
                    <span className="gw-card__footicon">
                      <Foot />
                    </span>
                    <span>{s.footerLabel}</span>
                    <span className="gw-card__rule" aria-hidden="true" />
                    <span className="gw-card__go" aria-hidden="true">
                      <ArrowRight />
                    </span>
                  </span>
                </a>
                {/* Tablet 2x2 only: the 02 → 03 connector (CSS shows it between 768 and 1199 px). */}
                {i === 1 && (
                  <>
                    <span className="gw-hop gw-hop--down" aria-hidden="true" />
                    <span className="gw-hop gw-hop--bar" aria-hidden="true" />
                  </>
                )}
                {i === 2 && <span className="gw-hop gw-hop--in" aria-hidden="true" />}
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
