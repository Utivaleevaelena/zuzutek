/** Copy: 03-build-kits/C01-C04-route-brief-launch/content.json. Facts/fields strategy-approved, headings/labels visual-approved, supporting copy design-approved-draft, privacy consent legal-draft-not-approved. Verbatim, except: per owner request (Elena, 2026-10-30) only `workEmail` (plus the privacy consent) is required; the other fields are optional. */
export const consultationContent = {
  "c01": {
    "id": "consultation-hero",
    "eyebrow": "FREE AUTOMATION FIT CALL",
    "title": "START WITH ONE PROCESS.",
    "body": "Tell us what is slowing your team down. We’ll use it to check fit for a free 30-minute discovery call, then follow up by email.",
    "qualifier": "A fit/no-fit conversation — not an implementation session.",
    "primaryCta": {
      "label": "Start the request",
      "href": "#consultation-form"
    },
    "facts": [
      "30 MINUTES",
      "FIT / NO-FIT",
      "FOLLOW-UP BY EMAIL"
    ]
  },
  "c02": {
    "id": "what-to-bring",
    "eyebrow": "WHAT TO BRING",
    "title": "THREE POINTS FOR THE ROUTE.",
    "items": [
      {
        "number": "01",
        "title": "THE SLOW PROCESS",
        "body": "Describe the repetitive work that takes time."
      },
      {
        "number": "02",
        "title": "THE TOOLS INVOLVED",
        "body": "Share the tools, systems or files in the workflow."
      },
      {
        "number": "03",
        "title": "THE BETTER OUTCOME",
        "body": "Tell us what a better outcome would look like."
      }
    ],
    "cta": {
      "label": "Continue to the form",
      "href": "#consultation-form"
    }
  },
  "c03": {
    "id": "consultation-form",
    "eyebrow": "ROUTE BRIEF",
    "title": "TELL US WHERE THE PROCESS SLOWS DOWN.",
    "groups": [
      {
        "id": "about-you",
        "legend": "ABOUT YOU",
        "fields": [
          {
            "id": "name",
            "name": "name",
            "label": "Name",
            "type": "text",
            "required": false,
            "autocomplete": "name"
          },
          {
            "id": "work-email",
            "name": "workEmail",
            "label": "Work email",
            "type": "email",
            "required": true,
            "autocomplete": "email"
          },
          {
            "id": "company-name",
            "name": "companyName",
            "label": "Company name",
            "type": "text",
            "required": false,
            "autocomplete": "organization"
          },
          {
            "id": "website",
            "name": "website",
            "label": "Website",
            "type": "url",
            "required": false,
            "autocomplete": "url"
          }
        ]
      },
      {
        "id": "about-workflow",
        "legend": "ABOUT THE WORKFLOW",
        "fields": [
          {
            "id": "slow-process",
            "name": "slowProcess",
            "label": "What repetitive process is slowing your team down?",
            "type": "textarea",
            "required": false,
            "hint": "A short plain-language description is enough."
          },
          {
            "id": "tools-involved",
            "name": "toolsInvolved",
            "label": "Which tools are involved?",
            "type": "textarea",
            "required": false,
            "hint": "For example: email, spreadsheets, CRM or shared files."
          },
          {
            "id": "better-outcome",
            "name": "betterOutcome",
            "label": "What would a better outcome look like?",
            "type": "textarea",
            "required": false,
            "hint": "Tell us what should become clearer, faster or more reliable."
          }
        ]
      }
    ],
    "requiredLabel": "Required",
    "optionalLabel": "Optional",
    "submitLabel": "Submit request",
    "pendingLabel": "Sending your request…",
    "deliveryError": "We couldn’t send your request. Your information is still here — please try again.",
    "deliveryNotConfigured": "Online delivery is not connected yet. Your information is still here.",
    "successLabel": "Request received. We’ll continue by email."
  },
  "c04": {
    "id": "privacy-control",
    "eyebrow": "PRIVACY & CONTROL",
    "consentLabel": "I agree that ZuzuTek may use this information to review fit and continue the conversation by email.",
    "privacyLink": {
      "label": "Read the Privacy Policy",
      "href": "/privacy"
    },
    "warning": "Do not include passwords, API keys, one-time codes or payment details."
  },
  "pilotMessages": [
    {
      "id": "pilot-message-01",
      "label": "PILOT MESSAGE 01",
      "text": "SUBMIT THE FORM."
    },
    {
      "id": "pilot-message-02",
      "label": "PILOT MESSAGE 02",
      "text": "LAUNCH YOUR ROCKET."
    }
  ]
} as const
