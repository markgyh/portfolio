import { SITE } from '../content'
import { asset, CONTAINER } from '../lib/utils'
import { ArrowDown } from './Icons'
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from './ui'

/** Arrowhead for the dimension line, pointing outward. */
function Arrowhead({ side }: { side: 'left' | 'right' }) {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      aria-hidden="true"
      className={`shrink-0 fill-steel ${side === 'right' ? 'rotate-180' : ''}`}
    >
      <path d="M0 4 10 0v8z" />
    </svg>
  )
}

/**
 * The role, set as a dimension callout spanning the name, the way a
 * dimension sits on an engineering drawing (value above the line, arrows
 * meeting extension lines at both ends).
 */
function DimensionLine({ label }: { label: string }) {
  return (
    <div className="mt-5 w-full sm:mt-7">
      <p className="animate-fade text-center text-[0.95rem] font-medium tracking-[0.01em] text-steel [animation-delay:900ms] sm:text-lg">
        {label}
      </p>
      <div className="relative mt-1.5 flex h-5 items-center" aria-hidden="true">
        <span className="absolute inset-y-0 left-0 w-px bg-steel/70" />
        <span className="absolute inset-y-0 right-0 w-px bg-steel/70" />
        <div className="flex w-full animate-draw items-center px-px [animation-delay:500ms]">
          <Arrowhead side="left" />
          <span className="h-px flex-1 bg-steel/80" />
          <Arrowhead side="right" />
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0" aria-hidden={SITE.heroImage.alt ? undefined : true}>
        <img
          src={asset(SITE.heroImage.src)}
          alt={SITE.heroImage.alt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-canvas/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 via-transparent to-transparent" />
      </div>
      <div className="drafting-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className={`${CONTAINER} relative z-10 flex flex-1 flex-col justify-end pb-10 pt-28 sm:pb-12`}>
        <div className="inline-flex max-w-full flex-col self-start">
          <h1 className="animate-rise font-wide text-[clamp(2.6rem,10.5vw,9.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-ink [overflow-wrap:anywhere]">
            {SITE.firstName}
            <br />
            {SITE.lastName}
          </h1>
          <DimensionLine label={SITE.role} />
        </div>

        <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:1000ms]">
          <a href="#projects" className={BUTTON_PRIMARY}>
            View projects
          </a>
          <a href="#contact" className={BUTTON_SECONDARY}>
            Get in touch
          </a>
        </div>

        <a
          href="#about"
          className="group mt-14 inline-flex animate-fade items-center gap-3 self-start text-sm font-medium text-muted transition-colors [animation-delay:1300ms] hover:text-ink"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-brass group-hover:text-brass">
            <ArrowDown size={16} />
          </span>
          Scroll to explore
        </a>
      </div>
    </section>
  )
}
