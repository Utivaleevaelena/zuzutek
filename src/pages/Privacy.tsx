import { useEffect } from 'react'
import '../privacy.css'
import { track } from '../analytics.ts'
import { privacyContent } from '../privacy/content.ts'
import { sitePath } from '../sitePaths.ts'

const { p01, routing } = privacyContent

/** P01: static policy page. Copy is the owner's draft, verbatim; bracketed placeholders stay visible as marks. */
export function Privacy() {
  useEffect(() => {
    const previous = document.title
    document.title = p01.title
    // Kept out of search until a legal approver has finalised the text (owner decision P-04).
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = p01.robots
    document.head.appendChild(meta)
    return () => {
      document.title = previous
      meta.remove()
    }
  }, [])

  return (
    <section className="pv" aria-labelledby="pv-title">
      <div className="pv-inner">
        <header className="pv-top">
          <p className="pv-eyebrow">{p01.eyebrow}</p>
          <h1 id="pv-title" className="pv-title">
            {p01.headline}
          </h1>
          <p className="pv-meta">{p01.meta}</p>
          <p className="pv-draft" role="note">
            <strong>{p01.draftNote.strong}</strong> {p01.draftNote.text}
          </p>
        </header>
        <div className="pv-cols">
          <nav className="pv-toc" aria-label={p01.toc.ariaLabel}>
            <details open>
              <summary>{p01.toc.summary}</summary>
              <ol>
                {p01.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span aria-hidden="true">{s.number}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>
          <article className="pv-doc">
            {p01.sections.map((s) => (
              <section key={s.id} id={s.id} className="pv-sec" aria-labelledby={`${s.id}-title`}>
                <h2 id={`${s.id}-title`}>
                  <span aria-hidden="true">{s.number}</span>
                  {s.title}
                </h2>
                <p>
                  {s.parts.map((part, i) =>
                    typeof part === 'string' ? part : <mark key={i}>{part.placeholder}</mark>,
                  )}
                </p>
              </section>
            ))}
            <div className="pv-back">
              <a
                className="btn btn--primary"
                href={sitePath(p01.back.href)}
                onClick={() => track('primary_cta_click', { cta_id: p01.back.ctaId, source: routing.analyticsSource })}
              >
                {p01.back.label}
              </a>
              <p>{p01.back.note}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
