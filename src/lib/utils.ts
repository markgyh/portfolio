import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { NAV_ITEMS, SITE } from '../data'

export const FULL_NAME = `${SITE.firstName} ${SITE.lastName}`
export const INITIALS = `${SITE.firstName[0] ?? ''}${SITE.lastName[0] ?? ''}`.toUpperCase()

/** Resolves a content path: full URLs pass through, plain paths point into /public. */
export function asset(path: string): string {
  if (!path) return ''
  if (/^(https?:|data:|\/\/)/.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

const fileChecks = new Map<string, Promise<boolean>>()

/**
 * The résumé URL, or '' until the file actually exists. Lets you keep the path
 * in content.ts without shipping a broken link before the PDF is uploaded.
 * External links (Google Drive etc.) are trusted as-is.
 */
export function useResumeUrl(): string {
  const url = asset(SITE.resume)
  const external = /^(https?:)?\/\//.test(SITE.resume)
  const [exists, setExists] = useState(external)
  useEffect(() => {
    if (!url || external) return
    let cancelled = false
    if (!fileChecks.has(url)) {
      fileChecks.set(
        url,
        fetch(url, { method: 'HEAD' })
          // Dev servers answer missing files with the HTML page, so reject HTML too.
          .then((res) => res.ok && !(res.headers.get('content-type') ?? '').includes('text/html'))
          .catch(() => false),
      )
    }
    fileChecks.get(url)!.then((ok) => {
      if (!cancelled) setExists(ok)
    })
    return () => {
      cancelled = true
    }
  }, [url, external])
  return url && exists ? url : ''
}

/**
 * Removes an image or video whose file is missing, so its frame's ground colour shows instead
 * of a broken-image icon or an empty player, and a missing photo beside text leaves no gap for
 * the text to wrap around.
 */
export const hideIfMissing = (e: { currentTarget: HTMLElement }) => {
  e.currentTarget.style.display = 'none'
}

/** Shared layout container so every section lines up on the same edges. */
export const CONTAINER = 'mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-16'

/** Shared frame for a page section below the hero: a rule on top and the section spacing tokens. */
export const SECTION = 'border-t border-line py-section lg:py-section-lg'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/**
 * True once the element's top has come about 85% of the way up the viewport.
 * Fires once and stays true, so scroll-triggered reveals never replay.
 */
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])
  return [ref, inView] as const
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** True once the page has scrolled past `offset` pixels. */
export function useScrolled(offset = 40): boolean {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

/**
 * Id of the section currently under the top third of the viewport.
 * Position-based rather than IntersectionObserver ratios, so very tall
 * sections (the stacked Projects block) still register as active.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState('')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const marker = window.innerHeight * 0.35
      let current = ''
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) current = id
      }
      // At the very bottom the last section may never reach the marker.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = NAV_ITEMS[NAV_ITEMS.length - 1].id
      }
      setActive(current)
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
  return active
}
