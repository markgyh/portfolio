import { ABOUT, SKILL_GROUPS } from '../data'
import { CONTAINER, useResumeUrl } from '../lib/utils'
import { FileText } from './Icons'
import { BUTTON_SECONDARY, SectionHeading } from './ui'

export default function About() {
  const resume = useResumeUrl()
  if (ABOUT.length === 0 && SKILL_GROUPS.length === 0) return null

  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-24 lg:py-32">
      <div className={CONTAINER}>
        <SectionHeading id="about-heading">About Me</SectionHeading>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-24">
          <div className="max-w-[62ch] space-y-6">
            {ABOUT.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'text-xl leading-relaxed text-ink' : 'leading-relaxed text-muted'}>
                {paragraph}
              </p>
            ))}

            {resume && (
              <div className="pt-4">
                <a href={resume} target="_blank" rel="noopener noreferrer" className={BUTTON_SECONDARY}>
                  <FileText size={18} />
                  View résumé
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </div>
            )}
          </div>

          {/* Skills as a drawing-style table: group on the left, items on the right */}
          {SKILL_GROUPS.length > 0 && (
            <div>
              <h3 className="mb-5 font-display text-xl font-bold text-ink">Tools and methods</h3>
              <dl className="border-t border-line-strong">
                {SKILL_GROUPS.map(({ label, items }) => (
                  <div
                    key={label}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <dt className="text-sm font-medium text-cyan">{label}</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-ink">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
