# Text Animations

Text splitting and every text effect variant in the research: GSAP SplitText (free since 3.13, rewritten "50% smaller"), its alternatives (Splitting.js, manual spans, SplitType — maintenance unverified), ScrambleText, the masked line rise, char cascades, scroll-lit paragraphs, typewriter, variable-font weight waves, velocity marquees, shine text, text on a path, disperse, 3D perspective text, kinetic poster type, and hover text effects (roll, scramble, weight shift). Typography with masked line reveals is what reads as "crafted"; MotionKit names kinetic and variable typography a top 2026 trend. Markers: **[Cited]** fetched source; **[Sketch]** / **[Reference build]** researcher-composed, untested; **[Synthesis]** inference; **Editor's note** connective guidance.

## Contents

- [1. Splitting text](#1-splitting-text)
  - [GSAP SplitText](#gsap-splittext)
  - [Alternatives](#alternatives)
- [2. Canonical masked-lines reveal](#2-canonical-masked-lines-reveal)
- [3. ScrambleTextPlugin](#scrambletextplugin)
- [4. Variable-font animation](#4-variable-font-animation)
- [5. Text variant catalogue (a–l)](#5-text-variant-catalogue-al)
- [6. Text hover variants](#6-text-hover-variants)
- [7. Named tutorials](#7-named-tutorials)
- [8. Accessibility](#8-accessibility)
- [9. Mobile and performance](#9-mobile-and-performance)
- [10. Gaps](#10-gaps)
- [Sources](#sources)

---

## 1. Splitting text

### GSAP SplitText

**[Cited]** — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/); [GSAP 3.13 blog](https://gsap.com/blog/3-13/)

Free (incl. commercial) since 3.13 (April 2025). 3.13 rewrite: "50% smaller, 14 new features", screen-reader a11y attributes, responsive re-splitting, built-in masking.

| Option | Behaviour |
|---|---|
| `type` | `chars`, `words`, `lines` (combinable, e.g. `"words,lines"`) |
| `mask` | One of `lines`, `words`, `chars`; adds an `overflow: clip` wrapper for reveal-from-below (replaces manual `overflow:hidden` nesting — [Codrops 7 GSAP tips](https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/), snippet) |
| `autoSplit` | Re-splits on font load or width change. Create animations inside `onSplit()` and **return** them so SplitText can revert and time-sync |
| `linesClass` / `wordsClass` / `charsClass` | `"++"` appends numbered classes |
| `aria` | `"auto"`: `aria-label` on parent, `aria-hidden` on fragments. Links/nested elements not preserved → `aria:"none"` + a screen-reader-only duplicate |
| `deepSlice` | On by default; handles inline elements spanning lines |
| `propIndex` | Adds CSS vars like `--word: 3` |
| `smartWrap` | Avoids mid-word breaks when splitting chars only |
| `ignore` | e.g. `<sup>` |
| `prepareText()` | Languages without spaces |
| `wordDelimiter` | RegExp |
| `onSplit()` / `onRevert` | Lifecycle callbacks |

- Standalone mode works without GSAP core.
- Call `revert()` after the animation to cut DOM nodes.
- Breaking changes: `position:"absolute"`, `lineThreshold` and function-based `specialChars` removed.
- Webflow "Interactions with GSAP" uses SplitText as the foundation for text animation — [Webflow blog](https://webflow.com/blog/gsap-splittext-rewrite).
- GSAP 3.13 also tweens to CSS variables: `gsap.to(".t", { color: "var(--c)" })`.

### Alternatives

- **Splitting.js**: used for per-character `wght` + `wdth` keyframe loops — [Frontend Focus link](https://frontendfoc.us/link/68653/web). Current maintenance **not verified**.
- **SplitType**: named in gaps only; maintenance **not verified**.
- **Manual spans** **[Reference build]**: `<span style="--i:n">` per char with `aria-label` on the parent and `aria-hidden` on the chars.
- **CSS-only per-word** **[Sketch]**: `propIndex`'s `--word` var drives staggered `animation-range`.

---

## 2. Canonical masked-lines reveal

**[Cited]** verbatim pattern from the [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/):

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

- Webflow tutorial pattern: a `data-split="heading"` attribute + `SplitText.create` with `type:"lines"`, `autoSplit:true`, `mask:"lines"` — [Osmo masked text reveal](https://www.osmo.supply/resource/masked-text-reveal).
- Editor's note: the `gsap.set(".split", { opacity: 1 })` implies CSS hides `.split` until fonts load (`.split { opacity: 0 }`); under reduced motion keep it visible.

On scroll, attach a `scrollTrigger` to the tween (play-once with `toggleActions`), or IO.

---

<a id="scrambletextplugin"></a>
## 3. ScrambleTextPlugin

**[Cited]** — [GSAP ScrambleText docs](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/)

| Option | Default / values |
|---|---|
| `text` | Target text; `"{original}"` re-reveals the original |
| `chars` | `"upperCase"`, `"lowerCase"`, `"upperAndLowerCase"` or a custom string |
| `tweenLength` | true |
| `revealDelay` | 0 |
| `speed` | 1 |
| `delimiter` | `" "` for word-by-word |
| `rightToLeft` | — |
| `newClass` / `oldClass` | — |

- Community patterns: binary "matrix" `chars:"01"`, katakana, hover-to-scramble, looping "Loading..." with `chars:"."` — [freefrontend](https://freefrontend.com/scramble-text-plugin-js/); [Osmo scramble on load/scroll/hover](https://osmo.supply/resource/text-scramble-load-scroll-hover).
- Pages saying it "requires Club GSAP" are **outdated**.

```js
// Variant (d) below — Editor's note: assembled from the sketch values
el.addEventListener('pointerenter', () =>
  gsap.to(el, { duration: 0.8, scrambleText: { text: '{original}', chars: 'upperCase', revealDelay: 0.2, speed: 0.6 } }));
```

---

## 4. Variable-font animation

**[Cited]**

- Transition `font-variation-settings` on `:hover` for weight swells. Drive `wght` over page scroll with `animation-timeline: scroll(root)`. Many per-character spans can be CPU-heavy on mobile — [camoa dev-guides](https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/).
- Loop `wght` + `wdth` keyframes per character with Splitting.js. Custom axes use uppercase 4-letter tags — [Frontend Focus link](https://frontendfoc.us/link/68653/web).
- Which axes are animatable depends on the font — [Val Head](https://valhead.com/2020/11/15/animating-variable-fonts-with-css/).

```css
/* Editor's note: assembled from the cited techniques; untested */
.swell { font-variation-settings: "wght" 400; transition: font-variation-settings 300ms var(--ease-out); }
@media (hover: hover) { .swell:hover { font-variation-settings: "wght" 700; } }

@supports (animation-timeline: scroll()) {
  .scroll-weight { animation: weight 1ms linear both; animation-timeline: scroll(root); }
}
@keyframes weight { from { font-variation-settings: "wght" 200; } to { font-variation-settings: "wght" 900; } }
```

Reflow risk on weight change: use `font-optical-sizing` or a fixed-width container, or animate only single words.

---

## 5. Text variant catalogue (a–l)

All **[Sketch]**.

| | Variant | Spec |
|---|---|---|
| (a) | **Masked line rise** | SplitText `mask:"lines"`, `yPercent` 100 → 0, stagger 0.08–0.12, `expo.out` |
| (b) | **Char cascade with rotation** | chars `rotateX: -90`, `transformOrigin: "50% 50% -20px"`, stagger `{ each: 0.02, from: "start" }` |
| (c) | **Scroll-lit paragraph** | Words opacity 0.15 → 1 on `scrub` (Larose "Text Gradient Opacity On Scroll"). Pure CSS: each word `view()` with staggered `animation-range` via `--word` from `propIndex` |
| (d) | **Scramble decode on hover/enter** | ScrambleText `chars:"upperCase"`, `revealDelay:0.2`, `speed:0.6`. Lock width with `font-variant-numeric: tabular-nums` or monospace |
| (e) | **Typewriter** | CSS `steps(n)` on `width` in `ch` units with a `border-right` caret, or GSAP TextPlugin |
| (f) | **Variable-weight wave** | Per-char `font-variation-settings: "wght" calc(300 + var(--w)*600)`; `--w` driven by pointer distance (JS) or `scroll(root)` |
| (g) | **Velocity marquee** | Two copies of a text track with `xPercent` loop; Lenis velocity adds speed and flips direction. CSS-only: `@keyframes` `translate: -50%` with `animation-play-state: paused` on hover |
| (h) | **Gradient/shine text** | `background: linear-gradient(110deg, #888 40%, #fff 50%, #888 60%); background-size: 250% 100%; background-clip: text; color: transparent;` animated on `background-position` |
| (i) | **Text along path** | SVG `<textPath href="#curve" startOffset="X%">`, `startOffset` scrubbed by scroll (Larose "Text Along Path"), or CSS `offset-path` for single glyphs |
| (j) | **Disperse/explode on hover** | Chars random `x/y/rotate` on hover, return on leave (Larose "Text Disperse") |
| (k) | **3D perspective text** | Lines `rotateX` from 90deg in a `perspective: 1000px` parent |
| (l) | **Kinetic poster type** | Huge display type with `wdth`/`wght` axes and scale scrubbed in a pinned section |

Code for selected variants (Editor's note: written out from the specs above; untested):

```js
// (b) char cascade
SplitText.create('.cascade', { type: 'chars', onSplit: (self) =>
  gsap.from(self.chars, { rotateX: -90, opacity: 0, transformOrigin: '50% 50% -20px',
                          stagger: { each: 0.02, from: 'start' }, ease: 'expo.out', duration: 0.8 }) });

// (c) scroll-lit paragraph (GSAP)
SplitText.create('.lit', { type: 'words', onSplit: (self) =>
  gsap.fromTo(self.words, { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: '.lit', start: 'top 80%', end: 'bottom 40%', scrub: true } }) });
```

```css
/* (e) typewriter: 20 characters */
.type { width: 20ch; white-space: nowrap; overflow: hidden; border-right: 2px solid;
        animation: typing 2s steps(20) both; }
@keyframes typing { from { width: 0; } }

/* (g) CSS-only marquee: track contains two copies of the content */
.marquee__track { display: flex; width: max-content; animation: marquee 20s linear infinite; }
.marquee:hover .marquee__track { animation-play-state: paused; }
@keyframes marquee { to { translate: -50%; } }
@media (prefers-reduced-motion: reduce) { .marquee__track { animation: none; } }

/* (h) shine text */
.shine { background: linear-gradient(110deg, #888 40%, #fff 50%, #888 60%);
         background-size: 250% 100%; background-clip: text; -webkit-background-clip: text; color: transparent;
         animation: shine 3s linear infinite; }
@keyframes shine { from { background-position: 100% 0; } to { background-position: -100% 0; } }
```

Durations: text reveals 0.6–1.0 s; stagger 0.05–0.12 s; one easing family (`expo.out`/`power3.out`) — [motion-principles-easing.md §4](motion-principles-easing.md#4-scroll-page-taste-checklist-synthesis).

Intro use: curtain/shutter intros end with SplitText lines rising — [page-transitions.md §6](page-transitions.md#6-intro--preloader-sequences). Counter preloaders use tabular numerals and a masked-digit odometer roll.

---

## 6. Text hover variants

**[Reference build]** — full code in [hover-effects.md §C](hover-effects.md#c-text-hover-8-variants).

1. **Text roll** (duplicate line, `translate 0 -100%` over 450 ms `--ease-out-expo`; per-char delay `calc(var(--i)*18ms)`).
2. **Scramble/decode**: ~30–60 ms per tick, resolve left to right, total ~400–600 ms; fixed width.
3. **Weight shift**: `'wght' 400 → 700` over 300 ms.
4. **Letter-spacing breathe**: `.02em`; isolated headings only.
5. **Masked slide-up per word**: `yPercent 100 → 0`, stagger 0.04.
6. **Gradient sweep text**.
7. **Italic swap** crossfade.
8. **Marquee on hover** — pausable, off under reduced motion.

Copy-button label swap ("Copy" → "Copied!") reuses the vertical roll — [micro-interactions.md §G](micro-interactions.md#g-copy-to-clipboard-confirmation-4-variants). Like-count roll: two stacked digits in an `overflow:hidden` box translating −100%.

---

## 7. Named tutorials

**Olivier Larose text set** — [blog.olivierlarose.com](https://blog.olivierlarose.com/) (titles):

- Text Along Path
- **Text Gradient Opacity On Scroll** (words light up as you read)
- Text Clip Mask On Scroll
- Text Mask Animation
- Text Gooey (gooey `feGaussianBlur` + `feColorMatrix`)
- **Text Disperse**
- 3D Parallax Letters
- 3D Perspective Text
- Infinite Text Move On Scroll
- Text Parallax; Mask Cursor Effect (cursor reveals hidden text)

Other: [Osmo Supply](https://www.osmo.supply/resource/masked-text-reveal) (masked reveal, scramble on load/scroll/hover); [Codrops From SplitText to MorphSVG](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/) (5 demos built with Osmo; snippet only).

---

## 8. Accessibility

- **[Cited]** Split text must keep `aria-label` on the parent and `aria-hidden` on fragments (SplitText default `aria:"auto"`); links need `aria:"none"` + an sr-only copy — [SplitText docs](https://gsap.com/docs/v3/Plugins/SplitText/).
- **[Synthesis]** Never block reading: no text below ~0.3 opacity for long (scroll-lit paragraphs start at 0.15 — keep the scrub short).
- Marquees and looping text are auto-playing motion → pause control (WCAG 2.2.2; Vercel: > 5 s needs pause/stop/hide).
- Reduced motion: show text in its final state; `revert()` splits.
- Scramble: respect reduced motion; screen readers should get the final text (Editor's note: keep the real text in `aria-label`).

## 9. Mobile and performance

- Per-character variable-font animation is CPU-heavy on mobile — [camoa](https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/).
- Wait for `document.fonts.ready` before splitting; use `autoSplit` so lines re-split on width change.
- `revert()` after animating to reduce DOM nodes.
- Letter-spacing and weight changes relayout; transform/opacity don't.

## 10. Gaps

- SplitType and Splitting.js current maintenance not verified.
- No fetched source on GSAP TextPlugin options.
- Codrops pages (403) — only snippets.

---

## Sources

- GSAP SplitText docs — https://gsap.com/docs/v3/Plugins/SplitText/
- GSAP 3.13 blog — https://gsap.com/blog/3-13/
- GSAP ScrambleText docs — https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/
- Webflow, SplitText rewrite — https://webflow.com/blog/gsap-splittext-rewrite
- Osmo, masked text reveal — https://www.osmo.supply/resource/masked-text-reveal
- Osmo, text scramble — https://osmo.supply/resource/text-scramble-load-scroll-hover
- freefrontend, ScrambleText — https://freefrontend.com/scramble-text-plugin-js/
- camoa, variable font animation — https://camoa.github.io/dev-guides/css/css-craft/variable-font-animation/
- Frontend Focus, Variable Font Animation with CSS and Splitting JS — https://frontendfoc.us/link/68653/web
- Val Head, animating variable fonts — https://valhead.com/2020/11/15/animating-variable-fonts-with-css/
- Olivier Larose — https://blog.olivierlarose.com/
- MotionKit — https://motionkit.io/blog/web-animation-trends-2026
- Codrops, 7 Must-Know GSAP Tips (snippet) — https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/
- Codrops, From SplitText to MorphSVG (snippet) — https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/
