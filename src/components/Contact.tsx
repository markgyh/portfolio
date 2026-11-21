import { useState, type ChangeEvent, type FormEvent } from 'react'
import { SITE, SOCIALS } from '../data'
import { CONTAINER, FULL_NAME, SECTION } from '../lib/utils'
import { ArrowUpRight, Check, Copy } from './Icons'
import { ANNOTATION, button, ExternalLink, SectionHeading, TEXT_LINK } from './ui'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'
const EMPTY = { name: '', email: '', subject: '', message: '' }

const INPUT =
  'w-full rounded-sm border border-line-strong bg-surface px-4 py-3.5 text-ink transition-colors placeholder:text-faint hover:border-muted focus:border-copper focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper'
const LABEL = 'mb-2 block text-sm font-medium text-ink'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard blocked: the mailto link beside it still works. */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className={button({ variant: 'secondary' })}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      <span className="sr-only"> email address</span>
    </button>
  )
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // No Web3Forms key yet: hand the message to the visitor's email app.
    if (!SITE.web3formsAccessKey) {
      const body = `${form.message}\n\n${form.name}\n${form.email}`
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const botcheck = (e.currentTarget.elements.namedItem('botcheck') as HTMLInputElement | null)?.checked ?? false
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsAccessKey,
          from_name: `${FULL_NAME} portfolio`,
          botcheck,
          ...form,
        }),
      })
      const data = (await res.json()) as { success?: boolean }
      setStatus(res.ok && data.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setForm(EMPTY)
    setStatus('idle')
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className={SECTION}>
      <div className={CONTAINER}>
        <SectionHeading id="contact-heading">Contact</SectionHeading>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-24">
          {/* Form */}
          <div>
            <p className="mb-10 max-w-[56ch] text-xl leading-relaxed text-ink">
              Have a project in mind or want to talk shop? I'm always open to interesting conversations and new
              challenges.
            </p>

            {status === 'sent' ? (
              <div role="status" className="success-in rounded-sm border border-line bg-surface p-8">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-copper text-canvas">
                  <Check size={24} className="check" />
                </span>
                <p className="font-display text-2xl font-bold">Message sent</p>
                <p className="mt-2 text-muted">
                  Thanks{form.name.trim() ? `, ${form.name.trim().split(/\s+/)[0]}` : ''}. I'll reply to {form.email} within 48 hours.
                </p>
                <button type="button" onClick={reset} className={`${TEXT_LINK} mt-6`}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={LABEL}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      required
                      placeholder="Your name"
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={LABEL}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={update('email')}
                      required
                      placeholder="you@company.com"
                      className={INPUT}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className={LABEL}>
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={update('subject')}
                    required
                    placeholder="Project inquiry"
                    className={INPUT}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className={LABEL}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update('message')}
                    required
                    rows={6}
                    placeholder="Tell me about your project, or just say hi"
                    className={`${INPUT} resize-y`}
                  />
                </div>

                {/* Spam trap for Web3Forms: hidden from people, bots tick it */}
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
                  <button type="submit" disabled={status === 'sending'} className={button({ size: 'lg' })}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>

                  <div aria-live="polite" className="text-sm">
                    {status === 'error' && (
                      <p className="note-in text-danger">
                        Your message didn't send. Check your connection and try again, or email{' '}
                        <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                          {SITE.email}
                        </a>
                        .
                      </p>
                    )}
                    {status === 'mailto' && (
                      <p className="note-in text-muted">
                        Your email app should open with this message. If it doesn't, email{' '}
                        <a href={`mailto:${SITE.email}`} className="text-ink underline underline-offset-4">
                          {SITE.email}
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Direct details */}
          <div className="space-y-10 lg:pt-2">
            <div>
              <h3 className={`mb-3 ${ANNOTATION}`}>Email</h3>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all font-display text-xl font-semibold text-ink underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-copper hover:decoration-copper sm:text-2xl"
                >
                  {SITE.email}
                </a>
                <CopyEmail />
              </div>
            </div>

            <div>
              <h3 className={`mb-3 ${ANNOTATION}`}>Location</h3>
              <p className="text-ink">
                {SITE.location} <span className="text-muted">({SITE.timezone})</span>
              </p>
              <p className="mt-1 text-muted">{SITE.workScope}</p>
            </div>

            {SOCIALS.length > 0 && (
              <div>
                <h3 className={`mb-1 ${ANNOTATION}`}>Elsewhere</h3>
                <ul className="divide-y divide-line border-b border-line">
                  {SOCIALS.map(({ label, handle, url }) => (
                    <li key={label}>
                      <ExternalLink
                        href={url}
                        className="group flex min-h-14 items-center justify-between gap-4 py-3"
                        icon={
                          <ArrowUpRight
                            size={18}
                            className="shrink-0 text-muted transition-[color,translate] duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-copper"
                          />
                        }
                      >
                        <span className="min-w-0">
                          <span className="font-medium text-ink transition-colors duration-150 ease-out group-hover:text-copper">
                            {label}
                          </span>
                          <span className="ml-3 text-sm text-muted [overflow-wrap:anywhere]">{handle}</span>
                        </span>
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {SITE.availability.open && (
              <div className="rounded-sm border border-line bg-surface p-6">
                <p className="mb-2 flex items-start gap-2.5 font-medium text-copper">
                  <span className="mt-[0.45em] h-2.5 w-2.5 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                  {SITE.availability.headline}
                </p>
                <p className="leading-relaxed text-muted">{SITE.availability.detail}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
