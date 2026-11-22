import { Fragment, useState, type CSSProperties, type ReactNode } from 'react'
import type { Project, ProjectBlock } from '../data'
import { asset, hideIfMissing, safeUrl } from '../lib/utils'
import { ImageIcon } from './Icons'
import { isVideoFile, Tags, Visual } from './ui'

type Level = 2 | 3 | 4 | 5 | 6

function Heading({ level, className, children }: { level: Level; className: string; children: ReactNode }) {
  const Tag = `h${level}` as const
  return <Tag className={className}>{children}</Tag>
}

/** Labelled panel shown where a cover photo goes while its path in content.ts is still ''. */
function Placeholder({ label, icon, className }: { label: string; icon: ReactNode; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center justify-center gap-2 bg-canvas/70 p-4 text-center text-sm text-faint ${className}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

/**
 * A photo (or short clip) filling its frame (card, cover), or a labelled placeholder panel while
 * the path in content.ts is still '' or the file fails to load, so the frame is never left blank.
 */
export function Media({
  src,
  alt,
  label = 'Photo',
  className = '',
  position,
}: {
  src: string
  alt: string
  label?: string
  className?: string
  /** CSS object-position: which part of the photo stays in frame when it's cropped. */
  position?: string
}) {
  const [failed, setFailed] = useState('')
  if (!src || failed === src) return <Placeholder label={label} icon={<ImageIcon size={22} />} className={className} />
  return (
    <Visual
      src={src}
      alt={alt}
      onMissing={() => setFailed(src)}
      className={`bg-canvas object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}

/** Reading measure for running text: about 70 characters a line (62ch of Plex Sans's wide zero). Tables and photos still take the full width. */
const MEASURE = 'max-w-[62ch]'

/** Small muted caption under a photo. */
export const CAPTION = 'mt-2 text-sm leading-snug text-muted'

/**
 * Title-cases a tag ("PETG 3D printing" → "PETG 3D Printing"). Only first letters are raised,
 * so acronyms (DFMA, ESP32) keep their case; short joining words stay lower case unless first.
 */
const MINOR_WORDS = new Set(['a', 'an', 'and', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs', 'with'])
export function properCase(text: string) {
  return text.replace(/[\p{L}\p{N}]+/gu, (word: string, offset: number) =>
    offset > 0 && text[offset - 1] === ' ' && MINOR_WORDS.has(word.toLowerCase())
      ? word.toLowerCase()
      : word[0].toUpperCase() + word.slice(1),
  )
}

/**
 * Photo beside a section: floats right, at most a third of the window's width and
 * height (`--dialog-h`), and the text wraps around it. Phones get a little more than a
 * third, or the text beside it is only a word or two wide.
 * With no photo ('' in content.ts, or a file that fails to load) nothing is drawn and
 * the text takes the full width.
 */
function SidePhoto({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  if (!src) return null
  const photo = 'max-h-[calc(var(--dialog-h)/3)] rounded-sm bg-canvas object-cover'
  if (!caption) {
    return <Visual src={src} alt={alt} className={`float-right mb-3 ml-5 mt-1 max-w-[45%] sm:max-w-[33.333%] ${photo}`} />
  }
  // The figure is as wide as the photo; `w-0 min-w-full` keeps a long caption from widening it.
  return (
    <figure className="float-right mb-3 ml-5 mt-1 w-fit max-w-[45%] sm:max-w-[33.333%]">
      <Visual src={src} alt={alt} hideParent className={`block max-w-full ${photo}`} />
      <figcaption className={`w-0 min-w-full ${CAPTION}`}>{caption}</figcaption>
    </figure>
  )
}

/**
 * Photo (or clip) for a section that has a table. Tables take the full width, so a photo floated
 * beside the text above one would push it down and leave a gap; instead it sits under the table,
 * at most half the window's height. Missing files hide themselves.
 */
function BelowPhoto({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  if (!src) return null
  return (
    <figure className="w-fit max-w-full">
      <Visual
        src={src}
        alt={alt}
        hideParent
        className="block h-auto max-h-[calc(var(--dialog-h)/2)] w-auto max-w-full rounded-sm bg-canvas object-contain"
      />
      {caption && <figcaption className={`w-0 min-w-full ${CAPTION}`}>{caption}</figcaption>}
    </figure>
  )
}

/**
 * The project video, shown right under the facts: it's the strongest evidence, so it comes early.
 * The cover photo is its poster, so it never shows as an empty black frame. With no video
 * ('' in content.ts) nothing is drawn; a video file that fails to load hides itself.
 * Its height is capped to the scrolling body's height (100cqh, the body in ProjectDialog
 * is a size container) less the padding around it, so scrolled to the bottom the whole
 * video, landscape or portrait, sits in view.
 */
function Video({ src, title, poster }: { src: string; title: string; poster: string }) {
  const embed = isVideoFile(src) ? '' : safeUrl(src)
  if (!src || (!isVideoFile(src) && !embed)) return null
  return (
    <div>
      {isVideoFile(src) ? (
        <video
          src={asset(src)}
          poster={poster ? asset(poster) : undefined}
          aria-label={`${title}: project video`}
          controls
          preload="metadata"
          onError={(e) => hideIfMissing({ currentTarget: e.currentTarget.parentElement ?? e.currentTarget })}
          className="mx-auto block h-auto max-h-[calc(100cqh-4rem)] w-auto max-w-full rounded-sm bg-canvas"
        />
      ) : (
        <iframe
          src={embed}
          referrerPolicy="strict-origin-when-cross-origin"
          title={`${title}: project video`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="mx-auto block aspect-video w-full max-w-[calc((100cqh-4rem)*16/9)] rounded-sm border-0 bg-canvas"
        />
      )}
    </div>
  )
}

function Block({ block, accent, level }: { block: ProjectBlock; accent: string; level: Level }) {
  switch (block.type) {
    case 'p':
      return (
        <p className={`${MEASURE} leading-relaxed text-ink/90`}>
          {block.lead && (
            <>
              <strong className="font-semibold text-ink">{block.lead}</strong>
              {/^[,.;:]/.test(block.text) ? '' : ' '}
            </>
          )}
          {block.text}
        </p>
      )
    case 'subheading':
      return (
        <Heading level={level} className="pt-1 font-display text-base font-bold text-ink">
          {block.text}
        </Heading>
      )
    case 'list':
      return (
        <ul className={`${MEASURE} space-y-2.5`}>
          {block.items.map((item, i) => (
            <li key={`${item}-${i}`} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-[calc(0.8125em-3px)] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'table':
      // Tables clear the side photo and take the full width, so their columns aren't squeezed
      return (
        <div className="clear-right overflow-x-auto rounded-sm border border-line">
          <table className="w-full border-collapse text-left text-[0.92rem]">
            <thead className="bg-surface-2/70">
              <tr>
                {block.head.map((h, i) => (
                  <th key={`${h}-${i}`} scope="col" className="px-4 py-2.5 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-line">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-2.5 align-top font-medium text-ink/90">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-2.5 align-top tabular-nums text-muted">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

// Facts run in this order ("Budget Modelled" counts as budget); anything else follows.
const FACT_ORDER = ['role', 'team', 'budget', 'timeline']
const factRank = (label: string) => {
  const i = FACT_ORDER.findIndex((key) => label.toLowerCase().startsWith(key))
  return i === -1 ? FACT_ORDER.length : i
}
/** A bare head count ("6") reads as "6 people". */
const factValue = (label: string, value: string) => {
  const v = value.trim()
  return /^team/i.test(label) && /^\d+$/.test(v) ? `${v} ${v === '1' ? 'person' : 'people'}` : value
}

/**
 * The project's key facts as a drawing title block (the same cells as the site footer):
 * role, team, budget, timeline and where the project came from, read before anything else.
 */
function FactStrip({ facts, context }: { facts: Project['facts']; context: string }) {
  const ordered = [...facts].sort((a, b) => factRank(a.label) - factRank(b.label))
  const cells = context ? [...ordered, { label: 'Context', value: context }] : ordered
  if (cells.length === 0) return null
  // Spans, so every row of the block is filled. Phones (2 columns): the role and context take a
  // full row each and the short facts pair up. Wider (4 columns): the role takes two, the short
  // facts one each, the context a row of its own. An odd one out stretches to close its row.
  const isRole = (label: string) => /^role/i.test(label)
  const isContext = (label: string) => /^context/i.test(label)
  const spans = (cols: number, roleSpan: number) => {
    const short = cells.filter((c) => !isRole(c.label) && !isContext(c.label))
    const roles = cells.filter((c) => isRole(c.label))
    const used = roles.length * roleSpan + short.length
    const rem = used % cols
    return cells.map((c) => {
      if (isContext(c.label)) return cols
      if (isRole(c.label)) return short.length === 0 ? cols : roleSpan
      return rem && c === short.at(-1) ? 1 + cols - rem : 1
    })
  }
  const phone = spans(2, 2)
  const wide = spans(4, 2)
  return (
    <dl className="grid grid-cols-2 border-l border-t border-line-strong sm:grid-cols-4">
      {cells.map((cell, i) => {
        const { label, value } = cell
        return (
        <div
          key={`${label}-${i}`}
          style={{ '--span': phone[i], '--span-sm': wide[i] } as CSSProperties}
          className="col-span-(--span) border-b border-r border-line-strong px-4 py-3 sm:col-span-(--span-sm)"
        >
          {label && <dt className="text-xs text-faint">{label}</dt>}
          <dd className="mt-0.5 font-display font-semibold leading-snug text-ink [overflow-wrap:anywhere]">
            {factValue(label, value)}
          </dd>
        </div>
        )
      })}
    </dl>
  )
}

/** Id of a write-up section (-1 is the overview), for the section index in the project window. */
export const sectionId = (i: number) => (i < 0 ? 'writeup-overview' : `writeup-section-${i}`)

/**
 * The full write-up shown in the project window: the facts, the video, an overview, then each
 * section the document covers. Each section is `flow-root`, so a tall side photo never spills
 * into the next one.
 */
export function ProjectWriteup({ project, level }: { project: Project; level: Level }) {
  const sub = Math.min(level + 1, 6) as Level
  const headingClass = 'mb-4 font-display text-lg font-bold leading-snug text-ink sm:text-xl'

  return (
    <div className="space-y-12">
      <div className="space-y-10">
        <FactStrip facts={project.facts} context={project.context} />
        <Video src={project.video} title={project.title} poster={project.cover} />
      </div>

      <section id={sectionId(-1)} className="flow-root scroll-mt-20">
        <Heading level={level} className={headingClass}>
          Overview
        </Heading>
        <SidePhoto src={project.summaryImage} alt={`${project.title}, overview photo`} caption={project.summaryCaption} />
        <div className="space-y-6">
          <p className={`${MEASURE} text-[1.05rem] leading-relaxed text-ink/90`}>{project.summary}</p>
          <Tags items={project.tags.map(properCase)} label="Tools and processes" />
        </div>
      </section>

      {project.sections.map((section, i) => {
        const alt = `${project.title}: ${section.heading}`
        // With a table in the section, the photo goes under the (last) table instead of beside the text
        const lastTable = section.blocks.map((b) => b.type).lastIndexOf('table')
        return (
          <section key={`${section.heading}-${i}`} id={sectionId(i)} className="flow-root scroll-mt-20 border-t border-line pt-10">
            <Heading level={level} className={headingClass}>
              {section.heading}
            </Heading>
            {lastTable === -1 && <SidePhoto src={section.image} alt={alt} caption={section.caption} />}
            <div className="space-y-5">
              {section.blocks.map((block, j) => (
                <Fragment key={j}>
                  <Block block={block} accent={project.accent} level={sub} />
                  {j === lastTable && <BelowPhoto src={section.image} alt={alt} caption={section.caption} />}
                </Fragment>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
