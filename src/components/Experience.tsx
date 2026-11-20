import { useState } from 'react'
import { EXPERIENCES } from '../data'
import { CONTAINER, SECTION, useInView } from '../lib/utils'
import { Plus } from './Icons'
import { ExternalLink, SectionHeading, TEXT_LINK } from './ui'

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [railRef, railDrawn] = useInView<HTMLSpanElement>()

  if (EXPERIENCES.length === 0) return null

  return (
    <section id="experience" aria-labelledby="experience-heading" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading id="experience-heading">Experience</SectionHeading>

        <ol className="relative lg:ml-2">
          {/* Timeline rail (the list is chronological, newest first), drawn downwards as it arrives */}
          <span
            ref={railRef}
            data-inview={railDrawn || undefined}
            className="rail absolute bottom-0 left-0 top-0 hidden w-px bg-line-strong lg:block"
            aria-hidden="true"
          />

          {EXPERIENCES.map((exp, i) => {
            const open = openIndex === i
            const panelId = `experience-panel-${i}`
            const buttonId = `experience-button-${i}`
            return (
              <li key={`${exp.company}-${exp.period}-${i}`} className="relative lg:pl-14">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-10 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-canvas transition-colors lg:block ${
                    open ? 'bg-copper' : 'bg-line-strong'
                  }`}
                />
                <div className="border-b border-line">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={panelId}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-2xl font-bold leading-tight transition-colors [overflow-wrap:anywhere] lg:text-3xl ${
                            open ? 'text-copper' : 'text-ink group-hover:text-copper'
                          }`}
                        >
                          {exp.company}
                        </span>
                        <span className="mt-1.5 block text-lg text-ink/90">{exp.role}</span>
                        <span className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted">
                          <span className="tabular-nums">{exp.period}</span>
                          <span>{exp.location}</span>
                        </span>
                      </span>
                      <span
                        className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[rotate,border-color,color] duration-200 ease-out ${
                          open
                            ? 'rotate-45 border-copper text-copper'
                            : 'border-line-strong text-muted group-hover:border-copper group-hover:text-copper'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={18} />
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows 0fr -> 1fr animates to the content's real height (no clipping) */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!open}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className={`overflow-hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="max-w-[68ch] pb-8">
                        {exp.description && <p className="mb-5 leading-relaxed text-ink/90">{exp.description}</p>}
                        <ul className="mb-6 space-y-3">
                          {exp.highlights.map((h, j) => (
                            <li key={j} className="flex gap-3 leading-relaxed text-muted">
                              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-copper" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        {exp.url && <ExternalLink href={exp.url} className={`${TEXT_LINK} min-h-11`}>Visit {exp.company}</ExternalLink>}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
