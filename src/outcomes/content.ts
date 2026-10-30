/** Copy: 03-build-kits/S04-S07-S08-S09-outcomes-pricing-faq-cta/content.json. Packages, prices and exclusions are strategy-approved; outcome labels reuse approved H02/H03 (REMINDER SENT is draft); headlines, captions and FAQ are design-approved-draft. Verbatim. */
export const outcomesContent = {
  "analyticsSource": "ai-automation-offer",
  "s04": {
    "id": "example-outcomes",
    "eyebrow": "EXAMPLE OUTCOMES",
    "title": "WHAT CAN BE AUTOMATED FIRST?",
    "note": "Examples, not promises: your first workflow is chosen on the call.",
    "cards": [
      {
        "id": "lead-follow-up",
        "title": "Lead follow-up",
        "outcome": "FOLLOW-UP SENT",
        "caption": "Replies stop depending on who remembers."
      },
      {
        "id": "quotes-documents",
        "title": "Quotes & documents",
        "outcome": "DOCUMENT READY",
        "caption": "Documents move to the next step on their own."
      },
      {
        "id": "reminders",
        "title": "Reminders",
        "outcome": "REMINDER SENT",
        "caption": "Follow-ups arrive when they are due."
      },
      {
        "id": "weekly-reporting",
        "title": "Weekly reporting",
        "outcome": "REPORT DELIVERED",
        "caption": "The report is assembled and sent for you."
      }
    ]
  },
  "s07": {
    "id": "pricing",
    "eyebrow": "PRICING AND EXCLUSIONS",
    "title": "WHAT IT COSTS. WHAT IS BILLED SEPARATELY.",
    "rows": [
      {
        "id": "ai-starter",
        "name": "AI Starter",
        "price": "$999",
        "billing": "One-time",
        "includes": "One simple workflow; standard integrations."
      },
      {
        "id": "ai-business",
        "name": "AI Business",
        "price": "$2,499",
        "billing": "One-time",
        "includes": "Up to 3 workflows; email/CRM automation."
      },
      {
        "id": "ai-advanced",
        "name": "AI Advanced",
        "price": "$5,999",
        "billing": "From",
        "includes": "Complex workflows and API integrations."
      }
    ],
    "exclusions": {
      "label": "Billed separately:",
      "body": "API consumption, third-party software licences and non-included hosting.",
      "scope": "Written scope before any work starts."
    },
    "links": [
      {
        "label": "See optional care",
        "href": "/how-it-works#optional-care",
        "ctaId": "ai-s07-optional-care"
      },
      {
        "label": "See all services & pricing",
        "href": "/services-pricing",
        "ctaId": "ai-s07-services-pricing"
      }
    ]
  },
  "s08": {
    "id": "faq",
    "eyebrow": "QUESTIONS",
    "title": "BEFORE YOU ASK.",
    "items": [
      {
        "id": "tools",
        "q": "Do I need to replace my tools?",
        "a": "No. The automation is built inside the tools you already use."
      },
      {
        "id": "fit",
        "q": "Is this right for my team?",
        "a": "A free 30-minute call checks fit. If automation is not the right move, we’ll say so."
      },
      {
        "id": "access",
        "q": "What access do you need, and when?",
        "a": "Access comes later and stays minimal. Sensitive actions need your approval."
      },
      {
        "id": "ownership",
        "q": "Who owns the result?",
        "a": "You do. You receive documentation and a handoff, and your team stays in control."
      },
      {
        "id": "communication",
        "q": "How do we communicate?",
        "a": "By email, starting after you send the request."
      }
    ]
  },
  "s09": {
    "id": "offer-cta",
    "eyebrow": "BRING ONE PROCESS",
    "title": "BRING ONE SLOW PROCESS.",
    "markers": [
      "The slow process",
      "The tools involved",
      "The better outcome"
    ],
    "primaryCta": {
      "label": "Request a Free Fit Call",
      "href": "/free-consultation",
      "ctaId": "ai-s09-free-fit-call"
    },
    "secondaryCta": {
      "label": "See how it works",
      "href": "/how-it-works",
      "ctaId": "ai-s09-how-it-works"
    }
  }
} as const
