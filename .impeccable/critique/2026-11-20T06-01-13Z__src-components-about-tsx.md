---
target: about section
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\About.tsx"
target_fingerprint: "sha256:51bbc82f59f45f8a45ab3737cefd100eb681dc0e53521b08995758d3485530b3"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\About.tsx"
timestamp: 2026-11-20T06-01-13Z
slug: src-components-about-tsx
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
