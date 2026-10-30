import type { CSSProperties } from 'react'
import { workflowContent, NODE_ORDER, type Layout, type NodeId } from './data.ts'
import { NODE_ICONS, CheckIcon } from './icons.tsx'

export const pct = (v: number, total: number) => `${(v / total) * 100}%`

export const nodeLabel = (id: NodeId) => workflowContent.nodes[NODE_ORDER.indexOf(id)]

interface NodeProps {
  id: NodeId
  layout: Layout
  className?: string
  /** CSS delay (seconds) of the H02 notification loop for this node. */
  loopDelay?: number
}

export function ProcessNode({ id, layout, className = '', loopDelay }: NodeProps) {
  const Icon = NODE_ICONS[id]
  const { x, y } = layout.nodes[id]
  const style: CSSProperties & Record<string, string> = {
    left: pct(x, layout.w),
    top: pct(y, layout.h),
  }
  if (loopDelay !== undefined) style['--t'] = `${loopDelay}s`
  return (
    <li className={`wf-node ${className}`} style={style} data-node={id}>
      <span className="wf-node__icon">
        <Icon />
        {loopDelay !== undefined && (
          <>
            <span className="wf-ring wf-loop" aria-hidden="true" />
            <span className="wf-badge wf-loop" aria-hidden="true" />
          </>
        )}
        <span className="wf-confirm" aria-hidden="true" />
      </span>
      <span className="wf-node__label">{nodeLabel(id)}</span>
    </li>
  )
}

interface OutcomeProps {
  layout: Layout
  label: string
  done: boolean
}

export function OutcomeNode({ layout, label, done }: OutcomeProps) {
  return (
    <li
      className={`wf-node wf-outcome${done ? ' is-done' : ''}`}
      style={{ left: pct(layout.outcome.x, layout.w), top: pct(layout.outcome.y, layout.h) }}
      data-node="outcome"
    >
      <span className="wf-node__icon">
        <CheckIcon />
      </span>
      <span className="wf-node__label">{label}</span>
      <span className="wf-rays" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </li>
  )
}
