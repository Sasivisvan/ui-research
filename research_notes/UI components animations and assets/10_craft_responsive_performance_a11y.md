# Foundations for Turning Components, Animations and Assets into a Distinctive, Responsive, Fast, Accessible Website (as of Nov 2026)

> Research notes for the report writer. Every item under "Cited Findings" was read this session from the linked URL. Items under "Inferences" are reasoned synthesis or long-established practice that was **not** re-verified this session (each is marked); treat them as practitioner guidance, not citations. Research date: 2026-11-05.

---

## Q1. What does "AI slop" / generic web design look like in 2025–2026, and how do designers produce distinctive work instead?

### Takeaway
"AI slop" is a recognisable bundle, not any single choice. It usually means Inter or Roboto type, a purple-to-indigo gradient on white, a centred hero with one CTA, three rounded icon cards, uniform 16px radius and 24px padding, faint shadows, plastic stock or AI imagery, and vague copy. The bundle traces partly to framework defaults such as Tailwind's old `bg-indigo-500`, and partly to models regressing to the statistical centre of their training data. The fix is a deliberate point of view: one committed display typeface, a dominant colour with sharp accents, asymmetric or editorial layout, real imagery, specific copy in a brand voice, and motion that tells the user what changed.

### Cited Findings
**The tells**
- Common tells: purple/indigo accents and gradients on white, traced to Tailwind's `bg-indigo-500` default (Adam Wathan apologised for it). Others are Inter/Roboto/Arial, a centred hero with a CTA, a three-feature-box icon grid, rounded corners on everything and faint shadows. Missing functionality also gives it away: no validation, no error states, weak ARIA and keyboard support. — [prg.sh: Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Uniform sizing is a tell: the same border radius (16px), padding (24px) and card height on every element. Others are stock or AI illustrations that look "too smooth, too symmetrical, plastic", vague headlines ("Build the future of work"), and hedging superlatives ("best-in-class", "cutting-edge"). In motion, the tells are hover states that do nothing, buttons that snap, and the same fade-in on every element. — [925 Studios: AI Slop Web Design guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- The search-result consensus: the purple-blue gradient is "the safest choice" and appears with no semantic meaning. None of these choices is bad on its own, and purple can be right for a brand that owns purple. When asked to look "less AI", agents tend to produce warm cream with a terracotta accent, or near-black with one acid-green highlight. That is a new cliché to watch for. — summarised from search results incl. [925 Studios: AI slop design tells](https://www.925studios.co/blog/ai-slop-design-tells), [capitalandcompute.net: Fix AI slop tell by tell](https://capitalandcompute.net/blog/fix-ai-slop-design/), [superdesign.dev](https://www.superdesign.dev/blog/why-ai-design-looks-generic). Caveat: these are mostly vendor blogs with a commercial interest. The "statistical average" explanation is widely repeated but not independently verified.
- Even with anti-slop prompts (e.g. Anthropic's "frontend aesthetics" cookbook prompt), models re-converge on second-tier defaults such as Space Grotesk. The prompt therefore has to ask explicitly for *unexpected* choices. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)

**Remedies with specifics**
- Typography: avoid Inter, Roboto, Open Sans, Lato and system fonts as the *brand* voice. The article sorts candidates by register:
  - Editorial: Playfair Display, Crimson Pro, Fraunces, Newsreader
  - Startup: Clash Display, Satoshi, Cabinet Grotesk
  - Technical: IBM Plex, Source Sans 3, JetBrains Mono, Fira Code
  - Warm or modern: Bricolage Grotesque, Obviously

  Pair contrasting styles (display + mono, serif + geometric sans). Use extreme weight contrast (100/200 vs 800/900) and big size jumps (3x+). "Pick one distinctive font and use it decisively." — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Colour: choose a dominant colour with sharp accents rather than "an evenly spread, timid palette". Draw from cultural references (e.g. a 1970s ski lodge: burnt orange, avocado, warm browns) or IDE themes. Name tokens semantically (`--color-action-primary`, `--color-feedback-success`), not decoratively (`--color-gradient-start`). — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Layout: break the centred hero + 3 boxes pattern with asymmetric layouts, split screens, generous negative space, and references such as Japanese print design. Vary radius, padding and card sizes *deliberately* to build hierarchy, and codify those rules in the design system. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Backgrounds: avoid flat solids. Layer gradients, geometric patterns or contextual textures that fit the concept. One guide allows at most one restrained gradient and never on body headings. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); search-results summary ([capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/))
- Motion: one well-orchestrated page load with staggered `animation-delay` reveals beats scattered micro-interactions. Prefer CSS-only effects. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website). Put micro-interactions on primary CTAs and form inputs first, make motion signal state changes, limit scroll-triggered animation to navigation or storytelling, and match motion character to the brand (precise or playful). — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Imagery: replace stock or AI art with real product screenshots, real team photos, or custom illustration. — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Copy is part of design: say concretely what the product does (Stripe: "Financial infrastructure for the internet."). Rewrite each line in the founder's voice: "would the CEO actually say it?" A polished layout full of boilerplate text still reads as slop. — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Reference-driven workflow:
  1. Collect 3–5 references (Dribbble, Mobbin, Awwwards).
  2. Write down *why* each works: layout, type, colour.
  3. Give that analysis to the builder or LLM.
  4. Iterate on named elements.

  Also request several design directions, so the first, most generic one is not the only option. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)

