import { useRef, type CSSProperties } from 'react'
import '../closing.css'
import { closingContent } from '../closing/content.ts'
import { useOneShotReveal } from '../closing/hooks.ts'

const NODE_START_MS = 200
const NODE_STEP_MS = 180

/** H06 (Home): four human-control gates on one amber route, plus what stays with the client. */
export function H06ControlGates() {
  const { h06 } = closingContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `hc hc-h06${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`

  return (
    <section id={h06.id} ref={ref} className={cls} aria-labelledby="hc-h06-title">
      <div className="hc-inner">
        <p className="hc-eyebrow">{h06.eyebrow}</p>
        <h2 id="hc-h06-title" className="hc-title">
          {h06.title}
        </h2>
        <p className="hc-lead">{h06.lead}</p>
        <ol className="hc-route">
          {h06.steps.map((s, i) => (
            <li
              key={s.number}
              className="hc-gate"
              style={{ '--d': `${NODE_START_MS + i * NODE_STEP_MS}ms` } as CSSProperties}
            >
              <span className="hc-gate__tag">{s.tag}</span>
              <span className="hc-gate__node" aria-hidden="true">
                {s.number}
              </span>
              <h3 className="hc-gate__title">{s.title}</h3>
              <p className="hc-gate__body">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="hc-own">
          <b>{h06.ownership.label}</b>
          <ul>
            {h06.ownership.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
