import type { StageId } from './content.ts'

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const

const Mountain = () => (
  <svg {...base}>
    <path d="m2.5 19 6-11 4 7 2.5-4 6.5 8z" />
    <path d="m6.5 12 2 2 1.5-2" />
  </svg>
)
const Waves = () => (
  <svg {...base}>
    <path d="M2.5 8c2.5-2 4.5 2 7 0s4.5 2 7 0 3.5 1 5 0M2.5 13c2.5-2 4.5 2 7 0s4.5 2 7 0 3.5 1 5 0M2.5 18c2.5-2 4.5 2 7 0s4.5 2 7 0 3.5 1 5 0" />
  </svg>
)
const Peaks = () => (
  <svg {...base}>
    <path d="m2.5 19 5.5-10 3 5 3-6 7.5 11z" />
    <path d="M14 8V3.5l3 1.2-3 1.2" />
  </svg>
)
const Globe = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  </svg>
)
export const STAGE_ICONS: Record<StageId, () => React.ReactElement> = {
  define: Mountain,
  map: Waves,
  'build-test': Peaks,
  handoff: Globe,
}

export const ArrowRight = () => (
  <svg {...base}>
    <path d="M4 12h15m-5-5 5 5-5 5" />
  </svg>
)
export const DocIcon = () => (
  <svg {...base}>
    <path d="M6 3.5h8l4 4v13H6z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
  </svg>
)
export const LayersIcon = () => (
  <svg {...base}>
    <path d="m12 3.5 9 5-9 5-9-5zM3 13l9 5 9-5" />
  </svg>
)
export const RingIcon = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
)
export const FOOTER_ICONS: Record<StageId, () => React.ReactElement> = {
  define: DocIcon,
  map: Waves,
  'build-test': LayersIcon,
  handoff: RingIcon,
}
