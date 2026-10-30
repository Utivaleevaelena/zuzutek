// Sources: H01 build-kit + approved sitemap v02 / offer-pricing addendum (2026-10-29)
export const content = {
  header: {
    navigation: [
      { label: 'Services & Pricing', href: '/services-pricing' },
      { label: 'AI Automation', href: '/ai-automation' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'About', href: '/about' },
    ],
    cta: { label: 'Free Consultation', href: '/free-consultation' },
  },
  hero: {
    eyebrow: 'PRACTICAL AI AUTOMATION',
    title: 'Navigate complexity. Automate with confidence.',
    body: 'We help service businesses turn one messy workflow into practical automation — inside the tools they already use, with clear checkpoints and your team in control.',
    primaryCta: {
      label: 'Request a Free Consultation',
      href: '/free-consultation',
      analyticsEvent: 'primary_cta_click',
    },
    secondaryCta: {
      label: 'See AI Automation',
      href: '/ai-automation',
      analyticsEvent: 'secondary_cta_click',
    },
  },
  route: {
    labels: ['MAP WORKFLOW', 'BUILD & TEST', 'HUMAN CHECK', 'HANDOFF', 'ONE WORKFLOW RUNNING'],
    accessibleSummary:
      'A five-step route from mapping one workflow through build, human review and handoff to one workflow running.',
  },
  proofStrip: ['ONE WORKFLOW', 'CURRENT TOOLS', 'HUMAN CHECKPOINTS'],
} as const
