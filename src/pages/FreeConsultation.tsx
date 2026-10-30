import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import '../consultation.css'
import { track } from '../analytics.ts'
import { consultationContent } from '../consultation/content.ts'
import { useMarkerProgress, useSceneMotion } from '../consultation/hooks.ts'
import {
  ArrowIcon,
  ClockIcon,
  DocumentIcon,
  GearIcon,
  MailIcon,
  OutcomeIcon,
  ToolsIcon,
} from '../consultation/icons.tsx'
import { FIELD_WHISPERS, READY_WHISPER } from '../consultation/whispers.ts'
import { RouteBriefForm, type FormPhase, type SceneSignal } from '../consultation/RouteBriefForm.tsx'
import { useMediaQuery, useReducedMotion } from '../workflow/hooks.ts'
import { sitePath } from '../sitePaths.ts'

const TITLE = 'Free Automation Fit Call — ZuzuTek'
const SOURCE = 'free-consultation'
const ASSETS = '/assets/route-brief-launch'

const FACT_ICONS = [ClockIcon, GearIcon, MailIcon]
const MARKER_ICONS = [DocumentIcon, ToolsIcon, OutcomeIcon]
const MARKER_STAGGER_MS = 180

type SceneState = 'idle' | 'active' | 'ready' | 'pending' | 'success'

