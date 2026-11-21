---
target: projects write up section
total_score: 20
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\ProjectWriteup.tsx"
target_fingerprint: "sha256:4aea3e4bdccf44f3be1bdb5ecbc04b18e1af12aaf0610aa66ff68271831fffc6"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\ProjectWriteup.tsx"
timestamp: 2026-11-20T06-01-14Z
slug: src-components-projectwriteup-tsx
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
