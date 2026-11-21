import type { CSSProperties } from 'react'
import { SITE } from '../data'
import { asset, CONTAINER, hideIfMissing } from '../lib/utils'
import { button, DimensionLine } from './ui'

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background photo in full colour. Neutral (not blueprint-blue) scrims keep the name legible. */}
      <div className="absolute inset-0 bg-canvas" aria-hidden={SITE.heroImage.alt ? undefined : true}>
        <img
          src={asset(SITE.heroImage.src)}
          alt={SITE.heroImage.alt}
          fetchPriority="high"
          onError={hideIfMissing}
          decoding="async"
          className="hero-photo h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
      </div>

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
          <DimensionLine label={SITE.role} drafted className="mt-5 sm:mt-7" />
        </div>

        <div className="hero-actions mt-10 flex flex-wrap gap-3">
          <a href="#projects" className={button()}>
            View projects
          </a>
          <a href="#contact" className={button({ variant: 'secondary' })}>
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
