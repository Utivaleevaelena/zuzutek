import { useRef, type CSSProperties } from 'react'
import '../outcomes.css'
import { useOneShotReveal } from '../closing/hooks.ts'
import { CtaRow } from '../offer/Cta.tsx'
import { outcomesContent } from '../outcomes/content.ts'

/** S09 (/ai-automation): the last step — bring one slow process to the Fit Call. */
export function S09OfferCta() {
  const { s09 } = outcomesContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `os os-s09${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={s09.id} ref={ref} className={cls} aria-labelledby="os-s09-title">
      <div className="os-inner os-s09__row">
        <div>
          <p className="os-eyebrow">{s09.eyebrow}</p>
          <h2 id="os-s09-title" className="os-title os-title--cta">
            {s09.title}
          </h2>
          <ol className="os-marks">
            {s09.markers.map((m, i) => (
              <li key={m} style={{ '--m': i } as CSSProperties}>
                <i aria-hidden="true">{i + 1}</i>
                {m}
              </li>
            ))}
          </ol>
        </div>
        <CtaRow primary={s09.primaryCta} secondary={s09.secondaryCta} />
      </div>
    </section>
  )
}
