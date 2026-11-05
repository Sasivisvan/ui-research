# Fonts: Sources, Distinctive Typefaces, Pairings and Web Font Performance

This page covers web fonts. It lists font sources and their licences, quantifies the overused defaults using Google Fonts popularity ranks (lower rank = more used), and lists distinctive but less saturated free typefaces with their ranks and variable axes. It also gives pairings by aesthetic and the web font performance techniques: WOFF2, subsetting, `font-display`, preload, Fontaine, Capsize, Fontsource and Bunny Fonts. Data comes from live pulls of the [Google Fonts metadata endpoint](https://fonts.google.com/metadata/fonts) and the [Fontshare API](https://api.fontshare.com/v2/fonts?limit=200) on 5 Nov 2026. Two licence traps stand out: **Pangram Pangram fonts are personal-use trials only**, and Muzli's 2026 "free trendy fonts" list is mostly personal-use or has unstated licences. For type scale and hierarchy theory see [../foundations/design-tokens-color-type.md](../foundations/design-tokens-color-type.md#5-typography-typeface-choice-and-type-scales).

## Contents

- [1. Font sources and licences](#1-font-sources-and-licences)
- [2. Overused defaults to avoid](#2-overused-defaults-to-avoid)
- [3. Distinctive, lower-saturation free typefaces](#3-distinctive-lower-saturation-free-typefaces)
- [4. Pairings by aesthetic](#4-pairings-by-aesthetic)
- [5. Type tools and inspiration](#5-type-tools-and-inspiration)
- [6. Variable fonts](#6-variable-fonts)
- [7. Web font performance](#7-web-font-performance)
- [8. Gaps](#8-gaps)
- [Sources](#sources)

## 1. Font sources and licences

### 1.1 Free and open-source sources

| Source | What it offers | Size | Licence | Attr | Free / paid | Notes | Status |
|---|---|---|---|---|---|---|---|
| [Google Fonts](https://fonts.google.com) | Open-source font catalogue and CDN | Live metadata: **1,959 families, 565 with variable axes** | Open source, mostly **SIL OFL**. Free for commercial use ([Typewolf free fonts](https://www.typewolf.com/free-fonts)) | No | Free | Records popularity ranks, e.g. Roboto #2, Open Sans #3, Inter #5, Montserrat #7, Poppins #8, Lato #9 | Live; API pulled |
| [Fontshare](https://www.fontshare.com) (Indian Type Foundry) | Curated foundry fonts via API or an offline kit with web and desktop fonts | API: **100 families** | Most use `license_type: itf_ffl`, the **ITF Free Font License**. ITF says the fonts are "not open-source and are still controlled by an ITF EULA" but "100% free for personal and commercial use" ([ITF announcement](https://www.indiantypefoundry.com/news/introducing-fontshare)). The rest are re-hosted **SIL OFL** families: Space Grotesk, Plus Jakarta Sans, Epilogue, JetBrains Mono | No (not stated) | Free | Secondary sources say resale and redistribution are prohibited, and they **disagree on whether raw files may be self-hosted** ([search summary](https://licenseorg.com/guide/fonts/fontshare)). **The licence page is JavaScript-only and could not be fetched** | Live; API pulled; licence page unverified |
| [Bunny Fonts](https://fonts.bunny.net/about) | EU-based (BunnyWay d.o.o.) privacy CDN with a "zero-tracking and no-logging policy", designed to help with GDPR compliance | Mirrors open-source fonts | Per font (open source) | Per font | Free | "Fully compatible with the Google Fonts CSS v1 API". Swap the hostname for `fonts.bunny.net/css` | Live |
| [Fontsource](https://fontsource.org/docs/getting-started/introduction) | Every open-source font as an npm package for self-hosting | Google catalogue and beyond | Per font (open source) | Per font | Free | No extra DNS lookup or connection, version pinning, privacy (no Google requests), offline/PWA support, fonts beyond the Google catalogue | Live |
| [Collletttivo](https://www.collletttivo.it/) | Italian open-source foundry, e.g. Ronzino, Apfel Grotezk, Absans, Coconat, Borges, Aujournuit, Sinistre | **16 typefaces** | "All Collletttivo fonts are distributed for free under Open Source **OFL** license" ([licensing](https://www.collletttivo.it/licensing)) | The page **asks** you to credit the designer and foundry | Free | Commercial use OK. You may not sell the fonts | Live |
| [Velvetyne](https://velvetyne.fr/) | Libre foundry | n/a | **Not readable.** The homepage shows a strike/protest banner ("EN GRÈVE") instead of the catalogue | n/a | n/a | No font or licence data could be read | Live but showing a strike banner |
| [UNCUT.wtf](https://uncut.wtf/) | Free catalogue of "somewhat contemporary type", "free for commercial use" | **163 typefaces** (66 sans, 47 display, 27 serif, 23 mono) | "All fonts copyright of their respective creators", so **check each licence** | Per font | Free | | Live |
| [Use & Modify](https://usemodify.com/) (by Raphaël) | "A personal selection of beautiful, classy, punk, professional, incomplete, weird typefaces" | 31 pages of listings | Filter by licence: OFL, Apache, MIT, GPL, CC and others | Per font | Free | | Live |
| [The League of Moveable Type](https://www.theleagueofmoveabletype.com/) | E.g. League Spartan, League Gothic, Raleway, Ostrich Sans, Orbitron, Fanwood, Sorts Mill Goudy | **18 families** | "free & open source... subject to the **Open Font License**" | No | Free | Active (© 2009–2026) | Live |
| [Open Foundry](https://open-foundry.com/) | **Appears to have changed.** Now presents 25 families (Roboto, Inter, Poppins, EB Garamond…) as "Curated Fonts for Free", operated by "Magic as a Service™" | 25 families | **No licence info shown** | n/a | Free | Treat it as a link list, not a foundry | Live (changed) |
| [Badass Libre Fonts by Womxn](https://www.design-research.be/by-womxn/) | Libre fonts by women designers | n/a | Not verified | n/a | Free | **Blocked by Anubis bot protection during research** | Unreachable from the research environment |
| [Font Squirrel](https://www.fontsquirrel.com/faq) | Free font directory plus Webfont Generator | n/a | "100% free for commercial use", **but check each font's licence** | Per font | Free | The Webfont Generator only accepts "legally eligible fonts" | Live |

### 1.2 Commercial and premium sources

| Source | What it offers | Licence / pricing | Trap | Status |
|---|---|---|---|---|
| [Adobe Fonts](https://fonts.adobe.com) | Subscription font library | **Help page returned 403**, so not verified | n/a | Help page unreachable |
| [Pangram Pangram](https://pangrampangram.com/pages/faq) | Retail foundry (PP Neue Montreal, PP Editorial New, Acma, Kyoto and others) | Fonts are "free to try for personal use as long as it is not used in a commercial project". **The web licence is priced by monthly pageviews** across all domains. App licences are priced by MAU. Companies get 1-year terms | **Common trap: PP Neue Montreal, PP Editorial New and others are NOT free for commercial sites** | Live |
| [Displaay](https://displaay.net/) (Prague) | About 40 retail typefaces: Reckless, Saans, Matter, Roobert, Avantt, Tobias, Haffer, Greed | Free full trials for testing. A "New License model" priced by business size. **Displaay's Azeret Mono is free (OFL) on Google Fonts** | Trials are for testing only | Live |
| [Grilli Type](https://www.grillitype.com/licensing) | Premium foundry (GT America, GT Sectra). Has a free-trial-fonts page | **The licensing page URL returned 404** | Premium | Licensing page 404 |
| Klim | Premium foundry | **Licensing URL returned 404** | Premium | Licensing page 404 |
| Dinamo | Premium foundry | **Licensing URL returned 404** | Premium | Licensing page 404 |
| Commercial Type | Premium foundry | **Not fetched** | Premium | Not checked |

## 2. Overused defaults to avoid

Inter, Roboto, Open Sans, Montserrat, Poppins and Lato are measurably the most-used Google Fonts. Community "AI slop" guides list Inter, Roboto and Arial as tell-tale defaults.

**Most-used Google Fonts.** Popularity rank (lower = more used) from the [Google Fonts metadata](https://fonts.google.com/metadata/fonts):

| Font | Rank |
|---|---|
| Roboto | 2 |
| Open Sans | 3 |
| Inter | 5 |
| Montserrat | 7 |
| Poppins | 8 |
| Lato | 9 |
| Nunito | 25 |
| Manrope | 29 |
| Outfit | 32 |
| Plus Jakarta Sans | 34 |
| Figtree | 38 |

**Former "distinctive" picks that are now mainstream:**

| Font | Rank |
|---|---|
| Space Grotesk | 58 |
| Bricolage Grotesque | 60 |
| Instrument Serif | 79 |
| Fraunces | 82 |
| Geist | 85 |
| Schibsted Grotesk | 99 |
| Instrument Sans | 117 |
| Newsreader | 125 |

**Signals and warnings (community sources, not authoritative):**

- An "AI slop aesthetics" anti-pattern guide lists "Inter/Roboto/Arial fonts, purple gradients on white backgrounds" as signals of unedited AI output, and recommends "a display serif with a humanist sans" ([skill-wiki anti-pattern](https://skill-wiki.github.io/atom/frontend-design/anti-pattern-ai-slop-aesthetics)).
- Another essay argues the problem is Inter as an unexamined *default*, not Inter's quality ([aismells: Geometric Sans Monoculture](https://aismells.pages.dev/geometric-sans-monoculture.html)).
- **Serif warning.** Wired reports AI companies adopting serifs to "look more human", and critics say "the look is becoming generic" ([AI Directory (Wired republish)](https://aidirectory.com/news/ai-companies-turn-to-serif-fonts-to-look-more-human)). So an Instrument Serif headline over Inter body text is itself turning into a 2025 cliché (inference).
- **Fontshare saturation.** A roundup describes Switzer as "used widely in SaaS marketing through 2024–2026" ([madegooddesigns (via search)](https://madegooddesigns.com/best-geometric-sans-serif-fonts-2026/)). Satoshi and Clash Display carry a similar saturation risk (inference).
- **Trend direction.** 2026 trend pieces describe a move toward "bold, raw, and unpolished" and "human, imperfect" letterforms ([Graphic Design Junction 2026](https://graphicdesignjunction.com/2026/01/2026-typography-trends/)).
- **Licence trap in trend lists.** Muzli's "30 Great Free Trendy Fonts for 2026" mostly lists **personal-use-only or unstated-licence** fonts: Rebak, CS Brooklyn, Norelli, and Pangram's Acma and Kyoto ([Muzli](https://feed.muz.li/?p=200024)). Trend roundups are risky licence sources.

## 3. Distinctive, lower-saturation free typefaces

All Google families below are free for commercial web use (OFL). They are listed with Google Fonts popularity rank, variable axes, and the date added where the notes give one ([Google Fonts metadata](https://fonts.google.com/metadata/fonts)). Rule of thumb from the notes: a rank above about 150 is a usable proxy for "not overused".

### 3.1 Serif and display

| Family | Rank | Axes | Added |
|---|---|---|---|
| Young Serif | 490 | n/a | 2023 |
| Gloock | 393 | n/a | 2023 |
| Bodoni Moda | 146 | opsz, wght | n/a |
| Kalnia | 1012 | wdth, wght | 2023 |
| Petrona | 432 | n/a | n/a |
| Piazzolla | 767 | opsz | n/a |
| Imbue | 1160 | opsz | n/a |
| Brygada 1918 | 665 | n/a | n/a |
| Libertinus Serif | 803 | n/a | 2025 |
| Redaction | n/a | n/a | 2026-10-28 |

### 3.2 Sans

| Family | Rank | Axes | Added / note |
|---|---|---|---|
| Familjen Grotesk | 442 | n/a | n/a |
| Hanken Grotesk | 142 | n/a | n/a |
| Funnel Display / Funnel Sans | 487 / 431 | n/a | 2024 |
| Host Grotesk | 394 | n/a | 2024 |
| Mona Sans / Hubot Sans | 422 / 1243 | wdth, wght | By GitHub |
| SUSE | 1141 | n/a | n/a |
| Special Gothic | 776 | wdth | 2025 |
| Science Gothic | 1014 | CTRS, slnt, wdth, wght | 2025-11 |
| Zalando Sans / Zalando Sans Expanded | 551 / 637 | n/a | 2025 |
| Stack Sans Text / Headline | ~985 | n/a | 2025-11 |
| Google Sans Flex | 101 | ROND, opsz, slnt, wdth, wght | 2025-11-12 |
| Rethink Sans | 226 | n/a | n/a |
| Onest | 167 | n/a | n/a |

### 3.3 Display and expressive

| Family | Rank | Axes / note |
|---|---|---|
| Big Shoulders | 508 | opsz, wght (2025) |
| Anybody | 706 | wdth |
| Unbounded | 172 | n/a |
| Syne | 185 | n/a |
| Bitcount | 1899 | five axes |
| Doto | 827 | n/a |
| Handjet | 1346 | n/a |
| Honk | 1099 | colour font |
| Nabla | 1376 | colour font |

### 3.4 Mono

| Family | Rank | Axes |
|---|---|---|
| Martian Mono | 572 | wdth |
| Fragment Mono | 549 | n/a |
| Azeret Mono | 511 | n/a (by Displaay, OFL) |
| Chivo Mono | 604 | n/a |
| Sometype Mono | 704 | n/a |
| Recursive | 619 | CASL, CRSV, MONO |
| Google Sans Code | 270 | n/a |

### 3.5 Fontshare (ITF Free Font License, free for commercial use)

Distinctive families from the [Fontshare API](https://api.fontshare.com/v2/fonts?limit=200): Satoshi, General Sans, Clash Display / Clash Grotesk, Cabinet Grotesk, Switzer, Supreme, Zodiak, Gambetta, Erode, Sentient, Boska, Gambarino, Bespoke Serif / Sans / Slab, Ranade, Chillax, Panchang, Tanker, Kola, Melodrama, Technor, Synonym and Rowan.

Saturation warning: Switzer, Satoshi and Clash Display are becoming common (see [§2](#2-overused-defaults-to-avoid)).

### 3.6 Other free sources

- Collletttivo OFL faces: Ronzino, Apfel Grotezk, Absans, Coconat, Sinistre ([Collletttivo](https://www.collletttivo.it/)).
- League faces: League Spartan, League Gothic, Fanwood ([League](https://www.theleagueofmoveabletype.com/)).
- Typewolf's curated Google list (Jan 2026) mixes the defaults (Inter, Poppins, Montserrat) with characterful picks: Syne, Eczar, Fraunces, Inknut Antiqua, BioRhyme, Cormorant, Space Mono and Spectral ([Typewolf Google Fonts](https://www.typewolf.com/google-fonts)).
- Typewolf's "newer releases" note lists Instrument Sans/Serif, Bricolage Grotesque, Newsreader, Plus Jakarta Sans, Familjen Grotesk, Azeret Mono, Outfit, DM Serif and Literata.

### 3.7 Body-text criteria (Typewolf)

A good body face has regular, italic, bold and bold-italic styles, low-to-moderate stroke contrast, large counters, open apertures and an adequate x-height ([Typewolf free fonts](https://www.typewolf.com/free-fonts)).

Typewolf also warns that "most free fonts make a poor alternative to commercial fonts".

## 4. Pairings by aesthetic

These pairings are the researcher's suggestions, built from the licence-verified families above. Every font listed is free for commercial web use (OFL or ITF FFL).

| Aesthetic | Primary pairing | Alternatives |
|---|---|---|
| **Editorial / magazine** | Newsreader (opsz) or Young Serif headlines + Source Serif 4 or Literata body + Familjen Grotesk UI | Zodiak or Gambetta (Fontshare) + Switzer. Fraunces with SOFT/WONK axes tuned away from the defaults + Hanken Grotesk |
| **Brutalist / raw** | Big Shoulders or Anybody (wide/condensed widths), or Collletttivo's Sinistre/Ronzino + Martian Mono or Fragment Mono for body and labels | Space Mono everywhere. Tanker/Panchang (Fontshare) + JetBrains Mono |
| **Tech / developer** | Geist + Geist Mono is now common, so prefer Mona Sans/Hubot Sans (wdth axis) or Host Grotesk + Martian Mono or Recursive | Science Gothic (width and contrast axes) + Azeret Mono. Supreme or General Sans + JetBrains Mono |
| **Luxury / fashion** | Bodoni Moda (opsz) or Gloock headlines, small-caps tracking + Switzer or Schibsted Grotesk body | Boska or Gambarino (Fontshare) + Satoshi. Kalnia (wdth) display + Libertinus Serif text |
| **Playful / consumer** | Bricolage Grotesque (opsz/wdth) or Clash Display + Satoshi or Onest | Gabarito or Funnel Display + Rethink Sans. Caprasimo or Chillax for headlines |

**Practical rule:** keep at most two families plus an optional mono. Use variable axes (opsz, wdth, SOFT/WONK, CASL) to get character from one file. A Google Fonts rank above about 150 is a usable proxy for "not overused".

## 5. Type tools and inspiration

| Tool | What it does | Notes | Status |
|---|---|---|---|
| [Typewolf Google Fonts](https://www.typewolf.com/google-fonts) | 40 recommended Google Fonts, with body-friendly ones marked (updated January 12, 2026) | Specific pairing recommendations are in a paid guide (not accessed) | Live |
| [Typewolf Site of the Day](https://www.typewolf.com/site-of-the-day) | Typography-led site inspiration | See [inspiration-galleries.md](inspiration-galleries.md) | Live |
| [Fontjoy](https://fontjoy.com/) | Generates pairings with a neural network ("share a theme but still contrast pleasingly") | n/a | Live |
| [Typescale](https://typescale.com/) | Modular scale builder (e.g. Minor Second 1.067, Perfect Fifth 1.5) with responsive sizes, a Google Fonts picker and CSS export | Some features require Pro | Live |
| [Utopia](https://utopia.fyi/) | "Fluid Responsive Design" type and space scales | See [design-tools.md](design-tools.md) | Live |
| [MaxiBestOf](https://maxibestof.one/) | "Web Design Inspiration, Sections & Fonts" | See [inspiration-galleries.md](inspiration-galleries.md) | Live |

## 6. Variable fonts

- Google Fonts has **565 of 1,959 families with variable axes** ([metadata](https://fonts.google.com/metadata/fonts)).
- Variable fonts consolidate weights, but one variable file can be larger than one static font ([web.dev](https://web.dev/articles/font-best-practices)).
- Useful character axes in the families above:
  - `opsz` (Newsreader, Bodoni Moda, Big Shoulders, Piazzolla, Imbue)
  - `wdth` (Mona Sans, Hubot Sans, Anybody, Kalnia, Martian Mono, Special Gothic)
  - `SOFT` / `WONK` (Fraunces)
  - `CASL` / `CRSV` / `MONO` (Recursive)
  - `CTRS` / `slnt` (Science Gothic)
  - `ROND` (Google Sans Flex)
- Material Symbols is a variable *icon* font (FILL, wght, GRAD, opsz). See [icons.md](icons.md).

## 7. Web font performance

### 7.1 web.dev recommendations

Source: [web.dev font best practices](https://web.dev/articles/font-best-practices).

- Put `@font-face` and critical CSS inline in `<head>`, but don't inline the font files.
- Preconnect to third-party font origins, with `crossorigin`.
- **Preload sparingly.** Preload ignores `unicode-range` and takes bandwidth from other resources.
- **"Use only WOFF2 and forget about everything else."** It is about 30% smaller than WOFF thanks to Brotli.
- Subset and use `unicode-range`, with tools such as subfont and glyphhanger. **Check that the licence allows subsetting.**
- Self-hosting "isn't automatically faster", so test it.
- Variable fonts consolidate weights, but one variable file can be larger than one static font.
- Consider `system-ui`.
- Avoid icon fonts; replace them with SVG (see [icons.md](icons.md#7-implementation)).

### 7.2 `font-display` values

| Value | Block period | Swap period | Use for |
|---|---|---|---|
| `block` | about 2–3 s | infinite | n/a |
| `swap` | 0 ms | infinite | **Branding** |
| `fallback` | 100 ms | 3 s | n/a |
| `optional` | 100 ms | none | **Performance and no layout shift** (body text) |

Use `size-adjust` to reduce CLS.

### 7.3 Tooling

| Tool | What it does | Notes | Licence |
|---|---|---|---|
| [Fontaine](https://github.com/unjs/fontaine) (UnJS) | Generates fallback `@font-face` rules with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` | Plugins for Vite, webpack and Next.js, with examples for Astro, Gatsby and Docusaurus. A PostCSS route exists for Sass. Nuxt uses `nuxt-font-metrics`. Playground: **CLS dropped from 0.24 to 0.054** | MIT |
| [Capsize](https://seek-oss.github.io/capsize/) | Sizes text by cap height and trims the space above caps and below the baseline | `@capsizecss/core` `createStyleObject`, with per-font metrics packages such as `@capsizecss/metrics/roboto` | n/a |
| [Fontsource](https://fontsource.org/docs/getting-started/introduction) | npm self-hosting | Version pinning, offline/PWA, privacy | Per font |
| [Bunny Fonts](https://fonts.bunny.net/about) | Drop-in privacy CDN for Google Fonts CSS v1 | Swap the host to `fonts.bunny.net/css` | Per font |
| subfont, glyphhanger | Subsetting | Named by web.dev | n/a |
| [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/faq) | Converts and subsets eligible fonts | Only "legally eligible fonts" | n/a |

### 7.4 Recommended mobile font stack

This is an inference in the notes.

- At most **2 variable WOFF2 files**, Latin-subset.
- `font-display: optional` for body text, or `swap` plus Fontaine fallback metrics.
- **Preload only the LCP headline font.**
- Use `next/font` or Fontaine-style overrides to keep CLS near zero.

> Editor's note: a minimal self-hosted pattern combining the rules above.
> ```html
> <link rel="preload" href="/fonts/display-latin.woff2" as="font" type="font/woff2" crossorigin>
> <style>
>   @font-face {
>     font-family: "Display";
>     src: url("/fonts/display-latin.woff2") format("woff2");
>     font-weight: 100 900;          /* variable */
>     font-display: swap;            /* brand headline */
>     unicode-range: U+0000-00FF, U+0131, U+0152-0153; /* Latin subset */
>   }
>   @font-face {
>     font-family: "Text";
>     src: url("/fonts/text-latin.woff2") format("woff2");
>     font-weight: 300 700;
>     font-display: optional;        /* body: no layout shift */
>   }
> </style>
> ```
> Pair it with Fontaine or `size-adjust` fallbacks so the swap does not shift layout. Desktop and mobile budgets are in [optimization.md](optimization.md).

## 8. Gaps

- No authoritative, survey-based source (for example Web Almanac font-usage data for 2025) was fetched. "Overused" relies on Google Fonts popularity ranks plus community essays.
- Typewolf's specific pairing recommendations are in a paid guide and were not accessible.
- Fonts In Use was not fetched, so there are no real-world usage counts for the suggested faces.
- These could not be read or retrieved:
  - Fontshare licence page (JS-only)
  - Adobe Fonts help (403)
  - Velvetyne (strike banner)
  - Badass Libre Fonts (bot wall)
  - Grilli, Klim and Dinamo licensing pages (404)
  - Commercial Type (not fetched)

## Sources

- Google Fonts metadata: https://fonts.google.com/metadata/fonts
- Fontshare API: https://api.fontshare.com/v2/fonts?limit=200 · ITF announcement: https://www.indiantypefoundry.com/news/introducing-fontshare · Fontshare licence summary: https://licenseorg.com/guide/fonts/fontshare
- Bunny Fonts about: https://fonts.bunny.net/about
- Fontsource docs: https://fontsource.org/docs/getting-started/introduction
- Collletttivo: https://www.collletttivo.it/ · licensing: https://www.collletttivo.it/licensing
- Velvetyne: https://velvetyne.fr/
- Uncut: https://uncut.wtf/
- Use & Modify: https://usemodify.com/
- League of Moveable Type: https://www.theleagueofmoveabletype.com/
- Open Foundry: https://open-foundry.com/
- Badass Libre Fonts by Womxn: https://www.design-research.be/by-womxn/
- Font Squirrel FAQ: https://www.fontsquirrel.com/faq
- Pangram Pangram FAQ: https://pangrampangram.com/pages/faq
- Displaay: https://displaay.net/
- Grilli Type licensing: https://www.grillitype.com/licensing
- Typewolf Google Fonts: https://www.typewolf.com/google-fonts · Typewolf free fonts: https://www.typewolf.com/free-fonts
- Fontjoy: https://fontjoy.com/ · Typescale: https://typescale.com/ · Utopia: https://utopia.fyi/
- skill-wiki anti-pattern: https://skill-wiki.github.io/atom/frontend-design/anti-pattern-ai-slop-aesthetics
- aismells: https://aismells.pages.dev/geometric-sans-monoculture.html
- AI Directory (Wired republish): https://aidirectory.com/news/ai-companies-turn-to-serif-fonts-to-look-more-human
- madegooddesigns: https://madegooddesigns.com/best-geometric-sans-serif-fonts-2026/
- Graphic Design Junction 2026: https://graphicdesignjunction.com/2026/01/2026-typography-trends/
- Muzli: https://feed.muz.li/?p=200024
- web.dev font best practices: https://web.dev/articles/font-best-practices
- Fontaine: https://github.com/unjs/fontaine
- Capsize: https://seek-oss.github.io/capsize/
