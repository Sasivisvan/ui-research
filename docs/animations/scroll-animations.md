# Scroll Animations

Everything scroll-related from the research: native CSS scroll-driven animations (`animation-timeline: scroll()/view()`, Baseline newly available 27 Oct 2026) with their gotchas, CSS scroll-triggered animations (Chromium-only), scroll-state container queries, IntersectionObserver fallbacks, GSAP ScrollTrigger (pin, scrub, snap, horizontal sections), Lenis and Locomotive smooth scroll, and a named-variant catalogue (progress bars, reveal-on-view, parallax, stacking cards, horizontal sections, zoom-through hero, mask reveals, scrollytelling, image-sequence scrubbing, velocity marquee). It ends with taste rules, mobile/iOS handling and reduced motion. The recurring 2026 "crafted" backbone is Lenis + ScrollTrigger; native CSS now covers the lightweight end. Markers: **[Cited]** fetched source; **[Snippet-only]** search excerpt (Codrops returned 403); **[Sketch]** researcher-composed from cited docs, test before shipping; **[Synthesis]** inference; **Editor's note** connective guidance.

## Contents

- [1. Choosing a scroll technique](#1-choosing-a-scroll-technique)
- [2. CSS scroll-driven animations](#2-css-scroll-driven-animations)
  - [Syntax](#syntax)
  - [Gotchas](#gotchas)
  - [Feature detection and JS API](#feature-detection-and-js-api)
- [3. CSS scroll-triggered animations](#3-css-scroll-triggered-animations)
- [4. IntersectionObserver (play-once reveals)](#4-intersectionobserver-play-once-reveals)
- [5. Scroll-state container queries](#5-scroll-state-container-queries)
- [6. GSAP ScrollTrigger](#6-gsap-scrolltrigger)
- [7. Smooth scroll: Lenis and Locomotive](#7-smooth-scroll-lenis-and-locomotive)
- [8. Variant catalogue](#8-variant-catalogue)
- [9. Image-sequence scrubbing (Apple-style)](#9-image-sequence-scrubbing-apple-style)
- [10. Named tutorial catalogues](#10-named-tutorial-catalogues)
- [11. Taste, restraint and slop](#taste-restraint-and-slop)
- [12. Mobile and iOS](#12-mobile-and-ios)
- [13. Reduced motion and accessibility](#13-reduced-motion-and-accessibility)
- [14. Browser support](#14-browser-support)
- [15. Gaps](#15-gaps)
- [Sources](#sources)

---

## 1. Choosing a scroll technique

**[Synthesis]**

| Job | Use | Fallback |
|---|---|---|
| Reading progress bar, parallax, reveal-on-view, stacking cards, horizontal section (light) | CSS `animation-timeline` inside `@supports` + `prefers-reduced-motion: no-preference` | Static final state |
| Play-once reveal (not scrubbed) | IntersectionObserver, or GSAP `toggleActions` | CSS `animation-trigger` only as a Chromium bonus |
| Sticky header shadow, snapped-slide emphasis, back-to-top | `container-type: scroll-state` (decorative only) | JS or plain |
| Pinned scrollytelling, scrub timelines, snap-to-labels, horizontal with inner reveals | GSAP ScrollTrigger | Stacked layout on mobile |
| Smooth wheel scroll | Lenis (`syncTouch: false`) | Native |
| Product rotation / frame scrub | Canvas image sequence or spritesheet + SDA | End frame |
| WebGL scroll scenes | three.js + ScrollTrigger/Lenis — [3d-webgl-shaders.md](3d-webgl-shaders.md) | Static poster |

Rule: **scrub only what the user should control** (sequences, 3D rotation, progress); play-once triggers for reveals.

---

## 2. CSS scroll-driven animations

**[Cited]** Support: Chrome/Edge 115, Safari 26 ("Added support for Scroll-driven Animations"), Firefox 159 on **27 Oct 2026** (on by default) → Baseline "newly available" the same day — [DEV: Scroll-driven animations are Baseline at last](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g); confirmed by Bramus's "Road to Baseline Newly Available" demo — [scroll-driven-animations.style](https://scroll-driven-animations.style/demos/baseline-newly-available/css/). caniuse (06 notes): `animation-timeline: scroll()` 89.1% global.

- **[Synthesis]** Treat as progressive enhancement for roughly another 12–30 months; many users haven't updated.
- Earlier-2026 articles describing Firefox as flag-only (`layout.css.scroll-driven-animations.enabled`, e.g. Firefox 152) are outdated — [SitePoint](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/); [whoooop.co.uk](https://whoooop.co.uk/blog/css-scroll-driven-animations).
- "Firefox 126+ / Safari 17.2+" thresholds on some blogs are **wrong** — [mintec.co](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/).
- Safari 26.4 reportedly added *threaded* (off-main-thread) SDA — single secondary source, **unverified** against WebKit notes.

### Syntax

**[Cited]** — [MDN Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines)

- `scroll(<scroller> <axis>)`: scroller `nearest | root | self`; axis `block | inline | y | x`.
- `view(<axis> <inset>)`: `view()` = `view(block auto)`. No scroller argument — always the nearest ancestor scroll container.
- Named timelines: `scroll-timeline-name` / `view-timeline-name` with `<dashed-ident>`s; `timeline-scope` on an ancestor shares them.
- `view-timeline-inset`: positive moves the boundary inward, negative outward.
- `animation-range`: e.g. `entry 10% cover 35%`, `contain 0% contain 100%`, `exit-crossing …`, `cover`.
- The container must actually overflow, or no timeline exists.

### Gotchas

**[Cited]** — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)

1. The `animation` shorthand resets `animation-timeline` to `auto` → declare `animation-timeline` **after** the shorthand.
2. Firefox needs a non-zero `animation-duration` → use `1ms` by convention.
3. `overflow: hidden` on an ancestor creates a scroll container and silently re-targets `scroll(nearest)` (broke a progress bar in Chromium) → use `overflow: clip`.
4. The spec is still an Editor's Draft with open issues.
5. "Newly available" ≠ every user updated → keep a fallback.
6. **[Sketch]** Make the static fallback the *final* state, never invisible content.

### Feature detection and JS API

**[Cited]** — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)

- CSS: `@supports (animation-timeline: scroll())`. JS: `CSS.supports('animation-timeline: scroll()')` with an IntersectionObserver or scroll-listener fallback.
- `new ScrollTimeline({ source, axis: 'block' })`; `timeline.currentTime` returns a CSSUnitValue in percent. `ViewTimeline` also exists.

```js
// Editor's note: WAAPI + ScrollTimeline wiring of the cited API; untested
if (CSS.supports('animation-timeline: scroll()')) {
  bar.animate({ scale: ['0 1', '1 1'] },
    { fill: 'both', timeline: new ScrollTimeline({ source: document.documentElement, axis: 'block' }) });
}
```

---

## 3. CSS scroll-triggered animations

**[Cited]** — [Chrome for Developers: Scroll-triggered animations](https://developer.chrome.com/blog/scroll-triggered-animations)

- Different from scroll-driven: a timeline *triggers* a time-based animation that plays forwards/backwards once a range is crossed — a declarative IntersectionObserver.
- Syntax:

```css
.el {
  timeline-trigger: --t view() entry 100% exit 0% / entry 0% exit 100%; /* name, source, activation range / active range */
  animation-trigger: --t play-forwards play-backwards;
}
.scope { trigger-scope: --t; } /* triggers are global and the last match wins */
```

- Chrome post: lands in Chrome 145; IntersectionObserver fallback recommended. Secondary sources: shipped Chrome 146 (stable 10 Mar 2026), unsupported in Firefox/Safari — [OpenReplay](https://blog.openreplay.com/css-scroll-animations-no-javascript/); [blink-dev Intent to Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/TZLFLjzt4II). **145 vs 146 unresolved.**
- Safari 26.6 and Firefox 154 reportedly lack `animation-trigger` — [SitePoint (search summary)](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/).
- Strategy: bonus only; use IO or GSAP `toggleActions` for play-once reveals.

---

## 4. IntersectionObserver (play-once reveals)

The notes recommend IO as the fallback for SDA and the primary path for play-once reveals but contain no IO snippet.

```js
// Editor's note: not from the source notes; standard IO pattern, untested
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('.reveal-io').forEach((el) => io.observe(el));
```

Pair with the capped stagger CSS in [motion-principles-easing.md](motion-principles-easing.md#9-choreography-and-stagger). Also use IO to pause off-screen render loops, Lottie, infinite CSS loops and WebGL hovers.

---

## 5. Scroll-state container queries

**[Cited]** — [Chrome for Developers: CSS scroll-state queries](https://developer.chrome.com/blog/css-scroll-state-queries)

- Shipped Chrome 133. Put `container-type: scroll-state` on the stuck/snapped/scrollable element; style a *descendant* via `@container scroll-state(stuck: top)`.
- Values: `stuck: top | bottom`; `snapped: x | y | inline | block`; `scrollable: top | right | bottom | left`. Combine with `not`, `and`, `or`. A container's pseudo-elements can query it. Standards track: CSS Conditional 5.
- Guard: `@supports (container-type: scroll-state)`.
- caniuse: Firefox (through 162 + Android) and Safari/iOS (through 27.3) **not supported**; web-features ties Firefox to an open Mozilla bug — [caniuse](https://caniuse.com/wf-container-scroll-state-queries); [web-features](https://web-platform-dx.github.io/web-features-explorer/features/container-scroll-state-queries/).

Uses (cited):

```css
/* Editor's note: assembled from the three cited uses */
@supports (container-type: scroll-state) {
  .site-header { position: sticky; top: 0; container-type: scroll-state; }
  @container scroll-state(stuck: top) { .site-header > .inner { box-shadow: 0 2px 12px rgb(0 0 0 / .12); } }

  .carousel > .slide { container-type: scroll-state; }
  @container not scroll-state(snapped: x) { .slide > * { opacity: .25; } }

  .page { container-type: scroll-state; }
  @container not scroll-state(scrollable: top) { .back-to-top { display: none; } }
}
```

Decorative only, with JS/plain fallback.

---

## 6. GSAP ScrollTrigger

**[Cited]** — [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). GSAP and all plugins are free incl. commercial use since 3.13.

| Option | What it does |
|---|---|
| `trigger` | Element whose position defines the range |
| `start` / `end` | Default start `"top bottom"` (`"top top"` when pinned); default end `"bottom top"`. Also `"+=500"`, `"max"` |
| `scrub` | `true` ties progress to scroll; a number = smoothing seconds |
| `pin`, `pinSpacing` | Pin the element; `pinSpacing` can be `false` or `"margin"` |
| `anticipatePin` | Prevents an unpinned flash on fast scroll |
| `snap` | Number, array, function, `"labels"` or `"labelsDirectional"` |
| `toggleActions` | Default `"play none none none"` |
| `containerAnimation` | Horizontal sections; the container tween **must** use `ease: "none"`; no pin/snap on those child triggers |
| `invalidateOnRefresh` | Recompute values on refresh |
| `fastScrollEnd` | Default threshold 2500 px/s |
| `preventOverlaps` | Force earlier animations to their end state |
| `ScrollTrigger.normalizeScroll(true)` | Moves scrolling to the JS thread; prevents mobile address-bar show/hide on most devices |
| `ScrollTrigger.isTouch` | 0, 1 or 2 |
| `gsap.matchMedia()` | Breakpoint-specific setups (`ScrollTrigger.matchMedia` is deprecated) |

- Resize recalculation waits for a 200 ms gap in resize events.
- Transforms or `will-change: transform` on ancestors break `position: fixed` pinning; `pinReparent: true` can help.

### Pin + scrub scrollytelling with snap-to-labels

**[Sketch]** using the docs' timeline pattern:

```js
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '.story', start: 'top top', end: '+=1000', scrub: 1, pin: true,
                     snap: { snapTo: 'labels' } }
  });
  tl.addLabel('one').to('.a', { opacity: 1 }).addLabel('two').to('.b', { opacity: 1 }).addLabel('three');
});
// mobile: simple stacked layout (no setup)
```

Editor's note: the `.to()` steps are placeholders; only the scrollTrigger config is from the docs.

---

## 7. Smooth scroll: Lenis and Locomotive

### Lenis

**[Cited]** — [Lenis GitHub](https://github.com/darkroomengineering/lenis). v1.3.27, a few KB, zero dependencies.

| Option | Default / note |
|---|---|
| `lerp` | 0.1 (overrides duration) |
| `duration` | 1.2 |
| `smoothWheel` | true |
| `syncTouch` | false (`syncTouchLerp` 0.075, `touchInertiaExponent` 1.7) |
| `autoRaf` | — |
| `anchors` | — |
| `prevent(node)` | — |
| `allowNestedScroll` | Checks the DOM every scroll; can be slow |

- Opt-out attributes: `data-lenis-prevent`, `data-lenis-prevent-wheel`, `-touch`, `-vertical`, `-horizontal`.
- Wraps native scroll, so `position: sticky` keeps working.
- Limitations: `syncTouch` odd on iOS < 16; fixed elements can lag on pre-M1 Safari; Safari caps at 60fps (30fps Low Power Mode); smoothing stops over iframes; CSS scroll-snap unsupported (use `lenis/snap`).

Lenis + ScrollTrigger glue (verbatim from the README):

```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

**[Sketch]** Keep `syncTouch: false` so touch scroll stays native. Put `data-lenis-prevent` on modals and code blocks.

```js
// Editor's note: construction using the cited option names/defaults
const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
```

Codrops' *Atelier UI* (21 Oct 2026, Jérémie Nallet) uses Lenis for scroll and **Motion as the main clock for both Lenis and the canvas** — [Codrops](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/) **[Snippet-only]**.

### Locomotive Scroll v5

**[Cited]** — [Locomotive docs](https://scroll.locomotive.ca/docs/). Built on Lenis (1.3.17), ~9.4 kB gzipped. Parallax via `data-scroll-speed`. **Parallax turns off automatically on touch devices**, which keep native scroll.

### GSAP ScrollSmoother

Free since 3.13; `data-speed` layers named as a rising trend ([MotionKit](https://motionkit.io/blog/web-animation-trends-2026), vendor). No API details in notes.

---

## 8. Variant catalogue

All **[Sketch]** unless marked; researcher-composed from cited docs.

### 8.1 Native reveal-on-view (progressively enhanced, reduced-motion safe)

```css
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal 1ms linear both;   /* shorthand first */
      animation-timeline: view();          /* then timeline */
      animation-range: entry 10% cover 35%;
    }
  }
}
@keyframes reveal { from { opacity: 0; translate: 0 2rem; clip-path: inset(0 0 100% 0); } }
```

End state is the default, so unsupported browsers see content. Taste: subtle 8–16 px rise on non-hero sections.

### 8.2 Scroll progress bar

```css
.progress { transform-origin: 0 50%; animation: grow 1ms linear both; animation-timeline: scroll(root block); }
@keyframes grow { from { scale: 0 1 } }
```

Pattern from [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g). Low vestibular risk — keep under reduced motion.

### 8.3 Multi-speed layered parallax (CSS)

```css
.layer { animation: px 1ms linear both; animation-timeline: view(); animation-range: cover; }
@keyframes px { from { translate: 0 calc(var(--speed) * -20vh) } to { translate: 0 calc(var(--speed) * 20vh) } }
```

Background layers small `--speed`, foreground larger. Disable on touch or reduced motion (as Locomotive v5 does). Taste: one or two parallax sections, not a whole page of competing layers; many parallax effects translate poorly to touch — [UXPin](https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/).

### 8.4 Zoom-through / scale-on-scroll hero

- Section `height: 300vh` containing a sticky `100svh` frame.
- Named `view-timeline: --hero` on the section; inner image `animation-timeline: --hero; animation-range: contain 0% contain 100%;`
- Keyframes `scale: 1 → 4` and `clip-path: inset(30% 35%) → inset(0)`.
- Use `svh` (not `dvh`) for the sticky frame so iOS address-bar changes don't resize mid-scrub.

```css
/* Editor's note: written out from the sketch spec */
.hero-zoom { height: 300vh; view-timeline: --hero block; }
.hero-zoom .frame { position: sticky; top: 0; height: 100svh; overflow: clip; }
@supports (animation-timeline: view()) {
  .hero-zoom img { animation: zoom 1ms linear both; animation-timeline: --hero; animation-range: contain 0% contain 100%; }
}
@keyframes zoom { from { scale: 1; clip-path: inset(30% 35%); } to { scale: 4; clip-path: inset(0); } }
```

Larose equivalent: **Zoom Parallax**.

### 8.5 Clip-path / mask "window" reveal

- `clip-path: circle(0% at 50% 50%) → circle(75%)`, or `inset(50% 50% 50% 50% round 2rem) → inset(0 round 0)`.
- Text-shaped masks: `mask-image: url(text.svg)` + `mask-size` scaled 2000% → 100% (Larose "SVG Mask Scroll").
- Bramus "Image reveal effects" (clip/scale on entry).

### 8.6 Sticky text swap (scrollytelling)

- Left column `position: sticky` with stacked headings. Right column step elements each with `view-timeline-name: --step-n`; `timeline-scope: --step-1, --step-2, …` on a shared ancestor lets sticky headings use `animation-timeline: --step-n` to fade in/out.
- GSAP: one ScrollTrigger per step with `toggleClass` or `onToggle`.

### 8.7 Stacking cards (CSS)

**[Cited]** — [stacking-cards demo](https://scroll-driven-animations.style/demos/stacking-cards/css/)

- Cards `position: sticky`. `view-timeline-name: --cards-element-scrolls-in-body` on the deck.
- Each card's **inner** element animates with `animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range)` (scale-down per card index).
- Sticky on the outer card, animation on the inner element, so scroll height is unaffected.

Larose equivalent: **Cards Parallax**.

### 8.8 Horizontal section

**[Cited] CSS** — [horizontal-section demo](https://scroll-driven-animations.style/demos/horizontal-section/css/): tall wrapper (`height: 500vh`) holds a sticky 100vh viewport; the strip translates X on a view timeline with `animation-range: contain 0% contain 100%`.

**[Sketch] GSAP**:

```js
const tween = gsap.to(track, {
  xPercent: -100 * (n - 1), ease: 'none',
  scrollTrigger: { trigger: wrap, pin: true, scrub: 1, end: () => '+=' + track.scrollWidth, invalidateOnRefresh: true }
});
// inner reveals: scrollTrigger: { containerAnimation: tween, trigger: panel, start: 'left center' }
```

Mobile: replace with native `overflow-x: auto` + `scroll-snap-type: x mandatory`, plus `scroll-state(snapped: x)` emphasis in Chromium.

### 8.9 Velocity marquee (Infinite Text Move On Scroll)

Two copies of a text track with `xPercent` loop; Lenis velocity adds speed and flips direction. CSS-only: `@keyframes` `translate: -50%` with `animation-play-state: paused` on hover. Pausable; disable under reduced motion (WCAG 2.2.2). Details in [text-animations.md](text-animations.md).

### 8.10 Scroll-drawn SVG path

`view()` + `stroke-dashoffset` (CSS) or dash from scroll % in JS — [svg-lottie-rive.md](svg-lottie-rive.md#line-drawing). Larose **SVG Path On Scroll**.

### 8.11 Bramus's canonical native-CSS demo set

**[Cited]** — [scroll-driven-animations.style](https://scroll-driven-animations.style/) (15 demos, each with CSS and WAAPI versions)

1. Reading progress indicator
2. Carousel step indicator
3. Carousel with markers
4. **Reverse-scrolling columns** (opposite-direction parallax)
5. **Cover card to fixed header**
6. **Image reveal effects** (clip/scale on entry)
7. Fly-in/fly-out contact list
8. **Cover Flow**
9. Window/parallax carousel
10. **Stacking cards**
11. **Horizontal scroll section**
12. **3D shoe explorer** (scroll-scrubbed rotation)
13. Shrinking header + shadow
14. Scroll shadows
15. Baseline timeline

### 8.12 Section transitions and footers (Larose)

**Sticky Footer** (reveal-under), **Perspective Section Transition**, **Mask Section Transition**, **3D Perspective Scroll**, **3D Wave on Scroll** — [blog.olivierlarose.com](https://blog.olivierlarose.com/) (titles; no code in notes).

### 8.13 WebGL scroll scenes

DOM-synced WebGL image planes with velocity bend, Blender camera paths scrubbed by scroll, baked Houdini VAT playback — [3d-webgl-shaders.md](3d-webgl-shaders.md#scroll-driven-webgl-patterns).

---

## 9. Image-sequence scrubbing (Apple-style)

**[Cited]**

- Mechanism: preload every frame as an `Image`, map scroll progress to a frame index, `drawImage` to a canvas — [CSS-Tricks](https://css-tricks.com/?p=308477); [DEV flipbooks article](https://dev.to/sagarparmarr/genx-from-childhood-flipbooks-to-premium-scroll-animation-1j4).
- AirPods Pro recreation uses **147 JPEG frames** — [GitHub Rachit-Pal](https://github.com/Rachit-Pal/Apple-Scroll-Animation/blob/master/app.js).
- Budget: 200 frames at 2000 px wide ≈ **400 MB+ uncompressed** in memory; recommended **~100–300 frames** — [tech-blog tutorial](https://tech-blog-final-rho.vercel.app/articles/apple-scroll-zoom-effects-tutorial).
- **WebP at ~q85** with a preload progress indicator — [mejba.me](https://www.mejba.me/blog/3d-scroll-animations-ai-claude-code).
- Alternative: pack frames into **one spritesheet** (one request, `<link rel="preload">`) and step through it with CSS SDA — [geyer.dev via HN reader](https://hn.jakechampion.name/reader/https://geyer.dev/blog/css-image-sequence-animations).

**[Sketch]** canvas build:

- Export 120–200 WebP frames at ~1600 px, q≈80–85.
- Preload with a counter (doubles as the preloader) and decode with `img.decode()`.
- Map `progress → Math.round(progress*(N-1))` from a ScrollTrigger `onUpdate` or a `scroll(root)` ScrollTimeline. Draw only when the index changes.
- Mobile: half-resolution frame set, or a single `<video>` scrubbed by `currentTime` (video scrub quality depends on keyframe density — inference, not verified).
- Budget **[Synthesis]**: ≤ 200 frames, WebP/AVIF, half resolution on mobile; on low-RAM devices keep only decoded frames near the current index.
- Reduced motion: show the end frame.

```js
// Editor's note: assembled from the sketch steps; untested
const N = 150, frames = [];
let loaded = 0;
for (let i = 0; i < N; i++) {
  const img = new Image();
  img.src = `/seq/${String(i).padStart(4, '0')}.webp`;
  frames.push(img);
  img.decode().then(() => { loaded++; counter.textContent = Math.round(loaded / N * 100); });
}
let last = -1;
ScrollTrigger.create({
  trigger: '.seq', start: 'top top', end: '+=2000', pin: true, scrub: true,
  onUpdate: (self) => {
    const i = Math.round(self.progress * (N - 1));
    if (i !== last) { ctx.drawImage(frames[i], 0, 0, canvas.width, canvas.height); last = i; }
  }
});
```

---

## 10. Named tutorial catalogues

**Olivier Larose** (Next.js + Framer Motion/GSAP/Lenis; ~40 tutorials) — [blog.olivierlarose.com](https://blog.olivierlarose.com/). Scroll-related: Background Image Parallax, Parallax Scroll, Smooth Parallax Scroll, **Zoom Parallax**, **Cards Parallax** (stacking), Text Parallax, Horizontal Scroll / Horizontal Section, Smooth Scroll, **Sticky Footer**, **Perspective Section Transition**, **Mask Section Transition**, **SVG Path On Scroll**, **SVG Mask Scroll**, 3D Perspective Scroll, **3D Wave on Scroll**, **Infinite Text Move On Scroll**. (Cursor, text and shader ones are in [hover-effects.md](hover-effects.md#g-cursor-effects), [text-animations.md](text-animations.md), [3d-webgl-shaders.md](3d-webgl-shaders.md).)

**Codrops 2026 scroll/WebGL tutorials** **[Snippet-only]**:

- Scroll-revealed WebGL gallery (GSAP + three.js + Astro + Barba.js, 2 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)
- Smooth horizontal parallax gallery, DOM → WebGL, interpolated scroll value (David Faure, 19 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/)
- Scroll-driven 3D gallery along a Blender camera path (Gaspard Hedde, 7 Jul 2026) — [Codrops](https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/)
- Scroll-reactive 3D gallery, depth-layered images, palette "mood" backgrounds, scroll velocity — [Codu repost](https://www.codu.co/codrops/building-a-scroll-reactive-3d-gallery-with-threejs-velocity-and-mood-based-backgrounds-qMLwRqS)
- Crumbled paper: Houdini VAT → three.js (19 Sep 2026) — [Codrops](https://tympanus.net/codrops/2026/09/19/crumbled-paper-houdini-vat-threejs/)
- Cinematic 3D scroll (rotating WebGL cylinder + reactive particles; scroll-controlled 3D showcase with moving camera and typography) — [GitHub JosephASG](https://github.com/JosephASG/codrops-cinematic-scroll-animations)
- Hubs: [tag/scroll](https://tympanus.net/codrops/tag/scroll/), [tag/webgl](https://tympanus.net/codrops/tag/webgl/), [hub/tag/scroll](https://tympanus.net/codrops/hub/tag/scroll/)

**Motion `useScroll`**: docs timed out. Details (`offset: ["start end","end start"]`, `scrollYProgress`, hardware-accelerated ScrollTimeline) are **prior knowledge — verify at https://motion.dev/docs/react-use-scroll**. Codrops Atelier UI confirms Motion as a render clock in production.

**2026 trend list** (vendor opinion) — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026):
- Rising: pinned scrollytelling (`pin` + `scrub`), kinetic/variable typography, native scroll-driven CSS, INP-aware motion (transform/opacity only, lazy-loaded animation code), bento-grid staggered reveals (`stagger: 0.08`), sparing 3D (rotating product, liquid hover distortion, shader hero), cursor micro-interactions (magnetic buttons), ScrollSmoother `data-speed` layers, DrawSVG/MotionPath, `matchMedia` reduced-motion.
- Fading: autoplay entrance on every element, laggy scroll-hijack smoothing, decorative preloader spinners, heavy hero video as default, INP-hurting stutter.

---

<a id="taste-restraint-and-slop"></a>
## 11. Taste, restraint and slop

**[Cited]**

- Scroll effects risk "favoring spectacle over substance" and spending budget on interactions most visitors scroll past — [DEV: Scroll-driven animations in 2026](https://dev.to/iliketoplay/scroll-driven-animations-in-2026-558d)
- One or two tasteful parallax sections add interest; a page of competing parallax layers feels gimmicky; many parallax effects translate poorly to touch — [UXPin](https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/)
- "One or two smooth animations beat fifteen chaotic ones" — [Tekysinfo](https://tekysinfo.com/website-design-trends-heres-what-works-in-2026/)
- Immersive Garden "spent more time removing ideas than creating new ones" — [CommArts](https://www.commarts.com/webpicks/immersive-garden)
- Only 53% of websites meet all "good" Core Web Vitals thresholds; scroll-jacking and forced snap points take control from users — [Digital Silk](https://www.digitalsilk.com/digital-trends/scrolling-effects/)
- 43% of sites fail the 200 ms INP threshold (secondhand, attributed to Digital Applied) — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026)
- Fade-on-scroll + purple gradients flagged as homogenised LLM-output trends; scroll-fade usually overdone and ignores reduced motion — see [motion-principles-easing.md](motion-principles-easing.md#ai-slop-critique-opinion-sources)

Taste checklist (8 rules, **[Synthesis]**): [motion-principles-easing.md §4](motion-principles-easing.md#4-scroll-page-taste-checklist-synthesis). Key numbers: 8–16 px rise; text 0.6–1.0 s; UI 0.3–0.5 s; stagger 0.05–0.12 s; `expo.out`/`power3.out` entrances, `none` for scrubs; no text below ~0.3 opacity for long; no pin longer than ~2–3 viewport heights without visible progress; Lenis `syncTouch:false`; never hijack wheel into page-snapping on desktop.

---

## 12. Mobile and iOS

**[Cited]**

- `dvh` causes scroll jank as the address bar resizes; elements don't resize until scrolling ends; scroll-snap + `100dvh` can jump to the next section (bug still NEW) — [WebKit Bug 266835](https://bugs.webkit.org/show_bug.cgi?id=266835)
- After iOS 18, dynamic viewport units misbehaved in *third-party* iOS browsers while Safari was fine — [WebKit Bug 279998](https://bugs.webkit.org/show_bug.cgi?id=279998)
- iPhone 13: 100dvh = 742 px with browser UI, 844 px hidden. Use **`svh` for heroes**; animating height to `100dvh` jitters — [Medium viewport units](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a); [savvy.co.il](https://savvy.co.il/blog/css/css-dynamic-viewport-height-dvh/)
- `ScrollTrigger.normalizeScroll(true)` prevents address-bar show/hide on most devices; resize debounced 200 ms — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- Safari caps rAF at 60fps, 30fps in Low Power Mode — [Lenis README](https://github.com/darkroomengineering/lenis)
- Locomotive v5 disables parallax on touch — [Locomotive](https://scroll.locomotive.ca/docs/)
- iOS Safari 26 supports both SDA and WebGPU, so mobile creative work no longer needs a Chromium-only assumption; older iPhones that can't run iOS 26 need fallbacks **[Synthesis]**.

**[Synthesis]** mobile layout strategy:

- Convert pinned horizontal sections into native swipe carousels.
- `svh` for pinned and sticky frames, `lvh` for full-bleed backgrounds, `dvh` only for static (non-animated) app shells.
- Avoid `100vh` sticky elements inside scroll-snap containers.
- Test in Low Power Mode (30fps cap) and in third-party iOS browsers.
- Keep overscroll defaults (pull-to-refresh) on coarse pointers ([Vercel](https://vercel.com/design/guidelines)).

---

## 13. Reduced motion and accessibility

- **[Cited]** WCAG 2.3.3 (AAA): non-essential movement during scrolling and parallax are named vestibular triggers; scrolling itself is essential. Techniques C39 (CSS), SCR40 (JS `matchMedia`), or a site-level motion toggle (e.g. global parallax off) — [W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Auto-starting animation → SC 2.2.2.
- **[Cited]** The Baseline-SDA demo, under reduced motion, stopped ring and hero motion and removed the 3D card rotation — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g).
- **[Synthesis]** Gate all non-essential motion behind `@media (prefers-reduced-motion: no-preference)` and `gsap.matchMedia()`. Under `reduce`: parallax/zoom/scale → instant or opacity-only; image sequences show the end frame; autoplaying shaders stop or render one frame; scroll-linked progress bars stay (low risk). Offer an in-page "reduce motion" toggle.

Full guidance: [performance-accessibility.md](performance-accessibility.md).

## 14. Browser support

| Feature | Chromium | Safari | Firefox | Strategy |
|---|---|---|---|---|
| `animation-timeline: scroll()/view()` | 115+ | 26+ | 159+ (27 Oct 2026) | Native, in `@supports` + no-preference; static fallback = final state |
| `timeline-trigger` / `animation-trigger` | 145/146+ | No | No | IO or GSAP `toggleActions`; CSS bonus only |
| `container-type: scroll-state` | 133+ | No | No | Decorative only |

Full table: [browser-support.md](browser-support.md).

## 15. Gaps

- caniuse SDA tables didn't render via the 07 fetcher (the 06 notes give 89.1% global).
- Safari 26.4 "threaded SDA" unverified; Chrome 145 vs 146 for scroll-triggered unresolved.
- Codrops 2026 tutorial code unverified (403); only titles/dates/authors/summaries.
- Motion `useScroll` API from prior knowledge.
- Resn and Locomotive studio sites not examined.
- No primary research on tasteful vs gimmicky scroll motion; sources are opinion/vendor blogs. The full iliketoplay article wasn't read (intro only).
- No IO snippet in the notes (the one above is an Editor's note).

---

## Sources

- DEV, Scroll-driven animations are Baseline at last — https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g
- scroll-driven-animations.style (Bramus) — https://scroll-driven-animations.style/ ; demos: https://scroll-driven-animations.style/demos/baseline-newly-available/css/ , https://scroll-driven-animations.style/demos/stacking-cards/css/ , https://scroll-driven-animations.style/demos/horizontal-section/css/
- MDN, Scroll-driven animation timelines — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines
- caniuse, animation-timeline scroll() — https://caniuse.com/mdn-css_properties_animation-timeline_scroll
- SitePoint, Scroll-Driven CSS in 2026 — https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/
- whoooop.co.uk — https://whoooop.co.uk/blog/css-scroll-driven-animations
- mintec.co (contradicted) — https://mintec.co/blog/scroll-driven-view-transitions-css-2026/
- Chrome for Developers, Scroll-triggered animations — https://developer.chrome.com/blog/scroll-triggered-animations
- OpenReplay — https://blog.openreplay.com/css-scroll-animations-no-javascript/
- blink-dev Intent to Ship — https://groups.google.com/a/chromium.org/g/blink-dev/c/TZLFLjzt4II
- Chrome for Developers, CSS scroll-state queries — https://developer.chrome.com/blog/css-scroll-state-queries
- caniuse, scroll-state queries — https://caniuse.com/wf-container-scroll-state-queries
- web-features explorer — https://web-platform-dx.github.io/web-features-explorer/features/container-scroll-state-queries/
- GSAP ScrollTrigger docs — https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP 3.13 — https://gsap.com/blog/3-13/
- Lenis — https://github.com/darkroomengineering/lenis
- Locomotive Scroll docs — https://scroll.locomotive.ca/docs/
- Codrops Atelier UI (snippet) — https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/
- Olivier Larose — https://blog.olivierlarose.com/
- Codrops 2026 tutorials (snippets) — URLs in §10
- CSS-Tricks image sequence — https://css-tricks.com/?p=308477
- DEV flipbooks — https://dev.to/sagarparmarr/genx-from-childhood-flipbooks-to-premium-scroll-animation-1j4
- Rachit-Pal Apple scroll — https://github.com/Rachit-Pal/Apple-Scroll-Animation/blob/master/app.js
- tech-blog Apple scroll tutorial — https://tech-blog-final-rho.vercel.app/articles/apple-scroll-zoom-effects-tutorial
- mejba.me — https://www.mejba.me/blog/3d-scroll-animations-ai-claude-code
- geyer.dev via HN reader — https://hn.jakechampion.name/reader/https://geyer.dev/blog/css-image-sequence-animations
- MotionKit — https://motionkit.io/blog/web-animation-trends-2026
- DEV iliketoplay — https://dev.to/iliketoplay/scroll-driven-animations-in-2026-558d
- UXPin — https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/
- Tekysinfo — https://tekysinfo.com/website-design-trends-heres-what-works-in-2026/
- CommArts Immersive Garden — https://www.commarts.com/webpicks/immersive-garden
- Digital Silk — https://www.digitalsilk.com/digital-trends/scrolling-effects/
- WebKit Bug 266835 — https://bugs.webkit.org/show_bug.cgi?id=266835
- WebKit Bug 279998 — https://bugs.webkit.org/show_bug.cgi?id=279998
- Medium viewport units — https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a
- savvy.co.il — https://savvy.co.il/blog/css/css-dynamic-viewport-height-dvh/
- W3C Understanding 2.3.3 — https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- Vercel guidelines — https://vercel.com/design/guidelines
