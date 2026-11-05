# SVG, Lottie and Rive

Vector animation techniques: SVG line drawing (with `pathLength`), shape morphing (GSAP MorphSVG, Flubber, CSS `d:`), SVG filter effects (gooey, liquid displacement), animated icons (hamburger → X, sun → moon, checkmarks), and designer-made vector animation runtimes — Lottie / dotLottie (Rust + WASM, state machines, worker rendering) and Rive (state machines, WebGL2 renderer). Markers: **[Cited]** fetched source; **[Sketch]** / **[Reference build]** researcher-composed, untested; **[Vendor claim]**; **Editor's note** connective guidance.

## Contents

- [1. Which vector technique](#1-which-vector-technique)
- [2. Line drawing](#line-drawing)
- [3. Morphing](#3-morphing)
- [4. SVG variants](#svg-variants)
- [5. Animated icons](#5-animated-icons)
- [6. Lottie / dotLottie](#6-lottie--dotlottie)
- [7. Rive](#7-rive)
- [8. Lottie vs Rive](#8-lottie-vs-rive)
- [9. Performance, mobile, accessibility](#9-performance-mobile-accessibility)
- [10. Gaps](#10-gaps)
- [Sources](#sources)

---

## 1. Which vector technique

**[Synthesis]**

| Job | Use |
|---|---|
| Stroke draw (logo, checkmark, underline, route line) | CSS `stroke-dashoffset` with `pathLength="1"`; DrawSVG for complex timing |
| Shape morph between paths | GSAP MorphSVG (free); Flubber for d3/rAF; CSS `d:` (not dependable in Safari) |
| Icon state change (menu, toggle) | CSS transforms on `<span>`/`<g>`; MorphSVG for true path morphs |
| Designer-authored illustration/burst | Lottie / dotLottie |
| Interactive, input-driven vector (state machines) | Rive, or dotLottie v2 state machines |
| Gooey / liquid effects | SVG filters (repaint every frame — small areas only) |

Vercel: apply SVG transforms to `<g>` wrappers for reliable Safari behaviour — [Vercel guidelines](https://vercel.com/design/guidelines) **[Cited]**.

---

<a id="line-drawing"></a>
## 2. Line drawing

**[Cited]**

- Set `pathLength="1"` on the stroked path (`fill: none`), then `stroke-dasharray: 1` and animate `stroke-dashoffset` 1 → 0. No `getTotalLength()` measurement needed — [Stefan Judis: pathLength](https://www.stefanjudis.com/blog/pathlength-makes-makes-svg-path-animations-easier-to-manage); [CSS-Tricks](https://css-tricks.com/?p=301196).
- Without `pathLength`, use the measured length (e.g. 8085) — [CSS-Tricks](https://css-tricks.com/?p=254582).
- Scroll-drawn paths classically set the dash from scroll % in JS — [GeeksforGeeks](https://geeksforgeeks.org/how-to-draw-on-scroll-using-javascript-and-svg).
- CSS-only: pair `view()` with `stroke-dashoffset` — [ceslava CSS SVG course](https://cursos.ceslava.com/en/curso/css/leccion/css-svg-pro).

```html
<!-- Editor's note: assembled from the cited technique; untested -->
<svg viewBox="0 0 200 100"><path class="draw" pathLength="1" d="M10 80 C 60 10, 140 10, 190 80"/></svg>
```

```css
.draw { fill: none; stroke: currentColor; stroke-width: 2; stroke-dasharray: 1; stroke-dashoffset: 1; }
.is-in .draw { transition: stroke-dashoffset 1.2s var(--ease-out); stroke-dashoffset: 0; }

/* scroll-drawn (progressive enhancement) */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .route { animation: draw 1ms linear both; animation-timeline: view(); animation-range: entry 0% cover 60%; }
  }
}
@keyframes draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
```

Caveat: Safari support of `pathLength` is **uncertain** — a CSS-Tricks note said Safari lacked it "at the time of writing" (old). Verify current behaviour; fall back to measured lengths if needed.

Uses: checkbox draw-in (dasharray 24, 250 ms, 60 ms delay), success check (circle 400 ms then check 250 ms delayed 300 ms) — [micro-interactions.md](micro-interactions.md#d-checkbox-draw-in-5-variants); logo stroke-draw → fill intro — [page-transitions.md](page-transitions.md#6-intro--preloader-sequences); Larose **SVG Path On Scroll**.

---

## 3. Morphing

- **GSAP MorphSVG** — now free (3.13) **[Cited]** [GSAP 3.13](https://gsap.com/blog/3-13/). Option details not fetched. Codrops' May 2025 demo set includes MorphSVG — [Codrops](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) (snippet).
- **Flubber** **[Cited]** — [flubber GitHub](https://github.com/veltman/flubber) (MIT, ~7k stars):
  - `interpolate(from, to)`, `toCircle` / `toRect` / `fromCircle`, `separate` (one → many), `combine`, `interpolateAll`.
  - Returns a `t ∈ [0,1]` → path-string interpolator; works with d3 `attrTween("d")` or rAF.
  - `maxSegmentLength` default 10 (lower = smoother, slower).
  - Shows **signs of age** (Travis badge, 2017 copyright, v0.3.0 examples).
- **CSS `d:` path transitions**: Chromium and Firefox; not dependable in Safari **[Reference build note]**.
- **Anime.js v4** `morphTo`, `createDrawable`, `createMotionPath` — [Anime.js docs](https://animejs.com/documentation/getting-started/imports).

```js
// Flubber with rAF — Editor's note: assembled from the cited API; untested
import { interpolate } from 'flubber';
const lerp = interpolate(pathA, pathB, { maxSegmentLength: 10 });
const t0 = performance.now(), dur = 800;
(function tick(now) {
  const t = Math.min((now - t0) / dur, 1);
  el.setAttribute('d', lerp(t));
  if (t < 1) requestAnimationFrame(tick);
})(t0);
```

---

<a id="svg-variants"></a>
## 4. SVG variants

**[Sketch]**

| Variant | Spec |
|---|---|
| Hand-drawn underline on link hover | Dash offset (also Codrops' DrawSVG hover underline) |
| Scroll-drawn route or timeline line | `view()` + `stroke-dashoffset` |
| Morphing blob background | Flubber or MorphSVG between 3–4 blob paths, yoyo |
| Icon state morph | Hamburger → close via MorphSVG |
| Animated stroke-gradient logo | `<linearGradient>` with animated `gradientTransform` |
| Liquid hover on images | `feTurbulence` + `feDisplacementMap`, animate `baseFrequency`; costly on large areas |
| Gooey blobs | `feGaussianBlur` + `feColorMatrix` (Larose "Text Gooey"; gooey button filter in [micro-interactions.md A7](micro-interactions.md#a7-liquid--gooey-button)) |
| SVG mask scroll | `mask-image: url(text.svg)` + `mask-size` 2000% → 100% (Larose "SVG Mask Scroll") |
| Text on a path | `<textPath href="#curve" startOffset="X%">` scrubbed by scroll |

```html
<!-- Liquid displacement filter — Editor's note: standard filter wiring for the sketch; values illustrative -->
<svg width="0" height="0"><filter id="liquid">
  <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="20"/>
</filter></svg>
```

Gooey filter (values from memory; `0 0 0 18 -7`, sometimes `19 -9`):

```html
<svg width="0" height="0"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b"/>
<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="g"/>
<feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></svg>
```

SVG filters repaint every frame (no compositor).

---

## 5. Animated icons

**[Reference build]** — full specs in [micro-interactions.md](micro-interactions.md).

- **Hamburger → X**: three 2 px × 22 px spans, 6 px gap; lines 1/3 `translateY(±8px) rotate(±45deg)`, line 2 `opacity 0; scaleX(0)`; 300 ms `--ease-out` / opacity 150 ms. Variants: collapse-then-rotate (150 + 150 ms), two-line, burger → arrow, SVG path morph, 180° whole-icon rotate.
- **Sun → moon toggle**: SVG `<circle>` mask moves in to carve a crescent; rays scale to 0 with 20 ms stagger.
- **Checkbox / success check draw**.
- **Copy → check** icon swap with blur crossfade (150–200 ms).
- **Like heart**: pop, particle ring, `steps(28)` sprite sheet (frame count from memory), or Lottie/Rive burst.

---

## 6. Lottie / dotLottie

**[Cited]** — [dotlottie-web GitHub](https://github.com/LottieFiles/dotlottie-web)

- `@lottiefiles/dotlottie-web`: Rust + WASM engine (dotlottie-rs, ThorVG).
- Backends: Canvas2D (software), WebGL2, WebGPU (experimental). Use WebGL2/WebGPU builds for many or large animations.
- Wrappers: React, Vue, Svelte, Solid, plus a Web Component.
- dotLottie v2 files embed **state machines** (pointer, custom events, inputs; no JS glue), with events such as `stateMachineTransition`.
- `DotLottieWorker` renders on an OffscreenCanvas in a Web Worker.
- Freeze-on-offscreen and frame interpolation supported.
- LottieFiles claims dotLottie state machines are now close to Rive's (vendor, Mar 2026) — [LottieFiles blog](https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive.md).
- Assets: [lottiefiles.com](https://lottiefiles.com) (not verified this session).

```js
// Editor's note: typical dotlottie-web usage; option names beyond the cited features are from the package README pattern, verify
import { DotLottie } from '@lottiefiles/dotlottie-web';
const anim = new DotLottie({ canvas: document.querySelector('#c'), src: '/burst.lottie', autoplay: false, loop: false });
button.addEventListener('click', () => anim.play());
```

---

## 7. Rive

**[Cited]** — [Rive Web (JS) runtime docs](https://rive.app/docs/runtimes/web/web-js)

- `@rive-app/webgl2` recommended: uses the Rive Renderer (same as the editor) with vector feathering.
- `@rive-app/canvas-lite`: for files without Text, Layouts, Scripting or Audio.
- Setup: `new rive.Rive({ src, canvas, autoplay, stateMachine, autoBind: true, onLoad })`.
- Call `resizeDrawingSurfaceToCanvas()` in `onLoad` and on resize for crisp DPR.
- Reuse parsed files via `rivFile` or `buffer`.
- **Always `cleanup()`** to free C++/WASM objects.
- Rive claims `.riv` files are typically 10–15× smaller than equivalent Lottie — **[Vendor claim]** [Rive blog](https://rive.app/blog/rive-as-a-lottie-alternative).
- Assets: [rive.app/community](https://rive.app/community) (not verified).

```js
// Editor's note: assembled from the cited constructor options; untested
import * as rive from '@rive-app/webgl2';
const r = new rive.Rive({
  src: '/toggle.riv', canvas, autoplay: true, stateMachine: 'State Machine 1', autoBind: true,
  onLoad: () => r.resizeDrawingSurfaceToCanvas(),
});
addEventListener('resize', () => r.resizeDrawingSurfaceToCanvas());
// on unmount:
r.cleanup();
```

---

## 8. Lottie vs Rive

| | Lottie / dotLottie | Rive |
|---|---|---|
| Runtime | Rust + WASM (ThorVG); Canvas2D / WebGL2 / WebGPU (exp.) | Rive Renderer (WebGL2) or canvas-lite |
| Interactivity | dotLottie v2 state machines | State machines (native) |
| Worker rendering | `DotLottieWorker` (OffscreenCanvas) | not stated in notes |
| File size | — | 10–15× smaller than Lottie (vendor claim) |
| npm adoption (rough) | lottie-web ~300K/week | @rive-app/canvas ~50K/week |
| Cleanup | freeze offscreen | `cleanup()` required |

Adoption source: [PkgPulse 2026](https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026).

---

## 9. Performance, mobile, accessibility

- **[Cited]** Freeze offscreen Lottie; move many animations to a worker (`DotLottieWorker`) — [dotlottie-web](https://github.com/LottieFiles/dotlottie-web). Call Rive `cleanup()` to avoid leaks — [Rive docs](https://rive.app/docs/runtimes/web/web-js).
- **[Synthesis]** budget: Lottie/Rive freeze offscreen; one shared worker; cleanup on unmount.
- SVG filters (goo, turbulence) repaint every frame; small areas only, avoid on low-end mobile.
- Reduced motion: show a static end frame; stop loops; decorative icons keep `aria-hidden`; state is conveyed by `aria-pressed`/`aria-expanded`, not the animation.

## 10. Gaps

- No fetched source on DrawSVG/MorphSVG option details.
- Safari `pathLength` support uncertain.
- Gooey matrix values and Twitter sprite frame count from memory.

---

## Sources

- Stefan Judis, pathLength — https://www.stefanjudis.com/blog/pathlength-makes-makes-svg-path-animations-easier-to-manage
- CSS-Tricks — https://css-tricks.com/?p=301196 ; https://css-tricks.com/?p=254582
- GeeksforGeeks, draw on scroll — https://geeksforgeeks.org/how-to-draw-on-scroll-using-javascript-and-svg
- ceslava CSS SVG course — https://cursos.ceslava.com/en/curso/css/leccion/css-svg-pro
- GSAP 3.13 — https://gsap.com/blog/3-13/
- Flubber — https://github.com/veltman/flubber
- Anime.js docs — https://animejs.com/documentation/getting-started/imports
- Rive Web (JS) runtime — https://rive.app/docs/runtimes/web/web-js
- Rive blog, Lottie alternative — https://rive.app/blog/rive-as-a-lottie-alternative
- dotlottie-web — https://github.com/LottieFiles/dotlottie-web
- LottieFiles blog — https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive.md
- PkgPulse 2026 — https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026
- Vercel guidelines — https://vercel.com/design/guidelines
- Codrops, From SplitText to MorphSVG (snippet) — https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/
- Olivier Larose — https://blog.olivierlarose.com/
