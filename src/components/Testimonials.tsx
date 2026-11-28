import { useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../data'
import { CONTAINER, prefersReducedMotion, SECTION } from '../lib/utils'
import { ChevronLeft, ChevronRight } from './Icons'
import { button, SectionHeading, Visual } from './ui'

const ARROW = button({ variant: 'secondary', size: 'icon' })

/** First letter as the reader sees it, so accents and emoji stay whole. */
const initial = (name: string) => [...new Intl.Segmenter().segment(name.trim())][0]?.segment ?? ''

/** The person's photo cropped to a circle, or their initial when there's no photo (or it fails to load). */
function Avatar({ name, photo = '' }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState('')
  const ring = 'h-12 w-12 shrink-0 rounded-full border border-copper'
  if (photo && failed !== photo) {
    return (
      <Visual
        src={photo}
        alt=""
        onMissing={() => setFailed(photo)}
        className={`${ring} bg-canvas object-cover`}
      />
    )
  }
  return (
    <span aria-hidden="true" className={`${ring} flex items-center justify-center font-display text-xl font-bold text-copper`}>
      {initial(name)}
    </span>
  )
}

/**
 * Quotes in a horizontal row, divided by vertical rules. The row scrolls
 * sideways (swipe, trackpad, the arrow buttons, or arrow keys once focused)
 * and snaps to the start of each quote.
 */
export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () =>
      setEdges({
        start: track.scrollLeft <= 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
      })
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  // Move by one quote's width.
  const step = (direction: -1 | 1) => {
    const track = trackRef.current
    const item = track?.firstElementChild as HTMLElement | null
    if (!track || !item) return
    if (direction === -1 ? edges.start : edges.end) return
    track.scrollBy({ left: direction * item.offsetWidth, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  if (TESTIMONIALS.length === 0) return null

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading
          id="testimonials-heading"
          aside={
            !(edges.start && edges.end) && (
              // aria-disabled rather than disabled: a disabled button drops keyboard focus the moment the
              // row reaches its end, so the arrow stays focusable and step() ignores it instead.
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => step(-1)} aria-disabled={edges.start} className={ARROW}>
                  <ChevronLeft size={20} />
                  <span className="sr-only">Previous testimonial</span>
                </button>
                <button type="button" onClick={() => step(1)} aria-disabled={edges.end} className={ARROW}>
                  <ChevronRight size={20} />
                  <span className="sr-only">Next testimonial</span>
                </button>
              </div>
            )
          }
        >
          Testimonials
        </SectionHeading>

        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Testimonials, scrolls sideways"
          className="-mx-5 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:scroll-px-0 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map(({ quote, name, role, photo }, i) => (
            <li
              key={`${name}-${i}`}
              className={`flex w-[85%] shrink-0 snap-start flex-col justify-between gap-10 border-line-strong pr-8 sm:w-1/2 lg:w-1/3 lg:pr-12 ${
                i > 0 ? 'border-l pl-8 lg:pl-12' : ''
              }`}
            >
              <blockquote className="space-y-5 text-lg leading-relaxed text-ink/90">
                {quote.map((paragraph, j) => (
                  <p key={j}>
                    {j === 0 && '“'}
                    {paragraph}
                    {j === quote.length - 1 && '”'}
                  </p>
                ))}
              </blockquote>

              {/* Attribution, with the initial in a drawing-style callout balloon.
                  Top-aligned, so the balloon stays beside the name when a long role wraps. */}
              <div className="flex items-start gap-4">
                <Avatar name={name} photo={photo} />
                <p className="min-w-0 pt-1 text-sm leading-snug">
                  <span className="block font-medium text-ink">{name}</span>
                  <span className="text-muted">{role}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
