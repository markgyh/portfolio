# Portfolio: Full Design Critique

`/impeccable critique` (Impeccable v4.8.0), run on 2026-11-22 against the working tree, including uncommitted content and media.

**Method:** dual-agent. Assessment A (design review) and Assessment B (detector and browser evidence) ran as isolated sub-agents and were combined afterwards.
- A reviewed each portion in turn at 1366×800 and 375×812, with the dev fixtures `?data=worst` and `?data=empty`.
- B ran `impeccable detect` on every component file and `index.css`, injected the live overlay at 1024px and 375px, and took objective measurements.

**Context:** there is no PRODUCT.md or DESIGN.md, so the shipped code is the design authority. Mode is **Experience** (portfolio).
- H7 (Flexibility) and H10 (Help) are scored `n/a` throughout.
- H5 and H9 are also `n/a` wherever a section has no input or error states. Each total states its own applicable maximum.
- Bands by percentage: 90%+ Excellent, 70%+ Good, 50%+ Acceptable, 30%+ Poor.

---

## Scoreboard

| # | Portion | Score | Band | P0 | P1 | Headline problem |
|---|---|---|---|---|---|---|
| 1 | Hero | 18/28 (64%) | Acceptable | 0 | 2 | Role label fitted to "MARK" renders at 13.5px; full-colour photo erases the blueprint identity |
| 2 | About | 17/24 (71%) | Good | 0 | 1 | The large lead paragraph is the most generic copy on the site |
| 3 | Experience | 16/28 (57%) | Acceptable | 0 | 1 | Hover-to-open plus scroll compensation hides the best numbers and fights the reader |
| 4 | Projects (grid and dialog) | 21/32 (66%) | Acceptable | 0 | 2 | 15 equal-weight cards with no hierarchy; projects can't be deep-linked |
| 5 | Project writeups | 14/24 (58%) | Acceptable | 0 | 1 | Video and facts buried; 95–110 characters per line; template headings |
| 6 | Testimonials | 17/24 (71%) | Good | 0 | 1 | One software-flavoured quote gets a whole section and a nav slot |
| 7 | Contact | 22/32 (69%) | Acceptable | 0 | 1 | Freelance framing; the availability signal is the last block on the page |
| 8 | Footer | 17/20 (85%) | Good | 0 | 0 | Best identity moment on the site, but the revision data is fake |
| 9 | Navbar | 23/28 (82%) | Good | 0 | 0 | Active state uses the copper "action" fill, so it is louder than the CTAs |
| 10 | UI primitives | 23/32 (72%) | Good | 0 | 0 | Good tokens, broken by callers (radius drift, copper used for state) |
| 11 | Icons | 12/16 (75%) | Good | 0 | 0 | Generic Lucide shapes; the pin reads as "saved" |
| 12 | Overall integration | 19/32 (59%) | Acceptable | 0 | 3 | Positioning drift, flat macro hierarchy, identity missing from the first viewport |

**Overall: 219/320 (68%), Acceptable.** It sits just under Good, and there are no P0 blockers.

**Compared with the 2026-11-20 run (`DESIGN-CRITIQUE.md`):** both P0s from that run are gone.
- The cover placeholders were replaced by real covers.
- The placeholder testimonials were replaced by a real quote.

What remains is strategic rather than broken: what the page leads with, what it hides, and how it ranks the work.

**Deterministic scan:**
- The CLI is **clean on all 13 component files** (exit 0).
- There is one advisory finding: `codex-grid-background` at `src/index.css:44`, the drafting grid.
- The live overlay found three things:
  - `line-length`: 6 hits in the Caresino writeup, 106–110 characters per line.
  - `straggler`: 3 hits.
  - The same grid finding.
- Overlay injection succeeded. The overlay was left in the **[Human] Portfolio** tab in the browser pane. The live server has since stopped, so a reload will drop it.

---

## 1. Hero (`Hero.tsx`)

**Design specificity.** The dimension-line callout under the name (`ui.tsx:209-262`) and the name lines rising from behind their own baselines are authored work. They are drafting language that belongs to an engineer. The new full-colour corridor portrait (`Hero.tsx:9-14`) covers the blueprint grid, though. The first viewport is a business headshot any graduate could have, and the identity doesn't start until About.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | The entrance settles in about 1.1s; nothing else needs status |
| 2 | Match real world | 3 | The dimension-line metaphor suits an engineer |
| 3 | User control | 3 | Two clear exits (View Projects, Get in Touch) |
| 4 | Consistency | 2 | Cyan role and copper "MG" were tuned for blueprint blue and lose contrast on the grey photo |
| 5 | Error prevention | 2 | "View Projects" points to `#projects` even when that section is hidden (`Hero.tsx:33`) |
| 6 | Recognition | 3 | Name and role are stated, not implied |
| 7 | Flexibility | n/a | Single-purpose landing |
| 8 | Aesthetic | 2 | The photo carries the weight; the role, the second most important line, is 13.5px |
| 9 | Error recovery | n/a | No error states |
| 10 | Help | n/a | |
| | **Total** | **18/28 (64%)** | **Acceptable** |

**Cognitive load.** Two failures:
- Visual hierarchy: the photo wins over the name, which wins over the role.
- Single focus: the face competes with the name.

**What's working**
- The masked name reveal keeps diacritics safe (`Hero.tsx:19-27`). "WIŚNIEWSKA-KOWALCZYK" from the worst-case fixture renders cleanly.
- The DimensionLine is real identity: extension lines, arrowheads, the value above the line, all drawn in sequence (`index.css:184-197`).
- With no photo it degrades well: the canvas and scrims still read.

