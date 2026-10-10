# Portfolio

Personal portfolio built with React 19, Vite and Tailwind CSS v4. Fonts are bundled locally, so the site makes no requests to outside services apart from images you link and the contact form.

Live site: `https://yourusername.github.io/portfolio/`

## Run locally

Needs Node 22.12+ and pnpm (`corepack enable` gives you pnpm).

```bash
pnpm install
pnpm dev        # open http://localhost:5173/portfolio/ (the /portfolio/ part is required)
pnpm build      # type-checks, then builds to dist/
pnpm preview    # serves the built site
```

## Deploy to GitHub Pages

1. Create a repo named `portfolio` and push this folder to the `main` branch.
   If you upload through the GitHub website instead of `git push`, make sure the hidden `.github` and `.gitignore` items are included. Most file managers hide them (Ctrl+H shows them in Thunar and most Linux file managers). Without `.github/workflows/deploy.yml` nothing gets published.
2. In the repo go to **Settings > Pages > Build and deployment** and set **Source** to **GitHub Actions**.
3. Every push to `main` now builds and publishes the site (see `.github/workflows/deploy.yml`). Progress shows under the **Actions** tab.

If you rename the repo, update `BASE` in `vite.config.ts` to `'/<new-name>/'`, and `SITE.url` in `src/content.ts`.

## Editing content

Everything on the page lives in **`src/content.ts`**. Search it for `TODO` to find every placeholder.

| What | Where |
| --- | --- |
| Name, role, email, location, availability | `SITE` |
| Page title, Google description, link previews | `SITE.description`, `SITE.url`, `SITE.socialImage` |
| About paragraphs, tools | `ABOUT`, `SKILL_GROUPS` |
| Jobs | `EXPERIENCES` (newest first) |
| Projects and their pop-up details | `PROJECTS` (newest first) |
| GitHub, LinkedIn | `SOCIALS` |

The browser tab icon is generated from your initials automatically.

### Images and files

Put your files in `public/` and reference them without the `public/` prefix:

```
public/
  images/hero/portrait.jpg       ->  heroImage.src: 'images/hero/portrait.jpg'
  images/projects/sensor-1.jpg   ->  image / gallery: 'images/projects/sensor-1.jpg'
  files/resume.pdf               ->  resume: 'files/resume.pdf' (already set)
```

The résumé links stay hidden until `public/files/resume.pdf` exists, so there is never a broken link.

Tips: export photos as `.jpg` or `.webp` around 1600 px wide and under 400 KB each. Project card images look best at 16:9 or wider.

### Contact form (Web3Forms)

1. Get a free access key at <https://web3forms.com> (enter the email you want messages sent to).
2. Paste it into `SITE.web3formsAccessKey`.

The key is meant to be public, so it is safe to commit. Until it is set, the form opens the visitor's email app with their message filled in.

## Project structure

```
.github/workflows/deploy.yml   Build and publish to GitHub Pages
public/                        Your images and résumé (copied as-is)
src/
  content.ts                   All site content (edit this)
  App.tsx                      Page layout
  main.tsx                     React entry point
  index.css                    Colours, fonts, global styles
  lib/utils.ts                 Shared helpers and hooks
  components/                  One file per section
index.html                     HTML shell (title and meta filled from content.ts)
vite.config.ts                 Build config and GitHub Pages base path
```

## Design notes

- Palette: slate `#12181D`, surface `#1A2228`, aluminium text `#DCE2E6`, brass accent `#D4AE62`, steel blue `#7FB4CC` for drawing annotations. Tokens live in `src/index.css`. All text meets WCAG AA contrast.
- Type: Archivo (variable weight and width). Headings use the expanded width.
- On wide screens with motion enabled, Projects is a scroll-stacking card deck. Phones, tablets, short windows and visitors with reduced motion on get a plain card grid instead.
