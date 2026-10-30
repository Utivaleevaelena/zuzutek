/**
 * Delivery boundary for the Route Brief form. The view only knows `submitConsultation` and its typed result.
 * Real delivery (inbox, endpoint, payload contract, consent logging) is an open P2 decision, so the current
 * adapter is explicitly not configured: it makes no network call and can never report `confirmed`.
 */
export interface ConsultationPayload {
  name: string
  workEmail: string
  companyName: string
  website: string
  slowProcess: string
  toolsInvolved: string
  betterOutcome: string
  consent: boolean
}

export type DeliveryResult =
  /** A real positive response from a real delivery endpoint. The only result that may show success. */
  | { status: 'confirmed' }
  /** No delivery layer is connected. Nothing was sent. */
  | { status: 'not_configured' }
  /** A configured endpoint failed or answered negatively. */
  | { status: 'error' }

/** True only once a separately approved real adapter replaces the stub below. Gates the pending state. */
export const deliveryConfigured: boolean = false

export async function submitConsultation(payload: ConsultationPayload): Promise<DeliveryResult> {
  void payload
  return { status: 'not_configured' }
}
