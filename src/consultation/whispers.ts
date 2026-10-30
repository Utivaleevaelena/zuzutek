/**
 * Short motivating lines that float out of the rocket as the person moves through the form.
 * Owner-requested idea (Elena, 2026-10-30); wording is a design draft, not approved copy. No promises, times or claims.
 * Keys are the stable field ids from content.json.
 */
export const FIELD_WHISPERS: Record<string, string> = {
  name: 'Hello, pilot. Let’s get you started.',
  'work-email': 'Where can we reach you?',
  'company-name': 'Which crew are we flying with?',
  website: 'A website helps us see your route.',
  'slow-process': 'Tell us what slows you down. That’s the route.',
  'tools-involved': 'Great. The tools shape the route.',
  'better-outcome': 'Dream big. What should work better?',
  consent: 'One last check before launch.',
}

export const READY_WHISPER = 'Submit the form so we can take off!'
