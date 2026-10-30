import { useRef, type CSSProperties } from 'react'
import '../offer.css'
import { useOneShotReveal } from '../closing/hooks.ts'
import { CtaRow } from '../offer/Cta.tsx'
import { offerContent } from '../offer/content.ts'

/** S02A (/ai-automation): an honest fork — what fits, and what does not. */
export function S02aGoodFit() {
  const { s02a } = offerContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `of of-s02a${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={s02a.id} ref={ref} className={cls} aria-labelledby="of-s02a-title">
      <div className="of-inner">
        <p className="of-eyebrow">{s02a.eyebrow}</p>
        <h2 id="of-s02a-title" className="of-title">
          {s02a.title}
        </h2>
        <div className="of-fork">
          <span className="of-fork__dot" aria-hidden="true" />
          <div className="of-panel of-panel--yes" style={{ '--p': 0 } as CSSProperties}>
            <h3>{s02a.good.label}</h3>
            <ul>
              {s02a.good.items.map((t) => (
                <li key={t}>
                  <i aria-hidden="true">✓</i>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="of-panel of-panel--no" style={{ '--p': 1 } as CSSProperties}>
            <h3>{s02a.no.label}</h3>
            <ul>
              {s02a.no.items.map((t) => (
                <li key={t}>
                  <i aria-hidden="true">–</i>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <CtaRow primary={s02a.primaryCta} secondary={s02a.secondaryCta} />
      </div>
    </section>
  )
}
