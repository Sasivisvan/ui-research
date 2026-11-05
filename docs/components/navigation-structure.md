# Navigation and Page-Structure Components (1–10)

This file is the build reference for the components that move people around a site and give pages their skeleton: headers, every kind of menu, sidebars, mobile tab bars, breadcrumbs, tabs, pagination, footers, scroll/TOC indicators and skip links. Each component lists named variants with rebuildable specs, what separates a crafted version from a template one, desktop vs mobile behaviour, the correct ARIA/keyboard pattern, code, libraries, inspiration and caveats. Distinctive navigation comes from three things: **motion with a spatial origin** (menus grow from the button, indicators slide between items, panels morph size: Radix Viewport, GSAP Flip, clip-path reveals), **typography used as the interface** (huge menu type, marquee, letter shuffle, big-type footers) and **stateful headers driven by scroll** (now possible in CSS with `scroll-state()` queries and scroll-driven animations). Generic versions are static, centred, translucent and hover-only. Award-style menus trace back to a small set of repeatable Codrops/GSAP techniques, listed under [2. Menu types](#2-menu-types) with repo URLs.

**Verification markers used in this file (carried over from the research notes):**
- **[synthesis]**: practitioner synthesis from the researcher's background knowledge, not a fetched source. Verify before quoting as fact.
- **(unverified)**: the source page could not be fetched or the claim was not confirmed.
- **(source)** on code: adapted from the cited page. **(sketch)** on code: written by the researcher, untested. Sketches are flagged with "> ⚠ Untested reference snippet".
- Variants with an inline URL come from a verified source; variants without a URL are synthesis.

Related docs: [components index](README.md) · [feedback and overlays (31–40)](feedback-overlays.md) · [signature and experiential (41–50)](signature-experiential.md) · [component libraries](component-libraries.md).

## Contents

- [Shared conventions for navigation](#shared-conventions-for-navigation)
- [1. Headers and navbars](#1-headers-and-navbars)
- [2. Menu types](#2-menu-types) (hamburger, full-screen overlay, off-canvas drawer, mega menu, dropdown, radial, command palette)
- [3. Sidebars and side navigation](#3-sidebars-and-side-navigation)
- [4. Mobile bottom tab bars](#4-mobile-bottom-tab-bars)
- [5. Breadcrumbs](#5-breadcrumbs)
- [6. Tabs and segmented controls](#6-tabs-and-segmented-controls)
- [7. Pagination, infinite scroll and load more](#7-pagination-infinite-scroll-and-load-more)
- [8. Footers](#8-footers)
- [9. Scroll progress, section indicators and TOC nav](#9-scroll-progress-section-indicators-and-toc-nav)
- [10. Skip links and anchor navigation](#10-skip-links-and-anchor-navigation)
- [Cross-cutting reference](#cross-cutting-reference) (ARIA cheat-sheet, mobile conventions, crafted vs generic, outdated techniques, library map, research gaps)
- [Sources](#sources)

---

## Shared conventions for navigation

- **Breakpoints [synthesis]:** `<640px` phone, `640–1023px` tablet/small laptop, `≥1024px` desktop, `≥1440px` wide. Prefer **container queries** on the nav itself over viewport queries, so the same header works in a sidebar layout or a CMS embed. Material's window-size classes (compact <600dp, medium 600–839dp, expanded ≥840dp) are a good cross-check **[synthesis; the M3 page did not render for the fetcher]**.
- **Site navigation is links in a labelled `<nav>`, with disclosure buttons for submenus, not `role="menu"`/`menubar`.** Tabs, combobox (command palette), feed (infinite scroll) and dialog (drawers and overlays) each have a strict APG keyboard model (see [ARIA cheat-sheet](#aria-pattern-cheat-sheet)).
- **Mobile:** keep ≤4 top-level links visible if possible, give targets at least 24×24 CSS px (WCAG AA) and preferably about 44–48px, and pad fixed bars with `env(safe-area-inset-*)`.
- **Motion:** animate only `transform`, `opacity`, `clip-path` and `filter`. Open about 250–450ms, close about 150–250ms (faster exits than entries). Always honour `prefers-reduced-motion` **[synthesis]**.

---

## 1. Headers and navbars

**What & when.** The persistent site identity and top-level navigation. Make it sticky only if users need it repeatedly during a session ([NN/g Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)).

**Variants**

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Classic sticky bar, condensed on scroll** | A 72–88px header shrinks to 56–64px after about 80px of scroll. Logo scales from 1 to 0.85 and gains a hairline border and opaque background. Build with `animation-timeline: scroll()` and `animation-range: 0 120px`, or with `scroll-state(stuck: top)` (Chrome 133+). |
| 2 | **Transparent-on-hero** | White text over a full-bleed hero, flipping to an opaque background with dark text once the hero leaves. Drive it with an IntersectionObserver on a sentinel at the hero's bottom, or a `view()` timeline on the hero. Crafted versions **colour-adapt per section**: each section declares `data-header-theme="dark|light"` and the header swaps tokens when that section is under it (a common Awwwards trait) **[synthesis]**. `mix-blend-mode: difference` on the logo is a cheaper alternative. |
| 3 | **Hide-on-scroll-down / reveal-on-scroll-up (partially persistent)** | CSS `scroll-state(scrolled)` with a JS fallback (code below). NN/g recommends a 300–400 ms slide-in, triggered by a small upward scroll, that completes even if scrolling stops. |
| 4 | **Floating pill / island** | Detached rounded capsule (`border-radius: 999px`), centred or offset, `top: 12–16px`, backdrop blur plus a **solid fallback tint** for contrast. Can morph: full-width bar at page top, contracting into a pill on scroll. Reference: [Aceternity Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar). On mobile the pill often moves to the **bottom** (thumb zone). |
| 5 | **Split nav** | Logo centred, link groups left and right (fashion/editorial), or nav left with utilities (search, cart, account) right. Grid: `grid-template-columns: 1fr auto 1fr` so the logo stays truly centred whatever the group widths. |
| 6 | **Dynamic-Island / notch** | Small capsule that expands into a panel on hover or click, morphing width, height and radius in one spring animation. [Aceternity Notch](https://ui.aceternity.com/components/notch). |
| 7 | **Dock nav** | macOS-style magnifying icon row ([Magic UI Dock](https://magicui.design/docs/components/dock), [Aceternity Floating Dock](https://ui.aceternity.com/components/floating-dock)). Best for portfolios and app-like sites. Fall back to a static bar on touch, where there is no hover. |
| 8 | **Vertical edge nav / rotated text** | Links set vertically on the left or right edge (`writing-mode: vertical-rl`), common in agency portfolios **[synthesis]**. |
| 9 | **Corner nav** | Four items pinned to the four viewport corners (logo TL, menu TR, contact BL, index BR). Brutalist and editorial **[synthesis]**. |
| 10 | **Announcement bar + header stack** | Dismissible promo strip above the nav (a Navbar Gallery category). Make the strip collapse away on scroll so the stack doesn't eat vertical space. |
| 11 | **Search-first header** | Large search field as the hero of the header (e-commerce, docs). Pair with a Cmd+K palette (see [2g](#2g-command-palette-cmdctrlk)). |
| 12 | **Magnetic / hover-indicator nav** | A blob or underline slides between links (one shared element positioned with JS rects, CSS anchor positioning, or View Transitions). Links nudge toward the cursor (magnetic) **only on `(hover: hover) and (pointer: fine)`**. |
| 13 | **Text-roll links** | On hover each label's letters roll up and are replaced by a duplicate (two stacked spans, `translateY(-100%)` with a per-letter `transition-delay`). The single most-used "crafted" microinteraction on Awwwards sites **[synthesis]**. |

**Crafted vs generic.**
- Generic: centred logo, five links, a "Get started" gradient button, a translucent glass bar with low contrast, everything fading in at once. Template tells **[synthesis]**: a floating glassmorphism pill with `backdrop-blur` and white-on-photo text at 3:1 contrast used on every site regardless of brand; centred logo + five links + purple-to-blue gradient "Get Started" + moon icon for dark mode; lorem-ipsum-style labels ("Solutions", "Platform", "Resources") with no information scent; emoji or Lucide icons beside every link.
- Crafted: a deliberate type scale (nav at body size or smaller, tracking adjusted, tabular numerals in counters); state changes tied to scroll position; **one** signature microinteraction used consistently (text-roll, sliding indicator); an active-page indicator; a visible keyboard focus style designed with the same care as hover; the header theme following section colour.

**Desktop vs mobile.**
- Desktop (≥1024px): show top-level links. NN/g found hidden navigation on desktop used in 27% of cases vs 48% visible.
- Below about 1024px, collapse into a menu button. If there are four or fewer items, keep them visible on mobile too.
- Mobile header height is about 56–64px. Hide-on-scroll matters most on mobile, where vertical space is scarce.

**Accessibility.**
- Correct pattern: `<header>` + `<nav aria-label="Main">` + `<ul>` of links, `aria-current="page"`. Avoid `role="menubar"` on site nav.
- With more than one nav landmark, each needs a **unique label** (e.g. `aria-labelledby` pointing at a heading). Two navs with identical link sets share the same label ([APG Navigation landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html)).
- Never hide the header while something inside has focus or a menu is open (see code).
- NN/g sticky-header rules ([NN/g](https://www.nngroup.com/articles/sticky-headers/)): use only if content is needed often; partially persistent with a reveal from a small upward scroll, 300–400 ms slide that completes even if scrolling stops; keep it short; touch targets about 1 cm and text near 16pt; **opaque**, contrasting backgrounds (avoid translucent headers); minimal animation; no delayed "stalker" menus; no redundant second sticky bar.
- Hidden vs visible navigation evidence ([NN/g Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/)): study of 179 participants on 6 sites. Hidden nav used 27% of the time on desktop vs 48% visible and 50% combo; on mobile 57% hidden vs 86% combo. Discoverability dropped by more than 20% with hidden nav. Task time at least 39% longer on desktop and 15% longer on mobile vs combo. Difficulty 2.6 (hidden) vs 2.3 (combo) vs 2.1 (visible). Recommendation: **desktop, avoid hidden nav**; **mobile: show top-level links if there are four or fewer**, otherwise hide some but add in-page links to key content. Small icons have low salience and low information scent.

**Code**

Hide-on-scroll, CSS first, JS fallback (sketch; CSS part from [una.im](https://una.im/scroll-state-scrolled)):

> ⚠ Untested reference snippet (sketch).

```css
html { container-type: scroll-state; }
.site-header { position: sticky; top: 0; transition: translate .3s cubic-bezier(.2,.8,.2,1); }
@container scroll-state(scrolled: bottom) { .site-header { translate: 0 -100%; } }
@container scroll-state(scrolled: top)    { .site-header { translate: 0 0; } }
/* never hide while something inside has focus or a menu is open */
.site-header:focus-within, .site-header:has([aria-expanded="true"]) { translate: 0 0 !important; }
@media (prefers-reduced-motion: reduce) { .site-header { transition: none; } }
```

```js
// Fallback where scroll-state(scrolled) is unsupported
if (!CSS.supports('container-type: scroll-state')) {
  let last = scrollY, ticking = false; const h = document.querySelector('.site-header');
  addEventListener('scroll', () => { if (ticking) return; ticking = true;
    requestAnimationFrame(() => { const y = scrollY, d = y - last;
      if (Math.abs(d) > 8) { h.dataset.hidden = d > 0 && y > h.offsetHeight; last = y; }
      ticking = false; }); }, { passive: true });
}
```

Shrink on scroll with no JS (sketch):

> ⚠ Untested reference snippet (sketch).

```css
@supports (animation-timeline: scroll()) {
  .site-header { animation: shrink linear both; animation-timeline: scroll(root); animation-range: 0 120px; }
  @keyframes shrink { to { padding-block: .5rem; background: var(--bg); box-shadow: 0 1px 0 var(--line); } }
}
```

**Libraries & tools.**
- [Aceternity UI](https://ui.aceternity.com/components): [Floating Navbar](https://ui.aceternity.com/components/floating-navbar) (hides on scroll down, reappears on scroll up); [Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) (width changes as you scroll); [Floating Dock](https://ui.aceternity.com/components/floating-dock) (macOS dock); [Navbar Menu](https://ui.aceternity.com/components/navbar-menu) (children animate on hover, for mega menus); [Notch](https://ui.aceternity.com/components/notch) (floating notch at top or bottom that animates the active item). Blocks: `/blocks/navbars`.
- [Magic UI Dock](https://magicui.design/docs/components/dock): macOS dock magnification (React + Tailwind + Framer Motion). Props: `iconSize` 40, `iconMagnification` 60, `iconDistance` 140, `direction`, `disableMagnification`. Install: `pnpm dlx shadcn@latest add @magicui/dock`.
- Radix NavigationMenu / shadcn `navigation-menu` for the nav itself (see [2d](#2d-mega-menu)).
- Effect libraries (Aceternity, Magic UI, Uiverse) mostly ship hover and scroll motion without `prefers-reduced-motion` handling or ARIA state; wrap them in your own accessible shell.

**Inspiration links.**
- [Navbar Gallery](https://www.navbar.gallery/) (by Christina Liubynska, sponsored by Mobbin, 38 pages of examples when visited; grew out of the footer.design idea, per [Product Hunt](https://www.producthunt.com/products/navbar-gallery)). Categories: Static/Sticky, Dropdown/Flyout, Mega Menu, Side Bar, Search Bar, Announcement Bar, Full Screen Menu, Breadcrumbs (plus Tabs and Progress bars as icon labels). Each example has a detail page at `navbar.gallery/navbar/<name>`.
- Navbar Gallery featured examples: [Supaste](https://www.supaste.com/), [Chesapeake Plywood](https://chesapeakeplywood.com/), [Velt](https://velt.dev/), [Clonix](https://clonix.framer.website/), [Aveon](https://aveon.framer.website/), [Orchid](https://orchid.ai/), [Cloudflare](https://www.cloudflare.com/), [Consensys](https://consensys.io/), [Big Dirty Agency](https://www.bigdirty.agency/), [Hosier Brown](https://hosierbrown.framer.website/), [Browserbase](https://www.browserbase.com/), [Bud](https://bud.app/).
- Navbar Gallery style-filtered pages: simple, illustrative, typographic/typography, gradient, animated, cool, e-commerce, iOS app, Windows app, podcast, sports. E.g. [animated](https://www.navbar.gallery/style/animated), [typographic](https://www.navbar.gallery/style/typographic), [e-commerce](https://www.navbar.gallery/style/e-commerce).
- Not fetched, starting points to check: https://www.awwwards.com/websites/navigation/ (unverified URL), https://godly.website, https://mobbin.com.

**Caveats & verification status.**
- `scroll-state(scrolled)` is rolling out in **Chrome 144**; `stuck`, `snapped` and `scrollable` landed in **Chrome 133** ([Una Kravets](https://una.im/scroll-state-scrolled)). `scrolled` is **not Baseline**, so ship a fallback. The CSSWG explainer documents a scroll-driven-animation and transition-delay workaround for direction detection; a 2025 CSSWG thread debated whether the state should reset to `none` when scrolling stops ([modern-css.com](https://modern-css.com/auto-hiding-header-without-scroll-listeners/); [CSSWG explainer](https://drafts.csswg.org/css-conditional-5/scroll_state_explainer); [csswg mailing list](https://lists.w3.org/Archives/Public/public-css-archive/2025Apr/0795.html); [ics.media](https://ics.media/en/entry/250602/)).
- Scroll-driven animations shipped in Chromium in 2023. Safari 26 support is reported but was **not verified** in this research; check caniuse.
- Outdated: jQuery `$(window).scroll` hide/show header → `@container scroll-state(scrolled)` (Chrome 144+) with an rAF-throttled passive listener fallback. JS sticky detection (`.is-stuck` via scroll math) → `scroll-state(stuck: top)` (Chrome 133+). Translucent sticky headers → opaque or solid-tint headers.
- Variants 2 (section theming), 8, 9 and 13 are synthesis. Stripe, Linear, Raycast and Vercel nav behaviours are described from background knowledge, not fetched.

---

## 2. Menu types

**What & when.** The mechanisms that reveal navigation: menu buttons, full-screen overlays, off-canvas drawers, mega menus, dropdowns, radial menus and command palettes. Award-style ("Awwwards-style") menu motion traces back to the Codrops demos listed under Inspiration.

**Variants**

### 2a. Hamburger / menu button

Use only where space forces it (mobile, or intentionally minimal portfolios).

| # | Variant | Spec |
|---|---|---|
| 1 | 3-line to X morph | Lines rotate ±45°, middle line scales to 0. |
| 2 | **2-line asymmetric** | Bars of different widths. |
| 3 | **Text label "Menu" / "Close"** that rolls | NN/g evidence favours labelled icons. |
| 4 | SVG path morph | [Codrops AnimatedMenuIcon](https://github.com/codrops/AnimatedMenuIcon). |
| 5 | Dot grid | 9 dots, for app launchers. |
| 6 | Circular button with magnetic hover | Fine pointers only. |
| 7 | **Counter or bubble** that expands into the overlay | The button becomes the clip-path origin. |

It must be a `<button aria-expanded aria-controls>`, never a `<div>`. Hit area ≥44×44px even if the icon is 20px.

### 2b. Full-screen overlay menu

Takes over the viewport with giant type (6–12vw), often with an image preview per hovered item.

| Variant | Spec / reference |
|---|---|
| **Circular clip-path reveal from the button** | `clip-path: circle(0 at var(--x) var(--y))` → `circle(150% at ...)`. |
| **Ease-reverse clip menu** | [EaseReverseClipMenu](https://github.com/codrops/EaseReverseClipMenu) (2026). Reverse easing that makes reversed animations feel "smoother, snappier, and more intentional". |
| **Staggered line-mask reveal** | Each link in an `overflow:hidden` wrapper, translateY 100% → 0 with a 40–60ms stagger. |
| **Marquee rows on hover** | [MarqueeMenu](https://github.com/codrops/MarqueeMenu), K72-style. |
| **Letter shuffle** | [LetterShuffleMenu](https://github.com/codrops/LetterShuffleMenu). |
| **Image tiles assemble or disperse** | [ImageTilesMenu](https://github.com/codrops/ImageTilesMenu). |
| **Menu items morph into a grid** | [MenuToGrid](https://github.com/codrops/MenuToGrid), GSAP Flip. |
| **3D perspective push-back of the page** | PerspectivePageViewNavigation (`https://github.com/codrops/PerspectivePageViewNavigation`). |
| **Split panels** | Slide in from top and bottom halves. |
| **SVG wave or blob overlay** | [Theodore](https://github.com/codrops/Theodore). |
| **Cursor-follow image preview** | [RapidImageHoverMenuEffects](https://github.com/codrops/RapidImageHoverMenuEffects). |
| **Numbered index list** | 01–05 with tabular numerals plus a one-line descriptor per item. |

Implementation: use `<dialog>` with `showModal()`, which gives a focus trap, Esc and an inert background for free. Animate entry with `@starting-style` and `transition-behavior: allow-discrete` on `display` and `overlay` **[synthesis; Baseline status not verified here]**.

### 2c. Off-canvas drawer

Side panel, left or right: **280–420px on desktop, 85–90vw on mobile, never 100%** so the scrim stays tappable.

| Variant | Spec / reference |
|---|---|
| **Overlay drawer** | Slides over the content. |
| **Push** | Content translates with it. |
| **Reveal** | Content slides away to reveal a drawer beneath. |
| **Scale-down / 3D rotate** of the page | Codrops OffCanvasMenuEffects (`https://github.com/codrops/OffCanvasMenuEffects`). |
| **Multi-level push** | Back button and breadcrumb (MultiLevelPushMenu, MultiLevelMenu). |
| **Bottom sheet** on mobile | Drag handle and snap points; `scroll-snap` inside a scroll container is a JS-light approach **[synthesis]**. |

Use `<dialog>` or `inert` on the rest of the page, `overscroll-behavior: contain` on the panel, and `scrollbar-gutter: stable` on `html` so locking scroll doesn't shift layout.

### 2d. Mega menu

A big two-dimensional panel of grouped links for large sites ([NN/g](https://www.nngroup.com/articles/mega-menus-work-well/)).

| # | Variant | Spec |
|---|---|---|
| 1 | **Columnar** | Grouped links with headings. |
| 2 | **Featured card + links** | Image or promo on the right. |
| 3 | **Tabbed mega menu** | Vertical categories on the left switch the right pane, Stripe-style **[synthesis]**. |
| 4 | **Morphing single panel** | One floating panel resizes and slides between triggers (Radix Viewport plus `data-motion`; Stripe's famous nav) **[Radix cited; Stripe attribution is synthesis]**. |
| 5 | **Icon + description rows** | SaaS product menus. |
| 6 | **Full-width "flyout" with search** | E-commerce; NN/g says keep the main search visible outside the menu. |
| 7 | **Image-led category tiles** | Fashion. |
| 8 | **Mobile drill-down** | Converts to a stacked drill-in with a back button. |

Timing and behaviour:
- **NN/g:** hover delay about **0.5 s** before opening, display within **0.1 s**, stay open **0.5 s** after the pointer leaves, hide in under **0.1 s**. Support diagonal movement toward the panel. Group options (card sorting), most important group top left. No form widgets inside. Keep search visible outside. Use strong borders. Simplest accessible approach: top-level items link to a plain HTML page listing all the options.
- **Radix** uses shorter defaults: `delayDuration` **200 ms** open delay and `skipDelayDuration` **300 ms** when moving between triggers. The two sources differ; NN/g's 0.5 s is conservative, and 150–300 ms is common in production UI.
- Implement a **"safe triangle"** so diagonal moves toward the panel don't close it.
- Radix `Viewport` exposes `--radix-navigation-menu-viewport-width/height` CSS vars, so the panel can animate size as content changes. `data-motion="from-start|from-end|to-start|to-end"` gives directional slide between panels. `Indicator` tracks the active trigger ([Radix](https://www.radix-ui.com/primitives/docs/components/navigation-menu)).

### 2e. Dropdown

For small sets (≤7–10 links). Use the **disclosure** pattern for nav, not `role=menu`.
- Modern positioning: the **Popover API** (`popover` attribute with `popovertarget`) gives top-layer rendering and light-dismiss.
- **CSS anchor positioning** (`anchor-name`, `position-anchor`, `position-try-fallbacks: flip-block`) handles placement without JS. Availability in all engines was not verified here, so keep the Floating UI fallback.
- Crafted touches: the panel scales from its trigger (`transform-origin` at the trigger), a 120–180ms ease-out, and a caret that tracks the trigger.

### 2f. Radial / circular menu

Items arranged on an arc around a FAB or cursor. Good for creative tools, map or canvas apps and games. **Not for primary site nav.** Position the items with CSS trig (code below). Accessibility: still a disclosure button plus a list of buttons or links; arrow keys can map to around-the-circle order; keep ≥44px targets with gaps.

### 2g. Command palette (Cmd/Ctrl+K)

A keyboard-first search-and-act modal.

| # | Variant | Spec |
|---|---|---|
| 1 | **Linear/Raycast style** | Centred modal with grouped results, shortcut hints on the right, footer of key legends. |
| 2 | **Nested pages** | Enter drills into "Change theme…" with breadcrumb chips in the input. |
| 3 | **Inline header search that expands** into the palette | |
| 4 | **AI-hybrid** | Shows "Ask AI about '…'" as the last result **[synthesis]**. |
| 5 | **Docs search** | Algolia DocSearch-style with recent searches **[synthesis]**. |

- Always show a visible trigger button ("Search… ⌘K"), because the shortcut alone can't be discovered.
- Ctrl+K is a browser shortcut in Chrome and Firefox (focus the address bar or search), so `preventDefault` only while the page has focus, and also offer `/` **[synthesis]**.

**Crafted vs generic.**
- Generic tells **[synthesis]**: every element fading up 20px at once on load with no choreography and no origin; menus that fade in instead of growing from their trigger; hamburgers on desktop with three items; icon-only nav without labels; a mega menu that is just a long dropdown, or one that opens on hover with zero delay and closes when the cursor crosses a gap.
- Crafted **[synthesis]**: motion with origin and continuity (an element morphs instead of a new element appearing, via View Transitions API, GSAP Flip, Radix Viewport; menus open from the button). Easing personality: custom curves (`cubic-bezier(.2,.8,.2,1)` for UI, spring overshoot for playful brands), faster exits than entries (EaseReverseClipMenu's whole premise, per its README); open about 250–450ms, close about 150–250ms. Typographic voice: big-type overlays with tight tracking, numbered indices.
- **Mistakes across menus:** hover-only opening; no Esc; focus not returned to the trigger; body scrolls behind the overlay; animating `height`/`left` instead of transforms; a 600ms+ open animation blocking interaction; menu links not focusable until the animation completes.
- NN/g mega-menu mistakes: hard-to-scan labels or labels repeating the same first word; undifferentiated groups; tiny touch targets; finicky show/hide that hurts motor-impaired users; faint cues for off-screen content; duplicate options; overloading; form widgets inside the menu.

**Desktop vs mobile.**
- Desktop: avoid hidden (hamburger) nav; NN/g found discoverability drops by more than 20% and tasks take at least 39% longer ([NN/g](https://www.nngroup.com/articles/hamburger-menus/)). Mega menus open on click or tap plus hover-intent with delay.
- Mobile: hamburger acceptable; drawer 85–90vw; bottom sheet with drag handle; mega menu converts to drill-down with back button. Use `100dvh`/`100svh`, not `100vh`, for full-height menus.
- Lock background scroll while overlays are open (`<dialog>` modal, or `overflow:hidden` on `html` plus `scrollbar-gutter: stable`), and use `overscroll-behavior: contain` in panels **[synthesis]**.

**Accessibility.**
- **Disclosure navigation** ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)): each top-level item is a `<button aria-expanded aria-controls>` toggling a list of links. Current page link carries `aria-current="page"`. Tab/Shift+Tab move through buttons and links. Enter/Space toggle. **Esc closes and returns focus to the button.** Arrow, Home and End keys are optional extras. The example **does not use `role=menu`**, because menu roles make assistive tech expect complex application-menu behaviour. Closing on Esc and on focus loss supports WCAG 1.4.13 (Content on Hover or Focus).
- **Radix NavigationMenu** ([Radix](https://www.radix-ui.com/primitives/docs/components/navigation-menu)): parts Root, List, Item, Trigger, Content, Viewport, Indicator, Link, Sub. Follows the `navigation` role and **deliberately does not use `role="menu"`** (reserved for desktop-app menus). Keyboard: Enter/Space open, arrows move between triggers, ArrowDown enters content (horizontal), Home/End, Esc closes and returns focus. Use `NavigationMenu.Link` for every link so `aria-current` and keyboard handling stay consistent.
- **Hamburger / overlay / drawer:** `<button aria-expanded aria-controls>` opening a `<dialog>` (modal: focus trap, Esc, inert background); restore focus on close. Wrong: focus left behind the overlay; body still scrollable; no Esc.
- **Action menu ("⋯" more):** APG Menu Button (`role=menu`/`menuitem`, arrows, typeahead). Never use this pattern for site links.
- **Command palette = ARIA combobox** ([CnCommandPalette docs](https://nextcloud-vue.conduction.nl/docs/components/cn-command-palette/); [buildmvpfast](https://www.buildmvpfast.com/blog/how-to-add-cmd-k-command-palette-saas-2026)): the input keeps DOM focus; `aria-activedescendant` tracks the highlighted option; input or wrapper has `role="combobox"`, `aria-expanded`, `aria-controls` (listbox id), `aria-haspopup="listbox"`; input has `aria-autocomplete="list"`. Arrows move, Enter selects, Esc closes and returns focus. Wrong: moving DOM focus to each result; no visible trigger.
- Radial menu: disclosure button plus list of buttons/links; ≥44px targets with gaps.

**Code**

Radial menu positioning with CSS trig (sketch):

> ⚠ Untested reference snippet (sketch).

```css
.radial li { --a: calc(var(--i) * (180deg / (var(--n) - 1)) - 90deg);
  translate: calc(cos(var(--a)) * var(--r)) calc(sin(var(--a)) * var(--r));
  transition: translate .35s cubic-bezier(.3,1.4,.5,1) calc(var(--i) * 30ms); }
.radial:not(.open) li { translate: 0 0; }
```

**Libraries & tools** (library map is **[synthesis, not individually verified]** except Radix and cmdk):

| Need | Picks | Notes |
|---|---|---|
| Mega menu / site nav (React) | Radix NavigationMenu, shadcn `navigation-menu` (Radix-based), React Aria (no dedicated nav-menu; compose `Disclosure`/`Link`), Ark UI | Radix Viewport gives the "morphing panel" effect for free |
| Dropdown / popover | Popover API + CSS anchor positioning (native), Floating UI, Radix Popover, Headless UI `Popover` | Use `Menu`/`DropdownMenu` components only for *action* menus |
| Command palette | `cmdk`, shadcn `command`, React Aria `Autocomplete`/`ComboBox`, kbar, Ark UI Combobox | Must be a combobox and listbox, not a menu |
| Drawer / sheet | Native `<dialog>`, Vaul (drawer with drag and snap points), shadcn `sheet`/`drawer`, Radix Dialog | Vaul is the reference for mobile bottom sheets |

- **cmdk**: unstyled composable primitives (Command, Input, List, Item, Group, Dialog) with automatic filtering and sorting. `Command.Dialog` wraps Radix Dialog for focus trap and Esc ([openapps.pro cmdk listing](https://openapps.pro/packages/cmdk)). Caveat: these are secondary or vendor pages, and performance or axe claims on an "agent pack" page were unmeasured ([Linear-style palette pack](https://agentworkspace-flax.vercel.app/packs/linear-command-palette)).
- [Aceternity Navbar Menu](https://ui.aceternity.com/components/navbar-menu) (children animate on hover, for mega menus).
- **Codrops** GitHub org ([github.com/codrops](https://github.com/Codrops)): dozens of MIT-licensed menu and nav demos (below).

**Inspiration links: Codrops (Tympanus) menu demos** (repos verified via the GitHub API, with creation date and the repo's own description):
- 2026-04-22 **EaseReverseClipMenu**: a playful GSAP menu exploring how `easeReverse` makes reversed UI animations feel "smoother, snappier, and more intentional". [Demo](https://tympanus.net/Development/EaseReverseClipMenu/), [article](https://tympanus.net/codrops/?p=114731), [repo](https://github.com/codrops/EaseReverseClipMenu). Author Tomoya Okada (per an [archive listing](https://feeds.marmits.com/archive-rss-206-2026-04.html)).
- 2025-02 "Menu Nav GSAP" by Moussa Mamadou, listed on the Codrops menu tag; late 2025 also had a macOS-dock-effect GSAP demo ([Codrops demos tagged menu (search snippet)](https://tympanus.net/codrops/demos/page/2/?tag=menu); [author page](https://tympanus.net/codrops/hub/author/moussa_mamadou)). The tag page returned 403, so details are from the search snippet only.
- 2023 [ImageTilesMenu](https://github.com/codrops/ImageTilesMenu): image tiles transform into a full image when a menu item is clicked.
- 2022 [MenuToGrid](https://github.com/codrops/MenuToGrid): menu-row thumbnails animate into a content-preview grid with GSAP Flip.
- 2022 [LetterShuffleMenu](https://github.com/codrops/LetterShuffleMenu): letters of a big word shuffle to become the first letter of each menu item.
- 2022 [ExpandingRoundedMenu](https://github.com/codrops/ExpandingRoundedMenu): expanding menu with a cover "unreveal" in the background.
- 2021 [Theodore](https://github.com/codrops/Theodore): SVG overlay plus an infinite CSS background animation.
- 2021 [MenuThumbStackAnimation](https://github.com/codrops/MenuThumbStackAnimation): vertical image stack expands into a horizontal line.
- 2021 [MarqueeMenu](https://github.com/codrops/MarqueeMenu): recreation of the K72 (by Locomotive) marquee-on-hover menu.
- 2021 [InlineToMenuLink](https://github.com/codrops/InlineToMenuLink): inline text links morph into menu links.
- 2021 [3DLettersMenuHover](https://github.com/codrops/3DLettersMenuHover): 3D letters plus an image hover.
- 2020: [InlineMenuLayout](https://github.com/codrops/InlineMenuLayout) (inline menu with a gallery preview panel), [MenuFullGrid](https://github.com/codrops/MenuFullGrid) (menu plus background image grid that animates into an inner page), [RapidImageHoverMenuEffects](https://github.com/codrops/RapidImageHoverMenuEffects) (images flash per item on hover), [ScrollLoopMenu](https://github.com/codrops/ScrollLoopMenu) (infinitely scrolling menu built from cloned items), [CSSMarqueeMenu](https://github.com/codrops/CSSMarqueeMenu), [DistortedMenuLinkEffects](https://github.com/codrops/DistortedMenuLinkEffects) (SVG filter distortion).
- 2018–2019: [DraggableMenu](https://github.com/codrops/DraggableMenu) (drag for a thumbnail preview), [FullscreenHoverLoop](https://github.com/codrops/FullscreenHoverLoop), [MultiboxMenu](https://github.com/codrops/MultiboxMenu) (grid "multibox" reveal), [SlideOutBoxMenu](https://github.com/codrops/SlideOutBoxMenu) (irregular grid of sliding boxes), [GridMenu](https://github.com/codrops/GridMenu).
- Older but instructive (repos at `https://github.com/codrops/<Name>`): **LineMenuStyles** (2016, the line as a design element), **MenuHoverEffects** (2017), **ExpandingBarMenus** (2017, tab-like nav that expands a content area), **MultiLevelMenu** (2015, multi-level with breadcrumb and back button), **AnimatedMenuIcon** (2015, SVG hamburger morph), **OffCanvasMenuEffects** (2014, SVG-path off-canvas), **PerspectivePageViewNavigation** (2013, page pushed back in 3D to reveal the menu), **MultiLevelPushMenu** (2013).
- Navbar Gallery categories Dropdown/Flyout, Mega Menu, Search Bar, Full Screen Menu ([navbar.gallery](https://www.navbar.gallery/)).

**Caveats & verification status.**
- Codrops demo listing pages returned **403**, so demos after mid-2025 (other than EaseReverseClipMenu and the snippet-listed "Menu Nav GSAP") could not be enumerated. Check https://tympanus.net/codrops/demos/?tag=menu manually.
- APG Menu Button and Dialog (Modal) pages were not fetched; descriptions are from background knowledge consistent with the APG.
- Browser support for CSS anchor positioning and `@starting-style` in Safari and Firefox as of November 2026 was **not verified**. Check caniuse before relying on them without fallbacks.
- Outdated → modern: `role="menubar"` site nav → disclosure navigation; custom modal div plus focus-trap library → `<dialog>.showModal()` plus `inert`; Popper.js → Popover API plus CSS anchor positioning (Floating UI as fallback); `100vh` mobile menus → `100dvh`/`100svh`; `-webkit-overflow-scrolling: touch` / `body { position: fixed }` scroll-lock hacks → `overscroll-behavior: contain`, `scrollbar-gutter: stable`; hover-only mega menus → click or tap plus hover-intent with delay and keyboard disclosure.
- Stripe/Linear/Raycast attributions are synthesis.

---

## 3. Sidebars and side navigation

**What & when.** Apps, docs and dashboards with more than about 7 top-level sections, or deep hierarchies. NN/g recommends visible left-side navigation as a desktop alternative to top nav ([NN/g Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/)).

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | **Docs tree** | Collapsible sections, active trail highlighted, persisted per user (Stripe/Vercel docs style **[synthesis]**). |
| 2 | **Collapsible rail** | 240–280px expanded → 64–72px icon rail with tooltips; toggled or expanding on hover ([Aceternity Sidebar](https://ui.aceternity.com/components/sidebar)). |
| 3 | **Dual sidebar** | Narrow workspace/app switcher plus a wider section list (Slack/Discord **[synthesis]**). |
| 4 | **Floating inset sidebar** | Rounded card inset 8–12px from the viewport edge (shadcn "inset" variant **[synthesis]**). |
| 5 | **Sticky in-page sidebar** | For long articles, paired with a TOC (see [9](#9-scroll-progress-section-indicators-and-toc-nav)). |
| 6 | **Resizable sidebar** | Drag handle with `role="separator" aria-orientation="vertical" aria-valuenow` **[synthesis]**. |
| 7 | **Mobile: off-canvas drawer** | Or conversion to a bottom tab bar. |
| 8 | **Command-first sidebar** | Search or Cmd+K at the top. |

**Crafted vs generic.** Crafted: proper indentation rhythm (12–16px per level); an active item that fills **and** marks the parent trail; counts or badges in tabular numerals; a collapse animation that doesn't reflow content (`grid-template-columns` transition, or `interpolate-size: allow-keywords` **[Chromium-only at time of writing, synthesis]**).

**Desktop vs mobile.** Desktop: visible left sidebar (rail or expanded). Mobile: off-canvas drawer (see [2c](#2c-off-canvas-drawer)) or convert to a bottom tab bar (see [4](#4-mobile-bottom-tab-bars)).

**Accessibility.**
- `<nav aria-label="Docs">` with nested `<ul>`. Collapsible groups are disclosure buttons (`aria-expanded`). Current page gets `aria-current="page"`.
- Use the APG **tree view** pattern only for genuine file-tree apps, because it changes the keyboard model (arrow keys, typeahead). Plain docs nav stays links and buttons in Tab order. Wrong: `role=tree` on ordinary docs nav.

**Code.** No dedicated snippet in the notes. Editor's note: the collapse technique is a `grid-template-columns` transition (e.g. between the 240–280px and 64–72px widths above); the resizable handle uses `role="separator" aria-orientation="vertical" aria-valuenow`.

**Libraries & tools.** shadcn `sidebar` (collapsible to icon, floating and inset variants), [Aceternity Sidebar](https://ui.aceternity.com/components/sidebar) (expands on hover, mobile support) and Aceternity `/blocks/sidebars`, Untitled UI sidebars **[synthesis, not fetched]**.

**Inspiration links.** [Navbar Gallery "Side Bar" category](https://www.navbar.gallery/).

**Caveats & verification status.** APG Tree View page not fetched (background knowledge). shadcn, Untitled UI pages not fetched. `interpolate-size` Chromium-only at time of writing (synthesis; not verified for Safari/Firefox Nov 2026).

---

## 4. Mobile bottom tab bars

**What & when.** App-like mobile web (PWA, dashboard, social, commerce) with 3–5 equal top-level destinations. Bottom placement suits thumbs **[synthesis: thumb-zone research by Steven Hoober is widely cited but was not fetched]**.

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | **Classic 5-up** | Icon plus label; filled vs outline icon for the active state. |
| 2 | **Pill active indicator** | Material 3 style, 64×32 pill behind the active icon **[synthesis]**. |
| 3 | **Floating tab bar** | Detached from the edges with rounded corners. iOS 26 "Liquid Glass" made a floating, minimise-on-scroll tab bar the platform norm (**unverified**: HIG page did not render). |
| 4 | **Centre FAB notch** | Raised "+" for create. |
| 5 | **Sliding blob indicator** | One element moves between tabs, spring physics. |
| 6 | **Minimise on scroll** | Shrinks to icon-only or a single active pill while scrolling down, restores on scroll up (re-use `scroll-state(scrolled)`). |
| 7 | **Search tab separated** | To the right as its own circular button (iOS 26 pattern, **unverified**). |
| 8 | **Label-on-active-only** | Inactive tabs icon-only, the active one expands to show its label; only when icons are unambiguous. |
| 9 | **Tablet: converts to a navigation rail** | On the left at about ≥600–840px. |

**Crafted vs generic.** Editor's note: the notes give no separate crafted/generic list here; the crafted signals are the sliding indicator (variant 5), minimise-on-scroll (6) and correct safe-area handling. Badges need real text.

**Desktop vs mobile.**
- Mobile only; at tablet widths (≈600–840px) convert to a navigation rail.
- Material 3 **[synthesis, unverified]**: navigation bar on compact (<600dp) with 3–5 destinations, navigation rail on medium and expanded. M3 Expressive (2025) reportedly shortened the bar and favoured an expandable rail over the modal drawer (**unverified**, M3 page did not render).
- Touch targets: WCAG 2.2 SC 2.5.8 (AA) minimum **24×24 CSS px**, or undersized targets spaced so a 24px circle centred on each doesn't intersect others; inline text links exempt; SC 2.5.5 (AAA) is the stricter enhanced version ([W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). Platform guidance **44×44pt (Apple HIG)** and **48×48dp (Material)** **[synthesis]**; NN/g's "≈1 cm" sits in the same range. Use 44–48px for primary nav, ≥8px between adjacent targets.
- Thumb zone **[synthesis]**: primary actions in the bottom third (bottom tab bars, bottom sheets, bottom-placed floating pills). Destructive or rare actions belong at the top.
- Use `100dvh`/`100svh` instead of `100vh` for full-height layouts (`100vh` jumps when mobile browser chrome shows or hides) **[synthesis]**.
- Hide the tab bar while the on-screen keyboard is open (VirtualKeyboard API or `visualViewport` resize) **[synthesis]**.

**Accessibility.**
- It is navigation, not tabs: `<nav aria-label="Primary">` with links and `aria-current="page"`.
- Do **not** use `role="tablist"` for route changes; NN/g says don't mix in-page tabs and navigation tabs.
- Badges need text ("Inbox, 3 unread") via visually hidden text.

**Code** (source: [MDN env()](https://developer.mozilla.org/en-US/docs/Web/CSS/env))

`env(safe-area-inset-top|right|bottom|left)` gives the insets from notches and rounded corners (0 on rectangular viewports). Pad fixed bottom bars with `calc(1em + env(safe-area-inset-bottom, 0px))` and pad `main` to match.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

```css
.tabbar { position: fixed; inset: auto 0 0 0; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr;
  padding: .5rem .5rem calc(.5rem + env(safe-area-inset-bottom, 0px)); }
main { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px)); }
.tabbar a { min-height: 48px; display: grid; place-items: center; gap: 2px; font-size: 12px; }
```

**Libraries & tools.** Editor's note: none named specifically for tab bars in the notes; Magic UI Dock / Aceternity Floating Dock are the nearest (see [1](#1-headers-and-navbars)).

**Inspiration links.** [Navbar Gallery iOS app style](https://www.navbar.gallery/) (style filter "iOS app").

**Caveats & verification status.** Apple HIG (tab bars) and Material 3 (navigation bar) pages returned no body content. Their numeric guidance (44pt, 48dp, 3–5 destinations, breakpoints, iOS 26 and M3 Expressive changes) is from background knowledge and should be verified. Steven Hoober's thumb-zone research was not fetched.

---

## 5. Breadcrumbs

**What & when.** Hierarchies three or more levels deep. Skip them on flat or linear sites ([NN/g Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/)).

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | Classic | `Home / Category / Page` with CSS separators (`li + li::before { content: "/"; }`, or a chevron mask-image). |
| 2 | **Collapsed middle** | `Home / … / Parent / Current`; the ellipsis is a disclosure revealing hidden levels. |
| 3 | **Mobile "back to parent"** | Only `‹ Parent` (NN/g endorses shortening to the last one or two levels on mobile). |
| 4 | **Horizontally scrollable** | Single line with fade masks at the edges (`mask-image: linear-gradient(...)`), auto-scroll to the end. |
| 5 | **Dropdown siblings** | Each crumb has a chevron that opens sibling pages (file-manager style). |
| 6 | **Pill / chip crumbs** | App UIs. |
| 7 | **Breadcrumb inside the header** | Replaces the title on scroll (docs) **[synthesis]**. |
| 8 | **Schema-enhanced** | `BreadcrumbList` JSON-LD for search results **[synthesis]**. |

**Crafted vs generic.** NN/g's 11 guidelines define the correct version ([NN/g](https://www.nngroup.com/articles/breadcrumbs/)): show location (hierarchy), not session history; one canonical path on polyhierarchical sites; ">" or "/" separators; current page last and **not a link**; breadcrumbs supplement global nav and don't replace it; every crumb links to a real page; start with Home (unless Home is in the global nav); skip on flat or linear sites. Mistakes: history-based trails, linking the current page, crumbs pointing to non-pages, breadcrumbs on flat sites, multi-line wrapping on mobile.

**Desktop vs mobile.** Mobile: no multi-line wrapping, targets ≥1 cm × 1 cm, may shorten to the last one or two levels (e.g. just the parent).

**Accessibility.** Breadcrumbs go inside a labelled navigation landmark (`aria-label`/`aria-labelledby`); the current page link gets `aria-current="page"`; no special keyboard behaviour ([APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)). Correct: `<nav aria-label="Breadcrumb"><ol>` + `aria-current="page"`. Wrong: separators read aloud; whole trail non-linked.

**Code** (sketch, follows the APG pattern)

> ⚠ Untested reference snippet (sketch).

```html
<nav aria-label="Breadcrumb"><ol class="crumbs">
  <li><a href="/">Home</a></li><li><a href="/guides/">Guides</a></li>
  <li><a href="/guides/nav/" aria-current="page">Navigation</a></li></ol></nav>
```

```css
.crumbs { display:flex; flex-wrap:nowrap; overflow-x:auto; gap:.5ch; list-style:none; padding:0 }
.crumbs li + li::before { content:"/"; margin-inline-end:.5ch; color:var(--muted); }  /* or content:"/" / "" to silence it */
```

Use `content: "/" / ""` (alt text for generated content) so screen readers don't read the separators **[synthesis]**.

Editor's note: NN/g says the current page is not a link; the APG-pattern sketch above keeps it as a link with `aria-current="page"`. Pick one deliberately.

**Libraries & tools.** None specific in the notes beyond the APG pattern.

**Inspiration links.** [Navbar Gallery "Breadcrumbs" category](https://www.navbar.gallery/); Codrops MultiLevelMenu (breadcrumb + back button).

**Caveats & verification status.** Variants 7 and 8 and the `content: "/" / ""` technique are synthesis.

---

## 6. Tabs and segmented controls

**What & when.** Switching between peer views of the same context **without navigation**. Segmented controls are 2–5 options that change a view or filter (monthly/annual price toggle, list/grid view).

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | **Underline tabs with sliding indicator** | One indicator element whose `translate`/`width` follows the active tab, or animated with View Transitions `view-transition-name: tab-indicator`. |
| 2 | **Pill / segmented** | A "thumb" slides behind the active label (iOS segmented). |
| 3 | **Animated background tabs** | [Aceternity Animated Tabs](https://ui.aceternity.com/components/tabs), shared-layout `layoutId` motion. |
| 4 | **Vertical tabs** | Settings pages; set `aria-orientation="vertical"`. |
| 5 | **Scrollable tab strip** | Mobile, with snap and edge fade. |
| 6 | **Stacked-card / folder tabs** | Look like file folders (editorial or playful). |
| 7 | **Tabs with preview media** | Feature sections where each tab swaps a screenshot; auto-advance progress line under the active tab that pauses on hover or focus. |
| 8 | **Expanding bar tabs** | [Codrops ExpandingBarMenus](https://github.com/codrops/ExpandingBarMenus). |
| 9 | **Segmented price toggle** | "Save 20%" badge attached to the annual option. |

**Crafted vs generic.** NN/g ([Tabs Used Right](https://www.nngroup.com/articles/tabs-used-right/)): at least two selection indicators; no 1px or low-contrast indicators; keep inactive tabs readable; one row only; 1–2-word plain labels, no all caps; tabs above the panel and visually connected to it. Don't use tabs for comparison or critical info, when labels can't be concise, or when mixing in-page tabs with navigation tabs. Mistakes: thin or low-contrast indicators, stacked rows, all-caps labels, branded labels, gaps between tabs and panel, mixing navigation and in-page tabs, hiding critical content in non-default tabs. Generic tell **[synthesis]**: an indicator that jumps instead of sliding, or an active state that is only a colour change.

**Desktop vs mobile.** Accordions on mobile, tabs on desktop; on mobile prefer accordions for long content. Scrollable strip with snap and edge fade for many tabs.

**Accessibility** ([APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)).
- `role="tablist"` (labelled), `role="tab"` with `aria-selected` and `aria-controls`, `role="tabpanel"` with `aria-labelledby`, `aria-orientation="vertical"` for vertical lists.
- Tab enters on the active tab; Tab again leaves to the panel. Left/Right arrows wrap (Up/Down for vertical; Up/Down are *not* captured for horizontal lists). Home/End optional. Delete optional for closable tabs.
- **Automatic activation** only when panels display without noticeable latency, otherwise **manual activation** (Enter/Space).
- A panel with no focusable first element gets `tabindex="0"`.
- Wrong: tabs that are actually page links.
- Segmented control: radio group (`fieldset` + radios) or toggle-button group with `aria-pressed`. Wrong: div pills with no state. For a segmented control that filters a view without panels, a **radio group** (`<fieldset>` with `<input type=radio>` styled as segments) is simpler and more correct than tabs **[synthesis]**.

**Code** — roving tabindex plus automatic activation (sketch, follows the APG keyboard model)

> ⚠ Untested reference snippet (sketch).

```js
const list = document.querySelector('[role=tablist]'); const tabs = [...list.querySelectorAll('[role=tab]')];
list.addEventListener('keydown', e => {
  const i = tabs.indexOf(document.activeElement); let n = null;
  if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
  if (e.key === 'ArrowLeft')  n = (i - 1 + tabs.length) % tabs.length;
  if (e.key === 'Home') n = 0; if (e.key === 'End') n = tabs.length - 1;
  if (n !== null) { e.preventDefault(); select(tabs[n]); tabs[n].focus(); }
});
function select(t){ tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
  document.getElementById(x.getAttribute('aria-controls')).hidden = !on; }); }
```

**Libraries & tools** **[synthesis, not fetched]**: Radix Tabs, React Aria Tabs/ToggleButtonGroup, Ark UI Tabs/SegmentGroup, Headless UI Tab. Ark/Park UI SegmentGroup is a true radio-based segmented control. [Aceternity Animated Tabs](https://ui.aceternity.com/components/tabs).

**Inspiration links.** [Codrops ExpandingBarMenus](https://github.com/codrops/ExpandingBarMenus); Navbar Gallery "Tabs" icon label ([navbar.gallery](https://www.navbar.gallery/)).

**Caveats & verification status.** Library list from background knowledge. See also the segmented control in [actions-inputs.md](actions-inputs.md) (radio as segmented control).

---

## 7. Pagination, infinite scroll and load more

**What & when** ([NN/g Infinite Scrolling Tips](https://www.nngroup.com/articles/infinite-scrolling-tips/)). Infinite scroll for homogeneous, browse-without-a-goal feeds. Pagination for goal-directed search, comparison and returning to results. Load More for a middle ground that keeps the footer reachable. Avoid infinite scroll for goal-directed finding, comparison, low-bandwidth audiences or audiences with high accessibility needs.

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | **Numbered pagination** | `‹ 1 … 4 5 [6] 7 8 … 20 ›`, first and last always visible, 1–2 sibling window. |
| 2 | **Compact "Page 6 of 20"** | Prev/next plus a jump-to-page input (mobile). |
| 3 | **Load More button** | With a count ("Show 24 more · 120 of 480") and a progress bar. |
| 4 | **Infinite scroll with page markers** | "Integrated pagination": landmark dividers "Page 3" appear in the feed and the URL updates via `history.replaceState`. |
| 5 | **Hybrid** | Auto-load two pages, then switch to a Load More button so the footer is reachable. |
| 6 | **Cursor-based "Older / Newer"** | Blogs and timelines. |
| 7 | **Scroll-snapped carousel pagination** | Dots or numbered fraction (`3 / 8`) for galleries. |
| 8 | **Big-typography pagination** | "Next project →" as a full-width hover-reveal of the next case study (portfolio sites) **[synthesis]**. |
| 9 | **Skeleton loaders** | Match card geometry instead of spinners. |

**Crafted vs generic.** Infinite-scroll mistakes: unreachable footer, losing position on Back, no loading indicator (illusion of completeness), poor performance on mobile data, SEO crawl issues. Use `content-visibility` for long feeds **[synthesis]**.

**Desktop vs mobile.** Mobile: compact "Page 6 of 20" with prev/next and jump input.

**Accessibility.**
- `<nav aria-label="Pagination">`, `aria-current="page"`, descriptive labels ("Page 5", "Next page"). Wrong: "»" links with no accessible name.
- On Load More: append items, then **move focus to the first new item** (give it `tabindex="-1"`) and announce via an `aria-live="polite"` region ("24 more products loaded").
- Infinite feeds: `role="feed"` with `article` children that have `aria-posinset`/`aria-setsize` (APG Feed pattern), so screen-reader users can move through an infinite list and keyboard users can skip past it. Provide a loading indicator, save the list position for Back, offer Load More or a stopping point so the footer stays reachable (NN/g).
- Restore scroll position on Back (store the page or cursor in the URL, plus `history.scrollRestoration`).

**Code** (sketch)

> ⚠ Untested reference snippet (sketch).

```html
<nav aria-label="Pagination"><ul>
  <li><a href="?page=5" rel="prev">Previous<span class="vh"> page</span></a></li>
  <li><a href="?page=5" aria-label="Page 5">5</a></li>
  <li><a aria-current="page" aria-label="Page 6">6</a></li> ... </ul></nav>
```

**Libraries & tools** **[synthesis, not fetched]**: shadcn `pagination`, Flowbite, HyperUI, Preline, DaisyUI `join`. Mostly markup; check `aria-current` and labels.

**Inspiration links.** None specific in the notes.

**Caveats & verification status.** APG Feed page and Baymard pagination studies were not fetched; the feed description is background knowledge consistent with the APG.

---

## 8. Footers

**What & when.** The page's closing landmark: sitemap, legal, contact and often a final brand moment.

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | **Fat footer / sitemap footer** | 4–6 link columns, newsletter, locale/currency switcher, legal row (large sites). |
| 2 | **Minimal** | One line with ©, 2–3 links and socials. |
| 3 | **Big-typography footer** | Giant wordmark or "Let's talk" CTA at 15–25vw spanning edge to edge, often clipped by the bottom edge or animated in by letters (Footer.design "Large Type"). |
| 4 | **Reveal / curtain footer** | Fixed or sticky behind the content, uncovered as the page scrolls away ([Piccalil](https://piccalil.li/blog/sticky-revealing-footer) code below). |
| 5 | **Marquee footer** | Endless scrolling line of CTA or client names; pause on hover and for reduced motion. |
| 6 | **Interactive or illustrative footer** | Physics-dropped tags (Matter.js), a cursor-reactive SVG, a 3D object (Footer.design "Animated" and "Illustrative"). |
| 7 | **Contact-as-footer** | The whole last viewport is a contact section: email in huge type with a copy-to-clipboard tooltip. |
| 8 | **Local time + status** | "Based in Lisbon · 14:32 · Available Jan 2027" on portfolio sites **[synthesis]**. |
| 9 | **Back-to-top with scroll progress ring** | See [9](#9-scroll-progress-section-indicators-and-toc-nav). |
| 10 | **Grid / bento footer** | Footer.design "Grid". |
| 11 | **Dark inverted footer** | The page "falls into" it, with a colour transition driven by a `view()` timeline as the footer enters. |

**Crafted vs generic.**
- Generic tell **[synthesis]**: a fat footer of 5 columns × 6 links ("Company / Resources / Legal …") that duplicates the header with no hierarchy, plus a newsletter box with no reason to subscribe.
- Crafted **[synthesis]**: context-awareness (local time or status), typographic voice (big type with tight tracking), `content-visibility` for long footers.
- Reveal-footer mistakes: forgetting `main`'s background or stacking context, Safari z-index flicker, possible broken clicks ([Piccalil](https://piccalil.li/blog/sticky-revealing-footer); [Shopify community](https://community.shopify.com/t/how-to-create-a-sticky-footer-that-reveals-on-scroll-theme-broadcast/333363/2)).

**Desktop vs mobile.** Make sure a reveal footer is no taller than the viewport, or its top will never be reachable **[synthesis]**. Editor's note: this matters most on short mobile viewports.

**Accessibility.**
- Top-level `<footer>` is the `contentinfo` landmark.
- Multiple link groups use headings (`<h2>`) rather than a `nav` each. Only wrap a group in `<nav aria-label="Footer">` if it is truly site navigation (APG landmarks).
- Keep the contrast of "muted" legal text ≥4.5:1.
- Marquee footers: pause on hover and disable under reduced motion.

**Code** — curtain footer (source: [Piccalil](https://piccalil.li/blog/sticky-revealing-footer))

Recipe: `main { position:relative; z-index:1; background:...; transform:translate3d(0,0,0) }` (the transform is a Safari z-index glitch fix) and `footer { position:sticky; bottom:0; z-index:0 }`. Header, main and footer must be siblings, and `main` must have a background.

```css
header, main { position: relative; z-index: 1; background: var(--bg); transform: translate3d(0,0,0); }
footer { position: sticky; bottom: 0; z-index: 0; }
```

Parallax lift **[sketch]**: with `@supports (animation-timeline: view())`, footer content starts at `translateY(-30%)` and moves to 0 over `animation-range: entry 0% entry 100%`.

Alternative: a fixed footer behind the page, `margin-bottom` on the content equal to the footer height, content in a higher stacking context. It can misbehave on iOS ([Ryan Seddon](https://ryanseddon.com/css/reveal-effect); also [Hongkiat CSS-only reveal](https://hongkiat.com/blog/css-only-on-scroll-reveal), [CSS-Tricks "Raise the Curtains"](https://css-tricks.com/tag/sticky/)).

**Libraries & tools.** Aceternity `/blocks/footers` ([Aceternity](https://ui.aceternity.com/components)); Matter.js for physics-dropped tags.

**Inspiration links.** Footer.design: a footer-only gallery maintained by NOOON Studio, organised by visual approach (Typographic, Illustrative, Grid, Animated, Dark, Large Type), not by industry ([Abduzeedo on Footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth); https://footer.design).

**Caveats & verification status.** Community reports say sticky reveal footers can break link clicks in some themes, so test pointer events ([Shopify community](https://community.shopify.com/t/how-to-create-a-sticky-footer-that-reveals-on-scroll-theme-broadcast/333363/2)). No Footer.design example URLs were retrieved, only its categories. Variant 8 and the parallax lift are synthesis/sketch.

---

## 9. Scroll progress, section indicators and TOC nav

**What & when.** Long-form pages, docs and one-page sites where readers need position and section context.

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | **Top progress bar** | 2–4px, `scaleX` 0 → 1, attached under the header. |
| 2 | **Circular progress ring** | Around a back-to-top button; `stroke-dashoffset` driven by a scroll timeline. |
| 3 | **Reading time remaining** | "4 min left" **[synthesis]**. |
| 4 | **Sticky TOC with scrollspy** | Active heading highlighted with a sliding marker, item set to `aria-current="true"`. |
| 5 | **TOC with progress rail** | Vertical line filling per section, or an SVG path tracing the indented TOC shape (the "TOC path" technique; [Aceternity Tracing Beam](https://ui.aceternity.com/components/tracing-beam) is a relative). |
| 6 | **Dot section indicator** | Right edge of one-page sites; labels revealed on hover or focus. |
| 7 | **Numbered section counter** | "03 / 07" in the header, updating as sections pass. |
| 8 | **Mobile collapsed TOC** | Sticky "On this page: Current section ▾" bar that opens a sheet. |
| 9 | **Horizontal chapter bar** | Long-form editorial, chapter ticks on the progress bar. |
| 10 | **Minimap** | Scaled page thumbnail with viewport frame, for docs or code **[synthesis]**. |

**Crafted vs generic.** Generic tell **[synthesis]**: a scroll progress bar on short pages, or a progress bar that doesn't account for the footer. Crafted: active-section highlighting, section counter (context-awareness).

**Desktop vs mobile.** Desktop: sticky TOC sidebar. Mobile: collapsed sticky "On this page" bar opening a sheet.

**Accessibility.**
- `<nav aria-label="On this page">`, `aria-current="true"` (or `"location"`) on the active link. Wrong: moving focus while scrolling.
- Scrollspy must not steal focus.
- The progress bar is decorative (`aria-hidden="true"`), or use `role="progressbar"` with `aria-valuenow` if it carries meaning.

**Code** — CSS-only progress bar (sketch)

> ⚠ Untested reference snippet (sketch).

```css
.progress { position: fixed; inset: 0 0 auto; height: 3px; transform-origin: 0 50%; background: var(--accent);
  animation: grow linear both; animation-timeline: scroll(root block); }
@keyframes grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@supports not (animation-timeline: scroll()) { .progress { display: none } } /* or a JS fallback */
```

Scrollspy (sketch): an `IntersectionObserver` on headings with `rootMargin: "0px 0px -70% 0px"`; set `aria-current="true"` on the matching TOC link; don't steal focus. Scroll-driven-animation scrollspy with `view-timeline` and `timeline-scope` works without JS in Chromium **[synthesis]**.

**Libraries & tools.** Magic UI Scroll Progress ([Magic UI](https://magicui.design/docs/components/dock)); [Aceternity Tracing Beam](https://ui.aceternity.com/components/tracing-beam), Sticky Scroll Reveal, Timeline (scroll-following beam) ([Aceternity](https://ui.aceternity.com/components)).

**Inspiration links.** Navbar Gallery "Progress bars" icon label ([navbar.gallery](https://www.navbar.gallery/)).

**Caveats & verification status.**
- Outdated: JS scroll % progress bars → `animation-timeline: scroll()`. IntersectionObserver-only reveal-on-enter → CSS scroll-triggered animations with IO fallback.
- Scroll-triggered (time-based, fire-on-threshold) animations shipped in **Chrome 145 (2026)**: `timeline-trigger-name/-source: view()`, `animation-trigger: --t play-forwards play-backwards`, and `trigger-scope`. They replace IntersectionObserver for "animate in when visible"; the demo keeps an IntersectionObserver fallback ([Chrome for Developers](https://developer.chrome.com/blog/scroll-triggered-animations)).
- Scroll-driven animation support in Safari/Firefox as of Nov 2026 not verified.

---

## 10. Skip links and anchor navigation

**What & when.** Every site needs a skip link; anchor navigation suits long product or landing pages.

**Variants**

| # | Variant | Spec |
|---|---|---|
| 1 | Standard **"Skip to main content"** | Off-screen until focused, then slides down as a high-contrast pill at the top left. |
| 2 | **Multi-target skip menu** | Main content / Search / Footer. WebAIM says one is usually enough; use more only for very complex pages. |
| 3 | **In-page anchor nav** | Sticky sub-nav of section links on long product or landing pages, with an active indicator. |
| 4 | **Back-to-top** | Appears after one viewport. |
| 5 | **Heading anchors** | A "#" link on hover or focus beside each heading, copying a deep link **[synthesis]**. |

**Crafted vs generic.** Skip-link mistakes ([WebAIM](https://webaim.org/techniques/skipnav/)): `display:none`/`hidden`, transparent or zero-size links, not being first, too many skip links, CSS reordering. A very common anchor bug: sticky header covering anchored headings (fix with `scroll-padding-top`).

**Desktop vs mobile.** Same on both. Editor's note: `scroll-padding-top` should match the current header height, which differs by breakpoint (`--header-h`).

**Accessibility** ([WebAIM Skip Navigation](https://webaim.org/techniques/skipnav/)).
- Place the link first in the focus order, pointing at `<main id="…">`. Hide it off screen and reveal it prominently on focus.
- **Never** use `display:none`/`hidden`, zero size, transparency or matching colours.
- Wording: "Skip to main content". Usually one is enough. Don't reorder visual vs DOM order.
- Correct: first focusable element, visible on focus, targets `<main id tabindex=-1>`. Wrong: `display:none` skip link.

**Code** (sketch, following WebAIM's off-screen-then-on-screen technique)

> ⚠ Untested reference snippet (sketch).

```html
<a class="skip" href="#main">Skip to main content</a> ... <main id="main" tabindex="-1">
```

```css
.skip { position: absolute; left: 1rem; top: 1rem; translate: 0 -200%; z-index: 1000; padding: .75rem 1rem;
  background: var(--fg); color: var(--bg); border-radius: .5rem; transition: translate .2s; }
.skip:focus { translate: 0 0; }
html { scroll-behavior: smooth; scroll-padding-top: var(--header-h, 72px); }  /* anchors land below a sticky header */
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }
:target { scroll-margin-top: var(--header-h, 72px); }
```

`tabindex="-1"` on `<main>` makes focus move reliably in all browsers **[synthesis; WebAIM did not mention it]**.

**Libraries & tools.** None needed; native HTML/CSS.

**Inspiration links.** [WebAIM Skip Navigation](https://webaim.org/techniques/skipnav/).

**Caveats & verification status.** Outdated: named anchors `<a name>` → `id` targets (named anchors are non-conforming in HTML5, per [WebAIM](https://webaim.org/techniques/skipnav/)). Heading anchors variant is synthesis.

---

## Cross-cutting reference

### ARIA pattern cheat-sheet

**[synthesis built on the cited APG pages]**

| Component | Correct pattern | Wrong pattern to avoid |
|---|---|---|
| Header nav | `<header>` + `<nav aria-label="Main">` + `<ul>` of links, `aria-current="page"` | `role="menubar"` on site nav |
| Dropdown / mega menu | Disclosure: `<button aria-expanded aria-controls>`, Esc closes and returns focus, close on focus-out | hover-only `div`s; `role="menu"` containing plain links |
| Hamburger / overlay / drawer | `<button aria-expanded aria-controls>` opening a `<dialog>` (modal: focus trap, Esc, inert background); restore focus on close | focus left behind the overlay; body still scrollable; no Esc |
| Action menu ("⋯" more) | APG **Menu Button** (`role=menu`/`menuitem`, arrows, typeahead) | using this pattern for site links |
| Command palette | Combobox + listbox in a dialog, `aria-activedescendant` | moving DOM focus to each result; no visible trigger |
| Sidebar tree | Nested lists + disclosures; APG **Tree View** only for file trees | `role=tree` on ordinary docs nav |
| Bottom tab bar | `<nav>` + links + `aria-current="page"` | `role=tablist` for route changes |
| Tabs | APG Tabs: roving tabindex, arrows, auto vs manual activation | tabs that are actually page links |
| Segmented control | Radio group (`fieldset` + radios) or toggle-button group with `aria-pressed` | div pills with no state |
| Breadcrumb | `<nav aria-label="Breadcrumb"><ol>` + `aria-current="page"` | separators read aloud; whole trail non-linked |
| Pagination | `<nav aria-label="Pagination">`, `aria-current="page"`, descriptive labels ("Page 5", "Next page") | "»" links with no accessible name |
| Infinite feed | `role="feed"` + `article[aria-posinset][aria-setsize]`, live-region announcements, Load More fallback | footer unreachable; Back loses position |
| TOC / scrollspy | `<nav aria-label="On this page">`, `aria-current="true"` (or `"location"`) on the active link | moving focus while scrolling |
| Skip link | First focusable element, visible on focus, targets `<main id tabindex=-1>` | `display:none` skip link |

### Mobile conventions

**[synthesis]** unless linked.
- Touch targets: WCAG AA minimum 24px ([cited](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). Platform guidance **44×44pt (Apple HIG)** and **48×48dp (Material)**. NN/g's "≈1 cm" sits in the same range. Use 44–48px for primary nav and keep ≥8px between adjacent targets.
- Thumb zone: primary actions in the bottom third (bottom tab bars, bottom sheets, bottom-placed floating pills). Destructive or rare actions at the top.
- `viewport-fit=cover` plus `env(safe-area-inset-*)` for fixed top and bottom bars. Use `dvh`/`svh` units, not `100vh`.
- Material 3: navigation bar on compact (<600dp) with 3–5 destinations, rail on medium and expanded. M3 Expressive (2025) reportedly shortened the bar and favoured an expandable rail over the modal drawer. **Unverified**.
- iOS 26 (Liquid Glass, 2025): floating tab bar with minimise-on-scroll and a separate search tab. **Unverified**.
- Always honour `prefers-reduced-motion`: replace slides and clip reveals with opacity fades; disable marquees and parallax.
- Lock background scroll while overlays are open (`<dialog>` modal, or `overflow:hidden` on `html` plus `scrollbar-gutter: stable`); `overscroll-behavior: contain` in panels.

### What makes navigation feel crafted vs generic

"Broken" usually means hidden desktop nav, hover-only or flickery menus, low-contrast translucent sticky headers, unreachable footers under infinite scroll, focus not managed in overlays, and anchors hidden under sticky headers. "Generic" means stock layouts with no spatial motion, no typographic voice, identical glass pills, and the same gradient CTA as every AI-generated landing page.

"AI-slop" / template tells to avoid **[synthesis]**:
1. A floating glassmorphism pill with `backdrop-blur` and white-on-photo text at 3:1 contrast, used on every site regardless of brand.
2. Centred logo, five links, a purple-to-blue gradient "Get Started" button, and a moon icon for dark mode, identical to thousands of templates.
3. Every element fading up 20px at once on load. No choreography and no origin. Menus that fade in instead of growing from their trigger.
4. Hamburgers on desktop with three items. Icon-only nav without labels.
5. A fat footer of 5 columns × 6 links ("Company / Resources / Legal …") duplicating the header with no hierarchy, plus a newsletter box with no reason to subscribe.
6. A mega menu that is just a long dropdown, or one that opens on hover with zero delay and closes when the cursor crosses a gap.
7. Tabs where the indicator jumps instead of sliding, or the active state is only a colour change.
8. A scroll progress bar on short pages, or one that doesn't account for the footer.
9. Lorem-ipsum labels ("Solutions", "Platform", "Resources") with no information scent.
10. Emoji or Lucide icons slapped beside every link.

What makes it feel crafted **[synthesis]**:
- **Motion with origin and continuity**: an element morphs instead of a new element appearing (View Transitions API, GSAP Flip, Radix Viewport). Menus open from the button; indicators travel.
- **Easing personality**: custom curves (`cubic-bezier(.2,.8,.2,1)` for UI, spring overshoot for playful brands). Faster exits than entries (EaseReverseClipMenu's premise, per its README). Open about 250–450ms, close about 150–250ms.
- **Typographic voice**: nav in the brand's display face or a mono for counters; big-type overlays and footers with tight tracking; numbered indices.
- **Context-awareness**: header theme follows section colour, a section counter, local time or status in the footer, active-section highlighting.
- **Perfect state coverage**: hover, focus-visible (designed, not the browser default ring), active, current, disabled, loading, reduced-motion, touch (no hover-only affordances), RTL.
- **Performance**: animate only `transform`, `opacity`, `clip-path` and `filter`. `content-visibility` for long footers or feeds. No layout thrash from scroll listeners (`{passive:true}`, rAF, or CSS scroll-state and scroll timelines).

No quantitative study was found on "generic vs crafted" perception; these tells are qualitative synthesis.

### Outdated techniques (as of Nov 2026)

**[synthesis unless cited]**

| Outdated | Modern replacement |
|---|---|
| jQuery `$(window).scroll` hide/show header | `@container scroll-state(scrolled)` (Chrome 144+), rAF-throttled passive listener fallback ([una.im](https://una.im/scroll-state-scrolled)) |
| JS scroll % progress bars | `animation-timeline: scroll()` |
| IntersectionObserver only for reveal-on-enter | CSS scroll-triggered animations (`timeline-trigger`, Chrome 145) with IO fallback ([Chrome](https://developer.chrome.com/blog/scroll-triggered-animations)) |
| JS sticky detection (`.is-stuck` via scroll math) | `scroll-state(stuck: top)` (Chrome 133+) ([una.im](https://una.im/scroll-state-scrolled)) |
| `role="menubar"` site nav | Disclosure navigation ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)) |
| Custom modal div plus focus-trap library | `<dialog>.showModal()` plus `inert` |
| Popper.js dropdown positioning | Popover API plus CSS anchor positioning (Floating UI as fallback) |
| `100vh` mobile menus | `100dvh`/`100svh` |
| `max-height: 999px` accordion hacks | `interpolate-size: allow-keywords` / `calc-size()` (Chromium), or `grid-template-rows: 0fr → 1fr` |
| `-webkit-overflow-scrolling: touch`, `body { position: fixed }` scroll-lock hacks | `overscroll-behavior: contain`, `scrollbar-gutter: stable` |
| Named anchors `<a name>` | `id` targets (non-conforming in HTML5, per [WebAIM](https://webaim.org/techniques/skipnav/)) |
| Hover-only mega menus | Click or tap plus hover-intent with delay, and keyboard disclosure ([NN/g](https://www.nngroup.com/articles/mega-menus-work-well/)) |
| Translucent sticky headers | Opaque or solid-tint headers ([NN/g](https://www.nngroup.com/articles/sticky-headers/)) |

### Library map for navigation

Use **headless, accessibility-first primitives** (Radix, React Aria, Ark UI, Headless UI, `cmdk`) for behaviour and **effect libraries** (Aceternity, Magic UI, Codrops, Uiverse) for motion ideas. Never ship an effect component without checking its keyboard and ARIA behaviour. Radix NavigationMenu and cmdk are the strongest verified primitives for mega menus and command palettes. Table below is **[synthesis, not individually verified this pass]**.

| Need | Best-in-class picks | Notes |
|---|---|---|
| Mega menu / site nav (React) | Radix NavigationMenu, shadcn `navigation-menu` (Radix-based), React Aria (no dedicated nav-menu; compose `Disclosure`/`Link`), Ark UI | Radix Viewport gives the "morphing panel" effect for free |
| Dropdown / popover | Popover API + CSS anchor positioning (native), Floating UI, Radix Popover, Headless UI `Popover` | Use `Menu`/`DropdownMenu` components only for *action* menus |
| Command palette | `cmdk`, shadcn `command`, React Aria `Autocomplete`/`ComboBox`, kbar, Ark UI Combobox | Must be a combobox and listbox, not a menu |
| Drawer / sheet | Native `<dialog>`, Vaul (drawer with drag and snap points), shadcn `sheet`/`drawer`, Radix Dialog | Vaul is the reference for mobile bottom sheets |
| Tabs / segmented | Radix Tabs, React Aria Tabs/ToggleButtonGroup, Ark UI Tabs/SegmentGroup, Headless UI Tab | Ark/Park UI SegmentGroup is a true radio-based segmented control |
| Sidebar | shadcn `sidebar` (collapsible to icon, floating and inset variants), Aceternity Sidebar, Untitled UI sidebars | |
| Pagination | shadcn `pagination`, Flowbite, HyperUI, Preline, DaisyUI `join` | Mostly markup; check `aria-current` and labels |
| Effects and motion ideas | Codrops, Aceternity, Magic UI, 21st.dev (community registry), Uiverse.io (CSS/Tailwind snippets), CodePen | High creativity, variable accessibility; audit focus states and reduced motion |
| Full marketing templates | Tailwind Plus (formerly Tailwind UI), Untitled UI, Flowbite, Preline, HyperUI, DaisyUI | Solid but the most "generic-looking"; use for structure, restyle heavily |

- "Tailwind UI" was rebranded **Tailwind Plus** in 2025 **[synthesis, verify]**.
- Effect libraries (Aceternity, Magic UI, Uiverse) mostly ship hover and scroll motion without `prefers-reduced-motion` handling or ARIA state. Wrap them in your own accessible shell.
- See also [component-libraries.md](component-libraries.md).

### Research gaps (navigation)

- Codrops demo listing pages returned **403**; post-mid-2025 demos (other than EaseReverseClipMenu and "Menu Nav GSAP") not enumerated. Check https://tympanus.net/codrops/demos/?tag=menu.
- Awwwards, FWA, CSS Design Awards, Godly, Land-book, Lapa Ninja, SiteInspire, One Page Love, Httpster and Mobbin were **not fetched**, so no award-winning site URLs from those galleries are cited. Variants attributed to "Awwwards-style" practice are synthesis. Starting points: https://www.awwwards.com/websites/navigation/ (unverified URL), https://godly.website, https://footer.design, https://mobbin.com.
- Stripe, Linear, Raycast and Vercel nav behaviours are from background knowledge, not fetched.
- No Footer.design example URLs retrieved, only categories.
- React Aria, Ark UI, Park UI, Headless UI, Untitled UI, Tailwind Plus, HyperUI, Flowbite, DaisyUI, Preline, 21st.dev, Uiverse and shadcn pages were **not fetched**; the library table is background knowledge. No independent accessibility audit comparing these libraries was found.
- Apple HIG (tab bars) and Material 3 (navigation bar) pages returned no body content; their numeric guidance is background knowledge.
- APG Feed, Menu Button, Dialog (Modal) and Tree View pages not fetched; descriptions are background knowledge consistent with the APG.
- Steven Hoober's thumb-zone research and Baymard pagination studies not fetched.
- Browser support for CSS anchor positioning, `@starting-style`, `interpolate-size` and scroll-driven animations in Safari and Firefox as of November 2026 was **not verified**. Check caniuse.com.

---

## Sources

- Navbar Gallery: https://www.navbar.gallery/ · https://www.navbar.gallery/style/animated · https://www.navbar.gallery/style/typographic · https://www.navbar.gallery/style/e-commerce
- Product Hunt, Navbar Gallery: https://www.producthunt.com/products/navbar-gallery
- Abduzeedo on Footer.design: https://abduzeedo.com/footer-design-inspiration-only-gallery-earth · https://footer.design
- Navbar Gallery featured sites: https://www.supaste.com/ · https://chesapeakeplywood.com/ · https://velt.dev/ · https://clonix.framer.website/ · https://aveon.framer.website/ · https://orchid.ai/ · https://www.cloudflare.com/ · https://consensys.io/ · https://www.bigdirty.agency/ · https://hosierbrown.framer.website/ · https://www.browserbase.com/ · https://bud.app/
- Codrops: https://github.com/Codrops · https://github.com/codrops/EaseReverseClipMenu · https://tympanus.net/Development/EaseReverseClipMenu/ · https://tympanus.net/codrops/?p=114731 · https://feeds.marmits.com/archive-rss-206-2026-04.html · https://tympanus.net/codrops/demos/page/2/?tag=menu · https://tympanus.net/codrops/hub/author/moussa_mamadou · https://tympanus.net/codrops/demos/?tag=menu
- Codrops repos: https://github.com/codrops/ImageTilesMenu · https://github.com/codrops/MenuToGrid · https://github.com/codrops/LetterShuffleMenu · https://github.com/codrops/ExpandingRoundedMenu · https://github.com/codrops/Theodore · https://github.com/codrops/MenuThumbStackAnimation · https://github.com/codrops/MarqueeMenu · https://github.com/codrops/InlineToMenuLink · https://github.com/codrops/3DLettersMenuHover · https://github.com/codrops/InlineMenuLayout · https://github.com/codrops/MenuFullGrid · https://github.com/codrops/RapidImageHoverMenuEffects · https://github.com/codrops/ScrollLoopMenu · https://github.com/codrops/CSSMarqueeMenu · https://github.com/codrops/DistortedMenuLinkEffects · https://github.com/codrops/DraggableMenu · https://github.com/codrops/FullscreenHoverLoop · https://github.com/codrops/MultiboxMenu · https://github.com/codrops/SlideOutBoxMenu · https://github.com/codrops/GridMenu · https://github.com/codrops/AnimatedMenuIcon · https://github.com/codrops/ExpandingBarMenus
- Aceternity UI: https://ui.aceternity.com/components · https://ui.aceternity.com/components/floating-navbar · https://ui.aceternity.com/components/resizable-navbar · https://ui.aceternity.com/components/floating-dock · https://ui.aceternity.com/components/sidebar · https://ui.aceternity.com/components/tabs · https://ui.aceternity.com/components/navbar-menu · https://ui.aceternity.com/components/notch · https://ui.aceternity.com/components/tracing-beam
- Magic UI Dock: https://magicui.design/docs/components/dock
- Una Kravets, scroll-state(scrolled): https://una.im/scroll-state-scrolled
- modern-css.com auto-hiding header: https://modern-css.com/auto-hiding-header-without-scroll-listeners/
- CSSWG scroll-state explainer: https://drafts.csswg.org/css-conditional-5/scroll_state_explainer
- CSSWG mailing list: https://lists.w3.org/Archives/Public/public-css-archive/2025Apr/0795.html
- ics.media scroll-state: https://ics.media/en/entry/250602/
- Chrome scroll-triggered animations: https://developer.chrome.com/blog/scroll-triggered-animations
- Piccalil sticky revealing footer: https://piccalil.li/blog/sticky-revealing-footer
- Ryan Seddon reveal effect: https://ryanseddon.com/css/reveal-effect
- Hongkiat CSS-only reveal: https://hongkiat.com/blog/css-only-on-scroll-reveal
- CSS-Tricks sticky tag: https://css-tricks.com/tag/sticky/
- Shopify community sticky footer: https://community.shopify.com/t/how-to-create-a-sticky-footer-that-reveals-on-scroll-theme-broadcast/333363/2
- Radix Navigation Menu: https://www.radix-ui.com/primitives/docs/components/navigation-menu
- cmdk / command palette: https://openapps.pro/packages/cmdk · https://nextcloud-vue.conduction.nl/docs/components/cn-command-palette/ · https://www.buildmvpfast.com/blog/how-to-add-cmd-k-command-palette-saas-2026 · https://agentworkspace-flax.vercel.app/packs/linear-command-palette
- MDN env(): https://developer.mozilla.org/en-US/docs/Web/CSS/env
- APG: https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html · https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/ · https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ · https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
- NN/g: https://www.nngroup.com/articles/infinite-scrolling-tips/ · https://www.nngroup.com/articles/hamburger-menus/ · https://www.nngroup.com/articles/sticky-headers/ · https://www.nngroup.com/articles/mega-menus-work-well/ · https://www.nngroup.com/articles/breadcrumbs/ · https://www.nngroup.com/articles/tabs-used-right/
- WebAIM Skip Navigation: https://webaim.org/techniques/skipnav/
- W3C Understanding 2.5.8: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Unverified starting points (not fetched): https://www.awwwards.com/websites/navigation/ · https://godly.website · https://mobbin.com
