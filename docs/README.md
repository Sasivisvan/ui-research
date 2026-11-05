# Website Builder Docs: Components, Animations, Assets and Foundations

This folder is a reference for building distinctive, fast, accessible, responsive websites on desktop and mobile, without falling into the generic "AI slop" look. It turns ten research notes from 5 Nov 2026 into documentation organised for builders. It covers process and aesthetics, foundations (tokens, layout, performance, accessibility, browser support, stacks, launch QA), 50 UI components, web animation techniques, and licence-safe assets. Each file stands alone: it opens with an H1 and a one-paragraph intro, and it ends with a Sources list with inline links. **All facts are current as of 5 Nov 2026.**

## Contents

1. [How to use these docs to build a site](#how-to-use-these-docs-to-build-a-site)
2. [Fast path: read these 6 files first](#fast-path-read-these-6-files-first)
3. [Folder map](#folder-map)
4. [Verification markers](#verification-markers)
5. [Known gaps](#known-gaps)
6. [Source notes](#source-notes)

---

## How to use these docs to build a site

1. **Start with the process.** [00-start-here.md](00-start-here.md) walks from concept → moodboard → wireframe → design system → build → polish → launch. It also lists the slop tells to avoid and the named aesthetics.
2. **Set foundations before components.** Write the tokens (colour, type, space, radii, shadows, motion), choose the layout system and the stack, and know the performance and accessibility targets. These live in `foundations/`.
3. **Pick components by section.** Use `components/` to choose variants for each part of the page (nav, hero, cards, forms, overlays, signature pieces). Choose one signature component and keep the rest restrained.
4. **Add motion deliberately.** Use `animations/` for easing tokens, page transitions, micro-interactions, scroll, text and 3D. Put one orchestrated page load and one signature moment per page, and give every effect a reduced-motion path.
5. **Source assets you are allowed to use.** Use `assets/` for icons, fonts, illustrations, photos, video, sound, 3D and mockups, with licence notes and optimisation rules.
6. **Check support and ship.** Read [foundations/browser-support-2026.md](foundations/browser-support-2026.md) and [animations/browser-support.md](animations/browser-support.md) for fallbacks, then work through [foundations/launch-checklist.md](foundations/launch-checklist.md).

The recipe table at the end of [00-start-here.md](00-start-here.md#recipe-combining-the-docs) maps each decision to the file that covers it.

---

## Fast path: read these 6 files first

| # | File | Why |
|---|---|---|
| 1 | [00-start-here.md](00-start-here.md) | Process, slop tells, the new-cliché trap, aesthetics table, recipe |
| 2 | [foundations/design-tokens-color-type.md](foundations/design-tokens-color-type.md) | OKLCH tokens, light/dark, fluid type, shadows, DTCG, Tailwind v4 |
| 3 | [foundations/layout-responsive-mobile.md](foundations/layout-responsive-mobile.md) | Grids, container queries, viewport units, touch targets, mobile starter |
| 4 | [components/README.md](components/README.md) | Index of all 50 components |
| 5 | [animations/motion-principles-easing.md](animations/motion-principles-easing.md) | What makes motion feel crafted; easing and duration tokens |
| 6 | [foundations/launch-checklist.md](foundations/launch-checklist.md) | The QA gate before shipping |

---

## Folder map

### Top level
| File | Contents |
|---|---|
| [README.md](README.md) | This entry point |
| [00-start-here.md](00-start-here.md) | Concept-to-launch process; AI-slop tells and remedies; named aesthetics; recipe for combining docs |

### `foundations/`
| File | Contents |
|---|---|
| [design-tokens-color-type.md](foundations/design-tokens-color-type.md) | Three-tier tokens, OKLCH ramps, semantic naming, `light-dark()` and `color-scheme`, typeface registers, Utopia fluid type and space, radii, Josh Comeau shadow scale, motion tokens, DTCG 2025.10 format, Tailwind v4 `@theme` |
| [layout-responsive-mobile.md](foundations/layout-responsive-mobile.md) | 12-col and breakout grids, subgrid, content breakpoints, container queries, `:has()`, `vh = lvh` and `svh`/`dvh`, safe areas, WCAG 2.5.8 targets, thumb zones, hover media queries, responsive images and `sizes="auto"`, PWA basics, mobile starter |
| [performance.md](foundations/performance.md) | Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75), LCP and image rules, font loading, JS budgets, animation cost, video, Speculation Rules, bfcache |
| [accessibility.md](foundations/accessibility.md) | WCAG 2.2 AA essentials, focus, keyboard, landmarks, reduced motion, WCAG 3 and APCA status (APCA is not in WCAG 3), testing tools, legal context |
| [browser-support-2026.md](foundations/browser-support-2026.md) | Support table for anchor positioning, `@scope`, style queries, `contrast-color()`, `shape()`, `field-sizing`, `light-dark()` images, container queries, `:has()`, subgrid, OKLCH, nesting, `text-wrap`, relative colour and more, with confidence levels and fallbacks |
| [tech-stacks.md](foundations/tech-stacks.md) | Stack matrix (Astro 7.x, Next.js, SvelteKit, Nuxt, Vite + vanilla, Webflow, Framer); Tailwind v4, vanilla CSS with layers and nesting, CSS Modules; token pipeline |
| [launch-checklist.md](foundations/launch-checklist.md) | Checkbox QA list: performance, a11y, responsive, SEO/meta, motion, assets and licences, cross-browser, security, polish; Front-End Checklist reference |

### `components/`
| File | Contents |
|---|---|
| [README.md](components/README.md) | Index of all 50 components |
| [navigation-structure.md](components/navigation-structure.md) | Components 1–10: navigation and page structure. Spatial-origin menus, typographic nav, scroll-driven headers, ARIA patterns (links in a labelled `<nav>`, not `role="menu"`) |
| [actions-inputs.md](components/actions-inputs.md) | Components 11–20: buttons, links, inputs, forms, choice controls, selects, sliders, search, date/time, upload. Form UX research, headless libraries, modern form CSS |
| [content-display.md](components/content-display.md) | Components 21–30: heroes, cards, bento and masonry, galleries and lightboxes, carousels and marquees, accordions, tables, testimonials, pricing, timelines and stats |
| [feedback-overlays.md](components/feedback-overlays.md) | Components 31–40: dialogs and bottom sheets, toasts, tooltips and popovers, alerts and cookie banners, loaders, skeletons, progress, badges, empty states and 404, avatars. Sonner and Vaul craft lessons, native `<dialog>`/Popover/anchor stack |
| [signature-experiential.md](components/signature-experiential.md) | Components 41–50: custom cursors, smooth scroll (Lenis), preloaders, CTA and newsletter, contact, team and about, portfolio and case study, video, maps, theme and language switchers, back-to-top |
| [component-libraries.md](components/component-libraries.md) | Headless primitives (Radix, React Aria, Base UI, Ark UI…), styled kits, effect libraries (Aceternity, Magic UI…), snippet sites; overlay, carousel, table, form, media and map libraries; inspiration galleries and studios |

### `animations/`
| File | Contents |
|---|---|
| [README.md](animations/README.md) | Animation section index |
| [motion-principles-easing.md](animations/motion-principles-easing.md) | Crafted vs generic motion, durations, easing and `linear()` springs, choreography |
| [page-transitions.md](animations/page-transitions.md) | Same- and cross-document View Transitions, Barba and Swup patterns |
| [micro-interactions.md](animations/micro-interactions.md) | Press, ripple, magnetic, toggles, checkboxes, success states |
| [hover-effects.md](animations/hover-effects.md) | Image zoom and distortion, reveal masks, underlines, text roll, tilt, spotlight; hover gating |
| [layout-state-animation.md](animations/layout-state-animation.md) | FLIP, Motion layout, AutoAnimate, `height: auto`, `@starting-style`, discrete properties |
| [scroll-animations.md](animations/scroll-animations.md) | Scroll-driven animations, ScrollTrigger, pinning, scrollytelling, stacking cards |
| [text-animations.md](animations/text-animations.md) | SplitText-style reveals, kinetic and variable-font type |
| [svg-lottie-rive.md](animations/svg-lottie-rive.md) | SVG stroke and morph, Lottie/dotLottie, Rive |
| [3d-webgl-shaders.md](animations/3d-webgl-shaders.md) | Three.js/R3F, WebGPU, DOM-synced WebGL planes, shaders |
| [backgrounds-effects.md](animations/backgrounds-effects.md) | Mesh gradients, grain, dithering, halftone, shader backgrounds |
| [libraries.md](animations/libraries.md) | Native CSS/WAAPI vs Motion, GSAP, Anime.js v4, AutoAnimate, Lenis; trade-offs |
| [browser-support.md](animations/browser-support.md) | View Transitions, scroll-driven animations, `linear()`, `@starting-style`, `interpolate-size`, scroll-state queries, WebGPU |
| [performance-accessibility.md](animations/performance-accessibility.md) | Animation cost, budgets, reduced motion, scroll-jacking and iOS quirks |

### `assets/`
| File | Contents |
|---|---|
| [README.md](assets/README.md) | Asset section index |
| [licensing-cheatsheet.md](assets/licensing-cheatsheet.md) | CC0 vs custom-free vs per-file licences, attribution rules, gotchas |
| [icons.md](assets/icons.md) | Lucide, Phosphor, Tabler, Heroicons, Material Symbols and others; implementation (components, sprites, no icon fonts) |
| [3d-and-animated-icons.md](assets/3d-and-animated-icons.md) | 3D icon sets (e.g. 3dicons, CC0) and animated icons |
| [illustrations.md](assets/illustrations.md) | Open Peeps, Humaaans, Open Doodles, unDraw and others |
| [fonts.md](assets/fonts.md) | Overused vs less-saturated free typefaces, pairings, OFL and ITF licences, loading |
| [photos.md](assets/photos.md) | Stock photo sources and licence gotchas |
| [video.md](assets/video.md) | Stock video sources; WebM/AV1/MP4 delivery |
| [sound.md](assets/sound.md) | UI sound sources; muted-first, gesture-gated audio |
| [3d-models-textures.md](assets/3d-models-textures.md) | Poly Haven, ambientCG, Kenney, Quaternius, Sketchfab/Fab; GLB optimisation |
| [mockups.md](assets/mockups.md) | Device and scene mockup sources |
| [design-tools.md](assets/design-tools.md) | OKLCH pickers, scale generators, contrast checkers, gradient, texture and shadow generators |
| [inspiration-galleries.md](assets/inspiration-galleries.md) | Award galleries, section galleries, motion references (see access caveats below) |
| [optimization.md](assets/optimization.md) | Per-asset delivery: images, video, sound, 3D |

---

## Verification markers

The research separated what was read from a live source from what was reasoned or remembered. These docs keep that split and never raise a claim's confidence. The marker wording varies a little between files, because each source note used its own labels.

| Marker | Meaning |
|---|---|
| Inline link, no marker | **Cited**: read from that URL during research on 5 Nov 2026 |
| **(synthesis)** / "practitioner synthesis" / "researcher synthesis" | Reasoned guidance or composition built from cited techniques; not verified against one source |
| **(bg)** / "from memory" / "unverified" / "prior knowledge, not re-verified" | Background knowledge not re-checked this session; verify before quoting |
| **(search-only)** / "[search]" / "search result" | Seen only as a search-result title or snippet; page not fetched |
| **(secondary)** | From a third-party write-up, not the primary source |
| **Untested snippet** / "(sketch)" / "reference build" | Code written for the notes; not run in a browser. Test before shipping |
| **Editor's note:** | Connective guidance added while assembling the docs, not from the research |
| **Conflict** | Sources disagree; both versions are recorded |

**Dates:** facts are current as of **5 Nov 2026**. Browser support moves fast. Re-check "Baseline newly available" and Chromium-only features before launch.

---

## Known gaps

- **Award and inspiration galleries blocked automated access.** Awwwards, Codrops (tympanus.net, HTTP 403), Godly (now 301-redirects to recent.design), Land-book and Lapa Ninja (403), SaaSLandingPage (connection reset), Mobbin, Dribbble and others were not fetched or were blocked. Examples labelled "award-site" or "Awwwards-style" are therefore **mostly synthesis**, and no verified 2026 Awwwards winners are listed. **Browse these galleries manually** to collect real references.
- **Apple HIG and Material 3 pages failed to load** (JS-rendered). Numeric guidance attributed to them (44pt targets, 48dp, tab bar counts, M3 progress-indicator specs, iOS spring parameters) is background knowledge.
- **Many snippets are untested.** Code under Inferences and in Editor's notes was not run in a browser. Test it, especially on iOS Safari.
- **caniuse.com was not fetched**, so some support versions are background knowledge. Several features have conflicting support data (anchor positioning details, cross-document View Transitions in Firefox, relative colour syntax Baseline date). See [foundations/browser-support-2026.md](foundations/browser-support-2026.md#7-conflicts-with-other-research-notes).
- **Some licence pages were blocked** (SVG Repo, Icons8, Flaticon, IconScout, Noun Project, Adobe Fonts, Pexels licence page, Stocksy, Adobe Stock and others). The SF Symbols licence could not be read; treat it as not safe for websites. Several asset sites timed out (kenney.nl, quaternius.com, opengameart.org…). A timeout is **not** evidence that a site shut down.
- **Framework versions** other than Astro 7.x and Tailwind v4 (Next.js, SvelteKit, Nuxt, Webflow, Framer) were not verified.
- **No quantitative studies** were found on how common "slop" is, or on how crafted and generic motion or components affect conversion. That guidance is qualitative and often comes from vendor blogs.
- **Practitioner pages not fetched:** Refactoring UI, Brad Frost, Ahmad Shadeed, Vitaly Friedman, Adam Argyle, Jen Simmons, NN/g thumb-zone research, The A11y Project, WebAIM, axe and WAVE. Positions attributed to them are background knowledge.
- **Unresolved items:** the Interop 2026 focus areas, CSS `if()` support, and the GA status of Video.js v10 and Leaflet 2.0.

---

## Source notes

The research notes these docs were built from are in `../research_notes/UI components animations and assets/`:
- `01_navigation_structure_components.md`
- `02_action_input_components.md`
- `03_content_display_components.md`
- `04_feedback_overlay_components.md`
- `05_signature_experiential_components.md`
- `06_transitions_microinteractions.md`
- `07_scroll_text_3d_animations.md`
- `08_icons_illustrations_fonts.md`
- `09_media_3d_sound_tools_inspiration.md`
- `10_craft_responsive_performance_a11y.md`

## Sources

The primary sources cited across the foundations files:
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Baseline 2026](https://web.dev/baseline/2026)
- [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026)
- [W3C: Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [W3C WAI: WCAG 3 Working Draft, March 2026](https://www.w3.org/WAI/news/2026-03-03/wcag3)
- [designtokens.org: Design Tokens Format](https://www.designtokens.org/tr/drafts/format/)
- [tailwindcss.com: Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [astro.build/blog](https://astro.build/blog/)
- [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist)
- [prg.sh: Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Per-file sources are listed at the end of each document.