**Priority issues**
- **[P1] The role label is fitted to the name's width.** "MARK" is about 328px wide, so the role renders at 13.5px on desktop. On mobile it is a 12px column that wraps to four lines, and a recruiter skimming the page misses the job title.
  - *Fix:* raise `LABEL_MIN` (`ui.tsx:195`, `:225-226`) to about `clamp(1rem, 1.6vw, 1.5rem)`, and let the line span `max(nameWidth, labelWidth)`. Alternatively, put a `min-w-[min(36rem,100%)]` on the wrapper at `Hero.tsx:17`.
  - `/impeccable typeset`
- **[P1] The hero shows the person, not the work, and drops the blueprint identity.**
  - *Fix:* frame the portrait as a sheet on the drafting grid (portrait right, about 40% wide), or lead with a project clip. `Visual` already plays mp4, and `caresino_vid.mp4` exists. Bring back a blueprint-tinted scrim on the text side.
  - `/impeccable bolder`
- **[P2] A dead CTA when Projects is empty.** Render each CTA only if `NAV_ITEMS` (`data.ts:29`) contains its target (`Hero.tsx:32-39`).
  - `/impeccable harden`
- **[P2] On mobile the name hits its 38.4px floor over the subject's torso.**
  - *Fix:* raise the `clamp()` floor to about 3.25rem (`Hero.tsx:18`), and set `object-position` per breakpoint (`Hero.tsx:11`).
  - `/impeccable adapt`

**Persona red flags**
- *Hiring manager, 90 seconds:* the role is 13.5px cyan on mid-grey. Above the fold there is no proof of work and no "open to roles" signal.
- *Casey (mobile):* the name is crammed into the lower third, and the role is a four-line 12px column.
- *Sam (accessibility):* semantics are fine. The copper "MG" on the light corridor is low-contrast in practice.

**Minor observations**
- The outline of the "Get in Touch" button (`border-line-strong`) nearly disappears on the photo.
- The photo's `settle` scale-in adds weight to the element that already dominates.

**Questions:** If this hero used a frame from the Caresino video instead of your face, would a recruiter remember you better? Should the role be the headline and the name the annotation?

---

## 2. About (`About.tsx`)

**Design specificity.** The skills `dl`, with cyan callout labels (`About.tsx:31-52`), carries the drafting idea. The copy hierarchy works against it:
- The paragraph set large is the generic one ("passion for creating with my hands…", `content.ts:74`).
- The concrete one (Kärcher retrofit, sea drones) is set muted.
- The insects line is the most human sentence on the site, and it's buried.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | Nav marks the section |
| 2 | Match | 3 | The audience's vocabulary (DFMA, ISO 2768) |
| 3 | Control | 4 | Static |
| 4 | Consistency | 2 | "Fusion360" (`content.ts:80`) vs "Fusion 360" in project tags |
| 5 | Error prevention | n/a | |
| 6 | Recognition | 3 | Skills are grouped and labelled |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 2 | Lead emphasis on the generic copy; skill items run together |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **17/24 (71%)** | **Good** |

**Cognitive load.** Two failures:
- Grouping inside skill rows.
- The wrong paragraph is emphasised.

**What's working**
- The prose and spec-table split with `max-w-[62ch]` gives a good reading measure (`About.tsx:15`).
- The cyan `ANNOTATION` labels consistently mean "metadata" (`ui.tsx:48`).
- The section hides itself when empty (`About.tsx:7`).

**Priority issues**
- **[P1] The lead paragraph is interchangeable.** Make the Kärcher/TKO paragraph `ABOUT[0]`. Cut "passion for creating with my hands" and "intersection of engineering rigour and design craft" (`content.ts:73-77`).
  - `/impeccable clarify`
- **[P2] Skill items are separated only by whitespace.** "Sheet Metal Fabrication  Handheld Power Tools" reads as one phrase. Add a `li + li::before` separator, or a two-column parts list (`About.tsx:43-46`).
  - `/impeccable polish`
- **[P2] No evidence in the section.** Add an optional `ABOUT_IMAGE`, such as a shop or bench photo, above "Tools and methods" (`About.tsx:32`).
  - `/impeccable delight`
- **[P3] "Others" is a weak group label** (`content.ts:90`). Use "Standards & methods".
  - `/impeccable clarify`

**Persona red flags**
- *Hiring manager:* skims the 20px lead, finds no numbers or employers, and moves on.
- *Casey:* the section is about 1,650px on mobile, with the skills stacked under three paragraphs.

**Minor observations**
- Résumé links appear three times (here, nav, mobile menu). This one could become a text link.
- "Mechanical Design and Robotics engineer" is mixed case here, but in caps in the hero.

**Question:** If you deleted paragraph 1 entirely, would anything be lost?

---

## 3. Experience (`Experience.tsx`)

**Design specificity.** The crafted parts are:
- a timeline rail drawn downward
- copper datum dots
- a plus that rotates to an ×

The hover-accordion itself is a generic "interactive résumé" trope. The content inside is the most hireable text on the site: S$1.2k saved on a S$16k robot, ISO 2768 drawings, a kill switch in three weeks. Two of the three entries hide it by default.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | `aria-expanded`, rotating icon and copper dot show state |
| 2 | Match | 3 | Newest first, tabular dates |
| 3 | User control | 1 | Moving the cursor over an entry opens it and closes the others, then `holdInPlace` scrolls the window (`Experience.tsx:14-34, 64-72, 113`) |
| 4 | Consistency | 2 | Copper (action colour) marks open *state* (`:118-119, 135`); role titles disagree with project cards |
| 5 | Error prevention | 2 | Passing the cursor over on the way to Projects reflows the page under the reader |
| 6 | Recognition | 2 | Achievements are hidden until hover or tap |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 3 | Clean, but the right half of the desktop column is empty (`max-w-[68ch]`, `:173`) |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **16/28 (57%)** | **Acceptable** |

