import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import type { Project } from '../data'
import { ChevronLeft, ChevronRight, Close } from './Icons'
import { CAPTION, Media, ProjectWriteup, sectionId } from './ProjectWriteup'
import { button } from './ui'

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
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  // Stepping onto the first or last project disables (and hides) the button just pressed, which
  // would drop keyboard focus to the page. Hand it to the button that still works instead.
  const go = (d: -1 | 1) => {
    onNavigate(d)
    const next = index + d
    const atStart = next <= 0
    const atEnd = next >= total - 1
    if (atStart && atEnd) closeRef.current?.focus()
    else if (atStart) nextRef.current?.focus()
    else if (atEnd) prevRef.current?.focus()
  }
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
      className="m-auto h-(--dialog-h) max-h-none w-[calc(100%-2.5rem)] max-w-4xl flex-col overflow-hidden rounded-panel border border-line-strong bg-surface p-0 text-ink [--dialog-h:calc(100svh-4rem)] open:flex sm:w-[calc(100%-1.5rem)] sm:[--dialog-h:calc(100svh-3rem)] [@media(max-height:37.5em)]:overflow-y-auto [@media(max-height:37.5em)]:open:block"
    >
      {/* Header */}
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-3.5 sm:gap-6 sm:px-6 sm:py-5">
        <div key={index} className="dialog-step min-w-0" {...step}>
          <div className="mb-1 flex items-center gap-2.5 text-sm text-muted sm:mb-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
            <span className="tabular-nums">{project.date}</span>
          </div>
          <h2 id="project-dialog-title" className="font-display text-xl font-bold leading-tight [overflow-wrap:anywhere] sm:text-3xl">
            {project.title}
          </h2>
          {project.subtitle && <p className="mt-1 text-cyan">{project.subtitle}</p>}
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className={`-mr-2 ${button({ variant: 'ghost', size: 'icon' })}`}
        >
          <Close size={20} />
        </button>
      </div>

      {/* Scrollable body. On short screens (a phone turned sideways) the whole dialog
          scrolls instead, so the header can't crowd out the content. */}
      <div
        ref={bodyRef}
        // A size container, so the video can be sized to fit this scrolling area (100cqh). Not on
        // short screens, where the body grows with its content and the whole dialog scrolls instead.
        className="min-h-0 flex-1 overflow-x-clip overflow-y-auto overscroll-contain [container-type:size] [@media(max-height:37.5em)]:overflow-visible [@media(max-height:37.5em)]:[container-type:normal]"
      >
        <SectionIndex project={project} scroller={bodyRef} />
        <div key={index} className="dialog-step" {...step}>
          {/* Cover photo, held to a third of the window's height. coverPosition picks which part stays in frame. */}
          <Media
            src={project.cover}
            alt={`${project.title}, cover photo`}
            label="Cover photo"
            position={project.coverPosition}
            className="block h-[calc(var(--dialog-h)/3)] w-full"
          />
          {project.coverCaption && <p className={`px-6 sm:px-8 ${CAPTION}`}>{project.coverCaption}</p>}

          <div className="px-6 py-8 sm:px-8">
            <ProjectWriteup project={project} level={3} />
          </div>
        </div>
      </div>

      {/* Footer: step through projects without closing */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-6">
        <button
          ref={prevRef}
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          className={`${button({ variant: 'ghost' })} disabled:invisible`}
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <span className="whitespace-nowrap text-sm tabular-nums text-muted" aria-live="polite">
          {/* "Project" drops on phones, where the inset window is too narrow for it */}
          <span className="max-sm:sr-only">Project </span>
          {index + 1} of {total}
        </span>
        <button
          ref={nextRef}
          type="button"
          onClick={() => go(1)}
          disabled={index === total - 1}
          className={`${button({ variant: 'ghost' })} disabled:invisible`}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </dialog>
  )
}

/**
 * A row of section links pinned to the top of the scrolling body (tablet and up), so a long
 * write-up can be skimmed and jumped through. Labels come from each section's `label` in content.ts.
 */
function SectionIndex({ project, scroller }: { project: Project; scroller: RefObject<HTMLDivElement | null> }) {
  const items = [
    { id: sectionId(-1), label: 'Overview' },
    ...project.sections.map((section, i) => ({ id: sectionId(i), label: section.label || section.heading })),
  ]
  if (items.length < 3) return null
  const jump = (id: string) => {
    const body = scroller.current
    const target = body?.querySelector<HTMLElement>(`#${id}`)
    if (!body || !target) return
    // scroll-margin on each section keeps its heading clear of this row
    target.scrollIntoView({ block: 'start' })
  }
  return (
    <nav
      aria-label="Sections of this project"
      className="sticky top-0 z-10 hidden border-b border-line bg-surface/95 px-6 backdrop-blur-sm sm:block sm:px-8"
    >
      <ul className="flex gap-1 overflow-x-auto py-2">
        {items.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => jump(id)}
              className={`${button({ variant: 'ghost', size: 'sm' })} whitespace-nowrap`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
