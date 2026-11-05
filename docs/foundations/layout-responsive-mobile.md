# Layout, Responsive and Mobile

How to lay out a site that adapts intrinsically from phone to desktop: grids, subgrid, breakpoints, container queries, `:has()`, viewport units, safe areas, touch targets, thumb zones, hover/pointer media queries, responsive images, mobile navigation and PWA basics, ending with a copy-paste mobile starter. Facts are as of 5 Nov 2026. Cited facts carry inline links. **(synthesis)** marks long-established practice not re-verified line by line, and **(bg, unverified)** marks background knowledge. Snippets are untested.

## Contents

1. [Principles](#1-principles)
2. [Grids](#grids)
3. [Breakpoints](#3-breakpoints)
4. [Container queries](#4-container-queries)
5. [`:has()` for parent and state styling](#5-has-for-parent-and-state-styling)
6. [Viewport units: vh = lvh, svh vs dvh](#6-viewport-units-vh--lvh-svh-vs-dvh)
7. [Safe areas](#7-safe-areas)
8. [Touch targets (WCAG 2.5.8)](#8-touch-targets-wcag-258)
9. [Thumb zones and mobile navigation](#9-thumb-zones-and-mobile-navigation)
10. [Hover and pointer media queries](#10-hover-and-pointer-media-queries)
11. [Zoom](#11-zoom)
12. [Responsive images](#12-responsive-images)
13. [PWA basics](#13-pwa-basics)
14. [Mobile starter snippet](#mobile-starter-snippet)
15. [Gaps](#15-gaps)
16. [Sources](#sources)

---

## 1. Principles

- Go **content-first and intrinsic**: fluid type and space (see [design-tokens-color-type.md](design-tokens-color-type.md#6-fluid-type-and-space-with-clamp-and-utopia)), `auto-fit/minmax` grids, and **container queries for components**.
- Media queries are only for **macro layout** and **capability** (`hover`, `pointer`, `prefers-*`).
- Size full-height mobile sections with `svh` (or `dvh` when an exact fit matters) and pad for safe areas.
- Make touch targets **44–48px**, even though WCAG AA only requires **24px**.
- Design mobile and desktop wireframes together (see [00-start-here](../00-start-here.md#3-wireframe-mobile-and-desktop-together)).

---

## Grids

### Macro grid (synthesis)
- 12 columns: `grid-template-columns: repeat(12, minmax(0,1fr))`, or **named areas** for macro layout.
- **Subgrid** so card internals (title, body, CTA) align across rows. Subgrid: Baseline since Sept 2023 (bg, unverified).
- **Breakout pattern** for editorial pages:

```css
grid-template-columns:
  [full-start] minmax(var(--gutter),1fr)
  [content-start] min(65ch,100%) [content-end]
  minmax(var(--gutter),1fr) [full-end];
```

- Intrinsic card grid (from the starter): `grid-template-columns: repeat(auto-fit, minmax(min(18rem,100%),1fr));`

### Layout that avoids the generic look (cited)
- Break the centred hero + 3 boxes pattern with **asymmetric layouts, split screens, generous negative space**, and references such as **Japanese print design**. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Vary radius, padding and card sizes *deliberately* to build hierarchy. — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Bento (modular varied-size tiles): good for feature overviews, dashboards, personal sites; avoid on every section, because "uniform bento is just slop with extra steps" (synthesis).

Editor's note: per note 03, native masonry ("Grid Lanes", `display: grid-lanes`) had shipped only in Safari 26.4+ as of mid-2026; build it as progressive enhancement over a normal grid. Bento and masonry builds are in [components/content-display.md](../components/content-display.md).

---

## 3. Breakpoints

- Set breakpoints where the **content** breaks, e.g. **40rem, 64rem, 80rem**, in `em/rem`, not at device widths (synthesis).
- Container queries handle most component-level changes; media queries handle page-level layout.

---

## 4. Container queries

- **Container size queries + units:** Baseline since Feb 2023 (bg, unverified). The primary component-responsive tool.
- **Container query units** `cqw / cqh / cqi / cqb / cqmin / cqmax` are 1% of the query container; with no eligible container they fall back to small-viewport (`sv*`) units. — [MDN: length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- **Container style queries:** Baseline 2026. — [web.dev/baseline/2026](https://web.dev/baseline/2026). Use with a fallback for older devices.

```css
.card-wrap { container-type: inline-size; }
@container (inline-size > 32rem) { .card { grid-template-columns: 2fr 3fr; } }
```

- **Tailwind v4** container queries: `@container` on the parent, then `@sm:grid-cols-3`, `@max-md:grid-cols-1`, and ranges such as `@min-md:@max-xl:hidden`. — [tailwindcss.com v4](https://tailwindcss.com/blog/tailwindcss-v4)

Editor's note: scroll-state container queries (`stuck`, `snapped`, `scrollable`) are Chromium-only from Chrome 133 per note 07; see [animations/browser-support.md](../animations/browser-support.md).

---

## 5. `:has()` for parent and state styling

- `:has()`: Baseline since Dec 2023 (bg, unverified). Safe to use.

```css
.form:has(:user-invalid) .submit { opacity:.6; }   /* :has() for parent/state styling */
```

---

## 6. Viewport units: vh = lvh, svh vs dvh

Source: [MDN: length](https://developer.mozilla.org/en-US/docs/Web/CSS/length).

| Unit family | Meaning | Stable? |
|---|---|---|
| `sv*` (`svh`, `svw`…) | Smallest viewport (browser UI shown) | Yes. MDN calls it "safer in general" |
| `lv*` | Largest viewport (UI hidden) | Yes |
| `dv*` | Tracks UI expanding and retracting | No. Can make content resize during scroll and cause a performance hit |
| `vh` | **Equals `lvh`** | Why `100vh` heroes get cut off under the mobile URL bar |

```css
.hero { min-block-size: 100svh; }                 /* not 100vh */
.sheet { max-block-size: 100dvh; }                /* exact fit for overlays */
```

---

## 7. Safe areas

- Opt in with `viewport-fit=cover` in the viewport meta, then pad with `env(safe-area-inset-*)` (synthesis):

```css
.app-bar { padding-inline: max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-right));
           padding-block-end: max(.75rem, env(safe-area-inset-bottom)); }
```

- Test safe areas, `svh`, target sizes and the virtual keyboard on real iOS Safari and Android Chrome devices (see [launch-checklist.md](launch-checklist.md)).

---

## 8. Touch targets (WCAG 2.5.8)

**WCAG 2.2 SC 2.5.8 Target Size (Minimum), Level AA** — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html):
- Pointer targets must be at least **24×24 CSS px**.
- Undersized targets pass if a **24px-diameter circle** centred on each target does not intersect another target or another undersized target's circle.
- Exceptions: **Spacing, Equivalent, Inline** (in sentences), **User-agent control**, and **Essential**.
- The Understanding doc says important controls should consider the stricter **2.5.5 Target Size (Enhanced)**.
- Comfort sizes: **44px (Apple HIG)** and **48dp (Material)** are background knowledge, unverified; the fetched W3C page did not state 2.5.5's 44px value.

```css
.btn, .nav a { min-block-size: 44px; min-inline-size: 44px; }  /* 24px = AA floor; 44–48 = comfort */
```

**Rauno Freiberg on touch** — [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design):
- Fitts's law: corners and edges act as near-infinite targets; radial menus put every option at equal distance.
- Keep content visible under the finger: a loupe over the caret, enlarged keys, drag that stays active after the finger leaves a small slider.
- Respond from the first pixel of a gesture; lightweight actions can fire mid-gesture, destructive ones wait for gesture end.

WCAG 2.5.7 Dragging Movements: provide a non-drag alternative (see [accessibility.md](accessibility.md)).

---

## 9. Thumb zones and mobile navigation

(synthesis)
- Put primary actions in the **bottom third** on mobile: a bottom tab bar of **at most 5 items**, or a bottom sheet.
- Hamburger menus hide navigation. On content sites keep **3–5 key links visible** or use a **priority+** pattern.
- A full-screen menu should use `<dialog>` or `popover` with a **focus trap** and **Esc to close**.
- Use `scroll-padding-top` equal to the sticky header height so focused elements and anchors are not hidden.

Editor's note: note 01 adds that site navigation should be links in a labelled `<nav>` with disclosure buttons for submenus (not `role="menu"`/`menubar`), and recommends keeping ≤4 top-level links visible on mobile where possible. Full patterns are in [components/navigation-structure.md](../components/navigation-structure.md).

---

## 10. Hover and pointer media queries

- Gate hover effects so touch devices do not get sticky hover:

```css
@media (hover: hover) and (pointer: fine) { .card:hover { translate: 0 -2px; } }  /* no sticky hover on touch */
```

- Never hide information behind hover; give touch users an `:active` or focus equivalent (see [animations/hover-effects.md](../animations/hover-effects.md)).

---

## 11. Zoom

- **Don't disable pinch zoom.** No `maximum-scale=1` or `user-scalable=no`. High priority in the Front-End Checklist, as is using **relative units**. — [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- Reflow (WCAG 1.4.10): no horizontal scroll at **320 CSS px** wide (400% zoom).

---

## 12. Responsive images

- **`sizes="auto"`** for `loading="lazy"` images now works in **Safari 27, Chrome 126+ and Firefox**. — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026)
- Formats (synthesis): **AVIF, then WebP, then JPEG** via `<picture>`.
- `srcset` widths **400 / 800 / 1200 / 1600 / 2400** with a realistic `sizes`.
- Always set `width` and `height` (or `aspect-ratio`) to avoid CLS.
- The **LCP image** gets `fetchpriority="high"` and **no lazy loading**.
- Everything below the fold gets `loading="lazy" decoding="async"`.
- Use `<picture>` with `media` for **art direction**, e.g. a tight crop on mobile.

Editor's note: the following assembles the bullets above into one pattern. File names are placeholders; untested.

```html
<!-- LCP hero: no lazy, high priority -->
<picture>
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w, hero-2400.avif 2400w" sizes="100vw">
  <source type="image/webp" srcset="hero-800.webp 800w, hero-1600.webp 1600w, hero-2400.webp 2400w" sizes="100vw">
  <img src="hero-1600.jpg" width="1600" height="900" alt="…" fetchpriority="high">
</picture>

<!-- below the fold -->
<img src="card-800.jpg" srcset="card-400.jpg 400w, card-800.jpg 800w, card-1200.jpg 1200w"
     sizes="auto" loading="lazy" decoding="async" width="800" height="600" alt="…">
```

More on image CDNs and LCP in [performance.md](performance.md#lcp); asset-level optimisation in [assets/optimization.md](../assets/optimization.md).

---

## 13. PWA basics

- A **Web App Manifest** is a **Medium-priority** Front-End Checklist item. — [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- Manifest contents (synthesis): `name`, icons **192 / 512 plus maskable**, `display: standalone`, `theme_color`.
- **HTTPS**, plus an optional **service worker** for offline and caching.
- On iOS, **web push works only for home-screen-installed PWAs** (bg, unverified).

---

## Mobile starter snippet

Mobile and responsive starter (long-established practice; not each line re-verified; untested):

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7f3ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14110f" media="(prefers-color-scheme: dark)">
```

```css
.hero { min-block-size: 100svh; }                 /* not 100vh */
.sheet { max-block-size: 100dvh; }                /* exact fit for overlays */
.app-bar { padding-inline: max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-right));
           padding-block-end: max(.75rem, env(safe-area-inset-bottom)); }
.btn, .nav a { min-block-size: 44px; min-inline-size: 44px; }  /* 24px = AA floor; 44–48 = comfort */
.cards { display:grid; gap:var(--space-s); grid-template-columns: repeat(auto-fit, minmax(min(18rem,100%),1fr)); }
.card-wrap { container-type: inline-size; }
@container (inline-size > 32rem) { .card { grid-template-columns: 2fr 3fr; } }
@media (hover: hover) and (pointer: fine) { .card:hover { translate: 0 -2px; } }  /* no sticky hover on touch */
@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration:.01ms !important; transition-duration:.01ms !important; scroll-behavior:auto !important; } }
.form:has(:user-invalid) .submit { opacity:.6; }   /* :has() for parent/state styling */
```

Editor's note: the global reduced-motion reset above removes motion wholesale. Emil Kowalski recommends swapping movement for a gentler effect (e.g. a 0.2s fade) rather than removing all feedback; see [accessibility.md](accessibility.md#reduced-motion).

---

## 15. Gaps

- NN/g thumb-zone and mobile navigation research pages, and Ahmad Shadeed's container-query and `:has()` articles, were not fetched.
- 44px (Apple HIG) and 48dp (Material) recommendations are background knowledge; Apple HIG and Material 3 pages failed to load in the research.
- caniuse.com was not fetched, so exact versions for `:has()` and subgrid were not re-verified.
- iOS web push for installed PWAs only: unverified.

## Sources

- [W3C: Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [MDN: CSS length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- [tailwindcss.com: Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026)
- [web.dev: Baseline 2026](https://web.dev/baseline/2026)
- [Front-End Checklist (thedaviddias)](https://github.com/thedaviddias/Front-End-Checklist)
- [Rauno Freiberg: Invisible Details of Interaction Design](https://rauno.me/craft/interaction-design)
- [prg.sh: Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [925 Studios: AI Slop Web Design guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Research note: `research_notes/UI components animations and assets/10_craft_responsive_performance_a11y.md` (Q2, Q4)
