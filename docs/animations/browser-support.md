# Animation Browser Support (Nov 2026)

One table for every animation-related platform feature covered in these docs: view transitions (same- and cross-document, `view-transition-class`, `match-element`, types, nested/scoped groups), scroll-driven and scroll-triggered animations, scroll-state queries, `linear()`, `@starting-style`, `allow-discrete`, `interpolate-size` / `calc-size()`, `@property`, `@media (hover)`, CSS `d:` path transitions, SVG `pathLength`, `::details-content` and WebGPU. Where sources disagree, both are given. A production policy follows. Notes dated 2026-11-05. Markers: **[Cited]** fetched source; **[Snippet-only]**; **[Conflict]**; **[Unverified]**; **[Synthesis]**.

## Contents

- [1. Master table](#1-master-table)
- [View transitions](#view-transitions)
- [Scroll](#scroll)
- [CSS transitions and properties](#css-transitions-and-properties)
- [SVG and misc](#svg-and-misc)
- [WebGPU](#webgpu)
- [2. Conflicts and outdated claims](#2-conflicts-and-outdated-claims)
- [3. Production policy for late 2026](#3-production-policy-for-late-2026)
- [4. Feature detection snippets](#4-feature-detection-snippets)
- [5. Gaps](#5-gaps)
- [Sources](#sources)

---

## 1. Master table

### View transitions

| Feature | Chrome/Edge | Safari | Firefox | Source / notes |
|---|---|---|---|---|
| Same-document VT `document.startViewTransition()` | 111 | 18 | 144 (Baseline newly available) | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| `view-transition-name: match-element` | 137 | 18.4 | 144 | same |
| `view-transition-class` | supported | supported | 144 (Interop 2025) | Baseline 2025 "newly available" since Oct 2025 — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class); [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025) |
| VT types | supported | supported | not in Firefox's initial implementation (as of the 2025 post) | [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025) |
| Nested VT groups | 140 | no | no | same |
| Scoped (element-level) VT | 147 | no | no | same |
| `document.activeViewTransition` | 142 | 26.2 | 147 | same |
| **Cross-document VT** `@view-transition {navigation:auto}` | 126 (Chrome Android 157 listed) | 18.2 (iOS 18.2) | **[Conflict]** caniuse "partial" 144–162; Chrome docs "not supported" | [caniuse](https://caniuse.com/cross-document-view-transitions) 89.6% global, 87.7% full; [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) |
| `pageswap` / `pagereveal` | 124 | 18.2 | **[Conflict]** not supported per Chrome docs; a conflicting copy says 147 | [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) |
| `<link rel=expect blocking=render>` | 124 | 18.2 | no | same |
| `::view-transition` positioning | `position: absolute` from 142 (was `fixed`); pseudo-elements inherit more animation props from 140 | — | — | [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025) |
| React `<ViewTransition>` requirements | Chromium 125+ | recent | recent | Needs types + `view-transition-class`; "Some animations may behave differently in Safari"; degrades to no animation — [Next.js](https://nextjs.org/docs/app/guides/view-transitions) |
| `ViewTransition.waitUntil()` | **[Unverified]** | — | — | not verified |
| Interop 2026 focus | cross-document VT listed | | | **[Snippet-only]** [Chrome docs search result](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document); [jotter](https://events-3bg.pages.dev/jotter/in-all-major-browsers); not verified on wpt.fyi |

### Scroll

| Feature | Chrome/Edge | Safari | Firefox | Source / notes |
|---|---|---|---|---|
| Scroll-driven `animation-timeline: scroll()/view()`, `animation-range`, `ScrollTimeline`/`ViewTimeline` | 115 | 26.0 | 159 (27 Oct 2026, on by default) | Baseline newly available 27 Oct 2026 — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g); [Bramus](https://scroll-driven-animations.style/demos/baseline-newly-available/css/); caniuse 89.1% global ([caniuse](https://caniuse.com/mdn-css_properties_animation-timeline_scroll)) |
| Threaded (off-main-thread) SDA | — | 26.4 reportedly | — | **[Unverified]** single secondary source ([SitePoint](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/)) |
| Scroll-triggered `timeline-trigger` / `animation-trigger` / `trigger-scope` | **[Conflict]** 145 (Chrome post) vs 146 (stable 10 Mar 2026, secondary) | no (26.6 reportedly no) | no (154 reportedly no) | [Chrome](https://developer.chrome.com/blog/scroll-triggered-animations); [OpenReplay](https://blog.openreplay.com/css-scroll-animations-no-javascript/); [blink-dev](https://groups.google.com/a/chromium.org/g/blink-dev/c/TZLFLjzt4II) |
| Scroll-state container queries `container-type: scroll-state` (`stuck`, `snapped`, `scrollable`) | 133 | no (through 27.3, incl. iOS) | no (through 162 + Android; open Mozilla bug) | [Chrome](https://developer.chrome.com/blog/css-scroll-state-queries); [caniuse](https://caniuse.com/wf-container-scroll-state-queries); [web-features](https://web-platform-dx.github.io/web-features-explorer/features/container-scroll-state-queries/) |

### CSS transitions and properties

| Feature | Chrome/Edge | Safari | Firefox | Source / notes |
|---|---|---|---|---|
| `linear()` easing | ✓ | ✓ | ✓ | All major browsers since Dec 2023; ~88% support Oct 2025 — [Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/) |
| `@starting-style` | ✓ | ✓ | ✓ | Baseline 2024, newly available Aug 2024 — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) |
| `transition-behavior: allow-discrete` | — | — | — | No explicit support row in notes; production policy says "use freely, with graceful degradation" **[Synthesis]** |
| `interpolate-size` | 129+ | **no (through 27.3)** | **no (through 162)** | 73.9% global; MDN "Limited availability", experimental — [caniuse](https://caniuse.com/mdn-css_properties_interpolate-size); [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) |
| `calc-size()` | 129+ | no | no | 73.9% — [caniuse](https://caniuse.com/mdn-css_types_calc-size) |
| `@property` (animated gradient border) | ✓ | 17+ | 128+ | ~96% — **[Snippet-only]** secondary snippet only |
| `@media (hover)` / `(pointer)` | ✓ | ✓ | ✓ | Widely available since Dec 2018 — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover) |
| CSS `d:` path transitions | ✓ | not dependable | ✓ | **[Reference build note]**, unverified |
| `::details-content` | **[Unverified]** | | | support not verified |

### SVG and misc

| Feature | Status |
|---|---|
| SVG `pathLength` | Safari support **uncertain** — an old CSS-Tricks note said Safari lacked it "at the time of writing"; verify |
| SVG transforms | Apply to `<g>` wrappers for reliable Safari behaviour ([Vercel](https://vercel.com/design/guidelines)) |
| `DeviceOrientation` | iOS requires a permission prompt |
| rAF frame rate | Safari caps at 60 fps; 30 fps in Low Power Mode ([Lenis](https://github.com/darkroomengineering/lenis)) |
| Dynamic viewport units on iOS | `dvh` jank; scroll-snap + `100dvh` jump (WebKit 266835, still NEW); third-party iOS browsers misbehaved after iOS 18 (WebKit 279998) |

### WebGPU

| Platform | Status | Source |
|---|---|---|
| Chrome / Edge | Yes (desktop); Android varies / not checked | [TechSpot](https://www.techspot.com/news/110456-webgpu-now-brings-desktop-quality-graphics-all-major.html) (snippet) |
| Safari | 26 (Sept 2025): macOS, iOS, iPadOS, visionOS | same |
| Firefox | 141 Windows (July 2025); 145 macOS (Nov 2025). Sept 2026: Windows + Apple-silicon Macs only; Linux and Intel Macs lack it | TechSpot; [Cinevva](https://app.cinevva.com/guides/webgpu-vs-webgl-games) |
| three.js `WebGPURenderer` | Falls back to WebGL2 | [three.js manual](https://threejs.org/manual/en/webgpurenderer) |
| PixiJS v8 WebGPU | "Feature complete" but experimental; WebGL recommended | [PixiJS](https://pixijs.com/8.x/guides/components/renderers) |
| dotLottie WebGPU backend | Experimental | [dotlottie-web](https://github.com/LottieFiles/dotlottie-web) |

---

## 2. Conflicts and outdated claims

- **Cross-document VT in Firefox**: caniuse "partial 144–162" vs Chrome docs "not supported". Exact Firefox version (if any) with full support unconfirmed.
- **`pageswap`/`pagereveal` in Firefox**: "not supported" vs a copy saying 147.
- **Scroll-triggered animations**: Chrome 145 vs 146.
- **Wrong**: "SDA supported in Firefox 126+ / Safari 17.2+" ([mintec.co](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/)) — contradicted by DEV/Bramus.
- **Outdated**: "Firefox SDA is flag-only (`layout.css.scroll-driven-animations.enabled`, Firefox 152)"; "Scroll-driven animations are Chrome-only"; "WebGPU is Chrome-only"; "SplitText/ScrambleText/MorphSVG are paid Club plugins".
- **[Synthesis]** iOS Safari 26 supports SDA and WebGPU, so mobile creative work need not assume a Chromium-only feature set; older iPhones that can't run iOS 26 still need fallbacks.

## 3. Production policy for late 2026

**[Synthesis]**

| Feature | Policy |
|---|---|
| Same-document VT, `@starting-style`, `transition-behavior: allow-discrete`, `linear()` springs, `@property` | Use freely, with graceful degradation |
| Cross-document VT | Use freely as progressive enhancement; Firefox gets instant navigation |
| Scroll-driven animations | Guard with `@supports (animation-timeline: scroll())`; static fallback = final state; treat as enhancement for ~12–30 more months |
| Scroll-triggered (`animation-trigger`) | IO or GSAP `toggleActions`; CSS bonus only |
| Scroll-state queries | Decorative only, with JS or plain fallback |
| `interpolate-size` / `calc-size()` | Enhancement over `grid-template-rows: 0fr → 1fr` |
| WebGPU | three.js `WebGPURenderer` + TSL (auto WebGL2); PixiJS stay on WebGL |

## 4. Feature detection snippets

```css
@supports (animation-timeline: scroll()) { /* scroll-driven */ }
@supports (container-type: scroll-state) { /* scroll-state queries */ }
@supports (animation-timing-function: linear(0, 1)) { /* linear() springs */ }
@supports (interpolate-size: allow-keywords) { /* Editor's note: guard for interpolate-size */ }
```

```js
CSS.supports('animation-timeline: scroll()');        // [Cited] DEV
if (!document.startViewTransition) { /* update DOM without VT */ }
// Editor's note: WebGPU presence check
const hasWebGPU = 'gpu' in navigator;
```

## 5. Gaps

- Global-usage % for scroll-state, scroll-triggered and WebGPU not captured.
- `::details-content`, `animation-trigger` work beyond Chrome, `ViewTransition.waitUntil()` ship version unverified.
- Chrome "WebGPU supported in all major browsers" post 404'd at the guessed path.
- `@property` gradient-border figures from a secondary snippet only.

---

## Sources

- Chrome for Developers, View transitions in 2025 — https://developer.chrome.com/blog/view-transitions-in-2025
- Chrome for Developers, Cross-document VT — https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- caniuse, cross-document VT — https://caniuse.com/cross-document-view-transitions
- MDN, view-transition-class — https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class
- Next.js view transitions — https://nextjs.org/docs/app/guides/view-transitions
- jotter (snippet) — https://events-3bg.pages.dev/jotter/in-all-major-browsers
- DEV, SDA Baseline — https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g
- Bramus, Baseline demo — https://scroll-driven-animations.style/demos/baseline-newly-available/css/
- caniuse, animation-timeline scroll() — https://caniuse.com/mdn-css_properties_animation-timeline_scroll
- SitePoint — https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/
- mintec.co (contradicted) — https://mintec.co/blog/scroll-driven-view-transitions-css-2026/
- Chrome, scroll-triggered — https://developer.chrome.com/blog/scroll-triggered-animations
- OpenReplay — https://blog.openreplay.com/css-scroll-animations-no-javascript/
- blink-dev — https://groups.google.com/a/chromium.org/g/blink-dev/c/TZLFLjzt4II
- Chrome, scroll-state queries — https://developer.chrome.com/blog/css-scroll-state-queries
- caniuse, scroll-state — https://caniuse.com/wf-container-scroll-state-queries
- web-features explorer — https://web-platform-dx.github.io/web-features-explorer/features/container-scroll-state-queries/
- Josh Comeau, linear() — https://www.joshwcomeau.com/animation/linear-timing-function/
- MDN, @starting-style — https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
- MDN / caniuse, interpolate-size — https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size ; https://caniuse.com/mdn-css_properties_interpolate-size
- caniuse, calc-size — https://caniuse.com/mdn-css_types_calc-size
- MDN, @media hover — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
- TechSpot (snippet) — https://www.techspot.com/news/110456-webgpu-now-brings-desktop-quality-graphics-all-major.html
- Cinevva — https://app.cinevva.com/guides/webgpu-vs-webgl-games
- three.js manual — https://threejs.org/manual/en/webgpurenderer
- PixiJS renderers — https://pixijs.com/8.x/guides/components/renderers
- dotlottie-web — https://github.com/LottieFiles/dotlottie-web
- Lenis — https://github.com/darkroomengineering/lenis
- WebKit 266835 / 279998 — https://bugs.webkit.org/show_bug.cgi?id=266835 ; https://bugs.webkit.org/show_bug.cgi?id=279998
- Vercel guidelines — https://vercel.com/design/guidelines
