/** Copy: 03-build-kits/H05-H05A-SP01-SP05-route-atlas/content.json (status: design-approved-draft). Verbatim. */
export const atlasContent = {
  "status": "design-approved-draft",
  "locale": "en",
  "pricePublicationStatus": "approved-current-public-prices-usd-2026-10-29",
  "factualSource": "01-discovery/client-materials/2026-10-29-product-services-pricing.md",
  "copyRule": "Package names, prices, billing models and includes are factual. Structural headings and short navigation copy are design-approved draft and not production-final.",
  "home": {
    "eyebrow": "START WITH A CLEAR ROUTE",
    "title": "CHOOSE YOUR STARTING ROUTE.",
    "body": "Three practical ways to begin. Compare the setup model, then explore the full service atlas when you need more detail.",
    "sectionId": "starting-routes",
    "packages": [
      {
        "id": "digital-starter",
        "number": "01",
        "label": "START",
        "name": "Digital Starter",
        "price": "$999",
        "billing": "One-time setup",
        "promise": "Professional website or simple CRM setup for a growing business",
        "scopeNote": "Clear, fixed scope",
        "icon": "/assets/route-atlas/category-website-design.svg",
        "href": "/services-pricing#starting-routes",
        "primary": false
      },
      {
        "id": "ai-automation",
        "number": "02",
        "label": "MOST VERSATILE",
        "name": "AI Automation",
        "price": "$2,499",
        "billing": "One-time setup",
        "promise": "Automate repetitive work, customer follow-ups and business operations",
        "scopeNote": "Up to 3 simple workflows",
        "icon": "/assets/route-atlas/category-ai-automation.svg",
        "href": "/ai-automation",
        "primary": true
      },
      {
        "id": "ai-assistant-pro",
        "number": "03",
        "label": "GROW",
        "name": "AI Assistant Pro",
        "price": "$1,499",
        "monthly": "$249/month",
        "billing": "Setup + monthly",
        "promise": "AI assistant for inquiries, appointments and customers",
        "scopeNote": "Ongoing service",
        "icon": "/assets/route-atlas/category-ai-assistants.svg",
        "href": "/services-pricing#category-ai-assistants",
        "primary": false
      }
    ],
    "directoryTitle": "GROW",
    "directoryEyebrow": "SIX CAPABILITIES",
    "directoryBody": "Start with one route, then explore the full ZuzuTek capability set as your needs grow.",
    "directoryCta": {
      "label": "Explore All Services & Pricing",
      "href": "/services-pricing"
    }
  },
  "pricingPage": {
    "eyebrow": "SERVICE ATLAS",
    "title": "SERVICES & PRICING",
    "body": "Clear routes. Practical solutions. Transparent current prices in USD.",
    "startingRoutesTitle": "Three starting routes",
    "billingLegend": [
      {
        "id": "one-time",
        "label": "One-time"
      },
      {
        "id": "setup-monthly",
        "label": "Setup + monthly"
      },
      {
        "id": "monthly",
        "label": "Monthly"
      },
      {
        "id": "from",
        "label": "From"
      }
    ]
  },
  "categories": [
    {
      "id": "ai-automation",
      "number": "01",
      "name": "AI Business Automation",
      "icon": "/assets/route-atlas/category-ai-automation.svg",
      "packages": [
        {
          "id": "ai-starter",
          "name": "AI Starter",
          "price": "$999",
          "billing": "One-time",
          "includes": "One simple workflow; standard integrations",
          "href": "/ai-automation"
        },
        {
          "id": "ai-business",
          "name": "AI Business",
          "price": "$2,499",
          "billing": "One-time",
          "includes": "Up to 3 workflows; email/CRM automation",
          "href": "/ai-automation"
        },
        {
          "id": "ai-advanced",
          "name": "AI Advanced",
          "price": "From $5,999",
          "billing": "From",
          "includes": "Complex workflows and API integrations",
          "href": "/ai-automation"
        }
      ]
    },
    {
      "id": "ai-assistants",
      "number": "02",
      "name": "AI Assistants & Business Agents",
      "icon": "/assets/route-atlas/category-ai-assistants.svg",
      "packages": [
        {
          "id": "ai-chatbot",
          "name": "AI Chatbot",
          "price": "$499 setup",
          "monthly": "$99/month",
          "billing": "Setup + monthly",
          "includes": "Website Q&A, small knowledge base and lead capture",
          "href": "/free-consultation"
        },
        {
          "id": "ai-assistant-pro",
          "name": "AI Assistant Pro",
          "price": "$1,499 setup",
          "monthly": "$249/month",
          "billing": "Setup + monthly",
          "includes": "Scheduling, CRM integrations and more advanced capabilities",
          "href": "/free-consultation"
        },
        {
          "id": "custom-ai-agent",
          "name": "Custom AI Agent",
          "price": "From $3,999 setup",
          "monthly": "From $499/month",
          "billing": "Setup + monthly",
          "includes": "Task execution and custom advanced capabilities; final scope required",
          "href": "/free-consultation"
        }
      ]
    },
    {
      "id": "website-design",
      "number": "03",
      "name": "Website Design & Development",
      "icon": "/assets/route-atlas/category-website-design.svg",
      "packages": [
        {
          "id": "website-starter",
          "name": "Website Starter",
          "price": "$999",
          "billing": "One-time",
          "includes": "Up to 5 pages; mobile responsive",
          "href": "/free-consultation"
        },
        {
          "id": "business-website",
          "name": "Business Website",
          "price": "$2,499",
          "billing": "One-time",
          "includes": "Up to 10 pages; forms; SEO basics",
          "href": "/free-consultation"
        },
        {
          "id": "smart-ai-website",
          "name": "Smart AI Website",
          "price": "$3,999",
          "billing": "One-time",
          "includes": "Website; AI chatbot; lead automation",
          "href": "/free-consultation"
        }
      ]
    },
    {
      "id": "crm-processes",
      "number": "04",
      "name": "CRM & Business Process Solutions",
      "icon": "/assets/route-atlas/category-crm-processes.svg",
      "packages": [
        {
          "id": "crm-starter",
          "name": "CRM Starter",
          "price": "$999",
          "billing": "One-time",
          "includes": "Basic CRM setup; pipeline; training",
          "href": "/free-consultation"
        },
        {
          "id": "crm-automation",
          "name": "CRM Automation",
          "price": "$2,499",
          "billing": "One-time",
          "includes": "CRM workflows; email and calendar",
          "href": "/free-consultation"
        },
        {
          "id": "custom-business-platform",
          "name": "Custom Business Platform",
          "price": "From $6,999",
          "billing": "From",
          "includes": "Custom dashboards; portals; integrations",
          "href": "/free-consultation"
        }
      ]
    },
    {
      "id": "ai-consulting",
      "number": "05",
      "name": "AI Consulting & Digital Transformation",
      "icon": "/assets/route-atlas/category-ai-consulting.svg",
      "packages": [
        {
          "id": "initial-discovery-call",
          "name": "Initial Discovery Call",
          "detail": "30 minutes",
          "price": "Free",
          "billing": "Free",
          "includes": "",
          "href": "/free-consultation"
        },
        {
          "id": "ai-strategy-session",
          "name": "AI Strategy Session",
          "detail": "90 minutes",
          "price": "$149",
          "billing": "One-time",
          "includes": "",
          "href": "/free-consultation"
        },
        {
          "id": "automation-roadmap",
          "name": "Automation Roadmap",
          "price": "$499",
          "billing": "One-time",
          "includes": "",
          "href": "/free-consultation"
        },
        {
          "id": "ai-implementation-project",
          "name": "AI Implementation Project",
          "price": "From $2,499",
          "billing": "From",
          "includes": "",
          "href": "/free-consultation"
        }
      ]
    },
    {
      "id": "maintenance-support",
      "number": "06",
      "name": "Maintenance & Support",
      "icon": "/assets/route-atlas/category-maintenance-support.svg",
      "packages": [
        {
          "id": "essential-care",
          "name": "Essential Care",
          "price": "$49/month",
          "billing": "Monthly",
          "includes": "Monitoring; basic maintenance",
          "href": "/free-consultation"
        },
        {
          "id": "business-care",
          "name": "Business Care",
          "price": "$149/month",
          "billing": "Monthly",
          "includes": "Maintenance; up to 1 hour of updates",
          "href": "/free-consultation"
        },
        {
          "id": "premium-care",
          "name": "Premium Care",
          "price": "$349/month",
          "billing": "Monthly",
          "includes": "Priority support; up to 3 hours of updates",
          "href": "/free-consultation"
        }
      ]
    }
  ],
  "beforeStart": {
    "eyebrow": "BEFORE WE START",
    "title": "CLEAR ROUTES. VISIBLE PRICES.",
    "exclusion": "These plans exclude API consumption, software licensing, and any hosting charges not specifically included in the agreement.",
    "icon": "/assets/route-atlas/before-we-start.svg"
  },
  "cta": {
    "label": "Free Discovery Call",
    "href": "/free-consultation"
  }
} as const

export type StartingPackage = (typeof atlasContent.home.packages)[number]
export type Category = (typeof atlasContent.categories)[number]
export type CategoryId = Category['id']
export type CategoryPackage = Category['packages'][number]

/** Route labels from ANIMATION-SCENARIO.md (content.json only carries START / MOST VERSATILE / GROW). */
export const ROUTE_LABELS = ['START', 'BUILD', 'GROW'] as const
