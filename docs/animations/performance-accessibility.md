# Animation Performance and Accessibility

Rules for keeping motion fast and safe: compositor-only properties (with web.dev measurements), `will-change`, INP-aware handlers, view-transition and library costs, mobile battery and GPU budgets, iOS Safari viewport units (`svh` vs `dvh`) and the 60 fps / 30 fps Low Power cap, touch and hover handling, `prefers-reduced-motion` patterns for CSS, JS, view transitions, GSAP and Motion, WCAG 2.2.2 Pause/Stop/Hide and 2.3.3 Animation from Interactions, and scroll-jacking. Markers: **[Cited]** fetched source; **[Reference build]** / **[Sketch]** researcher-written, untested; **[Synthesis]** inference; **Editor's note** connective guidance.

## Contents

- [1. Compositor-only properties](#1-compositor-only-properties)
- [2. will-change and layers](#2-will-change-and-layers)
- [3. INP and main-thread work](#3-inp-and-main-thread-work)
- [4. Performance budget](#4-performance-budget)
- [5. Mobile: battery, touch, hover](#5-mobile-battery-touch-hover)
- [6. iOS Safari specifics](#6-ios-safari-specifics)
- [Reduced-motion patterns](#reduced-motion-patterns)
- [8. WCAG 2.2.2 and 2.3.3](#8-wcag-222-and-233)
- [9. Scroll-jacking and native scroll](#9-scroll-jacking-and-native-scroll)
- [10. Screen readers and semantics](#10-screen-readers-and-semantics)
- [11. Testing](#11-testing)
- [12. Gaps](#12-gaps)
- [Sources](#sources)

---

## 1. Compositor-only properties

- **[Cited]** Animate only `transform` and `opacity` (composite step only); padding and margin trigger layout, paint and composite — [Emil Kowalski](https://emilkowal.ski/ui/great-animations).
- **[Cited]** Only `transform` and `opacity` (plus `filter` in most engines) stay on the compositor. web.dev's test: **50% of frames dropped with top/left vs 1% with transform**; **37 ms rendering + 79 ms painting vs zero** — [web.dev animations guide](https://web.dev/articles/animations-guide).
- **[Cited]** Avoid animating `box-shadow` and `border` (expensive) — animate transform on separate layers — [Comeau 3D button](https://www.joshwcomeau.com/animation/3d-button/).
- **[Cited]** "Never `transition: all`" — [Vercel](https://vercel.com/design/guidelines).
- **[Synthesis]** Budget list: `transform`, `opacity`, `clip-path`, `filter` (sparingly). Avoid layout properties and large `box-shadow` / `backdrop-filter` areas.

Repaint-every-frame effects (use small areas, pause offscreen): SVG filters (goo, turbulence), infinite `@property` gradient animations, `filter: grayscale/blur` on large images, `letter-spacing`, `text-underline-offset`, `height` (layout each frame — the grid `0fr→1fr` trick still lays out).

Main-thread vs compositor: Motion drives some animations with rAF, not hardware-accelerated, so they can lag when the main thread is busy — prefer CSS/WAAPI there ([Emil](https://emilkowal.ski/ui/great-animations)). WAAPI is off-main-thread for transform/opacity. Preference order CSS → WAAPI → JS ([Vercel](https://vercel.com/design/guidelines)).

## 2. will-change and layers

- **[Cited]** Use `will-change` only for elements that are about to change; add it shortly before and remove after — layer creation causes its own problems — [web.dev](https://web.dev/articles/animations-guide).
- Comeau sets `will-change: transform` on the moving layers of the 3D button.
- Transforms or `will-change: transform` on ancestors break GSAP `position: fixed` pinning (`pinReparent: true` can help) — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- Outdated: `translateZ(0)` layer hacks → `will-change`, sparingly.
- VT: many named elements = many layers; name only what morphs.

## 3. INP and main-thread work

**[Synthesis]** unless cited.

- Pointer handlers that start animations must return quickly.
- FLIP: batch `getBoundingClientRect()` reads before writes — no read/write interleaving ("batch reads/writes", [Vercel](https://vercel.com/design/guidelines)).
- Let the first frame paint feedback (press state, ripple) before heavy work; defer via `requestAnimationFrame` → `setTimeout`, or `scheduler.yield()` where available.
- **[Cited]** FLIP's "window of 100ms after someone interacts … to do work without them noticing" — [Paul Lewis](https://aerotwist.com/blog/flip-your-animations/).
- `startViewTransition` delays DOM updates until the old state is captured; keep its callback fast (heavy sync work delays paint and can hurt INP).
- **[Cited]** 43% of sites fail the 200 ms INP threshold (secondhand, attributed to Digital Applied) — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026). INP-aware motion (transform/opacity only, lazy-loaded animation code) is a rising trend (vendor).
- **[Cited]** R3F `startTransition` time-slicing: 510 TextGeometries at once → ~5 fps; scheduled → ~60 fps — [R3F](https://r3f.docs.pmnd.rs/advanced/scaling-performance).
- Spinners: show-delay ~150–300 ms, min visible ~300–500 ms to avoid flicker ([Vercel](https://vercel.com/design/guidelines)).
- No quantitative source on the INP cost of view transitions or animation libraries was found.

```js
// Editor's note: illustrative "paint feedback first, then work" pattern; untested
button.addEventListener('click', async () => {
  button.classList.add('is-pressed');                 // cheap visual feedback
  await new Promise(r => requestAnimationFrame(() => setTimeout(r, 0)));
  if ('scheduler' in window && scheduler.yield) await scheduler.yield();
  doHeavyWork();
});
```

## 4. Performance budget

**[Synthesis]** proposal — only R3F's "≤ ~1000 draw calls" is cited.

| Area | Budget |
|---|---|
| Properties | `transform`, `opacity`, `clip-path`, `filter` (sparingly) |
| Motion JS (content sites) | ≤ ~60–80 KB gzip (GSAP core + ScrollTrigger + SplitText + Lenis); lazy-load three.js |
| DPR | `Math.min(devicePixelRatio, 2)` desktop; ≤ 1.5 mobile; 1 on `PerformanceMonitor.onDecline` |
| WebGL | < 100–300 draw calls mobile (R3F ≤ ~1000, ideally a few hundred); 1–2 full-screen post passes mobile; KTX2/Basis ≤ 2048 px (≤ 1024 mobile); Draco/Meshopt |
| Render loop | Pause offscreen (IO) and on `visibilitychange` |
| Image sequences | ≤ 200 frames, WebP/AVIF, half-res mobile; 200 × 2000 px ≈ 400 MB+ uncompressed ([Cited]); keep only near-index frames decoded on low-RAM devices |
| Lottie / Rive | Freeze offscreen; one shared worker; cleanup on unmount (`cleanup()` for Rive) |
| Low-end / data saver | `navigator.connection.saveData` and GPU tier 0–1 → static poster + CSS-only motion |
| MPA transitions | 250–450 ms; prerender/prefetch with Speculation Rules (Chrome skips VT after 4 s) |
| Mobile vertex counts | Halve (Lusion 4,096 → 1,024 [Cited]) |
| Core Web Vitals | Only 53% of sites meet all "good" thresholds ([Digital Silk](https://www.digitalsilk.com/digital-trends/scrolling-effects/)) |

## 5. Mobile: battery, touch, hover

- **[Synthesis]** Infinite loops (conic borders, marquees, shimmer) and `pointermove` effects keep GPU/CPU busy. Pause with IntersectionObserver and `document.visibilitychange`; drop them on `(hover:none)`. `animation-play-state: paused` works under `prefers-reduced-motion: reduce`.
- **[Cited]** No hover on touch: gate hover with `@media (hover:hover)` (MDN; widely available since Dec 2018); move feedback to `:active` (press scale, ripple). Set `-webkit-tap-highlight-color` to match the design; `touch-action: manipulation` — [Vercel](https://vercel.com/design/guidelines); [Comeau](https://www.joshwcomeau.com/animation/3d-button/).
- **[Cited]** Hit targets ≥ 44 px on mobile; gestures need tap or keyboard alternatives; keep overscroll defaults (pull-to-refresh) on coarse pointers — [Vercel](https://vercel.com/design/guidelines).
- **[Cited]** Gestures: destructive actions commit on release; preserve momentum — [Rauno](https://rauno.me/craft/interaction-design). **[Synthesis]** thresholds ~0.5 px/ms or 30–40% of distance; rubber-band past limits.
- **[Cited]** Locomotive v5 disables parallax on touch; per-character variable-font animation is CPU-heavy on mobile ([camoa](https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/)).
- **[Cited]** GPU tier 0 → non-WebGL experience ([detect-gpu](https://github.com/pmndrs/detect-gpu)); R3F `PerformanceMonitor` lowers DPR on decline.
- Tilt: skip on touch, or `DeviceOrientation` with permission (iOS prompts).
- iOS Safari `:active` historically needs a document `touchstart` listener — not tested.

## 6. iOS Safari specifics

**[Cited]**

- Safari caps rAF at **60 fps**, **30 fps in Low Power Mode** — [Lenis README](https://github.com/darkroomengineering/lenis).
- `dvh` causes scroll jank as the address bar resizes; elements don't resize until scrolling ends; scroll-snap + `100dvh` can jump to the next section (bug still NEW) — [WebKit Bug 266835](https://bugs.webkit.org/show_bug.cgi?id=266835).
- After iOS 18, dynamic viewport units misbehaved in *third-party* iOS browsers while Safari was fine — [WebKit Bug 279998](https://bugs.webkit.org/show_bug.cgi?id=279998).
- iPhone 13: 100dvh = 742 px with browser UI, 844 px hidden → use **`svh` for heroes**; animating height to `100dvh` jitters — [Medium](https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a); [savvy.co.il](https://savvy.co.il/blog/css/css-dynamic-viewport-height-dvh/).
- `ScrollTrigger.normalizeScroll(true)` prevents address-bar show/hide on most devices; ScrollTrigger debounces resize 200 ms — [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- Lenis: `syncTouch` odd on iOS < 16; fixed elements can lag on pre-M1 Safari; smoothing stops over iframes; CSS scroll-snap unsupported (`lenis/snap`).

**[Synthesis]** unit policy: `svh` for pinned/sticky frames; `lvh` for full-bleed backgrounds; `dvh` only for static (non-animated) app shells; avoid `100vh` sticky elements inside scroll-snap containers; test in Low Power Mode and third-party iOS browsers.

```css
/* Editor's note: unit policy written out */
.pinned-frame { height: 100svh; }
.full-bleed-bg { height: 100lvh; }
.app-shell { min-height: 100dvh; } /* not animated */
```

---

<a id="reduced-motion-patterns"></a>
## 7. Reduced-motion patterns

### 7.1 No-motion-first CSS (preferred)

**[Cited]** — [Josh Comeau](https://www.joshwcomeau.com/react/prefers-reduced-motion/): put transitions inside `@media (prefers-reduced-motion: no-preference)` so browsers that don't understand the query also get no motion. Opacity fades are "safe to use for everyone". Vestibular disorders cause dizziness, nausea and headaches.

```css
@media (prefers-reduced-motion: no-preference) {
  .btn { transition: transform var(--dur-instant) var(--ease-out),
                     background-color var(--dur-fast) var(--ease-out); }
}
```

### 7.2 JS hook

**[Cited]** Comeau: default the hook to "reduced", listen for `change`, and on SSR start as `true`.

```js
// Editor's note: implementation of Comeau's described behaviour; untested
import { useEffect, useState } from 'react';
const QUERY = '(prefers-reduced-motion: no-preference)';
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true); // SSR + first render: assume reduced
  useEffect(() => {
    const mql = matchMedia(QUERY);
    setReduced(!mql.matches);
    const onChange = (e) => setReduced(!e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

### 7.3 Global safety net

**[Reference build]**, used *in addition to* no-motion-first authoring:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important;
    transition-duration: 1ms !important; scroll-behavior: auto !important; }
}
```

Comeau cautions this blunt approach can't tell motion from non-motion animation. Prefer swapping translate/scale for opacity crossfades where the motion carries meaning.

### 7.4 View transitions

**[Cited]** — [Next.js](https://nextjs.org/docs/app/guides/view-transitions)

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) {
    animation-duration: 0s !important; animation-delay: 0s !important;
  }
}
```

Gentler alternative: keep crossfades, remove positional movement.

### 7.5 Library behaviour

| Library | Reduced motion | Source |
|---|---|---|
| Astro ClientRouter | Disables VT animations automatically | [Astro](https://docs.astro.build/en/guides/view-transitions/) |
| AutoAnimate | Disables itself | [AutoAnimate](https://auto-animate.formkit.com/) |
| React `<ViewTransition>` | **Not** automatic — handle yourself | [react.dev](https://react.dev/reference/react/ViewTransition) |
| Motion layout | **Not** automatic — `useReducedMotion()`; Emil's sidebar sets closed `x` to `0` instead of `"-100%"` | [Emil](https://emilkowal.ski/ui/great-animations) |
| GSAP | `gsap.matchMedia()` with a `(prefers-reduced-motion: no-preference)` branch | [ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| Lottie / Rive / shaders | Static end frame / single frame | [Synthesis] |

```jsx
// Motion — Editor's note: illustrating Emil's cited example
const reduce = useReducedMotion();
<motion.aside animate={{ x: open ? 0 : reduce ? 0 : '-100%', opacity: open ? 1 : 0 }} />
```

```js
// GSAP — Editor's note: illustrative
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero h1', { yPercent: 100, duration: .8, ease: 'expo.out' });
});
```

### 7.6 What to keep vs remove under `reduce`

**[Synthesis]**

| Keep | Replace / remove |
|---|---|
| Opacity and colour feedback | Parallax, zoom, scale-on-scroll → instant or opacity-only |
| Scroll-linked progress bars (low risk) | Image sequences → end frame |
| Focus rings, state colour | Autoplaying shaders → stop or single frame |
| Error states → colour/outline pulse instead of shake | Bursts, confetti, magnetic, tilt |
| Crossfade page transitions | Directional slides, zoom-through |
| | Preloaders/intros → skip (also skip on repeat visits via sessionStorage) |
| | Marquees and loops → paused |

### 7.7 Site-level toggle

**[Cited]** A user preference toggle (e.g. global parallax-off switch) is a sufficient technique for 2.3.3 — [W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Offer it on parallax-heavy sites.

```css
/* Editor's note: illustrative toggle hook */
:root[data-motion="reduce"] .parallax, :root[data-motion="reduce"] .reveal { animation: none !important; }
```

---

## 8. WCAG 2.2.2 and 2.3.3

**[Cited]** — [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

**SC 2.3.3 Animation from Interactions (AAA)**
- "Motion animation triggered by interaction can be disabled, unless the animation is essential…"
- Motion animation = adding steps between states to create the illusion of movement. Colour or opacity changes that don't alter perceived size, shape or position are excluded. **Per the errata, blur is no longer excluded.**
- Non-essential movement during scrolling and parallax are named vestibular triggers; scrolling itself is essential.
- Sufficient techniques: **C39** (CSS `prefers-reduced-motion`), **SCR40** (JS media query / `matchMedia`), a user preference toggle.

**SC 2.2.2 Pause, Stop, Hide**
- Covers motion the page starts automatically, not motion triggered by the user.
- Vercel's practice: automatic motion lasting > 5 s needs pause, stop or hide controls; avoid autoplay except muted, non-essential loops — [Vercel](https://vercel.com/design/guidelines).
- Applies to marquees, looping backgrounds, autoplaying Lottie/Rive, rotating gradient borders, carousels.

```html
<!-- Editor's note: minimal pause control for auto-playing motion -->
<button type="button" aria-pressed="false" class="motion-pause">Pause animation</button>
```

## 9. Scroll-jacking and native scroll

- **[Cited]** Scroll-jacking and forced snap points take control from users — [Digital Silk](https://www.digitalsilk.com/digital-trends/scrolling-effects/). Laggy scroll-hijack smoothing is a "fading" pattern ([MotionKit](https://motionkit.io/blog/web-animation-trends-2026), vendor).
- **[Synthesis]** Native scroll first. If smoothing, Lenis with `syncTouch:false` so touch keeps native inertia; never hijack wheel into page-snapping on desktop; no pinned section longer than ~2–3 viewport heights without visible progress; `data-lenis-prevent` on modals and code blocks.
- Lenis wraps native scroll, so `position: sticky` keeps working.

## 10. Screen readers and semantics

- **[Cited]** SplitText `aria:"auto"`: `aria-label` on parent, `aria-hidden` on fragments; links need `aria:"none"` + an sr-only copy — [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/).
- Toggles on `<input type=checkbox role=switch>` or `<button aria-pressed>`; menu buttons `aria-expanded`; copy confirmations announced in `aria-live="polite"`; error shake paired with text error + `aria-invalid` / `aria-describedby` ([micro-interactions.md](micro-interactions.md)).
- Keep `<img>` in the DOM behind WebGL planes for layout and accessibility.
- Prefer `:focus-visible`; interactive states need more contrast than rest ([Vercel](https://vercel.com/design/guidelines)).
- Never hide information behind hover; never tooltip-only on hover.

## 11. Testing

- **[Cited]** Chrome Performance → Summary (Rendering); Rendering tab FPS meter (aim ~99% of frames delivered); Paint Flashing — [web.dev](https://web.dev/articles/animations-guide).
- **[Synthesis]** Test in iOS Low Power Mode (30 fps), third-party iOS browsers, with reduced motion on, on a GPU tier 1 device, and with `saveData`.

## 12. Gaps

- No quantitative INP cost data for VT or animation libraries.
- Mobile WebGL numeric budgets beyond R3F are inferences; Utsubo tips page failed to load.
- iOS `:active` behaviour and VT + back-swipe not tested.
- Apple HIG Motion page rendered empty — no Apple quotes.

---

## Sources

- Emil Kowalski, Great animations — https://emilkowal.ski/ui/great-animations
- web.dev, animations guide — https://web.dev/articles/animations-guide
- Josh Comeau, 3D button — https://www.joshwcomeau.com/animation/3d-button/
- Josh Comeau, prefers-reduced-motion — https://www.joshwcomeau.com/react/prefers-reduced-motion/
- Vercel Web Interface Guidelines — https://vercel.com/design/guidelines
- Paul Lewis, FLIP — https://aerotwist.com/blog/flip-your-animations/
- Rauno — https://rauno.me/craft/interaction-design
- GSAP ScrollTrigger — https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP SplitText — https://gsap.com/docs/v3/Plugins/SplitText/
- Lenis — https://github.com/darkroomengineering/lenis
- R3F Scaling performance — https://r3f.docs.pmnd.rs/advanced/scaling-performance
- detect-gpu — https://github.com/pmndrs/detect-gpu
- camoa, variable font animation — https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/
- Locomotive — https://scroll.locomotive.ca/docs/
- MotionKit — https://motionkit.io/blog/web-animation-trends-2026
- Digital Silk — https://www.digitalsilk.com/digital-trends/scrolling-effects/
- WebKit 266835 — https://bugs.webkit.org/show_bug.cgi?id=266835
- WebKit 279998 — https://bugs.webkit.org/show_bug.cgi?id=279998
- Medium, viewport units — https://medium.com/@tharunbalaji110/understanding-mobile-viewport-units-a-complete-guide-to-svh-lvh-and-dvh-0c905d96e21a
- savvy.co.il — https://savvy.co.il/blog/css/css-dynamic-viewport-height-dvh/
- W3C Understanding 2.3.3 — https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- Next.js view transitions — https://nextjs.org/docs/app/guides/view-transitions
- Astro — https://docs.astro.build/en/guides/view-transitions/
- AutoAnimate — https://auto-animate.formkit.com/
- react.dev ViewTransition — https://react.dev/reference/react/ViewTransition
- MDN @media hover — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
- Awwwards Lusion case study — https://awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html
- dotlottie-web — https://github.com/LottieFiles/dotlottie-web
- Rive — https://rive.app/docs/runtimes/web/web-js
