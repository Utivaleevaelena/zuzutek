import { useRef } from 'react'
import '../care.css'
import { track } from '../analytics.ts'
import { useOneShotReveal } from '../closing/hooks.ts'
import { Arrow } from '../care/Arrow.tsx'
import { careContent } from '../care/content.ts'
import { sitePath } from '../sitePaths.ts'

/** W08 (/how-it-works): the closing step — bring one repetitive workflow to the Fit Call. */
export function W08ProcessCta() {
  const { w08 } = careContent
  const ref = useRef<HTMLElement>(null)
  const { revealed, instant } = useOneShotReveal(ref)
  const cls = `wb wb-w08${revealed ? ' is-revealed' : ''}${instant ? ' is-instant' : ''}`
  const click = (id: string) => () => track('how_it_works_cta_click', { cta_id: id })

  return (
    <section id={w08.id} ref={ref} className={cls} aria-labelledby="wb-w08-title">
      <div className="wb-inner wb-w08__row">
        <div>
          <p className="wb-eyebrow">{w08.eyebrow}</p>
          <h2 id="wb-w08-title" className="wb-title wb-title--cta">
            {w08.title}
          </h2>
          <p className="wb-lead">{w08.lead}</p>
        </div>
        <div className="wb-acts">
          <a className="btn btn--primary wb-btn" href={sitePath(w08.primaryCta.href)} onClick={click(w08.primaryCta.ctaId)}>
            {w08.primaryCta.label}
          </a>
          <a className="link-arrow" href={sitePath(w08.secondaryCta.href)} onClick={click(w08.secondaryCta.ctaId)}>
            {w08.secondaryCta.label}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  )
}
