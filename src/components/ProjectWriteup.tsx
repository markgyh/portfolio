import type { ReactNode } from 'react'
import type { Project, ProjectBlock } from '../content'
import { asset } from '../lib/utils'
import { ImageIcon, Play } from './Icons'

type Level = 2 | 3 | 4 | 5 | 6

function Heading({ level, className, children }: { level: Level; className: string; children: ReactNode }) {
  const Tag = `h${level}` as const
  return <Tag className={className}>{children}</Tag>
}

/** A photo, or a labelled dashed frame while the path in content.ts is still ''. */
export function Media({
  src,
  alt,
  label = 'Photo',
  className = '',
  placeholderClassName = 'items-center justify-center',
}: {
  src: string
  alt: string
  label?: string
  className?: string
  placeholderClassName?: string
}) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={`flex flex-col gap-2 border border-dashed border-line-strong/70 bg-canvas/70 p-5 text-sm text-faint ${placeholderClassName} ${className}`}
      >
        <ImageIcon size={22} />
        <span>{label}</span>
      </div>
    )
  }
  return <img src={asset(src)} alt={alt} loading="lazy" className={`bg-canvas object-cover ${className}`} />
}

function Video({ src, title }: { src: string; title: string }) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong/70 bg-canvas/70 text-sm text-faint"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong/70">
          <Play size={18} />
        </span>
        Project video
      </div>
    )
  }
  if (/\.(mp4|webm|mov)$/i.test(src)) {
    return <video src={asset(src)} controls preload="metadata" className="aspect-video w-full rounded-xl bg-canvas" />
  }
  return (
    <iframe
      src={src}
      title={`${title}: project video`}
      loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      className="aspect-video w-full rounded-xl border-0 bg-canvas"
    />
  )
}

function Block({ block, accent, level }: { block: ProjectBlock; accent: string; level: Level }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="leading-relaxed text-muted">
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
        <Heading level={level} className="pt-1 font-semiwide text-base font-bold text-ink">
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
      return (
        <div className="overflow-x-auto rounded-xl border border-line">
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

export function Tags({ items, max }: { items: string[]; max?: number }) {
  const shown = max ? items.slice(0, max) : items
  const hidden = items.length - shown.length
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tools and processes">
      {shown.map((tag) => (
        <li key={tag} className="rounded-md border border-line-strong px-2.5 py-1 text-[0.8rem] text-muted">
          {tag}
        </li>
      ))}
      {hidden > 0 && (
        <li className="rounded-md px-1.5 py-1 text-[0.8rem] text-faint">
          +{hidden}
          <span className="sr-only"> more</span>
        </li>
      )}
    </ul>
  )
}

function Facts({ facts }: { facts: Project['facts'] }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 text-[0.92rem] sm:grid-cols-2">
      {facts.map(({ label, value }) => (
        <div key={label + value} className={label === 'Role' ? 'sm:col-span-2' : ''}>
          {label && <dt className="text-xs font-medium uppercase tracking-[0.08em] text-faint">{label}</dt>}
          <dd className={label ? 'mt-0.5 text-ink/90' : 'text-muted'}>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * The full write-up: executive summary, each section the document covers, then the video.
 * `wide`: text on the left, photo on the right (desktop card).
 * Otherwise one column with each photo above its text (mobile reading view).
 */
export function ProjectWriteup({ project, wide, level }: { project: Project; wide: boolean; level: Level }) {
  const sub = Math.min(level + 1, 6) as Level
  const row = wide ? 'grid grid-cols-[minmax(0,1fr)_minmax(0,38%)] items-start gap-10 xl:gap-14' : 'flex flex-col gap-6'
  const photo = `aspect-[4/3] w-full rounded-xl ${wide ? 'sticky top-8 order-last' : ''}`
  const headingClass = 'flex items-baseline gap-3 font-semiwide text-xl font-bold leading-snug text-ink sm:text-2xl'

  return (
    <div className={wide ? 'space-y-16' : 'space-y-12'}>
      <section className={row}>
        <Media src={project.summaryImage} alt={`${project.title}`} className={photo} />
        <div className="min-w-0 space-y-6">
          <Heading level={level} className={headingClass}>
            Executive Summary
          </Heading>
          <p className="max-w-[68ch] text-[1.05rem] leading-relaxed text-ink/90">{project.summary}</p>
          <Facts facts={project.facts} />
          <Tags items={project.tags} />
        </div>
      </section>

      {project.sections.map((section, i) => (
        <section key={section.heading} className={`${row} border-t border-line pt-12`}>
          <Media src={section.image} alt={`${project.title}: ${section.heading}`} className={photo} />
          <div className="min-w-0 max-w-[68ch] space-y-5">
            <Heading level={level} className={headingClass}>
              <span className="text-sm tabular-nums" style={{ color: project.accent }} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {section.heading}
            </Heading>
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} accent={project.accent} level={sub} />
            ))}
          </div>
        </section>
      ))}

      <div className="border-t border-line pt-12">
        <Video src={project.video} title={project.title} />
      </div>
    </div>
  )
}
