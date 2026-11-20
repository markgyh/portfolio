---
target: experience section
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Experience.tsx"
target_fingerprint: "sha256:d51712e125670a7ab00b07ed3ace389c97941e46254b713bc5ec3d3b9c357788"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Experience.tsx"
timestamp: 2026-11-20T06-01-13Z
slug: src-components-experience-tsx
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
