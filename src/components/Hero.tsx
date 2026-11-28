import { useState, type CSSProperties } from 'react'
import { NAV_ITEMS, SITE } from '../data'
import { CONTAINER } from '../lib/utils'
import { button, DimensionLine, Visual } from './ui'

// Each call to action only shows when the section it points to is on the page.
const CTAS = [
  { id: 'projects', label: 'View Projects', variant: 'primary' as const },
  { id: 'contact', label: 'Get in Touch', variant: 'secondary' as const },
].filter(({ id }) => id === 'contact' || NAV_ITEMS.some((item) => item.id === id))

/**
 * The portrait set as a sheet pinned to the drawing: a hairline frame with a title block
 * underneath (where, and whether open to work), in the same cells as the site footer.
 */
function PortraitSheet() {
  const [missing, setMissing] = useState(false)
  if (!SITE.heroImage.src || missing) return null
  const cells = [
    { label: 'Based in', value: `${SITE.location} (${SITE.timezone})` },
    ...(SITE.availability.open ? [{ label: 'Status', value: SITE.availability.headline, live: true }] : []),
  ]
  return (
    <figure className="hero-sheet w-full max-w-md justify-self-end border border-line-strong bg-canvas lg:max-w-none">
      {/* Short on phones so the name and the buttons still make the first screen */}
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[6/5] lg:aspect-[4/5]">
        <Visual
          src={SITE.heroImage.src}
          alt={SITE.heroImage.alt}
          eager
          background
          onMissing={() => setMissing(true)}
          className="hero-photo h-full w-full object-cover object-[47%_32%]"
        />
        {/* A faint blueprint wash ties the full-colour photo to the sheet around it */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas/45 via-transparent to-transparent" aria-hidden="true" />
      </div>
      <dl className="grid grid-cols-2 border-t border-line-strong">
        {cells.map(({ label, value, live }, i) => (
          <div key={label} className={`px-4 py-3 ${i > 0 ? 'border-l border-line-strong' : ''} ${cells.length === 1 ? 'col-span-2' : ''}`}>
            <dt className="text-xs text-faint">{label}</dt>
            <dd className="mt-0.5 flex items-center gap-2 font-display text-[0.95rem] font-semibold leading-snug text-ink">
              {live && <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" aria-hidden="true" />}
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  )
}

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div
        className={`${CONTAINER} relative z-10 grid flex-1 grid-cols-1 content-end gap-10 pb-14 pt-24 sm:pb-16 sm:pt-28 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:content-center lg:items-end lg:gap-16 xl:gap-24`}
      >
        <div className="order-2 min-w-0 lg:order-1">
          {/* Phones: name on the left, role on the right, tops level. From sm up, the role is a
              dimension line under the name; min-w lets it (and so the role) run wider than a short name. */}
          <div className="flex items-start justify-between gap-3 sm:inline-flex sm:min-w-[min(34rem,100%)] sm:max-w-full sm:flex-col sm:justify-start sm:gap-0">
            <h1 className="shrink-0 font-display text-[clamp(3.25rem,min(11vw,15svh),8.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.01em] text-ink [overflow-wrap:anywhere]">
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
            {/* Held to the width of the word "Mechatronics" (8.1em at this size), so it stacks as a narrow block */}
            <p className="hero-value mt-[0.2rem] w-[8.1em] min-w-0 text-right font-display text-base font-medium uppercase leading-tight tracking-[0.06em] text-cyan sm:hidden">
              {SITE.role}
            </p>
            <DimensionLine label={SITE.role} drafted className="hidden sm:mt-7 sm:block" />
          </div>

          <div className="hero-actions mt-10 flex flex-wrap gap-3">
            {CTAS.map(({ id, label, variant }) => (
              <a key={id} href={`#${id}`} className={button({ variant })}>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <PortraitSheet />
        </div>
      </div>
    </section>
  )
}
