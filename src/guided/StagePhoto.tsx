import type { CSSProperties } from 'react'
import { STAGE_VISUAL, type Stage } from './content.ts'
import { sitePath } from '../sitePaths.ts'

interface Props {
  stage: Stage
  /** First visible photo loads eagerly; the rest are lazy. */
  eager?: boolean
}

/**
 * The photo is laid out as a full 16:9 frame inside a container that can be narrower (cropped by
 * `--focus`), so the exact cream monogram can be placed in frame-relative percentages.
 */
export function StagePhoto({ stage, eager = false }: Props) {
  const { mono, focus } = STAGE_VISUAL[stage.id]
  const style = { '--focus': String(focus) } as CSSProperties
  return (
    <div className="gw-photo" style={style}>
      <div className="gw-photo__frame">
        <img
          src={sitePath(stage.image)}
          width={1600}
          height={900}
          alt={stage.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <img
          className="gw-photo__mono"
          src={sitePath('/assets/guided-worlds/zuzutek-monogram-cream-v01.png')}
          width={360}
          height={263}
          alt=""
          aria-hidden="true"
          style={{ left: `${mono.x}%`, top: `${mono.y}%`, width: `${mono.w}%`, transform: `translate(-50%, -50%) rotate(${mono.rot}deg)` }}
        />
      </div>
    </div>
  )
}
