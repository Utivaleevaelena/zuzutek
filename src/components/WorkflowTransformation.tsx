import { useCallback, useState } from 'react'
import '../workflow.css'
import { track } from '../analytics.ts'
import { TALL_H02, TALL_H03, WIDE, workflowContent, type ScenarioId } from '../workflow/data.ts'
import { useMediaQuery } from '../workflow/hooks.ts'
import { H02TangledWorkflow } from './H02TangledWorkflow.tsx'
import { H03ControlledWorkflow } from './H03ControlledWorkflow.tsx'

/** H02 + H03: one chapter after H01, sharing the active scenario. */
export function WorkflowTransformation() {
  const tall = useMediaQuery('(max-width: 767px)')
  const [scenario, setScenario] = useState<ScenarioId>('lead-follow-up')
  const [runKey, setRunKey] = useState(0)
  const [announcement, setAnnouncement] = useState('')

  const select = useCallback((id: ScenarioId) => {
    const s = workflowContent.scenarios.find((x) => x.id === id)!
    setScenario(id)
    setRunKey((k) => k + 1)
    setAnnouncement(`${s.label}: ${s.outcome}`)
    track('workflow_scenario_select', { scenario_id: id })
  }, [])

  return (
    <section className="wf" aria-label="Workflow transformation">
      <H02TangledWorkflow layout={tall ? TALL_H02 : WIDE} tall={tall} scenario={scenario} onSelect={select} />
      <H03ControlledWorkflow layout={tall ? TALL_H03 : WIDE} tall={tall} scenario={scenario} runKey={runKey} onSelect={select} />
      <p className="sr-only" role="status">
        {announcement}
      </p>
    </section>
  )
}
