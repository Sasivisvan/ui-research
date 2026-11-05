# Signature & Experiential Components (41–50)

This file covers the components that make a site feel authored rather than assembled: custom cursors, smooth scrolling and custom scrollbars, preloaders and intros, call-to-action and newsletter sections, contact sections, team and about sections, portfolio and case-study showcases, video players and background media, maps, and the small floating pieces (theme and language switchers, back-to-top, floating action elements). These are the patterns that recur on Awwwards, recent.design (formerly Godly), Codrops and studio sites such as Lusion. Each is also where performance and accessibility most often break, so every section pairs the signature effect with its touch, reduced-motion and keyboard fallback. Content is transferred from research note 05 (fetched 5 Nov 2026); nothing has been re-researched. Cross-cutting guidance (learning path, studios to study, a pitfalls checklist and an outdated-tech list) closes the file.

**Verification legend** (kept from the source notes; never read a marker as stronger than it is):
- **[fetched]** = page loaded and read during the research session (5 Nov 2026).
- **[search]** = seen in search results only; the page was not read.
- **[training knowledge]** = the researcher's background knowledge, not verified this session.
- **[synthesis]** = practitioner synthesis built from the cited techniques; not copied from a single source.
- **[untested snippet]** = code written by the researcher; not run in a browser.
- **Editor's note:** = connective guidance added when organising these docs; not from the notes.

In every component section, the **Variants**, **Crafted vs generic**, **Desktop vs mobile**, **Accessibility** and **Code** parts are **[synthesis]** / **[untested snippet]** unless a line carries its own source link. Lines under "Cited facts" are **[fetched]** unless marked **[search]**.

**Source access during research.** These pages loaded and were read: Lenis README (GitHub); NN/g (scrolljacking, progress indicators, back-to-top); Chrome for Developers (same-document View Transitions); MDN (mix-blend-mode, @media pointer); the Olivier Larose tutorial index and Blend Mode Cursor tutorial; vidstack.io; Mux blog (Video.js v10); W3C WCAG 2.2 Understanding 2.2.2; Josh W. Comeau's dark-mode article; web.dev lazy-loading-video; gsap.com/pricing; lusion.co; Mapbox GL JS docs; MapLibre GL JS docs. These blocked fetching: tympanus.net/codrops (HTTP 403), locomotive.ca (403), and the Awwwards custom-cursor collection URL (404); Codrops articles below were seen in search results only. godly.website now answers with a 301 redirect to `recent.design/?ref=godly`.

## Contents

