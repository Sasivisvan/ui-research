# Backgrounds and Ambient Effects

Animated and textured backgrounds: Paper Shaders (30 presets including mesh gradients, grain, dithering, halftone, god rays, liquid metal), CSS aurora gradients, grain/noise overlays, dot and grid patterns with cursor spotlights, rotating gradient borders, and generative canvas work (flow fields, metaballs, dithering, halftone). Halftone and dithering are a live 2026 aesthetic; stock purple-blue mesh gradients and gradient blobs read as template / "AI slop". Markers: **[Cited]** fetched source; **[Sketch]** researcher-composed, untested; **[Synthesis]** inference; **Editor's note** connective guidance.

## Contents

- [1. Taste rules for backgrounds](#1-taste-rules-for-backgrounds)
- [2. Paper Shaders](#2-paper-shaders)
- [3. Mesh / grain gradient hero](#3-mesh--grain-gradient-hero)
- [4. Aurora](#4-aurora)
- [5. Grain / noise overlay](#5-grain--noise-overlay)
- [6. Dot / grid pattern with spotlight](#6-dot--grid-pattern-with-spotlight)
- [7. Gradient borders and glows](#7-gradient-borders-and-glows)
- [8. Dither and halftone](#8-dither-and-halftone)
- [9. Generative canvas](#9-generative-canvas)
- [10. Performance, mobile, reduced motion](#10-performance-mobile-reduced-motion)
- [11. Gaps](#11-gaps)
- [Sources](#sources)

---

## 1. Taste rules for backgrounds

- **[Cited — opinion]** Purple gradients and fade-on-scroll were singled out as homogenised vibe-coded trends — [recapio summary of YC review](https://recapio.com/digest/design-experts-review-vibe-coded-websites-by-y-combinator).
- **[Synthesis]** Bespoke assets: a shader tuned to the brand palette (Paper Shaders with brand colours), real photography, custom 3D. Avoid stock purple-blue mesh gradients. Generic gradient blobs and glassmorphism read as template.
- **[Synthesis]** Ambient motion is slow: shader `speed ≈ 0.1–0.2`.
- Auto-playing background motion > 5 s needs pause/stop/hide ([Vercel](https://vercel.com/design/guidelines); WCAG 2.2.2).

---

## 2. Paper Shaders

**[Cited]** — [GitHub paper-design/shaders](https://github.com/paper-design/shaders); [shaders.paper.design](https://shaders.paper.design/)

- Packages: `@paper-design/shaders` and `@paper-design/shaders-react`.
- Zero-dependency canvas shaders; **Apache-2.0**, commercially usable without attribution.
- Breaking changes ship under 0.0.x → **pin the version**.

30 presets:

| Group | Presets |
|---|---|
| Image filters | Paper texture, **Fluted glass**, Water, Image dithering, **Halftone dots**, Halftone CMYK, Lens distortion |
| Logo animations | Heatmap, **Liquid metal**, Gem smoke |
| Effects | **Mesh gradient**, Static mesh gradient, Static radial gradient, Dithering, **Grain gradient**, Dot orbit, **Dot grid**, Warp, Spiral, Swirl, Waves, Neuro noise, Perlin noise, Simplex noise, Voronoi, Pulsing border, Metaballs, Color panels, Smoke ring, **God rays** |

Example (cited):

```jsx
<MeshGradient colors={['#5100ff','#00ff80','#ffcc00','#ea00ff']} distortion={1} swirl={0.8} speed={0.2} />
```

```bash
# Editor's note: pin an exact version (breaking changes under 0.0.x)
npm i @paper-design/shaders-react@<exact-version> --save-exact
```

---

## 3. Mesh / grain gradient hero

**[Sketch]** Paper `MeshGradient` or `GrainGradient` hero at `speed ≈ 0.1–0.2`, with brand colours (not stock purple-blue). Reduced motion: `speed={0}` or a static preset (Static mesh gradient / Static radial gradient) — Editor's note.

---

## 4. Aurora

**[Sketch]** 3–4 blurred radial gradients (`filter: blur(80px)`) on transformed pseudo-elements, slowly translated with CSS keyframes. Animate **transform**, not `background-position`, for compositor-only work.

```css
/* Editor's note: written out from the sketch; untested */
.aurora { position: relative; overflow: clip; isolation: isolate; }
.aurora::before, .aurora::after {
  content: ''; position: absolute; inset: -20%; z-index: -1; filter: blur(80px);
  background: radial-gradient(40% 40% at 30% 30%, var(--c1), transparent 70%),
              radial-gradient(35% 35% at 70% 60%, var(--c2), transparent 70%);
}
.aurora::after { background: radial-gradient(30% 30% at 50% 80%, var(--c3), transparent 70%); }
@media (prefers-reduced-motion: no-preference) {
  .aurora::before { animation: drift 30s ease-in-out infinite alternate; }
  .aurora::after  { animation: drift 40s ease-in-out infinite alternate-reverse; }
}
@keyframes drift { to { transform: translate3d(8%, -6%, 0) rotate(8deg); } }
```

---

## 5. Grain / noise overlay

**[Sketch]** Fixed full-screen SVG `feTurbulence` noise PNG/SVG at `opacity: .06–.12` with `mix-blend-mode: overlay`. Step-jitter at 8–12 fps using `steps()` on translate.

```css
/* Editor's note: written out from the sketch; untested */
.grain { position: fixed; inset: -50%; pointer-events: none; z-index: 9999;
  background: url(/noise.png); opacity: .08; mix-blend-mode: overlay; }
@media (prefers-reduced-motion: no-preference) {
  .grain { animation: jitter 1s steps(10) infinite; } /* ~10fps */
}
@keyframes jitter {
  0% { transform: translate(0,0) } 20% { transform: translate(-5%,3%) } 40% { transform: translate(3%,-4%) }
  60% { transform: translate(-2%,5%) } 80% { transform: translate(4%,1%) } 100% { transform: translate(0,0) }
}
```

Paper Shaders alternatives: Grain gradient, Paper texture.

---

## 6. Dot / grid pattern with spotlight

**[Sketch]** `radial-gradient(circle, currentColor 1px, transparent 1px) 0 0/24px 24px`, with a radial `mask-image` vignette and a spotlight following the cursor via CSS vars.

```css
/* Editor's note: written out from the sketch; untested */
.dots { background: radial-gradient(circle, currentColor 1px, transparent 1px) 0 0 / 24px 24px;
        mask-image: radial-gradient(ellipse at center, #000 40%, transparent 75%); }
.dots-spot { background: radial-gradient(400px circle at var(--x) var(--y), rgb(255 255 255 / .08), transparent 40%); }
```

Spotlight wiring and the cursor-proximity card grid are in [hover-effects.md §E](hover-effects.md#e-spotlight-and-glow-borders-6-variants). Gate the cursor follow with `(hover:hover) and (pointer:fine)`. Paper alternative: Dot grid, Dot orbit.

---

## 7. Gradient borders and glows

The `@property --angle` conic-gradient "border beam", cursor-proximity borders, inner spotlight, hover-only glow, blurred bloom duplicate and hover-only angle animation are specified in [hover-effects.md §E](hover-effects.md#e-spotlight-and-glow-borders-6-variants). Infinite `@property` animations repaint every frame — pause offscreen. Paper alternative: Pulsing border.

---

## 8. Dither and halftone

- **[Cited]** Maxime Heckel's "Shades of Halftone" (10 Feb 2026) and "On Rendering the Sky, Sunsets, and Planets" (12 May 2026); halftone and dithering are a live aesthetic — [blog.maximeheckel.com](https://blog.maximeheckel.com/); [RSS](https://blog.maximeheckel.com/rss.xml).
- **[Cited]** Paper Shaders presets: Dithering, Image dithering, Halftone dots, Halftone CMYK.
- Shader math fundamentals: [The Book of Shaders](https://thebookofshaders.com/) (patterns, random, noise, cellular noise, fBm).

---

## 9. Generative canvas

**[Sketch]** Flow-field particles (Perlin noise), metaballs, dithering, halftone (Heckel 2026). Run in an OffscreenCanvas worker where possible, as Active Theory and DotLottieWorker do.

```js
// Editor's note: OffscreenCanvas hand-off pattern; untested
const off = document.querySelector('canvas.bg').transferControlToOffscreen();
const worker = new Worker('/bg-worker.js', { type: 'module' });
worker.postMessage({ canvas: off, dpr: Math.min(devicePixelRatio, 1.5) }, [off]);
document.addEventListener('visibilitychange', () => worker.postMessage({ paused: document.hidden }));
```

Paper presets cover Perlin/Simplex/Neuro noise, Voronoi, Metaballs, Warp, Swirl, Waves, Smoke ring. Fluid backgrounds/cursors: [3d-webgl-shaders.md](3d-webgl-shaders.md#fluid-cursor).

---

## 10. Performance, mobile, reduced motion

- **[Synthesis]** Pause infinite loops (conic borders, marquees, shimmer, shaders) with IntersectionObserver and `visibilitychange`; drop pointer-driven effects on `(hover:none)`.
- `filter: blur(80px)` on large layers and `backdrop-filter` areas are expensive; animate transform only.
- GPU tier 0–1 or `saveData` → static poster + CSS-only motion ([3d-webgl-shaders.md §8](3d-webgl-shaders.md#8-gpu-tiering-with-detect-gpu)).
- Reduced motion: stop autoplaying shaders or render a single frame; `animation-play-state: paused` under `prefers-reduced-motion: reduce`.
- Battery: infinite loops keep GPU/CPU busy on mobile.

## 11. Gaps

- No fetched sources for aurora, grain or dot-grid techniques — all researcher sketches.
- Paper Shaders current version not recorded in notes.

---

## Sources

- Paper Shaders — https://github.com/paper-design/shaders ; https://shaders.paper.design/
- Maxime Heckel — https://blog.maximeheckel.com/ ; https://blog.maximeheckel.com/rss.xml
- The Book of Shaders — https://thebookofshaders.com/
- Design Experts Review Vibe Coded Websites (summary) — https://recapio.com/digest/design-experts-review-vibe-coded-websites-by-y-combinator
- Vercel Web Interface Guidelines — https://vercel.com/design/guidelines
- Active Theory, Medium — https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4
- dotlottie-web (DotLottieWorker) — https://github.com/LottieFiles/dotlottie-web
