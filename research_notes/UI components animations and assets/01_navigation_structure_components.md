# Navigation & Page-Structure UI Components (web, desktop + mobile), November 2026

How to read these notes:
- **Cited Findings** come from pages fetched during this research. Each bullet links to its source.
- **Inferences** hold the component-by-component build reference: variant catalogues, craft criteria, breakpoints and code sketches. Where a variant comes from a verified source, the URL is inline. Variants without a URL are practitioner synthesis from the researcher's background knowledge, and are marked **[synthesis]** where it matters. Verify those before quoting them as fact.
- Code snippets marked "(source)" are adapted from the cited page. Snippets marked "(sketch)" were written by the researcher and are untested.

---

## Q1. What creative variants appear on award-winning sites for each component, and how do you build a crafted (not generic) version?

### Takeaway
Distinctive navigation comes from three things: (a) **motion that has a spatial origin**, meaning menus grow from the button, indicators slide between items, and panels morph size (Radix Viewport, GSAP Flip, clip-path reveals); (b) **typography used as the interface**, such as huge menu type, marquee, letter shuffle and big-type footers; (c) **stateful headers driven by scroll**, which can now be done in CSS with `scroll-state()` queries and scroll-driven animations. Generic versions are static, centered, translucent and hover-only. Award-style menus trace back to a small set of repeatable Codrops/GSAP techniques, which are listed below with repo URLs.

### Cited Findings

