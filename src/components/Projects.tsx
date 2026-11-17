import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { PROJECTS, type Project } from '../content'
import { CONTAINER, useMediaQuery } from '../lib/utils'
import { ArrowDown, ArrowUpRight } from './Icons'
import ProjectDialog from './ProjectDialog'
import { Media, ProjectWriteup, Tags } from './ProjectWriteup'
import { SectionHeading } from './ui'

// The scroll-stacking cards need room and motion; everyone else gets a plain list.
const STACKED_QUERY = '(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'

function DateBadge({ date }: { date: string }) {
  return (
    <span className="absolute left-4 top-4 z-10 rounded-md bg-canvas/85 px-2.5 py-1 text-sm tabular-nums text-ink backdrop-blur-sm">
      {date}
    </span>
  )
}

/**
 * Desktop card: a fixed window over the full write-up. The cover photo and executive
 * summary fill the first view, and the rest scrolls inside the card. Once the card's
 * end is reached, scrolling carries on to the page and the next card slides in.
 */
function StackedCard({
  project,
  scrollable,
  style,
  inert,
}: {
  project: Project
  scrollable: boolean
  style: CSSProperties
  inert: boolean
}) {
  const [scrolled, setScrolled] = useState(false)
  return (
    <article
      style={style}
      inert={inert}
      aria-label={project.title}
      className="absolute inset-0 overflow-clip rounded-2xl border border-line bg-surface"
    >
      <div
        tabIndex={scrollable ? 0 : -1}
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 40)}
        className={`thin-scrollbar h-full focus-visible:outline-none ${scrollable ? 'overflow-y-auto' : 'overflow-y-hidden'}`}
      >
        <header className="relative h-[clamp(14rem,40svh,26rem)] overflow-hidden">
          <Media
            src={project.cover}
            alt=""
            label="Cover photo"
            className="absolute inset-0 h-full w-full border-0"
            placeholderClassName="items-end justify-start pr-6 pt-6 [&>*]:self-end"
          />
          <DateBadge date={project.date} />
          <div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/85 to-transparent px-8 pb-7 pt-20 xl:px-10"
          >
            <span className="mb-4 block h-1 w-8 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
            <h3 className="font-semiwide text-[clamp(1.6rem,2.4vw,2.4rem)] font-black leading-tight text-ink">
              {project.title}
            </h3>
            {project.subtitle && <p className="mt-1.5 text-lg text-steel">{project.subtitle}</p>}
            <p className="mt-2 text-sm text-muted">{project.context}</p>
          </div>
        </header>

        <div className="px-8 pb-16 pt-8 xl:px-10">
          <ProjectWriteup project={project} wide level={4} />
        </div>

        <div
          aria-hidden="true"
          className={`pointer-events-none sticky bottom-0 -mt-16 flex h-16 items-end justify-center bg-gradient-to-t from-surface to-transparent pb-3 transition-opacity duration-300 ${
            scrolled ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="flex items-center gap-1.5 rounded-full bg-canvas/85 px-3 py-1 text-xs text-muted backdrop-blur-sm">
            Scroll for the full write-up
            <ArrowDown size={13} />
          </span>
        </div>
      </div>
    </article>
  )
}

/** Mobile and fallback card: same size as before, with a View more button that opens the full write-up. */
function ListCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group relative flex flex-col overflow-clip rounded-2xl border border-line bg-surface transition-colors hover:border-brass/60 has-[button:focus-visible]:border-brass has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-brass">
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-canvas">
        <Media
          src={project.cover}
          alt=""
          label="Cover photo"
          className="h-full w-full border-0 transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <DateBadge date={project.date} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-6 p-6 sm:p-7">
        <div>
          <span className="mb-5 block h-1 w-8 rounded-full" style={{ backgroundColor: project.accent }} aria-hidden="true" />
          <h3 className="font-semiwide text-2xl font-black leading-tight text-ink sm:text-3xl">{project.title}</h3>
          {project.subtitle && <p className="mt-2 text-steel">{project.subtitle}</p>}
          <p className="mt-1.5 text-sm text-faint">{project.context}</p>
          <p className="mt-4 line-clamp-3 max-w-[60ch] leading-relaxed text-muted">{project.summary}</p>
        </div>

        <div className="space-y-6">
          <Tags items={project.tags} max={3} />
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brass/60 px-5 text-[0.95rem] font-semibold text-brass transition-colors after:absolute after:inset-0 after:content-[''] hover:border-brass group-hover:border-brass group-hover:bg-brass/10 focus-visible:outline-none"
          >
            View more
            <span className="sr-only">: {project.title}</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}

interface CardState {
  scale: number
  brightness: number
  translateY: number
  zIndex: number
  opacity: number
}

const total = PROJECTS.length
// Share of each card's scroll distance where it sits fully in place before the next
// one starts to slide in. Gives scrolling a moment to stop so the card can be read.
const DWELL = 0.4

function restingStates(): CardState[] {
  return PROJECTS.map((_, i) => ({
    scale: 1,
    brightness: 1,
    translateY: i === 0 ? 0 : 100,
    zIndex: i === 0 ? total + 1 : i,
    opacity: i === 0 ? 1 : 0,
  }))
}

/** Desktop: cards stack on top of each other as you scroll through a tall sticky section. */
function StackedProjects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [states, setStates] = useState<CardState[]>(restingStates)
  // `current` is the card fully in place; the next one may be sliding over it.
  const [position, setPosition] = useState({ current: 0, fraction: 0 })
  const { current: base, fraction: progress } = position
  // The card that dominates the view: drives the counter and progress bar.
  const shown = progress >= 0.5 ? Math.min(base + 1, total - 1) : base
  // Both the settled card and the one sliding in must be interactive, otherwise a
  // click on the incoming card falls through to the card underneath it.
  const isInteractive = (i: number) => i === base || (i === base + 1 && progress > 0.02)
  // Only a card that is fully in place scrolls inside. Otherwise the wheel would scroll
  // a half-arrived card's contents instead of moving the stack.
  const isScrollable = (i: number) => i === base && progress <= 0.02

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrolledIn = -rect.top
      const scrollable = rect.height - window.innerHeight
      if (scrolledIn <= 0 || scrollable <= 0) {
        setStates(restingStates())
        setPosition({ current: 0, fraction: 0 })
        return
      }
      const perCard = scrollable / (total - 1)
      const raw = Math.min(scrolledIn / perCard, total - 1)
      const current = Math.min(total - 1, Math.floor(raw))
      const fraction = Math.max(0, (raw - current - DWELL) / (1 - DWELL))
      setPosition({ current, fraction })
      setStates(
        PROJECTS.map((_, i): CardState => {
          if (i < current) {
            const depth = current - i
            return {
              scale: Math.max(0.84, 1 - depth * 0.04),
              brightness: Math.max(0.25, 1 - depth * 0.2),
              translateY: 0,
              zIndex: total - depth,
              opacity: depth > 3 ? 0 : 1,
            }
          }
          if (i === current) {
            return { scale: 1 - fraction * 0.04, brightness: 1 - fraction * 0.2, translateY: 0, zIndex: total + 1, opacity: 1 }
          }
          if (i === current + 1) {
            return { scale: 1, brightness: 1, translateY: (1 - fraction) * 100, zIndex: total + 2, opacity: fraction > 0.02 ? 1 : 0 }
          }
          return { scale: 1, brightness: 1, translateY: 100, zIndex: i, opacity: 0 }
        }),
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Progress buttons jump straight to a card's scroll position.
  const goTo = (i: number) => {
    const section = sectionRef.current
    if (!section) return
    const top = section.getBoundingClientRect().top + window.scrollY
    const perCard = (section.offsetHeight - window.innerHeight) / (total - 1)
    window.scrollTo({ top: top + i * perCard + 2, behavior: 'smooth' })
  }

  return (
    // The frame uses overflow-clip (not hidden): a hidden container is still
    // scrollable, so focusing a half-visible card would shift the whole deck.
    <div ref={sectionRef} style={{ height: `${total * 110 + 20}vh` }} className="relative">
      <div className={`${CONTAINER} sticky top-0 flex h-[100svh] flex-col overflow-clip pb-6 pt-24`}>
        <SectionHeading
          id="projects-heading"
          aside={
            <p className="mb-2 hidden shrink-0 text-sm text-muted lg:block">
              Scroll inside a card to read it, or pick one below
            </p>
          }
        >
          Projects
        </SectionHeading>

        <div className="relative -mt-4 min-h-0 flex-1 lg:-mt-8">
          {PROJECTS.map((project, i) => {
            const s = states[i]
            return (
              <StackedCard
                key={project.title}
                project={project}
                scrollable={isScrollable(i)}
                inert={!isInteractive(i)}
                style={{
                  transform: `scale(${s.scale}) translateY(${s.translateY}%)`,
                  filter: `brightness(${s.brightness})`,
                  zIndex: s.zIndex,
                  opacity: s.opacity,
                  transformOrigin: 'top center',
                }}
              />
            )
          })}
        </div>

        {/* Progress: one labelled button per project */}
        <nav aria-label="Projects" className="mt-5 flex shrink-0 items-center justify-center gap-2">
          {PROJECTS.map((project, i) => (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show project ${i + 1}: ${project.title}`}
              aria-current={i === shown ? 'step' : undefined}
              className="group flex h-8 items-center px-1"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-300 ${
                  i === shown ? 'w-10 bg-brass' : 'w-5 bg-line-strong group-hover:bg-muted'
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm tabular-nums text-muted">
            {shown + 1} / {total}
          </span>
        </nav>
      </div>
    </div>
  )
}

function ListProjects({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className={`${CONTAINER} py-24 lg:py-32`}>
      <SectionHeading id="projects-heading">Projects</SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <ListCard key={project.title} project={project} onOpen={() => onOpen(i)} />
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const stacked = useMediaQuery(STACKED_QUERY) && total > 1
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const close = useCallback(() => setOpenIndex(null), [])
  const navigate = useCallback(
    (direction: -1 | 1) => setOpenIndex((i) => (i === null ? i : Math.min(total - 1, Math.max(0, i + direction)))),
    [],
  )

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-t border-line">
      {stacked ? <StackedProjects /> : <ListProjects onOpen={setOpenIndex} />}
      {!stacked && openIndex !== null && (
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
