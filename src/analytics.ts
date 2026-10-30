export type AnalyticsEvent =
  | 'home_hero_view'
  | 'primary_cta_click'
  | 'secondary_cta_click'
  | 'workflow_h02_view'
  | 'workflow_h03_view'
  | 'workflow_scenario_select'
  | 'ai_automation_cta_click'
  | 'guided_worlds_h04_view'
  | 'guided_worlds_stage_select'
  | 'how_it_works_view'
  | 'how_it_works_stage_view'
  | 'how_it_works_cta_click'
  | 'pricing_view'
  | 'package_select'
  | 'pricing_category_select'
  | 'offer_view'
  | 'consultation_start'
  | 'form_error'
  | 'consultation_submitted'

/** Local hook only: dispatches a DOM CustomEvent. No provider, nothing leaves the browser. */
export function track(event: AnalyticsEvent, detail: Record<string, string> = {}) {
  window.dispatchEvent(new CustomEvent('zuzu:analytics', { detail: { event, ...detail } }))
}
