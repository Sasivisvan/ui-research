# Icons: Vector and UI Icon Sets, Aggregators, Brand Logos and Implementation

This page lists the vector and UI icon sets, icon aggregators and brand-logo sources from the research notes (research date 5 Nov 2026). For each one it gives the licence as checked on official pages, official GitHub LICENSE files or the [Iconify collections API](https://api.iconify.design/collections). That API records each set's licence SPDX, author and icon count. The second half explains how to ship icons efficiently on desktop and mobile. 3D and animated icons are on a separate page, [3d-and-animated-icons.md](3d-and-animated-icons.md). Every licence is summarised in [licensing-cheatsheet.md](licensing-cheatsheet.md).

**Legend:** *Commercial* means commercial use is allowed. *Attr* means attribution is legally required in the product, not just "appreciated". The counts are Iconify collection totals from the API pull (Nov 2026) and include every style or weight variant, unless the table says otherwise.

## Contents

- [Summary](#summary)
- [1. Vector and UI icon sets (licence-verified)](#1-vector-and-ui-icon-sets-licence-verified)
- [2. Other notable permissive sets](#2-other-notable-permissive-sets)
- [3. Attribution-required sets to be careful with](#3-attribution-required-sets-to-be-careful-with)
- [4. Aggregators and marketplaces](#4-aggregators-and-marketplaces)
- [5. Brand and logo icons](#5-brand-and-logo-icons)
- [6. Choosing a set: safety tiers and distinctiveness](#6-choosing-a-set-safety-tiers-and-distinctiveness)
- [7. Implementation](#7-implementation)
- [8. Gaps and unverified items](#8-gaps-and-unverified-items)
- [Sources](#sources)

## Summary

The safest high-quality choices are the permissively licensed open-source UI icon sets:

- **ISC:** Lucide.
- **MIT:** Phosphor, Tabler, Heroicons, Iconoir, Radix, Bootstrap, Hugeicons-free, Akar, Eva, css.gg, Ionicons and Fluent.
- **Apache-2.0:** Material Symbols and Carbon.
- **CC0, for brand logos:** Simple Icons.

**Attribution traps.** These sets are free but CC BY 4.0, so you must credit them: Font Awesome Free (icons), Solar, the Streamline free sets, Basil, IconaMoon and Lets Icons. The free tiers of Flaticon, Icons8 and Noun Project also require credit.

**Licence change.** In January 2026 Remix Icon moved to a custom "Remix Icon License v1.0". It forbids using its icons as logos.

## 1. Vector and UI icon sets (licence-verified)

| Set | What it offers | Count | Formats / packages | Licence | Attr | Free / paid | Style note | Status |
|---|---|---|---|---|---|---|---|---|
| [Lucide](https://lucide.dev) | Stroke-based fork of Feather on a 24px grid | ~2,020 in Iconify, plus Lucide Lab 373 | Packages for React, Vue, Svelte, Solid, Angular and others. Tree-shakable ("Only the icons you import are included in your final bundle"). Each icon renders as an optimized inline SVG ([lucide-react docs](https://lucide.dev/guide/packages/lucide-react)) | **ISC License**. The copyright and permission notice is required in copies. Some Feather-derived icons remain under **MIT** (© Cole Bemis), e.g. airplay, feather, x ([Lucide license](https://lucide.dev/license)) | No visible credit; keep the licence notice in copies | Free | Clean and friendly. It is the default icon set of shadcn/ui, so it is now very common and close to the "default AI app" look (inference) | Live; licence page verified |
| [Phosphor](https://phosphoricons.com) | 6 weights: Thin, Light, Regular, Bold, Fill, Duotone | **Count conflict:** the README says "1,248 icons and counting". Iconify lists 9,072 (v2.1.1), about 1,512 per weight × 6, so the README figure is probably stale | `@phosphor-icons/react` (tree-shaking), `@phosphor-icons/vue`, `@phosphor-icons/web` (webfont), Flutter, Elm, SwiftUI, Web Components, plus Figma/Sketch/Penpot plugins ([Phosphor GitHub](https://github.com/phosphor-icons/homepage)) | **MIT** | No | Free | Versatile. The duotone and thin weights feel more distinctive and editorial than Lucide | Live; repo verified |
| [Tabler Icons](https://tabler.io/icons) | 24×24 grid, 2px stroke, outline and filled | 6,257 (Iconify lists v3.50.0) | SVG, PNG, PDF, EPS, webfont, SVG sprite, Figma plugin. Packages: React (`@tabler/icons-react`), Vue, Svelte, SolidJS, Preact, Angular, Astro, React Native | **MIT**, "Free for personal and commercial use" | No | Free. Paid add-ons: Bundle **$9 one-time**, All Package **$69** ([Tabler Icons](https://tabler.io/icons)) | The largest coherent free stroke set. Neutral and good for dashboards | Live |
| [Heroicons](https://heroicons.com) (Tailwind Labs) | 24 outline, 24 solid, 20 solid (mini), 16 solid (micro) | 1,288 across all styles, v2.2.0, © Refactoring UI Inc. | `@heroicons/react`, `@heroicons/vue` ([Heroicons GitHub](https://github.com/tailwindlabs/heroicons)) | **MIT** | No | Free | Small set. Very common in the Tailwind ecosystem | Live |
| [Remix Icon](https://remixicon.com) | Outlined (`-line`) and Filled (`-fill`), 24×24 grid | 3,200+ | `remixicon` (webfont/CDN), `@remixicon/react`, `@remixicon/vue`, Figma plugin, RemixIcon-MCP ([RemixIcon GitHub](https://github.com/Remix-Design/RemixIcon)) | **Changed to "Remix Icon License v1.0" (January 2026).** Free for personal and commercial use; attribution optional. **Prohibits** standalone icon sales or packs, building competing icon libraries, and using icons "as a logo, trademark, brand identifier, or primary visual identity" even after light edits. Brand icons may only represent their brand ([Remix Icon License file](https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/License)). **Conflict:** [Iconify](https://api.iconify.design/collections) still lists **Apache 2.0** (v4.8.0), which reflects the older licence. v4.8 and earlier = Apache-2.0; newer releases = custom licence | Optional | Free | n/a in notes | Live; licence file verified |
| [Iconoir](https://iconoir.com) | 24×24 grid, 288 icons with solid variants | 1,383 icons, 1,671 SVGs in total (Iconify lists v7.12.1) | `iconoir`, `iconoir-react`, `iconoir-react-native`, `@iconoir/vue`, Flutter, Swift, CSS, a Framer integration, a Figma Community pack ([Iconoir GitHub](https://github.com/iconoir-icons/iconoir)) | **MIT** | No | Free | Light and slightly geometric. Less ubiquitous than Lucide | Live |
| Radix Icons | 15×15 grid | 332, author WorkOS, v1.3.2 | SVG / React | **MIT** | No | Free | Crisp and small. Too limited to be the primary set for most sites | Iconify API |
| [Feather](https://feathericons.com) | Original stroke set | 286, © Cole Bemis | SVG | **MIT** | No | Free | Effectively superseded by Lucide, its maintained fork | Iconify API |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | General UI | "over 2,078 icons", v1.13.2 | SVG, SVG sprite, web font | **MIT** ([Iconify](https://api.iconify.design/collections)) | No | Free | Utilitarian; reads as "Bootstrap" | Live |
| Material Symbols (Google) | Variable icon fonts in Outlined, Rounded and Sharp. Axes: opsz 20–48, wght 100–700, GRAD −50 to 200, FILL 0–100 | 15,761 SVGs in Iconify | Variable font from Google Fonts (`fonts.googleapis.com/css2?family=Material+Symbols+Outlined`), SVG | **Apache License 2.0**, "attribution is appreciated but not required" ([google/material-design-icons](https://github.com/google/material-design-icons)) | No | Free | Very recognisably Google/Android | Live |
| Material Icons (classic) | Legacy Google set | n/a | The Google-maintained npm package stopped at v3 (2016) | Apache 2.0 | No | Free | **"No longer updated"**; no new icons since 2022 | Legacy |
| Material Design Icons (mdi, Pictogrammers) | Community Material-style set | 7,447 | SVG / font | **Apache 2.0** | No | Free | Material look | Iconify API |
| [Font Awesome Free](https://fontawesome.com) v7 | Solid, regular, brands | Iconify 7.3.1: 2,000 solid, 272 regular, 608 brands | SVG, web font, JS | **Icons: CC BY 4.0. Fonts: SIL OFL 1.1** (reserved font name "Font Awesome"). **Code: MIT.** "MIT, SIL OFL, and CC BY all require attribution." The attribution comments embedded in the files satisfy this, so "do not actively work to remove them". Brand icons may only represent their brand ([Font Awesome LICENSE.txt](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/LICENSE.txt)) | **Yes** (keep the embedded comments) | Free. Pro is paid (pricing not verified) | Dated and generic for modern product UIs. Few icons in the free regular (outline) style | Live; LICENSE verified |
| [Hugeicons](https://hugeicons.com) | Free tier: Stroke Rounded only | Free 6,000+ (`hugeicons` in Iconify: 6,065). Pro 60,000+ in 10 styles | SVG, packages, CDN | Free set **MIT** ([Iconify](https://api.iconify.design/collections)). Pro is commercial | Free: no | **Pro $99/year** (1 seat, 300K pageviews, 2GB bandwidth). **Pro Plus $1,197 one-time** ([Hugeicons pricing](https://hugeicons.com/pricing)) | The Pro CDN is capped by pageviews and bandwidth | Live |
| [Streamline](https://home.streamlinehq.com/pricing) | Pro: 300,000+ icons in 55 sets, 30,000 illustrations in 11 sets, 12,500 elements. Limit of 100 icons or 50 illustrations per project | Free sets on Iconify: Streamline 3,000; Plump free 1,499; Ultimate free 1,999 | Integrations for Figma, Framer, VS Code and Webflow, plus an API and MCP | Free sets: **CC BY 4.0**. Pro: commercial | **Free sets: yes** | Full access from **$29/month**; Icons from $19/month; Illustrations from $19/month | Very high craft with many distinct aesthetics. A good way to avoid the generic look | Live |
| Central Icon System ([iconists.co/central](https://iconists.co/central)) | Variants combining round or square corners, filled or outline, radius and stroke, e.g. `round-filled-radius-3-stroke-2` | n/a | npm `@central-icons-react/*`; requires `CENTRAL_LICENSE_KEY` ([unpkg README](https://app.unpkg.com/@central-icons-react/square-filled-radius-0-stroke-1@1.0.1/files/README.md), [Raycast extension](https://www.raycast.com/tamino-martinius/central-icons)) | Commercial, **licence-key gated** | n/a | Paid (price not verified) | Premium option for distinctiveness | Live |
| Solar (480 Design) | 6 styles: Linear, Line Duotone, Bold, Bold Duotone, Broken, Outline ([Solar GitHub](https://github.com/480-Design/Solar-Icon-Set)) | 8,706 | SVG, third-party npm wrappers | **CC BY 4.0.** Third-party npm wrappers advertise MIT, GPL-3.0 or ISC, but this does **not** change the upstream CC BY 4.0 ([search summary](https://community-en.eagle.cool/resource/solar-icons)) | **Yes** | Free | Polished duotone look, popular on Dribbble | Live |
| Akar Icons | General UI | 454, v1.9.31 | SVG | **MIT** | No | Free | n/a | Iconify API |
| Eva Icons (Akveo) | General UI | 490, v1.1.3 | SVG | **MIT** | No | Free | n/a | Iconify API |
| css.gg | CSS/SVG icons | 704, v2.1.4 | CSS, SVG | **MIT** | No | Free | n/a | Iconify API |
| Ionicons (Ionic) | General UI | 1,357, v8.0.13 | SVG, web component | **MIT** | No | Free | n/a | Iconify API |
| Fluent UI System Icons (Microsoft) | Regular and filled, several sizes | 19,945, v1.1.345 | SVG, font | **MIT** | No | Free | Windows / Microsoft 365 look | Iconify API |
| Carbon (IBM) | Enterprise UI | 2,638, v11.91.0 | SVG | **Apache 2.0** | No | Free | Technical and enterprise. Pairs well with IBM Plex | Iconify API |
| [SF Symbols](https://developer.apple.com/sf-symbols/) (Apple) | "Over 7,000 symbols, in nine weights and three scales". SF Symbols 7 announced at WWDC25 | 7,000+ | Download requires macOS | **Not stated on the page; licence text not retrievable** | n/a | Free download | Apple look | **Treat as not safe for websites** until the licence is checked (see [Gaps](#8-gaps-and-unverified-items)) |

## 2. Other notable permissive sets

All from the [Iconify collections API](https://api.iconify.design/collections). Commercial use is allowed and attribution is not required unless noted.

| Set | Count | Licence | Note |
|---|---|---|---|
| MingCute | 4,526 | Apache 2.0 | |
| Myna UI | 2,620 | MIT | |
| Material Line Icons (`line-md`) | 1,218 | MIT | Animated with SMIL/CSS and needs no JS runtime. See [3d-and-animated-icons.md](3d-and-animated-icons.md) |
| Majesticons | 760 | MIT | |
| Pixelarticons | 1,036 | MIT | Pixel style |
| IconPark (ByteDance) | 2,658 | Apache 2.0 | |
| Octicons (GitHub) | 780 | MIT | |
| Famicons | 1,342 | MIT | |
| ProIcons | 544 | MIT | |
| System UIcons | 430 | Unlicense | |
| SVG Spinners | 46 | MIT | Loading spinners |
| Unicons (IconScout's open set) | 1,215 | Apache 2.0 | |

## 3. Attribution-required sets to be careful with

From the [Iconify collections API](https://api.iconify.design/collections). Each set requires credit, or has share-alike or file-level copyleft obligations.

| Set | Licence | Obligation |
|---|---|---|
| Basil | CC BY 4.0 | Attribution |
| IconaMoon | CC BY 4.0 | Attribution |
| Lets Icons | CC BY 4.0 | Attribution |
| Pepicons | CC BY 4.0 | Attribution |
| Codicons | CC BY 4.0 | Attribution |
| Game Icons | CC BY 3.0 | Attribution |
| **OpenMoji** | **CC BY-SA 4.0** | Attribution **plus share-alike** |
| Twemoji | CC BY 4.0 | Attribution |
| Circum | MPL-2.0 | File-level copyleft (MPL) |
| Solar, Streamline free sets, Font Awesome Free icons | CC BY 4.0 | Attribution (see the main table) |

Inference from the notes: for CC BY sets such as Solar, the Streamline free sets and Font Awesome icons, a credits page or an HTML/SVG comment probably satisfies the licence. Legal teams often prefer to avoid CC BY in white-label or client products.

## 4. Aggregators and marketplaces

On an aggregator, **the licence is per set or per asset, never for the aggregator as a whole.**

| Aggregator | What it offers | Size | Licence | Attr | Free / paid | Notes | Status |
|---|---|---|---|---|---|---|---|
| [Iconify](https://iconify.design) ([icon-sets.iconify.design](https://icon-sets.iconify.design), [icones.js.org](https://icones.js.org)) | Unified icon API, plus a licence field for each set | Live API: **276 icon sets, 473,655 icons** ([collections API](https://api.iconify.design/collections)) | Per set | Per set | Free | **The best single place to check a set's licence** | Live. Web component and API docs returned connection resets |
| [unplugin-icons](https://github.com/unplugin/unplugin-icons) | "Access thousands of icons as components on-demand universally". Builds icons from Iconify at compile time | README says about 150 sets and 200,000+ icons, which is stale compared with the API above | Vite, Webpack, Rollup, esbuild, Rspack, Nuxt, Vue CLI. Frameworks: Vue 3, React, Preact, Solid, Svelte, Astro, Qwik, Ember, web components | **MIT** (the tool). ESM-only, Node 20+ | n/a | Free | Only imported icons are bundled. Auto-import, custom SVG loaders, SSR/SSG with no flash of unstyled content | Live |
| [SVG Repo](https://svgrepo.com) | Large SVG collection | n/a | **Per icon** | Per icon | Free | **The licensing page returned HTTP 429, so this is unverified** | Licence page unreachable |
| [Icons8](https://icons8.com) | Many in-house styles, including 3D and "glass" | n/a | Free tier: personal or commercial use **requires a link to Icons8** in the finished work. Free downloads are limited in size and format. Paid plans remove the link requirement ([Icons8 help (via search)](https://intercom.help/icons8-7fb7577e8170/en/articles/5136841-are-your-icons-free-for-commercial-use), [Icons8 community](https://community.icons8.com/t/free-license-attribution-requirements/1708)) | **Free: yes (link)** | Freemium | The 3D and "glass" styles look stock. **Licence page returned 403** | Live; licence page blocked |
| Flaticon (Freepik) | Huge icon marketplace | n/a | Free use requires attribution. Premium removes it ([Flaticon pricing (via search)](https://www.flaticon.com/pricing/1312618)) | **Free: yes** | Freemium | **Legal page returned 403** | Live; legal page blocked |
| [The Noun Project](https://thenounproject.com/pricing/) | Contributor-made icons and photos | **10M** icons and photos | Free icons are **CC BY**, some public domain ([Noun Project blog (via search)](https://blog.thenounproject.com/?p=9584)). Paid plans give "Royalty-free commercial licenses that never expire" and "Unlimited attribution-free icon downloads". **Free accounts do not include royalty-free commercial licenses** | **Free: yes** | Noun Pro **$9.99/month** or **$3.33/month** billed yearly; Team **$6.67/month** for 2 seats; EDU **$1.67/month** | Uneven quality because it is contributor-made. Help page returned 403 | Live |
| [IconScout](https://iconscout.com/pricing) | Icons, illustrations, 3D, Lottie | **14.4M+ assets** | Licence varies per asset. For free assets "attribution is generally required"; Premium removes it ([IconScout free 3D page (via search)](https://iconscout.com/Free-3d-illustrations)) | **Free: generally yes** | Freemium | **Licence page returned 403.** Its open set, Unicons, is Apache 2.0 (1,215 icons) | Live; licence page blocked |

## 5. Brand and logo icons

**General rule:** the code or path licence (CC0 or MIT) never grants trademark rights. Font Awesome and Remix Icon both say brand icons may only represent the brand itself ([Font Awesome LICENSE](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/LICENSE.txt), [Remix Icon License](https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/License)).

| Source | What it offers | Count | Formats / delivery | Licence | Attr | Notes | Status |
|---|---|---|---|---|---|---|---|
| [Simple Icons](https://simpleicons.org) | "Over 3400 SVG icons for popular brands" | 3,467 in Iconify, v16.36.0 | npm `simple-icons`, Packagist, jsDelivr/unpkg, `cdn.simpleicons.org` (with colour options), font | **CC0-1.0** for SVG paths, **but you must read DISCLAIMER.md** because the trademarks belong to the brands ([Simple Icons GitHub](https://github.com/simple-icons/simple-icons)) | No | Removed icons return 404 on `@latest`, so pin versions | Live |
| [SVGL](https://svgl.app) | Colour logos with light and dark variants and wordmarks. Public API at svgl.app/api. Files limited to 21KB | n/a | SVG, API | **MIT** project. Contributors must confirm they have the right to use each logo. **No blanket trademark grant** ([SVGL GitHub](https://github.com/pheralb/svgl)) | No | Popular for "trusted by" strips | Live |
| [Devicon](https://devicon.dev/) | Programming-language and dev-tool icons | 1,104 in Iconify, plus 802 in Devicon Plain | Font or SVG | **MIT**, © 2015 Konpa. Product names and logos belong to their owners | No | | Live |
| SVG Logos (Gil Barbara) | Brand and tech logos | 2,064 | SVG | **CC0** ([Iconify](https://api.iconify.design/collections)) | No | Trademark caveat applies | Iconify API |

## 6. Choosing a set: safety tiers and distinctiveness

These are inferences from the notes.

| Tier | Sets |
|---|---|
| **Permissive, no credit** | Lucide, Tabler, Phosphor, Heroicons, Iconoir, Hugeicons-free, Bootstrap, Fluent, Material Symbols, Carbon, MingCute, Simple Icons |
| **Free, no credit, but a custom licence with restrictions** | Remix Icon v1.0 (no logo use, no competing libraries, no packs) |
| **Credit required** | Font Awesome Free icons, Solar, the Streamline free sets, Flaticon, Icons8, Noun Project free, IconScout free |
| **Avoid for websites until verified** | SF Symbols (licence not retrievable) |

**Distinctiveness.** Lucide and Heroicons are now the visual defaults of shadcn and Tailwind. The quickest ways to look less generic are:

- Phosphor at a non-regular weight (thin, duotone).
- Iconoir.
- A premium Streamline or Central set.
- A custom-tuned stroke width.

## 7. Implementation

### 7.1 Default approach

For most apps the default should be one of these:

- A **tree-shakable icon component library with named imports**, such as Lucide, Tabler or Phosphor.
- **Iconify through unplugin-icons**, which compiles only the icons you use into components and supports SSR with no flash of unstyled content.

Avoid `Icons[name]` namespace lookups and barrel re-exports, because both defeat tree-shaking. For icon-dense pages or very large static sets, use an **external SVG sprite with `<use href>`**. That keeps path data out of the JS bundle and lets the browser HTTP-cache it. **Avoid icon fonts**: web.dev recommends SVG instead.

### 7.2 Technique comparison

| Technique | When to use | Pros | Cons / gotchas | Source |
|---|---|---|---|---|
| Tree-shakable component library (named imports) | Default for most apps | Maintained and typed. Only imported icons are bundled. Lucide React has `size`, `color` and `strokeWidth` props and outputs inline SVG | Inline SVG components inflate the JS bundle and the DOM | [Tabler guide](https://tabler.io/guides/how-to-use-svg-icons-in-react), [lucide-react](https://lucide.dev/guide/packages/lucide-react) |
| unplugin-icons (`~icons/{collection}/{icon}`) | Mixing many Iconify sets | On-demand bundling. Auto-import for Vue/React/Solid. `?raw` SVG string export. Custom local SVG collections with HMR. SSR/SSG output avoids flash of unstyled content | Build-tool plugin required. ESM-only, Node 20+ | [unplugin-icons](https://github.com/unplugin/unplugin-icons) |
| Inline JSX | A few bespoke icons only | No dependency | Doesn't scale | [Tabler guide](https://tabler.io/guides/how-to-use-svg-icons-in-react) |
| SVGR | Custom icons exported from design files | Converts SVG files into components | Build step | [Tabler guide](https://tabler.io/guides/how-to-use-svg-icons-in-react) |
| SVG sprite with `<use>` | "Pages with thousands of icon instances". Also works alongside a component library on icon-dense screens | Keeps path data out of JS. Cacheable | String IDs "fail silently" on typos. Needs a build step. A "fat sprite" can slow first load, so split it | [Tabler guide](https://tabler.io/guides/how-to-use-svg-icons-in-react), [DEV: SVG icon management comparison](https://dev.to/simprl/a-comprehensive-comparison-of-svg-icon-management-options-in-react-js-projects-glc), [DEV: SVG sprites](https://dev.to/gouranga-das-khulna/use-svg-sprites-to-make-your-react-app-load-faster-319a) |
| Icon fonts | **Avoid.** The exception is Material Symbols (a variable icon font with FILL, wght, GRAD and opsz axes, best served from Google Fonts) | n/a | web.dev: "Replace them with SVGs where possible". A fallback icon font can render the wrong glyph and change the meaning | [web.dev font best practices](https://web.dev/articles/font-best-practices), [google/material-design-icons](https://github.com/google/material-design-icons) |
| CDN brand icons (`cdn.simpleicons.org`) | Logo strips | Colourised SVGs | `@latest` URLs can 404 when an icon is removed, so **pin versions** | [Simple Icons](https://github.com/simple-icons/simple-icons) |

**Benchmark caveat:** practitioners compare these approaches, but **no rigorous public benchmark was found**.

### 7.3 Performance rules

These come from [Tabler: How to use SVG icons in React](https://tabler.io/guides/how-to-use-svg-icons-in-react) and the practitioner posts above.

- Use named imports.
- **Avoid `Icons[iconName]` dynamic lookups.** They keep every icon in the bundle. Build an explicit map instead.
- Avoid barrel re-exports.
- Lazy-load rarely used icons.
- On icon-dense screens, consider a sprite alongside the component library.

### 7.4 Accessibility

- Decorative icons next to text get `aria-hidden="true"`.
- Icon-only buttons need `aria-label` on the **button**, and the SVG stays hidden ([Tabler guide](https://tabler.io/guides/how-to-use-svg-icons-in-react)).

### 7.5 Recommended icon stack

This stack is an inference in the notes.

1. Use one primary set with a consistent stroke width and grid, for example Lucide, Tabler or Phosphor, through its package or `unplugin-icons`.
2. Keep a typed icon map for data-driven icons:
   ```ts
   const icons = { search: SearchIcon, /* ... */ };
   ```
3. For lists or tables with hundreds of icons, render from a build-generated sprite. This avoids hydration and DOM cost on mobile:
   ```html
   <svg><use href="/sprite.svg#id"/></svg>
   ```
4. Gate animated icons behind `prefers-reduced-motion` and lazy-load the Lottie and Rive players. Those runtimes are heavy compared with SVG; their sizes were not verified. See [3d-and-animated-icons.md](3d-and-animated-icons.md).
5. Use `currentColor` so icons follow the theme and dark mode.

See [optimization.md](optimization.md) for desktop and mobile delivery across all asset types.

## 8. Gaps and unverified items

- **SF Symbols licence text** was not retrievable. Apple's page links to terms but does not state them. The widely reported restriction, that SF Symbols may only be used in mockups or apps for Apple platforms and not as web icons, could not be verified directly. Treat SF Symbols as **not safe for websites** until the licence is checked.
- These licensing pages were blocked, so the claims above come from secondary or search-surfaced official snippets:
  - SVG Repo (429)
  - Icons8 (403)
  - Flaticon (403)
  - IconScout (403)
  - Noun Project help (403)
- The prices of Central Icons and Font Awesome Pro were not found.
- No controlled benchmark was found comparing bundle size and runtime cost across inline components, sprites and icon fonts.
- Iconify's web component and API docs returned connection resets. Its on-demand CDN rendering trade-offs (runtime requests versus build-time bundling) are not sourced here.

## Sources

- Iconify collections API: https://api.iconify.design/collections
- Lucide license: https://lucide.dev/license · lucide-react docs: https://lucide.dev/guide/packages/lucide-react
- Phosphor GitHub: https://github.com/phosphor-icons/homepage
- Tabler Icons: https://tabler.io/icons · Tabler guide: https://tabler.io/guides/how-to-use-svg-icons-in-react
- Heroicons GitHub: https://github.com/tailwindlabs/heroicons
- RemixIcon GitHub: https://github.com/Remix-Design/RemixIcon · Remix Icon License: https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/License
- Iconoir GitHub: https://github.com/iconoir-icons/iconoir
- Bootstrap Icons: https://icons.getbootstrap.com/
- google/material-design-icons: https://github.com/google/material-design-icons
- Font Awesome LICENSE.txt: https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/LICENSE.txt
- Hugeicons pricing: https://hugeicons.com/pricing
- Streamline pricing: https://home.streamlinehq.com/pricing
- Central Icons: https://app.unpkg.com/@central-icons-react/square-filled-radius-0-stroke-1@1.0.1/files/README.md · https://www.raycast.com/tamino-martinius/central-icons
- Solar GitHub: https://github.com/480-Design/Solar-Icon-Set · Solar wrappers summary: https://community-en.eagle.cool/resource/solar-icons
- Apple SF Symbols: https://developer.apple.com/sf-symbols/
- unplugin-icons: https://github.com/unplugin/unplugin-icons
- Icons8: https://intercom.help/icons8-7fb7577e8170/en/articles/5136841-are-your-icons-free-for-commercial-use · https://community.icons8.com/t/free-license-attribution-requirements/1708
- Flaticon pricing: https://www.flaticon.com/pricing/1312618
- Noun Project pricing: https://thenounproject.com/pricing/ · blog: https://blog.thenounproject.com/?p=9584
- IconScout pricing: https://iconscout.com/pricing · free 3D: https://iconscout.com/Free-3d-illustrations
- Simple Icons GitHub: https://github.com/simple-icons/simple-icons
- SVGL GitHub: https://github.com/pheralb/svgl
- Devicon: https://devicon.dev/
- DEV SVG comparison: https://dev.to/simprl/a-comprehensive-comparison-of-svg-icon-management-options-in-react-js-projects-glc · DEV sprites: https://dev.to/gouranga-das-khulna/use-svg-sprites-to-make-your-react-app-load-faster-319a
- web.dev font best practices: https://web.dev/articles/font-best-practices
