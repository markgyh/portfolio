/* The page reads its content from here, not from content.ts directly.
   In production this is content.ts as-is. In `pnpm dev`, ?data=worst, ?data=empty
   or ?data=one swaps in stress-test data from src/dev/fixtures.ts (never shipped). */

import * as content from './content'

const fixture = import.meta.env.DEV
  ? (await import('./dev/fixtures')).pickFixture(new URLSearchParams(window.location.search).get('data'), content)
  : {}

export type { Experience, Project, ProjectBlock, ProjectSection, Testimonial } from './content'
export const ACCENTS = content.ACCENTS
export const SITE = { ...content.SITE, ...fixture.SITE }
export const SOCIALS = fixture.SOCIALS ?? content.SOCIALS
export const ABOUT = fixture.ABOUT ?? content.ABOUT
export const SKILL_GROUPS = fixture.SKILL_GROUPS ?? content.SKILL_GROUPS
export const EXPERIENCES = fixture.EXPERIENCES ?? content.EXPERIENCES
export const MAX_PINNED = 3
export const PROJECTS = pinFirst(fixture.PROJECTS ?? content.PROJECTS)
export const TESTIMONIALS = fixture.TESTIMONIALS ?? content.TESTIMONIALS

// Sections with nothing in them are hidden, and so are their nav links.
const sectionCounts: Record<string, number> = {
  about: ABOUT.length + SKILL_GROUPS.length,
  experience: EXPERIENCES.length,
  projects: PROJECTS.length,
  testimonials: TESTIMONIALS.length,
}
export const NAV_ITEMS = content.NAV_ITEMS.filter(({ id }) => sectionCounts[id] !== 0)

/** Projects marked `pinned` (the first MAX_PINNED of them) go first; everything else keeps its order. */
function pinFirst(projects: content.Project[]): content.Project[] {
  const pinned = projects.filter((p) => p.pinned).slice(0, MAX_PINNED)
  if (import.meta.env.DEV && projects.filter((p) => p.pinned).length > MAX_PINNED) {
    console.warn(`content.ts: only the first ${MAX_PINNED} pinned projects are pinned; the rest stay in date order.`)
  }
  return [...pinned, ...projects.filter((p) => !pinned.includes(p))].map((p) => ({ ...p, pinned: pinned.includes(p) }))
}