- [41. Custom cursors](#41-custom-cursors)
- [42. Custom scrollbars and smooth scrolling](#42-custom-scrollbars-and-smooth-scrolling)
- [43. Preloaders, intro screens and splash counters](#43-preloaders-intro-screens-and-splash-counters)
- [44. CTA sections and newsletter signups](#44-cta-sections-and-newsletter-signups)
- [45. Contact sections and contact forms](#45-contact-sections-and-contact-forms)
- [46. Team and about sections](#46-team-and-about-sections)
- [47. Portfolio, work showcases and case-study layouts](#47-portfolio-work-showcases-and-case-study-layouts)
- [48. Video players and media embeds](#48-video-players-and-media-embeds)
- [49. Maps and location sections](#49-maps-and-location-sections)
- [50. Theme switchers, language switchers, back-to-top and floating elements](#50-theme-switchers-language-switchers-back-to-top-and-floating-elements)
- [Cross-cutting: recurring patterns, learning path and studios](#cross-cutting-recurring-patterns-learning-path-and-studios)
- [Cross-cutting: performance and accessibility pitfalls checklist](#cross-cutting-performance-and-accessibility-pitfalls-checklist)
- [Cross-cutting: outdated techniques (Nov 2026)](#cross-cutting-outdated-techniques-nov-2026)
- [Sources](#sources)

Related docs: [component index](README.md) · [component libraries](component-libraries.md) · [feedback & overlays](feedback-overlays.md) · [animations](../animations/README.md) · [assets: video](../assets/video.md) · [foundations: performance](../foundations/performance.md) · [foundations: accessibility](../foundations/accessibility.md)

---

## 41. Custom cursors

Dot+ring follower, blend-mode, magnetic, labelled "View/Drag", trails, image-reveal cursors.

### What & when

A custom cursor is a decorative layer drawn on top of the real pointer. On sites that do it well, it carries meaning: it labels an action ("View", "Drag", "Play"), or it changes state on hover. Build it with one `requestAnimationFrame` (rAF) loop using lerp and transforms only, and turn it on only under `(hover: hover) and (pointer: fine)`. Keep the native cursor available, or hide it only inside specific zones, never sitewide.

**Cited facts**
- **Olivier Larose, Blend Mode Cursor tutorial** — [blog.olivierlarose.com/tutorials/blend-mode-cursor](https://blog.olivierlarose.com/tutorials/blend-mode-cursor):
  - React refs store the mouse position and the delayed position, so React does not re-render on every mouse move.
  - A rAF loop runs `lerp(start, end, 0.075)`, and `gsap.set(circle, {x, y, xPercent:-50, yPercent:-50})` positions the circle.
  - The circle uses `mix-blend-mode: difference`, `pointer-events: none` and `position: fixed`.
  - On hover the circle grows from 30px to 400px with `filter: blur(30px)`, using CSS transitions on width, height and filter.
  - A multi-circle variant staggers each circle's transition duration by index, producing a trailing effect.
  - The tutorial does not handle touch or pointer events at all (production code must add gating).
- **Olivier Larose cursor tutorials:** Blend Mode Cursor, Sticky Cursor, Mask Cursor Effect, Pixel Cursor Trailing, Cartoon Cursor Trailing, Magnetic Button. Related mouse effects: Mouse Image Distortion, Paint Reveal, Gradient Mouse Move, Svg Bezier Curve — [tutorials index](https://blog.olivierlarose.com/tutorials).
- **mix-blend-mode (MDN)** — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode):
  - Values: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity, plus-darker, plus-lighter.
  - The element blends with what is behind it *within its stacking context*, and it creates a stacking context itself.
  - `isolation: isolate` on a parent stops the blend from reaching past it.
  - Baseline "widely available" since January 2020.
- **Pointer media query (MDN)** — [MDN @media pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer): `pointer` has values `none`, `coarse`, `fine`. It tests only the *primary* input. `any-pointer` tests any available device (e.g. a touchscreen laptop with a mouse attached).
- **Forum fixes for blend-mode cursors [search]:** a Webflow forum answer — give the cursor element `pointer-events: none` so links stay clickable; a Divi tutorial commenter reported the cursor blocked clicks when this was missing; Lay Theme forum users warn the default arrow can still show through `cursor:none` in some contexts — [Webflow forum](https://discourse.webflow.com/t/cursor-blending-mode-difference/172083), [Divi Lover](https://divilover.com/?p=36473), [Lay Theme forum](https://www.laythemeforum.com/post/37929).
- **Codrops "Custom Cursor Effects" (Jan 2019) [search]:** five demos built from a small dot plus a canvas-drawn ring, used for navigation, galleries and carousels — [Codrops](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/).
- **Other Codrops cursor items [search]:** an "Animated Custom Cursor" repo built on SVG filters (last pushed March 2021) and a stop-motion p5.js crayon cursor tutorial — [Codrops cursor tag](https://tympanus.net/codrops/tag/cursor).
- **Commercial physics-based blend cursor:** Framer's marketplace sells a "Magic Blend Cursor" component — [Framer marketplace](https://www.framer.com/marketplace/components/magic-blend-cursor/).
- **Retro trail effects:** tholman's `cursor-effects` npm library offers 90s-style trails (sparkles, emoji); last pushed January 2025 — [npm cursor-effects](https://npmjs.com/package/cursor-effects).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Dot + lagging ring** | 6px dot snaps to the pointer (no lerp, or lerp 0.35–0.5). 32–40px ring, 1px border, trails at lerp 0.12–0.18. Over links the ring grows to ~64px and the dot fades out. On mousedown the ring scales to 0.8. The canonical Codrops-era pattern. |
| 2 | **Difference-blend disc** | White disc, 20px at rest and 80–120px over text, `mix-blend-mode: difference`. Inverts what's under it (black on white, white on black). Best over large headlines; grow it over `h1` or `[data-cursor="invert"]`. |
| 3 | **Labelled cursor (contextual verbs)** | Ring expands into a pill/circle ~90px across holding one word: "View", "Drag", "Play", "Open", "Next →", "Close". Set via `data-cursor-label="Drag"` on the target. Common on project cards and sliders. |
| 4 | **Media-preview (image-reveal) cursor** | Hovering a list item shows a 280×360 image or muted video clip following the cursor at lerp 0.1. Enters with clip-path `inset(50% 50% 50% 50%)` → `inset(0)` and a slight velocity-dependent rotation. Full code in [47](#47-portfolio-work-showcases-and-case-study-layouts). |
| 5 | **Magnetic targets** | Buttons pull toward the cursor within a radius, translating ~0.3–0.4× the offset from their centre; inner label moves ~0.6× for parallax. On leave, snaps back with an elastic ease, e.g. GSAP `elastic.out(1, 0.3)`. Olivier Larose "Magnetic Button" and "Sticky Cursor". |
| 6 | **Sticky / morphing cursor** | Over an icon button the ring morphs to the button's bounding box and border-radius (reads `getBoundingClientRect`, lerps width, height, radius). The cursor "becomes" the hover state (Olivier Larose "Sticky Cursor"). |
| 7 | **Mask / spotlight cursor** | `mask-image: radial-gradient(circle at var(--x) var(--y), #000 0 120px, transparent 121px)` on a second copy of the hero reveals alternate content inside the circle (a sketch under a photo, the "real" text under a polite one). Olivier Larose "Mask Cursor Effect". |
| 8 | **Image trail** | Pointer movement stamps images from a pool every N px of travel (typically 80–120px); each stamp scales and fades over 0.6–1s. Variants: stack and rotate, zoom from cursor, grid snap. Pixel and cartoon trails also exist (Olivier Larose). |
| 9 | **Canvas / WebGL fluid and ink trail** | Metaball or fluid sim follows the pointer, often revealing a second image through a distortion texture. Lusion / Active Theory register. Needs a GPU budget and a fallback. |
| 10 | **Crosshair / coordinate cursor** | Thin full-viewport horizontal and vertical lines meet at the pointer; small mono label shows live `x:0423 y:0188` or the project index. Technical, architectural, editorial brands. |
| 11 | **Text-on-path cursor** | Circular SVG `textPath` ("• SCROLL • SCROLL") rotates slowly around the dot; speed increases with pointer velocity. |
| 12 | **Velocity-squash cursor** | Ring stretches along the movement vector: scaleX = 1 + speed × 0.004, rotation = atan2(dy, dx). Gooey, physical feel. |
| 13 | **Native CSS cursor** | `cursor: url(cursor.svg) 8 8, auto`. Zero lag, zero JS, assistive settings preserved. Best for brand-shaped pointers in a small area (e.g. a game section). Limits: ~32×32 recommended (larger may be ignored by some browsers); no animation. |
| 14 | **Hidden-until-meaningful cursor** | Native cursor stays everywhere; a custom label appears only over carousels and media ("Drag", "Play"). The safest high-craft option. |

### Crafted vs generic

- **Slop signs:** a generic dot + ring sitewide with no state changes; a ring lagging 300ms behind that makes clicking feel sluggish; `cursor:none` on the whole `body`; the cursor showing on phones as a stuck circle at 0,0; a blend mode turning brand colours into muddy complements.
- **Craft signs:**
  - The cursor *says something*: contextual verbs, morphs to the target.
  - It fades in and scales up on the first `pointermove`, so it never appears at the top-left corner.
  - It hides on `pointerleave` of the document and over iframes and form inputs, where the native I-beam returns.
  - Easing and lerp match the site's motion system (the same lerp as the Lenis scroll).
  - Cursor colour is a design token; the blend is isolated with `isolation: isolate` on sections where difference would clash.

### Desktop vs mobile

- Enable only with `matchMedia('(hover: hover) and (pointer: fine)')`. Listen for `change` so iPads with trackpads and hybrid laptops switch live.
- On touch, replace the cursor's meaning with visible UI: "Drag →" hints on sliders, permanent "View" labels on cards.
- An image-reveal-on-hover list becomes inline thumbnails, or reveal-on-scroll with IntersectionObserver.

### Accessibility

- Never apply `cursor:none` globally: it breaks OS large-cursor and high-contrast pointer settings and screen magnifiers, and users lose the pointer whenever JavaScript stalls.
- If you must hide the native cursor, hide it only on elements that have the custom cursor (`[data-cursor-zone]`), and only after JS has started the follower.
- Under `prefers-reduced-motion: reduce`: set lerp to 1 (follower snaps to the pointer); disable trails and magnetism; or disable the cursor entirely.
- Always set `pointer-events:none` and `aria-hidden="true"` on the cursor element.
- Keyboard focus needs its own visible `:focus-visible` style; don't rely on cursor hover states.
- Give cursor labels contrast and keep them short.

### Code

**Snippet A — lerp dot+ring with labels, gated and reduced-motion-aware** [untested snippet]:

```html
<div class="cursor" aria-hidden="true"><div class="cursor__ring"><span class="cursor__label"></span></div><div class="cursor__dot"></div></div>
<style>
.cursor{position:fixed;inset:0 auto auto 0;pointer-events:none;z-index:9999;opacity:0;transition:opacity .3s}
.cursor.is-on{opacity:1}
.cursor__dot,.cursor__ring{position:fixed;top:0;left:0;border-radius:50%;will-change:transform}
.cursor__dot{width:6px;height:6px;margin:-3px;background:var(--fg)}
.cursor__ring{width:40px;height:40px;margin:-20px;border:1px solid var(--fg);display:grid;place-items:center;
  transition:width .35s cubic-bezier(.2,.8,.2,1),height .35s,margin .35s,background-color .35s}
.cursor__label{font:500 12px/1 var(--font-mono);color:var(--bg);opacity:0;transition:opacity .2s}
.cursor.has-label .cursor__ring{width:88px;height:88px;margin:-44px;background:var(--fg)}
.cursor.has-label .cursor__label{opacity:1}
.cursor.is-link .cursor__ring{width:64px;height:64px;margin:-32px}
@media not ((hover:hover) and (pointer:fine)){.cursor{display:none}}
</style>
<script type="module">
const mq = matchMedia('(hover: hover) and (pointer: fine)');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const el = document.querySelector('.cursor'), dot = el.querySelector('.cursor__dot'),
      ring = el.querySelector('.cursor__ring'), label = el.querySelector('.cursor__label');
let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
const lerp = (a, b, t) => a + (b - a) * t;
function tick() {
  const t = reduce.matches ? 1 : 0.15;            // reduced motion => no lag
  rx = lerp(rx, mx, t); ry = lerp(ry, my, t);
  dot.style.transform  = `translate3d(${mx}px,${my}px,0)`;
  ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
  raf = requestAnimationFrame(tick);
}
function onMove(e) {
  if (e.pointerType !== 'mouse') return;          // ignore pen/touch
  mx = e.clientX; my = e.clientY;
  if (!el.classList.contains('is-on')) { rx = mx; ry = my; el.classList.add('is-on'); } // no fly-in from 0,0
}
function onOver(e) {
  const t = e.target.closest('[data-cursor-label], a, button');
  const text = t?.dataset.cursorLabel;
  el.classList.toggle('has-label', !!text); label.textContent = text || '';
  el.classList.toggle('is-link', !!t && !text);
}
function enable() {
  addEventListener('pointermove', onMove, { passive: true });
  addEventListener('pointerover', onOver, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => el.classList.remove('is-on'));
  raf = requestAnimationFrame(tick);
}
function disable() { cancelAnimationFrame(raf); removeEventListener('pointermove', onMove); removeEventListener('pointerover', onOver); el.classList.remove('is-on'); }
mq.matches && enable();
mq.addEventListener('change', e => e.matches ? enable() : disable());
</script>
```

Notes: only `transform` is animated, and sizes change through CSS transitions; moving the cursor with `top`/`left` would force layout every frame. If GSAP is already loaded, `gsap.quickTo(ring, 'x', {duration: .5, ease: 'power3'})` is an equivalent, tidier way to smooth the movement.

**Snippet B — difference-blend cursor** [untested snippet]:

```css
.blend-cursor{position:fixed;top:0;left:0;width:20px;height:20px;margin:-10px;border-radius:50%;
  background:#fff;mix-blend-mode:difference;pointer-events:none;z-index:9999;
  transition:width .4s,height .4s,margin .4s}
.blend-cursor.is-big{width:120px;height:120px;margin:-60px}
/* Blending only reaches content in the same stacking context. Keep the cursor a direct child of <body>,
   and don't give <body> or its wrappers isolation, transform or filter. */
.no-blend{isolation:isolate} /* opt-out zones where inversion would clash with brand colors */
```

Pure white with `difference` gives a true inversion. Any other colour produces its complement, so test against brand colours.

**Snippet C — magnetic button** [untested snippet]:

```js
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const inner = btn.querySelector('span'), strength = 0.35;
  btn.addEventListener('pointermove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
    inner.style.transform = `translate(${x*strength*0.5}px, ${y*strength*0.5}px)`;
  });
  btn.addEventListener('pointerleave', () => { btn.style.transition = inner.style.transition = 'transform .6s cubic-bezier(.2,1.4,.3,1)';
    btn.style.transform = inner.style.transform = ''; setTimeout(() => btn.style.transition = inner.style.transition = '', 600); });
});
```

Pad the hit area (e.g. a `::before` inset of -20px) so the pull starts before the pointer reaches the visible edge.

**Snippet D — distance-threshold image trail** [untested snippet]:

```js
const imgs = [...document.querySelectorAll('.trail img')]; let i = 0, lx = 0, ly = 0;
addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  if (Math.hypot(e.clientX - lx, e.clientY - ly) < 100) return;   // spawn every ~100px of travel
  lx = e.clientX; ly = e.clientY;
  const img = imgs[i++ % imgs.length];
  img.getAnimations().forEach(a => a.cancel());
  img.style.zIndex = i;
  img.animate([
    { transform: `translate(${lx}px,${ly}px) translate(-50%,-50%) scale(.6)`, opacity: 1 },
    { transform: `translate(${lx}px,${ly}px) translate(-50%,-50%) scale(1)`, opacity: 1, offset: .3 },
    { transform: `translate(${lx}px,${ly+40}px) translate(-50%,-50%) scale(.9)`, opacity: 0 }
  ], { duration: 900, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
}, { passive: true });
```

Use a pool of 8–12 pre-decoded images, `loading="eager"` and `decoding="async"`, each `position:fixed`, `top:0`, `left:0`.

### Libraries & tools

- GSAP (`gsap.set`, `gsap.quickTo`, `elastic.out`) — now free (see [42](#42-custom-scrollbars-and-smooth-scrolling)).
- Framer marketplace "Magic Blend Cursor" (commercial).
- `cursor-effects` (tholman, npm; last pushed Jan 2025).
- Codrops "Animated Custom Cursor" repo (SVG filters; last pushed March 2021) [search].
- p5.js (crayon cursor tutorial) [search].

### Inspiration links

- [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials) — Blend Mode Cursor, Sticky Cursor, Mask Cursor Effect, Pixel/Cartoon Cursor Trailing, Magnetic Button
- [Codrops Custom Cursor Effects (2019) [search]](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/) · [Codrops cursor tag [search]](https://tympanus.net/codrops/tag/cursor)
- [lusion.co](https://lusion.co) (WebGL register)

### Caveats & verification status

- Codrops pages could not be opened (403), so 2023–2026 cursor tutorials there are not catalogued from the source.
- The Awwwards "custom cursor" collection URL returned 404; no verified curated list.
- No quantitative study on custom-cursor usability or input latency was found; INP impact is inferred from the general rendering principle (layout animation costly, `transform` cheap).

---

## 42. Custom scrollbars and smooth scrolling

### What & when

Lenis (darkroom.engineering) is the de facto smooth-scroll library in 2026. Unlike the old Locomotive Scroll v4 and ScrollSmoother-style transform approaches, it keeps native scroll, so `position: sticky`, IntersectionObserver and Cmd+F keep working. It honours reduced motion by default. Scrolljacking that changes the scroll rate or direction tests poorly, especially on mobile.

**Cited facts — Lenis** ([Lenis GitHub](https://github.com/darkroomengineering/lenis)):
- Current version **1.3.27**. Install `npm i lenis`, or CDN `unpkg.com/lenis@1.3.27/dist/lenis.min.js`. Import the required CSS: `import 'lenis/dist/lenis.css'`.
- Setup: `new Lenis({ autoRaf: true })`, or a manual `requestAnimationFrame` loop calling `lenis.raf(time)`.
- GSAP integration from the README: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((time)=>{ lenis.raf(time*1000) }); gsap.ticker.lagSmoothing(0);`

| Option | Default | Notes |
|---|---|---|
| `lerp` | 0.1 | |
| `duration` | 1.2 | Ignored if `lerp` is set |
| `smoothWheel` | true | |
| `syncTouch` | false | "Can be unstable on iOS < 16" |
| `syncTouchLerp` | 0.075 | |
| `prevent` | – | Function |
| `anchors` | false | Accepts true or ScrollToOptions |
| `autoResize` | true | Uses ResizeObserver |

- Opt-out attributes: `data-lenis-prevent`, plus `-wheel`, `-touch`, `-vertical`, `-horizontal` variants. `allowNestedScroll: true` handles nested scrollers but "can hurt performance".
- Limitations: no CSS scroll-snap support (use the `lenis/snap` package); capped at 60fps in Safari and 30fps in Low Power Mode; smooth scroll stops over iframes; `position: fixed` may lag in pre-M1 macOS Safari.
- Reduced motion: `respectReducedMotion` defaults to true. When the user prefers reduced motion, lerp is forced to 1 and programmatic scrolls jump instantly. Lenis keeps running so WebGL and DOM sync still work, and the preference updates live. `lenis.prefersReducedMotion` is exposed. Turning the default off is "not recommended".

**Cited facts — NN/g on scrolljacking** ([NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)):
- Findings: most participants were at least mildly disoriented; long scrolljacks made some think the page was broken; fast rates made users miss content, slow rates caused fatigue; text combined with altered scrolling was the worst case; horizontal scrolljacks confused users about how to get back to the top; mobile is worse; sticky navigation gave users an escape route.
- Recommendations: use scrolljacking only for functional value; tune the rate through testing; mix in normal scrolling and keep direction consistent; keep important text out of scrolljacks; avoid it on mobile and place it below the fold.

**Cited facts — GSAP is now free:** "100% free for all users, thanks to Webflow's support", including SplitText, ScrollSmoother, MorphSVG, Flip and Observer. The footer reads "A Webflow Product" — [GSAP pricing](https://gsap.com/pricing/).

### Variants

**Smooth-scroll variants**

| # | Variant | Spec |
|---|---|---|
| 1 | Lenis default | lerp 0.1, wheel only: the baseline "premium feel" |
| 2 | Heavier inertia | lerp 0.06–0.08 for editorial/luxury. Do not go below 0.05 (feels like syrup; the "fatigue" NN/g describes) |
| 3 | Duration-based easing | `duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t))` (exponential-out) |
| 4 | Lenis + ScrollTrigger pinning | Sticky storytelling chapters |
| 5 | Horizontal wrapper | `orientation: 'horizontal'` or `gestureOrientation: 'both'` for full-site sideways galleries; galleries only (see NN/g) |
| 6 | Infinite loop | `infinite: true` for gallery or "endless" portfolio pages |
| 7 | Snap sections | `lenis/snap`, for slideshow-like decks |
| 8 | Velocity-reactive effects | Read `lenis.velocity` to skew images, stretch type, speed up marquees |
| 9 | Scroll-linked WebGL | Drive shader uniforms from `lenis.scroll` (Lusion / Active Theory approach) |
| 10 | CSS-only alternative | No smoothing; native scroll + CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) for reveals and parallax. Zero JS, most accessible |

**Custom scrollbar variants**

| # | Variant | Spec |
|---|---|---|
| 1 | Thin token-coloured bar | `scrollbar-width: thin; scrollbar-color: var(--fg) transparent;` — standard properties, now cross-browser. `::-webkit-scrollbar` only as legacy fallback |
| 2 | Hidden native bar + custom progress rail | 2px fixed line at right or top edge whose `scaleY`/`scaleX` follows scroll progress. Pure CSS works: `animation: grow linear; animation-timeline: scroll(root);` |
| 3 | Chapter index rail | Dots or section numbers (01–06) on the right edge, filling as each section passes; clickable, calling `lenis.scrollTo('#id')` |
| 4 | Percentage counter | Corner counter ("037%") in mono type |
| 5 | Draggable custom thumb | For horizontal galleries, with a visible "Drag" label |
| 6 | Minimap | Scaled-down screenshot of the page with a viewport rectangle. Rare and memorable |

### Crafted vs generic

- **Slop:** smoothing on every device including touch (fights native momentum); scroll-rate hijacking over text blocks; a hidden scrollbar with no alternative progress cue; smooth scroll breaking anchor links and find-in-page.
- **Craft:** Lenis on wheel only (`syncTouch:false`, the default); anchors enabled with an offset for a fixed header; `data-lenis-prevent` on modals, code blocks and map containers; `lenis.stop()` while a modal or menu is open and `lenis.start()` after; one shared ticker (GSAP) so scroll and animation never drift apart.

### Desktop vs mobile

- Leave touch scrolling native. `syncTouch` is off by default, and the README warns it is unstable on iOS below 16.
- Remove horizontal scrolljacks on mobile; replace them with native `overflow-x: auto` and `scroll-snap-type: x mandatory`.

### Accessibility

- Keep `respectReducedMotion:true`.
- Never disable keyboard scrolling: Space, PageDown and arrow keys must still work (they do with Lenis because scroll is native).
- Sticky navigation is the escape hatch NN/g recommends.

### Code

**Production Lenis + GSAP setup with progress rail** [untested snippet]:

```js
import Lenis from 'lenis'; import 'lenis/dist/lenis.css';
import gsap from 'gsap'; import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.1, smoothWheel: true,          // touch stays native (syncTouch:false default)
  anchors: { offset: -80 },              // fixed-header offset for in-page links
  prevent: node => node.closest('.modal, .map, pre') !== null,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

// Pause smoothing while overlays are open
document.addEventListener('menu:open', () => lenis.stop());
document.addEventListener('menu:close', () => lenis.start());
// Reading progress rail
lenis.on('scroll', ({ progress }) => document.documentElement.style.setProperty('--progress', progress));
```

```css
.progress-rail{position:fixed;top:0;right:0;width:2px;height:100vh;transform-origin:top;
  transform:scaleY(var(--progress,0));background:var(--accent);z-index:50}
```

### Libraries & tools

- **Lenis** 1.3.27 (+ `lenis/snap`) — [GitHub](https://github.com/darkroomengineering/lenis).
- **GSAP** + ScrollTrigger / ScrollSmoother / Observer — free — [gsap.com/pricing](https://gsap.com/pricing/).
- CSS scroll-driven animations (`animation-timeline`) as the zero-JS option.
- Outdated: Locomotive Scroll v4 (transform-based, breaks `position: sticky`; v5 was itself rebuilt on top of Lenis — [training knowledge], locomotive.ca returned 403); custom `wheel` listeners that call `preventDefault`; old `smooth-scrollbar` and `iScroll`-style virtual scrolling.

### Inspiration links

- [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials) — Smooth scroll, Parallax, Scroll groups
- Darkroom / Studio Freight (makers of Lenis) — no URL in notes

### Caveats & verification status

- Lenis README, NN/g and GSAP pricing: [fetched]. Variant catalogues and snippet: [synthesis] / [untested snippet].
- Locomotive Scroll v5 relationship to Lenis not verified; Lenis 2.x roadmap not checked.
- Scroll-driven animation support in Safari and Firefox not re-verified this session; treat `animation-timeline` as progressive enhancement behind `@supports (animation-timeline: view())`. Editor's note: see [foundations/browser-support-2026.md](../foundations/browser-support-2026.md).

---

## 43. Preloaders, intro screens and splash counters

### What & when

On award sites a preloader is a short branded intro, usually a 0→100 counter or a logo/word animation. Done honestly, it hides real asset loading for WebGL or video. Done badly, it is a fake delay in front of HTML that is already ready. Budget it: show it only when needed, keep it under about 2–3s, show it once per session, skip it under reduced motion, and never block LCP content for a pure-HTML page.

**Cited facts**
- **NN/g progress-indicator thresholds** — [NN/g Progress Indicators](https://www.nngroup.com/articles/progress-indicators/): give immediate feedback; use a progress indicator for anything longer than ~1s; looped spinners for 2–10s (they are "distracting" below 1s); percent-done indicators for 10s or more, with a time estimate; percent-done bars should "start slower and speed up near the end" because a bar that stalls at the end frustrates users; avoid static "Loading…" text.
- **WCAG 2.2.2 (Pause, Stop, Hide)** — [W3C Understanding SC 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html): moving content that starts automatically, lasts more than 5s and is presented in parallel with other content needs a pause, stop or hide mechanism. A preloader that is the *only* content on screen is exempt because it "is not presented in parallel with other content".
- **Awwwards preloader entries [search]** (animations not watched): Monolith by CUSP, Garbage loading animation, Fort Vega, Gavin Schneider Productions, Jon Way, Aurasens, Netrix, Digital Horizon and others — [Awwwards preloader tag](https://www.awwwards.com/inspiration/preloader), [Monolith](https://www.awwwards.com/inspiration/pre-loader-monolith), [Garbage loading animation](https://www.awwwards.com/inspiration/garbage-loading-animation), [Jon Way](https://www.awwwards.com/inspiration/jon-way-loading-animation).
- **HTML Burger roundup:** 45 website preloaders, from minimal GIF loaders to a garbage-truck animation and a neon digit loader — [HTML Burger](https://htmlburger.com/blog/website-preloaders/).
- **Lusion homepage:** a row of "0" digits consistent with a counter-style loader, plus a PLAY/MUTE sound toggle; the fetched text could not confirm the loader — [lusion.co](https://lusion.co).
- **Olivier Larose loading tutorials:** "Image Pixel Loading" and "Svg Curve Loading" (the curved-bottom curtain that sweeps up on exit) — [tutorials](https://blog.olivierlarose.com/tutorials).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Mono counter 000→100** | Large tabular-numeral digits in a corner (`font-variant-numeric: tabular-nums`); each digit column rolls like an odometer (translateY on stacked 0–9 strips). Exit: digits slide up, then a curtain wipes off |
| 2 | **Counter tied to real loading** | Progress from an asset manifest: `THREE.LoadingManager` `onProgress`, `img.decode()` promises, or `video.canplaythrough`. Apply NN/g slow-then-fast pacing by mapping real progress through an ease-in curve; never sit at 99 |
| 3 | **Split-flap / word cycle** | A word cycles through a list ("Design / Motion / Code / Studio") at ~150ms per word, then locks on the brand name |
| 4 | **Image-stack flicker** | 6–10 project thumbnails flash in the centre at increasing scale, like a film reel; the last scales to full-bleed and becomes the hero (seamless handoff) |
| 5 | **SVG curve curtain** | Solid panel with a quadratic Bézier bottom edge lifts away; the curve flattens as it rises (Olivier Larose "Svg Curve Loading") |
| 6 | **Logo draw-on** | `stroke-dasharray` + `stroke-dashoffset` trace the monogram, then it fills |
| 7 | **Pixel / grid dissolve** | Grid of squares hides in random or staggered order to reveal the page (Olivier Larose "Pixel Transition", "Image Pixel Loading") |
| 8 | **Masked text slide** | Brand name rises out of an `overflow:hidden` line mask, holds, rises out the top; doubles as the hero title |
| 9 | **Progress line with a blend label** | Full-width 1px line grows; a percentage label rides its tip |
| 10 | **WebGL scene warm-up** | Particles or a noise field form the logo while shaders compile, then the camera dives in. Honest, because shader compilation needs the time |
| 11 | **Sound opt-in gate** | "Enter with sound / without sound" buttons on the loader's final frame; also unlocks audio autoplay (requires a user gesture) |
| 12 | **Skeleton-first, no preloader** | Content paints immediately; decorative motion plays as an intro on top of visible content. Best for performance |
| 13 | **Page-transition loader** | Same visual language reused between routes: curtain or column wipe via the View Transitions API, or a Barba.js-style approach |

**Performance budget (practical rules)** [synthesis]:
- HTML/CSS/images-only page → no blocking preloader; use an intro that animates the real content. Inline the loader's CSS and HTML in the document so it paints on the first frame.
- Keep the loader under ~2.0s on a fast connection and cap it at ~3s even on slow ones. After the cap, reveal anyway and let assets stream in. NN/g's 2–10s spinner window is a ceiling for a *task*, not a target for a brand intro.
- Loader code budget: under ~10KB of JS + CSS; no web-font dependency (or `font-display: block` for one subset font); no images other than inline SVG.
- Show the full loader once per session (`sessionStorage`); repeat visits get a 300–500ms micro version or none.
- Do not hide LCP content behind `opacity:0` set by JS after the loader: if JS fails, the page stays invisible. Add a `<noscript>` style, or set the class from JS only.

### Crafted vs generic

- **Crafted:** honest (tied to real assets: WebGL, video, shader compile); once per session; capped; hands off seamlessly into the hero (variants 4, 8).
- **Generic:** a fake delay in front of HTML that's already ready; repeats every visit; blanks the page if JS fails.

### Desktop vs mobile

- Cut the loader to essentials: a counter and a curtain.
- Skip WebGL warm-ups on low-end devices; use `navigator.hardwareConcurrency`, `deviceMemory` or the `Save-Data` header as heuristics.
- Keep total tap-to-content time well under 3s on 4G.

### Accessibility

- Under `prefers-reduced-motion: reduce`, skip straight to content or use a plain crossfade.
- Container `role="status"` with `aria-live="polite"`, plus a visually hidden "Loading" that announces once rather than every percent.
- Set `inert` on `<main>` until the loader finishes, then remove it; make sure focus lands at the top of the page.
- Offer a "Skip intro" button if the intro is longer than ~2s.

### Code

**Counter preloader with session skip and failsafe** [untested snippet]:

```html
<div class="loader" role="status" aria-live="polite"><span class="sr-only">Loading</span>
  <span class="loader__num" aria-hidden="true">000</span></div>
<style>
.loader{position:fixed;inset:0;z-index:10000;background:var(--bg);display:grid;align-items:end;padding:4vw;
  clip-path:inset(0 0 0 0);transition:clip-path .9s cubic-bezier(.76,0,.24,1)}
.loader.is-done{clip-path:inset(0 0 100% 0)}
.loader__num{font:400 clamp(4rem,18vw,16rem)/.8 var(--font-display);font-variant-numeric:tabular-nums}
html.no-loader .loader{display:none}
@media (prefers-reduced-motion: reduce){.loader{transition:opacity .3s}.loader.is-done{opacity:0;clip-path:none}}
</style>
<script>
// Inline in <head>: decide before first paint
if (sessionStorage.getItem('seenIntro') || matchMedia('(prefers-reduced-motion: reduce)').matches)
  document.documentElement.classList.add('no-loader');
</script>
<noscript><style>.loader{display:none}</style></noscript><!-- no-JS fallback: never cover the page -->
<script type="module">
const root = document.documentElement, loader = document.querySelector('.loader'), num = loader.querySelector('.loader__num');
if (!root.classList.contains('no-loader')) {
  document.querySelector('main').inert = true;
  const assets = [...document.querySelectorAll('img[data-preload]')].map(i => i.decode().catch(()=>{}));
  let real = assets.length ? 0 : 1, shown = 0, done = 0;   // nothing to track = 100% (still honours MIN)
  assets.forEach(p => p.then(() => real = ++done / Math.max(assets.length, 1)));
  const start = performance.now(), CAP = 3000, MIN = 1200;
  (function step(now) {
    const t = now - start;
    const target = t > CAP ? 1 : Math.min(real || 0, t / MIN);   // never faster than MIN, never longer than CAP
    shown += (target - shown) * 0.12;
    num.textContent = String(Math.round(shown * 100)).padStart(3, '0');
    if (shown > 0.995) { num.textContent = '100'; finish(); } else requestAnimationFrame(step);
  })(start);
  function finish() {
    loader.classList.add('is-done'); sessionStorage.setItem('seenIntro', '1');
    document.querySelector('main').inert = false;
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }
}
</script>
```

Editor's note: corrected from the research-notes version (was: with no `img[data-preload]` elements the counter only finished at the 3s cap).

### Libraries & tools

- three.js `THREE.LoadingManager` (real progress); View Transitions API; Barba.js (page-transition loaders).
- Editor's note: for in-app spinners and skeletons see [feedback-overlays.md, 35–36](feedback-overlays.md#35-loaders-and-spinners); for page transitions see [../animations/page-transitions.md](../animations/page-transitions.md).

### Inspiration links

- [Awwwards preloader tag [search]](https://www.awwwards.com/inspiration/preloader) and entries above
- [HTML Burger, 45 website preloaders](https://htmlburger.com/blog/website-preloaders/)
- [Olivier Larose: Svg Curve Loading, Image Pixel Loading, Pixel Transition](https://blog.olivierlarose.com/tutorials)
- [lusion.co](https://lusion.co)
- Obys (typographic motion and preloaders; not fetched)

### Caveats & verification status

- No authoritative 2025–2026 study on preloader abandonment rates was found. The "keep under about 2–3s" figure is a practitioner heuristic built from NN/g thresholds, not a measured standard.
- Individual Awwwards preloader animations were not watched or verified.

---

## 44. CTA sections and newsletter signups

### What & when

Award-site CTAs are usually a huge, full-width typographic statement ("Let's talk", "Let's work together!") with one action, often a mailto link or a magnetic button, and they are often merged with the footer. Newsletter signups that read as crafted have a voice, show what the reader gets, and give inline validation and a real success state.

**Cited facts**
- **Lusion's CTAs** — [lusion.co](https://lusion.co): repeats "Let's talk" (a mailto link), "Let's work together!", "Play Reel" and "Our Approach". Scroll prompts: "CONTINUE TO SCROLL", "Keep Scrolling to Learn More", "Next Page". A "Subscribe to our newsletter" section sits before the footer, which lists separate general and new-business email addresses.
- **Olivier Larose CTA-related tutorials:** "Creative Buttons", "Magnetic Button", "Sticky Footer", "Infinite Text Move On Scroll" (marquees) — [tutorials](https://blog.olivierlarose.com/tutorials).

### Variants

**CTA variants**

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Giant type CTA** | "Let's talk" at 15–25vw on one or two lines. Hover fills letters bottom-to-top via `background-clip:text` with a gradient-position transition, or swaps in an italic display cut |
| 2 | **Infinite marquee CTA** | "Start a project — Start a project —" scrolls endlessly; speed and direction follow scroll velocity; pauses on hover. Provide a pause control (WCAG 2.2.2) if it runs more than 5s next to other content |
| 3 | **Magnetic circle button** | 160–200px circle labelled "Get in touch" beside a headline; magnetic; on hover a fill rises from the cursor's entry edge (calculated from pointer position) |
| 4 | **Reveal footer (sticky footer)** | CTA footer sits *under* the page with `position: sticky; bottom: 0` and a negative z-index; the last section scrolls away to uncover it (Olivier Larose "Sticky Footer") |
| 5 | **Email copy-to-clipboard** | The email address is the CTA: click copies it and shows a "Copied ✓" toast. Keep a `mailto:` fallback; announce via `aria-live` |
| 6 | **Availability pill** | "● Available for projects from Jan 2027" with a pulsing green dot. Honest, human, raises response rates |
| 7 | **Scroll-scrubbed reveal** | CTA line scales 0.6 → 1 and its letters spread as the section enters (ScrollTrigger scrub, or `animation-timeline: view()`) |
| 8 | **Cursor-follow image CTA** | Hovering the CTA band shows team photos or a reel clip under the cursor |
| 9 | **Split CTA** | Two big options, "New business →" and "Careers →", each with its own hover colour flood |
| 10 | **Interactive toy CTA** | Physics playground of draggable capsules spelling "HELLO" (Olivier Larose "Capsule Physics"). Memorable; put a plain link next to it |

**Newsletter variants**

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Inline single-line field** | Underline input, arrow button inside the field. Placeholder is a sample (name@studio.com), but a real `<label>` is still required (visually hidden is acceptable) |
| 2 | **Typewriter / conversational** | "I'd like to get your ______ every ______", inline fields in a sentence (mad-libs form) |
| 3 | **Issue-preview card** | Latest issue's cover, subject line, "Read issue #42": proof of value before the ask |
| 4 | **Count / social proof** | "Join 4,812 designers". Real numbers only |
| 5 | **Success state as delight** | Button morphs into a check, confetti in brand colours, or the headline rewrites itself ("You're in. See you Thursday.") |
| 6 | **Footer-merged** | Signup in the footer grid beside contact details and socials |

### Crafted vs generic

- **Slop:** a centred "Ready to get started?" headline with a gradient blob, two pill buttons, generic stock copy and a fake "trusted by" logo row.
- **Craft:** one strong verb phrase in the brand voice; type and motion echoing the hero; a real human contact (name and face); time zone and response time ("We reply within 24h, CET"); the CTA as the page's typographic crescendo.

### Desktop vs mobile

- Giant type must use `clamp()` and avoid overflow; test long words with `overflow-wrap: anywhere` or hyphens.
- Magnetic effects are off on touch.
- Copy-email should open the mail app (`mailto:`) and offer copy as the secondary action.
- Inputs: `type="email"`, `autocomplete="email"`, `inputmode="email"`, font size ≥ 16px to avoid iOS zoom.

### Accessibility

- Each CTA is a real `<a>` or `<button>`.
- Marquees are `aria-hidden` duplicates with one static copy available to screen readers.
- Form errors linked with `aria-describedby`; success announced through a `role="status"` region.

### Code

No CTA-specific snippet in the notes. Reuse: magnetic button ([41, Snippet C](#41-custom-cursors)); progressively enhanced form ([45](#45-contact-sections-and-contact-forms)). Editor's note: the sticky reveal-footer CSS recipe (Piccalil) is in [navigation-structure.md, 8. Footers](navigation-structure.md#8-footers); the CSS marquee is in [content-display.md](content-display.md).

### Libraries & tools

GSAP ScrollTrigger (scrub); CSS `animation-timeline: view()`.

### Inspiration links

- [lusion.co](https://lusion.co)
- [Olivier Larose: Creative Buttons, Magnetic Button, Sticky Footer, Infinite Text Move On Scroll, Capsule Physics](https://blog.olivierlarose.com/tutorials)

### Caveats & verification status

No conversion-rate data on these CTA styles was found in reviewed sources. Variants and craft rules are [synthesis].

---

## 45. Contact sections and contact forms

### What & when

Distinctive contact sections lower the effort of getting in touch. Typical ingredients: a big email address, local time, a project-type selector built from chips, and a conversational form. The underlying form must stay accessible and progressively enhanced.

**Cited facts**
- **Lusion's contact section:** direct email addresses split by purpose (general and new business), the studio address (Bristol) and social links, rather than a long form — [lusion.co](https://lusion.co).
- **Olivier Larose:** the "Awwwards Landing Page" and "Sticky Footer" tutorials show the common contact-in-footer reveal — [tutorials](https://blog.olivierlarose.com/tutorials).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Email-as-hero** | Giant email address in display type, copy-to-clipboard, cursor label "Copy" |
| 2 | **Live local clock** | "Paris — 14:32 CET", updated every minute via `Intl.DateTimeFormat` with `timeZone`. Optional "We're awake / We're asleep" with a sun or moon glyph |
| 3 | **Chip-based brief builder** | "I'm interested in: [Brand] [Website] [3D] [Motion]" and "Budget: [<20k] [20–50k] [50k+]" — toggle chips built from checkbox and radio inputs styled as pills |
| 4 | **Conversational sentence form** | "Hi, my name is [___] from [___]. I'd like help with [___]. Reach me at [___]." |
| 5 | **One-question-per-screen form** | Typeform-like, progress bar, slide transitions. Only for more than 5 fields |
| 6 | **Split layout** | Left: sticky big headline + office photos. Right: short form |
| 7 | **Office cards with a map** | Each studio city with local time, weather and a hover photo of the office (see [49](#49-maps-and-location-sections)) |
| 8 | **Calendar embed** | "Book a 20-min intro" (Cal.com or Calendly inline embed), lazy-loaded on click |
| 9 | **Hold-to-send button** | Long-press fills the button before submitting. Playful; needs a normal click fallback for keyboard users |
| 10 | **Paper-plane / envelope success** | Lottie or SVG animation on success, then "Thanks, Maya. We'll reply by Thursday." |

### Crafted vs generic

- **Slop:** a three-field "Name / Email / Message" form with placeholder-only labels and a generic "Submit" button; no confirmation, or a page reload to "Thank you".
- **Craft:** personalised success copy; expected reply time; who will reply (name and photo); field-level validation on blur, not every keystroke; saved draft through `localStorage`; spam protection without a CAPTCHA puzzle (honeypot field + time-to-submit, or Cloudflare Turnstile).

### Desktop vs mobile

- Correct input types and `autocomplete` tokens (`name`, `email`, `organization`, `tel`).
- Chips ≥ 44×44px tap targets.
- Sticky submit button at the bottom on long forms.
- `enterkeyhint="next"` and `enterkeyhint="send"`.

### Accessibility

- Every field has a visible `<label>`.
- Chips are real inputs inside a `<fieldset>` with a `<legend>`.
- Errors announced: an `aria-live="polite"` summary plus `aria-invalid` and `aria-describedby` on each field.
- No timeouts.
- Focus moves to the success message after submission.

### Code

**Progressively enhanced form submit with chips and honeypot** [untested snippet]:

```html
<form action="/api/contact" method="post" novalidate data-enhance>
  <label for="n">Your name</label><input id="n" name="name" autocomplete="name" required>
  <label for="e">Email</label><input id="e" name="email" type="email" autocomplete="email" required aria-describedby="e-err">
  <p id="e-err" class="err" hidden>Please enter a valid email.</p>
  <fieldset><legend>Budget</legend>
    <label class="chip"><input type="radio" name="budget" value="<20k">&lt;20k</label>
    <label class="chip"><input type="radio" name="budget" value="20-50k">20–50k</label></fieldset>
  <input name="company_website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true"><!-- honeypot -->
  <button>Send message</button>
  <p role="status" class="sr-only" id="status"></p>
</form>
<script type="module">
for (const f of document.querySelectorAll('form[data-enhance]')) {
  const status = f.querySelector('#status'), btn = f.querySelector('button'), fields = [...f.querySelectorAll('[required]')];
  const validate = el => {   // sets aria-invalid and shows/hides the field's error message
    const ok = el.checkValidity(), err = document.getElementById(el.getAttribute('aria-describedby'));
    ok ? el.removeAttribute('aria-invalid') : el.setAttribute('aria-invalid', 'true');
    if (err) err.hidden = ok;
    return ok;
  };
  fields.forEach(el => el.addEventListener('blur', () => validate(el)));   // validate on blur, not every keystroke
  f.addEventListener('submit', async e => {
    e.preventDefault();
    const bad = fields.filter(el => !validate(el));
    if (bad.length) { status.textContent = 'Please fix the highlighted fields.'; bad[0].focus(); return; }
    btn.disabled = true; status.textContent = 'Sending…';
    const r = await fetch(f.action, { method: 'POST', body: new FormData(f) }).catch(() => null);
    if (!r?.ok) { status.textContent = 'Something went wrong. Email us at hello@studio.com.'; btn.disabled = false; return; }
    const done = Object.assign(document.createElement('h3'), { tabIndex: -1, textContent: 'Message sent ✓' });
    for (const c of [...f.children]) if (c !== status) c.remove();   // keep the live region in the DOM
    status.before(done); status.textContent = 'Thanks! We reply within one working day.'; done.focus();
  });
}
</script>
```

```css
.chip input{position:absolute;opacity:0}
.chip{display:inline-flex;padding:.6em 1.1em;border:1px solid currentColor;border-radius:999px;cursor:pointer}
.chip:has(input:checked){background:var(--fg);color:var(--bg)}
.chip:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:2px}
.hp{position:absolute;left:-9999px}
```

Editor's note: corrected from the research-notes version (was: `f.replaceChildren(...)` deleted the `#status` region and the `#e-err` message was never un-hidden). Forms in general (labels, validation timing) are covered in [actions-inputs.md, 14. Forms and multi-step wizards](actions-inputs.md#14-forms-and-multi-step-wizards).

### Libraries & tools

Cal.com / Calendly inline embeds; Cloudflare Turnstile; Lottie (success animation); `Intl.DateTimeFormat`. No URLs in notes.

### Inspiration links

- [lusion.co](https://lusion.co) (purpose-split emails, studio address)
- [Olivier Larose: Awwwards Landing Page, Sticky Footer](https://blog.olivierlarose.com/tutorials)

### Caveats & verification status

No sourced data comparing form styles (conversational vs standard) for completion rate. Variants [synthesis].

---

## 46. Team and about sections

### What & when

Memorable "about" sections humanise the studio. Common tools are interaction-driven portraits (hover-to-animate, cursor-follow photos), editorial manifestos with scroll-revealed text, and numbers presented honestly. Avoid the grid of identical circular headshots with a blue overlay.

**Cited facts**
- **Olivier Larose text-reveal tutorials:** "Text Gradient Opacity On Scroll" (v1 and v2), "Text Clip Mask On Scroll", "Text Mask Animation", "Text Disperse Effect", "Text Parallax" — the standard building blocks for manifesto-style about sections — [tutorials](https://blog.olivierlarose.com/tutorials).
- **Olivier Larose gallery tutorials:** "Mouse Image Gallery", "Floating Image Gallery", "Mouse Scale Image Gallery" — used for team photo walls.
- **Lusion's about content:** the "About us" page and an "Our Approach" CTA are surfaced in the main navigation — [lusion.co](https://lusion.co).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Scroll-lit manifesto** | One long paragraph at ~4–6vw; each word goes from 15% to 100% opacity as you scroll. Split into words; drive with ScrollTrigger scrub or `animation-timeline: view()` with per-word `animation-range` |
| 2 | **Name list with hover portrait** | Team names as a typographic list; hovering shows the portrait following the cursor (same technique as [47](#47-portfolio-work-showcases-and-case-study-layouts)). On mobile, portraits inline |
| 3 | **Portrait-to-GIF/video on hover** | Still B&W headshots swap to a 2s colour loop or a silly photo on hover. Preload on hover intent |
| 4 | **Floating photo collage** | Polaroids scattered in 3D depth, parallax with the mouse (Olivier Larose "Floating Image Gallery"). Draggable on desktop |
| 5 | **Deck of cards** | Team cards stacked; drag or swipe to cycle; physical rotation and spring |
| 6 | **Timeline / history rail** | Horizontal year rail (2014 → 2026) that pins while milestones slide by. Vertical list on mobile |
| 7 | **Numbers that mean something** | "12 people · 4 languages · 1 dog". Counters animate once on enter, tabular numerals |
| 8 | **Values as interactive glyphs** | Each value has an icon that morphs on hover (MorphSVG is now free) |
| 9 | **Office / studio reel** | Muted documentary loop with a "Play with sound" CTA (see [48](#48-video-players-and-media-embeds)) |
| 10 | **Clients / awards marquee** | Logo or award wall in a single colour, slow marquee. Pause on hover; provide a paused state for WCAG |
| 11 | **"Join us" card** | Open roles embedded in the team grid as a blank silhouette card ("This could be you →") |

### Crafted vs generic

- **Slop:** stock smiling headshots; identical bios ("passionate about innovation"); five fake stats ("100+ happy clients").
- **Craft:** real photography with consistent art direction (same light, crop and backdrop); personality in the copy (favourite tool, a hot take); microinteractions tied to individual people.

### Desktop vs mobile

- Hover reveals become tap-to-expand (`<details>` or a button with `aria-expanded`) or always-visible photos.
- Collages become a swipeable `scroll-snap` row.

### Accessibility

- Word-by-word reveals must keep the text in one DOM paragraph with spans. Do not set `aria-hidden` on the real text. Make sure screen readers read the words as a normal sentence, not a letter-split version character by character.
- Portraits need alt text with the person's name and role, or empty alt if the name is adjacent.
- Under reduced motion, show the full-opacity text.

### Code

No snippet in the notes. Editor's note: counters are covered in [content-display.md](content-display.md) (Timelines, stats/counters & feature sections); text reveals in [../animations/text-animations.md](../animations/text-animations.md).

### Libraries & tools

GSAP ScrollTrigger, MorphSVG (free); CSS `animation-timeline: view()` / `animation-range`.

### Inspiration links

[Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials) (text reveal, galleries); [lusion.co](https://lusion.co).

### Caveats & verification status

No case data on which about-page patterns improve hiring or sales outcomes. Variants [synthesis].

---

## 47. Portfolio, work showcases and case-study layouts

### What & when

The strongest recurring patterns on studio sites:
1. A **typographic project index list** with a cursor-following image or video reveal.
2. A **featured-work grid** with tags and hover video.
3. A **pinned horizontal-scroll gallery**.
4. **Seamless list-to-case-study transitions**, where the thumbnail expands into the case hero.

Case studies that read as crafted follow a narrative of challenge, approach and outcome, using full-bleed media and real metrics.

**Cited facts**
- **Lusion's work showcase** — [lusion.co](https://lusion.co): a "Featured Work" grid of project cards with category tags (concept, web, 3D, animation) and a "See all projects" link. Projects include Oryzo AI, Porsche: Dream Machine, Synthetic Human, Meta: Spatial Fusion, Choo Choo World, DDD 2024. A separate Labs subdomain (labs.lusion.co) holds experiments.
- **Olivier Larose project-gallery tutorials:** "Project Gallery Mouse Hover", "Project Gallery Colored Card", "Image slide project gallery", "Horizontal Scroll", "Horizontal Section", "Cards Parallax", "Zoom Parallax", "3D perspective Scroll", "Mask Section Transition" — [tutorials](https://blog.olivierlarose.com/tutorials).
- **Codrops "Image Reveal Hover Effects" (Nov 2018) [search]:** hovering a link reveals a thumbnail with an effect; built on TweenMax and imagesLoaded; repo codrops/ImageRevealHover, MIT. A related "Rapid Image Hover Menu" by Manoela Ilic animates each item's image in on hover — [Codrops Image Reveal Hover Effects](https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects), [Codrops Design Finds: Detail Hovers on Images (2024)](https://tympanus.net/codrops/2024/05/06/design-finds-detail-hovers-on-images/).
- **View Transitions API** — [Chrome for Developers, Same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document): `document.startViewTransition()` supported for same-document transitions in Chrome since 111; `view-transition-class` and view transition types show support for Chrome 125, Edge 125, Firefox 144 and Safari 18.x. This makes thumbnail-to-hero morphs possible without a framework.
- **NN/g on horizontal scrolljacks:** they confuse users, who try horizontal swipes to get back — [NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Index list with cursor image reveal** | Rows show No., Client, Discipline, Year in mono. Hovering a row shows a floating media panel following the cursor; image swaps per row; panel y-position lerped (snippet) |
| 2 | **Index list with fixed preview** | Same list; preview in a fixed slot on the right half, crossfading or sliding per row. Calmer and more accessible |
| 3 | **Row-height expand** | Hovered row grows to reveal a strip of three thumbnails; other rows dim to 30% opacity |
| 4 | **Featured grid with hover video** | Asymmetric 12-column grid (big / small / small / big). Cards autoplay a muted loop on hover (`play()` on `pointerenter`); poster stays as fallback |
| 5 | **Pinned horizontal gallery** | Section pins while cards translate on x by scroll (ScrollTrigger `pin + scrub`); progress counter "03 / 12". Native swipe carousel on mobile (snippet) |
| 6 | **Drag gallery** | Free-drag canvas of projects with inertia (GSAP Draggable + Inertia, now free); "Drag" cursor label |
| 7 | **Infinite WebGL plane gallery** | Images as textured planes bending with scroll velocity (curved or wave distortion). Lusion / Active Theory register |
| 8 | **Stacked cards** | Each case card sticks and scales down slightly as the next covers it (Olivier Larose "Cards Parallax") |
| 9 | **Zoom-through** | Centre image scales to full-bleed on scroll while surrounding images fly outward (Olivier Larose "Zoom Parallax") |
| 10 | **Filterable archive** | Discipline filters animate the layout with GSAP Flip or a view transition; list/grid toggle |
| 11 | **3D carousel / cylinder** | Projects on a rotating ring, for experimental studios |
| 12 | **Seamless case transition** | Clicked thumbnail morphs into the case hero via `view-transition-name`; cross-document version uses `@view-transition { navigation: auto; }` (snippet) |
| 13 | **"Next project" footer** | Full-bleed teaser of the next case at the end; scroll past it, or hold, to load it |

**Case-study layout grammar (crafted):**
- **Hero:** title, client, role, year, services, live link, plus a full-bleed key visual or video.
- **Then:** challenge → insight → approach.
- **Then:** alternating full-bleed media, 2-up and 3-up grids, before/after sliders.
- **Then:** process artifacts (sketches, wireframes, motion tests) and outcome metrics (real numbers, cited).
- **End:** credits and the next project.
- Sticky section index on desktop.

### Crafted vs generic

- **Slop:** a uniform 3-column grid of identical cards with "Learn more" buttons, a gradient overlay on images, a lorem-like description.
- **Craft:** data-rich list rows (index numbers, disciplines, years); media that *moves* on hover; images pre-decoded so the reveal never flashes blank; cursor label "View" instead of buttons; spatial continuity from list to case.

### Desktop vs mobile

No hover on mobile, so:
- Lists show an inline thumbnail per row, or reveal images on scroll as rows cross the viewport centre (IntersectionObserver with `rootMargin: '-50% 0px -50% 0px'`).
- Horizontal pinned galleries become `overflow-x:auto; scroll-snap-type:x mandatory` with visible partial next cards.
- Hover videos become autoplay-in-view only on Wi-Fi, or a poster plus a play button.

### Accessibility

- List rows are real links whose accessible name is the project title.
- Reveal images are decorative (`alt=""`, `aria-hidden`) because the link text already names the project.
- Horizontal galleries are keyboard-reachable: focusing a card scrolls it into view (`scrollIntoView` in Lenis-aware code).
- Pinned sections must not trap focus.
- Under reduced motion: no pin-scrub; show a vertical stack.

### Code

**Hover image reveal list** [untested snippet]:

```html
<ul class="work" role="list">
  <li><a href="/work/oryzo" data-img="/img/oryzo.avif"><span>01</span><strong>Oryzo AI</strong><em>Web / 3D</em><time>2025</time></a></li>
  <li><a href="/work/atlas" data-img="/img/atlas.avif"><span>02</span><strong>Atlas Motion</strong><em>Motion</em><time>2024</time></a></li>
</ul>
<div class="reveal" aria-hidden="true"><div class="reveal__inner"><img alt=""></div></div>
<style>
.work a{display:grid;grid-template-columns:4ch 1fr auto 6ch;gap:2rem;padding:1.6rem 0;border-top:1px solid var(--line);
  font-size:clamp(1.5rem,4vw,3.5rem);transition:opacity .3s,padding .4s cubic-bezier(.2,.8,.2,1)}
.work:hover a:not(:hover){opacity:.3}
.work a:hover{padding-left:1.5rem}
.reveal{position:fixed;top:0;left:0;width:22vw;aspect-ratio:3/4;pointer-events:none;z-index:40}
.reveal__inner{width:100%;height:100%;overflow:hidden;clip-path:inset(50% 50% 50% 50%);
  transition:clip-path .6s cubic-bezier(.77,0,.18,1)}
.reveal.is-on .reveal__inner{clip-path:inset(0)}
.reveal img{width:100%;height:100%;object-fit:cover;scale:1.2;transition:scale .8s}
.reveal.is-on img{scale:1}
@media not ((hover:hover) and (pointer:fine)){ .reveal{display:none}
  .work a{grid-template-columns:4ch 1fr;} .work a::after{content:"";grid-column:1/-1;aspect-ratio:16/9;
  background:var(--thumb) center/cover} }
</style>
<script type="module">
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const links = document.querySelectorAll('.work a');
links.forEach(a => { a.style.setProperty('--thumb', `url(${a.dataset.img})`); new Image().src = a.dataset.img; }); // preload
if (fine) {
  const box = document.querySelector('.reveal'), img = box.querySelector('img');
  let x = 0, y = 0, cx = 0, cy = 0, vx = 0;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; }, { passive: true });
  (function loop() {
    const t = reduce ? 1 : 0.1, px = cx;
    cx += (x - cx) * t; cy += (y - cy) * t; vx = cx - px;
    box.style.transform = `translate(${cx + 24}px, ${cy}px) translateY(-50%) rotate(${reduce ? 0 : Math.max(-8, Math.min(8, vx * 0.4))}deg)`;
    requestAnimationFrame(loop);
  })();
  links.forEach(a => {
    a.addEventListener('pointerenter', () => { img.src = a.dataset.img; box.classList.add('is-on'); });
    a.addEventListener('focus', () => { img.src = a.dataset.img; }); // keyboard users get the link; image is decorative
  });
  document.querySelector('.work').addEventListener('pointerleave', () => box.classList.remove('is-on'));
}
</script>
```

**Pinned horizontal gallery with a mobile fallback** [untested snippet]:

```js
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.matchMedia({
  '(min-width: 900px) and (prefers-reduced-motion: no-preference)': () => {
    const track = document.querySelector('.h-track');
    gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none',
      scrollTrigger: { trigger: '.h-section', pin: true, scrub: 1, end: () => '+=' + (track.scrollWidth - innerWidth), invalidateOnRefresh: true } });
  }
});
```

```css
/* Default and mobile: native swipe */
.h-track{display:flex;gap:4vw;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding-inline:16px}
.h-track > *{flex:0 0 80vw;scroll-snap-align:start}
@media (min-width:900px) and (prefers-reduced-motion:no-preference){.h-track{overflow:visible}.h-track>*{flex-basis:40vw}}
```

`ScrollTrigger.matchMedia` is the older API; newer GSAP versions use `gsap.matchMedia()`, which does the same job.

**List-to-case morph with the View Transitions API** [untested snippet]:

```js
link.addEventListener('click', async e => {
  if (!document.startViewTransition) return;           // normal navigation fallback
  e.preventDefault();
  link.querySelector('img').style.viewTransitionName = 'case-hero';
  await document.startViewTransition(() => router.go(link.href)).finished; // case page hero has view-transition-name: case-hero
});
```

For multi-page apps, use `@view-transition { navigation: auto; }` in CSS on both pages. Cross-document transitions are Chromium- and Safari-first; Firefox support should be verified.

### Libraries & tools

- GSAP ScrollTrigger (`pin`, `scrub`, `gsap.matchMedia()`), Flip, Draggable, Inertia — all free.
- View Transitions API (same- and cross-document).
- Codrops ImageRevealHover (TweenMax + imagesLoaded, MIT) [search].
- WebGL planes: three.js / OGL (Editor's note: see [content-display.md](content-display.md) for WebGL gallery tutorials).

### Inspiration links

- [lusion.co](https://lusion.co) and labs.lusion.co
- [Olivier Larose project-gallery tutorials](https://blog.olivierlarose.com/tutorials)
- [Codrops Image Reveal Hover Effects [search]](https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects) · [Codrops Design Finds: Detail Hovers on Images (2024) [search]](https://tympanus.net/codrops/2024/05/06/design-finds-detail-hovers-on-images/)

### Caveats & verification status

- Codrops (403) not accessible for the newest 2025–2026 gallery tutorials; Locomotive's site (403) not inspected.
- Cross-document View Transitions support in Firefox as of Nov 2026 not verified.

---

## 48. Video players and media embeds

Custom controls, background video, embeds.

### What & when

The player landscape consolidated in 2025–26:
- **Plyr and Vime are archived.**
- **Vidstack points users to Video.js v10.**
- **Video.js v10** is a ground-up rewrite by the Video.js, Plyr, Vidstack, Media Chrome and Mux Player engineers, with owned, shadcn-style skins and a 9KB background-video player.

For background video, use `autoplay muted loop playsinline` with a poster and lazy loading, and always provide a pause control.

**Cited facts**
- **vidstack.io** — [Vidstack](https://www.vidstack.io/): Vidstack Player is at 1.0; the site says Vidstack "has a new home: Video.js 10". Plyr and Vime are marked "Archived". Supports React, Vue, Svelte, Solid, Angular and web components, with HLS, DASH, YouTube and Vimeo providers. Claims "WCAG 2.2, WAI-ARIA, and CVAA spec-compliant", with keyboard navigation and reduced-motion support.
- **Mux blog on Video.js v10 (Jan 27, 2026)** — [Mux blog](https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10):
  - The engineers behind Media Chrome, Plyr, Vidstack and Mux Player are "rebuilding from scratch", "not merging codebases".
  - Features load only when configured; a background-video player weighs 9KB.
  - React uses hooks and render props; Vue will use composables.
  - Skins are copied into your project and owned, shadcn-style.
  - Timeline: tech preview Oct 2025; beta early March 2026 ("recommended for new projects"); GA planned for mid-2026.
  - Existing players get security patches, but feature work has "slowed or stopped".
- **Press coverage of v10 [search]:** Sam Potts (Plyr's creator) designed the skins; licence stays Apache 2.0. Reported bundle savings conflict: 88% smaller in one outlet, 81% smaller than v8 in another — [MarTech Series](https://martechseries.com/video/video-js-v10-delivers-81-smaller-bundles-as-four-major-player-projects-converge/), [Feedbagel](https://feedbagel.com/post/videojs-v10-beta-released-major-rewrite-combines-four-open-source-video-players).
- **web.dev on autoplaying video** — [web.dev Lazy-loading video](https://web.dev/articles/lazy-loading-video): use `autoplay muted loop playsinline` (`playsinline` is needed for autoplay on iOS); `poster` reserves the space; `preload="none"` avoids downloading data (the default `metadata` still fetches part of the file); use `loading="lazy"` on `<video>` where supported, otherwise an IntersectionObserver that sets autoplay on intersect; videos are much smaller than GIFs of equal quality.
- **WCAG 2.2.2:** auto-starting moving content longer than 5s, shown in parallel with other content, needs pause, stop or hide. The W3C recommends one shared control for all moving elements — [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
- **Lusion** exposes "Play Reel" and a PLAY/MUTE sound toggle — [lusion.co](https://lusion.co).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Full-bleed hero background loop** | Muted, 6–12s, under ~2–4MB. AV1 or H.265 first (WebM AV1 + MP4 H.264 fallback). Poster = first frame. Small "❚❚ Pause" pill in a corner |
| 2 | **"Play reel" expand** | Hero loop with cursor label "Play reel"; click expands via FLIP or a view transition to a fullscreen player with sound; closing reverses the motion |
| 3 | **Cursor-as-control** | Over the video the cursor becomes ▶ or ❚❚ with "Play"/"Pause" labels; scrub bar is a thin line at the bottom that thickens on hover |
| 4 | **Minimal custom bar** | Only play, timeline, mute, fullscreen, in brand type; time display in mono tabular numerals ("00:42 / 02:10") |
| 5 | **Chapter timeline** | Markers on the scrub bar with hover previews (VTT thumbnails). Good for case-study videos |
| 6 | **Scroll-scrubbed video** | `video.currentTime` tied to scroll progress for product spins. Encode all-keyframe (intra-only) or short-GOP so seeking is smooth. On mobile an image sequence on `<canvas>` is often smoother |
| 7 | **Picture-in-picture sticky** | When scrolled out of view, the playing video docks to a corner mini-player |
| 8 | **Hover-preview thumbnails** | Project cards play a muted clip on hover and reset on leave |
| 9 | **Masked video type** | Video inside giant letters. `background-clip:text` doesn't work with video; use SVG `<clipPath>` with text, or `mix-blend-mode: screen` on black text over video |
| 10 | **Sound-on gate** | "Experience with sound" prompt that unlocks audio through a user gesture |
| 11 | **Ambient glow** | Blurred, scaled copy of the current frame drawn to a low-res canvas behind the player (like YouTube's ambient mode) |

### Crafted vs generic

**Pitfalls (performance and accessibility):**
- A background video as the LCP element delays LCP. Make the poster (AVIF/WebP) the LCP element; preload the poster, not the video.
- Autoplay without `muted` and `playsinline` fails on iOS.
- Respect `prefers-reduced-motion` (don't autoplay; show the poster) and `Save-Data` / `prefers-reduced-data` (don't load the video).
- Pause offscreen videos with IntersectionObserver to save battery and CPU.
- Animated GIFs for motion are outdated; use muted video.

### Desktop vs mobile

- Hover-preview and cursor-as-control variants need desktop fallbacks; on mobile use autoplay-in-view only on Wi-Fi, or poster + play button (see [47](#47-portfolio-work-showcases-and-case-study-layouts)).
- Scroll-scrubbed video: image sequence on `<canvas>` is often smoother on mobile.

### Accessibility

- Content videos need captions (`<track kind="captions">`), and audio description if visuals carry meaning.
- Custom controls need a real `<button>` with `aria-label` and `aria-pressed` states, keyboard shortcuts (Space or K, arrows, M, F), and visible focus.
- Background video: a pause control (WCAG 2.2.2), one shared control recommended.

### Code

**Accessible background video with pause toggle** [untested snippet]:

```html
<div class="bgv">
  <video class="bgv__video" muted loop playsinline preload="none" poster="/hero.avif" aria-hidden="true">
    <source src="/hero.av1.webm" type='video/webm; codecs="av01.0.05M.08"'>
    <source src="/hero.mp4" type="video/mp4"></video>
  <button class="bgv__toggle" aria-pressed="false" aria-label="Pause background video">❚❚</button>
</div>
<script type="module">
const v = document.querySelector('.bgv__video'), b = document.querySelector('.bgv__toggle');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData;
let userPaused = reduce;
if (reduce || saveData) { userPaused = true; b.setAttribute('aria-pressed','true'); b.ariaLabel = 'Play background video'; b.textContent = '▶'; }
new IntersectionObserver(([e]) => {
  if (e.isIntersecting && !userPaused) v.play().catch(() => {}); else v.pause();
}, { threshold: 0.25 }).observe(v);
b.addEventListener('click', () => {
  userPaused = !v.paused;            // playing -> user pauses; paused -> user plays
  userPaused ? v.pause() : v.play();
  b.setAttribute('aria-pressed', String(userPaused));
  b.ariaLabel = userPaused ? 'Play background video' : 'Pause background video';
  b.textContent = userPaused ? '▶' : '❚❚';
});
</script>
```

With `preload="none"`, no video bytes download until `play()` is called on intersect. Under reduced motion or Save-Data, nothing loads until the user presses play.

### Libraries & tools

**Recommendations (Nov 2026)** [synthesis]:
- **New projects needing a full player:** Video.js v10. Confirm it has reached GA before relying on it for mission-critical playback; Mux advised waiting for GA.
- **If you are on Mux:** Mux Player, or Video.js v10 with the Mux extensions.
- **Plain background loops:** native `<video>`, or the Video.js v10 background player (9KB).
- **YouTube or Vimeo:** a click-to-load facade, e.g. `lite-youtube-embed` or a poster plus a button, so the iframe and ~1MB of JavaScript load only on intent.
- **Avoid for new builds:** Plyr and Vime (archived). Treat the Vidstack standalone package as legacy.

Editor's note: encoding and asset sourcing are covered in [../assets/video.md](../assets/video.md).

### Inspiration links

- [lusion.co](https://lusion.co) — "Play Reel", PLAY/MUTE toggle
- [Vidstack](https://www.vidstack.io/) · [Mux blog on v10](https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10)

### Caveats & verification status

- Whether Video.js v10 reached GA by Nov 2026 was not confirmed; the post only planned GA for mid-2026.
- Reported v10 bundle-size savings conflict (81% vs 88%).
- `<video loading="lazy">` browser support not verified beyond web.dev's "browsers that support it" wording.
- Plyr's GitHub not visited directly; archived status comes from vidstack.io.
- Mux Player docs not fetched; Mux Player's current relationship to Video.js v10 is unconfirmed.

---

## 49. Maps and location sections

### What & when

Use MapLibre GL JS (open source, no token, now v6, ES-modules-only) with a styled vector map for crafted, on-brand maps. Mapbox GL JS (v3.33, proprietary, token, billed per map load) gives the richest 3D and globe styles. Leaflet suits simple raster maps. The best location sections often avoid an interactive map until intent: they show a stylised static map or illustration plus local time and an address.

**Cited facts**
- **Mapbox GL JS** — [Mapbox GL JS docs](https://docs.mapbox.com/mapbox-gl-js/guides/): current version v3.33.0; an access token is required; Mapbox Standard is the default style when no `style` is given; supports `projection: 'globe'` with `setFog` atmosphere.
- **Mapbox licensing history (third-party):** BSD-3 at v1, proprietary from v2 (Dec 2020), BSL 1.1 at v3 (Sep 2023). Pricing: 50,000 free monthly map loads, then $5.00 per 1,000. Not verified on mapbox.com/pricing — [PkgPulse 2026 guide](https://www.pkgpulse.com/guides/mapbox-vs-leaflet-vs-maplibre-interactive-maps-2026), [StoreRocket](https://storerocket.io/learn/mapbox-alternatives).
- **MapLibre GL JS** — [MapLibre GL JS docs](https://maplibre.org/maplibre-gl-js/docs/): docs examples load `maplibre-gl@^6.16.0`; "Version 6 ships as ES modules only"; works without a token using `demotiles.maplibre.org` styles, including `globe.json`; MapTiler data needs an API key.
- **MapLibre origin and licence (third-party):** a fork of Mapbox GL JS v1.13, the last BSD release. No renderer fee, but you need a tile source (self-hosted or a provider such as MapTiler or Stadia). Sources disagree on BSD-2 vs BSD-3 — [Geoapify comparison](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/), [StoreRocket](https://storerocket.io/learn/mapbox-alternatives).
- **Leaflet (third-party):** BSD-2-Clause, less 3D support than MapLibre; these sources list v1.9 as current — [Geoapify](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/).
- **Olivier Larose "3D Earth" tutorial:** a three.js globe used as a decorative location hero — [tutorials](https://blog.olivierlarose.com/tutorials).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Monochrome brand map** | Custom style in two colours (land = `--bg`, roads = `--line`, water slightly darker). Marker = studio logo or a pulsing dot. Labels in the brand font (MapLibre glyphs need PBF fonts) |
| 2 | **Static map facade** | Pre-rendered PNG/SVG of the styled map with "Open in Maps →" and "Load interactive map" buttons. Zero JS until intent |
| 3 | **Illustrated / isometric location** | Hand-drawn district map or a 3D model of the building; hover hotspots show entrance, parking, transit |
| 4 | **Fly-to multi-office** | List of cities (London / Lisbon / Tokyo); click flies the camera (`map.flyTo({center, zoom, pitch: 60, bearing})`) and shows local time and weather |
| 5 | **Globe with arcs** | Rotating globe (MapLibre or Mapbox globe, or three.js) with arcs from HQ to client cities. Rotation stops under reduced motion |
| 6 | **Scroll-driven route** | Camera follows a path as you scroll (a journey or "how to find us" story), tied to ScrollTrigger progress. This is a scrolljack: keep it short and below the fold |
| 7 | **Typographic address** | No map: giant address, coordinates (51.4545° N, 2.5879° W), a local clock, a "Directions" deep link (`https://maps.apple.com/?daddr=` or `geo:` on Android) |
| 8 | **Map in the cursor** | Hovering the address shows a small map snippet following the cursor ([41](#41-custom-cursors), variant 4) |
| 9 | **Data-viz map** | Project locations as dots that filter the portfolio |

### Crafted vs generic

- **Slop:** a default Google Maps iframe at full width with the standard red pin, which wrecks page weight and visual tone.
- **Craft:** a map styled to brand tokens (including a dark-mode style switched with the theme toggle); a custom marker; hand-picked zoom and bearing; scroll-zoom disabled until click (`cooperativeGestures: true`); attribution kept (legally required) but styled.

### Desktop vs mobile

- Use `cooperativeGestures` so one-finger page scroll isn't captured; two fingers move the map.
- Add `data-lenis-prevent` on the map container when Lenis is used.
- Provide a "Directions" deep link that opens the native maps app.
- Load the map library only when the section is near the viewport or on tap.

### Accessibility

- The map is supplementary: always provide the text address, transit info and a directions link.
- Map controls must be keyboard focusable (MapLibre and Mapbox controls are buttons).
- Container `role="region"` and `aria-label="Map showing studio location"`.
- Disable auto-rotation under reduced motion.

### Code

**Lazy MapLibre with facade and theme-aware style** [untested snippet]:

```html
<section class="loc"><address>12 Harbour St, Bristol BS1 · <a href="https://maps.apple.com/?daddr=51.4545,-2.5879">Directions</a></address>
<div id="map" role="region" aria-label="Map showing studio location" data-lenis-prevent>
  <img src="/map-static.avif" alt="" width="1200" height="600"><button id="loadMap">Load interactive map</button></div></section>
<script type="module">
const load = async () => {
  const { Map, Marker } = await import('https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs');
  const dark = document.documentElement.dataset.theme === 'dark';
  const map = new Map({ container: 'map', style: dark ? '/map/dark.json' : '/map/light.json',
    center: [-2.5879, 51.4545], zoom: 14.5, pitch: 45, cooperativeGestures: true, attributionControl: { compact: true } });
  new Marker({ element: Object.assign(document.createElement('div'), { className: 'pin' }) }).setLngLat([-2.5879, 51.4545]).addTo(map);
};
document.getElementById('loadMap').addEventListener('click', load, { once: true });
</script>
```

The `maplibre-gl.css` stylesheet is also required. Pin an exact version rather than `^6`.

### Libraries & tools

**Library choice** [synthesis]:

| Pick | When |
|---|---|
| MapLibre GL JS v6 + self-hosted PMTiles (Protomaps) or OpenFreeMap / MapTiler / Stadia styles | Fully brand-styled maps without per-load fees |
| Mapbox GL JS v3 | Standard-style 3D buildings, lighting presets, globe and Studio styling, when the budget allows (per-load billing) |
| Leaflet | Lightweight raster maps |
| Google Maps embed iframe | Quick and generic; heavy, so put it behind a facade |
| three.js globe | Decorative location hero (Olivier Larose "3D Earth") |

### Inspiration links

- [Olivier Larose "3D Earth"](https://blog.olivierlarose.com/tutorials)
- [MapLibre docs examples](https://maplibre.org/maplibre-gl-js/docs/)

### Caveats & verification status

- Official Mapbox pricing page not verified; the free-tier figure is from third parties.
- Leaflet 2.0 status (alpha, beta or release) not confirmed.
- MapLibre licence identifier (BSD-2 vs BSD-3) conflicts between sources.

---

## 50. Theme switchers, language switchers, back-to-top and floating elements

### What & when

A crafted theme toggle:
- Avoids the flash of the wrong theme with a blocking inline head script.
- Offers system, light and dark modes.
- Animates with a View Transitions circular reveal from the click point, with reduced-motion fallbacks.

Language switchers should use language names in their own language, not flags. Back-to-top buttons belong only on long pages (more than about 4 screens), bottom-right, labelled, shown after a scroll-up intent, and stationary.

**Cited facts**
- **Chrome for Developers, circular reveal** — [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document): inside `transition.ready.then(...)`, call `document.documentElement.animate({ clipPath: ['circle(0 at Xpx Ypx)', 'circle(Rpx at Xpx Ypx)'] }, { duration: 500, easing: 'ease-in', pseudoElement: '::view-transition-new(root)' })`. Catch errors from `ready` so a skipped transition doesn't break the app.
- **Feature detection:** `if (!document.startViewTransition) { update(); return; }`. Same-document support listed from Chrome 111; types and `view-transition-class` show Chrome/Edge 125, Firefox 144 and Safari 18.x.
- **Reduced motion for view transitions:** Chrome's guidance is `@media (prefers-reduced-motion){ ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*){ animation:none !important } }`. It cautions that reduced motion "doesn't mean the user wants *no motion*" and suggests subtler animations.
- **Josh W. Comeau on theme flash** — [The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/): a blocking inline `<script>` in the head reads `localStorage`, then `matchMedia('(prefers-color-scheme: dark)')`, and sets CSS variables or a marker before first paint. Render the toggle only after the mode is known, so it never shows the wrong state. Add a `<noscript>` or default `<style>` fallback. localStorage reads take about 12µs. The 2026 update notes the approach assumes compile-time HTML and must be adapted per framework.
- **Circular theme reveal implementations [search]:** Magic UI "Animated Theme Toggler" (a React View Transitions component with circle, polygon and star clip-paths and Firefox painting fixes); the "Glassy Blog" vanilla example; a 2026 blog that animates the radius out to the viewport diagonal, with a reduced-motion note — [Magic UI registry](https://magicui.design/r/animated-theme-toggler.json), [Glassy Blog](https://www.github.com/devsandeepsharma/Glassy-Blog), [Raxxo blog](https://raxxo.shop/blogs/lab/view-transitions-api-5-patterns-i-use-across-raxxo-sites-in-2026).
- **NN/g back-to-top guidelines** — [NN/g Back-to-Top](https://www.nngroup.com/articles/back-to-top/): only on pages longer than 4 screens; persistent, lower-right; include a text label ("Back to Top") because an arrow alone is ambiguous; one sticky button per page; small on desktop but tappable on touch, and visually distinct; appear only after several screens *and* an up-scroll signal; stay stationary once visible; never auto-scroll.

### Variants

**Theme toggle variants**

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Circular reveal from the click point** | View Transitions + clip-path (snippet) |
| 2 | **Sun/moon morph** | SVG sun whose rays retract while a mask circle slides in to form a crescent. Animate `r` and `cx` on a `<mask>` circle (CSS transitions on SVG geometry properties in Chromium and Firefox; use transforms for Safari safety) |
| 3 | **Light-switch pull cord** | A cord hangs from the nav; drag it down to toggle, spring physics. Playful; give it a button fallback |
| 4 | **Three-state segmented control** | System / Light / Dark as a radio group with a sliding indicator pill |
| 5 | **Eclipse wipe** | New-theme disc sweeps left to right: `clip-path: inset(0 100% 0 0)` → `inset(0)` on `::view-transition-new(root)` |
| 6 | **Blend-mode flip** | Difference-blend overlay disc expands to cover the screen. Cheap, but also inverts images, so usually unsuitable for real content |
| 7 | **Star / polygon clip** | Clip-path polygon star expands (Magic UI variant). Novelty; use sparingly |
| 8 | **Dim slider** | Continuous "lights" slider interpolating tokens with `color-mix()`. Rare and memorable |
| 9 | **Keyboard shortcut** | Press T (or Cmd+Shift+L) to toggle, with a toast "Dark mode · press T to switch"; `kbd` hint in the nav tooltip |

**Language switcher variants**

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Inline text codes** | "EN / FR / DE" in mono; current underlined, others at reduced opacity |
| 2 | **Native-name dropdown** | "English · Français · 日本語", each wrapped in `lang` and `hreflang` attributes |
| 3 | **Rolling text on hover** | Current code rolls vertically to reveal the next (duplicated-span translateY trick) |
| 4 | **Full-screen menu panel** | Languages listed in the overlay menu beside the time zone |
| 5 | **Auto-suggest banner** | "This page is available in Deutsch → Wechseln" based on `navigator.languages`. Never auto-redirect; let the user choose and remember it |
| 6 | **Morphing transition** | Switching triggers a view transition in which text blocks re-split and re-animate; a signature touch on bilingual studio sites |

Rules for language switchers: no flags (flags mean countries, not languages); each link has `hreflang` and `lang` and keeps the current path (`/fr/work/oryzo`); current language marked `aria-current="true"`; the control sits in the same place on every page (header right, plus the footer).

**Back-to-top and floating action variants**

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | **Labelled pill, bottom-right** | "↑ Back to top", appears after ~4 screens *and* an upward scroll (NN/g) (snippet) |
| 2 | **Progress ring** | Circle whose SVG stroke fills with scroll progress, arrow in the centre; doubles as reading-progress indicator |
| 3 | **Footer "Back to top" link** | Big text link in the footer ("Back to top ↑") with Lenis `scrollTo(0, {duration: 1.6})` and a rocket or elevator joke. Natural, non-intrusive |
| 4 | **Floating "Let's talk" chip** | Persistent bottom CTA pill; hides on scroll-down, shows on scroll-up; hidden while the footer CTA is visible (IntersectionObserver) |
| 5 | **Sound toggle** | Animated equaliser-bars icon with PLAY/MUTE labels (as on Lusion). Off by default; state remembered |
| 6 | **Floating menu button** | Circular "Menu" button that appears after the header scrolls away (magnetic on desktop, thumb-reachable on mobile) |
| 7 | **Copy-email floating chip** | Click copies the address and shows a toast |
| 8 | **Speed-dial FAB** | Expands into contact options (WhatsApp, email, call). Mobile commerce and service sites only |

### Crafted vs generic

- **Crafted:** no theme flash; three states including System; reveal originates from the click point; follows OS changes only when the user hasn't chosen explicitly; native language names; back-to-top only on long pages, after up-scroll intent, labelled.
- **Generic:** flash of the wrong theme; a checkbox that announces only "on/off"; flags for languages; auto-redirect by locale; an arrow-only back-to-top on every page.

### Desktop vs mobile

- Floating elements must respect `env(safe-area-inset-*)` and stay clear of the iOS Safari bottom toolbar and the Android gesture bar.
- Never stack more than one floating element on the same corner.
- Hide floating elements while the on-screen keyboard is open (check `visualViewport` height).

### Accessibility

- Theme toggle is a `<button>` with `aria-pressed`, or a radio group for three states. Do not use a checkbox that announces only "on/off" without context.
- Respect `color-scheme` so form controls and scrollbars match the theme.
- Every floating element must be reachable in a logical tab order and must not cover focused content (WCAG 2.2 SC 2.4.11 Focus Not Obscured). Add `scroll-padding-bottom` equal to the floating element's height.
- Back-to-top must move focus for keyboard and screen-reader users (snippet).

### Code

**No-flash, 3-state, view-transition circular theme toggle** [untested snippet]:

```html
<script>/* inline in <head>, before CSS paints */
(() => { const s = localStorage.getItem('theme'); // 'light' | 'dark' | null (system)
  const dark = s ? s === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'; })();
</script>
<style>
:root{color-scheme:light dark;--bg:#f4f1ea;--fg:#141414}
:root[data-theme="dark"]{--bg:#0e0e0e;--fg:#ece8df}
body{background:var(--bg);color:var(--fg)}
::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}
::view-transition-new(root){z-index:2}
@media (prefers-reduced-motion: reduce){::view-transition-new(root){animation:vt-fade .2s ease both}}
@keyframes vt-fade{from{opacity:0}}
</style>
<button id="themeBtn" type="button" aria-pressed="false" aria-label="Dark mode">◐</button>
<script type="module">
const btn = document.getElementById('themeBtn'), root = document.documentElement;
const sync = () => btn.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
sync();
btn.addEventListener('click', async e => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  const apply = () => { root.dataset.theme = next; localStorage.setItem('theme', next); sync(); };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) { if (document.startViewTransition) document.startViewTransition(apply); else apply(); return; }
  const x = e.clientX || innerWidth / 2, y = e.clientY || innerHeight / 2;   // keyboard activation -> centre
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = document.startViewTransition(apply);
  try { await t.ready;
    root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 600, easing: 'cubic-bezier(.65,0,.35,1)', pseudoElement: '::view-transition-new(root)' });
  } catch {}
});
// Follow OS changes only when the user hasn't chosen explicitly
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', m => {
  if (!localStorage.getItem('theme')) { root.dataset.theme = m.matches ? 'dark' : 'light'; sync(); } });
</script>
```

Notes:
- Keyboard clicks report `clientX` of 0, so the code falls back to the viewport centre (or use the button's rect centre).
- Add a "System" option (clears `localStorage`) via a menu or a segmented control.
- Images: swap via `<picture><source media="(prefers-color-scheme: dark)">` only for the system preference. For a manual toggle, use CSS `[data-theme=dark] .logo{content:url(...)}` or two `<img>` elements with display toggles.

**Intent-based back-to-top** [untested snippet]:

```js
const btn = document.querySelector('.to-top'); let last = scrollY;
addEventListener('scroll', () => {
  const y = scrollY, up = y < last, deep = y > innerHeight * 4;   // deep implies a page longer than 4 screens
  if (y < innerHeight) btn.removeAttribute('data-visible');        // back near the top: hide
  else if (deep && up) btn.setAttribute('data-visible', '');      // once shown, stays put on later down-scrolls (NN/g)
  last = y;
}, { passive: true });
btn.addEventListener('click', () => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.lenis ? lenis.scrollTo(0, { immediate: reduce }) : scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  document.querySelector('#top, h1')?.focus({ preventScroll: true });   // move focus for keyboard and screen-reader users
});
```

```css
.to-top{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));
  min-height:44px;padding:0 16px;border-radius:999px;opacity:0;translate:0 12px;pointer-events:none;transition:opacity .3s,translate .3s}
.to-top[data-visible]{opacity:1;translate:0 0;pointer-events:auto}
```

For the focus call to work, the `h1` or `#top` target needs `tabindex="-1"`.

Editor's note: corrected from the research-notes version (was: visibility toggled on every scroll-direction change, so the button hid again on the next down-scroll).

### Libraries & tools

- View Transitions API (native); Magic UI "Animated Theme Toggler" (React, shadcn registry) [search]; Lenis `scrollTo`.
- Editor's note: theme tokens and `color-scheme` are covered in [../foundations/design-tokens-color-type.md](../foundations/design-tokens-color-type.md).

### Inspiration links

- [Chrome for Developers, same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- [Josh W. Comeau, The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)
- [Magic UI Animated Theme Toggler [search]](https://magicui.design/r/animated-theme-toggler.json) · [Glassy Blog [search]](https://www.github.com/devsandeepsharma/Glassy-Blog) · [Raxxo blog [search]](https://raxxo.shop/blogs/lab/view-transitions-api-5-patterns-i-use-across-raxxo-sites-in-2026)
- [lusion.co](https://lusion.co) — sound toggle

### Caveats & verification status

- Current Safari and Firefox support for same-document View Transitions on the root not verified (Safari 18 and Firefox 144 badges appeared only on the types and class subsection).
- No study on theme-toggle discoverability or placement found.
- WCAG 2.4.11 reference is from the notes' synthesis.

---

## Cross-cutting: recurring patterns, learning path and studios

**Takeaway.** Across the sources reached, these patterns recur: cursor-driven media reveals; scroll-tied typographic reveals; counter or curtain intros; magnetic and labelled interactions; giant-type CTAs merged into footers; horizontal and stacked galleries; WebGL scroll scenes (on studios like Lusion). The most complete free curriculum covering these one by one is Olivier Larose's tutorial library, alongside Codrops (2018–2025 demos), GSAP (now fully free), the Lenis docs and the Chrome View Transitions docs.

**Cited facts**
- **Olivier Larose's library:** ready-to-follow tutorials for almost every pattern in this file, grouped into Cursor, Buttons, Hover gallery, Text reveal, Smooth scroll, Parallax, Footers, Menus, Scroll, Mouse, 3D and an "Awwwards Landing Page" — [tutorials](https://blog.olivierlarose.com/tutorials).
- **GSAP:** all plugins free under Webflow (SplitText, ScrollSmoother, MorphSVG, Flip, Observer). This removes the old "Club GreenSock" paywall that used to push people toward alternatives, so any advice that these plugins are paid is outdated — [GSAP pricing](https://gsap.com/pricing/).
- **Lusion (studio reference)** — [lusion.co](https://lusion.co): hero line "We create 3D visual storytelling and interactive web experiences"; a "scroll to explore" prompt; a Menu/Close toggle; featured-work cards with discipline tags; "Play Reel"; a sound PLAY/MUTE toggle; a newsletter signup; a big "Let's work together!" CTA; a Labs subdomain for experiments.
- **Godly:** godly.website now 301-redirects to `recent.design/?ref=godly` (observed 5 Nov 2026). Update bookmarks and old references — [godly.website (redirect)](https://godly.website/).
- **Codrops classics [search]:** "Custom Cursor Effects" (2019), "Image Reveal Hover Effects" (2018), "Rapid Image Hover Menu", "Design Finds: Detail Hovers on Images" (2024) — [Codrops 2019](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/), [Codrops 2018](https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects).
- **Josh W. Comeau:** canonical dark-mode no-flash technique (updated 2026) — [joshwcomeau.com](https://www.joshwcomeau.com/react/dark-mode/).

**Recommended learning path** [synthesis]:
1. Lenis plus the GSAP ticker setup.
2. Olivier Larose: Blend Mode Cursor, Magnetic Button, Project Gallery Mouse Hover, Text Gradient Opacity On Scroll, Sticky Footer, Svg Curve Loading.
3. Codrops classics for cursor and hover-reveal variations.
4. Chrome View Transitions docs for theme toggles and page transitions.
5. Josh Comeau for dark-mode correctness.
6. NN/g for the constraints on scrolljacking, progress indicators and back-to-top buttons.

**Studios to study** (names commonly cited; only Lusion was fetched this session) [training knowledge]: Lusion (WebGL scroll and reel), Active Theory (WebGL experiences), Locomotive (smooth-scroll and editorial grids; site blocked fetching), Resn (playful interaction), Obys (typographic motion and preloaders), Immersive Garden (luxury WebGL), Darkroom/Studio Freight (makers of Lenis).

**Distinctiveness formula** [synthesis]: one signature interaction tied to the brand idea; a coherent motion system (same easing, lerp and timing everywhere); real content and photography; graceful fallbacks on touch and under reduced motion. Generic sites stack every effect at once.

**Gaps.** Awwwards SOTD/SOTM pages for specific 2026 winners were not fetched, so no verified 2026 winners or their exact patterns are listed. Codrops, Locomotive, Active Theory, Resn, Obys and Immersive Garden sites were not successfully inspected; their pattern attributions come from general knowledge. Frontend Masters course content was not reviewed.

---

## Cross-cutting: performance and accessibility pitfalls checklist

**The four most common failures:**
1. Hiding the native cursor sitewide and animating layout properties.
2. Scroll-rate or direction hijacking, especially on mobile.
3. Fake preloaders that delay already-ready content or keep it invisible when JavaScript fails.
4. Background video that becomes the LCP element, autoplays without a pause control, or ignores reduced-motion and Save-Data preferences.

**Cited basis:** scrolljacking causes disorientation and fatigue, worse with text and on mobile, horizontal direction changes confuse ([NN/g](https://www.nngroup.com/articles/scrolljacking-101/)); Lenis honours reduced motion by default, is capped at 60fps in Safari / 30fps in Low Power Mode, and stops smoothing over iframes ([Lenis](https://github.com/darkroomengineering/lenis)); WCAG 2.2.2 pause/stop/hide for auto-moving content over 5s next to other content, one shared control recommended, sole-content preloader exempt ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)); use a progress indicator above ~1s, avoid static "Loading…", pace percent bars slow then fast ([NN/g](https://www.nngroup.com/articles/progress-indicators/)); `playsinline` required for iOS autoplay, `preload="none"` + poster prevents wasted bytes ([web.dev](https://web.dev/articles/lazy-loading-video)); `pointer`/`hover` test the primary input only, `any-pointer` detects secondary devices ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)); blend-mode cursors block clicks without `pointer-events:none` ([Webflow forum](https://discourse.webflow.com/t/cursor-blending-mode-difference/172083)); Olivier Larose's blend-cursor tutorial handles no touch input, so production code must add gating ([Olivier Larose](https://blog.olivierlarose.com/tutorials/blend-mode-cursor)).

**Checklist** [synthesis]:

| Area | Must do |
|---|---|
| Cursors | Gate behind `(hover:hover) and (pointer:fine)` · `pointer-events:none` + `aria-hidden` · animate transforms only · one rAF loop, paused when `document.hidden` · never `cursor:none` globally · reduced motion → lerp 1, no trails · restore native I-beam over inputs |
| Scroll | Lenis on wheel only · keep anchors and find-in-page working · `lenis.stop()` while overlays are open · no horizontal hijack on mobile · keep sticky navigation as escape hatch · avoid long scrolljacks above the fold |
| Preloaders | Inline loader CSS · ~1.2s minimum and ~3s cap · once per session · skip under reduced motion · `inert` on main, then focus management · never blank the page if JS fails |
| Background video | Poster as LCP · AV1/H.264 sources under a few MB · pause offscreen · pause button · honour reduced motion and Save-Data · captions for content videos |
| General | Test on a mid-range Android phone with 4× CPU throttling · keep INP low (avoid heavy `pointermove` handlers; read layout once per frame) · WebGL scenes need a static fallback image and a `webglcontextlost` handler |

**Gap.** No measured study of custom-cursor impact on INP; inferred from general rendering principles.

---

## Cross-cutting: outdated techniques (Nov 2026)

| Outdated | Use instead |
|---|---|
| Plyr, Vime (archived) | Video.js v10, Mux Player, native `<video>` |
| Standalone Vidstack for new projects | Video.js v10 |
| Locomotive Scroll v4 | Lenis (or native + scroll-driven animations) |
| "GSAP plugins are paid" | All GSAP plugins free (Webflow) |
| Mapbox GL JS v1 forks other than MapLibre | MapLibre GL JS v6 |
| Raw full-width Google Maps iframes without a facade | Static facade + lazy interactive map |
| Animated GIFs for motion | Muted video |
| `::-webkit-scrollbar` as the only scrollbar styling | `scrollbar-color` + `scrollbar-width` |
| Custom `wheel` listeners calling `preventDefault`; `smooth-scrollbar` / `iScroll` virtual scrolling | Lenis / native scroll |

Gaps: Leaflet 2.0 status unconfirmed; Video.js v10 GA unverified; Mux Player docs not fetched.

---

## Sources

Fetched (5 Nov 2026):
- Lenis README — https://github.com/darkroomengineering/lenis
- NN/g Scrolljacking 101 — https://www.nngroup.com/articles/scrolljacking-101/
- NN/g Progress Indicators — https://www.nngroup.com/articles/progress-indicators/
- NN/g Back-to-Top — https://www.nngroup.com/articles/back-to-top/
- Chrome for Developers, Same-document view transitions — https://developer.chrome.com/docs/web-platform/view-transitions/same-document
- MDN mix-blend-mode — https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- MDN @media pointer — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer
- Olivier Larose tutorials index — https://blog.olivierlarose.com/tutorials
- Olivier Larose, Blend Mode Cursor — https://blog.olivierlarose.com/tutorials/blend-mode-cursor
- Vidstack — https://www.vidstack.io/
- Mux blog, Video.js v10 — https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10
- W3C Understanding SC 2.2.2 — https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- Josh W. Comeau, The Quest for the Perfect Dark Mode — https://www.joshwcomeau.com/react/dark-mode/
- web.dev Lazy-loading video — https://web.dev/articles/lazy-loading-video
- GSAP pricing — https://gsap.com/pricing/
- Lusion — https://lusion.co
- Mapbox GL JS docs — https://docs.mapbox.com/mapbox-gl-js/guides/
- MapLibre GL JS docs — https://maplibre.org/maplibre-gl-js/docs/

Third-party / search-result sources:
- Webflow forum — https://discourse.webflow.com/t/cursor-blending-mode-difference/172083
- Divi Lover — https://divilover.com/?p=36473
- Lay Theme forum — https://www.laythemeforum.com/post/37929
- Codrops Custom Cursor Effects — https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/
- Codrops cursor tag — https://tympanus.net/codrops/tag/cursor
- Codrops Image Reveal Hover Effects — https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects
- Codrops Design Finds: Detail Hovers on Images — https://tympanus.net/codrops/2024/05/06/design-finds-detail-hovers-on-images/
- Framer marketplace, Magic Blend Cursor — https://www.framer.com/marketplace/components/magic-blend-cursor/
- npm cursor-effects — https://npmjs.com/package/cursor-effects
- Awwwards preloader tag and entries — https://www.awwwards.com/inspiration/preloader, https://www.awwwards.com/inspiration/pre-loader-monolith, https://www.awwwards.com/inspiration/garbage-loading-animation, https://www.awwwards.com/inspiration/jon-way-loading-animation
- HTML Burger, website preloaders — https://htmlburger.com/blog/website-preloaders/
- MarTech Series, Video.js v10 — https://martechseries.com/video/video-js-v10-delivers-81-smaller-bundles-as-four-major-player-projects-converge/
- Feedbagel, Video.js v10 beta — https://feedbagel.com/post/videojs-v10-beta-released-major-rewrite-combines-four-open-source-video-players
- PkgPulse, maps 2026 — https://www.pkgpulse.com/guides/mapbox-vs-leaflet-vs-maplibre-interactive-maps-2026
- StoreRocket, Mapbox alternatives — https://storerocket.io/learn/mapbox-alternatives
- Geoapify, map libraries comparison — https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/
- Magic UI Animated Theme Toggler — https://magicui.design/r/animated-theme-toggler.json
- Glassy Blog — https://www.github.com/devsandeepsharma/Glassy-Blog
- Raxxo blog — https://raxxo.shop/blogs/lab/view-transitions-api-5-patterns-i-use-across-raxxo-sites-in-2026
- godly.website (redirects to recent.design) — https://godly.website/

Blocked during research: tympanus.net/codrops (403), locomotive.ca (403), Awwwards custom-cursor collection (404).

Source note: `research_notes/UI components animations and assets/05_signature_experiential_components.md`.
