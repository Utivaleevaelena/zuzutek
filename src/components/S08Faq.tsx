import { useRef, type CSSProperties } from 'react'
import '../outcomes.css'
import { useOneShotReveal } from '../closing/hooks.ts'
import { outcomesContent } from '../outcomes/content.ts'

/** S08 (/ai-automation): native details/summary FAQ, closed by default, no height animation. */
export function S08Faq() {
  const { s08 } = outcomesContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `os os-s08${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={s08.id} ref={ref} className={cls} aria-labelledby="os-s08-title">
      <div className="os-inner">
        <p className="os-eyebrow">{s08.eyebrow}</p>
        <h2 id="os-s08-title" className="os-title">
          {s08.title}
        </h2>
        <div className="os-faq">
          {s08.items.map((it, i) => (
            <details key={it.id} style={{ '--q': i } as CSSProperties}>
              <summary>{it.q}</summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
