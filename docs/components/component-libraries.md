# Component Libraries, Snippet Sites & Inspiration Sources

This is the cross-cutting register of every component library, headless primitive set, snippet/effect site, specialist widget library and inspiration gallery named in research notes 01–05 (navigation, actions and inputs, content display, feedback and overlays, signature components). Each row gives the URL as cited, what it is for, framework, licence or notes, status as of November 2026, and how well the row is verified. The working rule from the notes: use **headless, accessibility-first primitives** for behaviour and **effect libraries / galleries** for motion ideas, and never ship an effect component without checking its keyboard, ARIA and reduced-motion behaviour. Nothing here was re-researched; statuses are what the notes found, and any cell the notes didn't cover says so.

**Verification column values** (never read one as stronger than it is):
- **Fetched** = the page was loaded and read during research (Nov 2026).
- **Search** = seen in search results only.
- **Third-party** = from a secondary article or comparison site, not the project's own page.
- **Background** = researcher's background knowledge, not verified this session.
- **Not fetched** = named in the notes as a source to check; nothing about it was verified.
- **Editor's note:** = connective guidance added when organising these docs.

The "Notes" column cites which note the row comes from: N01 navigation, N02 actions/inputs, N03 content display, N04 feedback/overlays, N05 signature/experiential.

## Contents

