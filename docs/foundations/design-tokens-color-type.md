# Design Tokens, Colour and Type

How to turn a concept into a design-token system: OKLCH colour ramps, semantic and theme-aware tokens, light/dark theming, fluid type and space, radii, shadows and elevation, motion tokens, the W3C Design Tokens (DTCG) file format, and Tailwind v4's CSS-first `@theme`. Facts are as of 5 Nov 2026. Cited facts carry inline links. Items marked **(synthesis)** are practitioner guidance the research did not verify against one source, and **(bg, unverified)** means background knowledge not re-checked. Snippets are untested unless the text says otherwise.

## Contents

1. [Token architecture](#1-token-architecture)
2. [Colour: OKLCH primitives and palette strategy](#2-colour-oklch-primitives-and-palette-strategy)
3. [Semantic tokens and naming](#3-semantic-tokens-and-naming)
4. [Light and dark themes](#4-light-and-dark-themes)
5. [Typography: typeface choice and type scales](#5-typography-typeface-choice-and-type-scales)
6. [Fluid type and space with clamp() and Utopia](#6-fluid-type-and-space-with-clamp-and-utopia)
7. [Spacing, radii and container units](#7-spacing-radii-and-container-units)
8. [Shadows and elevation](#8-shadows-and-elevation)
9. [Motion tokens](#9-motion-tokens)
10. [Full token skeleton (CSS)](#10-full-token-skeleton-css)
11. [W3C Design Tokens format (DTCG 2025.10)](#11-w3c-design-tokens-format-dtcg-202510)
12. [Tailwind v4 `@theme`](#12-tailwind-v4-theme)
13. [Grid tokens and component tiers](#13-grid-tokens-and-component-tiers)
14. [Gaps](#14-gaps)
15. [Sources](#sources)

---

## 1. Token architecture

Build tokens in **three tiers**:

| Tier | What it holds | Example |
|---|---|---|
| Primitives | Raw values: OKLCH colour ramps, raw sizes | `--brand-500: oklch(62% 0.16 var(--brand-h))` |
| Semantic | Role-named, theme-aware (via `light-dark()`) | `--surface`, `--text`, `--action`, `--focus-ring` |
| Component | Values scoped to one component, aliasing semantic tokens | e.g. a button background aliasing `--action` |

- Use fluid type and space scales generated with `clamp()` (Utopia's method). See [section 6](#6-fluid-type-and-space-with-clamp-and-utopia).
- Store tokens in the DTCG format (`$value` / `$type`, `.tokens.json`) so design tools and code stay in sync. See [section 11](#11-w3c-design-tokens-format-dtcg-202510).
- Tailwind v4 now expresses the theme as native CSS variables in OKLCH. See [section 12](#12-tailwind-v4-theme).
- Define spacing and type scales **up front** (Refactoring UI heuristic, bg, unverified).

---

## 2. Colour: OKLCH primitives and palette strategy

### Building ramps in OKLCH (synthesis)
- Author primitives in OKLCH. Hold the **hue constant** across a ramp and **step lightness (L) evenly**.
- Use tinted neutrals rather than pure white or black. Example: `--neutral-0: oklch(99% 0.005 80)` ("tinted, not pure white") and `--neutral-950: oklch(16% 0.01 80)`.
- Refactoring UI (bg, unverified): use greys that are tinted, not pure.
- `oklch()` support: Baseline 2023 (bg, unverified). Tailwind v4's default palette moved to OKLCH ([Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4)).

```css
--brand-h: 32;                          /* terracotta-ish; pick from concept */
--brand-50:  oklch(97% 0.02 var(--brand-h));
--brand-500: oklch(62% 0.16 var(--brand-h));
--brand-700: oklch(45% 0.13 var(--brand-h));
--neutral-0:  oklch(99% 0.005 80);      /* tinted, not pure white */
--neutral-950:oklch(16% 0.01 80);
```

Editor's note: the skeleton's example hue (32, "terracotta-ish") with warm neutrals (hue 80) is exactly the "warm cream + terracotta" combination flagged as the new anti-slop cliché (see [00-start-here](../00-start-here.md#the-new-cliche-trap)). Treat the number as a placeholder and derive the hue from your concept.

### Palette strategy (cited)
- Choose a **dominant colour with sharp accents** rather than "an evenly spread, timid palette". — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Draw from cultural references (e.g. a 1970s ski lodge: burnt orange, avocado, warm browns) or IDE themes. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Avoid the purple/indigo-gradient-on-white default, traced to Tailwind's old `bg-indigo-500` (Adam Wathan apologised for it). Purple can still be right for a brand that owns purple. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Backgrounds: avoid flat solids. Layer gradients, geometric patterns or contextual textures that fit the concept. One guide allows at most one restrained gradient and never on body headings. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); search-results summary ([capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/))

### Relative colour, `alpha()`, `color-mix()`, `contrast-color()`
- **Relative colour syntax** derives states from a base token: `--action-hover: oklch(from var(--action) calc(l - 0.06) c h);` (synthesis snippet). Support: described as fully cross-browser in 2026 / "Baseline Newly Available as of May 2026" by **secondary sources only** ([una.im](https://una.im/modern-css-theming), [ghassenlarnaout.com](https://ghassenlarnaout.com/blog/css-baseline-2026-features/)). It is not on web.dev's Baseline 2026 page, which may mean it became Baseline earlier (2024–25). Unresolved. Use with a static fallback for older Safari.
- **`alpha()`** (relative-colour alpha function) shipped in Firefox 155 and Safari 27 (Chrome 152). — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026)
- **`contrast-color()`** is on web.dev's Baseline 2026 list. — [web.dev/baseline/2026](https://web.dev/baseline/2026)
- Tailwind v4 opacity modifiers use `color-mix(in oklab, …)`, and gradients can interpolate in OKLCH (`bg-linear-to-r/oklch`). — [Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4)

Editor's note: for the colour tools themselves (oklch.com, oklch.fyi, Adobe Leonardo, Radix Colors, uicolors.app, ColorBox, Huemint, Realtime Colors, WebAIM, apcacontrast.com, gradient and texture generators), see [assets/design-tools.md](../assets/design-tools.md). Check contrast for every theme: see [accessibility.md](accessibility.md#contrast).

---

## 3. Semantic tokens and naming

- Name tokens **semantically** (`--color-action-primary`, `--color-feedback-success`), not decoratively (`--color-gradient-start`). — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Semantic layer from the skeleton (synthesis):

```css
--surface:  light-dark(var(--neutral-0), var(--neutral-950));
--text:     light-dark(var(--neutral-950), oklch(94% 0.01 80));
--action:   light-dark(var(--brand-700), var(--brand-500));
--action-hover: oklch(from var(--action) calc(l - 0.06) c h);  /* relative colour syntax */
--focus-ring: var(--action);
```

- Build hierarchy with **weight and colour**, not only size; use fewer borders and separate with spacing and background shifts (Refactoring UI, bg, unverified).

---

## 4. Light and dark themes

- `color-scheme: light dark` on `:root` enables `light-dark()` and native UI theming (form controls, scrollbars). `light-dark()` **requires** `color-scheme`.
- `light-dark()` support: Baseline 2024 (bg, unverified). Since **Sept 2026** it also accepts `<image>` values (gradients, `url()`): Chrome 150, Firefox 150 and Safari 27. — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026)
- Force a theme with a data attribute (synthesis):

```css
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }
```

- Match browser chrome per theme with `theme-color` metas (see [layout-responsive-mobile.md](layout-responsive-mobile.md#mobile-starter-snippet)).
- Polish items per theme (synthesis): hue-tinted shadows, custom `::selection`, scrollbar colour per theme.

Editor's note: for the theme switcher UI itself (blocking inline head script to avoid a flash of the wrong theme, system/light/dark options, View Transitions circular reveal), see [components/signature-experiential.md](../components/signature-experiential.md).

---

## 5. Typography: typeface choice and type scales

### Choosing typefaces (cited)
Avoid Inter, Roboto, Open Sans, Lato and system fonts as the **brand** voice. Candidates by register — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website):

| Register | Candidates |
|---|---|
| Editorial | Playfair Display, Crimson Pro, Fraunces, Newsreader |
| Startup | Clash Display, Satoshi, Cabinet Grotesk |
| Technical | IBM Plex, Source Sans 3, JetBrains Mono, Fira Code |
| Warm or modern | Bricolage Grotesque, Obviously |

- Pair contrasting styles: display + mono, serif + geometric sans.
- Use **extreme weight contrast** (100/200 vs 800/900) and **big size jumps (3x+)**.
- "Pick one distinctive font and use it decisively."
- Even with anti-slop prompts (e.g. Anthropic's "frontend aesthetics" cookbook prompt), models re-converge on second-tier defaults such as **Space Grotesk**, so ask explicitly for *unexpected* choices. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)

Editor's note: note 08 adds that Inter, Roboto, Open Sans, Montserrat, Poppins and Lato are the most-used Google Fonts (popularity ranks 2–9), and that 2024–25 "escape" picks (Instrument Serif, Bricolage Grotesque, Geist, Space Grotesk) are now top-100 on Google Fonts. Licences, sources and less-saturated options are in [assets/fonts.md](../assets/fonts.md). Font loading is in [performance.md](performance.md#fonts).

### Typographic polish (synthesis)
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs (pretty is progressive enhancement only; see [browser-support-2026.md](browser-support-2026.md)).
- `font-variant-numeric: tabular-nums` for figures.
- Optical sizing.
- Tailwind v4 font token example: `--font-display: "Satoshi";` ([Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4)).

---

## 6. Fluid type and space with clamp() and Utopia

- **Utopia method** (cited): define one type scale for a small viewport (example: **1.2 ratio at 320px**) and one for a large viewport (**1.333 at 1500px**), and let the browser interpolate between them. An H2 is then always "step 4" without breakpoint overrides. — [utopia.fyi: Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/)
- The calculator's default URL encodes `360,18,1.2,1240,20,1.25` (360px / 18px / 1.2 to 1240px / 20px / 1.25). This reading comes from the URL, not the article text.
- Keep a **`rem` component** in each fluid `clamp()` so user zoom and font-size settings still scale the text. A pure-`vw` middle term can fail **WCAG 1.4.4 Resize**. Long-established guidance; the Utopia article did not state it.

Illustrative fluid tokens (synthesis; **regenerate real values** at [utopia.fyi/type/calculator](https://utopia.fyi/type/calculator)):

```css
/* fluid type (Utopia-style; rem + vw keeps zoom working) */
--step-0: clamp(1.125rem, 1.08rem + 0.23vw, 1.25rem);
--step-1: clamp(1.35rem, 1.27rem + 0.4vw, 1.56rem);
--step-5: clamp(2.8rem, 2.2rem + 3vw, 4.8rem);
/* fluid space */
--space-s: clamp(1rem, 0.95rem + 0.25vw, 1.25rem);
--space-l: clamp(2rem, 1.8rem + 1vw, 3rem);
--space-section: clamp(4rem, 3rem + 5vw, 9rem);
```

---

## 7. Spacing, radii and container units

- **Spacing scale** (synthesis): either a 4/8px base (Tailwind v4 derives all spacing from one variable, `--spacing: 0.25rem`, [cited](https://tailwindcss.com/blog/tailwindcss-v4)) or a Utopia fluid t-shirt scale.
- Start with too much whitespace and remove some (Refactoring UI, bg, unverified).
- **Radii** (synthesis): a few, used deliberately: tight for inputs, medium for cards, pill for tags. Skeleton: `--radius-s: 4px; --radius-m: 10px; --radius-pill: 999px;`. Process step guidance: 2–3 radii.
- **Uniform sizing is a slop tell**: the same border radius (16px), padding (24px) and card height on every element. — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide). Vary radius, padding and card sizes *deliberately* to build hierarchy, and codify those rules in the design system. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- **Container query units** `cqw / cqh / cqi / cqb / cqmin / cqmax` are 1% of the query container. With no eligible container they fall back to small-viewport (`sv*`) units. — [MDN: CSS length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- Newer font-relative units `rcap / rch / rex / ric` are on the Baseline 2026 list. — [web.dev/baseline/2026](https://web.dev/baseline/2026)

---

## 8. Shadows and elevation

Josh W. Comeau, *Designing Shadows* — [joshwcomeau.com/css/designing-shadows](https://www.joshwcomeau.com/css/designing-shadows/):
- Use **one light source** for the whole page, with a constant offset ratio (**vertical = 2× horizontal**).
- As elevation rises, **increase offset and blur and decrease opacity**.
- **Layer** several low-opacity shadows to get realistic falloff. Don't animate layered shadows; it is costly.
- **Tint shadows with the background hue** rather than black at partial opacity, which greys out the background.
- Store shadows as tokens with a `--shadow-color` variable that each surface can override. Use `filter: drop-shadow()` for irregular shapes.

```css
:root { --shadow-color: 220deg 60% 50%; }
.elevated { box-shadow:
  1px 2px 2px hsl(var(--shadow-color) / .2),
  2px 4px 4px hsl(var(--shadow-color) / .2),
  4px 8px 8px hsl(var(--shadow-color) / .2),
  8px 16px 16px hsl(var(--shadow-color) / .2); }
```

- Refactoring UI (bg, unverified): offset shadows vertically.
- Aesthetic-specific shadows: neo-brutalism uses hard offset shadows (`4px 4px 0 #000`) with thick black 2–4px borders (synthesis; see [00-start-here](../00-start-here.md#named-aesthetics)).

---

## 9. Motion tokens

- Skeleton (synthesis): `--ease-out: cubic-bezier(.2,.8,.2,1); --dur-fast: 150ms; --dur-base: 240ms;`. The process step lists motion tokens of **150 / 240 / 400ms with ease-out**.
- Tailwind v4 example easing token: `--ease-fluid: cubic-bezier(0.3,0,0,1);` ([Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4)).
- Keep most UI animations **under 300ms**; use ease-out for snappy feedback and `ease` for a deliberate feel. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- DTCG has native `duration` and `cubicBezier` types and a composite `transition` type ([section 11](#11-w3c-design-tokens-format-dtcg-202510)).

Editor's note: the full motion-token set (3–4 cubic-beziers, 2–3 `linear()` springs, 4–5 durations, stagger with `--i`) is in [animations/motion-principles-easing.md](../animations/motion-principles-easing.md).

---

## 10. Full token skeleton (CSS)

Practical token skeleton (synthesis; values are a sensible starting point, not from one source; untested):

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

---

## 11. W3C Design Tokens format (DTCG 2025.10)

Source: [designtokens.org draft](https://www.designtokens.org/tr/drafts/format/).

- **Version:** the latest published version is **2025.10** (designtokens.org/TR/2025.10/format/). A newer Draft Community Group Report dated **8 Sept 2026** exists and says **not to implement it yet**. Whether 2025.10 is formally labelled "stable" or "first edition" was not confirmed; the page calls it the "latest published version".
- **Token definition:** an object with `$value` is a token. `$type` is optional and **inherited from the parent group**. `$description` is optional.
- **Aliases:** `"{group.token}"` or JSON Pointer `"$ref": "#/group/token"`.
- **Types:** `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `strokeStyle`, plus composites `border`, `transition`, `shadow`, `gradient`, `typography`.
- **Files:** extension `.tokens` or `.tokens.json`. Media type `application/design-tokens+json`.
- **Colour values** are objects with a colour space and components:

```json
{ "brand-blue": { "$type": "color", "$description": "Primary brand color",
    "$value": { "colorSpace": "srgb", "components": [0, 0.4, 0.8] } },
  "button-background": { "$value": "{brand-blue}" } }
```

Editor's note: the following illustrates the three tiers using only the rules listed above (group-level `$type` inheritance and curly-brace aliases; the colour components are placeholder numbers). It is not copied from the spec and has not been validated against a DTCG parser. Check in the spec exactly where the `$ref` JSON Pointer form goes, and the value formats for non-colour types, before use.

```json
{
  "primitive": {
    "$type": "color",
    "brand-700": { "$value": { "colorSpace": "srgb", "components": [0.55, 0.2, 0.1] } }
  },
  "semantic": {
    "$type": "color",
    "action": { "$value": "{primitive.brand-700}" }
  },
  "component": {
    "$type": "color",
    "button-bg": { "$value": "{semantic.action}" }
  }
}
```

- **Pipeline:** Tailwind v4, vanilla CSS and CSS Modules all produce native CSS variables, so the DTCG → CSS pipeline (**Style Dictionary / Terrazzo**) works with any of them (synthesis; see [tech-stacks.md](tech-stacks.md)).

---

## 12. Tailwind v4 `@theme`

Source: [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4).

```css
@import "tailwindcss";
@theme {
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --font-display: "Satoshi";
  --ease-fluid: cubic-bezier(0.3,0,0,1);
}
```

- Every token is emitted as a real `:root` custom property.
- Default palette moved to **OKLCH**. Spacing derives from one variable, `--spacing: 0.25rem`.
- Output is wrapped in native `@layer theme, base, components, utilities`. Opacity modifiers use `color-mix(in oklab, …)`.
- Container queries built in (`@container`, `@sm:`, `@max-md:`, ranges like `@min-md:@max-xl:hidden`). Gradients can interpolate in OKLCH (`bg-linear-to-r/oklch`).
- Full builds 3.78× faster (378ms to 100ms on the Catalyst benchmark); up to 182× faster incrementally.
- Relies on `@layer`, `@property` and `color-mix()`.
- More v4 features (Vite plugin, `starting:` variant, `not-*`, `bg-linear-*` rename) are in [tech-stacks.md](tech-stacks.md#tailwind-v4).

---

## 13. Grid tokens and component tiers

- Grid (synthesis): a 12-column `grid-template-columns: repeat(12, minmax(0,1fr))` or named areas for macro layout; `subgrid` for aligned card internals; the "breakout" pattern for editorial pages. Full detail in [layout-responsive-mobile.md](layout-responsive-mobile.md#grids).
- Brad Frost's **atomic design** (atoms, molecules, organisms, templates, pages) remains the common mental model for component tiers (bg, not fetched).

---

## 14. Gaps

- The Utopia article does not show generated `clamp()` output. Values above are illustrative; regenerate at utopia.fyi/type/calculator.
- DTCG 2025.10's formal label ("stable" / "first edition") not confirmed.
- Open Props (Adam Argyle) and Radix Colors were not fetched.
- Relative colour syntax Baseline date is unresolved (secondary sources only).
- Refactoring UI and Brad Frost positions are background knowledge; verify before quoting.

## Sources

- [designtokens.org: Design Tokens Format (draft)](https://www.designtokens.org/tr/drafts/format/)
- [tailwindcss.com: Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [utopia.fyi: Designing with fluid type scales](https://utopia.fyi/blog/designing-with-fluid-type-scales/)
- [MDN: CSS length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- [Josh W. Comeau: Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026)
- [web.dev: Baseline 2026](https://web.dev/baseline/2026)
- [prg.sh: Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [925 Studios: AI Slop Web Design guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [capitalandcompute.net: Fix AI slop tell by tell](https://capitalandcompute.net/blog/fix-ai-slop-design/)
- [Emil Kowalski: Great animations](https://emilkowal.ski/ui/great-animations)
- [una.im: Modern CSS theming](https://una.im/modern-css-theming) (secondary)
- [ghassenlarnaout.com: CSS Baseline 2026 features](https://ghassenlarnaout.com/blog/css-baseline-2026-features/) (secondary)
- Research note: `research_notes/UI components animations and assets/10_craft_responsive_performance_a11y.md` (Q1, Q2, Q3)
