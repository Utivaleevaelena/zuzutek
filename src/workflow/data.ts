/** Copy: 03-build-kits/H02-H03-workflow-transformation/content.json (status: design-approved-draft). */
export const workflowContent = {
  h02: {
    eyebrow: 'SEE THE HANDOFFS',
    title: 'Where does the work get tangled?',
    body: 'When leads, quotes, documents and reports move between email, spreadsheets and disconnected tools, every handoff depends on someone remembering the next step.',
    notes: ['copied again', 'waiting for reply', 'manual reminder', 'who owns the next step?'],
  },
  h03: {
    eyebrow: 'ONE CONTROLLED ROUTE',
    title: 'Turn the handoffs into a workflow your team can control.',
    body: 'We connect the steps that should move automatically and keep a person at the moments that need judgment.',
    cta: { label: 'Explore AI Automation', href: '/ai-automation' },
  },
  nodes: ['EMAIL', 'SPREADSHEET', 'CRM / TOOLS', 'DOCUMENTS', 'HUMAN APPROVAL'],
  scenarios: [
    { id: 'lead-follow-up', label: 'LEAD FOLLOW-UP', outcome: 'FOLLOW-UP SENT' },
    { id: 'quotes-documents', label: 'QUOTES & DOCUMENTS', outcome: 'DOCUMENT READY' },
    { id: 'weekly-reporting', label: 'WEEKLY REPORTING', outcome: 'REPORT DELIVERED' },
  ],
} as const

export type ScenarioId = (typeof workflowContent.scenarios)[number]['id']
export type NodeId = 'email' | 'spreadsheet' | 'crm' | 'documents' | 'approval'

/** Process order; the visible label is taken from workflowContent.nodes by index. */
export const NODE_ORDER: readonly NodeId[] = ['email', 'spreadsheet', 'crm', 'documents', 'approval']

export interface Pt {
  x: number
  y: number
}

export interface Note {
  text: string
  x: number
  y: number
  rot: number
}

export interface Layout {
  /** SVG viewBox / coordinate frame; HTML nodes are placed as percentages of it. */
  w: number
  h: number
  nodes: Record<NodeId, Pt>
  outcome: Pt
  /** H02 graphite network. */
  tangle: string[]
  /** Index into `tangle` of the path that carries the event pulse. */
  pulsePath: number
  /** H02 problem crossings, in firing order (A, B, C, D, E). */
  crossings: Pt[]
  notes: Note[]
  /** H03 route: five segments EMAIL→…→HUMAN APPROVAL→outcome. */
  route: string[]
}

/** Tablet / desktop: the frame of the two photo bases (1586×992). */
export const WIDE: Layout = {
  w: 1586,
  h: 992,
  nodes: {
    email: { x: 420, y: 250 },
    spreadsheet: { x: 540, y: 700 },
    crm: { x: 830, y: 790 },
    documents: { x: 930, y: 470 },
    approval: { x: 1000, y: 190 },
  },
  outcome: { x: 1130, y: 340 },
  tangle: [
    'M420 250 C 540 180, 720 200, 740 320 S 620 520, 780 540 S 990 400, 930 470',
    'M420 250 C 360 340, 440 470, 540 520 S 580 640, 540 700',
    'M540 700 C 660 640, 580 470, 720 420 S 920 520, 840 640 S 720 760, 830 790',
    'M830 790 C 970 770, 1070 640, 1010 560 S 870 430, 970 330 S 1090 190, 1000 190',
    'M930 470 C 1050 440, 1070 330, 1000 280 S 810 260, 770 380 S 640 470, 540 700',
    'M1000 190 C 880 130, 720 140, 660 250 S 580 380, 420 250',
    'M830 790 C 750 700, 850 580, 910 620 S 970 520, 930 470',
    'M620 360 C 540 300, 660 260, 720 330 S 840 400, 780 470 S 660 560, 640 480 S 580 400, 620 360',
    'M500 330 C 440 420, 560 460, 640 400 S 760 280, 700 220 S 560 200, 500 330',
    'M700 600 C 640 540, 760 500, 820 560 S 900 700, 780 700 S 660 690, 700 600',
    'M880 300 C 820 250, 900 180, 960 240 S 1040 360, 960 400 S 860 350, 880 300',
    'M420 250 C 650 560, 880 250, 1000 190',
    'M540 700 C 760 560, 900 640, 930 470',
    'M830 790 C 700 600, 560 640, 420 250',
  ],
  pulsePath: 0,
  // Computed intersections of the tangle paths above.
  crossings: [
    { x: 729, y: 285 },
    { x: 876, y: 529 },
    { x: 613, y: 416 },
    { x: 851, y: 622 },
    { x: 989, y: 273 },
  ],
  notes: [
    { text: 'copied again', x: 400, y: 800, rot: -6 },
    { text: 'waiting for reply', x: 690, y: 118, rot: -4 },
    { text: 'manual reminder', x: 1000, y: 650, rot: -6 },
    { text: 'who owns the next step?', x: 1090, y: 120, rot: -7 },
  ],
  route: [
    'M420 250 C 400 400, 480 560, 540 700',
    'M540 700 C 620 770, 720 800, 830 790',
    'M830 790 C 930 770, 980 640, 930 470',
    'M930 470 C 900 360, 940 260, 1000 190',
    'M1000 190 C 1070 200, 1110 260, 1130 340',
  ],
}

