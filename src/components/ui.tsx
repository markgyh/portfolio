import { useEffect, useLayoutEffect, useRef, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from 'react'
import { asset, hideIfMissing, prefersReducedMotion, safeUrl, useInView } from '../lib/utils'
import { Arrowhead, ArrowUpRight, Datum } from './Icons'

/* =============================================================================
   SHARED UI
   The vocabulary every section speaks. Three colour roles hold across all of it:
   - copper means "do this" (actions, and links that take you somewhere)
   - cyan means "this is information about the drawing" (annotations, dimensions)
   - "you are here" / selected is ink on surface-2 with a copper tick (SELECTED),
     never a copper fill, so copper stays reserved for actions
   Two radii (index.css): controls take rounded-sm, panels take rounded-panel,
   so everything reads as drafted rather than bubbly.
   ============================================================================= */

/** Press feedback shared by every button-like control: a slight give on press, quick release. */
export const PRESS = 'transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97]'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'compact' | 'md' | 'lg' | 'icon'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-copper text-canvas hover:bg-copper-strong',
  secondary: 'border border-line-strong text-ink hover:border-copper hover:text-copper',
  ghost: 'text-muted hover:bg-surface-2 hover:text-copper',
}

// Heights: sm is for dense pointer chrome only (the desktop nav pill); everything a thumb can reach is 44px or more.
const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3.5 text-[0.95rem]',
  compact: 'min-h-11 px-3 text-[0.95rem]', // full touch height, tight sides: a button beside a heading on phones
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
  return `inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold disabled:cursor-not-allowed disabled:opacity-40 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 ${sizing} ${VARIANTS[variant]} ${PRESS}`
}

/** Underlined copper link. Use TEXT_LINK_BASE plus your own hover trigger when a parent owns the hover (e.g. a card). */
export const TEXT_LINK_BASE =
  'inline-flex items-center gap-1.5 font-medium text-copper underline decoration-copper/40 underline-offset-[5px] transition-[color,text-decoration-color,scale] duration-150 ease-out'
export const TEXT_LINK = `${TEXT_LINK_BASE} hover:decoration-copper active:scale-[0.97]`

/** Current or selected item (the nav link for the section on screen): ink on a raised surface, with a copper tick underneath. */
export const SELECTED =
  'bg-surface-2 text-ink shadow-[inset_0_-2px_0_var(--color-copper)]'

/** Small cyan label that annotates a value, like a callout on a drawing. */
export const ANNOTATION = 'text-sm font-medium text-cyan'

