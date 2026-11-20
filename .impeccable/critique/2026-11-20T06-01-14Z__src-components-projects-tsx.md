---
target: projects section
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Projects.tsx"
target_fingerprint: "sha256:b0705f2106f3a6b526893bc9bf63266e8080fd94865413949c3b8b62fd019775"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Projects.tsx"
timestamp: 2026-11-20T06-01-14Z
slug: src-components-projects-tsx
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
