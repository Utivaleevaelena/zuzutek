/** Copy: 03-build-kits/H04-W01-W05-guided-worlds/content.json (status: design-approved-draft). Verbatim. */
export const guidedContent = {
  "status": "design-approved-draft",
  "locale": "en",
  "h04": {
    "eyebrow": "HOW WE WORK",
    "title": "ONE ROUTE. FOUR DEPTHS.",
    "body": "From first conversation to full control. We turn complex work into practical automation, with you in the guide seat.",
    "cta": {
      "label": "See How It Works",
      "href": "/how-it-works"
    }
  },
  "w01": {
    "eyebrow": "HOW IT WORKS",
    "title": "One controlled route. Clear checkpoints at every stage.",
    "body": "From a 30-minute fit call to scope, mapping, build, testing and handoff, every step is visible before the next one begins.",
    "steps": [
      "Free Fit Call",
      "Written Scope & Quote",
      "Process Map",
      "Build & Test",
      "Handoff",
      "Optional Care"
    ],
    "cta": {
      "label": "Start with a Fit Call",
      "href": "/free-consultation"
    }
  },
  "stages": [
    {
      "id": "define",
      "number": "01",
      "businessLabel": "DEFINE",
      "role": "PATHFINDER",
      "homeBody": "We start with your goals, map the terrain and identify the biggest opportunities for automation.",
      "detailTitle": "Choose the right destination before building.",
      "detailBody": "We start with a 30-minute fit call to identify the bottleneck, define the outcome and confirm whether the project is a good fit.",
      "labels": [
        "FIT",
        "OUTCOME",
        "HONEST NO-FIT"
      ],
      "footerLabel": "Documentation",
      "href": "/how-it-works#stage-define",
      "nextLabel": "Next: map the workflow",
      "nextHref": "#stage-map",
      "image": "/assets/guided-worlds/01-define-pathfinder-v01.webp",
      "alt": "A ZuzuTek guide in orange points across a mountain valley while a client in gray holds a map."
    },
    {
      "id": "map",
      "number": "02",
      "businessLabel": "MAP",
      "role": "DIVE GUIDE",
      "homeBody": "We design the solution, connect the moving parts and plan the workflow — so everything fits together.",
      "detailTitle": "Make the hidden complexity visible.",
      "detailBody": "We map inputs, tools, owners, exceptions, approvals and access needs before implementation begins.",
      "labels": [
        "INPUTS",
        "TOOLS",
        "OWNERS",
        "EXCEPTIONS",
        "APPROVALS"
      ],
      "footerLabel": "Monitoring",
      "href": "/how-it-works#stage-map",
      "nextLabel": "Next: build & test",
      "nextHref": "#stage-build-test",
      "image": "/assets/guided-worlds/02-map-dive-guide-v01.webp",
      "alt": "A ZuzuTek dive guide in orange and a client in gray review a process diagram underwater."
    },
    {
      "id": "build-test",
      "number": "03",
      "businessLabel": "BUILD & TEST",
      "role": "HIGH-ALTITUDE GUIDE",
      "homeBody": "We build, test and validate with clear checkpoints — so you can see progress and stay in control.",
      "detailTitle": "Build in small stages. Test every checkpoint.",
      "detailBody": "We build in controlled stages, use real test cases, keep human approval visible and incorporate feedback before release.",
      "labels": [
        "PROTOTYPE",
        "TEST CASE",
        "HUMAN APPROVAL",
        "FEEDBACK"
      ],
      "footerLabel": "Ownership",
      "href": "/how-it-works#stage-build-test",
      "nextLabel": "Next: handoff",
      "nextHref": "#stage-handoff",
      "image": "/assets/guided-worlds/03-build-test-high-altitude-v01.webp",
      "alt": "A ZuzuTek guide in orange and a client in gray check a map together in the mountains."
    },
    {
      "id": "handoff",
      "number": "04",
      "businessLabel": "HANDOFF",
      "role": "CO-PILOT",
      "homeBody": "We transfer knowledge, hand over control and stay available for the support you need next.",
      "detailTitle": "You stay in control after launch.",
      "detailBody": "You receive documentation, a clear handoff and ownership of the working system, with defect support and optional ongoing care.",
      "labels": [
        "DOCUMENTATION",
        "OWNERSHIP",
        "MONITORING",
        "OPTIONAL CARE"
      ],
      "footerLabel": "Optional Care",
      "href": "/how-it-works#stage-handoff",
      "nextLabel": "Free Consultation",
      "nextHref": "/free-consultation",
      "image": "/assets/guided-worlds/04-handoff-copilot-v01.webp",
      "alt": "A client in gray operates the primary controls while a ZuzuTek co-pilot in orange helps navigate."
    }
  ]
} as const

export type StageId = (typeof guidedContent.stages)[number]['id']
export type Stage = (typeof guidedContent.stages)[number]

/**
 * Cream sleeve monogram position per photo, in % of the 16:9 frame (centre of the mark), and the
 * horizontal focal point used when the frame is cropped (H04 cards).
 */
export const STAGE_VISUAL: Record<StageId, { mono: { x: number; y: number; w: number; rot: number }; focus: number }> = {
  define: { mono: { x: 31, y: 73, w: 5.2, rot: -12 }, focus: 0.3 },
  map: { mono: { x: 34, y: 73, w: 5.2, rot: -18 }, focus: 0.3 },
  'build-test': { mono: { x: 30, y: 55, w: 5.2, rot: -10 }, focus: 0.3 },
  handoff: { mono: { x: 24, y: 66, w: 5.2, rot: -8 }, focus: 0.25 },
}