export function SectionHeading({
  id,
  children,
  aside,
  asideBeside = false,
}: {
  id: string
  children: ReactNode
  aside?: ReactNode
  /** On phones, keep `aside` on the heading's row (above the leader line) when it fits. */
  asideBeside?: boolean
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    // Wraps so that controls passed as `aside` drop below the heading on narrow screens instead of squeezing it
    <div className="mb-12 flex flex-wrap items-end gap-x-3 gap-y-4 md:gap-x-6 lg:mb-16">
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
        className={`leader flex basis-full items-center md:mb-3 md:basis-0 md:flex-1 ${asideBeside ? 'order-last md:order-none' : ''}`}
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-line-strong" />
        <Datum size={12} className="-ml-px shrink-0 text-copper" />
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
export function ExternalLink({ children, className = TEXT_LINK, icon, pdf, href, ...props }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={className} href={safeUrl(href) || undefined} {...props}>
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
      {shown.map((tag, i) => (
        <li key={`${tag}-${i}`} className={TAG}>
          {tag}
        </li>
      ))}
      {hidden > 0 && <li className={TAG}>+{hidden} more</li>}
    </ul>
  )
}

/**
 * Tags kept to a single line: as many as fit, then a "+N more" count. A hidden copy of the
 * full list is measured to decide how many fit, and re-measured when the width changes.
 * A lone tag too long for the line is cut short with an ellipsis.
 */
export function TagLine({ items, label }: { items: string[]; label: string }) {
  const measureRef = useRef<HTMLUListElement>(null)
  const [count, setCount] = useState(items.length)

  useLayoutEffect(() => {
    const ghost = measureRef.current
    if (!ghost) return
    const fit = () => {
      const lis = [...ghost.children] as HTMLElement[]
      const more = lis.pop()! // the "+N more" chip, measured at its widest
      const avail = ghost.clientWidth
      const gap = parseFloat(getComputedStyle(ghost).columnGap) || 0
      const widths = lis.map((li) => li.offsetWidth)
      let used = 0
      let n = 0
      for (; n < widths.length; n++) {
        const next = used + (n ? gap : 0) + widths[n]
        const rest = n + 1 < widths.length ? gap + more.offsetWidth : 0
        if (next + rest > avail) break
        used = next
      }
      setCount(Math.max(1, n))
    }
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(ghost)
    document.fonts?.ready.then(fit)
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null
  const hidden = items.length - count
  return (
    <div className="relative">
      <ul className="flex gap-2 overflow-hidden" aria-label={label}>
        {items.slice(0, count).map((tag, i) => (
          <li key={`${tag}-${i}`} className={`${TAG} min-w-0 truncate`} title={tag}>
            {tag}
          </li>
        ))}
        {hidden > 0 && <li className={`${TAG} shrink-0`}>+{hidden} more</li>}
      </ul>
      <ul ref={measureRef} aria-hidden="true" className="invisible absolute inset-x-0 top-0 flex gap-2 overflow-hidden">
        {items.map((tag, i) => (
          <li key={`${tag}-${i}`} className={`${TAG} shrink-0 whitespace-nowrap`}>
            {tag}
          </li>
        ))}
        <li className={`${TAG} shrink-0 whitespace-nowrap`}>+{items.length} more</li>
      </ul>
    </div>
  )
}

// Outlined like a tag on a drawing, not a filled chip.
const TAG = 'rounded-sm border border-line-strong/70 px-2 py-0.5 text-sm text-muted'

/* ─── Dimension line ─────────────────────────────────────────────────────── */

// Limits for the label text, in px. Between these it grows or shrinks to fill the dimension line.
const LABEL_MIN = 16
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
          <Arrowhead side="left" className="fill-cyan" />
          <span className="h-px flex-1 bg-cyan/80" />
          <Arrowhead side="right" className="fill-cyan" />
        </div>
      </div>
    </div>
  )
}

/** True for a path to a video file rather than a photo. */
export const isVideoFile = (src: string) => /\.(mp4|webm|mov|m4v)(?:[?#]|$)/i.test(src)

/**
 * A photo, or a short video clip shown in its place. A clip plays like a GIF: muted, looping,
 * no controls, and only while it's on screen. People who ask for reduced motion get the
 * first frame with play controls instead of autoplay. A missing file hides itself either way.
 */
export function Visual({
  src,
  alt,
  className = '',
  eager = false,
  background = false,
  style,
  hideParent = false,
  onMissing,
}: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  /** A missing file hides its parent too (a figure with a caption), not just itself. */
  hideParent?: boolean
  /** Load straight away (the hero) instead of when scrolled near. */
  eager?: boolean
  /** Sits behind other content (the hero): never shows play controls, even when held still. */
  background?: boolean
  /** Called instead of hiding the element when its file is missing, so the caller can draw a fallback. */
  onMissing?: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [still] = useState(prefersReducedMotion)
  const video = isVideoFile(src)
  const onError = (e: { currentTarget: HTMLElement }) =>
    onMissing ? onMissing() : hideIfMissing({ currentTarget: (hideParent && e.currentTarget.parentElement) || e.currentTarget })

  useEffect(() => {
    const el = videoRef.current
    if (!el || still) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {})
      else el.pause()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [still, src])

  if (video) {
    return (
      <video
        ref={videoRef}
        src={asset(src)}
        muted
        loop
        playsInline
        controls={still && !background}
        preload={eager ? 'auto' : 'metadata'}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        onError={onError}
        className={className}
        style={style}
      />
    )
  }
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      onError={onError}
      className={className}
      style={style}
    />
  )
}
