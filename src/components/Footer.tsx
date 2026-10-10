import { CONTAINER, FULL_NAME } from '../lib/utils'
import { ArrowUp } from './Icons'

/** Footer laid out like the title block in the corner of an engineering drawing. */
export default function Footer() {
  const year = new Date().getFullYear()
  const cells = [
    { label: 'Drawn by', value: FULL_NAME },
    { label: 'Title', value: 'Portfolio' },
    { label: 'Revision', value: String(year) },
    { label: 'Scale', value: '1:1' },
    { label: 'Sheet', value: '1 of 1' },
  ]

  return (
    <footer className="border-t border-line py-12">
      <div className={CONTAINER}>
        <div className="grid grid-cols-2 border-l border-t border-line-strong sm:grid-cols-3 lg:grid-cols-[1.6fr_1.2fr_1fr_0.8fr_0.8fr_auto]">
          {cells.map(({ label, value }, i) => (
            <div
              key={label}
              className={`border-b border-r border-line-strong px-4 py-3 ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <p className="text-xs text-faint">{label}</p>
              <p className="mt-0.5 font-semiwide font-semibold text-ink">{value}</p>
            </div>
          ))}
          <a
            href="#top"
            className="group col-span-2 flex items-center justify-center gap-2 border-b border-r border-line-strong px-6 py-3 font-medium text-muted transition-colors hover:bg-surface hover:text-brass sm:col-span-1"
          >
            <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
        <p className="mt-5 text-sm text-faint">
          © {year} {FULL_NAME}. Designed and built by me.
        </p>
      </div>
    </footer>
  )
}
