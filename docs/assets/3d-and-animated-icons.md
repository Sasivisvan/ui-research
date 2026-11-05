# 3D and Animated Icons

This page covers 3D icons, 3D illustration renders and the tools that produce them (Spline, Vectary). It also covers animated icon sources: LottieFiles, Lordicon, useAnimations, lucide-animated, itshover, Rive and animated SVG (`line-md`). Licences come from official pages and the [Iconify collections API](https://api.iconify.design/collections), as of 5 Nov 2026. Several animated-icon sources look free but require credit (Lordicon free, Rive community). One 3D source has an unclear licence (Thiings). Flat icon sets are on [icons.md](icons.md), and full 3D models and textures are on [3d-models-textures.md](3d-models-textures.md). Motion implementation patterns are in [../animations/](../animations/README.md).

## Contents

- [1. 3D icons and 3D illustration renders](#1-3d-icons-and-3d-illustration-renders)
- [2. 3D creation and embedding tools](#2-3d-creation-and-embedding-tools)
- [3. Animated icons](#3-animated-icons)
- [4. Implementation notes](#4-implementation-notes)
- [5. Gaps](#5-gaps)
- [Sources](#sources)

## 1. 3D icons and 3D illustration renders

| Source | What it offers | Size | Formats | Licence | Attr | Free / paid | Quality / aesthetic | Status |
|---|---|---|---|---|---|---|---|---|
| [3dicons](https://3dicons.co/) (Vijay Verma / @realvjy) | "More than 1500+ hand made Open Source, Free & Premium 3d icons renders". Figma file and plugin. A Pro editor changes colours and angles | Stats: 200 icons, 1,400+ renders | Renders, Figma. **Source-file formats (Blend, GLB) not confirmed on the page** | **CC0** ("without attribution") | No | Free. The Pro editor is paid | Hand-made 3D | Live |
| [Thiings](https://www.thiings.co/things) (Charlie Clark) | "Free AI-Generated 3D Icons" | 13,000+ | PNG renders | **Unclear and conflicting.** Secondary sources say commercial use is allowed with no attribution, but resale and redistribution are not. One listing claims CC0, which contradicts the resale restriction ([feedbagel](https://feedbagel.com/post/thiings-launches-free-collection-of-7000-ai-generated-3d-icons), [ProductCool](https://www.productcool.com/product/thiings-2)) | Unclear | Free. Full pack about **$29** | AI-generated, so check copyright and provenance | Live. **Avoid for commercial work until the licence is clarified** |
| [Shapefest](https://www.shapefest.com/) | "Over 100,000 3D renders" of abstract shapes | 100,000+ | Free packs at 512×512. The 3000×3000 versions are paid | Custom. Personal and commercial use allowed. **Editing and reselling as your own is not allowed.** An Extended License covers UI kits | Not stated | Free 512px / paid hi-res | Abstract 3D shapes | Appears active (dated March 2026) |
| [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) | Each emoji has **3D (PNG)**, Color (SVG), Flat (SVG) and High Contrast (SVG) folders | Iconify: Fluent Emoji (color) 3,126, Flat 3,145, High Contrast 1,595 | PNG (3D), SVG | **MIT** | No | Free | Friendly, glossy 3D. Very widely used on landing pages | Live. About 10.2k stars; last pushed Aug 2026 |
| [IconScout 3D](https://iconscout.com/Free-3d-illustrations) | Large 3D icon and illustration library | Part of 14.4M+ assets | Varies | **Varies per asset.** Free assets generally require attribution; Premium removes it | **Free: generally yes** | Freemium | Stock | Live; licence page returned 403 |
| [Icons8](https://icons8.com) 3D / "glass" styles | In-house 3D styles | n/a | Raster | Free tier requires a link to Icons8; paid removes it (see [icons.md](icons.md#4-aggregators-and-marketplaces)) | **Free: yes** | Freemium | The 3D and "glass" styles look stock | Live; licence page returned 403 |
| [Blush](https://blush.design) 3D collections | 3D collections among its illustration sets | n/a | Varies | Blush licence: free, no attribution, commercial OK, no resale or redistribution (see [illustrations.md](illustrations.md)) | No | Free + paid plans | Artist collections | Live |

## 2. 3D creation and embedding tools

| Tool | Plans and pricing | Export / licence notes | Risk | Status |
|---|---|---|---|---|
| [Spline](https://spline.design/pricing) | **Free $0** (watermark on web exports). **Hobby $15/seat/month** (no watermark on 3D web exports). **Pro $30/seat/month** (Code Export, USDZ/STL, glTF with textures, Apple/Android exports). **Max $70.** **Enterprise** adds self-hosted export | The community-file remix licence is **not stated** on the pricing page | Watermark on the free tier | Live |
| [Vectary](https://www.vectary.com/pricing/) | **Free:** 5 projects, 1 seat. **Starter $25/month.** Team and Business tiers | When a subscription is cancelled, **the workspace locks and public links and embeds stop working** | **Lock-in risk** for embedded 3D on a production site | Live |

## 3. Animated icons

| Source | What it offers | Size | Formats | Licence | Attr | Free / paid | Quality / aesthetic | Status |
|---|---|---|---|---|---|---|---|---|
| [LottieFiles](https://lottiefiles.com/page/license) | Community Lottie animations | n/a | Lottie JSON / dotLottie | Free animations: **"Lottie Simple License (FL 9.13.21)"** © Design Barn Inc. **Commercial use allowed; attribution not required.** You may not compile files into a similar or competing service or impose additional terms | No | Free + paid | Quality varies a lot by creator | Live |
| [Lordicon](https://lordicon.com/licenses) | Animated icon library | **49,000+** icons | Lottie JSON, static formats, Embed HTML/CDN | **Free plan: attribution required ("credit needed")**; commercial use allowed. **PRO:** no attribution, time-limited | **Free: yes** | Free / PRO | Polished, but highly recognisable "Lordicon motion" | Live. Embed HTML/CDN capped at **1M requests/month** |
| [useAnimations](https://useanimations.com/) | Micro-animations with `react-useanimations` and shadcn CLI support. Modes: loop, click-toggle, hover and others | ~300 | Lottie JSON plus **static SVG fallbacks** | **MIT.** Commercial use allowed; attribution optional | No | Free | n/a | Live |
| [lucide-animated](https://github.com/pqoqubbw/icons) (lucide-animated.com) | Animated Lucide-style icons. Ships a `registry.json`, which suggests the shadcn registry install method | n/a | React components | **MIT** | No | Free | Matches Lucide | Live. About 8.3k GitHub stars |
| [itshover](https://github.com/Nani-LM10/itshover) (itshover.com) | Hover-animated React icons built with React and Motion (`motion/react`). Install via the shadcn CLI or by copying components | 186+ | React components | **MIT** | No | Free | n/a | Live. **No official releases yet, so pin a commit** ([BrightCoding review](https://blog.brightcoding.dev/2026/05/04/itshover-the-animated-icon-library-every-react-developer-needs)) |
| [Rive community / Marketplace](https://www.rive.app/docs/community/marketplace-overview) | Community interactive animations, remixable into your own account ([community overview](https://rive.app/docs/community/community-overview)) | n/a | `.riv` | "Marketplace files are all shared under a **CC BY** license" | **Yes** | Free | n/a | Live |
| Material Line Icons (`line-md`) | SMIL/CSS-animated SVG icons. **No JS runtime needed** | 1,218 | SVG | **MIT** ([Iconify](https://api.iconify.design/collections)) | No | Free | Line icons | Iconify API |
| SVG Spinners | Animated loading spinners | 46 | SVG | **MIT** ([Iconify](https://api.iconify.design/collections)) | No | Free | n/a | Iconify API |
| [IconScout](https://iconscout.com/pricing) Lottie | Lottie animations within 14.4M+ assets | n/a | Lottie | Varies per asset. Free assets generally require attribution | **Free: generally yes** | Freemium | Stock | Live; licence page returned 403 |

## 4. Implementation notes

- **Static fallbacks.** useAnimations ships static SVG fallbacks, "useful where nothing should move" ([useAnimations](https://useanimations.com/)).
- **Runtime-free option.** `line-md` animated SVGs need no runtime ([Iconify](https://api.iconify.design/collections)).
- **CDN caps.** Lordicon's CDN embed is capped at 1M requests per month ([Lordicon licenses](https://lordicon.com/licenses)). High-traffic sites should self-host the Lottie JSON (paid tier, to drop attribution).
- **Reduced motion and lazy loading (inference in notes).** Gate animated icons behind `prefers-reduced-motion`. Lazy-load the Lottie and Rive players, because their runtimes are heavy compared with SVG. Their sizes were not verified.
- **Trend context.** *Fast Company* (2022) reported a return toward 3D and skeuomorphism, away from flat Corporate Memphis ([Wikipedia: Corporate Memphis](https://en.wikipedia.org/wiki/Corporate_Memphis)). Fluent Emoji 3D is now very widely used on landing pages, so it is no longer distinctive.

> Editor's note: where an icon should only move on hover or click, a Motion-based React component (itshover, lucide-animated) or a CSS/SMIL SVG (`line-md`) avoids shipping a Lottie or Rive runtime at all. Reserve Lottie and Rive for illustrative animations that justify the weight.

## 5. Gaps

- The runtime sizes of lottie-web, dotLottie and the Rive web runtime were not retrieved.
- 3dicons' downloadable source formats (Blender, GLB) were not confirmed on the page.
- "Superhi 3D" could not be identified as a current resource.
- The licences of Figma Community 3D packs and Spline community remixes were not verified.
- The Thiings licence is unclear and conflicting across secondary sources.

## Sources

- 3dicons: https://3dicons.co/
- Thiings: https://www.thiings.co/things · feedbagel: https://feedbagel.com/post/thiings-launches-free-collection-of-7000-ai-generated-3d-icons · ProductCool: https://www.productcool.com/product/thiings-2
- Shapefest: https://www.shapefest.com/
- Microsoft Fluent Emoji: https://github.com/microsoft/fluentui-emoji
- IconScout free 3D: https://iconscout.com/Free-3d-illustrations · IconScout pricing: https://iconscout.com/pricing
- Spline pricing: https://spline.design/pricing
- Vectary pricing: https://www.vectary.com/pricing/
- LottieFiles license: https://lottiefiles.com/page/license
- Lordicon licenses: https://lordicon.com/licenses
- useAnimations: https://useanimations.com/
- lucide-animated: https://github.com/pqoqubbw/icons
- itshover: https://github.com/Nani-LM10/itshover · review: https://blog.brightcoding.dev/2026/05/04/itshover-the-animated-icon-library-every-react-developer-needs
- Rive marketplace overview: https://www.rive.app/docs/community/marketplace-overview · community overview: https://rive.app/docs/community/community-overview
- Iconify collections API: https://api.iconify.design/collections
- Wikipedia, Corporate Memphis: https://en.wikipedia.org/wiki/Corporate_Memphis
