import { useCallback, useState } from 'react'
import { PROJECTS, type Project } from '../data'
import { CONTAINER } from '../lib/utils'
import { ArrowUpRight } from './Icons'
import ProjectDialog from './ProjectDialog'
import { Media, Tags } from './ProjectWriteup'
import { SectionHeading } from './ui'

/**
 * Card whose title button is stretched over the whole card, so the full card is clickable.
 * Long text is clamped so every card in a row lines up; the project window shows it in full.
 */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group relative flex flex-col overflow-clip rounded-sm border border-line bg-surface transition-colors hover:border-copper/60 has-[button:focus-visible]:border-copper has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-copper">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-canvas">
        <Media src={project.cover} alt="" label="Cover photo" className="h-full w-full" />
        <span className="absolute left-3 top-3 rounded-sm bg-canvas px-2 py-0.5 text-sm tabular-nums text-ink">
          {project.date}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
        <div>
          <span className="mb-4 block h-1 w-8 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
          <h3 className="font-display text-xl font-bold leading-tight text-ink [overflow-wrap:anywhere] sm:text-2xl">
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="block w-full text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {/* The clamp sits on the text, since a button's own lines don't count towards its parent's clamp */}
              <span className="line-clamp-2">{project.title}</span>
            </button>
          </h3>
          {project.subtitle && <p className="mt-1.5 line-clamp-2 text-[0.95rem] text-cyan">{project.subtitle}</p>}
          {project.context && <p className="mt-1 line-clamp-1 text-sm text-faint">{project.context}</p>}
          <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
        </div>

        {/* Pinned to the bottom so the links line up across a row */}
        <div className="mt-auto space-y-5">
          <Tags items={project.tags} limit={3} />
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 font-medium text-copper underline decoration-copper/40 underline-offset-[5px] transition-colors group-hover:decoration-copper"
          >
            View details
            <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </article>
  )
}

const total = PROJECTS.length

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const close = useCallback(() => setOpenIndex(null), [])
  const navigate = useCallback(
    (direction: -1 | 1) => setOpenIndex((i) => (i === null ? i : Math.min(total - 1, Math.max(0, i + direction)))),
    [],
  )

  if (total === 0) return null

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-line py-24 lg:py-32">
      <div className={CONTAINER}>
        <SectionHeading id="projects-heading">Projects</SectionHeading>
        {/* One per row on phones, two on tablets, three on desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={`${project.title}-${i}`} project={project} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>
      {openIndex !== null && (
        <ProjectDialog
          project={PROJECTS[openIndex]}
          index={openIndex}
          total={total}
          onClose={close}
          onNavigate={navigate}
        />
      )}
    </section>
  )
}
