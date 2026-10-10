import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { PROJECTS, type Project } from '../content'
import { asset, CONTAINER, useMediaQuery } from '../lib/utils'
import { ArrowUpRight } from './Icons'
import ProjectDialog from './ProjectDialog'
import { SectionHeading } from './ui'

// The scroll-stacking cards need room and motion; everyone else gets a plain list.
const STACKED_QUERY = '(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tools and processes">
      {items.map((tech) => (
        <li key={tech} className="rounded-md border border-line-strong px-2.5 py-1 text-[0.8rem] text-muted">
          {tech}
        </li>
      ))}
    </ul>
  )
}

/** Card whose title button is stretched over the whole card, so the full card is clickable. */
function ProjectCard({
  project,
  onOpen,
  layout,
  style,
  inert,
}: {
  project: Project
  onOpen: () => void
  layout: 'stacked' | 'list'
  style?: CSSProperties
  inert?: boolean
}) {
  const stacked = layout === 'stacked'
  return (
    <article
      style={style}
      inert={inert}
      className={`group overflow-clip rounded-2xl border border-line bg-surface transition-colors hover:border-brass/60 has-[button:focus-visible]:border-brass has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-brass ${
        stacked ? 'absolute inset-0 flex' : 'relative flex flex-col'
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-canvas ${stacked ? 'w-[55%]' : 'aspect-[16/9]'}`}>
        <img
          src={asset(project.image)}
          alt=""
          loading={stacked ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <span className="absolute left-4 top-4 rounded-md bg-canvas/85 px-2.5 py-1 text-sm tabular-nums text-ink backdrop-blur-sm">
          {project.date}
        </span>
      </div>

      <div className={`flex min-h-0 flex-1 flex-col justify-between ${stacked ? 'gap-5 p-8 xl:p-10' : 'gap-6 p-6 sm:p-7'}`}>
        <div>
          <span className={`block h-1 w-8 rounded-full ${stacked ? 'mb-4' : 'mb-5'}`} style={{ backgroundColor: project.accent }} aria-hidden="true" />
          <h3
            className={`font-semiwide font-black leading-tight text-ink ${
              stacked ? 'text-[clamp(1.6rem,2.4vw,2.4rem)]' : 'text-2xl sm:text-3xl'
            }`}
          >
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.title}
            </button>
          </h3>
          <p className="mt-2 text-steel">{project.subtitle}</p>
          <p className={`mt-4 max-w-[60ch] leading-relaxed text-muted ${stacked ? 'line-clamp-3' : ''}`}>{project.summary}</p>
        </div>

        <div className={stacked ? 'space-y-5' : 'space-y-6'}>
          <Tags items={project.stack} />
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 font-medium text-brass underline decoration-brass/40 underline-offset-[5px] transition-colors group-hover:decoration-brass"
          >
            View details
            <ArrowUpRight size={15} />
          </span>
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
function StackedProjects({ onOpen }: { onOpen: (i: number) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [states, setStates] = useState<CardState[]>(restingStates)
  // `current` is the card fully in place; the next one may be sliding over it.
  const [position, setPosition] = useState({ current: 0, fraction: 0 })
  const { current: base, fraction: progress } = position
  // The card that dominates the view: drives the counter and progress bar.
  const shown = progress >= 0.5 ? Math.min(base + 1, total - 1) : base
  // Both the settled card and the one sliding in must be clickable, otherwise a
  // click on the incoming card falls through to the card underneath it.
  const isInteractive = (i: number) => i === base || (i === base + 1 && progress > 0.02)

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
      const fraction = raw - current
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
              Scroll to flip through, or pick one below
            </p>
          }
        >
          Projects
        </SectionHeading>

        <div className="relative -mt-4 min-h-0 flex-1 lg:-mt-8">
          {PROJECTS.map((project, i) => {
            const s = states[i]
            return (
              <ProjectCard
                key={project.title}
                project={project}
                layout="stacked"
                onOpen={() => onOpen(i)}
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
          <ProjectCard key={project.title} project={project} layout="list" onOpen={() => onOpen(i)} />
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
      {stacked ? <StackedProjects onOpen={setOpenIndex} /> : <ListProjects onOpen={setOpenIndex} />}
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
