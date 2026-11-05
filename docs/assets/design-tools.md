# Design Tools: Colour, Gradients, Patterns, Shadows, CSS Generators, Image Optimisation and Favicons

This page lists the design-utility tools from the research notes, verified live with `curl` on 5 Nov 2026 and quoted by page title. The professional workflow it reflects is perceptual-colour-first:

- Pick and convert colours in OKLCH.
- Generate scales with target contrast (Leonardo, Radix Colors, uicolors.app, ColorBox).
- Preview palettes on a real UI (Huemint, Realtime Colors).
- Verify contrast with WCAG 2 checkers plus APCA.

Textures and gradients come from SVG and mesh generators, and shadows from layered-shadow generators. The notes give no survey data on which tools professionals "actually use". The evidence is liveness plus editorial judgement. Colour theory and token structure live in [../foundations/design-tokens-color-type.md](../foundations/design-tokens-color-type.md).

## Contents

- [1. Colour palettes and systems](#1-colour-palettes-and-systems)
- [2. Contrast](#2-contrast)
- [3. Gradients](#3-gradients)
- [4. Patterns, textures and shapes](#4-patterns-textures-and-shapes)
- [5. Shadows and glass](#5-shadows-and-glass)
- [6. CSS generators (motion, layout, type)](#6-css-generators-motion-layout-type)
- [7. Image optimisation and favicons](#7-image-optimisation-and-favicons)
- [8. Making it non-generic (editorial)](#8-making-it-non-generic-editorial)
- [9. Gaps](#9-gaps)
- [Sources](#sources)

## 1. Colour palettes and systems

| Tool | What it does (page title where quoted) | Status |
|---|---|---|
| Coolors (coolors.co) | Palette generator | **Cloudflare bot check (403); status could not be confirmed. Likely live** |
| Realtime Colors (realtimecolors.com) | Preview a palette on a live UI | **Timed out from the research environment** |
| [Huemint](https://huemint.com/) | "Huemint - AI color palette generator" | Live |
| [Adobe Color](https://color.adobe.com/) | Now branded "Color Palettes & Themes \| Adobe Express" | Live |
| [Khroma](https://www.khroma.co/) | "Khroma - AI Color Tool for Designers" | Live |
| [Color Hunt](https://colorhunt.co/) | Curated palettes | Live |
| [Radix Colors](https://www.radix-ui.com/colors) | Semantic 12-step colour scales | Live |
| [Tailwind palette](https://tailwindcss.com/docs/colors) | Tailwind default colours | Live |
| [OKLCH Color Picker & Converter](https://oklch.com/) | OKLCH picking and conversion | Live |
| [oklch.fyi](https://oklch.fyi/) | "Pick, convert and generate OKLCH colors" | Live |
| [Leonardo](https://leonardocolor.io/) | Adobe's contrast-based colour generator | Live |
| [ColorBox](https://colorbox.io/) | Colour scale generator | Live |
| [UI Colors](https://uicolors.app/generate) | "Tailwind CSS Colors - All colors + Custom color generator" | Live |
| [Learn UI Design Data Viz Color Palette Generator](https://www.learnui.design/tools/data-color-picker.html) | Data-viz palettes | Live |
| [Palettte.app](https://www.bairesdev.com/tools/color-palette-app/editor/) | Now redirects to a BairesDev "Color Palette App" | **Redirected (change of ownership)** |
| tints.dev | Tailwind palette generator | **Bot check (403)** |

## 2. Contrast

| Tool | Status |
|---|---|
| [APCA Contrast Calculator](https://apcacontrast.com/) | Live |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Live |
| myndex.com/APCA | **Timed out from the research environment** |

WCAG 2.x remains the compliance standard. APCA is advisory (editorial).

## 3. Gradients

| Tool | What it does (page title) | Status |
|---|---|---|
| [CSS Hero Mesher](https://csshero.org/mesher/) | "CSS mesh gradients generator" | Live |
| [Mesh](https://meshgradient.com/) | "Create beautiful mesh gradients" | Live |
| [uiGradients](https://uigradients.com/) | Gradient presets | Live |
| [gradient.style](https://gradient.style/) | Page title "CSS HDR Gradients". HDR/OKLCH-aware CSS gradients | Live |
| [CSS Gradient](https://cssgradient.io/) | Gradient generator | Live |
| [Grainy Gradients playground](https://grainy-gradients.vercel.app/) | Grainy gradient technique demo | **Unavailable: HTTP 402** (Vercel deployment disabled or payment required) |

## 4. Patterns, textures and shapes

| Tool | What it does (page title) | Output licence | Status |
|---|---|---|---|
| [Hero Patterns](https://heropatterns.com/) | "Free repeatable SVG background patterns" | **Not verified** (historically CC BY 4.0) | Live |
| [Haikei](https://haikei.app/) | "Generate unique SVG design assets" (blobs, waves, layered scenes) | **Not verified** | Live |
| [Pattern Monster](https://pattern.monster/) | "SVG Pattern Generator" | **Not verified** | Live |
| [fffuel](https://www.fffuel.co/) | "Free SVG generators, color tools & web design tools" | Not verified | Live |
| [Blobmaker](https://www.blobmaker.app/) | SVG blob generator | Not verified | Live |
| [Get Waves](https://getwaves.io/) | SVG wave generator | Not verified | Live |
| [Noise Texture Generator v2.1](https://www.noisetexturegenerator.com/) | Noise and grain textures | Not verified | Live |
| SVG Backgrounds (svgbackgrounds.com) | SVG background library | Not verified | **Bot check (403)** |

## 5. Shadows and glass

| Tool | What it does | Status |
|---|---|---|
| [Smooth Shadow](https://shadows.brumm.af/) (page title "brumm.af") | Layered smooth-shadow generator | Live |
| [Tobias Ahlin: "Layered smooth box shadows"](https://tobiasahlin.com/blog/layered-smooth-box-shadows/) | The technique article, not a generator | Live |
| [Josh W. Comeau CSS Shadow Palette Generator](https://www.joshwcomeau.com/shadow-palette/) | Consistent elevation shadow palettes | Live |
| [Glassmorphism CSS Generator](https://hype4.academy/tools/glassmorphism-generator) (SquarePlanet / Hype4) | Glass panel CSS | Live |
| ui.glass/generator | Glassmorphism generator | **Timed out** |
| smoothshadows.com | Shadow generator | **Timed out** |

**Attribution note (editorial).** The original brief attributed "Smooth Shadow" to Tobias Ahlin. As far as the researcher knows, the Smooth Shadow generator is Philipp Brumm's tool at shadows.brumm.af, and Ahlin wrote the influential layered-shadow article. Both URLs were verified live, but the authorship text was not fetched, so confirm the attribution before publishing.

## 6. CSS generators (motion, layout, type)

| Tool | What it does (page title) | Status |
|---|---|---|
| [Clippy](https://bennettfeely.com/clippy/) | "CSS clip-path maker", by Bennett Feely | Live |
| [cubic-bezier.com](https://cubic-bezier.com/) | Bezier easing editor | Live |
| [Easing Functions Cheat Sheet](https://easings.net/) | Easing reference | Live |
| [Easing Graphs](https://www.easing.dev/) | Easing visualiser | Live |
| [Utopia](https://utopia.fyi/) | "Fluid Responsive Design" type and space scales | Live |
| [Type Scale](https://typescale.com/) | Modular type scale. Some features need Pro (see [fonts.md](fonts.md#5-type-tools-and-inspiration)) | Live |
| [Fontjoy](https://fontjoy.com/) | Font pairing | Live |

Easing in practice is covered in [../animations/motion-principles-easing.md](../animations/motion-principles-easing.md#6-easing-curves).

## 7. Image optimisation and favicons

| Tool | What it does (page title) | Use | Status |
|---|---|---|---|
| [Squoosh](https://squoosh.app/) | In-browser image compression. web.dev recommends it for experimenting with AVIF | Manual, per image | Live |
| [TinyPNG](https://tinypng.com/) | "Compress WebP, PNG and JPEG images intelligently" | Manual / API | Live |
| [SVGOMG](https://jakearchibald.github.io/svgomg/) | "SVGO's Missing GUI for minifying SVGs" | Minify SVG patterns, blobs and icons | Live |
| [sharp](https://sharp.pixelplumbing.com/) | "High performance Node.js image processing" | Build pipelines. Also used by the glTF-Transform CLI | Live |
| [RealFaviconGenerator](https://realfavicongenerator.net/) | Favicon set generation | Favicons and app icons | Live |

See [optimization.md](optimization.md#images) for the AVIF/WebP `<picture>` recipe.

## 8. Making it non-generic (editorial)

These are editorial judgements from the notes, not cited facts.

**Colour systems:**

- Start from a brand hue in OKLCH, so lightness stays perceptually even across hues.
- Generate 11–12 step scales with target contrast ratios (Leonardo's model), or use Radix's semantic 12-step scale for UI states.
- Test the whole palette on a live UI mock (Huemint or Realtime Colors), not on swatches.
- Check both WCAG 2.x (the legal baseline) and APCA (better perceptual guidance for dark mode and large text). WCAG 2.x remains the compliance standard; APCA is advisory.

**Texture and gradients:**

- Grain and noise overlays (Noise Texture Generator, fffuel's noise tools) plus SVG `feTurbulence` filters are the main tool for avoiding the "flat AI gradient" look.
- Mesh gradients with grain, Haikei blob or layered-wave scenes, and HDR OKLCH gradients from gradient.style are the current premium-looking defaults.
- **uiGradients and Color Hunt presets are the most likely to look generic.**
- The "AI slop" signal list cited in [fonts.md](fonts.md#2-overused-defaults-to-avoid) includes "purple gradients on white backgrounds".

**Ownership changes** (Palettte → BairesDev, Godly → Recent) suggest that tool directories should be re-verified at publish time.

## 9. Gaps

- Feature pages for each tool were not fetched. Details such as Huemint's ML model, Leonardo's contrast targets and fffuel's individual tools are unverified; only liveness and titles were confirmed.
- No survey data on which tools professional designers actually use (e.g. State of CSS, UX Tools surveys) was consulted.
- Coolors, Realtime Colors and SVG Backgrounds liveness could not be confirmed from the research environment.
- The licence of patterns and SVGs exported from Haikei, Hero Patterns (historically CC BY 4.0) and Pattern Monster was not verified.

## Sources

- Huemint: https://huemint.com/ · Adobe Color: https://color.adobe.com/ · Khroma: https://www.khroma.co/ · Color Hunt: https://colorhunt.co/
- Radix Colors: https://www.radix-ui.com/colors · Tailwind colors: https://tailwindcss.com/docs/colors
- OKLCH: https://oklch.com/ · oklch.fyi: https://oklch.fyi/ · Leonardo: https://leonardocolor.io/ · ColorBox: https://colorbox.io/ · UI Colors: https://uicolors.app/generate
- Learn UI Design data color picker: https://www.learnui.design/tools/data-color-picker.html
- Palettte (BairesDev): https://www.bairesdev.com/tools/color-palette-app/editor/
- APCA: https://apcacontrast.com/ · WebAIM: https://webaim.org/resources/contrastchecker/
- CSS Hero Mesher: https://csshero.org/mesher/ · Mesh: https://meshgradient.com/ · uiGradients: https://uigradients.com/ · gradient.style: https://gradient.style/ · CSS Gradient: https://cssgradient.io/ · Grainy Gradients: https://grainy-gradients.vercel.app/
- Hero Patterns: https://heropatterns.com/ · Haikei: https://haikei.app/ · Pattern Monster: https://pattern.monster/ · fffuel: https://www.fffuel.co/ · Blobmaker: https://www.blobmaker.app/ · Get Waves: https://getwaves.io/ · Noise Texture Generator: https://www.noisetexturegenerator.com/
- Smooth Shadow: https://shadows.brumm.af/ · Tobias Ahlin: https://tobiasahlin.com/blog/layered-smooth-box-shadows/ · Josh Comeau shadow palette: https://www.joshwcomeau.com/shadow-palette/ · Glassmorphism generator: https://hype4.academy/tools/glassmorphism-generator
- Clippy: https://bennettfeely.com/clippy/ · cubic-bezier: https://cubic-bezier.com/ · easings.net: https://easings.net/ · easing.dev: https://www.easing.dev/ · Utopia: https://utopia.fyi/ · Typescale: https://typescale.com/ · Fontjoy: https://fontjoy.com/
- Squoosh: https://squoosh.app/ · TinyPNG: https://tinypng.com/ · SVGOMG: https://jakearchibald.github.io/svgomg/ · sharp: https://sharp.pixelplumbing.com/ · RealFaviconGenerator: https://realfavicongenerator.net/
- web.dev Learn Images, AVIF: https://web.dev/learn/images/avif
