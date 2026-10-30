import { useRef, type CSSProperties } from 'react'
import '../care.css'
import { useOneShotReveal } from '../closing/hooks.ts'
import { careContent } from '../care/content.ts'

/** W06 (/how-it-works): where access, data and approval boundaries sit, on one amber route. */
export function W06AccessBoundaries() {
  const { w06 } = careContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `wb wb-w06${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={w06.id} ref={ref} className={cls} aria-labelledby="wb-w06-title">
      <div className="wb-inner">
        <p className="wb-eyebrow">{w06.eyebrow}</p>
        <h2 id="wb-w06-title" className="wb-title">
          {w06.title}
        </h2>
        <p className="wb-lead">{w06.lead}</p>
        <ol className="wb-route">
          {w06.points.map((p, i) => (
            <li key={p.number} style={{ '--d': `${200 + i * 180}ms` } as CSSProperties}>
              <span className="wb-node" aria-hidden="true">
                {p.number}
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
        <p className="wb-warn">
          <b>{w06.warning.label}</b> {w06.warning.body}
        </p>
      </div>
    </section>
  )
}
