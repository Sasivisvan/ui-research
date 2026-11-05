# Launch Checklist

A QA and launch checklist to copy into an issue or PR and tick off before going live. It covers performance, accessibility, responsive/mobile, SEO and meta, motion, assets and licences, cross-browser, security and polish. Items come from the research process (note 10, Q7) and the Front-End Checklist. Threshold values are cited in the linked foundation files. Items marked **(synthesis)** are practitioner guidance rather than a cited rule, and **(unverified)** marks claims the research could not confirm.

## Contents

1. [Reference checklists](#1-reference-checklists)
2. [Performance](#2-performance)
3. [Accessibility](#3-accessibility)
4. [Responsive and mobile](#4-responsive-and-mobile)
5. [SEO, meta and content](#5-seo-meta-and-content)
6. [Motion](#6-motion)
7. [Assets and licences](#7-assets-and-licences)
8. [Cross-browser and progressive enhancement](#8-cross-browser-and-progressive-enhancement)
9. [Security and privacy](#9-security-and-privacy)
10. [Polish ("invisible details")](#10-polish-invisible-details)
11. [Distinctiveness check](#11-distinctiveness-check)
12. [Sources](#sources)

---

## 1. Reference checklists

- **Front-End Checklist** — [github.com/thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist):
  - **386 rules in 11 categories**: HTML 25, CSS 32, JS 26, Performance 44, Accessibility 95, SEO 94, Security 22, Images 25, Testing 13, Privacy 5, i18n 5.
  - Each rule is prioritised **Critical / High / Medium / Low**.
  - Web version at **frontendchecklist.io** (`/rules` and `/checklists`) and a **hosted MCP server**. Actively maintained (789 commits).
  - Launch gate: run at least its **Critical and High** rules.
- **The A11y Project checklist** (a11yproject.com/checklist) and the **WebAIM WCAG 2 checklist** (not fetched in the research).

---

## 2. Performance

Details: [performance.md](performance.md).

- [ ] Field CWV at **p75 on mobile**: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (also check desktop separately).
- [ ] Lighthouse **and** WebPageTest run on a **mid-range Android over 4G**.
- [ ] LCP element (hero image or heading) is in the server HTML, not faded in from `opacity:0` with JS (Front-End Checklist: optimise LCP is **Critical**).
- [ ] LCP image has `fetchpriority="high"` (or a `preload`) and is **not** lazy-loaded.
- [ ] Below-the-fold images use `loading="lazy" decoding="async"`; lazy images use `sizes="auto"` or a realistic `sizes`.
- [ ] All media has `width`/`height` or `aspect-ratio`; embeds and ads have reserved space; no banners injected above content after load.
- [ ] Images served as AVIF → WebP → JPEG (image CDN with `f_auto,q_auto` where used).
- [ ] Fonts: self-hosted subset WOFF2, only 1–2 critical faces preloaded, `font-display: swap` (or `optional` for body), fallback metrics matched (`size-adjust` / `ascent-override` / Fontaine / `next/font` / Astro Fonts), max two families and about four files (synthesis).
- [ ] Page weight < **1500KB** (Front-End Checklist, High).
- [ ] Compressed JS under ~150–200KB on content/marketing pages (heuristic, unverified).
- [ ] Scripts loaded with `defer` / `async` / `type=module`; unused CSS removed (Front-End Checklist, High).
- [ ] WebGL / Three.js / Lottie lazy-loaded on interaction or visibility, with a static poster fallback.
- [ ] Long tasks broken up (`scheduler.yield()` or `await`).
- [ ] CDN plus HTTP/2 or HTTP/3 (Front-End Checklist, High); Zstandard or other compression enabled.
- [ ] Speculation Rules added (`moderate` eagerness for prerender; `.no-speculate` on links that must not prerender).
- [ ] **bfcache:** DevTools → Application → Back-forward Cache → Run Test passes; Lighthouse bfcache audit passes; **no `unload` handlers**; HTML not served with `Cache-Control: no-store` unless sensitive; `rel="noopener"` used.

---

## 3. Accessibility

Details: [accessibility.md](accessibility.md). Target: **WCAG 2.2 AA**.

- [ ] axe in CI (e.g. `@axe-core/playwright`) with **zero criticals**; Lighthouse accessibility audit; WAVE pass.
- [ ] Keyboard-only pass: everything reachable and operable, no traps, logical order, skip link works.
- [ ] Visible `:focus-visible` rings everywhere; no `outline: none` without replacement; focus not hidden under sticky headers (`scroll-padding-top`).
- [ ] VoiceOver and NVDA smoke tests (TalkBack on Android if mobile-heavy).
- [ ] Contrast checked in **every theme** (light, dark, over images, over glass): 4.5:1 body, 3:1 large text (≥24px or ≥18.66px bold), 3:1 UI boundaries, focus indicators and meaningful graphics.
- [ ] If APCA was used and a WCAG 2 ratio fails, the decision is documented.
- [ ] Form controls labelled; errors tied to inputs via `aria-describedby`; buttons have accessible names (Front-End Checklist, Critical).
- [ ] No `aria-hidden` on `<body>` (Front-End Checklist, Critical).
- [ ] One `<h1>`, sequential headings, landmarks (`<header>`, `<nav aria-label>`, `<main>`, `<footer>`), `lang` on `<html>`, alt text (empty `alt=""` for decorative images).
- [ ] WCAG 2.2 additions: non-drag alternative (2.5.7), 24×24 targets (2.5.8), no redundant entry (3.3.7), accessible authentication allowing paste and password managers (3.3.8), consistent help (3.2.6).
- [ ] 200% and 400% zoom: no horizontal scroll at 320 CSS px (1.4.10); text-spacing overrides don't break layout (1.4.12).
- [ ] Forced colours (Windows High Contrast) checked.
- [ ] AI-generated components re-checked for ARIA, keyboard support, validation and error states.

---

## 4. Responsive and mobile

Details: [layout-responsive-mobile.md](layout-responsive-mobile.md).

- [ ] Real-device tests on **iOS Safari** and **Android Chrome** for safe areas, `svh`, target sizes and the virtual keyboard.
- [ ] Viewport meta: `width=device-width, initial-scale=1, viewport-fit=cover`; pinch zoom **not** disabled (no `maximum-scale=1` / `user-scalable=no`; Front-End Checklist, High).
- [ ] Full-height sections use `svh` (or `dvh` for exact-fit overlays), not `100vh`.
- [ ] Fixed bars padded with `env(safe-area-inset-*)`.
- [ ] Touch targets ≥ 24×24 CSS px (AA floor), primary controls 44–48px.
- [ ] Primary mobile actions in the thumb zone (bottom third); bottom tab bar ≤ 5 items; key links visible or priority+ rather than a hamburger-only menu on content sites.
- [ ] Full-screen menu uses `<dialog>`/popover with focus trap and Esc to close.
- [ ] Hover effects gated by `@media (hover: hover) and (pointer: fine)`; nothing hidden behind hover.
- [ ] Components respond to container width (container queries); breakpoints set where content breaks (e.g. 40/64/80rem).
- [ ] Relative units used (Front-End Checklist, High).
- [ ] Web App Manifest (Front-End Checklist, Medium): name, 192/512 + maskable icons, `display: standalone`, `theme_color`; HTTPS; optional service worker.
- [ ] `theme-color` metas for light and dark.

---

## 5. SEO, meta and content

- [ ] Meta title and description, **OG tags and OG images**, favicon set.
- [ ] `lang` attribute, `sitemap.xml`, `robots.txt`, canonical URLs.
- [ ] A designed **404 page**.
- [ ] Consistent empty, error and loading states.
- [ ] Copy is specific and in the brand voice ("would the CEO actually say it?"); no vague headlines or hedging superlatives. — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [ ] Front-End Checklist SEO Critical/High rules run (94 SEO rules in total).

---

## 6. Motion

Details: [animations/performance-accessibility.md](../animations/performance-accessibility.md), [accessibility.md](accessibility.md#reduced-motion).

- [ ] **Reduced-motion pass** with the OS setting on: movement swapped for gentle fades, parallax and scroll effects have a static path, nothing essential depends on animation.
- [ ] Auto-playing motion > 5s has pause/stop/hide (2.2.2); background video has a pause control.
- [ ] No more than 3 flashes per second (2.3.1); no seizure-inducing flashing (Front-End Checklist, Critical).
- [ ] Animations use only `transform` and `opacity`; layered shadows not animated; `will-change` only during animation; offscreen canvases paused.
- [ ] Most UI animations under 300ms and interruptible; no animation on high-frequency or keyboard-initiated actions.
- [ ] One orchestrated signature moment per page rather than the same fade-in on every element.
- [ ] Preloader (if any) hides real loading only, is short, shown once per session, skipped under reduced motion, and never blocks LCP on a pure-HTML page (see [components/signature-experiential.md](../components/signature-experiential.md)).

---

## 7. Assets and licences

Details: [assets/licensing-cheatsheet.md](../assets/licensing-cheatsheet.md), [assets/optimization.md](../assets/optimization.md).

- [ ] Every font, icon set, illustration, photo, video, sound and 3D model has a recorded licence and source URL.
- [ ] Attribution added in the product wherever the licence legally requires it.
- [ ] Per-file licences re-checked (Freesound, Sketchfab, Poly Pizza, Wikimedia Commons, Openverse, SoundBible): the main source of accidental CC-BY-NC or attribution violations (note 09).
- [ ] SF Symbols **not** used as web icons until the licence is checked (note 08: treat as not safe for websites).
- [ ] "Custom free" stock licences (Unsplash, Pexels, Pixabay, Mixkit…) checked for bans on resale, redistribution, AI or template use (note 09).
- [ ] Stock and AI art replaced with real product screenshots, real team photos or custom illustration where possible.
- [ ] Images in AVIF/WebP; video WebM/AV1 before MP4 with `poster`; 3D as optimised GLB (Draco/Meshopt, KTX2/WebP textures); sound muted-first and gesture-gated with a global mute (note 09).

---

## 8. Cross-browser and progressive enhancement

Details: [browser-support-2026.md](browser-support-2026.md), [animations/browser-support.md](../animations/browser-support.md).

- [ ] Tested in current Chrome, Firefox and Safari (desktop) plus iOS Safari and Android Chrome.
- [ ] Newly Baseline features (anchor positioning, `@scope`, container style queries, `contrast-color()`, `light-dark()` images) have `@supports` fallbacks for older iOS devices.
- [ ] Relative colour syntax has a static fallback for older Safari.
- [ ] `text-wrap: pretty` treated as enhancement only.
- [ ] Chromium-only features (Speculation Rules, scroll-state queries, `interpolate-size`) degrade harmlessly.
- [ ] Site works when JS fails to load (content visible, no invisible-until-JS sections).

---

## 9. Security and privacy

- [ ] Security headers: **CSP**, **HSTS**.
- [ ] Analytics with **consent**.
- [ ] Front-End Checklist Security (22) and Privacy (5) Critical/High rules run.

---

## 10. Polish ("invisible details")

(synthesis)
- [ ] `text-wrap: balance` on headings, `pretty` on paragraphs.
- [ ] `font-variant-numeric: tabular-nums` for figures; optical sizing.
- [ ] Hue-tinted shadows from one light source.
- [ ] Custom `::selection`; scrollbar colour per theme.
- [ ] `:focus-visible` rings styled to the brand.
- [ ] No flash of the wrong theme on load.

---

## 11. Distinctiveness check

Editor's note: a final pass against the slop tells in [00-start-here](../00-start-here.md#what-generic-ai-slop-design-looks-like).
- [ ] Brand typeface is not Inter/Roboto/Open Sans/Lato/system, and not a second-tier default (e.g. Space Grotesk) chosen by habit.
- [ ] Palette is not purple/indigo-on-white, nor the new clichés (warm cream + terracotta, near-black + acid green), unless the concept demands it.
- [ ] Layout is not centred hero + one CTA + three icon cards; radius, padding and card sizes vary deliberately.
- [ ] Every hover and press state does something; motion signals state changes.

## Sources

- [Front-End Checklist (thedaviddias)](https://github.com/thedaviddias/Front-End-Checklist)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Back/forward cache](https://web.dev/articles/bfcache)
- [W3C: Understanding SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [925 Studios: AI Slop Web Design guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- Not fetched, for manual use: a11yproject.com/checklist, WebAIM WCAG 2 checklist
- Research notes: `10_craft_responsive_performance_a11y.md` (Q4–Q7); asset items from note 08 and 09 takeaways
