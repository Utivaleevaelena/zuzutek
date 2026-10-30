import type { CSSProperties } from 'react'
import '../outcomes.css'
import { outcomesContent } from '../outcomes/content.ts'

const Mini = () => (
  <svg className="os-mini" viewBox="0 0 220 72" aria-hidden="true" focusable="false">
    <path className="os-mini__tangle" d="M8 40 C 20 8, 34 70, 48 34 S 70 10, 82 40" />
    <path className="os-mini__gap" d="M96 36h24" />
    <path className="os-mini__line" d="M130 36h74" pathLength="1" />
    <circle className="os-mini__node" cx="204" cy="36" r="7" />
  </svg>
)

/** S04 body (the plate itself, with its spine node, lives in AiAutomation.tsx as part of the manifest route). */
export function S04Cards({ on, instant }: { on: boolean; instant: boolean }) {
  const { s04 } = outcomesContent
  return (
    <>
      <ul className={`os-cards${on ? ' is-on' : ''}${instant ? ' is-instant' : ''}`}>
        {s04.cards.map((c, i) => (
          <li key={c.id} className="os-card" style={{ '--i': i } as CSSProperties}>
            <h3>{c.title}</h3>
            <Mini />
            <span className="os-out">{c.outcome}</span>
            <p>{c.caption}</p>
          </li>
        ))}
      </ul>
      <p className="os-note">{s04.note}</p>
    </>
  )
}
