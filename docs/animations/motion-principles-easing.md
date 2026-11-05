# Motion Principles and Easing

What separates crafted UI motion from generic "AI slop" motion, according to practitioners (Emil Kowalski, Rauno Freiberg, Josh W. Comeau, the Vercel Web Interface Guidelines, the Next.js view-transitions guide). This page also holds the full easing and duration reference: Material 3 tokens, the easings.net cubic-bezier set, `linear()` springs, a reference motion-token stylesheet, choreography and stagger patterns, and a mapping of Disney's 12 principles to UI. Research date of the underlying notes: 2026-11-05. Confidence markers: **[Cited]** = from a fetched source (link inline); **[Snippet-only]** = from a search-result snippet, page not fetched; **[Reference build]** = researcher-written code from cited primitives, untested, treat numbers as starting points; **[Synthesis]** = researcher inference; **Editor's note** = connective guidance added while organising these docs.

## Contents

- [1. The core rule set](#1-the-core-rule-set)
- [2. Expert positions in detail](#2-expert-positions-in-detail)
  - [Emil Kowalski](#emil-kowalski-sonner-vaul-animationsdev)
  - [Rauno Freiberg](#rauno-freiberg-invisible-details-of-interaction-design)
  - [Vercel Web Interface Guidelines](#vercel-web-interface-guidelines)
  - [Josh W. Comeau](#josh-w-comeau)
  - [Next.js / React view-transitions motion semantics](#nextjs--react-view-transitions-motion-semantics)
  - ["AI slop" critique](#ai-slop-critique-opinion-sources)
- [3. Crafted-motion checklist](#3-crafted-motion-checklist-synthesis)
- [4. Scroll-page taste checklist](#4-scroll-page-taste-checklist-synthesis)
- [5. Durations](#5-durations)
- [6. Easing curves](#6-easing-curves)
  - [Material 3 easing tokens](#material-3-easing-tokens)
  - [Material 3 springs](#material-3-springs)
  - [easings.net (Penner) cubic-beziers](#easingsnet-penner-cubic-beziers)
  - [Other curves used across these docs](#other-curves-used-across-these-docs)
  - [GSAP ease names used in these docs](#gsap-ease-names-used-in-these-docs)
- [7. Springs with `linear()`](#7-springs-with-linear)
- [8. Reference motion-token stylesheet](#8-reference-motion-token-stylesheet)
- [9. Choreography and stagger](#9-choreography-and-stagger)
- [10. Disney's 12 principles mapped to UI](#10-disneys-12-principles-mapped-to-ui)
- [11. Studying inspiration properly](#11-studying-inspiration-properly)
- [12. Gaps](#12-gaps)
- [Sources](#sources)

---

## 1. The core rule set

**[Synthesis]** Crafted motion has a **reason** to exist: it shows cause and effect, where something came from, or a state change. It is:

- **Fast**: usually under 300 ms.
- **Origin-aware**: scales/slides from the thing that triggered it.
- **Interruptible**: can be redirected mid-flight.
- **Tuned per element**: easing and duration chosen for size, distance and frequency.

Frequent and keyboard-driven actions get little or no motion.

Generic "AI slop" motion is: one fade-up-on-scroll with one ease applied to everything, `transition: all`, `scale(0)` entrances, `ease-in` on UI, and motion that ignores reduced-motion settings.

For scroll-heavy pages, **[Synthesis]** tasteful motion is restrained (one or two signature moments per page), purposeful (reveals hierarchy or tells a story), cheap to render (transform/opacity/clip only, 60fps, no INP hit), respectful of native scroll (no hijacking, no forced snap on mobile) and fully optional (`prefers-reduced-motion` plus a complete static fallback). "Slop" there is fade-up-on-every-section, competing parallax layers, laggy smooth scroll, decorative preloaders and hero videos that delay content. See [scroll-animations.md](scroll-animations.md#taste-restraint-and-slop).

---

## 2. Expert positions in detail

### Emil Kowalski (Sonner, Vaul, animations.dev)

All **[Cited]**.

- Use `ease-out` for snappy UI ("starts fast and slows down at the end"). Keep animations "usually" under 300 ms. A 500 ms enter animation on a tool opened many times a day feels slow — [Great animations](https://emilkowal.ski/ui/great-animations)
- Toasts (Sonner) use `ease` rather than `ease-out` and run slightly slower so they feel more elegant — [Great animations](https://emilkowal.ski/ui/great-animations)
- Don't animate keyboard-initiated actions: they repeat many times a day and animating them makes them feel disconnected. Animate only where motion adds information or marks a state change (modal open/close, App-Store-style card expand) — [Great animations](https://emilkowal.ski/ui/great-animations)
- Animate only `transform` and `opacity` (composite step only). Padding and margin trigger layout, paint and composite — [Great animations](https://emilkowal.ski/ui/great-animations)
- Framer Motion (now Motion) drives some animations with `requestAnimationFrame`, which is not hardware-accelerated and can lag when the main thread is busy. Prefer CSS or WAAPI there — [Great animations](https://emilkowal.ski/ui/great-animations)
- Animations should be interruptible. CSS **transitions** can be redirected mid-flight; **keyframe animations cannot** — [Great animations](https://emilkowal.ski/ui/great-animations)
- Scale buttons to `0.97` on `:active`. Never animate an entrance from `scale(0)`; start from `0.9` or higher (his example uses `0.93`) — [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Tooltip groups: the first tooltip keeps its open delay; neighbours then open instantly with no animation. Radix and Base UI support this via `[data-instant] { transition-duration: 0ms }`. Example tooltip timing: `transform 0.125s ease-out, opacity 0.125s ease-out` from `scale(0.97)` + `opacity:0` — [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Avoid `ease-in` for UI: an identical 300 ms dropdown feels slower with it. Built-in CSS easings are often too weak; use a stronger custom ease-out — [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- Origin-aware popovers: scale from the trigger, not `center`. Radix: `var(--radix-dropdown-menu-content-transform-origin)`; Base UI: `var(--transform-origin)` — [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- 180 ms vs 400 ms for a select: 180 ms feels more responsive. When easing/duration tweaks don't fix a crossfade, add `filter: blur(2px)` to bridge the two states — [7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips)
- In Motion, use `useReducedMotion()`; his sidebar example sets the closed `x` to `0` instead of `"-100%"` under reduced motion — [Great animations](https://emilkowal.ski/ui/great-animations)
- Framing: "I see animations on the web as a form of art". The [animations.dev](https://animations.dev/) course covers easing, springs, timing, purpose, "when to animate and when not to", "Good vs. Great Animations" (orchestration, accessibility, performance), walkthroughs of Family's drawer, the Dynamic Island, a navigation menu and SVG animations, and "15 AI skills for reviewing, improving, and debugging animations".

```css
/* Editor's note: assembled from Emil's cited values above, not a verbatim snippet */
.btn:active { transform: scale(0.97); }

.tooltip {
  transform-origin: var(--transform-origin); /* Base UI; Radix: var(--radix-dropdown-menu-content-transform-origin) */
  transition: transform 0.125s ease-out, opacity 0.125s ease-out;
}
/* closed/initial state: transform: scale(0.97); opacity: 0; */
.tooltip[data-instant] { transition-duration: 0ms; }
```

### Rauno Freiberg ("Invisible Details of Interaction Design")

All **[Cited]** — [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design).

- **Interruptible like a physical book page.** iOS Settings doesn't let a back-swipe interrupt an in-flight transition; Rauno calls that a flaw.
- **Commit timing.** Lightweight, reversible actions (overlays) can fire during a gesture. Destructive actions (dismissing an app) commit only on release.
- **Immediate feedback.** Apply the scale delta while the user pinches, then animate past a threshold, rather than waiting for the threshold.
- **Momentum and weight.** Preserve momentum and angle when an element is thrown. Motion should match apparent weight; a playing card is "conceptually lighter" and bounces less.
- **Spatial consistency.** Motion shows where something came from: an app launches from its icon; a view slides in from the right to show it is now first in the stack.
- **Frequency and novelty.** Animating a command menu used hundreds of times becomes "cognitive burden". Removing the motion made him "feel like I was moving much faster". macOS context menus appear without animation.

### Vercel Web Interface Guidelines

All **[Cited]** — [vercel.com/design/guidelines](https://vercel.com/design/guidelines) (Rauno and the Vercel design team).

- "Never `transition: all`".
- "Only animate when it clarifies cause & effect".
- "Choose easing based on what changes (size, distance, trigger)".
- "Animations are cancelable by user input".
- "Anchor motion to where it 'physically' starts".
- "Provide a reduced-motion variant".
- Implementation preference order: **CSS → WAAPI → JS libraries**.
- Apply SVG transforms to `<g>` wrappers for reliable Safari behaviour.
- Interactive states (`:hover`, `:active`, `:focus`) should have more contrast than rest. Prefer `:focus-visible` over `:focus`.
- Loading buttons keep their original label and add a spinner. Spinner show-delay ~150–300 ms; minimum visible time ~300–500 ms (avoids flicker). Optimistic UI with rollback or Undo.
- Delay the first tooltip in a group; show peers with no delay.
- Avoid autoplay except muted, non-essential loops. Automatic motion lasting more than 5 s needs pause/stop/hide controls.
- Batch layout reads and writes (no interleaving).
- Mobile: `touch-action: manipulation`; hit targets ≥ 44 px; gestures need tap or keyboard alternatives; keep overscroll defaults (pull-to-refresh) on coarse pointers.

### Josh W. Comeau

All **[Cited]**.

- Springs via `linear()` are easier to make look natural than hand-tuned Béziers, but they are time-based and handle interruption less well. Keep a small easing token set; if custom curves creep past ~20% of your animations, the token set needs work — [linear()](https://www.joshwcomeau.com/animation/linear-timing-function/)
- **Asymmetric timing** in his 3D button: hover rises in 250 ms with an overshoot curve, press snaps down in **34 ms** (~two frames), release eases back over 600 ms — [3D button](https://www.joshwcomeau.com/animation/3d-button/). Full spec in [micro-interactions.md](micro-interactions.md#a2-3d-pushable-button-josh-comeau).
- **No-motion-first** CSS: put transitions inside `@media (prefers-reduced-motion: no-preference)` so browsers that don't understand the query also get no motion. Opacity fades are "safe to use for everyone" — [prefers-reduced-motion](https://www.joshwcomeau.com/react/prefers-reduced-motion/). Full patterns in [performance-accessibility.md](performance-accessibility.md#reduced-motion-patterns).

### Next.js / React view-transitions motion semantics

All **[Cited]** — [Next.js, Designing view transitions](https://nextjs.org/docs/app/guides/view-transitions).

- **Asymmetric enter/exit.** Old content leaves fast (150 ms); new content arrives more gently (fade 210 ms delayed by 150 ms, slide 400 ms). "Old content should leave quickly so it does not compete for attention."
- **Direction carries meaning.** Sliding up reads as arrival; sliding down as departure. Leftward = forward; rightward = back. A 60 px offset "is enough to communicate direction". Keep the header fixed as a spatial anchor.
- **Pattern → meaning:**

| Pattern | Meaning |
|---|---|
| Shared-element morph | "same thing, going deeper" |
| Suspense reveal | "data loaded" |
| Directional slide | "forward or back" |
| Same-route crossfade | "same place, different content" |

Build details in [page-transitions.md](page-transitions.md).

### "AI slop" critique (opinion sources)

**[Cited — opinion, not research]**

- A Y Combinator review of vibe-coded sites singles out fade-on-scroll sections, alongside purple gradients, as homogenised trends that spread through LLM output — [recapio summary](https://recapio.com/digest/design-experts-review-vibe-coded-websites-by-y-combinator)
- Critics say scroll-fade is usually overdone, badly timed and often ignores reduced-motion settings, though it can work when subtle and restrained — [engineered.at summary of David Bushell, "Death to scroll fade"](https://engineered.at/articles/death-to-scroll-fade-via-david-bushell); [feedbagel summary](https://feedbagel.com/post/critique-of-scroll-fade-animations-in-web-design). Bushell's original post could not be retrieved.
- 2026 "fading" patterns (vendor opinion): autoplay entrance animation on every element, laggy scroll-hijack smoothing, decorative preloader spinners, heavy hero video as default, INP-hurting stutter — [MotionKit](https://motionkit.io/blog/web-animation-trends-2026)
- "One or two smooth animations beat fifteen chaotic ones" — [Tekysinfo](https://tekysinfo.com/website-design-trends-heres-what-works-in-2026/); Immersive Garden "spent more time removing ideas than creating new ones" — [CommArts](https://www.commarts.com/webpicks/immersive-garden)

---

## 3. Crafted-motion checklist (synthesis)

**[Synthesis]** of the sources above.

1. **Purpose test.** Each animation answers one of: where did this come from, what changed, did my action register, what should I look at. If none, remove it (Rauno, Vercel).
2. **Frequency test.** The more often it happens, the shorter it is. Command palettes, keyboard shortcuts, context menus: 0–100 ms or nothing. Rare celebratory moments (onboarding, first success, purchase): 400–800 ms with springs and overshoot.
3. **Easing by intent.** Ease-out for entering and responding; gentle ease-in or quick fade for leaving; ease-in-out for elements that move while staying on screen; springs for anything dragged, thrown or toggled. Never `ease-in` for an entrance.
4. **Size and distance drive duration.** Small (icons, checkboxes, tooltips) 100–200 ms; medium (dropdowns, popovers, cards) 200–300 ms; large (modals, sheets, drawers) 300–450 ms; full-page 350–600 ms, longer only with a narrative reason. Matches the Material token scale.
5. **Asymmetry.** Exits ≈ 60–75% of enter duration. Press-down near-instant (34–80 ms); release slower and springy. Hover-in may be slower than hover-out, or the reverse, depending on mood.
6. **Origin.** Popovers scale from their trigger, menus from their anchor corner, toasts slide from the edge they live on.
7. **Small deltas.** Scale from 0.93–0.97, not 0. Translate 4–12 px for micro-motion, 40–80 px for page slides, not 100vw. 2–4 px of blur hides crossfade seams.
8. **Choreography.** Stagger children 20–50 ms, cap the total at ~300 ms; for long lists stagger only the first 6–10. Hero/shared element first, content follows.
9. **Interruptibility.** Transitions or springs, not keyframes, for anything the user can toggle quickly.
10. **Variety with a system.** 3–5 duration tokens, 3–4 easing tokens, 2–3 spring presets. Vary deliberately per component class instead of one "fade-up 20px, 0.6s ease" everywhere.

## 4. Scroll-page taste checklist (synthesis)

**[Synthesis]** from the scroll research (full context in [scroll-animations.md](scroll-animations.md#taste-restraint-and-slop)).

1. **One hero moment + one mid-page set-piece + quiet micro-motion.** Everything else static or a subtle 8–16 px rise and fade.
2. **Motion must encode something**: reading order, causality, product assembly, chapter changes. If deleting it loses no meaning and no delight, delete it.
3. **Choreograph, don't sprinkle.** One easing family (e.g. `expo.out`/`power3.out` for entrances, `none` for scrubs); consistent durations (0.6–1.0 s for text, 0.3–0.5 s for UI); consistent stagger (0.05–0.12 s).
4. **Scrub only what the user should control** (sequences, 3D rotation, progress). Play-once triggers for reveals. Don't re-hide content on scroll-up unless it is a story.
5. **Never block reading**: no text below ~0.3 opacity for long; no pinned sections longer than ~2–3 viewport heights without visible progress.
6. **Native scroll first.** If smoothing, Lenis with `syncTouch:false` so touch keeps native inertia. Never hijack wheel into page-snapping on desktop.
7. **Typography over effects.** A distinctive typeface with masked line reveals reads as "crafted"; generic fade-up cards, gradient blobs and glassmorphism read as template / "AI slop".
8. **Bespoke assets**: real photography, custom 3D, baked sims (Lusion) or a shader tuned to the brand palette (Paper Shaders with brand colours). Avoid stock purple-blue mesh gradients.

---

## 5. Durations

### Material 3 duration tokens

**[Cited]** — [Material Components Android, Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md)

| Group | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| short | 50 ms | 100 ms | 150 ms | 200 ms |
| medium | 250 ms | 300 ms | 350 ms | 400 ms |
| long | 450 ms | 500 ms | 550 ms | 600 ms |
| extra-long | 700 ms | 800 ms | 900 ms | 1000 ms |

### Duration guide by job

| Job | Duration | Source |
|---|---|---|
| Keyboard-initiated / very frequent actions | 0 ms (none) to 100 ms | [Cited] Emil, Rauno; [Synthesis] range |
| Button press-down | 34 ms (Comeau) – 80–100 ms | [Cited] Comeau 34 ms; [Synthesis] 34–80 ms |
| Tooltip | 125 ms | [Cited] Emil |
| Select / dropdown | 180 ms (preferred over 400 ms) | [Cited] Emil |
| Small elements (icons, checkboxes, tooltips) | 100–200 ms | [Synthesis] |
| Medium (dropdowns, popovers, cards) | 200–300 ms | [Synthesis] |
| Large (modals, sheets, drawers) | 300–450 ms | [Synthesis] |
| Full-page transition | 350–600 ms; MPA 250–450 ms | [Synthesis] |
| VT old content exit | 150 ms | [Cited] Next.js |
| VT new content enter | fade 210 ms (delay 150 ms) + slide 400 ms | [Cited] Next.js |
| Celebratory (onboarding, purchase) | 400–800 ms | [Synthesis] |
| Text reveals | 0.6–1.0 s | [Synthesis] |
| UI on scroll pages | 0.3–0.5 s | [Synthesis] |
| Image hover moves | 600–900 ms ease-out-expo | [Synthesis] (see [hover-effects.md](hover-effects.md)) |
| Spinner show-delay / min visible | 150–300 ms / 300–500 ms | [Cited] Vercel |
| Automatic motion requiring pause control | > 5 s | [Cited] Vercel |

---

## 6. Easing curves

### Material 3 easing tokens

**[Cited]** — [Material Components Android, Motion.md](https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md)

| Token | Value |
|---|---|
| Standard | `cubic-bezier(0.2, 0, 0, 1)` |
| Standard decelerate | `cubic-bezier(0, 0, 0, 1)` |
| Standard accelerate | `cubic-bezier(0.3, 0, 1, 1)` |
| Emphasized decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1)` |
| Emphasized accelerate | `cubic-bezier(0.3, 0, 0.8, 0.15)` |
| Emphasized | Two-segment path `M 0,0 C 0.05,0 0.133333,0.06 0.166666,0.4 C 0.208333,0.82 0.25,1 1,1` — **cannot** be represented by a single cubic-bezier |

Editor's note: to approximate "Emphasized" in CSS, sample the path into a `linear()` string (see §7); the notes don't supply one.

### Material 3 springs

**[Cited]** — same source. Damping ratio / stiffness.

| Spring | Damping | Stiffness |
|---|---|---|
| Fast spatial | 0.9 | 1400 |
| Fast effects | 1 | 3800 |
| Default spatial | 0.9 | 700 |
| Default effects | 1 | 1600 |
| Slow spatial | 0.9 | 300 |
| Slow effects | 1 | 800 |

"Spatial" springs (position, size) are slightly underdamped; "effects" springs (colour, opacity) are critically damped. Generate CSS `linear()` from these with Easing Wizard (stiffness/damping/mass input) — see §7.

### easings.net (Penner) cubic-beziers

**[Cited]** — [easings.net](https://easings.net/); [source data](https://raw.githubusercontent.com/ai/easings.net/master/src/easings.yml). All values are `cubic-bezier(x1, y1, x2, y2)`.

| Family | easeIn | easeOut | easeInOut |
|---|---|---|---|
| Sine | `(0.12, 0, 0.39, 0)` | `(0.61, 1, 0.88, 1)` | `(0.37, 0, 0.63, 1)` |
| Quad | `(0.11, 0, 0.5, 0)` | `(0.5, 1, 0.89, 1)` | `(0.45, 0, 0.55, 1)` |
| Cubic | `(0.32, 0, 0.67, 0)` | `(0.33, 1, 0.68, 1)` | `(0.65, 0, 0.35, 1)` |
| Quart | `(0.5, 0, 0.75, 0)` | `(0.25, 1, 0.5, 1)` | `(0.76, 0, 0.24, 1)` |
| Quint | `(0.64, 0, 0.78, 0)` | `(0.22, 1, 0.36, 1)` | `(0.83, 0, 0.17, 1)` |
| Expo | `(0.7, 0, 0.84, 0)` | `(0.16, 1, 0.3, 1)` | `(0.87, 0, 0.13, 1)` |
| Circ | `(0.55, 0, 1, 0.45)` | `(0, 0.55, 0.45, 1)` | `(0.85, 0, 0.15, 1)` |
| Back | `(0.36, 0, 0.66, -0.56)` | `(0.34, 1.56, 0.64, 1)` | `(0.68, -0.6, 0.32, 1.6)` |
| Elastic | no cubic-bezier equivalent — use `linear()` | — | — |
| Bounce | no cubic-bezier equivalent — use `linear()` | — | — |

### Other curves used across these docs

| Curve | Where | Source |
|---|---|---|
| `cubic-bezier(0.3, 0.7, 0.4, 1)` | Comeau 3D button rest/release, 600 ms | [Cited] |
| `cubic-bezier(0.3, 0.7, 0.4, 1.5)` | Comeau 3D button hover overshoot, 250 ms | [Cited] |
| `ease` | Sonner toasts | [Cited] Emil |
| `ease-out` 0.125 s | tooltips | [Cited] Emil |
| `cubic-bezier(0.65,0,0.35,1)` (easeInOutCubic) | circular VT reveal, 500 ms | [Reference build] |
| `cubic-bezier(0.76,0,0.24,1)` (easeInOutQuart) | curtain/wipe page transition, 600–800 ms | [Reference build] |
| `cubic-bezier(0.22,1,0.36,1)` (easeOutQuint) | ripple 550 ms; UI default `--ease-out` | [Reference build] |

### GSAP ease names used in these docs

`expo.out` (SplitText reveals), `expo.inOut` (blinds curtain), `power3` / `power3.out` / `power3.inOut` (quickTo followers, Flip), `elastic.out(1,0.4)` (magnetic return), `none` (scrubs and `containerAnimation` — **required** for horizontal-section container tweens). Source: GSAP docs and reference builds across these pages.

---

## 7. Springs with `linear()`

**[Cited]** — [Josh Comeau, linear()](https://www.joshwcomeau.com/animation/linear-timing-function/)

- `linear()` draws straight segments between points. Values > 1 overshoot.
- Springs need ~40–50+ points; an 11-point spring looked robotic.
- Example: `transition: transform 800ms linear(0, 0.6, 0.9, 1.08, 0.98, 1);`
- Generators:
  - **Linear() Easing Generator** (Jake Archibald and Adam Argyle) — derives the duration from settling time. URL used in the notes: `linear-easing-generator.netlify.app`.
  - **Easing Wizard** (`easingwizard.com`) — stiffness, damping, mass.
- A zero-damping spring can't be modelled.
- CSS shortens reversed transitions, so a spring rebound on interrupt "feels tight and unnatural". JS springs (React Spring) handle velocity-aware interruption better.
- 100+ point strings run as smoothly as trivial ones; three springs added ~1.3 kB gzipped. Reuse one string via a custom property.
- **Fallback pattern:** set a Bézier fallback in a custom property on `html`, override it inside `@supports (animation-timing-function: linear(0, 1))`, and wrap motion in `prefers-reduced-motion: no-preference`. Duplicating the `transition` declaration doesn't work as a fallback when using `var()`.

Support: `linear()` in all major browsers since Dec 2023; ~88% support in Oct 2025 ([Comeau](https://www.joshwcomeau.com/animation/linear-timing-function/)). See [browser-support.md](browser-support.md).

---

## 8. Reference motion-token stylesheet

**[Reference build]** — researcher-composed from easings.net + Material 3; untested. The `--spring-bouncy` string is "the well-known example output of the Linear() Easing Generator as I remember it" — **regenerate it rather than trusting the transcription** (the generator page could not be fetched; ECONNRESET).

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

Token names `--ease-out`, `--ease-out-expo`, `--ease-in-out`, `--ease-exit`, `--spring-bouncy`, `--dur-*` are used by every reference build in these docs.

---

## 9. Choreography and stagger

**[Reference build]** — stagger with a `--i` index and a capped delay.

```css
/* <li style="--i:0">…</li> … */
.list > * {
  opacity: 0; translate: 0 8px; filter: blur(4px);
  transition: opacity 300ms var(--ease-out), translate 400ms var(--ease-out), filter 300ms var(--ease-out);
  transition-delay: calc(min(var(--i), 8) * 35ms);  /* cap the stagger */
}
.list.is-in > * { opacity: 1; translate: 0; filter: blur(0); }
```

Reduced motion: wrap in `@media (prefers-reduced-motion: no-preference)` or keep only the opacity part (Editor's note, following Comeau's "opacity fades are safe").

### Choreography variants

| # | Name | Spec |
|---|---|---|
| 1 | Cascade | Linear stagger 20–50 ms |
| 2 | Center-out | delay = \|i − mid\| × 30 ms (GSAP `stagger:{from:"center"}`) |
| 3 | Grid diagonal | delay = (row + col) × 30 ms |
| 4 | Distance from cursor/click | compute distance in JS |
| 5 | Hero-first | shared element moves at t=0; content follows at +80–120 ms |
| 6 | Exit all at once, enter staggered | exits shouldn't stagger |
| 7 | Reverse-stagger on close | last in, first out |
| 8 | Split-property | opacity short (200 ms), transform long (400 ms): visible early, keeps settling |
| 9 | Two-axis arc | x on `ease-out`, y on `ease-in`, transitioned separately with `translate` + `margin`, or individual `translate` property plus `offset-path` |

Other stagger values in these docs: bento-grid staggered reveals `stagger: 0.08` ([MotionKit](https://motionkit.io/blog/web-animation-trends-2026), vendor); SplitText lines `stagger: 0.1` (docs) / 0.08–0.12 (sketch); per-char text roll `calc(var(--i)*18ms)`; masked per-word 0.04; curtain panels 0.06–0.08; GSAP Flip `stagger: .02`.

---

## 10. Disney's 12 principles mapped to UI

**[Synthesis]** — the researcher's own mapping; Val Head, Rachel Nabors and Sarah Drasner texts were **not** fetched.

| Principle | UI translation | Typical values |
|---|---|---|
| Squash & stretch | Toggle thumb widens while pressed; button squashes on press | `scale(0.97)` press; thumb `width +20%` on `:active` |
| Anticipation | Slight pull-back before a throw or send; icon dips before a launch | 60–100 ms pre-motion of −2 to −4 px |
| Staging | Dim the background and move focus to the modal; one hero motion at a time | backdrop fade 200 ms |
| Straight-ahead vs pose-to-pose | Keyframes (pose) vs physics springs (straight-ahead) | n/a |
| Follow-through & overlapping action | Children settle after the parent (stagger); overshoot springs | stagger 30 ms; damping 0.7–0.9 |
| Slow in / slow out | Easing curves | the tokens above |
| Arcs | Motion along a curve for FABs or shared elements (`offset-path`, or separate x and y easings) | x ease-out, y ease-in |
| Secondary action | Shadow grows as a card lifts; glare follows a tilt | — |
| Timing | Duration scaled to size, distance and frequency | — |
| Exaggeration | Celebratory bursts (like, success) only | overshoot 1.1–1.3 |
| Solid drawing | Consistent perspective and light source in tilt or 3D buttons | `perspective: 800–1200px` |
| Appeal | Personality via custom curves and springs, not defaults | — |

---

## 11. Studying inspiration properly

**[Synthesis]** When studying an inspiration site, record the **duration, easing, origin, stagger, and what happens on interrupt and on touch**. Copying the look without those values is what produces generic motion. Inspiration sources are listed in [README.md](README.md#inspiration-and-learning-sources).

## 12. Gaps

- Apple's HIG Motion page rendered empty to the fetcher, so there are no direct Apple quotes. Widely known themes (purposeful, brief, realistic, respect Reduce Motion, interruptible) are general knowledge, not cited. iOS default spring parameters weren't verified.
- Val Head (*Designing Interface Animation*), Rachel Nabors and Sarah Drasner (*SVG Animations*, Vue transitions writing) primary texts were not retrieved; the Disney mapping is the researcher's.
- The M3 "Expressive" motion scheme of 2025 (spring-first tokens) wasn't on the fetched page beyond the spring table; m3.material.io token pages are JS-rendered and didn't load.
- The linear() generator page couldn't be fetched (ECONNRESET); the `--spring-bouncy` string is unverified.
- No primary-source research quantifies user preference for "tasteful vs gimmicky" motion; the scroll-taste sources are opinion/vendor blogs (MotionKit, Digital Silk, UXPin, Tekysinfo), several of which sell animation services or tools.

---

## Sources

- Emil Kowalski, "Great animations" — https://emilkowal.ski/ui/great-animations
- Emil Kowalski, "7 practical animation tips" — https://emilkowal.ski/ui/7-practical-animation-tips
- animations.dev — https://animations.dev/
- Rauno Freiberg, Invisible Details of Interaction Design — https://rauno.me/craft/interaction-design
- Vercel Web Interface Guidelines — https://vercel.com/design/guidelines
- Josh Comeau, linear() — https://www.joshwcomeau.com/animation/linear-timing-function/
- Josh Comeau, 3D button — https://www.joshwcomeau.com/animation/3d-button/
- Josh Comeau, prefers-reduced-motion — https://www.joshwcomeau.com/react/prefers-reduced-motion/
- Next.js, Designing view transitions — https://nextjs.org/docs/app/guides/view-transitions
- Material Components Android, Motion.md — https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
- easings.net — https://easings.net/ ; source data https://raw.githubusercontent.com/ai/easings.net/master/src/easings.yml
- Design Experts Review Vibe Coded Websites (summary) — https://recapio.com/digest/design-experts-review-vibe-coded-websites-by-y-combinator
- engineered.at, Death to scroll fade (summary) — https://engineered.at/articles/death-to-scroll-fade-via-david-bushell
- feedbagel summary — https://feedbagel.com/post/critique-of-scroll-fade-animations-in-web-design
- MotionKit, web animation trends 2026 — https://motionkit.io/blog/web-animation-trends-2026
- Tekysinfo — https://tekysinfo.com/website-design-trends-heres-what-works-in-2026/
- CommArts, Immersive Garden — https://www.commarts.com/webpicks/immersive-garden
