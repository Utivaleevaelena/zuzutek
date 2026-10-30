import '../footer.css'
import { track } from '../analytics.ts'
import { footerContent } from '../footer/content.ts'
import { sitePath } from '../sitePaths.ts'

const ArrowIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

const click = (ctaId: string) => () => track('primary_cta_click', { cta_id: ctaId, source: 'footer' })

/** G02: static end-of-route footer shared by every public route. No motion; contact is the owner-confirmed email as plain text. */
export function Footer() {
  const { footer } = footerContent
  return (
    <footer className="ft">
      <div className="ft-line" aria-hidden="true" />
      <div className="ft-inner">
        <div className="ft-grid">
          <div>
            <a className="ft-logo" href={sitePath('/')} aria-label="ZuzuTek — home">
              <img src={sitePath(footer.logo.src)} width={footer.logo.width} height={footer.logo.height} alt={footer.logo.alt} loading="lazy" />
            </a>
            <p className="ft-tagline">{footer.tagline}</p>
            <a className="ft-start" href={sitePath(footer.start.href)} onClick={click(footer.start.ctaId)}>
              {footer.start.label}
              <ArrowIcon />
            </a>
          </div>
          <nav aria-label={footer.routes.ariaLabel}>
            <p className="ft-label">{footer.routes.label}</p>
            <ul className="ft-links">
              {footer.routes.links.map((l) => (
                <li key={l.href}>
                  <a href={sitePath(l.href)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={footer.legal.ariaLabel}>
            <p className="ft-label">{footer.legal.label}</p>
            <ul className="ft-links">
              {footer.legal.links.map((l) => (
                <li key={l.href}>
                  <a href={sitePath(l.href)} onClick={'ctaId' in l ? click(l.ctaId) : undefined}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="ft-copy">
          {footer.copyright} · {footer.contact}
        </p>
      </div>
    </footer>
  )
}
