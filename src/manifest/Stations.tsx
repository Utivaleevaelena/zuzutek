import type { CSSProperties } from 'react'
import { useItemProgress } from './hooks.ts'
import { sitePath } from '../sitePaths.ts'

export interface Station {
  id: string
  title: string
  body: string
  icon: string
}

interface Props {
  items: readonly Station[]
  label: string
  variant: 'deliver' | 'checkpoint'
  /** Wide layout: the whole row plays as one plate sequence. Narrow layout: each item activates as it enters. */
  wide: boolean
  plateDone: boolean
  /** Every later plate was reached, so this one is complete even in the narrow layout. */
  skipped: boolean
  /** Reached by a jump or already passed: complete at once, no stagger. */
  instant: boolean
  reduced: boolean
  /** One shared sequence step in ms, and the delay of the segment/ring inside it. */
  stepMs: number
}

/** Ordered route stations: S03 (five deliverables) and S06 (three human checkpoints). Cards are not interactive. */
export function Stations({ items, label, variant, wide, plateDone, skipped, instant, reduced, stepMs }: Props) {
  const { seen, setRef } = useItemProgress(items.length)
  const on = (i: number) => reduced || skipped || (wide ? plateDone : i <= seen)
  const cls = `cm-stations cm-stations--${variant}${wide ? ' is-wide' : ''}${instant || skipped ? ' is-instant' : ''}`

  return (
    <ol className={cls} aria-label={label}>
      {items.map((it, i) => {
        const last = i === items.length - 1
        return (
          <li
            key={it.id}
            ref={setRef(i)}
            className={`cm-cell${on(i) ? ' is-on' : ''}${last ? ' is-last' : ''}`}
            style={{ '--d': `${wide && !instant && !skipped ? i * stepMs : 0}ms` } as CSSProperties}
          >
            <div className="cm-route" aria-hidden="true">
              <span className="cm-ring" />
              <span className="cm-seg" />
            </div>
            <article className="cm-card">
              <img className="cm-card__icon" src={sitePath(it.icon)} width={48} height={48} alt="" />
              <div>
                <h3 className="cm-card__title">{it.title}</h3>
                <p className="cm-card__body">{it.body}</p>
              </div>
            </article>
          </li>
        )
      })}
      {variant === 'checkpoint' && (
        <li className="cm-track" aria-hidden="true">
          <span className="cm-marker" />
        </li>
      )}
    </ol>
  )
}
