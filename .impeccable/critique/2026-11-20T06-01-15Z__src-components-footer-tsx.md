---
target: footer section
total_score: 16
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Footer.tsx"
target_fingerprint: "sha256:fbe912dd435e084092be47747f21e298b5a125d07e3255511d7954d4f09d33b6"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Footer.tsx"
timestamp: 2026-11-20T06-01-15Z
slug: src-components-footer-tsx
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
