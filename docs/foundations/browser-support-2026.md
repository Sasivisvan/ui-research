# Browser Support 2026 (Modern CSS and Platform)

Which modern CSS and platform features are safe to ship in November 2026, which need fallbacks, and how confident each claim is. Each row says whether the fact was **cited** (read from the linked source in the research), from a **secondary source**, or **(bg)**: background knowledge with Baseline dates as remembered, not re-verified. caniuse.com was not fetched, so treat (bg) versions as approximate. Animation-specific features (View Transitions, scroll-driven animations, `@starting-style`, `interpolate-size`, `linear()`) are covered in [animations/browser-support.md](../animations/browser-support.md).

## Contents

1. [Summary](#1-summary)
2. [How to read "Baseline"](#2-how-to-read-baseline)
3. [Master support table](#3-master-support-table)
4. [Baseline 2026 list (web.dev)](#4-baseline-2026-list-webdev)
5. [September 2026 releases](#5-september-2026-releases)
6. [Feature notes](#6-feature-notes)
7. [Conflicts with other research notes](#7-conflicts-with-other-research-notes)
8. [Unconfirmed](#8-unconfirmed)
9. [Fallback patterns](#9-fallback-patterns)
10. [Sources](#sources)

---

## 1. Summary

By late 2026 nearly everything listed is usable in production:
- **Anchor positioning** became Baseline in **January 2026** (Firefox 147).
- **`@scope`** and **container style queries** are Baseline 2026.
- **`light-dark()`** already works and gained image support in **Sept 2026**.
- **Container size queries, `:has()`, subgrid, OKLCH, nesting and `text-wrap: balance`** have been Baseline since 2023–24 (bg).
- **`text-wrap: pretty`** should still be treated as progressive enhancement.

---

## 2. How to read "Baseline"

- **Baseline Newly available** means every core browser supports the feature.
- **Widely available** comes about **30 months later**.
- For broad public audiences on older iOS devices, newly available features need **`@supports` fallbacks**.

---

## 3. Master support table

| Feature | Status Nov 2026 | Confidence | Use |
|---|---|---|---|
| Container size queries + units (`cqw/cqh/cqi/cqb/cqmin/cqmax`) | Baseline since Feb 2023 | bg | Yes, primary component-responsive tool |
| Container **style** queries | Baseline 2026 | cited ([web.dev](https://web.dev/baseline/2026)) | Yes, with fallback for older devices |
| `:has()` | Baseline since Dec 2023 | bg | Yes |
| Subgrid | Baseline since Sept 2023 | bg | Yes |
| OKLCH / `oklch()` | Baseline 2023 | bg | Yes; author tokens in OKLCH |
| Relative colour syntax (`oklch(from …)`) | Cross-browser by 2026; "Baseline Newly Available as of May 2026" | secondary sources only | Yes, with static fallback for older Safari |
| `light-dark()` | Baseline 2024 | bg | Yes; requires `color-scheme` |
| `light-dark()` with `<image>` values | Chrome 150, Firefox 150, Safari 27 (Sept 2026) | cited ([web.dev](https://web.dev/blog/web-platform-09-2026)) | Progressive enhancement until widely available |
| `alpha()` | Firefox 155, Safari 27 (Chrome 152) | cited ([web.dev](https://web.dev/blog/web-platform-09-2026)) | Newly available |
| `contrast-color()` | Baseline 2026 | cited ([web.dev](https://web.dev/baseline/2026)) | Newly available; fallback colour |
| CSS nesting | Baseline Dec 2023 | bg | Yes |
| `@scope` | Baseline 2026 | cited ([web.dev](https://web.dev/baseline/2026)) | Yes, newly available; consider widely-available lag |
| Anchor positioning | Baseline Newly available Jan 2026 (Firefox 147) | cited ([web.dev](https://web.dev/blog/web-platform-01-2026)); conflicting details, see below | Yes for tooltips/menus; keep a positioned fallback |
| `anchor-scope` | Baseline 2026 | search result only (MDN social post) | Newly available |
| `field-sizing` | Baseline 2026 | cited ([web.dev](https://web.dev/baseline/2026)) | Newly available |
| `:open` | Baseline 2026 | cited | Newly available |
| `shape()` | Baseline 2026 | cited | Newly available |
| Custom highlights | Baseline 2026 | cited | Newly available |
| `text-indent: hanging / each-line` | Baseline 2026 | cited | Newly available |
| Active view transition | Baseline 2026 | cited | Newly available |
| `rcap / rch / rex / ric` units | Baseline 2026 | cited | Newly available |
| `text-decoration-skip-ink: all` | Baseline 2026 | cited | Newly available |
| `text-wrap: balance` | Baseline 2024 | bg | Yes on headings |
| `text-wrap: pretty` | Chromium + Safari; Firefox status unverified | bg | Progressive enhancement only |
| `progress()` | Shipped in Sept 2026 releases | cited ([web.dev](https://web.dev/blog/web-platform-09-2026)) | Check per-browser before relying on it |
| `revert-rule` | Shipped in Sept 2026 releases | cited | Check per-browser |
| Scroll anchoring (`overflow-anchor`) | Now in Safari 27 | cited | Yes |
| `sizes="auto"` for lazy images | Safari 27; Chrome 126; Firefox already had it | cited ([web.dev](https://web.dev/blog/web-platform-09-2026)) | Yes, cross-browser |
| Viewport units `svh / lvh / dvh` | Standard; plain `vh` = `lvh` | cited ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/length)) | Yes |
| Speculation Rules | Chromium only: Chrome/Edge 109+, eagerness from 121; Firefox Technology Preview; Safari behind a flag | cited ([Chrome](https://developer.chrome.com/docs/web-platform/prerender-pages)) | Yes, harmless elsewhere |
| Navigation API | Baseline 2026 | cited ([web.dev](https://web.dev/baseline/2026)) | Newly available |
| Trusted Types | Baseline 2026 | cited | Newly available |
| Zstandard compression | Baseline 2026 | cited | Yes |
| Reporting API | Baseline 2026 | cited | Newly available |
| WebTransport | Baseline 2026 | cited | Newly available |
| `@starting-style` | Support "wasn't yet broad" at Tailwind v4 launch (Jan 2025) | cited ([Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4)) | See [animations/browser-support.md](../animations/browser-support.md) for 2026 status |
| `@layer`, `@property`, `color-mix()` | Required by Tailwind v4 | cited ([Tailwind v4](https://tailwindcss.com/blog/tailwindcss-v4)) | Yes (support versions not re-verified) |

---

## 4. Baseline 2026 list (web.dev)

Source: [web.dev/baseline/2026](https://web.dev/baseline/2026).
- **HTML and CSS:** `field-sizing`, container style queries, `:open`, `contrast-color()`, custom highlights, **`@scope`**, `text-indent: hanging/each-line`, `shape()`, active view transition, `rcap/rch/rex/ric` units, `text-decoration-skip-ink: all`.
- **APIs:** Navigation API, Trusted Types, Zstandard compression, Reporting API, WebTransport, and others.

---

## 5. September 2026 releases

Source: [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026).
- Releases: **Chrome 153/154, Firefox 155–157, Safari 27**.
- New: `light-dark()` with `<image>` values, `alpha()`, `progress()`, `revert-rule`, scroll anchoring (`overflow-anchor`) in Safari 27, and `sizes="auto"` for lazy images in Safari 27 (Chrome 126 and Firefox already had it).
- `light-dark()` `<image>` support specifically: Chrome 150, Firefox 150 and Safari 27. `alpha()`: Firefox 155 and Safari 27 (Chrome 152).

---

## 6. Feature notes

### Anchor positioning
- "Firefox 147 includes support for CSS Anchor Positioning, making this feature Baseline Newly available" (January 2026). — [web.dev: New to the web platform in January 2026](https://web.dev/blog/web-platform-01-2026)
- **Conflict:** the English page's browser table reportedly lists Safari as unsupported, while localised versions list Safari 26/26.2. A secondary source says Safari shipped in 26 and Firefox 147 released 13 Jan 2026. — [refontelearning (secondary)](https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline)
- `anchor-scope` is in Baseline 2026, per an MDN social post seen in search results ([MDN on Bluesky](https://bsky.app/profile/developer.mozilla.org/post/3mequtu74nx2x)).

### Relative colour syntax
- Described as fully cross-browser in 2026 / "Baseline Newly Available as of May 2026" by secondary sources only: [una.im](https://una.im/modern-css-theming), [ghassenlarnaout.com](https://ghassenlarnaout.com/blog/css-baseline-2026-features/). Not on web.dev's Baseline 2026 page, which may mean it became Baseline earlier (2024–25). **Unresolved.**

### Viewport units
- `svh/lvh/dvh` are standard; plain `vh` equals `lvh`. — [MDN: length](https://developer.mozilla.org/en-US/docs/Web/CSS/length). Usage guidance in [layout-responsive-mobile.md](layout-responsive-mobile.md#6-viewport-units-vh--lvh-svh-vs-dvh).

### Speculation Rules
- Full support is Chromium only (Chrome/Edge 109+; eagerness from 121). Firefox: Technology Preview. Safari: behind a flag. — [Chrome for Developers](https://developer.chrome.com/docs/web-platform/prerender-pages). Syntax in [performance.md](performance.md#11-speculation-rules).

### Tailwind v4 dependencies
- Tailwind v4 relies on `@layer`, `@property` and `color-mix()`. The v4 blog says `@starting-style` support "wasn't yet broad" at launch (Jan 2025). — [tailwindcss.com v4](https://tailwindcss.com/blog/tailwindcss-v4)

---

## 7. Conflicts with other research notes

Editor's note: other notes in the research set report figures that disagree with or extend note 10. They are recorded here so builders test before relying on either version.
- **Anchor positioning:** note 04 agrees it is Baseline Newly available since Firefox 147 (Jan 2026). Note 02 reports it as "full only in Safari 27, partial in Chromium and Firefox" (from caniuse-style data). Ship anchor positioning with a positioned fallback either way.
- **`field-sizing: content`:** note 02 records it as newly Baseline in June 2026, consistent with the Baseline 2026 list.
- **Customisable `<select>` (`appearance: base-select`):** note 10 could not confirm it (truncated source). Note 02 reports Chrome/Edge 135+ and Safari 27, **no Firefox**, about 74% global: progressive enhancement only. See [components/actions-inputs.md](../components/actions-inputs.md).
- **Scroll-driven animations:** note 10 could not confirm Safari/Firefox. Notes 06 and 07 report Baseline newly available on **27 Oct 2026** when Firefox 159 shipped them, with Chrome/Edge since 115 and Safari since 26. See [animations/browser-support.md](../animations/browser-support.md).
- **Cross-document View Transitions:** note 10 could not confirm Firefox. Note 06 reports Chrome/Edge 126+ and Safari 18.2+, with Firefox's status conflicting between sources (at most partial).

---

## 8. Unconfirmed

- caniuse.com was not fetched (JS-heavy site outside the tool budget), so exact versions for `:has()`, subgrid, nesting and `text-wrap` were not re-verified.
- The **Interop 2026** focus-area list was not found in a primary source (only aggregators saying 20 areas, 15 new and 5 carried over). Check wpt.fyi/interop-2026 or the WebKit blog.
- **CSS `if()`**, scroll-driven animation support in Safari and Firefox, cross-document view transitions in Firefox, and customisable `<select>` (`appearance: base-select`) fell in the truncated part of the Sept 2026 web.dev post, so they are unconfirmed in note 10 (see section 7 for other notes' data).
- `text-wrap: pretty` in Firefox: unverified.

---

## 9. Fallback patterns

The build step calls for progressive enhancement with `@supports` for anchor positioning, `@scope` and style queries (synthesis). Editor's note: illustrative shapes, untested:

```css
/* Anchor positioning with a positioned fallback */
.tooltip { position: absolute; top: 100%; left: 0; }          /* fallback */
@supports (anchor-name: --a) {
  .trigger { anchor-name: --tip; }
  .tooltip { position-anchor: --tip; top: anchor(bottom); left: anchor(left); }
}

/* Relative colour with a static fallback */
.btn:hover { background: var(--brand-700); }                  /* fallback */
@supports (color: oklch(from red l c h)) {
  .btn:hover { background: oklch(from var(--action) calc(l - 0.06) c h); }
}

/* text-wrap: pretty as enhancement (unsupported browsers ignore it) */
h1, h2 { text-wrap: balance; }
p { text-wrap: pretty; }
```

## Sources

- [web.dev: Baseline 2026](https://web.dev/baseline/2026)
- [web.dev: New to the web platform in January 2026](https://web.dev/blog/web-platform-01-2026)
- [web.dev: New to the web platform in September 2026](https://web.dev/blog/web-platform-09-2026)
- [refontelearning: CSS anchor positioning reaches Baseline](https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline) (secondary)
- [MDN on Bluesky: anchor-scope in Baseline 2026](https://bsky.app/profile/developer.mozilla.org/post/3mequtu74nx2x) (search result)
- [una.im: Modern CSS theming](https://una.im/modern-css-theming) (secondary)
- [ghassenlarnaout.com: CSS Baseline 2026 features](https://ghassenlarnaout.com/blog/css-baseline-2026-features/) (secondary)
- [Chrome for Developers: Prerender pages](https://developer.chrome.com/docs/web-platform/prerender-pages)
- [MDN: CSS length](https://developer.mozilla.org/en-US/docs/Web/CSS/length)
- [tailwindcss.com: Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- Research notes: `10_craft_responsive_performance_a11y.md` (Q2, Q3, Q4); cross-references from `02`, `04`, `06`, `07` takeaways
