import { useEffect } from 'react'
import '../notfound.css'
import { track } from '../analytics.ts'
import { notFoundContent } from '../notfound/content.ts'

const SOURCE = notFoundContent.routing.analyticsSource

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

/** E01: the page shown for /404 and any unknown path. Static; the requested path is never shown or tracked. */
export function NotFound() {
  const { e01 } = notFoundContent

  useEffect(() => {
    const previous = document.title
    document.title = e01.title
    // A weak client-side hint only: the real HTTP 404 and a server-side noindex are a hosting concern.
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => {
      document.title = previous
      meta.remove()
    }
  }, [e01.title])

  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="nf-inner">
        <div>
          <p className="nf-eyebrow">{e01.eyebrow}</p>
          <h1 id="nf-title" className="nf-title">
            {e01.headline}
          </h1>
          <p className="nf-lead">{e01.lead}</p>
          <div className="nf-cta">
            <a
              className="btn btn--primary nf-btn"
              href={e01.primaryCta.href}
              onClick={() => track('primary_cta_click', { cta_id: e01.primaryCta.ctaId, source: SOURCE })}
            >
              {e01.primaryCta.label}
            </a>
            <a
              className="link-arrow"
              href={e01.secondaryCta.href}
              onClick={() => track('primary_cta_click', { cta_id: e01.secondaryCta.ctaId, source: SOURCE })}
            >
              {e01.secondaryCta.label}
              <Arrow />
            </a>
          </div>
          <nav className="nf-more" aria-label={e01.more.ariaLabel}>
            <p>{e01.more.label}</p>
            <ul>
              {e01.more.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="nf-route" aria-hidden="true">
          <svg viewBox="0 0 440 256" preserveAspectRatio="xMidYMid meet" focusable="false">
            <line x1="40" y1="128" x2="240" y2="128" className="nf-route__solid" />
            <line x1="240" y1="128" x2="380" y2="128" className="nf-route__dots" />
            <circle cx="40" cy="128" r="16" className="nf-route__home" />
            <circle cx="400" cy="128" r="18" className="nf-route__unknown" />
            <text x="40" y="172" textAnchor="middle" className="nf-route__label">
              {e01.diagram.home}
            </text>
            <text x="400" y="136" textAnchor="middle" className="nf-route__q">
              {e01.diagram.unknown}
            </text>
          </svg>
        </div>
      </div>
    </section>
  )
}
