---
target: hero section
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Hero.tsx"
target_fingerprint: "sha256:4aa517a204c5b1893698f5c3b5106bc6c2a2e68d264f570e5a3e2f2cc1a0701d"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Hero.tsx"
timestamp: 2026-11-20T06-01-13Z
slug: src-components-hero-tsx
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
