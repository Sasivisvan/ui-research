# Components Index

This folder is the component reference for building distinctive, accessible websites (desktop and mobile) as of November 2026. It covers 50 components in five files. Every component section follows the same template: what and when, variants with rebuildable specs, crafted vs generic, desktop vs mobile, accessibility, code, libraries, inspiration links, and caveats with verification status. A sixth file, [component-libraries.md](component-libraries.md), registers every library, snippet site and inspiration gallery named across the research. Use the table below to jump to a component, then use the "How to pick components for a site" section to decide which ones a given site needs.

## Contents

- [Files](#files)
- [All 50 components](#all-50-components)
- [How to pick components for a site](#how-to-pick-components-for-a-site)
- [Verification conventions](#verification-conventions)
- [Sources](#sources)

## Files

| File | Components | Covers |
|---|---|---|
| [navigation-structure.md](navigation-structure.md) | 1–10 | Headers, menus, sidebars, tab bars, breadcrumbs, tabs, pagination, footers, scroll/TOC indicators, skip links |
| [actions-inputs.md](actions-inputs.md) | 11–20 | Buttons, links, inputs, forms, choice controls, selects, sliders, search, date pickers, upload |
| [content-display.md](content-display.md) | 21–30 | Heroes, cards, bento/masonry, galleries, carousels, accordions, tables, testimonials, pricing, timelines/stats |
| [feedback-overlays.md](feedback-overlays.md) | 31–40 | Modals/sheets, toasts, tooltips/popovers, alerts/consent, loaders, skeletons, progress, badges, empty/404, avatars |
| [signature-experiential.md](signature-experiential.md) | 41–50 | Cursors, smooth scroll, preloaders, CTAs, contact, team/about, portfolio, video, maps, switchers and floating elements |
| [component-libraries.md](component-libraries.md) | — | Headless primitives, kits, effect libraries, specialist widgets, galleries, studios, outdated list |

## All 50 components

| # | Component | One-line description | Link |
|---|---|---|---|
| 1 | Headers and navbars | Sticky, hide-on-scroll and scroll-state headers, from static bars to morphing floating navs | [navigation-structure.md#1](navigation-structure.md#1-headers-and-navbars) |
| 2 | Menu types | Dropdowns, mega menus, full-screen and off-canvas menus, command palettes, Codrops-style menu motion | [navigation-structure.md#2](navigation-structure.md#2-menu-types) |
| 3 | Sidebars and side navigation | Collapsible, icon-rail and hover-expanding side navigation for apps and docs | [navigation-structure.md#3](navigation-structure.md#3-sidebars-and-side-navigation) |
| 4 | Mobile bottom tab bars | Thumb-zone primary navigation for phones, with active indicators and safe-area handling | [navigation-structure.md#4](navigation-structure.md#4-mobile-bottom-tab-bars) |
| 5 | Breadcrumbs | Hierarchy trails with truncation patterns for deep sites and mobile | [navigation-structure.md#5](navigation-structure.md#5-breadcrumbs) |
| 6 | Tabs and segmented controls | Sliding-indicator tabs and radio-based segmented controls | [navigation-structure.md#6](navigation-structure.md#6-tabs-and-segmented-controls) |
| 7 | Pagination, infinite scroll and load more | Choosing and building paged vs continuous listing navigation | [navigation-structure.md#7](navigation-structure.md#7-pagination-infinite-scroll-and-load-more) |
| 8 | Footers | Big-type, sticky reveal ("curtain") and structured footers | [navigation-structure.md#8](navigation-structure.md#8-footers) |
| 9 | Scroll progress, section indicators and TOC nav | Reading-progress bars, chapter rails and scroll-spy tables of contents | [navigation-structure.md#9](navigation-structure.md#9-scroll-progress-section-indicators-and-toc-nav) |
| 10 | Skip links and anchor navigation | Skip-to-content links and in-page anchor navigation with fixed-header offsets | [navigation-structure.md#10](navigation-structure.md#10-skip-links-and-anchor-navigation) |
| 11 | Buttons | Primary/secondary/ghost through magnetic, 3D-press, shimmer and liquid-glass buttons | [actions-inputs.md#11](actions-inputs.md#11-buttons) |
| 12 | Links and text-link styles | Underline, hover and animated text-link treatments | [actions-inputs.md#12](actions-inputs.md#12-links-and-text-link-styles) |
| 13 | Text inputs and textareas | Labelled fields, validation states and creative input styles | [actions-inputs.md#13](actions-inputs.md#13-text-inputs-and-textareas) |
| 14 | Forms and multi-step wizards | Form layout, validation timing, error summaries and multi-step flows | [actions-inputs.md#14](actions-inputs.md#14-forms-and-multi-step-wizards) |
| 15 | Checkboxes, radios and toggle switches | Native-based choice controls with custom styling | [actions-inputs.md#15](actions-inputs.md#15-checkboxes-radios-and-toggle-switches) |
| 16 | Selects, dropdowns, comboboxes and multiselect | Native and custom selection controls, including `appearance: base-select` | [actions-inputs.md#16](actions-inputs.md#16-selects-dropdowns-comboboxes-and-multiselect) |
| 17 | Sliders, steppers and ratings | Range sliders, number steppers and star ratings with APG keyboard support | [actions-inputs.md#17](actions-inputs.md#17-sliders-steppers-and-ratings) |
| 18 | Search bars | Expanding, instant and command-style search inputs | [actions-inputs.md#18](actions-inputs.md#18-search-bars) |
| 19 | Date and time pickers | Segmented date fields, calendars and memorable-date patterns | [actions-inputs.md#19](actions-inputs.md#19-date-and-time-pickers) |
| 20 | File upload and drop zones | Drag-and-drop zones with progress, errors and library choices | [actions-inputs.md#20](actions-inputs.md#20-file-upload-and-drop-zones) |
| 21 | Hero sections | Kinetic-type, media, interactive/3D and static heroes that load fast | [content-display.md#21](content-display.md#21-hero-sections) |
| 22 | Cards | Product, profile, tilt, spotlight, flip and expandable cards as single clickable units | [content-display.md#22](content-display.md#22-cards) |
| 23 | Bento grids and masonry layouts | Asymmetric tile grids and masonry with `grid-lanes` progressive enhancement | [content-display.md#23](content-display.md#23-bento-grids-and-masonry-layouts) |
| 24 | Image galleries and lightboxes | Justified, editorial and WebGL galleries plus zoomable lightboxes | [content-display.md#24](content-display.md#24-image-galleries-and-lightboxes) |
| 25 | Carousels, sliders and marquees | Peek-row carousels, native CSS carousels, logo marquees and library picks | [content-display.md#25](content-display.md#25-carousels-sliders-and-marquees) |
| 26 | Accordions and FAQ sections | Native `<details>` accordions, exclusive groups and animated height | [content-display.md#26](content-display.md#26-accordions-and-faq-sections) |
| 27 | Data tables and lists | Semantic sortable tables and responsive mobile table patterns | [content-display.md#27](content-display.md#27-data-tables-and-lists) |
| 28 | Testimonials, social proof and logo clouds | Credible, specific social proof and decorative logo walls | [content-display.md#28](content-display.md#28-testimonials-social-proof-and-logo-clouds) |
| 29 | Pricing tables and feature comparison | Plan cards, billing toggles and comparison matrices | [content-display.md#29](content-display.md#29-pricing-tables-and-feature-comparison) |
| 30 | Timelines, stats and feature sections | Scroll-progress timelines, run-once counters and feature tours | [content-display.md#30](content-display.md#30-timelines-stats-and-feature-sections) |
| 31 | Modals, dialogs and bottom sheets | Native `<dialog>` modals, alert dialogs, side sheets and Vaul-style draggable bottom sheets | [feedback-overlays.md#31](feedback-overlays.md#31-modals-dialogs-and-bottom-sheets) |
| 32 | Toasts, snackbars and notifications | Sonner-grade stacked toasts with live regions, pause-on-hover and swipe dismiss | [feedback-overlays.md#32](feedback-overlays.md#32-toasts-snackbars-and-notifications) |
| 33 | Tooltips and popovers | Native `popover="hint"` / `interestfor` tooltips and anchor-positioned popovers | [feedback-overlays.md#33](feedback-overlays.md#33-tooltips-and-popovers) |
| 34 | Alerts, banners and cookie consent | Inline alerts, system banners and equal-weight cookie consent | [feedback-overlays.md#34](feedback-overlays.md#34-alerts-banners-and-cookie-consent) |
| 35 | Loaders and spinners | Single-element CSS loaders with delayed appearance and reduced-motion fallbacks | [feedback-overlays.md#35](feedback-overlays.md#35-loaders-and-spinners) |
| 36 | Skeleton screens and shimmer | Layout-matching skeletons with synchronized shimmer for 1–10 s loads | [feedback-overlays.md#36](feedback-overlays.md#36-skeleton-screens-and-shimmer) |
| 37 | Progress bars, steppers and rings | Determinate bars, `@property` rings and accessible steppers | [feedback-overlays.md#37](feedback-overlays.md#37-progress-bars-steppers-and-rings) |
| 38 | Badges, chips, tags and pills | Status/count badges, filter and input chips, category tags | [feedback-overlays.md#38](feedback-overlays.md#38-badges-chips-tags-and-pills) |
| 39 | Empty states, error pages and 404 | Status-teaching empty states, error states and creative 404s | [feedback-overlays.md#39](feedback-overlays.md#39-empty-states-error-pages-and-404) |
| 40 | Avatars, avatar groups and presence | Fallback avatars, mask-cut overlapping groups and non-colour-only presence | [feedback-overlays.md#40](feedback-overlays.md#40-avatars-avatar-groups-and-presence) |
| 41 | Custom cursors | Gated, meaningful cursor layers: labelled, blend, magnetic, image-reveal, trails | [signature-experiential.md#41](signature-experiential.md#41-custom-cursors) |
| 42 | Custom scrollbars and smooth scrolling | Lenis smooth scroll on wheel only, progress rails and styled scrollbars | [signature-experiential.md#42](signature-experiential.md#42-custom-scrollbars-and-smooth-scrolling) |
| 43 | Preloaders, intro screens and splash counters | Honest, capped, once-per-session branded intros and counters | [signature-experiential.md#43](signature-experiential.md#43-preloaders-intro-screens-and-splash-counters) |
| 44 | CTA sections and newsletter signups | Giant-type, magnetic and footer-merged CTAs; newsletter forms with voice | [signature-experiential.md#44](signature-experiential.md#44-cta-sections-and-newsletter-signups) |
| 45 | Contact sections and contact forms | Email-as-hero, local clock, chip brief builders and progressively enhanced forms | [signature-experiential.md#45](signature-experiential.md#45-contact-sections-and-contact-forms) |
| 46 | Team and about sections | Scroll-lit manifestos, hover portraits and honest numbers | [signature-experiential.md#46](signature-experiential.md#46-team-and-about-sections) |
| 47 | Portfolio, work showcases and case-study layouts | Index lists with cursor reveals, pinned galleries and list-to-case morphs | [signature-experiential.md#47](signature-experiential.md#47-portfolio-work-showcases-and-case-study-layouts) |
| 48 | Video players and media embeds | Video.js v10, accessible background loops, facades and custom controls | [signature-experiential.md#48](signature-experiential.md#48-video-players-and-media-embeds) |
| 49 | Maps and location sections | Brand-styled MapLibre maps behind static facades, or no map at all | [signature-experiential.md#49](signature-experiential.md#49-maps-and-location-sections) |
| 50 | Theme switchers, language switchers, back-to-top and floating elements | No-flash 3-state theme toggles, native-name language switchers, intent-based back-to-top | [signature-experiential.md#50](signature-experiential.md#50-theme-switchers-language-switchers-back-to-top-and-floating-elements) |

## How to pick components for a site

Editor's note: this section is connective guidance assembled from rules stated across the five component files and research notes 01–05. Each rule links to where its source is cited.

### 1. Start from the site type, not the component list

| Site type | Core set | Signature candidates (pick one or two) |
|---|---|---|
| Studio / portfolio | 1, 2, 8, 21, 47, 44, 45, 46, 50 | 41 labelled cursor, 43 counter intro, 42 Lenis, 47 list-to-case morph, 48 reel |
| SaaS / product marketing | 1, 2, 21, 22, 23, 28, 29, 26, 8, 44 | 30 scroll timeline, 25 logo marquee, 23 bento with live demos |
| App / dashboard | 3 or 4, 6, 11–20, 27, 31, 32, 35–40 | 2 command palette, 32 promise toasts |
| Content / editorial / docs | 1, 5, 9, 10, 26, 7 | 42 progress rail, 46 scroll-lit text |
| Commerce | 1, 2, 4, 18, 22, 24, 25, 7, 29, 32, 39 | 24 shared-element lightbox, 50 speed-dial FAB (mobile only) |

### 2. One signature interaction, a coherent motion system

From [signature-experiential.md, cross-cutting](signature-experiential.md#cross-cutting-recurring-patterns-learning-path-and-studios): one signature interaction tied to the brand idea, a coherent motion system (same easing, lerp and timing everywhere), real content and photography, and graceful fallbacks on touch and under reduced motion. "Generic sites stack every effect at once." In practice:
- Pick at most one or two of 41–50 as the site's signature. Make everything else quiet and correct.
- Share one easing and timing set across components (e.g. the iOS-sheet curve `cubic-bezier(.32,.72,0,1)` used in [31](feedback-overlays.md#31-modals-dialogs-and-bottom-sheets) and [37](feedback-overlays.md#37-progress-bars-steppers-and-rings)), and the same lerp for cursor and scroll ([41](signature-experiential.md#41-custom-cursors)).

### 3. Prefer native first, then headless, then effects

- Native HTML/CSS now covers dialogs, popovers, anchor positioning, invoker commands, `<details>` accordions, scroll-snap carousels and enter/exit animation. Check the support matrix in [feedback-overlays.md](feedback-overlays.md#platform-primer-the-native-first-overlay-stack-nov-2026) and [../foundations/browser-support-2026.md](../foundations/browser-support-2026.md).
- For behaviour that native can't cover, use headless primitives: Base UI / shadcn, React Aria, Radix, Ark UI ([component-libraries.md, 1](component-libraries.md#1-headless-and-accessible-primitives)).
- Treat effect registries (Aceternity, Magic UI, 21st.dev, Uiverse) as starting points. They are the main source of the "template look"; restyle easing, colour, density and scale, and add a11y yourself ([component-libraries.md, how to use](component-libraries.md#how-to-use-this-register)).

### 4. Pick feedback components by severity and wait time

- Transient success → toast. Action needed but non-blocking → inline alert or banner. Blocking or irreversible → `alertdialog`. Form errors → inline, never toast-only ([severity map](feedback-overlays.md#choosing-a-feedback-component-severity-and-timing)).
- Under 1 s → show nothing. Under 10 s → skeleton for a full page, spinner for one module. Over 10 s → progress bar with a time estimate (NN/g).
- Modals only for critical warnings, missing info, wizard steps or one profiling question. Never for newsletters ([31](feedback-overlays.md#31-modals-dialogs-and-bottom-sheets)).

### 5. Drop or swap components that research says underperform

- Auto-rotating hero carousels: use a single static hero ([content-display.md, 25](content-display.md#25-carousels-sliders-and-marquees)).
- Scrolljacking over text or on mobile ([42](signature-experiential.md#42-custom-scrollbars-and-smooth-scrolling)).
- Fake preloaders on pure-HTML pages ([43](signature-experiential.md#43-preloaders-intro-screens-and-splash-counters)).
- Full-width default Google Maps iframes ([49](signature-experiential.md#49-maps-and-location-sections)).
- Back-to-top on pages shorter than about 4 screens ([50](signature-experiential.md#50-theme-switchers-language-switchers-back-to-top-and-floating-elements)).
- Archived or outdated libraries: see [component-libraries.md, outdated](component-libraries.md#outdated-or-avoid-nov-2026).

### 6. Plan desktop and mobile together

- Hover-only effects (cursors, image reveals, magnetic buttons) need touch replacements: visible labels, inline thumbnails, tap-to-expand. Gate them behind `(hover: hover) and (pointer: fine)` ([41](signature-experiential.md#41-custom-cursors)).
- Desktop dialogs become bottom sheets or full screen on mobile ([31](feedback-overlays.md#31-modals-dialogs-and-bottom-sheets)). Pinned horizontal galleries become native swipe rows ([47](signature-experiential.md#47-portfolio-work-showcases-and-case-study-layouts)).
- Floating elements respect `env(safe-area-inset-*)`, never stack in one corner, and hide while the keyboard is open ([50](signature-experiential.md#50-theme-switchers-language-switchers-back-to-top-and-floating-elements)).

### 7. Run the pre-ship checklist

Use the [performance and accessibility pitfalls checklist](signature-experiential.md#cross-cutting-performance-and-accessibility-pitfalls-checklist) plus [../foundations/accessibility.md](../foundations/accessibility.md) and [../foundations/performance.md](../foundations/performance.md). Check keyboard, screen reader, `prefers-reduced-motion`, touch, and a mid-range Android phone with 4× CPU throttling.

## Verification conventions

Each file keeps the research notes' confidence markers. Fetched or visited means the page was read. Search means it was seen in search results only. Prior or background knowledge means not re-verified. Synthesis means researcher-built guidance. Untested snippet means the code was not run in a browser. "Editor's note:" marks guidance added while organising the docs. A marker is never upgraded between files. Check the legend at the top of each file.

## Sources

The component files are transferred from the research notes in `research_notes/UI components animations and assets/`:
- `01_navigation_structure_components.md` → [navigation-structure.md](navigation-structure.md)
- `02_action_input_components.md` → [actions-inputs.md](actions-inputs.md)
- `03_content_display_components.md` → [content-display.md](content-display.md)
- `04_feedback_overlay_components.md` → [feedback-overlays.md](feedback-overlays.md)
- `05_signature_experiential_components.md` → [signature-experiential.md](signature-experiential.md)
- Notes 01–05 together → [component-libraries.md](component-libraries.md)

Each file ends with its own Sources list of the URLs it cites.
