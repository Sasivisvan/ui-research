# Content-Display and Section Components (21–30)

This file is the build reference for the sections that carry a page's content: heroes, cards, bento and masonry grids, galleries and lightboxes, carousels and marquees, accordions/FAQ, tables and lists, testimonials and logo clouds, pricing and comparison, and timelines/stats/feature sections. The recurring lesson across all ten: one bold, specific idea beats a stack of library effects. Catalogues now ship dozens of prebuilt effects (Aceternity alone lists 27+ hero blocks), so those effects look templated unless heavily customised. Crafted sections win on real content (photography, product UI, named people, numbers with provenance), deliberate grids and typography, and motion that clarifies hierarchy or sequence and then ends. Each component lists named variants with rebuildable specs, crafted vs generic signals, desktop vs mobile, accessibility, code, libraries, inspiration and caveats.

**Verification markers used in this file (carried over from the research notes):**
- Facts with an inline link are **cited**: from a page fetched or a search result read during the research session (Nov 5 2026).
- **Variant catalogues, crafted/generic rules, desktop/mobile notes and all code snippets are design synthesis / original code written for this reference**, not copied claims. Snippets are flagged "> ⚠ Untested reference snippet".
- **(own knowledge, unverified)** marks statements from the researcher's design knowledge rather than a fetched source. **(search only)** marks facts seen only in search snippets.
- **Fetch failures:** Land-book, Lapa Ninja (403), SaaSLandingPage (connection reset), Codrops homepage (403), bentogrids.com (returned only a title), godly.website (now 301-redirects to recent.design), NN/g testimonials article URL (404). Content for those comes only from search snippets or not at all.

Related docs: [components index](README.md) · [navigation and structure (1–10)](navigation-structure.md) · [actions and inputs (11–20)](actions-inputs.md) · [feedback and overlays (31–40)](feedback-overlays.md) · [signature and experiential (41–50)](signature-experiential.md) · [component libraries](component-libraries.md).

## Contents

