import { consultationContent } from './content.ts'

export type FieldName =
  | 'name'
  | 'workEmail'
  | 'companyName'
  | 'website'
  | 'slowProcess'
  | 'toolsInvolved'
  | 'betterOutcome'

export type FieldKey = FieldName | 'consent'

export type FormValues = Record<FieldName, string> & { consent: boolean }

export interface FieldError {
  /** Stable machine reason, safe for analytics. */
  reason: 'required' | 'invalid_email' | 'invalid_url' | 'consent_required'
  message: string
}

export type FormErrors = Partial<Record<FieldKey, FieldError>>

export const emptyValues: FormValues = {
  name: '',
  workEmail: '',
  companyName: '',
  website: '',
  slowProcess: '',
  toolsInvolved: '',
  betterOutcome: '',
  consent: false,
}

/** Fields in DOM order; the first invalid one receives focus. */
export const fieldOrder: FieldKey[] = [
  'name',
  'workEmail',
  'companyName',
  'website',
  'slowProcess',
  'toolsInvolved',
  'betterOutcome',
  'consent',
]

/** Stable DOM / analytics id for each field key (from content.json), plus the consent control. */
export const fieldIds: Record<FieldKey, string> = (() => {
  const ids = { consent: 'consent' } as Record<FieldKey, string>
  for (const group of consultationContent.c03.groups) {
    for (const f of group.fields) ids[f.name as FieldName] = f.id
  }
  return ids
})()

// Functional validation microcopy (not part of the approved content.json; recorded in RESULT.md).
const MESSAGES = {
  name: 'Enter your name.',
  workEmail: 'Enter your work email.',
  workEmailFormat: 'Enter a valid email address, for example name@company.com.',
  companyName: 'Enter your company name.',
  websiteFormat: 'Enter a valid website address, for example https://company.com.',
  slowProcess: 'Describe the repetitive process.',
  betterOutcome: 'Describe what a better outcome would look like.',
  consent: 'Please agree to continue.',
} as const

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validUrl(value: string) {
  for (const candidate of [value, `https://${value}`]) {
    try {
      const url = new URL(candidate)
      if ((url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.')) return true
    } catch {
      /* try the next candidate */
    }
  }
  return false
}

export function validateField(key: FieldKey, values: FormValues): FieldError | undefined {
  switch (key) {
    case 'workEmail': {
      const v = values.workEmail.trim()
      if (!v) return { reason: 'required', message: MESSAGES.workEmail }
      return EMAIL.test(v) ? undefined : { reason: 'invalid_email', message: MESSAGES.workEmailFormat }
    }
    case 'website': {
      const v = values.website.trim()
      return !v || validUrl(v) ? undefined : { reason: 'invalid_url', message: MESSAGES.websiteFormat }
    }
    case 'consent':
      return values.consent ? undefined : { reason: 'consent_required', message: MESSAGES.consent }
    default:
      return undefined
  }
}

export function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const key of fieldOrder) {
    const error = validateField(key, values)
    if (error) errors[key] = error
  }
  return errors
}

export const isValid = (values: FormValues) => Object.keys(validate(values)).length === 0
