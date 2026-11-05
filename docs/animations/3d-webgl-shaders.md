# 3D, WebGL and Shaders

The 3D and GPU layer of web animation as of Nov 2026: library choice (three.js, React Three Fiber + drei, OGL, PixiJS v8, Spline, Theatre.js), WebGPU status and three.js `WebGPURenderer` + TSL migration, studio case studies (Lusion, Immersive Garden, Active Theory, Locomotive, Awwwards SOTY 2025), scroll-driven WebGL patterns (DOM-synced image planes with velocity, Blender camera paths, baked Houdini VAT playback), shader effects, fluid cursors, performance budgets, GPU tiering with detect-gpu, and learning resources. Markers: **[Cited]** fetched source; **[Snippet-only]** search excerpt (Codrops and TechSpot returned 403); **[Sketch]** researcher-composed, test before shipping; **[Vendor claim]**; **[Synthesis]** inference; **Editor's note** connective guidance.

## Contents

- [1. Library choice](#1-library-choice)
- [2. WebGPU status and TSL](#2-webgpu-status-and-tsl)
- [3. Studio case studies](#3-studio-case-studies)
- [4. Scroll-driven WebGL patterns](#scroll-driven-webgl-patterns)
- [5. Shader effects catalogue](#5-shader-effects-catalogue)
- [6. Fluid cursor](#fluid-cursor)
- [7. React Three Fiber performance](#7-react-three-fiber-performance)
- [8. GPU tiering with detect-gpu](#8-gpu-tiering-with-detect-gpu)
- [9. Performance budget](#9-performance-budget)
- [10. Mobile, reduced motion, fallbacks](#10-mobile-reduced-motion-fallbacks)
- [11. Learning path and resources](#11-learning-path-and-resources)
- [12. Inspiration](#12-inspiration)
- [13. Gaps](#13-gaps)
- [Sources](#sources)

---

## 1. Library choice

| Library | Facts | Best for | Source |
|---|---|---|---|
| **three.js** | Focus now `WebGPURenderer`; `WebGLRenderer` maintained, no major new features | General 3D; studio work (Lusion, Immersive Garden) | [Cited] [three.js manual](https://threejs.org/manual/en/webgpurenderer) |
| **React Three Fiber (+ drei)** | `frameloop="demand"`, `<Detailed>`, `<PerformanceMonitor>` | React 3D | [Cited] [R3F docs](https://r3f.docs.pmnd.rs/advanced/scaling-performance) |
| **OGL** | Minimal, zero-dependency WebGL; core ~8 kb, math ~6 kb, extras ~15 kb (≈29 kb total); three.js-like API; Unlicense / public domain | Devs writing their own shaders | [Cited] [OGL GitHub](https://github.com/oframe/ogl) |
| **PixiJS v8** | WebGL default and recommended; WebGPU "feature complete" but experimental (browser inconsistencies); `autoDetectRenderer({ preference: 'webgpu' \| 'webgl' })`; Canvas renderer "coming soon" | 2D WebGL: sprites, filters, displacement | [Cited] [PixiJS renderers](https://pixijs.com/8.x/guides/components/renderers) |
| **Theatre.js** | `@theatre/core` / `studio` / `r3f` at 0.7; old r3f README warned API "can and will drastically change"; no 2026 release activity confirmed | Keyframed 3D/camera sequencing | [Cited] [listing](https://awesome.ecosyste.ms/projects/github.com%2FAndrewPrifer%2Freact-three-editable); [skill listing](https://smithery.ai/skills/neversight/theatre-js) |
| **Spline** | No fetched source on runtime performance | Designer-authored 3D | Gap |
| **Hydra** (Active Theory) | Proprietary in-house framework | — | [Cited] [Medium](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4) |

**[Synthesis]** Lazy-load three.js only for the section that needs it.

---

## 2. WebGPU status and TSL

**[Cited]**

- Safari 26 (Sept 2025): WebGPU on macOS, iOS, iPadOS, visionOS. Firefox 141 on Windows (July 2025); Firefox 145 on macOS (Nov 2025). TechSpot reports official support across Chrome, Edge, Firefox and Safari, citing a Dec 2025 Chrome for Developers post — [TechSpot](https://www.techspot.com/news/110456-webgpu-now-brings-desktop-quality-graphics-all-major.html) **[Snippet-only]**.
- Sept 2026: Firefox ships WebGPU only on Windows and Apple-silicon Macs; Linux and Intel Macs lack it — [Cinevva](https://app.cinevva.com/guides/webgpu-vs-webgl-games).
- three.js `WebGPURenderer` — [three.js manual](https://threejs.org/manual/en/webgpurenderer):
  - Falls back to **WebGL 2** automatically.
  - Custom `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile` are **not supported** — port to node materials / **TSL**.
  - Init is async: `await renderer.init()` unless you use `setAnimationLoop`.
- TSL compiles to GLSL on the WebGL backend and WGSL on WebGPU — [Three.js Journey](https://threejs-journey.com/lessons/webgpu-tsl/introduction-to-webgpu-tsl).
- "Production-ready since r171" (Mar 2026) — **[Vendor claim]** [Utsubo](https://www.utsubo.com/blog/threejs-best-practices-100-tips); a Japanese migration guide (Jan 2026) also requires r171+ — [Utsubo JA](https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide).
- PixiJS: stay on WebGL for production. dotLottie WebGPU backend experimental.

```js
// Editor's note: init pattern from the manual's stated constraint; untested
import * as THREE from 'three/webgpu';
const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setAnimationLoop(render); // or: await renderer.init(); then render manually
```

**[Synthesis]** Build with `WebGPURenderer` + TSL to get the auto WebGL2 fallback. New shader work in three.js should be TSL; older GLSL tutorials (most Codrops pre-2025, Book of Shaders) teach transferable math but need porting. Outdated: "WebGPU is Chrome-only".

Support table: [browser-support.md](browser-support.md#webgpu).

---

## 3. Studio case studies

### Lusion (Awwwards SOTM)
**[Cited]** — [Awwwards case study](https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html)
- Homepage cloth **pre-calculated in Houdini**: a finger-like collider dragged in 4 directions, stored in one buffer, blended at runtime from user input.
- Character cloth baked in 3 directions; **4,096 vertices desktop vs 1,024 mobile**.
- All WebGL is three.js. Static site built by a custom Node generator.
- Particles are procedural in WebGL, not Houdini (forum reply; secondary) — [SideFX forum](https://www.sidefx.com/forum/post/286500/).
- Codrops recreated Lusion's **curly-noise tubes with light scattering** — [Codrops 2021](https://tympanus.net/codrops/2021/05/17/curly-tubes-from-the-lusion-website-with-three-js/).
- Real-time cloth/fluid is hard on low-end devices; they "cut down on bytes as much as they could" — [CommArts: Lusion](https://www.commarts.com/webpicks/lusion).
- Site: [lusion.app](https://lusion.app/).

### Immersive Garden
**[Cited]** — [CommArts](https://www.commarts.com/webpicks/immersive-garden). Stack: Vue/Nuxt, SASS, three.js, GSAP, **Lenis**, Strapi/Node, Vercel. "Spent more time removing ideas than creating new ones."

### Active Theory
**[Cited]** Hydra, a proprietary framework; moved "as much code off the main thread and into a WebWorker thread as possible" — [Medium](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4); [webgpu.com showcase](https://www.webgpu.com/showcase/active-theory-portfolio/).

### Awwwards SOTY 2025
**[Cited]** Listing badges show *Lando Norris* (OFF+BRAND.) and *Messenger* (abeto) with "Site Of The Year 2025" badges; the official winner page was not retrieved — [Awwwards listing](https://www.awwwards.com/websites/%23e2de00/?page=5); [abeto profile](https://www.awwwards.com/abeto/).

### Codrops Atelier UI (21 Oct 2026, Jérémie Nallet)
**[Snippet-only]** WebGL + DOM in a React UI library; Lenis for scroll; **Motion as the main clock for both Lenis and the canvas** — [Codrops](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/).

### Studio fingerprints
**[Synthesis]**
- Lusion: baked physics, high-end three.js, static site.
- Immersive Garden: Nuxt + three.js + GSAP + Lenis, ruthless editing.
- Active Theory: custom engine with worker-offloaded WebGL.
- Locomotive: its own Lenis-based scroll library with parallax disabled on touch.
- Resn and Locomotive studio sites were not examined directly.

---

<a id="scroll-driven-webgl-patterns"></a>
## 4. Scroll-driven WebGL patterns

### 4.1 WebGL image planes synced to DOM (Codrops gallery pattern)
**[Sketch]**
- Keep `<img>` in the DOM for layout and accessibility; hide it once its texture loads.
- Each frame, read `getBoundingClientRect()` — or better, cached offsets plus Lenis scroll — and position a plane mesh in an orthographic or pixel-matched perspective camera.
- Feed `uVelocity = lenis.velocity` into a vertex-shader bend `pos.y += sin(uv.x*PI) * uVelocity * k` and an RGB-shift fragment.
- Hover: a ripple on `uMouse` with GSAP-tweened `uHover`.

```glsl
// Editor's note: vertex bend from the sketch formula; untested
uniform float uVelocity; uniform float uK;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 pos = position;
  pos.y += sin(uv.x * 3.14159) * uVelocity * uK;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

Note: this is a GLSL `ShaderMaterial`; under `WebGPURenderer` port it to TSL.

Related tutorials **[Snippet-only]**: smooth horizontal parallax gallery DOM → WebGL, interpolated scroll value (David Faure, 19 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/); scroll-revealed WebGL gallery (GSAP + three.js + Astro + Barba, 2 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/); scroll-reactive 3D gallery with depth-layered images, palette "mood" backgrounds and scroll velocity — [Codu repost](https://www.codu.co/codrops/building-a-scroll-reactive-3d-gallery-with-threejs-velocity-and-mood-based-backgrounds-qMLwRqS).

### 4.2 Blender camera path → scroll (Codrops Jul 2026 pattern)
**[Sketch]** — Gaspard Hedde, 7 Jul 2026, three.js + GSAP — [Codrops](https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/) (snippet)
- Export the curve as glTF or a point list; build a `CatmullRomCurve3`.
- `camera.position = curve.getPointAt(p)`; `lookAt(curve.getPointAt(min(p+0.01,1)))`; `p` = scrub-smoothed ScrollTrigger progress.

```js
// Editor's note: assembled from the sketch; untested
const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
const state = { p: 0 };
gsap.to(state, { p: 1, ease: 'none', scrollTrigger: { trigger: '.journey', start: 'top top', end: '+=4000', scrub: 1, pin: true } });
function render() {
  camera.position.copy(curve.getPointAt(state.p));
  camera.lookAt(curve.getPointAt(Math.min(state.p + 0.01, 1)));
  renderer.render(scene, camera);
}
```

### 4.3 Baked simulation playback (Lusion / Houdini VAT)
**[Sketch]** — Codrops crumbled paper, Houdini VAT → three.js (19 Sep 2026) — [Codrops](https://tympanus.net/codrops/2026/09/19/crumbled-paper-houdini-vat-threejs/) (snippet)
- Bake vertex positions to textures in Houdini (VAT) or a buffer.
- Vertex shader samples the frame row: `texture(posTex, vec2(vertexId/count, frame/frames))`.
- Blend multiple baked directions from pointer velocity.
- Ship a lower vertex count to mobile (Lusion: 4096 vs 1024).

### 4.4 Cinematic 3D scroll
Rotating WebGL cylinder with reactive particles; scroll-controlled 3D showcase with moving camera and animated typography — [GitHub JosephASG/codrops-cinematic-scroll-animations](https://github.com/JosephASG/codrops-cinematic-scroll-animations).

### 4.5 Product rotation via frames
Image-sequence scrubbing as a non-WebGL alternative (147 frames for AirPods Pro) — [scroll-animations.md §9](scroll-animations.md#9-image-sequence-scrubbing-apple-style). Bramus's **3D shoe explorer** demo scrubs rotation with native SDA.

---

## 5. Shader effects catalogue

| Effect | Where | Source |
|---|---|---|
| Displacement-map image transition on hover | Hover | [Snippet-only] [Codrops 2018](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/) — "heavy on the memory" |
| Distortion + RGB displacement, image trails, stretch | Hover | [Snippet-only] [Codrops ?p=44003](https://tympanus.net/codrops/?p=44003); [clementroche repo](https://github.com/clementroche/motion-hover-effects/blob/master/index2.html) |
| Velocity bend + RGB shift on scroll | Gallery | [Sketch] §4.1 |
| Curly-noise tubes with light scattering | Hero | [Codrops 2021](https://tympanus.net/codrops/2021/05/17/curly-tubes-from-the-lusion-website-with-three-js/) |
| Mouse image distortion (R3F), ripple shader | Hover | Larose tutorials — [blog.olivierlarose.com](https://blog.olivierlarose.com/) |
| Noise/pixel dissolve page transition | Page transition | [Reference build] — [page-transitions.md 5.13](page-transitions.md#513-pixel--noise-dissolve) |
| Mesh gradient, grain, dithering, halftone, god rays, liquid metal… | Backgrounds | [Paper Shaders](https://shaders.paper.design/) — [backgrounds-effects.md](backgrounds-effects.md) |
| Refraction, dispersion, halftone, skies/sunsets/planets | Advanced | [Maxime Heckel](https://blog.maximeheckel.com/) |
| Liquid hover distortion, shader hero, rotating product | Trend ("sparing 3D") | [MotionKit](https://motionkit.io/blog/web-animation-trends-2026) (vendor) |

---

<a id="fluid-cursor"></a>
## 6. Fluid cursor

**[Cited]** PavelDoGreat's WebGL-Fluid-Simulation: MIT, ~16.8k stars, "works even on mobile". GPU Navier–Stokes based on NVIDIA GPU Gems' fast fluid dynamics chapter, with a dat.GUI panel — [GitHub](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation); [demo](https://paveldogreat.github.io/WebGL-Fluid-Simulation/).

---

## 7. React Three Fiber performance

**[Cited]** — [R3F Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)

- `frameloop="demand"` + `invalidate()`; hook controls via `addEventListener('change', invalidate)`.
- **Draw-call budget: ≤ ~1000, ideally a few hundred.**
- `instancedMesh`, shared geometry/material, `useLoader` (cached by URL).
- drei `<Detailed distances={[0,10,20]}>` for LOD.
- `<PerformanceMonitor onIncline / onDecline / onChange(factor) / flipflops / onFallback>` to adjust DPR.
- `performance.regress()` for movement regression.
- `startTransition` time-slicing: 510 TextGeometries all at once drop to ~5 fps; scheduled creation holds ~60 fps.

```jsx
// Editor's note: assembled from the cited APIs; untested
const [dpr, setDpr] = useState(1.5);
<Canvas frameloop="demand" dpr={dpr}>
  <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(Math.min(devicePixelRatio, 2))} />
  <Detailed distances={[0, 10, 20]}>
    <HighMesh /><MidMesh /><LowMesh />
  </Detailed>
</Canvas>
```

---

## 8. GPU tiering with detect-gpu

**[Cited]** — [detect-gpu GitHub](https://github.com/pmndrs/detect-gpu)

- `@pmndrs/detect-gpu` `getGPUTier()` → `{ tier 0–3, isMobile, type, fps, gpu }` from gfxbench data.
- Tiers: 0 = no WebGL, blocklisted or < 15 fps; 1 = ≥ 15; 2 = ≥ 30; 3 = ≥ 60.
- **Caveat: the benchmark source stopped updating Dec 2025**, so new GPUs get a conservative `FALLBACK`.
- Handle `BENCHMARK_FETCH_FAILED` (CSP/CDN).
- ESM-only and renamed.
- Tier 0 → fall back to a non-WebGL experience.

```js
// Editor's note: usage pattern from the cited return shape; untested
import { getGPUTier } from '@pmndrs/detect-gpu';
const { tier, isMobile } = await getGPUTier();
if (tier === 0 || navigator.connection?.saveData) showStaticPoster();
else initScene({ dpr: isMobile ? 1.5 : 2, quality: tier });
```

---

## 9. Performance budget

**[Synthesis]** — proposal; tune per project. Only R3F's "≤ 1000 draw calls" is cited; the Utsubo 100-tips page failed to load.

| Budget | Value |
|---|---|
| DPR cap | `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` desktop; ≤ 1.5 mobile; drop to 1 on `PerformanceMonitor.onDecline` |
| Draw calls | < 100–300 on mobile (R3F: ≤ ~1000 overall, ideally a few hundred) |
| Post-processing | 1–2 full-screen passes max on mobile |
| Textures | KTX2/Basis, ≤ 2048 px (≤ 1024 mobile) |
| Geometry | Draco / Meshopt |
| Render loop | Pause when offscreen (IntersectionObserver) or on `visibilitychange` |
| JS | Lazy-load three.js for the section that needs it |
| Low-end | GPU tier 0–1 or `saveData` → static poster + CSS-only motion |
| Mobile vertex count | Halve (Lusion 4096 → 1024) |
| Workers | Offload to WebWorker / OffscreenCanvas where possible (Active Theory, DotLottieWorker) |

## 10. Mobile, reduced motion, fallbacks

- iOS Safari 26 supports WebGPU; older iPhones that can't run iOS 26 need fallbacks.
- Safari caps rAF at 60 fps (30 fps in Low Power Mode) — [Lenis README](https://github.com/darkroomengineering/lenis).
- Reduced motion **[Synthesis]**: stop autoplaying shaders or render a single frame; replace scroll-scrubbed camera moves with static frames or opacity changes.
- Keep DOM `<img>`/text as the accessible layer behind WebGL planes.

## 11. Learning path and resources

**[Cited]** resources:
- **Three.js Journey (Bruno Simon)** WebGPU & TSL course: 21 lessons, ~23 h video, 13 projects; $45 standalone or $120 bundle with the main course; "Stable, kept up to date as Three.js releases land" — [threejs-journey.com/webgpu-tsl](https://threejs-journey.com/webgpu-tsl).
- **three.js manual: WebGPURenderer** — [threejs.org/manual](https://threejs.org/manual/en/webgpurenderer).
- **Maxime Heckel**: "The Study of Shaders with React Three Fiber", "Refraction, dispersion, and other shader light effects", "Shades of Halftone" (10 Feb 2026), "On Rendering the Sky, Sunsets, and Planets" (12 May 2026) — [blog.maximeheckel.com](https://blog.maximeheckel.com/); [RSS](https://blog.maximeheckel.com/rss.xml).
- **The Book of Shaders** (Patricio Gonzalez Vivo and Jen Lowe): complete chapters — shaping functions, colors, shapes, matrices, patterns, random, noise, cellular noise, fBm. Fractals, image processing, simulation (ripples, reaction-diffusion) and 3D (ray marching) are listed but **unlinked/unfinished** — [thebookofshaders.com](https://thebookofshaders.com/).
- **R3F performance guide** — [r3f.docs.pmnd.rs](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
- **Utsubo "100 Three.js tips" (2026)** — vendor; fetch failed — [utsubo.com](https://www.utsubo.com/blog/threejs-best-practices-100-tips).
- **Codrops WebGL hub** — [tympanus.net/codrops/tag/webgl](https://tympanus.net/codrops/tag/webgl/).
- **Olivier Larose**: Mouse Image Distortion (R3F), Ripple Shader — [blog.olivierlarose.com](https://blog.olivierlarose.com/).

**[Synthesis]** learning path:
1. MDN + Bramus demos for native SDA.
2. GSAP ScrollTrigger + SplitText docs.
3. Larose tutorials for the ~20 most common named effects.
4. Book of Shaders chapters 5–13 (shaping, noise, fBm).
5. Three.js Journey (core + WebGPU/TSL).
6. Codrops WebGL gallery tutorials for DOM↔WebGL sync.
7. Heckel for advanced light, refraction and halftone.

## 12. Inspiration

- Lusion — https://lusion.app/
- Awwwards Lusion case study — https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html
- Awwwards abeto profile — https://www.awwwards.com/abeto/
- Active Theory on webgpu.com — https://www.webgpu.com/showcase/active-theory-portfolio/
- Awwwards Hall of Fame (Annuals) — https://annuals.awwwards.com/hall-of-fame

## 13. Gaps

- No fetched source on Spline runtime performance.
- Exact Firefox WebGPU platform list (Linux, Intel Mac, Android) unconfirmed by Mozilla notes; Chrome-on-Android WebGPU not checked.
- The Chrome "WebGPU supported in all major browsers" post 404'd at the guessed path; cited via TechSpot only.
- Codrops 2026 tutorial code unverified (403).
- Official Awwwards SOTY 2025 winner page not retrieved.
- Frontend Masters, Shadertoy, Bruno Simon's main syllabus and 2025/2026 portfolio, GSAP showcase not fetched.
- Mobile numeric budgets beyond R3F's are researcher inferences.

---

## Sources

- three.js manual, WebGPURenderer — https://threejs.org/manual/en/webgpurenderer
- Three.js Journey, Introduction to WebGPU & TSL — https://threejs-journey.com/lessons/webgpu-tsl/introduction-to-webgpu-tsl ; course https://threejs-journey.com/webgpu-tsl
- Utsubo 100 Three.js tips — https://www.utsubo.com/blog/threejs-best-practices-100-tips ; JA guide https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide
- TechSpot, WebGPU in all major browsers (snippet) — https://www.techspot.com/news/110456-webgpu-now-brings-desktop-quality-graphics-all-major.html
- Cinevva, WebGPU vs WebGL — https://app.cinevva.com/guides/webgpu-vs-webgl-games
- PixiJS v8 renderers — https://pixijs.com/8.x/guides/components/renderers
- OGL — https://github.com/oframe/ogl
- Theatre.js listings — https://awesome.ecosyste.ms/projects/github.com%2FAndrewPrifer%2Freact-three-editable ; https://smithery.ai/skills/neversight/theatre-js
- R3F Scaling performance — https://r3f.docs.pmnd.rs/advanced/scaling-performance
- detect-gpu — https://github.com/pmndrs/detect-gpu
- Awwwards Lusion case study — https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html
- SideFX forum — https://www.sidefx.com/forum/post/286500/
- Codrops, curly tubes (2021) — https://tympanus.net/codrops/2021/05/17/curly-tubes-from-the-lusion-website-with-three-js/
- CommArts, Lusion — https://www.commarts.com/webpicks/lusion
- CommArts, Immersive Garden — https://www.commarts.com/webpicks/immersive-garden
- Active Theory, Medium — https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4
- webgpu.com showcase — https://www.webgpu.com/showcase/active-theory-portfolio/
- Awwwards listing — https://www.awwwards.com/websites/%23e2de00/?page=5
- Codrops 2026 tutorials (snippets) — URLs in §4
- PavelDoGreat WebGL-Fluid-Simulation — https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
- Maxime Heckel — https://blog.maximeheckel.com/
- The Book of Shaders — https://thebookofshaders.com/
- MotionKit — https://motionkit.io/blog/web-animation-trends-2026
- Lenis — https://github.com/darkroomengineering/lenis
