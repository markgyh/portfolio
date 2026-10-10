import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from './Icons'

const BUTTON_BASE =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-brass text-canvas hover:bg-brass-strong`
export const BUTTON_SECONDARY = `${BUTTON_BASE} border border-line-strong text-ink hover:border-brass hover:text-brass`

export const TEXT_LINK =
  'inline-flex items-center gap-1.5 font-medium text-brass underline decoration-brass/40 underline-offset-[5px] transition-colors hover:decoration-brass'

export function SectionHeading({ id, children, aside }: { id: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-12 flex items-end gap-6 lg:mb-16">
      <h2
        id={id}
        className="font-wide text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.02em] text-ink"
      >
        {children}
      </h2>
      <div className="mb-3 hidden h-px flex-1 bg-line md:block" aria-hidden="true" />
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
