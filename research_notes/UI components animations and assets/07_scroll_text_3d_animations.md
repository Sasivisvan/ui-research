# Web Animation Part 2: Scroll, Text, Loading/Intro, SVG, 3D/WebGL/Canvas, and Background Effects (desktop + mobile web, as of Nov 2026)

> Research notes for the report writer. Every factual claim carries an inline source that was actually fetched or returned by search during this session. Code labelled "sketch" was written by the researcher from the cited docs. It is reconstruction, not quotation, and should be tested before shipping.
> Access limits: tympanus.net (Codrops) returned HTTP 403 to direct fetches, so Codrops findings come from search-result excerpts only. caniuse.com tables did not render through the fetcher. Several motion.dev pages reset the connection.

---

## Q1. What is the browser support for CSS scroll-driven animations, scroll-state container queries, and WebGPU as of late 2026?

### Takeaway
- **Scroll-driven animations** (`animation-timeline: scroll()/view()`, `animation-range`, `ScrollTimeline`/`ViewTimeline` JS) became Baseline "newly available" on **27 Oct 2026**, when Firefox 159 shipped them on by default. Chrome/Edge have had them since 115 and Safari since 26. Treat them as progressive enhancement for roughly another 12–30 months, because many users have not updated yet.
- **Scroll-state container queries** (`stuck`, `snapped`, `scrollable`) are **Chromium-only** (from Chrome 133). Firefox and Safari do not support them.
- **Scroll-*triggered* animations** (`timeline-trigger` / `animation-trigger`) are a separate feature, and Chromium-only (Chrome 145/146).
- **WebGPU** ships in Chrome/Edge, Safari 26 (macOS, iOS, iPadOS, visionOS) and Firefox (Windows from 141, Apple-silicon macOS from 145). Linux and Android coverage still varies. Libraries such as three.js `WebGPURenderer` fall back to WebGL2 automatically.

### Cited Findings

**CSS scroll-driven animations (SDA)**
- Support table: Chrome 115, Edge 115, Safari 26 (release notes: "Added support for Scroll-driven Animations"), Firefox 159 on **October 27, 2026**, enabled by default. Per web-features data, the feature became Baseline "newly available" the same day — [DEV: Scroll-driven animations are Baseline at last](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)
- Bramus's demo site has a demo charting the "Road to Baseline Newly Available", and it agrees that Firefox 159 completes cross-engine support — [scroll-driven-animations.style](https://scroll-driven-animations.style/demos/baseline-newly-available/css/)
- Earlier-2026 articles still described Firefox as flag-only (`layout.css.scroll-driven-animations.enabled`, e.g. as of Firefox 152). These are now outdated — [SitePoint, Scroll-Driven CSS in 2026](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/); [whoooop.co.uk](https://whoooop.co.uk/blog/css-scroll-driven-animations)
- Some secondary blogs list "Firefox 126+ / Safari 17.2+" as support thresholds. That claim is **wrong** and should not be used — [mintec.co](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/) (contradicted by the DEV/Bramus sources above)
- Safari 26.4 reportedly added *threaded* (off-main-thread) scroll-driven animations — [search summary of SitePoint/whoooop articles](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/) (single secondary source; unverified against WebKit release notes)
- **Gotchas** documented with the Baseline announcement — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g):
  - The `animation` shorthand resets `animation-timeline` to `auto`, so declare `animation-timeline` *after* the shorthand.
  - Firefox needs a non-zero `animation-duration`. Use `1ms` by convention.
  - `overflow: hidden` on an ancestor creates a scroll container and silently re-targets `scroll(nearest)`, which broke a progress bar in Chromium. `overflow: clip` fixed it.
  - The spec is still an Editor's Draft with open issues.
  - "Newly available" means the engines ship it, not that every user has updated, so keep a fallback.
- Feature detection: `@supports (animation-timeline: scroll())` in CSS, or `CSS.supports('animation-timeline: scroll()')` in JS with an IntersectionObserver or scroll-listener fallback — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)
- Syntax — [MDN Scroll-driven animation timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines):
  - `scroll(<scroller> <axis>)`: scroller is `nearest | root | self`; axis is `block | inline | y | x`.
  - `view(<axis> <inset>)`: `view()` equals `view(block auto)`. It has no scroller argument and always uses the nearest ancestor scroll container.
  - Named timelines use `scroll-timeline-name` / `view-timeline-name` with `<dashed-ident>`s.
  - In `view-timeline-inset`, positive values move the boundary inward and negative values move it outward.
  - The container must actually overflow, or no timeline exists.
- JS API: `new ScrollTimeline({ source, axis: 'block' })`; `timeline.currentTime` returns a CSSUnitValue in percent — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)

