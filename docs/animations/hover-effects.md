# Hover Effects

Rebuildable specs for hover effects: image hovers (zoom, reveal, cursor-follow preview, trails, RGB split, WebGL displacement), link underline animations, text hovers (roll, scramble, weight shift, masked slide), tilt/parallax cards with glare, spotlight and glow borders, button fill sweeps, and cursor effects. Hover is a **desktop-only enhancement**: gate it with `@media (hover:hover) and (pointer:fine)`, give touch users an `:active` or focus equivalent, and never hide information behind hover. Crafted versions use `overflow:hidden` masks, direction/cursor awareness, per-character stagger, and slow decelerating image moves (600–900 ms ease-out-expo) against fast UI responses. Markers: **[Cited]** fetched source; **[Snippet-only]** search-result snippet; **[Reference build]** researcher-written, untested; **[Synthesis]** inference; **Editor's note** connective guidance. Tokens (`--ease-out`, `--ease-out-expo`) are in [motion-principles-easing.md](motion-principles-easing.md#8-reference-motion-token-stylesheet).

## Contents

- [0. Gating hover and touch equivalents](#0-gating-hover-and-touch-equivalents)
- [A. Image hover (10 variants)](#a-image-hover-10-variants)
- [B. Link underline animations (8 variants)](#b-link-underline-animations-8-variants)
- [C. Text hover (8 variants)](#c-text-hover-8-variants)
- [D. Tilt and parallax cards (5 variants)](#d-tilt-and-parallax-cards-5-variants)
- [E. Spotlight and glow borders (6 variants)](#e-spotlight-and-glow-borders-6-variants)
- [F. Button fill sweeps](#f-button-fill-sweeps)
- [G. Cursor effects](#g-cursor-effects)
- [Performance notes](#performance-notes)
- [Inspiration](#inspiration)
- [Gaps](#gaps)
- [Sources](#sources)

---

## 0. Gating hover and touch equivalents

**[Cited]** — [MDN @media hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)

- `@media (hover: none)`: primary input can't hover, or can't hover conveniently (many phones emulate it with a long tap). `hover: hover`: it can.
- MDN's pattern: a default `:hover` style enhanced inside `@media (hover: hover)` so touch devices don't get stuck states. Widely available since Dec 2018.

```css
@media (hover: hover) and (pointer: fine) {
  .thing:hover { /* hover-only enhancement */ }
}
.thing:focus-visible { /* keyboard equivalent */ }
```

**Touch equivalents [Reference build]**: do the hover effect on `:active` or focus where meaningful (card press, image tap). Show reveal content by default on `(hover:none)`. Never show a tooltip only on hover.

---

## A. Image hover (10 variants)

**[Reference build]** unless noted.

### A1. Slow zoom in a mask
```css
.media { overflow: hidden; }
.media img { transition: scale 800ms var(--ease-out-expo); }
@media (hover: hover) { .media:hover img { scale: 1.06; } }
```
Keep to 1.03–1.08; scaling to 1.2 looks cheap.

### A2. Zoom-out reveal
Image starts at `scale 1.15`, goes to 1 on hover (inverse). Suits editorial grids.

### A3. Clip-path reveal
Hovering a list item reveals an image through `clip-path: inset(50% 50% 50% 50%)` → `inset(0)`, 500 ms `--ease-out-expo`. Variant: `circle(0% at var(--x) var(--y))` → `circle(75%)`.

### A4. Cursor-follow preview
Hovering a text list shows a floating image that follows the cursor with a lerp (`gsap.quickTo` 0.5 s `power3`), with slight rotation proportional to velocity. A common Awwwards pattern.

```js
// Editor's note: minimal wiring of the spec above; untested
const xTo = gsap.quickTo(preview, 'x', { duration: .5, ease: 'power3' });
const yTo = gsap.quickTo(preview, 'y', { duration: .5, ease: 'power3' });
const rTo = gsap.quickTo(preview, 'rotation', { duration: .5, ease: 'power3' });
let lastX = 0;
list.addEventListener('pointermove', (e) => {
  xTo(e.clientX); yTo(e.clientY);
  rTo(Math.max(-10, Math.min(10, (e.clientX - lastX) * 0.5))); lastX = e.clientX;
});
```

### A5. Image trail
Images spawn along the cursor path and fade and scale out (Codrops "image trails"; [Codrops ?p=44003](https://tympanus.net/codrops/?p=44003) **[Snippet-only]**).

### A6. RGB split
- CSS: two `::before`/`::after` copies (`background-image: inherit`) with `mix-blend-mode: screen` and colour channels via `filter` or separate tinted layers, offset ±3 px on hover over 200 ms.
- WebGL: sample the texture with per-channel offsets driven by cursor velocity.

### A7. Displacement distortion (WebGL)
- A noise/displacement map mixes texture A → B with `progress` tweened 0 → 1 over 1 s `expo.out` (Codrops hover-effect).
- **[Snippet-only]** Codrops WebGL Distortion Hover Effects (2018) uses a displacement image to transition between two images with three.js; the author warns it is "heavy on the memory" — [Codrops](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/).
- **[Snippet-only]** Codrops motion hover effects with Three.js: main distortion + RGB displacement, image trails, image stretch; source in Clément Roche's repo — [Codrops ?p=44003](https://tympanus.net/codrops/?p=44003); [GitHub clementroche/motion-hover-effects](https://github.com/clementroche/motion-hover-effects/blob/master/index2.html).
- Heavy: lazy-init on first hover; pause off-screen with `IntersectionObserver`.

### A8. Grayscale → colour + slight lift
`filter: grayscale(1)` → 0. Filter repaints, so keep images small or use opacity on a coloured duplicate layer.

### A9. Overlay caption slide
Caption translates 100% → 0 inside the mask, staggered 60 ms after the image zoom.

### A10. Duotone / blend shift
Transition the `mix-blend-mode` overlay's opacity.

Related: SVG `feTurbulence` + `feDisplacementMap` "liquid" hover (animate `baseFrequency`; costly on large areas) — [svg-lottie-rive.md](svg-lottie-rive.md#svg-variants). R3F mouse image distortion and ripple shader — [3d-webgl-shaders.md](3d-webgl-shaders.md).

---

## B. Link underline animations (8 variants)

**[Reference build]**

```css
.link { background: linear-gradient(currentColor 0 0) 0 100% / 0 1px no-repeat;
        transition: background-size 350ms var(--ease-out); }
@media (hover:hover) { .link:hover { background-size: 100% 1px; } }
.link:focus-visible { background-size: 100% 1px; }
```

| # | Variant | Spec |
|---|---|---|
| 1 | Grow from left | Above |
| 2 | Enter left, exit right | `::after` with `transform: scaleX(0); transform-origin: right`; on hover `scaleX(1); transform-origin: left`. The line leaves in the direction it came — the classic crafted detail |
| 3 | Grow from center | `transform-origin: center` |
| 4 | Thickness swell | Underline `background-size` from 1 px to 100% height → highlighter fill, text colour inverting |
| 5 | Wavy underline draw | SVG path with `stroke-dashoffset`, or Codrops' DrawSVG hover-underline demo ([Codrops May 2025](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/), **[Snippet-only]**) |
| 6 | Underline offset slide | `text-underline-offset 2px → 5px` with `text-decoration-color` transparent → currentColor. Cheap but repaints |
| 7 | Strike-through-then-under | Line translates from mid-text to the baseline |
| 8 | Arrow nudge | Trailing `→` translates 3–4 px on hover, 200 ms with a spring |

```css
/* Variant 2 — Editor's note: written out from the spec above; untested */
.link2 { position: relative; }
.link2::after { content: ''; position: absolute; left: 0; right: 0; bottom: -2px; height: 1px;
  background: currentColor; transform: scaleX(0); transform-origin: right;
  transition: transform 350ms var(--ease-out); }
@media (hover: hover) { .link2:hover::after { transform: scaleX(1); transform-origin: left; } }
.link2:focus-visible::after { transform: scaleX(1); transform-origin: left; }
```

---

## C. Text hover (8 variants)

**[Reference build]**

### C1. Text roll (duplicate line)
```html
<a class="roll"><span class="roll__inner" data-text="About">About</span></a>
```
```css
.roll { display:inline-block; overflow:hidden; line-height:1.2; height:1.2em; }
.roll__inner { display:block; position:relative; transition: translate 450ms var(--ease-out-expo); }
.roll__inner::after { content: attr(data-text); position:absolute; left:0; top:100%; }
@media (hover:hover) { .roll:hover .roll__inner { translate: 0 -100%; } }
```
**Per-character version**: split into `<span style="--i:n">` (GSAP SplitText with `aria` handling, or manually with `aria-label` on the parent and `aria-hidden` on the chars) and set `transition-delay: calc(var(--i)*18ms)`.

### C2. Text scramble / decode
On hover, cycle each character through random glyphs ~30–60 ms per tick, then resolve left to right; total ~400–600 ms. Fix the width (monospace or `font-variant-numeric: tabular-nums`, or a measured width) to prevent layout shift. Respect reduced motion. GSAP ScrambleText spec in [text-animations.md](text-animations.md#scrambletextplugin).

### C3. Weight shift (variable fonts)
`font-variation-settings 'wght' 400 → 700` over 300 ms. Reflow risk: use `font-optical-sizing` or a fixed-width container, or only single words.

### C4. Letter-spacing breathe
Subtle `letter-spacing: .02em` change; repaints and relayouts — isolated headings only.

### C5. Masked slide-up per word
Split with mask, `yPercent 100 → 0`, stagger 0.04.

### C6. Gradient sweep text
`background-clip:text` with animated `background-position` (shine-text spec in [text-animations.md](text-animations.md)).

### C7. Italic swap
Crossfade to an italic duplicate.

### C8. Marquee on hover
A list row starts a horizontal marquee of its text. Make it pausable and disable it under reduced motion (WCAG 2.2.2).

---

## D. Tilt and parallax cards (5 variants)

**[Reference build]**

```js
card.addEventListener('pointermove', (e) => {
  const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
  card.style.setProperty('--rx', `${-py * 10}deg`); card.style.setProperty('--ry', `${px * 12}deg`);
  card.style.setProperty('--mx', `${(px + .5) * 100}%`); card.style.setProperty('--my', `${(py + .5) * 100}%`);
});
card.addEventListener('pointerleave', () => { card.style.setProperty('--rx','0deg'); card.style.setProperty('--ry','0deg'); });
```
```css
.card { transform: perspective(900px) rotateX(var(--rx,0)) rotateY(var(--ry,0));
        transition: transform 500ms var(--ease-out); }   /* smooths and returns */
.card::after { /* glare */ background: radial-gradient(circle at var(--mx) var(--my), #fff4, transparent 50%); }
.card > .layer { transform: translateZ(40px); }  /* needs transform-style: preserve-3d on .card */
```

Variants:
1. Max angle 8–15°.
2. Glare layer (above).
3. Layered depth: `translateZ` 20–60 px.
4. Holographic foil: conic or linear gradient keyed to `--mx` with `mix-blend-mode: color-dodge`.
5. "Return spring" on leave.

Mobile: skip tilt, or use `DeviceOrientation` only with permission (iOS requires a permission prompt). Gate with `(hover:hover) and (pointer:fine)`. Disney "solid drawing": consistent perspective (`800–1200px`) and light source.

---

## E. Spotlight and glow borders (6 variants)

**[Snippet-only]** technique: register an angle with `@property` so a `conic-gradient` can rotate; draw it on pseudo-elements with a blurred duplicate for glow. `overflow:hidden` clips the glow — use a wrapper. Cursor spotlight: pointermove → CSS vars → `radial-gradient` — [DEV: animated gradient borders](https://dev.to/ericwoooo_kr/animated-gradient-borders-in-pure-css-no-javascript-no-hacks-121j); [Cruip animated gradient borders](https://cruip.com/animated-gradient-borders-with-tailwind-css/) (secondary; not fetched). Support figure "Firefox 128+, Safari 17+, about 96%" is from a secondary snippet only.

**[Reference build]**

```css
@property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
.glow { position: relative; border-radius: 16px; }
.glow::before { content:''; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
  background: conic-gradient(from var(--angle), transparent 70%, #7cf 85%, transparent);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  animation: spin 4s linear infinite; }
@keyframes spin { to { --angle: 360deg; } }
@media (prefers-reduced-motion: reduce) { .glow::before { animation: none; } }
/* Cursor spotlight (set --x/--y in pointermove on the grid container) */
.spot { background: radial-gradient(400px circle at var(--x) var(--y), rgb(255 255 255 / .08), transparent 40%); }
```

| # | Variant | Spec |
|---|---|---|
| 1 | Rotating conic "border beam" | Above, 4 s linear infinite |
| 2 | Cursor-proximity border | One `pointermove` on the grid sets `--x`/`--y` for every card; borders light up near the cursor ("Linear/Vercel card grid" look) |
| 3 | Inner spotlight fill | `.spot` radial gradient inside the card |
| 4 | Hover-only glow | `opacity 0 → 1`, 300 ms |
| 5 | Blurred duplicate for bloom | `filter: blur(16px)` on a copy behind the card; not inside `overflow:hidden` |
| 6 | Animated angle on hover only | Saves battery |

```js
// Variant 2 — Editor's note: wiring for the cited pattern; untested
grid.addEventListener('pointermove', (e) => {
  for (const card of grid.children) {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  }
});
```

Caveat: infinite `@property` animations repaint every frame (not compositor-only) — pause off-screen. Mobile: drop on `(hover:none)`.

---

## F. Button fill sweeps

**[Reference build]**

- **Direction-aware fill sweep** and **circle fill from cursor**: see [micro-interactions.md A5–A6](micro-interactions.md#a5-fill-sweep-from-the-cursor-side-direction-aware).
- **Border draw**: four pseudo-lines scaling sequentially at 100 ms each.
- **Text colour invert** with `mix-blend-mode: difference`.
- **Icon slide-through**: arrow exits right and a duplicate enters from the left inside an overflow mask (like text roll, horizontal).
- **Background-position gradient shift**.
- **Shine sweep**: [micro-interactions.md A10](micro-interactions.md#a10-shine-sweep-premium-cta).

---

## G. Cursor effects

Named, rebuildable tutorials by Olivier Larose (Next.js + Framer Motion/GSAP/Lenis) — [blog.olivierlarose.com](https://blog.olivierlarose.com/) **[Cited — titles only]**:

- Blend Mode Cursor
- Sticky (magnetic) Cursor
- **Mask Cursor Effect** (cursor reveals hidden text)
- Pixel Cursor Trailing
- Cartoon Cursor Trailing
- Mouse Image Distortion (R3F)
- Ripple Shader

Fluid cursor: PavelDoGreat's WebGL-Fluid-Simulation (MIT, ~16.8k stars, "works even on mobile"; GPU Navier–Stokes) — [GitHub](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation); [demo](https://paveldogreat.github.io/WebGL-Fluid-Simulation/). Details in [3d-webgl-shaders.md](3d-webgl-shaders.md#fluid-cursor).

All cursor effects: `(hover:hover) and (pointer:fine)` only; pause on `visibilitychange`.

---

## Performance notes

**[Synthesis]**

- `pointermove`-driven effects keep CPU/GPU busy; pause with `IntersectionObserver` and `visibilitychange`, drop on `(hover:none)`.
- Filters, `@property` gradients, `letter-spacing`, `text-underline-offset` repaint; transform/opacity stay on the compositor.
- WebGL hovers: lazy-init on first hover.

## Inspiration

- Codrops WebGL/hover tutorials — https://tympanus.net/codrops/ (fetch blocked)
- hover.dev (Tailwind/React animated components), codepen.io, Uiverse (403), awwwards.com — not verified this session.

## Gaps

- Codrops pages returned 403, so exact shader code/parameters aren't verified.
- The `@property` gradient-border support figures come only from a secondary snippet.

---

## Sources

- MDN, @media hover — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
- Codrops, WebGL Distortion Hover Effects (snippet) — https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/
- Codrops, motion hover effects (snippet) — https://tympanus.net/codrops/?p=44003
- clementroche/motion-hover-effects — https://github.com/clementroche/motion-hover-effects/blob/master/index2.html
- Codrops, From SplitText to MorphSVG (snippet) — https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/
- DEV, animated gradient borders (snippet) — https://dev.to/ericwoooo_kr/animated-gradient-borders-in-pure-css-no-javascript-no-hacks-121j
- Cruip, animated gradient borders (snippet) — https://cruip.com/animated-gradient-borders-with-tailwind-css/
- Olivier Larose — https://blog.olivierlarose.com/
- PavelDoGreat WebGL-Fluid-Simulation — https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
