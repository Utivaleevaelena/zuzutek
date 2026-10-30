import { useRef, type CSSProperties } from 'react'
import '../outcomes.css'
import { track } from '../analytics.ts'
import { useOneShotReveal } from '../closing/hooks.ts'
import { outcomesContent } from '../outcomes/content.ts'
import { sitePath } from '../sitePaths.ts'

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

/** S07 (/ai-automation): the price ledger and what is billed separately. Prices are live text, never animated numbers. */
export function S07PricingLedger() {
  const { s07, analyticsSource } = outcomesContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `os os-s07${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={s07.id} ref={ref} className={cls} aria-labelledby="os-s07-title">
      <div className="os-inner">
        <p className="os-eyebrow">{s07.eyebrow}</p>
        <h2 id="os-s07-title" className="os-title">
          {s07.title}
        </h2>
        <ol className="os-ledger">
          {s07.rows.map((r, i) => (
            <li key={r.id} className="os-row" style={{ '--r': i } as CSSProperties}>
              <h3>{r.name}</h3>
              <p className="os-row__price">
                <small>{r.billing}</small>
                {r.price}
              </p>
              <p className="os-row__inc">{r.includes}</p>
            </li>
          ))}
        </ol>
        <p className="os-excl">
          <b>{s07.exclusions.label}</b> {s07.exclusions.body} <b>{s07.exclusions.scope}</b>
        </p>
        <p className="os-links">
          {s07.links.map((l) => (
            <a
              key={l.ctaId}
              className="link-arrow"
              href={sitePath(l.href)}
              onClick={() => track('primary_cta_click', { cta_id: l.ctaId, source: analyticsSource })}
            >
              {l.label}
              <Arrow />
            </a>
          ))}
        </p>
      </div>
    </section>
  )
}
