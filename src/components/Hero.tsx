import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { SITE } from '../data'
import { asset, CONTAINER, hideIfMissing } from '../lib/utils'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from './ui'

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

// Limits for the role text, in px. Between these it grows or shrinks to fill the dimension line.
const LABEL_MIN = 12
const LABEL_MAX = 40
// Share of the dimension line the role text may take up, leaving a gap at each end.
const LABEL_FILL = 0.94

/**
 * The role, set as a dimension callout spanning the name, the way a
 * dimension sits on an engineering drawing (value above the line, arrows
 * meeting extension lines at both ends).
 *
 * `w-0 min-w-full` stops the role from widening its parent, so the line is
 * always exactly as wide as the name. The text size is then fitted to the line.
 */
function DimensionLine({ label }: { label: string }) {
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

  return (
    <div ref={lineRef} className="hero-dimension mt-5 w-0 min-w-full sm:mt-7">
      <p className="hero-value text-center">
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
        <span className="hero-ext absolute inset-y-0 left-0 w-px bg-cyan/70" />
        <span className="hero-ext absolute inset-y-0 right-0 w-px bg-cyan/70" />
        <div className="hero-dim flex w-full items-center px-px">
          <Arrowhead side="left" />
          <span className="h-px flex-1 bg-cyan/80" />
          <Arrowhead side="right" />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background photo, washed into the blueprint blue */}
      <div className="absolute inset-0 bg-canvas" aria-hidden={SITE.heroImage.alt ? undefined : true}>
        <img
          src={asset(SITE.heroImage.src)}
          alt={SITE.heroImage.alt}
          fetchPriority="high"
          onError={hideIfMissing}
          decoding="async"
          className="hero-photo h-full w-full object-cover object-top opacity-50 mix-blend-luminosity grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/80 via-transparent to-transparent" />
      </div>
      <div className="drafting-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className={`${CONTAINER} relative z-10 flex flex-1 flex-col justify-end pb-14 pt-28 sm:pb-16`}>
        <div className="inline-flex max-w-full flex-col self-start">
          <h1 className="font-display text-[clamp(2.4rem,min(9vw,15svh),8.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
            {/* Each line rises from behind its own baseline. The mask's extra room above
                and below keeps accents (Ś, Ê) and descenders from being clipped. */}
            {[SITE.firstName, SITE.lastName].map((line, i) => (
              <span key={i} className="hero-line -my-[0.14em] block overflow-clip py-[0.14em]">
                <span className="block" style={{ '--i': i } as CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <DimensionLine label={SITE.role} />
        </div>

        <div className="hero-actions mt-10 flex flex-wrap gap-3">
          <a href="#projects" className={BUTTON_PRIMARY}>
            View projects
          </a>
          <a href="#contact" className={BUTTON_SECONDARY}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
