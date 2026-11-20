---
target: ui primitives and icons
total_score: 16
max_score: 28
na_heuristics: 3,5,9
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\ui.tsx"
target_fingerprint: "sha256:9dbc9a17d2c00c149a654f722f0eccecc9753c19bcdb705570a8347fb7ed67ab"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\ui.tsx"
timestamp: 2026-11-20T07-06-03Z
slug: src-components-ui-tsx
---
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
