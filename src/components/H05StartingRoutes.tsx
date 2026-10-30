import '../atlas.css'
import { atlasContent } from '../atlas/content.ts'
import { StartingRoutes } from '../atlas/StartingRoutes.tsx'
import { sitePath } from '../sitePaths.ts'

/** H05: three starting routes (Home). Shares its package component and data with SP02. */
export function H05StartingRoutes() {
  const { home, beforeStart } = atlasContent
  return (
    <section id={home.sectionId} className="ar ar--h05" aria-labelledby="ar-h05-title">
      <div className="ar-inner">
        <header className="ar-head">
          <p className="ar-eyebrow">{home.eyebrow}</p>
          <h2 id="ar-h05-title" className="ar-title">
            {home.title}
          </h2>
          <p className="ar-body">{home.body}</p>
        </header>
        <StartingRoutes source="home" />
        <p className="ar-note">
          <img src={sitePath(beforeStart.icon)} width={32} height={32} alt="" />
          <span>{beforeStart.exclusion}</span>
        </p>
      </div>
    </section>
  )
}
