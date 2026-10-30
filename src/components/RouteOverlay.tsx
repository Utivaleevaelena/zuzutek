// Adapted from 03-build-kits/H01-process-trailhead/assets/code/route-overlay.svg.
// The kit geometry was drawn for the reference hero crop; in the actual layer frame that area is
// covered by the figures, so the same five-segment route is re-plotted through the valley that opens between the parted mountains and the shifted figures
// (TASK allows route geometry to adapt). Paths stay independent (route-segment-01…05).
const SEGMENTS = [
  { id: 'route-segment-01', from: 'origin', to: 'map-workflow', d: 'M 1150 605 C 1135 575 1100 545 1080 520' },
  { id: 'route-segment-02', from: 'map-workflow', to: 'build-test', d: 'M 1080 520 C 1060 505 1050 470 1040 450' },
  { id: 'route-segment-03', from: 'build-test', to: 'human-check', d: 'M 1040 450 C 1020 430 1085 415 1070 385' },
  { id: 'route-segment-04', from: 'human-check', to: 'handoff', d: 'M 1070 385 C 1080 360 1030 350 1040 325' },
  { id: 'route-segment-05', from: 'handoff', to: 'destination', d: 'M 1040 325 C 1035 305 1025 285 1020 265' },
]

export const NODES = [
  { step: 'origin', x: 1150, y: 605, r: 11 },
  { step: 'map-workflow', x: 1080, y: 520, r: 11 },
  { step: 'build-test', x: 1040, y: 450, r: 11 },
  { step: 'human-check', x: 1070, y: 385, r: 11 },
  { step: 'handoff', x: 1040, y: 325, r: 11 },
  { step: 'destination', x: 1020, y: 265, r: 14 },
]

export function RouteOverlay() {
  return (
    <svg className="h01__route" viewBox="0 0 1586 992" fill="none" aria-hidden="true" focusable="false">
      <g stroke="var(--route-color, #FF8A00)" strokeLinecap="round" strokeLinejoin="round">
        {SEGMENTS.map((s, i) => (
          <path
            key={s.id}
            id={s.id}
            className="h01__segment"
            data-segment={i + 1}
            data-from={s.from}
            data-to={s.to}
            d={s.d}
            pathLength={1}
          />
        ))}
      </g>
      <g fill="#FFF9EE" stroke="var(--route-color, #FF8A00)" strokeWidth={4}>
        {NODES.map((n, i) => (
          <circle
            key={n.step}
            className="h01__node"
            data-node={i}
            data-step={n.step}
            cx={n.x}
            cy={n.y}
            r={n.r}
          />
        ))}
      </g>
    </svg>
  )
}