/** /free-consultation — C01 hero, C02 what to bring, C03 Route Brief form, C04 privacy & control. */
export function FreeConsultation() {
  const { c01, c02, c03, pilotMessages } = consultationContent
  const reduced = useReducedMotion()
  const lowLandscape = useMediaQuery('(max-height: 520px) and (orientation: landscape)')
  const [signal, setSignal] = useState<{ active: boolean; valid: boolean; phase: FormPhase }>({
    active: false,
    valid: false,
    phase: 'idle',
  })
  const sceneRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLElement>(null)
  const { seen, instant, setRef } = useMarkerProgress(c02.items.length, formRef)

  useEffect(() => {
    const previous = document.title
    document.title = TITLE
    return () => {
      document.title = previous
    }
  }, [])

  const [whisper, setWhisper] = useState<{
    key: number
    text: string
    x: number
    y: number
    rise: number
  } | null>(null)
  const lastStep = useRef('')
  const wasValid = useRef(false)

  const lastSay = useRef(0)
  const phaseRef = useRef<FormPhase>('idle')
  const idleIndex = useRef(-1)

  // A phrase starts at the rocket (or just above the bottom edge of the screen while the rocket is still below it)
  // and travels up the page like an incoming signal.
  const say = useCallback((text: string) => {
    lastSay.current = Date.now()
    const rocket = sceneRef.current?.querySelector('.cb-rocket')?.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const header = 72
    const half = Math.min(144, (vw - 32) / 2)
    const cx = rocket ? rocket.left + rocket.width / 2 : vw / 2
    const x = Math.min(vw - 16 - half, Math.max(16 + half, cx))
    const nose = rocket ? rocket.top + rocket.height * 0.04 : vh
    const y = nose > vh - 8 ? vh - 140 : Math.max(header + 120, nose)
    const rise = Math.min(vh * 0.85, Math.max(120, y - (header + 24)))
    setWhisper((prev) => ({ key: (prev?.key ?? 0) + 1, text, x, y, rise }))
  }, [])

  // Idle signals: when the person stays still for more than a second (no scroll, pointer, key or focus change),
  // a phrase flies out; while they stay still it repeats every 15 s. Never while a request is pending.
  useEffect(() => {
    const SIGNAL_MS = 6500
    const REPEAT_MS = 15000
    let timer = 0
    const schedule = (ms: number) => {
      window.clearTimeout(timer)
      timer = window.setTimeout(fire, ms)
    }
    function fire() {
      if (document.hidden || phaseRef.current !== 'idle') return schedule(1000)
      const wait = SIGNAL_MS - (Date.now() - lastSay.current)
      if (wait > 0) return schedule(wait + 1000)
      const pool = wasValid.current ? [READY_WHISPER] : Object.values(FIELD_WHISPERS)
      idleIndex.current = (idleIndex.current + 1) % pool.length
      say(pool[idleIndex.current])
      schedule(REPEAT_MS)
    }
    const activity = () => schedule(1000)
    const events = ['scroll', 'wheel', 'pointermove', 'pointerdown', 'keydown', 'focusin', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, activity, { passive: true }))
    schedule(1000)
    return () => {
      window.clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, activity))
    }
  }, [say])

  const onScene = ({ step, ...next }: SceneSignal) => {
    setSignal((prev) => ({ ...prev, ...next }))
    if (next.phase) phaseRef.current = next.phase
    // A floating phrase when the person moves to a new field, and one when the form becomes ready.
    if (next.valid !== undefined) {
      if (next.valid && !wasValid.current) say(READY_WHISPER)
      wasValid.current = next.valid
    }
    if (step && step !== lastStep.current && FIELD_WHISPERS[step]) {
      lastStep.current = step
      if (!wasValid.current) say(FIELD_WHISPERS[step])
    }
  }

  // The smoke builds up as the page is scrolled (bounded, never pinned); off for reduced motion / low landscape.
  useSceneMotion(sceneRef, reduced || lowLandscape)

  const state: SceneState =
    signal.phase === 'success'
      ? 'success'
      : signal.phase === 'pending'
        ? 'pending'
        : signal.valid
          ? 'ready'
          : signal.active
            ? 'active'
            : 'idle'

  const cta = (id: string) => () => track('primary_cta_click', { cta_id: id, source: SOURCE })

  return (
    <div className={`cb${reduced ? ' is-reduced' : ''}`} data-state={state}>
      <picture className="cb-env" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={sitePath(`${ASSETS}/launch-environment-mobile-v01.webp`)} width={941} height={1672} />
        <img
          src={sitePath(`${ASSETS}/launch-environment-desktop-v01.webp`)}
          width={1586}
          height={992}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="cb-stage">
        <section id={c01.id} className="cb-hero" aria-labelledby="cb-hero-title">
          <p className="cb-eyebrow cb-rise" style={{ '--r': 0 } as CSSProperties}>
            {c01.eyebrow}
          </p>
          <h1 id="cb-hero-title" className="cb-title cb-rise" style={{ '--r': 1 } as CSSProperties}>
            {c01.title}
          </h1>
          <p className="cb-lead cb-rise" style={{ '--r': 2 } as CSSProperties}>
            {c01.body}
          </p>
          <p className="cb-qualifier cb-rise" style={{ '--r': 3 } as CSSProperties}>
            {c01.qualifier}
          </p>
          <a
            className="btn btn--primary cb-cta cb-rise"
            style={{ '--r': 4 } as CSSProperties}
            href={sitePath(c01.primaryCta.href)}
            onClick={cta('consultation-start-request')}
          >
            {c01.primaryCta.label}
            <ArrowIcon />
          </a>
          <ul className="cb-facts cb-rise" style={{ '--r': 5 } as CSSProperties} aria-label="About the call">
            {c01.facts.map((fact, i) => {
              const Icon = FACT_ICONS[i]
              return (
                <li key={fact}>
                  <span className="cb-fact__icon">
                    <Icon />
                  </span>
                  {fact}
                </li>
              )
            })}
          </ul>
        </section>

        <section id={c02.id} className="cb-bring" aria-labelledby="cb-bring-title">
          <p className="cb-eyebrow">{c02.eyebrow}</p>
          <h2 id="cb-bring-title" className="cb-bring__title">
            {c02.title}
          </h2>
          <ol className="cb-markers">
            {c02.items.map((item, i) => {
              const Icon = MARKER_ICONS[i]
              const on = reduced || seen >= i
              const now = reduced || instant[i]
              return (
                <li
                  key={item.number}
                  ref={setRef(i)}
                  className={`cb-marker${on ? ' is-on' : ''}${now ? ' is-instant' : ''}`}
                  style={{ '--d': `${now ? 0 : i * MARKER_STAGGER_MS}ms` } as CSSProperties}
                >
                  <span className="cb-marker__node" aria-hidden="true" />
                  <span className="cb-marker__icon">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="cb-marker__title">
                      <span className="sr-only">{item.number}. </span>
                      {item.title}
                    </h3>
                    <p className="cb-marker__body">{item.body}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <a className="cb-link" href={sitePath(c02.cta.href)} onClick={cta('consultation-continue-to-form')}>
            {c02.cta.label}
            <ArrowIcon />
          </a>
        </section>

        <div ref={sceneRef} className="cb-scene">
          <div className="cb-lift">
            <div className="cb-art" aria-hidden="true">
              <img className="cb-smoke cb-smoke--back" src={sitePath(`${ASSETS}/smoke-back-v01.webp`)} width={2048} height={768} alt="" />
              <div className="cb-rocket">
                <img className="cb-plume" src={sitePath(`${ASSETS}/plume-v01.webp`)} width={1024} height={1536} alt="" />
                <img className="cb-rocket__body" src={sitePath(`${ASSETS}/rocket-cutout-v01.webp`)} width={1024} height={1536} alt="" />
              </div>
              <img className="cb-smoke cb-smoke--mid" src={sitePath(`${ASSETS}/smoke-back-v01.webp`)} width={2048} height={768} alt="" />
              <img className="cb-smoke cb-smoke--front" src={sitePath(`${ASSETS}/smoke-front-v01.webp`)} width={1774} height={887} alt="" />
            </div>
          </div>
        </div>

        <div className="cb-pilotlayer">
          <div className="cb-pilotstick">
              <div className="cb-pilot">
                {pilotMessages.map((m, i) => {
                  const shown = i === 0 ? signal.active : signal.valid
                  return (
                    <p key={m.id} className={`cb-pilot__msg cb-pilot__msg--${i + 1}${shown ? ' is-shown' : ''}`} hidden={!shown}>
                      <span className="cb-pilot__label">{m.label}</span>
                      <span className="cb-pilot__text">{m.text}</span>
                    </p>
                  )
                })}
              </div>
          </div>
        </div>

        <section id="consultation-form" ref={formRef} className="cb-formwrap" aria-labelledby="cb-form-title">
          <p className="cb-eyebrow cb-eyebrow--dark">{c03.eyebrow}</p>
          <h2 id="cb-form-title" className="cb-form-title">
            {c03.title}
          </h2>
          <RouteBriefForm onScene={onScene} />
        </section>
      </div>
      {whisper && (
        <p
          key={whisper.key}
          className="cb-whisper"
          aria-hidden="true"
          style={{ left: whisper.x, top: whisper.y, '--rise': `${Math.round(whisper.rise)}px` } as CSSProperties}
        >
          <span className="cb-whisper__ring" />
          {whisper.text}
        </p>
      )}
    </div>
  )
}