- [How to use this register](#how-to-use-this-register)
- [1. Headless and accessible primitives](#1-headless-and-accessible-primitives)
- [2. Styled component kits and templates](#2-styled-component-kits-and-templates)
- [3. Effect, snippet and motion-component libraries](#3-effect-snippet-and-motion-component-libraries)
- [4. Overlay, toast and positioning libraries](#4-overlay-toast-and-positioning-libraries)
- [5. Carousel, slider and lightbox libraries](#5-carousel-slider-and-lightbox-libraries)
- [6. Data table libraries](#6-data-table-libraries)
- [7. Form, date-picker, upload and contact tooling](#7-form-date-picker-upload-and-contact-tooling)
- [8. Scroll, animation and 3D libraries](#8-scroll-animation-and-3d-libraries)
- [9. Video and media players](#9-video-and-media-players)
- [10. Map libraries and tile sources](#10-map-libraries-and-tile-sources)
- [11. Tutorials and demo sources](#11-tutorials-and-demo-sources)
- [12. Inspiration galleries](#12-inspiration-galleries)
- [13. Studios to study](#13-studios-to-study)
- [14. Evaluation resources](#14-evaluation-resources)
- [Library map by job](#library-map-by-job)
- [Outdated or avoid (Nov 2026)](#outdated-or-avoid-nov-2026)
- [Sources](#sources)

Related: [component index](README.md) · [navigation-structure.md](navigation-structure.md) · [actions-inputs.md](actions-inputs.md) · [content-display.md](content-display.md) · [feedback-overlays.md](feedback-overlays.md) · [signature-experiential.md](signature-experiential.md) · [foundations/tech-stacks.md](../foundations/tech-stacks.md)

---

## How to use this register

From the notes:
- **Behaviour from primitives, looks from effects.** Use Radix, React Aria, Ark UI, Headless UI, Base UI or `cmdk` for behaviour; use Aceternity, Magic UI, Codrops and Uiverse for motion ideas (N01).
- **Effect libraries rarely ship a11y.** Aceternity, Magic UI and Uiverse mostly ship hover and scroll motion without `prefers-reduced-motion` handling or ARIA state; wrap them in your own accessible shell (N01, background).
- **Treat style families as references.** Cult UI's "Halo" families and Aceternity's inputs are style references, not accessible primitives; rebuild their looks on Base UI, React Aria or Radix (N02).
- **Registries cause the template look.** Thousands of sites share registry effects, so they are the main source of the "template look" and need restyling (N03).
- **Workflow (N03, synthesis):** (1) collect 10–20 references per section from galleries; (2) define a non-default type pairing, grid and motion language; (3) pull registry components only as a starting point, then change easing, colour, density and scale; (4) test keyboard, screen reader, reduced motion and mobile touch.
- **Stack picks by project type (N02, synthesis):** React marketing or app site → shadcn/ui on Base UI for most controls, React Aria for date/time and anything i18n-heavy. Vue, Svelte or Solid → Ark UI. Framework-free → native elements plus `appearance: base-select`, popover/commandfor and Cally.

---

## 1. Headless and accessible primitives

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Radix Primitives | https://www.radix-ui.com/primitives | Unstyled accessible primitives. NavigationMenu (Root, List, Item, Trigger, Content, Viewport, Indicator, Link, Sub; uses `navigation` role, deliberately not `role="menu"`; Viewport exposes `--radix-navigation-menu-viewport-width/height`; `data-motion="from-start\|from-end\|to-start\|to-end"`; `delayDuration` 200 ms, `skipDelayDuration` 300 ms). Dialog (focus trap, scroll lock, `aria-hidden` siblings, portal). Toast (viewport `<ol>` in labelled region, hotkey F8, `swipeDirection`/`swipeThreshold`, foreground/background types) | React | N01 (NavigationMenu fetched), N04 (Dialog/Toast background). A third-party blog says Base UI covers Combobox, Autocomplete, Number Field, Toast and Preview Card, "which Radix never shipped" (N02); this conflicts with N04's background note that Radix has a Toast primitive — verify | Active; still supported in shadcn via `shadcn init -b radix` | NavigationMenu: Fetched. Dialog/Toast: Background |
| Base UI | https://mui.com/blog/2026-and-beyond/ (MUI blog) | ~35 accessible unstyled components; adds Combobox, Autocomplete, Number Field, Toast, Preview Card | React | Maintained by MUI with core contributors from Radix and Floating UI. Package renamed `@base-ui-components/react` → `@base-ui/react` | v1 stable (release date conflicts: Dec 2025 vs InfoQ Feb 2026 coverage); v1.1 shipped. **Default primitive layer in shadcn/ui since July 2026** | Third-party ([lavx.hu](https://news.lavx.hu/article/mui-releases-base-ui-1-with-35-accessible-components), [InfoQ](https://infoq.com/news/2026/02/baseui-v1-accessible/), [issoh.co.jp](https://www.issoh.co.jp/tech/details/10350/), [hextaui](https://hextaui.com/blog/shadcn-base-ui-vs-radix)) + Fetched (MUI blog) |
| React Aria (Adobe) | https://react-aria.adobe.com/ | Accessible hooks/components. Press handling (drag off to cancel, long press to select); DatePicker (DateInput/DateSegment segmented typing + Popover, Dialog, Calendar); Calendar `visibleDuration`; Slider `data-dragging`; ComboBox entry/exit animation states; Autocomplete; Tabs; ToggleButtonGroup; Disclosure. 30+ languages, 13 calendar systems, 5 numbering systems, RTL, built-in validation | React | Site moved to react-aria.adobe.com. No dedicated nav-menu component (compose Disclosure/Link) | Active; leads on i18n and date/time | Fetched (N02) |
| Ark UI | https://ark-ui.com/ | Headless, 45+ components on state machines; Tabs, SegmentGroup (true radio-based segmented control), Combobox | React, Solid, Vue, Svelte | Homepage did not list components; DatePicker, FileUpload, RatingGroup, PinInput, TagsInput unverified | Active | Fetched (homepage only, N02) |
| Park UI | — (no URL in notes) | Styled layer over Ark UI; SegmentGroup | Multi-framework | — | Not verified | Background (N01) |
| Headless UI (Tailwind Labs) | — | Popover, Tab and other unstyled components | React, Vue | — | Docs not visited; coverage unknown | Background (N01, N02) |
| Melt UI | — | Svelte headless builders | Svelte | — | Not visited | Background (N02) |
| Bits UI | — | Svelte headless components | Svelte | — | Not visited | Background (N02) |
| cmdk | https://openapps.pro/packages/cmdk (listing) | Command palette: unstyled composable Command, Input, List, Item, Group, Dialog with automatic filtering/sorting; `Command.Dialog` wraps Radix Dialog. Must be built as ARIA combobox + listbox (input keeps focus, `aria-activedescendant`, `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"`, `aria-autocomplete="list"`) | React | Sources are secondary/vendor pages ([CnCommandPalette docs](https://nextcloud-vue.conduction.nl/docs/components/cn-command-palette/), [buildmvpfast 2026 guide](https://www.buildmvpfast.com/blog/how-to-add-cmd-k-command-palette-saas-2026)); performance/axe claims on an "agent pack" page were unmeasured ([Linear-style palette pack](https://agentworkspace-flax.vercel.app/packs/linear-command-palette)) | Strongest verified command-palette primitive (N01) | Third-party |
| kbar | — | Command palette | React | — | Named only | Background (N01) |

---

## 2. Styled component kits and templates

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| shadcn/ui | https://ui.shadcn.com/ | Copy-in components and registry CLI (`npx shadcn init`, `npx shadcn create`, `pnpm dlx shadcn@latest add @magicui/dock`). Has `navigation-menu`, `command`, `sheet`, `drawer`, `sidebar` (collapsible to icon, floating and inset variants), `pagination`; date picker built on react-day-picker | React | **July 2026: "Base UI is now the default library for new projects."** Radix still supported via `shadcn init -b radix`; `asChild` becomes `render`; migration optional. Radix/Base UI choice arrived with `npx shadcn create` Dec 2025; full Base UI docs Jan 2026 | Active | Fetched ([changelog 2026-07](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default), [changelog 2026-01](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)); component list Background |
| coss ui (Origin UI successor) | https://coss.com/ui | "A new, modern UI component library built on top of Base UI." Forms: Input, Textarea, Field, Fieldset, Form, Label, Input Group, Checkbox, Checkbox Group, Radio Group, Switch, Select, Combobox, Autocomplete, Slider, Number Field (increment/decrement + scrub area), OTP Field, Calendar (range, multi-select), Date Picker, Toggle, Toggle Group, Segmented Control, Command, Composer (growing chat input) | React | originui.com 301-redirects here. No file-upload component seen | Active | Fetched (N02) |
| Tailwind Plus (formerly Tailwind UI) | — | Full marketing templates | React/HTML + Tailwind | Rebranded in 2025 [synthesis, verify]. "Solid but the most generic-looking; use for structure, restyle heavily" | Not verified | Background (N01) |
| Untitled UI | — | Marketing templates, sidebars | React/Figma | — | Not fetched | Background (N01, N02) |
| Flowbite | — | Templates, pagination markup | Tailwind | — | Not fetched | Background (N01) |
| Preline | — | Templates, pagination markup | Tailwind | — | Not fetched | Background (N01) |
| HyperUI | — | Templates, pagination markup | Tailwind | — | Not fetched | Background (N01) |
| DaisyUI | — | Templates; `join` for pagination | Tailwind | — | Not fetched | Background (N01) |
| HeroUI, Mantine, Chakra, MUI | — | Component kits named as TanStack Table example targets | React | — | Named only | Fetched (via TanStack page, N03) |

---

## 3. Effect, snippet and motion-component libraries

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Aceternity UI | https://ui.aceternity.com/components | Effect components installable via shadcn CLI. **Nav:** Floating Navbar, Resizable Navbar, Floating Dock, Sidebar, Animated Tabs, Navbar Menu, Notch, Sticky Scroll Reveal, Tracing Beam, Timeline; blocks /blocks/navbars, /blocks/sidebars, /blocks/footers. **Buttons/inputs:** Magnetic Button, Moving Border, Hover Border Gradient, Stateful Button, Tailwind buttons, Placeholders and Vanish Input, Gooey Input, File Upload, Signup Form. **Hero:** Hero Sections block (27+), Hero Highlight, Hero Parallax, Parallax Hero Images, Lamp Effect, Spotlight, Aurora, Background Beams (with collision), Vortex, Wavy Background, Dither Shader, Cloud Shader, Liquid Glass, Webcam Pixel Grid, Macbook Scroll, Container Scroll Animation. **Cards:** Card Hover Effect, Card Spotlight, Card Stack, Comet Card, Draggable Card, Expandable Card, Focus Cards, Glare Card, Wobble Card, 3D Card Effect (CardContainer/CardBody/CardItem), Evervault Card, Tooltip Card, Infinite Moving Cards, Glowing Effect. **Grids/galleries/carousels:** Bento Grid (BentoGrid/BentoGridItem; 7+ blocks), Parallax Scroll, Images Slider, 3D Marquee, Chromatic Image, Apple Cards Carousel, Carousel. **Testimonials:** block (9+), Animated Testimonials | React + Tailwind + Framer Motion | Component count conflicts: ≈262 per 21st.dev vs 100+/200+ elsewhere. Effects mostly lack reduced-motion/ARIA handling | Active | Fetched (N01–N03) |
| Magic UI | https://magicui.design/docs/components | Effect components via shadcn registry. Dock (`iconSize` 40, `iconMagnification` 60, `iconDistance` 140, `direction`, `disableMagnification`; `@magicui/dock`), Scroll Progress; Rainbow/Shimmer/Ripple buttons, community Shiny, Interactive Hover, Pulsating; Border Beam, Shine Border, Glare Hover, Animated Theme Toggler (circle/polygon/star clip-paths, Firefox fixes), Cool Mode, Confetti; Hero Video Dialog, Globe, Dotted Map; text (Text Animate, Typing Animation, Aurora Text, Video Text, Word Rotate, Morphing Text, Hyper Text, Text Reveal, Scroll Based Velocity, Kinetic Text, Spinning Text, Text 3D Flip); backgrounds (Flickering Grid, Retro Grid, Light Rays, Noise Texture, Dither Field, Warp Background, Interactive Grid Pattern); device mocks (Safari, iPhone, Android); Magic Card, Neon Gradient Card, Tweet Card, Backlight, Lens; Marquee, Avatar Circles; Animated Beam, Number Ticker, Animated Circular Progress Bar, Animated List, Orbiting Circles | React + Tailwind + Framer Motion | No input/form category | Active | Fetched (N01–N03); theme toggler registry Search (N05) |
| 21st.dev | https://21st.dev | Community shadcn-compatible registry; e.g. [bundui/magnetic-button](https://21st.dev/bundui/magnetic-button) (search only), [Aceternity library](https://21st.dev/@manuarora700/library/aceternity-ui), [community/aceternity](https://21st.dev/community/aceternity) ("Bento Grid Feature Section With Animated Skeletons", "Masonry Bento Grid With Images", hero variants) | React | `/community/components` failed with ECONNRESET | Active | Partly fetched |
| Uiverse | https://uiverse.io (loaders: https://uiverse.io/loaders) | Community HTML/CSS (and Tailwind) snippets: loaders, toggles, cards, buttons | HTML/CSS | uiverse.io/elements returned 403 | Not verified | Not fetched |
| Hover.dev | https://www.hover.dev/components/buttons | Buttons: Neu Follow, Wet Paint, Marquee, Encrypt, Dot Expand, Load, Hamburger, Magnet, Dotted, Gradient Shadow, Splash, Spotlight, Rounded Slide, Neumorphism, Shiny, Draw Outline, Neubrutalism, AI Button. Categories: Inputs, Toggles, Links, Calendars, Dropdown Menus, Forms/Sign-in | React + Tailwind + Motion | Free tier for some; most named without descriptions (motion inferred from names) | Active | Fetched (N02) |
| Animata | https://animata.design/docs | 13 buttons (AI Button, Algolia Blue/White, Animated Follow, Duolingo 3D press, Get started, Ripple, Shining, Slide Arrow, Status, Swipe, Toggle Switch, Work Button); FAB (Flower Menu, Speed Dial); link text effects (Underline hover, Double Underline, Text Border Animation, Swap Text, Text Flip); Tabs (Fluid, Gooey, Shift) | React | No input/form category | Active | Fetched (N02) |
| Cult UI | https://www.cult-ui.com/docs | Buttons: Texture, Bg Animate, Border Beam, Neumorph, Metal, Cosmic, Organic, Halo, Copy. "Halo" form family: Input, Field, Select, Switch, Segmented, Toggle Group, Search, Dropzone; plus Border Beam Input, Color Picker, Popover Form, Prompt Composer, Dynamic Island | React | Style reference, not accessible primitives | Active | Fetched (N02) |
| css-loaders.com (Temani Afif) | https://css-loaders.com/ | "Over 600+ CSS-only loaders made using a single element", 44 named families; click to copy CSS; markup `<div class="loader"></div>` | CSS | — | Active | Fetched (N04) |
| cssloaders.github.io (Vineeth T.K.) | https://cssloaders.github.io | Copy-paste loaders | CSS | — | Not verified | Not fetched |
| loading.io | https://loading.io (CSS: https://loading.io/css/) | SVG/GIF/CSS loader generator | Any | — | Not verified | Not fetched |
| Framer marketplace — Magic Blend Cursor | https://www.framer.com/marketplace/components/magic-blend-cursor/ | Physics-based blend cursor | Framer | Commercial | Listed | Fetched (N05) |
| cursor-effects (tholman) | https://npmjs.com/package/cursor-effects | 90s-style cursor trails (sparkles, emoji) | Vanilla JS | — | Last pushed Jan 2025 | Fetched (N05) |

---

## 4. Overlay, toast and positioning libraries

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Sonner (Emil Kowalski) | https://sonner.emilkowal.ski/toaster · repo https://github.com/emilkowalski/sonner | Reference toast: interruptible transitions, depth stack (−14px / 0.95 per index), hover expand, momentum swipe (velocity > 0.11), pause on hover/hidden tab, observable store. Defaults: `visibleToasts` 3, `position` bottom-right, `offset` 32px, `mobileOffset` 16px (<600px), `gap` 14, `hotkey` Alt+T, duration 4000 | React | Docs don't describe aria-live behaviour | Active (repo not checked) | Docs + article Fetched; repo Not fetched |
| Vaul (Emil Kowalski) | https://vaul.emilkowal.ski · https://github.com/emilkowalski/vaul | Drawer/bottom sheet: drag with direct transforms, snap points, overdrag damping, `scaleBackground`, 100 ms drag block after scroll-to-top, easing `cubic-bezier(0.32, 0.72, 0, 1)` 500ms, `visualViewport` keyboard handling | React | Reference for mobile bottom sheets | **Unverified:** researcher recalls it was marked unmaintained by its author around 2025; check the repo before adopting | Article Fetched; site/repo Not fetched |
| react-hot-toast | https://react-hot-toast.com | Toasts; headless `useToaster` hook, promise API, ~5KB | React | Sonner's API inspiration | Not verified | Background |
| Notyf | https://carlosroso.com/notyf/ | Framework-free vanilla JS toaster with ripple-style entrance | Vanilla JS | Good for non-React sites | Not verified | Background |
| Floating UI | https://floating-ui.com | Positioning: successor of Popper; middleware `offset`, `flip`, `shift`, `arrow`, `size`, `hide`, `autoPlacement`; `autoUpdate` | Any (core) + React bindings | Still the pragmatic choice where CSS anchor positioning isn't sufficient (virtual elements, text-selection anchors, cross-iframe, older browsers) | Not verified | Background |
| Popper.js v2 | — | Old positioning engine | Any | Superseded by Floating UI and CSS anchors | **Outdated** | Background |
| focus-trap libraries | — | Custom modal focus trapping | Any | Replaced by `<dialog>.showModal()` + `inert` | **Outdated** | Background (N01, N04) |
| `@oddbird/popover-polyfill` | — (npm) | Popover API polyfill | Any | Does **not** polyfill `popover="hint"` behaviour | — | Fetched (via Chrome guide, N04) |
| `@oddbird/css-anchor-positioning` | — (npm) | CSS anchor positioning polyfill | Any | Doesn't support implicit anchors or `position-area` on popovers | — | Fetched (via Chrome guide) |
| `interestfor` polyfill | — (npm) | Interest invokers polyfill (Chrome's guide prescribes it conditionally) | Any | `interestfor` is Chromium-only natively | — | Fetched (via Chrome guide) |
| `dialog-closedby-polyfill` | https://socket.dev/npm/package/dialog-closedby-polyfill | Polyfill for `<dialog closedby>` (no Safari support) | Any | **Warning: appeared in Socket's "Shai-Hulud" compromised-packages analysis. Audit before installing**; a few lines of JS do the job (see [feedback-overlays.md, 31](feedback-overlays.md#31-modals-dialogs-and-bottom-sheets)) | Security risk | Search |

---

## 5. Carousel, slider and lightbox libraries

Accessibility scores are from [Carousa11y research (Cogapp)](https://cogapplabs.github.io/carousa11y/research), re-fetched 2026-06-07 from isitaccessible.dev, which measures *closed a11y issues*, not markup.

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Embla Carousel | https://www.embla-carousel.com/ | Carousel engine; plugins Autoplay, Auto Scroll, Class Names, Fade, Wheel Gestures, Auto Height, Accessibility, SSR | Vanilla, React, Vue, Svelte, Solid, CDN | Carousa11y 100% (recommended). A11y plugin needs v9.0.0-rc02+ with matching rc versions across packages; npm `latest` is 8.x | v9.0.0-rc04 "latest", v8.6.0 "stable" | Fetched |
| Swiper | https://swiperjs.com/ | Most features: transition/parallax effects, multi-row, two-way control + thumbs, grid, lazy images, virtual slides, CSS scroll snapping, RTL, coverflow | JS, React, Vue, Web Components (Swiper Element) | Carousa11y 86.4% (keyboard/SR issues); add the a11y module and test | v14.4.0 released Oct 30 2026 | Fetched |
| @egjs/flicking | — | Carousel | — | Carousa11y 100% | — | Fetched (Carousa11y) |
| Flickity | — | Carousel | — | Carousa11y 74.6%; "aging" (last update May 2024); commercial licence required (background, not verified) | Aging | Fetched (Carousa11y) |
| Keen Slider | — | Drag slider with momentum | — | Carousa11y 66.7% | — | Fetched (Carousa11y) |
| tiny-slider | — | Carousel | — | Carousa11y 58.5% | — | Fetched (Carousa11y) |
| React Slick | — | Carousel | React | Carousa11y 57.4% | — | Fetched (Carousa11y) |
| Splide | — | Carousel | — | Carousa11y 53.8%, "Not actually accessible"; last update Jul 2024 | Avoid (per Carousa11y) | Fetched (Carousa11y) |
| Glide.js | — | Carousel | — | Carousa11y 44.4% | Avoid | Fetched (Carousa11y) |
| Slick | — | jQuery carousel | jQuery | Carousa11y 57.6%; 81 open a11y issues | Avoid / outdated | Fetched (Carousa11y) |
| Owl Carousel | — | jQuery carousel | jQuery | Carousa11y 27.6% | Avoid | Fetched (Carousa11y) |
| accessible-slick | — | Accessible Slick fork | jQuery | The option if stuck with jQuery | — | Fetched (Carousa11y) |
| PhotoSwipe | https://photoswipe.com/ | Zoomable, gesture-driven lightbox; no dependencies; single CSS file; dynamic icons; ES module, no build step; lazy core via `pswpModule: () => import(...)`; loads larger images via `srcset` on zoom; needs width/height up front (`data-pswp-width/height`) | Vanilla JS | Captions removed from core for accessibility problems | v5 (5.4.4) | Fetched |
| GLightbox | — | Simple, video-capable lightbox | Vanilla JS | 2026 maintenance status not verified | Unknown | Background |
| Fancybox (Fancyapps) | — | Lightbox | Vanilla JS | Commercial licence for commercial use (background, not verified) | — | Background |

---

## 6. Data table libraries

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| TanStack Table | https://tanstack.com/table/latest | Headless table engine: sorting, pagination, filtering, faceting, grouping, aggregation, row expansion, row/cell selection, cell spanning, row/column pinning, ordering, visibility, resizing; TanStack Store fine-grained reactivity; tree-shakable; `createTableHook`; devtools; official examples for shadcn/ui, HeroUI, React Aria, MUI, Mantine, Chakra | Framework-agnostic (React examples) | Virtualization not listed on the page | v9 (current) | Fetched |
| TanStack Virtual | — | Virtualization paired with TanStack Table | — | — | — | Background |
| AG Grid | — | Heavy enterprise grids, virtualised big grids | JS/React/etc. | Community (MIT) and Enterprise (commercial) editions (background; verify version) | Not checked | Background |

---

## 7. Form, date-picker, upload and contact tooling

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| react-day-picker | — (via [LogRocket, Oct 2026](https://blog.logrocket.com/top-react-date-pickers)) | Lightweight calendar; foundation of shadcn's date picker | React | v10 published as `@daypicker/react`, native Date | v10 | Third-party |
| React Aria DatePicker / DateField | https://react-aria.adobe.com/ | Accessible segmented date entry + calendar popover; 13 calendar systems | React | — | Active | Fetched |
| MUI X date pickers | — | Date pickers | React | Date ranges are a paid Pro feature | — | Third-party |
| Cally | https://wicky.nillia.ms/cally/ | Web-component calendars <9 KB min+gzip, one dependency: `<calendar-date>`, `<calendar-range>`, `<calendar-multi>`, `<calendar-month offset>`; keyboard + SR support, `Intl.DateTimeFormat`, RTL, CSS parts + custom properties | Web components (framework-free) | — | Active | Fetched |
| react-dropzone | — | File picking only; you write the upload | React | 6.5 KB gzipped; 7.9M weekly downloads on Oct 12 2026 (Upstash); PkgPulse lists ~3.5M and ~5M (conflict) | Active | Third-party ([Upstash](https://upstash.com/kb/best-react-file-upload-libraries), [PkgPulse](https://www.pkgpulse.com/guides/uppy-vs-filepond-vs-react-dropzone-file-upload-2026)) |
| Uppy | https://uppy.io/docs/comparison/ | Modular uploads; remote sources, webcam; tus resumable | Any + React hooks | 23.5 KB core + S3 + hook; 82.9 KB with Dashboard. Cannot make an arbitrary multipart endpoint resumable (server-dependent) | Active | Third-party + Fetched comparison |
| FilePond | — | Polished upload widget; crop/resize plugins; chunked uploads | Any | 42.7 KB | Active | Third-party |
| Uploadcare | — | Upload widget with image editor | Any | 110.2 KB; hosted service | Active | Third-party |
| Cal.com / Calendly | — | "Book a 20-min intro" inline embeds, lazy-loaded on click | Embed | — | — | Background (N05) |
| Cloudflare Turnstile | — | CAPTCHA-free spam protection (alternative: honeypot + time-to-submit) | Embed | — | — | Background (N05) |

---

## 8. Scroll, animation and 3D libraries

Editor's note: full motion guidance lives in [../animations/](../animations/README.md); this table only registers libraries named in the component notes.

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Lenis (darkroom.engineering) | https://github.com/darkroomengineering/lenis | De facto smooth scroll keeping native scroll; `lenis/snap` for snapping; options `lerp` 0.1, `duration` 1.2, `smoothWheel` true, `syncTouch` false, `syncTouchLerp` 0.075, `anchors`, `autoResize`; `data-lenis-prevent`; `respectReducedMotion` true by default | Vanilla (any) | Capped 60fps Safari / 30fps Low Power Mode; stops over iframes; no CSS scroll-snap | v1.3.27 | Fetched |
| GSAP (+ ScrollTrigger, ScrollSmoother, SplitText, MorphSVG, Flip, Observer, Draggable, Inertia) | https://gsap.com/pricing/ | Animation engine and plugins | Vanilla (any) | **"100% free for all users, thanks to Webflow's support"**; "A Webflow Product". Advice that plugins are paid is outdated | Active, free | Fetched |
| Framer Motion / Motion | — | React animation; used by Aceternity, Magic UI, Hover.dev | React | — | — | Background |
| Locomotive Scroll | — (locomotive.ca 403) | Smooth scroll | Vanilla | v4 transform-based, breaks `position: sticky`; v5 rebuilt on Lenis (training knowledge, unverified) | v4 outdated | Background |
| smooth-scrollbar, iScroll | — | Virtual scrolling | Vanilla | — | **Outdated** | Background |
| Barba.js | — | Page transitions (multi-page) | Vanilla | Used in Codrops 2026 WebGL gallery tutorial | — | Fetched (via Codrops archive) |
| three.js / React Three Fiber (R3F) | — | WebGL scenes, globes, galleries, loaders (`THREE.LoadingManager`) | Vanilla / React | — | — | Fetched (via Codrops archive) |
| OGL | — | Lightweight WebGL (infinite circular gallery, [bizarro/infinite-webl-gallery](https://github.com/bizarro/infinite-webl-gallery)) | Vanilla | — | — | Search |
| Spline | — | 3D embeds for heroes | Embed | — | — | Background (N03) |
| Lottie | — | Success animations (contact forms) | Any | — | — | Background (N05) |
| p5.js | — | Creative coding (crayon cursor tutorial) | Vanilla | — | — | Search (N05) |
| TweenMax + imagesLoaded | — | Codrops ImageRevealHover dependencies | Vanilla | Old GSAP v2 API | Legacy | Search |
| NProgress | — | Thin top-of-page route bar style | Vanilla | Named as style reference | — | Background (N04) |

---

## 9. Video and media players

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Video.js v10 | https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10 | Ground-up rewrite by Video.js, Plyr, Vidstack, Media Chrome and Mux Player engineers ("rebuilding from scratch", "not merging codebases"); features load only when configured; **9KB background-video player**; React hooks + render props, Vue composables; owned shadcn-style skins (designed by Sam Potts) | React, Vue, web | Apache 2.0. Bundle savings conflict: 88% vs 81% smaller than v8 ([MarTech Series](https://martechseries.com/video/video-js-v10-delivers-81-smaller-bundles-as-four-major-player-projects-converge/), [Feedbagel](https://feedbagel.com/post/videojs-v10-beta-released-major-rewrite-combines-four-open-source-video-players)) | Tech preview Oct 2025; beta early March 2026 ("recommended for new projects"); GA planned mid-2026 — **GA not confirmed** | Fetched (Mux blog) + Search (press) |
| Vidstack Player | https://www.vidstack.io/ | Player; HLS, DASH, YouTube, Vimeo providers; claims WCAG 2.2, WAI-ARIA, CVAA compliance | React, Vue, Svelte, Solid, Angular, web components | Site says Vidstack "has a new home: Video.js 10" | v1.0; treat standalone package as legacy | Fetched |
| Plyr | — | Player | Vanilla | Marked "Archived" on vidstack.io | **Archived** | Fetched (via vidstack.io) |
| Vime | — | Player | Web components | Marked "Archived" | **Archived** | Fetched (via vidstack.io) |
| Media Chrome | — | Player UI elements | Web components | Merged effort into Video.js v10; existing players get security patches only | Feature work slowed/stopped | Fetched (Mux blog) |
| Mux Player | — | Player for Mux-hosted video | Web components/React | Use it or Video.js v10 with Mux extensions; relationship to v10 unconfirmed | Active | Not fetched |
| lite-youtube-embed | — | Click-to-load YouTube facade (avoids iframe + ~1MB JS until intent) | Web component | — | — | Background |

---

## 10. Map libraries and tile sources

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| MapLibre GL JS | https://maplibre.org/maplibre-gl-js/docs/ | Open-source vector maps, brand styling, globe; no token with `demotiles.maplibre.org` (incl. `globe.json`) | Vanilla (ESM) | Fork of Mapbox GL JS v1.13 (last BSD release); licence BSD-2 vs BSD-3 conflicts across sources; no renderer fee but needs a tile source. "Version 6 ships as ES modules only" | v6 (docs load `maplibre-gl@^6.16.0`) | Fetched + Third-party |
| Mapbox GL JS | https://docs.mapbox.com/mapbox-gl-js/guides/ | Premium 3D, Standard style (default), `projection: 'globe'` + `setFog`, Studio styling | Vanilla | Token required. BSD-3 at v1, proprietary from v2 (Dec 2020), BSL 1.1 at v3 (Sep 2023). 50,000 free monthly loads, then $5.00 / 1,000 (third-party, not verified on mapbox.com/pricing) | v3.33.0 | Fetched + Third-party |
| Leaflet | — | Lightweight raster maps | Vanilla | BSD-2-Clause; less 3D than MapLibre | v1.9 per third-party sources; 2.0 status unconfirmed | Third-party ([Geoapify](https://www.geoapify.com/map-libraries-comparison-leaflet-vs-maplibre-gl-vs-openlayers-trends-and-statistics/)) |
| Protomaps PMTiles | — | Self-hosted vector tiles for MapLibre | — | — | — | Background |
| OpenFreeMap / MapTiler / Stadia | — | Tile/style providers (MapTiler needs an API key) | — | — | — | Fetched (MapTiler key) / Background |
| Google Maps embed iframe | — | Quick, generic embed | Embed | Heavy; put behind a facade | — | Background |

---

## 11. Tutorials and demo sources

| Name | URL | What it's for | Framework | Licence / notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|---|
| Codrops (Tympanus) | https://tympanus.net/codrops · GitHub https://github.com/Codrops | Canonical "Awwwards-style" demos: menus (EaseReverseClipMenu 2026-04-22, ImageTilesMenu, MenuToGrid, LetterShuffleMenu, ExpandingRoundedMenu, Theodore, MenuThumbStackAnimation, MarqueeMenu, InlineToMenuLink, 3DLettersMenuHover, InlineMenuLayout, MenuFullGrid, RapidImageHoverMenuEffects, ScrollLoopMenu, CSSMarqueeMenu, DistortedMenuLinkEffects, DraggableMenu, FullscreenHoverLoop, MultiboxMenu, SlideOutBoxMenu, GridMenu, and older ones); MagneticButtons (2020, MIT); Custom Cursor Effects (2019); ImageRevealHover (2018, MIT); 2026 WebGL gallery tutorials; Motion Highlights roundups | Vanilla/GSAP/Three.js | Repos MIT. Site returned 403 to fetchers; listings from GitHub API, archive feeds and search | Active | GitHub Fetched; articles Search |
| Olivier Larose tutorials | https://blog.olivierlarose.com/tutorials | Free curriculum for nearly every signature pattern: Cursor, Buttons, Hover gallery, Text reveal, Smooth scroll, Parallax, Footers, Menus, Scroll, Mouse, 3D, "Awwwards Landing Page" | React + GSAP/Framer Motion | Blend Mode Cursor tutorial ignores touch; add gating | Active | Fetched |
| CodePen | https://codepen.io (tags /tag/loader, /tag/404) | Community demos | Any | — | — | Not fetched |
| Josh W. Comeau | https://www.joshwcomeau.com | 3D pushable button; dark-mode no-flash technique (updated 2026) | CSS/React | — | Active | Fetched |
| Chrome for Developers | https://developer.chrome.com | View Transitions, interest-triggered tooltips, CSS carousels, scroll-triggered animations | Web platform | — | — | Fetched |
| Piccalil | https://piccalil.li/blog/sticky-revealing-footer | Sticky revealing footer recipe | CSS | — | — | Fetched (N01) |
| Ryan Mulligan | https://ryanmulligan.dev/blog/css-marquee/ | CSS-only marquee | CSS | — | — | Fetched (N03) |
| Adrian Roselli | https://adrianroselli.com/2021/04/sortable-table-columns.html | Sortable table columns a11y | HTML | 2026 update re `ariaNotify()` | — | Fetched (N03) |

---

## 12. Inspiration galleries

| Name | URL | What it's for | Notes | Status Nov 2026 | Verification |
|---|---|---|---|---|---|
| Awwwards | https://www.awwwards.com | Award sites; hero collection (tags Animation, Parallax, Big Background Images, Fullscreen, Scrolling, 3D, Video, Typography, Filters and Effects) https://www.awwwards.com/websites/hero-section/; 404 pages https://www.awwwards.com/websites/404-pages/; preloader tag https://www.awwwards.com/inspiration/preloader | Custom-cursor collection URL returned 404; navigation URL https://www.awwwards.com/websites/navigation/ unverified | Active | Hero collection Fetched; others Search |
| recent.design (ex-Godly) | http://recent.design/?ref=godly | Web, Interface, Branding, Motion, Illustration, Posters, Print, launch videos, OG images, app screenshots, app icons | **godly.website now 301-redirects here** (observed 5 Nov 2026); update bookmarks | Active | Fetched |
| Navbar Gallery | https://www.navbar.gallery/ | Navbars by category (Static/Sticky, Dropdown/Flyout, Mega Menu, Side Bar, Search Bar, Announcement Bar, Full Screen Menu, Breadcrumbs) and style (`/style/animated`, `/style/typographic`, `/style/e-commerce`, …) | By Christina Liubynska; sponsored by Mobbin; 38 pages of examples | Active | Fetched |
| Footer.design | https://footer.design | Footer-only gallery by visual approach (Typographic, Illustrative, Grid, Animated, Dark, Large Type) | Maintained by NOOON Studio | Active | Third-party ([Abduzeedo](https://abduzeedo.com/footer-design-inspiration-only-gallery-earth)) |
| Mobbin | https://mobbin.com | Searchable real-app screens ("empty state", "bottom sheet", "toast") | — | — | Not fetched |
| Page Flows | https://www.pageflows.com | App flow recordings | — | — | Not fetched |
| Dribbble | https://dribbble.com (e.g. /tags/empty_state) | Visual shots | — | — | Not fetched |
| emptystat.es | https://emptystat.es | Empty-state gallery | Status unknown | Unknown | Not fetched |
| Land-book, Lapa Ninja, SaaSLandingPage, Landingfolio | — | Section-indexed landing-page galleries (layout patterns) | Land-book and Lapa Ninja 403; SaaSLandingPage connection reset | — | Not fetched |
| Bento Grids | bentogrids.com | Bento layout gallery | Returned only a title | — | Not fetched |
| FWA, CSS Design Awards, SiteInspire, One Page Love, Httpster | — | Award / curated galleries | Named only | — | Not fetched |
| Framer marketplace / templates | https://www.framer.com/marketplace/ | Components and templates | Template galleries not fetched | — | Partly fetched |
| HTML Burger preloaders | https://htmlburger.com/blog/website-preloaders/ | 45 website preloaders | — | — | Fetched |
| 404 roundups | Speckyboy, SEJ, Webflow, Wix, Colorlib, Meetanshi, IONOS, Kontent.ai | 404 page examples | URLs in [feedback-overlays.md, 39](feedback-overlays.md#39-empty-states-error-pages-and-404) | — | Search |

---

## 13. Studios to study

Only Lusion was fetched; the rest are names commonly cited, from training knowledge (N05).

| Studio | URL | Known for | Verification |
|---|---|---|---|
| Lusion | https://lusion.co (labs: labs.lusion.co) | WebGL scroll and reel; "Let's work together!" CTA; PLAY/MUTE sound toggle; featured-work grid | Fetched |
| Active Theory | — | WebGL experiences | Background |
| Locomotive | — | Smooth-scroll and editorial grids (site 403) | Background |
| Resn | — | Playful interaction | Background |
| Obys | — | Typographic motion and preloaders | Background |
| Immersive Garden | — | Luxury WebGL | Background |
| Darkroom / Studio Freight | — | Makers of Lenis | Background |
| Cuberto | — | Inspiration for Codrops Magnetic Buttons | Search |

---

## 14. Evaluation resources

| Name | URL | What it's for | Verification |
|---|---|---|---|
| Carousa11y research (Cogapp) | https://cogapplabs.github.io/carousa11y/research | Carousel library a11y comparison (isitaccessible.dev closed-issue scores) | Fetched |
| web-features explorer | https://web-platform-dx.github.io/web-features-explorer/ | Baseline status of platform features | Search/Fetched |
| State of CSS 2026 | https://2026.stateofcss.com/ | Developer feature adoption | Search |
| Socket | https://socket.dev | npm supply-chain analysis (Shai-Hulud warning) | Search |

---

## Library map by job

From N01 ([synthesis, not individually verified]), extended with picks from N02–N05.

| Need | Best-in-class picks | Notes |
|---|---|---|
| Mega menu / site nav (React) | Radix NavigationMenu, shadcn `navigation-menu`, React Aria (compose Disclosure/Link), Ark UI | Radix Viewport gives the "morphing panel" effect for free |
| Dropdown / popover | Popover API + CSS anchor positioning (native), Floating UI, Radix Popover, Headless UI `Popover` | Use Menu/DropdownMenu only for *action* menus |
| Command palette | `cmdk`, shadcn `command`, React Aria `Autocomplete`/`ComboBox`, kbar, Ark UI Combobox | Must be a combobox + listbox, not a menu |
| Drawer / sheet | Native `<dialog>`, Vaul, shadcn `sheet`/`drawer`, Radix Dialog | Vaul is the reference for mobile bottom sheets (check maintenance) |
| Toasts | Sonner, native `popover="manual"` toaster, Radix Toast, react-hot-toast, Notyf (vanilla) | See [feedback-overlays.md, 32](feedback-overlays.md#32-toasts-snackbars-and-notifications) |
| Tabs / segmented | Radix Tabs, React Aria Tabs/ToggleButtonGroup, Ark UI Tabs/SegmentGroup, Headless UI Tab | Ark/Park SegmentGroup is a true radio-based segmented control |
| Sidebar | shadcn `sidebar`, Aceternity Sidebar, Untitled UI sidebars | |
| Pagination | shadcn `pagination`, Flowbite, HyperUI, Preline, DaisyUI `join` | Mostly markup; check `aria-current` and labels |
| Form controls | shadcn/ui on Base UI, coss ui, React Aria | Base UI adds Combobox, Autocomplete, Number Field |
| Date/time | React Aria DatePicker, react-day-picker, Cally | MUI X ranges are paid Pro |
| Upload | react-dropzone (own UI), FilePond (cropping), Uppy (remote/webcam/resumable) | |
| Carousel | Embla (a11y-first), Swiper v14 (features), native scroll-snap + CSS carousel | Avoid Owl, Slick, Glide, Splide |
| Lightbox | PhotoSwipe v5, native `<dialog>` + View Transitions | |
| Data table | TanStack Table v9 (+ TanStack Virtual), AG Grid (enterprise) | |
| Smooth scroll | Lenis (wheel only), or native + scroll-driven animations | |
| Video | Video.js v10, Mux Player, native `<video>`, lite-youtube-embed facade | Plyr/Vime archived |
| Maps | MapLibre v6, Mapbox v3, Leaflet | Facade first |
| Effects and motion ideas | Codrops, Aceternity, Magic UI, 21st.dev, Uiverse, CodePen, Olivier Larose | High creativity, variable a11y; audit focus states and reduced motion |
| Full marketing templates | Tailwind Plus, Untitled UI, Flowbite, Preline, HyperUI, DaisyUI | Most "generic-looking"; restyle heavily |

---

## Outdated or avoid (Nov 2026)

Collected from all five notes.

| Item | Why | Replace with |
|---|---|---|
| Plyr, Vime | Archived | Video.js v10 / Mux Player / native |
| Standalone Vidstack (new builds) | Points to Video.js 10 | Video.js v10 |
| Locomotive Scroll v4 | Transform-based; breaks sticky | Lenis |
| "GSAP plugins are paid" | All free under Webflow | GSAP |
| Mapbox GL JS v1 forks other than MapLibre | — | MapLibre |
| jQuery sliders (Slick, Owl) | Poor a11y | Embla, Swiper, accessible-slick if stuck |
| Popper.js v2 | Superseded | Floating UI / CSS anchors |
| Focus-trap libs for modals | Native replacement | `<dialog>.showModal()` + `inert` |
| JS masonry libraries | `grid-lanes` + fallback suffices | CSS |
| Scroll-jacking libraries over body content | NN/g | Native scroll |
| GIF spinners, animated GIFs | Weight | CSS loaders, muted video |
| `dialog-closedby-polyfill` | Compromised-package analysis | Hand-written fallback |
| `::-webkit-scrollbar` only | Standard exists | `scrollbar-color` / `scrollbar-width` |
| Tailwind UI (name) | Rebranded Tailwind Plus (verify) | — |

---

## Sources

Fetched: Radix Navigation Menu (https://www.radix-ui.com/primitives/docs/components/navigation-menu); Aceternity UI (https://ui.aceternity.com/components); Magic UI (https://magicui.design/docs/components, https://magicui.design/docs/components/dock); Hover.dev (https://www.hover.dev/components/buttons); Animata (https://animata.design/docs); Cult UI (https://www.cult-ui.com/docs); coss ui (https://coss.com/ui); shadcn/ui changelogs (https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default, https://ui.shadcn.com/docs/changelog/2026-01-base-ui); MUI blog (https://mui.com/blog/2026-and-beyond/); React Aria (https://react-aria.adobe.com/); Ark UI (https://ark-ui.com/); Cally (https://wicky.nillia.ms/cally/); Uppy comparison (https://uppy.io/docs/comparison/); Embla (https://www.embla-carousel.com/); Swiper (https://swiperjs.com/); PhotoSwipe (https://photoswipe.com/); TanStack Table (https://tanstack.com/table/latest); Carousa11y (https://cogapplabs.github.io/carousa11y/research); Sonner docs (https://sonner.emilkowal.ski/toaster); Emil Kowalski articles (https://emilkowal.ski/ui/building-a-toast-component, https://emilkowal.ski/ui/building-a-drawer-component); css-loaders.com (https://css-loaders.com/); Lenis (https://github.com/darkroomengineering/lenis); GSAP pricing (https://gsap.com/pricing/); Vidstack (https://www.vidstack.io/); Mux blog (https://mux.com/blog/five-players-one-future-how-we-re-building-video-js-v10); MapLibre docs (https://maplibre.org/maplibre-gl-js/docs/); Mapbox docs (https://docs.mapbox.com/mapbox-gl-js/guides/); Olivier Larose (https://blog.olivierlarose.com/tutorials); Codrops GitHub (https://github.com/Codrops); Navbar Gallery (https://www.navbar.gallery/); recent.design (http://recent.design/?ref=godly); Awwwards hero collection (https://www.awwwards.com/websites/hero-section/); Lusion (https://lusion.co); Framer marketplace (https://www.framer.com/marketplace/components/magic-blend-cursor/); npm cursor-effects (https://npmjs.com/package/cursor-effects); HTML Burger (https://htmlburger.com/blog/website-preloaders/).

Third-party / search: lavx.hu, InfoQ (Base UI), issoh.co.jp, hextaui; LogRocket date pickers (https://blog.logrocket.com/top-react-date-pickers); Upstash (https://upstash.com/kb/best-react-file-upload-libraries); PkgPulse (uploads, maps); StoreRocket; Geoapify; openapps.pro cmdk; CnCommandPalette; buildmvpfast; agentworkspace palette pack; Abduzeedo (Footer.design); Product Hunt (Navbar Gallery); 21st.dev pages; MarTech Series; Feedbagel; Socket (dialog-closedby-polyfill); Codrops articles.

Source notes: `research_notes/UI components animations and assets/01`–`05_*.md`.
