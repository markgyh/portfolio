---
target: testimonial section
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Testimonials.tsx"
target_fingerprint: "sha256:aa8215e83fc0e5361ea4d2169741a5c363768b74083cba02dd16dfe18ca6c4ca"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Testimonials.tsx"
timestamp: 2026-11-20T06-01-15Z
slug: src-components-testimonials-tsx
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
