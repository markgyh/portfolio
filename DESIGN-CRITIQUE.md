# Portfolio Design Critique

Every section of the site, reviewed with `/impeccable critique` (Impeccable v4.8.0) on 2026-11-20.

**Method:** dual-agent. For each section, Assessment A (design review) and Assessment B (automated detector plus browser overlay) ran as separate sub-agents that could not see each other's output. The two were combined afterwards. A checked each section at desktop (1024–1440px) and mobile (375×812), and with the dev data fixtures `?data=worst|empty|one` where relevant. Heuristics 7 (Flexibility) and 10 (Help) are scored `n/a` on this Experience-mode (portfolio) surface, so totals are out of **32**.

**Context:** there is no PRODUCT.md or DESIGN.md, so the shipped code was treated as the design authority. The site is dark-only (`color-scheme: dark`, `src/index.css:57`). The visual language is a blueprint/engineering drawing: canvas `#0b2545`, ink `#f4f8fc`, cyan `#9dd4f5` for dimension marks, copper `#e08a4f` for accents and actions, a drafting grid, and Chakra Petch (display) with IBM Plex Sans (body).

---

## Scoreboard

| Section | Score | Band | P0 | P1 | Headline problem |
|---|---|---|---|---|---|
| Hero | 22/32 (69%) | Acceptable (just under Good) | 0 | 2 | A stranger's stock photo, cropped to the forehead, dominates the first screen |
| About | 20/32 (63%) | Acceptable | 0 | 2 | Generic lede copy; the blueprint language stops at the heading |
| Experience | 21/32 (66%) | Acceptable | 0 | 2 | Quantified highlights are hidden in a single-open accordion |
| Projects | 20/32 (63%) | Acceptable | 1 | 2 | All 15 covers are empty; "Cover photo" placeholders lead every card |
| Project write-up | 20/32 (63%) | Acceptable | 0 | 3 | ~95-character lines, no wayfinding, no contact path at the end |
| Testimonials | 20/32 (63%) | Acceptable | 1 | 2 | Placeholder quotes ship by default; there's no credibility model |
| Footer | 16/24 (67%) | Acceptable | 0 | 2 | The title-block idea is right, but every cell holds filler |
| *Shared UI primitives and icons* (§8) | 16/28 (57%) | Acceptable | 0 | 2 | Buttons are strings, not variants; six radii; new-tab arrow misused |
| *Page layout* (§9) | 23/32 (72%) | Good | 0 | 2 | No macro peak (Projects is 42–57% of the page); h1 ≈ h2 on mobile |
| *Navbar* (§10) | 23/32 (72%) | Good | 0 | 2 | The mobile menu isn't modal; a generic glass pill with no blueprint language |

**Overall: 201/308 (65%), Acceptable.**
- **Sections alone:** 139/216 (64%).
- **System layer** (primitives, layout, navbar): 62/92 (67%).

The idea is good and the engineering is solid. Placeholder content and an identity that fades after the hero, and that is absent from the chrome and the primitives, hold it back.

---

## Cross-cutting findings

Patterns that show up in several sections. Fixing these at the source is cheaper than fixing them section by section.

### X1. [P0] Placeholder content ships across the whole site
Every section's worst first impression is a placeholder, not a design flaw. Each instance is in `src/content.ts`:

| Where it shows | Source | Status |
|---|---|---|
| Hero h1, nav "FL" mark, footer ×2, `<title>` | `SITE.firstName` / `lastName` = "FirstName" / "LastName" (`:24-25`) | TODO |
| Hero background | Unsplash stock portrait of a stranger (`:53`) | TODO |
| 15 project cards and 15 dialog covers | every `cover: ''` (`:199, 296, 381 … 1355`) | empty |
| Testimonials | "Placeholder quote…", "Supervisor Name" (`:1440-1463`) | placeholder |
| Contact / mailto | `email: 'youremail@gmail.com'` | TODO |
| Contact socials | `https://github.com/`, `https://linkedin.com/in/` with no handle | TODO |
| Link previews | `url: 'https://yourusername.github.io/portfolio/'`, `socialImage: ''` | TODO |
| About paragraph 2 | flagged as filler in a TODO (`:75`) | TODO |

**Fix:**
- Fill these in, or hide what can't be filled yet: `TESTIMONIALS = []`, and render no cover frame when `cover` is empty (§4 P0).
- Add a dev-only check that warns on `TODO`, "Placeholder", `yourusername`, or an empty `cover` before a production build.

### X2. [P1] The blueprint identity fades after the hero
- **Where it's present:** the drawing language is fully committed in **Hero** (dimension line) and **Footer** (title block). Everything between carries it only through the shared `SectionHeading` leader line and the background grid:
  - About is a two-column text block.
  - Experience is a stock timeline.
  - Projects is a Tailwind card grid.
  - The write-up is a modal with text.
  - Testimonials are three quote cards.
- **Consequence:** the page reads as "authored → template → template → … → authored".
- **Every section review independently proposed the same remedy: carry evidence in drawing form.**

  | Section | Proposed drawing form |
  |---|---|
  | About | Skills as a parts list or title block |
  | Experience | Durations as dimension callouts on a shared time axis |
  | Projects | Each card as a drawing sheet with a revision tag and a headline-number callout |
  | Write-up | A "SHEET 1/4" section index |
  | Testimonials | A sign-off block |
  | Footer | Real data in the title block |

- **Where to build:** `DimensionLine` (`Hero.tsx:35-86`) is already a reusable primitive. Extract it, plus a `TitleBlock` and a `Callout`, into `ui.tsx`.

### X3. [P1] Evidence is consistently de-emphasised
The site's strongest material (S$1.2k LiDAR saving, S$4.18 vs S$10, the drone kill switch, 100+ students certified) is styled as the *least* important text everywhere:

| Section | How the evidence is hidden |
|---|---|
| Hero | Absent |
| About | `text-muted`, paragraph 2 |
| Experience | Collapsed, and `text-muted` under an `ink/90` duty sentence |
| Project cards | Replaced by the brief |
| Write-up | 4th section, muted bullets (`ProjectWriteup.tsx:106`) |

**Fix:** invert the rule site-wide so results are `text-ink` and descriptions are `text-muted`. Add an `outcome` field to projects and roles, and surface it first.

### X4. [P1] Accessible names run together (one bug, two places)
Block-level `<span>`s with no whitespace between them make fused accessible names:
- The hero h1 reads **"FirstNameLastName"** (`Hero.tsx:111-117`).
- Experience buttons read **"The Kinetic OptionAssistant Mechanical Designer InternJan 2026 – Jun 2026Singapore"** (`Experience.tsx:49-61`).

**Fix:** audit every component for `display:block` siblings that form one name, and add a literal space or an sr-only separator between them.

### X5. Detector page-level findings (all sections)
| Rule | Where | Verdict |
|---|---|---|
| `codex-grid-background` | `.drafting-grid` (`index.css:37-43`) via `App.tsx:18` (fixed) **and** `Hero.tsx:104` (absolute) | **False positive** as an anti-pattern (deliberate blueprint motif; the rule's own description excludes real blueprint surfaces). **Real issue:** the grid is double-painted over the hero, so remove the `Hero.tsx:104` layer. |
| `straggler` "hours." | Contact availability `<p class="leading-relaxed text-muted">`, `SITE.availability.detail` | **Real.** Default data. |
| `straggler` "tolerancing." | **About** `div.max-w-[62ch] > p.leading-relaxed.text-muted` (4 lines, 22%) | Real. Worst fixture. |
| `straggler` "trials." | Contact/availability (6 lines, 14%) | Real. Worst fixture. |
| `line-length` (~89 characters) | **Experience** `#experience-panel-0 … max-w-[68ch] > p.mb-5.leading-relaxed.text-ink/90` | Real. Worst fixture. The `68ch` cap measures wider than 80 characters in Plex at this size, so cap at `62ch`. |
| `straggler` "attention." | About, last paragraph (7 lines, 22%) | Real. Mobile, default data. |
| `straggler` "Painters" | Project card subtitle `p.mt-1.5.line-clamp-2` | Real. Mobile. |
| `straggler` "me." | Footer copyright `p.mt-5.text-sm.text-faint` (7%) | Real. Mobile. Flagged by the round-2 layout run. |

> **Correction:** the round-1 attributions of "tolerancing." and the 89-character line were swapped. The round-2 layout run's selectors (above) are authoritative.

**Fix for all stragglers:** add `text-wrap: pretty` to body paragraphs in `index.css` (and `text-wrap: balance` on headings). One CSS rule clears every straggler above.

**Detector coverage gaps to keep in mind:**
- Per-file `.tsx` CLI scans can't see the Tailwind `@utility` CSS. A scan of the whole `src/` directory does, and flags `codex-grid-background` at `src/index.css:38`.
- The browser pass appears to skip content inside an open `<dialog>` (top layer): it missed 100–110-character lines in the write-up while flagging an 89-character line behind it.

### X6. ~~Nav scroll-spy highlights the wrong section~~ Withdrawn: a measurement artefact
Round 1 reported "Experience" staying lit over Projects and "Contact" lighting up mid-grid. The dedicated navbar review (§10) found that report was wrong.
- **What it did:** re-ran `useActiveSection`'s own algorithm (`utils.ts:115-146`) at 30 scroll positions, and confirmed it live with a fronted frame.
- **What it found:** the highlight was **correct everywhere**. A section activates when its top is within 35% of the viewport, and a page-bottom fallback covers Contact.
- **Why round 1 saw otherwise:** the hidden browser pane stops `requestAnimationFrame`, so the highlight froze at stale values.

No fix needed. Optionally, cache section rects on resize instead of calling `getElementById` every frame.

### X7. [P2] Colour semantics are overloaded
- `index.css:20` defines **cyan for dimension marks**, but About uses it for `<dt>` labels.
- **Copper** means "selected" (nav, open accordion row), "link" ("View details", hover) *and* "accent" (balloons, datum marks). A copper focus ring sits on copper fills.

**Fix:**
- Reserve cyan for dimensions and annotations.
- Keep copper for actions.
- Use a neutral state (ink plus an underline or weight) for "selected".
- Use a two-tone focus ring (canvas inner, copper outer).

### X8. [P2] Every section uses the same skeleton, and mobile runs long
- **Same frame everywhere:** every section is `border-t border-line py-24 lg:py-32` plus a giant `SectionHeading`, so there's no change of pace.
- **Measured mobile heights:**

  | Section | Mobile height |
  |---|---|
  | About | ≈1,590px |
  | Experience | 1,285px |
  | Projects | **8,806px** |
  | Each write-up | 3,800–6,087px |
  | Footer | 421px |

**Fix:**
- Vary rhythm per section, e.g. tighter padding on Testimonials and Footer.
- Collapse Projects into features plus a list (§4 P1).

### X9. Copper means "action", "location" and "accent" at once, and cyan is missing from the chrome
This sharpens X7 with round-2 evidence.
- **The nav's active state is the same `bg-copper text-canvas` as `BUTTON_PRIMARY`** (§10 P2), so the current section reads as a button. It's the heaviest mark in the bar.
- **Cyan, the site's annotation colour, appears nowhere** in the navbar or the shared primitives. The only cyan labels are local reinventions (`DETAIL` in Contact, About's `<dt>`).
- **Rule to adopt:** cyan means "this is information about the drawing" (dimensions, indices, current location). Copper means "do this" (primary action, Résumé). Ink plus a cyan tick means "you are here".

### X10. [P1] The system layer forks instead of composing
Round 2 found that most per-section inconsistencies trace back to the primitives (§8):
- Buttons are concatenated strings, so the Navbar and Contact fork them (36px nav pills, a 48px CTA).
- `ExternalLink` is used once and re-implemented four times.
- Six control radii.
- `Tags`, `ARROW`, `INPUT`, callout panels and `DimensionLine` all live privately inside sections.

Fixing these at the source turns several per-section fixes into one-line changes. That's why roadmap step 0 below is "extract primitives".

### X11. Not reviewed
- **Contact** (`src/components/Contact.tsx`) was never a target. It appears only through stragglers, the email link's ink focus ring (§8), and as the emotional peak several sections hand off to.
- **No light theme exists** (`color-scheme: dark` is hardcoded), so no light-mode checks were run.

---

## Fix roadmap

In the order that most improves the score per hour of work. Commands are Impeccable sub-commands.

| # | What | Sections | Command | Severity |
|---|---|---|---|---|
| 0 | ✅ **Done 2026-11-20.** Extract the system layer: `button({variant,size})` with one radius; polymorphic `ExternalLink`; shared `Tags`, `ANNOTATION` label, `DimensionLine`; a danger token; section spacing tokens; a mobile heading leader. See "Step 0 changes" below. | primitives, layout | `/impeccable extract` | P1 |
| 1 | Replace or hide all placeholder content (X1): name, hero photo, `TESTIMONIALS = []`, email, socials, site URL | all | `/impeccable harden` | P0 |
| 2 | Stop reserving image space for empty covers; lead with a title block | Projects, write-up | `/impeccable bolder` | P0 |
| 3 | Fix fused accessible names; add figure/figcaption/cite and `<time>`; fix dialog focus return and the live-region title | Hero, Experience, Testimonials, write-up | `/impeccable harden` | P1 |
| 4 | Surface outcomes: `outcome` field, invert muted vs ink, expand Experience by default | Hero, About, Experience, Projects, write-up | `/impeccable clarify` + `/impeccable distill` | P1 |
| 5 | Carry the drawing language through the middle sections (`DimensionLine`/`TitleBlock` primitives) | About, Experience, Projects, Testimonials, Footer | `/impeccable bolder` | P1 |
| 6 | Cap write-up measure at 68ch; add a section index and an outro with a contact path; named Prev/Next | write-up | `/impeccable typeset` + `/impeccable layout` | P1 |
| 7 | Rewrite the About lede; fill the footer title block with real data; drop the boilerplate copyright | About, Footer | `/impeccable clarify` + `/impeccable polish` | P1 |
| 8 | Group projects (featured + list); un-clamp titles; fix the card arrow icon | Projects | `/impeccable layout` + `/impeccable polish` | P1–P2 |
| 8a | Make the mobile menu modal (inert, scroll lock, focus trap, focus to the target heading, scrim); a 44px home target; inline links when there are ≤2 items | Navbar | `/impeccable harden` | P1 |
| 8b | Turn the navbar into a sheet-index strip: square corners, numbered callouts, a cyan "you are here" tick, copper only on Résumé; show Résumé from `sm` | Navbar | `/impeccable bolder` + `/impeccable quieter` + `/impeccable adapt` | P1–P2 |
| 8c | Page structure: a featured Projects tier, h1:h2 ≥ 1.4× on mobile, varied section spacing, the grid registered to the content edge with the hero's duplicate layer removed, CTAs and columns that follow the data | layout | `/impeccable layout` + `/impeccable typeset` + `/impeccable harden` | P1–P2 |
| 9 | `text-wrap: pretty`; clarify colour roles (X7, X9); unify interaction states and disabled styles; icon hygiene | global | `/impeccable polish` + `/impeccable distill` | P2–P3 |
| 10 | Edge cases: hero `LABEL_MIN`, empty Experience roles, `Intl.Segmenter` fallback, single-testimonial layout, short-viewport hero | Hero, Experience, Testimonials | `/impeccable adapt` + `/impeccable harden` | P2–P3 |
| 11 | Final pass | all | `/impeccable polish` | — |

### Step 0 changes (applied)
- **`ui.tsx` is the system layer.**
  - `button({ variant: 'primary'|'secondary'|'ghost', size: 'sm'|'md'|'lg'|'icon' })` replaces `BUTTON_PRIMARY`/`BUTTON_SECONDARY` and the forked one-offs: Navbar résumé and menu toggle, the Copy chip, the Contact submit, Testimonials arrows, and dialog close/prev/next.
    - **Radius:** every control is `rounded-sm` (4px). The nav pill became 10px (4px plus 6px padding), and nav links went to 4px.
    - **Disabled:** one style, `opacity-40 cursor-not-allowed` (the dialog footer keeps `invisible` to hold its layout).
    - **Ghost hover:** uses copper.
  - **`ExternalLink`** is now the only way to open a new tab. It takes an `icon` override and a `pdf` flag, and is used by the About résumé, both Navbar résumé links, Contact socials and Experience. The outbound arrow now always means "leaves the page".
  - **Project cards** use a new `ArrowRight` for "View details" (in-page).
  - **`TEXT_LINK`/`TEXT_LINK_BASE`** use the project `--ease-out` curve plus press feedback. Cards reuse the base instead of a copy.
  - **`Tags`** moved here from `ProjectWriteup.tsx`:
    - Outlined drawing-tag style at 14px (was a 12.8px filled chip).
    - Takes a required `label`, so each card's list is named after its project rather than all reading "Tools and processes".
  - **`ANNOTATION`** (cyan label) replaces Contact's `DETAIL` and the cyan `<dt>`s in About and the write-up Facts.
  - **`DimensionLine`** moved here from `Hero.tsx`, with a `drafted` prop for the hero's draw-on animation, ready for reuse in later steps.
  - **`SectionHeading`'s leader + datum now shows on phones**, as a full-width rule under the heading.
