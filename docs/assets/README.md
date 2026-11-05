# Assets: Index and Quick Picks

This folder covers the assets a website ships or is built from: icons, illustrations, fonts, photos, video, sound, 3D, mockups, design utilities and inspiration galleries. Each page lists sources with exact licences, attribution rules, restrictions and live status as of 5 Nov 2026, followed by implementation and performance guidance. The quick picks below give one default per asset type that is licence-safe for commercial use **without attribution**. Check [licensing-cheatsheet.md](licensing-cheatsheet.md) before shipping, because licences change. For how assets fit the wider build, see [../README.md](../README.md) and [../00-start-here.md](../00-start-here.md). Visual foundations are in [../foundations/design-tokens-color-type.md](../foundations/design-tokens-color-type.md), UI components in [../components/](../components/README.md) and motion in [../animations/](../animations/README.md).

## Index

| Page | What it covers |
|---|---|
| [licensing-cheatsheet.md](licensing-cheatsheet.md) | **Start here before shipping.** One consolidated table of every resource: licence, attribution, commercial use, restrictions, status and verification. Also explains the licence types and lists the biggest gotchas |
| [icons.md](icons.md) | Vector and UI icon sets with Iconify counts, aggregators, brand logos, safety tiers, and implementation (tree-shaking, unplugin-icons, sprites, no icon fonts, accessibility) |
| [3d-and-animated-icons.md](3d-and-animated-icons.md) | 3D icons and renders (3dicons, Fluent Emoji 3D, Shapefest, Thiings), Spline and Vectary, and animated icons (LottieFiles, Lordicon, useAnimations, lucide-animated, itshover, Rive, `line-md`) |
| [illustrations.md](illustrations.md) | Illustration libraries, AI-training bans, and Corporate Memphis and how to avoid it |
| [fonts.md](fonts.md) | Font sources and foundries, overused defaults (with Google Fonts ranks), distinctive faces with ranks and axes, pairings per aesthetic, variable fonts, and web font performance |
| [photos.md](photos.md) | Free, paid and museum/public-domain photo sources, tiers, and getting art-directed, non-generic imagery |
| [video.md](video.md) | Video sources and web video delivery: formats, `poster`, `preload`, autoplay, and GIF→video with ffmpeg |
| [sound.md](sound.md) | SFX and UI sound sources with per-file licence gotchas, use-sound/Howler/Web Audio, autoplay and AudioContext rules, and UX guidance |
| [3d-models-textures.md](3d-models-textures.md) | Models, textures and HDRIs, the Sketchfab→Fab migration, and glTF/Draco/Meshopt/KTX2 with gltf-transform |
| [mockups.md](mockups.md) | Device and product mockup sources and generators, with status |
| [design-tools.md](design-tools.md) | Colour, contrast, gradients, patterns and textures, shadows and glass, CSS generators, image optimisation, favicons |
| [inspiration-galleries.md](inspiration-galleries.md) | Whole-site and pattern galleries with redirects and status (e.g. Godly→Recent), and how to use them |
| [optimization.md](optimization.md) | Consolidated desktop vs mobile delivery for images, video, fonts, icons, 3D and audio |

## Quick picks

Each pick is commercial-OK with no attribution, per the notes. "Notice" means you keep the MIT/ISC/Apache licence notice in distributed code, with no visible credit. Every pick is still subject to the restrictions shown.

