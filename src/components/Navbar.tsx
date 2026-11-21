import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '../data'
import { FULL_NAME, INITIALS, useActiveSection, useMediaQuery, useResumeUrl, useScrolled } from '../lib/utils'
import { Close, Menu } from './Icons'
import { button, ExternalLink, PRESS } from './ui'

export default function Navbar() {
  const active = useActiveSection()
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const resume = useResumeUrl()
  const wide = useMediaQuery('(min-width: 640px)')

  // The phone menu is hidden at tablet width and up, so don't leave it open there.
  useEffect(() => {
    if (wide) setOpen(false)
  }, [wide])

  // Mobile menu: close on Escape, outside tap or scroll; focus the first link on open.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false)
    }
    const onScroll = () => setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true, once: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  return (
    <>
      {/* Desktop and tablet: centred floating pill */}
      <header
        className={`fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 transition-[translate] duration-300 ease-out sm:block ${
          scrolled ? '-translate-y-2' : ''
        }`}
      >
        {/* Translucent so the page reads through it; a border, not a shadow, sets it apart.
            Links inside take the shared 4px control radius; the bar's 10px is that plus its 6px padding, so the curves run parallel. */}
        <nav
          aria-label="Primary"
          className="chrome flex items-center gap-1 rounded-[10px] border border-line bg-surface/85 p-1.5 backdrop-blur-xl"
        >
          <a
            href="#top"
            className="flex h-9 items-center rounded-sm px-3.5 font-display text-sm font-bold tracking-wide text-copper transition-colors duration-150 ease-out hover:text-ink"
          >
            {INITIALS}
            <span className="sr-only">{FULL_NAME}, back to top</span>
          </a>
          {NAV_ITEMS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              className={`flex h-9 items-center whitespace-nowrap rounded-sm px-3 font-display text-[0.95rem] font-medium md:px-4 ${PRESS} ${
                active === id ? 'bg-copper text-canvas' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              {label}
            </a>
          ))}
          {resume && (
            <span className="ml-1 hidden md:flex">
              <ExternalLink href={resume} pdf className={button({ variant: 'secondary', size: 'sm' })}>
                Résumé
              </ExternalLink>
            </span>
          )}
        </nav>
      </header>

      {/* Phones: top bar with a labelled menu button */}
      <header
        className={`chrome fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 sm:hidden ${
          scrolled || open ? 'border-line bg-canvas/90 backdrop-blur-xl' : 'border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <a href="#top" className="flex h-11 items-center font-display text-base font-bold tracking-wide text-copper">
            {INITIALS}
            <span className="sr-only">{FULL_NAME}, back to top</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`${button({ variant: 'secondary' })} bg-surface px-4`}
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!open}
          // Drops down from the bar as it opens. Solid, so it never stacks a second blur on the bar's.
          className="border-t border-line bg-canvas px-5 pb-6 pt-2 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-2 starting:opacity-0"
        >
          <nav aria-label="Primary">
            <ul>
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id} className="border-b border-line">
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'location' : undefined}
                    className={`flex min-h-14 items-center font-display text-xl font-bold ${
                      active === id ? 'text-copper' : 'text-ink'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {resume && (
              <ExternalLink
                href={resume}
                onClick={() => setOpen(false)}
                className={`mt-5 w-full ${button({ variant: 'secondary', size: 'lg' })}`}
              >
                View résumé (PDF)
              </ExternalLink>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
