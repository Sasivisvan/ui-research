# Signature & Experiential UI Components for Web (Desktop + Mobile), November 2026

Scope: custom cursors, smooth scrolling and scrollbars, preloaders, CTA and newsletter, contact, team and about, portfolio and case-study showcases, video and media, maps, plus theme and language switchers, back-to-top and floating elements.

How to read this:
- **Cited Findings** are facts taken from pages fetched during this session (5 Nov 2026), or seen in search results, which is noted where it applies.
- **Inferences** hold the variant catalogues, craft guidance and code snippets. These are practitioner synthesis I built from the cited techniques. They were not copied from a single source, and they have not been run in a browser.
- Each component section ends with **Gaps** that list what could not be verified.

Source access during research:
- These pages loaded and were read: Lenis README (GitHub), NN/g (scrolljacking, progress indicators, back-to-top), Chrome for Developers (same-document View Transitions), MDN (mix-blend-mode, @media pointer), the Olivier Larose tutorial index and Blend Mode Cursor tutorial, vidstack.io, Mux blog (Video.js v10), W3C WCAG 2.2 Understanding 2.2.2, Josh W. Comeau's dark-mode article, web.dev lazy-loading-video, gsap.com/pricing, lusion.co, Mapbox GL JS docs, and MapLibre GL JS docs.
- These pages blocked fetching: tympanus.net/codrops (HTTP 403), locomotive.ca (403) and the Awwwards custom-cursor collection URL (404). Codrops articles cited below were seen in search results only.
- godly.website now answers with a 301 redirect to `recent.design/?ref=godly`.

---

## 1. Custom cursors (dot+ring follower, blend-mode, magnetic, labelled "View/Drag", trails, image-reveal cursors)

### Takeaway
A custom cursor is a decorative layer drawn on top of the real pointer. On sites that do it well, it carries meaning: it labels an action ("View", "Drag", "Play"), or it changes state on hover. Build it with one `requestAnimationFrame` (rAF) loop using lerp and transforms only, and turn it on only under `(hover: hover) and (pointer: fine)`. Keep the native cursor available, or hide it only inside specific zones, never sitewide.

