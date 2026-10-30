import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { track } from '../analytics.ts'
import { consultationContent } from './content.ts'
import { deliveryConfigured, submitConsultation } from './delivery.ts'
import { ArrowIcon } from './icons.tsx'
import {
  emptyValues,
  fieldIds,
  fieldOrder,
  isValid,
  validate,
  validateField,
  type FieldKey,
  type FieldName,
  type FormErrors,
  type FormValues,
} from './validation.ts'

export type FormPhase = 'idle' | 'pending' | 'success'

export interface SceneSignal {
  /** Id of the field the person just moved into (drives the floating phrases). */
  step?: string
  active?: boolean
  valid?: boolean
  phase?: FormPhase
}

const THANK_YOU_ROUTE = '/thank-you'
const LIFT_OFF_MS = 1100

type Field = {
  id: string
  name: string
  label: string
  type: string
  required: boolean
  autocomplete?: string
  hint?: string
}

const { c03, c04 } = consultationContent

/** C03 form + C04 privacy/control. All copy, labels, hints, errors and status are live HTML. */
export function RouteBriefForm({ onScene }: { onScene: (signal: SceneSignal) => void }) {
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [phase, setPhase] = useState<FormPhase>('idle')
  const [general, setGeneral] = useState<{ message: string; tick: number } | null>(null)
  const started = useRef(false)
  const controls = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({})
  const generalRef = useRef<HTMLDivElement>(null)

  // A general error takes focus once it has rendered (no state is set here).
  useEffect(() => {
    if (general) generalRef.current?.focus()
  }, [general])

  const busy = phase === 'pending'
  const done = phase === 'success'

  const update = (key: FieldKey, next: FormValues) => {
    setValues(next)
    // Fields that already show an error are re-checked as the person types.
    if (errors[key]) {
      const error = validateField(key, next)
      setErrors((prev) => {
        const rest = { ...prev }
        if (error) rest[key] = error
        else delete rest[key]
        return rest
      })
    }
    onScene({ valid: isValid(next) })
  }

  const onText = (key: FieldName) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update(key, { ...values, [key]: e.target.value })

  const onFocus = (e: FocusEvent<HTMLFormElement>) => {
    const step = (e.target as HTMLElement).id || undefined
    if (started.current) {
      if (step) onScene({ step })
      return
    }
    started.current = true
    track('consultation_start', { form_id: 'route-brief' })
    onScene({ active: true, step })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (busy || done) return
    const found = validate(values)
    const invalid = fieldOrder.filter((k) => found[k])
    if (invalid.length) {
      setErrors(found)
      setGeneral(null)
      for (const key of invalid) track('form_error', { reason: found[key]!.reason, field_id: fieldIds[key] })
      controls.current[invalid[0]]?.focus()
      return
    }
    setErrors({})
    setGeneral(null)
    // The pending state (and its stronger smoke / short rise) only exists when a real adapter is actually called.
    if (deliveryConfigured) {
      setPhase('pending')
      onScene({ phase: 'pending' })
    }
    const result = await submitConsultation({ ...values, consent: values.consent })
    if (result.status === 'confirmed') {
      // Dormant until a separately approved real adapter returns a positive response.
      setPhase('success')
      onScene({ phase: 'success' })
      track('consultation_submitted', { form_id: 'route-brief' })
      window.setTimeout(() => window.location.assign(THANK_YOU_ROUTE), LIFT_OFF_MS)
      return
    }
    setPhase('idle')
    onScene({ phase: 'idle' })
    const reason = result.status === 'not_configured' ? 'delivery_not_configured' : 'delivery_error'
    track('form_error', { reason })
    setGeneral({
      message: result.status === 'not_configured' ? c03.deliveryNotConfigured : c03.deliveryError,
      tick: Date.now(),
    })
  }

  const describedBy = (id: string, key: FieldKey, hint?: string) =>
    [hint ? `${id}-hint` : '', errors[key] ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined

  const renderField = (f: Field) => {
    const key = f.name as FieldName
    const error = errors[key]
    const common = {
      id: f.id,
      name: f.name,
      value: values[key],
      onChange: onText(key),
      required: f.required,
      'aria-required': f.required || undefined,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy(f.id, key, f.hint),
      ref: (el: HTMLInputElement | HTMLTextAreaElement | null) => {
        controls.current[key] = el
      },
    }
    return (
      <div key={f.id} className={`cb-field cb-field--${f.type === 'textarea' ? 'area' : 'line'}${error ? ' has-error' : ''}`}>
        <label className="cb-label" htmlFor={f.id}>
          {f.label}
          <span className="cb-flag">{f.required ? c03.requiredLabel : c03.optionalLabel}</span>
        </label>
        {f.hint && (
          <p id={`${f.id}-hint`} className="cb-hint">
            {f.hint}
          </p>
        )}
        {f.type === 'textarea' ? (
          <textarea {...common} rows={f.name === 'slowProcess' ? 5 : 4} />
        ) : (
          <input {...common} type={f.type} autoComplete={f.autocomplete} />
        )}
        {error && (
          <p id={`${f.id}-error`} className="cb-error">
            {error.message}
          </p>
        )}
      </div>
    )
  }

  const consentError = errors.consent

  return (
    <form
      className="cb-form"
      noValidate
      onSubmit={onSubmit}
      onFocus={onFocus}
      aria-busy={busy}
      aria-labelledby="cb-form-title"
    >
      {(c03.groups as readonly { id: string; legend: string; fields: readonly Field[] }[]).map((g) => (
        <fieldset key={g.id} className="cb-group">
          <legend className="cb-legend">{g.legend}</legend>
          <div className={`cb-fields cb-fields--${g.id}`}>{g.fields.map(renderField)}</div>
        </fieldset>
      ))}

      <section id={c04.id} className="cb-privacy" aria-labelledby="cb-privacy-title">
        <h3 id="cb-privacy-title" className="cb-legend">
          {c04.eyebrow}
        </h3>
        <div className={`cb-consent${consentError ? ' has-error' : ''}`}>
          <input
            id={fieldIds.consent}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', { ...values, consent: e.target.checked })}
            required
            aria-required="true"
            aria-invalid={consentError ? true : undefined}
            aria-describedby={['cb-warning', consentError ? 'consent-error' : ''].filter(Boolean).join(' ')}
            ref={(el) => {
              controls.current.consent = el
            }}
          />
          <label htmlFor={fieldIds.consent}>
            {c04.consentLabel}
            <span className="cb-flag">{c03.requiredLabel}</span>
          </label>
        </div>
        {consentError && (
          <p id="consent-error" className="cb-error">
            {consentError.message}
          </p>
        )}
        <p id="cb-warning" className="cb-warning">
          {c04.warning}
        </p>
        <a className="cb-privacy-link" href={c04.privacyLink.href}>
          {c04.privacyLink.label}
        </a>
      </section>

      <p className="cb-status" role="status" aria-live="polite">
        {busy ? c03.pendingLabel : done ? c03.successLabel : ''}
      </p>
      <div ref={generalRef} className="cb-general-error" role="alert" tabIndex={-1} hidden={!general}>
        {general?.message}
      </div>

      <button className="btn btn--primary cb-submit" type="submit" aria-disabled={busy || done} disabled={busy || done}>
        {busy ? c03.pendingLabel : c03.submitLabel}
        {!busy && <ArrowIcon />}
      </button>
    </form>
  )
}
