import { useRef, type CSSProperties } from 'react'
import { track } from '../analytics.ts'
import { useRevealOnce } from '../guided/hooks.ts'
import { useReducedMotion } from '../workflow/hooks.ts'
import { atlasContent, ROUTE_LABELS } from './content.ts'

/** ANIMATION-SCENARIO.md: segment i starts at SEG[i] (360 ms); checkpoint + card at CARD[i]. */
const SEG_DELAY_MS = [0, 360, 720]
const CARD_DELAY_MS = [250, 600, 920]

export type PriceSource = 'home' | 'services-pricing'

/** The three starting routes. H05 (Home) and SP02 (/services-pricing) both render this one component. */
export function StartingRoutes({ source }: { source: PriceSource }) {
  const { packages } = atlasContent.home
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const revealed = useRevealOnce(listRef, 0.35)
  const cls = ['ar-routes', 'is-enhanced', (revealed || reduced) && 'is-revealed', reduced && 'is-reduced']
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <p className="sr-only">
        Three starting routes in order: {packages.map((p, i) => `${i + 1}. ${p.name}, ${p.price}`).join('; ')}.
      </p>
      <ol ref={listRef} className={cls}>
        {packages.map((p, i) => (
          <li
            key={p.id}
            className={`ar-cell${p.primary ? ' is-primary' : ''}`}
            style={{ '--seg-delay': `${SEG_DELAY_MS[i]}ms`, '--card-delay': `${CARD_DELAY_MS[i]}ms` } as CSSProperties}
          >
            <div className="ar-route" aria-hidden="true">
              <span className="ar-route__label">{ROUTE_LABELS[i]}</span>
              <span className="ar-cp" />
              <span className="ar-seg" />
              <span className="ar-curve">
                <svg viewBox="0 0 100 24" preserveAspectRatio="none" focusable="false">
                  <path d="M0 12 C 14 12, 28 3, 50 12 C 72 21, 86 12, 100 12" />
                </svg>
              </span>
              {i === packages.length - 1 && (
                <svg className="ar-flag" viewBox="0 0 24 32" focusable="false">
                  <path d="M5 30V3" />
                  <path d="M5 4h14l-4 5 4 5H5z" />
                </svg>
              )}
            </div>
            <article className="ar-card">
              <div className="ar-card__top">
                <span className="ar-card__num">{p.number}</span>
                {p.primary && <span className="ar-badge">{p.label}</span>}
              </div>
              <img className="ar-card__icon" src={p.icon} width={56} height={56} alt="" />
              <h3 className="ar-card__name">{p.name}</h3>
              <p className="ar-price">
                <span className="ar-price__amount">{p.price}</span>{' '}
                {'monthly' in p ? (
                  <span className="ar-price__billing ar-price__billing--plus">setup + {p.monthly}</span>
                ) : (
                  <span className="ar-price__billing">{p.billing}</span>
                )}
              </p>
              <p className="ar-card__promise">{p.promise}</p>
              <p className="ar-card__scope">{p.scopeNote}</p>
              <a
                className="ar-card__link"
                href={p.href}
                onClick={() => track('package_select', { package_id: p.id, source })}
              >
                <span>Learn about {p.name}</span>
                <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M3 10h13M11 5l5 5-5 5" />
                </svg>
              </a>
            </article>
          </li>
        ))}
      </ol>
    </>
  )
}