**Cognitive load.** Three failures:
- Disclosure is used where nothing needs saving.
- Comparing roles takes working memory, because each must be opened in turn.
- Layout stability.

**What's working**
- Correct disclosure semantics: `h3 > button`, `aria-controls`, `role="region"`, and `inert` on closed panels (`:123-170`).
- The `grid-rows 0fr→1fr` height animation, with staggered line reveals and a faster close (`index.css:216-231`).
- Highlights are quantified and specific (`content.ts:107-111, 120-124`).

**Priority issues**
- **[P1] Hover-to-open with scroll compensation fights the user.** Three entries don't need an accordion.
  - *Fix:* remove `onMouseEnter`/`openOnly`/`holdInPlace` (`:14-34, 63-72, 113`). Default every entry open (`useState(new Set(EXPERIENCES.map((_, i) => i)))` at `:40`), or keep click-to-toggle with everything starting open.
  - `/impeccable distill`
- **[P2] Role titles contradict the project cards.**
  - Kärcher: "Mechatronics Engineer Intern" (`content.ts:105`) vs "Mechatronics & Embedded Software Intern" (`:469, 555`).
  - TKO: "Assistant Mechanical Designer Intern" (`:118`) vs "Mechanical Design Intern" (`:646, 730`).
  - *Fix:* one canonical title per role.
  - `/impeccable clarify`
- **[P2] No links from roles to their projects.** Four project cards come from Kärcher and TKO. Add `projects?: string[]` and render "Related:" buttons that open the dialog. This depends on deep linking (§4).
  - `/impeccable layout`
- **[P3] The open state uses the action colour.** Use `text-ink` for the open company name and keep the copper dot (`:135`).
  - `/impeccable colorize`

**Persona red flags**
- *Hiring manager:* must hover each company to see a single outcome.
- *Riley (stress tester):* sweeping the mouse quickly down the list triggers repeated opens and closes and window scroll corrections.
- *Casey:* the first view is three collapsed headers. Entries open as they reach the middle of the screen (`:46-59`).

**Minor observations**
- The rail and dots are `lg` only, so the timeline identity vanishes below 1024px.
- "Visit Kärcher Robotics Singapore" is a low-value link to a corporate homepage.

**Question:** What does collapsing three entries save, compared with what it hides?

---

## 4. Projects: grid, card and dialog shell (`Projects.tsx`, `ProjectDialog.tsx`)

**Design specificity.** The parts are engineered with care:
- a stretched-button card
- `TagLine` measuring what fits
- a native `<dialog>` with prev/next and focus hand-off

The shape is still the stock card: image, accent bar, title, clamped blurb, chips, "View details". Nothing makes 15 projects read as a *body of mechanical work*. There are no categories, no hero project and no scale cues.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | "Project 1 of 15" in a live region (`ProjectDialog.tsx:153-155`) |
| 2 | Match | 3 | Dates, course codes, contexts |
| 3 | User control | 3 | Escape, guarded backdrop click, prev/next, focus return; no shareable URL |
| 4 | Consistency | 3 | Tag case differs between card and dialog (`properCase` only in the writeup, `ProjectWriteup.tsx:255`) |
| 5 | Error prevention | 3 | The press-and-release backdrop guard is good (`ProjectDialog.tsx:36-38, 82-88`) |
| 6 | Recognition | 2 | Accent colour silently encodes category with no legend; "pinned" is a 14px pin |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 2 | 15 equal cards; both Kärcher cards share one cover |
| 9 | Recovery | 2 | A cover that fails to load leaves an empty 16:10 frame (`hideIfMissing`) |
| 10 | Help | n/a | |
| | **Total** | **21/32 (66%)** | **Acceptable** |

**Cognitive load.** Three failures: minimal choices, chunking and hierarchy. The **15-card grid** is a decision point with more than 4 options.

**What's working**
- Accessible full-card click. The real `<button>` is in the `h3`, `after:inset-0` stretches it, and the focus ring moves to the article via `has-[button:focus-visible]` (`Projects.tsx:43, 61-69`).
- Dialog focus management. Stepping to an end disables the pressed button and moves focus to the remaining one, and focus returns to the opener (`ProjectDialog.tsx:25-35, 52, 68`).
- `useSummaryLines` keeps text blocks aligned across a row (`Projects.tsx:18-34`).

**Priority issues**
- **[P1] No hierarchy across 15 projects.** On mobile, Projects is 8,417px of a 14,808px page.
  - *Fix:* render the pinned set as a larger "Selected work" band above the grid (`Projects.tsx:107-111`). Collapse the rest behind "Show all 15", or group them under Industry and Coursework using the existing `accent`/`context`.
  - `/impeccable layout`
- **[P1] Projects can't be deep-linked.** `openIndex` is plain `useState` (`Projects.tsx:93`). Sync it to `#project-<slug>` with `history.replaceState`, and read the hash on load.
  - `/impeccable harden`
- **[P2] Card blurbs are the summary cut mid-word** ("It had to come i…", `Projects.tsx:73`). Add an outcome-first `teaser` field of 140 characters or fewer.
  - `/impeccable clarify`
