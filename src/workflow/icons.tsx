import type { ReactNode } from 'react'
import type { NodeId } from './data.ts'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const

export const EmailIcon = () => (
  <svg {...base}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 7 8.5 6.5L20.5 7M3.5 18l6-6m11 6-6-6" />
  </svg>
)
export const SheetIcon = () => (
  <svg {...base}>
    <rect x="4" y="4" width="16" height="16" rx="1.5" />
    <path d="M4 9.3h16M4 14.7h16M9.3 4v16M14.7 4v16" />
  </svg>
)
export const DatabaseIcon = () => (
  <svg {...base}>
    <ellipse cx="12" cy="6" rx="7" ry="2.8" />
    <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
  </svg>
)
export const DocumentIcon = () => (
  <svg {...base}>
    <path d="M6 3.5h8l4 4v13H6z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
  </svg>
)
export const PersonIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M5 20c.6-3.8 3.4-5.6 7-5.6s6.4 1.8 7 5.6" />
  </svg>
)
export const ChartIcon = () => (
  <svg {...base}>
    <path d="M5 20v-6M10 20V9M15 20v-9M20 20V5" />
  </svg>
)
export const ArrowIcon = () => (
  <svg {...base}>
    <path d="M4 12h15m-5-5 5 5-5 5" />
  </svg>
)
export const CheckIcon = () => (
  <svg {...base} strokeWidth={2.6}>
    <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
  </svg>
)

export const NODE_ICONS: Record<NodeId, () => ReactNode> = {
  email: EmailIcon,
  spreadsheet: SheetIcon,
  crm: DatabaseIcon,
  documents: DocumentIcon,
  approval: PersonIcon,
}
