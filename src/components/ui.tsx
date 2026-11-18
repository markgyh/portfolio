import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useInView } from '../lib/utils'
import { ArrowUpRight } from './Icons'

/** Press feedback shared by every button-like control: a slight give on press, quick release. */
export const PRESS = 'transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.97]'

const BUTTON_BASE = `inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 font-display text-[0.95rem] font-semibold disabled:cursor-not-allowed disabled:opacity-60 ${PRESS}`

export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-copper text-canvas hover:bg-copper-strong`
export const BUTTON_SECONDARY = `${BUTTON_BASE} border border-line-strong text-ink hover:border-copper hover:text-copper`

export const TEXT_LINK =
  'inline-flex items-center gap-1.5 font-medium text-copper underline decoration-copper/40 underline-offset-[5px] transition-colors hover:decoration-copper'

export function SectionHeading({ id, children, aside }: { id: string; children: ReactNode; aside?: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    // Wraps so that controls passed as `aside` drop below the heading on narrow screens instead of squeezing it
    <div className="mb-12 flex flex-wrap items-end gap-x-6 gap-y-5 lg:mb-16">
      <h2
        id={id}
        className="font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-ink"
      >
        {children}
      </h2>
      {/* Leader line drawn out to a copper datum mark as the section arrives */}
      <div
        ref={ref}
        data-inview={inView || undefined}
        className="leader mb-3 hidden flex-1 items-center md:flex"
        aria-hidden="true"
      >
        <span className="h-px flex-1 bg-line-strong" />
        <span className="h-2 w-2 shrink-0 rotate-45 border border-copper" />
      </div>
      {aside}
    </div>
  )
}

/** Link that opens in a new tab, with a visible icon and screen reader hint. */
export function ExternalLink({ children, className = TEXT_LINK, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
      <ArrowUpRight size={15} className="shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
