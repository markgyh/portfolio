import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '../content'
import { FULL_NAME, INITIALS, useActiveSection, useMediaQuery, useResumeUrl, useScrolled } from '../lib/utils'
import { Close, Menu } from './Icons'

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
        className={`fixed left-1/2 z-50 hidden -translate-x-1/2 transition-[top] duration-300 sm:block ${
          scrolled ? 'top-3' : 'top-5'
        }`}
      >
        <nav
          aria-label="Primary"
          className="flex items-center gap-1 rounded-full border border-line bg-surface/85 p-1.5 shadow-lg shadow-black/30 backdrop-blur-xl"
        >
          <a
            href="#top"
            className="flex h-9 items-center rounded-full px-3.5 font-wide text-sm font-extrabold tracking-wide text-brass transition-colors hover:text-ink"
          >
            {INITIALS}
            <span className="sr-only">{FULL_NAME}, back to top</span>
          </a>
          {NAV_ITEMS.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              className={`flex h-9 items-center whitespace-nowrap rounded-full px-4 text-[0.9rem] font-medium transition-colors ${
                active === id ? 'bg-brass text-canvas' : 'text-muted hover:bg-surface-2 hover:text-ink'
              }`}
            >
              {label}
            </a>
          ))}
          {resume && (
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 flex h-9 items-center rounded-full border border-line-strong px-4 text-[0.9rem] font-medium text-ink transition-colors hover:border-brass hover:text-brass"
            >
              Résumé
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          )}
        </nav>
      </header>

      {/* Phones: top bar with a labelled menu button */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 sm:hidden ${
          scrolled || open ? 'border-line bg-canvas/90 backdrop-blur-xl' : 'border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <a href="#top" className="font-wide text-base font-extrabold tracking-wide text-brass">
            {INITIALS}
            <span className="sr-only">{FULL_NAME}, back to top</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface/80 px-4 text-sm font-medium text-ink"
          >
            {open ? <Close size={18} /> : <Menu size={18} />}
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          hidden={!open}
          className="border-t border-line bg-canvas/95 px-5 pb-6 pt-2 backdrop-blur-xl"
        >
          <nav aria-label="Primary">
            <ul>
              {NAV_ITEMS.map(({ label, id }) => (
                <li key={id} className="border-b border-line">
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'location' : undefined}
                    className={`flex min-h-14 items-center font-semiwide text-xl font-bold ${
                      active === id ? 'text-brass' : 'text-ink'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {resume && (
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-5 flex min-h-12 items-center justify-center rounded-full border border-line-strong font-medium text-ink"
              >
                View résumé (PDF)
              </a>
            )}
          </nav>
        </div>
      </header>
    </>
  )
}
