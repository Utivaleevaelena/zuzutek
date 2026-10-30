/** Pure scroll-progress mapping for H01. See ANIMATION-SCENARIO.md. */
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

export const rangeProgress = (global: number, start: number, end: number) =>
  clamp01((global - start) / (end - start))

export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

/** Segment i (0-based) draws in [start, start+0.08]; its checkpoint settles in the next 0.02. */
export const SEGMENT_STARTS = [0.40, 0.50, 0.60, 0.70, 0.80] as const
export const SEGMENT_LEN = 0.08
export const CHECKPOINT_LEN = 0.02

export interface H01State {
  mountain: number // 0 closed … 1 fully open
  segments: number[] // dashoffset progress 0…1 per segment
  checkpoints: number[] // 0…1 for nodes 1…5 (node 5 = destination)
  origin: number
  logo: number // sky logo reveal at the end
}

export function computeState(global: number): H01State {
  return {
    mountain: easeInOut(rangeProgress(global, 0, 0.58)),
    segments: SEGMENT_STARTS.map((s) => rangeProgress(global, s, s + SEGMENT_LEN)),
    checkpoints: SEGMENT_STARTS.map((s) =>
      rangeProgress(global, s + SEGMENT_LEN, s + SEGMENT_LEN + CHECKPOINT_LEN),
    ),
    origin: rangeProgress(global, 0.38, 0.40),
    logo: rangeProgress(global, 0.88, 0.94),
  }
}
