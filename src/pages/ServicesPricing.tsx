import { useEffect, useRef } from 'react'
import '../atlas.css'
import { track } from '../analytics.ts'
import { atlasContent, type Category, type CategoryPackage } from '../atlas/content.ts'
import { CategoryDirectory } from '../atlas/CategoryDirectory.tsx'
import { useCategorySpy, useScrollToHash, type SpyState } from '../atlas/hooks.ts'
import { StartingRoutes } from '../atlas/StartingRoutes.tsx'
import { useRevealOnce } from '../guided/hooks.ts'
import { useReducedMotion } from '../workflow/hooks.ts'

const TITLE = 'Services & Pricing — ZuzuTek'
const ids = atlasContent.categories.map((c) => c.id)
const spyIds = ids.map((id) => `category-${id}`)

export function ServicesPricing() {
  const { pricingPage, categories, cta } = atlasContent
  const reduced = useReducedMotion()
  const { refs, current, stateOf } = useCategorySpy(spyIds, reduced)
  const viewed = useRef(false)

  useEffect(() => {
    const previous = document.title
    document.title = TITLE
    if (!viewed.current) {
      viewed.current = true
      track('pricing_view')
    }
    return () => {
      document.title = previous
    }
  }, [])
  useScrollToHash()

  const states: SpyState[] = categories.map((_, i) => stateOf(i))

  return (
    <>
      <section id="pricing-hero" className="ar ar--hero" aria-labelledby="pricing-title">
        <div className="ar-inner">
          <p className="ar-eyebrow">{pricingPage.eyebrow}</p>
          <h1 id="pricing-title" className="ar-title ar-title--page">
            {pricingPage.title}
          </h1>
          <p className="ar-body">{pricingPage.body}</p>
          <ul className="ar-legend" aria-label="Billing labels">
            {pricingPage.billingLegend.map((b) => (
              <li key={b.id}>{b.label}</li>
            ))}
          </ul>
          <nav className="ar-directory" aria-label="Service categories">
            <CategoryDirectory source="services-pricing" states={states} current={current} />
          </nav>
        </div>
      </section>

      <section id="starting-routes" className="ar ar--h05" aria-labelledby="ar-sp02-title">
        <div className="ar-inner">
          <h2 id="ar-sp02-title" className="ar-title ar-title--section">
            {pricingPage.startingRoutesTitle}
          </h2>
          <StartingRoutes source="services-pricing" />
        </div>
      </section>

      <section id="service-atlas" className="ar ar--atlas" aria-label="Service atlas">
        {categories.map((c, i) => (
          <CategoryBlock
            key={c.id}
            category={c}
            state={stateOf(i)}
            reduced={reduced}
            setRef={(el) => {
              refs.current[i] = el
            }}
          />
        ))}
      </section>

      <div className="ar ar--closing">
        <div className="ar-inner ar-closing">
          <PricingRules />
          <section id="pricing-destination" className="ar-destination" aria-label={cta.label}>
            <a
              className="btn btn--primary ar-cta"
              href={cta.href}
              onClick={() => track('primary_cta_click', { cta_id: 'pricing-free-discovery-call' })}
            >
              {cta.label}
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M3 10h13M11 5l5 5-5 5" />
              </svg>
            </a>
          </section>
        </div>
      </div>
    </>
  )
}

function PricingRules() {
  const { beforeStart } = atlasContent
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const seen = useRevealOnce(ref, 0.5)
  return (
    <aside
      id="pricing-rules"
      ref={ref}
      className={`ar-rules${seen && !reduced ? ' is-pulsed' : ''}`}
      aria-labelledby="ar-rules-title"
    >
      <span className="ar-rules__icon">
        <img src={beforeStart.icon} width={56} height={56} alt="" />
      </span>
      <div>
        <p className="ar-eyebrow ar-eyebrow--plain">{beforeStart.eyebrow}</p>
        <h2 id="ar-rules-title" className="ar-title ar-title--rules">
          {beforeStart.title}
        </h2>
        <p className="ar-rules__text">{beforeStart.exclusion}</p>
      </div>
    </aside>
  )
}

interface BlockProps {
  category: Category
  state: SpyState
  reduced: boolean
  setRef: (el: HTMLElement | null) => void
}

function CategoryBlock({ category: c, state, reduced, setRef }: BlockProps) {
  const rowsRef = useRef<HTMLUListElement>(null)
  const entered = useRevealOnce(rowsRef, 0.2)
  const drawn = reduced || entered || state !== 'upcoming'
  const titleId = `category-${c.id}-title`
  return (
    <section
      id={`category-${c.id}`}
      ref={setRef}
      className={`ar-cat is-${state}${drawn ? ' is-drawn' : ''}`}
      aria-labelledby={titleId}
    >
      <div className="ar-spine" aria-hidden="true">
        <span className="ar-spine__line" />
        <span className="ar-spine__cp">{c.number}</span>
      </div>
      <header className="ar-cat__head">
        <img src={c.icon} width={48} height={48} alt="" />
        <div>
          <p className="ar-cat__num">{c.number}</p>
          <h2 id={titleId} className="ar-cat__title">
            {c.name}
          </h2>
        </div>
      </header>
      <ul ref={rowsRef} className="ar-pkgs">
        {c.packages.map((p, i) => (
          <PackageRow key={p.id} pkg={p} index={i} />
        ))}
      </ul>
    </section>
  )
}

function PackageRow({ pkg: p, index }: { pkg: CategoryPackage; index: number }) {
  const detail = 'detail' in p ? p.detail : ''
  const monthly = 'monthly' in p ? p.monthly : ''
  return (
    <li className="ar-pkg" style={{ '--i': index } as React.CSSProperties}>
      <h3 className="ar-pkg__name">
        {p.name}
        {detail && <span className="ar-pkg__detail">{detail}</span>}
      </h3>
      <p className="ar-pkg__price">
        <span className="ar-pkg__amount">{p.price}</span>
        {monthly && <span className="ar-pkg__amount ar-pkg__amount--monthly">{monthly}</span>}
        {p.billing !== p.price && <span className="ar-pkg__billing">{p.billing}</span>}
      </p>
      {p.includes && <p className="ar-pkg__includes">{p.includes}</p>}
      <a
        className="ar-pkg__link"
        href={p.href}
        onClick={() => track('package_select', { package_id: p.id, source: 'services-pricing' })}
      >
        View details<span className="sr-only"> about {p.name}</span>
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path d="M3 10h13M11 5l5 5-5 5" />
        </svg>
      </a>
    </li>
  )
}