**Scroll-triggered animations (new, Chromium-only)**
- These are not the same as scroll-driven animations. A timeline *triggers* a time-based animation, which plays forwards or backwards once a range is crossed. It works like a declarative IntersectionObserver.
- Syntax: `timeline-trigger: --t view() entry 100% exit 0% / entry 0% exit 100%;` (name, source, activation range / active range) and `animation-trigger: --t play-forwards play-backwards;`.
- `trigger-scope: --t` keeps names local, because triggers are global and the last match wins.
- Chrome's post says they land in Chrome 145 and that an IntersectionObserver fallback is recommended — [Chrome for Developers: Scroll-triggered animations](https://developer.chrome.com/blog/scroll-triggered-animations)
- Secondary sources say it shipped in Chrome 146 (stable 10 Mar 2026) and that Firefox and Safari do not support it. Chrome 145 vs 146 is unresolved — [OpenReplay blog](https://blog.openreplay.com/css-scroll-animations-no-javascript/); [blink-dev Intent to Ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/TZLFLjzt4II)
- Safari 26.6 and Firefox 154 reportedly do not support `animation-trigger` — [SitePoint (via search summary)](https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/)

**Scroll-state container queries**
- They shipped in Chrome 133. Put `container-type: scroll-state` on the element that is stuck, snapped or scrollable, then style a *descendant* via `@container scroll-state(stuck: top)`. Values:
  - `stuck`: `top | bottom`
  - `snapped`: `x | y | inline | block`
  - `scrollable`: `top | right | bottom | left`
- They combine with `not`, `and` and `or`. Guard with `@supports (container-type: scroll-state)`. A container's pseudo-elements can query it. The feature is on the standards track in CSS Conditional 5 — [Chrome for Developers: CSS scroll-state queries](https://developer.chrome.com/blog/css-scroll-state-queries)
- caniuse lists Firefox (through 162, plus Android) and Safari/iOS Safari (through 27.3) as **not supported**. web-features ties Firefox to an open Mozilla bug — [caniuse wf-container-scroll-state-queries](https://caniuse.com/wf-container-scroll-state-queries); [web-features explorer](https://web-platform-dx.github.io/web-features-explorer/features/container-scroll-state-queries/)

**WebGPU**
- Safari 26 (Sept 2025) shipped WebGPU on macOS, iOS, iPadOS and visionOS. Firefox 141 shipped it on Windows (July 2025) and Firefox 145 on macOS (Nov 2025). TechSpot reports it is officially supported across Chrome, Edge, Firefox and Safari, citing a Dec 2025 Chrome for Developers post — [TechSpot](https://www.techspot.com/news/110456-webgpu-now-brings-desktop-quality-graphics-all-major.html) (search excerpt; direct fetch returned 403)
- A Sept 2026 guide says Firefox ships WebGPU only on Windows and Apple-silicon Macs, so Linux and Intel Macs lack it — [Cinevva WebGPU vs WebGL (2026)](https://app.cinevva.com/guides/webgpu-vs-webgl-games)
- three.js: the project's focus is now `WebGPURenderer`. `WebGLRenderer` is maintained but gets no major new features. WebGPURenderer falls back to WebGL 2 when WebGPU is unavailable. Custom `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile` materials are **not supported** there and must be ported to node materials/TSL. Init is async (`await renderer.init()` unless you use `setAnimationLoop`) — [three.js manual: WebGPURenderer](https://threejs.org/manual/en/webgpurenderer)
- TSL compiles to GLSL on the WebGL backend and to WGSL on the WebGPU backend — [Three.js Journey: Introduction to WebGPU & TSL](https://threejs-journey.com/lessons/webgpu-tsl/introduction-to-webgpu-tsl)
- Vendor opinion that WebGPU is "production-ready since r171" (Mar 2026) — [Utsubo 100 Three.js tips](https://www.utsubo.com/blog/threejs-best-practices-100-tips); a Japanese migration guide (Jan 2026) also requires r171+ — [Utsubo JA](https://www.utsubo.com/ja/blog/webgpu-threejs-migration-guide)
- PixiJS v8: WebGL is the default and recommended renderer. WebGPU is "feature complete" but experimental because of browser inconsistencies, so WebGL is recommended for production. Use `autoDetectRenderer({ preference: 'webgpu' | 'webgl' })`; the Canvas renderer is "coming soon" — [PixiJS v8 Renderers guide](https://pixijs.com/8.x/guides/components/renderers)
- dotLottie-web offers Canvas2D (software), WebGL2 and WebGPU (experimental) backends — [dotlottie-web GitHub](https://github.com/LottieFiles/dotlottie-web)

### Inferences
- **Support matrix for planning (Nov 2026):**

  | Feature | Chromium | Safari | Firefox | Strategy |
  |---|---|---|---|---|
  | `animation-timeline: scroll()/view()` | 115+ | 26+ | 159+ (27 Oct 2026) | Use natively, inside `@supports` and `prefers-reduced-motion: no-preference`. Make the static fallback the *final* state, never invisible content. |
  | `timeline-trigger` / `animation-trigger` | 145/146+ | No | No | Use IntersectionObserver (or GSAP `toggleActions`) for play-once reveals. CSS triggers are a bonus only. |
  | `container-type: scroll-state` | 133+ | No | No | Decorative only (sticky-header shadow, snapped-slide emphasis), with a JS or plain fallback. |
  | WebGPU | Yes (desktop; Android varies) | 26+ incl. iOS | Win + Apple-silicon mac | Build with three.js `WebGPURenderer` + TSL to get the auto WebGL2 fallback. PixiJS: stay on WebGL. |
- Because iOS Safari 26 supports both SDA and WebGPU, mobile-web creative work no longer needs to assume a Chromium-only feature set. Older iPhones that cannot run iOS 26 still need fallbacks.
- **Outdated advice to flag:**
  - "Scroll-driven animations are Chrome-only."
  - "WebGPU is Chrome-only."
  - "SplitText/ScrambleText/MorphSVG are paid Club plugins." (See Q2: all GSAP plugins have been free since 3.13 / April 2025.)

### Gaps
- Could not render caniuse tables for SDA, so global-usage percentages are unknown.
- Could not verify Safari 26.4 "threaded SDA" against WebKit release notes.
- Chrome 145 vs 146 for scroll-triggered animations is unresolved.
- Exact Firefox WebGPU platform list (Linux, Intel Mac, Android) as of Nov 2026 is unconfirmed by Mozilla release notes. Chrome-on-Android WebGPU coverage was not checked.
- The Chrome "WebGPU supported in all major browsers" post URL 404'd at the guessed path, so it is cited only via TechSpot.

---

## Q2. What scroll and text effects recur on Awwwards SOTD/SOTY, GSAP showcase, Codrops demos, and studio sites (Lusion, Active Theory, Locomotive, Immersive Garden, Resn), and how are they built? (Full technique catalogue)

### Takeaway
The recurring "crafted" vocabulary in 2026 is:
- Lenis smooth scroll + GSAP ScrollTrigger (pin/scrub) as the backbone
- Masked line-by-line SplitText reveals for headings
- Pinned scrollytelling and horizontal sections
- Stacking cards
- Zoom/mask section transitions
- WebGL image planes synced to DOM positions, with shader distortion driven by scroll velocity
- Baked simulations (Houdini cloth/fluid/VAT) played back in three.js
- Camera paths authored in Blender and scrubbed by scroll
- Shader backgrounds: mesh gradients, grain, dithering, halftone

Native CSS SDA now covers the lightweight end: progress bars, reveal-on-view, parallax, stacking cards and horizontal sections.

### Cited Findings

#### A. Tooling backbone (current versions and facts)
- **GSAP is 100% free including all former bonus plugins.** Since 3.13 that covers SplitText, MorphSVG, DrawSVG, ScrambleText, ScrollSmoother, Inertia, Physics2D and the rest, "even for commercial use". Club GSAP ended; install everything from public npm — [GSAP 3.13 blog](https://gsap.com/blog/3-13/)
- 3.13 also allows tweening to CSS variables: `gsap.to(".t", { color: "var(--c)" })` — [GSAP 3.13 blog](https://gsap.com/blog/3-13/)
- Webflow acquired GSAP (Oct 2024). GSAP is free since April 2025 and claims 12M+ sites — [MotionKit trends 2026](https://motionkit.io/blog/web-animation-trends-2026) (vendor blog; secondhand stats)
- Webflow "Interactions with GSAP" uses SplitText as the foundation for text animation — [Webflow blog: SplitText rewrite](https://webflow.com/blog/gsap-splittext-rewrite)
- **ScrollTrigger config essentials** — [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/):

  | Option | What it does |
  |---|---|
  | `trigger` | Element whose position defines the range |
  | `start` / `end` | Default start is `"top bottom"` (`"top top"` when pinned), default end is `"bottom top"`. Also accepts `"+=500"` and `"max"`. |
  | `scrub` | `true` ties progress to scroll; a number gives smoothing seconds |
  | `pin`, `pinSpacing` | Pin the element; `pinSpacing` can be `false` or `"margin"` |
  | `anticipatePin` | Prevents an unpinned flash on fast scroll |
  | `snap` | Number, array, function, `"labels"` or `"labelsDirectional"` |
  | `toggleActions` | Default `"play none none none"` |
  | `containerAnimation` | For horizontal sections; the container tween **must** use `ease: "none"`; no pin/snap on those child triggers |
  | `invalidateOnRefresh` | Recompute values on refresh |
  | `fastScrollEnd` | Default threshold 2500px/s |
  | `preventOverlaps` | Force earlier animations to their end state |
  | `ScrollTrigger.normalizeScroll(true)` | Moves scrolling to the JS thread; prevents the mobile address bar show/hide on most devices |
  | `ScrollTrigger.isTouch` | 0, 1 or 2 |
  | `gsap.matchMedia()` | Breakpoint-specific setups (`ScrollTrigger.matchMedia` is deprecated) |

  Resize recalculation waits for a 200ms gap in resize events. Transforms or `will-change: transform` on ancestors break `position: fixed` pinning; `pinReparent: true` can help.
- **Lenis** v1.3.27 is a few KB with zero dependencies — [Lenis GitHub](https://github.com/darkroomengineering/lenis):
  - Options: `lerp` (0.1 by default; overrides duration), `duration` (1.2), `smoothWheel` (true), `syncTouch` (false; with `syncTouchLerp` 0.075 and `touchInertiaExponent` 1.7), `autoRaf`, `anchors`, `prevent(node)`, `allowNestedScroll` (checks the DOM every scroll and can be slow).
  - Opt-out attributes: `data-lenis-prevent`, `-wheel`, `-touch`, `-vertical`, `-horizontal`.
  - It wraps native scroll, so `position: sticky` keeps working.
  - Limitations: `syncTouch` is odd on iOS <16; fixed elements can lag on pre-M1 Safari; Safari caps at 60fps (30fps in Low Power Mode); smoothing stops over iframes; CSS scroll-snap is unsupported (use `lenis/snap`).
- **Locomotive Scroll v5** is built on Lenis (1.3.17) and is about 9.4 kB gzipped. Parallax uses `data-scroll-speed`. **Parallax turns off automatically on touch devices**, which keep native scroll — [Locomotive Scroll docs](https://scroll.locomotive.ca/docs/)
- Immersive Garden's own studio-site stack: Vue/Nuxt, SASS, three.js, GSAP, **Lenis**, Strapi/Node, Vercel. The team "spent more time removing ideas than creating new ones" — [CommArts Webpick: Immersive Garden](https://www.commarts.com/webpicks/immersive-garden)
- Codrops' *Atelier UI* (21 Oct 2026, Jérémie Nallet) mixes WebGL and DOM in a React UI library. It uses Lenis for scroll and **Motion as the main clock for both Lenis and the canvas** — [Codrops](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/) (search excerpt)
- Active Theory runs on Hydra, its proprietary in-house framework, and moved "as much code off the main thread and into a WebWorker thread as possible" — [Active Theory on Medium](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4); [webgpu.com showcase](https://www.webgpu.com/showcase/active-theory-portfolio/)

#### B. Scroll animation catalogue (named variants)
- **Bramus's canonical native-CSS demo set** (each has CSS and WAAPI versions) — [scroll-driven-animations.style](https://scroll-driven-animations.style/):
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
- **Stacking cards (CSS)**: cards are `position: sticky`. A `view-timeline-name: --cards-element-scrolls-in-body` sits on the deck. Each card's inner element animates with `animation-range: exit-crossing var(--start-range) exit-crossing var(--end-range)` (a scale-down per card index). Sticky goes on the outer card and the animation on the inner element so scroll height is unaffected — [stacking-cards demo](https://scroll-driven-animations.style/demos/stacking-cards/css/)
- **Horizontal section (CSS)**: a tall wrapper (`height: 500vh`) holds a sticky 100vh viewport. The strip translates X on a view timeline with `animation-range: contain 0% contain 100%` — [horizontal-section demo](https://scroll-driven-animations.style/demos/horizontal-section/css/)
- **Olivier Larose's tutorial catalogue** (Next.js + Framer Motion/GSAP/Lenis; each a rebuildable named effect) — [blog.olivierlarose.com](https://blog.olivierlarose.com/):
  - Background Image Parallax
  - Parallax Scroll
  - Smooth Parallax Scroll
  - **Zoom Parallax**
  - **Cards Parallax** (stacking)
  - Text Parallax
  - Horizontal Scroll / Horizontal Section
  - Smooth Scroll
  - **Sticky Footer** (reveal-under footer)
  - **Perspective Section Transition**
  - **Mask Section Transition**
  - **SVG Path On Scroll**
  - **SVG Mask Scroll**
  - 3D Perspective Scroll
  - **3D Wave on Scroll**
  - **Infinite Text Move On Scroll** (velocity marquee)
  - Mouse Image Distortion (R3F)
  - Ripple Shader
  - Blend Mode Cursor
  - Sticky (magnetic) Cursor
  - **Mask Cursor Effect** (cursor-reveals-hidden-text)
  - Pixel Cursor Trailing
  - Cartoon Cursor Trailing
- **Codrops 2026 scroll/WebGL tutorials** (search excerpts):
  - **Scroll-revealed WebGL gallery** (GSAP + three.js + Astro + Barba.js, scroll-triggered shader reveals across page transitions, 2 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/)
  - **Smooth horizontal parallax gallery, DOM → WebGL**, driven by an interpolated scroll value (David Faure, 19 Feb 2026) — [Codrops](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/)
  - **Scroll-driven 3D gallery along a Blender camera path** (three.js + GSAP; Gaspard Hedde, 7 Jul 2026) — [Codrops](https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/)
  - **Scroll-reactive 3D gallery** with depth-layered images, palette-driven "mood" backgrounds and **scroll-velocity** motion — [Codu repost of Codrops](https://www.codu.co/codrops/building-a-scroll-reactive-3d-gallery-with-threejs-velocity-and-mood-based-backgrounds-qMLwRqS)
  - **Crumbled paper: Houdini VAT → three.js** (baked simulation playback, 19 Sep 2026) — [Codrops](https://tympanus.net/codrops/2026/09/19/crumbled-paper-houdini-vat-threejs/)
  - Cinematic 3D scroll (a rotating WebGL cylinder with reactive particles; a scroll-controlled 3D showcase with moving camera and animated typography) — [GitHub JosephASG/codrops-cinematic-scroll-animations](https://github.com/JosephASG/codrops-cinematic-scroll-animations)
- **Apple-style image-sequence scrubbing**:
  - Mechanism: preload every frame as an `Image`, map scroll progress to a frame index, and `drawImage` to a canvas — [CSS-Tricks](https://css-tricks.com/?p=308477); [DEV flipbooks article](https://dev.to/sagarparmarr/genx-from-childhood-flipbooks-to-premium-scroll-animation-1j4)
  - An AirPods Pro recreation uses **147 JPEG frames** — [GitHub Rachit-Pal](https://github.com/Rachit-Pal/Apple-Scroll-Animation/blob/master/app.js)
  - Budget warning: 200 frames at 2000px wide is roughly **400MB+ uncompressed** in memory; recommended **~100–300 frames** — [tech-blog tutorial](https://tech-blog-final-rho.vercel.app/articles/apple-scroll-zoom-effects-tutorial)
  - Use **WebP at about q85** with a preload progress indicator — [mejba.me](https://www.mejba.me/blog/3d-scroll-animations-ai-claude-code)
  - Alternative: pack frames into **one spritesheet** (one request, `<link rel="preload">`) and step through it with CSS SDA — [geyer.dev via HN reader](https://hn.jakechampion.name/reader/https://geyer.dev/blog/css-image-sequence-animations)
- **Motion (Framer Motion) `useScroll`**: the docs pages timed out during this session (see Gaps). Codrops' Atelier UI confirms Motion is used as the render clock in production WebGL/DOM work — [Codrops](https://tympanus.net/codrops/2026/10/21/atelier-ui-webgl-dom/)
- **Scroll-state queries in UI**: sticky-nav shadow via `scroll-state(stuck: top)`; carousel de-emphasis via `not scroll-state(snapped: x)` → `opacity: .25`; back-to-top hidden via `not scroll-state(scrollable: top)` — [Chrome for Developers](https://developer.chrome.com/blog/css-scroll-state-queries)
- **2026 trend list** (vendor opinion) — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026):
  - Rising: pinned scrollytelling (`pin` + `scrub`), kinetic/variable typography, native scroll-driven CSS, INP-aware motion (transform/opacity only, lazy-loaded animation code), bento-grid staggered reveals (`stagger: 0.08`), sparing 3D (rotating product, liquid hover distortion, shader hero), cursor micro-interactions (magnetic buttons), ScrollSmoother `data-speed` layers, DrawSVG/MotionPath, `matchMedia` reduced-motion.
  - Fading: autoplay entrance animation on every element, laggy scroll-hijack smoothing, decorative preloader spinners, heavy hero video as default, INP-hurting stutter.

#### C. Text animation catalogue
- **GSAP SplitText (free; 3.13 rewrite, "50% smaller, 14 new features")** — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/); [GSAP 3.13](https://gsap.com/blog/3-13/):
  - `type`: chars, words, lines.
  - `mask`: one of lines, words or chars. Adds an `overflow: clip` wrapper for reveal-from-below.
  - `autoSplit`: re-splits on font load or width change. Create animations inside `onSplit()` and *return* them so SplitText can revert and time-sync.
  - `linesClass`/`wordsClass`/`charsClass`: `"++"` appends numbered classes.
  - `aria`: `"auto"` puts `aria-label` on the parent and `aria-hidden` on the fragments. Links and nested elements are not preserved, so use `aria:"none"` plus a screen-reader-only duplicate.
  - `deepSlice` (on by default): handles inline elements spanning lines.
  - `propIndex`: adds CSS vars like `--word: 3`.
  - `smartWrap`: avoids mid-word breaks when splitting chars only.
  - `ignore` (e.g. `<sup>`), `prepareText()` (languages without spaces), `wordDelimiter` (RegExp), `onRevert`.
  - Standalone mode works without GSAP core.
  - Call `revert()` after the animation to cut DOM nodes.
  - Breaking changes: `position:"absolute"`, `lineThreshold` and function-based `specialChars` were removed.
- Canonical masked-lines reveal (verbatim pattern from the docs) — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/):
  ```js
  document.fonts.ready.then(() => {
    gsap.set(".split", { opacity: 1 });
    SplitText.create(".split", {
      type: "words,lines", linesClass: "line", autoSplit: true, mask: "lines",
      onSplit: (self) => gsap.from(self.lines, {
        duration: 0.6, yPercent: 100, opacity: 0, stagger: 0.1, ease: "expo.out" })
    });
  });
  ```
- Webflow tutorial pattern: a `data-split="heading"` attribute plus `SplitText.create` with `type:"lines"`, `autoSplit:true` and `mask:"lines"` — [Osmo masked text reveal](https://www.osmo.supply/resource/masked-text-reveal)
- **ScrambleTextPlugin** (scramble/decode) — [GSAP ScrambleText docs](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/):
  - `text` (`"{original}"` re-reveals the original), `chars` (`"upperCase"`, `"lowerCase"`, `"upperAndLowerCase"` or a custom string)
  - `tweenLength` (true), `revealDelay` (0), `speed` (1), `delimiter` (`" "` for word-by-word), `rightToLeft`, `newClass`/`oldClass`
  - Community patterns: binary "matrix" `chars:"01"`, katakana, hover-to-scramble, looping "Loading..." with `chars:"."` — [freefrontend](https://freefrontend.com/scramble-text-plugin-js/); [Osmo scramble on load/scroll/hover](https://osmo.supply/resource/text-scramble-load-scroll-hover)
  - Older pages say it "requires Club GSAP". That is **outdated**: all plugins are free since 3.13 — [GSAP 3.13](https://gsap.com/blog/3-13/)
- **Variable-font animation**:
  - Transition `font-variation-settings` on `:hover` for weight swells. Drive `wght` over page scroll with `animation-timeline: scroll(root)`. Many per-character spans can be CPU-heavy on mobile — [camoa dev-guides: Variable font animation](https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/)
  - Loop `wght` + `wdth` keyframes per character with Splitting.js. Custom axes use uppercase 4-letter tags — [Frontend Focus link: Variable Font Animation with CSS and Splitting JS](https://frontendfoc.us/link/68653/web)
  - Which axes are animatable depends on the font — [Val Head](https://valhead.com/2020/11/15/animating-variable-fonts-with-css/)
- **Olivier Larose text set** — [blog.olivierlarose.com](https://blog.olivierlarose.com/):
  - Text Along Path
  - **Text Gradient Opacity On Scroll** (words light up as you read)
  - Text Clip Mask On Scroll
  - Text Mask Animation
  - Text Gooey
  - **Text Disperse**
  - 3D Parallax Letters
  - 3D Perspective Text
  - Infinite Text Move On Scroll
- MotionKit names "kinetic and variable typography" (SplitText + `font-variation-settings`) as a top 2026 trend — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026)

#### D. SVG animation
- **Line drawing**: set `pathLength="1"` on the stroked path (`fill: none`), then `stroke-dasharray: 1` and animate `stroke-dashoffset` 1 → 0. No `getTotalLength()` measurement is needed — [Stefan Judis: pathLength](https://www.stefanjudis.com/blog/pathlength-makes-makes-svg-path-animations-easier-to-manage); [CSS-Tricks](https://css-tricks.com/?p=301196)
  - Without `pathLength`, use the measured length (e.g. 8085) — [CSS-Tricks](https://css-tricks.com/?p=254582)
  - Scroll-drawn paths classically set the dash from scroll % in JS — [GeeksforGeeks](https://geeksforgeeks.org/how-to-draw-on-scroll-using-javascript-and-svg)
  - CSS-only pairs `view()` with stroke-dashoffset — [ceslava CSS SVG course](https://cursos.ceslava.com/en/curso/css/leccion/css-svg-pro)
- **Morphing**:
  - GSAP MorphSVG is now free — [GSAP 3.13](https://gsap.com/blog/3-13/)
  - **Flubber** (MIT, ~7k stars): `interpolate(from, to)`, `toCircle`/`toRect`/`fromCircle`, `separate` (one → many), `combine`, `interpolateAll`. It returns a `t ∈ [0,1]` → path-string interpolator and works with d3 `attrTween("d")` or rAF. `maxSegmentLength` defaults to 10 (lower is smoother but slower). It shows **signs of age** (Travis badge, 2017 copyright, v0.3.0 examples) — [flubber GitHub](https://github.com/veltman/flubber)
- **Rive (interactive vector + state machines)**:
  - `@rive-app/webgl2` is recommended. It uses the Rive Renderer, the same one as the editor, with vector feathering. `@rive-app/canvas-lite` is for files without Text, Layouts, Scripting or Audio.
  - Setup: `new rive.Rive({ src, canvas, autoplay, stateMachine, autoBind: true, onLoad })`. Call `resizeDrawingSurfaceToCanvas()` in `onLoad` and on resize for crisp DPR.
  - Reuse parsed files via `rivFile` or `buffer`. **Always `cleanup()`** to free C++/WASM objects — [Rive Web (JS) runtime docs](https://rive.app/docs/runtimes/web/web-js)
  - Rive claims its `.riv` files are typically 10–15× smaller than equivalent Lottie (vendor claim) — [Rive blog](https://rive.app/blog/rive-as-a-lottie-alternative)
- **Lottie / dotLottie**:
  - `@lottiefiles/dotlottie-web` uses a Rust + WASM engine (dotlottie-rs, ThorVG), with Canvas2D, WebGL2 or WebGPU backends. Wrappers exist for React, Vue, Svelte and Solid, plus a Web Component.
  - dotLottie v2 files embed **state machines** (pointer, custom events, inputs; no JS glue), with events such as `stateMachineTransition`.
  - `DotLottieWorker` renders on an OffscreenCanvas in a Web Worker. Freeze-on-offscreen and frame interpolation are supported. Use the WebGL2/WebGPU builds for many or large animations — [dotlottie-web GitHub](https://github.com/LottieFiles/dotlottie-web)
  - LottieFiles claims dotLottie state machines are now close to Rive's (vendor, Mar 2026) — [LottieFiles blog](https://lottiefiles.com/blog/lottie-animations/lottiefiles-or-rive.md)
  - Rough npm adoption: lottie-web ~300K/week vs @rive-app/canvas ~50K/week — [PkgPulse 2026](https://www.pkgpulse.com/guides/lottie-vs-rive-vs-css-animations-web-animation-formats-2026)

#### E. 3D / WebGL / canvas
- **Lusion** (Awwwards SOTM case study):
  - Homepage cloth was **pre-calculated in Houdini**: a finger-like collider was dragged in 4 directions, stored in one buffer, and blended at runtime from user input.
  - Character cloth was baked in 3 directions, at 4,096 vertices on desktop vs 1,024 on mobile.
  - All WebGL is three.js. The site is static, built by a custom Node generator — [Awwwards case study: Lusion](https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html)
  - Particles are procedural in WebGL, not from Houdini (forum reply; secondary) — [SideFX forum](https://www.sidefx.com/forum/post/286500/)
  - Codrops recreated Lusion's **curly-noise tubes with light scattering** — [Codrops 2021](https://tympanus.net/codrops/2021/05/17/curly-tubes-from-the-lusion-website-with-three-js/)
  - Lusion's own write-up says real-time cloth/fluid is hard on low-end devices and that they "cut down on bytes as much as they could" — [CommArts: Lusion](https://www.commarts.com/webpicks/lusion)
- **Awwwards SOTY 2025**: listing badges show *Lando Norris* (OFF+BRAND.) and *Messenger* (abeto) with "Site Of The Year 2025" badges. The official winner page was not retrieved — [Awwwards listing](https://www.awwwards.com/websites/%23e2de00/?page=5); [abeto profile](https://www.awwwards.com/abeto/)
- **React Three Fiber performance** — [R3F Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance):
  - `frameloop="demand"` + `invalidate()`; hook controls via `addEventListener('change', invalidate)`.
  - **Draw-call budget: ≤ ~1000, ideally a few hundred**.
  - Use `instancedMesh`, shared geometry/material, and `useLoader` (cached by URL).
  - drei `<Detailed distances={[0,10,20]}>` for LOD.
  - `<PerformanceMonitor onIncline/onDecline/onChange(factor)/flipflops/onFallback>` to adjust DPR.
  - `performance.regress()` for movement regression.
  - `startTransition` time-slicing: 510 TextGeometries all at once drop to ~5fps, while scheduled creation holds ~60fps.
- **GPU tiering**: `@pmndrs/detect-gpu` `getGPUTier()` returns `{tier 0–3, isMobile, type, fps, gpu}` from gfxbench data. Tiers: 0 (no WebGL, blocklisted or <15fps), 1 (≥15), 2 (≥30), 3 (≥60).
  - **Caveat: the benchmark source stopped updating Dec 2025**, so new GPUs get a conservative `FALLBACK`.
  - Handle `BENCHMARK_FETCH_FAILED` (CSP/CDN).
  - The package is ESM-only and was renamed — [detect-gpu GitHub](https://github.com/pmndrs/detect-gpu)
- **OGL**: minimal zero-dependency WebGL (core ~8kb, math ~6kb, extras ~15kb, ≈29kb total). It suits developers writing their own shaders, has a three.js-like API and is Unlicense/public domain — [OGL GitHub](https://github.com/oframe/ogl)
- **PixiJS v8** for 2D WebGL (sprites, filters, displacement): prefer the WebGL renderer in production — [PixiJS renderers](https://pixijs.com/8.x/guides/components/renderers)
- **Theatre.js**: `@theatre/core`/`studio`/`r3f` are at 0.7. The old r3f README warned the API "can and will drastically change". No 2026 release activity was confirmed — [react-three-editable listing](https://awesome.ecosyste.ms/projects/github.com%2FAndrewPrifer%2Freact-three-editable); [Theatre.js skill listing](https://smithery.ai/skills/neversight/theatre-js)
- **Fluid cursor**: PavelDoGreat's WebGL-Fluid-Simulation (MIT, ~16.8k stars, "works even on mobile"). It is GPU Navier–Stokes based on NVIDIA GPU Gems' fast fluid dynamics chapter, with a dat.GUI panel — [GitHub](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation); [demo](https://paveldogreat.github.io/WebGL-Fluid-Simulation/)

#### F. Creative background effects
- **Paper Shaders** (`@paper-design/shaders` and `-react`) are zero-dependency canvas shaders, Apache-2.0, commercially usable without attribution. Breaking changes ship under 0.0.x, so **pin the version** — [GitHub paper-design/shaders](https://github.com/paper-design/shaders)
  - 30 presets — [shaders.paper.design](https://shaders.paper.design/):
    - Image filters: Paper texture, **Fluted glass**, Water, Image dithering, **Halftone dots**, Halftone CMYK, Lens distortion
    - Logo animations: Heatmap, **Liquid metal**, Gem smoke
    - Effects: **Mesh gradient**, Static mesh gradient, Static radial gradient, Dithering, **Grain gradient**, Dot orbit, **Dot grid**, Warp, Spiral, Swirl, Waves, Neuro noise, Perlin noise, Simplex noise, Voronoi, Pulsing border, Metaballs, Color panels, Smoke ring, **God rays**
  - Example: `<MeshGradient colors={['#5100ff','#00ff80','#ffcc00','#ea00ff']} distortion={1} swirl={0.8} speed={0.2} />`
- Maxime Heckel's 2026 posts cover rendering skies, sunsets and planets (12 May 2026) and **"Shades of Halftone"** (10 Feb 2026). Halftone and dithering are a live aesthetic — [blog.maximeheckel.com](https://blog.maximeheckel.com/); [RSS](https://blog.maximeheckel.com/rss.xml)

### Inferences

**Implementation sketches (researcher-composed from the cited docs; test before shipping)**

1. **Native CSS reveal-on-view, progressively enhanced and reduced-motion safe.** The end state is the default, so unsupported browsers just see content.
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
2. **Scroll progress bar**: `transform-origin: 0 50%; animation: grow 1ms linear both; animation-timeline: scroll(root block);` with `@keyframes grow { from { scale: 0 1 } }` ([pattern from DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)).
3. **Multi-speed layered parallax (CSS)**: give each layer `--speed` and `animation: px 1ms linear both; animation-timeline: view(); animation-range: cover;` with `@keyframes px { from { translate: 0 calc(var(--speed) * -20vh) } to { translate: 0 calc(var(--speed) * 20vh) } }`. Background layers get a small `--speed` and foreground a larger one. Disable on touch or reduced motion, as Locomotive v5 does.
4. **Zoom-through / scale-on-scroll hero**: a section `height: 300vh` contains a sticky `100svh` frame. Use a named `view-timeline: --hero` on the section, then on an inner image `animation-timeline: --hero; animation-range: contain 0% contain 100%;` with keyframes `scale: 1 → 4` and `clip-path: inset(30% 35%) → inset(0)`. Use `svh` (not `dvh`) for the sticky frame so iOS address-bar changes do not resize mid-scrub (see Q4).
5. **Clip-path / mask "window" reveal**: keyframes on `clip-path: circle(0% at 50% 50%) → circle(75%)` or `inset(50% 50% 50% 50% round 2rem) → inset(0 round 0)`. For text-shaped masks, use `mask-image: url(text.svg)` plus `mask-size` scaled from 2000% → 100% (the Larose "SVG Mask Scroll" effect).
6. **Sticky text swap (scrollytelling)**: left column `position: sticky` with stacked headings. The right column has step elements, each with `view-timeline-name: --step-n`, and `timeline-scope: --step-1, --step-2, …` on a shared ancestor lets the sticky headings use `animation-timeline: --step-n` to fade in and out. In GSAP, use one ScrollTrigger per step with `toggleClass` or `onToggle`.
7. **GSAP pin + scrub scrollytelling with snap-to-labels**: use the docs' timeline pattern (`start:"top top", end:"+=1000", scrub:1, pin:true, snap:{snapTo:"labels"}`) — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/). Wrap in `gsap.matchMedia()` with a `(prefers-reduced-motion: no-preference) and (min-width: 768px)` branch, and give mobile a simple stacked layout.
8. **Horizontal section (GSAP)**: `gsap.to(track, { xPercent: -100*(n-1), ease:"none", scrollTrigger:{ trigger: wrap, pin:true, scrub:1, end:()=>"+="+track.scrollWidth, invalidateOnRefresh:true } })`. Inner reveals use `containerAnimation: thatTween`. On mobile, consider replacing it with native `overflow-x: auto` + `scroll-snap-type: x mandatory`, plus `scroll-state(snapped: x)` emphasis in Chromium.
9. **Lenis + ScrollTrigger glue** (verbatim from the Lenis README): `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);`. Keep `syncTouch: false` so touch scroll stays native. Put `data-lenis-prevent` on modals and code blocks.
10. **Canvas image sequence**:
    - Export 120–200 WebP frames at ~1600px, at q≈80–85.
    - Preload with a counter (this doubles as the preloader, see section 3 below) and decode with `img.decode()`.
    - Map `progress → Math.round(progress*(N-1))` from a ScrollTrigger `onUpdate` or `scroll(root)` ScrollTimeline. Draw only when the index changes.
    - On mobile, serve a half-resolution frame set or a single `<video>` scrubbed by `currentTime`. Video scrubbing quality depends on keyframe density. That is an inference; not verified this session.
11. **WebGL image planes synced to DOM** (Codrops gallery pattern): keep `<img>` in the DOM for layout and accessibility, and hide it once its texture loads. Each frame, read `getBoundingClientRect()`, or better, cached offsets plus Lenis scroll, and position a plane mesh in an orthographic or pixel-matched perspective camera. Feed `uVelocity = lenis.velocity` into a vertex shader bend (`pos.y += sin(uv.x*PI) * uVelocity * k`) and an RGB-shift fragment. Unhover means a ripple on `uMouse` with GSAP-tweened `uHover`.
12. **Blender camera path → scroll** (Codrops Jul 2026 pattern): export the curve as glTF or a point list, build a `CatmullRomCurve3`, set `camera.position = curve.getPointAt(p)` and `lookAt(curve.getPointAt(min(p+0.01,1)))`, where `p` is a scrub-smoothed ScrollTrigger progress.
13. **Baked simulation playback (Lusion/Houdini VAT)**: bake vertex positions to textures in Houdini (VAT) or a buffer. In the vertex shader, sample the frame row with `texture(posTex, vec2(vertexId/count, frame/frames))`. Blend multiple baked directions from pointer velocity. Ship a lower vertex count to mobile (Lusion used 4096 vs 1024).
14. **Text variants (rebuild list)**:
    - (a) **Masked line rise**: SplitText `mask:"lines"`, yPercent 100 → 0, stagger 0.08–0.12, `expo.out`.
    - (b) **Char cascade with rotation**: chars `rotateX: -90`, `transformOrigin: "50% 50% -20px"`, stagger `{ each: 0.02, from: "start" }`.
    - (c) **Scroll-lit paragraph**: words opacity 0.15 → 1 on `scrub`, the Larose "Text Gradient Opacity" effect. In pure CSS, give each word `view()` with a staggered `animation-range` via `--word` from `propIndex`.
    - (d) **Scramble decode on hover or enter**: ScrambleText with `chars:"upperCase"`, `revealDelay:0.2`, `speed:0.6`. Lock the width with `font-variant-numeric: tabular-nums` or a monospace font to avoid layout jitter.
    - (e) **Typewriter**: CSS `steps(n)` on `width` with `ch` units and a `border-right` caret, or GSAP TextPlugin.
    - (f) **Variable-weight wave**: per-char `font-variation-settings: "wght" calc(300 + var(--w)*600)`, with `--w` driven by pointer distance (JS) or `scroll(root)`.
    - (g) **Velocity marquee**: two copies of a text track with `xPercent` loop. Lenis velocity adds speed and flips direction. CSS-only uses `@keyframes` `translate: -50%` with `animation-play-state: paused` on hover.
    - (h) **Gradient/shine text**: `background: linear-gradient(110deg, #888 40%, #fff 50%, #888 60%); background-size: 250% 100%; background-clip: text; color: transparent;` animated on `background-position`.
    - (i) **Text along path**: SVG `<textPath href="#curve" startOffset="X%">`, with `startOffset` scrubbed by scroll (Larose "Text Along Path"), or CSS `offset-path` for single glyphs.
    - (j) **Disperse/explode on hover**: chars random `x/y/rotate` on hover, return on leave.
    - (k) **3D perspective text**: lines with `rotateX` from 90deg in a `perspective: 1000px` parent.
    - (l) **Kinetic poster type**: huge display type with `wdth`/`wght` axes and scale scrubbed in a pinned section.
15. **Loading/intro variants** (no dedicated source was fetched; these are composed from SplitText/ScrollTrigger patterns, see Gaps):
    - (a) **Counter preloader**: 0 → 100 numerals tied to *real* asset-loading progress (image-sequence frames, GLTF via `THREE.LoadingManager.onProgress`). Use tabular numerals and a masked-digit "odometer" roll per digit column.
    - (b) **Curtain/shutter intro**: 2–5 panels `scaleY: 1 → 0` with `transformOrigin: top`, stagger 0.08, revealing the hero. Then SplitText lines rise.
    - (c) **Logo stroke-draw → fill**: `pathLength=1` dash 1 → 0, then fill-opacity 0 → 1.
    - (d) **Image-stack shuffle**: 5–8 thumbnails flash at the center, then the last scales to the full-bleed hero with Flip.
    - (e) **Clip-path iris**: `circle(0%) → circle(150%)`.
    - Rule: skip or shorten on repeat visits (sessionStorage flag) and under reduced motion. MotionKit flags decorative preloaders as a fading pattern — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026).
16. **SVG variants**:
    - Hand-drawn underline on link hover (dash offset)
    - Scroll-drawn route or timeline line (`view()` + `stroke-dashoffset`)
    - Morphing blob background (Flubber or MorphSVG between 3–4 blob paths, yoyo)
    - Icon state morph (hamburger → close via MorphSVG)
    - Animated stroke-gradient logo (`<linearGradient>` with animated `gradientTransform`)
    - SVG `feTurbulence` + `feDisplacementMap` "liquid" hover on images (animate `baseFrequency`). This can be costly on large areas.
    - Gooey `feGaussianBlur` + `feColorMatrix` blobs (Larose "Text Gooey")
17. **Background variants**:
    - Paper `MeshGradient` or `GrainGradient` hero at `speed≈0.1–0.2`
    - **Aurora**: 3–4 blurred radial gradients (`filter: blur(80px)`) on transformed pseudo-elements, slowly translated with CSS keyframes. Animate transform, not `background-position`, for compositor-only work.
    - **Grain overlay**: fixed full-screen SVG `feTurbulence` noise PNG/SVG at `opacity: .06–.12` with `mix-blend-mode: overlay`. Step-jitter it at 8–12fps using `steps()` on translate.
    - **Dot/grid pattern**: `radial-gradient(circle, currentColor 1px, transparent 1px) 0 0/24px 24px`, with a radial `mask-image` vignette and a spotlight following the cursor via CSS vars.
    - **Generative canvas**: flow-field particles (Perlin noise), metaballs, dithering, halftone (Heckel 2026). Run them in an OffscreenCanvas worker where possible, as Active Theory and DotLottieWorker do.
- Studio fingerprints (inferred from the cited case studies and stacks):
  - **Lusion**: baked physics, high-end three.js, a static site.
  - **Immersive Garden**: Nuxt + three.js + GSAP + Lenis, with ruthless editing.
  - **Active Theory**: custom engine with worker-offloaded WebGL.
  - **Locomotive**: its own Lenis-based scroll library with parallax disabled on touch.

### Gaps
- Resn and Locomotive studio sites were not examined directly. No build write-ups were found this session.
- Codrops pages could not be fetched (403), so code details of the 2026 Codrops tutorials are unverified. Only titles, dates, authors and summaries come from search excerpts.
- Motion (motion.dev) `useScroll` docs timed out. API details (`offset: ["start end","end start"]`, `scrollYProgress`, hardware-accelerated ScrollTimeline) are from prior knowledge and must be verified at https://motion.dev/docs/react-use-scroll before citing.
- No fetched source covered GSAP DrawSVG/MorphSVG option details, SplitType or Splitting.js current maintenance, Spline runtime performance, or the official Awwwards SOTY 2025 winner page.
- No dedicated source was fetched for preloader/curtain-intro patterns (section 15 is a researcher composition).
- The Safari support status of SVG `pathLength` is uncertain. A cited CSS-Tricks note said Safari lacked it "at the time of writing" (old). Verify current behavior.

---

## Q3. What are the best tutorials/resources?

### Takeaway
For rebuilding the effects above, the highest-value set is:
- GSAP docs (ScrollTrigger, SplitText)
- Bramus's scroll-driven-animations.style, plus MDN for native CSS
- Olivier Larose for named Next.js/Motion/GSAP effects
- Codrops for WebGL/scroll tutorials
- Three.js Journey (including the WebGPU & TSL course)
- Maxime Heckel for shader deep dives
- The Book of Shaders for GLSL fundamentals
- R3F docs for performance
- Paper Shaders, Rive and dotLottie docs for drop-in assets

### Cited Findings
- **GSAP docs**: ScrollTrigger (options, pin/scrub, containerAnimation, normalizeScroll, matchMedia) — [gsap.com/docs/v3/Plugins/ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/); SplitText — [gsap.com/docs/v3/Plugins/SplitText](https://gsap.com/docs/v3/Plugins/SplitText/); ScrambleText — [gsap.com/docs/v3/Plugins/ScrambleTextPlugin](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/); 3.13 release (everything free) — [gsap.com/blog/3-13](https://gsap.com/blog/3-13/)
- **Native CSS**: 15 demos, each with CSS and WAAPI versions — [scroll-driven-animations.style](https://scroll-driven-animations.style/); MDN timelines guide — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines); Chrome scroll-state queries — [developer.chrome.com](https://developer.chrome.com/blog/css-scroll-state-queries); Chrome scroll-triggered animations — [developer.chrome.com](https://developer.chrome.com/blog/scroll-triggered-animations)
- **Olivier Larose**: about 40 named effect tutorials (parallax, zoom parallax, cards parallax, mask transitions, SVG path/mask scroll, text effects, cursors, ripple shader, mouse image distortion in R3F, Next.js page transitions guide, Web Animation Course) — [blog.olivierlarose.com](https://blog.olivierlarose.com/)
- **Codrops**: tag hubs for scroll and WebGL — [tympanus.net/codrops/tag/scroll](https://tympanus.net/codrops/tag/scroll/); [tympanus.net/codrops/tag/webgl](https://tympanus.net/codrops/tag/webgl/); demos hub — [Codrops hub: scroll](https://tympanus.net/codrops/hub/tag/scroll/) (fetch blocked; URLs from search)
- **Three.js Journey (Bruno Simon)**: WebGPU & TSL course with 21 lessons, ~23h of video, 13 projects. $45 standalone or $120 bundle with the main course. "Stable, kept up to date as Three.js releases land" — [threejs-journey.com/webgpu-tsl](https://threejs-journey.com/webgpu-tsl)
- **three.js manual: WebGPURenderer** (migration constraints) — [threejs.org/manual](https://threejs.org/manual/en/webgpurenderer)
- **Maxime Heckel**: shaders and real-time 3D with interactive playgrounds. Notable posts: "The Study of Shaders with React Three Fiber", "Refraction, dispersion, and other shader light effects", "Shades of Halftone" (Feb 2026), "On Rendering the Sky, Sunsets, and Planets" (May 2026) — [blog.maximeheckel.com](https://blog.maximeheckel.com/)
- **The Book of Shaders** (Patricio Gonzalez Vivo and Jen Lowe):
  - Complete chapters: shaping functions, colors, shapes, matrices, patterns, random, noise, cellular noise, fBm.
  - Fractals, image processing, simulation (ripples, reaction-diffusion) and 3D (ray marching) are listed but **unlinked/unfinished** — [thebookofshaders.com](https://thebookofshaders.com/)
- **R3F performance guide** — [r3f.docs.pmnd.rs/advanced/scaling-performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- **Utsubo "100 Three.js tips" (2026)** (vendor; fetch failed, so only the title and claim were seen) — [utsubo.com](https://www.utsubo.com/blog/threejs-best-practices-100-tips)
- **Asset/effect libraries**:
  - Paper Shaders — [shaders.paper.design](https://shaders.paper.design/)
  - Rive web runtime — [rive.app/docs/runtimes/web/web-js](https://rive.app/docs/runtimes/web/web-js)
  - dotLottie-web — [github.com/LottieFiles/dotlottie-web](https://github.com/LottieFiles/dotlottie-web)
  - Lenis — [github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)
  - Locomotive v5 — [scroll.locomotive.ca/docs](https://scroll.locomotive.ca/docs/)
  - OGL — [github.com/oframe/ogl](https://github.com/oframe/ogl)
  - Flubber — [github.com/veltman/flubber](https://github.com/veltman/flubber)
  - WebGL fluid — [PavelDoGreat](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)
  - detect-gpu — [pmndrs/detect-gpu](https://github.com/pmndrs/detect-gpu)
  - Osmo Supply (Webflow/GSAP snippets: masked text reveal, text scramble) — [osmo.supply](https://www.osmo.supply/resource/masked-text-reveal)
- **Case studies**: Lusion (Awwwards) — [awwwards.com case study](https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html); Immersive Garden — [CommArts](https://www.commarts.com/webpicks/immersive-garden); Active Theory tech history — [Medium](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4)
- **Inspiration URLs (studio/showcase)**:
  - Lusion — [lusion.co / lusion.app](https://lusion.app/)
  - Awwwards Lusion case study (above)
  - Awwwards abeto profile — [awwwards.com/abeto](https://www.awwwards.com/abeto/)
  - Active Theory portfolio on webgpu.com — [webgpu.com/showcase](https://www.webgpu.com/showcase/active-theory-portfolio/)
  - Awwwards Hall of Fame (Annuals) — [annuals.awwwards.com/hall-of-fame](https://annuals.awwwards.com/hall-of-fame)

### Inferences
- **Suggested learning path:**
  1. MDN + Bramus demos for native SDA.
  2. GSAP ScrollTrigger + SplitText docs for pin/scrub/text.
  3. Larose tutorials to rebuild the ~20 most common named effects.
  4. Book of Shaders chapters 5–13 for GLSL intuition (shaping, noise, fBm).
  5. Three.js Journey (core + WebGPU/TSL).
  6. Codrops WebGL gallery tutorials for DOM↔WebGL sync.
  7. Heckel for advanced light, refraction and halftone.
- Because WebGPURenderer rejects `ShaderMaterial`, new shader work in three.js should be written in TSL. Older GLSL tutorials (most Codrops pre-2025, Book of Shaders) teach transferable math, but their code needs porting for WebGPURenderer.

### Gaps
- Frontend Masters courses and Shadertoy were not fetched.
- GSAP's official showcase page was not fetched.
- Bruno Simon's main Three.js Journey syllabus and his 2025/2026 portfolio were not fetched.

---

## Q4. What makes scroll animation feel tasteful vs gimmicky "AI slop"? (Including performance budgets, mobile and iOS quirks, and accessibility)

### Takeaway
Tasteful motion is:
- **Restrained**: one or two signature moments per page, not every element.
- **Purposeful**: it reveals hierarchy or tells a story.
- **Cheap to render**: transform, opacity and clip only, at 60fps, without hurting INP.
- **Respectful of native scroll**: no hijacking, no forced snap on mobile.
- **Fully optional**: `prefers-reduced-motion` plus a static, complete fallback.

"Slop" is the generic default: fade-up-on-every-section, competing parallax layers, laggy smooth scroll, decorative preloaders and hero videos that delay content.

### Cited Findings
- **Restraint**:
  - Scroll effects risk "favoring spectacle over substance" and spending budget on interactions most visitors scroll past — [DEV: Scroll-driven animations in 2026](https://dev.to/iliketoplay/scroll-driven-animations-in-2026-558d)
  - One or two tasteful parallax sections add interest, but a whole page of competing parallax layers feels gimmicky. Many parallax effects translate poorly to touch — [UXPin](https://www.uxpin.com/studio/blog/4-types-creative-website-scrolling-patterns/)
  - "One or two smooth animations beat fifteen chaotic ones" — [Tekysinfo](https://tekysinfo.com/website-design-trends-heres-what-works-in-2026/)
  - Immersive Garden "spent more time removing ideas than creating new ones" — [CommArts](https://www.commarts.com/webpicks/immersive-garden)
- **Fading or slop patterns**: autoplay entrance on every element, laggy scroll-hijacking smooth scroll, decorative preloader spinners, default heavy hero video, stutter that hurts INP — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026) (vendor opinion)
- **Performance**:
  - Only 53% of websites meet all "good" Core Web Vitals thresholds. Scroll-jacking and forced snap points take control from users — [Digital Silk](https://www.digitalsilk.com/digital-trends/scrolling-effects/)
  - 43% of sites fail the 200ms INP threshold (secondhand stat attributed to Digital Applied) — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026)
- **Accessibility (WCAG 2.3.3 Animation from Interactions, AAA)**:
  - "Motion animation triggered by interaction can be disabled, unless the animation is essential."
  - Color, blur and opacity changes don't count unless they alter perceived size, shape or position.
  - **Non-essential movement during scrolling and parallax are named vestibular triggers**. Scrolling itself is essential.
  - Techniques: **C39** (CSS `prefers-reduced-motion`), **SCR40** (JS `matchMedia`), or a site-level motion toggle (e.g. a global parallax off switch). Auto-starting animation falls under **SC 2.2.2 Pause, Stop, Hide** — [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
  - The Baseline-SDA demo, under reduced motion, stopped ring and hero motion and removed the 3D card rotation — [DEV](https://dev.to/richicodes/scroll-driven-animations-are-baseline-at-last-3c8g)
  - Split text must keep `aria-label` on the parent and `aria-hidden` on fragments. That is the SplitText default; links need `aria:"none"` + an sr-only copy — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- **iOS Safari viewport quirks**:
  - `dvh` causes scroll jank as the address bar resizes. Elements don't resize until scrolling ends, and scroll-snap + `100dvh` can jump to the next section (bug still NEW) — [WebKit Bug 266835](https://bugs.webkit.org/show_bug.cgi?id=266835)
  - After iOS 18, dynamic viewport units misbehaved in *third-party* iOS browsers while Safari was fine — [WebKit Bug 279998](https://bugs.webkit.org/show_bug.cgi?id=279998)
  - On an iPhone 13, 100dvh = 742px with the browser UI and 844px with it hidden. Use **`svh` for heroes** so they fit without resizing; animating height to `100dvh` jitters — [Medium viewport-units guide](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a); [savvy.co.il](https://savvy.co.il/blog/css/css-dynamic-viewport-height-dvh/)
  - `ScrollTrigger.normalizeScroll(true)` prevents the address bar from showing and hiding on most mobile devices. ScrollTrigger debounces resize by 200ms — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
  - Safari caps rAF at 60fps, and at 30fps in Low Power Mode — [Lenis README](https://github.com/darkroomengineering/lenis)
- **Mobile WebGL**:
  - Lusion halved cloth complexity for mobile (1,024 vs 4,096 vertices) — [Awwwards Lusion case study](https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html)
  - R3F: draw calls ≤ ~1000 (ideally a few hundred); render on demand; `PerformanceMonitor` lowers DPR on decline — [R3F docs](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
  - GPU tier 0 means falling back to a non-WebGL experience — [detect-gpu](https://github.com/pmndrs/detect-gpu)
  - Freeze offscreen Lottie and move many animations to a worker (`DotLottieWorker`) — [dotlottie-web](https://github.com/LottieFiles/dotlottie-web)
  - Call Rive `cleanup()` to avoid leaks — [Rive docs](https://rive.app/docs/runtimes/web/web-js)
  - Locomotive v5 disables parallax on touch — [Locomotive docs](https://scroll.locomotive.ca/docs/)
  - Per-character variable-font animation is CPU-heavy on mobile — [camoa](https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/)

### Inferences
- **Taste checklist** (synthesized from the sources above):
  1. **One hero moment + one mid-page set-piece + quiet micro-motion**. Everything else should be static or a subtle 8–16px rise and fade.
  2. **Motion must encode something**: reading order, causality, product assembly, chapter changes. If deleting an animation loses no meaning and no delight, delete it.
  3. **Choreograph, don't sprinkle**. Use one easing family (e.g. `expo.out`/`power3.out` for entrances, `none` for scrubs), consistent durations (0.6–1.0s for text, 0.3–0.5s for UI), and consistent stagger (0.05–0.12s).
  4. **Scrub only what the user should control** (sequences, 3D rotation, progress). Use play-once triggers for reveals. Do not re-hide content when scrolling back up unless it is a story.
  5. **Never block reading**: no text below ~0.3 opacity for long, and no pinned sections longer than ~2–3 viewport heights without visible progress.
  6. **Native scroll first**. If you smooth, use Lenis with `syncTouch:false`, so touch devices keep native inertia. Never hijack wheel into page-snapping on desktop.
  7. **Typography over effects**. A distinctive typeface with masked line reveals reads as "crafted". Generic fade-up cards, gradient blobs and glassmorphism read as template or "AI slop".
  8. **Bespoke assets**: real photography, custom 3D, baked sims (Lusion) or a shader tuned to the brand palette (Paper Shaders with brand colors). Avoid stock purple-blue mesh gradients.
- **Performance budget proposal** (inferred; tune per project):
  - Animate only `transform`, `opacity`, `clip-path` and `filter` (sparingly). Avoid animating layout properties and large `box-shadow`/`backdrop-filter` areas.
  - **DPR caps**: `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` on desktop and ≤1.5 on mobile. Drop to 1 under `PerformanceMonitor.onDecline`.
  - **WebGL**: <100–300 draw calls on mobile; 1–2 full-screen post passes at most on mobile; KTX2/Basis textures ≤2048px (≤1024 on mobile); Draco/Meshopt geometry.
  - Pause the render loop when the canvas is offscreen (IntersectionObserver) or on `visibilitychange`.
  - Total JS for motion ≤ ~60–80KB gzip on content sites: GSAP core + ScrollTrigger + SplitText + Lenis. Lazy-load three.js only for the section that needs it.
  - **Image sequences**: ≤200 frames, WebP/AVIF, half resolution on mobile, and only decoded frames near the current index kept in memory on low-RAM devices.
  - **Lottie/Rive**: freeze offscreen; one shared worker; cleanup on unmount.
  - Respect `navigator.connection.saveData` and GPU tier 0–1 by serving a static poster plus CSS-only motion.
- **Reduced-motion strategy**:
  - Gate all non-essential motion behind `@media (prefers-reduced-motion: no-preference)` and `gsap.matchMedia()`.
  - Under `reduce`: replace parallax, zoom and scale with instant or opacity-only changes; show image-sequence end frames; stop autoplaying shaders or render a single frame; keep scroll-linked progress bars (low risk).
  - Offer an in-page "reduce motion" toggle (W3C technique Gx).
- **Mobile layout strategy**:
  - Convert pinned horizontal sections into native swipe carousels.
  - Use `svh` for pinned and sticky frames, `lvh` for full-bleed backgrounds and `dvh` only for static (non-animated) app shells.
  - Avoid `100vh` sticky elements inside scroll-snap containers.
  - Test in Low Power Mode (30fps cap) and in third-party iOS browsers.

### Gaps
- No primary-source research quantifies user preference for "tasteful vs gimmicky" motion. All sources are opinion or vendor blogs (MotionKit, Digital Silk, UXPin, Tekysinfo), and several sell animation services or tools.
- The full iliketoplay article (linked from DEV) was not read, because only its introduction was available.
- Specific numeric performance budgets (draw calls on mobile, texture sizes, JS KB) beyond R3F's "≤1000 draw calls" are researcher inferences. The Utsubo 100-tips page failed to load, so its numbers could not be verified.
