# Asset Delivery Optimisation: Desktop vs Mobile

This page gathers the delivery guidance for every asset type covered in this folder in one place: images, video, fonts, icons (static and animated), 3D and audio. It contrasts desktop and mobile where the notes support a difference. Each section separates **cited** guidance (web.dev, the Chrome autoplay policy, the glTF-Transform docs, library READMEs) from **inference**: recipes the researcher synthesised, with size budgets marked editorial. The per-type pages hold the sources and details: [photos.md](photos.md), [video.md](video.md), [fonts.md](fonts.md), [icons.md](icons.md), [3d-and-animated-icons.md](3d-and-animated-icons.md), [3d-models-textures.md](3d-models-textures.md) and [sound.md](sound.md).

## Contents

- [At a glance](#at-a-glance)
- [Images](#images)
- [Video](#video)
- [Fonts](#fonts)
- [Icons](#icons)
- [Animated icons and Lottie/Rive](#animated-icons-and-lottierive)
- [3D](#3d)
- [Audio](#audio)
- [Gaps](#gaps)
- [Sources](#sources)

## At a glance

| Asset | Default format / approach | Desktop | Mobile |
|---|---|---|---|
| Images | AVIF → WebP → JPEG/PNG in `<picture>`, responsive `srcset`/`sizes` | Larger `srcset` candidates (up to ~2400 px) | Smaller candidates (~400 px+). Lazy-load below the fold |
| SVG art (patterns, blobs, waves) | SVG minified with SVGOMG | Same | Same; tiny on mobile |
| Video | WebM (AV1/VP9) first, then MP4; `type`, `poster`, `preload` hint | ~25 s buffered by Chrome; 1080p | **No buffering** on iOS/Android; 720p; poster fallback |
| Fonts | WOFF2 only, subset, `font-display` per role | n/a | ≤2 variable WOFF2 files, Latin subset, preload only the LCP font |
| Icons | Tree-shaken components; sprite for icon-dense views; no icon fonts | Components fine | Sprites avoid hydration and DOM cost in long lists |
| Animated icons | SVG/CSS or Motion first; Lottie/Rive lazy-loaded; reduced-motion gate | n/a | Static fallback |
| 3D | GLB + Meshopt/Draco + KTX2/WebP, dedup/prune | n/a | Hero model ~2–5 MB max (editorial); HDRI 1k–2k |
| Audio | Muted-first, gesture-gated, global mute, lazy-loaded library | Media Engagement Index can allow sound | Sound autoplay only for home-screen sites |

## Images

**Cited** ([web.dev Learn Images: AVIF](https://web.dev/learn/images/avif)):

- AVIF is based on AV1 and aims for better perceptual quality at smaller sizes than JPEG or WebP. Netflix testing showed "significant reductions in file sizes".
- Support: Chrome and Opera since 2020, Firefox since 2021, Safari since 2022.
- JPEG XL is "not supported in any browser" and JPEG 2000 is Safari-only, per web.dev at the time of fetch.
- **Serving AVIF alone risks broken images, so provide fallbacks.** web.dev recommends Squoosh for experimenting with AVIF.
- Tools:
  - [Squoosh](https://squoosh.app/) (manual)
  - [sharp](https://sharp.pixelplumbing.com/) (build pipelines)
  - [TinyPNG](https://tinypng.com/)
  - [SVGOMG](https://jakearchibald.github.io/svgomg/) (SVG)

**Recipe.** This is a synthesis in the notes; web.dev's responsive-images module was not fetched.

| Step | Desktop | Mobile |
|---|---|---|
| Encode | AVIF, then WebP, then JPEG/PNG with sharp or Squoosh | Same |
| Markup | `<picture>` with `srcset` widths of roughly 400–2400 px and accurate `sizes` | Same markup; the browser picks the smaller candidates |
| Priority | `fetchpriority="high"` on the LCP hero | Same. Especially important on slower networks |
| Lazy-loading | `loading="lazy"` below the fold | Same |
| Decorative graphics | SVG (SVGOMG-minified) for patterns, blobs and waves. Haikei and Hero Patterns output SVG | Tiny on mobile |

```html
<picture>
  <source type="image/avif" srcset="hero-800.avif 800w, hero-1600.avif 1600w, hero-2400.avif 2400w" sizes="100vw">
  <source type="image/webp" srcset="hero-800.webp 800w, hero-1600.webp 1600w, hero-2400.webp 2400w" sizes="100vw">
  <img src="hero-1600.jpg" alt="…" width="1600" height="900" fetchpriority="high">
</picture>
```

Editor's note: the snippet above shows the recipe and is not taken from a cited page. Add explicit `width`/`height` to reserve space.

## Video

**Cited** ([web.dev: video and source tags](https://web.dev/articles/video-and-source-tags); [web.dev: Replace GIFs with videos](https://web.dev/articles/replace-gifs-with-videos)):

- Use multiple `<source>` elements in preference order. The browser plays the **first** format it supports, not the most efficient one.
- Always set `type`. The server must send correct MIME types.
- Use an optimised `poster`, which costs one extra request.
- `preload` (`none`/`metadata`/`auto`) is only a hint. **Chrome buffers about 25 s on desktop and none on iOS/Android.**
- Media fragments (`#t=start,end`) need `Accept-Ranges: bytes`.
- Use `max-width: 100%`, preserve the aspect ratio, and use responsive iframe wrappers.
- GIF → video: an example 3.7 MB GIF became a 551 KB MP4 or a 341 KB WebM. Use `<video autoplay loop muted playsinline>` and list WebM first. The ffmpeg commands are in [video.md](video.md#3-replacing-gifs-with-video).
- Muted autoplay is always allowed in Chrome ([Chrome autoplay policy](https://developer.chrome.com/blog/autoplay)).

**Recipe** (inference; the AV1 ordering and the Save-Data/reduced-motion advice are not from fetched pages):

| Setting | Desktop | Mobile |
|---|---|---|
| Resolution | 1080p | 720p |
| Length | 5–15 s, muted | 5–15 s, muted |
| Sources | AV1 or VP9 WebM, then H.264 MP4 | Same |
| `preload` | `none` or `metadata` | `none` or `metadata` (Chrome won't buffer anyway) |
| Reduced motion / Save-Data / small screens | Static poster | Swap in a static poster via `<source media>` or JS |

## Fonts

**Cited** ([web.dev font best practices](https://web.dev/articles/font-best-practices); [Fontaine](https://github.com/unjs/fontaine); [Capsize](https://seek-oss.github.io/capsize/)):

- Inline `@font-face` and critical CSS in `<head>`, but not the font files.
- Preconnect to third-party font origins with `crossorigin`.
- Preload sparingly. Preload ignores `unicode-range` and takes bandwidth from other resources.
- "Use only WOFF2". It is about 30% smaller than WOFF.
- Subset with `unicode-range` (subfont, glyphhanger). Check that the licence allows subsetting.
- Self-hosting "isn't automatically faster"; test it.
- A variable file can be larger than one static font.
- Consider `system-ui`.
- `font-display`: `optional` for performance and no shift, `swap` for branding. `size-adjust` reduces CLS.
- Fontaine generates metric-override fallbacks. Its playground showed CLS dropping from **0.24 to 0.054**.
- Capsize trims the space above caps and below the baseline.
- Delivery options: Fontsource (npm self-hosting, version pinning, offline/PWA, privacy) or Bunny Fonts (privacy CDN, Google CSS v1 compatible).

**Recommended stack** (inference):

| Setting | Desktop | Mobile |
|---|---|---|
| Files | Keep to two families + optional mono | **At most 2 variable WOFF2 files**, Latin subset |
| Body `font-display` | `optional` (or `swap` + Fontaine fallback metrics) | `optional` |
| Preload | Only the LCP headline font | **Only the LCP headline font** |
| CLS | `next/font` or Fontaine-style overrides | Same; keep CLS near zero |

Details and a sample `@font-face` are in [fonts.md](fonts.md#7-web-font-performance).

## Icons

**Cited** ([Tabler guide](https://tabler.io/guides/how-to-use-svg-icons-in-react); [unplugin-icons](https://github.com/unplugin/unplugin-icons); [web.dev](https://web.dev/articles/font-best-practices); [Simple Icons](https://github.com/simple-icons/simple-icons)):

- Tree-shakable component library with named imports.
- **Avoid `Icons[name]` lookups and barrel re-exports.**
- Sprites (`<use href>`) "for pages with thousands of icon instances". Split fat sprites.
- unplugin-icons compiles only the icons you use and supports SSR with no flash of unstyled content.
- Replace icon fonts with SVG (Material Symbols is the variable-font exception).
- Pin `cdn.simpleicons.org` versions, because `@latest` can 404.
- No rigorous public benchmark was found.

**Recommended stack** (inference):

| Setting | Desktop | Mobile |
|---|---|---|
| Typical UI | One set via package / unplugin-icons; `currentColor` | Same |
| Data-driven icons | Typed explicit icon map | Same |
| Lists/tables with hundreds of icons | Sprite optional | **Build-generated sprite** (`<svg><use href="/sprite.svg#id"/></svg>`) to avoid hydration and DOM cost |
| Rarely used icons | Lazy-load | Lazy-load |

## Animated icons and Lottie/Rive

- useAnimations ships **static SVG fallbacks** "useful where nothing should move" ([useAnimations](https://useanimations.com/)).
- `line-md` animated SVGs need **no runtime** ([Iconify](https://api.iconify.design/collections)).
- Lordicon's CDN embed is capped at **1M requests/month** ([Lordicon licenses](https://lordicon.com/licenses)).
- Inference: gate animated icons behind `prefers-reduced-motion` and lazy-load the Lottie and Rive players. Those runtimes are heavy compared with SVG; their sizes were not verified.

## 3D

**Cited** ([glTF Transform CLI](https://gltf-transform.dev/cli)):

- Run `gltf-transform inspect input.glb` first.
- Then run `gltf-transform optimize input.glb output.glb --compress draco --texture-compress webp`.
- Individual commands are available for geometry (draco, meshopt, simplify, weld, quantize), scene (instance, join, flatten, center), package (dedup, prune, gzip) and texture (resize, webp, avif, png, jpeg, etc1s, uastc, ktxdecompress, ktxfix).
- Inspect results with [glTF Report](https://gltf.report/) or [glTF Viewer](https://gltf-viewer.donmccurdy.com/).

**Recipe** (inference; size budgets editorial):

| Setting | Desktop | Mobile |
|---|---|---|
| Container | GLB | GLB |
| Geometry | Meshopt (fast decode, good for animation) or Draco (smallest static) | Same |
| Textures | KTX2 UASTC for normal maps and high-quality textures; ETC1S for colour maps; WebP if KTX2 decoders are unavailable | Same |
| Hero model size | n/a | **~2–5 MB max** |
| HDRI | 1k–2k (Poly Haven) | 1k–2k |

More in [3d-models-textures.md](3d-models-textures.md#4-optimising-gltfglb-for-the-web).

## Audio

**Cited** ([Chrome autoplay policy](https://developer.chrome.com/blog/autoplay); [use-sound](https://github.com/joshwcomeau/use-sound)):

- Muted autoplay is always allowed.
- Sound autoplay needs one of:
  - prior user interaction;
  - the desktop Media Engagement Index (>7 s unmuted playback in an active tab, video >200×140);
  - a mobile home-screen install, or an installed desktop PWA;
  - iframe delegation.
- Since Chrome 71, an AudioContext created before a gesture starts **suspended**. Call `resume()` after a click.
- use-sound adds <1 kB gzipped and loads Howler (~10 kB, ~9 kB gzipped) asynchronously. Sounds triggered before it loads are silently skipped. It has a global mute (`soundEnabled`) and audio sprites.

**Recipe** (inference):

| Setting | Desktop | Mobile |
|---|---|---|
| Autoplay | Never with sound; play after a gesture | Same (sound autoplay only for home-screen sites) |
| Library | Lazy-load use-sound/Howler plus one audio sprite | Same; the sprite reduces requests |
| Volume | ~0.25–0.5 | ~0.25–0.5 |
| Mute | Global, persisted | Global, persisted |
| Accessibility | Never convey information by sound alone | Same |

## Gaps

- web.dev's responsive-images and `<picture>` guidance, and MDN's `<video>`/autoplay pages, were not fetched.
- AV1 video browser support (caniuse) was not verified this session.
- No cited source was consulted on Save-Data or `prefers-reduced-motion` handling for video and sound, or on WCAG audio guidance (SC 1.4.2 Audio Control).
- No controlled benchmark of inline components vs sprites vs icon fonts was found.
- The runtime sizes of lottie-web, dotLottie and the Rive web runtime were not retrieved.
- `gltf-transform optimize` defaults are undocumented on the CLI page; check `optimize -h`. No authoritative page on KTX2 ETC1S vs UASTC trade-offs was found.

## Sources

- web.dev Learn Images, AVIF: https://web.dev/learn/images/avif
- web.dev, video and source tags: https://web.dev/articles/video-and-source-tags
- web.dev, Replace GIFs with videos: https://web.dev/articles/replace-gifs-with-videos
- web.dev font best practices: https://web.dev/articles/font-best-practices
- Chrome autoplay policy: https://developer.chrome.com/blog/autoplay
- Fontaine: https://github.com/unjs/fontaine · Capsize: https://seek-oss.github.io/capsize/
- Tabler guide: https://tabler.io/guides/how-to-use-svg-icons-in-react · unplugin-icons: https://github.com/unplugin/unplugin-icons · Simple Icons: https://github.com/simple-icons/simple-icons
- useAnimations: https://useanimations.com/ · Iconify API: https://api.iconify.design/collections · Lordicon licenses: https://lordicon.com/licenses
- glTF Transform CLI: https://gltf-transform.dev/cli · glTF Report: https://gltf.report/ · glTF Viewer: https://gltf-viewer.donmccurdy.com/
- use-sound: https://github.com/joshwcomeau/use-sound
- Squoosh: https://squoosh.app/ · sharp: https://sharp.pixelplumbing.com/ · TinyPNG: https://tinypng.com/ · SVGOMG: https://jakearchibald.github.io/svgomg/
