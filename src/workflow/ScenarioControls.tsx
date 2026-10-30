import type { ReactNode } from 'react'
import { workflowContent, type ScenarioId } from './data.ts'
import { ArrowIcon, ChartIcon, DocumentIcon, EmailIcon } from './icons.tsx'

const ICONS: Record<ScenarioId, () => ReactNode> = {
  'lead-follow-up': EmailIcon,
  'quotes-documents': DocumentIcon,
  'weekly-reporting': ChartIcon,
}

interface Props {
  active: ScenarioId
  onSelect: (id: ScenarioId) => void
  labelledBy: string
}

export function ScenarioControls({ active, onSelect, labelledBy }: Props) {
  return (
    <div className="wf-controls" role="group" aria-labelledby={labelledBy}>
      {workflowContent.scenarios.map((s) => {
        const Icon = ICONS[s.id]
        return (
          <button
            key={s.id}
            type="button"
            className="wf-control"
            aria-pressed={s.id === active}
            onClick={() => onSelect(s.id)}
          >
            <span className="wf-control__icon">
              <Icon />
            </span>
            <span className="wf-control__label">{s.label}</span>
            <span className="wf-control__arrow">
              <ArrowIcon />
            </span>
          </button>
        )
      })}
    </div>
  )
}