**"Invisible details": Rauno Freiberg, *Invisible Details of Interaction Design*** — [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design)
- Reuse familiar metaphors (horizontal swipe = turning book pages).
- Model physics: keep momentum and velocity on dismiss, make motion interruptible (a page flip can be stopped midway), and let material weight vary (a "light" card bounces less).
- Match the trigger to intent: lightweight actions can fire mid-gesture, destructive ones wait for gesture end, and "peek" can snap in but commits only on release.
- Respond immediately: apply the gesture's scale or movement from the first pixel instead of waiting for a threshold.
- Spatial consistency: things open from where they came from (an app launches from its icon).
- **Animate by frequency and novelty:** frequent, low-novelty actions (command menus, context menus) are often better *without* animation. Rauno removed motion from his bookmarking tool after daily use made it feel sluggish.
- Keep obscured content visible: a loupe over the caret, enlarged keys, and drag that stays active after the finger leaves a small slider.
- Fitts's law: corners and edges act as near-infinite targets, and radial menus put every option at equal distance.
- Scroll the element under the pointer, and add scroll landmarks or minimaps for orientation.
- Use context as implicit input (Wallet raises brightness to scan a pass; blur sensitive snapshots in the app switcher).

**Emil Kowalski: animation craft** — [emilkowal.ski/ui/great-animations](https://emilkowal.ski/ui/great-animations)
- Keep most UI animations **under 300ms**. A 500ms entrance on a tool opened many times a day feels sluggish.
- Use **ease-out** for snappy feedback and `ease` for a more elegant, deliberate feel (as in the Sonner toasts). Tune by trial and re-check the next day. Springs are defined by stiffness, damping and mass.
- Make animations interruptible: CSS transitions can retarget mid-flight, and Framer Motion supports interruption.
- Don't animate keyboard-initiated actions that users repeat often. Weigh how often an animation will be seen.
- Animate only `transform` and `opacity` (they skip layout and paint). Animating padding or margin triggers layout, paint and composite. Under main-thread load, CSS and WAAPI animations can be hardware-accelerated. Framer Motion's rAF-driven animations are not, so they may stutter.
- Reduced motion: wrap motion in `@media (prefers-reduced-motion: reduce)` and swap it for a gentler effect (e.g. a 0.2s fade instead of a bounce). In React, `useReducedMotion` lets you zero the x-offset while keeping opacity.

**Josh W. Comeau: shadows as a crafted detail** — [joshwcomeau.com/css/designing-shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- Use one light source for the whole page, with a constant offset ratio (vertical = 2× horizontal).
- As elevation rises, increase offset and blur and *decrease* opacity.
- Layer several low-opacity shadows to get realistic falloff. Don't animate layered shadows, because it is costly.
- Tint shadows with the background hue rather than using black at partial opacity, which greys out the background.
- Store shadows as tokens with a `--shadow-color` variable that each surface can override. Use `filter: drop-shadow()` for irregular shapes.

```css
:root { --shadow-color: 220deg 60% 50%; }
.elevated { box-shadow:
  1px 2px 2px hsl(var(--shadow-color) / .2),
  2px 4px 4px hsl(var(--shadow-color) / .2),
  4px 8px 8px hsl(var(--shadow-color) / .2),
  8px 16px 16px hsl(var(--shadow-color) / .2); }
```

### Inferences
- **Named aesthetics and when each fits.** This is practitioner synthesis. No single source was verified this session for the list.

| Style | Signature | Fits | Avoid when |
|---|---|---|---|
| Swiss / International | strict grid, flush-left sans (e.g. Neue Haas, Söhne), big numerals, asymmetric whitespace, few colours | agencies, architecture, finance, docs, portfolios | you need warmth or playfulness |
| Editorial / magazine | serif display, multi-column grids, pull quotes, drop caps, captions, real photography | media, long-form, luxury, culture, brand storytelling | dense app UI |
| Brutalism | raw HTML feel, system or mono fonts, visible borders, no polish | art, music, counter-culture, dev tools | trust-critical commerce |
| Neo-brutalism | flat saturated fills, thick black 2–4px borders, hard offset shadows (`4px 4px 0 #000`) | indie SaaS, creator tools, Gen-Z brands | already a trend cliché (Gumroad era); needs a real concept |
| Bento | modular varied-size tiles (Apple keynote style) | feature overviews, dashboards, personal sites | every section; uniform bento is just slop with extra steps |
| Glassmorphism | `backdrop-filter: blur()`, translucency, over vivid backgrounds | sparing overlays and nav on media | text-heavy surfaces; contrast and performance risk on mobile |
| Claymorphism / neumorphism | soft inflated 3D or extruded soft shadows | playful kids or wellness apps, illustration | controls (neumorphism has notoriously poor contrast and affordance) |
| Y2K / retro-futurism | chrome, gradients, pixel and bitmap type, early-web motifs | fashion, music, events, nostalgia campaigns | B2B trust |
| Minimalism | few elements, generous space, one accent | premium products, portfolios | content-heavy sites that need wayfinding |
| Maximalism / anti-design | clashing type, collage, layered motion | culture, fashion, festivals, art | accessibility-critical flows |
| Dark luxury | near-black, warm off-white type, gold or one accent, fine serif, slow fades | hospitality, watches, automotive, fashion | low-light readability or long-form copy |
| Kinetic typography | type as hero: variable-font axes animated, scroll-linked | launches, agencies, events | must honour reduced motion and not hide LCP text |
| Organic | blobs, hand-drawn lines, natural textures, earthy palette | food, wellness, sustainability | "meaningless 3D blobs" with no concept are a slop tell |

- Choose an aesthetic from the **concept**, the one-sentence idea of what the brand is like, not from a trend list. Then apply it consistently to type, grid, colour, motion and copy. A strong concept is the main antidote to slop (synthesis of the cited sources).
- Refactoring UI (Wathan/Schoger) heuristics, background knowledge not re-fetched this session:
  - Start with too much whitespace and remove some.
  - Build hierarchy with weight and colour, not only size.
  - Use fewer borders: separate with spacing and background shifts.
  - Define spacing and type scales up front.
  - Use greys that are tinted, not pure.
  - Offset shadows vertically.
  - Labels are a last resort.

### Gaps
- No primary, non-vendor academic or industry source quantifies how common the slop pattern is. Evidence is anecdotal or from vendor blogs.
- Refactoring UI, Brad Frost (atomic design), Ahmad Shadeed, Vitaly Friedman, Adam Argyle and Jen Simmons pages were not fetched this session because of the tool budget. Their positions above come from background knowledge and should be verified before being quoted.

---

## Q2. Design systems & tokens: OKLCH colour, semantic tokens, themes, fluid type, spacing, elevation, grids, W3C Design Tokens format

### Takeaway
Build tokens in three tiers: primitives (OKLCH ramps), semantic (role-named, theme-aware via `light-dark()`), and component. Use fluid type and space scales generated with `clamp()` (Utopia's method). Store tokens in the DTCG format (`$value` / `$type`, `.tokens.json`) so design tools and code stay in sync. Tailwind v4 now expresses the theme as native CSS variables in OKLCH.

### Cited Findings
- **DTCG Design Tokens Format.** The latest published version is **2025.10** (designtokens.org/TR/2025.10/format/). A newer Draft Community Group Report dated 8 Sept 2026 exists, which says not to implement it yet. — [designtokens.org draft](https://www.designtokens.org/tr/drafts/format/)
  - An object with `$value` is a token. `$type` is optional and inherited from the parent group. `$description` is optional.
  - Aliases are written `"{group.token}"` or as JSON Pointer `"$ref": "#/group/token"`.
  - Types: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `strokeStyle`, plus composites `border`, `transition`, `shadow`, `gradient`, `typography`.
  - File extension `.tokens` or `.tokens.json`. Media type `application/design-tokens+json`.
  - Colour values are objects with a colour space and components:
```json
{ "brand-blue": { "$type": "color", "$description": "Primary brand color",
    "$value": { "colorSpace": "srgb", "components": [0, 0.4, 0.8] } },
  "button-background": { "$value": "{brand-blue}" } }
```
- **Tailwind v4: CSS-first tokens.**
  - `@import "tailwindcss";` plus an `@theme { --color-avocado-500: oklch(0.84 0.18 117.33); --font-display: "Satoshi"; --ease-fluid: cubic-bezier(0.3,0,0,1); }` block.
  - Every token is emitted as a real `:root` custom property.
  - The default palette moved to **OKLCH**. Spacing derives from one variable, `--spacing: 0.25rem`.
  - Output is wrapped in native `@layer theme, base, components, utilities`. Opacity modifiers use `color-mix(in oklab, …)`.
  - Container queries are built in (`@container`, `@sm:`, `@max-md:`). Gradients can interpolate in OKLCH (`bg-linear-to-r/oklch`).
  - Full builds are 3.78× faster (378ms to 100ms on the Catalyst benchmark).
  - — [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)
- **Utopia fluid type.** Define one type scale for a small viewport (example: 1.2 ratio at 320px) and one for a large viewport (1.333 at 1500px), and let the browser interpolate between them. An H2 is then always "step 4" without breakpoint overrides. — [utopia.fyi: Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/). The site's calculator default URL encodes `360,18,1.2,1240,20,1.25` (360px/18px/1.2 to 1240px/20px/1.25). That reading comes from the URL, not from the article text.
- **Container query units** `cqw/cqh/cqi/cqb/cqmin/cqmax` are 1% of the query container. With no eligible container they fall back to small-viewport (`sv*`) units. — [MDN: CSS length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- **Shadow and elevation scale:** see Josh Comeau above (constant light source, layered shadows, hue-tinted, tokenised `--shadow-color`). — [joshwcomeau.com](https://www.joshwcomeau.com/css/designing-shadows/)
- `light-dark()` now accepts `<image>` values (gradients, `url()`): Chrome 150, Firefox 150 and Safari 27 in Sept 2026. — [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026). The relative-colour `alpha()` function shipped in Firefox 155 and Safari 27 (Chrome 152). — same source.
- `contrast-color()` and container **style** queries are on web.dev's Baseline 2026 list. — [web.dev/baseline/2026](https://web.dev/baseline/2026)

### Inferences
Practical token skeleton (synthesis; values are a sensible starting point, not from one source):
```css
@layer reset, tokens, base, layout, components, utilities;

@layer tokens {
  :root {
    color-scheme: light dark;              /* enables light-dark() + native UI theming */
    /* primitives: OKLCH ramp, hue held constant, L stepped evenly */
    --brand-h: 32;                          /* terracotta-ish; pick from concept */
    --brand-50:  oklch(97% 0.02 var(--brand-h));
    --brand-500: oklch(62% 0.16 var(--brand-h));
    --brand-700: oklch(45% 0.13 var(--brand-h));
    --neutral-0:  oklch(99% 0.005 80);      /* tinted, not pure white */
    --neutral-950:oklch(16% 0.01 80);
    /* semantic */
    --surface:  light-dark(var(--neutral-0), var(--neutral-950));
    --text:     light-dark(var(--neutral-950), oklch(94% 0.01 80));
    --action:   light-dark(var(--brand-700), var(--brand-500));
    --action-hover: oklch(from var(--action) calc(l - 0.06) c h);  /* relative colour syntax */
    --focus-ring: var(--action);
    /* fluid type (Utopia-style; rem + vw keeps zoom working) */
    --step-0: clamp(1.125rem, 1.08rem + 0.23vw, 1.25rem);
    --step-1: clamp(1.35rem, 1.27rem + 0.4vw, 1.56rem);
    --step-5: clamp(2.8rem, 2.2rem + 3vw, 4.8rem);
    /* fluid space */
    --space-s: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
    --space-l: clamp(2rem, 1.8rem + 1vw, 3rem);
    --space-section: clamp(4rem, 3rem + 5vw, 9rem);
    /* radii & motion */
    --radius-s: 4px; --radius-m: 10px; --radius-pill: 999px;
    --ease-out: cubic-bezier(.2,.8,.2,1); --dur-fast: 150ms; --dur-base: 240ms;
  }
  :root[data-theme="light"] { color-scheme: light; }
  :root[data-theme="dark"]  { color-scheme: dark; }
}
```
- Keep a `rem` component in each fluid `clamp()` so user zoom and font-size settings still scale the text. A pure-`vw` middle term can fail WCAG 1.4.4 resize. This is long-established guidance; the Utopia article fetched did not state it.
- Grid: use a 12-column `grid-template-columns: repeat(12, minmax(0,1fr))` or named areas for macro layout, and `subgrid` so card internals (title, body, CTA) align across rows. The "breakout" pattern `[full-start] minmax(var(--gutter),1fr) [content-start] min(65ch,100%) [content-end] minmax(var(--gutter),1fr) [full-end]` suits editorial pages.
- Spacing scale: use either a 4/8px base (Tailwind `--spacing: .25rem`) or a Utopia fluid t-shirt scale. Use a few radii deliberately: tight for inputs, medium for cards, pill for tags. Uniform 16px everywhere is a slop tell (Q1).
- Brad Frost's atomic design (atoms, molecules, organisms, templates, pages) remains the common mental model for component tiers. Background knowledge, not fetched.

### Gaps
- The Utopia article does not show generated clamp() output. The values above are illustrative and should be regenerated at utopia.fyi/type/calculator.
- Did not confirm whether DTCG 2025.10 is formally labelled "stable" or "first edition". The page refers to it only as the "latest published version".
- Open Props (Adam Argyle) and Radix Colors were not fetched.

---

## Q3. 2026 browser-support facts for modern CSS

### Takeaway
By late 2026 nearly everything listed is usable in production. Anchor positioning became Baseline in January 2026 (Firefox 147), `@scope` and container style queries are Baseline 2026, and `light-dark()` already works and gained image support in Sept 2026. Container size queries, `:has()`, subgrid, OKLCH, nesting and `text-wrap: balance` have been Baseline since 2023–24. `text-wrap: pretty` should still be treated as progressive enhancement.

### Cited Findings
- **Anchor positioning:** "Firefox 147 includes support for CSS Anchor Positioning, making this feature Baseline Newly available" (January 2026). — [web.dev: New to the web platform in January 2026](https://web.dev/blog/web-platform-01-2026). Conflict: the English page's browser table reportedly lists Safari as unsupported, while localised versions list Safari 26/26.2. A secondary source says Safari shipped in 26 and Firefox 147 released 13 Jan 2026. — [refontelearning (secondary)](https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline). `anchor-scope` is in Baseline 2026, per an MDN social post seen in search results ([MDN on Bluesky](https://bsky.app/profile/developer.mozilla.org/post/3mequtu74nx2x)).
- **Baseline 2026 list (web.dev):**
  - HTML and CSS: `field-sizing`, container style queries, `:open`, `contrast-color()`, custom highlights, **`@scope`**, `text-indent: hanging/each-line`, `shape()`, active view transition, `rcap/rch/rex/ric` units, `text-decoration-skip-ink: all`.
  - APIs: Navigation API, Trusted Types, Zstandard compression, Reporting API, WebTransport, and others.
  - — [web.dev/baseline/2026](https://web.dev/baseline/2026)
- **Sept 2026 releases:** Chrome 153/154, Firefox 155–157, Safari 27.
  - New: `light-dark()` with `<image>` values, `alpha()`, `progress()`, `revert-rule`, scroll anchoring (`overflow-anchor`) in Safari 27, and `sizes="auto"` for lazy images in Safari 27 (Chrome 126 and Firefox already had it).
  - — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026)
- **Relative colour syntax** is described as fully cross-browser in 2026 / "Baseline Newly Available as of May 2026" by secondary sources only: [una.im modern CSS theming](https://una.im/modern-css-theming), [ghassenlarnaout.com](https://ghassenlarnaout.com/blog/css-baseline-2026-features/). It does not appear on web.dev's Baseline-2026 page, which may mean it became Baseline earlier (2024–25). Unresolved.
- **Speculation Rules:** Chromium only for full support (Chrome/Edge 109+; eagerness from 121). Firefox has it in Technology Preview and Safari behind a flag. — [Chrome for Developers: Prerender pages](https://developer.chrome.com/docs/web-platform/prerender-pages)
- **Viewport units** `svh/lvh/dvh` are standard. Plain `vh` equals `lvh`. — [MDN: length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- **Tailwind v4** relies on `@layer`, `@property` and `color-mix()`. The v4 blog says `@starting-style` support "wasn't yet broad" at launch (Jan 2025). — [tailwindcss.com v4](https://tailwindcss.com/blog/tailwindcss-v4)

### Inferences
Support summary for the report. Rows marked (bg) are background knowledge with Baseline dates as remembered; not re-verified this session.

| Feature | Status Nov 2026 | Use |
|---|---|---|
| Container size queries + units | Baseline since Feb 2023 (bg) | Yes, primary component-responsive tool |
| Container style queries | Baseline 2026 (cited) | Yes, with fallback for older devices |
| `:has()` | Baseline since Dec 2023 (bg) | Yes |
| Subgrid | Baseline since Sept 2023 (bg) | Yes |
| OKLCH / `oklch()` | Baseline 2023 (bg) | Yes; author tokens in OKLCH |
| Relative colour syntax | Cross-browser by 2026 (secondary sources) | Yes, with static fallback for older Safari |
| `light-dark()` | Baseline 2024 (bg); `<image>` support Sept 2026 (cited) | Yes; requires `color-scheme` |
| CSS nesting | Baseline Dec 2023 (bg) | Yes |
| `@scope` | Baseline 2026 (cited) | Yes, newly available; consider widely-available lag |
| Anchor positioning | Baseline Newly available Jan 2026 (cited) | Yes for tooltips/menus; keep a positioned fallback |
| `text-wrap: balance` | Baseline 2024 (bg) | Yes on headings |
| `text-wrap: pretty` | Chromium + Safari; Firefox status unverified | Progressive enhancement only |
| Speculation Rules | Chromium only (cited) | Yes, harmless elsewhere |

- "Baseline Newly available" means every core browser supports the feature. "Widely available" comes about 30 months later. For broad public audiences on older iOS devices, newly available features need `@supports` fallbacks.

### Gaps
- caniuse.com was not fetched because the JS-heavy site was outside the tool budget, so exact versions for `:has()`, subgrid, nesting and `text-wrap` were not re-verified.
- The Interop 2026 focus-area list was not found in a primary source (only aggregators saying 20 areas, 15 new and 5 carried over). Check wpt.fyi/interop-2026 or the WebKit blog.
- CSS `if()`, scroll-driven animation support in Safari and Firefox, cross-document view transitions in Firefox, and customisable `<select>` (`appearance: base-select`) all fell in the truncated part of the Sept 2026 web.dev post, so they are unconfirmed.

---

## Q4. Responsive & mobile: breakpoints, container queries, viewport units, safe areas, touch targets, images, navigation, PWA

### Takeaway
Go content-first and intrinsic: fluid type and space, `auto-fit/minmax` grids, and container queries for components. Media queries are only for macro layout and capability (`hover`, `pointer`, `prefers-*`). Size full-height mobile sections with `svh` (or `dvh` when an exact fit matters), pad for safe areas, and make touch targets 44–48px even though WCAG AA only requires 24px.

### Cited Findings
- **WCAG 2.2 SC 2.5.8 Target Size (Minimum), Level AA:** pointer targets must be at least **24×24 CSS px**.
  - Undersized targets pass if a 24px-diameter circle centred on each target does not intersect another target or another undersized target's circle.
  - Exceptions: Spacing, Equivalent, Inline (in sentences), User-agent control, and Essential.
  - The Understanding doc says important controls should consider the stricter **2.5.5 Target Size (Enhanced)**.
  - — [W3C Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- **Viewport units:** `sv*` is the smallest viewport (browser UI shown) and is stable. `lv*` is the largest (UI hidden) and is stable. `dv*` tracks UI expanding and retracting and is not stable. Plain `vh` equals `lvh`, which is why `100vh` heroes get cut off under the mobile URL bar. MDN calls `sv*` "safer in general". `dv*` can make content resize during scroll and cause a performance hit. — [MDN: length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- **Container queries in Tailwind v4:** `@container` on the parent, then `@sm:grid-cols-3`, `@max-md:grid-cols-1`, and ranges such as `@min-md:@max-xl:hidden`. — [tailwindcss.com v4](https://tailwindcss.com/blog/tailwindcss-v4)
- **`sizes="auto"`** for `loading="lazy"` images now works in Safari 27, Chrome 126+ and Firefox. — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026)
- **Don't disable pinch zoom.** No `maximum-scale=1` or `user-scalable=no`. This is a High priority in the Front-End Checklist, as is using relative units. — [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- A Web App Manifest is a Medium-priority checklist item. — [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- Rauno: Fitts's law, edge and corner targets, and keeping content visible under the finger (loupe, enlarged keys, drag that persists outside small sliders). These apply directly to mobile touch UI. — [rauno.me](https://rauno.me/craft/interaction-design)

### Inferences
Mobile and responsive starter (long-established practice; not each line re-verified):
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f7f3ee" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#14110f" media="(prefers-color-scheme: dark)">
```
```css
.hero { min-block-size: 100svh; }                 /* not 100vh */
.sheet { max-block-size: 100dvh; }                /* exact fit for overlays */
.app-bar { padding-inline: max(1rem, env(safe-area-inset-left)) max(1rem, env(safe-area-inset-right));
           padding-block-end: max(.75rem, env(safe-area-inset-bottom)); }
.btn, .nav a { min-block-size: 44px; min-inline-size: 44px; }  /* 24px = AA floor; 44–48 = comfort */
.cards { display:grid; gap:var(--space-s); grid-template-columns: repeat(auto-fit, minmax(min(18rem,100%),1fr)); }
.card-wrap { container-type: inline-size; }
@container (inline-size > 32rem) { .card { grid-template-columns: 2fr 3fr; } }
@media (hover: hover) and (pointer: fine) { .card:hover { translate: 0 -2px; } }  /* no sticky hover on touch */
@media (prefers-reduced-motion: reduce) { *, ::before, ::after { animation-duration:.01ms !important; transition-duration:.01ms !important; scroll-behavior:auto !important; } }
.form:has(:user-invalid) .submit { opacity:.6; }   /* :has() for parent/state styling */
```
- Breakpoints: set them where the *content* breaks (e.g. 40rem, 64rem, 80rem in `em/rem`), not at device widths. Container queries handle most component-level changes.
- Responsive images: AVIF, then WebP, then JPEG via `<picture>`, with `srcset` widths 400/800/1200/1600/2400 and a realistic `sizes`. Always set `width` and `height` (or `aspect-ratio`) to avoid CLS. The LCP image gets `fetchpriority="high"` and no lazy loading. Everything below the fold gets `loading="lazy" decoding="async"`. Use `<picture>` with `media` for art direction, e.g. a tight crop on mobile.
- Thumb zone: put primary actions in the bottom third on mobile (bottom tab bar of at most 5 items, or a bottom sheet). Hamburger menus hide navigation, so on content sites keep 3–5 key links visible or use a priority+ pattern. A full-screen menu should use `<dialog>` or popover with a focus trap and Esc to close.
- PWA basics: a manifest (name, icons 192/512 plus maskable, `display: standalone`, `theme_color`), HTTPS, an optional service worker for offline and caching. On iOS, web push works only for home-screen-installed PWAs. That last point is background knowledge, unverified.

### Gaps
- NN/g thumb-zone and mobile navigation research pages, and Ahmad Shadeed's container-query and `:has()` articles, were not fetched this session.
- The 44px (Apple HIG) and 48dp (Material) target recommendations are background knowledge. The fetched W3C page did not state 2.5.5's 44px value.

---

## Q5. Performance: Core Web Vitals 2026, animation, fonts, images, JS budgets, Speculation Rules, bfcache

### Takeaway
The targets remain **LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1** at the 75th percentile, measured on mobile and desktop separately. INP replaced FID in 2024. Craft sites usually fail on a lazy-loaded or JS-revealed hero image (LCP), a heavy animation or JS bundle (INP), and late fonts or unsized media (CLS). Speculation Rules and bfcache give near-instant navigations almost for free.

### Cited Findings
- **Core Web Vitals "good" thresholds:** LCP ≤ 2.5s, **INP ≤ 200ms**, CLS ≤ 0.1, assessed at the 75th percentile of page loads, segmented mobile and desktop. INP became a stable Core Web Vital in 2024, replacing FID. The page was last updated 31 Oct 2024. — [web.dev: Web Vitals](https://web.dev/articles/vitals)
- The Front-End Checklist sets these performance rules:
  - Critical: optimise LCP.
  - High: CLS < 0.1, INP < 200ms, page weight < **1500KB**, use a CDN plus HTTP/2 or HTTP/3, optimise web-font loading, load scripts with `defer`/`async`/`type=module`, remove unused CSS.
  - — [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- **Animation performance:** animate `transform` and `opacity` only. Target 60fps. CSS and WAAPI run off the main thread where possible, while rAF-based JS animation can stutter under load. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations). Layered box-shadows are expensive and should not be animated. — [Josh Comeau](https://www.joshwcomeau.com/css/designing-shadows/)
- **Speculation Rules API** (Chromium):
```html
<script type="speculationrules">
{ "prerender": [{ "where": { "and": [ { "href_matches": "/*" },
      { "not": { "selector_matches": ".no-speculate" } } ] },
    "eagerness": "moderate" }] }
</script>
```
  - Eagerness levels:
    - `immediate`: the default for list rules.
    - `eager`: fires very early; its timing changed in Chrome 143.
    - `moderate`: fires after about 200ms of hover, on pointerdown, or on mobile viewport heuristics.
    - `conservative`: fires on pointer or touch down; the default for document rules.
  - Limits: 50 prefetches and 10 prerenders for `immediate`, about 2 FIFO for the other levels.
  - Speculation is disabled under Save-Data, energy saver and memory pressure.
  - `<link rel="prerender">` is deprecated.
  - Can also be delivered with a `Speculation-Rules` HTTP header.
  - — [Chrome for Developers](https://developer.chrome.com/docs/web-platform/prerender-pages)
- **bfcache:** — [web.dev: bfcache](https://web.dev/articles/bfcache)
  - Never use `unload`; use `pagehide`. Add `beforeunload` only while there are unsaved changes.
  - Avoid `Cache-Control: no-store` on the HTML except for sensitive pages; use `no-cache` or `max-age=0` instead.
  - Close WebSockets, IndexedDB connections and in-flight fetches in `pagehide`, and reopen them in `pageshow`, checking `event.persisted`.
  - Use `rel="noopener"`.
  - Test with DevTools → Application → Back-forward Cache → Run Test, and with Lighthouse's bfcache audit. Measure in the field with the `NotRestoredReasons` API.
- `sizes="auto"` with lazy-loading is now cross-browser. Zstandard compression is Baseline 2026. — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026); [web.dev Baseline 2026](https://web.dev/baseline/2026)

### Inferences
Practical performance rules for creative sites (established practice, not each re-verified):
- **LCP:**
  - The hero image or heading must be in the server HTML. Don't fade in the LCP element from `opacity:0` with JS.
  - Use `<link rel="preload" as="image" fetchpriority="high">` or `fetchpriority="high"` on the `<img>`.
  - Serve AVIF from an image CDN (Cloudinary, imgix, Vercel/Netlify image, Cloudflare Images) with `f_auto,q_auto` and width variants.
- **Fonts:**
  - Self-host WOFF2 variable fonts and subset them (Latin).
  - Preload only the one or two critical faces. Use `font-display: swap` (or `optional` for body).
  - Match fallback metrics with `size-adjust`/`ascent-override` (or Fontaine / Next `next/font` / Astro Fonts) to stop CLS.
  - Keep it to two families and about four files maximum.
- **JS budget:**
  - Aim for under ~150–200KB of compressed JS on content and marketing pages.
  - Ship zero JS by default with islands (Astro).
  - Lazy-load WebGL/Three.js/Lottie on interaction or on visibility, and give a static poster fallback.
  - Break long tasks with `scheduler.yield()` or `await` to protect INP.
- **Animation:**
  - Prefer CSS and WAAPI, scroll-driven animations (`animation-timeline: view()`) and View Transitions over JS scroll listeners.
  - Use `will-change` sparingly and only during the animation.
  - Pause offscreen canvases with IntersectionObserver and honour `prefers-reduced-motion`.
- **CLS:**
  - Give media `width`/`height`/`aspect-ratio`, and reserve space for embeds and ads.
  - Don't inject banners above content after load.
- **Video:** use `preload="none"` or `metadata` with a poster. Autoplay muted only, ship short AV1/H.264 loops, and offer a pause control (WCAG 2.2.2 for motion over 5s).

### Gaps
- Exact "needs improvement" and "poor" ranges were only in images on web.dev. They are believed to be LCP 2.5–4s / >4s, INP 200–500ms / >500ms, CLS 0.1–0.25 / >0.25 (unverified this session).
- No authoritative 2026 JS-budget number was found. The 150–200KB figure is a commonly cited heuristic (Alex Russell's performance-inequality posts), not fetched.
- I found no evidence of changes to Core Web Vitals thresholds in 2025–2026. The web.dev page (updated Oct 2024) still lists the same values.

---

## Q6. Accessibility: WCAG 2.2 AA essentials, APCA and WCAG 3 status, testing tools

### Takeaway
WCAG **2.2 AA** is the target to build and test against in 2026, and legal obligations still reference WCAG 2.x. WCAG 3 is a Working Draft (March 2026) and not expected before about 2028–2030. APCA is **not** in the current WCAG 3 draft: it was pulled in 2023 and the contrast algorithm is "yet to be determined". Meet WCAG 2 contrast ratios, optionally check with APCA as well, and document any deviation.

### Cited Findings
- **WCAG 3 status:** a Working Draft was published 3 March 2026 for review. — [W3C WAI news: WCAG 3 Working Draft March 2026](https://www.w3.org/WAI/news/2026-03-03/wcag3)
- **APCA:** the April 2026 WCAG 3 Editor's Draft lists the contrast test as "Exploratory": "The contrast algorithm used in WCAG 3 is yet to be determined." APCA was marked for removal in early 2023 and pulled from the July 2023 draft. WCAG 3 is "probably years away, perhaps 2030 at the earliest." Advice: meet WCAG 2 contrast; if you use APCA and fail WCAG 2, document the decision. An APCA developer (Inclusive Reading Technologies) says in the comments that APCA is draft guidance, should not be called "WCAG 3", and points to BridgePCA, which passes WCAG 2 while adding APCA guidance. — [Adrian Roselli: WCAG3 Contrast as of April 2026](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html). Secondary blogs that still describe APCA as "in WCAG 3" are outdated.
- **Target size AA:** 24×24px with a spacing exception (see Q4). — [W3C 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- **Front-End Checklist accessibility rules** (95 in total):
  - Critical: label form controls, keyboard navigation works, never put `aria-hidden` on `<body>`, buttons have accessible names, no seizure-inducing flashing.
  - High: visible focus indicators, don't disable zoom.
  - — [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- **Reduced motion:** use `prefers-reduced-motion: reduce` to swap movement for a fade rather than removing all feedback. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- AI-generated sites typically lack ARIA labels, keyboard navigation, validation and error states. This makes accessibility QA mandatory for generated components. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)

### Inferences
WCAG 2.2 AA essentials checklist (standard requirements; criterion numbers are from background knowledge):
- Contrast (1.4.3 / 1.4.11): 4.5:1 for body text, 3:1 for large text (≥24px, or ≥18.66px bold), 3:1 for UI component boundaries, focus indicators and meaningful graphics. Check every theme (light, dark, over images and glass).
- Focus (2.4.7, 2.4.11 Focus Not Obscured): `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }`. Never `outline: none` without a replacement. Sticky headers must not cover focused elements: set `scroll-padding-top` to the header height.
- Keyboard (2.1.1): everything is reachable and operable, with no traps and a logical order. Add a skip link. Use native `<button>`, `<a href>`, `<dialog>`, `popover` and `<details>` before ARIA widgets.
- Landmarks and semantics: one `<h1>`, a sequential heading outline, `<header> <nav aria-label> <main> <footer>`, `lang` on `<html>`, alt text (empty `alt=""` for decorative images), and labelled form fields with errors tied to inputs via `aria-describedby`.
- 2.2 additions: 2.5.7 Dragging Movements (provide a non-drag alternative), 2.5.8 Target Size, 3.3.7 Redundant Entry, 3.3.8 Accessible Authentication (no cognitive puzzles; allow paste and password managers), 3.2.6 Consistent Help.
- Motion: honour `prefers-reduced-motion`. Auto-playing motion longer than 5s needs pause, stop or hide (2.2.2). No more than 3 flashes per second (2.3.1). Parallax and scroll-jacking need a reduced-motion path.
- Reflow (1.4.10): no horizontal scroll at 320 CSS px wide (400% zoom). Text spacing overrides (1.4.12) must not break the layout.
- Testing stack:
  - Automated: axe DevTools or `@axe-core/playwright` in CI, Lighthouse accessibility audit, WAVE for visual overlays. Automated tools catch roughly 30–40% of issues (a commonly cited estimate, not verified).
  - Manual: keyboard-only pass, screen readers (VoiceOver on iOS/macOS, NVDA on Windows, TalkBack on Android), 200%/400% zoom, forced colours (Windows High Contrast), and checking with reduced motion enabled.
  - Checklists: The A11y Project checklist (a11yproject.com/checklist) and WebAIM WCAG 2 checklist.

### Gaps
- The A11y Project checklist, WebAIM, axe, WAVE and Lighthouse pages were not fetched this session.
- European Accessibility Act enforcement (from 28 June 2025, EN 301 549 → WCAG 2.1 AA) and the US DOJ ADA Title II rule (WCAG 2.1 AA, with 2026–2027 deadlines) are relevant legal context but were not verified this session.

---

## Q7. Recommended 2026 tech stacks & CSS approaches for creative sites, and a concept-to-launch process

### Takeaway
For content-led creative and marketing sites, **Astro** (7.x as of Oct 2026) is the default recommendation. It ships zero JS by default with islands for interactive or animated components and works with any UI framework. Choose Next.js, SvelteKit or Nuxt when the site is really an app. Choose Vite + vanilla for one-off experimental or WebGL pieces. Choose Webflow or Framer when non-developers own the content or design iteration. For CSS, use Tailwind v4 (CSS-first tokens, OKLCH, layers, container queries) or vanilla CSS with `@layer`, nesting and custom properties. CSS Modules remain a fine scoped option in React stacks.

### Cited Findings
- **Astro:** version **7.0** released 22 June 2026 (Vite 8, a new Rust compiler, advanced routing, background dev server, structured logging). The latest is **7.4** (15 Oct 2026). 7.3 added helpers for Cloudflare custom worker entrypoints. An Evil Martians migration case study was published 8 Sept 2026. — [astro.build/blog](https://astro.build/blog/)
- **Tailwind v4:** single-line `@import "tailwindcss"`, `@theme` tokens become CSS variables, automatic content detection (`@source` for extras), a first-party Vite plugin `@tailwindcss/vite`, OKLCH palette, native cascade layers, built-in container queries, 3D transforms, `starting:` variant for `@starting-style`, `not-*` variant, and `bg-gradient-*` renamed to `bg-linear-*`. Builds are 3.78× faster in full and up to 182× faster incrementally. — [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4)
- **Front-End Checklist:** 386 rules in 11 categories (HTML 25, CSS 32, JS 26, Performance 44, Accessibility 95, SEO 94, Security 22, Images 25, Testing 13, Privacy 5, i18n 5), each prioritised Critical/High/Medium/Low. It has a web version at frontendchecklist.io (/rules and /checklists) and a hosted MCP server, and is actively maintained (789 commits). — [github.com/thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- **Reference-driven design loop** for AI-assisted builds: collect 3–5 references, articulate why they work, feed that to the builder, ask for several directions, and fix one dimension at a time (e.g. only the typography). — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)

### Inferences
**Stack choice matrix** (synthesis; versions other than Astro and Tailwind not verified this session):

| Need | Pick | Why |
|---|---|---|
| Marketing, portfolio or editorial site with rich animation | Astro + islands (React/Svelte/vanilla) + GSAP/Motion/Three.js only where needed | Zero-JS default protects LCP/INP; MDX content collections; View Transitions |
| App-like product site, auth, dashboards | Next.js (App Router) or SvelteKit or Nuxt | Server rendering + data + routing; SvelteKit has the smallest runtime |
| One-off WebGL or experimental piece | Vite + vanilla TS (+ Three.js/OGL) | No framework tax; full control |
| Marketers own pages and need visual building | Webflow (CMS, interactions) or Framer (fast, motion-first, React components) | Lower dev cost; watch template-driven sameness and JS weight |
| CSS | Tailwind v4 (tokens in `@theme`) or vanilla CSS with `@layer` + nesting + custom props + container queries; CSS Modules for scoped React | All produce native CSS variables, so the DTCG to CSS pipeline (Style Dictionary / Terrazzo) works with any of them |

**Process: concept to launch**
1. **Brief and concept:** audience, the one job of the site, 3 brand adjectives, and a one-sentence concept ("a field notebook", "a 1970s ski lodge"). Write the real copy early, because copy drives layout.
2. **Moodboard:** 3–5 references plus written reasons why each works, covering type, colour, grid, imagery, motion and texture. Pick one named aesthetic from Q1 that fits the concept. Collect real photography or commission illustration.
3. **Wireframe (mobile and desktop together):** content hierarchy per page, thumb-zone placement of primary actions, a navigation pattern, and where the single "signature moment" happens (one hero interaction, not ten).
4. **Design system:** DTCG tokens (OKLCH primitives → semantic → component), Utopia fluid type and space, 2–3 radii, a shadow and elevation scale with one light source, motion tokens (150/240/400ms, ease-out), grid (12-col plus breakout), and light and dark themes via `color-scheme` + `light-dark()`. Components follow atomic tiers.
5. **Build:** semantic HTML first, CSS layers, container-queried components, progressive enhancement (`@supports` for anchor positioning, `@scope` and style queries), islands for interactivity, image CDN, self-hosted subset fonts, and Speculation Rules plus a bfcache-safe setup.
6. **Polish ("invisible details"):** interruptible animations under 300ms, no animation on high-frequency actions, hover only with `(hover:hover)`, `:focus-visible` rings, `text-wrap: balance` on headings and `pretty` on paragraphs, `font-variant-numeric: tabular-nums` for figures, optical sizing, hue-tinted shadows, custom `::selection`, scrollbar colour per theme, consistent empty, error and loading states, OG images and a favicon set.
7. **QA and launch checklist:**
   - CWV in the field: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 on mobile.
   - Lighthouse plus WebPageTest on a mid-range Android over 4G.
   - axe in CI with zero criticals. A keyboard-only pass. VoiceOver and NVDA smoke tests. 400% zoom reflow. Reduced-motion pass. Contrast in every theme.
   - Real-device tests on iOS Safari and Android Chrome for safe areas, `svh`, target sizes and the virtual keyboard.
   - Content checks: meta and OG tags, `lang`, `sitemap.xml`, `robots.txt`, canonical URLs, 404 page, analytics with consent.
   - Security headers: CSP, HSTS. Run the Front-End Checklist's Critical and High rules.
   - bfcache test in DevTools, and confirm no `unload` handlers.

### Gaps
- Current major versions and 2026 features of Next.js, SvelteKit, Nuxt, Webflow and Framer were not verified this session. The report should check their release blogs before stating versions.
- Astro's blog listing did not mention islands, server islands, the Fonts API or a Cloudflare acquisition. Any claim about those (e.g. ownership changes) needs separate verification.
- The A11y Project checklist and web.dev "Learn" launch guidance were not fetched. Only the Front-End Checklist was confirmed.
