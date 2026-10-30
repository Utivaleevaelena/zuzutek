import type { ReactNode } from 'react'

/** Decorative, code-drawn line icons (aria-hidden). */
const Svg = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
)

export const ClockIcon = () => (
  <Svg>
    <circle cx="16" cy="16" r="11" />
    <path d="M16 9v7l4.5 3" />
  </Svg>
)

export const GearIcon = () => (
  <Svg>
    <circle cx="16" cy="16" r="4" />
    <path d="M16 4v3.5M16 24.5V28M4 16h3.5M24.5 16H28M7.5 7.5 10 10M22 22l2.5 2.5M24.5 7.5 22 10M10 22l-2.5 2.5" />
    <circle cx="16" cy="16" r="8.5" />
  </Svg>
)

export const MailIcon = () => (
  <Svg>
    <rect x="4" y="7" width="24" height="18" rx="2" />
    <path d="m5 9 11 9 11-9" />
  </Svg>
)

export const DocumentIcon = () => (
  <Svg>
    <path d="M9 4h10l6 6v18H9z" />
    <path d="M19 4v6h6M13 16h8M13 20h8M13 24h5" />
  </Svg>
)

export const ToolsIcon = () => (
  <Svg>
    <path d="M6 26 18 14M21 5a5 5 0 0 0-5 6l-1 1 5 5 1-1a5 5 0 0 0 6-5l-3 3-3-1-1-3z" />
    <path d="m6 6 6 6M26 26l-8-8" />
  </Svg>
)

export const OutcomeIcon = () => (
  <Svg>
    <path d="M5 27V17h5v10M13.5 27V11h5v16M22 27V5h5v22M3 27h26" />
  </Svg>
)

export const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)
