import { useLayoutEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { useInView } from '../lib/utils'
import { ArrowUpRight } from './Icons'

/* =============================================================================
   SHARED UI
   The vocabulary every section speaks. Two colour roles hold across all of it:
   copper means "do this" (actions), cyan means "this is information about the
   drawing" (annotations, dimensions). Controls take one radius, rounded-sm,
   so they read as drafted rather than bubbly.
   ============================================================================= */

/** Press feedback shared by every button-like control: a slight give on press, quick release. */
export const PRESS = 'transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97]'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-copper text-canvas hover:bg-copper-strong',
  secondary: 'border border-line-strong text-ink hover:border-copper hover:text-copper',
  ghost: 'text-muted hover:bg-surface-2 hover:text-copper',
}

// Heights: sm is for dense pointer chrome only (the desktop nav pill); everything a thumb can reach is 44px or more.
const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3.5 text-[0.95rem]',
  md: 'min-h-11 px-6 text-[0.95rem]',
  lg: 'min-h-12 px-8 text-base',
  icon: 'h-11 w-11 shrink-0',
}

/**
 * Class string for any button or button-styled link.
 * Ghost buttons sit inside other chrome, so they take tighter side padding.
 */
export function button({ variant = 'primary', size = 'md' }: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  const sizing = variant === 'ghost' && size === 'md' ? 'min-h-11 px-3 text-sm' : SIZES[size]
  return `inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${sizing} ${VARIANTS[variant]} ${PRESS}`
}

/** Underlined copper link. Use TEXT_LINK_BASE plus your own hover trigger when a parent owns the hover (e.g. a card). */
export const TEXT_LINK_BASE =
  'inline-flex items-center gap-1.5 font-medium text-copper underline decoration-copper/40 underline-offset-[5px] transition-[color,text-decoration-color,scale] duration-150 ease-out'
export const TEXT_LINK = `${TEXT_LINK_BASE} hover:decoration-copper active:scale-[0.97]`

/** Small cyan label that annotates a value, like a callout on a drawing. */
export const ANNOTATION = 'text-sm font-medium text-cyan'

export function SectionHeading({ id, children, aside }: { id: string; children: ReactNode; aside?: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    // Wraps so that controls passed as `aside` drop below the heading on narrow screens instead of squeezing it
    <div className="mb-12 flex flex-wrap items-end gap-x-6 gap-y-4 lg:mb-16">
      <h2
        id={id}
        className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-ink"
      >
        {children}
      </h2>
      {/* Leader line drawn out to a copper datum mark as the section arrives.
          On phones it runs full width under the heading rather than disappearing. */}
      <div
        ref={ref}
        data-inview={inView || undefined}
        className="leader flex basis-full items-center md:mb-3 md:basis-0 md:flex-1"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-line-strong" />
        <span className="h-2 w-2 shrink-0 rotate-45 border border-copper" />
      </div>
      {aside}
    </div>
  )
}

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Trailing icon. Defaults to the outbound arrow; pass a custom node to restyle it. */
  icon?: ReactNode
  /** The link opens a PDF: says so to screen readers. */
  pdf?: boolean
}

/**
 * The only way to open a new tab. The outbound arrow is reserved for this, so it
 * always means "this leaves the page".
 */
export function ExternalLink({ children, className = TEXT_LINK, icon, pdf, ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
      {icon ?? <ArrowUpRight size={16} className="shrink-0" />}
      <span className="sr-only">{pdf ? ' (PDF, opens in a new tab)' : ' (opens in a new tab)'}</span>
    </a>
  )
}

/** List of tools or processes. Past `limit` the rest collapse into a count. */
export function Tags({ items, limit = Infinity, label }: { items: string[]; limit?: number; label: string }) {
  if (items.length === 0) return null
  const shown = items.length > limit ? items.slice(0, limit - 1) : items
  const hidden = items.length - shown.length
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {shown.map((tag) => (
        <li key={tag} className={TAG}>
          {tag}
        </li>
      ))}
      {hidden > 0 && <li className={TAG}>+{hidden} more</li>}
    </ul>
  )
}

// Outlined like a tag on a drawing, not a filled chip.
const TAG = 'rounded-sm border border-line-strong/70 px-2 py-0.5 text-sm text-muted'

/* ─── Dimension line ─────────────────────────────────────────────────────── */

/** Arrowhead for the dimension line, pointing outward. */
function Arrowhead({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      aria-hidden="true"
      className={`shrink-0 fill-cyan ${side === 'right' ? 'rotate-180' : ''}`}
    >
      <path d="M0 4 10 0v8z" />
    </svg>
  )
}

// Limits for the label text, in px. Between these it grows or shrinks to fill the dimension line.
const LABEL_MIN = 12
const LABEL_MAX = 40
// Share of the dimension line the label may take up, leaving a gap at each end.
const LABEL_FILL = 0.94

/**
 * A label set as a dimension callout spanning whatever sits above it, the way a
 * dimension sits on an engineering drawing (value above the line, arrows meeting
 * extension lines at both ends).
 *
 * `w-0 min-w-full` stops the label from widening its parent, so the line is
 * always exactly as wide as the element it measures. The text size is fitted to the line.
 * `drafted` plays the hero's drawing-on animation.
 */
export function DimensionLine({ label, drafted = false, className = '' }: { label: string; drafted?: boolean; className?: string }) {
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState<number | null>(null)

  useLayoutEffect(() => {
    const line = lineRef.current
    const text = textRef.current
    if (!line || !text) return
    const fit = () => {
      // Width scales linearly with font size, so one single-line measurement is enough.
      const current = parseFloat(getComputedStyle(text).fontSize)
      text.style.whiteSpace = 'nowrap'
      const natural = text.scrollWidth
      text.style.whiteSpace = ''
      if (!natural) return
      const target = (current * line.clientWidth * LABEL_FILL) / natural
      setFontSize(Math.min(LABEL_MAX, Math.max(LABEL_MIN, target)))
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(line)
    // Re-fit once the heading fonts load, since they change both widths.
    document.fonts?.ready.then(fit)
    return () => observer.disconnect()
  }, [label])

  const anim = (name: string) => (drafted ? name : '')

  return (
    <div ref={lineRef} className={`${anim('hero-dimension')} w-0 min-w-full ${className}`}>
      <p className={`${anim('hero-value')} text-center`}>
        <span
          ref={textRef}
          style={fontSize ? { fontSize: `${fontSize}px` } : undefined}
          className={`inline-block font-display font-medium uppercase leading-tight tracking-[0.06em] text-cyan ${
            fontSize === LABEL_MIN ? 'whitespace-normal' : 'whitespace-nowrap'
          }`}
        >
          {label}
        </span>
      </p>
      <div className="relative mt-1.5 flex h-5 items-center" aria-hidden="true">
        <span className={`${anim('hero-ext')} absolute inset-y-0 left-0 w-px bg-cyan/70`} />
        <span className={`${anim('hero-ext')} absolute inset-y-0 right-0 w-px bg-cyan/70`} />
        <div className={`${anim('hero-dim')} flex w-full items-center px-px`}>
          <Arrowhead side="left" />
          <span className="h-px flex-1 bg-cyan/80" />
          <Arrowhead side="right" />
        </div>
      </div>
    </div>
  )
}
