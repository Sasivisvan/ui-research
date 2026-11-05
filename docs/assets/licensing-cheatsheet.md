# Asset Licensing Cheatsheet

> **Licences change — re-check the official licence page before shipping. Status as of 5 Nov 2026.**

This page gathers every resource from the two asset research notes into one place: icons, illustrations, fonts, photos, video, sound, 3D, mockups, design tools and inspiration galleries. For each resource it gives the exact licence name, whether attribution is required, whether commercial use is allowed, the key restrictions, the live/redirect status, and how the licence was verified. The topic pages ([icons.md](icons.md), [fonts.md](fonts.md), [photos.md](photos.md) and others) hold the full context and quotations. Use this page as a pre-ship checklist. "Unreachable-from-research-env" means a page was blocked (403/429 bot check) or timed out during research. **That is not evidence the site shut down.**

## Contents

- [Licence types explained](#licence-types-explained)
- [Biggest gotchas and recent changes](#biggest-gotchas-and-recent-changes)
- [Key and column meanings](#key-and-column-meanings)
- [1. UI and vector icon sets](#1-ui-and-vector-icon-sets)
- [2. Icon aggregators and marketplaces](#2-icon-aggregators-and-marketplaces)
- [3. Brand and logo icons](#3-brand-and-logo-icons)
- [4. 3D icons, renders and 3D tools](#4-3d-icons-renders-and-3d-tools)
- [5. Animated icons](#5-animated-icons)
- [6. Illustrations](#6-illustrations)
- [7. Fonts: sources and foundries](#7-fonts-sources-and-foundries)
- [8. Photos](#8-photos)
- [9. Museum, archive and public domain](#9-museum-archive-and-public-domain)
- [10. Video](#10-video)
- [11. Sound effects and UI sounds](#11-sound-effects-and-ui-sounds)
- [12. 3D models, textures, HDRIs](#12-3d-models-textures-hdris)
- [13. Code libraries and dev tooling](#13-code-libraries-and-dev-tooling)
- [14. Mockups](#14-mockups)
- [15. Design tools (licence not researched)](#15-design-tools-licence-not-researched)
- [16. Inspiration galleries (licence not applicable)](#16-inspiration-galleries-licence-not-applicable)
- [Sources](#sources)

## Licence types explained

| Licence | What it means for a commercial website | Attribution | Examples in this folder |
|---|---|---|---|
| **CC0 1.0** (Creative Commons Zero) | Public-domain dedication. Use, modify and redistribute for any purpose. **It grants no trademark rights**: brand logos under CC0 (Simple Icons, SVG Logos) are still trademarks | No | Simple Icons, 3dicons, Open Peeps, Humaaans, Open Doodles, StockSnap, ISO Republic, Nappy, Poly Haven, ambientCG, Kenney, Quaternius, Met/Smithsonian open access |
| **CC BY** (3.0 / 4.0) | Commercial use and modification allowed, **but you must credit** the author, give the licence and a link, and note changes. A credits page or embedded comments are common ways to comply | **Yes** | Font Awesome Free icons, Solar, Streamline free sets, Basil, IconaMoon, Lets Icons, Pepicons, Codicons, Twemoji, Game Icons (3.0), Noun Project free, Rive Marketplace, Freesound CC BY files, Poly Pizza (Google Poly archive), Fab CC-BY, itch.io UI packs |
| **CC BY-SA** | Like CC BY, plus **share-alike**: derivatives must use the same licence | Yes | OpenMoji (CC BY-SA 4.0). Sketchfab CC BY-SA (not migrated to Fab) |
| **CC BY-NC** | **Non-commercial only.** Freesound: you "can't earn any money with the piece of work you create!" | Yes | Freesound CC BY-NC 4.0 files. Sketchfab CC BY-NC (not migrated). Openverse `by-nc*` items |
| **CC BY-ND** | No derivatives | Yes | Sketchfab CC BY-ND (not migrated). Openverse `by-nd` items |
| **Sampling+ 1.0** | A legacy CC licence, now retired. **Not allowed in commercial advertising** | Yes | Freesound legacy files |
| **SIL OFL 1.1** (Open Font License) | Fonts free to use, embed and self-host commercially. **You may not sell the fonts by themselves.** Reserved Font Names restrict renaming modified versions | No visible credit required (Collletttivo *asks* for credit) | Most Google Fonts, Collletttivo, League of Moveable Type, Font Awesome fonts (RFN "Font Awesome") |
| **MIT** | Permissive. Keep the copyright and licence notice in copies of the code or files. No visible on-page credit is needed | Notice in copies | Phosphor, Tabler, Heroicons, Iconoir, Bootstrap, Fluent, Hugeicons free, useAnimations, lucide-animated, itshover, Fluent Emoji, IRA Design, SVGL, Devicon, unplugin-icons, Fontaine, use-sound |
| **ISC** | Functionally equivalent to MIT. Keep the copyright and permission notice in copies | Notice in copies | Lucide |
| **Apache-2.0** | Permissive, with a patent grant. Keep the licence and NOTICE files in redistributions | Notice in copies ("appreciated but not required" for Material Symbols) | Material Symbols, Material Design Icons (mdi), Carbon, MingCute, IconPark, Unicons, Remix Icon ≤ v4.8 |
| **MPL-2.0** | File-level copyleft. Modified licensed files must stay MPL | Notice | Circum |
| **Unlicense** | Public-domain-style | No | System UIcons |
| **Custom "free" licences** | Usually free for commercial use with no credit, **but** they ban some combination of standalone resale, redistribution as stock or packs, competing services, merchandise, logos, templates, and **AI/ML training**. Read each one | Usually no | Unsplash, Unsplash+, Pexels, Pixabay, Coverr, Mixkit, Gratisography, Barnimages, Kaboompics, Burst, unDraw, DrawKit, Blush, ManyPixels, Storyset, LottieFiles (Lottie Simple License), Remix Icon License v1.0, ITF Free Font License (Fontshare), Sonniss, BBC RemArc, Shapefest, Zapsplat |
| **Commercial / subscription** | Paid licence. Terms are often tied to pageviews, seats or a subscription period | No (paid tier) | Hugeicons Pro, Streamline Pro, Central, Pangram Pangram, Displaay, Lordicon PRO, Fab Standard (paid) |

## Biggest gotchas and recent changes

| Resource | Gotcha / change |
|---|---|
| **Remix Icon** | Moved to the custom **"Remix Icon License v1.0" (January 2026)**. It bans logo or brand-identity use, competing icon libraries and standalone sales. Iconify still lists Apache 2.0 (v4.8.0). v4.8 and earlier are Apache-2.0 |
| **Font Awesome Free** | Icons **CC BY 4.0** (credit required; keep the embedded comments). Fonts OFL 1.1. Code MIT |
| **Solar, Streamline free, Basil, IconaMoon, Lets Icons, Pepicons, Codicons, Twemoji** | CC BY 4.0, so **attribution required**. Third-party Solar npm wrappers claiming MIT/GPL/ISC do not change the upstream licence |
| **OpenMoji** | CC BY-SA 4.0, **share-alike** |
| **SF Symbols** | Licence text not retrievable. **Treat as not safe for websites** |
| **Absurd Design** | Free licence is **NON-COMMERCIAL ONLY**. Exact credit required. No AI training |
| **unDraw, DrawKit** | Free, no credit, but **no AI/ML training**, no packs or redistribution |
| **Pangram Pangram** | **Personal-use trials only.** The web licence is priced by monthly pageviews |
| **Muzli "free trendy fonts 2026"** | Mostly personal-use or unstated-licence fonts |
| **Fontshare (ITF FFL)** | "Not open-source", controlled by an ITF EULA, but free for commercial use. Self-hosting of raw files is disputed; the licence page could not be fetched |
| **Thiings** | Licence unclear and conflicting; AI-generated |
| **Lordicon free, Rive Marketplace, Storyset free, Icons8 free, Flaticon free, Noun Project free, IconScout free, Zapsplat Basic** | Credit required |
| **Reshot** | **Retired in Jan 2026.** Earlier downloads keep their licence |
| **Coverr** | **Dropped CC0.** Now a custom licence; **no AI training/fine-tuning/distillation/evaluation**; Free Demo API apps must credit |
| **Unsplash+** | Appears inside normal Unsplash search. **No use in digital templates, ML, AI or biometric tracking**; sensitive-topic disclaimer required |
| **Pexels** | ML/AI dataset collection via the API needs explicit permission. The licence page could not be fetched |
| **Kaboompics "Editorial Use Only"** | Not for advertising, packaging or brand marketing |
| **Mixkit Stock Video Restricted License** | Personal, non-commercial only |
| **Videvo, Mazwai** | Now 301 → Freepik Videos. Mazwai's CC 3.0 clips required attribution |
| **Freesound** | **Per-file licence.** CC BY-NC and Sampling+ are not safe for commercial use |
| **BBC Sound Effects (RemArc)** | **Non-commercial** (personal, educational, research). Not in music you sell |
| **Sonniss GDC bundles** | No attribution, but **AI/ML training "strictly prohibited"**. No GDC 2025 bundle |
| **Sketchfab → Fab** | Only CC BY and Standard migrate. **CC BY-SA, CC BY-NC, CC BY-ND and Editorial do not**, CC0 handling is unclear, and .dae cannot be ported. Non-migrated models become non-downloadable |
| **Fab CC-BY** | Engadget claimed it is Unreal-only; this conflicts with CC BY. Verify against the Fab EULA |
| **Poly Haven** | Assets CC0, but site content is not CC0 and **scraping or data mining is banned** without permission |
| **Vectary** | Cancelling locks the workspace and **breaks public embeds** |
| **Material Design sound resources** | No confirmed licence. Do not assert CC BY 4.0 |
| **Templates and themes** | Bundling stock images in a distributed template is a redistribution risk. Use CC0 or placeholders |

## Key and column meanings

- **Attr:** attribution legally required in the product. **Notice** = keep the licence notice in distributed copies (MIT/ISC/Apache), with no visible credit.
- **Commercial:** Y = allowed; N = not allowed; Per-file = varies by asset.
- **Status:** Live · Redirected · Rebranded · Retired / Shut down · Parked · Unavailable · Unreachable-from-research-env (blocked or timed out; not evidence of shutdown) · Uncertain.
- **Verification:**
  - **Official page** = the official licence or terms page was read.
  - **Repo** = the official GitHub LICENSE file or README.
  - **Iconify API** = the licence field from api.iconify.design/collections.
  - **API** = a live API pull (Google Fonts, Fontshare).
  - **Secondary** = search snippets or third-party sources.
  - **Not verified** = no licence read.

## 1. UI and vector icon sets

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Lucide | [lucide.dev](https://lucide.dev/license) | UI icons | ISC License. Some Feather-derived icons MIT (© Cole Bemis) | Notice | Y | Keep the copyright and permission notice in copies | Live | Official page |
| Lucide Lab | [lucide.dev](https://lucide.dev) | UI icons (373) | n/a in notes | n/a | n/a | n/a | Live | Iconify API (count only) |
| Phosphor | [phosphoricons.com](https://github.com/phosphor-icons/homepage) | UI icons | MIT | Notice | Y | None | Live | Repo |
| Tabler Icons | [tabler.io/icons](https://tabler.io/icons) | UI icons | MIT ("Free for personal and commercial use") | Notice | Y | Paid add-ons ($9 Bundle / $69 All Package) separate | Live | Official page |
| Heroicons | [heroicons.com](https://github.com/tailwindlabs/heroicons) | UI icons | MIT | Notice | Y | None | Live | Repo |
| Remix Icon | [remixicon.com](https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/License) | UI icons | **Remix Icon License v1.0 (January 2026)**; ≤ v4.8 Apache-2.0 | Optional | Y | **No logo, trademark, brand identifier or primary visual identity use**; no standalone sales or packs; no competing libraries; brand icons only for their brand | Live | Official licence file (Iconify still shows Apache 2.0) |
| Iconoir | [iconoir.com](https://github.com/iconoir-icons/iconoir) | UI icons | MIT | Notice | Y | None | Live | Repo |
| Radix Icons | n/a | UI icons | MIT | Notice | Y | None | Live | Iconify API |
| Feather | [feathericons.com](https://feathericons.com) | UI icons | MIT | Notice | Y | Superseded by Lucide | Live | Iconify API |
| Bootstrap Icons | [icons.getbootstrap.com](https://icons.getbootstrap.com/) | UI icons | MIT | Notice | Y | None | Live | Iconify API |
| Material Symbols | [github.com/google/material-design-icons](https://github.com/google/material-design-icons) | Variable icon font / SVG | Apache License 2.0 | No ("appreciated but not required") | Y | None | Live | Repo |
| Material Icons (classic) | same | Icon font | Apache 2.0 | No | Y | "No longer updated" | Legacy | Repo |
| Material Design Icons (mdi, Pictogrammers) | n/a | UI icons | Apache 2.0 | Notice | Y | None | Live | Iconify API |
| Font Awesome Free | [fontawesome.com](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/LICENSE.txt) | Icons / font / code | **Icons CC BY 4.0; fonts SIL OFL 1.1 (RFN "Font Awesome"); code MIT** | **Y** (keep the embedded comments) | Y | Brand icons only for their brand | Live | Official LICENSE |
| Font Awesome Pro | fontawesome.com | Icons | Commercial | n/a | Y | Pricing not verified | Live | Not verified |
| Hugeicons Free | [hugeicons.com](https://hugeicons.com/pricing) | UI icons | MIT | Notice | Y | Stroke Rounded only | Live | Iconify API |
| Hugeicons Pro / Pro Plus | [hugeicons.com/pricing](https://hugeicons.com/pricing) | UI icons | Commercial ($99/yr; $1,197 one-time) | No | Y | Pro: 1 seat, CDN capped at 300K pageviews / 2GB bandwidth | Live | Official page |
| Streamline free sets (Streamline, Plump free, Ultimate free) | [streamlinehq.com](https://home.streamlinehq.com/pricing) | UI icons | CC BY 4.0 | **Y** | Y | None beyond credit | Live | Iconify API |
| Streamline Pro | [streamlinehq.com](https://home.streamlinehq.com/pricing) | Icons / illustrations | Commercial subscription | No | Y | 100 icons or 50 illustrations per project | Live | Official page |
| Central Icon System | [iconists.co/central](https://iconists.co/central) | UI icons | Commercial, licence-key gated | n/a | Y (paid) | Requires `CENTRAL_LICENSE_KEY`; price not verified | Live | Secondary (unpkg README) |
| Solar | [github.com/480-Design/Solar-Icon-Set](https://github.com/480-Design/Solar-Icon-Set) | UI icons | CC BY 4.0 | **Y** | Y | npm wrappers claiming MIT/GPL-3.0/ISC don't override it | Live | Iconify API |
| Akar Icons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Eva Icons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| css.gg | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Ionicons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Fluent UI System Icons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Carbon | n/a | UI icons | Apache 2.0 | Notice | Y | None | n/a | Iconify API |
| SF Symbols | [developer.apple.com/sf-symbols](https://developer.apple.com/sf-symbols/) | System icons | **Not stated; not retrievable** | n/a | **Treat as N for web** | Reported restriction to Apple-platform apps/mockups (unverified) | Live | Not verified |
| MingCute | n/a | UI icons | Apache 2.0 | Notice | Y | None | n/a | Iconify API |
| Myna UI | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Material Line Icons (`line-md`) | n/a | Animated SVG icons | MIT | Notice | Y | None | n/a | Iconify API |
| Majesticons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Pixelarticons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| IconPark (ByteDance) | n/a | UI icons | Apache 2.0 | Notice | Y | None | n/a | Iconify API |
| Octicons (GitHub) | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| Famicons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| ProIcons | n/a | UI icons | MIT | Notice | Y | None | n/a | Iconify API |
| System UIcons | n/a | UI icons | Unlicense | No | Y | None | n/a | Iconify API |
| SVG Spinners | n/a | Animated spinners | MIT | Notice | Y | None | n/a | Iconify API |
| Unicons (IconScout) | n/a | UI icons | Apache 2.0 | Notice | Y | None | n/a | Iconify API |
| Basil | n/a | UI icons | CC BY 4.0 | **Y** | Y | Credit | n/a | Iconify API |
| IconaMoon | n/a | UI icons | CC BY 4.0 | **Y** | Y | Credit | n/a | Iconify API |
| Lets Icons | n/a | UI icons | CC BY 4.0 | **Y** | Y | Credit | n/a | Iconify API |
| Pepicons | n/a | UI icons | CC BY 4.0 | **Y** | Y | Credit | n/a | Iconify API |
| Codicons | n/a | UI icons | CC BY 4.0 | **Y** | Y | Credit | n/a | Iconify API |
| Game Icons | n/a | Icons | CC BY 3.0 | **Y** | Y | Credit | n/a | Iconify API |
| OpenMoji | n/a | Emoji | **CC BY-SA 4.0** | **Y** | Y | **Share-alike** | n/a | Iconify API |
| Twemoji | n/a | Emoji | CC BY 4.0 | **Y** | Y | Credit | n/a | Iconify API |
| Circum | n/a | UI icons | MPL-2.0 | Notice | Y | File-level copyleft | n/a | Iconify API |

## 2. Icon aggregators and marketplaces

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Iconify | [iconify.design](https://api.iconify.design/collections) | Aggregator (276 sets, 473,655 icons) | **Per set** | Per set | Per set | Check each set's licence field | Live (docs reset connections) | API |
| SVG Repo | [svgrepo.com](https://svgrepo.com) | Aggregator | **Per icon** | Per icon | Per icon | n/a | Licence page 429 | Not verified |
| Icons8 | [icons8.com](https://icons8.com) | Icons / 3D / illustrations | Custom; free tier requires a link | **Y (free)** | Y | Free downloads limited in size and format; paid removes the link | Live; licence page 403 | Secondary |
| Flaticon (Freepik) | [flaticon.com](https://www.flaticon.com/pricing/1312618) | Icons | Custom; free requires attribution | **Y (free)** | Y | Premium removes attribution | Live; legal page 403 | Secondary |
| The Noun Project | [thenounproject.com](https://thenounproject.com/pricing/) | Icons and photos (10M) | Free: CC BY (some public domain). Paid: royalty-free | **Y (free)** | Paid: Y. **Free accounts: no royalty-free commercial licence** | n/a | Live; help page 403 | Official pricing + secondary |
| IconScout | [iconscout.com](https://iconscout.com/pricing) | Icons / illustrations / 3D / Lottie (14.4M+) | **Per asset** | **Generally Y (free)** | Y | Premium removes attribution | Live; licence page 403 | Secondary |

## 3. Brand and logo icons

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Simple Icons | [simpleicons.org](https://github.com/simple-icons/simple-icons) | Brand logos | CC0-1.0 (SVG paths) | No | Y | **Read DISCLAIMER.md; trademarks belong to the brands.** Pin versions (`@latest` can 404) | Live | Repo |
| SVGL | [svgl.app](https://github.com/pheralb/svgl) | Brand logos | MIT (project) | Notice | Y | **No blanket trademark grant** | Live | Repo |
| Devicon | [devicon.dev](https://devicon.dev/) | Dev-tool logos | MIT (© 2015 Konpa) | Notice | Y | Names and logos belong to their owners | Live | Official page |
| SVG Logos (Gil Barbara) | n/a | Logos | CC0 | No | Y | Trademark caveat | n/a | Iconify API |

## 4. 3D icons, renders and 3D tools

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| 3dicons | [3dicons.co](https://3dicons.co/) | 3D icons | CC0 ("without attribution") | No | Y | None | Live | Official page |
| Thiings | [thiings.co](https://www.thiings.co/things) | AI-generated 3D icons | **Unclear and conflicting** (one listing claims CC0) | Reportedly no | Reportedly Y | Reportedly no resale or redistribution; AI provenance | Live | Secondary |
| Shapefest | [shapefest.com](https://www.shapefest.com/) | 3D abstract renders | Custom; Extended License for UI kits | Not stated | Y | No editing and reselling as your own; hi-res is paid | Live (dated Mar 2026) | Official page |
| Microsoft Fluent Emoji | [github.com/microsoft/fluentui-emoji](https://github.com/microsoft/fluentui-emoji) | 3D PNG + SVG emoji | MIT | Notice | Y | None | Live | Repo |
| IconScout 3D | [iconscout.com](https://iconscout.com/Free-3d-illustrations) | 3D icons / illustrations | Per asset | **Generally Y (free)** | Y | Premium removes attribution | Live; licence page 403 | Secondary |
| Spline | [spline.design](https://spline.design/pricing) | 3D design tool | Subscription (Free / Hobby $15 / Pro $30 / Max $70 / Enterprise) | n/a | Y | Free tier watermarks web exports; community remix licence not stated | Live | Official pricing |
| Vectary | [vectary.com](https://www.vectary.com/pricing/) | 3D design tool | Subscription (Free / Starter $25 / Team / Business) | n/a | Y | **Cancelling locks the workspace and breaks embeds** | Live | Official pricing |

## 5. Animated icons

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| LottieFiles (free animations) | [lottiefiles.com](https://lottiefiles.com/page/license) | Lottie animations | **Lottie Simple License (FL 9.13.21)** © Design Barn Inc. | No | Y | No compiling into a similar or competing service; no additional terms | Live | Official page |
| Lordicon | [lordicon.com](https://lordicon.com/licenses) | Animated icons (49,000+) | Free plan / PRO (time-limited) | **Y (free)** | Y | CDN embed capped at 1M requests/month | Live | Official page |
| useAnimations | [useanimations.com](https://useanimations.com/) | Lottie micro-animations | MIT | Optional | Y | None | Live | Official page |
| lucide-animated | [github.com/pqoqubbw/icons](https://github.com/pqoqubbw/icons) | Animated React icons | MIT | Notice | Y | None | Live | Repo |
| itshover | [github.com/Nani-LM10/itshover](https://github.com/Nani-LM10/itshover) | Hover-animated React icons | MIT | Notice | Y | No releases; pin a commit | Live | Repo |
| Rive Marketplace / community | [rive.app](https://www.rive.app/docs/community/marketplace-overview) | Interactive animations | **CC BY** | **Y** | Y | Credit | Live | Official docs |

## 6. Illustrations

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| unDraw | [undraw.co](https://undraw.co/license) | Illustrations | Custom (unDraw license) | No | Y | **No AI/ML training/fine-tuning/validation/testing**; no competing service; no packs; no scraping | Live | Official page |
| Open Peeps | [openpeeps.com](https://www.openpeeps.com/) | Illustrations | CC0 | No | Y | None | Live | Official page |
| Humaaans | [humaaans.com](https://www.humaaans.com/) | Illustrations | CC0 | No | Y | None | Live | Official page |
| Open Doodles | [opendoodles.com](https://www.opendoodles.com/) | Illustrations | CC0 | No | Y | None | Live | Official page |
| Blush | [blush.design](https://blush.design/license) | Illustrations (incl. 3D) | Custom (Blush license) | No | Y | No resale or redistribution, merchandise, competing service or ownership claims | Live | Official page |
| DrawKit | [drawkit.com](https://www.drawkit.com/license) | Illustrations | Custom (DrawKit license) | No | Y | **No AI/ML training**; no redistribution, stock or template sites, or merchandise | Live | Official page |
| Storyset (Freepik) | [storyset.com](https://storyset.com/terms) | Illustrations | Custom (Storyset terms) | **Y (free)** | Y | Flaticon Premium removes credit; no resale or stock; no logos unless substantially modified | Live | Official page |
| ManyPixels Gallery | [manypixels.co/gallery](https://www.manypixels.co/gallery) | Illustrations | Custom | No | Y | No competing service; no packs | Live | Official page |
| IRA Design | [iradesign.io](https://iradesign.io/) | Illustration components | MIT | Notice | Y | None | Live | Official page |
| Absurd Design (free) | [absurd.design](https://absurd.design/freelicense) | Illustrations | Custom free licence, **NON-COMMERCIAL ONLY** | **Y** ("Illustration(s) from absurd.design" + link) | **N** | No client work, templates, themes or AI training. Paid membership needed for commercial use | Live | Official page |
| illlustrations.co | [illlustrations.co](https://illlustrations.co/) | Illustrations | **Not verified** | Unverified | Unverified | n/a | Live | Not verified |
| Lukasz Adam | [lukaszadam.com](https://lukaszadam.com/illustrations) | Illustrations | States "CC0 license (MIT license)", **which is ambiguous** | No | Y | Email for the ZIP | Live | Official page |
| Streamline Illustrations | [streamlinehq.com](https://home.streamlinehq.com/pricing) | Illustrations | Commercial subscription | No | Y | 50 per project | Live | Official pricing |
| Tabler Illustrations | [tabler.io](https://tabler.io/icons) | Illustrations | Commercial ($69 All Package) | n/a | Y | n/a | Live | Official page |
| Stubborn | stubborn.fun | Illustrations | n/a | n/a | n/a | n/a | **Connection refused; may be dead** | Not verified |
| Popsy | popsy.co | Illustrations | n/a | n/a | n/a | n/a | **Redirects to app.popsy.co/dashboard (HTTP 530); may be defunct or pivoted** | Not verified |
| Delesign | n/a | Free graphics | n/a | n/a | n/a | n/a | **Redirect loop** | Not verified |

## 7. Fonts: sources and foundries

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Google Fonts | [fonts.google.com](https://fonts.google.com/metadata/fonts) | Font library / CDN (1,959 families) | Open source, mostly SIL OFL | No | Y | OFL: no standalone sale | Live | API + secondary |
| Fontshare (ITF) | [fontshare.com](https://api.fontshare.com/v2/fonts?limit=200) | Font library (100 families) | **ITF Free Font License** (`itf_ffl`), plus some re-hosted SIL OFL | No | Y ("100% free for personal and commercial use") | "Not open-source", governed by the ITF EULA. Resale and redistribution reportedly prohibited; self-hosting of raw files disputed | Live; licence page JS-only | API + secondary |
| Bunny Fonts | [fonts.bunny.net](https://fonts.bunny.net/about) | Privacy font CDN | Per font | Per font | Per font | n/a | Live | Official page |
| Fontsource | [fontsource.org](https://fontsource.org/docs/getting-started/introduction) | npm self-hosting | Per font | Per font | Per font | n/a | Live | Official docs |
| Collletttivo | [collletttivo.it](https://www.collletttivo.it/licensing) | Open-source foundry (16 typefaces) | OFL | **Requested** (credit designer and foundry) | Y | Don't sell the fonts | Live | Official page |
| Velvetyne | [velvetyne.fr](https://velvetyne.fr/) | Libre foundry | Not readable | n/a | n/a | n/a | Live; **strike banner ("EN GRÈVE")** | Not verified |
| UNCUT.wtf | [uncut.wtf](https://uncut.wtf/) | Font catalogue (163) | Per font ("copyright of their respective creators") | Per font | "Free for commercial use" (check each) | n/a | Live | Official page |
| Use & Modify | [usemodify.com](https://usemodify.com/) | Font catalogue | Per font (OFL, Apache, MIT, GPL, CC…) | Per font | Per font | n/a | Live | Official page |
| League of Moveable Type | [theleagueofmoveabletype.com](https://www.theleagueofmoveabletype.com/) | Open-source foundry (18 families) | Open Font License | No | Y | OFL | Live | Official page |
| Open Foundry | [open-foundry.com](https://open-foundry.com/) | Link list (25 families) | **No licence info shown** | n/a | n/a | Treat as a link list | Live (changed operator) | Not verified |
| Badass Libre Fonts by Womxn | [design-research.be/by-womxn](https://www.design-research.be/by-womxn/) | Libre fonts | Not verified | n/a | n/a | n/a | Unreachable-from-research-env (Anubis bot wall) | Not verified |
| Font Squirrel | [fontsquirrel.com](https://www.fontsquirrel.com/faq) | Font directory / generator | Per font | Per font | "100% free for commercial use" (check each) | Generator only accepts eligible fonts | Live | Official FAQ |
| Adobe Fonts | fonts.adobe.com | Subscription fonts | Not verified | n/a | n/a | n/a | Help page 403 | Not verified |
| Pangram Pangram | [pangrampangram.com](https://pangrampangram.com/pages/faq) | Retail foundry | Trial: personal use only; commercial licences priced by pageviews (web) or MAU (app) | n/a | **Trial: N** | Company 1-year terms | Live | Official FAQ |
| Displaay | [displaay.net](https://displaay.net/) | Retail foundry | Commercial ("New License model" by business size); free trials for testing | n/a | Paid | Azeret Mono is OFL on Google Fonts | Live | Official page |
| Grilli Type | [grillitype.com](https://www.grillitype.com/licensing) | Premium foundry | Not verified | n/a | Paid | n/a | Licensing URL 404 | Not verified |
| Klim | n/a | Premium foundry | Not verified | n/a | Paid | n/a | Licensing URL 404 | Not verified |
| Dinamo | n/a | Premium foundry | Not verified | n/a | Paid | n/a | Licensing URL 404 | Not verified |
| Commercial Type | n/a | Premium foundry | Not verified | n/a | Paid | n/a | Not fetched | Not verified |
| Muzli "30 Great Free Trendy Fonts for 2026" | [feed.muz.li](https://feed.muz.li/?p=200024) | Trend roundup | Mostly **personal-use-only or unstated** (Rebak, CS Brooklyn, Norelli, Pangram Acma and Kyoto) | n/a | **Risky** | Check each font | Live | Secondary |

## 8. Photos

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Unsplash | [unsplash.com/license](https://unsplash.com/license) | Photos | Unsplash License | No (appreciated) | Y | No selling unless significantly modified; no competing service. Silent on AI, trademarks and model releases | Live (homepage bot check) | Official page |
| Unsplash+ | [unsplash.com/plus/license](https://unsplash.com/plus/license) | Photos (subscription) | Unsplash+ License | No | Y | **No digital templates, ML, AI or biometric tracking**; no competing service or resale; sensitive-topic disclaimer; legal guarantee up to US$10,000/photo | Live | Official page |
| Pexels | [pexels.com](https://www.pexels.com/) | Photos / video | Pexels licence (page not readable) | No (secondary) | Y | ML/AI dataset collection via the API needs permission; no selling unmodified copies or competing stock (secondary) | Live; licence page 403 | Secondary + help centre |
| Pixabay | [pixabay.com](https://pixabay.com/service/license-summary/) | Photos / video / audio | Pixabay Content License | No | Y | No standalone sale or distribution; no commercial trademark/brand use; no merchandise; no use as a trade mark or business name; no deceptive use. Silent on AI | Live (homepage bot check) | Official summary |
| Burst (Shopify) | [shopify.com/stock-photos](https://www.shopify.com/stock-photos/) | Photos (20,000+) | "Free Photo Terms" | No | Y | Merch and offline use allowed | **Redirected** from burst.shopify.com; reportedly in maintenance mode | Official page |
| StockSnap.io | [stocksnap.io](https://stocksnap.io/license) | Photos | StockSnap's CC0 License | No | Y | None | Live | Official page |
| Kaboompics | [kaboompics.com](https://kaboompics.com/page/terms-of-use) | Photos | Standard License / **"Editorial Use Only"** | No | Standard Y; **Editorial: no ads, packaging or brand marketing** | No redistribution of unmodified photos to other stock or wallpaper platforms | Live (/license 404) | Official page |
| Reshot | [reshot.com](https://elements.envato.com/learn/reshot-retiring) | Photos / icons | Free commercial licence (historic) | n/a | Earlier downloads keep the licence | No longer downloadable | **Retired (Jan 2026)**; 301 → Envato | Official page |
| Gratisography | [gratisography.com](https://gratisography.com/license/) | Photos (+ AI collection) | Custom Gratisography licence | No | Y | No redistribution, ownership claims or implied endorsement; merchandise only if the picture isn't the merchandise; no warranty | Live | Official page |
| Picjumbo | [picjumbo.com](https://picjumbo.com/) | Photos (+ AI images) | **Not verified** | Unverified | Unverified | n/a | Live (/license/ 404) | Not verified |
| ISO Republic | [isorepublic.com](https://isorepublic.com/license/) | Photos + video | CC0 | No | Y | None | Live | Official page |
| Life of Pix | [lifeofpix.com](https://www.lifeofpix.com/) | Photos | **Not verified** (JS-rendered) | Unverified | Unverified | n/a | Live | Not verified |
| Barnimages | [barnimages.com](https://barnimages.com/license/) | Photos | Own licence (explicitly not CC0) | No | Y | Some uses restricted, so contact them; non-transferable | Live | Official page |
| Nappy | [nappy.co](https://nappy.co/license) | Photos | CC0 | No | Y | Asks that photos not be used to "degrade or insult its subjects" | Live | Official page |
| Wikimedia Commons | [commons.wikimedia.org](https://commons.wikimedia.org/wiki/Main_Page) | Media | **Per file** (CC0, PD, CC BY, CC BY-SA…) | Per file | Per file | Check each file | Live | Not verified (policy page not fetched) |
| Openverse | openverse.org | Image and audio search | **Per item** (cc0, pdm, by, by-sa, by-nc, by-nd, by-nc-sa, by-nc-nd) | Per item | Per item (filterable) | n/a | Unreachable-from-research-env (bot check) | Secondary |
| Rawpixel Public Domain | [rawpixel.com](https://www.rawpixel.com/category/53/public-domain) | PD images | **Not verified** | Unverified | Unverified | n/a | Live; licence page 403 | Not verified |
| EyeEm | n/a | Photo marketplace | n/a | n/a | n/a | n/a | **Shut down 16 Jan 2026** | Secondary |
| Death to Stock | [deathtothestockphoto.com](https://www.deathtothestockphoto.com/) | Paid photo + video membership | **Not verified** | n/a | Paid | n/a | Live (/license 404) | Not verified |
| Stocksy | n/a | Paid stock | **Not verified** | n/a | Paid | n/a | Unreachable-from-research-env (403) | Not verified |
| Adobe Stock (incl. /free) | stock.adobe.com/free | Stock | **Not verified** | n/a | n/a | n/a | Unreachable-from-research-env (403) | Not verified |

## 9. Museum, archive and public domain

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| The Met Open Access | [metmuseum.org](https://www.metmuseum.org/en/policies/image-resources) | Art images (375,000+) | CC0 | No | Y | In-copyright works excluded | Unreachable-from-research-env (bot check) | Official page + press |
| Smithsonian Open Access (incl. 3D) | 3d.si.edu | 2D/3D (~3M / 2.8M) | CC0 | No | Y | Open-access items only | Unreachable-from-research-env (bot check) | Secondary |
| Rijksmuseum | [rijksmuseum.nl](https://www.rijksmuseum.nl/en/research/conduct-research/data) | Collection data | "Progressive Open Data policy" (exact licence not stated) | n/a | n/a | See its Information and Data Policy | Live | Official page |
| NASA Images | [images.nasa.gov](https://images.nasa.gov) | Space imagery | Generally not copyrighted unless noted | No | Y | Insignia, logotype and seal need approval; no implied endorsement; publicity rights; separate merchandise guidelines | Live | Official page |

## 10. Video

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Coverr | [coverr.co](https://coverr.co/license) | Stock video | "Coverr License — Full Terms for Stock, AI & API (2026)" (**formerly CC0**) | No for website downloads; **Y for Free Demo API apps** | Y | **No AI train, fine-tune, distill or evaluate**; no resale or packs; no competing stock or AI service; no Content ID; watermarked previews unlicensed | Live (**licence changed**) | Official page |
| Mixkit | [mixkit.co](https://mixkit.co/license/) | Video / music / SFX / templates / art | Stock Video Free License; **Stock Video Restricted License**; Stock Music Free License; Sound Effects Free License; Video Templates Free License; Art Free License | No (free licences, secondary) | Free: Y; **Restricted: N** | SFX: don't register, claim or redistribute without significant changes | Live | Official names + secondary terms |
| Videvo | videvo.net | Stock video | Now Freepik terms | n/a | n/a | n/a | **Redirected** 301 → freepik.com/videos (acquired 2022) | curl |
| Mazwai | mazwai.com | Stock video | Historic: Mazwai License / Creative Commons 3.0 (per clip) | CC 3.0 clips: **Y** | Per clip | No redistribution as stock | **Redirected** 301 → freepik.com/videos | Secondary (search snapshot) |
| Pexels Video | pexels.com | Stock video | Pexels licence | No (secondary) | Y | As Pexels photos | Live; licence page 403 | Secondary |
| Pixabay Video | pixabay.com | Stock video | Pixabay Content License | No | Y | As Pixabay | Live | Official summary |
| ISO Republic (video) | [isorepublic.com](https://isorepublic.com/license/) | Stock video | CC0 | No | Y | None | Live | Official page |
| Life of Vids | lifeofvids.com | Stock video | Not verified | n/a | n/a | n/a | Unreachable-from-research-env (connection failure) | Not verified |

## 11. Sound effects and UI sounds

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Freesound | [freesound.org](https://freesound.org/help/faq/) | SFX | **Per file**: CC0 / CC BY 4.0 / **CC BY-NC 4.0** / **Sampling+ 1.0** (retired) | CC BY and BY-NC: **Y** | CC0/CC BY: Y; **BY-NC: N**; **Sampling+: not in ads** | Remixes follow the original licence | Live | Official FAQ |
| Zapsplat | [zapsplat.com](https://www.zapsplat.com/faq-category/license-and-usage/) | SFX | Standard License; some CC0 1.0 | **Basic (free): Y ("ZapSplat")**; Gold/Premium: no (for life, for sounds downloaded while subscribed) | Y | n/a | Live; direct fetch 403 | Secondary (search) |
| BBC Sound Effects | [sound-effects.bbcrewind.co.uk](https://sound-effects.bbcrewind.co.uk) | SFX archive | **RemArc licence** ("Reminiscence Archive") | n/a | **N** (personal, educational, research only; paid licence for commercial) | Not in music you sell; reportedly no AI training or data mining | Live | Secondary (press) |
| Sonniss #GameAudioGDC | [sonniss.com](https://sonniss.com/gameaudiogdc/) | SFX bundles (~207 GB) | Royalty-free (custom) | No | Y (media production) | **AI/ML training "strictly prohibited"**; no resale or redistribution of files. No 2025 bundle (folded into 2026) | Live | Official page |
| Kenney UI Audio | [kenney.nl](https://kenney.nl/assets/ui-audio) | UI SFX (50 files) | Creative Commons CC0 | No | Y | None | Unreachable-from-research-env (timeout) | Official page (cached) + repo + OpenGameArt |
| SoundBible | [soundbible.com](https://soundbible.com/about.php) | SFX | Mixed; commercial only if "Creative Commons Attribution, or Public Domain License" | CC BY: **Y** | Per sound | Paid premium section | Live | Official page |
| Mixkit SFX | [mixkit.co](https://mixkit.co/license/) | SFX | Sound Effects Free License | No (secondary) | Y | Don't register, claim or redistribute without significant changes | Live | Secondary |
| Pixabay Sound Effects | [pixabay.com](https://pixabay.com/service/license-summary/) | SFX / music | Pixabay Content License | No | Y | As Pixabay | Live | Official summary |
| Material Design sound resources | [m2.material.io](https://m2.material.io/design/sound/sound-resources.html) | UI sounds | **No confirmed licence; don't assert CC BY 4.0** | Unknown | Unknown | n/a | Live (JS-rendered, unreadable) | Not verified |
| UI Sounds (prototypr) | uisounds.prototypr.io | UI sounds | Not verified | n/a | n/a | n/a | Unreachable-from-research-env (timeout) | Not verified |
| OpenGameArt | [opengameart.org](https://opengameart.org/content/interface-sounds) | Game audio / 2D / 3D | **Per asset** (CC0, CC BY, CC BY-SA, GPL…) | Per asset | Per asset | n/a | Homepage unreachable-from-research-env (timeout) | Official asset page |
| itch.io UI packs (e.g. Crisp UI Sounds Free by Anipixels) | [godotengine.org](https://godotengine.org/asset-library/asset/5549) | UI SFX | Often CC BY 4.0 | **Y** | Y | Per pack | Live | Secondary |
| SND (snd-lib) | [npmjs.com/package/snd-lib](https://www.npmjs.com/package/snd-lib) | UI sound kit | Not verified | n/a | n/a | n/a | npm exists; snd.dev timed out | Not verified |

## 12. 3D models, textures, HDRIs

| Name | URL | Type | Licence | Attr | Commercial | Restrictions | Status | Verification |
|---|---|---|---|---|---|---|---|---|
| Poly Haven | [polyhaven.com](https://polyhaven.com/license) | HDRIs / textures / models | CC0 ("CC0 1.0 Universal") | No | Y (incl. redistribution in sold products) | Site content not CC0; **no scraping or data mining without permission** | Live | Official page |
| ambientCG | [ambientcg.com](https://docs.ambientcg.com/license/) | PBR materials / HDRIs / models | Creative Commons CC0 1.0 Universal License (files and previews) | Optional | Y | None | Live | Official page |
| Sketchfab | [sketchfab.com](https://sketchfab.com/licenses) | 3D models | Now **Standard** (no sublicensing or standalone resale) and **Editorial** (no commercial or promotional use) | Per model | Standard Y; **Editorial N** | Free licences removed; non-migrated models non-downloadable | Live | Official page |
| Fab (Epic) | [fab.com docs](https://dev.epicgames.com/documentation/en-us/fab/licenses-and-pricing-in-fab) | 3D marketplace | Creative Commons Attribution (CC-BY) (Free); Standard (Free or For Sale; Personal and Professional tiers) | CC-BY: **Y** | Y | Standard bars redistribution; Engadget "Unreal-only" CC-BY claim unverified; tier thresholds unverified | Unreachable-from-research-env (403) | Official docs |
| Kenney (2D/3D) | kenney.nl | Game assets | CC0 | No | Y | None | Unreachable-from-research-env (timeout) | Official asset page (audio) |
| Quaternius | [quaternius.itch.io](https://quaternius.itch.io/quaternius-lowpoly-bundle) | Low-poly models | Creative Commons Zero | No | Y | None | quaternius.com unreachable-from-research-env (timeout) | Official itch page |
| Poly Pizza | [poly.pizza](https://poly.pizza/) | Low-poly models | **Per model**: mostly CC-BY, some CC0 (Google Poly archive CC-BY; Quaternius CC0) | CC-BY: **Y** | Y | Check each model | Live | Secondary |
| Spline library | [spline.design](https://spline.design/) | 3D scenes | Not fetched | n/a | n/a | n/a | Live | Not verified |
| Mixamo | [mixamo.com](https://www.mixamo.com/) | Rigging / animations | Adobe terms not fetched | n/a | n/a | n/a | Live | Not verified |
| NASA 3D Resources | [science.nasa.gov/3d-resources](https://science.nasa.gov/3d-resources/) | 3D models | Per-model terms not fetched | n/a | n/a | NASA brand rules | Live | Not verified |
| TurboSquid free | n/a | 3D models | Not verified | n/a | n/a | n/a | 403 | Not verified |
| CGTrader free | n/a | 3D models | Not verified | n/a | n/a | n/a | 202 | Not verified |

## 13. Code libraries and dev tooling

These are open-source tools. The licence covers the code, not assets made with them.

| Name | URL | Type | Licence | Status | Verification |
|---|---|---|---|---|---|
| unplugin-icons | [github.com/unplugin/unplugin-icons](https://github.com/unplugin/unplugin-icons) | Icon bundler plugin | MIT | Live | Repo |
| Fontaine (UnJS) | [github.com/unjs/fontaine](https://github.com/unjs/fontaine) | Font fallback metrics | MIT | Live | Repo |
| Capsize | [seek-oss.github.io/capsize](https://seek-oss.github.io/capsize/) | Text trimming | Not stated in notes | Live | n/a |
| use-sound | [github.com/joshwcomeau/use-sound](https://github.com/joshwcomeau/use-sound) | React sound hook | MIT | Live ("semi-maintained") | Repo |
| Howler.js | [howlerjs.com](https://howlerjs.com/) | Audio library | Not stated in notes | Live | n/a |
| Tone.js | [tonejs.github.io](https://tonejs.github.io/) | Web Audio framework | Not stated in notes | Live | n/a |
| glTF Transform | [gltf-transform.dev](https://gltf-transform.dev/cli) | glTF optimiser | Not stated in notes | Live | n/a |
| glTF Report | [gltf.report](https://gltf.report/) | glTF inspector | Not stated in notes | Live | n/a |
| glTF Viewer | [gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/) | glTF viewer | Not stated in notes | Live | n/a |
| KTX-Software | [github.com/KhronosGroup/KTX-Software](https://github.com/KhronosGroup/KTX-Software) | Texture tooling | Not stated in notes | Live | n/a |
| meshoptimizer | [meshoptimizer.org](https://meshoptimizer.org/) | Geometry compression | Not stated in notes | Live | n/a |
| Draco | [google.github.io/draco](https://google.github.io/draco/) | Geometry compression | Not stated in notes | Live | n/a |
| sharp | [sharp.pixelplumbing.com](https://sharp.pixelplumbing.com/) | Image processing | Not stated in notes | Live | n/a |

## 14. Mockups

Licence terms were not fetched for any mockup source.

| Name | URL | Type | Licence | Status | Verification |
|---|---|---|---|---|---|
| Mockups Design | [mockups-design.com](https://mockups-design.com/) | Free mockups | Not verified | Live | curl |
| Minimal Mockups (ex-Anthony Boyd Graphics) | [minimalmockups.com](https://www.minimalmockups.com/) | Device mockups | Not verified | **Rebranded** (anthonyboyd.graphics redirects) | curl |
| Ls.graphics | [ls.graphics](https://www.ls.graphics/free-mockups) | 300+ free mockups | Not verified | Live | curl |
| Rotato | [rotato.app](https://rotato.app/) | 3D mockup animator | Not verified | Live | curl |
| Shots.so | [shots.so](https://shots.so/) | Mockup generator | Not verified | Live | curl |
| Mockuuups Studio | [mockuuups.studio](https://mockuuups.studio/) | 5,200+ mockups | Not verified | Live | curl |
| Artboard Studio | [artboard.studio](https://artboard.studio/) | Mockup editor | Not verified | Live | curl |
| Screely | [screely.com](https://www.screely.com/) | Screenshot mockups | n/a | **Appears defunct** ("Domain Default page") | curl |

## 15. Design tools (licence not researched)

These are online tools. The notes checked liveness only; the licences of exported outputs were not verified. Hero Patterns output was historically CC BY 4.0 (unverified).

| Name | URL | Type | Status |
|---|---|---|---|
| Coolors | coolors.co | Palettes | Unreachable-from-research-env (403); likely live |
| Realtime Colors | realtimecolors.com | Palette preview | Unreachable-from-research-env (timeout) |
| Huemint | [huemint.com](https://huemint.com/) | AI palettes | Live |
| Adobe Color | [color.adobe.com](https://color.adobe.com/) | Palettes (now Adobe Express-branded) | Live |
| Khroma | [khroma.co](https://www.khroma.co/) | AI palettes | Live |
| Color Hunt | [colorhunt.co](https://colorhunt.co/) | Palettes | Live |
| Radix Colors | [radix-ui.com/colors](https://www.radix-ui.com/colors) | Colour scales | Live |
| Tailwind palette | [tailwindcss.com/docs/colors](https://tailwindcss.com/docs/colors) | Colour scales | Live |
| OKLCH Color Picker | [oklch.com](https://oklch.com/) | OKLCH | Live |
| oklch.fyi | [oklch.fyi](https://oklch.fyi/) | OKLCH | Live |
| Leonardo | [leonardocolor.io](https://leonardocolor.io/) | Contrast-based scales | Live |
| ColorBox | [colorbox.io](https://colorbox.io/) | Colour scales | Live |
| UI Colors | [uicolors.app](https://uicolors.app/generate) | Tailwind scales | Live |
| Learn UI Design Data Viz Palette | [learnui.design](https://www.learnui.design/tools/data-color-picker.html) | Data-viz palettes | Live |
| Palettte.app | [bairesdev.com](https://www.bairesdev.com/tools/color-palette-app/editor/) | Palettes | **Redirected** (ownership change to BairesDev) |
| tints.dev | tints.dev | Palettes | Unreachable-from-research-env (403) |
| APCA Contrast Calculator | [apcacontrast.com](https://apcacontrast.com/) | Contrast | Live |
| WebAIM Contrast Checker | [webaim.org](https://webaim.org/resources/contrastchecker/) | Contrast | Live |
| myndex.com/APCA | myndex.com/APCA | Contrast | Unreachable-from-research-env (timeout) |
| CSS Hero Mesher | [csshero.org/mesher](https://csshero.org/mesher/) | Mesh gradients | Live |
| Mesh | [meshgradient.com](https://meshgradient.com/) | Mesh gradients | Live |
| uiGradients | [uigradients.com](https://uigradients.com/) | Gradients | Live |
| gradient.style | [gradient.style](https://gradient.style/) | HDR gradients | Live |
| CSS Gradient | [cssgradient.io](https://cssgradient.io/) | Gradients | Live |
| Grainy Gradients | [grainy-gradients.vercel.app](https://grainy-gradients.vercel.app/) | Grain demo | **Unavailable (HTTP 402)** |
| Hero Patterns | [heropatterns.com](https://heropatterns.com/) | SVG patterns | Live |
| Haikei | [haikei.app](https://haikei.app/) | SVG generators | Live |
| Pattern Monster | [pattern.monster](https://pattern.monster/) | SVG patterns | Live |
| fffuel | [fffuel.co](https://www.fffuel.co/) | SVG generators | Live |
| Blobmaker | [blobmaker.app](https://www.blobmaker.app/) | Blobs | Live |
| Get Waves | [getwaves.io](https://getwaves.io/) | Waves | Live |
| Noise Texture Generator | [noisetexturegenerator.com](https://www.noisetexturegenerator.com/) | Noise | Live |
| SVG Backgrounds | svgbackgrounds.com | SVG backgrounds | Unreachable-from-research-env (403) |
| Smooth Shadow | [shadows.brumm.af](https://shadows.brumm.af/) | Shadows | Live |
| Tobias Ahlin article | [tobiasahlin.com](https://tobiasahlin.com/blog/layered-smooth-box-shadows/) | Shadow technique | Live |
| Josh Comeau Shadow Palette | [joshwcomeau.com](https://www.joshwcomeau.com/shadow-palette/) | Shadows | Live |
| Glassmorphism Generator (Hype4) | [hype4.academy](https://hype4.academy/tools/glassmorphism-generator) | Glass CSS | Live |
| ui.glass/generator | ui.glass | Glass CSS | Unreachable-from-research-env (timeout) |
| smoothshadows.com | smoothshadows.com | Shadows | Unreachable-from-research-env (timeout) |
| Clippy | [bennettfeely.com/clippy](https://bennettfeely.com/clippy/) | clip-path | Live |
| cubic-bezier.com | [cubic-bezier.com](https://cubic-bezier.com/) | Easing | Live |
| easings.net | [easings.net](https://easings.net/) | Easing | Live |
| easing.dev | [easing.dev](https://www.easing.dev/) | Easing | Live |
| Utopia | [utopia.fyi](https://utopia.fyi/) | Fluid scales | Live |
| Typescale | [typescale.com](https://typescale.com/) | Type scale (some Pro) | Live |
| Fontjoy | [fontjoy.com](https://fontjoy.com/) | Font pairing | Live |
| Typewolf | [typewolf.com](https://www.typewolf.com/google-fonts) | Type recommendations (paid guide) | Live |
| Squoosh | [squoosh.app](https://squoosh.app/) | Image compression | Live |
| TinyPNG | [tinypng.com](https://tinypng.com/) | Image compression | Live |
| SVGOMG | [jakearchibald.github.io/svgomg](https://jakearchibald.github.io/svgomg/) | SVG minify | Live |
| RealFaviconGenerator | [realfavicongenerator.net](https://realfavicongenerator.net/) | Favicons | Live |

## 16. Inspiration galleries (licence not applicable)

These galleries are for reference only. Showcased sites and assets belong to their owners.

| Name | URL | Status |
|---|---|---|
| Awwwards | [awwwards.com](https://www.awwwards.com/) | Live |
| Recent (formerly Godly) | [recent.design](https://recent.design/?ref=godly) | **Rebranded / redirected** from godly.website |
| Land-book | [land-book.com](https://land-book.com/) | Live |
| Lapa Ninja | [lapa.ninja](https://www.lapa.ninja/) | Live |
| SiteInspire | [siteinspire.com](https://www.siteinspire.com/) | Uncertain (Vercel checkpoint 429) |
| Httpster | [httpster.net](https://httpster.net/) | Live |
| One Page Love | [onepagelove.com](https://onepagelove.com/) | Live |
| Minimal Gallery | [minimal.gallery](https://minimal.gallery/) | Live |
| MaxiBestOf | [maxibestof.one](https://maxibestof.one/) | Live |
| Mobbin | [mobbin.com](https://mobbin.com/) | Live |
| Refero | [refero.design](https://refero.design/) | Live |
| Page Flows | [pageflows.com](https://pageflows.com/) | Live |
| Screenlane | [screenlane.com](https://screenlane.com) | **Redirected** → Page Flows |
| Savee | [savee.com](https://savee.com/) | **Redirected** from savee.it |
| Cosmos | [cosmos.so](https://www.cosmos.so/) | Live |
| Are.na | [are.na](https://www.are.na/) | Live |
| Dribbble | [dribbble.com](https://dribbble.com/) | Live (202) |
| Behance | behance.net | Unreachable-from-research-env (403) |
| Curated | [curated.design](https://curated.design/) | Live |
| Dark Mode Design | [darkmodedesign.com](https://www.darkmodedesign.com/) | Live |
| Brutalist Websites | [brutalistwebsites.com](https://brutalistwebsites.com/) | Live |
| Hover States | [hoverstat.es](https://www.hoverstat.es/) | Live |
| Codrops | [tympanus.net/codrops](https://tympanus.net/codrops/) | Live |
| Made in Webflow | [webflow.com/made-in-webflow](https://webflow.com/made-in-webflow) | Live |
| Framer Gallery | [framer.com/community/gallery](https://www.framer.com/community/gallery/) | **Redirected** from framer.com/gallery |
| CSS Design Awards | [cssdesignawards.com](https://www.cssdesignawards.com/) | Live |
| The FWA | [thefwa.com](https://thefwa.com/) | Live |
| GSAP Showcase | [gsap.com/showcase](https://gsap.com/showcase/) | Live |
| Best Website Gallery | [bestwebsite.gallery](https://bestwebsite.gallery/) | Live |
| Admire The Web | [admiretheweb.com](https://admiretheweb.com/) | Live |
| Supahero | [supahero.io](https://supahero.io/) | Live |
| Footer gallery | [footer.design](https://www.footer.design/) | Live |
| Navbar Gallery | [navbar.gallery](https://www.navbar.gallery/) | Live |
| Landingfolio | [landingfolio.com](https://www.landingfolio.com/) | Live |
| SaaSFrame | [saasframe.io](https://www.saasframe.io/) | Live |
| Typewolf Site of the Day | [typewolf.com/site-of-the-day](https://www.typewolf.com/site-of-the-day) | Live |
| Uiland | [uiland.design](https://uiland.design/) | Live |
| Muzli | [muzli.com](https://www.muzli.com/) | Live |
| hyperframe.io | hyperframe.io | **Parked** (ww38.hyperframe.io) |

## Sources

Every licence in the tables links to the page it was verified against. The topic pages list their full sources:

- [icons.md](icons.md#sources)
- [3d-and-animated-icons.md](3d-and-animated-icons.md#sources)
- [illustrations.md](illustrations.md#sources)
- [fonts.md](fonts.md#sources)
- [photos.md](photos.md#sources)
- [video.md](video.md#sources)
- [sound.md](sound.md#sources)
- [3d-models-textures.md](3d-models-textures.md#sources)
- [mockups.md](mockups.md#sources)
- [design-tools.md](design-tools.md#sources)
- [inspiration-galleries.md](inspiration-galleries.md#sources)

Primary licence references:

- Iconify collections API: https://api.iconify.design/collections
- Google Fonts metadata: https://fonts.google.com/metadata/fonts · Fontshare API: https://api.fontshare.com/v2/fonts?limit=200
- Remix Icon License: https://raw.githubusercontent.com/Remix-Design/RemixIcon/master/License
- Font Awesome LICENSE: https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/LICENSE.txt
- Unsplash License: https://unsplash.com/license · Unsplash+ License: https://unsplash.com/plus/license
- Coverr License: https://coverr.co/license
- Freesound FAQ: https://freesound.org/help/faq/
- Epic, Migrating assets to Fab: https://dev.epicgames.com/documentation/fab/migrating-assets-to-fab
