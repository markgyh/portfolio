import { useEffect, useRef } from 'react'
import type { Project } from '../content'
import { asset } from '../lib/utils'
import { ChevronLeft, ChevronRight, Close } from './Icons'
import { ExternalLink } from './ui'

interface Props {
  project: Project
  index: number
  total: number
  onClose: () => void
  onNavigate: (direction: -1 | 1) => void
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
  }, [project])

  const [cover, ...rest] = project.gallery

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
      className="m-auto h-[calc(100svh-1.5rem)] max-h-none w-[calc(100%-1.5rem)] max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl shadow-black/60 open:flex sm:h-auto sm:max-h-[calc(100svh-3rem)]"
    >
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-6 border-b border-line px-6 py-5">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2.5 text-sm text-muted">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
            <span className="tabular-nums">{project.date}</span>
          </div>
          <h2 id="project-dialog-title" className="font-semiwide text-2xl font-black leading-tight sm:text-3xl">
            {project.title}
          </h2>
          <p className="mt-1 text-muted">{project.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <Close size={20} />
        </button>
      </div>

      {/* Scrollable body */}
      <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {cover && (
          <img
            src={asset(cover)}
            alt={`${project.title}, photo 1`}
            className="aspect-video w-full bg-canvas object-cover"
          />
        )}

        <div className="space-y-8 px-6 py-7">
          <p className="max-w-[68ch] leading-relaxed text-ink/90">{project.details}</p>

          {project.outcomes.length > 0 && (
            <div>
              <h3 className="mb-3 font-semiwide text-lg font-bold">Key outcomes</h3>
              <ul className="space-y-2.5">
                {project.outcomes.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted">
                    <span
                      className="mt-[0.7em] h-px w-3 shrink-0"
                      style={{ backgroundColor: project.accent }}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {rest.map((src, i) => (
            <img
              key={src}
              src={asset(src)}
              alt={`${project.title}, photo ${i + 2}`}
              loading="lazy"
              className="aspect-video w-full rounded-xl bg-canvas object-cover"
            />
          ))}

          <div>
            <h3 className="mb-3 font-semiwide text-lg font-bold">Tools and processes</h3>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-md border border-line-strong px-2.5 py-1 text-sm text-ink/90">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {(project.link || project.repo) && (
            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
              {project.link && <ExternalLink href={project.link}>Full project write-up</ExternalLink>}
              {project.repo && <ExternalLink href={project.repo}>Source files</ExternalLink>}
            </div>
          )}
        </div>
      </div>

      {/* Footer: step through projects without closing */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          disabled={index === 0}
          className="flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-ink disabled:invisible"
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
          className="flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-ink disabled:invisible"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </dialog>
  )
}
