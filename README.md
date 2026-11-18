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

Everything on the page lives in **`src/content.ts`**. Search it for `TODO` to find every placeholder. A section with an empty list (`[]`) is hidden along with its nav link.

| What | Where |
| --- | --- |
| Name, role, email, location, availability | `SITE` |
| Page title, Google description, link previews | `SITE.description`, `SITE.url`, `SITE.socialImage` |
| About paragraphs, tools | `ABOUT`, `SKILL_GROUPS` |
| Jobs | `EXPERIENCES` (newest first) |
| Projects and their pop-up details | `PROJECTS` (newest first) |
| Testimonials | `TESTIMONIALS` |
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

Tips: export photos as `.jpg` or `.webp` around 1600 px wide and under 400 KB each. Project card images look best at 16:10.

### Project write-ups

Each card opens a window with the full write-up: a cover photo across the top (a third of the window's height), the **executive summary** with the project's facts and tools, then each section the write-up covers, in order, and finally a video. In `PROJECTS`:

```ts
summary: 'Executive summary text.',
summaryImage: 'images/projects/tape-measure/summary.jpg',
sections: [
  {
    heading: 'The Challenge & Context',
    image: 'images/projects/tape-measure/challenge.jpg',
    blocks: [
      { type: 'p', lead: 'Optional bold run-in.', text: 'Paragraph text.' },
      { type: 'subheading', text: 'A smaller heading' },
      { type: 'list', items: ['First point', 'Second point'] },
      { type: 'table', head: ['Option', 'Cost'], rows: [['A', 'S$4.18']] },
    ],
  },
],
video: 'videos/tape-measure.mp4', // or a YouTube/Vimeo embed URL
```

`summaryImage` and each section's `image` sit on the right with the text wrapping around them, at most a third of the window's width and height (a little wider on phones, so the text beside it stays readable). Tables always run full width below the photo. A section photo or video is optional: leave it as `''` (or point it at a file that isn't there yet) and its spot disappears, with the text taking the full width. `cover` is also the card's photo; until it's set, the card and window show a labelled frame where it goes.

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
  data.ts                      Hands content to the page; hides empty sections
  dev/                         Stress-test data and toggle (dev server only, never shipped)
  App.tsx                      Page layout
  main.tsx                     React entry point
  index.css                    Colours, fonts, global styles
  lib/utils.ts                 Shared helpers and hooks
  components/                  One file per section
index.html                     HTML shell (title and meta filled from content.ts)
vite.config.ts                 Build config and GitHub Pages base path
```

## Design notes

- Palette: blueprint blue `#0B2545`, surface `#0F3060`, white ink `#F4F8FC`, copper accent `#E08A4F`, light cyan `#9DD4F5` for dimension lines and annotations. Tokens live in `src/index.css`. All text meets WCAG AA contrast.
- Type: Chakra Petch for headings and controls, IBM Plex Sans for everything else. Both bundled locally.
- Projects: three cards per row on desktop, two on tablets, one on phones. Long titles and summaries are trimmed on the cards and shown in full in the project window.
- Motion: one drafting sequence on load (the name rises, then its dimension line is drawn), leader lines drawn as sections arrive, press feedback on controls, and a sideways slide when stepping between projects. Curves and timings are tokens in `src/index.css`. With reduced motion on, everything is shown in its finished state with short fades.

## Stress-testing the layout

With `pnpm dev` running, a small switch at the bottom of the page has two parts. **Desktop / Mobile** shows the page normally or inside a 390 × 844 phone frame. **Demo data / Worst case / Empty / One** swaps in test content: long names and emails, missing and oddly shaped photos, empty sections, non-Latin text, or one of everything. Both also work by URL, e.g. `/portfolio/?view=mobile&data=worst`. The switch and its data only exist on the dev server; they are not part of the published site.
