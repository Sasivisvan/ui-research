# Performance

Targets and techniques for keeping an animated, asset-rich site fast: Core Web Vitals thresholds, the usual failure modes of craft sites, LCP, images, font loading, JS budgets, animation cost, CLS, video, Speculation Rules and the back/forward cache. Facts are as of 5 Nov 2026. Cited facts carry inline links. **(synthesis)** marks established practice not re-verified item by item, and **(unverified)** marks figures the research could not confirm. Snippets are untested unless they are quoted from a source.

## Contents

1. [Core Web Vitals thresholds](#1-core-web-vitals-thresholds)
2. [Why craft sites fail](#2-why-craft-sites-fail)
3. [Front-End Checklist performance rules](#3-front-end-checklist-performance-rules)
4. [LCP](#lcp)
5. [Images](#5-images)
6. [Fonts](#fonts)
7. [JavaScript budget](#7-javascript-budget)
8. [Animation performance](#8-animation-performance)
9. [CLS](#9-cls)
10. [Video](#10-video)
11. [Speculation Rules](#11-speculation-rules)
12. [bfcache](#12-bfcache)
13. [Compression and delivery](#13-compression-and-delivery)
14. [Measuring](#14-measuring)
15. [Gaps](#15-gaps)
16. [Sources](#sources)

---

## 1. Core Web Vitals thresholds

Source: [web.dev: Web Vitals](https://web.dev/articles/vitals) (page last updated 31 Oct 2024).

| Metric | Good | Needs improvement (unverified) | Poor (unverified) |
|---|---|---|---|
| LCP (Largest Contentful Paint) | **≤ 2.5s** | 2.5–4s | > 4s |
| INP (Interaction to Next Paint) | **≤ 200ms** | 200–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | **≤ 0.1** | 0.1–0.25 | > 0.25 |

- Assessed at the **75th percentile** of page loads, **segmented mobile and desktop**.
- INP became a stable Core Web Vital in **2024, replacing FID**.
- The "needs improvement" and "poor" ranges were only in images on web.dev and are unverified.
- No evidence was found of threshold changes in 2025–2026.

---

## 2. Why craft sites fail

The usual culprits:
- **LCP:** a lazy-loaded or JS-revealed hero image.
- **INP:** a heavy animation or JS bundle.
- **CLS:** late fonts or unsized media.

Speculation Rules and bfcache give near-instant navigations almost for free (sections [11](#11-speculation-rules) and [12](#12-bfcache)).

Editor's note: note 05 lists the four most common signature-component failures: hiding the native cursor sitewide and animating layout properties; scroll-rate or direction hijacking; fake preloaders that delay ready content or keep it invisible when JS fails; background video that becomes the LCP element, autoplays without a pause control, or ignores reduced-motion and Save-Data. See [components/signature-experiential.md](../components/signature-experiential.md) and [animations/performance-accessibility.md](../animations/performance-accessibility.md).

---

## 3. Front-End Checklist performance rules

Source: [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist) (44 performance rules).
- **Critical:** optimise LCP.
- **High:** CLS < 0.1; INP < 200ms; page weight < **1500KB**; use a CDN plus HTTP/2 or HTTP/3; optimise web-font loading; load scripts with `defer` / `async` / `type=module`; remove unused CSS.

---

## LCP

(synthesis)
- The hero image or heading must be **in the server HTML**. Don't fade in the LCP element from `opacity:0` with JS.
- Use `<link rel="preload" as="image" fetchpriority="high">` or `fetchpriority="high"` on the `<img>`.
- Serve AVIF from an image CDN (**Cloudinary, imgix, Vercel/Netlify image, Cloudflare Images**) with `f_auto,q_auto` and width variants.
- Kinetic-typography heroes must not hide LCP text (see [00-start-here](../00-start-here.md#named-aesthetics)).

```html
<link rel="preload" as="image" href="/hero-1600.avif" fetchpriority="high">
```
(Editor's note: `href` is a placeholder; the rule above names only the attributes.)

---

## 5. Images

- `sizes="auto"` with lazy-loading is now cross-browser (Safari 27, Chrome 126+, Firefox). — [web.dev Sept 2026](https://web.dev/blog/web-platform-09-2026)
- (synthesis) AVIF → WebP → JPEG via `<picture>`; `srcset` widths 400/800/1200/1600/2400 with a realistic `sizes`; always `width`/`height` or `aspect-ratio`; LCP image `fetchpriority="high"` and not lazy; below-the-fold `loading="lazy" decoding="async"`. Full pattern in [layout-responsive-mobile.md](layout-responsive-mobile.md#12-responsive-images).

---

## Fonts

(synthesis)
- **Self-host WOFF2 variable fonts** and **subset** them (Latin).
- **Preload only the one or two critical faces.**
- `font-display: swap` (or `optional` for body).
- Match fallback metrics with `size-adjust` / `ascent-override` (or **Fontaine**, Next **`next/font`**, **Astro Fonts**) to stop CLS.
- Keep it to **two families and about four files maximum**.

Editor's note: the following assembles the rules above; family and file names are placeholders and the override percentages must be computed for your font (e.g. with Fontaine). Untested.

```html
<link rel="preload" href="/fonts/display-var.woff2" as="font" type="font/woff2" crossorigin>
```
```css
@font-face {
  font-family: "Display";
  src: url("/fonts/display-var.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}
@font-face {               /* metric-matched fallback to cut CLS */
  font-family: "Display Fallback";
  src: local("Arial");
  size-adjust: 100%;       /* compute real value */
  ascent-override: 90%;    /* compute real value */
}
h1 { font-family: "Display", "Display Fallback", sans-serif; }
```

See [assets/fonts.md](../assets/fonts.md) for sources, licences and subsetting.

---

## 7. JavaScript budget

(synthesis)
- Aim for under **~150–200KB of compressed JS** on content and marketing pages. Commonly cited heuristic (Alex Russell's performance-inequality posts), not fetched; no authoritative 2026 number was found.
- Ship **zero JS by default** with islands (Astro). See [tech-stacks.md](tech-stacks.md).
- **Lazy-load WebGL / Three.js / Lottie** on interaction or on visibility, and give a **static poster fallback**.
- Break long tasks with `scheduler.yield()` or `await` to protect INP.
- Load scripts with `defer` / `async` / `type=module` (Front-End Checklist, High).

---

## 8. Animation performance

Cited:
- Animate **only `transform` and `opacity`** (they skip layout and paint). Animating padding or margin triggers layout, paint and composite. Target **60fps**. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- Under main-thread load, **CSS and WAAPI** animations can be hardware-accelerated; **Framer Motion's rAF-driven** animations are not, so they may stutter. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- **Layered box-shadows are expensive**; don't animate them. — [Josh Comeau](https://www.joshwcomeau.com/css/designing-shadows/)

Synthesis:
- Prefer CSS and WAAPI, **scroll-driven animations** (`animation-timeline: view()`) and **View Transitions** over JS scroll listeners.
- Use `will-change` sparingly and only during the animation.
- Pause offscreen canvases with **IntersectionObserver** and honour `prefers-reduced-motion`.
- Glassmorphism (`backdrop-filter: blur()`) carries a performance risk on mobile.

Editor's note: per-library and per-technique costs are in [animations/performance-accessibility.md](../animations/performance-accessibility.md) and [animations/libraries.md](../animations/libraries.md).

---

## 9. CLS

(synthesis)
- Give media `width` / `height` / `aspect-ratio`, and **reserve space** for embeds and ads.
- Don't inject banners above content after load.
- Match font fallback metrics ([Fonts](#fonts)).

---

## 10. Video

(synthesis)
- `preload="none"` or `metadata` with a **poster**.
- Autoplay **muted only**; ship short **AV1 / H.264** loops.
- Offer a **pause control** (WCAG 2.2.2 for motion over 5s).

Editor's note: delivery details (WebM/AV1 before MP4, `autoplay muted loop playsinline`, mobile Chrome buffering nothing by default) are in [assets/video.md](../assets/video.md).

---

## 11. Speculation Rules

Source: [Chrome for Developers: Prerender pages](https://developer.chrome.com/docs/web-platform/prerender-pages).

```html
<script type="speculationrules">
{ "prerender": [{ "where": { "and": [ { "href_matches": "/*" },
      { "not": { "selector_matches": ".no-speculate" } } ] },
    "eagerness": "moderate" }] }
</script>
```

| Eagerness | When it fires |
|---|---|
| `immediate` | Immediately; the **default for list rules** |
| `eager` | Very early; its timing changed in **Chrome 143** |
| `moderate` | After about **200ms of hover**, on pointerdown, or on mobile viewport heuristics |
| `conservative` | On pointer or touch down; the **default for document rules** |

- **Limits:** 50 prefetches and 10 prerenders for `immediate`; about **2 (FIFO)** for the other levels.
- Disabled under **Save-Data, energy saver and memory pressure**.
- `<link rel="prerender">` is **deprecated**.
- Can also be delivered with a **`Speculation-Rules` HTTP header**.
- Support: **Chromium only** for full support (Chrome/Edge 109+; eagerness from 121). Firefox has it in Technology Preview; Safari behind a flag. Harmless elsewhere.
- Add `.no-speculate` (per the snippet) to links that must not be prerendered, such as logout or cart actions (Editor's note: example use, not from the source).

---

## 12. bfcache

Source: [web.dev: bfcache](https://web.dev/articles/bfcache).
- **Never use `unload`**; use `pagehide`. Add `beforeunload` only while there are unsaved changes.
- Avoid `Cache-Control: no-store` on the HTML except for sensitive pages; use `no-cache` or `max-age=0` instead.
- Close **WebSockets, IndexedDB connections and in-flight fetches** in `pagehide`, and reopen them in `pageshow`, checking `event.persisted`.
- Use `rel="noopener"`.
- Test with **DevTools → Application → Back-forward Cache → Run Test**, and with **Lighthouse's bfcache audit**. Measure in the field with the **`NotRestoredReasons` API**.

Editor's note: a minimal shape of the handlers described above (untested):

```js
addEventListener('pagehide', () => { socket?.close(); db?.close(); });
addEventListener('pageshow', (event) => { if (event.persisted) { reconnect(); } });
```

---

## 13. Compression and delivery

- **Zstandard compression** is Baseline 2026. — [web.dev Baseline 2026](https://web.dev/baseline/2026)
- CDN plus HTTP/2 or HTTP/3; page weight under 1500KB (Front-End Checklist, High).

---

## 14. Measuring

(synthesis, from the launch process)
- CWV in the field: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at **p75 on mobile**.
- **Lighthouse plus WebPageTest** on a **mid-range Android over 4G**.
- bfcache test in DevTools; confirm no `unload` handlers.

---

## 15. Gaps

- "Needs improvement" and "poor" CWV ranges were only in images on web.dev; the values above are unverified.
- No authoritative 2026 JS-budget number; 150–200KB is a heuristic.
- No evidence of CWV threshold changes in 2025–2026 (web.dev page updated Oct 2024).

## Sources

- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: Back/forward cache](https://web.dev/articles/bfcache)
- [Chrome for Developers: Prerender pages in Chrome for instant page navigations](https://developer.chrome.com/docs/web-platform/prerender-pages)
- [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026)
- [web.dev: Baseline 2026](https://web.dev/baseline/2026)
- [Front-End Checklist (thedaviddias)](https://github.com/thedaviddias/Front-End-Checklist)
- [Emil Kowalski: Great animations](https://emilkowal.ski/ui/great-animations)
- [Josh W. Comeau: Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- Research note: `research_notes/UI components animations and assets/10_craft_responsive_performance_a11y.md` (Q3, Q5)
