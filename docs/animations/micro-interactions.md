# Micro-interactions

Rebuildable specs for every micro-interaction variant in the research: button press and feedback (scale, 3D push, ripple, magnetic, fill sweeps, gooey, loading morph, hold-to-confirm, shine), like/heart bursts, toggles, checkbox draw-in, form feedback (shake, floating label, focus ring), success checkmarks, copy-to-clipboard confirmation, hamburger → X menu morphs, and smaller patterns (tabs indicator, toast stacking, number ticker, badges, drag handles). Micro-interactions should give feedback within one or two frames of a press, use transform/opacity/SVG stroke, and be reserved for meaningful moments; build most with CSS + WAAPI. Celebratory ones may overshoot; frequent ones stay subtle. Markers: **[Cited]** fetched source; **[Reference build]** researcher-written, untested — tune the numbers; **[From memory]** not verified at source; **Editor's note** connective guidance. Token variables (`--ease-out`, `--ease-out-expo`, `--spring-bouncy`) are defined in [motion-principles-easing.md](motion-principles-easing.md#8-reference-motion-token-stylesheet).

## Contents

- [0. Rules that apply to all micro-interactions](#0-rules-that-apply-to-all-micro-interactions)
- [A. Button press and feedback (10 variants)](#a-button-press-and-feedback-10-variants)
- [B. Like / heart burst (6 variants)](#b-like--heart-burst-6-variants)
- [C. Toggle / switch morphs (6 variants)](#c-toggle--switch-morphs-6-variants)
- [D. Checkbox draw-in (5 variants)](#d-checkbox-draw-in-5-variants)
- [E. Form feedback (7 variants)](#e-form-feedback-7-variants)
- [F. Success checkmark (4 variants)](#f-success-checkmark-4-variants)
- [G. Copy-to-clipboard confirmation (4 variants)](#g-copy-to-clipboard-confirmation-4-variants)
- [H. Menu icon morph, hamburger → X (5 variants)](#h-menu-icon-morph-hamburger--x-5-variants)
- [I. Other micro-interactions](#i-other-micro-interactions)
- [Library choice](#library-choice)
- [Gaps](#gaps)
- [Sources](#sources)

---

## 0. Rules that apply to all micro-interactions

| Rule | Detail | Source |
|---|---|---|
| Press scale | `scale(0.97)` on `:active` | [Cited] [Emil Kowalski](https://emilkowal.ski/ui/7-practical-animation-tips) |
| Never from 0 | Entrances from ≥ 0.9 (Emil uses 0.93), not `scale(0)` | [Cited] Emil |
| Loading buttons | Keep the original label + add spinner; show-delay ~150–300 ms; min visible ~300–500 ms | [Cited] [Vercel](https://vercel.com/design/guidelines) |
| Optimistic UI | Update immediately, roll back or offer Undo on failure | [Cited] Vercel |
| Mobile tap | `touch-action: manipulation` (no double-tap zoom); hit targets ≥ 44 px | [Cited] Vercel |
| Tap highlight | `-webkit-tap-highlight-color: transparent` (or match the design); `user-select: none` on buttons | [Cited] [Comeau](https://www.joshwcomeau.com/animation/3d-button/) |
| Focus | Prefer `:focus-visible`; interactive states need more contrast than rest | [Cited] Vercel |
| Don't animate | Keyboard-initiated, high-frequency actions | [Cited] Emil, Rauno |
| Interruptible | Transitions/springs, not keyframes, for toggles | [Cited] Emil |
| Destructive | Commit on release (hold-to-confirm) | [Cited] [Rauno](https://rauno.me/craft/interaction-design) |
| SVG transforms | Apply to `<g>` wrappers for Safari | [Cited] Vercel |
| Avoid animating | `box-shadow`, `border` (expensive) — animate transform on layers instead | [Cited] Comeau |

Reduced motion (applies to every variant): author no-motion-first (`@media (prefers-reduced-motion: no-preference)`); keep opacity/colour feedback, drop translate/scale/bursts. See [performance-accessibility.md](performance-accessibility.md#reduced-motion-patterns).

---

## A. Button press and feedback (10 variants)

### A1. Scale press
**[Reference build]** `:active{transform:scale(.97)}`, 80–100 ms `ease-out` down, release 150–200 ms.

```css
@media (prefers-reduced-motion: no-preference) {
  .btn { transition: transform var(--dur-instant) var(--ease-out),
                     background-color var(--dur-fast) var(--ease-out); }
}
.btn:active { transform: scale(.97); }
```

Mobile: iOS Safari `:active` historically needs a `touchstart` listener on the document to fire — **not tested** this session.

### A2. 3D pushable button (Josh Comeau)
**[Cited]** — [Josh Comeau, 3D button](https://www.joshwcomeau.com/animation/3d-button/)

| Layer | Rest | Hover | Press |
|---|---|---|---|
| `.shadow` | `translateY(2px)` | `translateY(4px)` | `translateY(1px)` |
| `.edge` | darker gradient, fixed | — | — |
| `.front` | `translateY(-4px)` | `translateY(-6px)` | `translateY(-2px)` |

- Timing: rest and release 600 ms `cubic-bezier(0.3,0.7,0.4,1)`; hover 250 ms `cubic-bezier(0.3,0.7,0.4,1.5)` (overshoot); press **34 ms** (~two frames).
- Hover brightens with `filter: brightness(110%)`. `will-change: transform` on moving layers.
- Mobile: `-webkit-tap-highlight-color: transparent`, `user-select: none`.
- Focus: `:focus:not(:focus-visible){outline:none}`, `outline-offset: 4px`.
- Avoids animating `box-shadow` and `border`.

```css
/* Editor's note: assembled from the cited values; see Comeau's article for full markup/colours */
.pushable { position: relative; border: none; background: transparent; padding: 0; cursor: pointer;
  outline-offset: 4px; -webkit-tap-highlight-color: transparent; user-select: none; }
.pushable:focus:not(:focus-visible) { outline: none; }
.shadow, .edge, .front { position: absolute; inset: 0; border-radius: 12px; }
.shadow { transform: translateY(2px); will-change: transform;
  transition: transform 600ms cubic-bezier(.3,.7,.4,1); }
.front  { position: relative; display: block; transform: translateY(-4px); will-change: transform;
  transition: transform 600ms cubic-bezier(.3,.7,.4,1); }
.pushable:hover { filter: brightness(110%); }
.pushable:hover .front  { transform: translateY(-6px); transition: transform 250ms cubic-bezier(.3,.7,.4,1.5); }
.pushable:hover .shadow { transform: translateY(4px);  transition: transform 250ms cubic-bezier(.3,.7,.4,1.5); }
.pushable:active .front  { transform: translateY(-2px); transition: transform 34ms; }
.pushable:active .shadow { transform: translateY(1px);  transition: transform 34ms; }
```

### A3. Ripple (Material-style, positioned from the pointer)
**[Reference build]**

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

- 550 ms easeOutQuint; WAAPI is 0 kb, off-main-thread for transform/opacity, promise-based `finished`.
- Works on touch (pointerdown) — a good `:hover` substitute on mobile.

### A4. Magnetic button
**[Reference build]**

- Desktop only: gate behind `@media (hover:hover) and (pointer:fine)` (in JS: `matchMedia`).
- On `pointermove` within bounds: translate by (pointer − center) × 0.3, capped ~12 px; inner label × 0.15 for parallax.
- Use `gsap.quickTo(el,'x',{duration:.4,ease:'power3'})` or a rAF lerp.
- On `pointerleave`: spring back with `elastic.out(1,0.4)` or a `linear()` spring over ~600 ms.
- MotionKit lists cursor micro-interactions (magnetic buttons) as a rising 2026 trend ([MotionKit](https://motionkit.io/blog/web-animation-trends-2026), vendor). Larose's "Sticky (magnetic) Cursor" tutorial — [blog.olivierlarose.com](https://blog.olivierlarose.com/).

```js
// Editor's note: minimal wiring of the cited spec above; untested
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const xTo = gsap.quickTo(btn, 'x', { duration: .4, ease: 'power3' });
  const yTo = gsap.quickTo(btn, 'y', { duration: .4, ease: 'power3' });
  const clamp = (v) => Math.max(-12, Math.min(12, v));
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    xTo(clamp((e.clientX - (r.left + r.width / 2)) * 0.3));
    yTo(clamp((e.clientY - (r.top + r.height / 2)) * 0.3));
  });
  btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,0.4)' }));
}
```

### A5. Fill sweep from the cursor side (direction-aware)
**[Reference build]** `::before` with `transform: scaleX(0)`; on `pointerenter` set `transform-origin` to `left` or `right` depending on `e.offsetX < width/2`. 350 ms `--ease-out-expo`. Text colour switches with `mix-blend-mode: difference` or a transitioned `color`.

### A6. Circle fill from the cursor
**[Reference build]** `::before` circle positioned at `--x`/`--y` (set on `pointerenter`), `scale 0 → 2.5` over 450 ms.

### A7. Liquid / gooey button
**[Reference build]**, filter values **[From memory]** (originals: Codrops "Creative Gooey Effects" (2015) and CSS-Tricks "The Gooey Effect" returned 403/404). Blobs inside a `filter:url(#goo)` container move on hover. Mechanism: blur followed by an alpha-contrast `feColorMatrix`.

```html
<svg width="0" height="0"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="b"/>
<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="g"/>
<feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></svg>
```

- Alpha row `0 0 0 18 -7` is sometimes cited as `19 -9` — unverified.
- SVG filters repaint every frame (no compositor): keep the filtered area small; avoid on low-end mobile.

### A8. Loading morph
**[Reference build]** Button width collapses to a circle with a spinner, then a checkmark draws in (see F). Animate width with FLIP (scaleX on a background layer) to avoid layout cost, or accept layout on a single small element. Keep Vercel's label/spinner timing rules.

### A9. Hold-to-confirm
**[Reference build]** `::after` progress bar `scaleX(0 → 1)` over 1.2–2 s `linear` while `:active`; reverses fast (200 ms) on release — interruptible. For destructive actions (Rauno's "commit on release").

### A10. Shine sweep (premium CTA)
**[Reference build]** Gradient `::after` translated −100% → 200% over 700 ms on hover. Play once; don't loop.

Button fill-sweep extras (border draw, `mix-blend-mode: difference` invert, icon slide-through, gradient position shift) are in [hover-effects.md](hover-effects.md#f-button-fill-sweeps).

---

## B. Like / heart burst (6 variants)

**[Reference build]**

| # | Variant | Spec |
|---|---|---|
| 1 | Pop | `scale 1 → 0.8 (80ms) → 1.25 → 1`, spring ~450 ms; colour flips at 80 ms |
| 2 | Particle ring | 6–10 dots at `rotate(calc(var(--i)*36deg)) translateY(-18px → -28px)`, `opacity 1 → 0` over 500 ms, plus a `radial-gradient` circle that expands and fades ("Twitter heart") |
| 3 | Sprite-sheet (Twitter's original) | `steps(28)` across a sprite PNG — frame count **[From memory]**, not verified |
| 4 | Lottie or Rive | Designer-made burst (LottieFiles, Rive community) — see [svg-lottie-rive.md](svg-lottie-rive.md) |
| 5 | Count roll | Number rolls up via two stacked digits in an `overflow:hidden` box translating by −100% |
| 6 | Unlike | No burst; scale to 0.9 and back over 150 ms (asymmetric feedback is fine) |

```css
/* Editor's note: illustrative wiring of variants 1–2; untested */
.like[aria-pressed="true"] .heart { animation: pop 450ms var(--spring-bouncy); }
@keyframes pop { 0% { scale: 1 } 18% { scale: .8 } 60% { scale: 1.25 } 100% { scale: 1 } }
.like .dot { position: absolute; transform: rotate(calc(var(--i) * 36deg)) translateY(-18px); opacity: 0; }
.like[aria-pressed="true"] .dot { animation: burst 500ms var(--ease-out); }
@keyframes burst { from { opacity: 1; transform: rotate(calc(var(--i) * 36deg)) translateY(-18px); }
                   to   { opacity: 0; transform: rotate(calc(var(--i) * 36deg)) translateY(-28px); } }
@keyframes sprite { to { background-position: 100% 0; } } /* variant 3: animation: sprite 800ms steps(28) */
```

A11y: `<button aria-pressed>`; exaggeration (overshoot 1.1–1.3) only for celebratory bursts. Reduced motion: colour flip only.

---

## C. Toggle / switch morphs (6 variants)

**[Reference build]**

| # | Variant | Spec |
|---|---|---|
| 1 | Thumb slide | `translate` 300 ms `--spring-bouncy` |
| 2 | Stretch on press | Thumb width 20 → 26 px on `:active`, `transform-origin` toward travel direction (squash & stretch) |
| 3 | Icon morph (sun → moon) | SVG `<circle>` mask moves in to carve a crescent; rays scale to 0 with 20 ms stagger |
| 4 | Day/night background | 400 ms crossfade behind the thumb |
| 5 | Pill → check | Thumb shows a check path that draws in when on |
| 6 | Haptic-like bounce | Track `scaleX(1.04)` on change, 120 ms |

A11y: build on `<input type=checkbox role=switch>` or `<button aria-pressed>`; the animation is purely decorative.

```css
/* Editor's note: illustrative; untested */
.switch input { appearance: none; width: 44px; height: 24px; border-radius: 99px; position: relative; }
.switch input::before { content: ''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px;
  border-radius: 50%; background: white; transition: translate 300ms var(--spring-bouncy), width 120ms var(--ease-out); }
.switch input:active::before { width: 26px; }
.switch input:checked::before { translate: 20px; }
```

Dark-mode toggles can pair with the circular VT reveal in [page-transitions.md](page-transitions.md#54-circular-reveal-from-click-point-also-for-dark-mode-toggles).

---

## D. Checkbox draw-in (5 variants)

**[Reference build]**

```css
.check path { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset 250ms var(--ease-out) 60ms; }
input:checked + svg .check path { stroke-dashoffset: 0; }
input:checked + svg .box { transform: scale(.9); transition: transform 100ms; } /* tiny press */
```

Variants:
1. Box fills with a scale-from-center.
2. Strike-through on the todo label (`background-size: 0 → 100%` of a 2 px line).
3. Indeterminate dash morph.
4. Confetti on "all done" only.
5. Radio dot scaling 0.5 → 1 with overshoot.

Editor's note: with `pathLength="1"` on the check path you can use `stroke-dasharray: 1; stroke-dashoffset: 1` instead of measuring (see [svg-lottie-rive.md](svg-lottie-rive.md#line-drawing)).

---

## E. Form feedback (7 variants)

**[Reference build]**

1. **Error shake**:
   ```js
   el.animate([{translate:'0'},{translate:'-6px'},{translate:'5px'},{translate:'-4px'},{translate:'3px'},{translate:'0'}],
     {duration:400,easing:'ease-out'});
   ```
   Under reduced motion, replace with a colour or outline pulse. Always pair with a text error and `aria-invalid` / `aria-describedby`.
2. **Floating label**: label translates and scales to 0.85 on `:focus` or `:not(:placeholder-shown)`, 150 ms.
3. **Focus ring grow**: `outline-offset 0 → 3px`, 120 ms.
4. **Inline valid tick**: check draws in at the field end.
5. **Password strength bar**: `scaleX` + colour transition.
6. **Submit**: button → spinner → check (A8 + F).
7. **Character counter**: colour shift near the limit + a single 1.1× pulse on overflow.

```css
/* Editor's note: illustrative for 2–3; untested */
.field label { transform-origin: left top; transition: transform 150ms var(--ease-out); }
.field input:focus + label,
.field input:not(:placeholder-shown) + label { transform: translateY(-1.2em) scale(.85); }
.field input:focus-visible { outline-offset: 3px; transition: outline-offset 120ms var(--ease-out); }
```

---

## F. Success checkmark (4 variants)

**[Reference build]**

1. **Circle draws** (`stroke-dashoffset`, 400 ms) **then check draws** (250 ms, delay 300 ms); whole icon scales 0.9 → 1.05 → 1.
2. **Filled disc pops** with a spring; check cut out via a mask.
3. **Confetti burst** — checkout success only.
4. **Morph from the button**: the button's VT name morphs into a success card ([page-transitions.md](page-transitions.md#53-shared-element-morph-thumbnail--hero-card--detail)).

```css
/* Editor's note: illustrative for variant 1, using pathLength="1" on both paths; untested */
.success circle, .success .tick { fill: none; stroke-dasharray: 1; stroke-dashoffset: 1; }
.success.is-on circle { animation: draw 400ms var(--ease-out) forwards; }
.success.is-on .tick  { animation: draw 250ms var(--ease-out) 300ms forwards; }
.success.is-on { animation: settle 600ms var(--ease-out); }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes settle { 0% { scale: .9 } 60% { scale: 1.05 } 100% { scale: 1 } }
```

---

## G. Copy-to-clipboard confirmation (4 variants)

**[Reference build]**

1. **Icon swap with blur crossfade**: copy icon → `opacity 0` + `scale(.8)` + `blur(2px)`; check icon from `scale(.8)` + `blur(2px)` → `scale(1)` + `blur(0)`; both 150–200 ms; revert after 1.5–2 s (Emil's blur tip).
2. **Label swap** ("Copy" → "Copied!") with vertical roll text (see [hover-effects.md text roll](hover-effects.md#c1-text-roll-duplicate-line)).
3. **Tooltip "Copied"** appears from the trigger origin.
4. **Toast** for copying larger content.

A11y: announce the change with an `aria-live="polite"` region.

```css
/* Editor's note: illustrative for variant 1; untested */
.copy .icon { transition: opacity 180ms var(--ease-out), scale 180ms var(--ease-out), filter 180ms var(--ease-out); }
.copy .icon-check { opacity: 0; scale: .8; filter: blur(2px); }
.copy.is-copied .icon-copy  { opacity: 0; scale: .8; filter: blur(2px); }
.copy.is-copied .icon-check { opacity: 1; scale: 1; filter: blur(0); }
```

---

## H. Menu icon morph, hamburger → X (5 variants)

**[Reference build]**

```css
.burger span { display:block; height:2px; width:22px; background:currentColor;
  transition: transform 300ms var(--ease-out), opacity 150ms; }
.burger span + span { margin-top: 6px; }
[aria-expanded="true"] .burger span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
[aria-expanded="true"] .burger span:nth-child(2) { opacity: 0; transform: scaleX(0); }
[aria-expanded="true"] .burger span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
```

Variants:
- **Collapse then rotate** (two-step): lines translate to center (150 ms), then rotate (150 ms), by sequencing `transition-delay` and swapping delays on close.
- **Two-line burger → X**.
- **Burger → arrow (back)**.
- **SVG path morph** via MorphSVG, or CSS `d:` path transitions (Chromium and Firefox; not dependable in Safari).
- **Rotate the whole icon 180°** while morphing.

A11y: the toggle is a `<button aria-expanded>`; animation is decorative.

---

## I. Other micro-interactions

**[Reference build]**

| Pattern | Spec |
|---|---|
| Tabs | Sliding indicator via `translate` + `scaleX`, or Motion `layoutId` "magic underline", or CSS anchor positioning ([layout-state-animation.md](layout-state-animation.md)) |
| Segmented control pill | Same sliding indicator |
| Accordion chevron | Rotate 180° over 200 ms; content opens via the grid `0fr → 1fr` trick |
| Toast | Sonner-style stacking: scaled, offset cards behind; swipe-to-dismiss with velocity (Sonner uses `ease`, slightly slower — [Cited] Emil). Element entry via `@starting-style { .toast { opacity:0; translate: 0 100%; } }` |
| Number ticker | CSS `@property --n` integer interpolation with `counter-reset: n var(--n)` |
| Notification badge | Pop with a spring |
| Drag handles | Lift: `scale 1.02`, shadow layer fading in, 1–2° rotate |
| Tooltips | 125 ms ease-out from `scale(0.97)`; group peers instant via `[data-instant]` ([Cited] Emil) |

```css
/* Number ticker — Editor's note: standard @property pattern wired to the spec above; untested */
@property --n { syntax: '<integer>'; inherits: false; initial-value: 0; }
.ticker { transition: --n 800ms var(--ease-out); counter-reset: n var(--n); }
.ticker::after { content: counter(n); font-variant-numeric: tabular-nums; }
.ticker.is-done { --n: 1280; }
```

Gestures (swipe-to-dismiss sheets/toasts): commit destructive actions on release, velocity thresholds ~0.5 px/ms or 30–40% of distance (**[Synthesis]**), rubber-band past limits — [Rauno](https://rauno.me/craft/interaction-design).

---

## Library choice

**[Synthesis]**

| Need | First choice |
|---|---|
| Hover, press, focus, toggles, popovers | Plain CSS transitions + `@starting-style` (0 kb, compositor-friendly, interruptible) |
| Spring feel without JS | CSS `linear()` tokens (fixed duration; weaker on interrupt) |
| Imperative one-shots (shake, burst, ripple) | WAAPI `el.animate()` (0 kb, off-main-thread for transform/opacity, promise `finished`) |
| Physics-first React | React Spring (velocity-aware interruption) |
| Designer-made bursts/icons | Lottie/dotLottie, Rive |

See [libraries.md](libraries.md).

## Gaps

- Gooey filter values (`0 0 0 18 -7`, sometimes `19 -9`) not verified at source.
- Twitter heart sprite frame count (28) from memory.
- iOS Safari `:active` behaviour (historically needs a document `touchstart` listener) not tested.
- Inspiration sources (Uiverse returned 403; hover.dev, ui-movement.com, rive.app/community, lottiefiles.com, dribbble.com/tags/micro-interaction, mobbin.com, motion.dev/examples) not verified this session.

---

## Sources

- Emil Kowalski, 7 practical animation tips — https://emilkowal.ski/ui/7-practical-animation-tips
- Emil Kowalski, Great animations — https://emilkowal.ski/ui/great-animations
- Josh Comeau, 3D button — https://www.joshwcomeau.com/animation/3d-button/
- Vercel Web Interface Guidelines — https://vercel.com/design/guidelines
- Rauno, Invisible Details of Interaction Design — https://rauno.me/craft/interaction-design
- MotionKit, trends 2026 — https://motionkit.io/blog/web-animation-trends-2026
- Olivier Larose — https://blog.olivierlarose.com/
- Codrops "Creative Gooey Effects" (2015) and CSS-Tricks "The Gooey Effect" — named in notes; not retrievable (403/404)
