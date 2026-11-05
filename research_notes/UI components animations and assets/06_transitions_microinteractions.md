# Web Animation Part 1: Transitions, Page Transitions, Micro-interactions, Hover/Button Animations (Desktop + Mobile Web)

> Research date: 2026-11-05. Scope: CSS transition fundamentals, page/route transitions, micro-interactions, hover effects, state/layout animation. Everything in **Cited Findings** comes from a page I fetched or a search result I read; the URL is next to it. Code labelled **"Reference build"** under *Inferences* is my own practitioner construction from the cited primitives. It is not quoted from a source. Treat its exact numbers as starting points to tune.
>
> Fetch notes: Codrops (tympanus.net), Uiverse, motion.dev and Apple HIG returned 403, ECONNRESET or empty JS-rendered pages to my fetcher. Where I cite those domains, the information comes from search-result snippets and is marked that way.

---

## Q1. What makes UI motion feel crafted rather than generic "AI slop", and what do the experts recommend?

### Takeaway
Crafted motion has a **reason** to exist: it shows cause and effect, where something came from, or a state change. It is **fast** (usually under 300 ms), **origin-aware**, **interruptible**, and **tuned per element**, with easing and duration chosen for size, distance and frequency. Frequent and keyboard-driven actions get little or no motion. Generic "AI slop" motion is one fade-up-on-scroll with one ease applied to everything, `transition: all`, `scale(0)` entrances, `ease-in` on UI, and motion that ignores reduced-motion settings.

