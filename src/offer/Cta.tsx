import { track } from '../analytics.ts'
import { sitePath } from '../sitePaths.ts'

const SOURCE = 'ai-automation-offer'

interface CtaData {
  readonly label: string
  readonly href: string
  readonly ctaId: string
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

/** Primary button + secondary text link, both tracked with the local primary_cta_click event. */
export function CtaRow({ primary, secondary }: { primary: CtaData; secondary: CtaData }) {
  const click = (c: CtaData) => () => track('primary_cta_click', { cta_id: c.ctaId, source: SOURCE })
  return (
    <div className="of-cta">
      <a className="btn btn--primary of-btn" href={sitePath(primary.href)} onClick={click(primary)}>
        {primary.label}
      </a>
      <a className="link-arrow" href={sitePath(secondary.href)} onClick={click(secondary)}>
        {secondary.label}
        <Arrow />
      </a>
    </div>
  )
}
