# Tech Stacks and CSS Approaches

Which framework and CSS approach to pick for a creative, animated website in late 2026, and why. Only the Astro and Tailwind v4 facts were verified from their official blogs in the research. Versions and 2026 features of Next.js, SvelteKit, Nuxt, Webflow and Framer were **not verified**; check their release blogs before stating versions. The stack matrix itself is **(synthesis)**.

## Contents

1. [Recommendation in one paragraph](#1-recommendation-in-one-paragraph)
2. [Stack choice matrix](#2-stack-choice-matrix)
3. [Astro (verified facts)](#3-astro-verified-facts)
4. [Other frameworks and builders](#4-other-frameworks-and-builders)
5. [CSS approaches](#5-css-approaches)
6. [Tailwind v4](#tailwind-v4)
7. [Vanilla CSS with layers and nesting](#7-vanilla-css-with-layers-and-nesting)
8. [CSS Modules](#8-css-modules)
9. [Token pipeline](#9-token-pipeline)
10. [Libraries that sit on top](#10-libraries-that-sit-on-top)
11. [Gaps](#11-gaps)
12. [Sources](#sources)

---

## 1. Recommendation in one paragraph

For content-led creative and marketing sites, **Astro** (7.x as of Oct 2026) is the default recommendation. It ships **zero JS by default** with **islands** for interactive or animated components and works with any UI framework. Choose **Next.js, SvelteKit or Nuxt** when the site is really an app. Choose **Vite + vanilla** for one-off experimental or WebGL pieces. Choose **Webflow or Framer** when non-developers own the content or design iteration. For CSS, use **Tailwind v4** (CSS-first tokens, OKLCH, layers, container queries) or **vanilla CSS with `@layer`, nesting and custom properties**. **CSS Modules** remain a fine scoped option in React stacks.

---

## 2. Stack choice matrix

(synthesis; versions other than Astro and Tailwind not verified)

| Need | Pick | Why |
|---|---|---|
| Marketing, portfolio or editorial site with rich animation | **Astro + islands** (React/Svelte/vanilla) + GSAP/Motion/Three.js only where needed | Zero-JS default protects LCP/INP; MDX content collections; View Transitions |
| App-like product site, auth, dashboards | **Next.js (App Router)** or **SvelteKit** or **Nuxt** | Server rendering + data + routing; SvelteKit has the smallest runtime |
| One-off WebGL or experimental piece | **Vite + vanilla TS** (+ Three.js/OGL) | No framework tax; full control |
| Marketers own pages and need visual building | **Webflow** (CMS, interactions) or **Framer** (fast, motion-first, React components) | Lower dev cost; watch template-driven sameness and JS weight |
| CSS | **Tailwind v4** (tokens in `@theme`) or **vanilla CSS** with `@layer` + nesting + custom props + container queries; **CSS Modules** for scoped React | All produce native CSS variables, so the DTCG → CSS pipeline (Style Dictionary / Terrazzo) works with any of them |

Editor's note: how to decide quickly.
- Is most of the site content that changes rarely, with a few interactive moments? Astro.
- Does it need login, per-user data or dashboards? Next.js, SvelteKit or Nuxt (match the team's framework).
- Is it a single immersive piece? Vite + vanilla.
- Will non-developers edit layout weekly? Webflow or Framer, and budget time to break the template look.

---

## 3. Astro (verified facts)

Source: [astro.build/blog](https://astro.build/blog/).
- **Astro 7.0** released **22 June 2026**: Vite 8, a new Rust compiler, advanced routing, background dev server, structured logging.
- Latest is **7.4** (**15 Oct 2026**).
- **7.3** added helpers for **Cloudflare custom worker entrypoints**.
- An **Evil Martians migration case study** was published **8 Sept 2026**.
- The blog listing did **not** mention islands, server islands, the Fonts API or a Cloudflare acquisition. Any claim about those (e.g. ownership changes) needs separate verification. Islands and zero-JS-by-default are established Astro architecture (synthesis), and "Astro Fonts" is mentioned as a fallback-metric option in [performance.md](performance.md#fonts).

---

## 4. Other frameworks and builders

All **unverified** for 2026 versions and features:
- **Next.js (App Router):** server rendering, data and routing for app-like sites; `next/font` for font fallback metric matching (see [performance.md](performance.md#fonts)).
- **SvelteKit:** smallest runtime of the app frameworks.
- **Nuxt:** the Vue equivalent.
- **Webflow:** CMS and interactions for marketer-owned pages.
- **Framer:** fast, motion-first, React components.
- Builders risk **template-driven sameness and JS weight**.

---

## 5. CSS approaches

| Approach | Strengths | Notes |
|---|---|---|
| Tailwind v4 | CSS-first tokens in `@theme`, OKLCH palette, native cascade layers, built-in container queries | Relies on `@layer`, `@property`, `color-mix()` |
| Vanilla CSS | `@layer`, nesting, custom properties, container queries; no build dependency | Nesting Baseline Dec 2023 (bg) |
| CSS Modules | Scoped class names in React stacks | Still produces native CSS variables for tokens |

---

## Tailwind v4

Source: [tailwindcss.com/blog/tailwindcss-v4](https://tailwindcss.com/blog/tailwindcss-v4).
- Single-line **`@import "tailwindcss"`**.
- **`@theme` tokens become CSS variables** (every token is a real `:root` custom property).
- **Automatic content detection** (`@source` for extras).
- First-party Vite plugin **`@tailwindcss/vite`**.
- **OKLCH** default palette; spacing derives from `--spacing: 0.25rem`.
- **Native cascade layers**: output wrapped in `@layer theme, base, components, utilities`.
- Opacity modifiers use `color-mix(in oklab, …)`; gradients can interpolate in OKLCH (`bg-linear-to-r/oklch`).
- **Built-in container queries**: `@container`, `@sm:`, `@max-md:`, ranges like `@min-md:@max-xl:hidden`.
- **3D transforms**; **`starting:` variant** for `@starting-style`; **`not-*` variant**.
- **`bg-gradient-*` renamed to `bg-linear-*`.**
- Builds **3.78× faster** in full (378ms to 100ms on the Catalyst benchmark) and **up to 182× faster** incrementally.
- `@starting-style` support "wasn't yet broad" at launch (Jan 2025).

```css
@import "tailwindcss";
@theme {
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --font-display: "Satoshi";
  --ease-fluid: cubic-bezier(0.3,0,0,1);
}
```

Editor's note: Tailwind's old `bg-indigo-500` default is the traced origin of the purple-gradient "AI slop" look (see [00-start-here](../00-start-here.md#what-generic-ai-slop-design-looks-like)). Always replace the default palette with concept-derived tokens.

---

## 7. Vanilla CSS with layers and nesting

Layer order from the token skeleton (synthesis):

```css
@layer reset, tokens, base, layout, components, utilities;
```

- Tokens live in `@layer tokens` on `:root` (full skeleton in [design-tokens-color-type.md](design-tokens-color-type.md#10-full-token-skeleton-css)).
- Use `@scope` (Baseline 2026) for component scoping where available, with `@supports` fallbacks (see [browser-support-2026.md](browser-support-2026.md)).
- Container-queried components (see [layout-responsive-mobile.md](layout-responsive-mobile.md#4-container-queries)).

Editor's note: a nested component in a layer, illustrative and untested:

```css
@layer components {
  .card {
    container-type: inline-size;
    background: var(--surface);
    border-radius: var(--radius-m);
    & .title { font-size: var(--step-1); text-wrap: balance; }
    &:hover { translate: 0 -2px; }
  }
}
```

---

## 8. CSS Modules

- A fine scoped option in React stacks. Consume global tokens via custom properties from a shared tokens layer.

---

## 9. Token pipeline

- DTCG `.tokens.json` (see [design-tokens-color-type.md](design-tokens-color-type.md#11-w3c-design-tokens-format-dtcg-202510)) → **Style Dictionary** or **Terrazzo** → CSS custom properties consumed by any of the three CSS approaches.

---

## 10. Libraries that sit on top

Editor's note: summaries from the other research notes, for orientation only. Details and verification markers live in the linked files.
- **Component primitives:** headless, accessibility-first libraries (Radix, React Aria, Ark UI, Headless UI, Base UI, `cmdk`). Note 02 reports Base UI v1 stable and the default primitive layer in shadcn/ui since July 2026. See [components/component-libraries.md](../components/component-libraries.md).
- **Animation:** native CSS + WAAPI + View Transitions by default; Motion for layout/exit/springs/gestures in component apps; GSAP (now 100% free including plugins) for complex timelines; Lenis for smooth scroll. See [animations/libraries.md](../animations/libraries.md).
- **Icons:** tree-shakable component libraries (Lucide, Tabler, Phosphor) or Iconify via unplugin-icons. See [assets/icons.md](../assets/icons.md).

---

## 11. Gaps

- Current major versions and 2026 features of Next.js, SvelteKit, Nuxt, Webflow and Framer were not verified.
- Astro's blog listing did not mention islands, server islands, the Fonts API or a Cloudflare acquisition; verify any such claim.

## Sources

- [astro.build/blog](https://astro.build/blog/)
- [tailwindcss.com: Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- Research note: `research_notes/UI components animations and assets/10_craft_responsive_performance_a11y.md` (Q7, Q3); cross-references from notes 01, 02, 06, 08
