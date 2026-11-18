import type { ReactNode } from 'react'
import type { Project, ProjectBlock } from '../data'
import { asset, hideIfMissing } from '../lib/utils'
import { ImageIcon } from './Icons'

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

/** A photo filling its frame (card, cover), or a placeholder panel while the path in content.ts is still ''. */
export function Media({ src, alt, label = 'Photo', className = '' }: { src: string; alt: string; label?: string; className?: string }) {
  if (!src) return <Placeholder label={label} icon={<ImageIcon size={22} />} className={className} />
  return <img src={asset(src)} alt={alt} loading="lazy" onError={hideIfMissing} className={`bg-canvas object-cover ${className}`} />
}

/**
 * Photo beside a section: floats right, at most a third of the window's width and
 * height (`--dialog-h`), and the text wraps around it. Phones get a little more than a
 * third, or the text beside it is only a word or two wide.
 * With no photo ('' in content.ts, or a file that fails to load) nothing is drawn and
 * the text takes the full width.
 */
function SidePhoto({ src, alt }: { src: string; alt: string }) {
  if (!src) return null
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading="lazy"
      onError={hideIfMissing}
      className="float-right mb-3 ml-5 mt-1 max-h-[calc(var(--dialog-h)/3)] max-w-[45%] rounded-sm bg-canvas object-cover sm:max-w-[33.333%]"
    />
  )
}

/**
 * The project video, under its own divider. With no video ('' in content.ts) nothing is
 * drawn; a video file that fails to load removes the divider along with it.
 */
function Video({ src, title }: { src: string; title: string }) {
  if (!src) return null
  return (
    <div className="border-t border-line pt-10">
      {/\.(mp4|webm|mov)$/i.test(src) ? (
        <video
          src={asset(src)}
          controls
          preload="metadata"
          onError={(e) => hideIfMissing({ currentTarget: e.currentTarget.parentElement ?? e.currentTarget })}
          className="aspect-video w-full rounded-sm bg-canvas"
        />
      ) : (
        <iframe
          src={src}
          title={`${title}: project video`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="aspect-video w-full rounded-sm border-0 bg-canvas"
        />
      )}
    </div>
  )
}

function Block({ block, accent, level }: { block: ProjectBlock; accent: string; level: Level }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="leading-relaxed text-ink/90">
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
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-[0.75em] h-px w-3 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
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
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-2.5 font-semibold text-ink">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')} className="border-t border-line">
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

const TAG = 'rounded-sm bg-surface-2 px-2.5 py-1 text-[0.8rem] text-muted'

/** Tools list. Past `limit` the rest collapse into a count; the project window shows them all. */
export function Tags({ items, limit = Infinity }: { items: string[]; limit?: number }) {
  if (items.length === 0) return null
  const shown = items.length > limit ? items.slice(0, limit - 1) : items
  const hidden = items.length - shown.length
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tools and processes">
      {shown.map((tag) => (
        <li key={tag} className={TAG}>
          {tag}
        </li>
      ))}
      {hidden > 0 && <li className={TAG}>+{hidden} more</li>}
    </ul>
  )
}

function Facts({ facts }: { facts: Project['facts'] }) {
  if (facts.length === 0) return null
  return (
    <dl className="grid gap-x-8 gap-y-3 text-[0.95rem] sm:grid-cols-2">
      {facts.map(({ label, value }) => (
        <div key={label + value} className={label === 'Role' ? 'sm:col-span-2' : ''}>
          {label && <dt className="text-sm font-medium text-cyan">{label}</dt>}
          <dd className={label ? 'mt-0.5 text-ink/90' : 'text-muted'}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * The full write-up shown in the project window: executive summary, each section the
 * document covers, then the video. Each section is `flow-root`, so a tall side photo
 * never spills into the next one.
 */
export function ProjectWriteup({ project, level }: { project: Project; level: Level }) {
  const sub = Math.min(level + 1, 6) as Level
  const headingClass = 'mb-4 font-display text-lg font-bold leading-snug text-ink sm:text-xl'

  return (
    <div className="space-y-12">
      <section className="flow-root">
        <Heading level={level} className={headingClass}>
          Executive summary
        </Heading>
        <SidePhoto src={project.summaryImage} alt={project.title} />
        <div className="space-y-6">
          <p className="text-[1.05rem] leading-relaxed text-ink/90">{project.summary}</p>
          <Facts facts={project.facts} />
          <Tags items={project.tags} />
        </div>
      </section>

      {project.sections.map((section) => (
        <section key={section.heading} className="flow-root border-t border-line pt-10">
          <Heading level={level} className={headingClass}>
            {section.heading}
          </Heading>
          <SidePhoto src={section.image} alt={`${project.title}: ${section.heading}`} />
          <div className="space-y-5">
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} accent={project.accent} level={sub} />
            ))}
          </div>
        </section>
      ))}

      <Video src={project.video} title={project.title} />
    </div>
  )
}