- **[P2] Duplicate and low-resolution covers.**
  - `karcher_origsweeper.jpg` is used twice (`content.ts:477, 563`) and is 447px wide.
  - `dehydrator_prototype.jpg` is 632px; `caresino_final.jpg` is 583px.
  - *Fix:* export covers at 1200px or more and give the HMI project its own image.
  - `/impeccable polish`
- **[P2] The mobile dialog header takes about 30% of the screen**, leaving a reading window of 487 of 812px. Use `text-xl` for the title below `sm`, and move the context line into the body (`ProjectDialog.tsx:93-104`).
  - `/impeccable adapt`

**Persona red flags**
- *Hiring manager:* can't find the 2–3 strongest mechanical projects in 10 seconds. LyfeGo KOL onboarding and the Coca-Cola strategy sit beside the drone and the kill switch.
- *Casey:* scrolls 15 stacked cards, and covers stay blank until lazy-loaded.
- *Sam:* a broken cover becomes a silent blank region.

**Minor observations**
- Stepping between projects flashes a horizontal scrollbar: the `step-in` `translateX(16px)` overflows. Add `overflow-x-clip` at `ProjectDialog.tsx:122`.
- `ACCENTS` carry alpha (`#8ff094ba`, `content.ts:15-18`), and their comment is stale.
- `rounded-xl` cards and the `rounded-2xl` dialog contradict the radius rule in `ui.tsx:9-10`.
- Detector: the "Solar Bubble Gun" and "Mousetrap Car" title buttons measured 294×25. This is a false positive, because the `after:inset-0` hit area covers the whole card.

**Questions:** If you could only show five projects, which would they be? Does the beverage-strategy project help or hurt a mechanical design application?

---

## 5. Project writeups (`ProjectWriteup.tsx`)

**Design specificity.** The content is genuinely authored: spec tables, cost-per-shell comparisons, ratchet tuning, and bold lead-ins that read like a design review. The container is a form, though. All 15 writeups use the same four headings ("The Challenge & Context" … "Measurable Impact & Key Learnings") under "Executive Summary". That reads as a class report template, not engineering documentation.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 2 | 3,300–5,500px bodies with no section index or progress |
| 2 | Match | 3 | Tables, units, tolerances; "Executive Summary" is MBA-speak |
| 3 | Control | 3 | Scrolls independently and resets to the top per project (`ProjectDialog.tsx:72-76`) |
| 4 | Consistency | 2 | Identical headings everywhere; tag case differs from the card |
| 5 | Error prevention | n/a | |
| 6 | Recognition | 2 | Role, Team, Budget and Timeline come *after* a 6-line summary; the video is at the very bottom |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 2 | 95–110 characters per line on desktop; uncaptioned side photos |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **14/24 (58%)** | **Acceptable** |

**Cognitive load.** Three failures:
- Working memory: a long scroll with no index.
- Hierarchy: the best artefact comes last.
- Chunking: the summary is a wall of text before the facts.

**What's working**
- Real tables with `scope` attributes and tabular numbers (`ProjectWriteup.tsx:177-210`). The cost comparison is exactly what a design lead wants.
- Bold lead-in paragraphs make each section skimmable (`:148-158`).
- Image placement adapts. The side photo floats beside text but moves under a table when there is one, and `flow-root` contains the floats (`:258-273`).

**Priority issues**
- **[P1] The strongest evidence is buried or missing.**
  - The video renders last (`:281`) with no `poster`.
  - 14 of 15 projects have `summaryImage: ''`, and there are no captions anywhere on the site.
  - The writeup claims "Toleranced drawings for every part" (`content.ts:270`), but no drawing is shown.
  - *Fix:* move `<Video>` up under the cover or summary and give it a `poster`. Add captions, and add one drawing or CAD image per mechanical project.
  - `/impeccable layout`
- **[P2] The prose measure is too long.** This is **confirmed by both assessments**: the detector logged 6 `line-length` hits in Caresino at 106–110 characters on 816px paragraphs, and A measured about 95 characters at 1366px. Add `max-w-[70ch]` to text blocks and let tables and photos run full width (`:252, 269`). It is fine at 375px.
  - `/impeccable typeset`
- **[P2] Facts come after the summary.** Render `<Facts>` first as a spec strip under the cover (`:252-256`), and write "6 people", not "6" (`content.ts:209`).
  - `/impeccable layout`
- **[P2] Template headings.** Let each heading say what happened ("Fitting a ratchet into 20 mm"). Rename "Executive Summary" to "Overview" (`:248-250`).
  - `/impeccable clarify`
- **[P3] No in-dialog section index.** Add sticky section chips built from `project.sections` (`ProjectDialog.tsx:116-139`).
  - `/impeccable layout`

**Persona red flags**
- *Hiring manager:* won't scroll six screens to reach the Caresino video, and reads "Executive Summary" as coursework.
- *Casey:* about 11 screens per project inside a 487px window.
- *Sam:* the video has no label. Side-photo alt text is the project title, not a description (`:251`).

**Minor observations**
- There is a typo: ".:" (`content.ts:240`).
- The tape measure locks "every 10 cm" in the summary but "at least every 5 cm" in the body (`content.ts:215` vs `:249`).
- Detector stragglers: "layout" alone on the last line of the role `<dd>` at desktop, and "edge." in "The Dispenser Path" at mobile. Add `text-wrap: pretty`.

**Question:** Would one annotated drawing replace three paragraphs of each writeup?

