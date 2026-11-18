import { useEffect, useRef, type CSSProperties } from 'react'
import type { Project } from '../data'
import { ChevronLeft, ChevronRight, Close } from './Icons'
import { Media, ProjectWriteup } from './ProjectWriteup'
import { PRESS } from './ui'

interface Props {
  project: Project
  index: number
  total: number
  onClose: () => void
  onNavigate: (direction: -1 | 1) => void
}

/**
 * Full project write-up in a native <dialog>. showModal() gives focus trapping,
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
          {project.subtitle && <p className="mt-1 text-cyan">{project.subtitle}</p>}
          {project.context && <p className="mt-1 text-sm text-muted">{project.context}</p>}
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
          <Media
            src={project.cover}
            alt={`${project.title}, cover photo`}
            label="Cover photo"
            className="h-[calc(var(--dialog-h)/3)] w-full"
          />

          <div className="px-6 py-8 sm:px-8">
            <ProjectWriteup project={project} level={3} />
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
