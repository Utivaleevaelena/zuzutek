/** Copy: 03-build-kits/W06-W08-boundaries-care-cta/content.json. Care packages are strategy-approved; the form warning and call line are approved reuse (C04/C01); headlines and supporting copy are design-approved-draft. Verbatim. */
export const careContent = {
  "w06": {
    "id": "access-boundaries",
    "eyebrow": "ACCESS, DATA AND APPROVAL",
    "title": "YOU DECIDE WHAT WE TOUCH.",
    "lead": "Access comes later and stays minimal. Sensitive actions need your approval.",
    "points": [
      {
        "number": "1",
        "title": "Access, later",
        "body": "We ask for access only when the build needs it, and only what it needs."
      },
      {
        "number": "2",
        "title": "Built in your tools",
        "body": "The workflow runs inside the tools you already use."
      },
      {
        "number": "3",
        "title": "Approval on sensitive actions",
        "body": "Sensitive actions wait for a person on your side to approve them."
      }
    ],
    "warning": {
      "label": "Never in the request form:",
      "body": "passwords, API keys, one-time codes or payment details."
    }
  },
  "w07": {
    "id": "optional-care",
    "eyebrow": "OPTIONAL CARE",
    "title": "IF THE PROCESS CHANGES, CARE IS THERE.",
    "lead": "Care is a separate monthly service. Choose it only if you want it.",
    "tag": "OPTIONAL · SEPARATE FROM THE PROJECT",
    "core": "Your automation",
    "packages": [
      {
        "id": "essential-care",
        "name": "Essential Care",
        "price": "$49/month",
        "includes": "Monitoring; basic maintenance"
      },
      {
        "id": "business-care",
        "name": "Business Care",
        "price": "$149/month",
        "includes": "Maintenance; up to 1 hour of updates"
      },
      {
        "id": "premium-care",
        "name": "Premium Care",
        "price": "$349/month",
        "includes": "Priority support; up to 3 hours of updates"
      }
    ],
    "link": {
      "label": "See maintenance & support pricing",
      "href": "/services-pricing#category-maintenance-support",
      "ctaId": "w07-maintenance-pricing"
    }
  },
  "w08": {
    "id": "bring-one-workflow",
    "eyebrow": "BRING ONE PROCESS",
    "title": "BRING ONE REPETITIVE WORKFLOW.",
    "lead": "We’ll check fit on a free 30-minute call, then follow up by email.",
    "primaryCta": {
      "label": "Free Consultation",
      "href": "/free-consultation",
      "ctaId": "w08-free-consultation"
    },
    "secondaryCta": {
      "label": "See AI Automation",
      "href": "/ai-automation",
      "ctaId": "w08-ai-automation"
    }
  }
} as const
