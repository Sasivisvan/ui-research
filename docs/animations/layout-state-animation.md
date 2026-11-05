# Layout and State Animation

How to animate layout and state changes: FLIP (measure, invert, play), library automations (Motion `layout`/`layoutId`/`AnimatePresence`, GSAP Flip, AutoAnimate, Vue `TransitionGroup`, Svelte `animate:flip`, React `<ViewTransition update>`), entry/exit for top-layer UI and `display:none` toggles with `@starting-style` + `transition-behavior: allow-discrete`, and `height: auto` via the cross-browser `grid-template-rows: 0fr → 1fr` technique with `interpolate-size: allow-keywords` as a Chromium-only enhancement. Markers: **[Cited]** fetched source; **[Reference build]** researcher-written, untested; **[Prior knowledge]** API details not verified this session; **[Synthesis]** inference; **Editor's note** connective guidance. Tokens are in [motion-principles-easing.md](motion-principles-easing.md#8-reference-motion-token-stylesheet).

## Contents

- [1. Which tool for which layout change](#1-which-tool-for-which-layout-change)
- [2. FLIP](#2-flip)
- [3. Dialog / popover entry and exit with @starting-style](#3-dialog--popover-entry-and-exit-with-starting-style)
- [4. Discrete properties: allow-discrete](#4-discrete-properties-allow-discrete)
- [5. height: auto — grid 0fr→1fr and interpolate-size](#5-height-auto--grid-0fr1fr-and-interpolate-size)
- [6. Elements entering the DOM](#6-elements-entering-the-dom)
- [7. Exit before removal](#7-exit-before-removal)
- [8. Shared layout / magic move](#8-shared-layout--magic-move)
- [9. Grid reorder and filter](#9-grid-reorder-and-filter)
- [10. AutoAnimate](#10-autoanimate)
- [11. Number and size morphs with @property](#11-number-and-size-morphs-with-property)
- [12. Performance](#12-performance)
- [13. Mobile and accessibility](#13-mobile-and-accessibility)
- [14. Outdated techniques](#14-outdated-techniques)
- [15. Gaps](#15-gaps)
- [Sources](#sources)

---

## 1. Which tool for which layout change

**[Synthesis]**

| Change | First choice | Notes |
|---|---|---|
| Dialog/popover/toast enter + exit | CSS `@starting-style` + `allow-discrete` | 0 kb, Baseline 2024 |
| Accordion / `height: auto` | `grid-template-rows: 0fr → 1fr` | + `interpolate-size` enhancement (Chromium 129+) |
| React layout / shared layout / exit | Motion `layout`, `layoutId`, `AnimatePresence` | ~5 kb (LazyMotion) to ~43 kb; JS FLIP internally |
| React, native | `<ViewTransition update / exit / share>` (React 19.3) | Fires on DOM mutation or sibling-caused size/position change |
| List add/remove/reorder | AutoAnimate | One line; little control |
| Grid reorder/filter, any framework | GSAP Flip or `document.startViewTransition` + `match-element` | |
| Vue | `<Transition>` / `<TransitionGroup>` (built-in FLIP move classes) | |
| Svelte | `animate:flip`, `svelte/transition` | Built-in, compiled |

---

## 2. FLIP

**[Cited]** — [Paul Lewis, FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)

- **F**irst: record the start rect. **L**ast: apply the end state and measure. **I**nvert: a transform back to the start. **P**lay: remove the transform with a transition.
- "There is a window of 100ms after someone interacts with your site where you're able to do work without them noticing" — measure there; keep motion on transform and opacity.
- WAAPI simplifies Play to `el.animate([{transform: inverted}, {transform:'none'}])`.
- Scaling can distort content, which may require restructuring markup (counter-scale children, or Motion's built-in scale correction).

```js
// Editor's note: minimal FLIP from the cited steps; untested
const first = el.getBoundingClientRect();
applyNewLayout();                              // L: mutate DOM / classes
const last = el.getBoundingClientRect();
const dx = first.left - last.left, dy = first.top - last.top;
const sx = first.width / last.width, sy = first.height / last.height;
el.animate(
  [{ transformOrigin: 'top left', transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
   { transformOrigin: 'top left', transform: 'none' }],
  { duration: 300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
);
```

INP: batch all `getBoundingClientRect()` reads before any writes (no read/write interleaving — also in [Vercel guidelines](https://vercel.com/design/guidelines) "batch reads/writes").

---

## 3. Dialog / popover entry and exit with @starting-style

**[Cited]** — [MDN @starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)

- Baseline 2024 (newly available Aug 2024).
- MDN popover example transitions `opacity`, `transform`, `overlay 0.7s allow-discrete` and `display 0.7s allow-discrete`, with `@starting-style { [popover]:popover-open { opacity:0; transform:scaleX(0) } }` placed **after** the open rule (same specificity).
- `::backdrop` needs its own standalone `@starting-style` — nesting doesn't work for pseudo-elements.
- Exit goes to the default (closed) style, not the starting style.
- Keyframe animations don't need `@starting-style`.

**[Reference build]** dialog, no JS animation:

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

- Mobile variant: bottom sheet translating from 100% over 350 ms `--ease-out-expo`, exiting over 250 ms.
- Popovers should scale from their trigger (`var(--transform-origin)` Base UI / `var(--radix-dropdown-menu-content-transform-origin)` Radix) — [Emil Kowalski](https://emilkowal.ski/ui/7-practical-animation-tips).
- Staging: backdrop fade ~200 ms (Disney mapping, [Synthesis]).

---

## 4. Discrete properties: allow-discrete

**[Reference build]** `transition-behavior: allow-discrete` lets `display`, `content-visibility` and `overlay` flip at the right moment — at the end on exit, at the start on entry. Pair with `@starting-style`. Supersedes display-toggling with `animationend` listeners.

---

## 5. height: auto — grid 0fr→1fr and interpolate-size

**[Reference build]** cross-browser accordion:

```css
.panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 300ms var(--ease-out); }
.panel > div { overflow: hidden; }
.open .panel { grid-template-rows: 1fr; }
```

Enhancement: `:root{interpolate-size:allow-keywords}` + `height:0 → auto`.

**[Cited]** — [MDN interpolate-size](https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size); [caniuse](https://caniuse.com/mdn-css_properties_interpolate-size)

- `interpolate-size: allow-keywords` on `:root` (inherited) allows `height: 2.5rem ↔ max-content` and similar. One end must be a length-percentage.
- Use `calc-size()` only when the value also needs calculation (it applies `allow-keywords` implicitly).
- **Chromium-only (129+)**; Safari no (through 27.3), Firefox no (through 162); 73.9% global; MDN "Limited availability", experimental.

```css
/* Editor's note: progressive enhancement layering of the two cited techniques */
@supports (interpolate-size: allow-keywords) {
  :root { interpolate-size: allow-keywords; }
}
```

Caveats: height animation triggers layout every frame — keep it to small regions and few simultaneous items. For `<details>`, animate `::details-content` (**support not verified**). Accordion chevron: rotate 180° over 200 ms.

---

## 6. Elements entering the DOM

**[Reference build]** toast, list item: `@starting-style { .toast { opacity:0; translate: 0 100%; } }` — no JS class-toggling needed. Supersedes the `setTimeout`-before-adding-class trick.

---

## 7. Exit before removal

**[Reference build]**

```js
await el.animate([/* keyframes */], { duration: 150 }).finished;
el.remove();
```

React: Motion `AnimatePresence` — `mode="popLayout"` lets siblings reflow immediately; `mode="wait"` sequences them — or `<ViewTransition exit>`. (**[Prior knowledge]** for Motion mode names; motion.dev not fetched.)

Exits ≈ 60–75% of enter duration; exit all at once, don't stagger ([motion-principles-easing.md](motion-principles-easing.md#9-choreography-and-stagger)).

---

## 8. Shared layout / magic move

**[Reference build]** (Motion details **[Prior knowledge]**)

- Motion `layoutId="underline"` for tab indicators and expanding cards (the App Store card pattern), or VT names.
- Motion `layout` on the parent + `layout="position"` on text children avoids text distortion — the FLIP-scale-distortion fix. Scale correction is built into Motion; with manual FLIP, counter-scale children.
- React native alternative: `<ViewTransition update>` fires when DOM mutations happen inside it, or its size/position changes because of a sibling — [react.dev](https://react.dev/reference/react/ViewTransition) **[Cited]**.

```jsx
// Editor's note: illustrative Motion tabs indicator; API from prior knowledge, verify at motion.dev
{tabs.map(t => (
  <button key={t.id} onClick={() => setActive(t.id)}>
    {t.label}
    {active === t.id && <motion.span layoutId="underline" className="underline" />}
  </button>
))}
```

Motion caveat **[Cited]**: some Motion animations run on rAF (main thread) and can lag under load; CSS/WAAPI are hardware-accelerated — [Emil Kowalski](https://emilkowal.ski/ui/great-animations). Bundle: LazyMotion + `m` ~5 kb vs full `motion` ~43 kb (conflicting third-party figures; see [libraries.md](libraries.md)).

---

## 9. Grid reorder and filter

**[Reference build]** (GSAP Flip option names **not verified**)

- GSAP Flip: `Flip.getState(items)` → mutate → `Flip.from(state, { duration: .5, ease: 'power3.inOut', stagger: .02, absolute: true, onEnter: fadeIn, onLeave: fadeOut })`.
- AutoAnimate.
- `document.startViewTransition` with `view-transition-name: match-element` on items and `view-transition-class: item`.

```js
// GSAP Flip — Editor's note: assembled from the spec above
const state = Flip.getState('.item');
applyFilter();
Flip.from(state, {
  duration: .5, ease: 'power3.inOut', stagger: .02, absolute: true,
  onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .9 }, { opacity: 1, scale: 1 }),
  onLeave: els => gsap.to(els, { opacity: 0, scale: .9 })
});
```

```css
/* VT variant */
.item { view-transition-name: match-element; view-transition-class: item; }
::view-transition-group(.item) { animation-duration: .4s; }
```

---

## 10. AutoAnimate

**[Cited]** — [AutoAnimate](https://auto-animate.formkit.com/)

- "Zero-config, drop-in"; animates a parent's immediate children on add, remove and move.
- Respects `prefers-reduced-motion` (disables itself).
- Sets a static parent to `position: relative`.
- Frameworks: React (`useAutoAnimate`), Vue (directive and Nuxt), Preact, Solid, Svelte, Angular, Marko.
- Plugin function can return a custom `KeyframeEffect` for `add` / `remove` / `remain`.

```jsx
// Editor's note: typical usage of the cited React hook
const [parent] = useAutoAnimate();
return <ul ref={parent}>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
```

---

## 11. Number and size morphs with @property

**[Reference build]** `@property`-registered `<number>`, `<length>` and `<color>` custom properties become animatable — for counters, progress rings (`conic-gradient` with `--p`), and gradient stops. Number ticker example in [micro-interactions.md](micro-interactions.md#i-other-micro-interactions).

```css
/* Progress ring — Editor's note: illustrative; untested */
@property --p { syntax: '<number>'; inherits: false; initial-value: 0; }
.ring { background: conic-gradient(currentColor calc(var(--p) * 1%), transparent 0);
        transition: --p 600ms var(--ease-out); border-radius: 50%; }
.ring[data-done] { --p: 75; }
```

---

## 12. Performance

- **[Cited]** Only `transform` and `opacity` (plus `filter` in most engines) stay on the compositor. web.dev's test dropped 50% of frames with top/left vs 1% with transform, and spent 37 ms rendering + 79 ms painting vs zero — [web.dev animations guide](https://web.dev/articles/animations-guide).
- **[Cited]** `will-change` only for elements about to change; add shortly before, remove after. Check with Chrome Performance → Summary (Rendering), Rendering tab FPS meter (~99% frames delivered), Paint Flashing — [web.dev](https://web.dev/articles/animations-guide).
- **[Synthesis]** INP: pointer handlers must return quickly; batch reads then writes; paint feedback (press state) before heavy work; defer with `requestAnimationFrame` → `setTimeout`, or `scheduler.yield()`.
- Many VT-named elements = many layers; name only what morphs.

More in [performance-accessibility.md](performance-accessibility.md).

## 13. Mobile and accessibility

- Reduced motion: AutoAnimate and Astro ClientRouter disable themselves automatically; **React VT and Motion layout do not** — handle yourself ([Astro](https://docs.astro.build/en/guides/view-transitions/), [AutoAnimate](https://auto-animate.formkit.com/), [react.dev](https://react.dev/reference/react/ViewTransition)). In Motion, `useReducedMotion()` — Emil's sidebar sets closed `x` to `0` instead of `"-100%"` ([Emil](https://emilkowal.ski/ui/great-animations)).
- Prefer swapping translate/scale for opacity crossfades where motion carries meaning.
- Bottom sheets on mobile: 350 ms in / 250 ms out; swipe-to-dismiss commits on release with velocity threshold (~0.5 px/ms or 30–40% distance, [Synthesis]).

## 14. Outdated techniques

**[Synthesis]**

- JS-measured `max-height: 9999px` hacks → grid trick or `interpolate-size`.
- `setTimeout`-before-adding-class for entry → `@starting-style`.
- Display-toggling with `animationend` listeners → `allow-discrete`.
- `translateZ(0)` layer hacks → `will-change`, sparingly.

## 15. Gaps

- motion.dev docs not fetched (connection resets): `layout="position"`, `AnimatePresence` modes, `useReducedMotion` come from prior knowledge plus Emil's cited example.
- GSAP Flip option names not verified.
- `::details-content` support not verified.
- No quantitative source on the INP cost of view transitions or animation libraries.

---

## Sources

- Paul Lewis, FLIP Your Animations — https://aerotwist.com/blog/flip-your-animations/
- MDN, @starting-style — https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
- MDN, interpolate-size — https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size
- caniuse, interpolate-size — https://caniuse.com/mdn-css_properties_interpolate-size
- caniuse, calc-size — https://caniuse.com/mdn-css_types_calc-size
- AutoAnimate — https://auto-animate.formkit.com/
- react.dev, ViewTransition — https://react.dev/reference/react/ViewTransition
- web.dev, animations guide — https://web.dev/articles/animations-guide
- Vercel Web Interface Guidelines — https://vercel.com/design/guidelines
- Emil Kowalski — https://emilkowal.ski/ui/great-animations ; https://emilkowal.ski/ui/7-practical-animation-tips
- Astro, View transitions — https://docs.astro.build/en/guides/view-transitions/