**Galleries and what they categorise**
- Navbar Gallery splits navbars into these categories: Static/Sticky, Dropdown/Flyout, Mega Menu, Side Bar, Search Bar, Announcement Bar, Full Screen Menu, Breadcrumbs (plus Tabs and Progress bars as icon labels). It ran to 38 pages of examples when visited and is sponsored by Mobbin. — [Navbar Gallery](https://www.navbar.gallery/)
- Featured navbar examples on Navbar Gallery's front page: Supaste (https://www.supaste.com/), Chesapeake Plywood (https://chesapeakeplywood.com/), Velt (https://velt.dev/), Clonix (https://clonix.framer.website/), Aveon (https://aveon.framer.website/), Orchid (https://orchid.ai/), Cloudflare (https://www.cloudflare.com/), Consensys (https://consensys.io/), Big Dirty Agency (https://www.bigdirty.agency/), Hosier Brown (https://hosierbrown.framer.website/), Browserbase (https://www.browserbase.com/), Bud (https://bud.app/). Each has a detail page at `navbar.gallery/navbar/<name>`. — [Navbar Gallery](https://www.navbar.gallery/)
- Navbar Gallery also has style-filtered pages: simple, illustrative, typographic/typography, gradient, animated, cool, e-commerce, iOS app, Windows app, podcast, sports. Examples: https://www.navbar.gallery/style/animated, https://www.navbar.gallery/style/typographic, https://www.navbar.gallery/style/e-commerce. — [Navbar Gallery search results](https://www.navbar.gallery/style/animated)
- Footer.design is a footer-only gallery maintained by NOOON Studio. It is organised by visual approach (Typographic, Illustrative, Grid, Animated, Dark, Large Type), not by industry. Navbar Gallery (by Christina Liubynska) grew out of the footer.design idea. — [Abduzeedo on Footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth); [Product Hunt: Navbar Gallery](https://www.producthunt.com/products/navbar-gallery)

**Codrops (Tympanus) menu demos.** These are the canonical source of "Awwwards-style" menu motion. Repos were verified via the GitHub API, with creation date and the repo's own description.
- 2026-04-22 **EaseReverseClipMenu**: a playful GSAP menu exploring how `easeReverse` makes reversed UI animations feel "smoother, snappier, and more intentional". Demo https://tympanus.net/Development/EaseReverseClipMenu/, article https://tympanus.net/codrops/?p=114731, repo https://github.com/codrops/EaseReverseClipMenu. Author Tomoya Okada (per an archive listing). — [GitHub](https://github.com/codrops/EaseReverseClipMenu); [archive](https://feeds.marmits.com/archive-rss-206-2026-04.html)
- 2025-02 "Menu Nav GSAP" by Moussa Mamadou, listed on the Codrops menu tag. Late 2025 also had a macOS-dock-effect GSAP demo. — [Codrops demos tagged menu (search snippet)](https://tympanus.net/codrops/demos/page/2/?tag=menu); [author page](https://tympanus.net/codrops/hub/author/moussa_mamadou). The tag page itself returned 403 to the fetcher, so details are from the search snippet only.
- 2023 **ImageTilesMenu**: image tiles that transform into a full image when a menu item is clicked. https://github.com/codrops/ImageTilesMenu
- 2022 **MenuToGrid**: menu-row thumbnails animate into a content-preview grid with GSAP Flip. https://github.com/codrops/MenuToGrid
- 2022 **LetterShuffleMenu**: the letters of a big word shuffle to become the first letter of each menu item. https://github.com/codrops/LetterShuffleMenu
- 2022 **ExpandingRoundedMenu**: an expanding menu with a cover "unreveal" in the background. https://github.com/codrops/ExpandingRoundedMenu
- 2021 **Theodore**: a menu effect with an SVG overlay and an infinite CSS background animation. https://github.com/codrops/Theodore
- 2021 **MenuThumbStackAnimation**: a vertical image stack that expands into a horizontal line. https://github.com/codrops/MenuThumbStackAnimation
- 2021 **MarqueeMenu**: a recreation of the K72 (by Locomotive) marquee-on-hover menu. https://github.com/codrops/MarqueeMenu
- 2021 **InlineToMenuLink**: inline text links morph into menu links. https://github.com/codrops/InlineToMenuLink
- 2021 **3DLettersMenuHover**: 3D letters plus an image hover. https://github.com/codrops/3DLettersMenuHover
- 2020 **InlineMenuLayout** (inline menu with a gallery preview panel), **MenuFullGrid** (menu plus a background image grid that animates into an inner page), **RapidImageHoverMenu(Effects)** (images flash per item on hover), **ScrollLoopMenu** (an infinitely scrolling menu built from cloned items), **CSSMarqueeMenu**, **DistortedMenuLinkEffects** (SVG filter distortion). Repos: https://github.com/codrops/InlineMenuLayout, https://github.com/codrops/MenuFullGrid, https://github.com/codrops/RapidImageHoverMenuEffects, https://github.com/codrops/ScrollLoopMenu, https://github.com/codrops/CSSMarqueeMenu, https://github.com/codrops/DistortedMenuLinkEffects
- 2018–2019 **DraggableMenu** (drag for a thumbnail preview), **FullscreenHoverLoop**, **MultiboxMenu** (grid "multibox" reveal), **SlideOutBoxMenu** (irregular grid of sliding boxes), **GridMenu**. Repos: https://github.com/codrops/DraggableMenu, https://github.com/codrops/FullscreenHoverLoop, https://github.com/codrops/MultiboxMenu, https://github.com/codrops/SlideOutBoxMenu, https://github.com/codrops/GridMenu
- Older but still instructive: **LineMenuStyles** (2016, the line as a design element), **MenuHoverEffects** (2017), **ExpandingBarMenus** (2017, tab-like nav that expands a content area), **MultiLevelMenu** (2015, multi-level with breadcrumb and back button), **AnimatedMenuIcon** (2015, SVG hamburger morph), **OffCanvasMenuEffects** (2014, SVG-path off-canvas), **PerspectivePageViewNavigation** (2013, page pushed back in 3D to reveal the menu), **MultiLevelPushMenu** (2013). Repos at https://github.com/codrops/<Name>. — all from [Codrops GitHub org](https://github.com/Codrops)

**Snippet-library navigation components (verified URLs)**
- Aceternity UI: Floating Navbar (hides on scroll down, reappears on scroll up) https://ui.aceternity.com/components/floating-navbar; Resizable Navbar (width changes as you scroll) https://ui.aceternity.com/components/resizable-navbar; Floating Dock (macOS dock) https://ui.aceternity.com/components/floating-dock; Sidebar (expands on hover, mobile support) https://ui.aceternity.com/components/sidebar; Animated Tabs https://ui.aceternity.com/components/tabs; Navbar Menu (children animate on hover, for mega menus) https://ui.aceternity.com/components/navbar-menu; Notch (floating notch at top or bottom that animates the active item) https://ui.aceternity.com/components/notch; Sticky Scroll Reveal, Tracing Beam, Timeline (scroll-following beam). Blocks: /blocks/navbars, /blocks/sidebars, /blocks/footers. — [Aceternity components](https://ui.aceternity.com/components)
- Magic UI Dock: macOS dock magnification (React + Tailwind + Framer Motion). Props: `iconSize` 40, `iconMagnification` 60, `iconDistance` 140, `direction`, `disableMagnification`. Install with `pnpm dlx shadcn@latest add @magicui/dock`. Magic UI also has a Scroll Progress component. — [Magic UI Dock](https://magicui.design/docs/components/dock)

**Scroll-driven header technique (modern CSS)**
- A hide-on-scroll header needs no JS with `@container scroll-state(scrolled: bottom)` on an `html { container-type: scroll-state }` container (code in the Inferences below). `scrolled` is rolling out in Chrome 144. `stuck`, `snapped` and `scrollable` landed in Chrome 133. — [Una Kravets, "Directional CSS with scroll-state(scrolled)"](https://una.im/scroll-state-scrolled)
- `scrolled` is not Baseline, so ship a fallback. The CSSWG explainer documents a scroll-driven-animation and transition-delay workaround for direction detection. One 2025 CSSWG thread debated whether the state should reset to `none` when scrolling stops. — [modern-css.com](https://modern-css.com/auto-hiding-header-without-scroll-listeners/); [CSSWG explainer](https://drafts.csswg.org/css-conditional-5/scroll_state_explainer); [csswg mailing list](https://lists.w3.org/Archives/Public/public-css-archive/2025Apr/0795.html); [ics.media scroll-state article](https://ics.media/en/entry/250602/)
- Scroll-triggered (time-based, fire-on-threshold) animations shipped in **Chrome 145 (2026)**: `timeline-trigger-name/-source: view()`, `animation-trigger: --t play-forwards play-backwards`, and `trigger-scope`. They replace IntersectionObserver for "animate in when visible". The demo keeps an IntersectionObserver fallback. — [Chrome for Developers](https://developer.chrome.com/blog/scroll-triggered-animations)

**Reveal ("curtain") footer**
- Piccalil recipe: `main { position:relative; z-index:1; background:...; transform:translate3d(0,0,0) }` (the transform is a Safari z-index glitch fix) and `footer { position:sticky; bottom:0; z-index:0 }`. Header, main and footer must be siblings, and `main` must have a background. — [Piccalil, Sticky revealing footer](https://piccalil.li/blog/sticky-revealing-footer)
- An alternative is a fixed footer behind the page, with `margin-bottom` on the content equal to the footer height and the content placed in a higher stacking context. It can misbehave on iOS. — [Ryan Seddon](https://ryanseddon.com/css/reveal-effect); also [Hongkiat CSS-only reveal](https://hongkiat.com/blog/css-only-on-scroll-reveal), [CSS-Tricks "Raise the Curtains"](https://css-tricks.com/tag/sticky/)
- Community reports say sticky reveal footers can break link clicks in some themes, so test pointer events. — [Shopify community](https://community.shopify.com/t/how-to-create-a-sticky-footer-that-reveals-on-scroll-theme-broadcast/333363/2)

**Mega-menu dimensions and motion (Radix)**
- Radix NavigationMenu offers `Viewport` with `--radix-navigation-menu-viewport-width/height` CSS vars, so the panel can animate size as content changes. `data-motion="from-start|from-end|to-start|to-end"` gives directional slide between panels. `Indicator` tracks the active trigger. `delayDuration` defaults to 200 ms and `skipDelayDuration` to 300 ms. — [Radix Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu)

### Inferences: component-by-component build reference

> Breakpoint convention used below **[synthesis]**: `<640px` phone, `640–1023px` tablet/small laptop, `≥1024px` desktop, `≥1440px` wide. Prefer **container queries** on the nav itself over viewport queries, so the same header works in a sidebar layout or a CMS embed. Material's window-size classes (compact <600dp, medium 600–839dp, expanded ≥840dp) are a good cross-check **[synthesis; the M3 page did not render for the fetcher]**.

---

#### 1. Headers / navbars

**What and when.** The persistent site identity and top-level navigation. Make it sticky only if users need it repeatedly during a session (NN/g, cited in Q3/Q4).

**Variant catalogue**
1. **Classic sticky bar, condensed on scroll.** A 72–88px header shrinks to 56–64px after about 80px of scroll. The logo scales from 1 to 0.85 and gains a hairline border and opaque background. Build it with `animation-timeline: scroll()` and `animation-range: 0 120px`, or with `scroll-state(stuck: top)` (Chrome 133+).
2. **Transparent-on-hero.** White text over a full-bleed hero, flipping to an opaque background with dark text once the hero leaves. Drive it with an IntersectionObserver on a sentinel at the hero's bottom, or a `view()` timeline on the hero. Crafted versions **colour-adapt per section**: each section declares `data-header-theme="dark|light"` and the header swaps tokens when that section is under it (a common Awwwards trait) **[synthesis]**. `mix-blend-mode: difference` on the logo is a cheaper alternative.
3. **Hide-on-scroll-down / reveal-on-scroll-up (partially persistent).** CSS `scroll-state(scrolled)` with a JS fallback (code below). NN/g recommends 300–400 ms for the slide-in, triggered by a small upward scroll.
4. **Floating pill / island.** A detached rounded capsule (`border-radius: 999px`) centred or offset, `top: 12–16px`, with a backdrop blur and a **solid fallback tint** for contrast. It can morph: full-width bar at the top of the page, contracting into a pill on scroll. Aceternity's "Resizable Navbar" (https://ui.aceternity.com/components/resizable-navbar) is the reference. On mobile the pill often moves to the **bottom** (thumb zone).
5. **Split nav.** Logo centred, link groups left and right (fashion/editorial), or nav left with utilities (search, cart, account) right. Grid: `grid-template-columns: 1fr auto 1fr`, so the logo stays truly centred whatever the group widths.
6. **Dynamic-Island / notch.** A small capsule that expands into a panel on hover or click, morphing width, height and radius in one spring animation. Aceternity "Notch" https://ui.aceternity.com/components/notch.
7. **Dock nav.** A macOS-style magnifying icon row (Magic UI Dock, Aceternity Floating Dock). Best for portfolios and app-like sites. Fall back to a static bar on touch, where there is no hover.
8. **Vertical edge nav / rotated text.** Links set vertically on the left or right edge (`writing-mode: vertical-rl`), common in agency portfolios **[synthesis]**.
9. **Corner nav.** Four items pinned to the four viewport corners (logo TL, menu TR, contact BL, index BR). Brutalist and editorial **[synthesis]**.
10. **Announcement bar + header stack.** A dismissible promo strip above the nav (a Navbar Gallery category). Make the strip collapse away on scroll so the stack doesn't eat vertical space.
11. **Search-first header.** Large search field as the hero of the header (e-commerce, docs). Pair it with a Cmd+K palette (see 2g).
12. **Magnetic / hover-indicator nav.** A blob or underline that slides between links (one shared element positioned with JS rects, CSS anchor positioning, or View Transitions). Links nudge toward the cursor (magnetic), and **only on `(hover: hover) and (pointer: fine)`**.
13. **Text-roll links.** On hover each label's letters roll up and are replaced by a duplicate (two stacked spans, `translateY(-100%)` with a per-letter `transition-delay`). This is the single most-used "crafted" microinteraction on Awwwards sites **[synthesis]**.

**Crafted vs generic.** Generic: centred logo, five links, a "Get started" gradient button, a translucent glass bar with low contrast, everything fading in at once. Crafted: a deliberate type scale (nav at the body size or smaller, tracking adjusted, tabular numerals in counters), state changes tied to scroll position, **one** signature microinteraction used consistently (text-roll, sliding indicator), an active-page indicator, a visible keyboard focus style designed with the same care as hover, and the header theme following section colour.

**Desktop vs mobile.** Desktop (≥1024px): show top-level links. NN/g found hidden navigation on desktop used in 27% of cases vs 48% visible (see Q3). Below about 1024px, collapse into a menu button. If there are four or fewer items, keep them visible on mobile too. Mobile header height is about 56–64px. Hide-on-scroll matters most on mobile, where vertical space is scarce.

**Code: hide-on-scroll with CSS first, JS fallback (sketch, CSS part from [una.im](https://una.im/scroll-state-scrolled))**
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
**Code: shrink on scroll with no JS (sketch)**
```css
@supports (animation-timeline: scroll()) {
  .site-header { animation: shrink linear both; animation-timeline: scroll(root); animation-range: 0 120px; }
  @keyframes shrink { to { padding-block: .5rem; background: var(--bg); box-shadow: 0 1px 0 var(--line); } }
}
```
Scroll-driven animations shipped in Chromium in 2023. Safari 26 support is reported, but this research did not verify it; check caniuse.

---

#### 2. Menu types

**2a. Hamburger / menu button.** Use it only where space forces it (mobile, or intentionally minimal portfolios). Variants: (1) 3-line to X morph (lines rotate ±45°, middle line scales to 0); (2) **2-line asymmetric** bars of different widths; (3) **text label "Menu" / "Close"** that rolls (NN/g evidence favours labelled icons, see Q3); (4) SVG path morph (Codrops AnimatedMenuIcon https://github.com/codrops/AnimatedMenuIcon); (5) a dot grid (9 dots) for app launchers; (6) a circular button with a magnetic hover; (7) a **counter or bubble** that expands into the overlay (the button becomes the clip-path origin). It must be a `<button aria-expanded aria-controls>`, never a `<div>`. Hit area ≥44×44px even if the icon is 20px.

**2b. Full-screen overlay menu.** Takes over the viewport with giant type (6–12vw), often an image preview per hovered item. Variants, with repos above: **circular clip-path reveal from the button** (`clip-path: circle(0 at var(--x) var(--y))` to `circle(150% at ...)`); **ease-reverse clip menu** (EaseReverseClipMenu, 2026); **staggered line-mask reveal** (each link in an `overflow:hidden` wrapper, translateY 100% to 0 with a 40–60ms stagger); **marquee rows on hover** (MarqueeMenu, K72-style); **letter shuffle** (LetterShuffleMenu); **image tiles assemble or disperse** (ImageTilesMenu); **menu items morph into a grid** (MenuToGrid, GSAP Flip); **3D perspective push-back of the page** (PerspectivePageViewNavigation); **split panels** sliding in from top and bottom halves; **SVG wave or blob overlay** (Theodore); **cursor-follow image preview** (RapidImageHoverMenu); **numbered index list** (01–05 with tabular numerals plus a one-line descriptor per item). Implementation: use `<dialog>` with `showModal()`, which gives a focus trap, Esc and an inert background for free. Animate entry with `@starting-style` and `transition-behavior: allow-discrete` on `display` and `overlay` **[synthesis; Baseline status not verified here]**.

**2c. Off-canvas drawer.** A side panel (left or right, 280–420px desktop, 85–90vw mobile, never 100% so the scrim stays tappable). Variants: **overlay drawer** (slides over the content); **push** (content translates with it); **reveal** (content slides away to reveal a drawer beneath); **scale-down / 3D rotate** of the page (Codrops OffCanvasMenuEffects); **multi-level push** with back button and breadcrumb (MultiLevelPushMenu, MultiLevelMenu); **bottom sheet** on mobile with drag handle and snap points (`scroll-snap` inside a scroll container is a JS-light approach **[synthesis]**). Use `<dialog>` or `inert` on the rest of the page, `overscroll-behavior: contain` on the panel, and `scrollbar-gutter: stable` on `html` so locking scroll doesn't shift layout.

**2d. Mega menu.** A big two-dimensional panel of grouped links for large sites (NN/g). Variants: (1) **columnar** grouped links with headings; (2) **featured card + links** (image or promo on the right); (3) **tabbed mega menu** (vertical categories on the left switch the right pane, Stripe-style **[synthesis]**); (4) **morphing single panel** where one floating panel resizes and slides between triggers (Radix Viewport plus `data-motion`, Stripe's famous nav) **[Radix cited; Stripe attribution is synthesis]**; (5) **icon + description rows** (SaaS product menus); (6) **full-width "flyout" with search** (e-commerce; NN/g says keep the main search visible outside the menu); (7) **image-led** category tiles (fashion); (8) **mobile drill-down** that converts to a stacked drill-in with a back button. Hover intent: NN/g says wait about 0.5s before showing and keep it open 0.5s after leaving. Radix defaults to 200ms open delay and 300ms skip delay. Implement a **"safe triangle"** so diagonal moves toward the panel don't close it.

**2e. Dropdown.** For small sets (≤7–10 links). Use the **disclosure** pattern for nav, not `role=menu` (see Q3). Modern positioning: the **Popover API** (`popover` attribute with `popovertarget`) gives top-layer rendering and light-dismiss. **CSS anchor positioning** (`anchor-name`, `position-anchor`, `position-try-fallbacks: flip-block`) handles placement without JS. Availability of anchor positioning in all engines was not verified here, so keep the Floating UI fallback. Crafted touches: the panel scales from its trigger (`transform-origin` at the trigger), a 120–180ms ease-out, and a caret that tracks the trigger.

**2f. Radial / circular menu.** Items arranged on an arc around a FAB or cursor. Good for creative tools, map or canvas apps and games. Not for primary site nav. Position the items with CSS trig (sketch):
```css
.radial li { --a: calc(var(--i) * (180deg / (var(--n) - 1)) - 90deg);
  translate: calc(cos(var(--a)) * var(--r)) calc(sin(var(--a)) * var(--r));
  transition: translate .35s cubic-bezier(.3,1.4,.5,1) calc(var(--i) * 30ms); }
.radial:not(.open) li { translate: 0 0; }
```
Accessibility: still a disclosure button plus a list of buttons or links. Arrow keys can map to around-the-circle order. Keep ≥44px targets with gaps.

**2g. Command palette (Cmd/Ctrl+K).** A keyboard-first search-and-act modal. Variants: (1) the **Linear/Raycast style**, a centred modal with grouped results, shortcut hints on the right, and a footer of key legends; (2) **nested pages** (Enter drills into "Change theme…" with breadcrumb chips in the input); (3) **inline header search that expands** into the palette; (4) an **AI-hybrid** that shows "Ask AI about '…'" as the last result **[synthesis]**; (5) **docs search** (Algolia DocSearch-style with recent searches) **[synthesis]**. Libraries: `cmdk` (unstyled primitives Command, Input, List, Item, Group, Dialog; Dialog wraps Radix Dialog for focus trap and Esc), cited in Q2. Always show a visible trigger button ("Search… ⌘K"), because the shortcut alone can't be discovered. Ctrl+K is a browser shortcut in Chrome and Firefox (focus the address bar or search), so `preventDefault` only while the page has focus, and also offer `/` **[synthesis]**.

**Mistakes across menus**: hover-only opening; no Esc; focus not returned to the trigger; body scrolls behind the overlay; animating `height`/`left` instead of transforms; a 600ms+ open animation blocking interaction; menu links not focusable until the animation completes.

---

#### 3. Sidebars / side navigation

**When.** Apps, docs and dashboards with more than about 7 top-level sections, or deep hierarchies. NN/g recommends visible left-side navigation as a desktop alternative to top nav (Q3).

**Variants**: (1) **docs tree** with collapsible sections and an active trail highlighted, persisted per user (Stripe/Vercel docs style **[synthesis]**); (2) **collapsible rail**, 240–280px expanded to a 64–72px icon rail with tooltips, toggled or expanding on hover (Aceternity Sidebar https://ui.aceternity.com/components/sidebar); (3) **dual sidebar**, a narrow workspace or app switcher plus a wider section list (Slack/Discord **[synthesis]**); (4) **floating inset sidebar**, a rounded card inset 8–12px from the viewport edge (shadcn "inset" variant **[synthesis]**); (5) **sticky in-page sidebar** for long articles (paired with TOC, see 9); (6) **resizable sidebar** with a drag handle (`role="separator" aria-orientation="vertical" aria-valuenow`) **[synthesis]**; (7) **mobile: off-canvas drawer** or conversion to a bottom tab bar; (8) **command-first sidebar** with a search or Cmd+K at the top. Crafted: proper indentation rhythm (12–16px per level), an active item that fills **and** marks the parent trail, counts or badges in tabular numerals, a collapse animation that doesn't reflow content (`grid-template-columns` transition or `interpolate-size: allow-keywords` **[Chromium-only at time of writing, synthesis]**).

**Accessibility.** A `<nav aria-label="Docs">` with nested `<ul>`. Collapsible groups are disclosure buttons (`aria-expanded`). The current page gets `aria-current="page"`. Use the APG **tree view** pattern only for genuine file-tree apps, because it changes the keyboard model (arrow keys, typeahead). Plain docs nav should stay links and buttons in Tab order.

---

#### 4. Mobile bottom tab bars

**When.** App-like mobile web (PWA, dashboard, social, commerce) with 3–5 equal top-level destinations. Bottom placement suits thumbs **[synthesis: thumb-zone research by Steven Hoober is widely cited but was not fetched]**.

**Variants**: (1) **classic 5-up**, icon plus label with a filled vs outline icon for the active state; (2) **pill active indicator** (Material 3 style, a 64×32 pill behind the active icon **[synthesis]**); (3) **floating tab bar** detached from the edges with rounded corners (iOS 26 "Liquid Glass" made a floating, minimise-on-scroll tab bar the platform norm, **unverified**: the HIG page did not render for the fetcher); (4) **centre FAB notch** (raised "+" for create); (5) **sliding blob indicator** (one element moves between tabs, spring physics); (6) **minimise on scroll**: shrinks to icon-only or a single active pill while scrolling down and restores on scroll up (re-use `scroll-state(scrolled)`); (7) **search tab separated** to the right as its own circular button (iOS 26 pattern, unverified); (8) **label-on-active-only** (inactive tabs icon-only, the active one expands to show its label; use it only when icons are unambiguous); (9) **tablet: converts to a navigation rail** on the left at about ≥600–840px.

**Build notes (source: [MDN env()](https://developer.mozilla.org/en-US/docs/Web/CSS/env))**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```
```css
.tabbar { position: fixed; inset: auto 0 0 0; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr;
  padding: .5rem .5rem calc(.5rem + env(safe-area-inset-bottom, 0px)); }
main { padding-bottom: calc(4.5rem + env(safe-area-inset-bottom, 0px)); }
.tabbar a { min-height: 48px; display: grid; place-items: center; gap: 2px; font-size: 12px; }
```
Also: use `100dvh`/`100svh` instead of `100vh` for full-height layouts (the outdated `100vh` jumps when mobile browser chrome shows or hides) **[synthesis]**. Hide the tab bar while the on-screen keyboard is open (VirtualKeyboard API or `visualViewport` resize) **[synthesis]**.

**Accessibility.** It is navigation, not tabs: `<nav aria-label="Primary">` with links and `aria-current="page"`. Do **not** use `role="tablist"` for route changes, because NN/g says don't mix in-page tabs and navigation tabs. Badges need text ("Inbox, 3 unread") via visually hidden text.

---

#### 5. Breadcrumbs

**When.** Hierarchies three or more levels deep. Skip them on flat or linear sites (NN/g, Q3).

**Variants**: (1) classic `Home / Category / Page` with CSS separators (`li + li::before { content: "/"; }`, or a chevron mask-image); (2) **collapsed middle**, `Home / … / Parent / Current` where the ellipsis is a disclosure revealing the hidden levels; (3) **mobile "back to parent"**, showing only `‹ Parent` (NN/g endorses shortening to the last one or two levels on mobile); (4) **horizontally scrollable** single line with fade masks at the edges (`mask-image: linear-gradient(...)`) and auto-scroll to the end; (5) **dropdown siblings**, where each crumb has a chevron that opens sibling pages (file-manager style); (6) **pill / chip crumbs** (app UIs); (7) **breadcrumb inside the header** that replaces the title on scroll (docs) **[synthesis]**; (8) **schema-enhanced**, with `BreadcrumbList` JSON-LD for search results **[synthesis]**.

**Code (sketch, follows the APG pattern)**
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

---

#### 6. Tabs / segmented controls

**When.** Switching between peer views of the same context **without navigation**. Segmented controls are 2–5 options that change a view or filter (a monthly/annual price toggle, list/grid view).

**Variants**: (1) **underline tabs with sliding indicator**, one indicator element whose `translate`/`width` follows the active tab (or animated with View Transitions `view-transition-name: tab-indicator`); (2) **pill / segmented** with a "thumb" that slides behind the active label (iOS segmented); (3) **animated background tabs** (Aceternity Animated Tabs https://ui.aceternity.com/components/tabs, a shared-layout `layoutId` motion); (4) **vertical tabs** (settings pages; set `aria-orientation="vertical"`); (5) **scrollable tab strip** on mobile with snap and edge fade; (6) **stacked-card / folder tabs** that look like file folders (editorial or playful); (7) **tabs with preview media** (feature sections where each tab swaps a screenshot, with an auto-advance progress line under the active tab that pauses on hover or focus); (8) **expanding bar tabs** (Codrops ExpandingBarMenus https://github.com/codrops/ExpandingBarMenus); (9) **segmented price toggle** with a "Save 20%" badge attached to the annual option.

NN/g (cited in Q3): two or more selection indicators, no thin 1px or low-contrast indicators, a single row, short labels without all caps, tabs on top and connected to the panel. On mobile, prefer accordions for long content.

**Code: roving tabindex plus automatic activation (sketch, follows the APG keyboard model)**
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
For a segmented control that filters a view without panels, a **radio group** (`<fieldset>` with `<input type=radio>` styled as segments) is simpler and more correct than tabs **[synthesis]**.

---

#### 7. Pagination, infinite scroll, load more

**When (NN/g, Q3).** Infinite scroll for homogeneous, browse-without-a-goal feeds. Pagination for goal-directed search, comparison and returning to results. Load More for a middle ground that keeps the footer reachable.

**Variants**: (1) **numbered pagination** `‹ 1 … 4 5 [6] 7 8 … 20 ›` with first and last always visible and a 1–2 sibling window; (2) **compact "Page 6 of 20"** with prev/next plus a jump-to-page input (mobile); (3) **Load More button** with a count ("Show 24 more · 120 of 480") and a progress bar; (4) **infinite scroll with page markers** ("integrated pagination", where landmark dividers "Page 3" appear in the feed and the URL updates via `history.replaceState`); (5) **hybrid**: auto-load two pages, then switch to a Load More button so the footer is reachable; (6) **cursor-based "Older / Newer"** for blogs and timelines; (7) **scroll-snapped carousel pagination** with dots or numbered fraction (`3 / 8`) for galleries; (8) **big-typography pagination**, with "Next project →" as a full-width hover-reveal of the next case study (portfolio sites) **[synthesis]**; (9) **skeleton loaders** that match card geometry instead of spinners.

**Accessibility and implementation (sketch)**
```html
<nav aria-label="Pagination"><ul>
  <li><a href="?page=5" rel="prev">Previous<span class="vh"> page</span></a></li>
  <li><a href="?page=5" aria-label="Page 5">5</a></li>
  <li><a aria-current="page" aria-label="Page 6">6</a></li> ... </ul></nav>
```
On Load More: append items, then **move focus to the first new item** (give it `tabindex="-1"`) and announce via an `aria-live="polite"` region ("24 more products loaded"). For infinite feeds use `role="feed"` with `article` children that have `aria-posinset`/`aria-setsize` (APG Feed pattern). Restore scroll position on Back (store the page or cursor in the URL, plus `history.scrollRestoration`).

---

#### 8. Footers

**Variants**: (1) **fat footer / sitemap footer** with 4–6 link columns, newsletter, locale/currency switcher, legal row (large sites); (2) **minimal**, one line with ©, 2–3 links and socials; (3) **big-typography footer**, a giant wordmark or "Let's talk" CTA set at 15–25vw spanning the viewport edge to edge, often clipped by the bottom edge or animated in by letters (Footer.design "Large Type" category); (4) **reveal / curtain footer**, fixed or sticky behind the content and uncovered as the page scrolls away (Piccalil code below); (5) **marquee footer**, an endless scrolling line of CTA or client names (pause on hover and for reduced motion); (6) **interactive or illustrative footer**: physics-dropped tags (Matter.js), a cursor-reactive SVG, a 3D object (Footer.design "Animated" and "Illustrative" categories); (7) **contact-as-footer**, where the whole last viewport is a contact section with email in huge type and a copy-to-clipboard tooltip; (8) **local time + status** ("Based in Lisbon · 14:32 · Available Jan 2027") on portfolio sites **[synthesis]**; (9) **back-to-top with scroll progress ring**; (10) **grid / bento footer** (Footer.design "Grid"); (11) **dark inverted footer** that the page "falls into", with a colour transition driven by a `view()` timeline as the footer enters.

**Curtain footer (source: [Piccalil](https://piccalil.li/blog/sticky-revealing-footer))**
```css
header, main { position: relative; z-index: 1; background: var(--bg); transform: translate3d(0,0,0); }
footer { position: sticky; bottom: 0; z-index: 0; }
```
Add a parallax lift with `@supports (animation-timeline: view())`: footer content starts at `translateY(-30%)` and moves to 0 over `animation-range: entry 0% entry 100%` **[sketch]**. Make sure the footer is no taller than the viewport, or its top will never be reachable **[synthesis]**.

**Accessibility.** `<footer>` at the top level is the `contentinfo` landmark. Multiple link groups use headings (`<h2>`) rather than a `nav` each. Only wrap a group in `<nav aria-label="Footer">` if it is truly site navigation (APG landmarks, Q3). Keep the contrast of the "muted" legal text ≥4.5:1.

---

#### 9. Scroll progress, section indicators, table-of-contents nav

**Variants**: (1) **top progress bar** (2–4px, `scaleX` from 0 to 1, attached under the header); (2) **circular progress ring** around a back-to-top button (`stroke-dashoffset` driven by a scroll timeline); (3) **reading time remaining** ("4 min left") **[synthesis]**; (4) **sticky TOC with scrollspy**, where the active heading is highlighted with a sliding marker and the item set to `aria-current="true"`; (5) **TOC with progress rail**, a vertical line that fills per section, or an SVG path that traces the indented TOC shape (the "TOC path" technique; Aceternity Tracing Beam is a relative https://ui.aceternity.com/components/tracing-beam); (6) **dot section indicator** on the right edge of one-page sites (dots with labels revealed on hover or focus); (7) **numbered section counter** ("03 / 07") in the header that updates as sections pass; (8) **mobile collapsed TOC**, a sticky "On this page: Current section ▾" bar that opens a sheet; (9) **horizontal chapter bar** for long-form editorial with chapter ticks on the progress bar; (10) **minimap** (a scaled page thumbnail with viewport frame) for docs or code **[synthesis]**.

**Code: CSS-only progress bar (sketch)**
```css
.progress { position: fixed; inset: 0 0 auto; height: 3px; transform-origin: 0 50%; background: var(--accent);
  animation: grow linear both; animation-timeline: scroll(root block); }
@keyframes grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@supports not (animation-timeline: scroll()) { .progress { display: none } } /* or a JS fallback */
```
**Scrollspy (sketch).** An `IntersectionObserver` on headings with `rootMargin: "0px 0px -70% 0px"`. Set `aria-current="true"` on the matching TOC link. Don't steal focus. Scroll-driven-animation scrollspy with `view-timeline` and `timeline-scope` works without JS in Chromium **[synthesis]**. The progress bar is decorative (`aria-hidden="true"`), or use `role="progressbar"` with `aria-valuenow` if it carries meaning.

---

#### 10. Skip links and anchor navigation

**Variants**: (1) the standard **"Skip to main content"**, off-screen until focused and then sliding down as a high-contrast pill at the top left; (2) **multi-target skip menu** (Main content / Search / Footer). WebAIM says one is usually enough, so use more only for very complex pages; (3) **in-page anchor nav** (sticky sub-nav of section links on long product or landing pages, with an active indicator); (4) **back-to-top** button appearing after one viewport; (5) **heading anchors** (a "#" link on hover or focus beside each heading, copying a deep link) **[synthesis]**.

**Code (sketch, following WebAIM's off-screen-then-on-screen technique)**
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
`tabindex="-1"` on `<main>` makes focus move reliably in all browsers **[synthesis; WebAIM did not mention it]**. Use `scroll-padding-top` so a sticky header doesn't cover anchored headings, which is a very common bug.

### Gaps
- The Codrops demos listing pages returned **403** to the fetcher, so demos after mid-2025, other than EaseReverseClipMenu and the snippet-listed "Menu Nav GSAP", could not be enumerated. Check https://tympanus.net/codrops/demos/?tag=menu manually.
- Awwwards, FWA, CSS Design Awards, Godly, Land-book, Lapa Ninja, SiteInspire, One Page Love, Httpster and Mobbin were **not fetched** in this pass, so no award-winning site URLs from those galleries are cited. Variants attributed to "Awwwards-style" practice are synthesis. Starting points to check: https://www.awwwards.com/websites/navigation/ (unverified URL), https://godly.website, https://footer.design, https://mobbin.com.
- Specific Stripe, Linear, Raycast and Vercel nav behaviours are described from background knowledge, not fetched.
- No Footer.design example URLs were retrieved, only its categories.

---

## Q2. Which component libraries and snippet sites give high-quality, non-generic versions?

### Takeaway
Use **headless, accessibility-first primitives** (Radix, React Aria, Ark UI, Headless UI, `cmdk`) for behaviour, and **effect libraries** (Aceternity, Magic UI, Codrops, Uiverse) for motion ideas. Never ship an effect component without checking its keyboard and ARIA behaviour. Radix NavigationMenu and cmdk are the strongest verified primitives for mega menus and command palettes.

### Cited Findings
- **Radix NavigationMenu**: Root, List, Item, Trigger, Content, Viewport, Indicator, Link, Sub. It follows the `navigation` role and **deliberately does not use `role="menu"`** (reserved for desktop-app menus). Keyboard: Enter/Space open, arrows move between triggers, ArrowDown enters content (horizontal), Home/End, Esc closes and returns focus. Use `NavigationMenu.Link` for every link so `aria-current` and keyboard handling stay consistent. — [Radix](https://www.radix-ui.com/primitives/docs/components/navigation-menu)
- **cmdk**: unstyled composable primitives (Command, Input, List, Item, Group, Dialog) with automatic filtering and sorting. `Command.Dialog` wraps Radix Dialog for focus trap and Esc. The command palette is fundamentally the **ARIA combobox** pattern: the input keeps focus, `aria-activedescendant` points at the highlighted option, the wrapper or input has `aria-expanded`, `aria-controls` and `aria-haspopup="listbox"`, and the input has `aria-autocomplete="list"`. — [openapps.pro cmdk listing](https://openapps.pro/packages/cmdk); [CnCommandPalette docs](https://nextcloud-vue.conduction.nl/docs/components/cn-command-palette/); [buildmvpfast 2026 guide](https://www.buildmvpfast.com/blog/how-to-add-cmd-k-command-palette-saas-2026). Caveat: these are secondary or vendor pages, and performance or axe claims on an "agent pack" page were unmeasured. — [Linear-style palette pack](https://agentworkspace-flax.vercel.app/packs/linear-command-palette)
- **Aceternity UI** navigation set (Floating Navbar, Resizable Navbar, Floating Dock, Sidebar, Animated Tabs, Navbar Menu, Notch, Tracing Beam, Timeline, plus navbar, sidebar and footer blocks). URLs are in Q1. — [Aceternity](https://ui.aceternity.com/components)
- **Magic UI** Dock and Scroll Progress, installed via the shadcn registry (`@magicui/dock`). — [Magic UI](https://magicui.design/docs/components/dock)
- **Codrops** GitHub org: dozens of MIT-licensed menu and nav demos, listed in Q1. — [github.com/codrops](https://github.com/Codrops)
- **Galleries**: Navbar Gallery (by category and style), Footer.design (by visual approach). — [Navbar Gallery](https://www.navbar.gallery/); [Abduzeedo on Footer.design](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth)

### Inferences
Library map by job **[synthesis, not individually verified this pass]**:

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

### Gaps
- React Aria, Ark UI, Park UI, Headless UI, Untitled UI, Tailwind Plus, HyperUI, Flowbite, DaisyUI, Preline, 21st.dev, Uiverse and shadcn pages were **not fetched** this pass. The table above is from background knowledge.
- No independent accessibility audit comparing these libraries was found.

---

## Q3. What are the correct ARIA patterns and mobile UX conventions?

### Takeaway
Site navigation is **links in a labelled `<nav>`, with disclosure buttons for submenus**, not `role="menu"`/`menubar`. Tabs, combobox (command palette), feed (infinite scroll) and dialog (drawers and overlays) each have a strict APG keyboard model. On mobile: keep ≤4 top-level links visible if possible, give targets at least 24×24 CSS px (WCAG AA) and preferably about 44–48px, and pad fixed bars with `env(safe-area-inset-*)`.

### Cited Findings

**Navigation landmarks and disclosure menus**
- Use `<nav>` (or `role="navigation"`). With more than one nav landmark, each needs a **unique label** (e.g. `aria-labelledby` pointing at a heading). Two navs with identical link sets share the same label. — [APG Navigation landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html)
- APG's disclosure navigation example: each top-level item is a `<button aria-expanded aria-controls>` that toggles a list of links. The current page link carries `aria-current="page"`. Tab/Shift+Tab move through buttons and links. Enter/Space toggle. **Esc closes and returns focus to the button.** Arrow, Home and End keys are optional extras. The example **does not use `role=menu`**, because menu roles make assistive tech expect complex application-menu behaviour that site nav doesn't need. Closing on Esc and on focus loss supports WCAG 1.4.13 (Content on Hover or Focus). — [APG Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

**Tabs**
- `role="tablist"` (labelled), `role="tab"` with `aria-selected` and `aria-controls`, `role="tabpanel"` with `aria-labelledby`, and `aria-orientation="vertical"` for vertical lists. Tab enters on the active tab, and Tab again leaves to the panel. Left/Right arrows wrap (Up/Down for vertical, and Up/Down are *not* captured for horizontal lists). Home/End optional. Delete optional for closable tabs. **Automatic activation** only when panels display without noticeable latency, otherwise **manual activation** (Enter/Space). A panel with no focusable first element gets `tabindex="0"`. — [APG Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

**Breadcrumbs**
- Breadcrumbs go inside a labelled navigation landmark (`aria-label`/`aria-labelledby`). The current page link gets `aria-current="page"`. No special keyboard behaviour. — [APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

**Command palette (combobox)**
- The input keeps DOM focus. `aria-activedescendant` tracks the highlighted option. The input or wrapper has `role="combobox"`, `aria-expanded`, `aria-controls` (listbox id), `aria-haspopup="listbox"`, `aria-autocomplete="list"`. Arrows move, Enter selects, Esc closes and returns focus. — [CnCommandPalette docs](https://nextcloud-vue.conduction.nl/docs/components/cn-command-palette/); [buildmvpfast](https://www.buildmvpfast.com/blog/how-to-add-cmd-k-command-palette-saas-2026)

**Infinite scroll**
- Use the ARIA `feed` role so screen-reader users can move through an infinite list and keyboard users can skip past it. Provide a loading indicator, save the list position for Back, and offer Load More or a stopping point so the footer stays reachable. Avoid infinite scroll for goal-directed finding, comparison, low-bandwidth audiences or audiences with high accessibility needs. — [NN/g Infinite Scrolling Tips](https://www.nngroup.com/articles/infinite-scrolling-tips/)

**Skip links**
- Place the link first in the focus order, pointing at `<main id="…">`. Hide it off screen and reveal it prominently on focus. **Never** use `display:none`/`hidden`, zero size, transparency or matching colours. Wording: "Skip to main content". Usually one is enough. Don't reorder visual vs DOM order. — [WebAIM Skip Navigation](https://webaim.org/techniques/skipnav/)

**Hidden vs visible navigation (hamburger evidence)**
- NN/g study (179 participants, 6 sites): hidden nav was used 27% of the time on desktop vs 48% visible and 50% combo. On mobile, 57% hidden vs 86% combo. Discoverability dropped by more than 20% with hidden nav. Task time was at least 39% longer on desktop and 15% longer on mobile vs combo. Difficulty was 2.6 (hidden) vs 2.3 (combo) vs 2.1 (visible). Recommendation: **desktop, avoid hidden nav**. **Mobile: show top-level links if there are four or fewer**, otherwise hide some but add in-page links to key content. — [NN/g Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/)

**Sticky headers**
- Use them only if their content is needed often. Partially persistent (hide down, show up) with a reveal from a small upward scroll, a 300–400 ms slide that completes even if scrolling stops. Keep them short. Touch targets about 1 cm and text near 16pt. Use **opaque**, contrasting backgrounds (avoid translucent headers). Use minimal animation. No delayed "stalker" menus. No redundant second sticky bar. — [NN/g Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)

**Mega menus**
- Hover delay about 0.5 s before opening, display within 0.1 s, stay open 0.5 s after the pointer leaves, hide in under 0.1 s. Support diagonal movement toward the panel. Group options (card sorting), with the most important group top left. No form widgets inside. Keep search visible outside. Use strong borders. Simplest accessible approach: top-level items link to a plain HTML page listing all the options. — [NN/g Mega Menus](https://www.nngroup.com/articles/mega-menus-work-well/)
- Radix uses shorter defaults: a 200 ms open delay and a 300 ms skip delay when moving between triggers. — [Radix](https://www.radix-ui.com/primitives/docs/components/navigation-menu). (The two sources differ. NN/g's 0.5 s is conservative, and 150–300 ms is common in production UI.)

**Breadcrumb UX (NN/g, 11 guidelines)**
- Show location (hierarchy), not session history. One canonical path on polyhierarchical sites. ">" or "/" separators. The current page is last and **not a link**. Breadcrumbs supplement global nav and don't replace it. Every crumb links to a real page. Start with Home (unless Home is in the global nav). Skip on flat or linear sites. **Mobile:** no multi-line wrapping, targets ≥1 cm × 1 cm, may shorten to the last one or two levels (e.g. just the parent). — [NN/g Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/)

**Tabs UX (NN/g)**
- Accordions on mobile, tabs on desktop. At least two selection indicators. No 1px or low-contrast indicators. Keep inactive tabs readable. One row only. 1–2-word plain labels, no all caps. Tabs above the panel and visually connected to it. Don't use tabs for comparison or critical info, when labels can't be concise, or when mixing in-page tabs with navigation tabs. — [NN/g Tabs Used Right](https://www.nngroup.com/articles/tabs-used-right/)

**Touch targets and safe areas**
- WCAG 2.2 SC 2.5.8 (AA): pointer targets of at least **24×24 CSS px**, or undersized targets spaced so a 24px circle centred on each doesn't intersect others. Inline text links are exempt. SC 2.5.5 (AAA) is the stricter enhanced version. — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- `env(safe-area-inset-top|right|bottom|left)` gives the insets from notches and rounded corners (0 on rectangular viewports). Pad fixed bottom bars with `calc(1em + env(safe-area-inset-bottom, 0px))` and pad `main` to match. — [MDN env()](https://developer.mozilla.org/en-US/docs/Web/CSS/env)

### Inferences
**Pattern cheat-sheet [synthesis built on the cited APG pages]**

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

**Mobile conventions [synthesis]**
- Touch targets: WCAG AA minimum 24px (cited). Platform guidance is **44×44pt (Apple HIG)** and **48×48dp (Material)**. NN/g's "≈1 cm" sits in the same range. Use 44–48px for primary nav and keep ≥8px between adjacent targets.
- Thumb zone: primary actions in the bottom third, which argues for bottom tab bars, bottom sheets and bottom-placed floating pills on phones. Destructive or rare actions belong at the top.
- `viewport-fit=cover` plus `env(safe-area-inset-*)` for fixed top and bottom bars. Use `dvh`/`svh` units, not `100vh`.
- Material 3 bar vs rail vs drawer: navigation bar on compact (<600dp) with 3–5 destinations, navigation rail on medium and expanded. M3 Expressive (2025) reportedly shortened the bar and favoured an expandable rail over the modal drawer. **Unverified**, because the M3 page did not render.
- iOS 26 (Liquid Glass, 2025) floating tab bar with minimise-on-scroll and a separate search tab. **Unverified**, because the HIG page did not render.
- Always honour `prefers-reduced-motion`: replace slides and clip reveals with opacity fades, and disable marquees and parallax.
- Lock background scroll while overlays are open (`<dialog>` modal, or `overflow:hidden` on `html` plus `scrollbar-gutter: stable`), and use `overscroll-behavior: contain` in panels.

### Gaps
- Apple HIG (tab bars) and Material 3 (navigation bar) pages returned no body content to the fetcher. Their numeric guidance (44pt, 48dp, 3–5 destinations, breakpoints, iOS 26 and M3 Expressive changes) is from background knowledge and should be verified.
- APG Feed, Menu Button, Dialog (Modal) and Tree View pages were not fetched this pass. The descriptions are from background knowledge consistent with the APG.
- Steven Hoober's thumb-zone research and Baymard pagination studies were not fetched.

---

## Q4. What common mistakes make navigation feel generic or broken?

### Takeaway
"Broken" usually means hidden desktop nav, hover-only or flickery menus, low-contrast translucent sticky headers, unreachable footers under infinite scroll, focus not managed in overlays, and anchors hidden under sticky headers. "Generic" means stock layouts with no spatial motion, no typographic voice, identical glass pills, and the same gradient CTA as every AI-generated landing page.

### Cited Findings
- Hidden (hamburger) nav on desktop cuts discoverability by more than 20% and lengthens tasks by at least 39%. Small icons have low salience and low information scent. — [NN/g Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/)
- Sticky-header mistakes: translucent low-contrast headers, low-contrast submenus, oversized logos, delayed or exaggerated animations ("stalker" menus), redundant sticky bars. — [NN/g Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)
- Mega-menu mistakes: hard-to-scan labels or labels that repeat the same first word, undifferentiated groups, tiny touch targets, finicky show/hide that hurts motor-impaired users, faint cues for off-screen content, duplicate options, overloading, form widgets inside the menu. — [NN/g Mega Menus](https://www.nngroup.com/articles/mega-menus-work-well/)
- Tabs mistakes: thin or low-contrast indicators, stacked rows, all-caps labels, branded labels, gaps between tabs and panel, mixing navigation and in-page tabs, hiding critical content in non-default tabs. — [NN/g Tabs](https://www.nngroup.com/articles/tabs-used-right/)
- Breadcrumb mistakes: history-based trails, linking the current page, crumbs pointing to non-pages, breadcrumbs on flat sites, multi-line wrapping on mobile. — [NN/g Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/)
- Infinite-scroll mistakes: unreachable footer, losing position on Back, no loading indicator (illusion of completeness), poor performance on mobile data, SEO crawl issues. — [NN/g Infinite Scrolling](https://www.nngroup.com/articles/infinite-scrolling-tips/)
- Skip-link mistakes: `display:none`/`hidden`, transparent or zero-size links, not being first, too many skip links, CSS reordering. — [WebAIM](https://webaim.org/techniques/skipnav/)
- Using `role="menu"` for site navigation imposes application-menu expectations. Use disclosure plus links instead. — [APG Disclosure Navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/); [Radix](https://www.radix-ui.com/primitives/docs/components/navigation-menu)
- Reveal footers: forgetting `main`'s background or stacking context, Safari z-index flicker, possible broken clicks. — [Piccalil](https://piccalil.li/blog/sticky-revealing-footer); [Shopify community](https://community.shopify.com/t/how-to-create-a-sticky-footer-that-reveals-on-scroll-theme-broadcast/333363/2)

### Inferences
**"AI-slop" or template tells to avoid [synthesis]**
1. A floating glassmorphism pill with `backdrop-blur` and white-on-photo text at 3:1 contrast, used on every site regardless of brand.
2. Centred logo, five links, a purple-to-blue gradient "Get Started" button, and a moon icon for dark mode, identical to thousands of templates.
3. Every element fading up 20px at once on load. No choreography and no origin. Menus that fade in instead of growing from their trigger.
4. Hamburgers on desktop with three items. Icon-only nav without labels.
5. A fat footer of 5 columns × 6 links ("Company / Resources / Legal …") that duplicates the header with no hierarchy, plus a newsletter box with no reason to subscribe.
6. A mega menu that is just a long dropdown, or one that opens on hover with zero delay and closes when the cursor crosses a gap.
7. Tabs where the indicator jumps instead of sliding, or the active state is only a colour change.
8. A scroll progress bar on short pages, or a progress bar that doesn't account for the footer.
9. Lorem-ipsum labels ("Solutions", "Platform", "Resources") with no information scent.
10. Emoji or Lucide icons slapped beside every link.

**What makes it feel crafted [synthesis]**
- **Motion with origin and continuity**: an element morphs instead of a new element appearing (shared-element transitions via the View Transitions API, GSAP Flip, Radix Viewport). Menus open from the button, and indicators travel.
- **Easing personality**: custom curves (`cubic-bezier(.2,.8,.2,1)` for UI, spring overshoot for playful brands). Faster exits than entries (EaseReverseClipMenu's whole premise is reverse easing that feels intentional, per its README). Open about 250–450ms and close about 150–250ms.
- **Typographic voice**: nav set in the brand's display face or a mono for counters. Big-type overlays and footers with tight tracking. Numbered indices.
- **Context-awareness**: header theme follows section colour, a section counter, local time or status in the footer, active-section highlighting.
- **Perfect state coverage**: hover, focus-visible (designed, not the browser default ring), active, current, disabled, loading, reduced-motion, touch (no hover-only affordances), RTL.
- **Performance**: animate only `transform`, `opacity`, `clip-path` and `filter`. Use `content-visibility` for long footers or feeds. No layout thrash from scroll listeners (use `{passive:true}`, rAF, or CSS scroll-state and scroll timelines).

**Outdated techniques to flag (as of Nov 2026) [synthesis unless cited]**

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
| Named anchors `<a name>` | `id` targets (named anchors are non-conforming in HTML5, per [WebAIM](https://webaim.org/techniques/skipnav/)) |
| Hover-only mega menus | Click or tap plus hover-intent with delay, and keyboard disclosure ([NN/g](https://www.nngroup.com/articles/mega-menus-work-well/)) |
| Translucent sticky headers | Opaque or solid-tint headers ([NN/g](https://www.nngroup.com/articles/sticky-headers/)) |

### Gaps
- No quantitative study was found on "generic vs crafted" perception. The AI-slop tells are qualitative synthesis.
- Browser support for CSS anchor positioning, `@starting-style`, `interpolate-size` and scroll-driven animations in Safari and Firefox as of November 2026 was **not verified** this pass. Check caniuse.com before relying on them without fallbacks.
