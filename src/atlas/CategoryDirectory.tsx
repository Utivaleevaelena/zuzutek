import { useRef, type CSSProperties } from 'react'
import { track } from '../analytics.ts'
import { useRevealOnce } from '../guided/hooks.ts'
import { useReducedMotion } from '../workflow/hooks.ts'
import { atlasContent } from './content.ts'
import type { PriceSource } from './StartingRoutes.tsx'
import type { SpyState } from './hooks.ts'

interface Props {
  source: PriceSource
  /** Scrollspy states (pricing page). Without them the Home entrance sequence plays once. */
  states?: SpyState[]
  current?: number
}

const STAGGER_MS = 80

/** Six capability anchors: H05A on Home, the SP01 category navigation on /services-pricing. */
export function CategoryDirectory({ source, states, current = -1 }: Props) {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const revealed = useRevealOnce(listRef, 0.35)
  const base = source === 'home' ? '/services-pricing' : ''
  const cls = ['ar-caps', !states && 'is-enhanced', (revealed || reduced) && 'is-revealed', reduced && 'is-reduced']
    .filter(Boolean)
    .join(' ')

  return (
    <ol ref={listRef} className={cls}>
      {atlasContent.categories.map((c, i) => {
        const state = states?.[i]
        return (
          <li key={c.id} style={{ '--i': i, '--stagger': `${STAGGER_MS}ms` } as CSSProperties}>
            <a
              className={`ar-cap${state ? ` is-${state}` : ''}`}
              href={`${base}#category-${c.id}`}
              aria-current={i === current ? 'location' : undefined}
              onClick={() => track('pricing_category_select', { category_id: c.id, source })}
            >
              <span className="ar-cap__ring" aria-hidden="true" />
              <span className="ar-cap__num">{c.number}</span>
              <img className="ar-cap__icon" src={c.icon} width={36} height={36} alt="" />
              <span className="ar-cap__name">{c.name}</span>
            </a>
          </li>
        )
      })}
    </ol>
  )
}
