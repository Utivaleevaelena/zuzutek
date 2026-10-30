import { useEffect, useRef, type CSSProperties } from 'react'
import { track } from '../analytics.ts'
import { H02_SCHEDULE, NODE_ORDER, workflowContent, type Layout, type ScenarioId } from '../workflow/data.ts'
import { useReducedMotion, useSceneActive } from '../workflow/hooks.ts'
import { ProcessNode, pct } from '../workflow/ProcessNode.tsx'
import { ScenarioControls } from '../workflow/ScenarioControls.tsx'
import { sitePath } from '../sitePaths.ts'

interface Props {
  layout: Layout
  tall: boolean
  scenario: ScenarioId
  onSelect: (id: ScenarioId) => void
}

const delay = (s: number): CSSProperties => ({ '--t': `${s}s` }) as CSSProperties

export function H02TangledWorkflow({ layout, tall, scenario, onSelect }: Props) {
  const { h02 } = workflowContent
  const sceneRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const active = useSceneActive(sceneRef)
  const viewed = useRef(false)

  useEffect(() => {
    if (active && !viewed.current) {
      viewed.current = true
      track('workflow_h02_view')
    }
  }, [active])

  const k = tall ? 0.55 : 1
  const classes = ['wf-scene', 'wf-scene--h02', tall && 'wf-scene--tall', active && !reduced && 'is-playing', reduced && 'is-reduced']
    .filter(Boolean)
    .join(' ')

  return (
    <section className="wf-chapter wf-chapter--h02" aria-labelledby="h02-title">
      <div className="wf-chapter__copy">
        <p className="wf-eyebrow">{h02.eyebrow}</p>
        <h2 id="h02-title" className="wf-title">
          {h02.title}
        </h2>
        <p className="wf-body">{h02.body}</p>
        <span id="h02-scenarios" className="sr-only">
          Workflow scenario
        </span>
        <ScenarioControls active={scenario} onSelect={onSelect} labelledBy="h02-scenarios" />
      </div>

      <figure ref={sceneRef} className={classes}>
        <img
          className="wf-photo"
          src={sitePath('/assets/h02-h03/h02-tangled-tabletop-base-v01.webp')}
          width={1586}
          height={992}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <svg className="wf-svg" viewBox={`0 0 ${layout.w} ${layout.h}`} aria-hidden="true" focusable="false">
          <g className="wf-tangle-group">
            {layout.tangle.map((d, i) => (
              <path key={i} className="wf-tangle" d={d} />
            ))}
            {layout.tangle.map((d, i) => (
              <path key={`d${i}`} className="wf-tangle-dots" d={d} />
            ))}
          </g>
          <path
            className="wf-pulse wf-loop"
            d={layout.tangle[layout.pulsePath]}
            pathLength={1}
            style={delay(H02_SCHEDULE.pulse)}
          />
          {layout.crossings.map((c, i) => (
            <g key={i} transform={`translate(${c.x} ${c.y})`}>
              <g className={`wf-alert wf-loop${i < 2 ? ' wf-alert--static' : ''}`} style={delay(H02_SCHEDULE.crossings[i])}>
                <circle className="wf-alert__halo" r={30 * k} />
                <circle className="wf-alert__core" r={10 * k} />
              </g>
            </g>
          ))}
        </svg>
        {layout.notes.map((n) => (
          <span
            key={n.text}
            className="wf-note"
            style={{ left: pct(n.x, layout.w), top: pct(n.y, layout.h), '--rot': `${n.rot}deg` } as CSSProperties}
          >
            {n.text}
          </span>
        ))}
        <ul className="wf-nodes" aria-label="Process steps">
          {NODE_ORDER.map((id) => (
            <ProcessNode key={id} id={id} layout={layout} loopDelay={H02_SCHEDULE.nodes[id]} />
          ))}
        </ul>
      </figure>
    </section>
  )
}
