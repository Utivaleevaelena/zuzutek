import { useRef, type CSSProperties } from 'react'
import '../closing.css'
import { track } from '../analytics.ts'
import { closingContent } from '../closing/content.ts'
import { useOneShotReveal } from '../closing/hooks.ts'

/** H08 (Home): the closing step. The amber route arrives at one card that says what to bring to the Fit Call. */
export function H08BringOneProcess() {
  const { h08 } = closingContent
  const { card } = h08
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `hc hc-h08${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={h08.id} ref={ref} className={cls} aria-labelledby="hc-h08-title">
      <div className="hc-inner hc-h08__grid">
        <div>
          <p className="hc-eyebrow">{h08.eyebrow}</p>
          <h2 id="hc-h08-title" className="hc-title">
            {h08.title}
          </h2>
          <p className="hc-lead">{h08.lead}</p>
        </div>
        <div className="hc-arrive">
          <svg className="hc-arrive__line" viewBox="0 0 88 6" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 3H88" />
            <circle cx="3" cy="3" r="3" />
          </svg>
          <article className="hc-card">
            <p className="hc-eyebrow hc-eyebrow--dark">{card.eyebrow}</p>
            <h3 className="hc-card__title">{card.title}</h3>
            <ol className="hc-markers">
              {card.items.map((item, i) => (
                <li key={item.number} style={{ '--m': `${i * 140}ms` } as CSSProperties}>
                  <i aria-hidden="true">{item.number}</i>
                  <div>
                    <b>{item.title}</b>
                    <span>{item.body}</span>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="hc-facts">
              {card.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              className="btn btn--primary hc-cta"
              href={card.cta.href}
              onClick={() => track('primary_cta_click', { cta_id: card.cta.ctaId, source: card.cta.source })}
            >
              {card.cta.label}
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M3 10h13M11 5l5 5-5 5" />
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
