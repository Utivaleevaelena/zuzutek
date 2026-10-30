/** Copy: 03-build-kits/S01-S02-S02A-offer-ladder/content.json. Packages, prices and exclusions are strategy-approved; headlines, supporting copy and fit examples are design-approved-draft. Verbatim. */
export const offerContent = {
  "s01": {
    "id": "offer",
    "eyebrow": "AI BUSINESS AUTOMATION",
    "title": "AUTOMATE ONE WORKFLOW. KEEP EVERY CHECKPOINT.",
    "lead": "Practical workflow automation inside the tools you already use, with a fixed written scope and human checkpoints.",
    "primaryCta": {
      "label": "Compare packages",
      "href": "#package-ladder",
      "ctaId": "ai-s01-compare-packages"
    },
    "secondaryCta": {
      "label": "Free Consultation",
      "href": "/free-consultation",
      "ctaId": "ai-s01-free-consultation"
    },
    "route": {
      "label": "HOW IT STAYS CONTROLLED",
      "points": [
        {
          "title": "Written scope",
          "body": "Fixed before we start"
        },
        {
          "title": "Human checkpoints",
          "body": "You approve key steps"
        },
        {
          "title": "Definition of done",
          "body": "Agreed up front"
        }
      ]
    }
  },
  "s02": {
    "id": "package-ladder",
    "eyebrow": "PACKAGES",
    "title": "THREE LEVELS. ONE CLEAR LADDER.",
    "packages": [
      {
        "id": "ai-starter",
        "level": "LEVEL 1",
        "name": "AI Starter",
        "price": "$999",
        "billing": "One-time",
        "includes": "One simple workflow; standard integrations."
      },
      {
        "id": "ai-business",
        "level": "LEVEL 2",
        "name": "AI Business",
        "price": "$2,499",
        "billing": "One-time",
        "includes": "Up to 3 workflows; email/CRM automation.",
        "badge": "PRIMARY PACKAGE"
      },
      {
        "id": "ai-advanced",
        "level": "LEVEL 3",
        "name": "AI Advanced",
        "price": "$5,999",
        "pricePrefix": "From",
        "billing": "From",
        "includes": "Complex workflows and API integrations."
      }
    ],
    "exclusions": {
      "label": "Billed separately:",
      "body": "API consumption, third-party software licences and non-included hosting."
    },
    "primaryCta": {
      "label": "Free Consultation",
      "href": "/free-consultation",
      "ctaId": "ai-s02-free-consultation"
    },
    "secondaryCta": {
      "label": "See all services & pricing",
      "href": "/services-pricing",
      "ctaId": "ai-s02-services-pricing"
    }
  },
  "s02a": {
    "id": "fit",
    "eyebrow": "GOOD FIT / NOT A FIT",
    "title": "IS THIS RIGHT FOR YOUR TEAM?",
    "good": {
      "label": "GOOD FIT",
      "items": [
        "A repeatable process your team runs again and again",
        "Access to the tools involved",
        "A clear outcome you can describe"
      ]
    },
    "no": {
      "label": "NOT A FIT",
      "items": [
        "A one-off task that never repeats",
        "No one on your side who can approve changes",
        "Needs beyond the package limits — we’ll say so honestly"
      ]
    },
    "primaryCta": {
      "label": "Free Consultation",
      "href": "/free-consultation",
      "ctaId": "ai-s02a-free-consultation"
    },
    "secondaryCta": {
      "label": "See how it works",
      "href": "/how-it-works",
      "ctaId": "ai-s02a-how-it-works"
    }
  }
} as const