### Cited Findings
- **Olivier Larose's Blend Mode Cursor tutorial:**
  - It uses React refs to store the mouse position and the delayed position, so React does not re-render on every mouse move.
  - A rAF loop runs `lerp(start, end, 0.075)`, and `gsap.set(circle, {x, y, xPercent:-50, yPercent:-50})` positions the circle.
  - The circle uses `mix-blend-mode: difference`, `pointer-events: none` and `position: fixed`.
  - On hover the circle grows from 30px to 400px with `filter: blur(30px)`, using CSS transitions on width, height and filter.
  - A multi-circle variant staggers each circle's transition duration by index, which produces a trailing effect.
  - The tutorial does not handle touch or pointer events at all.
  - [Olivier Larose – Blend Mode Cursor](https://blog.olivierlarose.com/tutorials/blend-mode-cursor)
- **Olivier Larose cursor tutorials:** Blend Mode Cursor, Sticky Cursor, Mask Cursor Effect, Pixel Cursor Trailing, Cartoon Cursor Trailing, and Magnetic Button. Related mouse effects: Mouse Image Distortion, Paint Reveal, Gradient Mouse Move, and Svg Bezier Curve. [Olivier Larose tutorials index](https://blog.olivierlarose.com/tutorials)
- **mix-blend-mode on MDN:**
  - Values: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, luminosity, plus-darker and plus-lighter.
  - The element blends with what is behind it *within its stacking context*, and it creates a stacking context itself.
  - `isolation: isolate` on a parent stops the blend from reaching past it.
  - Baseline "widely available" since January 2020.
  - [MDN mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
- **The pointer media query on MDN:** `pointer` has the values `none`, `coarse` and `fine`. It tests only the *primary* input. `any-pointer` tests any available device, for example a touchscreen laptop with a mouse attached. [MDN @media pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- **Forum fixes for blend-mode cursors:**
  - A Webflow forum answer: give the cursor element `pointer-events: none` so links stay clickable.
  - A Divi tutorial commenter reported that the cursor blocked clicks when this was missing.
  - Lay Theme forum users warn that the default arrow can still show through `cursor:none` in some contexts.
  - Seen in search results: [Webflow forum](https://discourse.webflow.com/t/cursor-blending-mode-difference/172083), [Divi Lover](https://divilover.com/?p=36473), [Lay Theme forum](https://www.laythemeforum.com/post/37929)
- **Codrops "Custom Cursor Effects" (Jan 2019):** five demos built from a small dot plus a canvas-drawn ring, used for navigation, galleries and carousels. Seen in search results: [Codrops Custom Cursor Effects](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/)
- **Other Codrops cursor items:** an "Animated Custom Cursor" repo built on SVG filters (last pushed March 2021), and a stop-motion p5.js crayon cursor tutorial. Seen in search results: [Codrops cursor tag](https://tympanus.net/codrops/tag/cursor)
- **Commercial physics-based blend cursor:** Framer's marketplace sells a "Magic Blend Cursor" component. [Framer marketplace](https://www.framer.com/marketplace/components/magic-blend-cursor/)
- **Retro trail effects:** tholman's `cursor-effects` npm library offers 90s-style trails such as sparkles and emoji. It was last pushed January 2025. [npm cursor-effects](https://npmjs.com/package/cursor-effects)

### Inferences

#### Variant catalogue (rebuild specs)
1. **Dot + lagging ring.**
   - A 6px dot snaps to the pointer, either with no lerp or with lerp 0.35–0.5.
   - A 32–40px ring with a 1px border trails behind at lerp 0.12–0.18.
   - Over links, the ring grows to about 64px and the dot fades out.
   - On mousedown, the ring scales to 0.8.
   - This is the canonical Codrops-era pattern.
2. **Difference-blend disc.**
   - A white disc, 20px at rest and 80–120px over text, set to `mix-blend-mode: difference`.
   - It inverts whatever is under it: black on white, white on black.
   - It looks best over large headlines. Make it grow when the pointer is over `h1` or `[data-cursor="invert"]`.
3. **Labelled cursor (contextual verbs).**
   - The ring expands into a pill or circle about 90px across that holds a single word: "View", "Drag", "Play", "Open", "Next →", "Close".
   - Set the label with `data-cursor-label="Drag"` on the target element.
   - Common on project cards and sliders.
4. **Media-preview cursor (image-reveal cursor).**
   - Hovering a list item shows a 280×360 image or muted video clip that follows the cursor with lerp 0.1.
   - It enters with a clip-path from `inset(50% 50% 50% 50%)` to `inset(0)` and a slight rotation that depends on velocity.
   - See the full code in section 7.
5. **Magnetic targets.**
   - Buttons pull toward the cursor within a radius, translating by about 0.3–0.4× the offset from their centre.
   - The inner label moves about 0.6× for parallax.
   - On leave, the button snaps back with an elastic ease, for example GSAP `elastic.out(1, 0.3)`.
   - Covered by Olivier Larose's "Magnetic Button" and "Sticky Cursor" tutorials.
6. **Sticky or morphing cursor.**
   - Over an icon button, the cursor ring morphs to the button's bounding box and border-radius: it reads `getBoundingClientRect` and lerps width, height and radius.
   - The effect is that the cursor "becomes" the hover state. This is what Olivier Larose's "Sticky Cursor" tutorial does.
7. **Mask or spotlight cursor.**
   - A circular `mask-image: radial-gradient(circle at var(--x) var(--y), #000 0 120px, transparent 121px)` on a second copy of the hero shows alternate content inside the circle.
   - Examples of the alternate content: a sketch under a photo, or the "real" text under a polite one.
   - Covered by Olivier Larose's "Mask Cursor Effect" tutorial.
8. **Image trail.**
   - Moving the pointer stamps images from a pool every N px of distance travelled, typically 80–120px.
   - Each stamp scales and fades out over 0.6–1s.
   - Variants: stack and rotate, zoom from the cursor, or a grid snap.
   - Pixel and cartoon trails also exist (Olivier Larose tutorials).
9. **Canvas or WebGL fluid and ink trail.**
   - A metaball or fluid simulation follows the pointer, often revealing a second image through a distortion texture.
   - This is the Lusion and Active Theory register. It needs a GPU budget and a fallback.
10. **Crosshair or coordinate cursor.**
    - Thin full-viewport horizontal and vertical lines meet at the pointer.
    - A small mono label shows live `x:0423 y:0188` values or the project index.
    - Suits technical, architectural and editorial brands.
11. **Text-on-path cursor.**
    - A circular SVG `textPath` such as "• SCROLL • SCROLL" rotates slowly around the dot.
    - Its speed increases with pointer velocity.
12. **Velocity-squash cursor.**
    - The ring stretches along the movement vector: scaleX = 1 + speed × 0.004, rotation = atan2(dy, dx).
    - Gives a gooey, physical feel.
13. **Native CSS cursor (`cursor: url(cursor.svg) 8 8, auto`).**
    - Zero lag and zero JavaScript, and assistive settings are preserved.
    - Best for brand-shaped pointers in a small area, such as a game section.
    - Limits: about 32×32 recommended (larger images may be ignored by some browsers), and no animation.
14. **Hidden-until-meaningful cursor.**
    - The native cursor stays everywhere.
    - A custom label appears only over carousels and media ("Drag", "Play").
    - This is the safest high-craft option.

#### Craft vs "AI slop"
- **Slop signs:**
  - A generic dot plus ring sitewide, with no state changes.
  - The ring lags 300ms behind and makes clicking feel sluggish.
  - `cursor:none` on the whole `body`.
  - The cursor shows on phones as a stuck circle at 0,0.
  - The blend mode turns brand colours into muddy complements.
- **Craft signs:**
  - The cursor *says something*: it uses contextual verbs and morphs to the target.
  - It fades in and scales up on the first `pointermove`, so it never appears at the top-left corner.
  - It hides on `pointerleave` of the document and over iframes and form inputs, where the native I-beam returns.
  - Easing and lerp match the site's motion system: the same lerp as the Lenis scroll.
  - The cursor colour is a design token, and the blend is isolated with `isolation: isolate` on sections where difference would clash.

#### Desktop vs mobile
- Enable the cursor only with `matchMedia('(hover: hover) and (pointer: fine)')`. Listen for `change` so that iPads with trackpads and hybrid laptops switch live.
- On touch, replace the cursor's meaning with visible UI: show "Drag →" hints on sliders and permanent "View" labels on cards.
- An image-reveal-on-hover list becomes inline thumbnails, or reveal-on-scroll using IntersectionObserver.

#### Accessibility
- Never apply `cursor:none` globally. It breaks OS large-cursor and high-contrast pointer settings and screen magnifiers, and users lose the pointer whenever JavaScript stalls.
- If you must hide the native cursor, hide it only on elements that have the custom cursor (`[data-cursor-zone]`), and only after JavaScript has started the follower.
- Under `prefers-reduced-motion: reduce`:
  - Set lerp to 1, so the follower snaps to the pointer.
  - Disable trails and magnetism.
  - Or disable the cursor entirely.
- Always set `pointer-events:none` and `aria-hidden="true"` on the cursor element.
- Keyboard focus must have its own visible `:focus-visible` style. Do not rely on cursor hover states.
- Give custom cursor labels contrast and keep them short.

#### Snippet A: lerp dot+ring with labels, gated and reduced-motion-aware
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
Notes:
- Only `transform` is animated, and the sizes change through CSS transitions. Moving the cursor with `top` and `left` would force layout on every frame.
- If GSAP is already loaded, `gsap.quickTo(ring, 'x', {duration: .5, ease: 'power3'})` is an equivalent, tidier way to smooth the movement.

#### Snippet B: difference-blend cursor
```css
.blend-cursor{position:fixed;top:0;left:0;width:20px;height:20px;margin:-10px;border-radius:50%;
  background:#fff;mix-blend-mode:difference;pointer-events:none;z-index:9999;
  transition:width .4s,height .4s,margin .4s}
.blend-cursor.is-big{width:120px;height:120px;margin:-60px}
/* Blending only reaches content in the same stacking context. Keep the cursor a direct child of <body>,
   and don't give <body> or its wrappers isolation, transform or filter. */
.no-blend{isolation:isolate} /* opt-out zones where inversion would clash with brand colors */
```
Pure white combined with `difference` gives a true inversion. Any other colour produces its complement, so test the cursor against brand colours.

#### Snippet C: magnetic button
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
Pad the hit area, for example with a `::before` inset of -20px, so the pull starts before the pointer reaches the visible edge.

#### Snippet D: distance-threshold image trail
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
Use a pool of 8–12 pre-decoded images, `loading="eager"` and `decoding="async"`, each with `position:fixed`, `top:0` and `left:0`.

### Gaps
- I could not open Codrops pages (403), so the 2023–2026 cursor tutorials there are not catalogued from the source.
- The Awwwards "custom cursor" collection URL returned 404, so I have no verified curated list.
- I found no quantitative study on custom-cursor usability or input latency.

---

## 2. Custom scrollbars & smooth scrolling (Lenis)

### Takeaway
Lenis (darkroom.engineering) is the de facto smooth-scroll library in 2026. Unlike the old Locomotive Scroll v4 and ScrollSmoother-style transform approaches, it keeps native scroll, so `position: sticky`, IntersectionObserver and Cmd+F keep working. It honours reduced motion by default. Scrolljacking that changes the scroll rate or direction tests poorly, especially on mobile.

### Cited Findings
- **Lenis basics:**
  - Current version 1.3.27. Install with `npm i lenis`, or use the CDN at `unpkg.com/lenis@1.3.27/dist/lenis.min.js`.
  - Import the required CSS with `import 'lenis/dist/lenis.css'`.
  - Setup is either `new Lenis({ autoRaf: true })` or a manual `requestAnimationFrame` loop that calls `lenis.raf(time)`.
  - [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **GSAP integration in the Lenis README:**
  - `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add((time)=>{ lenis.raf(time*1000) }); gsap.ticker.lagSmoothing(0);`
  - [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **Lenis options:**

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

  [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **Lenis opt-out attributes:** `data-lenis-prevent`, plus the `-wheel`, `-touch`, `-vertical` and `-horizontal` variants. `allowNestedScroll: true` handles nested scrollers but "can hurt performance". [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **Lenis limitations:**
  - No CSS scroll-snap support; use the `lenis/snap` package instead.
  - Capped at 60fps in Safari and 30fps in Low Power Mode.
  - Smooth scroll stops over iframes.
  - `position: fixed` may lag in pre-M1 macOS Safari.
  - [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **Lenis and reduced motion:**
  - `respectReducedMotion` defaults to true. When the user prefers reduced motion, lerp is forced to 1 and programmatic scrolls jump instantly.
  - Lenis keeps running so WebGL and DOM sync still work, and the preference updates live.
  - `lenis.prefersReducedMotion` is exposed.
  - Turning the default off is "not recommended".
  - [Lenis GitHub](https://github.com/darkroomengineering/lenis)
- **NN/g usability findings on scrolljacking:**
  - Most participants were at least mildly disoriented. Long scrolljacks made some users think the page was broken.
  - Fast rates made users miss content, and slow rates caused fatigue.
  - Text combined with altered scrolling was the worst case.
  - Horizontal scrolljacks confused users about how to get back to the top.
  - Mobile is worse.
  - Sticky navigation gave users an escape route.
  - [NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- **NN/g recommendations:**
  - Use scrolljacking only for functional value.
  - Tune the scroll rate through testing.
  - Mix in normal scrolling and keep the direction consistent.
  - Keep important text out of scrolljacks.
  - Avoid it on mobile and place it below the fold.
  - [NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)
- **GSAP is now free:** GSAP is "100% free for all users, thanks to Webflow's support". That includes SplitText, ScrollSmoother, MorphSVG, Flip and Observer. The footer reads "A Webflow Product". [GSAP pricing](https://gsap.com/pricing/)

### Inferences

#### Smooth-scroll variant catalogue
1. **Lenis default** (lerp 0.1, wheel only): the baseline "premium feel".
2. **Heavier inertia** (lerp 0.06–0.08) for editorial and luxury sites. Do not go below 0.05: it feels like scrolling through syrup, which is the "fatigue" NN/g describes.
3. **Duration-based easing** (`duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t))`) for exponential-out scrolling.
4. **Lenis plus ScrollTrigger pinning**: sticky storytelling chapters.
5. **Horizontal wrapper** (`orientation: 'horizontal'` or `gestureOrientation: 'both'`) for full-site sideways galleries. Use it only for galleries; see NN/g.
6. **Infinite loop** (`infinite: true`) for gallery or "endless" portfolio pages.
7. **Snap sections** via `lenis/snap`, for slideshow-like decks.
8. **Velocity-reactive effects**: read `lenis.velocity` to skew images, stretch type or speed up marquees.
9. **Scroll-linked WebGL**: drive shader uniforms from `lenis.scroll` (the Lusion and Active Theory approach).
10. **CSS-only alternative**: no smoothing at all. Use native scroll with CSS scroll-driven animations (`animation-timeline: view()` or `scroll()`) for reveals and parallax. This needs zero JavaScript and is the most accessible option.

#### Custom scrollbar variants
1. A thin token-coloured bar: `scrollbar-width: thin; scrollbar-color: var(--fg) transparent;`. This is the standard properties version and now cross-browser. Use `::-webkit-scrollbar` only as a legacy fallback.
2. A hidden native bar plus a custom **progress rail**: a 2px fixed line at the right or top edge whose `scaleY` or `scaleX` follows scroll progress. Pure CSS works: `animation: grow linear; animation-timeline: scroll(root);`.
3. A **chapter index rail**: dots or section numbers (01–06) on the right edge that fill as each section passes. They are clickable and call `lenis.scrollTo('#id')`.
4. A **percentage counter** in the corner ("037%"), in mono type.
5. A **draggable custom thumb** for horizontal galleries, with a visible "Drag" label.
6. A **minimap**: a scaled-down screenshot of the page with a viewport rectangle. Rare and memorable.

#### Craft vs slop
- **Slop:** smoothing on every device, including touch, where it fights native momentum. Scroll-rate hijacking over text blocks. A hidden scrollbar with no alternative progress cue. Smooth scroll breaking anchor links and the browser's find-in-page.
- **Craft:**
  - Lenis on wheel only (`syncTouch:false`, the default).
  - Anchors enabled with an offset for a fixed header.
  - `data-lenis-prevent` on modals, code blocks and map containers.
  - `lenis.stop()` while a modal or menu is open and `lenis.start()` after.
  - One shared ticker (GSAP) so scroll and animation never drift apart.

#### Mobile
- Leave touch scrolling native. Lenis's `syncTouch` is off by default, and the README warns it is unstable on iOS below 16.
- Remove horizontal scrolljacks on mobile and replace them with native `overflow-x: auto` and `scroll-snap-type: x mandatory`.

#### Accessibility
- Keep `respectReducedMotion:true`.
- Never disable keyboard scrolling: Space, PageDown and arrow keys must still work, and they do with Lenis because scroll is native.
- Sticky navigation is the escape hatch NN/g recommends.

#### Snippet: production Lenis + GSAP setup
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
Outdated techniques to flag:
- Locomotive Scroll v4: transform-based, it breaks `position: sticky`. Locomotive Scroll v5 was itself rebuilt on top of Lenis. This comes from my training knowledge and could not be verified because locomotive.ca returned 403.
- Custom `wheel` listeners that call `preventDefault`.
- Old `smooth-scrollbar` and `iScroll`-style virtual scrolling.

### Gaps
- The Locomotive Scroll v5 relationship to Lenis was not verified this session.
- Lenis's exact 2.x roadmap was not checked.
- I did not re-verify scroll-driven animation support in Safari and Firefox this session. Treat `animation-timeline` as progressive enhancement behind `@supports (animation-timeline: view())`.

---

## 3. Preloaders / intro screens / splash counters

### Takeaway
On award sites a preloader is a short branded intro, usually a 0→100 counter or a logo or word animation. Done honestly, it hides real asset loading for WebGL or video. Done badly, it is a fake delay in front of HTML that is already ready. Budget it: show it only when needed, keep it under about 2–3s, show it once per session, skip it under reduced motion, and never block LCP content for a pure-HTML page.

### Cited Findings
- **NN/g progress-indicator thresholds:**
  - Give immediate feedback.
  - Use a progress indicator for anything longer than about 1s.
  - Use looped spinners for 2–10s; they are "distracting" below 1s.
  - Use percent-done indicators for 10s or more, with a time estimate.
  - For percent-done bars, "start slower and speed up near the end" because a bar that stalls at the end frustrates users.
  - Avoid static "Loading…" text.
  - [NN/g Progress Indicators](https://www.nngroup.com/articles/progress-indicators/)
- **WCAG 2.2.2 (Pause, Stop, Hide):** moving content that starts automatically, lasts more than 5s and is presented in parallel with other content needs a pause, stop or hide mechanism. A preloader that is the *only* content on screen is exempt because it "is not presented in parallel with other content". [W3C Understanding SC 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- **Awwwards inspiration entries for preloaders:** Monolith by CUSP, Garbage loading animation, Fort Vega, Gavin Schneider Productions, Jon Way, Aurasens, Netrix, Digital Horizon and others. These were seen in search results only; I did not watch the animations. Examples: [Awwwards preloader tag](https://www.awwwards.com/inspiration/preloader), [Monolith](https://www.awwwards.com/inspiration/pre-loader-monolith), [Garbage loading animation](https://www.awwwards.com/inspiration/garbage-loading-animation), [Jon Way](https://www.awwwards.com/inspiration/jon-way-loading-animation)
- **HTML Burger roundup:** lists 45 website preloaders, ranging from minimal GIF loaders to a garbage-truck animation and a neon digit loader. [HTML Burger](https://htmlburger.com/blog/website-preloaders/)
- **Lusion homepage:** shows a row of "0" digits consistent with a counter-style loader, plus a PLAY/MUTE sound toggle. The fetched text could not confirm the loader. [lusion.co](https://lusion.co)
- **Olivier Larose loading tutorials:** "Image Pixel Loading" and "Svg Curve Loading". The SVG curve is the curved-bottom curtain that sweeps up on exit. [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)

### Inferences

#### Variant catalogue
1. **Mono counter 000→100.**
   - Large tabular-numeral digits in a corner (`font-variant-numeric: tabular-nums`).
   - Each digit column rolls like an odometer, built with translateY on stacked 0–9 strips.
   - Exit: the digits slide up, then a curtain wipes off.
2. **Counter tied to real loading.**
   - Progress comes from an asset manifest: the `THREE.LoadingManager` `onProgress` callback, `img.decode()` promises, or `video.canplaythrough`.
   - Apply NN/g's slow-then-fast pacing by mapping real progress through an ease-in curve, and never let it sit at 99.
3. **Split-flap or word cycle.** A word cycles through a list ("Design / Motion / Code / Studio") at about 150ms per word, then locks on the brand name.
4. **Image-stack flicker.**
   - 6–10 project thumbnails flash in the centre at increasing scale, like a film reel.
   - The last image scales to full-bleed and becomes the hero. This is a seamless handoff.
5. **SVG curve curtain.** A solid panel with a quadratic Bézier bottom edge lifts away, and the curve flattens as it rises (Olivier Larose "Svg Curve Loading").
6. **Logo draw-on.** `stroke-dasharray` and `stroke-dashoffset` trace the monogram, then it fills.
7. **Pixel or grid dissolve.** A grid of squares hides in a random or staggered order to reveal the page (Olivier Larose "Pixel Transition" and "Image Pixel Loading").
8. **Masked text slide.** The brand name rises out of an `overflow:hidden` line mask, holds, then rises out the top. It doubles as the hero title.
9. **Progress line with a blend label.** A full-width 1px line grows; a percentage label rides its tip.
10. **WebGL scene warm-up.** Particles or a noise field form the logo while shaders compile, then the camera dives in. Honest, because shader compilation needs the time.
11. **Sound opt-in gate.** "Enter with sound / without sound" buttons on the final frame of the loader. This also unlocks audio autoplay, which requires a user gesture.
12. **Skeleton-first, no preloader.** Content paints immediately and decorative motion plays as an intro on top of visible content. The best choice for performance.
13. **Page-transition loader.** The same visual language reused between routes: a curtain or column wipe via the View Transitions API, or a Barba.js-style approach.

#### Performance budget (practical rules)
- If the page is HTML, CSS and images only, do not use a blocking preloader. Use an intro that animates the real content instead. Inline the loader's CSS and HTML in the document so it paints on the first frame.
- Keep the loader under about 2.0s on a fast connection and cap it at about 3s even on slow ones. After the cap, reveal anyway and let assets stream in. NN/g's 2–10s spinner window is a ceiling for a *task*, not a target for a brand intro.
- Loader code budget: under about 10KB of JavaScript and CSS, no web-font dependency (or `font-display: block` for one subset font), and no images other than inline SVG.
- Show the full loader once per session (`sessionStorage`). Repeat visits get a 300–500ms micro version or none.
- Do not hide LCP content behind `opacity:0` that is set by JavaScript after the loader. If JavaScript fails, the page stays invisible. Add a `<noscript>` style, or set the class from JavaScript only.

#### Mobile
- Cut the loader to the essentials: a counter and a curtain.
- Skip WebGL warm-ups on low-end devices; use `navigator.hardwareConcurrency`, `deviceMemory` or the `Save-Data` header as heuristics.
- Keep the total tap-to-content time well under 3s on 4G.

#### Accessibility
- Under `prefers-reduced-motion: reduce`, skip straight to the content or use a plain crossfade.
- Mark the container `role="status"` with `aria-live="polite"`, plus a visually hidden "Loading" message that announces once rather than every percent.
- Set `inert` on `<main>` until the loader finishes, then remove it, and make sure focus lands at the top of the page.
- Offer a "Skip intro" button if the intro is longer than about 2s.

#### Snippet: counter preloader with session skip and failsafe
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
<script type="module">
const root = document.documentElement, loader = document.querySelector('.loader'), num = loader.querySelector('.loader__num');
if (!root.classList.contains('no-loader')) {
  document.querySelector('main').inert = true;
  const assets = [...document.querySelectorAll('img[data-preload]')].map(i => i.decode().catch(()=>{}));
  let real = 0, shown = 0, done = 0;
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

### Gaps
- I found no authoritative 2025–2026 study on preloader abandonment rates. The "keep under about 2–3s" figure is a practitioner heuristic built from NN/g thresholds, not a measured standard.
- I did not watch or verify individual Awwwards preloader animations.

---

## 4. Call-to-action sections & newsletter signups

### Takeaway
Award-site CTAs are usually a huge, full-width typographic statement ("Let's talk", "Let's work together!") with one action, often a mailto link or a magnetic button, and they are often merged with the footer. Newsletter signups that read as crafted have a voice, show what the reader gets, and give inline validation and a real success state.

### Cited Findings
- **Lusion's CTAs:**
  - The site repeats CTAs: "Let's talk" (a mailto link), "Let's work together!", "Play Reel" and "Our Approach".
  - Scroll prompts include "CONTINUE TO SCROLL", "Keep Scrolling to Learn More" and "Next Page".
  - A "Subscribe to our newsletter" section sits before the footer, which lists separate general and new-business email addresses.
  - [lusion.co](https://lusion.co)
- **Olivier Larose CTA-related tutorials:** "Creative Buttons", "Magnetic Button", "Sticky Footer" and "Infinite Text Move On Scroll" (marquees). [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)

### Inferences

#### CTA variant catalogue
1. **Giant type CTA.** "Let's talk" at 15–25vw on one or two lines. Hovering fills the letters from bottom to top using `background-clip:text` with a gradient position transition, or swaps in an italic display cut.
2. **Infinite marquee CTA.** "Start a project — Start a project —" scrolls endlessly. Its speed and direction follow scroll velocity, and it pauses on hover. Provide a pause control for WCAG 2.2.2 if it runs more than 5s next to other content.
3. **Magnetic circle button.** A 160–200px circle labelled "Get in touch" sits beside a headline. It is magnetic, and on hover a fill rises from the cursor's entry edge, calculated from pointer position.
4. **Reveal footer (sticky footer).** The CTA footer sits *under* the page with `position: sticky; bottom: 0` and a negative z-index; the last section scrolls away to uncover it (Olivier Larose "Sticky Footer").
5. **Email copy-to-clipboard.** The email address itself is the CTA: clicking copies it and shows a "Copied ✓" toast. Keep a `mailto:` fallback, and announce the result via `aria-live`.
6. **Availability pill.** "● Available for projects from Jan 2027" with a pulsing green dot. Honest, human, and it raises response rates.
7. **Scroll-scrubbed reveal.** The CTA line scales from 0.6 to 1 and its letters spread as the section enters (ScrollTrigger scrub, or `animation-timeline: view()`).
8. **Cursor-follow image CTA.** Hovering the CTA band shows team photos or a reel clip under the cursor.
9. **Split CTA.** Two big options: "New business →" and "Careers →", each with its own hover colour flood.
10. **Interactive toy CTA.** A physics playground of draggable capsules spelling "HELLO" (Olivier Larose "Capsule Physics"). Memorable, but provide a plain link next to it.

#### Newsletter variant catalogue
1. **Inline single-line field.** An underline input, with the arrow button inside the field. Placeholder text is a sample (name@studio.com), but a real `<label>` is still required (visually hidden is acceptable).
2. **Typewriter or conversational.** "I'd like to get your ______ every ______", with inline fields in a sentence (mad-libs form).
3. **Issue-preview card.** Show the latest issue's cover, subject line and "Read issue #42". Proof of value before the ask.
4. **Count or social proof.** "Join 4,812 designers". Use only real numbers.
5. **Success state as delight.** The button morphs into a check, confetti in brand colours, or the headline rewrites itself ("You're in. See you Thursday.").
6. **Footer-merged.** Signup in the footer grid beside contact details and socials.

#### Craft vs slop
- **Slop:** a centred "Ready to get started?" headline with a gradient blob, two pill buttons, generic stock copy and a fake "trusted by" logo row.
- **Craft:** one strong verb phrase in the brand voice; type and motion that echo the hero; a real human contact (a name and face); the time zone and response time ("We reply within 24h, CET"); and a CTA that is the page's typographic crescendo.

#### Mobile
- Giant type must use `clamp()` and avoid overflow. Test long words with `overflow-wrap: anywhere` or hyphens.
- Magnetic effects are off on touch.
- The copy-email action should open the mail app (`mailto:`) and offer the copy as a secondary action.
- Inputs need `type="email"`, `autocomplete="email"` and `inputmode="email"`, and a font size of at least 16px to avoid iOS zoom.

#### Accessibility
- Each CTA is a real `<a>` or `<button>`.
- Marquees are `aria-hidden` duplicates, with one static copy available to screen readers.
- Form errors are linked with `aria-describedby`, and success is announced through a `role="status"` region.

### Gaps
- I gathered no conversion-rate data on these CTA styles; none was found in reviewed sources.

---

## 5. Contact sections & contact forms

### Takeaway
Distinctive contact sections lower the effort of getting in touch. Typical ingredients: a big email address, local time, a project-type selector built from chips, and a conversational form. The underlying form must stay accessible and progressively enhanced.

### Cited Findings
- **Lusion's contact section:** direct email addresses split by purpose (general and new business), the studio address (Bristol) and social links, rather than a long form. [lusion.co](https://lusion.co)
- **Olivier Larose:** the "Awwwards Landing Page" and "Sticky Footer" tutorials show the common contact-in-footer reveal. [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)

### Inferences

#### Variant catalogue
1. **Email-as-hero.** A giant email address in display type, with copy-to-clipboard and a cursor label "Copy".
2. **Live local clock.** "Paris — 14:32 CET", updated every minute. Use `Intl.DateTimeFormat` with `timeZone`. Optionally add "We're awake / We're asleep" with a sun or moon glyph.
3. **Chip-based brief builder.** "I'm interested in: [Brand] [Website] [3D] [Motion]" and "Budget: [<20k] [20–50k] [50k+]". These are toggle chips built from checkbox and radio inputs styled as pills.
4. **Conversational sentence form.** "Hi, my name is [___] from [___]. I'd like help with [___]. Reach me at [___]."
5. **Step-by-step one-question-per-screen form.** Typeform-like, with a progress bar and slide transitions. Use only for more than 5 fields.
6. **Split layout.** Left: a sticky big headline plus office photos. Right: a short form.
7. **Office cards with a map.** Each studio city has local time, weather and a hover photo of the office. See section 9.
8. **Calendar embed.** "Book a 20-min intro" (Cal.com or a Calendly inline embed), lazy-loaded on click.
9. **Hold-to-send button.** A long-press fills the button before submitting. Playful, but needs a normal click fallback for keyboard users.
10. **Paper-plane or envelope success animation.** A Lottie or SVG animation on success, then "Thanks, Maya. We'll reply by Thursday."

#### Craft vs slop
- **Slop:** a three-field "Name / Email / Message" form with placeholder-only labels and a generic "Submit" button. No confirmation, or a page reload to "Thank you".
- **Craft:**
  - Personalised success copy.
  - Expected reply time.
  - Who will reply (name and photo).
  - Field-level validation on blur, not on every keystroke.
  - Saved draft through `localStorage`.
  - Spam protection without a CAPTCHA puzzle: a honeypot field plus time-to-submit, or Cloudflare Turnstile.

#### Mobile
- Use the correct input types and `autocomplete` tokens (`name`, `email`, `organization`, `tel`).
- Give chips at least 44×44px tap targets.
- Make the submit button sticky at the bottom on long forms.
- Use `enterkeyhint="next"` and `enterkeyhint="send"`.

#### Accessibility
- Every field has a visible `<label>`.
- Chips are real inputs inside a `<fieldset>` with a `<legend>`.
- Errors are announced: an `aria-live="polite"` summary plus `aria-invalid` and `aria-describedby` on each field.
- No timeouts.
- Focus moves to the success message after submission.

#### Snippet: progressively enhanced form submit
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
for (const f of document.querySelectorAll('form[data-enhance]')) f.addEventListener('submit', async e => {
  e.preventDefault(); const status = f.querySelector('#status');
  if (!f.checkValidity()) { const bad = f.querySelector(':invalid'); bad.setAttribute('aria-invalid','true'); bad.focus(); return; }
  f.querySelector('button').disabled = true; status.textContent = 'Sending…';
  const r = await fetch(f.action, { method: 'POST', body: new FormData(f) });
  status.textContent = r.ok ? 'Thanks! We reply within one working day.' : 'Something went wrong. Email us at hello@studio.com.';
  if (r.ok) { f.replaceChildren(Object.assign(document.createElement('h3'), { tabIndex: -1, textContent: 'Message sent ✓' })); f.firstChild.focus(); }
});
</script>
```
```css
.chip input{position:absolute;opacity:0}
.chip{display:inline-flex;padding:.6em 1.1em;border:1px solid currentColor;border-radius:999px;cursor:pointer}
.chip:has(input:checked){background:var(--fg);color:var(--bg)}
.chip:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:2px}
.hp{position:absolute;left:-9999px}
```

### Gaps
- I found no sourced data comparing form styles (conversational vs standard) for completion rate.

---

## 6. Team / about sections

### Takeaway
Memorable "about" sections humanise the studio. Common tools are interaction-driven portraits (hover-to-animate, cursor-follow photos), editorial manifestos with scroll-revealed text, and numbers presented honestly. Avoid the grid of identical circular headshots with a blue overlay.

### Cited Findings
- **Olivier Larose text-reveal tutorials:** "Text Gradient Opacity On Scroll" (v1 and v2), "Text Clip Mask On Scroll", "Text Mask Animation", "Text Disperse Effect" and "Text Parallax". These are the standard building blocks for manifesto-style about sections. [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)
- **Olivier Larose gallery tutorials:** "Mouse Image Gallery", "Floating Image Gallery" and "Mouse Scale Image Gallery". These are used for team photo walls. [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)
- **Lusion's about content:** the "About us" page and an "Our Approach" CTA are surfaced in the main navigation. [lusion.co](https://lusion.co)

### Inferences

#### Variant catalogue
1. **Scroll-lit manifesto.** One long paragraph at about 4–6vw where each word goes from 15% to 100% opacity as you scroll. Split the paragraph into words, then drive the effect with ScrollTrigger scrub or `animation-timeline: view()` and per-word `animation-range`.
2. **Name list with a hover portrait.** Team names are set as a typographic list. Hovering shows the portrait following the cursor, the same technique as section 7. On mobile, the portraits are inline.
3. **Portrait-to-GIF or video on hover.** Still B&W headshots swap to a 2s colour loop or a silly photo on hover. Preload on hover intent.
4. **Floating photo collage.** Polaroids scattered in 3D depth parallax with the mouse (Olivier Larose "Floating Image Gallery"). Draggable on desktop.
5. **Deck of cards.** Team cards stacked; drag or swipe to cycle. Physical rotation and spring.
6. **Timeline or history rail.** A horizontal year rail (2014 → 2026) that pins while milestones slide by. On mobile it becomes a vertical list.
7. **Numbers that mean something.** "12 people · 4 languages · 1 dog". Counters animate once on enter, with tabular numerals.
8. **Values as interactive glyphs.** Each value has an icon that morphs on hover (MorphSVG is now free).
9. **Office or studio reel.** A muted documentary loop with a "Play with sound" CTA. See section 8.
10. **Clients or awards marquee.** A logo or award wall rendered in a single colour with a slow marquee. Pause on hover, and provide a paused state for WCAG.
11. **"Join us" card.** Open roles are embedded in the team grid as a blank silhouette card ("This could be you →").

#### Craft vs slop
- **Slop:** stock smiling headshots, identical bios ("passionate about innovation"), and five fake stats ("100+ happy clients").
- **Craft:** real photography with a consistent art direction (same light, crop and backdrop), personality in the copy (favourite tool, a hot take), and microinteractions tied to individual people.

#### Mobile
- Hover reveals become tap-to-expand (`<details>` or a button with `aria-expanded`) or always-visible photos.
- Collages become a swipeable `scroll-snap` row.

#### Accessibility
- Word-by-word reveals must keep the text in one DOM paragraph with spans. Do not set `aria-hidden` on the real text. Make sure screen readers read the words as a normal sentence and do not hear a letter-split version character by character.
- Portraits need alt text with the person's name and role, or empty alt if the name is adjacent.
- Under reduced motion, show the full-opacity text.

### Gaps
- I gathered no case data on which about-page patterns improve hiring or sales outcomes.

---

## 7. Portfolio / work showcases & case-study layouts

### Takeaway
The strongest recurring patterns on studio sites:
1. A **typographic project index list** with a cursor-following image or video reveal.
2. A **featured-work grid** with tags and hover video.
3. A **pinned horizontal-scroll gallery**.
4. **Seamless list-to-case-study transitions**, where the thumbnail expands into the case hero.

Case studies that read as crafted follow a narrative of challenge, approach and outcome, using full-bleed media and real metrics.

### Cited Findings
- **Lusion's work showcase:**
  - A "Featured Work" grid of project cards with category tags (concept, web, 3D, animation) and a "See all projects" link.
  - Projects include Oryzo AI, Porsche: Dream Machine, Synthetic Human, Meta: Spatial Fusion, Choo Choo World and DDD 2024.
  - A separate Labs subdomain (labs.lusion.co) holds experiments.
  - [lusion.co](https://lusion.co)
- **Olivier Larose project-gallery tutorials:** "Project Gallery Mouse Hover", "Project Gallery Colored Card", "Image slide project gallery", "Horizontal Scroll", "Horizontal Section", "Cards Parallax", "Zoom Parallax", "3D perspective Scroll" and "Mask Section Transition". [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)
- **Codrops "Image Reveal Hover Effects" (Nov 2018):** hovering a link reveals a thumbnail with an effect. Built on TweenMax and imagesLoaded, repo codrops/ImageRevealHover, MIT. A related "Rapid Image Hover Menu" by Manoela Ilic animates each item's image in on hover. Seen in search results: [Codrops Image Reveal Hover Effects](https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects), [Codrops Design Finds: Detail Hovers on Images (2024)](https://tympanus.net/codrops/2024/05/06/design-finds-detail-hovers-on-images/)
- **The View Transitions API:**
  - `document.startViewTransition()` is supported for same-document transitions in Chrome since 111.
  - `view-transition-class` and view transition types show support for Chrome 125, Edge 125, Firefox 144 and Safari 18.x.
  - This makes thumbnail-to-hero morphs possible without a framework.
  - [Chrome for Developers – Same-document view transitions](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- **NN/g on horizontal scrolljacks:** they confuse users, and users try horizontal swipes to get back. [NN/g Scrolljacking 101](https://www.nngroup.com/articles/scrolljacking-101/)

### Inferences

#### Variant catalogue
1. **Index list with a cursor image reveal.** Rows show No., Client, Discipline and Year in mono. Hovering a row shows a floating media panel that follows the cursor, with the image swapping per row and the panel's y-position lerped. See the snippet below.
2. **Index list with a fixed preview.** Same list, but the preview sits in a fixed slot on the right half and crossfades or slides per row. Calmer and more accessible.
3. **Row-height expand.** The hovered row grows to reveal a strip of three thumbnails, and the other rows dim to 30% opacity.
4. **Featured grid with hover video.** An asymmetric 12-column grid (big / small / small / big). Cards autoplay a muted loop on hover; `play()` is called on `pointerenter`, and the poster stays as a fallback.
5. **Pinned horizontal gallery.** A section pins while cards translate on x by scroll (ScrollTrigger `pin + scrub`), with a progress counter "03 / 12". On mobile it becomes a native swipe carousel.
6. **Drag gallery.** A free-drag canvas of projects with inertia, using the GSAP Draggable and Inertia plugins (now free) and a "Drag" cursor label.
7. **Infinite WebGL plane gallery.** Images as textured planes that bend with scroll velocity (curved or wave distortion). The Lusion and Active Theory register.
8. **Stacked cards.** Each case card sticks and scales down slightly as the next one covers it (Olivier Larose "Cards Parallax").
9. **Zoom-through.** A centre image scales up to full-bleed on scroll while the surrounding images fly outward (Olivier Larose "Zoom Parallax").
10. **Filterable archive.** Discipline filters animate the layout with GSAP Flip or a view transition. List and grid toggle.
11. **3D carousel or cylinder.** Projects on a rotating ring, for experimental studios.
12. **Seamless case transition.** The clicked thumbnail morphs into the case hero via `view-transition-name`. A cross-document version uses `@view-transition { navigation: auto; }`.
13. **"Next project" footer.** A full-bleed teaser of the next case at the end. Scroll past it, or hold, to load it.

#### Case-study layout grammar (crafted)
- **Hero:** title, client, role, year, services and a live link, plus a full-bleed key visual or video.
- **Then:** challenge → insight → approach.
- **Then:** alternating full-bleed media, 2-up and 3-up grids, and before/after sliders.
- **Then:** process artifacts (sketches, wireframes, motion tests) and outcome metrics (real numbers, cited).
- **End:** credits and the next project.
- Use a sticky section index on desktop.

#### Craft vs slop
- **Slop:** a uniform 3-column grid of identical cards with "Learn more" buttons, a gradient overlay on images, and a lorem-like description.
- **Craft:**
  - Data-rich list rows (index numbers, disciplines, years).
  - Media that *moves* on hover.
  - Images pre-decoded so the reveal never flashes blank.
  - The cursor label "View" instead of buttons.
  - The transition from list to case keeps spatial continuity.

#### Mobile
- No hover means:
  - Lists show an inline thumbnail per row, or reveal images on scroll as rows cross the viewport centre (IntersectionObserver with `rootMargin: '-50% 0px -50% 0px'`).
  - Horizontal pinned galleries become `overflow-x:auto; scroll-snap-type:x mandatory` with visible partial next cards.
  - Hover videos become autoplay-in-view only on Wi-Fi, or a poster plus a play button.

#### Accessibility
- List rows are real links whose accessible name is the project title.
- Reveal images are decorative (`alt=""`, `aria-hidden`) because the link text already names the project.
- Horizontal galleries are keyboard-reachable: focusing a card scrolls it into view (`scrollIntoView` in Lenis-aware code).
- Pinned sections must not trap focus.
- Under reduced motion: no pin-scrub. Show a vertical stack instead.

#### Snippet: hover image reveal list
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

#### Snippet: pinned horizontal gallery with a mobile fallback
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

#### Snippet: list-to-case morph with the View Transitions API
```js
link.addEventListener('click', async e => {
  if (!document.startViewTransition) return;           // normal navigation fallback
  e.preventDefault();
  link.querySelector('img').style.viewTransitionName = 'case-hero';
  await document.startViewTransition(() => router.go(link.href)).finished; // case page hero has view-transition-name: case-hero
});
```
For multi-page apps, use `@view-transition { navigation: auto; }` in CSS on both pages. Cross-document transitions are Chromium- and Safari-first; Firefox support should be verified.

### Gaps
- I could not access Codrops (403) to catalogue the newest 2025–2026 gallery tutorials.
- I could not inspect Locomotive's site (403).
- I did not verify cross-document View Transitions support in Firefox as of Nov 2026.

---

## 8. Video players & media embeds (custom controls, background video)

### Takeaway
The player landscape consolidated in 2025–26:
- **Plyr and Vime are archived.**
- **Vidstack points users to Video.js v10.**
- **Video.js v10** is a ground-up rewrite by the Video.js, Plyr, Vidstack, Media Chrome and Mux Player engineers. It has owned, shadcn-style skins and a 9KB background-video player.

For background video, use `autoplay muted loop playsinline` with a poster and lazy loading, and always provide a pause control.

### Cited Findings
- **vidstack.io:**
  - The Vidstack Player is at 1.0, and the site says Vidstack "has a new home: Video.js 10".
  - Plyr and Vime are marked "Archived".
  - Vidstack supports React, Vue, Svelte, Solid, Angular and web components, with HLS, DASH, YouTube and Vimeo providers.
  - It claims "WCAG 2.2, WAI-ARIA, and CVAA spec-compliant", with keyboard navigation and reduced-motion support.
  - [Vidstack](https://www.vidstack.io/)
- **Mux blog on Video.js v10 (Jan 27, 2026):**
  - The engineers behind Media Chrome, Plyr, Vidstack and Mux Player are "rebuilding from scratch", "not merging codebases".
  - Features load only when configured, and a background-video player weighs 9KB.
  - React uses hooks and render props, and Vue will use composables.
  - Skins are copied into your project and owned, shadcn-style.
  - Timeline: tech preview in Oct 2025, beta in early March 2026 ("recommended for new projects"), GA planned for mid-2026.
  - Existing players get security patches, but feature work has "slowed or stopped".
  - [Mux blog](https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10)
- **Press coverage of v10:** Sam Potts (Plyr's creator) designed the skins, and the license stays Apache 2.0. Reported bundle savings conflict: 88% smaller in one outlet, 81% smaller than v8 in another. [MarTech Series](https://martechseries.com/video/video-js-v10-delivers-81-smaller-bundles-as-four-major-player-projects-converge/), [Feedbagel](https://feedbagel.com/post/videojs-v10-beta-released-major-rewrite-combines-four-open-source-video-players)
- **web.dev on autoplaying video:**
  - Use `autoplay muted loop playsinline`. `playsinline` is needed for autoplay on iOS.
  - `poster` reserves the space.
  - `preload="none"` avoids downloading data; the default `metadata` still fetches part of the file.
  - Use `loading="lazy"` on `<video>` where supported, otherwise an IntersectionObserver that sets autoplay on intersect.
  - Videos are much smaller than GIFs of equal quality.
  - [web.dev Lazy-loading video](https://web.dev/articles/lazy-loading-video)
- **WCAG 2.2.2:** auto-starting moving content longer than 5s, shown in parallel with other content, needs pause, stop or hide. The W3C recommends one shared control for all moving elements. [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- **Lusion:** exposes "Play Reel" and a PLAY/MUTE sound toggle. [lusion.co](https://lusion.co)

### Inferences

#### Library recommendations (Nov 2026)
- **New projects needing a full player:** Video.js v10. Confirm it has reached GA before relying on it for mission-critical playback; Mux advised waiting for GA.
- **If you are on Mux:** Mux Player or Video.js v10 with the Mux extensions.
- **Plain background loops:** a native `<video>`, or the Video.js v10 background player (9KB).
- **YouTube or Vimeo:** use a click-to-load facade, for example `lite-youtube-embed` or a poster plus a button, so the iframe and about 1MB of JavaScript load only on intent.
- **Avoid for new builds:** Plyr and Vime (archived). Treat the Vidstack standalone package as legacy.

#### Variant catalogue
1. **Full-bleed hero background loop.**
   - Muted, 6–12s, under about 2–4MB. AV1 or H.265 first (WebM AV1 plus an MP4 H.264 fallback).
   - Poster equal to the first frame.
   - A small "❚❚ Pause" pill in a corner.
2. **"Play reel" expand.** A hero loop with a cursor label "Play reel". Clicking expands it via FLIP or a view transition to a fullscreen player with sound, and closing reverses the motion.
3. **Cursor-as-control.** Over the video the cursor becomes ▶ or ❚❚ with "Play" or "Pause" labels. The scrub bar is a thin line at the bottom that thickens on hover.
4. **Minimal custom bar.** Only play, a timeline, mute and fullscreen, in brand type. The time display uses mono tabular numerals ("00:42 / 02:10").
5. **Chapter timeline.** Markers on the scrub bar with hover previews (VTT thumbnails). Good for case-study videos.
6. **Scroll-scrubbed video.** `video.currentTime` is tied to scroll progress for product spins. Encode with all-keyframe (intra-only) or short-GOP settings so seeking is smooth. On mobile, an image sequence on `<canvas>` is often smoother.
7. **Picture-in-picture sticky.** When scrolled out of view, the playing video docks to a corner mini-player.
8. **Hover-preview thumbnails.** Project cards play a muted clip on hover and reset on leave.
9. **Masked video type.** Video plays inside giant letters (`background-clip:text` doesn't work with video; use SVG `<clipPath>` with text, or `mix-blend-mode: screen` on black text over video).
10. **Sound-on gate.** An "Experience with sound" prompt that unlocks audio through a user gesture.
11. **Ambient glow.** A blurred, scaled copy of the current frame drawn to a low-resolution canvas behind the player, like YouTube's ambient mode.

#### Pitfalls (performance and accessibility)
- A background video as the LCP element delays LCP. Make the poster (AVIF/WebP) the LCP element, and preload the poster, not the video.
- Autoplay without `muted` and `playsinline` fails on iOS.
- Respect `prefers-reduced-motion` (don't autoplay; show the poster) and `Save-Data` / `prefers-reduced-data` (don't load the video).
- Pause offscreen videos with IntersectionObserver to save battery and CPU.
- Content videos need captions (`<track kind="captions">`), and audio description if visuals carry meaning.
- Custom controls need a real `<button>` with `aria-label` and `aria-pressed` states, keyboard shortcuts (Space or K, arrows, M, F), and visible focus.

#### Snippet: accessible background video with pause toggle
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

### Gaps
- I did not confirm whether Video.js v10 reached GA by Nov 2026; the post only planned GA for mid-2026.
- Reported bundle-size savings for v10 conflict (81% vs 88%).
- I did not verify `<video loading="lazy">` browser support beyond web.dev's "browsers that support it" wording.
- I did not visit Plyr's GitHub directly; the archived status comes from vidstack.io.

---

## 9. Maps & location sections

### Takeaway
Use MapLibre GL JS (open source, no token, now v6, ES-modules-only) with a styled vector map for crafted, on-brand maps. Mapbox GL JS (v3.33, proprietary, token, billed per map load) gives the richest 3D and globe styles. Leaflet suits simple raster maps. The best location sections often avoid an interactive map until intent: they show a stylised static map or illustration plus local time and an address.

### Cited Findings
- **Mapbox GL JS:** current version v3.33.0. An access token is required. Mapbox Standard is the default style when no `style` is given, and it supports `projection: 'globe'` with `setFog` atmosphere. [Mapbox GL JS docs](https://docs.mapbox.com/mapbox-gl-js/guides/)
- **Mapbox licensing history (third-party):** BSD-3 at v1, proprietary from v2 (Dec 2020), BSL 1.1 at v3 (Sep 2023). Pricing: 50,000 free monthly map loads, then $5.00 per 1,000. These figures were not verified on mapbox.com/pricing. [PkgPulse 2026 guide](https://www.pkgpulse.com/guides/mapbox-vs-leaflet-vs-maplibre-interactive-maps-2026), [StoreRocket](https://storerocket.io/learn/mapbox-alternatives)
- **MapLibre GL JS:**
  - Docs examples load `maplibre-gl@^6.16.0`, and "Version 6 ships as ES modules only".
  - Works without a token using `demotiles.maplibre.org` styles, including `globe.json`.
  - MapTiler data needs an API key.
  - [MapLibre GL JS docs](https://maplibre.org/maplibre-gl-js/docs/)
- **MapLibre origin and license (third-party):** a fork of Mapbox GL JS v1.13, the last BSD release. There is no renderer fee, but you need a tile source (self-hosted or a provider such as MapTiler or Stadia). Sources disagree on BSD-2 vs BSD-3. [Geoapify comparison](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/), [StoreRocket](https://storerocket.io/learn/mapbox-alternatives)
- **Leaflet (third-party):** BSD-2-Clause, with less 3D support than MapLibre. These sources list v1.9 as current. [Geoapify](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/)
- **Olivier Larose "3D Earth" tutorial:** a three.js globe, used as a decorative location hero. [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)

### Inferences

#### Library choice
- **MapLibre plus self-hosted PMTiles (Protomaps) or OpenFreeMap / MapTiler / Stadia styles:** for fully brand-styled maps without per-load fees.
- **Mapbox:** for Standard-style 3D buildings, lighting presets, globe and Studio styling, when the budget allows.
- **Leaflet:** for lightweight raster maps.
- **Google Maps embed iframe:** the quick-and-generic option. It is heavy, so put it behind a facade.

#### Variant catalogue
1. **Monochrome brand map.** A custom style in two colours (land = `--bg`, roads = `--line`, water = slightly darker). The marker is the studio logo or a pulsing dot. Labels use the brand font (MapLibre glyphs need PBF fonts).
2. **Static map facade.** A pre-rendered PNG or SVG of the styled map with "Open in Maps →" and "Load interactive map" buttons. Zero JavaScript until intent.
3. **Illustrated or isometric location.** A hand-drawn district map or a 3D model of the building. Hover hotspots show the entrance, parking and transit.
4. **Fly-to multi-office.** A list of cities (London / Lisbon / Tokyo). Clicking flies the camera (`map.flyTo({center, zoom, pitch: 60, bearing})`) and shows local time and weather.
5. **Globe with arcs.** A rotating globe (MapLibre or Mapbox globe, or three.js) with arcs from HQ to client cities. Rotation stops under reduced motion.
6. **Scroll-driven route.** As you scroll, the camera follows a path (a journey or a "how to find us" story), tied to ScrollTrigger progress. This is a scrolljack: keep it short and below the fold.
7. **Typographic address.** No map at all: a giant address, coordinates (51.4545° N, 2.5879° W), a local clock, and a "Directions" deep link (`https://maps.apple.com/?daddr=` or `geo:` on Android).
8. **Map in the cursor.** Hovering the address shows a small map snippet following the cursor (section 1, variant 4).
9. **Data-viz map.** Project locations shown as dots that filter the portfolio.

#### Craft vs slop
- **Slop:** a default Google Maps iframe at full width with the standard red pin, which wrecks page weight and visual tone.
- **Craft:** a map styled to brand tokens (including a dark-mode style switched with the theme toggle), a custom marker, hand-picked zoom and bearing, scroll-zoom disabled until click (`cooperativeGestures: true`), and attribution kept (it is legally required) but styled.

#### Mobile
- Use `cooperativeGestures` so one-finger page scroll isn't captured; two fingers move the map.
- Add `data-lenis-prevent` on the map container when Lenis is used.
- Provide a "Directions" deep link that opens the native maps app.
- Load the map library only when the section is near the viewport or on tap.

#### Accessibility
- The map is supplementary. Always provide the text address, transit info and a directions link.
- Map controls must be keyboard focusable (MapLibre and Mapbox controls are buttons).
- Give the container `role="region"` and `aria-label="Map showing studio location"`.
- Disable auto-rotation under reduced motion.

#### Snippet: lazy MapLibre with facade and theme-aware style
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

### Gaps
- I did not verify the official Mapbox pricing page; the free-tier figure is from third parties.
- Leaflet 2.0 status (alpha, beta or release) was not confirmed in sources found this session.
- The MapLibre license identifier conflicts between sources.

---

## 10. Theme switchers, language switchers, back-to-top & floating action elements

### Takeaway
A crafted theme toggle:
- Avoids the flash of the wrong theme with a blocking inline head script.
- Offers system, light and dark modes.
- Animates with a View Transitions circular reveal from the click point, with reduced-motion fallbacks.

Language switchers should use language names in their own language, not flags. Back-to-top buttons belong only on long pages (more than about 4 screens), bottom-right, labelled, shown after a scroll-up intent, and stationary.

### Cited Findings
- **Chrome for Developers, circular reveal code:** inside `transition.ready.then(...)`, call `document.documentElement.animate({ clipPath: ['circle(0 at Xpx Ypx)', 'circle(Rpx at Xpx Ypx)'] }, { duration: 500, easing: 'ease-in', pseudoElement: '::view-transition-new(root)' })`. Catch errors from `ready` so a skipped transition doesn't break the app. [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- **Feature detection:** `if (!document.startViewTransition) { update(); return; }`. Same-document support is listed from Chrome 111; types and `view-transition-class` show Chrome/Edge 125, Firefox 144 and Safari 18.x. [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- **Reduced motion for view transitions:**
  - Chrome's guidance: `@media (prefers-reduced-motion){ ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*){ animation:none !important } }`.
  - It cautions that reduced motion "doesn't mean the user wants *no motion*" and suggests subtler animations.
  - [Chrome for Developers](https://developer.chrome.com/docs/web-platform/view-transitions/same-document)
- **Josh W. Comeau on theme flash:**
  - A blocking inline `<script>` in the head reads `localStorage`, then `matchMedia('(prefers-color-scheme: dark)')`, and sets CSS variables or a marker before first paint.
  - Render the toggle only after the mode is known, so it never shows the wrong state.
  - Add a `<noscript>` or default `<style>` fallback.
  - localStorage reads take about 12µs.
  - The 2026 update notes the approach assumes compile-time HTML and must be adapted per framework.
  - [Josh W. Comeau – The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)
- **Circular theme reveal implementations (search results):**
  - Magic UI "Animated Theme Toggler": a React View Transitions component with circle, polygon and star clip-paths and Firefox painting fixes.
  - The "Glassy Blog" vanilla example.
  - A 2026 blog that animates the radius out to the viewport diagonal, with a reduced-motion note.
  - [Magic UI registry](https://magicui.design/r/animated-theme-toggler.json), [Glassy Blog](https://www.github.com/devsandeepsharma/Glassy-Blog), [Raxxo blog](https://raxxo.shop/blogs/lab/view-transitions-api-5-patterns-i-use-across-raxxo-sites-in-2026)
- **NN/g back-to-top guidelines:**
  - Only on pages longer than 4 screens.
  - Persistent, lower-right.
  - Include a text label ("Back to Top"), because an arrow alone is ambiguous.
  - One sticky button per page.
  - Small on desktop but tappable on touch, and visually distinct.
  - Appear only after several screens *and* an up-scroll signal.
  - Stay stationary once visible.
  - Never auto-scroll.
  - [NN/g Back-to-Top](https://www.nngroup.com/articles/back-to-top/)

### Inferences

#### Theme toggle variants
1. **Circular reveal from the click point.** View Transitions with clip-path; the snippet is below.
2. **Sun/moon morph.** An SVG sun whose rays retract while a mask circle slides in to form a crescent. Animate `r` and `cx` on a `<mask>` circle (CSS transitions on SVG geometry properties in Chromium and Firefox; use transforms for Safari safety).
3. **Light-switch pull cord.** A cord hangs from the nav and you drag it down to toggle, using spring physics. Playful; give it a button fallback.
4. **Three-state segmented control.** System / Light / Dark as a radio group with a sliding indicator pill.
5. **Eclipse wipe.** A new-theme disc sweeps across the viewport left to right: `clip-path: inset(0 100% 0 0)` to `inset(0)` on `::view-transition-new(root)`.
6. **Blend-mode flip.** A difference-blend overlay disc expands to cover the screen. Cheap, but it also inverts images, so it is usually unsuitable for real content.
7. **Star or polygon clip.** A clip-path polygon star expands (Magic UI variant). Novelty; use sparingly.
8. **Dim slider.** A continuous "lights" slider that interpolates tokens with `color-mix()`. Rare and memorable.
9. **Keyboard shortcut.** Press T (or Cmd+Shift+L) to toggle, with a toast "Dark mode · press T to switch". Add a `kbd` hint in the nav tooltip.

#### Snippet: no-flash, 3-state, view-transition circular theme toggle
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

#### Language switcher variants
1. **Inline text codes.** "EN / FR / DE" in mono, with the current one underlined and the others at reduced opacity.
2. **Native-name dropdown.** "English · Français · 日本語", each wrapped in `lang` and `hreflang` attributes.
3. **Rolling text on hover.** The current code rolls vertically to reveal the next (a duplicated-span translateY trick).
4. **Full-screen menu panel.** Languages listed in the overlay menu beside the time zone.
5. **Auto-suggest banner.** "This page is available in Deutsch → Wechseln" based on `navigator.languages`. Never auto-redirect; let the user choose and remember it.
6. **Morphing transition.** Switching languages triggers a view transition in which text blocks re-split and re-animate, a signature touch on bilingual studio sites.

Rules for language switchers:
- No flags, because flags mean countries, not languages.
- Each link has `hreflang` and `lang` attributes and keeps the current path (`/fr/work/oryzo`).
- The current language is marked with `aria-current="true"`.
- The control sits in the same place on every page: header right, plus the footer.

#### Back-to-top and floating action variants
1. **Labelled pill, bottom-right.** "↑ Back to top", which appears after about 4 screens *and* an upward scroll (per NN/g).
2. **Progress ring.** A circle whose SVG stroke fills with scroll progress, with an arrow in the centre. It doubles as a reading-progress indicator.
3. **Footer "Back to top" link.** A big text link in the footer ("Back to top ↑"), with a Lenis `scrollTo(0, {duration: 1.6})` and a rocket or elevator joke. Natural and non-intrusive.
4. **Floating "Let's talk" chip.** A persistent bottom CTA pill that hides on scroll-down and shows on scroll-up. Hide it while the footer CTA is visible (IntersectionObserver).
5. **Sound toggle.** An animated equaliser bars icon with PLAY/MUTE labels (as on Lusion). Off by default, and its state is remembered.
6. **Floating menu button.** A circular "Menu" button that appears after the header scrolls away (magnetic on desktop, thumb-reachable on mobile).
7. **Copy-email floating chip.** Clicking copies the address and shows a toast.
8. **Speed-dial FAB.** Expands into contact options (WhatsApp, email, call). Use on mobile commerce and service sites only.

#### Snippet: intent-based back-to-top
```js
const btn = document.querySelector('.to-top'); let last = scrollY;
addEventListener('scroll', () => {
  const y = scrollY, up = y < last, deep = y > innerHeight * 4;
  btn.toggleAttribute('data-visible', deep && up); last = y;
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

#### Mobile
- Floating elements must respect `env(safe-area-inset-*)` and stay clear of the iOS Safari bottom toolbar and the Android gesture bar.
- Never stack more than one floating element on the same corner.
- Hide floating elements while the on-screen keyboard is open (check `visualViewport` height).

#### Accessibility
- The theme toggle is a `<button>` with `aria-pressed`, or a radio group for three states. Do not use a checkbox that announces only "on/off" without context.
- Respect `color-scheme` so form controls and scrollbars match the theme.
- Every floating element must be reachable in a logical tab order and must not cover focused content (WCAG 2.2 SC 2.4.11 Focus Not Obscured). Add `scroll-padding-bottom` equal to the floating element's height.

### Gaps
- I did not verify current Safari and Firefox support for same-document View Transitions on the root (Safari 18 and Firefox 144 badges appeared only on the types and class subsection).
- I found no study on theme-toggle discoverability or placement.

---

## Cross-cutting: Which patterns recur on Awwwards / Godly / Codrops / studio sites, and which tutorials teach them?

### Takeaway
Across the sources reached, these patterns recur:
- Cursor-driven media reveals.
- Scroll-tied typographic reveals.
- Counter or curtain intros.
- Magnetic and labelled interactions.
- Giant-type CTAs merged into footers.
- Horizontal and stacked galleries.
- WebGL scroll scenes, on studios like Lusion.

The most complete free curriculum covering these patterns one by one is Olivier Larose's tutorial library, alongside Codrops (2018–2025 demos), GSAP (now fully free), the Lenis docs and the Chrome View Transitions docs.

### Cited Findings
- **Olivier Larose's library:** ready-to-follow tutorials for almost every pattern in this report, grouped into Cursor, Buttons, Hover gallery, Text reveal, Smooth scroll, Parallax, Footers, Menus, Scroll, Mouse, 3D and an "Awwwards Landing Page". [Olivier Larose tutorials](https://blog.olivierlarose.com/tutorials)
- **GSAP:** all plugins are free under Webflow (SplitText, ScrollSmoother, MorphSVG, Flip, Observer). This removes the old "Club GreenSock" paywall that used to push people toward alternatives, so any advice that these plugins are paid is outdated. [GSAP pricing](https://gsap.com/pricing/)
- **Lusion's site (studio reference):**
  - Hero line: "We create 3D visual storytelling and interactive web experiences".
  - A "scroll to explore" prompt, a Menu/Close toggle, featured-work cards with discipline tags, and "Play Reel".
  - A sound PLAY/MUTE toggle, a newsletter signup, and a big "Let's work together!" CTA.
  - A Labs subdomain for experiments.
  - [lusion.co](https://lusion.co)
- **Godly:** godly.website now 301-redirects to `recent.design/?ref=godly` (observed 5 Nov 2026). Update bookmarks and old references. [godly.website (redirect)](https://godly.website/)
- **Codrops classic tutorials:** "Custom Cursor Effects" (2019), "Image Reveal Hover Effects" (2018), "Rapid Image Hover Menu", and "Design Finds: Detail Hovers on Images" (2024). Seen in search results only, because the site blocked fetching. [Codrops 2019](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/), [Codrops 2018](https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects)
- **Josh W. Comeau:** canonical dark-mode no-flash technique (updated 2026). [joshwcomeau.com](https://www.joshwcomeau.com/react/dark-mode/)

### Inferences
- **Recommended learning path:**
  1. Lenis plus the GSAP ticker setup.
  2. Olivier Larose: Blend Mode Cursor, Magnetic Button, Project Gallery Mouse Hover, Text Gradient Opacity On Scroll, Sticky Footer, Svg Curve Loading.
  3. Codrops classics for cursor and hover-reveal variations.
  4. Chrome View Transitions docs for theme toggles and page transitions.
  5. Josh Comeau for dark-mode correctness.
  6. NN/g for the constraints on scrolljacking, progress indicators and back-to-top buttons.
- **Studios to study** (names commonly cited; only Lusion was fetched this session): Lusion (WebGL scroll and reel), Active Theory (WebGL experiences), Locomotive (smooth-scroll and editorial grids; the site blocked fetching), Resn (playful interaction), Obys (typographic motion and preloaders), Immersive Garden (luxury WebGL), and Darkroom/Studio Freight (makers of Lenis).
- **Distinctiveness formula:** one signature interaction tied to the brand idea, a coherent motion system (same easing, lerp and timing everywhere), real content and photography, and graceful fallbacks on touch and under reduced motion. Generic sites stack every effect at once.

### Gaps
- Awwwards SOTD/SOTM pages for specific 2026 winners were not fetched, so I cannot list verified 2026 winners or their exact patterns.
- Codrops, Locomotive, Active Theory, Resn, Obys and Immersive Garden sites were not successfully inspected. Their pattern attributions come from general knowledge and are not verified this session.
- Frontend Masters course content on these techniques was not reviewed.

---

## Cross-cutting: Performance & accessibility pitfalls (cursors, scroll hijacking, preloaders, background video)

### Takeaway
The four most common failures:
1. Hiding the native cursor sitewide and animating layout properties.
2. Scroll-rate or direction hijacking, especially on mobile.
3. Fake preloaders that delay already-ready content or keep it invisible when JavaScript fails.
4. Background video that becomes the LCP element, autoplays without a pause control, or ignores reduced-motion and Save-Data preferences.

### Cited Findings
- **Scrolljacking:** causes disorientation and fatigue; worse with text and on mobile; horizontal direction changes confuse users. [NN/g](https://www.nngroup.com/articles/scrolljacking-101/)
- **Lenis:** reduced motion is honoured by default (lerp forced to 1, instant programmatic scrolls). It is capped at 60fps in Safari and 30fps in Low Power Mode, and smoothing stops over iframes. [Lenis](https://github.com/darkroomengineering/lenis)
- **WCAG 2.2.2:** auto-moving content over 5s next to other content needs pause, stop or hide; one shared control is recommended. A sole-content preloader is exempt. [W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- **Progress indicators:** above about 1s use one; avoid static "Loading…" text; pace percent bars slow then fast. [NN/g](https://www.nngroup.com/articles/progress-indicators/)
- **Background video:** `playsinline` is required for iOS autoplay, and `preload="none"` plus a poster prevents wasted bytes. [web.dev](https://web.dev/articles/lazy-loading-video)
- **Pointer queries:** `pointer` and `hover` test the primary input only; use `any-pointer` to detect secondary devices. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- **Blend-mode cursors:** they block clicks without `pointer-events:none`. [Webflow forum](https://discourse.webflow.com/t/cursor-blending-mode-difference/172083)
- **Olivier Larose's blend-cursor tutorial:** handles no touch input at all, so production code must add gating. [Olivier Larose](https://blog.olivierlarose.com/tutorials/blend-mode-cursor)

### Inferences

#### Checklist
- **Cursors:**
  - Gate behind `(hover:hover) and (pointer:fine)`.
  - Use `pointer-events:none` and `aria-hidden`.
  - Animate transforms only.
  - Run one rAF loop and pause it when `document.hidden`.
  - Never apply `cursor:none` globally.
  - Under reduced motion, use lerp 1 with no trails.
  - Restore the native I-beam over inputs.
- **Scroll:**
  - Lenis on wheel only.
  - Keep anchors and find-in-page working.
  - `lenis.stop()` while overlays are open.
  - No horizontal hijack on mobile.
  - Keep sticky navigation as an escape hatch.
  - Avoid long scrolljacks above the fold.
- **Preloaders:**
  - Inline loader CSS.
  - About 1.2s minimum and about 3s cap.
  - Once per session.
  - Skip under reduced motion.
  - `inert` on main, then focus management.
  - Never blank the page if JavaScript fails.
- **Background video:**
  - Poster as LCP.
  - AV1/H.264 sources under a few MB.
  - Pause offscreen.
  - Pause button.
  - Honour reduced motion and Save-Data.
  - Captions for content videos.
- **General:**
  - Test on a mid-range Android phone with 4× CPU throttling.
  - Keep INP low: avoid heavy `pointermove` handlers and read layout once per frame.
  - WebGL scenes need a static fallback image and a `webglcontextlost` handler.

### Gaps
- I found no measured study of custom-cursor impact on INP. That impact is inferred from the general rendering principle that animating layout properties is costly while `transform` changes stay cheap.

---

## Cross-cutting: Recommended map and video libraries

### Takeaway
- **Maps:** MapLibre GL JS v6 for open, brand-styled vector maps; Mapbox GL JS v3 for premium 3D and globe with per-load billing; Leaflet for simple raster.
- **Video:** Video.js v10 (the consolidated successor to Plyr, Vidstack and Media Chrome), Mux Player when hosting on Mux, and native `<video>` for background loops.

### Cited Findings
- **MapLibre:** v6.x, ES modules only, no-token demo styles. [MapLibre docs](https://maplibre.org/maplibre-gl-js/docs/)
- **Mapbox:** v3.33.0, token required, Standard style, globe. [Mapbox docs](https://docs.mapbox.com/mapbox-gl-js/guides/)
- **Mapbox licensing and pricing (third-party):** proprietary or BSL since v2/v3; 50k free loads per month, then $5 per 1k. [PkgPulse](https://www.pkgpulse.com/guides/mapbox-vs-leaflet-vs-maplibre-interactive-maps-2026)
- **Vidstack:** points to Video.js 10; Plyr and Vime are archived. [Vidstack](https://www.vidstack.io/)
- **Video.js v10:** a joint rebuild with a beta in March 2026 and GA planned for mid-2026. [Mux blog](https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10)

### Inferences
- **Outdated (Nov 2026):**
  - Plyr and Vime (archived).
  - Building on standalone Vidstack for new projects.
  - Locomotive Scroll v4.
  - Paid GSAP plugins (now free).
  - Mapbox GL JS v1 forks other than MapLibre.
  - Raw full-width Google Maps iframes without a facade.
  - Animated GIFs for motion (use muted video).
  - `::-webkit-scrollbar` as the only scrollbar styling (use `scrollbar-color` and `scrollbar-width`).

### Gaps
- Leaflet 2.0 status is unconfirmed.
- I did not verify Video.js v10 GA.
- I did not fetch the Mux Player docs directly. That page alone would confirm Mux Player's current relationship to Video.js v10.