---

## 6. Testimonials (`Testimonials.tsx`)

**Design specificity.** The callout-balloon initial (`:101-106`) is a nice drawing reference, and the scroller is well built. With one quote, though, the section is a third-width column beside two-thirds of empty grid. The quote praises AI tooling and programming tests, which pulls against the mechanical identity.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | Arrows appear only on overflow (`:56`); `aria-disabled` keeps focus |
| 2 | Match | 3 | Quote and attribution conventions |
| 3 | Control | 3 | Swipe, arrows, keys |
| 4 | Consistency | 3 | Shared heading and container |
| 5 | Error prevention | n/a | |
| 6 | Recognition | 3 | Name and role visible |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 2 | One quote at `lg:w-1/3` leaves a void, yet gets an 836px section and a nav item |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **17/24 (71%)** | **Good** |

**What's working**
- A robust scroller: snap, `overscroll-x-contain`, a focusable named track, and edges recalculated on resize (`:21-37, 75-80`). It handles three mixed-length and CJK quotes in the worst-case fixture.
- `Intl.Segmenter` initials handle accents and emoji (`:10`).
- Quote marks are added per paragraph (`:89-95`).

**Priority issues**
- **[P1] A single testimonial gets a full section and a nav slot.**
  - *Fix:* when `length === 1`, render it as a wide pull-quote. Better, move it beside the LyfeGo project and drop "Testimonials" from `NAV_ITEMS` (`content.ts:1451-1457`).
  - `/impeccable layout`
- **[P2] The quote's content contradicts the positioning.** It comes from a LyfeGo co-founder (`content.ts:1440-1445`), and LyfeGo isn't in Experience. Get a Kärcher or TKO supervisor quote about mechanical work.
  - `/impeccable clarify`
- **[P3] A stale `TODO: these are placeholders` comment** sits above a real quote (`content.ts:1434-1436`).
  - `/impeccable polish`

**Persona red flags**
- *Hiring manager:* reads one software-flavoured endorsement, from someone outside the employment history, for a mechanical role.
- *Sam:* the quotes aren't in `<figure>`/`<figcaption>`, so the attribution isn't tied to its `blockquote`.

**Question:** Is one quote better than none, or does it advertise that there's only one?

---

## 7. Contact (`Contact.tsx`)

**Design specificity.** Mostly category-standard: form on the left, details on the right, an availability card. The craft is in the states: sending, a sent state with the check drawn in, a mailto fallback, and an error that offers the direct email. The intro ("Have a project in mind or want to talk shop?", `:112-115`) is freelancer boilerplate for someone seeking a full-time role.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | Sending, sent, error and mailto states, all announced |
| 2 | Match | 2 | Freelance framing and a "Project inquiry" placeholder |
| 3 | Control | 3 | "Send another message" resets and refocuses (`:51-59, 98-102`) |
| 4 | Consistency | 3 | Shared input and button primitives |
| 5 | Error prevention | 2 | Four required fields including Subject (`:183`); native validation only |
| 6 | Recognition | 3 | Labels above the fields |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 3 | Balanced layout; the availability card comes last |
| 9 | Recovery | 3 | The error offers a direct mailto (`:215-223`) |
| 10 | Help | n/a | |
| | **Total** | **22/32 (69%)** | **Acceptable (near Good)** |

**What's working**
- Focus management across the form and success swap, plus a `role="status"` success panel (`:51-59`).
- `AbortSignal.timeout(15000)`, length caps and a honeypot (`:14, 81`).
- The copy-email button with a polite live region (`:18-44`).

**Priority issues**
- **[P1] The availability signal is buried and contradicted.**
  - "Open to opportunities / full-time roles" is the last block on the page (`:291-299`), while the intro says freelance.
  - *Fix:* rewrite `:112-115` for recruiters, and surface `SITE.availability.headline` as a pill in the hero or nav.
  - `/impeccable clarify`
- **[P2] Subject is required.** Drop `required` (`:183`) and default it to "Portfolio enquiry".
  - `/impeccable distill`
- **[P2] Mobile order.** Contact is 1,746px on mobile, and the one-tap email comes after the whole form. Use `order-first lg:order-none` on the details column (`:240`).
  - `/impeccable adapt`
- **[P3] The `text-2xl` email address competes with the section heading.** The detector also measured that link at **228×28** on mobile, which is under the 44px tap height.
  - `/impeccable quieter`

**Persona red flags**
- *Hiring manager:* "is he available, from when, where?" The answer is split between the Location block and the bottom card.
- *Casey:* a 6-row textarea and four required fields on a phone, and the email link is 28px tall.
- *Riley:* a slow network shows "Sending…" for up to 15s with no spinner (`:211`).

**Minor observations**
- "Reply within 48 hours" appears in both the success copy (`:129`) and the card. Pick one place.
- Detector straggler: "hours." is alone on the last line of the intro paragraph at 1024px.

**Question:** Who is this form for, clients or recruiters? The copy currently answers "clients".

---

## 8. Footer (`Footer.tsx`)

**Design specificity.** Highly specific. The drawing title block (Drawn by / Title / Revision / Scale / Sheet, `:4-13, 18-35`) is the most distinctive and best-executed identity moment on the site. It only fails where the metaphor's data is fake.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | n/a | |
| 2 | Match | 3 | Authentic fields; "Revision" is just the current year |
| 3 | Control | 4 | "Back to top" is a large target |
| 4 | Consistency | 3 | Borders and type match |
| 5 | Error prevention | n/a | |
| 6 | Recognition | 4 | Self-evident |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 3 | The © line duplicates "Drawn by" |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **17/20 (85%)** | **Good** |

