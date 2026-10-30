/** Copy: 03-build-kits/S03-S05-S06-control-manifest/content.json (headings/labels visual-approved, supporting copy design-approved-draft). Verbatim; icon names resolved to runtime paths. */
export const manifestContent = {
  "s03": {
    "id": "deliverables",
    "eyebrow": "WHAT YOU RECEIVE",
    "title": "A WORKING SYSTEM. NOT A BLACK BOX.",
    "deliverables": [
      {
        "id": "process-map",
        "title": "Process map",
        "body": "A clear view of how your workflow fits together.",
        "icon": "/assets/control-manifest/deliverable-process-map.svg"
      },
      {
        "id": "built-automation",
        "title": "Built automation",
        "body": "A configured solution that runs your approved workflow.",
        "icon": "/assets/control-manifest/deliverable-built-automation.svg"
      },
      {
        "id": "test-record",
        "title": "Test record",
        "body": "Evidence of what was checked before handoff.",
        "icon": "/assets/control-manifest/deliverable-test-record.svg"
      },
      {
        "id": "operating-documentation",
        "title": "Operating documentation",
        "body": "Clear guidance for running and reviewing the workflow.",
        "icon": "/assets/control-manifest/deliverable-operating-documentation.svg"
      },
      {
        "id": "handoff",
        "title": "Handoff",
        "body": "Documentation and control return to your team.",
        "icon": "/assets/control-manifest/deliverable-handoff.svg"
      }
    ],
    "primaryCta": {
      "label": "How delivery works",
      "href": "/how-it-works"
    }
  },
  "s05": {
    "id": "scope-boundaries",
    "eyebrow": "SCOPE BOUNDARIES",
    "title": "ONE SCOPE. CLEAR EDGES.",
    "zones": [
      {
        "id": "in",
        "label": "IN",
        "body": "The workflow steps and integrations agreed in the written scope."
      },
      {
        "id": "later",
        "label": "LATER",
        "body": "Useful improvements recorded for a possible next phase."
      },
      {
        "id": "out",
        "label": "OUT",
        "body": "A new workflow, tool or requirement that needs a separate re-scope."
      }
    ]
  },
  "s06": {
    "id": "human-checkpoints",
    "eyebrow": "HUMAN CHECKPOINTS",
    "title": "YOU APPROVE THE CRITICAL MOMENTS.",
    "checkpoints": [
      {
        "id": "scope-approval",
        "title": "Scope approval",
        "body": "The destination and written scope are agreed before implementation.",
        "icon": "/assets/control-manifest/checkpoint-scope-approval.svg"
      },
      {
        "id": "test-approval",
        "title": "Test approval",
        "body": "Customer- or money-sensitive actions stay behind a human checkpoint during validation.",
        "icon": "/assets/control-manifest/checkpoint-test-approval.svg"
      },
      {
        "id": "handoff-ownership",
        "title": "Handoff & ownership",
        "body": "You receive documentation and control of the working system.",
        "icon": "/assets/control-manifest/deliverable-handoff.svg"
      }
    ],
    "primaryCta": {
      "label": "See how delivery works",
      "href": "/how-it-works"
    },
    "secondaryCta": {
      "label": "Free Discovery Call",
      "href": "/free-consultation"
    }
  }
} as const

export type Deliverable = (typeof manifestContent.s03.deliverables)[number]
export type Checkpoint = (typeof manifestContent.s06.checkpoints)[number]
