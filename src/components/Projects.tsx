import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PROJECTS, type Project } from '../data'
import { CONTAINER, projectHash, SECTION, useMediaQuery } from '../lib/utils'
import { ArrowRight, Datum } from './Icons'
import ProjectDialog from './ProjectDialog'
import { Media } from './ProjectWriteup'
import { button, SectionHeading, TagLine, TEXT_LINK_BASE } from './ui'

/** Lines of text an element currently takes up. */
const linesOf = (el: HTMLElement | null) =>
  el ? Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)) : 0

/**
 * The summary gets 4 lines when the title and subtitle fit on a single line between them,
 * and 3 when they need more, so the text block stays about the same height card to card.
 * Re-checked as the card's width changes.
 */
function useSummaryLines() {
  const titleRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [lines, setLines] = useState<3 | 4>(3)
  useLayoutEffect(() => {
    const title = titleRef.current
    if (!title) return
    const check = () => setLines(linesOf(title) + linesOf(subtitleRef.current) <= 1 ? 4 : 3)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(title)
    if (subtitleRef.current) observer.observe(subtitleRef.current)
    document.fonts?.ready.then(check)
    return () => observer.disconnect()
  }, [])
  return { titleRef, subtitleRef, lines }
}

/**
 * Card whose title button is stretched over the whole card, so the full card is clickable.
 * Long text is clamped so every card in a row lines up; the project window shows it in full.
 * `featured` cards (pinned in content.ts) get a taller cover, a larger title and a visible label.
 */
function ProjectCard({ project, onOpen, featured = false }: { project: Project; onOpen: () => void; featured?: boolean }) {
  const { titleRef, subtitleRef, lines } = useSummaryLines()
  return (
    <article
      className={`group relative flex flex-col overflow-clip rounded-panel border bg-surface transition-colors hover:border-copper/60 has-[button:focus-visible]:border-copper has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-copper ${
        featured ? 'border-line-strong' : 'border-line'
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-canvas ${featured ? 'aspect-[4/3]' : 'aspect-[16/10]'}`}>
        <Media src={project.cover} alt="" label="Cover photo" className="h-full w-full" />
        <span className="absolute left-3 top-3 flex items-center gap-2 rounded-sm bg-canvas px-2 py-0.5 text-sm tabular-nums text-ink">
          {featured && (
            <>
              <span className="flex items-center gap-1.5 font-medium text-copper-strong">
                <Datum size={11} />
                Featured
              </span>
              <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
            </>
          )}
          {project.date}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
        <div>
          <span className="mb-4 block h-1 w-8" style={{ backgroundColor: project.accent }} aria-hidden="true" />
          <h3
            className={`font-display font-bold leading-tight text-ink [overflow-wrap:anywhere] ${
              featured ? 'text-2xl sm:text-[1.65rem]' : 'text-xl sm:text-2xl'
            }`}
          >
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="block w-full text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {/* The clamp sits on the text, since a button's own lines don't count towards its parent's clamp */}
              <span ref={titleRef} className="line-clamp-2">{project.title}</span>
            </button>
          </h3>
          {project.subtitle && <p ref={subtitleRef} className="mt-1.5 line-clamp-2 text-[0.95rem] text-cyan">{project.subtitle}</p>}
          {project.context && <p className="mt-1 line-clamp-1 text-sm text-faint">{project.context}</p>}
          <p className={`mt-3 text-[0.95rem] leading-relaxed text-muted ${lines === 4 ? 'line-clamp-4' : 'line-clamp-3'}`}>
            {project.teaser || project.summary}
          </p>
        </div>

        {/* Pinned to the bottom so the links line up across a row */}
        <div className="mt-auto space-y-5">
          <TagLine items={project.tags} label={`Tools used on ${project.title}`} />
          {/* Opens in-page, so it gets a forward arrow: the outbound arrow is kept for links that leave the site */}
          <span aria-hidden="true" className={`${TEXT_LINK_BASE} group-hover:decoration-copper`}>
            View details
            <ArrowRight size={16} className="transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

const total = PROJECTS.length
const featuredCount = PROJECTS.filter((p) => p.pinned).length
const HASHES = PROJECTS.map((p) => projectHash(p.title))
/** Index of the project the URL's #project-… hash names, or null. */
const indexFromHash = () => {
  const i = HASHES.indexOf(decodeURIComponent(window.location.hash.slice(1)))
  return i === -1 ? null : i
}

export default function Projects() {
  // Open whichever project the URL names, so a shared link lands straight in its window.
  const [openIndex, setOpenIndex] = useState<number | null>(indexFromHash)
  const [expanded, setExpanded] = useState(false)
  const wide = useMediaQuery('(min-width: 1024px)')
  const moreRef = useRef<HTMLDivElement>(null)

  // Keep the URL in step with the open project (replaceState: stepping through projects
  // shouldn't fill the back button), and follow links to a project from elsewhere on the page.
  useEffect(() => {
    const url = openIndex === null ? `${location.pathname}${location.search}` : `#${HASHES[openIndex]}`
    if (openIndex !== null || HASHES.includes(location.hash.slice(1))) history.replaceState(null, '', url)
  }, [openIndex])
  useEffect(() => {
    const onHash = () => {
      const i = indexFromHash()
      if (i !== null) setOpenIndex(i)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const close = useCallback(() => setOpenIndex(null), [])
  const navigate = useCallback(
    (direction: -1 | 1) => setOpenIndex((i) => (i === null ? i : Math.min(total - 1, Math.max(0, i + direction)))),
    [],
  )

  if (total === 0) return null

  // Featured work leads in its own band. The rest show two rows (one on phones), then the button.
  const featured = PROJECTS.slice(0, featuredCount)
  const rest = PROJECTS.slice(featuredCount)
  const preview = wide ? 6 : 3
  const shown = expanded ? rest : rest.slice(0, preview)
  const hidden = rest.length - shown.length

  const showAll = () => {
    setExpanded(true)
    // Move focus to the first newly shown card, so keyboard users carry on from where the button was
    requestAnimationFrame(() => moreRef.current?.querySelectorAll<HTMLButtonElement>('article button')[preview]?.focus({ preventScroll: true }))
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading id="projects-heading">Projects</SectionHeading>

        {featured.length > 0 && (
          <div className="mb-16 lg:mb-20">
            <h3 className="sr-only">Featured projects</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {featured.map((project, i) => (
                <ProjectCard key={`${project.title}-${i}`} project={project} featured onOpen={() => setOpenIndex(i)} />
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div ref={moreRef}>
            {featured.length > 0 && (
              <div className="mb-8 flex items-baseline gap-4">
                <h3 className="font-display text-xl font-bold text-ink">More projects</h3>
                <span className="text-sm tabular-nums text-faint">{rest.length}</span>
                <span className="h-px flex-1 self-center bg-line" aria-hidden="true" />
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {shown.map((project, i) => (
                <ProjectCard
                  key={`${project.title}-${i}`}
                  project={project}
                  onOpen={() => setOpenIndex(featuredCount + i)}
                />
              ))}
            </div>
            {hidden > 0 && (
              <div className="mt-10 flex justify-center">
                <button type="button" onClick={showAll} className={button({ variant: 'secondary', size: 'lg' })}>
                  Show all {rest.length} projects
                </button>
              </div>
            )}
          </div>
        )}
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
