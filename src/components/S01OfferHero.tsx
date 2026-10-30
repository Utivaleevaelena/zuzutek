import { useRef, type CSSProperties } from 'react'
import '../offer.css'
import { useOneShotReveal } from '../closing/hooks.ts'
import { CtaRow } from '../offer/Cta.tsx'
import { offerContent } from '../offer/content.ts'

/** S01 (/ai-automation): the offer, in one line, with the three things that keep it controlled. The page's only h1. */
export function S01OfferHero() {
  const { s01 } = offerContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref, 0.2)
  const cls = `of of-s01${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={s01.id} ref={ref} className={cls} aria-labelledby="of-s01-title">
      <div className="of-inner of-s01__grid">
        <div>
          <p className="of-eyebrow">{s01.eyebrow}</p>
          <h1 id="of-s01-title" className="of-title of-title--hero">
            {s01.title}
          </h1>
          <p className="of-lead">{s01.lead}</p>
          <CtaRow primary={s01.primaryCta} secondary={s01.secondaryCta} />
        </div>
        <div className="of-rcard">
          <p className="of-rcard__label">{s01.route.label}</p>
          <ol className="of-route">
            {s01.route.points.map((p, i) => (
              <li key={p.title} style={{ '--n': i } as CSSProperties}>
                <i aria-hidden="true" />
                <b>{p.title}</b>
                <span>{p.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