**What's working**
- A grid with collapsing borders that reflows from 2 to 3 to 6 columns (`:18`).
- "Back to top" is a cell, not a floating button (`:28-34`).
- It is data-driven from `FULL_NAME`.

**Priority issues**
- **[P2] Fake revision data.** "Revision" is `new Date().getFullYear()` (`:6, 10`). Use `SITE.revision` ("Rev C · Nov 2026"), and a title like "Mechanical Design Portfolio".
  - `/impeccable polish`
- **[P3] The © line switches voice** from third to first person ("…Designed and built by me.", `:37`).
  - `/impeccable clarify`
- **[P3] The best identity is saved for the end.** Reuse the cell pattern for the writeup fact strip (§5) and the hero meta.
  - `/impeccable bolder`

**Question:** Why does the most "you" component only appear after 8,000px?

---

## 9. Navbar (`Navbar.tsx`)

**Design specificity.** A centred floating pill with a monogram and a scroll-spy: well made but category-standard. The labelled "Menu" button on mobile, rather than a bare hamburger, is a thoughtful choice.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | `aria-current="location"` plus a copper fill |
| 2 | Match | 4 | Plain labels |
| 3 | Control | 4 | Escape, outside tap and scroll close the menu; focus moves in and back (`:21-44`) |
| 4 | Consistency | 2 | The active state uses the copper action fill (`:73`); Résumé is hidden between 640 and 767px (`:80`) |
| 5 | Error prevention | 3 | The menu auto-closes at `sm+` (`:16-19`) |
| 6 | Recognition | 4 | Always visible |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 3 | The copper monogram is weak over the light hero photo |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **23/28 (82%)** | **Good** |

**What's working**
- Radii nest properly: a 10px bar equals a 4px link plus 6px padding (`:54-55`).
- `prefers-reduced-transparency` makes the chrome solid (`index.css:280-285`).
- The mobile menu uses `@starting-style` entry and `min-h-14` targets (`:114-134`).

**Priority issues**
- **[P2] The active state is louder than the CTAs.** Change `bg-copper text-canvas` to `bg-surface-2 text-ink` with a copper tick (`:73`).
  - `/impeccable quieter`
- **[P2] One of five nav items exists for a single quote.** Drop Testimonials (§6).
  - `/impeccable distill`
- **[P3] Monogram contrast over the photo.**
  - The mobile bar has no background until you scroll (`:91-93`).
  - The detector measured the mobile "MG" link at **24×44**. That meets WCAG 2.5.8's 24px minimum but is narrow.
  - *Fix:* add a canvas scrim while over the hero, and widen the hit area.
  - `/impeccable polish`

**Persona red flags**
- *Casey:* the unscrolled mobile bar shows a faint "MG" over the light photo.
- *Sam:* there are two `<nav aria-label="Primary">` elements in the source. Only one is exposed per breakpoint.

**Question:** Should the nav tell visitors where they are, or where they should go next?

---

## 10. UI primitives (`ui.tsx`, `lib/utils.ts`, `index.css`)

**Design specificity.** The tokens are authored:
- a blueprint paper ramp
- white drafting ink
- copper and cyan with explicit semantic roles (`ui.tsx:5-11`, `index.css:9-41`)
- the drafting grid
- named easings with usage rules

The primitives are better than their usage: callers break the stated colour and radius rules.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | Shared PRESS feedback (`ui.tsx:14`) |
| 2 | Match | 3 | Annotation and dimension semantics |
| 3 | Control | 3 | Reduced motion and reduced transparency honoured globally |
| 4 | Consistency | 2 | The "one radius" rule is broken (sm, md, xl, 2xl, full, 10px); copper is used for state |
| 5 | Error prevention | 3 | `safeUrl` blocks `javascript:` (`utils.ts:23-31`); a HEAD check hides dead résumé links |
| 6 | Recognition | 3 | The `ExternalLink` arrow is reserved for leaving the site (`ui.tsx:84-96`) |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 3 | Restrained palette |
| 9 | Recovery | 3 | `hideIfMissing` avoids broken icons but leaves blank frames (`utils.ts:71-73`) |
| 10 | Help | n/a | |
| | **Total** | **23/32 (72%)** | **Good** |

**Contrast (detector, measured against canvas `#0b2545`):** every text token passes AA.

| Token | Ratio |
|---|---|
| ink | 14.4:1 |
| muted | 9.75:1 |
| faint | 6.75:1 |
| cyan | 9.65:1 |
| copper | 5.8:1 |
| copper-strong | 7.63:1 |
| line-strong (borders) | 3.43:1, passes for UI borders |

**What's working**
- The semantic colour contract (copper = act, cyan = annotate) is stated at the top of the shared vocabulary.
- Motion is tokenised by purpose, and the reduced-motion fallback keeps colour and opacity feedback (`index.css:34-40, 258-277`).
- `ExternalLink` is the single way to open a new tab, and it carries sr-only "(opens in a new tab)" text.

**Priority issues**
- **[P2] Radius drift.** Add `--radius-control: 4px` and `--radius-panel: 8px` to `@theme`. Apply them at `Projects.tsx:43, 46` and `ProjectDialog.tsx:90`, and update `ui.tsx:9-10`.
  - `/impeccable document`
- **[P2] No "selected/current" colour role**, so callers reach for copper. Add one, document it in `ui.tsx:5-11`, and switch the nav and Experience to it.
  - `/impeccable colorize`
