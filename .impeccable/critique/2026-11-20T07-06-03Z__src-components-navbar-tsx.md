---
target: navbar
total_score: 23
max_score: 32
na_heuristics: 9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Navbar.tsx"
target_fingerprint: "sha256:ea9e63f00ef6546ec5c527470bcbc8165f5438140c33334ceb836b566fec92bd"
target_path: "C:\\Users\\markg\\Downloads\\portfolio\\src\\components\\Navbar.tsx"
timestamp: 2026-11-20T07-06-03Z
slug: src-components-navbar-tsx
---
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
