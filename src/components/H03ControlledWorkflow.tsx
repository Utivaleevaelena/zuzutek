import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { track } from '../analytics.ts'
import {
  H03_FINAL_STEP,
  H03_NODE_STEPS,
  H03_OUTCOME_STEP,
  H03_SEGMENTS,
  H03_TIMELINE,
  NODE_ORDER,
  workflowContent,
  type Layout,
  type ScenarioId,
} from '../workflow/data.ts'
import { useReducedMotion, useSceneActive } from '../workflow/hooks.ts'
import { OutcomeNode, ProcessNode } from '../workflow/ProcessNode.tsx'
import { ArrowIcon } from '../workflow/icons.tsx'
import { ScenarioControls } from '../workflow/ScenarioControls.tsx'
import { sitePath } from '../sitePaths.ts'

interface Props {
  layout: Layout
  tall: boolean
  scenario: ScenarioId
  /** Increments on every scenario click (including re-click) to restart the sequence. */
  runKey: number
  onSelect: (id: ScenarioId) => void
}

export function H03ControlledWorkflow({ layout, tall, scenario, runKey, onSelect }: Props) {
  const { h03, scenarios } = workflowContent
  const outcome = scenarios.find((s) => s.id === scenario)!.outcome
  const sceneRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const active = useSceneActive(sceneRef)
  const viewed = useRef(false)
  // Progress is tagged with the run it belongs to, so a restart or leaving the viewport
  // falls back to idle (step 0) without resetting state inside an effect.
  const runId = `${active ? 'on' : 'off'}-${runKey}`
  const [progress, setProgress] = useState({ runId: '', step: 0 })
  const step = reduced ? H03_FINAL_STEP : progress.runId === runId ? progress.step : 0

  useEffect(() => {
    if (active && !viewed.current) {
      viewed.current = true
      track('workflow_h03_view')
    }
  }, [active])

  // One timer chain per run; cleanup cancels it, so a restart never queues behind an old run.
  useEffect(() => {
    if (reduced || !active) return
    const ids = H03_TIMELINE.map(([ms, s]) => window.setTimeout(() => setProgress({ runId, step: s }), ms))
    return () => ids.forEach(window.clearTimeout)
  }, [active, runId, reduced])

  const classes = ['wf-scene', 'wf-scene--h03', tall && 'wf-scene--tall', reduced && 'is-reduced']
    .filter(Boolean)
    .join(' ')

  return (
    <section className="wf-chapter wf-chapter--h03" aria-labelledby="h03-title">
      <div className="wf-chapter__copy">
        <p className="wf-eyebrow">{h03.eyebrow}</p>
        <h2 id="h03-title" className="wf-title">
          {h03.title}
        </h2>
        <p className="wf-body">{h03.body}</p>
        <span id="h03-scenarios" className="sr-only">
          Workflow scenario
        </span>
        <ScenarioControls active={scenario} onSelect={onSelect} labelledBy="h03-scenarios" />
        <a
          className="btn btn--primary wf-cta"
          href={sitePath(h03.cta.href)}
          onClick={() => track('ai_automation_cta_click')}
        >
          {h03.cta.label}
          <span className="wf-cta__arrow" aria-hidden="true">
            <ArrowIcon />
          </span>
        </a>
      </div>

      <figure ref={sceneRef} className={classes} data-step={step}>
        <img
          className="wf-photo"
          src={sitePath('/assets/h02-h03/h03-controlled-tabletop-base-v01.webp')}
          width={1585}
          height={992}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <svg className="wf-svg" viewBox={`0 0 ${layout.w} ${layout.h}`} aria-hidden="true" focusable="false">
          {layout.route.map((d, i) => (
            <path key={`g${i}`} className="wf-guide" d={d} />
          ))}
          {layout.route.map((d, i) => {
            const seg = H03_SEGMENTS[i]
            const style = { '--ms': `${seg.ms}ms` } as CSSProperties
            const drawn = step >= seg.startStep
            return (
              <g key={`s${i}`} className={`wf-seg${drawn ? ' is-drawn' : ''}`} style={style}>
                <path className="wf-seg__glow" d={d} pathLength={1} />
                <path className="wf-seg__line" d={d} pathLength={1} />
              </g>
            )
          })}
        </svg>
        <ol className="wf-nodes" aria-label="Controlled workflow steps">
          {NODE_ORDER.map((id, i) => {
            const on = step >= H03_NODE_STEPS[i]
            const pause = id === 'approval' && step === 5
            return (
              <ProcessNode
                key={id}
                id={id}
                layout={layout}
                className={`${on ? 'is-on' : ''}${pause ? ' is-pause' : ''}`}
              />
            )
          })}
          <OutcomeNode layout={layout} label={outcome} done={step >= H03_OUTCOME_STEP} />
        </ol>
      </figure>
    </section>
  )
}