- **[P2] A broken asset leaves an empty frame.** Pass a `fallback` through `Visual` (`ui.tsx:272-339`) that renders `Placeholder` instead of `display:none`.
  - `/impeccable harden`
- **[P3] `LABEL_MIN = 12` (`ui.tsx:195`) is the root of the tiny hero role label.**
  - `/impeccable typeset`

**Detector note:** `codex-grid-background` (`index.css:44`, the `drafting-grid` utility) is the only CLI finding. **We judge it a false positive:** it is a blueprint surface on a mechanical-engineering portfolio, which is the exact exception the rule carves out. Both assessments agree it is deliberate and on-brand.

**Persona red flags**
- *Sam:* the 2px copper focus ring with a 3px offset is good. Autoplay clips in writeups have no pause control unless reduced motion is set (`ui.tsx:309-325`), which is a WCAG 2.2.2 risk for clips longer than 5s.

**Minor observations**
- One section-spacing value is used everywhere (`index.css:27-29`), so every section has the same rhythm (§12).
- `SECTION` always draws a top rule (`utils.ts:79`), on top of the leader line under each heading.

**Question:** If copper means "do this", what should "you are here" look like?

---

## 11. Icons (`Icons.tsx`)

**Design specificity.** A small, consistent set with one non-scaling 1.5 stroke (`:13-15`, `index.css:97-100`). The shapes are Lucide-generic. The site's real drafting marks (arrowheads, the datum diamond) live as one-offs in `ui.tsx` and CSS rather than in the icon set.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | n/a | |
| 2 | Match | 2 | A pushpin for "featured" reads as "saved/bookmarked" (`:52-56`, `Projects.tsx:49`) |
| 3 | Control | n/a | |
| 4 | Consistency | 4 | One `Svg` base, `currentColor`, `aria-hidden`, `focusable=false` |
| 5 | Error prevention | n/a | |
| 6 | Recognition | 3 | Disciplined arrow semantics: ↗ external, → in-page |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 3 | Round caps and joins, and `rx=2`, are softer than "drafted" |
| 9 | Recovery | n/a | |
| 10 | Help | n/a | |
| | **Total** | **12/16 (75%)** | **Good** |

**What's working**
- Line weight stays the same from 14px to 22px.
- The arrow vocabulary is enforced in code comments.
- `Check` uses `pathLength={1}`, so the success tick can be drawn (`:78-82`).

**Priority issues**
- **[P2] The pin metaphor.** Replace it with a visible "Featured" label or a datum-diamond glyph (`Icons.tsx:52-56`, `Projects.tsx:47-52`).
  - `/impeccable clarify`
- **[P3] Drafting glyphs are scattered.** Move `Arrowhead` (`ui.tsx:180-192`) and the datum diamond (`ui.tsx:70`) into `Icons.tsx`.
  - `/impeccable document`
- **[P3] Line terminals.** Try `strokeLinecap="butt"` and `strokeLinejoin="miter"` (`:16-17`) for a technical-pen character.
  - `/impeccable polish`

**Question:** What would an icon set drawn by a mechanical draughtsman look like?

---

## 12. Overall integration (`App.tsx`, the whole page)

**Design specificity.** There is a real, ownable concept, and it's the right one for this person: a blueprint sheet with a drafting grid, dimension callouts, leader lines to datum marks, and an engineering title block. It is applied unevenly:
- missing at the top (the photo hero)
- at full strength at the bottom (the footer)
- thin in the middle, where every section is "UPPERCASE heading + leader line + content" at identical spacing

The content often pulls away from the mechanical identity: a software testimonial, the LyfeGo and Coca-Cola projects, freelance contact copy.

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility | 3 | Scroll-spy, live regions, states |
| 2 | Match | 2 | Positioning drifts between mechanical engineer, generalist, freelancer and tester |
| 3 | Control | 3 | Skip link (`App.tsx:19-24`) and Escape everywhere; Experience hover is the exception |
| 4 | Consistency | 2 | Colour-role and radius rules broken; role titles disagree |
| 5 | Error prevention | 2 | A dead CTA in sparse states; hover-triggered reflow |
| 6 | Recognition | 2 | No deep links; the best evidence is hidden behind hover or at the bottom of dialogs |
| 7 | Flexibility | n/a | |
| 8 | Aesthetic | 2 | Monotone rhythm; Projects is 41% of the desktop page and 57% of mobile |
| 9 | Recovery | 3 | Empty sections and their nav links hide themselves (`data.ts:22-29`) |
| 10 | Help | n/a | |
| | **Total** | **19/32 (59%)** | **Acceptable** |

**Measurements**
- Page height: 8,272px on desktop, 14,808px on mobile.
- Heading outline (detector): one `h1`, then `h2`s, then `h3`s, with no skipped levels. Experience role `h3`s are 17px and Contact `h3`s are 14px, which is barely above body size.
- No horizontal overflow at either width.
- No unnamed controls, and no images missing an `alt` attribute. 16 images use `alt=""`; check that none of them carry content.

**Cognitive load.** Four failures, which is **high**:
- There is no primary path for the hiring audience.
- Projects has choice overload.
- Disclosure hides the key evidence.
- The rhythm doesn't signal what matters.

**Emotional journey**
1. Hero: "nice photo"
2. About: "solid, if generic"
3. Experience: "real numbers", if they hover
4. Projects: "which one?"
5. Dialog: depth, then fatigue
6. Testimonials: "only one"
7. Contact: "freelance?"
8. Footer: "clever!"

