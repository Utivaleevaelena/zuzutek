import '../atlas.css'
import { atlasContent } from '../atlas/content.ts'
import { CategoryDirectory } from '../atlas/CategoryDirectory.tsx'

/** H05A: six capability anchors into /services-pricing (Home). */
export function H05ACapabilities() {
  const { home } = atlasContent
  return (
    <nav id="capabilities" className="ar ar--h05a" aria-labelledby="ar-h05a-title">
      <div className="ar-inner">
        <header className="ar-head ar-head--split">
          <div>
            <h2 id="ar-h05a-title" className="ar-title ar-title--grow">
              {home.directoryTitle}
            </h2>
            <p className="ar-eyebrow ar-eyebrow--spaced">{home.directoryEyebrow}</p>
          </div>
          <p className="ar-body">{home.directoryBody}</p>
        </header>
        <CategoryDirectory source="home" />
        <a className="ar-link" href={home.directoryCta.href}>
          {home.directoryCta.label}
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <path d="M3 10h13M11 5l5 5-5 5" />
          </svg>
        </a>
      </div>
    </nav>
  )
}