- **Tokens (`index.css`):**
  - `--color-danger` (Contact's error text is now `text-danger`).
  - `--spacing-section` / `--spacing-section-lg`, used through the new `SECTION` constant in `utils.ts` across the five sections. Same 96/128px values as before; tuning them per section is roadmap step 8c.
- **Icons:**
  - One 1.5px line weight at every size: `vector-effect: non-scaling-stroke` on `svg[data-icon] *`.
  - Removed the unused `ArrowDown`, `Play` and (after the résumé change) `FileText`.
- **Deliberately not extracted:**
  - A `Callout` panel: only 2 uses, both in Contact.
  - Contact's `INPUT`/`LABEL`: form-only.
  - The Experience `+` indicator and the decorative round dots and balloons: decoration, not controls.
- **Verified:** `tsc` and `vite build` pass. In the browser, every control measured 4px radius on the project easing curve, at 44px or more except the desktop-only nav `sm` pills (36px). The leader renders at 375px, there's no horizontal overflow, and the console is clean. The detector finds only the deliberate grid background.

---

## Run notes

- **20 assessments ran: 10 design reviews and 10 detector passes, in two rounds.**
  - Round 1 covered the 7 sections (§1–7).
  - Round 2 covered the navbar, the shared primitives and icons, and the page layout (§8–10).
  - Each pair was isolated, and none ran in the degraded single-context mode.
- **Round 2 had no tab-cap failures:** stale tabs were closed first, and each agent closed its own tab.
- **Hidden-pane artefact:** a hidden pane stalls `requestAnimationFrame`, which is what produced round 1's false scroll-spy finding (X6). Round-2 reviewers worked around it by re-running the hook's own logic and fronting their own tab for a frame.
- **The shared browser pane hit its 9-tab cap during the run:**
  - **Fully code-only:** the Footer design review. The detector pass then rendered the footer and its measurements were used to confirm or correct the review.
  - **Code-only first pass, then a live DOM verification:** the Testimonials design review.
  - **Browser steps retried after the cap blocked them:** the write-up and Testimonials detector passes.
  - **Screenshots largely failed** because the pane was hidden, so most layout figures are DOM measurements rather than visual captures.
- **The shared `impeccable live-server` (port 8400) was stopped and restarted by different agents mid-run.** One About injection failed and was retried successfully.
- **The dev data toolbar** (Desktop / Mobile / Demo data / Worst case / Empty / One) visible in captures is `src/dev/DataToggle.tsx`. It's dev-only and not part of any section.
- **Contrast** figures are WCAG ratios against canvas `#0b2545` (or dialog surface `#0f3060` where noted).
- **Viewports:** desktop 1024–1440px wide, mobile the 375×812 preset.

---

## 1. Hero — `src/components/Hero.tsx`

### Design specificity verdict
**The idea is authored; the content filling the first screen is not.**

**What's authored:** the blueprint frame is clearly made for a mechanical engineer. The role is set as a **dimension callout** spanning the name, with arrowheads, extension lines, and text auto-fitted to the line (`Hero.tsx:35-86`). It is a real, ownable signature move.

**What's generic:** the three things that fill the first screen.
- A hotlinked Unsplash stock portrait of a stranger (`content.ts:53`), cropped by `object-top` so mostly hair and forehead show.
- The placeholder name `FIRSTNAME LASTNAME` (`content.ts:24-25`, TODO).
- The stock CTA pair "View projects / Get in touch".

Swap the palette and it is the familiar "giant name + photo + two buttons" portfolio hero. Nothing the engineer actually built appears above the fold.

**Deterministic scan:**
- The CLI `detect --json src/components/Hero.tsx` came back clean (`[]`, exit 0), as did the whole `src/components` tree.
- The browser overlay found 2 page-level anti-patterns. Neither is specific to the hero:
  1. **`codex-grid-background`** ("two-axis grid-line gradient background"). Its source is the `.drafting-grid` utility at `src/index.css:37-43`: 24px minor and 120px major lines, four linear-gradients in `rgb(157 212 245)` at 0.09/0.035 alpha.
     - **Verdict: false positive as an anti-pattern.** The grid is the deliberate core of the blueprint redesign: decorative, `aria-hidden`, `pointer-events-none`, and low alpha.
     - **A real issue the detector surfaced:** the grid is painted **twice** over the hero. `App.tsx:18` has a `fixed inset-0 -z-10` page layer, and `Hero.tsx:104` adds another `absolute inset-0` layer. The two can double up line density and drift out of alignment while scrolling (fixed vs absolute). Keep one.
  2. **`straggler`** ("hours." alone on the last line). This is in Contact, not the hero; see Cross-cutting.
- **Why the CLI missed the grid:** it is a CSS `@utility` in `index.css`, which the `.tsx` static scan does not resolve. Only the computed-style browser pass sees it.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | The nav pill shows the active section (copper, `aria-current`). The hero is `100svh` with no scroll cue while the CTAs sit at the bottom edge. |
| 2 | Match system / real world | 3 | The dimension-line metaphor is right for the audience. The photo shows nothing of the work, and the forehead crop reads as an error. |
| 3 | User control and freedom | 3 | Anchor CTAs, Esc closes the mobile menu, there's a skip link, and nothing traps the user. |
| 4 | Consistency and standards | 3 | Shared `BUTTON_PRIMARY/SECONDARY` tokens. The "FL" initials home link reads as an abbreviation, not a person. |
| 5 | Error prevention | 2 | The layout depends on name length: short names collapse the role to a 12px, 4-line stack, with no guard. |
| 6 | Recognition rather than recall | 3 | The nav is visible and labelled, and nothing has to be remembered. |
| 7 | Flexibility and efficiency | n/a | Single-page portfolio; skip link and anchors are enough. |
| 8 | Aesthetic and minimalist | 2 | Minimal, but about 60% of the mobile viewport is a blurred stranger's hair. Decoration outweighs content. |
| 9 | Error recovery | 3 | `hideIfMissing` removes a failed photo cleanly and the canvas remains. |
| 10 | Help and documentation | n/a | A hero needs no help content. |
| | **Total** | **22/32** | **69%: Acceptable, bordering Good** |

### Cognitive load
- **Passes:** single focus (the name at 128.7px on desktop), chunking, grouping, working memory, and two CTAs in the hero.
- **Partial failure, visual hierarchy:** on mobile the photo's hairline crosses mid-screen and competes with a 38.4px name confined to 207px of the 375px width.
- **≤4 choices:** the hero has 2, but the nav adds 7 more on the same screen (FL, About, Experience, Projects, Testimonials, Contact, Résumé), so 9 targets in total.
- **Progressive disclosure, failing in spirit:** the hero reveals nothing about the work. The proof (Kärcher, drones, the S$1.2k saving) is two scrolls away.

### Emotional journey
- **First 5 seconds:** the drafting choreography is excellent. Name lines rise from behind their baselines, extension lines drop (350ms), the dimension line draws out from the centre (450ms), the value fades in (700ms), and everything settles at about 1.1s (`index.css:157-180`). It feels engineered.
- **Then the photo:** the eye lands on a giant greyscale crop of a scalp with an eye peeking in at the bottom edge, and the impression shifts from "precise" to "is this a placeholder?".
- **Peak:** the dimension line drawing out.
- **End:** two generic buttons, so the hero never pays off its own metaphor.

### What's working
1. **`DimensionLine` (`Hero.tsx:35-86`).**
   - It fits the role text to exactly 94% of the name's width (`LABEL_FILL`), with one `nowrap` measurement because width scales linearly with font size.
   - It refits on `ResizeObserver` and on `document.fonts.ready`.
   - `w-0 min-w-full` keeps the role from widening the name block.
2. **Disciplined motion and preference handling.**
   - Custom easings, each with a stated rationale.
   - A full `prefers-reduced-motion` fallback to fades (`index.css:224-243`), plus `prefers-reduced-transparency` handling.
   - Descender- and accent-safe reveal masks (`-my-[0.14em] py-[0.14em]` with `overflow-clip`, `Hero.tsx:112`).
3. **Strong tokens and contrast.**

   | Pair | Contrast |
   |---|---|
   | Ink on canvas | 14.42:1 |
   | Cyan role on canvas | 9.65:1 (about 4.5:1 over the lightest photo area, ~#3a5a7e) |
   | Canvas text on copper CTA | 5.8:1 |

   The focus ring is a 2px copper outline with a 3px offset, CTAs are 44px (`min-h-11`), and a skip link to `#main` exists.

### Priority issues

**[P1] The hero image is a stranger's stock photo, cropped to a forehead**
- **Why it matters:** on a personal portfolio, the largest visual is presumed to be the person.
  - A recruiter who later meets the real person feels misled, and anyone who recognises the Unsplash image reads the site as a template.
  - At 375px it takes the top ~60% of the screen with no face. `object-top` (`Hero.tsx:99`) plus the left and bottom gradients leave scalp, not a portrait.
- **Fix:** replace `SITE.heroImage.src` (`content.ts:53`). Options, best first:
  1. Make the hero a line drawing or exploded view of an actual build (sweeper sensor mast, kill-switch enclosure). This reinforces the blueprint idea.
  2. Use a real photo of the person, ideally in the workshop or with hardware, with alt text since it is then meaningful.
  3. Drop the photo and let the grid carry the hero.

  If a portrait stays, set `object-position` per breakpoint so the face sits right of the name on desktop and above it on mobile.
- **Also:** it's a third-party 1920px hotlink and the LCP element, with no `srcset`/`sizes`, so mobile downloads the full image. Self-host it and add responsive sources.
- **Command:** `/impeccable bolder` (or `/impeccable shape` for a work-led hero)

**[P1] The h1's accessible name is "FirstNameLastName", with no space**
- **Why it matters:** the accessibility tree reports `heading "FirstNameLastName"`.
  - The two `display:block` spans (`Hero.tsx:111-117`) have no whitespace between them, so screen readers announce the name as one fused word ("JaneDoe").
  - That is the most important string on the site.
- **Fix:** render `{line}{i === 0 ? ' ' : null}` inside the outer span, or put `aria-label={fullName}` on the `<h1>` and `aria-hidden` on the visual spans. Consider tying the role to the heading too: an sr-only `", "` plus the role inside the h1, or `aria-describedby` pointing at the dimension-line `<p>`. The h1 would then say who *and* what. Today the role is a bare `<p>`.
- **Command:** `/impeccable harden`

**[P2] The role's size depends on the name's length, and short names break the layout**
- **Why it matters:** the line is locked to the name's width (`w-0 min-w-full`, `Hero.tsx:63`) and `LABEL_MIN = 12` (`Hero.tsx:22`).
  - Tested with "Li / Wei" at 375px, the role dropped to 12px and wrapped to 4 centred lines ("MECHANICAL / DESIGN & / ROBOTICS / ENGINEER") over an 80px dimension line, and the metaphor collapsed.
  - Even the placeholder name puts the role at 12px on 2 lines on mobile.
  - Long names were fine: "Maximilian Wiśniewski-Kowalczyk" fit with no overflow.
- **Fix:** raise `LABEL_MIN` to 14–16. When the fitted size would fall below that, extend the dimension line beyond the name to `max(nameWidth, roleNaturalWidth@16px)` instead of shrinking the text. Alternatively, on narrow screens span the line across the container with the role on its own line. Raise tracking at small sizes from `0.06em` to `0.08em`.
- **Command:** `/impeccable adapt`

**[P2] The hero carries no evidence of the work**
- **Why it matters:** in Experience mode, the work should lead.
  - "Mechanical Design & Robotics Engineer" is a category label, not a claim.
  - `SITE.description` (`content.ts:29-30`: "CAD, technical drawings, fabrication, prototyping and field-tested hardware for autonomous systems") is better hero copy than anything currently on screen.
- **Fix:**
  - Add one specific line under the dimension line, e.g. "Field-tested hardware for autonomous systems: Kärcher Robotics, The Kinetic Option".
  - Or add a tolerance-style secondary callout, e.g. `± 2 internships · 9 projects · Singapore UTC+8`.
  - Make the primary CTA specific: "View 9 projects" or "See the sweeper retrofit".
- **Command:** `/impeccable clarify`, plus `/impeccable delight` for the annotation

**[P3] Landscape and short viewports push the CTAs below the fold**
- **Why it matters:** at 812×375 the `15svh` clamp shrinks the name, but `min-h-[100svh]` plus `pt-28` (112px top padding) uses a third of the height, and the CTAs land under the bottom edge.
- **Fix:** at `Hero.tsx:106`, use `pt-20 sm:pt-28` with a `[@media(max-height:500px)]:pt-20` variant, and reduce `mt-10` on the actions (`Hero.tsx:122`) at short heights.
- **Command:** `/impeccable adapt`

### Persona red flags
- **Jordan (first-time recruiter):**
  - Sees `FIRSTNAME LASTNAME` and an "FL" nav mark.
  - Can't tell whose face this is; it looks like the subject but shows no face.
  - "View projects" says nothing about what kind of projects or how many, so there's no reason given to scroll.
- **Casey (mobile):**
  - The first screen is about 60% hair crop, and the 38.4px name sits in the bottom third.
  - The role is 12px uppercase on 2 lines (4 with short names), hard to read outdoors.
  - The CTAs fall below the fold in landscape.
  - Good: the 44px CTAs sit side by side, there's no horizontal scroll, and the Menu button is labelled.
- **Sam (accessibility):**
  - The fused h1 name.
  - The role isn't associated with the h1.
  - The copper focus ring on the copper primary button relies on the 3px offset; a two-tone ring (canvas inner, copper outer) would be clearer.
  - Text over the photo relies on the gradients with no guaranteed scrim. A lighter replacement photo could drop cyan contrast below 4.5:1.
  - Good: skip link, `aria-hidden` decoration, reduced-motion fallback.

### Minor observations
- `aria-hidden` on the photo wrapper depends on alt being set (`Hero.tsx:92`), which is good. But if the photo is meant to be the person, empty alt is the wrong choice.
- `opacity-50 mix-blend-luminosity grayscale` (`Hero.tsx:99`) stacks three treatments to do one job (tint to blueprint blue). A single duotone overlay would be cheaper and easier to control.
- The photo's `settle` scale runs 1200ms, longer than the "settles by about 1.1s" comment says.
- `aria-label="Introduction"` on the section adds little; the h1 already names the landmark.
- In a mid-animation screenshot the name looks clipped; it's fine once settled.
- On mobile the role wraps to 2 lines centred over a left-aligned dimension line.

### Questions to consider
1. If the dimension line is the hero's best idea, why does it measure the person's *name* rather than something they built? What if the hero were a dimensioned drawing of the sweeper sensor mast, with the name in the title block, the way a real drawing is signed?
2. Would a robotics hiring manager remember this hero tomorrow, or "the blue one with the guy's forehead"?
3. What one sentence can only this engineer say ("I cut a LiDAR from a S$16k robot and it saw more")? Why isn't it the second-largest thing on the page?

---

## 2. About — `src/components/About.tsx`

### Design specificity verdict
**Mostly generic, with one authored detail.**
- **Generic structure:** a bio column on the left and a "Tools and methods" list on the right could belong to any engineering portfolio.
- **The blueprint language stops at the heading.** It survives only in the shared `SectionHeading` leader line with its copper datum diamond. There are no dimensions, title block, callouts or images; the `<dl>` rule lines (`About.tsx:38-42`) read as an ordinary definition table.
- **The copy does the most damage.** The lede is the most interchangeable sentence on the site: *"a passion for creating with my hands… the intersection of engineering rigour and design craft… functional, aesthetic and resilient."*
- **The authored moment is buried:** the last sentence of paragraph 3, *"I firmly believe insects and arachnids are underrated and deserve more attention."*
- **Telling detail:** the `worst` dev fixture's copy ("moving between CAD, the workshop floor and field trials… occasionally all on the same afternoon"; "Outside of work I restore old lathes") has more voice than the real bio.

**Deterministic scan:**
- CLI `detect --json src/components/About.tsx` came back clean (`[]`, exit 0).
- The browser overlay found **0 findings on About's own elements**. Only the page-wide fixed grid layer shows behind it (see Cross-cutting).
- No horizontal overflow on mobile.
- Every About issue below is about copy, composition or semantics, which the detector does not cover. The two assessments don't conflict.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | The nav highlights About; the leader line draws in once. |
| 2 | Match system / real world | 2 | "Others" is a junk drawer holding "ISO 2768", "DFMA" and "Technical Drawings" (standards and methods). The heading says "methods" but nearly everything is a tool. |
| 3 | User control and freedom | 3 | The résumé opens in a new tab with an sr-only "(PDF, opens in a new tab)" hint (line 28), but there's no visual cue for sighted users. |
| 4 | Consistency and standards | 2 | Drops the hero's dimension vocabulary. The `<dt>` is cyan while label accents elsewhere are copper (cyan is for dimension marks, `index.css:20`). The résumé CTA duplicates the navbar's Résumé button. |
| 5 | Error prevention | 3 | `useResumeUrl` hides the link until the PDF exists. URLs in the bio render as dead text. |
| 6 | Recognition rather than recall | 2 | Skill items are separated only by `gap-x-5` whitespace, so multi-word items run together ("Sheet Metal Fabrication Handheld Power Tools"). |
| 7 | Flexibility and efficiency | n/a | Static reading section. |
| 8 | Aesthetic and minimalist | 2 | The "Outside of work" paragraph lists five hobbies. At 1440px the right column ends about 40% of the way down, leaving dead blueprint below. |
| 9 | Error recovery | 3 | A missing résumé is hidden cleanly, and empty data hides the section and its nav link (`data.ts:22-29`). If `ABOUT` is empty, the résumé button is left orphaned. |
| 10 | Help and documentation | n/a | Not applicable to a bio. |
| | **Total** | **20/32** | **63%: Acceptable** |

### Cognitive load
- **Single focus: fail.** The lede, the skills table and the résumé button compete at similar weight, and on desktop the eye bounces between two equal columns.
- **Chunking: partial.** Items within a skill group aren't delimited, and the 7 software items wrap into 3 ragged rows on mobile.
- **Hierarchy: weak.** The h3 "Tools and methods" (20px Chakra) is the same size as the 20px lede.
- **Redundancy: fail.** Paragraph 2 restates the first two Experience entries one scroll before they appear.

### Emotional journey
- **The hero sets the expectation:** an engineer who thinks in drawings.
- **About deflates it** with "Hi, I'm…" and a buzzword triad. Nothing visual carries over except the leader line.
- **The hooks are buried:** the insects/arachnids line and the calisthenics and languages details are in `text-muted` at the bottom of the left column.
- **About previews Experience** (same Kärcher fact) instead of being its own beat.
- **On mobile:** the section is about 1,590px (about 2 screens), and the first screen is one 7-line generic paragraph.

### What's working
1. **Accessibility basics.**
   - `aria-labelledby` on the section, and semantic `<dl>/<dt>/<dd>` with a `<ul>` for items.
   - An sr-only PDF/new-tab hint on the résumé link.
   - A 2px copper focus ring with 3px offset (5.8:1), confirmed with real Tab navigation.
   - A 44px button (`min-h-11`).
2. **Contrast and measure.**
   - Lede 14.42:1, muted body `#bcd0e6` 9.75:1, cyan `<dt>` 9.65:1.
   - Column capped at `max-w-[62ch]`: about 70 characters per line at 1440px, about 50 at 1024px.
   - Line-height 1.625.
3. **Missing data handled.**
   - The section skips itself when both arrays are empty (line 8).
   - The résumé link appears only when the file exists (`utils.ts:22-46`).
   - The worst fixture's long strings wrap with no overflow (1430 vs 1440, 375 vs 375).

### Priority issues

**[P1] The lede copy is generic and wastes the most valuable line in the section**
- **Why it matters:** it's the first thing read after the hero. The specifics are in paragraph 2 and the personality is at the end of paragraph 3.
- **Fix:** in `content.ts:74-77`:
  - Lead with something only this person can say: the sweeper-to-autonomous retrofit, or the CAD → workshop → field-test loop.
  - Drop "Hi, I'm a".
  - Cut the paragraph 2 sentence that duplicates Experience, or replace it with a design philosophy Experience can't show.
  - Move the insects line up, or give it a pull-quote treatment.
- **Note:** the TODO at `content.ts:75` already flags paragraph 2 as filler.
- **Command:** `/impeccable clarify`

**[P1] The section abandons the blueprint language the hero establishes**
- **Why it matters:** the site's one distinctive idea is the drawing, and About is a plain two-column text block, so the page goes from authored to template in one scroll.
- **Fix:** in `About.tsx:35-56`, choose one of:
  - Make the skills panel a real **title block or parts list**: bordered, with a header row (`REF / GROUP / ITEMS`), numbered rows and dimension ticks.
  - Set one key fact (builds fabricated, years) as a dimension callout reusing `DimensionLine` (`Hero.tsx:35-86`).
  - Add a small workshop photo or portrait with a leader-line callout.
- **Command:** `/impeccable bolder`

**[P2] Skill items have no visual delimiter, and naming is inconsistent**
- **Why it matters:**
  - `flex flex-wrap gap-x-5` (line 46) blurs items: "Laser & Waterjet cutting Sheet Metal Fabrication", "ANSYS Fluent Adobe Illustrator Python ROS2".
  - Long items such as "Finite element analysis (ANSYS Mechanical, Abaqus)" wrap mid-item.
  - Capitalisation and naming are inconsistent: "Laser & Waterjet cutting" vs "Sheet Metal Fabrication", "Fusion360" vs the official "Fusion 360", "ROS2" vs "ROS 2".
- **Fix:**
  - In `About.tsx:46-48`, add a separator via `li:not(:last-child)::after` (middot or slash), or render items as bordered tags or one per row.
  - Normalise the strings in `content.ts:80-89`.
  - Rename "Others" to "Standards & methods".
- **Command:** `/impeccable polish`

**[P2] The composition leaves dead space at desktop and has no peak**
- **Why it matters:** at 1440×900 the right column ends early, leaving the lower right empty, and both columns open at the same 20px weight.
- **Fix:** in `About.tsx:15`, choose one of:
  - Rebalance to `lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]` and make the skills panel `lg:sticky`.
  - Span the lede across both columns at `text-2xl lg:text-3xl`, with the supporting paragraphs and table underneath.

  Either way, demote the h3 (line 37) to a small uppercase label (`text-sm tracking-wide text-faint`).
- **Command:** `/impeccable layout`

**[P3] Edge cases: dead URLs in the bio, and the grid collapses when data is missing**
- **What happens:**
  - The worst fixture's `https://grabcad.com/…/models` is unlinked plain text that breaks across lines.
  - When `SKILL_GROUPS` is empty, the two-column grid still reserves the right track, leaving the bio in about 52% of the width.
  - When `ABOUT` is empty, the résumé button floats alone.
- **Fix:** support inline links in `ABOUT` (a `{text, href}` array or a minimal link parser), and apply the `lg:grid-cols-[…]` class at line 15 only when `SKILL_GROUPS.length > 0`.
- **Command:** `/impeccable harden`

### Persona red flags
- **Jordan:**
  - The first sentence repeats the hero's role line, and the real hook (Kärcher) is muted grey in paragraph 2.
  - Can't tell where "Handheld Power Tools" ends and the next item begins.
  - There are two résumé buttons (here and in the navbar), so it's unclear which to use.
- **Casey:**
  - The section is about 1,590px tall, and the first screen is 7 lines of generic copy.
  - The résumé button between the bio and the skills reads as the end of the section, so "Tools and methods" is easy to miss.
  - Ragged 2–3 item rows, and no image to break the text.
- **Sam:**
  - The basics pass: labelled section, `<dl>` semantics, visible focus ring, contrast of at least 9.6:1.
  - There's no *visual* "opens PDF in new tab" cue for sighted keyboard and magnifier users, although `ExternalLink` in `ui.tsx` already shows an arrow icon elsewhere.
  - The `<dt>` labels are 14px, the smallest text in the section.
  - The leader-line animation is correctly gated by reduced motion.

### Minor observations
- The lede uses straight apostrophes in "Hi, I'm" (`content.ts:74`), while the site uses typographic touches elsewhere ("résumé").
- "Outside of work, I like to acquire knowledge" is stilted.
- On mobile, `space-y-6` plus `pt-4` before the button gives a 40px gap that reads as a section break.
- With `?data=one`, a single "Software / SolidWorks" row looks sparse; consider a minimum-content treatment.

### Questions to consider
1. If the hero says "I think in engineering drawings", why does About look like a résumé template? What would it look like as a title block that describes *you*?
2. Your most memorable sentence is about insects and arachnids. Why is it the last line, in the page's lowest-contrast colour?
3. What is the one sentence about *how you work* that no other mechanical engineer would write?

---

## 3. Experience — `src/components/Experience.tsx`

### Design specificity verdict
**The content is specific; the layout is category-interchangeable.**
- **The copy is unusually concrete:**
  - *"saving S$1.2k on a S$16k autonomous cleaning robot"*
  - "ISO 2768"
  - "Punggol Digital District"
- **The layout is a stock résumé timeline:** a left rail with dots, then a single-open accordion with a big company name, role, dates, and a + that rotates into an ×.
- **The blueprint language is thin:** it appears only in the inherited `SectionHeading` leader and the 1px copper dashes before each bullet. There are no dimension callouts for the dates, no title-block styling, no part numbers. Remove the grid background and this is any developer's portfolio.
- **Palette note:** this section's accent is copper only; cyan appears only in About and Hero.

**Deterministic scan:**
- CLI `detect --json src/components/Experience.tsx` came back clean (`[]`, exit 0).
- The browser overlay found **0 findings inside `#experience`**. The section is `border-t border-line py-24 lg:py-32` with no background of its own.
- The page-level grid finding comes from the `App.tsx:18` fixed layer behind every section. It is not an Experience defect; see Cross-cutting.
- No horizontal overflow at 375px.
- The detector agrees with the review that the section is technically clean; every issue below is about structure and hierarchy, which no detector catches.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | `aria-expanded`, a copper title and dot, and an × mark the open row. Opening one row silently closes another. |
| 2 | Match system / real world | 3 | "Jun 2026 – Sep 2026" reads naturally, but there's no duration ("4 mo"), which recruiters work out in their heads. |
| 3 | User control and freedom | 2 | Single-open accordion (`useState<number\|null>(0)`, line 8). You can't open all rows to compare or print. |
| 4 | Consistency and standards | 3 | Matches the site's tokens and `SectionHeading`. Copper means both "selected" and "link". |
| 5 | Error prevention | 2 | No data guard: a role with no description and no highlights still renders an expandable button over an empty panel. |
| 6 | Recognition rather than recall | 2 | Quantified impact for 2 of 3 roles is hidden; the reader has to remember to open each row. |
| 7 | Flexibility and efficiency | n/a | Read-only content; "expand all" would be the only accelerator. |
| 8 | Aesthetic and minimalist | 3 | Calm, with good whitespace. The 30px display company name out-shouts the role. |
| 9 | Error recovery | 3 | Nothing really fails; an empty list returns `null` and hides the nav link (`data.ts:22-28`). |
| 10 | Help and documentation | n/a | Not applicable. |
| | **Total** | **21/32** | **66%: Acceptable** |

### Cognitive load
- **Visual hierarchy: fail.**
  - The company (30px bold Chakra) sits above the role (18px, `text-ink/90`).
  - Bullets are `text-muted` while the description is `ink/90`, so the generic duty line ("Worked on retrofitting…") is louder than the quantified wins.
- **Working memory: fail.** Comparing roles means toggling back and forth.
- **Progressive disclosure: misapplied.** Résumé highlights *are* the main content, so hiding them taxes the 10-second scan this section exists for.
- **Grouping: partial.** Period and location are run-together spans 16px apart, with no separator or label.
- **Passes:** single focus, chunking, and ≤4 choices (3 rows).

### Emotional journey
- **Arrival:** confident. A big "EXPERIENCE" heading and a copper "Kärcher Robotics Singapore".
- **The first panel** delivers the LiDAR saving.
- **Then two collapsed rows** that look like bare headers, leaving the reader to wonder whether there's anything inside.
- **The most exciting facts are hidden:** the drone kill switch and the "aerial drone prototype within 1 month" both start collapsed.
- **Exit:** a long empty band (`py-24 lg:py-32` plus the next section's padding) before Projects.

### What's working
1. **Outcome-led, quantified copy.**
   - "Optimised the LiDAR configuration to use 2 (previously 3) hemispherical digital LiDARs, saving S$1.2k on a S$16k autonomous cleaning robot".
   - "Certified 100+ students in FDM 3D printing…".
2. **The accordion is built correctly.**
   - Each button sits inside an `h3` with `aria-expanded` and `aria-controls`.
   - Each panel is `role=region`, `aria-labelledby` its button, and `inert` when closed (verified: "Visit" links in closed panels can't be focused).
   - It animates with grid rows from `0fr` to `1fr`, so content is never clipped.
   - Copper `:focus-visible` outline (`index.css:91-94`).
3. **Edge cases partly handled.**
   - An empty list hides the section and its nav link.
   - `[overflow-wrap:anywhere]` keeps the 79-character NTU name inside 375px.
   - The rail and dots are hidden below `lg`.
   - The rail draw-in respects reduced motion.

### Priority issues

**[P1] Highlights are hidden by default, so the section fails the 10-second recruiter scan**
- **Why it matters:**
  - With demo data, 6 of 9 quantified bullets are collapsed on load, so a skimmer sees three employer names and dates.
  - With only 3 roles, the accordion saves no meaningful space; the open panel alone is 486px on mobile.
- **Fix:** at `Experience.tsx:8` and `:77-100`, render every role expanded as a static list and drop the button and region. Alternatively, start all rows open (`useState<Set<number>>` seeded with every index) and allow several open at once. At minimum, show each role's first highlight in its collapsed header.
- **Command:** `/impeccable distill`

**[P1] Hierarchy is inverted: company is louder than role, description louder than impact**
- **Why it matters:** "Kärcher Robotics Singapore" at 30px bold vs "Mechatronics Engineer Intern" at 18px regular. The bullets carrying the numbers (`text-muted` `#bcd0e6`, 9.75:1, fine for contrast) look secondary to a generic description line.
- **Fix:**
  - At `:51-57`, set the role in the display face at `text-xl/2xl`, with the company at the same size or smaller.
  - At `:88`/`:91`, flip the colours (highlights `text-ink`, description `text-muted`), or cut descriptions that only repeat the bullets.
- **Command:** `/impeccable typeset`

**[P2] The heading's accessible name runs together, and there's no `<time>`**
- **What happens:** the accessible name reads as *"The Kinetic OptionAssistant Mechanical Designer InternJan 2026 – Jun 2026Singapore"*. The whole header is a button inside the `h3`, so heading navigation announces this string.
- **Fix:**
  - At `:49-61`, add sr-only `", "` separators.
  - Better, keep only company and role in the heading and button, and move period and location to a `<p>` outside the button.
  - Wrap dates in `<time dateTime="2026-06">`. That requires splitting `period` (`content.ts:107`) into `start`/`end` fields, which also enables computed durations.
- **Command:** `/impeccable audit`

**[P2] Empty roles render a dead control**
- **What happens:** the worst fixture has ABB "Intern" with `description: ''` and `highlights: []`. It still gets a + button that opens an empty region containing an empty `<ul class="mb-6">`.
- **Fix:**
  - At `:27-41`, when `!exp.description && exp.highlights.length === 0 && !exp.url`, render a non-interactive header with no button and no +.
  - At `:89`, guard the `<ul>` with `exp.highlights.length > 0`.
- **Command:** `/impeccable harden`

**[P3] Not drawn in the blueprint language, and the rail is generic**
- **Fix:** at `:20-38` and `:58-61`, choose one of:
  - Render each period as a **dimension callout**: a cyan dimension line with tick ends spanning the duration, labelled "4 MO".
  - Present each role as a **drawing title block** (ROLE / ORG / PERIOD / LOC cells, echoing About's `dl`).

  Showing durations also exposes the June 2026 overlap between Kärcher and The Kinetic Option.
- **Command:** `/impeccable bolder`

### Persona red flags
- **Jordan:**
  - The +/× circles are the only sign of hidden content, and collapsed rows look complete, so the drone work goes unseen.
  - "Visit Kärcher Robotics Singapore" sends Jordan off-site mid-scan.
  - Nothing frames these as internships ("Internships · 2024–2026").
- **Casey:**
  - Collapsed headers are about 172px tall at 375px, and company names wrap to 2 lines at 24px.
  - The section is 1,285px (about 1.6 screens), mostly headers.
  - In the worst fixture one header button is 360px tall (a 5-line NTU title), 44% of the viewport for a single tap target, so accidental toggles while scrolling are likely.
- **Sam:**
  - The run-together accessible name.
  - Heavy nesting: `ol > li > h3 > button` with three block spans inside.
  - 0 `<time>` elements.
  - Opening one panel silently collapses the other, removing content Sam just read from the reading order.
  - The worst fixture's Vietnamese entry ("Kỹ sư thiết kế cơ khí") has no `lang="vi"`.
  - Contrast passes (muted 9.75:1, copper 5.80:1, ink 14.4:1).

### Minor observations
- "Jan 2026 – Jun 2026" and "Jun 2026 – Sep 2026" share June, which may read as a typo.
- The rail stops at the last item's bottom border, and the dots at `top-10` drift against 2-line titles.
- No demo role ends in "Present". The worst fixture's current role ("Jan 2024 – Present") gets no special treatment: no "Current" badge or distinct dot.
- "Visit Singapore University of Technology and Design" links to the fab lab page; "SUTD Fabrication Lab" would be more accurate.
- The nav scroll-spy left "Experience" lit while the Projects heading was already on screen (a Navbar concern).

### Questions to consider
1. With three early-career roles, what is the accordion protecting the reader from? Would one dense spec-sheet table beat three disclosures?
2. Should the section lead with job titles rather than employer brands, since the role is what's being hired?
3. How would a draughtsman dimension a career? Duration bars on a shared time axis, so overlaps and gaps are honest and visible?

---

## 4. Projects — `src/components/Projects.tsx`

Covers the card grid and how the dialog opens and closes. Reading and navigation *inside* the dialog are in §5, and issues the two share are listed only once, in §5.

### Design specificity verdict
**A generic card grid in blueprint colours, and the work doesn't lead.**
- **All 15 real projects have `cover: ''`** (`content.ts:199, 296, 381 … 1355`), so the section ships **15 identical "Cover photo" placeholder panels**. Each takes the top ~40% of its card, and another opens the dialog.
- **The card is a stock structure:** rounded-xl, image, 1px accent bar, title, clamped summary, tag chips, "View details". Swap the palette and it's any Tailwind template.
- **The blueprint language stops at the section heading.** The hero's dimension line and copper datum mark never reach the cards.
- **The only per-project mark is the 4px accent bar** (`Projects.tsx:25`), and its copper/cyan/white/amber colours carry no meaning a visitor can read.
- **The copy behind the cards is the most authored on the site** (S$4.18 vs a S$10 target, six ratchet iterations, the injection-vs-FDM cost table), and the card UI hides all of it.

**Deterministic scan:**
- CLI `detect --json` on `Projects.tsx`, `ProjectDialog.tsx` and `ProjectWriteup.tsx` came back clean (`[]`, exit 0).
- The browser overlay found **0 findings in `#projects`**. Re-running `impeccableDetectAsync()` with the first dialog open also found nothing inside the dialog.
- Facts the detector run confirmed:
  - 15 card buttons, each with `aria-haspopup="dialog"`.
  - A native `<dialog>` opened modal (`:modal` true) with `aria-labelledby="project-dialog-title"`.
  - Backdrop `rgba(5,18,36,0.82)` with `blur(6px)`, dialog surface `rgb(15,48,96)`.
  - Initial focus on Close ("Close project details", 43×43).
  - 340×764 on a 375px phone with no overflow.
- The detector's rule set doesn't model "placeholder imagery dominates the layout", so the P0 below was caught only by the design review.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | "Project 1 of 15" counter and a copper card focus ring. The live region announces only the count (see §5). |
| 2 | Match system / real world | 3 | The Facts list (Role, Team, Timeline) is clear. "Executive summary" is business-report language. |
| 3 | User control and freedom | 3 | Esc, the close button and the drag-guarded backdrop all work, and scroll lock is released. After Next, close returns focus to card 1 (§5). |
| 4 | Consistency and standards | 2 | "View details" uses `ArrowUpRight` (`Projects.tsx:50`), the same icon `ExternalLink` uses for "opens in a new tab", but the card opens a modal. |
| 5 | Error prevention | 3 | Prev/Next disable at the ends, and the backdrop click is guarded. |
| 6 | Recognition rather than recall | 2 | `line-clamp-2` cuts titles: "Growing Coca-Cola's Healthy…", "Autonomous Sweeper Sensor…" vs "Autonomous Sweeper Front…" (indistinguishable), "Autonomous Hull-Cleaning Robot fo…" (cut mid-word). |
| 7 | Flexibility and efficiency | n/a | Portfolio. Small note: no ←/→ keys in the dialog. |
| 8 | Aesthetic and minimalist | 2 | 9 elements per card × 15 is about 135 elements on the grid, with an empty placeholder as each card's largest element. |
| 9 | Error recovery (missing media) | 2 | `hideIfMissing` on a *broken* cover leaves a blank 16:10 navy void holding only the date chip ("Jig", worst fixture), arguably worse than the labelled placeholder. |
| 10 | Help and documentation | n/a | Not applicable. |
| | **Total** | **20/32** | **63%: Acceptable** |

### Cognitive load
- **Visual hierarchy: fail.** The empty image slot is the largest element on every card, so the eye lands on "Cover photo" 15 times.
- **Chunking: fail.**
  - 15 cards in one undifferentiated grid.
  - `context` sorts naturally into internships (Kärcher ×2, TKO ×2), industry/self-initiated and school projects, but it's never used to group them.
  - On mobile the section is **8,806px tall**, about 11 screens.
- **Progressive disclosure: inverted.** The 3-line card summary shows the *brief* ("SUTD's open house needed a door gift: a pocket tape measure that extends to 100 cm, locks a…"), never the outcome. The outcome (S$4.18/unit vs S$10) is sentence 5 of the dialog summary.
- **Working memory: fail.** With no index, you can't jump back to "the drone one" after stepping through with Next.

### Emotional journey
- **Expectation:** this should be the page's peak, after the hero promises an engineer's drawing set.
- **What happens:** the arc dips. The visitor meets a wall of blank cover frames (11 screens on mobile), and opening a card lands on *another* blank "Cover photo" panel above a dense report.
- **The payoff comes too late:** tables, numbers and honest learnings ("the first two-part mould wouldn't release the part") arrive in the 4th of 5 sections, after the visitor has already decided.
- **No moment says "this is the best thing I built".**

### What's working
1. **The dialog is well engineered.**
   - `showModal()` gives a focus trap that held when tested: Tab cycled Close → body → Next → Close.
   - Esc and the close button both work.
   - `overflow:hidden` scroll lock is applied and released.
   - The scrollable body takes focus with a copper outline.
   - The backdrop is drag-select safe (`ProjectDialog.tsx:68-74`).
2. **The write-up copy is outcome-rich.** The target table, "Cost per acceptable shell" (FDM PLA S$0.40 vs PP injection S$2.03/S$2.25), bold run-in leads ("Know when to buy."), and accent-coloured list ticks.
3. **The layout is defensive and contrast passes everywhere.**
   - The stretched title button keeps card semantics clean (`Projects.tsx:27-35`).
   - `[overflow-wrap:anywhere]` handles "KX-3000/Rev-B_FinalAssembly".
   - Contrast:

     | Element | Contrast |
     |---|---|
     | Title | 12.2:1 |
     | Summary | 8.25:1 |
     | Cyan subtitle | 8.17:1 |
     | Faint context | 5.71:1 |
     | Tags | 7.12:1 |
     | Copper "View details" | 4.91:1 |
     | Date chip | 14.4:1 |

### Priority issues

**[P0] The work is invisible: all 15 covers are empty, and placeholders lead every card and the dialog**
- **Why it matters:** for a mechanical engineer's portfolio, imagery is the evidence, and right now the largest element on every card is a stock "Cover photo" frame. First-time visitors read it as an unfinished or broken site.
- **Fix:** don't reserve image space until real photos exist.
  - In `Projects.tsx:16-21`, render the 16:10 frame only when `project.cover` is set. Otherwise lead with a blueprint **title block**: project number, date, and a drawn dimension line in `project.accent`.
  - Apply the same rule to the dialog cover (`ProjectDialog.tsx:109-114`) and `Media` (`ProjectWriteup.tsx:28`, which should return `null` instead of a `Placeholder` when `src` is empty), matching what `SidePhoto` and `Video` already do.
  - Treat a *broken* cover (`hideIfMissing`) the same way, collapsing the frame instead of leaving a navy void.
- **Command:** `/impeccable bolder`

**[P1] Cards sell the brief, not the outcome**
- **Why it matters:** recruiters scan, and the card summary describes the brief. `Tags limit={3}` spends prime space on chips like "CAD", "FDM printing", "+3 more", "React 18", "Vite", "+7 more".
- **Fix:**
  - Add an `outcome` field per project in `content.ts` (e.g. "S$4.18/unit vs S$10 target · 9 parts · 5 processes").
  - Render it at `Projects.tsx:39` instead of the clamped summary, styled as a dimension callout.
  - Drop tags from the card (`Projects.tsx:44`) or cut them to one process tag.
- **Command:** `/impeccable clarify`

**[P1] 15 flat cards with no hierarchy or grouping; 8.8k px on mobile**
- **Why it matters:** there's no peak, every project weighs the same, and Casey scrolls 11 screens. A mousetrap car from 2023 sits at the same size as an industry LiDAR saving of S$1.2k.
- **Fix:**
  - Add a `featured` flag. Render the 2–3 strongest projects as large two-column features, then the rest as a compact list or table (title · context · date) grouped by `context`. The grid is at `Projects.tsx:75`.
  - This also fixes `?data=one`, where a single 279px card sits in an 886px grid.
  - At md (2 columns), 15 projects currently leave one orphan card.
- **Command:** `/impeccable layout`

**[P2] Card affordance and wayfinding**
- **Why it matters:** an outbound-link arrow on an in-page modal breaks consistency (H4), and titles clamped mid-word make the two "Autonomous Sweeper…" cards look identical (H6).
- **Fix:**
  - At `Projects.tsx:49-50`, swap `ArrowUpRight` for a plus or expand glyph and change the copy to "Read the write-up".
  - Remove `line-clamp-2` from the title (`Projects.tsx:34`) and let row height flex, or shorten titles in `content.ts`.
- **Command:** `/impeccable polish`

### Persona red flags
- **Jordan:**
  - Sees 15 "Cover photo" boxes and may think the site is broken.
  - "View details ↗" looks like it leaves the site.
  - Can't tell "Autonomous Sweeper Sensor…" from "Autonomous Sweeper Front…".
  - The card never says what was achieved.
- **Casey:**
  - Each card is about 530–600px, nearly a full screen, and roughly 40% of it is placeholder.
  - The section is 8,806px tall.
- **Sam:**
  - The card's accessible name is only the title. Summary, date and outcome aren't associated with the button, so tabbing through 15 titles gives no way to tell them apart.
  - The visible "View details" text (`aria-hidden`) differs from the accessible name.

### Minor observations
- The date chip "Oct 2026 (in progress)" sits on the image area. "(in progress)" is a status and deserves its own badge (or a "Rev C" revision tag, in drawing language).
- The accent bar and the dialog's accent dot (`ProjectDialog.tsx:82`) encode nothing a visitor can decode.
- Card tags mix tools, frameworks and "AI-assisted (Claude)", while the dialog labels them "Tools and processes".
- Long tags wrap into stacked full-width pills ("Computational fluid dynamics (ANSYS Fluent)"), breaking the row rhythm.
- The nav scroll-spy highlighted "Experience" at the top of Projects and "Contact" mid-grid (`useActiveSection`, `utils.ts`); see Cross-cutting.

### Questions to consider
1. If you had to cut to 5 projects, which ones, and why?
2. What if each card were a drawing sheet, with a title block, a revision letter ("Rev C, in progress"), and the headline number as a dimension callout, so the blueprint language carried the evidence rather than the decoration?
3. Every write-up uses the same four section headings. Is that template serving the reader, or is it a school-report format the projects were poured into?

---

## 5. Project write-up — `src/components/ProjectWriteup.tsx` (in `ProjectDialog.tsx`)

The long-form case study inside the project dialog, assessed as a **Read** surface.

### Design specificity verdict
**The writing is authored; the presentation is a generic modal with text.**
- **The copy is specific and honest:** numbered results, admitted failures, "what I'd revisit".
- **The container ignores the blueprint language:** no drafting grid, dimension line or callout inside the dialog. `drafting-grid` is used only at `Hero.tsx:104`.
- **Results are buried:** "S$4.18 per unit … against the S$10 target" sits in the 4th section as a muted bullet.
- **All 15 write-ups share four identical headings** ("The Challenge & Context", "Exploration & Design Decisions", "The Final Solution & Key Features", "Measurable Impact & Key Learnings"), so they read like a template, not a drawing set.
- **Every write-up opens on an empty "Cover photo" panel** a third of the dialog high (about 262px on a phone, about 240px on desktop). See §4 P0.

**Deterministic scan:**
- CLI on `ProjectWriteup.tsx` and `ProjectDialog.tsx` came back clean (`[]`, exit 0).
- In-browser runs with a write-up open found **0 elements flagged inside the dialog**:
  - default data: "Solagami" open, 2 page findings, both behind the modal;
  - `?data=worst`: "Autonomous Hull-Cleaning Robot…" open, 4 page findings, all behind the modal.
- **This is a false negative, not a clean result.** The same detector flagged an 89-character `line-length` on the page behind, yet ignored the dialog's lines measured at **100–110 characters** at full width (canvas estimate 107–109; 80–97 averaged across rendered lines including short last lines). It apparently skips content in the modal's top layer or scroll container. The design review's P1 on measure stands, and the measured figure is worse than its ~95 estimate.
- **Measurements:**
  - Body text is 16.8–17px with 27.3–27.6px line-height (about 1.6), `ink/90`, and no `max-width`. The text column is 816px inside an 895px dialog at a 1024 viewport.
  - Mobile: 302px text column, about 35 characters per line, no overflow.
  - Heading order is valid: H2 title (30px, the `aria-labelledby` target), then H3 × 5 (20px). The worst fixture adds an H4 ("Housing material"). No skipped levels.
  - All 5 images in the worst fixture have non-empty alt, but it's generated from position ("<title>, cover photo", "<title>: <section heading>"), not from what the image shows.
- **Discrepancy to check:** the detector pass saw *no* cover placeholder on mobile for the project it opened (header ran straight into Executive summary). The design review measured a 262px placeholder on mobile for other projects. The cover may be suppressed under the existing short-height media query, or vary by project. Either way, the fix (drop the cover when `src` is `''`) resolves both.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | "Project 1 of 15" is the only position cue. A 4,000–6,000px write-up has no progress indicator and no sign of the current section. |
| 2 | Match system / real world | 3 | Plain, concrete language and units. "Executive summary" is a business-memo label. |
| 3 | User control and freedom | 3 | Esc, the close button and the backdrop all work. Prev/Next resets scroll with no way back to where you were. |
| 4 | Consistency and standards | 3 | Consistent blocks, almost too uniform. Lists are muted (`#bcd0e6`) while paragraphs are `ink/90`, so key results read as secondary. |
| 5 | Error prevention | 3 | Missing side media hides cleanly, but a `''` cover shows a placeholder instead. |
| 6 | Recognition rather than recall | 2 | The footer reads "Previous" / "Next" with no project names, and there's no in-dialog section list. |
| 7 | Flexibility and efficiency | 2 | Scored here because long-form reading benefits from accelerators. No section jump links and no ←/→ shortcuts. |
| 8 | Aesthetic and minimalist | 2 | Pinned header plus placeholder cover take 40–75% of the first screen. Measure is about 95 characters per line on desktop. |
| 9 | Error recovery | n/a | Nothing to recover from; broken media is (correctly) handled silently. |
| 10 | Help and documentation | n/a | A reading surface needs none. |
| | **Total** | **20/32** | **63%: Acceptable** |

### Cognitive load
- **Working memory: fail.** The reader has to remember what "Next" leads to and how far through a 10-screen document they are.
- **Visual hierarchy: fail.** The outcome numbers are the most persuasive content and get the weakest styling: muted bullets in "Measurable Impact" (`ProjectWriteup.tsx:106`, `text-muted`) under brighter paragraphs.
- **Progressive disclosure: partial.** Only the summary works as disclosure. Results aren't surfaced in the header or the Facts block.
- **Chunking: good at the block level, poor for landmarks.** Bold run-in leads and tables work well. But sections in one `space-y-12` run are divided only by 1.57:1 hairlines (`border-line` `#24507f` on `#0f3060`), so there are few landmarks while scrolling.
- **Passes:** single focus and ≤4 choices (Close, Previous, Next).

### Emotional journey
- **Opening: deflating.** The title, then a big empty "Cover photo" box at the moment of highest interest.
- **Middle: strong.**
  - Run-in leads such as "Rule out what isn't the constraint:" and "Know when to buy."
  - Honest admissions such as "No adoption decision from LyfeGo yet" and "We couldn't make the ratios repeatable" build trust.
- **End: flat.**
  - Each write-up stops on its last bullet ("Test the worst case at full load first, not last.").
  - There's no closing beat, contact link or résumé link.
  - On the last project, Next disappears (`disabled:invisible`), leaving "Project 15 of 15" and nothing to do.
- **The consequence:** an impressed reader has no path to get in touch from inside the dialog.

### What's working
1. **Evidence-led, self-critical copy:** "I left US$2M unspent because nothing in the plan needed it." "S$4.18 per unit in the preliminary model against the S$10 target." This is rare and persuasive.
2. **Solid dialog mechanics and semantics.**
   - Native `showModal()` focus trap.
   - Esc is routed through React.
   - Backdrop close fires only on a press that starts *and* ends on the backdrop (`ProjectDialog.tsx:68-74`).
   - Focus returns with `preventScroll`.
   - Correct outline: h2 title → h3 sections → h4 subheadings.
   - Tables use `scope="col"` and `scope="row"`.
3. **Graceful media handling and AA contrast.**
   - Missing side photos and videos leave no gaps (worst-fixture video wrapper verified `display:none`).
   - Tables `clear-right` and scroll horizontally on phones (353px of content in a 299px box).
   - Contrast:

     | Text | Contrast |
     |---|---|
     | `ink/90` body on surface | 10.2:1 |
     | Muted lists | 8.25:1 |
     | Muted tags on surface-2 | 7.1:1 |
     | Cyan `dt` and subtitle | 8.2:1 |
     | Faint placeholder | 5.7:1 |

### Priority issues

**[P1] Reading measure is about 95 characters per line on desktop**
- **Evidence:** paragraphs measured 816px wide at 17px Plex Sans (about 8.57px per character), from `max-w-4xl` (`ProjectDialog.tsx:76`) with `px-8` (`:116`). Text wrapping around a floated side photo introduces a second measure (374px vs 816px in the same section).
- **Why it matters:** at 90+ characters per line, readers lose their place returning to the next line, across 4,000–6,000px of text.
- **Fix:** cap prose at about 68ch by wrapping blocks in `max-w-[68ch]` (`ProjectWriteup.tsx:199` and `:212`), and let tables, media and Facts run full width. Alternatively, move side photos into a right gutter beside the 68ch column instead of floating them.
- **Command:** `/impeccable typeset`

**[P1] No closing beat or contact path, and "Next" doesn't say where it goes**
- **Evidence:** the footer is "Previous · Project 1 of 15 · Next" (`ProjectDialog.tsx:123-145`), and nothing follows the last section (`ProjectWriteup.tsx:220`).
- **Why it matters:** the write-up is where intent peaks, and the reader has to close the dialog and find Contact themselves.
- **Fix:**
  - End every write-up with an outro block, e.g. "Want the drawings or the cost model? Get in touch", which closes the dialog and scrolls to `#contact`, plus the résumé link from `useResumeUrl()`.
  - Label the footer buttons with the neighbouring titles, e.g. "Next: LyfeGo KOL Portal", truncated.
  - On the last project, replace the invisible Next with "Back to all projects" or "Get in touch".
- **Command:** `/impeccable clarify` (or `/impeccable onboard`)

**[P1] The first screen is mostly chrome and placeholder**
- **Evidence:**
  - The cover takes a third of the dialog's height even when empty (`ProjectDialog.tsx:109-114` → `Media` → `Placeholder`, `ProjectWriteup.tsx:28`).
  - On mobile the pinned header is 117–224px with real data, and **382px of 786px** with the worst fixture's long title, subtitle and context. That leaves 323px of visible body.
  - On the desktop worst case, the body was 425px, of which 233px was cover.
  - Overall, header plus cover take 33–40% of the dialog before the cover placeholder adds another third.
- **Fix:**
  - Drop the cover when `src` is `''` (shared with §4 P0).
  - Let the header shrink on scroll to a single title line, moving subtitle and context into the scrolling body (`ProjectDialog.tsx:79-90`).
  - Alternatively, make the whole dialog scroll at `[@media(max-width:40em)]`, as is already done for short heights.
- **Command:** `/impeccable adapt`

**[P2] No wayfinding inside a long write-up**
- **Evidence:** body `scrollHeight` was 3,212px (tape measure, desktop) and 3,800–6,087px on mobile, which is 8–12 screens with no index.
- **Fix:** add a sticky mini-index of the sections, for example a blueprint-style "SHEET 1/4 … 4/4" strip under the header. Drive it with an IntersectionObserver on `section` (`ProjectWriteup.tsx:206-207`) with `aria-current`. Or add a thin progress rule in the project accent along the header's bottom border.
- **Command:** `/impeccable layout`

**[P2] Focus and screen-reader context get lost when stepping through projects**
- **Evidence:**
  1. **Focus drops to `<body>`:** on the last project, Next becomes `disabled:invisible` *while focused*, so focus falls to `<body>` (verified on "Mousetrap Car").
  2. **Focus returns to the wrong card:** `returnFocus` is captured once (`ProjectDialog.tsx:38`), so after Next → Next → Close it goes back to the *originally opened* card, not the project being read. Confirmed by both the Projects and write-up reviews.
  3. **Position-only announcement:** the live region (`ProjectDialog.tsx:133`) announces only "Project 2 of 15", not the new title.
  4. **Possible Safari keyboard gap:** the scroll body (`ProjectDialog.tsx:103`) has no `tabIndex`, role or label. Chrome makes scrollers focusable but Safari doesn't, so keyboard users there may not be able to scroll the write-up.
  5. **Initial focus:** it lands on Close rather than on the dialog title.
- **Fix:**
  - Use `aria-disabled` and keep the button visible, or move focus to the other button at the ends.
  - Track `openIndex` and, on close, focus `#projects article:nth-child(index+1) button` (`ProjectDialog.tsx:38, 54`) and scroll it into view.
  - Change the live text to "Project 2 of 15: {title}".
  - Give the body `tabIndex={0}`, `role="region"` and `aria-label="Project write-up"`.
  - Hide the footer when `total === 1`.
- **Command:** `/impeccable harden`

### Persona red flags
- **Jordan:**
  - Lands on an empty "Cover photo" box.
  - The headline (S$4.18 vs S$10) is buried in a 600-character "Executive summary" paragraph.
  - The same four headings appear in every project, so they're hard to tell apart.
  - "Next" doesn't say where it goes, and there's no way to contact from the end.
- **Casey:**
  - Pinned header up to 224px (real data) or 382px (worst case) on an 812px screen.
  - A 262px placeholder cover.
  - 4,000–6,000px of scroll with no section jumps.
  - When a side photo exists it floats at `max-w-[45%]` (`ProjectWriteup.tsx:47`), leaving about 146px, roughly 17 characters, of text column beside it.
  - The table scrolls sideways (353px in a 299px box) with no visible cue.
  - The fixed Prev/Next footer takes thumb space.
- **Sam:**
  - Focus is lost to `<body>` at the last project.
  - Focus returns to the wrong card.
  - The scroll body has no role or label.
  - Side-photo alt just repeats headings ("Autonomous Hull-Cleaning Robot…: The Challenge & Context"), and the summary photo's alt is only the title (`ProjectWriteup.tsx:198`).
  - Cover alt "{title}, cover photo" says nothing useful.
  - The `Project` type has no caption or descriptive-alt field (`content.ts:165-184`).
  - `<video>` has no label and no captions track.

### Minor observations
- **Copy error** at `content.ts:297` (LyfeGo summary): "We built it two connected web portals" should be "We built two connected web portals for it".
- The Coca-Cola write-up has a run-in lead with empty body ("Rule out what isn't the constraint:" followed by a list), which reads as a heading styled as a paragraph. Use a `subheading` block.
- Tags are 12.8px (`text-[0.8rem]`), small for a reading surface.
- `Facts` spans only "Role" across both columns (`ProjectWriteup.tsx:174`), and long facts wrap unevenly in the worst case.
- "Executive summary" as every project's first heading: consider "Outcome" or "In short".
- The step-in animation respects reduced motion.
- Note on method: synthetic PageDown/ArrowDown didn't scroll the focused body in the test harness. That's probably a harness limit, so treat keyboard scrolling as *untested* rather than broken; see the Safari note above.

### Questions to consider
1. If each project's strongest number ("S$4.18 vs S$10", "287 + 180 tests", "300 km/h target, 4 weeks") were set as a dimension callout in the header, would anyone still need the executive-summary paragraph?
2. Do all 15 projects really have the same four chapters, or are the identical headings hiding what makes each one distinct?
3. Should a 5,000px case study be a modal at all? As its own routed page it would get a section index, a shareable URL and a "Get in touch" ending.

---

## 6. Testimonials — `src/components/Testimonials.tsx`

> **Method note:** the design review's first pass couldn't open a tab (tab cap), so it worked from source. A second, live verification pass followed (DOM measurements; screenshots weren't possible because the pane was hidden). It confirmed most claims and corrected one: names do **not** line up across the row (see below). The detector pass rendered the section with default, `?data=one` and `?data=worst` data.

### Design specificity verdict
**Mostly generic, with one authored detail.**
- **The underlying pattern is the standard three quote cards:** equal columns (`lg:w-1/3`), body quote, avatar circle with name and role. Blueprint colours, but none of the blueprint language.
- **The authored detail:** each initial sits in a copper drawing-style **callout balloon** (`Testimonials.tsx:95-103`).
- **Correction from the live pass:** `justify-between` (l.97) aligns the *bottoms* of the attribution blocks, not the names. When roles wrap to different line counts, the name tops stagger by up to **71px** (worst fixture: the 5-line "Dr. Bartholomew…" starts at y=6299, 李明/Ngô at 6356, "Jo" at 6370). Put the attribution in its own grid row, or use subgrid, so the names line up.
- **What's missing:**
  - No dimension lines, drawing numbers, revision tags or title-block styling.
  - No link between the quotes and the projects shown just above.
  - A generic "Testimonials" heading.
  - Copper only; cyan doesn't appear.
- **Most important:** the live content is **literally placeholder text** (see P0).

**Deterministic scan:**
- CLI `detect --json src/components/Testimonials.tsx` came back clean (`[]`, exit 0).
- The browser overlay found **0 findings in `#testimonials`** with default, `one` and `worst` data. Everything flagged was elsewhere: the page grid, plus stragglers and line length in About, Experience and Contact (see Cross-cutting).
- **What rendering showed:**
  - **Semantics:** 3 `blockquote`, 3 `li`, **0 `figure`, 0 `figcaption`, 0 `cite`**, 0 `img` (avatars are `aria-hidden` initials). This confirms the review's semantics finding.
  - **Type:** quote 18px / 29.25px (1.625), Plex weight 400, ink at 0.9 alpha, about 247px quote width at 1024. Name 14px ink; role 14px muted.
  - **Track:** manual scroll-snap (`x mandatory`), no autoplay, no Web Animations, no timers. With 3 items it doesn't overflow (scrollWidth 886 = clientWidth 886), so no arrows render.
  - **`?data=one`:** one 295px card in an 886px track, so **about two-thirds of the row is empty**. Confirms P2.
  - **`?data=worst` desktop:** 5 cards × 295px, all stretched to **794px** tall; the track scrolls (1477 / 886). Prev/Next are 44px with sr-only labels, and Prev is disabled at the start. Initials are correct for 李明 → 李 and Émilie → É.
  - **`?data=worst` mobile (375):** cards are 285px wide and **765px tall**. Blockquote heights are 605 / 29 / 117 / 88 / 117px, so the 29px quote ("Jo" card) leaves about **700px of empty space** above its attribution, because `justify-between` pins the attribution to the bottom. No page overflow.
- **What no rule catches:** the single-item empty row and the uneven card fill were measured directly; the detector flagged neither.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | No "2 of 5" count or position. The scrollbar is hidden (`[scrollbar-width:none]`, l.76), so on mobile a 15% peek is the only cue that there's more. |
| 2 | Match system / real world | 1 | The live content is "Placeholder quote. Describe what it was like…", "Supervisor Name", "Job title, Company" (`content.ts:1443-1461`). |
| 3 | User control and freedom | 3 | Swipe, trackpad, arrow buttons and arrow keys all work; no autoplay. The buttons sit in the heading row, far from the cards they move. |
| 4 | Consistency and standards | 3 | Reuses `SectionHeading`, `PRESS` and the tokens. The one gap is the missing figure/cite semantics. |
| 5 | Error prevention | 3 | An empty list returns `null` (l.47) and hides the nav link. But `Intl.Segmenter` (l.10) has no fallback (see P3), and the 40–80-word guidance isn't enforced. |
| 6 | Recognition rather than recall | 2 | It isn't obvious the row scrolls: controls vanish when everything fits and appear at the far end of the heading row when it doesn't. |
| 7 | Flexibility and efficiency | n/a | Read-only content. |
| 8 | Aesthetic and minimalist | 3 | Calm, with vertical rules instead of boxes. Restrained to the point of anonymity. |
| 9 | Error recovery | 3 | Missing data degrades well: an empty role renders nothing, and the monogram stands in for a photo. |
| 10 | Help and documentation | n/a | Not applicable. |
| | **Total** | **20/32** | **63%: Acceptable, held back by content and credibility** |

### Cognitive load
- **Visual hierarchy: fail.**
  - Every word of the quote is the same `text-lg text-ink/90`, with no lead line or emphasised claim.
  - The name, the credibility signal, is only `text-sm font-medium`, the smallest text in the section.
  - `ink/90` against `ink` for names is an almost invisible step.
- **Grouping: partial fail.** The attribution is a sibling `<div>` after the `<blockquote>` (l.97), tied to it only by position.
- **Working memory: fail with more than 3 items.** No count or position.
- **Progressive disclosure: fail for long quotes.** A 110-word, two-paragraph quote renders in full; measured, that's a 605px blockquote inside a 765px card on mobile.
- **Passes:** single focus, chunking, ≤4 choices.

### Emotional journey
- **The order is right:** Projects (proof of work) → Testimonials (social proof) → Contact ("Have a project in mind or want to talk shop?", `Contact.tsx:91`).
- **The hand-off is weak:** no line bridges into Contact, and no quote is tied to a project the reader just saw.
- **With placeholders, the peak inverts.** A recruiter reads "Placeholder quote…" just before being asked to get in touch, which actively drains trust. That's worse than having no section.
- **Even real but vague praise** ("reliable", "great to work with") would make a flat peak.

### What's working
1. **Robust edge-case logic.**
   - An empty list hides the section and its nav link.
   - `initial()` splits by grapheme, so 李明, Émilie and Ngô get a correct first character (verified live).
   - Arrows render only on overflow (l.55), and the disabled state handles both ends (verified).
2. **Disciplined interaction.**
   - No autoplay.
   - Reduced motion is respected (`prefersReducedMotion() ? 'auto' : 'smooth'`, l.44).
   - Native scroll-snap with `overscroll-x-contain`.
   - 44px tap targets with sr-only "Previous/Next testimonial" labels.
   - A named, focusable scroll region.
   - The `-mx-5 px-5` full-bleed track on mobile.
3. **Strong contrast.**

   | Element | Contrast |
   |---|---|
   | Quote `ink/90` on canvas | 11.9:1 |
   | Muted role | 9.75:1 |
   | Copper monogram | 5.8:1 |
   | Arrow border `line-strong` | 3.43:1 (passes 3:1 non-text) |

   These were confirmed live. Where a 1px drafting-grid line crosses text, contrast dips (quote 9.06:1, role 7.28:1, initial 4.33:1) but stays AA. The arrow border dips to 2.56:1 only on a grid crossing, which is trivial.

   **Unverified:** on mobile with worst data, the track reopened scrolled 569px while Previous was still disabled. That's probably because a hidden pane doesn't fire scroll events, but it's worth one manual check: scroll the track by hand and confirm Previous enables.

### Priority issues

**[P0] Placeholder testimonials ship by default**
- **Where:** `content.ts:1440-1463` renders *"Placeholder quote. Keep each quote to around 40 to 80 words so the cards stay a similar height."* under "Supervisor Name / Job title, Company".
- **Why it matters:** in a credibility section, fake-looking quotes cost more trust than an absent section. Any recruiter reads the site as unfinished.
- **Fix:** set `TESTIMONIALS = []`, which is already supported and hides the section and its nav link, until real, permission-cleared quotes exist. Optionally add a dev-only console warning when a quote starts with "Placeholder".
- **Command:** `/impeccable harden` (or `/impeccable clarify` for the content)

**[P1] Weak credibility model: no relationship, context or verifiability**
- **Where:** the `Testimonial` interface (`content.ts:1431-1435`) has only `quote`, `name`, `role`.
- **Why it matters:** a quote persuades when the reader knows "managed me for 8 months on the X actuator" and can check it. Monogram initials look anonymous next to the rest of the site.
- **Fix:**
  - Add optional `relationship`, `project` (an id linking to the Projects card), `url` (LinkedIn) and `photo` fields.
  - Render the relationship as a drafting annotation, e.g. `REF. 02 · Supervisor · Hand Prosthesis project`.
  - Brief writers to name a concrete outcome, as the worst fixture does well: "the first ones our machine shop ever returned without a single query".
- **Command:** `/impeccable shape`, then `/impeccable clarify`

**[P1] Missing quote semantics**
- **Where:** `Testimonials.tsx:85-108`. A `<blockquote>` with a sibling `<div><p>` attribution, and curly quotes injected as literal text into the first and last `<p>` (l.88, 90).
- **Why it matters:** Sam's screen reader announces a quote, then a name as unrelated text, with nothing saying who said it.
- **Fix:**
  - Wrap each item in `<figure>`, with the attribution in `<figcaption>` and the name in `<cite>`; keep the monogram `aria-hidden`.
  - Move the quote marks to CSS `::before`/`::after`, or a hanging decorative mark, so the first line isn't indented by the glyph.
- **Command:** `/impeccable audit`, then `/impeccable harden`

**[P2] Generic composition, a broken single-item layout, and uneven card fill**
- **Where:** `Testimonials.tsx:78-84` (equal thirds) and l.69 ("Testimonials").
- **Why it matters:**
  - **Single item:** with `?data=one` the quote occupies the left third and two-thirds of the row is empty (measured), which looks broken.
  - **Uneven fill:** every card stretches to the tallest. In the worst fixture all cards are 794px (desktop) or 764px (mobile), so the 29px "Reliable." quote sits in a 794px card with about 700px of space below it. The 605px long quote is 75% of an 812px phone screen. Demo cards are 401px, with quotes of 313, 146 and 146px.
  - **Staggered names:** see the correction in the verdict above.
  - **Repeated skeleton:** every section shares the same `border-t py-24 lg:py-32` plus giant-heading frame.
- **Fix:**
  - For one quote, render a single large pull-quote at `lg:w-2/3` in a bigger display size.
  - Add `items-start` on the `ul` (l.76) so cards stop stretching, and clamp long quotes with "Read more". Give the attribution its own grid row or subgrid so the names line up.
  - Give each quote's key sentence a `font-display` lead.
  - Add a drafting annotation, e.g. reference numbers, or a leader line from the balloon to the name.
  - End with a one-line bridge to `#contact`.
  - Consider "References" or "Sign-offs" as the heading.
- **Command:** `/impeccable layout` (or `/impeccable bolder`)

**[P2] Scroll affordance and a false label**
- **Where:** the `ul` gets `tabIndex={0}` and `aria-label="Testimonials, scrolls sideways"` (l.74-75) **even when nothing overflows**. That's the case for the default 3 items (886 = 886, measured).
- **Why it matters:**
  - It's a pointless tab stop with a false label.
  - The controls sit 40–60px above the content they move.
  - There's no position readout.
  - `edges` starts at `{start:true,end:true}` (l.19), so the controls pop in after first paint. On mobile they wrap below the 36px heading and the heading row grows **from 34px to 98px** (measured). No layout-shift entry was recorded only because the section is far below the fold; anyone landing directly on `#testimonials` would see the jump.
  - **No peek on desktop:** in the worst fixture, three 295px cards exactly fill the 886px track, so the 4th card shows no sliver at all. The only cue is the pair of 44px arrows at the far right of the heading row.
  - **Mobile peek:** only about 38px of the second card's text is visible. With `?data=one`, a 50px empty gap looks like the peek of a card that doesn't exist.
- **Fix:**
  - Set `tabIndex` and the label only when the track overflows (reuse `edges`).
  - Add `aria-controls` to the buttons.
  - Add a visible `02 / 05` counter in Chakra Petch.
  - Optionally use dimension-line pagination ticks.
- **Command:** `/impeccable adapt`

**[P3] `Intl.Segmenter` with no fallback**
- **Where:** l.10.
- **Why it matters:** it's unsupported in Firefox below 125. The ReferenceError is uncaught and there's no error boundary, so the **whole app fails to render** there, not just this section.
- **Fix:** `typeof Intl.Segmenter === 'function' ? … : Array.from(name.trim())[0]`.
- **Command:** `/impeccable harden`

### Persona red flags
- **Jordan:**
  - Reads "Placeholder quote…" and "Supervisor Name".
  - Even with real content, can't tell how the quoter knows the candidate and can't verify anything: no link, photo or project.
  - With 4+ quotes, may miss the arrows at the far top-right.
- **Casey:**
  - The hidden scrollbar leaves a 15% peek as the only cue to swipe.
  - The controls wrap below the 2.25rem+ heading, away from the cards.
  - A long quote makes a 765px card to scroll past vertically before swiping sideways; with `snap-mandatory` that can feel sticky (not verified on device).
- **Sam:**
  - No figure/figcaption link between quote and speaker.
  - "Scrolls sideways" is announced even when it doesn't.
  - No count, and no `aria-controls` on the buttons.
  - Disabled arrows at `opacity-35` measure 2.98:1. They're exempt from the contrast rule, but nearly invisible.
  - The good parts: the global copper focus ring applies to the `ul`, contrast is well above AA, and the monogram is `aria-hidden`.

### Minor observations
- Western curly quotes wrap Chinese quotes too; per-locale marks (「」) would be a nice touch.
- "Dr. Bartholomew Fitzgerald-Montgomery III" and the 85-character role wrap cleanly (`min-w-0`), confirmed with no overflow.
- `step()` moves by the first item's `offsetWidth`, which is correct while widths are equal.

### Questions to consider
1. If none of these people would let you show a photo, a LinkedIn link or a project name next to their words, does this section add credibility or only claim it?
2. Why is social proof a separate section at all? A quote pinned inside the relevant write-up ("the machine shop returned these drawings without a single query") would carry more weight next to the drawings themselves.
3. What would a testimonial look like as a drawing **sign-off block** (reviewer, role, date, a quoted revision note)? Would that make the blueprint idea real here instead of just a colour scheme?

---

## 7. Footer — `src/components/Footer.tsx`

> **Method note:** the design review couldn't open a browser tab (tab cap) and was done from source, with contrast computed from tokens. The detector pass *did* render the footer, and its measurements are used below to confirm or correct those source-only claims.

### Design specificity verdict
**An authored ending, but only half committed.**
- **What's authored:** laying the footer out as an engineering **title block** (`Footer.tsx:4-13`) is a real, specific idea, and it closes the blueprint metaphor that starts with the hero's dimension line.
- **What fills it is stock:**
  - `Title: "Portfolio"`, `Scale: "1:1"`, `Sheet: "1 of 1"`.
  - `Revision: String(year)`, derived from `new Date()`.
  - Under it, the generic `© {year} {FULL_NAME}. Designed and built by me.` (`:36-38`) undoes the effect.

The frame is personal; the contents could be anyone's.

**Deterministic scan:**
- CLI `detect --json src/components/Footer.tsx` came back clean (`[]`, exit 0).
- The browser overlay found **0 findings inside the footer**; only the page-level grid layer shows behind it.
- **What rendering showed:**
  - **One link:** `<a href="#top">` "Back to top", with an `aria-hidden` ArrowUp. It's 161×70 on desktop and 334×52 on mobile, so it's a good thumb target.
  - **Desktop (1024):** the footer is 207px tall with all 6 cells in one row.
  - **Mobile (375):** the footer is **421px** tall (the review's ~300px estimate was low). "Drawn by" spans the full 334px, then Title/Revision and Scale/Sheet sit in 167px pairs, then Back to top runs full width. No overflow.
  - **Copyright straggler on mobile:** "me." sits alone on the second line. The detector didn't flag it, but the screenshot shows it.
- **Measured contrast on `rgb(11,37,69)`:**

  | Text | Font / size | Colour | Contrast |
  |---|---|---|---|
  | Labels | Plex 12px, `#8fafd0` | faint | 6.75:1 |
  | Values | Chakra Petch 17px/600, ink | ink | 14.42:1 |
  | Back to top | Plex 17px/500 | muted | 9.75:1 (copper hover about 4.9:1) |
  | Copyright | Plex 14px | faint | 6.75:1 |

  These match the review's token-based figures.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | `Revision: 2026` comes from client-side `new Date()` (`:6,10`), so it rolls over every 1 January (and follows a visitor's wrong clock). It looks like a freshness signal but isn't one. |
| 2 | Match system / real world | 3 | Engineers will recognise the title-block convention, but a year as "Revision" and "Scale 1:1" on a web page are fiction. Real blocks carry a revision letter and date. |
| 3 | User control and freedom | 3 | Back to top is present and labelled; it duplicates the logo link (fine). |
| 4 | Consistency and standards | 3 | No `PRESS` active state on Back to top, unlike other controls (`ui.tsx:6`). Labels are `text-xs text-faint`, while Contact's labels are `text-sm font-medium text-cyan` (`Contact.tsx:15`). |
| 5 | Error prevention | n/a | No inputs or destructive actions. |
| 6 | Recognition rather than recall | 3 | Labels are visible, but label/value pairs are bare `<p>`s with no `<dl>` pairing. |
| 7 | Flexibility and efficiency | n/a | A single link. |
| 8 | Aesthetic and minimalist | 2 | The name appears twice within about 60px; Scale and Sheet are filler; "Designed and built by me" adds nothing. |
| 9 | Error recovery | n/a | No error states. |
| 10 | Help and documentation | n/a | Not applicable. |
| | **Total** | **16/24** (6 scored) | **67%: Acceptable** |

### Cognitive load
- **Flat hierarchy:** all five values share `font-display font-semibold text-ink` at body size, so the name weighs the same as "1:1".
- **Jargon and filler:** "Scale 1:1" and "Sheet 1 of 1" mean nothing to non-engineers and tell engineers nothing.
- **Redundancy:** the name appears twice, the year twice (Revision and `©`), and "by me" restates the name.
- **Passes:** one action, sensible chunking (5+1 cells).

### Emotional journey
- **The peak is Contact:** a warm invitation, a form, the email, and an availability card ending "I reply within 48 hours".
- **The footer should be a quiet sign-off on the drawing.** For about two seconds it is: someone who knows drawings smiles at the title block.
- **Then it empties out.** They read "Portfolio / 2026 / 1:1 / 1 of 1", find nothing, and the last line they see is a stock copyright sentence. The final impression slides from "thinks like a draughtsman" to "template footer".

### What's working
1. **The metaphor is right.** `border-l border-t` on the grid plus `border-b border-r` per cell (`:18,22`) gives clean single-pixel ruling with no doubled lines.
2. **The responsive grid is well considered.**
   - Desktop: `lg:grid-cols-[1.6fr_1.2fr_1fr_0.8fr_0.8fr_auto]`, one row.
   - Small screens: 3 columns.
   - Mobile: 2 columns, with the name and Back to top spanning both (`col-span-2 sm:col-span-1`). Confirmed by measurement; no orphan cells.
   - `[overflow-wrap:anywhere]` handles "Aleksandra Wiśniewska-Kowalczyk".
3. **It doesn't repeat Contact.**
   - No third copy of the email or socials, and it doesn't read `SOCIALS`, so the empty and one fixtures can't break it.
   - Cell rules (`line-strong`) are 3.43:1, which meets the 3:1 non-text minimum.

### Priority issues

**[P1] The title block holds filler, not data**
- **Why it matters:** it's the last thing on the page. A fake "Revision" is mildly dishonest on an engineer's portfolio, where revision control is part of the craft.
- **Fix:** at `Footer.tsx:7-13`, make every cell carry a real value:
  - **Title:** `SITE.role` ("Mechanical Design & Robotics Engineer").
  - **Revision:** a build-time date via Vite `define` (e.g. `__BUILD_DATE__`, formatted `2026-11-20`), or a revision letter from content.
  - **Scale/Sheet:** replace them with useful cells, e.g. `Location: Singapore (UTC+8)` and `Status: Open to opportunities` from `SITE.availability`, hidden when `open` is false.
  - Keep at most one purely conventional cell.
- **Command:** `/impeccable polish`

**[P1] The boilerplate copyright line duplicates the block and breaks its voice**
- **Why it matters:** `© 2026 FirstName LastName. Designed and built by me.` (`:36-38`) repeats "Drawn by" and the year. Its casual first person clashes with the drafting register, and on mobile it leaves "me." stranded on its own line.
- **Fix:** delete the line and move © into the block (a "©" or "Rights" cell). If you want a colophon, add a specific "Notes" cell instead, e.g. "Set in Chakra Petch and IBM Plex Sans. Built with React and Vite.", plus a source link if the repo is public.
- **Command:** `/impeccable distill`

**[P2] No semantic pairing of label and value**
- **Why it matters:** a screen reader reads one run-on string: "Drawn by FirstName LastName Title Portfolio Revision 2026 Scale 1:1 Sheet 1 of 1".
- **Fix:** at `:19-27`, render the cells as a `<dl>`, each cell a `<div>` holding `<dt>` and `<dd>`. The grid is unaffected. Make any purely ornamental cell `aria-hidden`.
- **Command:** `/impeccable audit`

**[P2] The block's hierarchy is flat**
- **Why it matters:** real title blocks emphasise the drawing title and the drafter. Here nothing does, so the page ends without a focal point.
- **Fix:** at `:24-25`:
  - **Labels:** Chakra Petch `text-[0.6875rem] uppercase tracking-wider text-faint`, closer to drafting lettering and still 6.75:1.
  - **Name and title cells:** `text-lg` or `text-xl`.
  - **Secondary cells:** `text-muted`.
- **Command:** `/impeccable typeset`

**[P3] Back-to-top details**
- **Missing press feedback:** add `PRESS` from `ui.tsx` (`:30`).
- **Probable scroll overshoot:** `#top` is a `section[id]`, so the negative `scroll-margin-top` in `index.css:64-71` (`-1rem`, or `-3rem` at lg) applies. Back to top therefore lands 16–48px *past* the page top (unverified live). Give `#top` `scroll-margin-top: 0`, or target `#main`/`body`.
- **Possible focus-ring overlap:** the global `outline-offset: 3px` ring on a cell flush against grid rules may overlap neighbouring borders (unverified). Consider `focus-visible:outline-offset-[-2px]`.
- **Command:** `/impeccable polish`

### Persona red flags
- **Jordan:**
  - "Scale 1:1", "Sheet 1 of 1" and "Revision 2026" read as cryptic.
  - Without drafting knowledge the joke doesn't land, and the cells look like broken metadata.
  - Nothing identifies it as a title block.
- **Casey:**
  - 421px of mostly filler at the end of a long scroll.
  - The 52px full-width Back to top is the one useful thing there.
- **Sam:**
  - No `<dl>` pairing, and the filler is announced.
  - The good parts: the icon is `aria-hidden`, the link text is clear, and reduced motion turns off smooth scroll (`index.css:224-227`).

### Minor observations
- The footer's `border-t border-line` (`:16`) is 1.85:1, deliberately faint, on top of Contact's own `border-t`. Separation comes mostly from padding, so the block floats a little; a heavier rule would anchor it.
- A real title block sits bottom-right on a sheet. At `lg` this one is a full-width strip, which reads more like a table.
- `html` uses `scroll-behavior: smooth`, correctly disabled under reduced motion.

### Questions to consider
1. If every value in the block became "—", would any visitor lose information? What would it take for each cell to be worth reading?
2. Should the block sit bottom-right at a drawing-standard proportion, with the drafting grid running to the sheet edge, so the page visibly ends as a finished drawing?
3. Contact is the emotional peak. Should the last cell be a "Status: Open to opportunities · reply within 48 h" stamp, restating the invitation as the final word, instead of "Back to top" pulling the visitor away from it?

---

## 8. Shared UI primitives and icons — `src/components/ui.tsx`, `src/components/Icons.tsx`

Reviewed as a design system: the vocabulary every section speaks. `ui.tsx` exports `PRESS`, `BUTTON_PRIMARY`, `BUTTON_SECONDARY`, `TEXT_LINK`, `SectionHeading` and `ExternalLink`. `Tags` is *not* shared; it lives privately in `ProjectWriteup.tsx:150-167`.

### Design specificity verdict
**The tokens are specific; the components mostly aren't.**
- **What carries the blueprint idea:**
  - The `@theme` names (`canvas`, `line`, `ink`, `cyan` "for dimension marks").
  - The `drafting-grid` utility.
  - Three named easing curves with written usage rules: `--ease-out` `(.23,1,.32,1)`, `--ease-expo`, `--ease-in-out`.
  - `SectionHeading`'s leader line ending in a rotated copper datum mark (`h-2 w-2 rotate-45 border border-copper`).
- **What's generic:**
  - `BUTTON_PRIMARY` is a stock filled CTA: `rounded-sm px-6 bg-copper text-canvas hover:bg-copper-strong`.
  - `TEXT_LINK` is a stock underline.
- **The strongest drafting devices aren't shared.** `DimensionLine` and `Arrowhead` are private to `Hero.tsx:7,35`.
- **The one shared device disappears on phones.** The heading leader is `hidden … md:flex` (`ui.tsx:31`), measured `display:none` at 375px, so every mobile section heading is plain 36px uppercase Chakra Petch.

**Deterministic scan:**
- CLI came back clean for both files (`[]`, exit 0).
- The browser overlay found **0 findings on any primitive or icon**. Only the page-level straggler and grid findings appeared.
- The detector doesn't check cross-component consistency, so the inventory and measurements below did the real work here. Both assessments produced matching inventories independently.

### Usage and consistency inventory
| Export | Used at | Bypassed or forked by |
|---|---|---|
| `BUTTON_PRIMARY` | `Hero.tsx:123`; `Contact.tsx:179` with `min-h-12 px-8` appended | Two sizes (44 and 48px), neither a declared variant. The override depends on Tailwind's source order. |
| `BUTTON_SECONDARY` | `Hero.tsx:126`, `About.tsx:25` | `Navbar.tsx:84` desktop résumé: `h-9 rounded-[10px] border border-line-strong px-4`, **36px tall**, border **2.98:1**. `Navbar.tsx:148` mobile résumé: `min-h-12 rounded-xl`, no hover. |
| `TEXT_LINK` | `Contact.tsx:105` (on a `<button>`); default inside `ExternalLink` (`ui.tsx:43`) | Copied inline at `Projects.tsx:47-48` with `group-hover:`. `Contact.tsx:187/196` mailto links use `underline-offset-4` vs the token's `underline-offset-[5px]`. |
| `PRESS` | `BUTTON_BASE`; `Navbar.tsx:72, 84, 111, 148`; `ProjectDialog.tsx:95, 128, 140`; `Testimonials.tsx:7`; `Contact.tsx:31` | Not used on: the Experience `+` (`Experience.tsx:64`, hand-rolled `transition-[rotate,…] duration-200`), Footer back to top, social rows, or `TEXT_LINK` itself. |
| `SectionHeading` | About :13, Contact :86, Experience :16, Projects :73, Testimonials :52 (`aside`) | Consistent. `mb-12 lg:mb-16` is fixed and can't be configured. |
| `ExternalLink` | **Only** `Experience.tsx:97` | Bypassed by `About.tsx:25` (FileText icon, no arrow), `Navbar.tsx:82` and `:145` (no icon), `Contact.tsx:239-248` (ArrowUpRight 18). Each writes its own `target`/`rel`/sr-only text. |
| Icons | 11 of 13 used | **`ArrowDown` and `Play` are dead code.** |

**Primitives reinvented locally that should be shared:**
- `Tags`/`TAG` (`ProjectWriteup.tsx:150`: `rounded-sm bg-surface-2 px-2.5 py-1 text-[0.8rem] text-muted`).
- `ARROW` (`Testimonials.tsx:7`: `h-11 w-11 rounded-full border`).
- `INPUT`/`LABEL`/`DETAIL` (`Contact.tsx:10-14`).
- Callout panels (`Contact.tsx:97, :260`: `rounded-sm border border-line bg-surface p-6/p-8`).
- The project date badge (`Projects.tsx:18`: `rounded-md bg-canvas`).
- The dialog prev/next class, duplicated at `ProjectDialog.tsx:128` and `:140`.
- `DimensionLine`/`Arrowhead` (`Hero.tsx`).

**One-off controls:**

| Control | Source | Classes |
|---|---|---|
| CopyEmail chip | `Contact.tsx:31` | `h-10 rounded-full` |
| Logo and nav links | `Navbar.tsx:62, :72` | `h-9 rounded-[10px]` |
| Mobile menu toggle | `Navbar.tsx:111` | `h-11 rounded-xl` |
| Dialog close | `ProjectDialog.tsx:95` | `h-11 w-11 rounded-full` |
| Experience indicator (aria-hidden) | `Experience.tsx:64` | `h-10 w-10 rounded-full` |
| Footer back to top | `Footer.tsx:30` | `px-6 py-3` |
| Social rows | `Contact.tsx:241` | `min-h-14` |

**Control radii in use: six** (`rounded-sm` 4px, `rounded-md`, `rounded-[10px]`, `rounded-xl`, `rounded-2xl` on the nav shell and dialog, and `rounded-full`).
**Control heights: five** (`h-9`, `h-10`, `h-11`, `min-h-12`, `min-h-14`).

**Icon wrapper (`Icons.tsx`):**
- One `Svg`: 24×24 viewBox, `fill="none"`, `stroke="currentColor"`, `strokeWidth={1.75}`, round caps and joins, `aria-hidden="true"`, `focusable="false"`, default size 16.
- `Check` sets `pathLength={1}` for the draw-on animation.
- Sizes in use: **15, 16, 18, 20, 22, 24.**

| Icon | Used at (size) |
|---|---|
| ArrowUpRight | `ui.tsx:47` (15), `Projects.tsx:50` (15), `Contact.tsx:248` (18) |
| ArrowUp | Footer :32 (16) |
| ChevronLeft/Right | ProjectDialog :130/143 (18), Testimonials :58/62 (20) |
| Plus | Experience :71 (18) |
| Close / Menu | Navbar :113 (18); Close at ProjectDialog :97 (20) |
| Copy / Check | Contact :33 (16); Check at Contact :99 (24) |
| FileText | About :26 (18) |
| ImageIcon | ProjectWriteup :28 (22) |
| ArrowDown, Play | unused |

### Measurements (desktop, DPR 1.4)
| Control | Size | Font | Text contrast | Border contrast |
|---|---|---|---|---|
| PRIMARY "View projects" | 143.9×44 | 15.2px | 5.80 | — |
| PRIMARY "Send message" | 168.3×48 | 15.2px | 5.80 | — |
| SECONDARY "Get in touch" / "View résumé" | 136–166×44 | 15.2px | 14.42 | 3.43 |
| ExternalLink "Visit …" ×3 | 203–422 × **27.2** | 17px | 5.80 | — |
| Card "View details" (TEXT_LINK copy) | aria-hidden | 17px | 4.91 | — |
| Tags | h 28.5 | **12.8px** | 7.12 | fill vs card **1.16** |
| Navbar résumé (one-off) | 90.5×**36** | 15.2px | 12.53 | **2.98** |
| Navbar links / logo | 45–120 × **36** | 14–15.2px | 5.04–8.47 | — |
| CopyEmail chip | 83.5×**40** | 14px | 9.75 | 3.43 |
| Dialog close / prev / next | 44×44, 103×44, 78×44 | 14px | 8.25 | — |
| Footer back to top | 160.7×69.9 | 17px | 9.75 | — |
| Social rows | 367.6×56 | 17px | 14.42 | — |

- **Under 44px:**
  - Navbar links and résumé (36px).
  - CopyEmail (40px).
  - Standalone ExternalLink (27.2px).
  - Card title buttons (230×30) don't count, because their `after:inset-0` makes the whole card clickable.
- **Non-text contrast under 3:1:** the navbar résumé border (2.98). Tag text passes at 7.12, so the 1.16 tag fill is decorative only.
- **Focus:**
  - The global `:focus-visible` (`index.css:91`) is a 2px copper outline offset 3px, confirmed on PRIMARY, SECONDARY and ExternalLink.
  - Project cards use `focus-visible:outline-none` on the button, plus a `has-[button:focus-visible]:ring-2` box-shadow ring on the `<article>`. The article's border stayed `rgb(36,80,127)`, not copper.
  - **The Contact email `<a>` (`Contact.tsx:213`) computed an *ink* outline, not copper.** That's an override somewhere that wasn't traced.
- **Icon alignment:** within about 0.4px of the text centre everywhere (+0.35 to +0.38px low on ExternalLink, socials, CopyEmail, back to top). All icons are aria-hidden with a 1.75px stroke at render.
- **Easing mismatch:** `TEXT_LINK` and the nav logo use `transition-colors`, which compiles to Tailwind's default `cubic-bezier(0.4,0,0.2,1)` rather than the project's `--ease-out` token. In the nav, two different curves sit side by side.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | `PRESS` gives tactile feedback, and Copy → Check uses `aria-live`. There's no shared busy state: submit just changes its text to "Sending…" with `disabled:opacity-60`. |
| 2 | Match system / real world | 2 | The drafting metaphor lives in the tokens but not in the components. `ArrowUpRight` means "external" in `ExternalLink` but "opens a dialog" on 15 project cards. |
| 3 | User control and freedom | n/a | Primitives don't own navigation or undo. |
| 4 | Consistency and standards | 1 | Six control radii, five heights, `TEXT_LINK` copy-pasted, four new-tab links bypass `ExternalLink`, three disabled styles (`opacity-60`, `opacity-35 pointer-events-none`, `invisible`). |
| 5 | Error prevention | n/a | Not applicable to primitives. |
| 6 | Recognition rather than recall | 3 | Icons almost always sit beside text labels. Disabled arrows stay visible, so they still show what's possible. |
| 7 | Flexibility and efficiency | 2 | Variants are made by string concatenation that relies on CSS source order. No size, icon-only or ghost variants. |
| 8 | Aesthetic and minimalist | 3 | Restrained, coherent palette. Two dead icons. |
| 9 | Error recovery | n/a | No error primitive. The one error message uses raw `text-[#ffb59e]` (`Contact.tsx:185`). |
| 10 | Help and documentation | 2 | Good JSDoc on `PRESS`, `ExternalLink` and `useInView`. No DESIGN.md, and no rule for when to use filled vs bordered vs pill. |
| | **Total** | **16/28** (7 scored) | **57%: Acceptable** |

### What's working
1. **Motion tokens are properly designed.**
   - Three named curves, each with a rule for when to use it.
   - Reduced motion trims transitions to `color, background-color, border-color, text-decoration-color, opacity`, and turns animations into fades rather than removing them.
   - `PRESS` scales to 0.97 over 150ms, which is the right amount of give.
2. **The icon set is coherent and accessible by default.**
   - One wrapper sets the grid, stroke, caps and `aria-hidden`/`focusable=false`.
   - All 47 rendered SVGs are aria-hidden.
   - Every icon-bearing control has an accessible name.
   - Icons align optically with their text to within 0.4px.
3. **Focus and contrast hold up.**
   - The copper ring offset 3px stays visible even on the copper button.
   - Canvas text on copper is 5.80:1, on copper-strong 7.63:1. Muted on surface-2 is 7.12:1. `line-strong` borders are 3.43:1.
   - Every token-built button measures at least 44px.

### Priority issues

**[P1] The new-tab cue is applied inconsistently**
- **Why it matters:**
  - `ExternalLink` is used once.
  - Four other new-tab links re-implement it with three different cues: no arrow, a file icon, or an 18px arrow.
  - Meanwhile 15 project cards use the same `ArrowUpRight` for an in-page dialog.
  - The site's one learned "this leaves the page" signal is therefore wrong on every card and missing on the résumé links.
- **Fix:**
  - Make `ExternalLink` polymorphic: pass `className`, add an `icon` prop (default `ArrowUpRight`), and a `pdf` flag that sets the sr-only text to "(PDF, opens in a new tab)".
  - Use it at `About.tsx:25`, `Navbar.tsx:82/:145` and `Contact.tsx:239`.
  - Give cards a dialog-specific glyph: a new `Expand` icon or `ChevronRight` (`Projects.tsx:50`).
- **Command:** `/impeccable extract`, then `/impeccable clarify`

**[P1] Button tokens are strings, not a sized variant system, so the Navbar and Contact fork them**
- **Why it matters:**
  - There are two primary sizes and three secondary forms (4px/44px, 10px/36px, 12px/48px).
  - Overrides depend on Tailwind's source order, not a declared API.
  - The forked nav pills measure 36px tall, and the forked résumé border is 2.98:1.
- **Fix:**
  - Export `button({ variant: 'primary'|'secondary'|'ghost'|'icon', size: 'sm'|'md'|'lg' })` from `ui.tsx:8-11`.
  - Fold in `ARROW` as `icon`, dialog prev/next as `ghost`, and `Navbar.tsx:84` as `secondary sm`.
  - Pick **one control radius**: `rounded-sm` suits a drafted sheet. Drop `rounded-[10px]`, `rounded-xl` and `rounded-full` on controls.
- **Command:** `/impeccable extract`

**[P2] The blueprint vocabulary isn't in the primitive set, and it vanishes on mobile**
- **Why it matters:** only `SectionHeading` carries a drafting device, and it's hidden below `md`. Sections reinvent callout panels, cyan annotation labels (`DETAIL`), 12.8px filled tags and date badges in generic rounded forms, while projects, nav and dialog use rounded-xl/2xl panels.
- **Fix:**
  - At `ui.tsx:31`, keep a short leader plus datum under `md` (`flex basis-full md:basis-auto`, or put the datum before the heading).
  - Move `DimensionLine`/`Arrowhead` into `ui.tsx`.
  - Add three primitives:
    - `Callout`: a title-block panel.
    - `Label`: a cyan annotation.
    - `Tag`: a dimension-tag style, e.g. `border border-line-strong` plus a cyan leader tick, instead of a filled pill. This also lifts the tag text from 12.8px.
- **Command:** `/impeccable bolder` (vocabulary), `/impeccable adapt` (mobile)

**[P2] Interaction states are inconsistent across controls**
- **Why it matters:**
  - `TEXT_LINK` and the social rows have no press state and run on the default easing curve.
  - The mobile résumé link and dialog prev/next (`hover:text-ink` only) don't use copper on hover like every other control.
  - Disabled looks three different ways.
  - The error colour `#ffb59e` is hard-coded, and there are no danger or success tokens.
  - A standalone `ExternalLink` is a 27px target.
  - The email link's focus outline renders ink instead of copper.
- **Fix:**
  - At `ui.tsx:14`, use `transition-[color,text-decoration-color] duration-150 ease-out` plus `${PRESS}`.
  - Add `--color-danger: #ffb59e` (and a success colour) to `@theme` (`index.css:~23`).
  - Standardise disabled as `disabled:opacity-40 disabled:cursor-not-allowed`, keeping `invisible` only where the layout must hold.
  - Give a standalone `ExternalLink` `min-h-11` (`Experience.tsx:97`).
  - Trace and remove the outline-colour override on `Contact.tsx:213`.
- **Command:** `/impeccable harden`, then `/impeccable polish`

**[P3] Icon hygiene**
- **Why it matters:**
  - `ArrowDown` (`Icons.tsx:30-39`) and `Play` (`:89-93`) are dead code.
  - Six ad-hoc sizes make the 1.75 stroke render at about 1.1–1.75px. On a drawing that depends on consistent line weights, that's a slip.
  - The × is drawn two ways: `Close`, and `Plus` rotated 45° in Experience.
- **Fix:** add `vectorEffect="non-scaling-stroke"` with a fixed 1.5px stroke at `Icons.tsx:5`, or limit `size` to `16 | 20 | 24`, and delete the dead icons.
- **Command:** `/impeccable distill`

### Persona red flags
- **Jordan:**
  - "View details ↗" reads as "this leaves the site".
  - The nav "Résumé" pill and "View résumé" button look like different kinds of control.
  - On cards, the underlined "View details" is aria-hidden decoration styled exactly like a link.
- **Casey:**
  - The heading leader and datum vanish at 375px.
  - Tags render at 12.8px.
  - Standalone ExternalLink is 27px tall, and the Copy pill is 40px.
  - The menu toggle is `rounded-xl` next to 4px CTAs.
- **Sam:**
  - Good: aria-hidden icons, sr-only new-tab text, a visible copper ring, and focusable-but-disabled testimonial arrows.
  - Risks:
    - Card focus relies on `:has()`, so there's no ring where it's unsupported.
    - Every card's tag list is labelled "Tools and processes", giving 15 identical labels.
    - The email link's ink focus ring.
    - `border-line` (1.85:1) is the only edge on some panels.

### Minor observations
- The type scale uses arbitrary rems (`0.8rem`, `0.92rem`, `0.95rem`) rather than tokens.
- `CONTAINER` lives in `utils.ts` while the visual tokens live in `ui.tsx`, so the layout and visual systems are split across files.
- `SectionHeading` puts the `id` on the `h2` but the `inView` ref on a sibling leader. That's fine, but the bottom margin can't be configured.
- Measurement note: the dialog briefly measured at `scale(0.97)` (entry animation paused in the hidden pane), so its 44px controls read 42.7px. `offsetWidth` confirms 44.

### Questions to consider
1. If this is an engineering drawing, why are the buttons the most generic thing on the sheet? What would a title-block or revision-stamp CTA look like?
2. Should "cyan = annotation, copper = action" become a hard rule in the primitives, so a `Label` can never be copper and a control can never be cyan?
3. On a 375px sheet, which drafting device do you refuse to lose: the leader, the datum mark, or the grid?

---

## 9. Page layout — `src/App.tsx`, `src/index.css`, `CONTAINER` in `src/lib/utils.ts`

The page as a whole: macro rhythm, alignment, spacing system, background layers, landmarks and responsive structure. The individual sections are covered in §1–7.

### Design specificity verdict
**An authored skin on a generic stacked-sections template.**
- **What's authored:** the blueprint language is real and specific: the drafting grid, the dimension line under the name, a leader to a copper datum on every heading, and the footer drawn as a title block.
- **What's generic:** the structure underneath is the standard portfolio stack (Hero → About → Experience → Projects → Testimonials → Contact → Footer).
- **Every section is assembled identically:** `border-t border-line py-24 lg:py-32` + `CONTAINER` + `SectionHeading` + body.
  - The page never changes structure to match what its content is doing.
  - The drawing-sheet idea reaches the *structure* only in the footer. There are no sheet zones, no section numbering, and no change of grid.

**Deterministic scan:**
- **CLI:**
  - `App.tsx` and `index.html` came back clean.
  - The whole `src/` tree (22 files) has **1** finding: `codex-grid-background` at `src/index.css:38`, in `@utility drafting-grid`, advisory.
  - This corrects round 1's note: the directory scan *does* see the `@utility`; only per-`.tsx` scans miss it.
- **Browser runs:**

  | Run | Findings | What they were |
  |---|---|---|
  | Default | 2 | Contact "hours." straggler; grid on `body` |
  | `?data=worst` | 4 | About "tolerancing." straggler (4 lines, 22%); Experience `line-length` ≈89ch in `#experience-panel-0 … max-w-[68ch] > p.mb-5`; Contact "trials." straggler; grid |
  | `?data=empty` | 1 | Grid |
  | Mobile 375 | 4 | About "attention." straggler (7 lines); Projects card subtitle "Painters" (`p.mt-1.5.line-clamp-2`); Footer "me." (7%); grid |

  None of these are structural layout issues. The console printed details for only 1 of the 2 default findings; the scan API returned both.
- **The detector can't judge rhythm, peak or alignment-to-grid.** The design review and the measurements below cover that, and the two assessments agree on every measured value.

### Measured rhythm
Container: `mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-16` (1408 max, so 1280 content).

| Section | Padding (lg / below) | Height 1440 | Height 375 | Height 768 | Share 1440 / 375 | Left edge 1440 / 1920 / 375 |
|---|---|---|---|---|---|---|
| Hero `#top` | 0 (inner `pt-28 pb-14`/`sm:pb-16`), `min-h-[100svh]` | 900 | 812 | 1024 | 10.7% / 5.3% | 75 / 315 / 20 |
| About | 128 / 96 | 844 | 1,589 | 1,157 | 10.1% / 10.4% | 75 / 315 / 20 |
| Experience | 128 / 96 | 1,166 | 1,285 | 1,040 | 13.9% / 8.4% | 75 (**`ol` 83**) / 315 (`ol` 323) / 20 |
| Projects | 128 / 96 | **3,556** | **8,806** | 5,073 | **42.4% / 57.4%** | 75 / 315 / 20 |
| Testimonials | 128 / 96 | 710 | 748 | 635 | 8.5% / 4.9% | 75 / 315 / 20 |
| Contact | 128 / 96 | 1,004 | 1,682 | 1,498 | 12.0% / 11.0% | 75 / 315 / 20 |
| Footer | 48 | 207 | 421 | 278 | 2.5% | 75 / 315 / 20 |
| **Page** | | **8,387 = 9.3 screens** | **15,342 = 18.9 screens** | 10,705 = 10.5 | | |

Other widths: 1920 is 8,567px (7.9 screens), 1024 is 8,251px (10.7). The fixture pages are worst 8,142, empty ≈2,004–2,114, and one 5,137.

**Type hierarchy, h1 vs h2:**

| Width | h1 | h2 | Ratio |
|---|---|---|---|
| 1440 | 128.7px | 72px | 1.8× |
| 1920 | 136px | 72px | 1.9× |
| 768 | 68px | 45px | 1.5× |
| 375 | **38.4px** | **36px** | **1.07×** |

**Headers and anchor landing:**
- Desktop has a fixed pill header (`top-5`, 49–50px tall, bottom edge at about 69px). Mobile has a 65px fixed bar.
- `section[id]` uses `scroll-margin-top: -1rem`, or `-3rem` at 64rem and up (`index.css:64-70`). That's deliberate, and it lands **every h2 top at 81px**: 12px under the pill on desktop and 16px under the bar on mobile. Consistent, but tight.
- `html` uses `scroll-behavior: smooth` (`auto` under reduced motion, `index.css:226`) and `scrollbar-gutter: stable`.

**Drafting grid layers:** two.
1. `App.tsx:18`: `fixed inset-0 -z-10`, aria-hidden.
2. `Hero.tsx:104`: `absolute inset-0` inside `#top`, above a `bg-canvas` div.

Both use 4 linear-gradients (major `rgba(157,212,245,.09)` at 120px, minor `.035` at 24px), `background-position: 0 0`, and no mask.
- **They drift out of phase.** The hero layer scrolls and the page layer is fixed, so at the hero/About seam their lines are offset by `scrollY mod 24` px.
- **The content edge never sits on a grid line.** At 1440 the edge is x=75 (mod 24 = 3). At 1024 it's x=64 (mod 24 = 16, mod 120 = 64).

**Landmarks:**
- Present: 2 `header`s (desktop and mobile; one displayed at a time), 2 `nav` "Primary", `main#main`, `footer`, and 6 named sections ("Introduction", plus `aria-labelledby` headings).
- The skip link "Skip to content" goes to `#main`, which has no `tabindex`. Its first child is the hero, so at page top it only skips the nav.
- **Extra landmarks:**
  - Experience adds 3 `role="region"` panels whose names are the run-together header text (`Experience.tsx:79`).
  - The dev "Screen size" and "Test data" `nav`s render in the hero; dev-only if they're gated.
- **Only one h1, and it reads "FirstNameLastName"** (see §1).

**Overflow:** none at page level at 375, 768 or desktop. The only flagged elements are the sr-only skip link (a false positive) and content inside the clipped hero image and testimonial track.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | The nav marks the active section and leaders draw in on scroll. There's no sense of progress through a page 9–19 screens tall. |
| 2 | Match system / real world | 4 | The engineering-drawing metaphor fits the audience, and labels are plain. |
| 3 | User control and freedom | 3 | Anchors, back to top and a skip link. On mobile there's no way past the ~11-screen Projects block except the menu. |
| 4 | Consistency and standards | 3 | One alignment axis, but overly uniform. One break: the Experience `ol` sits 8px right (`lg:ml-2`, `Experience.tsx:18`). |
| 5 | Error prevention | 2 | With `?data=empty`, the hero's "View projects" (`Hero.tsx:123`) still links to a `#projects` that doesn't exist. The nav collapses to `#top, #contact, #contact`, two links to one target. |
| 6 | Recognition rather than recall | 3 | The persistent nav covers this. |
| 7 | Flexibility and efficiency | 2 | No shortcut through 15 equal-weight cards: no featured tier, filter or "skip past". |
| 8 | Aesthetic and minimalist | 3 | Restrained palette and strong type. Projects is 42–57% of the page at one weight. |
| 9 | Error recovery | n/a | Page layout has no error states. |
| 10 | Help and documentation | n/a | A portfolio needs none. |
| | **Total** | **23/32** | **72%: Good** |

### Cognitive load
- **No chunking where it matters most.** Projects is the largest block and has no hierarchy inside it.
- **Every section has the same entrance:** a rule, a 128px gap, a huge uppercase h2 and a leader, six times over. Nothing tells the reader what *kind* of section comes next.
- **No sense of progress** through 18.9 mobile screens, with Projects alone about 10.8.

### Emotional journey
- **The arc:** high (hero), then plateau (About, Experience), then a long flat stretch (Projects), then a fade (Testimonials, 8.5%), then solid (Contact), then a clever close (the title block).
- **Projects should be the peak** and instead reads as a long run of identical cards. Fatigue sets in around cards 6–9, especially on mobile.
- **There is no designed second peak.**

### What's working
1. **One alignment axis everywhere.** `CONTAINER` (`utils.ts:57`) puts every heading and body on exactly the same left edge at every width (20 / 32 / 64–75 / 315), with no page-level horizontal overflow.
2. **Deliberate anchor landing.** The negative `scroll-margin-top` puts every h2 at the same 81px at every breakpoint.
3. **The footer title block carries the metaphor in the structure itself.** `scrollbar-gutter: stable` prevents layout jumps.

### Priority issues

**[P1] No macro peak; Projects is a structureless plateau**
- **Why it matters:** Projects is 42% of the desktop page and 57% of mobile. Fifteen equal cards at the same weight as everything else dilute the best work by sheer volume.
- **Fix:**
  - Add a featured tier in `Projects.tsx:71+`: 2–3 projects as full-width or 2-column "sheets", then the rest in a denser grid or behind "Show all 15". Cap the initial list on mobile.
  - Give Projects its own section spacing or a full-bleed band so it reads as the main event.
  - This matches §4 P1.
- **Command:** `/impeccable layout`, then `/impeccable bolder`

**[P1] The hero hierarchy collapses on mobile: h1 38.4px vs h2 36px**
- **Why it matters:** on phones the page's peak disappears, and the name reads like just another section heading.
- **Fix:**
  - Raise the clamp minimum at `Hero.tsx:108`, e.g. `clamp(3rem, min(13vw,15svh), 8.5rem)`. Re-test long names with `overflow-wrap:anywhere`.
  - Lower the h2 minimum at `ui.tsx:23`, e.g. `clamp(1.875rem,6vw,4.5rem)`.
  - Target a ratio of at least 1.4× on mobile.
- **Command:** `/impeccable typeset`

**[P2] Metronome rhythm from a two-value spacing scale**
- **Why it matters:** `py-24 lg:py-32` on six sections (`About.tsx:11`, `Experience.tsx:14`, `Projects.tsx:71`, `Testimonials.tsx:50`, `Contact.tsx:84`), plus 48px on the footer (`Footer.tsx:16`), gives every transition the same beat. It also overweights thin sections: with `?data=one`, About's 256px of padding is about 42% of its 603px height.
- **Fix:**
  - Add spacing tokens to `@theme`: `--space-section`, `--space-section-tight` and `--space-section-feature`.
  - Tighten About and Testimonials, and open up Projects.
  - Consider merging Testimonials into the Contact band.
- **Command:** `/impeccable layout`

**[P2] The drafting grid is wallpaper, not structure**
- **Why it matters:** on a blueprint page, a grid that doesn't register with the drawing undercuts the whole concept.
  - The content edge never lands on a grid line.
  - The hero's scrolling grid drifts against the fixed page grid at the hero/About seam.
- **Fix:**
  - Remove the hero layer (`Hero.tsx:104`) and let the fixed grid show through, keeping the photo gradients. Or make the page grid `absolute` and full-height so both scroll together.
  - Register the grid to the content edge, either way:
    - Set `background-position` in the `drafting-grid` utility (`index.css:38`) so a 120px major line falls on the content edge, e.g. `calc(max(var(--gutter), (100vw - 88rem)/2 + 4rem))`.
    - Or snap the gutters to multiples of 24 (`px-6 sm:px-12 lg:px-[72px]`).
- **Command:** `/impeccable polish`

**[P2] Empty and sparse data break the composition**
- **What happens:**
  - With `?data=empty`, the hero's "View projects" is a dead link and the nav has duplicate targets.
  - With `?data=one`, a lone card sits in a 3-column grid and a lone testimonial in a 1,280px track.
- **Fix:**
  - Render the hero's projects CTA only when projects exist.
  - Derive the column count from the item count (`Math.min(n, 3)`, or a featured layout when `n === 1`) in Projects and Testimonials.
  - De-duplicate nav targets.
- **Command:** `/impeccable harden`

### Persona red flags
- **Jordan:**
  - The visit has to succeed on the first screen, which holds a name, a role and two buttons.
  - There's no proof: no highlighted project, employer or years of experience.
  - The best evidence is 3,000+px down among 14 peers.
- **Casey:**
  - 18.9 screens, with Projects about 10.8 of them.
  - The name is barely bigger than the section headings.
  - The only way to skip Projects is to reopen the menu.
- **Sam:**
  - Three extra `region` landmarks with run-together names.
  - The skip link effectively lands at the top of the page.
  - Two `nav "Primary"` elements, one hidden at each width, which is acceptable.

### Minor observations
- The Experience `ol` `lg:ml-2` 8px axis break could move the timeline rail into the gutter and keep the text on the axis.
- At 1440, the 12px gap between the pill and the h2 cap height is tight for 72px headings; `-2.5rem` would give more room.
- At 1920, the 315px side margins are empty grid. A sheet border at the container edge could use them.
- The reduced-motion fade overrides at `index.css:234-241` target `.hero-line` and `.hero-dimension`, but the animated elements are `.hero-line > span`, `.hero-dim`, `.hero-value` and `.hero-ext`. Harmless, since those only animate under `no-preference`, but stale.
- The hero is correctly the only section without a top rule. That leaves the grid mismatch at the hero/About seam with no rule to hide it.
- Desktop measurements by the detector pass were at a 1,014px pane, just under `lg` (1024). The design review re-measured at 1440 and 1920; their figures above take precedence.

### Questions to consider
1. If this is a drawing set, why isn't each section a numbered sheet, with its own title-block strip, revision mark or zone letters, instead of six identical headings?
2. Would the page be stronger with 5 projects shown and 10 behind a link? Which 3 would you put in the hero?
3. Should the drafting grid hold the layout together, with content snapped to the 24/120px lines, rather than sit behind it as wallpaper?

---

## 10. Navbar — `src/components/Navbar.tsx`

> **Method note:** the browser pane was hidden, so `requestAnimationFrame` didn't fire and the live `aria-current` and scroll transforms wouldn't update. The design review therefore re-ran the hook's own scroll-spy algorithm (`utils.ts:115-146`) at 30 scroll positions, and confirmed it once with a fronted screenshot: "Projects" filled copper at scrollY 2954. Tested at 1024×768, 640×800 and 375×812, each with demo, `worst` and `empty` data.

### Design specificity verdict
**A generic floating glass pill with brand colour; not authored.**
- **The structure is the stock SaaS/portfolio pattern:** a centred `fixed left-1/2 top-5` pill, `rounded-2xl`, `bg-surface/85 backdrop-blur-xl`, and a filled active tab. Swap the tokens and it's anyone's site.
- **Brand shows only in tokens:** Chakra Petch labels, copper initials, the copper active fill.
- **No blueprint language reaches the chrome:** no dimension marks, no sheet index or numbering, no grid ticks. **Cyan appears nowhere in the navbar.**
- **The craft is real but isn't identity:** the nested radius maths (`rounded-[10px]` = 16 − 6 padding, commented at `Navbar.tsx:54-55`).
- **The mobile menu is a plain ruled list** with a full-width outlined button.

**Deterministic scan:**
- **No findings on the navbar in any state.**
  - CLI `detect --json src/components/Navbar.tsx` came back clean (`[]`, exit 0).
  - The browser runs found **0 findings** in the header or nav at desktop (menu closed) and at 375px with the menu closed and open (`aria-expanded=true` confirmed). Everything flagged was page-level.
- **Measurements:**
  - **Desktop pill:**
    - `fixed`, z 50, `top: 20px`, 659×49 at x=178.
    - `#0f3060` at **α 0.85** with **`blur(24px)`**, a 1px `#24507f` border, 16px radius and 6px padding. The effective colour over the canvas is about `rgb(14,46,92)`.
    - When scrolled it moves to `translate(-50%, -8px)`.
  - **Desktop links:** all **36px tall**.

    | Link | Width | Contrast on the pill | Contrast in the worst case (white behind the 15% transparency) |
    |---|---|---|---|
    | "FL" (14px/700 copper, sr-only "FirstName LastName, back to top") | 44.6px | 5.04 | 3.14 |
    | Section links (15.2px/500 muted) | 74–120px | 8.47 | 5.27 |
    | Résumé (ink; name "Résumé (PDF, opens in a new tab)") | 90.5px | 12.53 | 7.8 |

    Active is `aria-current="location"`, canvas on copper, **5.8:1**. Hover is 10.53.
  - **Mobile bar:**
    - `fixed`, 65px, with `env(safe-area-inset-top)` padding.
    - Fully transparent at the top of the page; once scrolled or opened it becomes canvas α 0.9 with `blur(24px)`.
    - **Logo 19×44.** Menu button 95×44, labelled by its visible text ("Menu"/"Close"), icon aria-hidden, with correct `aria-controls` and `aria-expanded`.
  - **Open panel:**
    - 375×384, solid canvas.
    - 5 links at 335×56 (20px/700, 14.42:1), plus Résumé at 335×48.
    - Opening moves focus to About, and Esc returns focus to the toggle with a visible ring.
    - **No `inert`, no `role="dialog"`, no scroll lock**, which independently confirms P1 below.
- **Measurement artefact:** the detector's own banner covers the mobile top bar and intercepted the first Menu click. It's a tool overlay, not a site bug.

### Heuristic scores
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Scroll-spy was correct at all 30 sampled points (see the correction to X6). A section activates when its top is ≤35% of the viewport. Nothing is active over the hero, and the home mark never shows a current state. |
| 2 | Match system / real world | 3 | Plain labels. "FL" initials as home is a convention, but at 14px copper with no "home" cue it's easy to miss. |
| 3 | User control and freedom | 3 | Esc closes the menu and returns focus to the toggle; outside tap and Close both work. But **any scroll closes the menu** (`once: true`, `Navbar.tsx:35-38`), and after tapping a link focus drops to `BODY`. |
| 4 | Consistency and standards | 3 | Copper means "action" everywhere else but "you are here" in the desktop nav. Desktop active is a copper fill; mobile active is copper text. "Résumé" vs "View résumé (PDF)". |
| 5 | Error prevention | 3 | The HEAD check hides Résumé until the PDF exists (`utils.ts:21-45`), and the menu auto-closes at ≥640px. **At 640–767px Résumé is missing from the nav entirely.** |
| 6 | Recognition rather than recall | 3 | Every destination is labelled. On desktop, "PDF, opens in a new tab" is sr-only, so sighted users get no cue. |
| 7 | Flexibility and efficiency | 3 | Skip link, deep-linkable hashes, logical Tab order (skip, FL, 5 sections, Résumé). |
| 8 | Aesthetic and minimalist | 2 | 7 targets on desktop. The filled copper active pill is the loudest mark in the bar, out-shouting Résumé and competing with the hero CTA. On mobile the Menu button (95×44, filled and bordered) dwarfs the 19px-wide "FL" mark. |
| 9 | Error recovery | n/a | No error states; a missing résumé is handled under #5. |
| 10 | Help and documentation | n/a | Self-evident anchor nav. |
| | **Total** | **23/32** | **72%: Good** |

### Cognitive load
- **More than 4 choices:** desktop has **7 targets** (FL, About, Experience, Projects, Testimonials, Contact, Résumé). Mobile has 6 plus FL.
- **Hierarchy is inverted:** the *location* indicator (canvas on copper, 5.80:1) outranks the one real *action* (Résumé: ink on a `#4f7aa8` outline) and the brand mark.
- **Weak grouping:** Résumé is set apart only by `ml-1` (4px extra) and a border.
- **Empty state:** with `?data=empty`, the phone still shows a full "Menu" button that opens a one-item list. That's disclosure for nothing.
- **Passes:** working memory, and one thing at a time.

### Emotional fit
- **Competent, calm and legible.** At 85% opacity it recedes acceptably, and contrast is excellent.
- **It reads as a template placed over a blueprint.** The page has dimension lines and a drafting grid; the nav reads like a SaaS marketing header.
- **The copper active pill** gives a "tab-bar app" feel rather than an engineer's annotation.

### What's working
1. **Accurate, robust scroll-spy.**
   - It's position-based rather than IntersectionObserver-ratio based, so the 3,326px Projects section registers correctly.
   - A page-bottom fallback guarantees Contact lights up (max scroll 7,483, Contact top 7,019).
2. **Tuned landing offsets.** After a nav jump, section h2s sit about 80px from the top on desktop and mobile, below the scrolled pill (bottom ≈61px) and the 64px phone bar (`index.css:62-71`).
3. **Accessibility and robustness groundwork.**
   - Semantics: `aria-current="location"`, `aria-expanded`/`aria-controls`, and an sr-only full name on the initials.
   - Focus: a copper `:focus-visible` ring (2px, 3px offset) at 5.06:1 against the pill.
   - Preferences: `prefers-reduced-transparency` makes the bar solid, and there's safe-area padding.
   - Contrast: muted links 8.51:1, ink 12.58:1.
   - Robustness: `?data=worst` (initials "AW", a long Polish surname) causes no overflow at 375px.

### Priority issues

**[P1] The mobile menu isn't modal, and it drops focus**
- **Evidence:**
  - With the menu open, `main.inert` is `false`, body overflow stays `visible`, and there's no focus trap. Tab from "View résumé" leaves the panel and moves into page content behind it.
  - Tapping a menu link leaves `document.activeElement = BODY`.
  - Any scroll, even an iOS rubber-band, closes the menu (`Navbar.tsx:35,38`).
- **Why it matters:** keyboard and screen-reader users lose their place, and touch users can lose the menu to an accidental scroll.
- **Fix:**
  - In `Navbar.tsx:22-44`, while the menu is open, set `inert` on `main` and the footer, and lock scroll (`document.documentElement.style.overflow = 'hidden'`) instead of closing on scroll.
  - Wrap Tab within the panel and toggle.
  - On link click (`Navbar.tsx:131`), move focus to the target h2 (`tabIndex={-1}`).
  - Add a scrim, so it's clear that tapping outside is safe.
- **Command:** `/impeccable harden`

**[P1] Generic chrome: the blueprint identity stops at the nav**
- **Evidence:** a centred blurred pill with a filled active tab (`Navbar.tsx:50-58, 72-73`), and no cyan dimension language.
- **Why it matters:** the navbar is the one element on screen at all times, and right now it's the least specific.
- **Fix:** make it a drawing **sheet-index strip** or title block:
  - Square or 2px corners with a hairline `border-line`.
  - Section indices as drafting callouts ("01 About").
  - The active state as a cyan dimension tick or underline leader instead of a copper fill.
  - Copper kept for Résumé only.
  - The same treatment in the mobile list (`Navbar.tsx:126-141`): indexed rows with cyan numerals.
- **Command:** `/impeccable bolder`, then `/impeccable colorize` for the cyan/copper roles

**[P2] Copper is overloaded: location shares the action colour**
- **Evidence:** the active state is `bg-copper text-canvas` (`Navbar.tsx:73`), the same treatment as `BUTTON_PRIMARY` (`ui.tsx:10`). Scrolled, the active "Projects" pill is the heaviest mark in the bar.
- **Why it matters:** it inverts the hierarchy, and the current section reads as a button to press.
- **Fix:** make the active state `text-ink` with a 2px cyan underline or tick, and make Résumé the only copper element. This also resolves the copper-ring-on-copper-pill focus issue.
- **Command:** `/impeccable quieter`

**[P2] Résumé is unreachable from the nav at 640–767px, and its new-tab cue is hidden**
- **Evidence:**
  - The desktop link is `hidden … md:flex` (`Navbar.tsx:84`) and the phone menu is `sm:hidden`.
  - So at 640px the 521px pill has Résumé `display:none`, and it can only be reached from About.
- **Fix:**
  - Show it from `sm` with `px-3` (there's about 120px of room), or use an icon plus "CV" at `sm`.
  - Add a visible ↗ or "PDF" glyph (`Navbar.tsx:86`), ideally via the shared `ExternalLink` (§8 P1).
- **Command:** `/impeccable adapt`

**[P3] Weak mobile home target; the empty-state menu**
- **Evidence:**
  - The phone home mark is **19×44px** (24px with worst-case initials), next to a 95×44 Menu button.
  - With `?data=empty`, Menu opens a single "Contact" item.
- **Fix:** add `min-w-11` to the home link (`Navbar.tsx:101`), and render links inline instead of the toggle when `NAV_ITEMS.length <= 2` (`Navbar.tsx:105-154`).
- **Command:** `/impeccable harden`

### Persona red flags
- **Alex (keyboard / power user):**
  - Focus is lost to `BODY` after activating a mobile link.
  - Tab escapes the open panel.
  - No visible new-tab cue on desktop Résumé.
  - Good: a clean desktop Tab order and a visible ring.
- **Casey (mobile):**
  - The menu closes on any scroll.
  - "FL" is 19px wide.
  - No scrim.
  - The closed bar gives no "where am I" indication.
  - The phone header is transparent until 40px of scroll (`Navbar.tsx:96`), so the copper "FL" over the hero photo relies on the image staying dark.
- **Sam (accessibility):**
  - The page isn't `inert` behind the menu, so the virtual cursor can wander out.
  - Two `nav "Primary"` elements exist, one hidden at each width, which is acceptable.
  - Desktop link height is 36px (`h-9`): fine for a pointer, tight for tremor.

### Minor observations
- The desktop pill nudges up 8px on scroll (`-translate-y-2`, `Navbar.tsx:51`), to little purpose.
- At the top of the hero the pill floats over the large name; at 1024px it overlaps the display-heading region.
- `useActiveSection` calls `getElementById` for every item on every frame. That's fine at 5 items, but the rects could be cached on resize.
- The home mark isn't `aria-current` at the top of the page.
- The panel's `starting:` entry animation (200ms, 8px) has no reduced-motion guard. Low risk.
- The copper focus ring around a copper active pill is distinguishable only through the 3px offset gap.

### Questions to consider
1. If this is an engineering drawing, why isn't the nav its title block (name, discipline, sheet index, revision) instead of a borrowed SaaS pill?
2. Does a single scrolling page need five section links, or would "Work · Contact · Résumé" serve the hiring-manager path better?
3. Should "where am I" be said in cyan dimension language (a measured tick sliding along the bar), so copper can mean one thing only: "do this"?