- [21. Hero sections](#21-hero-sections)
- [22. Cards](#22-cards)
- [23. Bento grids and masonry layouts](#23-bento-grids-and-masonry-layouts)
- [24. Image galleries and lightboxes](#24-image-galleries-and-lightboxes)
- [25. Carousels, sliders and marquees](#25-carousels-sliders-and-marquees)
- [26. Accordions and FAQ sections](#26-accordions-and-faq-sections)
- [27. Data tables and lists](#27-data-tables-and-lists)
- [28. Testimonials, social proof and logo clouds](#28-testimonials-social-proof-and-logo-clouds)
- [29. Pricing tables and feature comparison](#29-pricing-tables-and-feature-comparison)
- [30. Timelines, stats and feature sections](#30-timelines-stats-and-feature-sections)
- [Cross-cutting: inspiration sources and workflow](#cross-cutting-inspiration-sources-and-workflow)
- [Sources](#sources)

---

## 21. Hero sections

**What & when.** The first viewport: brand statement, primary CTA and the page's art direction. Award-site heroes are memorable because one bold idea carries them: oversized or kinetic type, real product or photography, or an interactive/3D object the visitor can touch. NN/g: a single static hero often beats a carousel; designers choosing one image pick stronger visuals, and users focus better on one image ([NN/g Designing Effective Carousels](https://www.nngroup.com/articles/designing-effective-carousels/)).

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Split editorial (asymmetric 7/5)** | 12-col grid; headline spans cols 1–7 in a large display serif (`clamp(3rem, 8vw, 9rem)`, leading 0.9, negative tracking); right col a tall portrait photo with an off-grid caption in mono 11px. Motion: line-by-line mask reveal (each line `overflow:hidden`, child translates 100% → 0, staggered 60ms). |
| 2 | **Full-bleed video with typographic lockup** | `<video autoplay muted loop playsinline poster>`; headline anchored bottom-left, not centred; video graded and darkened with a gradient scrim only behind the text. Pause button required (WCAG 2.2.2 for >5s motion). On mobile, serve a shorter/lower-bitrate cut, or poster only when `prefers-reduced-data`/`Save-Data` is set. |
| 3 | **Kinetic type hero** | A single word or phrase as the whole visual. Variable-font axis animation (wght/wdth driven by pointer X or scroll), per-letter split with stagger, or scroll-velocity skew (Magic UI "Scroll Based Velocity"). Rule: animate *once* on load, then respond to the user. Avoid infinite loops. |
| 4 | **3D/WebGL object hero** | Product/brand object in Three.js/R3F (or a Spline embed) reacting to pointer (lerped rotation) and scroll (camera dolly). Always render a static poster image first (LCP), lazy-init WebGL after idle, fall back to the poster under reduced motion or on low-end GPUs. |
| 5 | **Interactive canvas hero** | The visitor *does* something: drags a terrain, paints, pokes physics blobs, reveals an image through a cursor mask (Aceternity "SVG Mask Effect"/"Canvas Reveal"). recent.design's current trend (terrain sculpting, physical textures) points here. |
| 6 | **Editorial / magazine cover** | Masthead-scale wordmark across 100vw, issue metadata row (date, number, category) in small caps, one hero image with a caption, deliberate whitespace. Awwwards Typography Honors winners fit this pattern. |
| 7 | **Product-in-context (no gradient)** | Real UI captured at 2x, slightly perspective-tilted on scroll (Aceternity "Container Scroll Animation", "Macbook Scroll"), cropped to one meaningful workflow rather than a whole dashboard. |
| 8 | **Horizontal-scroll / pinned story hero** | Hero pins and panels move horizontally as the user scrolls (GSAP ScrollTrigger, or CSS `view-timeline`). On mobile, convert to normal vertical stacking. |
| 9 | **Image-grid / parallax-collage hero** | 3–5 columns of images drifting at different scroll speeds (Aceternity "Hero Parallax", Codrops parallax gallery), headline knocked out over the centre. |
| 10 | **Marquee hero** | A giant headline running as a slow marquee across the full width, static content below. Agencies and events. |
| 11 | **Terminal/code hero (dev tools)** | Live, typed terminal (Magic UI "Terminal"), copyable install command as primary CTA. |
| 12 | **Search/command hero** | The hero *is* the input (search, prompt box, URL field), e.g. AI tools; the CTA is doing the task. |
| 13 | **Duotone/dither photographic hero** | Photo processed with ordered dithering or duotone shader (Aceternity "Dither Shader", Magic UI "Dither Field") for a print-like, non-stock look. |
| 14 | **Split-flap/ticker hero** | Aceternity "Text Flipping Board" style. Live numbers, departures-board metaphor. |

**Crafted vs generic.**
- Generic ("AI slop"): centred H1 + subhead + 2 pill buttons + purple-blue radial gradient/aurora + glowing dashboard screenshot + "Trusted by" logo row + three icon feature cards directly below. Also a gradient-text headline, a "New ✨" badge pill, and the Inter/Geist default with no type-scale personality.
- Crafted: a point of view in the copy (specific claim, not "Supercharge your workflow"); one memorable interaction; real photography/product; deliberate grid (asymmetric, visible baseline); typographic contrast (display serif or grotesk with character + mono for metadata); motion that has *meaning* (reveals hierarchy) and ends; art direction that continues into section 2 (no hard style break after the fold).
- Customise library effects: change easing curves, colours and scale. Combining effects (lamp + beams + sparkles) gives away that the hero came from templates.

**Desktop vs mobile.**
- Desktop: 100svh max; headline ≤ 2–3 lines; CTA visible above the fold.
- Mobile: `min-height: 100svh` (not `100vh`, which jumps with the URL bar); reflow split heroes to text-first then media; cut the headline size by ~45% via `clamp()`; replace pointer-reactive effects with gyroscope (needs permission on iOS) or nothing; never autoplay heavy WebGL on mobile without a poster.
- Container queries (`container-type:inline-size`) let a hero component reflow by its slot, not the viewport.

**Accessibility.** Wrap motion in `@media (prefers-reduced-motion: no-preference)`; give background video a visible pause control; ensure text contrast over imagery with a scrim; real HTML text (not baked into images); `aria-hidden` on decorative canvases; split-letter animations keep an accessible label (`aria-label` on the parent, letters `aria-hidden`).

**Code**

Line-mask headline reveal (CSS only, reduced-motion safe):

> ⚠ Untested reference snippet.

```html
<h1 class="reveal" aria-label="We build quiet software">
  <span class="line" aria-hidden="true"><span>We build</span></span>
  <span class="line" aria-hidden="true"><span>quiet software</span></span>
</h1>
```

```css
.reveal .line{display:block;overflow:hidden}
.reveal .line>span{display:inline-block}
@media (prefers-reduced-motion:no-preference){
  .reveal .line>span{animation:up .9s cubic-bezier(.2,.7,0,1) both}
  .reveal .line:nth-child(2)>span{animation-delay:.08s}
}
@keyframes up{from{transform:translateY(110%)}}
```

Scroll-linked hero image scale (progressive enhancement):

> ⚠ Untested reference snippet.

```css
@supports (animation-timeline: view()){
  @media (prefers-reduced-motion:no-preference){
    .hero-media{animation:zoom linear both;animation-timeline:view();animation-range:exit 0% exit 100%}
    @keyframes zoom{to{transform:scale(1.15);opacity:.4}}
  }
}
```

**Libraries & tools.**
- **Aceternity UI** ([components](https://ui.aceternity.com/components)): "Hero Sections" block (27+ variants), Hero Highlight (background effect + text highlight), Hero Parallax (scroll-linked rotation/translation/opacity), Parallax Hero Images (mouse parallax with images blurring in at different depths); hero-adjacent backgrounds: Lamp Effect, Spotlight, Aurora, Background Beams (with collision), Vortex, Wavy Background, Dither Shader, Cloud Shader, Liquid Glass, Webcam Pixel Grid, Macbook Scroll, Container Scroll Animation (3D-rotating container on scroll).
- **21st.dev Aceternity listing** ([library](https://21st.dev/@manuarora700/library/aceternity-ui)): hero variants such as infinite-scroll card heroes, mesh-gradient heroes, dither-shader heroes, "Hero With Centered Image", "Minimal Hero Section With Parallax Images"; the page cites 262 components installable via shadcn CLI (count conflicts with other third-party pages claiming 100+/200+).
- **Magic UI** ([components](https://magicui.design/docs/components)): Hero Video Dialog, Globe, Dotted Map, Text Animate, Typing Animation, Aurora Text, Video Text (video inside letterforms), Word Rotate, Morphing Text, Hyper Text, Text Reveal, Scroll Based Velocity, Kinetic Text, Spinning Text, Text 3D Flip; backgrounds Flickering Grid, Retro Grid, Light Rays, Noise Texture, Dither Field, Warp Background, Interactive Grid Pattern; device mocks (Safari, iPhone, Android).
- GSAP ScrollTrigger, Three.js / React Three Fiber, Spline for 3D/pinned heroes.

**Inspiration links.**
- [Awwwards hero-section collection](https://www.awwwards.com/websites/hero-section/), filtered by technique tags: Animation, Parallax, Big Background Images, Fullscreen, Scrolling, 3D, Video, Typography, Filters and Effects. Featured winners: No Hero Studio by CUSP (Site of the Day May 2025 + Developer Award, http://nohero.studio); Hero Collective (SOTD Mar 2024, https://www.herocollective.co/); Heroes of David Bowie (Typography Honors, https://bowiesheroes.tilda.ws); Rafal Bojar "One Story Hero" by Zhenya Rynzhuk (SOTD Jun 2019, https://rafalbojar.com/); Hero Studios by Rogue Studio (HM Jun 2026, https://www.herostudios.tv).
- [recent.design (ex-Godly)](http://recent.design/?ref=godly): current inspiration dominated by interaction-led, tactile pieces: "Physical Texture Web Experiments", "Liquid Bubble Buttons", "Interactive Terrain Sculpting", "Stock Ticker Card Interaction", "Genie Minimize for Web", jhey's "Emoji Picker Globe".
- Codrops 2026 hero/gallery-grade WebGL tutorials ([Feb 2026 archive](https://feeds.marmits.com/archive-rss-206-2026-02.html)): horizontal parallax gallery DOM→WebGL (Three.js shaders, 19 Feb 2026, [article](https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/)); scroll-driven 3D image tube in React Three Fiber (17 Feb 2026); scroll-revealed WebGL gallery with GSAP + Three.js + Astro + Barba.js (2 Feb 2026).
- Codrops "Dual Wave Text Animation on Scroll" (Valentin Descombes, 15 Jan 2026) and "Creating 3D Scroll-Driven Text Animations with CSS and GSAP" (4 Nov 2025) ([author page via search](https://tympanus.net/codrops/hub/author/valentindescombes/)).

**Caveats & verification status.**
- CSS scroll-driven animations (`animation-timeline`) work in Chrome and in Safari 26 (released 2025-09-15). Not Baseline because Firefox stable has not shipped them (positive vendor position; reportedly still flagged in Firefox 152, **unverified**) ([web-features explorer](https://web-platform-dx.github.io/web-features-explorer/one-missing-engine); [Chrome scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)).
- Land-book, Lapa Ninja, SaaSLandingPage, Landingfolio, Mobbin and Framer template galleries could not be fetched (403/connection errors): no verified hero example lists from them.
- No quantitative study found on which hero type converts best; claims of that kind online are vendor blogs.

---

## 22. Cards

**What & when.** A card is one clickable unit with clear hierarchy, summarising a product, person, article or plan. Make one interaction its signature. Libraries now commoditise spotlight, tilt, glare, focus-blur, expandable and stack cards; crafted cards stand out through content and typography, and handle touch and keyboard as well as mouse.

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Product card (commerce)** | 4:5 image; second image crossfades on hover (desktop only); swatches row; price with compare-at; quick-add appearing on hover/focus-within. On mobile quick-add is always visible as an icon button. |
| 2 | **Profile / team card** | Duotone portrait going full colour on hover; name in display face, role in mono; social links reveal on focus-within. Variant: polaroid with slight random rotation (`rotate: calc(var(--i) * 1.3deg - 2deg)`). |
| 3 | **Blog / editorial card** | Typographic-first, no image or a small image; large serif title, kicker category, reading time; whole card is the link via the stretched-link technique (`a::after{content:"";position:absolute;inset:0}`). |
| 4 | **Pricing card** | See [29](#29-pricing-tables-and-feature-comparison). |
| 5 | **Glassmorphism card** | `backdrop-filter: blur(16px) saturate(140%)` on translucent bg, 1px inner light border (`box-shadow: inset 0 1px 0 rgb(255 255 255 / .25)`), *only* over a rich background. Overused on flat backgrounds, where it does nothing. Aceternity now ships "Liquid Glass" (refraction), the 2025–26 evolution. |
| 6 | **CSS 3D tilt card** | Perspective on parent, rotateX/Y from pointer, inner layers on `translateZ` for parallax depth, glare layer (snippet below). |
| 7 | **Flip card** | Front/back faces, `backface-visibility:hidden`, flip on click/Enter (not only on hover, which mobile and keyboard users can't trigger). |
| 8 | **Spotlight-hover card / grid** | Radial glow follows cursor. Variant "grid spotlight": one pointermove handler on the *grid* sets `--x/--y` and every card's border reveals its slice of a shared glow (Linear/Vercel-style). |
| 9 | **Expandable card (shared-element)** | Expands into a modal/detail using View Transitions (`view-transition-name` on image + title) or Motion `layoutId`; Esc closes, focus returns to the card. |
| 10 | **Stacked / deck cards** | Overlap with offset and scale (`translateY(calc(var(--i)*-8px)) scale(calc(1 - var(--i)*.04))`), swipe/drag to cycle; also sticky scroll-stacking cards (`position:sticky; top: calc(6rem + var(--i)*1rem)`). |
| 11 | **Focus cards** | Hover one, siblings blur/dim (`.grid:has(.card:hover) .card:not(:hover){filter:blur(2px) opacity(.6)}`). `:has()` makes this JS-free. |
| 12 | **Border-beam / animated conic border** | `@property --angle` + conic-gradient border rotated. One highlighted card only. |
| 13 | **Noise / texture card** | SVG feTurbulence grain overlay at 4–8% opacity; print feel, kills gradient banding. |
| 14 | **Media card with video-on-hover** | Muted preview video loads on hover/intersection, poster otherwise. |
| 15 | **Tweet / quote card** | Embedded-looking social post (Magic UI Tweet Card); see [28](#28-testimonials-social-proof-and-logo-clouds). |

**Crafted vs generic.**
- Generic: identical rounded-2xl white cards, icon-in-circle + title + 2-line lorem, uniform 3-up grid, same shadow everywhere, hover = translateY(-4px) + bigger shadow.
- Crafted: varied card sizes driven by content importance; real thumbnails; consistent but specific radius system (e.g. outer radius = inner radius + padding); hover that reveals *information* (metadata, preview), not just lift; one effect per page family.

**Desktop vs mobile.**
- Container queries: the card switches from horizontal (image left) to vertical when its container < ~28rem.
- Disable tilt/spotlight on `(hover:none)`; replace with press states (`:active { scale: .98 }`).
- Tap targets ≥ 24×24 CSS px (WCAG 2.2 2.5.8), ideally 44px.

**Accessibility.** One primary link per card; stretched link; don't nest interactive elements inside a single big `<a>`; keep heading levels; hover-revealed content must also show on `:focus-within`; flip cards need a real `<button aria-pressed>` or a disclosure.

Spotlight technique (cited, [master.dev CSS spotlight effect](https://blog.master.dev/css-spotlight-effect/)): set CSS custom properties from pointer position (relative to the element rect), paint a `radial-gradient` at those coordinates on a `pointer-events:none` pseudo-layer, gate hover effects with `@media (hover:hover)`, add `:focus-visible`/`:focus-within` equivalents, don't hide the cursor; hybrid devices may still fire touch events. (The border-glow/mask-composite and reduced-motion parts of that fetched summary were flagged as general practice, not from the article.)

**Code**

Container-query card:

> ⚠ Untested reference snippet.

```css
.card-wrap{container-type:inline-size}
.card{display:grid;gap:1rem}
@container (min-width:28rem){.card{grid-template-columns:40% 1fr;align-items:center}}
```

CSS 3D tilt + glare (pointer-driven custom props):

> ⚠ Untested reference snippet.

```html
<div class="tilt" tabindex="0"><div class="tilt__inner"><img src="p.jpg" alt=""><h3>Title</h3></div></div>
```

```css
.tilt{perspective:900px}
.tilt__inner{transform-style:preserve-3d;transition:transform .4s cubic-bezier(.2,.8,.2,1);
  transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));position:relative;border-radius:16px;overflow:hidden}
.tilt__inner h3{transform:translateZ(40px)}
.tilt__inner::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgb(255 255 255/.35),transparent 50%);
  opacity:var(--go,0);mix-blend-mode:soft-light;transition:opacity .3s}
@media (prefers-reduced-motion:reduce),(hover:none){.tilt__inner{transform:none!important}.tilt__inner::after{display:none}}
```

```js
document.querySelectorAll('.tilt').forEach(el=>{
  const inner=el.firstElementChild;
  el.addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse')return;
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    inner.style.setProperty('--ry',`${(x-.5)*14}deg`);inner.style.setProperty('--rx',`${(.5-y)*14}deg`);
    inner.style.setProperty('--gx',`${x*100}%`);inner.style.setProperty('--gy',`${y*100}%`);inner.style.setProperty('--go',1);
  });
  el.addEventListener('pointerleave',()=>{['--rx','--ry'].forEach(p=>inner.style.setProperty(p,'0deg'));inner.style.setProperty('--go',0)});
});
```

Spotlight card grid (shared glow, border reveal):

> ⚠ Untested reference snippet.

```css
.cards{--x:-999px;--y:-999px;display:grid;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr));gap:12px}
.cards .card{position:relative;border-radius:14px;background:#0d0d10;padding:1.5rem;
  background-image:radial-gradient(400px circle at var(--x) var(--y),rgb(255 255 255/.06),transparent 40%)}
.cards .card::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:radial-gradient(300px circle at var(--x) var(--y),rgb(140 160 255/.7),transparent 40%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude}
```

```js
const g=document.querySelector('.cards');
g.addEventListener('pointermove',e=>{for(const c of g.children){const r=c.getBoundingClientRect();
  c.style.setProperty('--x',`${e.clientX-r.left}px`);c.style.setProperty('--y',`${e.clientY-r.top}px`);}});
```

Accessible flip card:

> ⚠ Untested reference snippet.

```html
<div class="flip"><button class="flip__btn" aria-pressed="false">Show details</button>
  <div class="flip__inner"><div class="face front">…</div><div class="face back">…</div></div></div>
```

```css
.flip__inner{display:grid;transition:transform .6s;transform-style:preserve-3d}
.face{grid-area:1/1;backface-visibility:hidden}
.back{transform:rotateY(180deg)}
.flip:has([aria-pressed=true]) .flip__inner{transform:rotateY(180deg)}
@media (prefers-reduced-motion:reduce){.flip__inner{transition:none}}
```

**Libraries & tools.**
- **Aceternity** ([components](https://ui.aceternity.com/components)): Card Hover Effect (highlight slides to hovered card), Card Spotlight (cursor-following radial spotlight), Card Stack (stacked cards rotating on an interval, suggested for testimonials), Comet Card (3D perspective tilt), Draggable Card (tilt + drag with snap-back), Expandable Card (click to expand detail), Focus Cards (hover one blurs the others), Glare Card, Wobble Card (translate/scale with mouse), 3D Card Effect (child elements lift in Z), Evervault Card (encrypted-text reveal + gradient), Tooltip Card, Infinite Moving Cards, Glowing Effect (border glow adapting to container). The 3D card uses CardContainer/CardBody/CardItem; a swipeable spring-physics profile card stack also exists ([21st.dev Aceternity](https://21st.dev/community/aceternity)).
- **Magic UI** ([components](https://magicui.design/docs/components)): Magic Card (cursor spotlight), Glare Hover, Border Beam, Shine Border, Neon Gradient Card, Tweet Card, Backlight, Lens (magnifier).

**Inspiration links.** [master.dev CSS spotlight effect](https://blog.master.dev/css-spotlight-effect/) · [Aceternity](https://ui.aceternity.com/components) · [Magic UI](https://magicui.design/docs/components).

**Caveats & verification status.** No empirical study found comparing card interaction effects on engagement. Linear/Vercel-style grid spotlight attribution is synthesis.

---

## 23. Bento grids and masonry layouts

**What & when.** A bento grid is an asymmetric CSS Grid of tiles in different sizes, each holding one feature or idea, often with a small live demo inside. Masonry suits mixed-aspect image sets. Native masonry ("Grid Lanes", `display: grid-lanes`) has shipped only in Safari 26.4+ as of mid-2026; build it as progressive enhancement over a normal grid.

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Classic 4×3 bento** | 4 cols × auto rows; hero tile 2×2, two 2×1, four 1×1. Each tile: one headline (≤6 words), one micro-visual. |
| 2 | **Live-demo bento** | Each tile has an interactive mini demo (toggle, chart that animates on view, typing input). Apple/Linear feature pages do this. |
| 3 | **Skewed / offset bento** | Tiles intentionally misaligned by half-row offsets (`grid-row: span 3` on a 1-row-unit grid of 4rem) for editorial rhythm. |
| 4 | **Image-masonry bento** | Photo tiles with mixed aspect ratios, caption on hover; JS-free with grid-lanes in Safari, fallback `grid-auto-rows:8px` + span calculation or CSS columns. |
| 5 | **Stat bento** | Big number tiles mixed with chart tiles and a quote tile (merges [30](#30-timelines-stats-and-feature-sections) + [28](#28-testimonials-social-proof-and-logo-clouds)). |
| 6 | **Scroll-assembled bento** | Tiles fly in from scattered positions and lock into the grid on scroll (scroll-driven animation or GSAP). |
| 7 | **Expanding bento (accordion-grid)** | Hovering/focusing a tile grows its track (`grid-template-columns` transitions `1fr 1fr 1fr` → `2fr 1fr 1fr` via `:has()`), others shrink. |
| 8 | **Dark "OS" bento** | Tiles feel like widgets (radius 24px, inner shadow, widget-style headers), referencing iOS widgets. |
| 9 | **Editorial broken grid** | 12-col grid with items overlapping across tracks (`grid-area` overlaps + z-index), large type crossing image tiles. |
| 10 | **CSS columns masonry (fallback)** | `columns: 18rem; column-gap:1rem; > * {break-inside:avoid; margin-block-end:1rem}`. Order flows top-to-bottom per column: bad for chronological feeds. |
| 11 | **Horizontal bento strip (mobile)** | On narrow screens the bento becomes a scroll-snap row of tiles rather than a long stack. |
| 12 | **Spotlight bento** | Shared cursor glow across tiles (see [22](#22-cards) snippet). |

**Crafted vs generic.**
- Generic: 6 equal-ish dark tiles each with an icon + "Lightning fast" copy and a purple glow; the bento used as a pretty way to list vague features.
- Crafted: tile size maps to feature importance; each tile *shows* the feature (real UI crops, mini-interactions); consistent inner padding and radius; one tile breaks the grid on purpose; copy is specific.

**Desktop vs mobile.**
- Desktop: 4–6 columns with explicit `grid-template-areas`. Tablet: 2 columns, re-mapped areas. Mobile: 1-column stack (reorder so the most important tile comes first) or a scroll-snap strip. Container queries inside tiles adapt micro-visuals.

**Accessibility.** Keep DOM order = reading order; `grid-template-areas` reordering can break keyboard/screen-reader order. Reorder in source rather than visually where possible.

**Code**

Bento with template areas:

> ⚠ Untested reference snippet.

```css
.bento{display:grid;gap:12px;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(180px,auto);
  grid-template-areas:"a a b c" "a a d d" "e f f g"}
.bento>:nth-child(1){grid-area:a}.bento>:nth-child(2){grid-area:b}.bento>:nth-child(3){grid-area:c}
.bento>:nth-child(4){grid-area:d}.bento>:nth-child(5){grid-area:e}.bento>:nth-child(6){grid-area:f}.bento>:nth-child(7){grid-area:g}
@media (max-width:900px){.bento{grid-template-columns:repeat(2,1fr);grid-template-areas:"a a" "b c" "d d" "e f" "g g"}}
@media (max-width:560px){.bento{grid-template-columns:1fr;grid-template-areas:none}.bento>*{grid-area:auto}}
.tile{border-radius:20px;padding:24px;background:var(--surface);container-type:inline-size;overflow:hidden}
```

Masonry with progressive enhancement:

> ⚠ Untested reference snippet.

```css
.masonry{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr))}
@supports (display:grid-lanes){.masonry{display:grid-lanes}}  /* Safari 26.4+; syntax may still change */
```

**Libraries & tools.**
- **Aceternity Bento Grid**: skewed grid with title/description/header per item; 7+ bento block variants; its blog describes a BentoGrid/BentoGridItem compound-component pattern using column spans ([Aceternity components](https://ui.aceternity.com/components); [Aceternity blog: bento with Tailwind/Next/Framer Motion](https://blog.aceternity.com/how-to-create-a-bento-grid-with-tailwindcss-nextjs-and-framer-motion)).
- **21st.dev**: "Bento Grid Feature Section With Animated Skeletons", "Masonry Bento Grid With Images" ([21st.dev Aceternity](https://21st.dev/community/aceternity)).
- **Magic UI** Bento Grid plus in-tile primitives often used inside bento cells: Animated Beam, Orbiting Circles, Animated List, Globe, Icon Cloud, Dotted Map, File Tree, Code Comparison ([Magic UI](https://magicui.design/docs/components)).

**Inspiration links.** bentogrids.com (returned no content when fetched). Apple/Linear feature pages for live-demo bentos (synthesis attribution).

**Caveats & verification status.**
- CSS Grid Lanes (native masonry): first supported in **Safari 26.4 (2026-03-24)**; Chrome, Edge, Firefox not supported per web-features explorer. Sources (as of July 2026) recommend a plain grid baseline + `@supports (display: grid-lanes)`. Spec still drafting; older proposals used `grid-template-rows: masonry` ([web-features: grid-lanes](https://web-platform-dx.github.io/web-features-explorer/features/grid-lanes/); [OpenReplay blog](https://blog.openreplay.com/css-grid-lanes-masonry-layout/); [buildmvpfast](https://www.buildmvpfast.com/blog/css-grid-lanes-native-masonry-2026)).
- Not verified whether Chrome or Firefox shipped grid-lanes between July and November 2026. Check caniuse before relying on it.
- bentogrids.com returned no content, so its curated examples aren't listed.

---

## 24. Image galleries and lightboxes

**What & when.** Browsable image sets (portfolios, product detail pages, editorial) and a full-view viewer. PhotoSwipe v5 (5.4.4) is still the go-to for a zoomable, gesture-driven lightbox, with no dependencies and a dynamically importable core. The creative frontier is WebGL galleries (Codrops 2026). A native `<dialog>` + View Transitions lightbox is the lightweight, accessible baseline.

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Justified rows (Flickr-style)** | Rows of equal height, widths from aspect ratio; CSS-only approximation: `display:flex;flex-wrap:wrap` with `flex-grow: calc(var(--w)/var(--h))` and `aspect-ratio`. |
| 2 | **Masonry** | See [23](#23-bento-grids-and-masonry-layouts). |
| 3 | **Editorial scattered gallery** | Absolute/grid-placed images of varied sizes with generous whitespace, captions numbered (01/12) in mono. |
| 4 | **Horizontal drag gallery with parallax inner image** | Images translate inside `overflow:hidden` frames opposite to drag (Codrops parallax gallery). |
| 5 | **Infinite WebGL grid / plane gallery** | Draggable infinite canvas of images with lens distortion on velocity (OGL/Three). |
| 6 | **Circular / cylinder gallery** | Images on a 3D ring (`rotateY(calc(var(--i)*360deg/var(--n))) translateZ(R)`). |
| 7 | **Hover-preview list** | Text list of projects; hovering a row shows a floating image following the cursor (agency staple). Mobile: thumbnails inline. |
| 8 | **Before/after slider** | Two stacked images, `clip-path: inset(0 calc(100% - var(--pos)) 0 0)` driven by `<input type=range>` (accessible by default). |
| 9 | **Thumbnail-strip viewer (commerce PDP)** | Main image + vertical thumbs (desktop) → swipeable main image with counter "3/8" (mobile). |
| 10 | **Zoom-on-hover lens** | Magic UI "Lens"; mobile → tap to open lightbox with pinch. |
| 11 | **Shared-element lightbox** | Clicked thumbnail morphs into full view (View Transitions API `document.startViewTransition`). |
| 12 | **Filmstrip / contact-sheet** | Dense grid of small frames; selected frame enlarges; photography portfolios. |

**Crafted vs generic.** Editor's note: the notes give no explicit generic list for galleries; crafted signals here are shared-element morphs, numbered mono captions, parallax-in-frame and real-text captions, with reduced-motion crossfade.

**Desktop vs mobile.**
- Desktop: arrow keys, click-outside to close, cursor hints.
- Mobile: swipe between, pinch to zoom, swipe down to dismiss, safe-area insets, `touch-action` tuned so vertical page scroll still works on inline galleries.
- Baymard: on mobile, support swipe *and pinch* gestures alongside buttons/indicators; use real HTML text, not text in images; avoid heavy assets taking >1s to load ([Baymard homepage carousel](https://www.baymard.com/blog/homepage-carousel)).

**Accessibility.** Thumbnails are `<a href=full.jpg>` or `<button>` with meaningful `alt`; lightbox `role=dialog` with label, focus moves to dialog and returns to trigger; counters announced ("Image 3 of 12"); captions as real text; reduced motion → crossfade instead of zoom morph. Native `<dialog>` with `showModal()` gives focus trapping, Esc to close and an inert background for free.

**Code** — native dialog lightbox with view transition

> ⚠ Untested reference snippet.

```html
<ul class="thumbs"><li><button data-full="a-full.jpg"><img src="a.jpg" alt="Harbour at dawn"></button></li></ul>
<dialog id="lb" aria-label="Image viewer"><img alt=""><button autofocus onclick="lb.close()">Close</button></dialog>
```

```js
const lb=document.getElementById('lb'),big=lb.querySelector('img');
document.querySelector('.thumbs').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const t=b.querySelector('img');
  const open=()=>{big.src=b.dataset.full;big.alt=t.alt;lb.showModal()};
  if(!document.startViewTransition||matchMedia('(prefers-reduced-motion:reduce)').matches)return open();
  t.style.viewTransitionName='hero-img';
  document.startViewTransition(()=>{t.style.viewTransitionName='';big.style.viewTransitionName='hero-img';open()})
    .finished.then(()=>big.style.viewTransitionName='');
});
```

```css
dialog::backdrop{background:rgb(0 0 0/.85)}
dialog img{max-width:92vw;max-height:86vh;object-fit:contain}
```

**Libraries & tools.**
- **PhotoSwipe** ([photoswipe.com](https://photoswipe.com/)): current version **5.4.4**; v5 rewrote the animation/gesture engine; single CSS file; dynamically generated icons; no external assets; ES module, no build step required; core can be lazily loaded via `pswpModule: () => import(...)`; loads larger images via `srcset` as the user zooms; captions removed from core due to accessibility problems (see the docs' caption section). Best for zoom/pinch/pan; needs width/height of each image up front (`data-pswp-width/height`).
- **GLightbox**: simple, video-capable lightbox (2026 maintenance status not verified). **Fancybox** (Fancyapps): commercial licence for commercial use (own knowledge, unverified). lightGallery: version/maintenance not verified.
- **Aceternity** ([components](https://ui.aceternity.com/components)): Parallax Scroll (two columns scroll in opposite directions), Images Slider (full-page slider with keyboard nav), 3D Marquee, Chromatic Image (RGB split + tilt).
- Magic UI Lens; OGL, Three.js, React Three Fiber, GSAP for WebGL galleries.

**Inspiration links.**
- Codrops 2026 gallery tutorials ([Feb 2026 archive](https://feeds.marmits.com/archive-rss-206-2026-02.html)): horizontal parallax gallery DOM→WebGL (Three.js), infinite scroll-driven 3D image tube (R3F), scroll-revealed multi-page WebGL gallery (GSAP, Three.js, Astro, Barba.js).
- Codrops infinite circular WebGL gallery with OGL and GLSL by lhbzr / Luis Bizarro (search only); reference repo [bizarro/infinite-webl-gallery](https://github.com/bizarro/infinite-webl-gallery) ([Codrops author lhbzr](https://tympanus.net/codrops/author/lhbzr)).

**Caveats & verification status.** Current versions/maintenance of GLightbox, Fancybox and lightGallery not verified. PhotoSwipe's site doesn't spell out its own accessibility features.

---

## 25. Carousels, sliders and marquees

**What & when.** The evidence is consistent: people often miss carousel content, auto-rotation causes harm (especially on mobile), and static sections perform as well. Use a carousel only for browsable sets of equal-weight items; follow the APG carousel pattern, show part of the next slide, keep it to about 5 frames. Marquees suit decorative logo/name strips. Chrome 135+ has native CSS carousels (`::scroll-button`, `::scroll-marker`). Embla (v9 RC) has the best accessibility track record of the JS libraries; Swiper (v14) has the most features.

Research (cited):
- **NN/g** ([Designing Effective Carousels](https://www.nngroup.com/articles/designing-effective-carousels/)): people often scroll past carousels; eyetracking shows animated ads looked at 27% of the time; limit to ≤5 frames; show count and current frame clearly; dots are a poor cue, especially on mobile; put controls inside the carousel; time auto-advance at ~3 words/sec; don't auto-forward on mobile; signal more content by showing part of the next frame; don't put important content only in a carousel.
- **NN/g mobile** ([Mobile Carousels](https://www.nngroup.com/articles/mobile-carousels/)): the last item should be reachable in 3–4 swipes/taps; peeking a partial next item is a strong cue; full-width carousels with no visible edge give no affordance; leave margins so edge swipes don't trigger browser back; arrows as backup; for large collections use a list.
- **Baymard** ([Homepage Carousel](https://www.baymard.com/blog/homepage-carousel)): ~33% of top US/EU ecommerce desktop sites have a homepage carousel; 46% of homepage carousels have UX performance issues; desktop autorotation can change a slide right before a click; 5–7s interval for short slides (up to 10s for text-heavy); pause on hover; stop permanently after any manual interaction; on mobile avoid autorotation; static homepage sections perform as well as a well-built carousel.

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Scroll-snap peek row** | Horizontal list, `scroll-snap-type:x mandatory`, items 80–85% wide on mobile so the next item peeks; desktop shows 3–4 with arrow buttons. **The best default.** |
| 2 | **Native CSS carousel (Chrome 135+)** | `::scroll-button` + `::scroll-marker`; other browsers degrade to a plain swipeable scroller (good progressive enhancement). |
| 3 | **Infinite logo marquee** | Duplicated track; mask edges with `mask-image: linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)`; two rows in opposite directions; grayscale logos that colourise on hover. |
| 4 | **Velocity marquee** | Speed and skew react to scroll velocity (Magic UI "Scroll Based Velocity", GSAP). |
| 5 | **3D marquee / tilted wall** | Grid of cards on a plane rotated `rotateX(55deg) rotateZ(-45deg)` scrolling diagonally (Aceternity 3D Marquee). |
| 6 | **Coverflow** | Centre item flat, sides rotated ±45° in Y and pushed back in Z; Swiper's coverflow effect or a scroll-driven CSS version using `view-timeline` per item (`animation-timeline: view(inline)`). |
| 7 | **Apple cards carousel** | Tall rounded cards (aspect 3:4) in a peek row; click expands into a full modal story. |
| 8 | **Drag slider with momentum and inertia** | Embla/Keen; cursor changes to a "Drag" bubble; slides scale down slightly while dragging. |
| 9 | **Fade/crossfade hero slider** | Embla Fade plugin; typography animates in per slide; manual only, plus a pause control if it auto-plays. |
| 10 | **Thumbnails-synced slider** | Main + thumbs (Swiper thumbs / two Embla instances), commerce PDP. |
| 11 | **Vertical story slider (Instagram-stories-style)** | Tap left/right halves, progress bars at top, hold to pause; mobile-native. |
| 12 | **Stacked card swiper (Tinder-like)** | Drag to dismiss, next card scales up; testimonials or onboarding, never critical content. |
| 13 | **Circular / rotating dial carousel** | Items on a circle rotated by wheel/drag. |
| 14 | **Infinite moving testimonial cards** | See [28](#28-testimonials-social-proof-and-logo-clouds). |

**Crafted vs generic.**
- Generic: full-width auto-rotating hero slider with dots and stock photos (the classic anti-pattern); fast logo marquee of greyed-out "Logoipsum" logos.
- Crafted: carousel used only for browsable sets of equal-weight items; peeks; physics feels right (friction, rubber-band at ends); clear "3 / 8" counter; controls inside the carousel at both sides; marquee is slow, masked at the edges and pauses on hover/focus.

**Desktop vs mobile.** Desktop: 3–4 visible items with arrow buttons; pause autorotation on hover. Mobile: items 80–85% wide so the next peeks; no auto-forward; last item reachable in 3–4 swipes; margins so edge swipes don't trigger browser back; for large collections use a list.

**Accessibility.**
- **APG carousel** ([WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)): if auto-rotating, provide a stop/start button (native button, label names the action, e.g. "Stop slide rotation", no `aria-pressed`), first in tab order inside the carousel; rotation stops on keyboard focus and mouse hover and doesn't resume after focus unless the user re-enables it.
- APG roles: container `region`/`group` + `aria-roledescription="carousel"` + label (label must not contain "carousel"); slides `group` + `aria-roledescription="slide"` + label (not containing "slide"; fallback "3 of 10"); tabbed variant uses `tabpanel`/`tablist`/`tab`; grouped picker uses `aria-disabled="true"` (not `disabled`) on the current slide button; prev/next/rotation controls don't move focus; slides wrapper `aria-atomic="false"`, `aria-live="off"` while rotating and `"polite"` when stopped.
- Native CSS carousel markers are announced like a tablist (see below).
- Marquees ([Ryan Mulligan: CSS Marquee](https://ryanmulligan.dev/blog/css-marquee/)): two identical `ul`s inside a flex container, second `aria-hidden="true"`; keyframe to `translateX(calc(-100% - var(--gap)))` (the gap offset prevents a visible jump); keep content decorative with no focusable elements; keep it slow; respect reduced motion by disabling auto-scroll completely.

**Native CSS carousels (cited)** ([Chrome: Carousels with CSS](https://developer.chrome.com/blog/carousels-with-css)): Chrome/Edge 135+; Firefox and Safari unsupported at time of article. `::scroll-button(left|right|…)` creates real buttons scrolling ~85% of the visible width, with alt text `content:"⬅" / "Scroll Left"`; `scroll-marker-group: after|before` + `::scroll-marker` generates stateful anchor markers announced like a tablist; `:target-current` styles the active marker; one item per press with `scroll-snap-type:x mandatory` + `scroll-snap-stop:always`.

**Code**

Scroll-snap carousel with APG semantics + native CSS controls as enhancement:

> ⚠ Untested reference snippet.

```html
<section class="carousel" aria-roledescription="carousel" aria-label="Featured projects">
  <div class="track" tabindex="0">
    <article role="group" aria-roledescription="slide" aria-label="1 of 6">…</article>
    <!-- … -->
  </div>
  <div class="ctrl"><button class="prev" aria-label="Previous">‹</button><output aria-live="polite">1 / 6</output><button class="next" aria-label="Next">›</button></div>
</section>
```

(Slides use the APG `group` + `aria-roledescription` roles, so the track has no list role.)

```css
.track{display:grid;grid-auto-flow:column;grid-auto-columns:min(85%,22rem);gap:1rem;
  overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scroll-padding-inline:1rem;
  padding-inline:1rem;scrollbar-width:none}
.track>*{scroll-snap-align:start}
@media (prefers-reduced-motion:no-preference){.track{scroll-behavior:smooth}}
/* Chrome 135+ native controls */
@supports selector(::scroll-button(*)){
  .ctrl{display:none}
  .track{scroll-marker-group:after}
  .track::scroll-button(left){content:"‹"/"Previous"}
  .track::scroll-button(right){content:"›"/"Next"}
  .track>*::scroll-marker{content:"";width:8px;height:8px;border-radius:50%;background:#bbb}
  .track>*::scroll-marker:target-current{background:#111}
}
```

```js
const t=document.querySelector('.track'),out=document.querySelector('.ctrl output'),items=[...t.children];
const step=d=>t.scrollBy({left:d*items[0].getBoundingClientRect().width,behavior:'smooth'});
document.querySelector('.prev').onclick=()=>step(-1);document.querySelector('.next').onclick=()=>step(1);
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)out.value=`${items.indexOf(e.target)+1} / ${items.length}`;
}),{root:t,threshold:.6});
items.forEach(i=>io.observe(i));
```

CSS-only marquee with pause + reduced motion:

> ⚠ Untested reference snippet.

```html
<div class="marquee" aria-label="Customers">
  <ul class="marquee__content"><li><img src="acme.svg" alt="Acme"></li>…</ul>
  <ul class="marquee__content" aria-hidden="true"><li><img src="acme.svg" alt=""></li>…</ul>
</div>
```

```css
.marquee{--gap:3rem;--dur:40s;display:flex;gap:var(--gap);overflow:hidden;user-select:none;
  mask-image:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)}
.marquee__content{flex-shrink:0;display:flex;justify-content:space-around;gap:var(--gap);min-width:100%;list-style:none;margin:0;padding:0}
@media (prefers-reduced-motion:no-preference){
  .marquee__content{animation:scroll var(--dur) linear infinite}
  .marquee:hover .marquee__content,.marquee:focus-within .marquee__content{animation-play-state:paused}
}
@keyframes scroll{to{transform:translateX(calc(-100% - var(--gap)))}}
@media (prefers-reduced-motion:reduce){.marquee{flex-wrap:wrap;mask-image:none}.marquee__content[aria-hidden]{display:none}}
```

Scroll-driven coverflow (Chrome/Safari 26; static elsewhere):

> ⚠ Untested reference snippet.

```css
@supports (animation-timeline:view()){
  .track>*{animation:cf linear both;animation-timeline:view(inline)}
  @keyframes cf{0%{transform:perspective(800px) rotateY(45deg) scale(.85)}50%{transform:none}100%{transform:perspective(800px) rotateY(-45deg) scale(.85)}}
}
```

**Libraries & tools.**
- **Embla Carousel** ([embla-carousel.com](https://www.embla-carousel.com/)): plugins Autoplay, Auto Scroll, Class Names, Fade, Wheel Gestures, Auto Height, Accessibility, SSR; supports vanilla, React, Vue, Svelte, Solid, CDN; **v9.0.0-rc04 "latest", v8.6.0 "stable"**.
- **Swiper** ([swiperjs.com](https://swiperjs.com/)): **v14.4.0 released Oct 30 2026**; transition and parallax effects, multi-row layouts, two-way control + thumbs, grid, lazy images, virtual slides, CSS scroll snapping, RTL; packages for JS, React, Vue, Web Components (Swiper Element).
- **Accessibility comparison** ([Carousa11y research (Cogapp)](https://cogapplabs.github.io/carousa11y/research); scores re-fetched 2026-06-07 from isitaccessible.dev, which measures *closed a11y issues*, not markup):

| Library | Score | Notes |
|---|---|---|
| Embla | 100% | Recommended; a11y plugin needs v9.0.0-rc02+ with matching rc versions across packages; npm `latest` is 8.x |
| @egjs/flicking | 100% | |
| Swiper | 86.4% | Keyboard/SR issues |
| Flickity | 74.6% | Last update May 2024, "aging" |
| Keen Slider | 66.7% | |
| tiny-slider | 58.5% | |
| Slick | 57.6% | 81 open a11y issues |
| React Slick | 57.4% | |
| Splide | 53.8% | "Not actually accessible", last update Jul 2024 |
| Glide.js | 44.4% | |
| Owl | 27.6% | Avoid |
| accessible-slick | — | jQuery option |

- **Recommendation (synthesis, Nov 2026):** accessibility-first: Embla (pin v9 RC with the a11y plugin, or v8 stable with manual ARIA). Most effects/features: Swiper v14 (add the a11y module and test). Avoid Owl, Slick (use accessible-slick if stuck with jQuery), Glide, and (per Carousa11y) Splide. Flickity still works but is aging (and needs a commercial licence, own knowledge, unverified). Zero-JS: scroll-snap + native CSS carousel features.
- **Aceternity**: Apple Cards Carousel (apple.com-style), Carousel with microinteractions, Images Slider, Infinite Moving Cards, 3D Marquee. **Magic UI**: Marquee, Scroll Based Velocity ([Aceternity](https://ui.aceternity.com/components); [Magic UI](https://magicui.design/docs/components)).

**Inspiration links.** Codrops 3D infinite carousel with reactive background gradients (Nov 2025), via search result [Contra post](https://contra.com/p/bPPPslcN-learn-how-to-code-an-infinite-scroll-based-and-draggable-3-d-ca) · [Ryan Mulligan CSS marquee](https://ryanmulligan.dev/blog/css-marquee/) · [Chrome carousels with CSS](https://developer.chrome.com/blog/carousels-with-css).

**Caveats & verification status.** The Chrome carousel article predates late 2026; not verified whether Safari or Firefox have shipped `::scroll-button`/`::scroll-marker` since. Keen-slider and Splide 2026 release activity is known only from the third-party Carousa11y table. Outdated: jQuery sliders (Slick, Owl); auto-rotating hero sliders.

---

## 26. Accordions and FAQ sections

**What & when.** NN/g ([Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/)): use accordions on content-heavy pages where users won't need several sections, for step processes, and for independent sections like FAQs. Avoid when most content is needed, when there's little content, for deep nesting, for content hard to summarise in headings, or for long reading flows. On mobile use them when content is long. Caret or plus icons work best; make heading and icon both clickable; allow multiple open; consider Expand/Collapse All; account for printing. Build with native `<details>/<summary>`: the `name` attribute makes an exclusive accordion without JS, and `::details-content` + `interpolate-size` animate the height in supporting browsers.

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Two-column FAQ** | Left col sticky heading + "Still have questions? Contact" CTA; right col accordion list. Mobile: stacks. |
| 2 | **Categorised FAQ with filter chips** | Chips (Billing, Security, API) filter the list; add search with highlight. |
| 3 | **Numbered editorial accordion** | Large numerals (01–06) in display type, hairline dividers, plus rotating to × on open. |
| 4 | **Exclusive accordion with media swap** | Opening an item swaps an adjacent image/video (feature tour). Desktop side-by-side; mobile: media inside the open panel. |
| 5 | **Card accordion** | Each item a rounded card; the open card grows a subtle bg tint. |
| 6 | **Horizontal accordion (expanding panels)** | Flex row of image panels; hovered/focused panel grows (`flex: 4` vs `1`), vertical labels on collapsed ones. Mobile: becomes vertical. |
| 7 | **Inline "read more" disclosure** | Clamp text (`line-clamp: 4`) with a toggle button. |
| 8 | **Searchable docs FAQ** | Results show matching accordion opened; works with browser find-in-page (`hidden="until-found"` for custom accordions). |
| 9 | **Expand-all FAQ for printing / SEO** | A control that opens all; `@media print { details{display:block} details>*{display:block} }` / JS sets `open`. |
| 10 | **Step accordion (checkout/onboarding)** | Completed steps collapse to a summary with an "Edit" link. |

**Crafted vs generic.**
- Generic: grey boxes, a chevron, 8 vague questions ("Is it secure?").
- Crafted: real questions from support logs; answers with links and specifics; typographic rhythm; smooth height animation; deep-link support (`#faq-refunds` opens the item); FAQPage structured data where relevant.
- Icon choice: Smashing says, in pricing feature explanations, use chevrons rather than "+" because "+" can suggest adding an add-on ([Smashing: Designing Better Pricing Page](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/)). This partially conflicts with NN/g's "caret or plus" finding; context-dependent.

**Desktop vs mobile.** Mobile: use accordions when content is long; two-column FAQ stacks; horizontal accordions become vertical; media-swap accordions put the media inside the open panel.

**Accessibility.**
- **APG accordion** ([WAI-ARIA APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)): header title in a `button` wrapped in a heading (correct `aria-level`), button is the only heading content; `aria-expanded`; `aria-controls`; `aria-disabled="true"` if an open panel can't be collapsed; optional `region` labelled by the button (avoid when >~6 panels can be open); Enter/Space toggles; Tab moves through in normal tab order.
- **`<details>`** ([MDN details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details)): `<details name="x">` groups elements so only one is open at a time; group members needn't be adjacent; if several have `open`, only the first renders open; `toggle` event fires after state change (coalesced); implicit role `group`; Space toggles when focused; `::details-content` pseudo-element enables animating open/close.
- Native `details` handles expanded state and keyboard. Put a heading *inside* `summary` sparingly (screen readers vary); custom accordions follow APG with `button` in heading.
- `hidden="until-found"` keeps collapsed custom-accordion content findable via Ctrl+F (own knowledge, unverified).
- Respect reduced motion: drop the height transition.

**Code** — exclusive, animated, native accordion

> ⚠ Untested reference snippet.

```html
<section class="faq">
  <details name="faq" open><summary>How does billing work?</summary><div class="a"><p>…</p></div></details>
  <details name="faq"><summary>Can I cancel anytime?</summary><div class="a"><p>…</p></div></details>
</section>
```

```css
:root{interpolate-size:allow-keywords}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;padding:1.25rem 0;font-size:1.25rem}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";transition:rotate .3s}
.faq details[open] summary::after{rotate:45deg}
.faq details::details-content{block-size:0;overflow:clip;
  transition:block-size .35s ease,content-visibility .35s allow-discrete}
.faq details[open]::details-content{block-size:auto}
@media (prefers-reduced-motion:reduce){.faq details::details-content{transition:none}}
```

(Browsers without `::details-content`/`interpolate-size` simply open instantly, which is a safe fallback.)

**Libraries & tools.** Native `<details>`/`<summary>`; none required. Editor's note: headless libraries (Radix, React Aria, Base UI) offer accordion primitives; see [component-libraries.md](component-libraries.md).

**Inspiration links.** [NN/g Accordions on Desktop](https://www.nngroup.com/articles/accordions-on-desktop/) · [Chrome: animate to height auto](https://developer.chrome.com/docs/css-ui/animate-to-height-auto).

**Caveats & verification status.**
- `interpolate-size: allow-keywords` (declare on `:root`, inherits) and `calc-size()` enable transitions to `height:auto`; supported in Chrome/Edge 129+, not Firefox/Safari per the article; use fallbacks / `@supports` ([Chrome](https://developer.chrome.com/docs/css-ui/animate-to-height-auto)).
- Browser support for `::details-content` as of Nov 2026 not verified (MDN page summary didn't list versions).
- NN/g's dedicated mobile accordion article wasn't fetched.
- Outdated: `height` transitions via max-height hacks → `interpolate-size`/`::details-content` where supported, otherwise accept instant open.

---

## 27. Data tables and lists

**What & when.** Tabular data that users compare, sort or scan; ranked or chronological lists. Start from semantic `<table>` markup (caption, `th` with `scope`) and add sorting with buttons inside `th` and `aria-sort`. On mobile, prefer sticky headers and a sticky first column with obvious horizontal scroll, or column selection, over squeezing columns. TanStack Table (v9, headless) is the default engine for custom UI; AG Grid suits heavy enterprise grids. Baymard: consider a "Product Table" instead of a list view on desktop for spec-heavy products ([Baymard product table examples](https://baymard.com/ecommerce-design-examples/product-table)).

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Editorial data table** | Generous row height, tabular numerals (`font-variant-numeric: tabular-nums`), right-aligned numbers, hairline rules only (no zebra), inline sparkline column. |
| 2 | **Sticky-header + sticky-first-column table** | `thead th{position:sticky;top:0}` + `th[scope=row]{position:sticky;left:0}` inside an `overflow:auto` wrapper with `tabindex=0` + `role=region` + `aria-labelledby` (so keyboard users can scroll). |
| 3 | **Card-transform table (mobile)** | Each row becomes a card with label:value pairs using `td::before{content:attr(data-label)}`. Keep table semantics (avoid `display:block` on table elements without re-adding roles, since that can strip semantics in some browsers; own knowledge). |
| 4 | **Priority columns** | Columns with `data-priority` hidden progressively via container queries; a "Columns" menu restores them. |
| 5 | **Expandable rows** | Row disclosure button reveals a detail row (`aria-expanded`, `aria-controls`). |
| 6 | **Density toggle** | Compact / comfortable / spacious. |
| 7 | **Inline-filter header** | Filter chips/inputs in header row; faceted counts. |
| 8 | **Virtualised big grid** | AG Grid / TanStack + Virtual; for spreadsheets or ops dashboards use ARIA `grid` pattern only when cells are interactive (APG grid; otherwise keep a plain table). |
| 9 | **Leaderboard list** | Ranked list with big rank numerals, avatar, animated reorder (FLIP / View Transitions). |
| 10 | **Changelog / list with sticky date rail** | Dates sticky on the left, entries on the right. |
| 11 | **Comparison table** | See [29](#29-pricing-tables-and-feature-comparison). |

**Crafted vs generic.** Editor's note: the notes' crafted signals for tables are variant 1 (tabular numerals, right-aligned numbers, hairline rules, no zebra, sparklines) and non-colour sort indicators.

**Desktop vs mobile** ([NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)): sticky column headers for tall tables; sticky left (row-header) column for horizontal scroll; horizontal scroll acceptable only with a clear cue (arrows or a cut-off column beat dots); let users choose columns/rows; group attributes into accordions; keep text legible without zoom; rotation is a last resort; shrink/remove images in headers; be careful with abbreviations. Baymard has a guideline on scanability of comparison tables (mobile), last updated Jul 2026 (content paywalled) ([Baymard #2142](https://baymard.com/guidelines/2142-scanability-of-comparison-tables)).

**Accessibility** ([Adrian Roselli: Sortable Table Columns](https://adrianroselli.com/2021/04/sortable-table-columns.html)).
- Put a `<button>` in each sortable `th`; `aria-sort="ascending|descending"` only on the currently sorted column (remove from others rather than `none`).
- Screen-reader announcement of sort changes is inconsistent: NVDA+Firefox, JAWS+Chrome, Narrator+Edge and iOS VoiceOver announce; macOS VoiceOver and TalkBack don't. A live region (cleared after ~1s) helps.
- Don't rely on colour for direction (WCAG 1.4.1): stroke chevron for unsorted, filled triangle for sorted. Forced-colors needs system colour keywords.
- Column highlight via `colgroup:has(...)`.
- Hint that headers are sortable via caption or `aria-describedby`; avoid `aria-label` (missed in translation).
- A 2026 update notes a web component using `ariaNotify()` with live-region fallback can cause JAWS to double-announce.
- Scrollable wrapper: `role=region` + `aria-labelledby` + `tabindex=0`.

**Code** — accessible sortable header + responsive wrapper

> ⚠ Untested reference snippet.

```html
<div class="table-wrap" role="region" aria-labelledby="cap" tabindex="0">
<table><caption id="cap">Plans by usage <span class="vh">(column headers with buttons are sortable)</span></caption>
<thead><tr>
  <th scope="col" aria-sort="ascending"><button>Name <svg aria-hidden="true" focusable="false">…</svg></button></th>
  <th scope="col" class="num"><button>Price</button></th>
</tr></thead><tbody>…</tbody></table></div>
```

```css
.table-wrap{overflow:auto;max-block-size:70vh}
thead th{position:sticky;top:0;background:var(--bg);z-index:1}
tbody th[scope=row]{position:sticky;left:0;background:var(--bg)}
.num,td.num{text-align:end;font-variant-numeric:tabular-nums}
th button{all:unset;cursor:pointer;display:inline-flex;gap:.25em}
th button:focus-visible{outline:2px solid;outline-offset:2px}
```

```js
document.querySelectorAll('th button').forEach((b,i)=>b.addEventListener('click',()=>{
  const th=b.parentElement,dir=th.getAttribute('aria-sort')==='ascending'?'descending':'ascending';
  th.closest('tr').querySelectorAll('th').forEach(h=>h.removeAttribute('aria-sort'));th.setAttribute('aria-sort',dir);
  const tb=th.closest('table').tBodies[0],rows=[...tb.rows],k=[...th.parentElement.children].indexOf(th);
  rows.sort((a,b)=>a.cells[k].textContent.localeCompare(b.cells[k].textContent,undefined,{numeric:true})*(dir==='ascending'?1:-1));
  tb.append(...rows);
}));
```

**Libraries & tools.**
- **TanStack Table** ([tanstack.com/table](https://tanstack.com/table/latest)): headless (state, row processing, typed APIs; you render markup); sorting, pagination, filtering, faceting, grouping, aggregation, row expansion, row/cell selection, cell spanning, row/column pinning, ordering, visibility, resizing; TanStack Store fine-grained reactivity; tree-shakable; `createTableHook`; devtools; official examples for shadcn/ui, HeroUI, React Aria, MUI, Mantine, Chakra; current version **v9**. Virtualization is not listed on that page; it's typically paired with TanStack Virtual (own knowledge).
- **AG Grid**: heavy enterprise grids; Community (MIT) and Enterprise (commercial) editions (own knowledge; version and licence page not fetched).

**Inspiration links.** [Baymard product table examples](https://baymard.com/ecommerce-design-examples/product-table) · [Adrian Roselli sortable columns](https://adrianroselli.com/2021/04/sortable-table-columns.html) · [NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/).

**Caveats & verification status.** AG Grid's current version/licence not fetched. APG grid/table pattern pages not fetched; table semantics rely on HTML standards and Roselli.

---

## 28. Testimonials, social proof and logo clouds

**What & when.** Credible social proof is specific (name, role, company, photo, concrete outcome) and sits next to the decision it supports, such as on the pricing page. Perfect ratings undermine trust: purchase likelihood peaks at 4.2–4.5 stars.

Research (cited):
- **Spiegel Research Center + PowerReviews** ("From Reviews to Revenue", 2015): purchase likelihood peaks at an average 4.2–4.5 stars and falls as ratings approach 5.0 ("too good to be true"); secondary summaries cite a broader 4.0–4.7 range ([Retail TouchPoints](https://www.retailtouchpoints.com/topics/customer-experience/purchase-likelihood-highest-for-products-rated-between-4-2-and-4-5-out-of-5-stars); [Spiegel Online Reviews whitepaper PDF](https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Online-Reviews-Whitepaper.pdf); [PowerReviews: power of negative reviews](https://www.powerreviews.com/the-power-of-negative-reviews/)).
- **Smashing**: on pricing pages show customer logos (Airtable, Netlify, Twilio Segment), testimonials or short case studies (Maze, Canva), explain which companies/roles each plan suits, and compare against competitors if favourable (Gumroad, Basecamp) ([Smashing](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/)).

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Single hero quote** | One huge pull quote (display serif, 3–5rem, `hanging-punctuation: first`), portrait, name/role/company logo. Strongest when the quote is strong. |
| 2 | **Masonry "wall of love"** | 3-col masonry of tweet-style cards of varied length; fade-out mask at bottom + "Show more". |
| 3 | **Dual-row opposite-direction marquee** | Two rows of testimonial cards drifting opposite ways, pause on hover. |
| 4 | **Case-study metric cards** | Logo + one big outcome metric ("−38% churn") + 1-line quote + "Read story" link. |
| 5 | **Video testimonials** | Portrait (9:16) thumbnails with captions; click opens dialog player with captions (WCAG). |
| 6 | **Tabbed by persona/industry** | Tabs switch quote sets (APG tabs pattern). |
| 7 | **Stacked card deck** | Aceternity Card Stack; auto-rotation only with a pause control. |
| 8 | **Rating summary** | Aggregate stars + review count + distribution bars; link to third-party source (G2, Trustpilot) for credibility. |
| 9 | **Logo cloud grid** | 3×2 / 4×2 grid with uniform optical sizing (normalise logos by visual weight, not width), monochrome, divider lines between cells. |
| 10 | **Logo marquee with edge mask** | See [25](#25-carousels-sliders-and-marquees) snippet. |
| 11 | **Inline social proof** | Avatar stack + "Join 12,400 designers" next to the CTA (Magic UI Avatar Circles). |
| 12 | **Annotated testimonial** | Quote with highlighted key phrase (marker underline animation on view). |

**Crafted vs generic.**
- Generic: three equal cards with 5 stars, stock avatar, "This product changed my life!" with first name only; logo row of grey generic logos.
- Crafted: real names, titles, companies and photos; specific outcomes; varied lengths; the quote's key phrase highlighted; logos normalised optically; proof placed contextually (near pricing, near the CTA, near the relevant feature).

**Desktop vs mobile.** Mobile: masonry collapses to 1 col with a limit + "Show more"; marquees still fine but slower; swipe peek row for case studies.

**Accessibility.** `<figure><blockquote>…</blockquote><figcaption>— Name, Role</figcaption></figure>`; star ratings need text ("4.6 out of 5, 1,203 reviews"); auto-rotating testimonial sliders follow APG carousel rules (pause button, stop on focus/hover). Logo marquees must stay decorative, slow and non-focusable, with duplicates `aria-hidden` ([Ryan Mulligan](https://ryanmulligan.dev/blog/css-marquee/)).

**Code.** Editor's note: reuse the CSS-only marquee in [25](#25-carousels-sliders-and-marquees) for logo and testimonial marquees, and the APG tabs code in [navigation-structure.md](navigation-structure.md#6-tabs-and-segmented-controls) for persona tabs.

**Libraries & tools.** Aceternity: Testimonials block (9+ variants), Animated Testimonials (image + quote slider), Card Stack, 3D Marquee, Infinite Moving Cards. Magic UI: Tweet Card, Marquee, Avatar Circles ([Aceternity](https://ui.aceternity.com/components); [Magic UI](https://magicui.design/docs/components)).

**Inspiration links.** [Smashing pricing page (social proof examples)](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/).

**Caveats & verification status.** The NN/g testimonials article URL returned 404; no NN/g-specific testimonial guidance captured. No rigorous study found on logo clouds' conversion impact.

---

## 29. Pricing tables and feature comparison

**What & when.** Show 2–4 plans side by side, ordered low to high and aimed at specific personas, with the recommended plan visually emphasised. Put the billing toggle at the top and make annual savings explicit. Show a few key features per card and the full grouped matrix below, with a sticky header. On mobile, stack the cards or use plan tabs instead of a horizontally scrolling table.

Research (cited, all [Smashing: Designing Better Pricing Page](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/) unless noted):
- **Structure:** simple pricing where possible (Stripe, Kissflow); plans side by side growing left→right; most popular near centre; for many plans wrap/tabs/dropdown, avoid a single horizontally scrolling table; describe who each plan is for (Adobe XD, 15five); align prices/CTAs/features across cards; colour-code columns (Airtable, CodePen).
- **Billing:** billing toggle and currency selector at top; consider annual default (Notion); show yearly saving explicitly (Fathom "two months free"); keep toggle visible while scrolling (Dropbox); stronger CTA for the recommended plan (Airtable).
- **Features:** lead with a few key features, full matrix below (Contentful, Chargebee); group features in collapsible sections (Zendesk); option to show only differences (Samsung); mark availability clearly (Podia hides unavailable, Dovetail highlights included); sticky plan headers with name/price/CTA (Contentful, Dropbox, Figma, Intercom).
- **Mobile:** avoid horizontal scrolling; stack plans as cards (Rows), floating plan tabs (Mailchimp, Cloudflare, Canva), consider bottom placement for thumbs, pick-two-to-compare (Dropbox), attributes one row at a time (Yousign), ask which features matter (Mediamarkt); Canva drops the table on mobile for accordions; avoid hover-only tooltips (inaccessible, cover content), prefer tap/click (Mailchimp); for variable pricing provide sliders/calculators (Speedcurve, Hotjar, Mixpanel, Intercom, Ballpark); be transparent with worked examples (Gumroad).
- NN/g mobile-table guidance (sticky headers/first column, column selection, accordion grouping) applies to comparison matrices ([NN/g Mobile Tables](https://www.nngroup.com/articles/mobile-tables/)).
- **Baymard:** 38% of top 60 ecommerce sites have a dedicated comparison tool, and users have "severe difficulties" both selecting items and reading specs on comparison pages ([Baymard: user-friendly comparison tools (search result)](https://marketing-site-f2tmuig6e-baymard.vercel.app/blog/user-friendly-comparison-tools); mirror URL, canonical likely baymard.com/blog/user-friendly-comparison-tools).
- **Third-party (not NN/g; lower authority):** keep 5–7 feature rows per tier on cards; comparison table below cards; sticky headers for long tables ([pricingnest (search summary)](https://pricingnest-com.pages.dev/guides/pricing-page-comparison-table); [dodopayments](https://dodopayments.com/blogs/pricing-page-conversion-optimization)).

**Variants** (synthesis)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **3-tier cards with emphasised middle** | Middle card raised (scale 1.04 or taller), inverted colour or accent border, "Most popular" label as text (not only colour). |
| 2 | **Persona-led cards** | Plan names describe the user ("For solo creators", "For teams"), with a short "Best if you…" line. |
| 3 | **Usage slider pricing** | `<input type=range>` for seats/events updates price live (`<output>`), tiers snap at breakpoints; shows "≈ $0.002 / event". |
| 4 | **Single-plan + calculator** | One price, an estimate calculator, FAQ (simplicity as brand statement, à la Stripe/Basecamp). |
| 5 | **Horizontal plan rows (list pricing)** | Each plan a full-width row with name, price, 3 features and a CTA. Great on mobile and editorial sites. |
| 6 | **Comparison matrix with sticky header** | Grouped rows (collapsible), check icons with text alternatives, tooltips on tap, "Show only differences" toggle, column highlight on hover/focus (`:has()`). |
| 7 | **Tabbed audiences** | Tabs for Individuals / Business / Enterprise switch the card sets. |
| 8 | **Toggle with savings badge** | Segmented control (radio group) Monthly/Annual, savings computed ("Save 17%"), price animating with a number roll (respect reduced motion). |
| 9 | **Enterprise "contact" column** | Dark contrasting card with logo strip and "Talk to sales". |
| 10 | **Mobile plan tabs + attribute list** | Plan selector pinned at the bottom; features listed for the selected plan; a "Compare 2 plans" mode. |
| 11 | **Pricing + proof sandwich** | Cards → logo row → testimonials → matrix → FAQ (accordion) → final CTA. |

**Crafted vs generic.**
- Generic: three identical cards, the middle one with a purple gradient, "Basic/Pro/Enterprise", 10 checkmarks of vague features, no annual savings logic, comparison table missing or unusable on mobile.
- Crafted: honest prices with clear units; persona framing; a meaningful default plan; tabular numerals and price typography with a small currency symbol and period suffix; full transparency (limits, overage); answers to objections in the FAQ.

**Desktop vs mobile.** Desktop: cards side by side + sticky matrix. Mobile: stacked cards, floating/bottom plan tabs, pick-two-to-compare, accordion-grouped features, tap (not hover) tooltips. Avoid horizontally scrolling tables.

**Accessibility.** "Most popular" as text, not colour only; check icons with text alternatives; tap/click tooltips instead of hover-only; billing toggle as a radio group in a `fieldset` with `legend`; respect reduced motion on number rolls.

**Code** — billing toggle (radio group, no JS needed for display)

> ⚠ Untested reference snippet.

```html
<fieldset class="billing"><legend class="vh">Billing period</legend>
  <label><input type="radio" name="b" value="m" checked> Monthly</label>
  <label><input type="radio" name="b" value="y"> Annual <span class="badge">2 months free</span></label>
</fieldset>
<div class="plans">
  <article class="plan"><h3>Studio</h3>
    <p class="price"><span class="m">$24</span><span class="y">$20</span><small>/ seat / mo</small></p></article>
</div>
```

```css
.price .y{display:none}
body:has(.billing [value=y]:checked) .price .m{display:none}
body:has(.billing [value=y]:checked) .price .y{display:inline}
.price{font-variant-numeric:tabular-nums;font-size:clamp(2.5rem,5vw,4rem)}
.plans{display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr))}
.compare thead{position:sticky;top:var(--header-h,0);background:var(--bg)}
```

**Libraries & tools.** Aceternity Pricing Sections block (7+ variants) ([Aceternity](https://ui.aceternity.com/components)). Sortable/sticky table code in [27](#27-data-tables-and-lists); segmented toggle in [actions-inputs.md](actions-inputs.md#15-checkboxes-radios-and-toggle-switches).

**Inspiration links.** Examples named by Smashing: Stripe, Kissflow, Adobe XD, 15five, Airtable, CodePen, Notion, Fathom, Dropbox, Contentful, Chargebee, Zendesk, Samsung, Podia, Dovetail, Figma, Intercom, Rows, Mailchimp, Cloudflare, Canva, Yousign, Mediamarkt, Speedcurve, Hotjar, Mixpanel, Ballpark, Gumroad, Basecamp ([Smashing](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/)).

**Caveats & verification status.** No NN/g article specifically on pricing pages was found; guidance is mostly Smashing (2022, principles evergreen). No primary A/B data found on the effect of an emphasised plan or an annual default. Outdated: hover-only tooltips in pricing tables.

---

## 30. Timelines, stats and feature sections

**What & when.** Where scroll-linked motion helps comprehension most: a progress beam along a timeline, counters that run once when they come into view, sticky scrolling feature tours. Each needs static, readable fallbacks for reduced motion and mobile.

**Variants** (synthesis)

Timelines:

| # | Variant | Spec |
|---|---|---|
| 1 | **Centre-spine alternating** | Vertical line at centre, entries alternate left/right; mobile collapses to a left spine with all entries on the right. |
| 2 | **Scroll-progress beam** | Spine fills as you scroll (`scaleY` driven by `scroll()`/`view()` timeline); current milestone dot glows. |
| 3 | **Horizontal scrubbable timeline** | Year ticks on a horizontal scroll-snap track; drag or arrow keys; year labels in huge outline type. |
| 4 | **Sticky-year editorial** | Big sticky year on left (`position:sticky`) while events scroll on the right (changelogs, company history). |
| 5 | **Roadmap kanban timeline** | Now / Next / Later columns with status chips. |
| 6 | **Changelog feed** | Date rail + release cards with tags and media. |
| 7 | **Process steps (numbered)** | 3–5 steps with connecting line and illustration per step; mobile stacked with the line on the left. |

Stats / counters:

| # | Variant | Spec |
|---|---|---|
| 1 | **Giant numerals row** | 3–4 stats in huge display type (8–10rem), small label beneath, hairline separators, `tabular-nums`. |
| 2 | **Count-up on view** | Run once, ease-out, ≤1.5s; final value present in HTML for SEO/a11y; skip animation under reduced motion. |
| 3 | **Odometer / rolling digits** | Per-digit vertical strips translate (`translateY(calc(var(--d) * -10%))`); Magic UI Number Ticker style. |
| 4 | **Stat + sparkline / micro-chart** | Number with context (trend line, "vs last year"). |
| 5 | **Stat in bento tiles** | Mixed with quotes and charts (see [23](#23-bento-grids-and-masonry-layouts)). |
| 6 | **Animated progress rings** | SVG `stroke-dashoffset`; provide a text percentage. |

Feature sections:

| # | Variant | Spec |
|---|---|---|
| 1 | **Sticky scroll feature tour** | Left column of feature text blocks scrolls; right column sticky media swaps per active block (IntersectionObserver or `view-timeline`); mobile: media inline with each block. |
| 2 | **Tabbed feature showcase** | APG tabs with auto-advancing progress bars only if pausable; mobile: accordion. |
| 3 | **Alternating zig-zag (crafted version)** | Media/text alternate, but with varied media sizes, overlapping captions, real UI crops. Generic when uniform. |
| 4 | **Feature bento** | See [23](#23-bento-grids-and-masonry-layouts). |
| 5 | **Feature list with hover preview** | Text list; hovering an item previews media (desktop); mobile shows thumbnails. |
| 6 | **Connected-integrations diagram** | Central logo with Animated Beams to integration logos (Magic UI). |
| 7 | **Comparison "Before vs With us" split** | Two columns with crossed/struck pain points versus solutions. |
| 8 | **Interactive demo embed** | A live, sandboxed mini-version of the product replacing screenshots. |

**Crafted vs generic.**
- Generic: "3 icon cards" (icon-in-rounded-square + bold title + 2 lines) repeated after the hero; stats like "10K+ users, 99.9% uptime, 24/7 support" with no context.
- Crafted: features shown, not told; numbers with provenance and time frame; timeline with real artefacts (photos, docs); motion tied to scroll that clarifies sequence.

**Desktop vs mobile.** Centre-spine timelines collapse to a left spine below ~900px (see code); sticky feature tours put media inline with each block on mobile; tabbed showcases become accordions; hover-preview lists show thumbnails.

**Accessibility.** Use `<ol>` for timelines (order matters) and `<time datetime>` for dates. Counters keep the final value in HTML and expose it to screen readers while animating (snippet). Progress rings need a text percentage. Auto-advancing tab progress bars must be pausable.

**Code**

Counter (runs once, reduced-motion safe, accessible):

> ⚠ Untested reference snippet.

```html
<p class="stat"><span class="n" data-to="12480">12,480</span> <span>teams onboarded in 2026</span></p>
```

```js
const fmt=new Intl.NumberFormat();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const el=e.target,to=+el.dataset.to,t0=performance.now(),d=1200;el.setAttribute('aria-hidden','true');
  const sr=document.createElement('span');sr.className='vh';sr.textContent=fmt.format(to);el.after(sr);
  (function f(t){const p=Math.min(1,(t-t0)/d),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=fmt.format(v);if(p<1)requestAnimationFrame(f)})(t0);
}),{threshold:.6});
document.querySelectorAll('.n').forEach(n=>io.observe(n));
```

```css
.stat .n{font-size:clamp(3rem,10vw,9rem);font-variant-numeric:tabular-nums;line-height:.9}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
```

Timeline with scroll-progress spine:

> ⚠ Untested reference snippet.

```css
.timeline{position:relative;padding-left:2rem}
.timeline::before,.timeline::after{content:"";position:absolute;left:.5rem;top:0;bottom:0;width:2px;background:var(--line)}
.timeline::after{background:var(--accent);transform-origin:top;transform:scaleY(1)}
@supports (animation-timeline:view()){@media (prefers-reduced-motion:no-preference){
  .timeline{view-timeline:--tl block}
  .timeline::after{animation:fill linear both;animation-timeline:--tl;animation-range:entry 50% exit 50%}
  @keyframes fill{from{transform:scaleY(0)}to{transform:scaleY(1)}}
}}
@media (min-width:900px){ /* centre-spine alternating */
  .timeline{padding-left:0}.timeline::before,.timeline::after{left:50%}
  .timeline>li{width:50%}.timeline>li:nth-child(odd){margin-left:auto;padding-left:2rem}
  .timeline>li:nth-child(even){padding-right:2rem;text-align:right}
}
```

**Libraries & tools.** Aceternity Timeline (sticky header with a beam that follows scroll), Tracing Beam (beam follows SVG path on scroll), Sticky Scroll Reveal (sticky container + revealing text). Magic UI Animated Beam (connecting elements), Number Ticker (counts up to a number), Animated Circular Progress Bar, Animated List, Orbiting Circles ([Aceternity](https://ui.aceternity.com/components); [Magic UI](https://magicui.design/docs/components)).

**Inspiration links.** Codrops Motion Highlights roundups, e.g. [#16, 8 Feb 2026](https://tympanus.net/codrops/2026/02/08/motion-highlights-16/) ([Codrops archive](https://feeds.marmits.com/archive-rss-206-2026-02.html)).

**Caveats & verification status.** Scroll-driven CSS animations available in Chrome and Safari 26, not Firefox stable (not Baseline) ([web-features explorer](https://web-platform-dx.github.io/web-features-explorer/one-missing-engine)). No empirical studies found on animated counters or timelines affecting comprehension or conversion.

---

## Cross-cutting: inspiration sources and workflow

Use award galleries (Awwwards, recent.design/Godly) and Codrops for craft ideas. Use section-indexed galleries (Land-book, Lapa Ninja, SaaSLandingPage, Landingfolio, Mobbin) for layout patterns. Use component registries (Aceternity, Magic UI, 21st.dev via the shadcn CLI) for implementation. Because thousands of sites now share those registry effects, they are the main source of the "template look" and need restyling.

Cited sources:
- Awwwards hero collection with technique tags ([Awwwards](https://www.awwwards.com/websites/hero-section/)).
- godly.website now 301-redirects to recent.design ("The best design inspiration on the Internet"), covering Web, Interface, Branding, Motion, Illustration, Posters, Print, launch videos, OG images, app screenshots, app icons ([recent.design](http://recent.design/?ref=godly)).
- Aceternity (≈262 components per 21st.dev; 100+/200+ per other pages, a conflict), installable via shadcn CLI ([21st.dev library](https://21st.dev/@manuarora700/library/aceternity-ui)).
- Magic UI full component list ([Magic UI](https://magicui.design/docs/components)).
- Codrops 2026 WebGL gallery tutorials ([Codrops archive](https://feeds.marmits.com/archive-rss-206-2026-02.html)).
- Carousel library a11y comparison ([Carousa11y](https://cogapplabs.github.io/carousa11y/research)).

Workflow (synthesis):
1. Collect 10–20 references per section from galleries.
2. Define a non-default type pairing, grid and motion language.
3. Pull registry components only as a starting point, then change easing, colour, density and scale.
4. Test keyboard, screen reader, reduced motion and mobile touch.

Outdated and to avoid in 2026 (synthesis): jQuery sliders (Slick, Owl); auto-rotating hero sliders; `100vh` on mobile (use `svh`/`dvh`); JS masonry libraries where `grid-lanes` + fallback suffices; scroll-jacking libraries that override native scroll for body content; `height` transitions via max-height hacks (use `interpolate-size`/`::details-content` where supported, otherwise accept instant open); hover-only tooltips in pricing tables.

Gaps: Land-book, Lapa Ninja, SaaSLandingPage, Landingfolio, Mobbin, CodePen and Framer marketplace pages were not fetched successfully (403/reset/not attempted due to budget). No verified counts or example lists from them are included.

---

## Sources

- Awwwards hero-section collection: https://www.awwwards.com/websites/hero-section/
- Awwwards featured sites: http://nohero.studio · https://www.herocollective.co/ · https://bowiesheroes.tilda.ws · https://rafalbojar.com/ · https://www.herostudios.tv
- Aceternity UI: https://ui.aceternity.com/components · https://blog.aceternity.com/how-to-create-a-bento-grid-with-tailwindcss-nextjs-and-framer-motion
- 21st.dev: https://21st.dev/@manuarora700/library/aceternity-ui · https://21st.dev/community/aceternity
- Magic UI: https://magicui.design/docs/components
- recent.design (ex-Godly): http://recent.design/?ref=godly
- NN/g: https://www.nngroup.com/articles/designing-effective-carousels/ · https://www.nngroup.com/articles/mobile-carousels/ · https://www.nngroup.com/articles/accordions-on-desktop/ · https://www.nngroup.com/articles/mobile-tables/
- Codrops: https://feeds.marmits.com/archive-rss-206-2026-02.html · https://tympanus.net/codrops/2026/02/19/creating-a-smooth-horizontal-parallax-gallery-from-dom-to-webgl/ · https://tympanus.net/codrops/hub/author/valentindescombes/ · https://tympanus.net/codrops/author/lhbzr · https://tympanus.net/codrops/2026/02/08/motion-highlights-16/
- bizarro/infinite-webl-gallery: https://github.com/bizarro/infinite-webl-gallery
- Contra (Codrops 3D carousel): https://contra.com/p/bPPPslcN-learn-how-to-code-an-infinite-scroll-based-and-draggable-3-d-ca
- web-features explorer: https://web-platform-dx.github.io/web-features-explorer/one-missing-engine · https://web-platform-dx.github.io/web-features-explorer/features/grid-lanes/
- Chrome for Developers: https://developer.chrome.com/docs/css-ui/scroll-driven-animations · https://developer.chrome.com/blog/carousels-with-css · https://developer.chrome.com/docs/css-ui/animate-to-height-auto
- master.dev CSS spotlight: https://blog.master.dev/css-spotlight-effect/
- Grid Lanes: https://blog.openreplay.com/css-grid-lanes-masonry-layout/ · https://www.buildmvpfast.com/blog/css-grid-lanes-native-masonry-2026
- PhotoSwipe: https://photoswipe.com/
- Baymard: https://www.baymard.com/blog/homepage-carousel · https://baymard.com/ecommerce-design-examples/product-table · https://baymard.com/guidelines/2142-scanability-of-comparison-tables · https://marketing-site-f2tmuig6e-baymard.vercel.app/blog/user-friendly-comparison-tools
- WAI-ARIA APG: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ · https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
- Embla Carousel: https://www.embla-carousel.com/
- Swiper: https://swiperjs.com/
- Carousa11y (Cogapp): https://cogapplabs.github.io/carousa11y/research
- Ryan Mulligan CSS marquee: https://ryanmulligan.dev/blog/css-marquee/
- MDN details: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details
- Smashing pricing page: https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/
- Adrian Roselli sortable table columns: https://adrianroselli.com/2021/04/sortable-table-columns.html
- TanStack Table: https://tanstack.com/table/latest
- Reviews research: https://www.retailtouchpoints.com/topics/customer-experience/purchase-likelihood-highest-for-products-rated-between-4-2-and-4-5-out-of-5-stars · https://spiegel.medill.northwestern.edu/wp-content/uploads/sites/2/2021/04/Online-Reviews-Whitepaper.pdf · https://www.powerreviews.com/the-power-of-negative-reviews/
- Pricing (third-party): https://pricingnest-com.pages.dev/guides/pricing-page-comparison-table · https://dodopayments.com/blogs/pricing-page-conversion-optimization
