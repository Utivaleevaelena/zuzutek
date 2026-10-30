/** Copy and routing rules: 03-build-kits/E01-404/content.json. Copy is design-approved-draft. A real HTTP 404 / server noindex is a hosting concern, not part of this task. Verbatim. */
export const notFoundContent = {
  "e01": {
    "title": "Page not found — ZuzuTek",
    "eyebrow": "PAGE NOT FOUND",
    "headline": "WE CAN’T FIND THAT PAGE.",
    "lead": "The link may be old or mistyped. Here is where to go next.",
    "primaryCta": {
      "label": "Back to home",
      "href": "/",
      "ctaId": "not-found-back-home"
    },
    "secondaryCta": {
      "label": "Free Consultation",
      "href": "/free-consultation",
      "ctaId": "not-found-free-consultation"
    },
    "more": {
      "label": "OR GO TO",
      "ariaLabel": "Other pages",
      "links": [
        {
          "label": "Services & Pricing",
          "href": "/services-pricing"
        },
        {
          "label": "AI Automation",
          "href": "/ai-automation"
        },
        {
          "label": "How It Works",
          "href": "/how-it-works"
        }
      ]
    },
    "diagram": {
      "home": "HOME",
      "unknown": "?"
    }
  },
  "routing": {
    "known": [
      "/",
      "/how-it-works",
      "/services-pricing",
      "/ai-automation",
      "/free-consultation"
    ],
    "temporaryHome": [
      "/about",
      "/privacy",
      "/thank-you"
    ],
    "notFound": [
      "/404",
      "*"
    ],
    "analyticsSource": "not-found"
  }
} as const
