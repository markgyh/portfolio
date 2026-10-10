import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { SITE } from './src/content.ts'

// The site is served from https://<username>.github.io/portfolio/
// If you rename the repository, change this to '/<new-repo-name>/'.
// For a user site (<username>.github.io) use '/'.
const BASE = '/portfolio/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), siteMeta()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})

/** Fills the page title, description, social preview tags and favicon from src/content.ts. */
function siteMeta(): Plugin {
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

  const name = `${SITE.firstName} ${SITE.lastName}`
  const title = `${name} | ${SITE.role}`
  const initials = `${SITE.firstName[0] ?? ''}${SITE.lastName[0] ?? ''}`.toUpperCase()

  const favicon =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#12181D"/><text x="32" y="42" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="28" fill="#D4AE62">${initials}</text></svg>`,
    )

  const absolute = (path: string) => (/^https?:\/\//.test(path) ? path : new URL(path, SITE.url).href)

  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({ tag: 'meta', attrs, injectTo: 'head' })
      const tags: HtmlTagDescriptor[] = [
        meta({ name: 'description', content: SITE.description }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:title', content: title }),
        meta({ property: 'og:description', content: SITE.description }),
        meta({ property: 'og:url', content: SITE.url }),
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: favicon }, injectTo: 'head' },
        { tag: 'link', attrs: { rel: 'canonical', href: SITE.url }, injectTo: 'head' },
      ]
      if (SITE.socialImage) {
        tags.push(
          meta({ property: 'og:image', content: absolute(SITE.socialImage) }),
          meta({ name: 'twitter:card', content: 'summary_large_image' }),
        )
      }
      return { html: html.replace('%SITE_TITLE%', escape(title)), tags }
    },
  }
}
