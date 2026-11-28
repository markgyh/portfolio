import { useState, type CSSProperties } from 'react'
import { EXPERIENCES, PROJECTS } from '../data'
import { CONTAINER, projectHash, SECTION, useInView, useResumeUrl } from '../lib/utils'
import { ArrowRight, Plus } from './Icons'
import { button, ExternalLink, SectionHeading, TEXT_LINK } from './ui'

/** Projects named in an entry that actually exist, so a renamed or removed project never leaves a dead link. */
const relatedProjects = (titles: string[] = []) => titles.filter((t) => PROJECTS.some((p) => p.title === t))

export default function Experience() {
  // Every entry starts open: the highlights are the evidence, so nobody should have to dig for them.
  // Each one can still be folded away with its button.
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set(EXPERIENCES.map((_, i) => i)))
  const [railRef, railDrawn] = useInView<HTMLSpanElement>()
  const resume = useResumeUrl()

  const toggle = (i: number) => {
    const next = new Set(open)
    if (next.has(i)) next.delete(i)
    else next.add(i)
    setOpen(next)
  }

  if (EXPERIENCES.length === 0) return null

  return (
    <section id="experience" aria-labelledby="experience-heading" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading
          id="experience-heading"
          asideBeside
          aside={
            resume && (
              <ExternalLink href={resume} pdf className={`shrink-0 ${button({ variant: 'secondary', size: 'compact' })}`}>
                {/* Short on phones so it fits beside the heading */}
                <span className="sm:hidden">Résumé</span>
                <span className="hidden sm:inline">View résumé</span>
              </ExternalLink>
            )
          }
        >
          Experience
        </SectionHeading>

        <ol className="relative lg:ml-2">
          {/* Timeline rail (the list is chronological, newest first), drawn downwards as it arrives */}
          <span
            ref={railRef}
            data-inview={railDrawn || undefined}
            className="rail absolute bottom-0 left-0 top-0 hidden w-px bg-line-strong lg:block"
            aria-hidden="true"
          />

          {EXPERIENCES.map((exp, i) => {
            const isOpen = open.has(i)
            const panelId = `experience-panel-${i}`
            const buttonId = `experience-button-${i}`
            const related = relatedProjects(exp.projects)
            return (
              <li key={`${exp.company}-${exp.period}-${i}`} className="relative lg:pl-14">
                {/* Datum point on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-10 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-copper ring-4 ring-canvas lg:block"
                />
                <div className="border-b border-line">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-2xl font-bold leading-tight text-ink [overflow-wrap:anywhere] lg:text-3xl">
                          {exp.company}
                        </span>
                        <span className="mt-1.5 block text-lg text-ink/90">{exp.role}</span>
                        <span className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted">
                          <span className="tabular-nums">{exp.period}</span>
                          <span>{exp.location}</span>
                        </span>
                      </span>
                      <span
                        className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-line-strong text-muted transition-[rotate,border-color,color] duration-200 ease-out group-hover:border-copper group-hover:text-copper ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={18} />
                      </span>
                    </button>
                  </h3>

                  {/* grid-rows 0fr -> 1fr animates to the content's real height (no clipping). */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!isOpen}
                    data-open={isOpen || undefined}
                    className={`xp-panel grid transition-[grid-template-rows] ${
                      isOpen ? 'grid-rows-[1fr] duration-700 ease-expo' : 'grid-rows-[0fr] duration-300 ease-out'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="max-w-[68ch] pb-8">
                        {exp.description && (
                          <p className="xp-line mb-5 leading-relaxed text-ink/90" style={{ '--i': 0 } as CSSProperties}>
                            {exp.description}
                          </p>
                        )}
                        <ul className="mb-6 space-y-3">
                          {exp.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="xp-line flex gap-3 leading-relaxed text-muted"
                              style={{ '--i': j + 1 } as CSSProperties}
                            >
                              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-copper" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        {related.length > 0 && (
                          <div className="xp-line mb-4" style={{ '--i': exp.highlights.length + 1 } as CSSProperties}>
                            <h4 className="mb-1 text-sm font-medium text-cyan">Projects from this role</h4>
                            <ul className="flex flex-col items-start">
                              {related.map((title) => (
                                <li key={title}>
                                  {/* Opens the project's window in-page, so a forward arrow, not the outbound one */}
                                  <a href={`#${projectHash(title)}`} className={`${TEXT_LINK} min-h-11`}>
                                    {title}
                                    <ArrowRight size={16} className="shrink-0" />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {exp.url && (
                          <div className="xp-line" style={{ '--i': exp.highlights.length + 2 } as CSSProperties}>
                            <ExternalLink href={exp.url} className={`${TEXT_LINK} min-h-11`}>
                              Visit {exp.company}
                            </ExternalLink>
                          </div>
                        )}
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