/** Mobile (<768px) H02: tangled map re-arranged into two columns, same five nodes. */
export const TALL_H02: Layout = {
  w: 360,
  h: 450,
  nodes: {
    email: { x: 36, y: 78 },
    spreadsheet: { x: 36, y: 316 },
    crm: { x: 120, y: 392 },
    documents: { x: 214, y: 292 },
    approval: { x: 190, y: 72 },
  },
  outcome: { x: 60, y: 400 },
  tangle: [
    'M36 78 C 90 100, 190 120, 130 190 S 60 240, 214 292',
    'M36 78 C 20 140, 70 210, 100 250 S 60 290, 36 316',
    'M36 316 C 90 280, 160 330, 120 392',
    'M120 392 C 200 370, 260 330, 214 292',
    'M214 292 C 280 240, 270 140, 190 72',
    'M190 72 C 120 60, 90 110, 140 150 S 90 200, 36 78',
    'M214 292 C 150 300, 110 260, 150 220 S 230 160, 190 72',
    'M90 150 C 40 190, 120 230, 170 200 S 200 130, 150 120 S 90 120, 90 150',
    'M150 330 C 100 340, 120 290, 180 290 S 240 340, 180 360 S 120 350, 150 330',
  ],
  pulsePath: 0,
  crossings: [
    { x: 118, y: 160 },
    { x: 150, y: 232 },
    { x: 200, y: 168 },
    { x: 96, y: 118 },
    { x: 80, y: 258 },
  ],
  notes: [
    { text: 'copied again', x: 24, y: 360, rot: -6 },
    { text: 'waiting for reply', x: 92, y: 36, rot: -3 },
    { text: 'manual reminder', x: 226, y: 340, rot: -5 },
    { text: 'who owns the next step?', x: 190, y: 28, rot: -4 },
  ],
  route: [],
}

/** Mobile (<768px) H03: the five nodes and the outcome in one vertical, ordered column. */
export const TALL_H03: Layout = {
  w: 360,
  h: 450,
  nodes: {
    email: { x: 48, y: 62 },
    spreadsheet: { x: 80, y: 124 },
    crm: { x: 48, y: 186 },
    documents: { x: 80, y: 248 },
    approval: { x: 48, y: 310 },
  },
  outcome: { x: 80, y: 372 },
  tangle: [],
  pulsePath: 0,
  crossings: [],
  notes: [],
  route: [
    'M48 62 C 48 93, 80 93, 80 124',
    'M80 124 C 80 155, 48 155, 48 186',
    'M48 186 C 48 217, 80 217, 80 248',
    'M80 248 C 80 279, 48 279, 48 310',
    'M48 310 C 48 341, 80 341, 80 372',
  ],
}

/** H02 fixed irregular loop, seconds from loop start (10.4 s). No randomness. */
export const H02_LOOP_S = 10.4
export const H02_SCHEDULE = {
  nodes: { email: 0.4, crm: 2.9, spreadsheet: 5.1, documents: 7.8 } as Partial<Record<NodeId, number>>,
  pulse: 1.0,
  crossings: [1.6, 3.6, 6.3, 8.8, 9.4],
}

/** H03 sequence: [ms from start, step]. Step 8 is the persistent success state. */
export const H03_TIMELINE: ReadonlyArray<readonly [number, number]> = [
  [500, 1],
  [1200, 2],
  [2000, 3],
  [2800, 4],
  [3700, 5],
  [4600, 6],
  [5500, 7],
  [6200, 8],
]
export const H03_FINAL_STEP = 8
/** Step at which each route segment starts drawing, and how long it takes (ms). */
export const H03_SEGMENTS: ReadonlyArray<{ startStep: number; ms: number }> = [
  { startStep: 1, ms: 700 },
  { startStep: 2, ms: 800 },
  { startStep: 3, ms: 800 },
  { startStep: 4, ms: 900 },
  { startStep: 6, ms: 900 },
]
/** Step at which each node (NODE_ORDER) is confirmed. */
export const H03_NODE_STEPS: readonly number[] = [1, 2, 3, 4, 5]
export const H03_OUTCOME_STEP = 7
