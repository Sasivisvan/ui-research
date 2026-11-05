# Page and Route Transitions

How to build page and route transitions in late 2026: the native View Transitions API (same-document and cross-document/MPA), framework integrations (Next.js, React `<ViewTransition>`, Astro, SvelteKit, Vue, Svelte), JS routers for choreographed MPA transitions (Barba.js, Swup, Taxi/Highway), a 14-variant transition catalogue with rebuildable specs, intro/preloader sequences, and performance and reduced-motion handling. Native View Transitions now cover most needs with small amounts of CSS; the skill is in choosing the pattern by meaning and tuning asymmetric timing. Barba/Swup + GSAP remain for multi-panel curtains and persistent WebGL scenes. Markers: **[Cited]** fetched source; **[Snippet-only]** search-result snippet; **[Reference build]** / **[Sketch]** researcher-written code, untested; **[Synthesis]** inference; **Editor's note** connective guidance.

## Contents

- [1. Choosing a transition by meaning](#1-choosing-a-transition-by-meaning)
- [2. View Transitions API essentials](#2-view-transitions-api-essentials)
  - [Same-document](#same-document)
  - [Cross-document (MPA)](#cross-document-mpa)
  - [view-transition-class and match-element](#view-transition-class-and-match-element)
  - [Pointer events, header anchoring, back/swipe](#pointer-events-header-anchoring-backswipe)
- [3. Framework integrations](#3-framework-integrations)
  - [React `<ViewTransition>` (React 19.3)](#react-viewtransition-react-193)
  - [Next.js App Router](#nextjs-app-router)
  - [Astro](#astro)
  - [SvelteKit](#sveltekit)
  - [Vue and Svelte built-ins](#vue-and-svelte-built-ins)
- [4. JS page-transition routers (Barba, Swup, Taxi/Highway)](#4-js-page-transition-routers-barba-swup-taxihighway)
- [5. Transition catalogue (14 variants)](#5-transition-catalogue-14-variants)
- [6. Intro / preloader sequences](#6-intro--preloader-sequences)
- [7. Performance and INP](#7-performance-and-inp)
- [8. Reduced motion and accessibility](#8-reduced-motion-and-accessibility)
- [9. Mobile notes](#9-mobile-notes)
- [10. Browser support summary](#10-browser-support-summary)
- [11. Inspiration and demos](#11-inspiration-and-demos)
- [12. Outdated techniques](#12-outdated-techniques)
- [13. Gaps](#13-gaps)
- [Sources](#sources)

---

## 1. Choosing a transition by meaning

**[Cited]** — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

| Pattern | Meaning | Default timing |
|---|---|---|
| Shared-element morph | "same thing, going deeper" | 350–450 ms + mid blur [Reference build] / 400 ms group (Next.js) |
| Suspense reveal | "data loaded" | exit 150 ms slide-down; enter 210 ms fade + 400 ms slide-up 10 px |
| Directional slide | "forward or back" | old 150 ms fade + 400 ms slide; new 210 ms fade (delay 150 ms) + 400 ms slide; ±60 px |
| Same-route crossfade | "same place, different content" | root crossfade ~250 ms [Reference build] |

- Old content leaves fast so it doesn't compete for attention; new content arrives gently.
- Slide up = arrival, slide down = departure; leftward = forward, rightward = back. 60 px "is enough to communicate direction".
- Keep the header fixed as a spatial anchor.

Decision table (**[Synthesis]**):

| Situation | Use |
|---|---|
| SPA route transitions | Native VT: React `<ViewTransition>`, SvelteKit `onNavigate` + `startViewTransition`, Vue Router + VT, Astro ClientRouter — shared-element morph "for free" |
| MPA route transitions | `@view-transition { navigation: auto }` — no JS; Firefox gets instant navigation |
| MPA with choreographed GSAP curtains, persistent WebGL canvas | Barba or Swup (or Taxi/Highway) + GSAP — keeps JS state (canvas, audio) alive across pages |

---

## 2. View Transitions API essentials

### Same-document

- `document.startViewTransition(callback)` — Baseline: Chrome 111, Safari 18, Firefox 144 **[Cited]** ([Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025)).
- It captures the old state as an image; DOM updates in the callback wait for the capture **[Synthesis]**.
- Chrome 142 changed `::view-transition` from `position: fixed` to `absolute`; from Chrome 140 pseudo-elements inherit more animation properties **[Cited]**.
- `document.activeViewTransition`: Chrome 142, Safari 26.2, Firefox 147 **[Cited]**.
- Nested VT groups Chrome 140 only; scoped (element-level) VT Chrome 147 only **[Cited]**.

### Cross-document (MPA)

All **[Cited]** — [Chrome cross-document docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)

- Opt in on **both** pages: `@view-transition { navigation: auto; }`. Both pages must be **same-origin**.
- Types in CSS: `@view-transition { navigation: auto; types: slide, forwards; }`, or in JS: `pagereveal` → `e.viewTransition.types.add(type)`.
- Style per type:

```css
html:active-view-transition-type(forwards) {
  &::view-transition-old(content) { /* … */ }
  &::view-transition-new(content) { /* … */ }
}
```

- `pageswap` (old page) and `pagereveal` (new page) + `sessionStorage` carry state such as click coordinates across documents. `e.viewTransition.skipTransition()` skips.
- `<link rel="expect" blocking="render" href="#section1">` holds the first render until that element exists in the DOM. Use `blocking=render` only when you can measure its Core Web Vitals impact.
- Chrome skips the transition with a `TimeoutError` if navigation takes more than **4 s**.
- Support: Chrome/Edge 126+, Safari 18.2+ (iOS 18.2); Firefox conflicting (caniuse "partial" 144–162 vs Chrome docs "not supported"). See [browser-support.md](browser-support.md#view-transitions).

### view-transition-class and match-element

**[Cited]** — [MDN view-transition-class](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class); [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025)

- `view-transition-class` styles many named elements with one rule: `::view-transition-group(.card){animation-duration:.5s}`.
- Each element still needs a **unique** `view-transition-name`; `view-transition-name: match-element` auto-generates one (same-document VT only). Chrome 137, Safari 18.4, Firefox 144.
- Morph customisation (Next.js):

```css
::view-transition-group(.morph) { animation-duration: 400ms; }
::view-transition-image-pair(.morph) { animation-name: via-blur; }
@keyframes via-blur { 30% { filter: blur(3px); } }  /* blur hides interpolation artifacts */
```

### Pointer events, header anchoring, back/swipe

All **[Cited]** — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

- The `::view-transition` overlay captures pointer events. `::view-transition{pointer-events:none}` lets clicks pass through, but named participants are still skipped in hit-testing.
- Anchor the header:

```css
.site-header { view-transition-name: site-header; }
::view-transition-group(site-header) { animation: none; z-index: 100; }
::view-transition-old(site-header) { display: none; }
::view-transition-new(site-header) { animation: none; }
```

- Browser back and swipe gestures carry no transition type, so directional slides don't play there, but shared-element morphs still do.

---

## 3. Framework integrations

### React `<ViewTransition>` (React 19.3)

**[Cited]** — [react.dev ViewTransition](https://react.dev/reference/react/ViewTransition)

- Props: `name`, `enter`, `exit`, `update`, `share`, `default` — each `"auto"`, `"none"`, a class, or a `{type: class}` map.
- Callbacks: `onEnter`, `onExit`, `onUpdate`, `onShare` receive `(instance, types)` and return a cleanup.
- Activates only via `startTransition`, `<Suspense>` or `useDeferredValue` — **not** plain `setState`.
- `update` fires when DOM mutations happen inside it, or when its size/position changes because of a sibling — a native alternative to layout animation (see [layout-state-animation.md](layout-state-animation.md)).
- Caveats: must come before any DOM node; names must be unique; React does **not** disable it for reduced motion automatically; back navigation via legacy popstate skips the animation.
- Needs VT types and `view-transition-class` ("Chromium 125+ and recent Safari and Firefox versions"); "Some animations may behave differently in Safari"; without support the app works and just doesn't animate — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions).
- Outdated: `unstable_ViewTransition` imports → use `ViewTransition` in React 19.3.

### Next.js App Router

**[Cited]** — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions) (2026-10-15 doc update)

- "View transitions work in the App Router with no configuration" with React 19.3.
- `<Link transitionTypes={['nav-forward']}>` and `router.push(..., { transitionTypes })`.
- Older v15 docs required `experimental: { viewTransition: true }` and called it not production-ready — [Next.js v15 docs (search result)](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition).
- Directional slide CSS from the guide:
  - old: `150ms ease-in` fade `reverse` + `400ms ease-in-out` slide `reverse`
  - new: `210ms ease-out 150ms` fade + `400ms ease-in-out` slide
  - `--slide-offset: ±60px`; `@keyframes slide{from{translate:var(--slide-offset)}to{translate:0}}`

```css
/* Editor's note: assembled from the guide's stated values, not verbatim. The `.slide` class and
   `nav-back` type name are illustrative (only `nav-forward` appears in the notes); check the guide for exact selectors. */
@keyframes slide { from { translate: var(--slide-offset); } to { translate: 0; } }
@keyframes fade  { from { opacity: 0; } }
html:active-view-transition-type(nav-forward) { --slide-offset: 60px; }
html:active-view-transition-type(nav-back)    { --slide-offset: -60px; }
::view-transition-old(.slide) { animation: 150ms ease-in both fade reverse, 400ms ease-in-out both slide reverse; }
::view-transition-new(.slide) { animation: 210ms ease-out 150ms both fade, 400ms ease-in-out both slide; }
```

- Demo: [react-view-transitions-demo.labs.vercel.dev](https://react-view-transitions-demo.labs.vercel.dev); code: [github.com/nextjs/react-view-transitions-demo](https://github.com/nextjs/react-view-transitions-demo).
- Olivier Larose has a Next.js page transitions guide — [blog.olivierlarose.com](https://blog.olivierlarose.com/).

### Astro

**[Cited]** — [Astro docs](https://docs.astro.build/en/guides/view-transitions/)

- `<ClientRouter />` from `astro:transitions`.
- Directives: `transition:name`, `transition:animate` (`fade` default, `initial`, `slide`, `none`, or custom e.g. `fade({duration:"0.4s"})`), `transition:persist` (keep an element, e.g. a playing video/audio).
- Fallback option: `animate | swap | none`.
- Disables VT animations under `prefers-reduced-motion` automatically.
- Events: `astro:before-preparation`, `astro:after-preparation`, `astro:before-swap`, `astro:after-swap`, `astro:page-load`.
- Astro suggests checking whether native cross-document VT is enough before adding ClientRouter.

### SvelteKit

**[Reference build]** — reconstructed from the standard docs pattern; SvelteKit VT docs were **not** fetched.

```js
// +layout.svelte
import { onNavigate } from '$app/navigation';
onNavigate((nav) => {
  if (!document.startViewTransition) return;
  return new Promise((resolve) => {
    document.startViewTransition(async () => { resolve(); await nav.complete; });
  });
});
```

### Vue and Svelte built-ins

**[Synthesis]**

- Vue: `<Transition>` / `<TransitionGroup>` (built-in FLIP move classes) + VT (Vue Router + VT; docs not fetched).
- Svelte: `svelte/transition` (`fade`, `fly`, `scale`, `blur`, `draw`, `crossfade`) and `animate:flip` — built-in, compiled.

---

## 4. JS page-transition routers (Barba, Swup, Taxi/Highway)

- **Barba.js v2** **[Cited]** — "small (7kb minified and compressed)"; turns an MPA into an SPA-like experience. Plugins: Router, Prefetch, CSS, Head, Preset — [Barba docs](https://barba.js.org/docs/getstarted/intro/). Markup/hooks (`data-barba="wrapper"`, `container`, `namespace`, `leave`/`enter`/`once` hooks) are from **prior knowledge, not verified** this session.
- **Swup** **[Cited]** — "page transition library for server-rendered websites": caching, smart preload, history, scroll management, hooks. Plugins: A11y, Preload, Head, Scripts. Official themes: Fade, Slide, Overlay — [Swup docs](https://swup.js.org/getting-started/).
- **Taxi.js / Highway** **[Unverified]** — Highway is widely considered unmaintained; Taxi is its successor from the same team (Jake Whiteley / Unseen). Not verified.
- When to use **[Synthesis]**: multi-panel curtains (native VT can't hold an overlay across the swap without extra work), persistent WebGL canvas or audio across pages. Barba-only MPA transitions for simple fades are now replaceable by native `@view-transition`.
- Example in the wild: Codrops' scroll-revealed WebGL gallery uses GSAP + three.js + Astro + **Barba.js** for scroll-triggered shader reveals across page transitions (2 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/) **[Snippet-only]**.

---

## 5. Transition catalogue (14 variants)

**[Reference build]** throughout — tune timings. Token variables (`--ease-out-expo` etc.) are defined in [motion-principles-easing.md](motion-principles-easing.md#8-reference-motion-token-stylesheet).

### 5.1 Default root crossfade
- `@view-transition{navigation:auto}` only. Tune with `::view-transition-group(root){animation-duration:250ms}`.
- Use for content sites; the safest choice.

### 5.2 Directional slide + fade
- Use the Next.js CSS in §3. In MPAs, set types in `pagereveal` from `navigation.activation.from` / `entry` indexes.
- Mobile/back caveat: back/swipe carry no type, so no directional slide plays there.

### 5.3 Shared-element morph (thumbnail → hero, card → detail)
- Same `view-transition-name` on both pages, e.g. `style="view-transition-name: photo-42"`.
- 350–450 ms, blur at the midpoint (`via-blur` above).
- Avoid stretch:

```css
::view-transition-old(*), ::view-transition-new(*) { height: 100%; object-fit: cover; overflow: clip; }
```

- If aspect ratios differ, morph the container and crossfade the content inside it.

### 5.4 Circular reveal from click point (also for dark-mode toggles)

```js
btn.addEventListener('click', (e) => {
  const x = e.clientX, y = e.clientY;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const vt = document.startViewTransition(() => toggleTheme());
  vt.ready.then(() => document.documentElement.animate(
    { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
    { duration: 500, easing: 'cubic-bezier(0.65,0,0.35,1)', pseudoElement: '::view-transition-new(root)' }));
});
```

```css
::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
```

- MPA: store x, y in `pageswap`, read them in `pagereveal` (as the Chrome docs show).

### 5.5 Curtain / wipe (clip-path inset)

```css
@keyframes wipe-in { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0); } }
```

- 600–800 ms `cubic-bezier(0.76,0,0.24,1)` (easeInOutQuart).
- Old page: slight `scale(0.96)` + `opacity .6` "push back" for depth.

### 5.6 Diagonal / polygon wipe
- `clip-path: polygon(0 0, 0 0, 0 100%, 0 100%)` → `polygon(0 0, 120% 0, 100% 100%, 0 100%)`.

### 5.7 Blinds / columns (multi-panel curtain)
- Barba or Swup + GSAP; 4–6 fixed overlay panels.
- Cover: `scaleY 0→1`, `transform-origin: bottom`, `stagger: 0.06`, `ease: "expo.inOut"`.
- Swap content while covered, then `scaleY 1→0` from the top.
- Needs a JS router (native VT can't hold an overlay across the swap without extra work).

### 5.8 Zoom-through / depth
- Old: `scale(1)→scale(1.15)` + `opacity→0`. New: `scale(0.92)→1` + `opacity 0→1`.
- 400 ms on `--ease-out-expo` for "drilling in"; reverse for back.

### 5.9 Stacked card / sheet push (iOS-like)
- New page slides up from 100% with `ease-out-expo`, 500 ms.
- Old page scales to 0.94, gets rounded corners, dims.
- Good for mobile-web modals and "detail" routes.

### 5.10 Text-mask / title handoff
- Give the page title a VT name so it morphs between list and detail positions; other content crossfades.

### 5.11 Persistent media
- Astro `transition:persist`, or a named element whose old snapshot is hidden, so a video/audio player continues.

### 5.12 Skeleton → content handoff
- Next.js Suspense reveal: exit 150 ms slide-down; enter 210 ms fade + 400 ms slide-up of 10 px.

### 5.13 Pixel / noise dissolve
- `mask-image` animation over a noise PNG, or a WebGL shader in Barba. Brand/portfolio sites only.

### 5.14 Same-route crossfade (tabs, filters)
- Key the container and let `share="auto"` crossfade it.

### Related scroll-section transitions
Section-to-section transitions on a single scrolling page (Larose **Perspective Section Transition**, **Mask Section Transition**, **Sticky Footer**, zoom-through hero) are in [scroll-animations.md](scroll-animations.md).

---

## 6. Intro / preloader sequences

**[Sketch]** — no dedicated source was fetched; composed from SplitText/ScrollTrigger patterns.

| Variant | Spec |
|---|---|
| (a) Counter preloader | 0 → 100 numerals tied to *real* asset-loading progress (image-sequence frames, GLTF via `THREE.LoadingManager.onProgress`). Tabular numerals; masked-digit "odometer" roll per digit column |
| (b) Curtain/shutter intro | 2–5 panels `scaleY: 1 → 0`, `transformOrigin: top`, stagger 0.08, revealing the hero; then SplitText lines rise ([text-animations.md](text-animations.md)) |
| (c) Logo stroke-draw → fill | `pathLength=1` dash 1 → 0, then `fill-opacity` 0 → 1 ([svg-lottie-rive.md](svg-lottie-rive.md)) |
| (d) Image-stack shuffle | 5–8 thumbnails flash at center; the last scales to full-bleed hero with Flip |
| (e) Clip-path iris | `circle(0%) → circle(150%)` |

Rules: skip or shorten on repeat visits (sessionStorage flag) and under reduced motion. MotionKit flags decorative preloaders as a fading pattern — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026).

---

## 7. Performance and INP

**[Synthesis]**

- `startViewTransition` captures the old state as an image, so DOM updates in its callback are delayed until capture. Keep the callback fast; heavy synchronous work there delays the next paint and can hurt INP on click-triggered transitions.
- Many named elements = many layers. Name only what morphs (`match-element` makes over-naming easy).
- Long page transitions make the site feel slow. Keep MPA transitions to 250–450 ms.
- Prerender/prefetch with Speculation Rules so the 4 s timeout never applies.
- No quantitative source on the INP cost of view transitions was found.

---

## 8. Reduced motion and accessibility

**[Cited]** — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*),
  ::view-transition-new(*),
  ::view-transition-group(*) {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }
}
```

- Gentler alternative: keep the crossfades, remove positional movement.
- Astro ClientRouter disables itself under reduced motion; React `<ViewTransition>` does **not** — handle it yourself.
- More patterns: [performance-accessibility.md](performance-accessibility.md#reduced-motion-patterns).

## 9. Mobile notes

- Stacked card/sheet push (5.9) is the most native-feeling mobile pattern **[Synthesis]**.
- iOS Safari back-swipe with VT: the native swipe preview may double-animate — **not verified**.
- Back/swipe gestures carry no VT type → directional slides don't play; morphs still do **[Cited]**.

## 10. Browser support summary

| Feature | Chrome/Edge | Safari | Firefox |
|---|---|---|---|
| Same-doc VT | 111 | 18 | 144 |
| Cross-doc VT | 126 | 18.2 | conflicting/partial |
| `match-element` | 137 | 18.4 | 144 |
| `view-transition-class` | yes | yes | 144 |
| VT types | yes | yes | not in initial impl. (2025) |
| `pageswap`/`pagereveal` | 124 | 18.2 | not supported (conflicting copy says 147) |

Full table with sources and conflicts: [browser-support.md](browser-support.md).

## 11. Inspiration and demos

- Vercel React VT demo — https://react-view-transitions-demo.labs.vercel.dev ; code https://github.com/nextjs/react-view-transitions-demo
- Codrops page-transition tutorials (fetch blocked) — https://tympanus.net/codrops/
- Olivier Larose Next.js page transitions guide — https://blog.olivierlarose.com/
- awwwards.com (filter "transitions"), gsap.com/showcase — **not fetched**.

## 12. Outdated techniques

**[Synthesis]**

- `unstable_ViewTransition` imports → `ViewTransition` (React 19.3).
- `experimental: { viewTransition: true }` in Next.js → no config needed.
- Barba-only MPA transitions for simple fades → native `@view-transition`.

## 13. Gaps

- Exact Firefox version (if any) shipping full cross-document VT is unconfirmed; caniuse "partial 144–162" vs Chrome docs "not supported".
- Interop 2026 lists cross-document VT as a focus area per search snippets ([Chrome docs search result](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document); [jotter "in all major browsers"](https://events-3bg.pages.dev/jotter/in-all-major-browsers)); not verified on wpt.fyi.
- `ViewTransition.waitUntil()` ship version not verified.
- Taxi.js, Highway, Barba markup/hooks not verified; SvelteKit and Vue VT docs not fetched.
- iOS Safari back-swipe + VT behaviour not verified.

---

## Sources

- Chrome for Developers, View transitions in 2025 — https://developer.chrome.com/blog/view-transitions-in-2025
- Chrome for Developers, Cross-document view transitions — https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- caniuse, cross-document view transitions — https://caniuse.com/cross-document-view-transitions
- MDN, view-transition-class — https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class
- Next.js, Designing view transitions — https://nextjs.org/docs/app/guides/view-transitions
- Next.js v15 viewTransition config (search result) — https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition
- react.dev, ViewTransition — https://react.dev/reference/react/ViewTransition
- Astro, View transitions — https://docs.astro.build/en/guides/view-transitions/
- Barba.js docs — https://barba.js.org/docs/getstarted/intro/
- Swup docs — https://swup.js.org/getting-started/
- Vercel React VT demo — https://react-view-transitions-demo.labs.vercel.dev ; https://github.com/nextjs/react-view-transitions-demo
- Codrops, scroll-revealed WebGL gallery with Astro + Barba (snippet) — https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/
- jotter, "in all major browsers" (snippet) — https://events-3bg.pages.dev/jotter/in-all-major-browsers
- MotionKit, trends 2026 — https://motionkit.io/blog/web-animation-trends-2026
- Olivier Larose — https://blog.olivierlarose.com/
