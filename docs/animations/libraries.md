# Animation Libraries

Reference table of every animation library, runtime and tool named in the research, with URL, size, licence, framework, best use and status as of Nov 2026. Default to **native CSS + WAAPI + View Transitions** for most micro-interactions and page transitions; add **Motion** for layout/exit/springs/gestures in component apps; add **GSAP** — now 100% free including every plugin since 3.13 — for complex timelines, SplitText, MorphSVG, Flip and ScrollTrigger-heavy creative sites. Values not present in the notes are marked "not in notes" rather than guessed. Markers: **[Cited]** fetched source; **[Snippet-only]** search snippet; **[Conflict]** sources disagree; **[Unverified]**; **[Vendor claim]**.

## Contents

- [1. Default stack decision](#1-default-stack-decision)
- [2. Motion engines](#2-motion-engines)
- [3. GSAP plugins](#3-gsap-plugins)
- [4. Page transitions and routing](#4-page-transitions-and-routing)
- [5. Scroll](#5-scroll)
- [6. Text](#6-text)
- [7. SVG and vector runtimes](#7-svg-and-vector-runtimes)
- [8. 3D, WebGL, shaders](#8-3d-webgl-shaders)
- [9. Tools and generators](#9-tools-and-generators)
- [10. Snippet and component sources](#10-snippet-and-component-sources)
- [11. Notes on bundle-size claims](#11-notes-on-bundle-size-claims)
- [Sources](#sources)

---

## 1. Default stack decision

**[Synthesis]**

| Need | First choice | Why / tradeoff |
|---|---|---|
| Hover, press, focus, toggles, popovers | Plain CSS transitions + `@starting-style` | 0 kb, compositor-friendly, interruptible |
| Spring feel without JS | CSS `linear()` tokens | Fixed duration; weaker on interrupt (Comeau) |
| Imperative one-shots (shake, burst, ripple) | WAAPI `el.animate()` | 0 kb, off-main-thread for transform/opacity, promise `finished` |
| SPA route transitions | Native VT (React `<ViewTransition>`, SvelteKit `onNavigate`, Vue Router + VT, Astro ClientRouter) | Shared-element morph for free |
| MPA route transitions | `@view-transition { navigation: auto }` | No JS; Firefox gets instant navigation |
| MPA with choreographed curtains, persistent WebGL | Barba or Swup (or Taxi/Highway) + GSAP | Keeps JS state alive across pages |
| React layout / shared-layout / exit | Motion (`layout`, `layoutId`, `AnimatePresence`) | ~5 kb (LazyMotion) to ~43 kb; JS FLIP |
| Lists add/remove/reorder | AutoAnimate | One line; little control |
| Complex timelines, text, SVG morph, scroll scenes | GSAP (+ SplitText, Flip, MorphSVG, DrawSVG, CustomEase, ScrollTrigger) | Free, powerful, larger payload; imperative |
| Lighter GSAP-like vanilla | Anime.js v4 (import only used modules) | Draggable and springs built in |
| Physics-first React | React Spring | Velocity-aware interruption |
| Vue | `<Transition>` / `<TransitionGroup>` + VT | Built-in FLIP move classes |
| Svelte | `svelte/transition`, `animate:flip` | Built-in, compiled |
| Smooth scroll | Lenis | Few KB, native-scroll wrapper |
| Designer vector animation | dotLottie / Rive | State machines |
| 3D | three.js (WebGPURenderer + TSL) / R3F | WebGL2 fallback |

**[Synthesis]** motion JS budget on content sites ≤ ~60–80 KB gzip (GSAP core + ScrollTrigger + SplitText + Lenis); lazy-load three.js.

---

## 2. Motion engines

| Library | URL | Size | Licence | Framework | Best for | Status (Nov 2026) |
|---|---|---|---|---|---|---|
| **CSS transitions / animations** | — | 0 kb | — | Any | Hover, press, toggles, entry via `@starting-style` | Baseline |
| **WAAPI** `el.animate()` | — | 0 kb | — | Any | One-shots, FLIP play, VT pseudo-element animation | Baseline |
| **GSAP** (core) | https://gsap.com | not in notes (not fetched) | 100% free incl. commercial use, all plugins, since 3.13 (Club GSAP ended; public npm, no tokens) | Vanilla, any | Timelines, scroll scenes, text, SVG | Active; Webflow acquired GSAP Oct 2024; free since April 2025; claims 12M+ sites ([MotionKit](https://motionkit.io/blog/web-animation-trends-2026), vendor/secondhand). 3.13 can tween to CSS vars |
| **Motion** (formerly Framer Motion) | https://motion.dev | **[Conflict]** LazyMotion + `m` ~5 kb vs full `motion` ~43 kb; `useAnimate` mini 3.3 kb / hybrid 23 kb (official docs snippets) vs third-party 4.6 kb / 2.3 kb / 34 kb ([xNet PR](https://github.com/crs48/xNet/pull/681)) — check bundlephobia | not in notes | React, Vue, vanilla | Layout, `layoutId`, `AnimatePresence`, springs, gestures; render clock (Codrops Atelier UI) | Active. Some animations run on rAF (main thread) and can lag under load ([Emil](https://emilkowal.ski/ui/great-animations)); docs not fetched |
| **Anime.js v4** | https://animejs.com | Total 24.50 KB; Timer 5.60; Animation +5.20; Timeline +0.55; Animatable +0.40; Draggable +6.41; Scroll +4.30; Scope +0.22; SVG 0.35; Stagger +0.48; Spring 0.52; WAAPI 3.50 | not in notes | Vanilla | Lighter GSAP-style; APIs `animate`, `createTimeline`, `stagger`, `createDraggable`, `createSpring`, `createScope`, `createMotionPath`, `createDrawable`, `morphTo`, `onScroll({sync:true})` | Active, modular — [docs](https://animejs.com/documentation/getting-started/imports) |
| **AutoAnimate** (FormKit) | https://auto-animate.formkit.com/ | not in notes | not in notes | React (`useAutoAnimate`), Vue (directive + Nuxt), Preact, Solid, Svelte, Angular, Marko | Zero-config list add/remove/move; respects reduced motion; custom `KeyframeEffect` plugin | Active |
| **React Spring** | not in notes | not fetched | not in notes | React | Physics springs, velocity-aware interruption | Size and current status not fetched |
| **Vue `<Transition>` / `<TransitionGroup>`** | built-in | 0 extra | — | Vue | Enter/leave, FLIP move classes | Built-in |
| **Svelte `svelte/transition`, `animate:flip`** | built-in | compiled | — | Svelte | `fade`, `fly`, `scale`, `blur`, `draw`, `crossfade` | Built-in |

---

## 3. GSAP plugins

All free since 3.13, "even for commercial use" — [GSAP 3.13](https://gsap.com/blog/3-13/). Byte sizes not fetched.

| Plugin | Use | Notes |
|---|---|---|
| **ScrollTrigger** | Pin, scrub, snap, `containerAnimation`, `normalizeScroll`, `matchMedia` | Options table in [scroll-animations.md §6](scroll-animations.md#6-gsap-scrolltrigger) |
| **SplitText** | chars/words/lines, `mask`, `autoSplit`, `aria`, `propIndex`, `smartWrap`, `deepSlice` | 3.13 rewrite "50% smaller, 14 new features"; standalone mode — [text-animations.md](text-animations.md) |
| **ScrambleText** | Scramble/decode | Old "requires Club GSAP" pages outdated |
| **MorphSVG** | Path morphing | Option details not fetched |
| **DrawSVG** | Stroke drawing (e.g. hover underline demo) | Option details not fetched |
| **Flip** | Layout FLIP (`Flip.getState` / `Flip.from`) | Option names not verified |
| **ScrollSmoother** | Smooth scroll, `data-speed` layers | — |
| **Inertia, Physics2D, MotionPath, CustomEase, TextPlugin** | Physics, paths, custom curves, typewriter | Named only |

---

## 4. Page transitions and routing

| Library | URL | Size | Framework | Best for | Status |
|---|---|---|---|---|---|
| **View Transitions API** | — | 0 kb | Any | Same/cross-document transitions | Same-doc Baseline; cross-doc Chromium 126 / Safari 18.2, Firefox conflicting |
| **React `<ViewTransition>`** | https://react.dev/reference/react/ViewTransition | in React | React 19.3 | Enter/exit/update/share | Stable in 19.3 (`unstable_ViewTransition` outdated) |
| **Next.js App Router VT** | https://nextjs.org/docs/app/guides/view-transitions | — | Next.js | `transitionTypes` on `<Link>` / `router.push` | No config needed (2026-10-15 docs) |
| **Astro `<ClientRouter />`** | https://docs.astro.build/en/guides/view-transitions/ | not in notes | Astro | `transition:name/animate/persist` | Auto reduced-motion; check native cross-doc VT first |
| **Barba.js v2** | https://barba.js.org | "7kb minified and compressed" | Vanilla MPA | Curtains, persistent canvas; Router, Prefetch, CSS, Head, Preset plugins | Active (markup/hooks unverified) |
| **Swup** | https://swup.js.org | not in notes | Server-rendered sites | Caching, preload, history, scroll; A11y, Preload, Head, Scripts plugins; Fade/Slide/Overlay themes | Active |
| **Taxi.js** | not in notes | — | Vanilla | Highway successor (Jake Whiteley / Unseen) | **[Unverified]** |
| **Highway** | not in notes | — | Vanilla | — | Widely considered unmaintained **[Unverified]** |

---

## 5. Scroll

| Library | URL | Size | Licence | Best for | Status |
|---|---|---|---|---|---|
| **CSS scroll-driven animations** | MDN | 0 kb | — | Progress, reveal, parallax, stacking, horizontal | Baseline newly available 27 Oct 2026 |
| **Lenis** | https://github.com/darkroomengineering/lenis | "a few KB", zero deps | not in notes | Smooth wheel scroll wrapping native scroll | v1.3.27 |
| **Locomotive Scroll v5** | https://scroll.locomotive.ca/docs/ | ~9.4 kB gzipped | not in notes | Lenis (1.3.17) + `data-scroll-speed` parallax; parallax off on touch | v5 |
| **GSAP ScrollTrigger / ScrollSmoother** | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | not fetched | free | Pin/scrub scrollytelling | Active |
| **Motion `useScroll`** | https://motion.dev/docs/react-use-scroll | — | — | React scroll progress | Docs timed out; API from prior knowledge |

---

## 6. Text

| Library | URL | Status / notes |
|---|---|---|
| **GSAP SplitText** | https://gsap.com/docs/v3/Plugins/SplitText/ | Free; 3.13 rewrite |
| **GSAP ScrambleText** | https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/ | Free |
| **Splitting.js** | not in notes | Used with variable-font loops; maintenance **not verified** |
| **SplitType** | not in notes | Maintenance **not verified** |

---

## 7. SVG and vector runtimes

| Library | URL | Size | Licence | Best for | Status |
|---|---|---|---|---|---|
| **Flubber** | https://github.com/veltman/flubber | not in notes | MIT (~7k stars) | Path interpolation (`interpolate`, `toCircle`, `separate`, `combine`) | Signs of age (Travis badge, 2017 copyright, v0.3.0 examples) |
| **@lottiefiles/dotlottie-web** | https://github.com/LottieFiles/dotlottie-web | not in notes | not in notes | Rust + WASM (ThorVG); Canvas2D/WebGL2/WebGPU (exp.); state machines; `DotLottieWorker` | Active; React/Vue/Svelte/Solid wrappers + Web Component |
| **lottie-web** | not in notes | — | — | Classic Lottie player | ~300K weekly npm downloads ([PkgPulse](https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026)) |
| **Rive** `@rive-app/webgl2` / `@rive-app/canvas-lite` / `@rive-app/canvas` | https://rive.app/docs/runtimes/web/web-js | `.riv` 10–15× smaller than Lottie **[Vendor claim]** | not in notes | State-machine interactive vector | @rive-app/canvas ~50K/week; always `cleanup()` |

---

## 8. 3D, WebGL, shaders

| Library | URL | Size | Licence | Best for | Status |
|---|---|---|---|---|---|
| **three.js** | https://threejs.org | not in notes | not in notes | 3D; `WebGPURenderer` + TSL with WebGL2 fallback | Focus on WebGPURenderer; WebGLRenderer maintained, no major features; "production-ready since r171" (vendor) |
| **React Three Fiber + drei** | https://r3f.docs.pmnd.rs | not in notes | not in notes | React 3D, `PerformanceMonitor`, `Detailed` LOD | Active |
| **OGL** | https://github.com/oframe/ogl | core ~8 kb, math ~6 kb, extras ~15 kb (≈29 kb) | Unlicense / public domain | Own-shader minimal WebGL | Active |
| **PixiJS v8** | https://pixijs.com/8.x/guides/components/renderers | not in notes | not in notes | 2D WebGL sprites/filters/displacement | WebGL recommended; WebGPU experimental; Canvas "coming soon" |
| **Theatre.js** | listings in sources | — | not in notes | Keyframe sequencing for 3D | 0.7; API may "drastically change"; no 2026 releases confirmed |
| **Spline** | not in notes | — | — | Designer 3D | No source on runtime performance |
| **@pmndrs/detect-gpu** | https://github.com/pmndrs/detect-gpu | not in notes | not in notes | GPU tiering 0–3 | Benchmarks stopped updating Dec 2025; ESM-only, renamed |
| **WebGL-Fluid-Simulation** (PavelDoGreat) | https://github.com/PavelDoGreat/WebGL-Fluid-Simulation | — | MIT (~16.8k stars) | Fluid cursor | "works even on mobile" |
| **Paper Shaders** `@paper-design/shaders(-react)` | https://github.com/paper-design/shaders | zero-dependency | Apache-2.0, no attribution needed | 30 shader presets (mesh gradient, grain, halftone…) | 0.0.x with breaking changes — pin version |
| **Hydra** (Active Theory) | — | — | Proprietary | — | In-house |

---

## 9. Tools and generators

| Tool | URL | Use |
|---|---|---|
| Linear() Easing Generator (Jake Archibald & Adam Argyle) | linear-easing-generator.netlify.app | Spring → `linear()`; derives duration from settling time (page not fetched) |
| Easing Wizard | easingwizard.com | Stiffness/damping/mass → `linear()` |
| easings.net | https://easings.net/ | Penner cubic-beziers |
| Chrome DevTools Performance / Rendering | — | Summary (Rendering), FPS meter (~99% frames), Paint Flashing |
| bundlephobia | — | Resolve Motion size conflict |

## 10. Snippet and component sources

Not verified this session unless noted: Osmo Supply (Webflow/GSAP snippets — masked text reveal, scramble; [cited](https://www.osmo.supply/resource/masked-text-reveal)), Uiverse (403), hover.dev (Tailwind/React animated components), CodePen, motion.dev/examples, gsap.com/showcase, rive.app/community, lottiefiles.com.

## 11. Notes on bundle-size claims

- Motion sizes **conflict** (official snippets ~5 / ~43 / 3.3 / 23 kb vs third-party 4.6 / 2.3 / 34 kb); unresolved.
- GSAP core, ScrollTrigger, SplitText byte sizes and React Spring size were **not fetched**.
- Three springs as `linear()` strings ≈ 1.3 kB gzipped ([Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)).

---

## Sources

- GSAP 3.13 blog — https://gsap.com/blog/3-13/
- GSAP ScrollTrigger / SplitText / ScrambleText docs — https://gsap.com/docs/v3/Plugins/ScrollTrigger/ ; https://gsap.com/docs/v3/Plugins/SplitText/ ; https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
- motion.dev reduce bundle size (snippet) — https://motion.dev/docs/react-reduce-bundle-size ; LazyMotion https://motion.dev/motion/lazy-motion/
- xNet PR (third-party sizes) — https://github.com/crs48/xNet/pull/681
- Anime.js imports — https://animejs.com/documentation/getting-started/imports
- AutoAnimate — https://auto-animate.formkit.com/
- Barba.js — https://barba.js.org/docs/getstarted/intro/
- Swup — https://swup.js.org/getting-started/
- Astro view transitions — https://docs.astro.build/en/guides/view-transitions/
- react.dev ViewTransition — https://react.dev/reference/react/ViewTransition
- Next.js view transitions — https://nextjs.org/docs/app/guides/view-transitions
- Lenis — https://github.com/darkroomengineering/lenis
- Locomotive Scroll — https://scroll.locomotive.ca/docs/
- Flubber — https://github.com/veltman/flubber
- dotlottie-web — https://github.com/LottieFiles/dotlottie-web
- Rive web runtime — https://rive.app/docs/runtimes/web/web-js ; Rive blog https://rive.app/blog/rive-as-a-lottie-alternative
- PkgPulse 2026 — https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026
- three.js WebGPURenderer — https://threejs.org/manual/en/webgpurenderer
- R3F — https://r3f.docs.pmnd.rs/advanced/scaling-performance
- OGL — https://github.com/oframe/ogl
- PixiJS renderers — https://pixijs.com/8.x/guides/components/renderers
- detect-gpu — https://github.com/pmndrs/detect-gpu
- WebGL-Fluid-Simulation — https://github.com/PavelDoGreat/WebGL-Fluid-Simulation
- Paper Shaders — https://github.com/paper-design/shaders
- Theatre.js listings — https://awesome.ecosyste.ms/projects/github.com%2FAndrewPrifer%2Freact-three-editable ; https://smithery.ai/skills/neversight/theatre-js
- Emil Kowalski — https://emilkowal.ski/ui/great-animations
- Josh Comeau linear() — https://www.joshwcomeau.com/animation/linear-timing-function/
- MotionKit — https://motionkit.io/blog/web-animation-trends-2026
- Osmo Supply — https://www.osmo.supply/resource/masked-text-reveal