**The peak is at the very end, where few visitors arrive.**

**What's working**
- A coherent, ownable metaphor with real craft in the details: DimensionLine, leader lines drawn on arrival, the timeline rail, the title-block footer.
- Robust at content extremes. The worst-case and empty fixtures degrade cleanly, and empty sections and their nav links vanish.
- Accessibility is above average: skip link, native dialog, `inert` panels, reduced motion and reduced transparency, and text contrast of at least 4.9:1 everywhere.

**Priority issues**
- **[P1] Positioning drift.** Do one pass on `content.ts` covering:
  - the hero role
  - the About lead (`:74`)
  - the Contact intro (`Contact.tsx:112-115`)
  - where the testimonial goes
  - which projects are mechanical evidence and which are "also did"
  - `/impeccable clarify`
- **[P1] No macro hierarchy.** Every section has the same heading scale, rule and padding (`ui.tsx:50-75`, `utils.ts:79`, `index.css:27-29`).
  - *Fix:* promote Projects (featured row) and Experience (always open), compress About, and merge Testimonials away. Add a `SECTION_TIGHT` variant.
  - `/impeccable layout`
- **[P1] The identity doesn't carry into the first viewport.** Bring the grid, the cyan and the title-block vocabulary into the hero, and the fact strip into the dialog.
  - `/impeccable bolder`
- **[P2] The mobile page is 14,808px.** Collapse to "Show all projects" after the pinned three, put contact details before the form, and keep Experience open with no hover dependency.
  - `/impeccable adapt`

**Persona red flags (hiring manager, 90 seconds)**
- 0–5s: a headshot and a 13.5px role.
- 5–30s: the generic About lead.
- 30–60s: collapsed Experience.
- 60–90s: 15 equal cards; opens one and faces a six-screen document.
- Never sees the S$1.2k saving, the drone, the videos or the availability card.

**Questions:** If the footer's title-block idea organised the whole page, with each section a "sheet" with its own title block, what would change? What is the one sentence a recruiter should repeat to their manager after 90 seconds, and where is it on the page?

---

## Cross-cutting patterns

These are cheaper to fix at the source than section by section.

1. **[P1] Evidence is hidden by default.**
   - Where it shows up:
     - Experience highlights sit behind hover.
     - Videos sit last with no poster.
     - Facts come after the summary.
     - No drawings are shown.
     - Availability is the last block.
   - **Source fix:** render Experience open (`Experience.tsx:40`, remove `:113`). Reorder `ProjectWriteup.tsx:247-281` to cover, fact strip, video, summary, sections.
2. **[P1] Positioning drift in `content.ts`.**
   - Where it shows up:
     - the generic About lead
     - freelance Contact copy
     - a software-centric testimonial
     - mismatched role titles
     - non-mechanical projects at equal weight
   - **Source fix:** one positioning pass, with `EXPERIENCES` titles as the canonical source that project `context` reuses.
3. **[P1] Flat macro hierarchy.** One heading scale, one section padding, and one card size for 15 projects.
   - **Source fix:** importance tiers (a featured row and a tight section variant), and make `pinned` visible.
4. **[P2] Colour-role violations.** Copper is used for location and state (`Navbar.tsx:73`, `Experience.tsx:118-119, 135`).
   - **Source fix:** a documented "selected" token in `ui.tsx:5-11` and `index.css`.
5. **[P2] Radius drift against the "one radius" rule.**
   - **Source fix:** `--radius-control` and `--radius-panel` tokens, applied in `Projects.tsx` and `ProjectDialog.tsx`.
6. **[P2] Missing-asset and sparse-state paths are incomplete.** Covers go blank, the hero CTA ignores hidden sections, and there are no deep links.
   - **Source fix:** a `Visual` fallback, CTAs filtered by `NAV_ITEMS`, and `openIndex` synced to `location.hash`.
7. **[P3] Typographic stragglers and long measure** (detector).
   - **Source fix:** a global `text-wrap: pretty` on `p, dd`, and `max-w-[70ch]` on writeup prose.

## Where the two assessments agreed and differed

- **Agreed:**
  - The writeup line length is the single most concrete typographic defect.
  - The drafting grid is deliberate, not slop.
  - Contrast is a non-issue everywhere.
- **Detector-only catches:**
  - three stragglers (Contact intro, the writeup role `dd`, Dispenser Path on mobile)
  - the 228×28 email link and the 24×44 "MG" logo on mobile
- **Detector false positives:**
  - `codex-grid-background`
  - the skip link and stretched-card title buttons flagged as small targets
  - the dev fixture switcher
- **Design-review-only catches (beyond what a detector can see):** positioning, hierarchy, disclosure, content contradictions and deep linking. These are where most of the remaining score lives.

## Suggested order of work

1. `/impeccable clarify`: positioning pass on `content.ts` (About lead, Contact intro, role titles, testimonial placement, card teasers, writeup headings).
2. `/impeccable distill`: Experience always open, hover behaviour removed; optional Subject; drop the Testimonials nav item.
3. `/impeccable layout`: featured projects band, writeup reorder (facts, then video, then summary), section importance tiers.
4. `/impeccable bolder`: carry the blueprint and title-block identity into the hero and the dialog.
5. `/impeccable typeset`: hero role floor, writeup measure, `text-wrap: pretty`.
6. `/impeccable harden`: project deep links, `Visual` fallback, CTAs that respect hidden sections.
7. `/impeccable polish`: radius and selected-colour tokens, covers at 1200px or more, footer revision data, icon terminals.
