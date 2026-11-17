import { useEffect, useRef, type CSSProperties } from 'react'
import type { Project, ProjectSection } from '../data'
import { asset, hideIfMissing } from '../lib/utils'
import { ChevronLeft, ChevronRight, Close } from './Icons'
import { ExternalLink, PRESS } from './ui'

interface Props {
  project: Project
  index: number
  total: number
  onClose: () => void
  onNavigate: (direction: -1 | 1) => void
}

/** Every project window shows these sections, in this order. */
const SECTIONS: { key: keyof Pick<Project, 'executiveSummary' | 'challenge' | 'considerations' | 'solution' | 'impact'>; title: string }[] = [
  { key: 'executiveSummary', title: 'Executive summary' },
  { key: 'challenge', title: 'The challenge' },
  { key: 'considerations', title: 'Design considerations' },
  { key: 'solution', title: 'Final solution' },
  { key: 'impact', title: 'Impact and learning points' },
]

/**
 * One section of the write-up. The optional photo floats right, at most a third of the
 * window's width and height (`--dialog-h`), and the text wraps around it. `flow-root`
 * keeps a tall photo from spilling into the next section.
 */
function WriteUpSection({ title, section, accent }: { title: string; section: ProjectSection; accent: string }) {
  const points = section.points ?? []
  if (section.text.length === 0 && points.length === 0 && !section.image) return null
  return (
    <section className="flow-root">
      <h3 className="mb-3 font-display text-lg font-bold text-ink sm:text-xl">{title}</h3>
      {section.image && (
        <img
          src={asset(section.image.src)}
          alt={section.image.alt}
          loading="lazy"
          onError={hideIfMissing}
          // Phones get a little more than a third, or the text beside it is only a word or two wide
          className="float-right mb-3 ml-5 mt-1 max-h-[calc(var(--dialog-h)/3)] max-w-[45%] rounded-sm bg-canvas object-cover sm:max-w-[33.333%]"
        />
      )}
      <div className="space-y-4 leading-relaxed text-ink/90">
        {section.text.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      {points.length > 0 && (
        <ul className={`space-y-2.5 ${section.text.length > 0 ? 'mt-4' : ''}`}>
          {points.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-[0.7em] h-px w-3 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/**
 * Project details in a native <dialog>. showModal() gives focus trapping,
 * Escape handling and an inert page behind it without extra libraries.
 */
export default function ProjectDialog({ project, index, total, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  // Only close on a click that both starts and ends on the backdrop, so
  // selecting text inside and releasing outside doesn't close the dialog.
  const pressedBackdrop = useRef(false)
  // Which way the visitor stepped (1 next, -1 previous, 0 on open), so new content slides in from that side.
  const lastIndex = useRef(index)
  const direction = Math.sign(index - lastIndex.current)
  useEffect(() => {
    lastIndex.current = index
  }, [index])
  const step = direction
    ? { 'data-dir': direction, style: { '--dir': direction } as CSSProperties }
    : {}

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const returnFocus = document.activeElement as HTMLElement | null
    if (!dialog.open) dialog.showModal()
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    // Escape: let React own closing so state stays in sync.
    const onCancel = (e: Event) => {
      e.preventDefault()
      onClose()
    }
    dialog.addEventListener('cancel', onCancel)
    return () => {
      dialog.removeEventListener('cancel', onCancel)
      root.style.overflow = prevOverflow
      if (dialog.open) dialog.close()
      returnFocus?.focus({ preventScroll: true })
    }
  }, [onClose])

  // Start each project at the top when stepping through with previous/next.
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
    dialogRef.current?.scrollTo({ top: 0 })
  }, [project])

  const cover = project.cover || project.image

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      onPointerDown={(e) => {
        pressedBackdrop.current = e.target === e.currentTarget
      }}
      onClick={(e) => {
        if (pressedBackdrop.current && e.target === e.currentTarget) onClose()
        pressedBackdrop.current = false
      }}
      // A fixed height (--dialog-h) so the cover and section photos can be sized as a share of it
      className="m-auto h-(--dialog-h) max-h-none w-[calc(100%-1.5rem)] max-w-4xl flex-col overflow-hidden rounded-sm border border-line-strong bg-surface p-0 text-ink [--dialog-h:calc(100svh-1.5rem)] open:flex sm:[--dialog-h:calc(100svh-3rem)] [@media(max-height:37.5em)]:overflow-y-auto [@media(max-height:37.5em)]:open:block"
    >
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-6 border-b border-line px-6 py-5">
        <div key={index} className="dialog-step min-w-0" {...step}>
          <div className="mb-1.5 flex items-center gap-2.5 text-sm text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
            <span className="tabular-nums">{project.date}</span>
          </div>
          <h2 id="project-dialog-title" className="font-display text-2xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-3xl">
            {project.title}
          </h2>
          {project.subtitle && <p className="mt-1 text-muted">{project.subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className={`-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink ${PRESS}`}
        >
          <Close size={20} />
        </button>
      </div>

      {/* Scrollable body. On short screens (a phone turned sideways) the whole dialog
          scrolls instead, so the header can't crowd out the content. */}
      <div
        ref={bodyRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain [@media(max-height:37.5em)]:overflow-visible"
      >
        <div key={index} className="dialog-step" {...step}>
          {/* Cover photo, held to a third of the window's height */}
          {cover && (
            <img
              src={asset(cover)}
              alt={`${project.title}, cover photo`}
              onError={hideIfMissing}
              className="h-[calc(var(--dialog-h)/3)] w-full bg-canvas object-cover"
            />
          )}

          <div className="space-y-10 px-6 py-8 sm:px-8">
            {SECTIONS.map(({ key, title }) => (
              <WriteUpSection key={key} title={title} section={project[key]} accent={project.accent} />
            ))}

            {project.stack.length > 0 && (
              <section>
                <h3 className="mb-3 font-display text-lg font-bold text-ink sm:text-xl">Tools and processes</h3>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-sm bg-surface-2 px-2.5 py-1 text-sm text-ink/90">
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(project.link || project.repo) && (
              <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
                {project.link && <ExternalLink href={project.link}>Full project write-up</ExternalLink>}
                {project.repo && <ExternalLink href={project.repo}>Source files</ExternalLink>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer: step through projects without closing */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          disabled={index === 0}
          className={`flex h-11 items-center gap-1.5 rounded-sm px-3 font-display text-sm font-medium text-muted hover:text-ink disabled:invisible ${PRESS}`}
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <span className="text-sm tabular-nums text-muted" aria-live="polite">
          Project {index + 1} of {total}
        </span>
        <button
          type="button"
          onClick={() => onNavigate(1)}
          disabled={index === total - 1}
          className={`flex h-11 items-center gap-1.5 rounded-sm px-3 font-display text-sm font-medium text-muted hover:text-ink disabled:invisible ${PRESS}`}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </dialog>
  )
}
