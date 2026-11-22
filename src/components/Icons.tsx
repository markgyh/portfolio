import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 16, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      // One line weight at every size, like a drawing: index.css stops the stroke scaling with the icon.
      strokeWidth={1.5}
      data-icon=""
      // Square ends and sharp corners, like a technical pen rather than a marker.
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
)
export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)
export const ArrowUp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
)
export const ChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="m15 18-6-6 6-6" />
  </Svg>
)
export const ChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 18 6-6-6-6" />
  </Svg>
)
/** Datum mark (a square turned 45°): the reference point on a drawing. Marks featured work and section leader lines. */
export const Datum = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4.5 19.5 12 12 19.5 4.5 12Z" />
  </Svg>
)
export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)
export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
)
export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)
export const Copy = (p: IconProps) => (
  <Svg {...p}>
    <rect x="9" y="9" width="11" height="11" />
    <path d="M5 15V4h10" />
  </Svg>
)
export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12 5 5 9-10" pathLength={1} />
  </Svg>
)
export const ImageIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4" width="18" height="16" />
    <circle cx="9" cy="10" r="1.75" />
    <path d="m21 16-5-5-9 9" />
  </Svg>
)

/**
 * Filled arrowhead for a dimension line, pointing outward. Solid rather than stroked,
 * as dimension arrows are drawn on an engineering drawing.
 */
export function Arrowhead({ side, className = '' }: { side: 'left' | 'right'; className?: string }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${side === 'right' ? 'rotate-180' : ''} ${className}`}
    >
      <path d="M0 4 10 0v8z" />
    </svg>
  )
}