| Asset type | Default pick | Licence | Why / caveat | Runner-up |
|---|---|---|---|---|
| UI icons | [Tabler Icons](https://tabler.io/icons) or [Lucide](https://lucide.dev) | MIT / ISC (notice) | The largest coherent free stroke set (Tabler, 6,257), or a friendly Lucide. Lucide is the shadcn default, so it is now close to the "default AI app" look | [Phosphor](https://phosphoricons.com) (MIT) at the thin or duotone weight for a more distinctive look |
| Icon delivery | [unplugin-icons](https://github.com/unplugin/unplugin-icons) or the set's own tree-shakable package | MIT | Only used icons are bundled; SSR with no flash of unstyled content. Use sprites for icon-dense lists | n/a |
| Brand logos | [Simple Icons](https://simpleicons.org) | CC0-1.0 | **Trademarks still apply. Read DISCLAIMER.md.** Pin CDN versions | [SVG Logos](https://api.iconify.design/collections) (CC0); [Devicon](https://devicon.dev/) (MIT) for dev tools |
| 3D icons | [3dicons](https://3dicons.co/) | CC0 | Hand-made, no attribution | [Fluent Emoji 3D](https://github.com/microsoft/fluentui-emoji) (MIT), but it is very widely used |
| Animated icons | [useAnimations](https://useanimations.com/) | MIT | Ships static SVG fallbacks | [`line-md`](https://api.iconify.design/collections) (MIT, no JS runtime); [lucide-animated](https://github.com/pqoqubbw/icons) (MIT) |
| Lottie animations | [LottieFiles](https://lottiefiles.com/page/license) free animations | Lottie Simple License (FL 9.13.21) | No attribution. Don't compile them into a competing service. Quality varies | n/a |
| Illustrations | [Open Peeps](https://www.openpeeps.com/) / [Open Doodles](https://www.opendoodles.com/) | CC0 | No strings. Hand-drawn and warmer than flat vector | [Blush](https://blush.design/license) (custom, no attribution, no resale); pick a distinctive artist |
| Fonts (free) | Google Fonts OFL families self-hosted via [Fontsource](https://fontsource.org) | SIL OFL | Version pinning and privacy. Prefer families ranked above about 150 to avoid the defaults | [Fontshare](https://www.fontshare.com) (ITF Free Font License, commercial OK; self-hosting disputed); [Bunny Fonts](https://fonts.bunny.net) as a privacy CDN |
| Photos | [StockSnap](https://stocksnap.io/license) / [ISO Republic](https://isorepublic.com/license/) / [Nappy](https://nappy.co/license) | CC0 | No resale or AI clauses | [Met Open Access](https://www.metmuseum.org/en/policies/image-resources) (CC0) for non-generic texture; Unsplash (no credit, but no competing service) |
| Video | [ISO Republic](https://isorepublic.com/license/) | CC0 | No strings | [Coverr](https://coverr.co/license) (custom; no credit for website downloads; **no AI training**) |
| UI sound effects | [Kenney UI Audio](https://kenney.nl/assets/ui-audio) | CC0 | 50 UI files | [Sonniss GDC bundles](https://sonniss.com/gameaudiogdc/) (royalty-free, no attribution; **no AI/ML training**) |
| Sound playback | [use-sound](https://github.com/joshwcomeau/use-sound) | MIT | <1 kB plus Howler loaded async; global mute | [Howler.js](https://howlerjs.com/) directly |
| 3D models | [Poly Haven](https://polyhaven.com/license) / [Kenney](https://kenney.nl) / [Quaternius](https://quaternius.itch.io/quaternius-lowpoly-bundle) | CC0 | No attribution. Poly Haven bans scraping | [Smithsonian Open Access](https://www.thehistoryblog.com/?p=57989) 3D (CC0 items) |
| Textures and HDRIs | [ambientCG](https://docs.ambientcg.com/license/) / [Poly Haven](https://polyhaven.com/license) | CC0 | Files and previews are CC0 (ambientCG) | n/a |
| 3D optimisation | [glTF Transform](https://gltf-transform.dev/cli) | n/a | `inspect`, then `optimize` (Draco/Meshopt + KTX2/WebP) | [gltf.report](https://gltf.report/) in the browser |
| Mockups | [Ls.graphics](https://www.ls.graphics/free-mockups) / [Minimal Mockups](https://www.minimalmockups.com/) | **Licence not verified** | Check the terms yourself; the notes verified only liveness | [Mockuuups Studio](https://mockuuups.studio/) |
| Colour system | [oklch.com](https://oklch.com/) + [Leonardo](https://leonardocolor.io/) or [Radix Colors](https://www.radix-ui.com/colors) | Tools | Perceptual OKLCH scales with target contrast. Check with [WebAIM](https://webaim.org/resources/contrastchecker/) + [APCA](https://apcacontrast.com/) | [Huemint](https://huemint.com/) to preview a palette on a UI |
| Textures and backgrounds | [Haikei](https://haikei.app/) / [fffuel](https://www.fffuel.co/) + [Noise Texture Generator](https://www.noisetexturegenerator.com/) | Output licence not verified | SVG output, tiny on mobile; grain avoids the flat gradient look | [Hero Patterns](https://heropatterns.com/) (historically CC BY 4.0, unverified) |
| Image optimisation | [sharp](https://sharp.pixelplumbing.com/) (build) / [Squoosh](https://squoosh.app/) (manual) | n/a | AVIF → WebP → JPEG in `<picture>` | [SVGOMG](https://jakearchibald.github.io/svgomg/) for SVG |
| Inspiration | [Recent](https://recent.design/?ref=godly) (ex-Godly) + a moodboard in [Are.na](https://www.are.na/) | n/a | Moodboard before searching | [Mobbin](https://mobbin.com/) / [Page Flows](https://pageflows.com/) for flows |

## Avoid for commercial sites (unless you pay or comply)

| Resource | Why |
|---|---|
| Absurd Design free licence | Non-commercial only; exact credit required |
| Pangram Pangram trial fonts | Personal-use trials only |
| Thiings | Licence unclear and conflicting; AI-generated |
| SF Symbols on the web | Licence not retrievable; treat as unsafe |
| BBC Sound Effects (RemArc) | Personal, educational and research only |
| Freesound CC BY-NC / Sampling+ files | Non-commercial / not in ads |
| Mixkit Stock Video Restricted License | Personal, non-commercial |
| Kaboompics "Editorial Use Only" and Sketchfab "Editorial" | No advertising or brand use |
| CC BY sets (Font Awesome Free icons, Solar, Streamline free, Lordicon free, Rive Marketplace…) | Allowed, **but attribution is required**. Legal teams often avoid CC BY in white-label or client products |
| Remix Icon (current releases) as a logo | Its v1.0 licence bans logo and brand-identity use |
| unDraw, DrawKit, Absurd, Coverr, Unsplash+, Sonniss in AI pipelines | Their licences explicitly ban AI/ML training or use |

Editor's note: the quick picks are drawn from the "Tier A / permissive, no credit" inferences in the research notes. A pick's licence is cited on its topic page, but its being the *best* default is editorial judgement.

## Sources

The quick picks summarise the topic pages above. Their sources are listed at the end of each page and consolidated in [licensing-cheatsheet.md](licensing-cheatsheet.md#sources). The primary references are:

- Iconify collections API: https://api.iconify.design/collections
- Google Fonts metadata: https://fonts.google.com/metadata/fonts
- Fontshare API: https://api.fontshare.com/v2/fonts?limit=200
- web.dev font best practices: https://web.dev/articles/font-best-practices
- web.dev Learn Images, AVIF: https://web.dev/learn/images/avif
- Chrome autoplay policy: https://developer.chrome.com/blog/autoplay
- glTF Transform CLI: https://gltf-transform.dev/cli
