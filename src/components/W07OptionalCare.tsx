import { useRef, type CSSProperties } from 'react'
import '../care.css'
import { track } from '../analytics.ts'
import { useOneShotReveal } from '../closing/hooks.ts'
import { Arrow } from '../care/Arrow.tsx'
import { careContent } from '../care/content.ts'

/** W07 (/how-it-works): optional Care as a quiet orbit around the finished automation. Static once drawn. */
export function W07OptionalCare() {
  const { w07 } = careContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `wb wb-w07${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={w07.id} ref={ref} className={cls} aria-labelledby="wb-w07-title">
      <div className="wb-inner wb-w07__cols">
        <div>
          <p className="wb-eyebrow">{w07.eyebrow}</p>
          <h2 id="wb-w07-title" className="wb-title wb-title--care">
            {w07.title}
          </h2>
          <p className="wb-lead">{w07.lead}</p>
          <span className="wb-tag">{w07.tag}</span>
          <p className="wb-linkrow">
            <a
              className="link-arrow"
              href={w07.link.href}
              onClick={() => track('how_it_works_cta_click', { cta_id: w07.link.ctaId })}
            >
              {w07.link.label}
              <Arrow />
            </a>
          </p>
        </div>
        <div className="wb-stage">
          <svg className="wb-orbits" viewBox="0 0 600 480" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <ellipse className="wb-orbit wb-orbit--outer" cx="300" cy="240" rx="270" ry="150" />
            <ellipse className="wb-orbit wb-orbit--inner" cx="300" cy="240" rx="190" ry="100" />
          </svg>
          <div className="wb-core">{w07.core}</div>
          <ol className="wb-cards" aria-label="Care options">
            {w07.packages.map((p, i) => (
              <li key={p.id} className={`wb-care wb-care--${i + 1}`} style={{ '--c': i } as CSSProperties}>
                <h3>{p.name}</h3>
                <p className="wb-care__price">{p.price}</p>
                <p className="wb-care__inc">{p.includes}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