### Cited Findings
**Emil Kowalski (Sonner, Vaul, animations.dev)**
- Use `ease-out` for snappy UI ("starts fast and slows down at the end") and keep animations "usually" under 300 ms. A 500 ms enter animation on a tool opened many times a day feels slow — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Toasts (Sonner) use `ease` rather than `ease-out` and run slightly slower so they feel more elegant — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Don't animate keyboard-initiated actions. They repeat many times a day, and animating them makes them feel disconnected. Animate only where motion adds information or marks a state change, such as a modal opening or closing or an App-Store-style card expanding — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Animate only `transform` and `opacity`, which run in the composite step alone. Padding and margin trigger layout, paint and composite — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Framer Motion (now Motion) drives some animations with `requestAnimationFrame`, which is not hardware-accelerated and can lag when the main thread is busy. For those cases, prefer CSS or WAAPI — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Animations should be interruptible. CSS transitions can be redirected to a new value mid-flight, but keyframe animations cannot — [Emil Kowalski, "Great animations"](https://emilkowal.ski/ui/great-animations)
- Scale buttons to `0.97` on `:active`. Never animate an entrance from `scale(0)`; start from `0.9` or higher (the example uses `0.93`) — [Emil Kowalski, "7 practical animation tips"](https://emilkowal.ski/ui/7-practical-animation-tips)
- The first tooltip in a group keeps its open delay. Neighbouring tooltips then open instantly with no animation, which Radix and Base UI support via `[data-instant] { transition-duration: 0ms }`. Example tooltip timing: `transform 0.125s ease-out, opacity 0.125s ease-out` from `scale(0.97)` + `opacity:0` — [Emil Kowalski, "7 practical animation tips"](https://emilkowal.ski/ui/7-practical-animation-tips)
- Avoid `ease-in` for UI. An identical 300 ms dropdown feels slower with it. The built-in CSS easings are often too weak, so use a stronger custom ease-out — [Emil Kowalski, "7 practical animation tips"](https://emilkowal.ski/ui/7-practical-animation-tips)
- Make popovers origin-aware: scale them from the trigger, not from `center`. Use `var(--radix-dropdown-menu-content-transform-origin)` in Radix or `var(--transform-origin)` in Base UI — [Emil Kowalski, "7 practical animation tips"](https://emilkowal.ski/ui/7-practical-animation-tips)
- Compare 180 ms and 400 ms for a select: 180 ms feels more responsive. When easing and duration tweaks don't fix a crossfade, add `filter: blur(2px)` to bridge the gap between the two states — [Emil Kowalski, "7 practical animation tips"](https://emilkowal.ski/ui/7-practical-animation-tips)
- Emil frames animation as craft and taste ("I see animations on the web as a form of art"). His animations.dev course covers easing, springs, timing, purpose, "when to animate and when not to", "Good vs. Great Animations" (orchestration, accessibility, performance), and walkthroughs of Family's drawer, the Dynamic Island, a navigation menu and SVG animations — [animations.dev](https://animations.dev/)

**Rauno Freiberg ("Invisible Details of Interaction Design")**
- Interactions should be interruptible the way a physical book page is. In iOS Settings, swiping back during a transition doesn't interrupt it, and Rauno calls that a flaw — [Rauno, Invisible Details of Interaction Design](https://rauno.me/craft/interaction-design)
- Lightweight, reversible actions such as overlays can fire during a gesture. Destructive actions such as dismissing an app should commit only on release — [Rauno](https://rauno.me/craft/interaction-design)
- Give immediate feedback: apply the scale delta while the user pinches, then animate past a threshold, rather than waiting for the threshold — [Rauno](https://rauno.me/craft/interaction-design)
- Preserve momentum and angle when an element is thrown. Motion should match apparent weight; a playing card is "conceptually lighter" and bounces less — [Rauno](https://rauno.me/craft/interaction-design)
- Spatial consistency: motion should show where something came from. An app launches from its icon and slides in from the right to show it is now first in the stack — [Rauno](https://rauno.me/craft/interaction-design)
- Frequency and novelty: animating a command menu used hundreds of times becomes "cognitive burden". Removing the motion made him "feel like I was moving much faster". macOS context menus appear without animation — [Rauno](https://rauno.me/craft/interaction-design)

**Vercel Web Interface Guidelines (Rauno and the Vercel design team)**
- "Never `transition: all`", "Only animate when it clarifies cause & effect", "Choose easing based on what changes (size, distance, trigger)", "Animations are cancelable by user input", "Anchor motion to where it 'physically' starts", "Provide a reduced-motion variant". Preference order is CSS, then WAAPI, then JS libraries — [Vercel Design Guidelines](https://vercel.com/design/guidelines)
- Apply SVG transforms to `<g>` wrappers for reliable behaviour in Safari — [Vercel Design Guidelines](https://vercel.com/design/guidelines)
- Interactive states (`:hover`, `:active`, `:focus`) should have more contrast than the rest state. Prefer `:focus-visible` over `:focus` — [Vercel Design Guidelines](https://vercel.com/design/guidelines)
- Loading buttons keep their original label and add a spinner. Give spinners a show-delay of about 150–300 ms and a minimum visible time of about 300–500 ms to avoid flicker — [Vercel Design Guidelines](https://vercel.com/design/guidelines)
- Delay the first tooltip in a group and show its peers with no delay. Avoid autoplay except for muted, non-essential loops — [Vercel Design Guidelines](https://vercel.com/design/guidelines)

**Josh W. Comeau**
- Springs via `linear()` are easier to make look natural than hand-tuned Béziers, but they are time-based and handle interruption less well. Keep a small set of easing tokens; if custom curves creep past about 20% of your animations, the token set needs work — [Josh Comeau, linear()](https://www.joshwcomeau.com/animation/linear-timing-function/)
- Asymmetric timing in the 3D button: hover rises in 250 ms with an overshoot curve, press snaps down in **34 ms** (about two frames), and release eases back over 600 ms — [Josh Comeau, 3D button](https://www.joshwcomeau.com/animation/3d-button/)

**Next.js / React View Transitions guide (motion-design semantics)**
- Asymmetric enter and exit: old content leaves fast (150 ms) and new content arrives more gently (fade 210 ms delayed by 150 ms, slide 400 ms). "Old content should leave quickly so it does not compete for attention" — [Next.js, Designing view transitions](https://nextjs.org/docs/app/guides/view-transitions)
- Direction carries meaning. Content sliding up reads as arrival and sliding down as departure. A leftward slide means forward and a rightward slide means back. A 60 px offset "is enough to communicate direction". Keep the header fixed as a spatial anchor — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- Pattern to meaning: shared-element morph means "same thing, going deeper"; Suspense reveal means "data loaded"; directional slide means "forward or back"; same-route crossfade means "same place, different content" — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

**"AI slop" critique (opinion sources, not research)**
- A Y Combinator review of vibe-coded sites singles out fade-on-scroll sections, alongside purple gradients, as homogenised trends that spread through LLM output — [Design Experts Review Vibe Coded Websites (summary)](https://recapio.com/digest/design-experts-review-vibe-coded-websites-by-y-combinator)
- Critics say scroll-fade is usually overdone and badly timed and often ignores reduced-motion settings, though it can work when subtle and restrained — [engineered.at summary of David Bushell, "Death to scroll fade"](https://engineered.at/articles/death-to-scroll-fade-via-david-bushell); [feedbagel summary](https://feedbagel.com/post/critique-of-scroll-fade-animations-in-web-design). I couldn't retrieve Bushell's original post.

**Motion-system tokens (Material 3, the most concrete published system)**
- Material 3 easing: Standard `cubic-bezier(0.2, 0, 0, 1)`; Standard decelerate `(0, 0, 0, 1)`; Standard accelerate `(0.3, 0, 1, 1)`; Emphasized decelerate `(0.05, 0.7, 0.1, 1)`; Emphasized accelerate `(0.3, 0, 0.8, 0.15)`; Emphasized is a two-segment path `M 0,0 C 0.05,0 0.133333,0.06 0.166666,0.4 C 0.208333,0.82 0.25,1 1,1`, which a single cubic-bezier can't represent — [Material Components Android, Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md)
- Material 3 durations: short1–4 are 50/100/150/200 ms; medium1–4 are 250/300/350/400 ms; long1–4 are 450/500/550/600 ms; extra-long1–4 are 700/800/900/1000 ms — [Material Components Android, Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md)
- Material 3 springs (damping ratio / stiffness): fast spatial 0.9/1400, fast effects 1/3800, default spatial 0.9/700, default effects 1/1600, slow spatial 0.9/300, slow effects 1/800. "Spatial" springs (position and size) are slightly underdamped; "effects" springs (colour and opacity) are critically damped — [Material Components Android, Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md)

**easings.net (Penner curves as CSS)**
- easeOutSine `(0.61,1,0.88,1)`, easeOutQuad `(0.5,1,0.89,1)`, easeOutCubic `(0.33,1,0.68,1)`, easeOutQuart `(0.25,1,0.5,1)`, easeOutQuint `(0.22,1,0.36,1)`, easeOutExpo `(0.16,1,0.3,1)`, easeOutCirc `(0,0.55,0.45,1)`, easeOutBack `(0.34,1.56,0.64,1)`
- easeInOutSine `(0.37,0,0.63,1)`, easeInOutQuad `(0.45,0,0.55,1)`, easeInOutCubic `(0.65,0,0.35,1)`, easeInOutQuart `(0.76,0,0.24,1)`, easeInOutQuint `(0.83,0,0.17,1)`, easeInOutExpo `(0.87,0,0.13,1)`, easeInOutCirc `(0.85,0,0.15,1)`, easeInOutBack `(0.68,-0.6,0.32,1.6)`
- easeInSine `(0.12,0,0.39,0)`, easeInQuad `(0.11,0,0.5,0)`, easeInCubic `(0.32,0,0.67,0)`, easeInQuart `(0.5,0,0.75,0)`, easeInQuint `(0.64,0,0.78,0)`, easeInExpo `(0.7,0,0.84,0)`, easeInCirc `(0.55,0,1,0.45)`, easeInBack `(0.36,0,0.66,-0.56)`
- The Elastic and Bounce variants have **no CSS cubic-bezier equivalent**. Use `linear()` for them — [easings.net source data](https://raw.githubusercontent.com/ai/easings.net/master/src/easings.yml); [easings.net](https://easings.net/)

**WCAG**
- SC 2.3.3 Animation from Interactions (**AAA**): "Motion animation triggered by interaction can be disabled, unless the animation is essential…". Motion animation means adding steps between states to create the illusion of movement; colour or opacity changes that don't alter perceived size, shape or position are excluded. Per the errata, blur is no longer excluded. Sufficient techniques are C39 (CSS `prefers-reduced-motion`), SCR40 (the JS media query) and a user preference toggle — [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- SC 2.2.2 Pause, Stop, Hide covers motion the page starts automatically, not motion triggered by the user — [W3C Understanding 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). Vercel's guidelines put it in practice as: automatic motion lasting more than 5 seconds needs pause, stop or hide controls — [Vercel Design Guidelines](https://vercel.com/design/guidelines)
- Josh Comeau recommends **no-motion-first** CSS: put transitions inside `@media (prefers-reduced-motion: no-preference)`, so browsers that don't understand the query also get no motion. For JS motion, default the hook to "reduced", listen for `change`, and on SSR start as `true`. Opacity fades are "safe to use for everyone". Vestibular disorders cause dizziness, nausea and headaches — [Josh Comeau, prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/)

### Inferences
**A "crafted motion" checklist (synthesis of the sources above)**
1. **Purpose test.** Each animation should answer one of four questions: where did this come from, what changed, did my action register, or what should I look at. If it answers none, remove it, as Rauno and Vercel advise.
2. **Frequency test.** The more often an interaction happens, the shorter its animation should be. Command palettes, keyboard shortcuts and context menus get 0–100 ms or nothing. Rare, celebratory moments such as onboarding, a first success or a purchase can run 400–800 ms with springs and overshoot.
3. **Easing by intent.** Use ease-out for entering and responding, a gentle ease-in or quick fade for leaving, ease-in-out for elements that move while staying on screen, and springs for anything the user drags, throws or toggles. Never use `ease-in` for an entrance.
4. **Size and distance drive duration.** Small elements (icons, checkboxes, tooltips) take 100–200 ms. Medium ones (dropdowns, popovers, cards) take 200–300 ms. Large ones (modals, sheets, drawers) take 300–450 ms. Full-page transitions take 350–600 ms, longer only with a narrative reason. This matches the Material token scale.
5. **Asymmetry.** Exits should be about 60–75% of the enter duration. Press-down should be near-instant (34–80 ms) and release slower and springy. Hover-in can be slower than hover-out, or the reverse, depending on the mood you want.
6. **Origin.** Popovers scale from their trigger, menus from their anchor corner, and toasts slide from the edge they live on.
7. **Small deltas.** Scale from 0.93–0.97 rather than 0. Translate 4–12 px for micro-motion and 40–80 px for page slides, not 100vw. Use 2–4 px of blur to hide crossfade seams.
8. **Choreography.** Stagger children by 20–50 ms and cap the total at about 300 ms; for long lists, stagger only the first 6–10 items. Move the hero or shared element first and let the content follow.
9. **Interruptibility.** Use transitions or springs rather than keyframes for anything the user can toggle quickly.
10. **Variety with a system.** Define 3–5 duration tokens, 3–4 easing tokens and 2–3 spring presets. Vary them deliberately per component class rather than applying one "fade-up 20px, 0.6s ease" everywhere.

**Disney's 12 principles applied to UI (my mapping; I did not fetch Val Head or Rachel Nabors' texts)**
| Principle | UI translation | Typical values |
|---|---|---|
| Squash & stretch | Toggle thumb widens while pressed; button squashes on press | `scale(0.97)` press; thumb `width +20%` on `:active` |
| Anticipation | Slight pull-back before a throw or send; icon dips before a launch | 60–100 ms pre-motion of -2 to -4 px |
| Staging | Dim the background and move focus to the modal; one hero motion at a time | backdrop fade 200 ms |
| Straight-ahead vs pose-to-pose | Keyframes (pose) versus physics springs (straight-ahead) | n/a |
| Follow-through & overlapping action | Children settle after the parent (stagger); overshoot springs | stagger 30 ms; damping 0.7–0.9 |
| Slow in / slow out | Easing curves | the tokens above |
| Arcs | Motion along a curve for FABs or shared elements (`offset-path`, or separate x and y easings) | x ease-out, y ease-in |
| Secondary action | Shadow grows as a card lifts; glare follows a tilt | — |
| Timing | Duration scaled to size, distance and frequency | — |
| Exaggeration | Celebratory bursts (like, success) only | overshoot 1.1–1.3 |
| Solid drawing | Consistent perspective and light source in tilt or 3D buttons | `perspective: 800–1200px` |
| Appeal | Personality via custom curves and springs, not defaults | — |

### Gaps
- Apple's HIG Motion page rendered empty to my fetcher, so I have no direct quotes from Apple. Its widely known themes (purposeful, brief, realistic, respect Reduce Motion, interruptible) are general knowledge, not cited here. iOS default spring parameters weren't verified.
- I didn't retrieve primary texts by Val Head (*Designing Interface Animation*), Rachel Nabors or Sarah Drasner (*SVG Animations*, Vue transitions writing), so the Disney mapping above is mine.
- The M3 "Expressive" motion scheme of 2025 (spring-first tokens) wasn't on the fetched page beyond the spring table. The m3.material.io token page is JS-rendered and didn't load.

---

## Q2. What is browser support for View Transitions (same- and cross-document), scroll-driven animations, linear(), @starting-style and interpolate-size in late 2026?

### Takeaway
As of November 2026, same-document View Transitions are Baseline (Chrome 111, Firefox 144, Safari 18). Cross-document (MPA) View Transitions are in Chrome/Edge 126+ and Safari 18.2+; Firefox's status conflicts between sources and is at most partial. `linear()` and `@starting-style` are safe everywhere. Scroll-driven animations reached all three engines (Firefox 159, Safari 26). `interpolate-size` and `calc-size()` are **still Chromium-only** (about 74% of global usage), so use them only as progressive enhancement.

### Cited Findings
| Feature | Chrome/Edge | Safari | Firefox | Source |
|---|---|---|---|---|
| Same-document VT `document.startViewTransition()` | 111 | 18 | 144 (Baseline newly available) | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| `view-transition-name: match-element` | 137 | 18.4 | 144 | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| `view-transition-class` | supported | supported | 144 (Interop 2025) | Baseline 2025 "newly available" since Oct 2025 — [MDN view-transition-class](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class); [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025) |
| VT types | supported | supported | not in Firefox's initial implementation (as of the 2025 post) | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| Nested VT groups | 140 | no | no | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| Scoped (element-level) VT | 147 | no | no | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| `document.activeViewTransition` | 142 | 26.2 | 147 | [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025) |
| **Cross-document VT** `@view-transition {navigation:auto}` | 126 (Chrome Android 157 listed) | 18.2 (iOS 18.2) | **caniuse: "partial" 144–162**; Chrome docs: "not supported" | [caniuse](https://caniuse.com/cross-document-view-transitions) (89.6% global, 87.7% full); [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) |
| `pageswap` / `pagereveal` | 124 | 18.2 | not supported per Chrome docs (a conflicting copy says 147) | [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) |
| `<link rel=expect blocking=render>` | 124 | 18.2 | no | [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) |
| Scroll-driven `animation-timeline: scroll()` | 115 | 26.0 | 159 | [caniuse](https://caniuse.com/mdn-css_properties_animation-timeline_scroll), 89.1% global |
| `linear()` easing | all major browsers since Dec 2023; about 88% support in Oct 2025 | ✓ | ✓ | [Josh Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/) |
| `@starting-style` | ✓ | ✓ | ✓ | Baseline 2024, newly available Aug 2024 — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) |
| `interpolate-size` | 129+ | **no (through 27.3)** | **no (through 162)** | [caniuse](https://caniuse.com/mdn-css_properties_interpolate-size), 73.9% global; MDN: "Limited availability", experimental — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size) |
| `calc-size()` | 129+ | no | no | [caniuse](https://caniuse.com/mdn-css_types_calc-size), 73.9% |
| `@media (hover)` | ✓ | ✓ | ✓ | Widely available since Dec 2018 — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover) |

- Interop 2026 lists cross-document view transitions as a focus area — per search-result snippets ([Chrome docs search result](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document); [jotter "in all major browsers"](https://events-3bg.pages.dev/jotter/in-all-major-browsers)). I didn't verify this on wpt.fyi.
- Cross-document VT conditions: both pages must be same-origin and opt in. Chrome skips the transition with a `TimeoutError` if navigation takes more than 4 s. Use `blocking=render` only when you can measure its impact on Core Web Vitals — [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- Other Chrome changes: `::view-transition` changed from `position: fixed` to `absolute` in Chrome 142, and pseudo-elements inherit more animation properties from Chrome 140 — [Chrome: VT in 2025](https://developer.chrome.com/blog/view-transitions-in-2025)
- React's VT integration needs types and `view-transition-class` ("Chromium 125+ and recent Safari and Firefox versions"). "Some animations may behave differently in Safari". Without support, the app works and simply doesn't animate — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

### Inferences
- **Production policy for late 2026:**
  - Use same-document VT, `@starting-style`, `transition-behavior: allow-discrete`, `linear()` springs and `@property` freely, with graceful degradation.
  - Use cross-document VT freely as progressive enhancement. Firefox users get an instant navigation, which is acceptable.
  - Use scroll-driven animations with an `@supports (animation-timeline: scroll())` guard, since users on browsers older than mid-2026 versions remain.
  - Use `interpolate-size` only as an enhancement over the `grid-template-rows: 0fr → 1fr` technique (see Q8).
- **Outdated techniques to flag:**
  - Animating `height` with JS-measured `max-height: 9999px` hacks, superseded by the grid trick or interpolate-size.
  - The `setTimeout`-before-adding-class trick for entry animations, superseded by `@starting-style`.
  - Display-toggling with `animationend` listeners, superseded by `allow-discrete`.
  - The Club GSAP paywall, gone since 2025.
  - `unstable_ViewTransition` imports, superseded by `ViewTransition` in React 19.3.
  - Barba-only MPA transitions for simple fades, replaceable by native `@view-transition`.
  - `translateZ(0)` layer hacks, superseded by `will-change` used sparingly.

### Gaps
- I couldn't confirm the exact Firefox version, if any, that shipped full cross-document VT; sources conflict ("partial 144–162" on caniuse versus "not supported" in Chrome docs).
- I didn't verify which browsers ship `::details-content` (for animating `<details>`), the `animation-trigger` work, or the `ViewTransition.waitUntil()` ship version.

---

## Q3. Which libraries are best for this, and what are their tradeoffs and bundle sizes?

### Takeaway
Default to **native CSS + WAAPI + View Transitions** for most micro-interactions and page transitions. Add **Motion** (React/Vue/vanilla) for layout animation, exit animation, springs and gestures in component apps. Add **GSAP**, now 100% free including all plugins, for complex timelines, SplitText, MorphSVG, Flip and ScrollTrigger-heavy creative sites. **Anime.js v4** is a modular, lighter GSAP-style alternative. **AutoAnimate** is the zero-config option for list add, remove and reorder. Barba, Swup and Taxi handle MPA page transitions on non-SPA sites, though native cross-document VT now covers simple cases.

### Cited Findings
- **GSAP**: became 100% free, including the formerly Club-only plugins (SplitText, MorphSVG, etc.), "even for commercial use", after Webflow acquired it. Club GSAP ended, and the plugins are on public npm with no tokens. GSAP 3.13 rewrote SplitText, which is "50% smaller" and adds screen-reader a11y attributes, responsive re-splitting, `deepSlice`, built-in masking, `propIndex`, `onSplit()` / `onRevert()` and `smartWrap`. 3.13 can also animate to CSS variables (`color: "var(--my-color)"`) — [GSAP 3.13 blog](https://gsap.com/blog/3-13/)
- SplitText's built-in masking (3.13+) replaces manually nesting text in `overflow:hidden` wrappers — per a search snippet of [Codrops, 7 Must-Know GSAP Tips (Sep 2025)](https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/). A Codrops May 2025 article with five demos (SplitText, a DrawSVG hover underline, MorphSVG, built with Osmo) is at [Codrops, From SplitText to MorphSVG](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) (search snippet; the page returned 403)
- **Motion (motion.dev, formerly Framer Motion)**: the LazyMotion + `m` component cuts the initial render to about **5 kb**, against about **43 kb** for the full `motion` component. `useAnimate` comes as mini (**3.3 kb**) or hybrid (**23 kb**). These are search snippets of the official docs ([motion.dev reduce bundle size](https://motion.dev/docs/react-reduce-bundle-size); [motion.dev LazyMotion](https://motion.dev/motion/lazy-motion/)). Third-party sources give 4.6 kb / 2.3 kb / 34 kb instead ([xNet PR](https://github.com/crs48/xNet/pull/681)). The conflict is unresolved; check bundlephobia.
- Some Motion animations run on rAF, on the main thread, and can lag under load, while CSS and WAAPI are hardware-accelerated — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- **Anime.js v4** is modular. The official per-module sizes are: total 24.50 KB; Timer 5.60; Animation +5.20; Timeline +0.55; Animatable +0.40; Draggable +6.41; Scroll +4.30; Scope +0.22; SVG 0.35; Stagger +0.48; Spring 0.52; WAAPI 3.50. The APIs are `animate`, `createTimeline`, `stagger`, `createDraggable`, `createSpring`, `createScope`, `createMotionPath`, `createDrawable`, `morphTo` and `onScroll({sync:true})` — [Anime.js docs](https://animejs.com/documentation/getting-started/imports)
- **AutoAnimate (FormKit)**: a "zero-config, drop-in" utility that animates a parent's immediate children on add, remove and move. It respects `prefers-reduced-motion` and disables itself when reduced motion is set, sets a static parent to `position: relative`, and supports React (`useAutoAnimate`), Vue (directive and Nuxt), Preact, Solid, Svelte, Angular and Marko. A plugin function can return a custom `KeyframeEffect` for `add`/`remove`/`remain` — [AutoAnimate](https://auto-animate.formkit.com/)
- **Barba.js v2**: "small (7kb minified and compressed)". It turns an MPA into an SPA-like experience, with Router, Prefetch, CSS, Head and Preset plugins — [Barba docs](https://barba.js.org/docs/getstarted/intro/)
- **Swup**: a "page transition library for server-rendered websites" with caching, smart preload, history, scroll management and hooks. Plugins include A11y, Preload, Head and Scripts, plus official Fade, Slide and Overlay themes — [Swup docs](https://swup.js.org/getting-started/)
- **Astro**: `<ClientRouter />` from `astro:transitions`, with `transition:name`, `transition:animate` (`fade` default, `initial`, `slide`, `none`, or custom such as `fade({duration:"0.4s"})`) and `transition:persist`. The fallback is `animate | swap | none`. It disables VT animations under `prefers-reduced-motion`. Events: `astro:before-preparation`, `after-preparation`, `before-swap`, `after-swap`, `page-load`. Astro suggests checking whether native cross-document VT is enough before adding ClientRouter — [Astro docs](https://docs.astro.build/en/guides/view-transitions/)
- **React `<ViewTransition>`** (React 19.3): props are `name`, `enter`, `exit`, `update`, `share` and `default` (`"auto"`, `"none"`, a class, or a `{type: class}` map) plus `onEnter`, `onExit`, `onUpdate` and `onShare` callbacks that get `(instance, types)` and return a cleanup. It activates only via `startTransition`, `<Suspense>` or `useDeferredValue`, not plain `setState`. Caveats:
  - It must come before any DOM node.
  - Names must be unique.
  - React doesn't disable it for reduced motion automatically.
  - Back navigation via legacy popstate skips the animation.

  — [react.dev ViewTransition](https://react.dev/reference/react/ViewTransition)
- **Next.js**: "View transitions work in the App Router with no configuration" with React 19.3, as of a 2026-10-15 doc update. `<Link transitionTypes={['nav-forward']}>` and `router.push(..., {transitionTypes})` are available — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions). Older docs required `experimental: { viewTransition: true }` and called it not production-ready — [Next.js search result (v15 docs)](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition)

### Inferences
| Need | First choice | Why / tradeoff |
|---|---|---|
| Hover, press, focus, toggles, popovers | Plain CSS transitions + `@starting-style` | 0 kb, compositor-friendly, interruptible |
| Spring feel without JS | CSS `linear()` tokens | Fixed duration; weaker on interrupt (Comeau) |
| Imperative one-shots (shake, burst, ripple) | WAAPI `el.animate()` | 0 kb, off-main-thread for transform and opacity, promise-based `finished` |
| SPA route transitions | Native VT (React `<ViewTransition>`, SvelteKit `onNavigate` + `startViewTransition`, Vue Router + VT, Astro ClientRouter) | Shared-element morph for free |
| MPA route transitions | `@view-transition { navigation: auto }` | No JS; Firefox gets instant navigation |
| MPA with choreographed GSAP curtains, persistent WebGL canvas | Barba or Swup (or Taxi/Highway) + GSAP | Keeps JS state (canvas, audio) alive across pages |
| Layout / shared-layout / exit animations in React | Motion (`layout`, `layoutId`, `AnimatePresence`) | About 5 kb (LazyMotion) to about 43 kb; JS-driven layout uses FLIP internally |
| Lists that add, remove or reorder | AutoAnimate | One line; little control |
| Complex timelines, text splitting, SVG morphs, scroll scenes | GSAP (+ SplitText, Flip, MorphSVG, DrawSVG, CustomEase, ScrollTrigger) | Free, powerful, larger payload; imperative |
| Lighter GSAP-like vanilla | Anime.js v4 (import only the modules you use) | Draggable and springs built in |
| Physics-first React | React Spring | Velocity-aware interruption (Comeau notes JS springs beat `linear()` here) |
| Vue | `<Transition>` / `<TransitionGroup>` (built-in FLIP move classes) + VT | — |
| Svelte | `svelte/transition` (`fade`, `fly`, `scale`, `blur`, `draw`, `crossfade`), `animate:flip` | Built-in, compiled |

- **SvelteKit reference pattern** (my build from the standard docs pattern, not fetched):
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

### Gaps
- I didn't fetch GSAP core, ScrollTrigger or SplitText byte sizes, React Spring's size and current status, or the Taxi.js and Highway docs. Highway is widely considered unmaintained and Taxi is its successor from the same team (Jake Whiteley / Unseen), but I didn't verify either here.
- Motion bundle numbers conflict, as noted above.
- I didn't fetch the SvelteKit and Vue VT docs; the snippet above is a reconstruction.

---

## Q4. Which sites showcase great micro-interactions and transitions?

### Takeaway
Use Codrops for deep, buildable tutorials (WebGL hovers, page transitions, GSAP demos), CodePen and Uiverse for copy-paste components, animations.dev and Emil's blog for taste and theory, the Vercel guidelines for rules, and Rive and LottieFiles for vector-animated assets. Mobbin, UI Movement and Dribbble motion are for flow and motion references.

### Cited Findings
- **Codrops WebGL hover distortion** (2018): uses a displacement image to transition between two images on hover with three.js. The author warns it is "heavy on the memory" — [Codrops WebGL Distortion Hover Effects](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/) (search snippet)
- **Codrops motion hover effects with Three.js**: a main distortion plus RGB displacement, image trails and image stretch, with source in Clément Roche's repo — [Codrops ?p=44003](https://tympanus.net/codrops/?p=44003); [GitHub clementroche/motion-hover-effects](https://github.com/clementroche/motion-hover-effects/blob/master/index2.html) (search snippets)
- **Codrops 2025 GSAP** pieces: [From SplitText to MorphSVG (May 2025)](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) and [7 Must-Know GSAP Animation Tips (Sep 2025)](https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/) (search snippets; 403 on fetch)
- **animations.dev**: Emil Kowalski's course, with walkthroughs of the Family drawer, Dynamic Island, nav menu and SVG animation; "15 AI skills for reviewing, improving, and debugging animations" — [animations.dev](https://animations.dev/)
- **Vercel's React view-transitions demo and code**: [demo](https://react-view-transitions-demo.labs.vercel.dev) and [code](https://github.com/nextjs/react-view-transitions-demo) (both linked from the [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions))
- **Uiverse** returned 403 to my fetcher, so I couldn't verify its count or licence.

### Inferences
- Other references (not fetched this session; check them yourself):
  - codepen.io, searched by technique
  - hover.dev (Tailwind/React animated components)
  - ui-movement.com
  - rive.app/community
  - lottiefiles.com
  - dribbble.com/tags/micro-interaction
  - mobbin.com (real app flows, iOS and web)
  - gsap.com/showcase
  - motion.dev/examples
  - awwwards.com (Site of the Day; filter "transitions")
  - Godly.website and Land-book (landing inspiration)
  - Rauno's craft pages (rauno.me/craft) and Emil's blog for interaction details
- When studying an inspiration site, record the **duration, easing, origin, stagger and what happens on interrupt and on touch**. Copying the look without those values is what produces generic motion.

### Gaps
- I couldn't verify the counts, licences or recency of Uiverse, Hover.dev, UI Movement, Rive or LottieFiles content in this session because of fetch blocks and time.

---

## Q5. What are the CSS transition fundamentals: easing tokens, springs via linear(), durations and choreography?

### Takeaway
Ship a small motion token set: 3–4 cubic-beziers, 2–3 `linear()` springs, and 4–5 durations. Write CSS no-motion-first, list properties explicitly, and stagger with `--i` indices.

### Cited Findings
- `linear()` draws straight segments between points. Values above 1 overshoot. Springs need about 40–50+ points (an 11-point spring looked robotic). Example: `transition: transform 800ms linear(0, 0.6, 0.9, 1.08, 0.98, 1);`. Generators are Jake Archibald and Adam Argyle's Linear() Easing Generator, which derives the duration from settling time, and Easing Wizard (stiffness, damping, mass). A zero-damping spring can't be modelled. CSS shortens reversed transitions, so a spring rebound on interrupt "feels tight and unnatural". 100+ point strings run as smoothly as trivial ones; three springs added about 1.3 kB gzipped. Reuse one string via a custom property — [Josh Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)
- Fallback pattern: set a Bézier fallback in a custom property on `html`, override it inside `@supports (animation-timing-function: linear(0, 1))`, and wrap motion in `prefers-reduced-motion: no-preference`. Duplicating the `transition` declaration doesn't work as a fallback with `var()` — [Josh Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)
- Never `transition: all` — [Vercel](https://vercel.com/design/guidelines)

### Inferences
**Reference build: motion tokens**
```css
:root {
  /* Durations */
  --dur-instant: 80ms;   /* press, hover colour */
  --dur-fast: 150ms;     /* tooltip, icon swap, checkbox */
  --dur-base: 220ms;     /* dropdown, popover, card hover */
  --dur-slow: 350ms;     /* modal, drawer, sheet */
  --dur-page: 450ms;     /* route transition */

  /* Easings (easings.net + Material 3) */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);      /* easeOutQuint: UI default */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);  /* dramatic decel: image reveals, page */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* on-screen moves */
  --ease-exit: cubic-bezier(0.3, 0, 0.8, 0.15);    /* M3 emphasized accelerate: exits only */
  --ease-m3: cubic-bezier(0.2, 0, 0, 1);           /* M3 standard */

  /* Spring fallbacks; real linear() strings come from linear-easing-generator */
  --spring-snappy: var(--ease-out);
  --spring-bouncy: cubic-bezier(0.34, 1.56, 0.64, 1); /* easeOutBack */
}
@supports (animation-timing-function: linear(0, 1)) {
  :root {
    /* Paste a generated string, e.g. from linear-easing-generator.netlify.app,
       or easingwizard.com, with the stiffness/damping you want. Shape below is illustrative only. */
    --spring-bouncy: linear(0, 0.009, 0.035 2.1%, 0.141, 0.281 6.7%, 0.723 12.9%, 0.938 16.7%,
      1.017, 1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%,
      1.051 39.6%, 1.017 43.1%, 0.991, 0.977 51%, 0.974 53.8%, 0.975 57.1%, 0.997 69.8%,
      1.003 76.9%, 1.004 83.8%, 1);
  }
}
@media (prefers-reduced-motion: no-preference) {
  .btn { transition: transform var(--dur-instant) var(--ease-out),
                     background-color var(--dur-fast) var(--ease-out); }
}
```
(The `--spring-bouncy` string is the well-known example output of the Linear() Easing Generator as I remember it. Regenerate it rather than trusting my transcription.)

**Choreography and stagger (reference build)**
```css
/* <li style="--i:0">…</li> … */
.list > * {
  opacity: 0; translate: 0 8px; filter: blur(4px);
  transition: opacity 300ms var(--ease-out), translate 400ms var(--ease-out), filter 300ms var(--ease-out);
  transition-delay: calc(min(var(--i), 8) * 35ms);  /* cap the stagger */
}
.list.is-in > * { opacity: 1; translate: 0; filter: blur(0); }
```
Choreography variants:
1. **Cascade**: linear stagger of 20–50 ms.
2. **Center-out**: delay = |i − mid| × 30 ms, as with GSAP `stagger:{from:"center"}`.
3. **Grid diagonal**: delay = (row + col) × 30 ms.
4. **Distance from cursor or click**: compute the distance in JS.
5. **Hero-first**: the shared element moves at t=0 and content follows at +80–120 ms.
6. **Exit all at once, enter staggered**: exits shouldn't stagger.
7. **Reverse-stagger on close**: last in, first out.
8. **Split-property**: opacity runs short (200 ms) while transform runs long (400 ms), so items are visible early and keep settling.
9. **Two-axis arc**: x on `ease-out` and y on `ease-in`, transitioned separately with `translate` + `margin`, or with the individual `translate` property and the `offset-path` feature.

### Gaps
- I couldn't fetch the linear() generator page (ECONNRESET), so I didn't verify the spring string above.

---

## Q6. Which page and route transitions exist, and how is each built?

### Takeaway
Native View Transitions now cover most page-transition needs with small amounts of CSS, both same-document and cross-document. The skill lies in choosing the pattern by meaning (morph, slide, crossfade, reveal) and in tuning asymmetric timing. Barba and Swup + GSAP remain for multi-panel curtains and persistent WebGL scenes.

### Cited Findings
- MPA opt-in on both pages: `@view-transition { navigation: auto; }`. Types can be set in CSS (`@view-transition { navigation: auto; types: slide, forwards; }`) or in JS (`pagereveal` → `e.viewTransition.types.add(type)`). Style per type with `html:active-view-transition-type(forwards) { &::view-transition-old(content){…} &::view-transition-new(content){…} }`. Use `pageswap` and `pagereveal` with `sessionStorage` to carry click coordinates across documents, and `e.viewTransition.skipTransition()` to skip — [Chrome cross-document docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- `<link rel="expect" blocking="render" href="#section1">` holds the first render until that element exists in the DOM — [Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document)
- `view-transition-class` styles many named elements with one rule (`::view-transition-group(.card){animation-duration:.5s}`). Each element still needs a unique `view-transition-name`, which `match-element` can auto-generate in same-document VT — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-class); [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025)
- Morph customisation: `::view-transition-group(.morph){animation-duration:400ms}` and `::view-transition-image-pair(.morph){animation-name:via-blur}` with `@keyframes via-blur{30%{filter:blur(3px)}}`. The blur hides interpolation artifacts — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- Directional slide CSS: old `150ms ease-in fade reverse + 400ms ease-in-out slide reverse`, new `210ms ease-out 150ms fade + 400ms ease-in-out slide`, `--slide-offset: ±60px`, `@keyframes slide{from{translate:var(--slide-offset)}to{translate:0}}` — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- Anchor the header: give it `view-transition-name: site-header`, then set `::view-transition-group(site-header){animation:none;z-index:100}`, `::view-transition-old(site-header){display:none}` and `::view-transition-new(site-header){animation:none}` — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- The `::view-transition` overlay captures pointer events. `::view-transition{pointer-events:none}` lets clicks pass through, but named participants are still skipped in hit-testing — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- Reduced motion for VT: set `animation-duration:0s !important; animation-delay:0s !important` on `::view-transition-old(*)`, `::view-transition-new(*)` and `::view-transition-group(*)`. A gentler alternative keeps the crossfades and removes positional movement — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)
- Browser back and swipe gestures carry no transition type, so directional slides don't play there, but shared-element morphs still do — [Next.js guide](https://nextjs.org/docs/app/guides/view-transitions)

### Inferences
**Page-transition catalogue (reference builds; tune timings)**

1. **Default root crossfade**: just `@view-transition{navigation:auto}`. Tune with `::view-transition-group(root){animation-duration:250ms}`. Use it for content sites; it is the safest choice.
2. **Directional slide + fade**: use the Next.js CSS above. In MPAs, set types in `pagereveal` from `navigation.activation.from` / `entry` indexes.
3. **Shared-element morph** (thumbnail → hero, card → detail): give the same `view-transition-name` on both pages, e.g. `style="view-transition-name: photo-42"`, use 350–450 ms and add a blur at the midpoint. Set `object-fit: cover` on the pseudo images to avoid stretch:
   ```css
   ::view-transition-old(*), ::view-transition-new(*) { height: 100%; object-fit: cover; overflow: clip; }
   ```
   If aspect ratios differ, morph the container and crossfade the content inside it.
4. **Circular reveal from click point** (also popular for dark-mode toggles):
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
   For an MPA, store x and y in `pageswap` and read them in `pagereveal`, as the Chrome docs show.
5. **Curtain or wipe** (clip-path inset): new page `@keyframes wipe-in{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}}`, 600–800 ms `cubic-bezier(0.76,0,0.24,1)` (easeInOutQuart). The old page gets a slight `scale(0.96)` + `opacity .6` "push back" for depth.
6. **Diagonal or polygon wipe**: `clip-path: polygon(0 0, 0 0, 0 100%, 0 100%)` → `polygon(0 0, 120% 0, 100% 100%, 0 100%)`.
7. **Blinds or columns** (multi-panel curtain): use Barba or Swup + GSAP with 4–6 fixed overlay panels, `scaleY 0→1` with `transform-origin: bottom`, `stagger: 0.06`, `ease: "expo.inOut"`. Swap the content while the screen is covered, then `scaleY 1→0` from the top. This needs a JS router because native VT can't hold an overlay across the swap without extra work.
8. **Zoom-through or depth**: old `scale(1)→scale(1.15)` + `opacity→0`; new `scale(0.92)→1` + `opacity 0→1`. Run for 400 ms on `--ease-out-expo` for "drilling in", and reverse it for back.
9. **Stacked card / sheet push** (iOS-like): the new page slides up from 100% with `ease-out-expo` over 500 ms, while the old page scales to 0.94, gets rounded corners and dims. Good for mobile web modals and "detail" routes.
10. **Text-mask or title handoff**: give the page title a VT name so it morphs between list and detail positions; other content crossfades.
11. **Persistent media**: use `transition:persist` (Astro) or a named element whose old snapshot is hidden, so a video or audio player continues.
12. **Skeleton → content handoff**: the Suspense reveal from Next.js (exit 150 ms slide-down, enter 210 ms fade + 400 ms slide-up of 10 px).
13. **Pixel or noise dissolve**: a mask-image animation over a noise PNG, or a WebGL shader in Barba. Only use this on brand or portfolio sites.
14. **Same-route crossfade** (tabs, filters): key the container and let `share="auto"` crossfade it.

**Performance and INP notes (inference)**
- `startViewTransition` captures the old state as an image, so DOM updates in its callback are delayed until the capture. Keep the callback fast; heavy synchronous work there delays the next paint and can hurt INP on click-triggered transitions.
- Many named elements mean many layers. Name only what morphs (`match-element` makes it easy to over-name).
- Long page transitions make the site feel slow. Keep MPA transitions to 250–450 ms. Prerender or prefetch with Speculation Rules so the 4 s timeout never applies.

### Gaps
- I didn't verify the Taxi.js and Highway APIs, or Barba's markup and hooks pages (`data-barba="wrapper"`, `container`, `namespace`, the `leave`/`enter`/`once` hooks); that comes from my prior knowledge, not this session.
- I didn't verify VT behaviour on iOS Safari with the back-swipe gesture, where the native swipe preview may double-animate.

---

## Q7. Which micro-interactions are worth building (press, ripple, magnetic, gooey, like burst, toggles, checkboxes, shakes, copy, menu morphs, success checks), and how?

### Takeaway
Micro-interactions should give immediate feedback within one or two frames on press. They use transform, opacity and SVG stroke animation, and they are reserved for meaningful moments. Build most of them with CSS + WAAPI. Celebratory ones may overshoot; frequent ones must stay subtle.

### Cited Findings
- Press scale `0.97` on `:active` — [Emil Kowalski](https://emilkowal.ski/ui/7-practical-animation-tips)
- **3D pushable button** (Josh Comeau):
  - Three layers: `.shadow` (`translateY(2px)` at rest, `4px` on hover, `1px` on press), `.edge` (darker gradient, fixed) and `.front` (`translateY(-4px)` at rest, `-6px` on hover, `-2px` on press).
  - Rest and release: 600 ms `cubic-bezier(0.3,0.7,0.4,1)`. Hover: 250 ms `cubic-bezier(0.3,0.7,0.4,1.5)`. Press: 34 ms.
  - Hover brightens with `filter: brightness(110%)`. `will-change: transform` is set on the moving layers.
  - Mobile: `-webkit-tap-highlight-color: transparent` and `user-select: none`. Focus: `:focus:not(:focus-visible){outline:none}` with `outline-offset: 4px`.
  - It avoids animating `box-shadow` and `border` because they are expensive.

  — [Josh Comeau, 3D button](https://www.joshwcomeau.com/animation/3d-button/)
- Loading-state rules (keep the label, show-delay 150–300 ms, minimum visible time 300–500 ms) and optimistic UI with rollback or Undo — [Vercel](https://vercel.com/design/guidelines)
- Gooey effect: blur followed by an alpha-contrast `feColorMatrix` filter. The original tutorials are the Codrops "Creative Gooey Effects" (2015) and CSS-Tricks "The Gooey Effect"; both returned 403 or 404 to me, so the matrix values below are from memory.
- `touch-action: manipulation` on controls prevents double-tap zoom. Hit targets should be 44 px or more on mobile — [Vercel](https://vercel.com/design/guidelines)

### Inferences
**Reference builds (each lists its variants and timing)**

**A. Button press and feedback (10 variants)**
1. **Scale press**: `:active{transform:scale(.97)}` over 80–100 ms `ease-out`, releasing over 150–200 ms.
2. **3D push**: Comeau's layers above.
3. **Ripple** (Material-style; position from the pointer):
   ```js
   btn.addEventListener('pointerdown', (e) => {
     const r = btn.getBoundingClientRect(), s = Math.max(r.width, r.height) * 2;
     const dot = Object.assign(document.createElement('span'), { className: 'ripple' });
     dot.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s/2}px;top:${e.clientY - r.top - s/2}px`;
     btn.append(dot);
     dot.animate([{ transform: 'scale(0)', opacity: .35 }, { transform: 'scale(1)', opacity: 0 }],
       { duration: 550, easing: 'cubic-bezier(0.22,1,0.36,1)' }).finished.then(() => dot.remove());
   });
   ```
   ```css
   .btn { position: relative; overflow: hidden; }
   .ripple { position: absolute; border-radius: 50%; background: currentColor; pointer-events: none; }
   ```
4. **Magnetic button** (desktop only, behind `@media (hover:hover) and (pointer:fine)`): on `pointermove` within the bounds, translate by (pointer − center) × 0.3, capped at about 12 px, and move the inner label by × 0.15 for parallax. Use `gsap.quickTo(el,'x',{duration:.4,ease:'power3'})` or a rAF lerp. On `pointerleave`, spring back with `elastic.out(1,0.4)` or a `linear()` spring over about 600 ms.
5. **Fill sweep from the cursor side** (direction-aware): a `::before` with `transform: scaleX(0)`, setting `transform-origin` to `left` or `right` on `pointerenter` depending on `e.offsetX < width/2`. Run 350 ms `--ease-out-expo`; the text colour switches with `mix-blend-mode: difference` or a transitioned `color`.
6. **Circle fill from the cursor**: a `::before` circle positioned at `--x`/`--y` (set in `pointerenter`) with `scale 0 → 2.5` over 450 ms.
7. **Liquid or gooey button**: blobs inside a `filter:url(#goo)` container that move on hover:
   ```html
   <svg width="0" height="0"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b"/>
   <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="g"/>
   <feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></svg>
   ```
   SVG filters repaint every frame (no compositor), so keep the filtered area small and avoid this on low-end mobile.
8. **Loading morph**: the button's width collapses to a circle with a spinner, then a checkmark draws in (see F). Animate the width with FLIP (scaleX on a background layer) to avoid layout cost, or accept layout on a single small element.
9. **Hold-to-confirm**: a `::after` progress bar `scaleX(0 → 1)` over 1.2–2 s `linear` while `:active`, reversing fast (200 ms) on release, so it is interruptible. It suits destructive actions, per Rauno's "commit on release".
10. **Shine sweep** (premium CTA): a gradient `::after` translated from −100% to 200% over 700 ms on hover. Play it once and don't loop it.

**B. Like / heart burst (6 variants)**
1. **Pop**: `scale 1 → 0.8 (80ms) → 1.25 → 1` with a spring of about 450 ms, colour flipping at 80 ms.
2. **Particle ring**: 6–10 dots positioned by `rotate(calc(var(--i)*36deg)) translateY(-18px → -28px)`, `opacity 1 → 0` over 500 ms, plus a `radial-gradient` circle that expands and fades ("Twitter heart").
3. **Sprite-sheet** (Twitter's original): `steps(28)` across a sprite PNG.
4. **Lottie or Rive**: a designer-made burst (LottieFiles, the Rive community).
5. **Count roll**: the number rolls up using two stacked digits in an `overflow:hidden` box translating by −100%.
6. **Unlike**: no burst, just scale to 0.9 and back over 150 ms. Asymmetric feedback is fine.

**C. Toggle / switch morphs (6 variants)**
1. **Thumb slide** with a spring: `translate` over 300 ms `--spring-bouncy`.
2. **Stretch on press**: the thumb width goes from 20 px to 26 px on `:active`, with `transform-origin` toward the travel direction (squash and stretch).
3. **Icon morph** (sun → moon): an SVG `<circle>` mask moves in to carve a crescent; rays scale to 0 with a 20 ms stagger.
4. **Day/night background crossfade** of 400 ms behind the thumb.
5. **Pill → check**: the thumb shows a check path that draws in when on.
6. **Haptic-like bounce**: the track does `scaleX(1.04)` on change over 120 ms.

Accessibility: build toggles on `<input type=checkbox role=switch>` or `<button aria-pressed>`; the animation is purely decorative.

**D. Checkbox draw-in (5 variants)**
```css
.check path { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset 250ms var(--ease-out) 60ms; }
input:checked + svg .check path { stroke-dashoffset: 0; }
input:checked + svg .box { transform: scale(.9); transition: transform 100ms; } /* tiny press */
```
Variants: box fills with a scale-from-center; strike-through on the todo label (`background-size: 0 → 100%` of a 2 px line); indeterminate dash morph; confetti on "all done" only; radio dot scaling from 0.5 to 1 with overshoot.

**E. Form feedback (7 variants)**
1. **Error shake**: `el.animate([{translate:'0'},{translate:'-6px'},{translate:'5px'},{translate:'-4px'},{translate:'3px'},{translate:'0'}],{duration:400,easing:'ease-out'})`. Under reduced motion, replace it with a colour or outline pulse. Always pair it with a text error and `aria-invalid` / `aria-describedby`.
2. **Floating label**: the label translates and scales to 0.85 on `:focus` or `:not(:placeholder-shown)` over 150 ms.
3. **Focus ring grow**: `outline-offset 0 → 3px` over 120 ms.
4. **Inline valid tick**: the check draws in at the field end.
5. **Password strength bar**: `scaleX` plus a colour transition.
6. **Submit**: button → spinner → check (A8 + F).
7. **Character counter**: colour shift near the limit plus a single 1.1× pulse on overflow.

**F. Success checkmark (4 variants)**
1. **Circle draws** (`stroke-dashoffset` 400 ms) **then check draws** (250 ms, delayed 300 ms), with a whole-icon scale of 0.9 → 1.05 → 1.
2. **Filled disc pops** with a spring, and the check is cut out via a mask.
3. **Confetti burst**, for checkout success only.
4. **Morph from the button**: the button's VT name morphs into a success card.

**G. Copy-to-clipboard confirmation (4 variants)**
1. **Icon swap with blur crossfade**: the copy icon goes to `opacity 0` + `scale(.8)` + `blur(2px)` while the check icon comes from `scale(.8)` + `blur(2px)` to 1 and 0, both over 150–200 ms, reverting after 1.5–2 s (Emil's blur tip).
2. **Label swap** ("Copy" → "Copied!") with vertical roll text (see H.4).
3. **Tooltip "Copied"** appears from the trigger origin.
4. **Toast** for copying larger content.

Announce the change with an `aria-live="polite"` region.

**H. Menu icon morph, hamburger → X (5 variants)**
```css
.burger span { display:block; height:2px; width:22px; background:currentColor;
  transition: transform 300ms var(--ease-out), opacity 150ms; }
.burger span + span { margin-top: 6px; }
[aria-expanded="true"] .burger span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
[aria-expanded="true"] .burger span:nth-child(2) { opacity: 0; transform: scaleX(0); }
[aria-expanded="true"] .burger span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
```
Variants:
- **Collapse then rotate**: two-step. Lines translate to the center (150 ms) and then rotate (150 ms) by sequencing `transition-delay` and swapping delays on close.
- **Two-line burger → X**.
- **Burger → arrow (back)**.
- **SVG path morph** via MorphSVG, or `d:` path transitions (Chromium and Firefox; not dependable in Safari).
- **Rotating the whole icon 180°** while morphing.

**I. Other micro-interactions worth having**
- **Tabs**: a sliding indicator that moves via `translate` + `scaleX`, or a Motion `layoutId` "magic underline", or CSS anchor positioning.
- **Segmented control pill**: the same sliding indicator.
- **Accordion chevron**: rotate 180° over 200 ms, with the content opening via the grid trick (Q8).
- **Toast**: Sonner-style stacking, with scaled and offset cards behind and swipe-to-dismiss with velocity.
- **Number ticker**: CSS `@property --n` integer interpolation with `counter-reset: n var(--n)`.
- **Notification badge**: pop with a spring.
- **Drag handles**: lift (`scale 1.02`, a shadow layer fading in, slight rotate of 1–2°).

### Gaps
- I couldn't verify the gooey filter values (`0 0 0 18 -7`, sometimes cited as `19 -9`) at the source.
- I didn't verify the Twitter heart sprite frame count (28 is from memory).
- I didn't test the iOS Safari `:active` behaviour, which historically needs a `touchstart` listener on the document to fire.

---

## Q8. Which hover effects are worth building (image zoom, distortion, RGB split, reveal masks, underlines, text roll and scramble, tilt, spotlight and glow borders, fill sweeps)?

### Takeaway
Hover is desktop-only enhancement. Gate it with `@media (hover:hover) and (pointer:fine)`, give touch users an `:active` or focus equivalent, and never hide information behind hover. The crafted versions use `overflow:hidden` masks, direction or cursor awareness, per-character stagger, and slow, decelerating image moves of 600–900 ms on ease-out-expo against fast UI responses.

### Cited Findings
- `@media (hover: none)` means the primary input can't hover, or can't hover conveniently, as on many phones that emulate it with a long tap. `hover: hover` means it can. MDN's pattern is a default `:hover` style enhanced inside `@media (hover: hover)` so touch devices don't get stuck states. It has been widely available since Dec 2018 — [MDN @media hover](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- Codrops WebGL displacement hover between two images (three.js) is memory-heavy — [Codrops 2018](https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/). Three.js motion hovers cover distortion, RGB displacement, image trails and stretch — [Codrops ?p=44003](https://tympanus.net/codrops/?p=44003) (search snippets)
- The DrawSVG hover underline is one of Codrops' 2025 GSAP demos — [Codrops May 2025](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) (snippet)
- The animated gradient border technique registers an angle with `@property` so a `conic-gradient` can rotate. It is drawn on pseudo-elements, with a blurred duplicate for glow. Note that `overflow:hidden` clips the glow, so use a wrapper. A cursor spotlight uses pointermove → CSS vars → `radial-gradient` — per search snippets of [DEV: animated gradient borders](https://dev.to/ericwoooo_kr/animated-gradient-borders-in-pure-css-no-javascript-no-hacks-121j) and [Cruip animated gradient borders](https://cruip.com/animated-gradient-borders-with-tailwind-css/) (secondary sources; not fetched)

### Inferences
**Reference builds**

**A. Image hover (10 variants)**
1. **Slow zoom in a mask**: `.media{overflow:hidden}` `.media img{transition:scale 800ms var(--ease-out-expo)}` with `scale:1.06` on hover. Keep it to 1.03–1.08; scaling to 1.2 looks cheap.
2. **Zoom-out reveal**: the image starts at `scale 1.15` and goes to 1 on hover (inverse), which suits editorial grids.
3. **Clip-path reveal**: hovering a list item reveals an image through `clip-path: inset(50% 50% 50% 50%)` → `inset(0)` over 500 ms `--ease-out-expo`. A variant is `circle(0% at var(--x) var(--y))` → `circle(75%)`.
4. **Cursor-follow preview**: hovering a text list shows a floating image that follows the cursor with a lerp (`gsap.quickTo` 0.5 s `power3`), with a slight rotation proportional to velocity. A common Awwwards pattern.
5. **Image trail**: images spawn along the cursor path and fade and scale out (Codrops "image trails").
6. **RGB split, CSS version**: two `::before` and `::after` copies (`background-image: inherit`) with `mix-blend-mode: screen` and colour channels via `filter` or separate tinted layers, offset ±3 px on hover over 200 ms. The WebGL version samples the texture with per-channel offsets driven by cursor velocity.
7. **Displacement distortion (WebGL)**: a noise or displacement map mixes texture A → B with `progress` tweened 0 → 1 over 1 s `expo.out` (Codrops hover-effect). It is heavy, so lazy-init on the first hover and use `IntersectionObserver` to pause off-screen.
8. **Grayscale → colour + slight lift**: `filter: grayscale(1)` → 0 (filter repaints, so keep images small or use opacity on a coloured duplicate layer).
9. **Overlay caption slide**: the caption translates from 100% to 0 inside the mask, staggered after the image zoom by 60 ms.
10. **Duotone or blend shift**: transition the `mix-blend-mode` overlay's opacity.

**B. Link underline animations (8 variants)**
```css
.link { background: linear-gradient(currentColor 0 0) 0 100% / 0 1px no-repeat;
        transition: background-size 350ms var(--ease-out); }
@media (hover:hover) { .link:hover { background-size: 100% 1px; } }
.link:focus-visible { background-size: 100% 1px; }
```
1. **Grow from left** (above).
2. **Enter left, exit right**: `::after` with `transform: scaleX(0); transform-origin: right`; on hover `scaleX(1); transform-origin: left`. The line leaves in the direction it came. This is the classic crafted detail.
3. **Grow from center**: `transform-origin: center`.
4. **Thickness swell**: an underline `background-size` from 1 px to 100% height becomes a highlighter fill with the text colour inverting.
5. **Wavy underline draw**: an SVG path with `stroke-dashoffset`, or the DrawSVG demo.
6. **Underline offset slide**: `text-underline-offset 2px → 5px` with `text-decoration-color` transparent → currentColor. It is cheap but repaints.
7. **Strike-through-then-under**: a line translates from mid-text to the baseline.
8. **Arrow nudge**: a trailing `→` translates 3–4 px on hover over 200 ms with a spring.

**C. Text hover (8 variants)**
1. **Text roll** (duplicate-line hover):
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
2. **Text scramble or decode**: on hover, cycle each character through random glyphs for about 30–60 ms per tick, then resolve left to right; the total is about 400–600 ms. Fix the width to prevent layout shift by using a monospace or `font-variant-numeric: tabular-nums` font or a measured width. Respect reduced motion.
3. **Weight shift** with variable fonts: `font-variation-settings 'wght' 400 → 700` over 300 ms. Reflow risk: use `font-optical-sizing` or a fixed-width container, or animate only on single words.
4. **Letter spacing breathe**: a subtle `letter-spacing: .02em` change, which repaints and relayouts. Use only on isolated headings.
5. **Masked slide-up per word**: a split with mask, `yPercent 100 → 0`, stagger 0.04.
6. **Gradient sweep text**: `background-clip:text` with `background-position` animating.
7. **Italic swap**: crossfade to an italic duplicate.
8. **Marquee on hover**: a list row starts a horizontal marquee of its text. Make it pausable and disable it under reduced motion (2.2.2).

**D. Tilt and parallax cards (5 variants)**
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
Variants: max angle 8–15°; glare layer; layered depth (`translateZ` 20–60 px); holographic foil (a conic or linear gradient keyed to `--mx` with `mix-blend-mode: color-dodge`); a "return spring" on leave. On touch, skip tilt or use `DeviceOrientation` only with permission (iOS requires a permission prompt). Gate with `(hover:hover) and (pointer:fine)`.

**E. Spotlight and glow borders (6 variants)**
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
Variants:
1. **Rotating conic "border beam"**.
2. **Cursor-proximity border**: one `pointermove` on the grid sets `--x` and `--y` for every card, so borders light up near the cursor (the "Linear/Vercel card grid" look).
3. **Inner spotlight fill**.
4. **Hover-only glow**: `opacity 0 → 1` over 300 ms.
5. **Blurred duplicate for bloom**: `filter: blur(16px)` on a copy behind the card. Not inside `overflow:hidden`.
6. **Animated gradient angle on hover only**, to save battery.

Infinite `@property` animations repaint every frame (they aren't compositor-only), so pause them off-screen.

**F. Button fill sweeps**: see Q7 A5 and A6, plus **border draw** (four pseudo-lines scaling sequentially at 100 ms each), **text colour invert with `mix-blend-mode: difference`**, **icon slide-through** (the arrow exits right and a duplicate enters from the left inside an overflow mask, like the text roll but horizontal), and **background position gradient shift**.

**Touch equivalents**: do the hover effect on `:active` or focus where it is meaningful, such as card press and image tap. Show reveal content by default on `(hover:none)`. Never show a tooltip only on hover.

### Gaps
- I didn't fetch the Codrops pages (403), so their exact shader code and parameters aren't verified.
- The support figures for the `@property` gradient border ("Firefox 128+, Safari 17+, about 96%") come only from a secondary search snippet.

---

## Q9. How should state and layout changes animate (FLIP, Motion layout and AnimatePresence, AutoAnimate, height:auto, @starting-style, discrete properties)?

### Takeaway
Animate layout changes with **FLIP**: measure, invert with transform, then play. Motion's `layout`/`layoutId`, GSAP Flip, Vue `TransitionGroup`, Svelte `animate:flip` and AutoAnimate all automate it. For entry and exit of top-layer UI (dialog, popover) and `display:none` toggles, use `@starting-style` + `transition-behavior: allow-discrete` with `overlay` and `display`. For `height: auto`, use `interpolate-size: allow-keywords` as Chromium enhancement over the cross-browser `grid-template-rows: 0fr → 1fr` technique.

### Cited Findings
- FLIP is First (record), Last (apply the end state and measure), Invert (a transform back to the start) and Play (remove the transform with a transition). "There is a window of 100ms after someone interacts with your site where you're able to do work without them noticing", so do the measuring there and keep the motion on transform and opacity. WAAPI simplifies it to `el.animate([{transform: inverted}, {transform:'none'}])`. Scaling can distort content, which may require restructuring the markup — [Paul Lewis, FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
- `@starting-style` is Baseline 2024 (Aug 2024). The popover example transitions `opacity`, `transform`, `overlay 0.7s allow-discrete` and `display 0.7s allow-discrete`, with a `@starting-style { [popover]:popover-open { opacity:0; transform:scaleX(0) } }` block placed **after** the open rule (same specificity). `::backdrop` needs its own standalone `@starting-style` because nesting doesn't work for pseudo-elements. Exit goes to the default (closed) style, not the starting style. Keyframe animations don't need `@starting-style` — [MDN @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- `interpolate-size: allow-keywords` on `:root` (inherited) allows `height: 2.5rem ↔ max-content` and similar. One end must be a length-percentage. Use `calc-size()` only when the value also needs calculation, because it applies `allow-keywords` implicitly. It is Chromium-only (129+) — [MDN interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size); [caniuse](https://caniuse.com/mdn-css_properties_interpolate-size)
- AutoAnimate animates add, remove and move of immediate children, respects reduced motion, and accepts a custom `KeyframeEffect` plugin — [AutoAnimate](https://auto-animate.formkit.com/)
- React `<ViewTransition update>` fires when DOM mutations happen inside it or when its size or position changes because of a sibling, which makes it a native alternative to layout animation in React 19.3 — [react.dev](https://react.dev/reference/react/ViewTransition)

### Inferences
**Reference builds**

1. **Dialog with entry and exit** (no JS animation):
   ```css
   dialog { opacity: 0; translate: 0 8px; scale: .97;
     transition: opacity 200ms var(--ease-out), translate 250ms var(--ease-out), scale 250ms var(--ease-out),
                 overlay 250ms allow-discrete, display 250ms allow-discrete; }
   dialog[open] { opacity: 1; translate: 0; scale: 1; }
   @starting-style { dialog[open] { opacity: 0; translate: 0 8px; scale: .97; } }
   dialog::backdrop { background: rgb(0 0 0 / 0); transition: background 250ms, overlay 250ms allow-discrete, display 250ms allow-discrete; }
   dialog[open]::backdrop { background: rgb(0 0 0 / .4); }
   @starting-style { dialog[open]::backdrop { background: rgb(0 0 0 / 0); } }
   ```
   Mobile variant: a bottom sheet translating from 100% over 350 ms `--ease-out-expo`, exiting over 250 ms.
2. **height:auto accordion**, cross-browser:
   ```css
   .panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 300ms var(--ease-out); }
   .panel > div { overflow: hidden; }
   .open .panel { grid-template-rows: 1fr; }
   ```
   Enhancement: `:root{interpolate-size:allow-keywords}` + `height:0 → auto`. Height animation triggers layout on every frame, so keep it to small regions and few simultaneous items. For `<details>`, animate `::details-content` (support not verified in this session).
3. **Element entering the DOM** (toast, list item): `@starting-style { .toast { opacity:0; translate: 0 100%; } }`. No JS class-toggling is needed.
4. **Exit before removal (vanilla)**: `await el.animate([...], {duration:150}).finished; el.remove();`. In React, use Motion `AnimatePresence` (`mode="popLayout"` lets siblings reflow immediately; `mode="wait"` sequences them) or `<ViewTransition exit>`.
5. **Shared layout or "magic move"**: Motion `layoutId="underline"` for tab indicators and expanding cards (the App Store card pattern), or VT names. Motion `layout` on the parent plus `layout="position"` on text children avoids text distortion. That is the FLIP-scale-distortion fix: scale correction is built into Motion; with manual FLIP, counter-scale the children.
6. **Grid reorder or filter**: GSAP Flip (`Flip.getState(items)`, then mutate, then `Flip.from(state,{duration:.5, ease:'power3.inOut', stagger:.02, absolute:true, onEnter: fadeIn, onLeave: fadeOut})`), AutoAnimate, or `document.startViewTransition` with `view-transition-name: match-element` on items and `view-transition-class: item`.
7. **Discrete property transitions**: `transition-behavior: allow-discrete` lets `display`, `content-visibility` and `overlay` flip at the right moment, at the end on exit and the start on entry. Pair it with `@starting-style`.
8. **Number and size morphs**: `@property`-registered `<number>`, `<length>` and `<color>` custom properties become animatable, for counters, progress rings (`conic-gradient` with `--p`) and gradient stops.

**Performance (inference plus web.dev)**
- Only `transform` and `opacity` (plus `filter` in most engines) stay on the compositor. The web.dev test dropped 50% of frames with top/left against 1% with transform, and spent 37 ms rendering + 79 ms painting against zero — [web.dev animations guide](https://web.dev/articles/animations-guide)
- Use `will-change` only for elements that are about to change; add it shortly before and remove it after, because layer creation can cause its own problems. Check with Chrome Performance → Summary (Rendering), the Rendering tab's FPS meter (aim for about 99% of frames delivered) and Paint Flashing — [web.dev animations guide](https://web.dev/articles/animations-guide)
- INP (inference): pointer handlers that start animations must return quickly. Do the FLIP `getBoundingClientRect()` reads in a batch before any writes (no read/write interleaving, which "batch reads/writes" in [Vercel guidelines](https://vercel.com/design/guidelines) also says), and let the first frame paint feedback (press state, ripple) before heavy work. Defer the work with `requestAnimationFrame` → `setTimeout`, or `scheduler.yield()` where available.
- Battery on mobile (inference): infinite loops (conic borders, marquees, shimmer) and `pointermove`-driven effects keep the GPU and CPU busy. Pause them with `IntersectionObserver` and `document.visibilitychange`, and drop them on `(hover:none)`. `animation-play-state: paused` works when `prefers-reduced-motion: reduce` is set.

**Mobile web specifics (inference plus cited rules)**
- No hover. Gate hover effects and move feedback to `:active` (press scale, ripple). Set `-webkit-tap-highlight-color` to match the design and use `touch-action: manipulation` — [Vercel](https://vercel.com/design/guidelines); [Josh Comeau 3D button](https://www.joshwcomeau.com/animation/3d-button/)
- Hit targets of 44 px or more on mobile; gestures need tap or keyboard alternatives — [Vercel](https://vercel.com/design/guidelines)
- Keep the overscroll defaults (pull-to-refresh) on coarse pointers — [Vercel](https://vercel.com/design/guidelines)
- Gestures (swipe-to-dismiss sheets and toasts): commit destructive actions on release, use velocity thresholds (inference: about 0.5 px/ms or 30–40% of the distance), and rubber-band past the limits — [Rauno](https://rauno.me/craft/interaction-design) for release and momentum.
- Reduced motion: no-motion-first CSS, opacity fades kept, slides and parallax removed — [Josh Comeau](https://www.joshwcomeau.com/react/prefers-reduced-motion/). Astro's ClientRouter and AutoAnimate disable themselves automatically; React VT and Motion layout do not, so handle them yourself — [Astro](https://docs.astro.build/en/guides/view-transitions/), [AutoAnimate](https://auto-animate.formkit.com/), [react.dev](https://react.dev/reference/react/ViewTransition). In Motion, use `useReducedMotion()` (Emil's sidebar example sets the closed x to `0` instead of `"-100%"`) — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- **Global reduced-motion safety net (reference build)**, used *in addition to* no-motion-first authoring:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important;
      transition-duration: 1ms !important; scroll-behavior: auto !important; }
  }
  ```
  Josh Comeau cautions that this blunt approach can't tell motion from non-motion animation — [Josh Comeau](https://www.joshwcomeau.com/react/prefers-reduced-motion/). Prefer swapping translate and scale for opacity crossfades where the motion carries meaning.
- Offer a site-level "reduce motion" toggle for parallax-heavy sites. It is a sufficient technique for 2.3.3 — [W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

### Gaps
- I didn't fetch the motion.dev docs (connection resets), so the exact Motion APIs above (`layout="position"`, `AnimatePresence` modes, `useReducedMotion`) come from prior knowledge plus Emil's cited `useReducedMotion` example.
- I didn't verify GSAP Flip option names in this session.
- I didn't verify browser support for `::details-content`.
- I found no quantitative source on the INP cost of view transitions or animation libraries.
