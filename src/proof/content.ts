/** Copy: 03-build-kits/H07-proof-atlas/content.json (the `h07` block). Headline/body are design-approved-draft; case material is owner-approved. Statuses and disclosures are mandatory live text. Verbatim. */
export const proofContent = {
  "h07": {
    "id": "proof-atlas",
    "eyebrow": "FIELD EVIDENCE / 07 CASES",
    "title": "REAL SYSTEMS. REAL DECISIONS.",
    "body": "Across products, services, events and hospitality, we turn complex journeys into clear digital tools.",
    "cases": [
      {
        "number": "01",
        "name": "Offerbuch",
        "category": "SALES AUTOMATION / INTERACTIVE PROPOSAL",
        "evidence": "Scope changes. The quote changes with it.",
        "status": "INTERFACE TESTED",
        "disclosure": "Submission not verified. Client identity and commercial prices redacted.",
        "image": "/assets/proof-atlas/case-01-offerbuch-redacted-v01.png",
        "alt": "Redacted interactive proposal interface with selectable services and a live quote summary."
      },
      {
        "number": "02",
        "name": "HERBACZAR",
        "category": "B2B LEAD EXPERIENCE",
        "evidence": "Turn product intrigue into a structured wholesale inquiry.",
        "status": "FORM UI OBSERVED",
        "disclosure": "Form delivery not verified.",
        "image": "/assets/proof-atlas/case-02-herbaczar.webp",
        "alt": "Herbaczar product education and wholesale inquiry interface."
      },
      {
        "number": "03",
        "name": "POI",
        "category": "B2B PRODUCT CATALOG",
        "evidence": "Technical products, easier to compare.",
        "status": "INTERFACE OBSERVED",
        "disclosure": "Download set incomplete in the audited source.",
        "image": "/assets/proof-atlas/case-03-poi.webp",
        "alt": "POI technical product catalog with product categories and comparison-oriented information."
      },
      {
        "number": "04",
        "name": "Strasbourg Conference",
        "category": "EVENT WEBSITE / UX PROTOTYPE",
        "evidence": "A complex program shaped into a clear registration prototype.",
        "status": "PROTOTYPE",
        "disclosure": "No active registration or payment.",
        "image": "/assets/proof-atlas/case-04-strasbourg-conference.webp",
        "alt": "Conference website prototype with program navigation and registration-oriented interface."
      },
      {
        "number": "05",
        "name": "Valéria Denisova Architecture",
        "category": "PREMIUM WEB DESIGN / MULTILINGUAL",
        "evidence": "One professional story, clear across three languages.",
        "status": "INTERFACE TESTED",
        "disclosure": "Form submission not verified. Attribution and source disclaimer must be preserved.",
        "image": "/assets/proof-atlas/case-05-valeria-denisova-architecture.webp",
        "alt": "Multilingual architecture portfolio interface with project-focused editorial layout."
      },
      {
        "number": "06",
        "name": "Sacred Sound & Spirit",
        "category": "WELLNESS WEBSITE / BOOKING UX",
        "evidence": "From a personal story to a clear booking path.",
        "status": "INTERFACE OBSERVED",
        "disclosure": "External booking completion unverified. No medical outcome claims.",
        "image": "/assets/proof-atlas/case-06-sacred-sound-spirit.webp",
        "alt": "Wellness service website with a service discovery and booking-oriented path."
      },
      {
        "number": "07",
        "name": "Budrysówka",
        "category": "HOSPITALITY / ESTIMATE + INQUIRY",
        "evidence": "Make the price and next step clear before guests enquire.",
        "status": "ESTIMATE / INQUIRY",
        "disclosure": "No instant booking or payment. Discount claim omitted.",
        "image": "/assets/proof-atlas/case-07-budrysowka.webp",
        "alt": "Hospitality website interface with stay estimate and inquiry flow."
      }
    ],
    "ctas": [
      {
        "label": "ABOUT ZUZUTEK",
        "href": "/about",
        "ctaId": "home-proof-about",
        "source": "home-proof-atlas",
        "note": "Approved destination; About page remains blocked and is not part of WEB-008."
      },
      {
        "label": "SEE HOW WE WORK",
        "href": "/how-it-works",
        "ctaId": "home-proof-how-it-works",
        "source": "home-proof-atlas"
      }
    ]
  }
} as const
