# Animations

Index of the animation docs. It includes a "which technique for which job" decision table and a cheat-sheet of default timing and easing tokens. The material comes from two research notes dated 2026-11-05 (transitions and micro-interactions; scroll, text and 3D). Every page keeps the confidence level its source had:

- **[Cited]**: from a page the researcher fetched. The link is inline.
- **[Snippet-only]**: from a search-result snippet. The page itself wasn't fetched, often because Codrops returned 403.
- **[Reference build]** or **[Sketch]**: code the researcher wrote from the cited primitives. It is untested, so treat the numbers as starting points to tune.
- **[Synthesis]**: the researcher's inference.
- **[Vendor claim]** or **[Conflict]**: as labelled.
- **Editor's note**: guidance added while organising these docs.

Related doc sets (written separately): [../foundations/](../README.md#foundations), [../components/](../components/README.md), [../assets/](../assets/README.md).

## Contents

- [1. Files](#1-files)
- [2. Which technique for which job](#2-which-technique-for-which-job)
- [3. Default timing and easing cheat-sheet](#3-default-timing-and-easing-cheat-sheet)
- [4. Non-negotiables](#4-non-negotiables)
- [5. Inspiration and learning sources](#inspiration-and-learning-sources)
- [Sources](#sources)

---

## 1. Files

| File | Covers |
|---|---|
| [motion-principles-easing.md](motion-principles-easing.md) | What makes motion feel crafted rather than generic (Emil Kowalski, Rauno, Vercel, Josh Comeau, Next.js); durations; Material 3 easing, duration and spring tokens; all easings.net cubic-beziers; `linear()` springs; reference token stylesheet; choreography and stagger; Disney's 12 principles mapped to UI |
| [page-transitions.md](page-transitions.md) | View Transitions (same- and cross-document), React `<ViewTransition>`, Next.js, Astro, SvelteKit, Barba, Swup; 14 transition variants; intros and preloaders |
| [micro-interactions.md](micro-interactions.md) | Button press, 3D push, ripple, magnetic, gooey, fill sweeps, hold-to-confirm, like bursts, toggles, checkbox draw, form shake, success checks, copy confirm, hamburger → X, tabs, toasts, tickers |
| [hover-effects.md](hover-effects.md) | Image hovers, underline animations, text roll and scramble, tilt and glare, spotlight and glow borders, fill sweeps, cursor effects |
| [layout-state-animation.md](layout-state-animation.md) | FLIP, Motion layout and AnimatePresence, GSAP Flip, AutoAnimate, `@starting-style`, `allow-discrete`, `interpolate-size`, grid `0fr→1fr` |
| [scroll-animations.md](scroll-animations.md) | CSS scroll-driven animations and their gotchas, scroll-triggered animations, IntersectionObserver, scroll-state queries, ScrollTrigger pin and scrub, Lenis, Locomotive, horizontal sections, stacking cards, parallax, image sequences, taste rules |
| [text-animations.md](text-animations.md) | SplitText and alternatives, ScrambleText, text variants (a)–(l), variable-font animation |
| [svg-lottie-rive.md](svg-lottie-rive.md) | Line drawing with `pathLength`, morphing (MorphSVG, Flubber), SVG filters, animated icons, Lottie and dotLottie, Rive |
| [3d-webgl-shaders.md](3d-webgl-shaders.md) | three.js, R3F, OGL, PixiJS, Theatre.js, Spline; WebGPU and TSL; Lusion, Immersive Garden and Active Theory case studies; DOM-synced WebGL, camera paths, VAT; R3F performance; detect-gpu; budgets |
| [backgrounds-effects.md](backgrounds-effects.md) | Paper Shaders (30 presets), mesh and grain gradients, aurora, grain overlay, dot grid and spotlight, dither and halftone, generative canvas |
| [libraries.md](libraries.md) | Every library with URL, size, licence, framework, best use and status. GSAP has been fully free, all plugins included, since 3.13 |
| [browser-support.md](browser-support.md) | Consolidated Nov-2026 support table, conflicts between sources, production policy |
| [performance-accessibility.md](performance-accessibility.md) | Compositor-only properties, INP, `will-change`, mobile and battery, iOS `svh`/`dvh`, Safari 60 fps cap, reduced-motion patterns, WCAG 2.2.2 and 2.3.3, scrolljacking |

---

## 2. Which technique for which job

**[Synthesis]** from both notes.

| Job | Use | Fallback / note | Details |
|---|---|---|---|
| Hover, press, focus, toggles, popovers | CSS transitions + `@starting-style` | 0 kb, interruptible | [micro-interactions](micro-interactions.md), [hover-effects](hover-effects.md) |
| Spring feel without JS | CSS `linear()` tokens | Bézier fallback in `@supports`; weaker on interrupt | [principles §7](motion-principles-easing.md#7-springs-with-linear) |
| Imperative one-shots (shake, burst, ripple) | WAAPI `el.animate()` | 0 kb; `.finished` promise | [micro-interactions](micro-interactions.md) |
| Dialog, popover or toast entry and exit | `@starting-style` + `allow-discrete` (`display`, `overlay`) | Baseline 2024 | [layout-state](layout-state-animation.md#3-dialog--popover-entry-and-exit-with-starting-style) |
| Accordion or `height: auto` | `grid-template-rows: 0fr → 1fr` | `interpolate-size` as a Chromium-only enhancement | [layout-state §5](layout-state-animation.md#5-height-auto--grid-0fr1fr-and-interpolate-size) |
| List add, remove or reorder | AutoAnimate; GSAP Flip; VT + `match-element` | AutoAnimate respects reduced motion | [layout-state](layout-state-animation.md) |
| React layout, shared layout, exit | Motion `layout` / `layoutId` / `AnimatePresence`, or `<ViewTransition>` | Neither handles reduced motion automatically | [layout-state](layout-state-animation.md) |
| SPA route transition | Native VT (React 19.3, Next.js, SvelteKit, Vue, Astro) | No animation where unsupported | [page-transitions](page-transitions.md) |
| MPA route transition | `@view-transition { navigation: auto }` | Firefox navigates instantly | [page-transitions](page-transitions.md#cross-document-mpa) |
| Multi-panel curtain or a WebGL canvas that persists across pages | Barba or Swup + GSAP | Keeps JS state alive | [page-transitions §4](page-transitions.md#4-js-page-transition-routers-barba-swup-taxihighway) |
| Reading progress, parallax, reveal-on-view, stacking cards | CSS `animation-timeline` in `@supports` | Static final state | [scroll §8](scroll-animations.md#8-variant-catalogue) |
| Play-once scroll reveal | IntersectionObserver or GSAP `toggleActions` | CSS `animation-trigger` (Chromium only) as a bonus | [scroll §3–4](scroll-animations.md#3-css-scroll-triggered-animations) |
| Sticky-header shadow, snapped-slide emphasis | `container-type: scroll-state` (Chromium 133+) | Decorative only | [scroll §5](scroll-animations.md#5-scroll-state-container-queries) |
| Pinned scrollytelling, scrub timeline, snap to labels | GSAP ScrollTrigger in `gsap.matchMedia()` | Stacked layout on mobile | [scroll §6](scroll-animations.md#6-gsap-scrolltrigger) |
| Horizontal section | CSS sticky + view timeline, or GSAP `containerAnimation` (`ease:"none"`) | Native swipe carousel on mobile | [scroll 8.8](scroll-animations.md#88-horizontal-section) |
| Smooth wheel scroll | Lenis (`syncTouch:false`) | Native scroll | [scroll §7](scroll-animations.md#7-smooth-scroll-lenis-and-locomotive) |
| Product rotation or "Apple" frame scrub | Canvas image sequence (100–300 frames, WebP q≈85) or a spritesheet with SDA | Show the end frame | [scroll §9](scroll-animations.md#9-image-sequence-scrubbing-apple-style) |
| Heading reveals | SplitText `mask:"lines"`, `yPercent` 100→0, `expo.out` | Final text visible | [text](text-animations.md) |
| Scramble or decode text | GSAP ScrambleText | Fixed width with tabular numerals | [text](text-animations.md#scrambletextplugin) |
| Stroke draw (logo, check, underline) | `pathLength="1"` + `stroke-dashoffset` | Measured length if `pathLength` misbehaves in Safari | [svg](svg-lottie-rive.md#line-drawing) |
| Shape morph | GSAP MorphSVG (free); Flubber | CSS `d:` isn't reliable in Safari | [svg](svg-lottie-rive.md#3-morphing) |
| Designer-made illustration or burst | dotLottie (state machines, worker) | Static frame | [svg](svg-lottie-rive.md#6-lottie--dotlottie) |
| Interactive, input-driven vector | Rive (`@rive-app/webgl2`) | Call `cleanup()` | [svg](svg-lottie-rive.md#7-rive) |
| 3D scene or product | three.js `WebGPURenderer` + TSL / R3F | WebGL2 fallback; GPU tier 0 → static poster | [3d](3d-webgl-shaders.md) |
| WebGL image gallery tied to scroll | DOM-synced planes + Lenis velocity | Keep `<img>` in the DOM | [3d §4](3d-webgl-shaders.md#scroll-driven-webgl-patterns) |
| 2D sprites, filters, displacement | PixiJS v8 (WebGL) | — | [3d](3d-webgl-shaders.md) |
| Animated background | Paper Shaders (pin the version), CSS aurora, grain | Static preset under reduced motion | [backgrounds](backgrounds-effects.md) |

---

## 3. Default timing and easing cheat-sheet

### Tokens

**[Reference build]** Full stylesheet with the `linear()` spring is in [motion-principles-easing.md §8](motion-principles-easing.md#8-reference-motion-token-stylesheet).

```css
:root {
  --dur-instant: 80ms;   /* press, hover colour */
  --dur-fast: 150ms;     /* tooltip, icon swap, checkbox */
  --dur-base: 220ms;     /* dropdown, popover, card hover */
  --dur-slow: 350ms;     /* modal, drawer, sheet */
  --dur-page: 450ms;     /* route transition */

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* easeOutQuint: UI default */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);  /* image reveals, page */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* on-screen moves */
  --ease-exit: cubic-bezier(0.3, 0, 0.8, 0.15);    /* M3 emphasized accelerate: exits */
  --ease-m3: cubic-bezier(0.2, 0, 0, 1);           /* M3 standard */
  --spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1); /* easeOutBack fallback; regenerate linear() */
}
```

### Durations by job

| Job | Duration | Easing |
|---|---|---|
| Keyboard or very frequent actions (command menu, context menu) | 0–100 ms or none | — |
| Press down | 34 ms (Comeau) to 80–100 ms | ease-out |
| Release | 150–200 ms; 600 ms on the 3D button | spring / `cubic-bezier(0.3,0.7,0.4,1)` |
| Hover rise (3D button) | 250 ms | `cubic-bezier(0.3,0.7,0.4,1.5)` |
| Tooltip | 125 ms from `scale(0.97)` | ease-out |
| Select or dropdown | 180 ms | strong ease-out |
| Small elements | 100–200 ms | ease-out |
| Medium (popover, card) | 200–300 ms | ease-out |
| Large (modal, sheet, drawer) | 300–450 ms (sheet 350 ms in, 250 ms out) | ease-out-expo |
| Exits | 60–75% of the enter duration | ease-exit / quick fade |
| Page transition | 350–600 ms; MPA 250–450 ms | — |
| VT directional slide | old: 150 ms fade + 400 ms slide; new: 210 ms fade after a 150 ms delay + 400 ms slide; ±60 px | ease-in / ease-out / ease-in-out |
| Shared-element morph | 350–450 ms + 3 px blur at 30% | — |
| Curtain wipe | 600–800 ms | easeInOutQuart `(0.76,0,0.24,1)` |
| Image hover zoom | 800 ms, scale 1.03–1.08 | ease-out-expo |
| Text reveal | 0.6–1.0 s, stagger 0.05–0.12 s | `expo.out` / `power3.out` |
| UI on scroll pages | 0.3–0.5 s | — |
| Scrubbed animation | tied to scroll | `none` / linear |
| Celebratory | 400–800 ms, overshoot 1.1–1.3 | spring |
| Spinner | show after 150–300 ms; visible for at least 300–500 ms | — |

### Deltas and stagger

- Scale from 0.93–0.97, never 0. Press: `scale(0.97)`.
- Translate 4–12 px for micro-motion, 8–16 px for scroll reveals and 40–80 px for page slides (60 px is enough to show direction).
- Use 2–4 px of blur to hide crossfade seams.
- Stagger 20–50 ms with a ~300 ms cap, applied to the first 6–10 items only. Don't stagger exits.
- Tilt: at most 8–15°, with `perspective` of 800–1200 px.

### Material 3 reference

- Durations, in ms:
  - short1–4: 50 / 100 / 150 / 200
  - medium1–4: 250 / 300 / 350 / 400
  - long1–4: 450 / 500 / 550 / 600
  - extra-long1–4: 700 / 800 / 900 / 1000
- Springs (damping / stiffness):
  - Fast: spatial 0.9 / 1400, effects 1 / 3800
  - Default: spatial 0.9 / 700, effects 1 / 1600
  - Slow: spatial 0.9 / 300, effects 1 / 800

Full tables: [motion-principles-easing.md §5–6](motion-principles-easing.md#5-durations).

---

## 4. Non-negotiables

**[Cited]**, consolidated:

1. Never use `transition: all`. Animate only `transform` and `opacity`, plus `clip-path` and `filter` sparingly ([Vercel](https://vercel.com/design/guidelines), [Emil](https://emilkowal.ski/ui/great-animations), [web.dev](https://web.dev/articles/animations-guide)).
2. Don't use `ease-in` for UI entrances, and never enter from `scale(0)` ([Emil](https://emilkowal.ski/ui/7-practical-animation-tips)).
3. Make motion interruptible. Use transitions or springs for anything the user toggles ([Emil](https://emilkowal.ski/ui/great-animations), [Rauno](https://rauno.me/craft/interaction-design)).
4. Scale from the origin. Popovers scale out from their trigger ([Emil](https://emilkowal.ski/ui/7-practical-animation-tips)).
5. Write CSS no-motion-first. Opacity fades are safe for everyone ([Comeau](https://www.joshwcomeau.com/react/prefers-reduced-motion/)).
6. Gate hover effects with `@media (hover:hover) and (pointer:fine)` and give touch an `:active` equivalent ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)).
7. Automatic motion that runs longer than 5 s needs a pause control (WCAG 2.2.2; [Vercel](https://vercel.com/design/guidelines)).
8. Keep native scroll. Don't scroll-jack. Use `svh` for pinned frames on iOS ([WebKit 266835](https://bugs.webkit.org/show_bug.cgi?id=266835)).
9. Wrap scroll-driven CSS in `@supports`, with the final state as the fallback ([DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)).
10. Give a page one hero moment and one set-piece. Typography beats effects ([synthesis](motion-principles-easing.md#4-scroll-page-taste-checklist-synthesis)).

---

<a id="inspiration-and-learning-sources"></a>
## 5. Inspiration and learning sources

**Fetched or cited:**
- [animations.dev](https://animations.dev/) and [Emil Kowalski's blog](https://emilkowal.ski/), for taste and theory.
- [Rauno's craft pages](https://rauno.me/craft/interaction-design), for interaction detail.
- [Vercel guidelines](https://vercel.com/design/guidelines), for rules.
- [scroll-driven-animations.style](https://scroll-driven-animations.style/) (Bramus): 15 native demos.
- [GSAP docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- [Olivier Larose](https://blog.olivierlarose.com/): about 40 named effect tutorials.
- [Three.js Journey WebGPU & TSL](https://threejs-journey.com/webgpu-tsl).
- [Maxime Heckel](https://blog.maximeheckel.com/).
- [The Book of Shaders](https://thebookofshaders.com/).
- [R3F performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
- [Paper Shaders](https://shaders.paper.design/).
- [Osmo Supply](https://www.osmo.supply/resource/masked-text-reveal).
- [Vercel React VT demo](https://react-view-transitions-demo.labs.vercel.dev).
- Case studies: [Lusion on Awwwards](https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html), [Immersive Garden on CommArts](https://www.commarts.com/webpicks/immersive-garden), [Active Theory on Medium](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4), [Awwwards Hall of Fame](https://annuals.awwwards.com/hall-of-fame).

**Codrops** (search snippets only; the site returned 403): [tag/scroll](https://tympanus.net/codrops/tag/scroll/), [tag/webgl](https://tympanus.net/codrops/tag/webgl/), [hub/tag/scroll](https://tympanus.net/codrops/hub/tag/scroll/).

**Not fetched this session; check them yourself:**
- codepen.io, searched by technique
- hover.dev
- ui-movement.com
- rive.app/community
- lottiefiles.com
- dribbble.com/tags/micro-interaction
- mobbin.com
- gsap.com/showcase
- motion.dev/examples
- awwwards.com (Site of the Day; filter "transitions")
- Godly.website
- Land-book
- Uiverse (returned 403)

When you study an inspiration site, record five things: duration, easing, origin, stagger, and what happens on interrupt and on touch. Copying the look without those values is what produces generic motion.

---

## Sources

- Research notes:
  - `research_notes/UI components animations and assets/06_transitions_microinteractions.md`
  - `research_notes/UI components animations and assets/07_scroll_text_3d_animations.md`
- Each linked page carries its own full Sources list.
- Key sources:
  - https://emilkowal.ski/ui/great-animations
  - https://emilkowal.ski/ui/7-practical-animation-tips
  - https://rauno.me/craft/interaction-design
  - https://vercel.com/design/guidelines
  - https://www.joshwcomeau.com/animation/linear-timing-function/
  - https://www.joshwcomeau.com/react/prefers-reduced-motion/
  - https://nextjs.org/docs/app/guides/view-transitions
  - https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
  - https://easings.net/
  - https://developer.chrome.com/blog/view-transitions-in-2025
  - https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g
  - https://gsap.com/blog/3-13/
  - https://web.dev/articles/animations-guide
  - https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
