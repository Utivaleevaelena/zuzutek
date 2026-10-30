import { useRef, type CSSProperties } from 'react'
import '../offer.css'
import { useOneShotReveal } from '../closing/hooks.ts'
import { CtaRow } from '../offer/Cta.tsx'
import { offerContent } from '../offer/content.ts'

/** S02 (/ai-automation): three packages as an ascending ladder on one route. Cards are information, not links. */
export function S02PackageLadder() {
  const { s02 } = offerContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `of of-s02${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={s02.id} ref={ref} className={cls} aria-labelledby="of-s02-title">
      <div className="of-inner">
        <p className="of-eyebrow">{s02.eyebrow}</p>
        <h2 id="of-s02-title" className="of-title">
          {s02.title}
        </h2>
        <ol className="of-ladder">
          {s02.packages.map((p, i) => {
            const primary = 'badge' in p
            const from = 'pricePrefix' in p
            return (
              <li
                key={p.id}
                className={`of-step of-step--${i + 1}${primary ? ' is-primary' : ''}`}
                style={{ '--s': i } as CSSProperties}
              >
                <span className="of-step__node" aria-hidden="true">
                  {i + 1}
                </span>
                <p className="of-step__lvl">
                  <span>{p.level}</span>
                  {primary && <span className="of-badge">{p.badge}</span>}
                </p>
                <h3 className="of-step__name">{p.name}</h3>
                <p className="of-price">
                  <small>{from ? p.pricePrefix : p.billing}</small>
                  {p.price}
                </p>
                <p className="of-step__inc">{p.includes}</p>
              </li>
            )
          })}
        </ol>
        <p className="of-excl">
          <b>{s02.exclusions.label}</b> <span>{s02.exclusions.body}</span>
        </p>
        <CtaRow primary={s02.primaryCta} secondary={s02.secondaryCta} />
      </div>
    </section>
  )
}
