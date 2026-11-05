# Feedback, Overlay & Status Components (31–40)

This file covers the components that interrupt, inform or reassure: modals and bottom sheets, toasts, tooltips and popovers, alerts and banners (including cookie consent), loaders, skeletons, progress indicators, badges and chips, empty and error states, and avatars with presence. It starts with three shared sections that every component below depends on: the 2026 native-HTML overlay stack and its browser support, the "crafted" motion lessons from Sonner and Vaul, and a severity-to-component map built from NN/g and design-system guidance. Each numbered component then follows the same template (what and when, variants, crafted vs generic, desktop vs mobile, accessibility, code, libraries, inspiration, caveats). Content is transferred from research note 04 (November 2026); nothing has been re-researched.

**Verification legend** (kept from the source notes; never read a marker as stronger than it is):
- **[visited]** = page fetched and read during the research session.
- **[search]** = URL surfaced in a search result (title/snippet seen), page not fetched in full.
- **[prior knowledge]** = researcher's background knowledge, not re-verified against a live source.
- **[synthesis]** = researcher-built variant catalogue or guidance derived from the cited primitives; not copied from one source.
- **[untested snippet]** = code written by the researcher from cited primitives; not browser-tested.
- **Editor's note:** = connective guidance added when organising these docs; not from the notes.

In every component section below, the **Variants**, **Crafted vs generic**, **Desktop vs mobile**, **Accessibility** and **Code** parts are **[synthesis]** / **[untested snippet]** unless a line carries its own source link.

## Contents

- [Platform primer: the native-first overlay stack (Nov 2026)](#platform-primer-the-native-first-overlay-stack-nov-2026)
- [Craft lessons from Sonner and Vaul](#craft-lessons-from-sonner-and-vaul)
- [Choosing a feedback component: severity and timing](#choosing-a-feedback-component-severity-and-timing)
- [31. Modals, dialogs and bottom sheets](#31-modals-dialogs-and-bottom-sheets)
- [32. Toasts, snackbars and notifications](#32-toasts-snackbars-and-notifications)
- [33. Tooltips and popovers](#33-tooltips-and-popovers)
- [34. Alerts, banners and cookie consent](#34-alerts-banners-and-cookie-consent)
- [35. Loaders and spinners](#35-loaders-and-spinners)
- [36. Skeleton screens and shimmer](#36-skeleton-screens-and-shimmer)
- [37. Progress bars, steppers and rings](#37-progress-bars-steppers-and-rings)
- [38. Badges, chips, tags and pills](#38-badges-chips-tags-and-pills)
- [39. Empty states, error pages and 404](#39-empty-states-error-pages-and-404)
- [40. Avatars, avatar groups and presence](#40-avatars-avatar-groups-and-presence)
- [Sources](#sources)

Related docs: [component index](README.md) · [component libraries](component-libraries.md) · [signature & experiential components](signature-experiential.md) · [animations](../animations/README.md) · [foundations](../README.md#foundations)

---

## Platform primer: the native-first overlay stack (Nov 2026)

**Takeaway.** By late 2026 a library-free overlay stack is realistic: `<dialog>` + `showModal()` (top layer, inert background, Esc) + **invoker commands** (`command`/`commandfor`, Baseline since Safari 26.2, Dec 2025) + **Popover API** + **CSS anchor positioning** (Baseline Newly available since Firefox 147, Jan 2026) + `@starting-style` / `transition-behavior: allow-discrete` (Baseline 2024) for enter/exit animation. Still Chromium-led / not Baseline: `popover="hint"`, `interestfor` (interest invokers) and `<dialog closedby>` (no Safari). Ship these with feature detection or polyfills.

### Cited support facts

- **Invoker commands** (`commandfor` + `command`): Chrome/Edge 135 (Apr 2025), Firefox 144 (14 Oct 2025), Safari 26.2 (12 Dec 2025), so Baseline across all majors. [Paweł Grzybek [search]](https://pawelgrzybek.com/more-invoker-commands-and-more-reasons-not-to-use-javascript-please); [InfoQ, Jan 2026 [search]](https://www.infoq.com/news/2026/01/html-invoker-commands).
  - Built-in commands: `show-modal`, `close`, `request-close`, `toggle-popover`, `show-popover`, `hide-popover`. Custom commands must start with `--` ([InfoQ](https://www.infoq.com/news/2026/01/html-invoker-commands)). *(`request-close` is from prior knowledge, not in the snippets.)*
  - Only `<button>` can be an invoker ([OpenReplay [search]](https://blog.openreplay.com/invoker-commands-api-guide/)).
  - The `command` event does not bubble; listen on the target ([DEV [search]](https://dev.to/grimicorn/invoker-commands-wiring-buttons-to-dialogs-and-popovers-without-javascript-5agk)).
  - Unsupported browsers see a plain button.
- **CSS anchor positioning:** Chrome/Edge 125 (May 2024); Firefox 147 (Jan 2026) made it "Baseline Newly available" — [web.dev, New to the web platform in January 2026 [visited]](https://web.dev/blog/web-platform-01-2026).
  - Safari version conflicts across sources: Safari 26 per one timeline; "18.2 core / 18.4 fallbacks" per another blog — [Refonte Learning [search]](https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline), [Syncfusion [search]](https://www.syncfusion.com/blogs/post/css-anchor-positioning). The web.dev page's own badges were inconsistent with its text.
  - State of CSS 2026 ranked anchor positioning top among features developers want but avoid because of support gaps — [State of CSS 2026 [search]](https://2026.stateofcss.com/).
- Same web.dev Jan 2026 post: Navigation API Baseline Newly available (Firefox 147; Safari 26.2); View Transition types in Firefox 147 (same-document only) — [web.dev [visited]](https://web.dev/blog/web-platform-01-2026).
- **`@starting-style`:** Baseline 2024 (Newly available since Aug 2024) — [MDN @starting-style [visited]](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style).
  - Must be declared **after** the `:popover-open` rule (same specificity).
  - `display` and `overlay` must be in the transition list with `allow-discrete` so exit animations play and top-layer removal is deferred.
  - `::backdrop` needs its own standalone `@starting-style` block (nesting is not supported for pseudo-elements).
- **`popover="hint"`:** landed in Chrome 133 (Jan 2025). Opening a hint doesn't close other open (auto) popovers — [Una Kravets, "What is popover=hint?" [search]](https://www.una.im/popover-hint).
- **Interest invokers (`interestfor`):** Chromium Intent to Ship, Sept 2025; fires `InterestEvent` on the target — [blink-dev [search]](https://groups.google.com/a/chromium.org/g/blink-dev/c/bX1G_yDt6W4). Chrome's guide still prescribes a conditional polyfill (`interestfor` npm package), i.e. not cross-browser — [Chrome for Developers, interest-triggered tooltips [visited]](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interest-triggered-tooltips). Details of that guide are in [33. Tooltips and popovers](#33-tooltips-and-popovers).
- **`<dialog closedby>`** (`any` | `closerequest` | `none`; light-dismiss control): Chrome/Edge 134, Firefox 141 (Jul 2025); **Safari not supported** (webkit.org/b/284592, vendor position "support"); not Baseline — [web-features explorer [search]](https://web-platform-dx.github.io/web-features-explorer/features/dialog-closedby); [Chrome guide [search]](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/platform-controls-dismiss-dialog).
  - **Warning:** the npm `dialog-closedby-polyfill` appeared in Socket's "Shai-Hulud" compromised-packages analysis — [Socket [search]](https://socket.dev/npm/package/dialog-closedby-polyfill). Audit before installing. (The modal snippet in component 31 uses a small hand-written fallback instead.)

### Support matrix

Combines cited facts and prior knowledge. Verify on caniuse / webstatus.dev before shipping.

| Feature | Status Nov 2026 | Notes |
|---|---|---|
| `<dialog>`, `showModal()`, `::backdrop`, top layer | Baseline widely *(prior knowledge, since 2022)* | Replaces focus-trap libs for modals; background is inert automatically |
| `inert` attribute | Baseline *(prior knowledge, 2023)* | For custom non-dialog overlays / side panels |
| Popover API (`popover`, `popovertarget`) | Baseline *(prior knowledge, 2024)* | `auto` = light-dismiss + Esc, `manual` = you control |
| `popover="hint"` | Chromium 133+; others unverified | Gap |
| Invoker commands | **Baseline (Dec 2025)** | cited |
| `interestfor` | Chromium; polyfill elsewhere | cited |
| CSS anchor positioning | **Baseline newly (Jan 2026)** | cited; Safari version conflicting |
| `@starting-style`, `transition-behavior` | **Baseline 2024** | cited |
| `dialog closedby` | Chrome 134, Firefox 141, **no Safari** | cited |
| `@property` (animate custom props, e.g. progress rings) | Baseline *(prior knowledge, 2024)* | |
| `interpolate-size: allow-keywords` / `calc-size()` | Chromium-only *(prior knowledge)* | Progressive enhancement for `height:auto` animation |
| View Transitions (same-document) | Chrome, Safari 18+, Firefox 147 *(cited for Firefox types)* | Toast/dialog morphs |
| `env(safe-area-inset-*)`, `dvh/svh/lvh` | Baseline *(prior knowledge)* | Bottom sheets, toasts on iOS |
| `interactive-widget=resizes-content` viewport meta | Chromium/Firefox; not Safari *(prior knowledge)* | Keyboard + sheets |

### Outdated techniques to flag [synthesis]

| Outdated | Use instead |
|---|---|
| Hand-rolled focus traps + `aria-hidden` sibling toggling | `showModal()` / `inert` |
| Popper.js v2 | Floating UI, and now CSS anchor positioning |
| JS `setTimeout` mount tricks for enter animations | `@starting-style` |
| `body{position:fixed}` scroll-lock hacks | `overflow:hidden` on `html` + `scrollbar-gutter: stable`, or `overscroll-behavior: contain` in sheets |
| `title=""` tooltips | Popover-based tooltips (not keyboard/touch accessible otherwise) |
| GIF spinners | CSS/SVG loaders |
| `100vh` on mobile | `dvh` |

**Gaps.** Exact Safari/Firefox status of `popover="hint"` and `interestfor` in Nov 2026 not confirmed (a third-party tool site claims a Chrome 142 command-based variant; unverified and conflicts with Chrome's own guide). Interop 2026 focus areas not fetched.

---

## Craft lessons from Sonner and Vaul

**Takeaway.** Sonner (toasts) and Vaul (drawers/bottom sheets), both by Emil Kowalski, are the reference implementations for "crafted" overlay motion. They win on dozens of near-invisible details: interruptible CSS transitions instead of keyframes, depth-stacking via scale, momentum-based swipe/drag dismissal, pausing timers on hidden tabs, iOS-matched easing `cubic-bezier(0.32, 0.72, 0, 1)` at 500ms, and keyboard-aware sheet sizing via `visualViewport`. The lesson transfers to any stack, including native `<dialog>`/Popover builds. The full Sonner internals are in [32](#32-toasts-snackbars-and-notifications); the full Vaul internals are in [31](#31-modals-dialogs-and-bottom-sheets).

**The transferable "crafted" recipe [synthesis]:**
1. Interruptible transitions.
2. Physical metaphors: depth scale, friction, momentum.
3. Respect the user's attention: pause on hover / hidden tab, a hotkey to reach toasts.
4. iOS-grade easing curves rather than `ease-in-out`.
5. Performance discipline: write transforms on the moving element only.

---

## Choosing a feedback component: severity and timing

**Takeaway (from NN/g and design systems).** Interrupt only when it's worth the cost (critical warnings, critical missing info, workflow steps, one valuable profiling question) and never for newsletters, checkout or comparisons. Use skeletons for full-page loads under ~10 s, spinners for single modules, progress bars with a time estimate for >10 s, and nothing at all under 1 s. Empty states must communicate status, teach, and offer a direct action. Design systems broadly reserve toasts for low-severity, non-blocking messages and send errors to inline messages or banners.

**Severity → component map [synthesis]:**

| Situation | Component |
|---|---|
| Transient success | Toast ([32](#32-toasts-snackbars-and-notifications)) |
| Action needed but non-blocking | Inline alert / banner ([34](#34-alerts-banners-and-cookie-consent)) |
| Blocking / irreversible | `alertdialog` ([31](#31-modals-dialogs-and-bottom-sheets)) |
| System-wide / persistent | Top banner ([34](#34-alerts-banners-and-cookie-consent)) |
| Errors in forms | Inline, never toast-only |

**Loading-time thresholds** — [NN/g, Skeleton Screens 101 [visited]](https://www.nngroup.com/articles/skeleton-screens/):

| Expected wait | Show |
|---|---|
| < 1 s | Nothing (a skeleton or spinner feels jittery) |
| < 10 s, full page | Skeleton ([36](#36-skeleton-screens-and-shimmer)) |
| < 10 s, single module (video, dashboard card) | Spinner ([35](#35-loaders-and-spinners)) |
| > 10 s, or uploads/downloads/conversions | Progress bar with explicit time estimate ([37](#37-progress-bars-steppers-and-rings)) |

Editor's note: note 05 cites a second NN/g article ([Progress Indicators](https://www.nngroup.com/articles/progress-indicators/)) with slightly different wording (indicator for anything over ~1 s; looped spinners for 2–10 s; percent-done for 10 s+; percent-done bars should "start slower and speed up near the end"; avoid static "Loading…" text). See [signature-experiential.md, 43](signature-experiential.md#43-preloaders-intro-screens-and-splash-counters).

**Platform guidance [prior knowledge, not re-verified]:**
- **Apple HIG:** prefers sheets over alerts for tasks; alerts only for critical info with ≤ 3 buttons, destructive action styled red and not default; sheets have detents (medium/large) and a grabber; progress indicators: determinate when quantifiable, keep moving so the app never looks frozen; don't use toasts (iOS has no native toast; HUD-style transient confirmations only).
- **Material 3:** snackbars appear at the bottom, one at a time, 4–10 s, at most one text action, no icons in the standard snackbar; on mobile they sit above FABs/bottom nav. M3 Expressive (2025) adds wavy progress and a shape-morphing loading indicator (corroborated by Flutter ports; see [35](#35-loaders-and-spinners)).
- Gaps: Apple HIG and Material 3 pages are JS-rendered and were not extracted; their specific numbers are unverified. No NN/g toast-specific article surfaced in search.

---

## 31. Modals, dialogs and bottom sheets

Covers centered dialogs, alert dialogs, fullscreen takeovers, side sheets/drawers and mobile bottom sheets.

### What & when

NN/g definitions and rules — [NN/g, Modal & Nonmodal Dialogs [visited]](https://www.nngroup.com/articles/modal-nonmodal-dialog/):
- **Modal** disables main content and requires explicit interaction; **nonmodal** leaves main content active.
- **Costs:** interrupts workflow, loses context, adds a "dismiss" goal, can hide content the dialog depends on.
- **Use for:**
  1. Critical warnings preventing irreversible harm (overwrite/quit without saving). Form errors belong inline, not in a modal.
  2. Critical missing info needed to continue a user-initiated action (log in to save a favourite).
  3. Workflow fragmentation / wizards (show progress; use a full page if there are many steps).
  4. One low-commitment, high-value profiling question (Zillow "do you have an agent?").
- **Avoid for:** nonessential content (newsletter sign-ups train users to ignore modals), high-stakes processes like checkout, and complex decisions needing background info.
- Use a nonmodal alternative for noncritical tasks. A nonmodal desktop dialog may become a full-screen modal on mobile. Gmail compose is the canonical nonmodal example.
- Closing line: "no one likes to be interrupted, but if you must, make sure it's worth the cost."

Otherwise use inline disclosure, a nonmodal panel, or a page [synthesis].

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Centered confirm (`alertdialog`) | 400–480px wide; title + one sentence + two buttons; destructive button right-aligned, red, **not** autofocused (focus Cancel per APG) |
| 2 | Command palette | Anchored in the top third (≈ 15vh from top); search input autofocused; results list with `aria-activedescendant`; opens with ⌘K; backdrop blur 4–8px |
| 3 | Fullscreen takeover | `width:100dvw;height:100dvh;max-*:none`; slides up 24px + fades; sticky header with close and title; for editors/media |
| 4 | Side sheet / drawer (desktop) | Right edge, 400–560px, full height, slides `translateX(100%)→0`; nonmodal variant (no backdrop, `show()` instead of `showModal()`) for inspector panels |
| 5 | Bottom sheet with drag (mobile) | Vaul-style: grabber pill 36×5px, rounded top 16–24px, snap points (e.g. 40%, 90%), velocity flick close, background scale (page scales to ~0.94 with rounded corners) |
| 6 | Morphing dialog | Button expands into the dialog via View Transitions (`view-transition-name` shared between trigger and dialog surface) |
| 7 | Lightbox / media viewer | Black 90% backdrop, image `object-fit:contain`, swipe between, pinch-zoom; close on backdrop tap |
| 8 | Stacked / nested sheets | Second sheet pushes the first back (scale 0.95, translateY −10px), iOS card stack |
| 9 | Inline-expanding "popover dialog" | Anchored to trigger (anchor positioning) with `popover="auto"` for lightweight forms (rename, share) |
| 10 | Wizard modal | Stepper header + fixed-height body + sticky footer; progress shown (NN/g) |
| 11 | Responsive hybrid | Centered on ≥640px, bottom sheet below (same `<dialog>`, media-query styles; see snippet) |

Editor's note: the command palette's ARIA pattern (combobox + listbox, cmdk) is covered in [navigation-structure.md](navigation-structure.md); the lightbox variant is covered in depth (PhotoSwipe, native dialog lightbox) in [content-display.md](content-display.md).

**Vaul (drawer/bottom sheet) internals** — all from [Emil Kowalski, "Building a drawer component" [visited]](https://emilkowal.ski/ui/building-a-drawer-component):
- During drag, Vaul writes `transform: translateY()` **directly on the element rather than via a CSS variable**: changing an inherited variable forced style recalculation on all descendants and made drags laggy with more than ~20 list items. No React re-renders during drag.
- **Flick/momentum closes** the drawer without crossing a distance threshold (no numeric value given).
- **Overdrag damping:** pulling up past the top moves the sheet progressively less.
- **Scroll vs drag:** `shouldDrag` only allows drag when inner content is scrolled to the top (like native iOS); after scrolling back to top, **drag is blocked for 100 ms** to stop an overshooting fast scroll from closing the drawer.
- **`scaleBackground`:** the page wrapper (`[vaul-drawer-wrapper]`) is transformed and its border-radius changed so the page looks like a sheet behind a sheet (iOS card stack). Values are driven by drag progress (e.g. 40% drag → radius at 60% of max).
- **Easing `cubic-bezier(0.32, 0.72, 0, 1)`**, borrowed from Ionic and matched to iOS sheets; **duration 500ms**: `.drawer { transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1); }`
- **Snap points** may be viewport fractions or fixed px (fixed px keeps an input at the same visible height across devices). Release snaps to the nearest; momentum can skip points or close.
- **Virtual keyboard:** browser auto scroll-into-view is disabled; a `visualViewport` `resize` listener sets drawer height = visual viewport height − offset and `bottom = max(window.innerHeight − visualViewport.height, 0)`, keeping the sheet above the keyboard. Limitation: slight lag, because `resize` fires after the keyboard finishes animating.
- **Multi-touch:** ignore extra touches while dragging (`if (isDragging) return;`).
- **Safari theme-color sync (experimental, not shipped in Vaul):** compute the opaque equivalent of the overlay (`channel = a·overlay + (1−a)·bg`; `rgba(0,0,0,.5)` on white → `rgb(128,128,128)`), pre-generate 50 interpolated colours and update `<meta name="theme-color">` every 10ms across the 500ms open.
- Test on a real phone via cable + Safari devtools, or the Xcode Simulator.

### Crafted vs generic

- **Crafted:** enters from the trigger's direction; exits faster than it enters (e.g. 200ms vs 300ms); iOS easing `cubic-bezier(.32,.72,0,1)`; backdrop fades independently; no layout shift when the scrollbar disappears (`scrollbar-gutter: stable`); focus lands deliberately (APG rules); Esc, backdrop and swipe all close; sticky footer actions on long content; content scrolls inside with `overscroll-behavior: contain`.
- **Generic / "slop":** fade-in centered box for everything; a giant X as the only control; purple gradient header; backdrop not dismissible; body scroll leaks; focus lost to `<body>` on close; newsletter modal on page load.

### Desktop vs mobile

- Desktop → centered dialog or side sheet. Mobile → bottom sheet or fullscreen (NN/g notes nonmodal desktop dialogs may become fullscreen modals on mobile).
- Mobile sheets need `padding-bottom: max(16px, env(safe-area-inset-bottom))`, `max-height: 90dvh`, keyboard handling via `visualViewport` (Vaul), and drag disabled unless scroll is at the top.

### Accessibility

WAI-ARIA APG — [APG Modal Dialog Pattern [visited]](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):
- Tab / Shift+Tab cycle within the dialog; Escape closes; focus moves inside on open.
- **Initial focus:** usually the first focusable element; for long/structured content, focus a static element at the top (a `tabindex="-1"` title); for irreversible actions, focus the **least destructive** button; for info dialogs, focus the likely action (OK/Continue).
- **On close** return focus to the invoker (or a logical alternative if it's gone, e.g. the first new row after "Add rows").
- Always include a visible close control in tab order.
- `role="dialog"`; `aria-modal="true"` only when the background truly is blocked and visually obscured; label via `aria-labelledby` (or `aria-label`); `aria-describedby` optional, omit it for structured content. Use `alertdialog` for brief, urgent confirmations (irreversible actions).

Native implementation [synthesis]:
- `showModal()` gives the top layer, an inert background, and Esc → `cancel` event.
- Label with `aria-labelledby`. Use `role="alertdialog"` for destructive confirms.
- Return focus to the invoker (native `<dialog>` does this automatically in modern engines *[prior knowledge]*).
- Respect `prefers-reduced-motion` (crossfade only).

Radix Dialog *[prior knowledge, not re-verified]*: focus trap, scroll lock, `aria-hidden` on siblings, portal. Good when you need React composition, but now largely replaceable by native `<dialog>`.

### Code

**Native modal with invoker commands, animation, scroll lock, light dismiss** [untested snippet]:

```html
<button commandfor="confirm" command="show-modal">Delete project</button>

<dialog id="confirm" role="alertdialog" aria-labelledby="c-title" aria-describedby="c-desc" closedby="any">
  <h2 id="c-title">Delete “Atlas”?</h2>
  <p id="c-desc">This permanently removes 128 files. You can’t undo this.</p>
  <form method="dialog" class="actions">
    <button value="cancel" autofocus>Cancel</button>
    <button value="delete" class="danger">Delete</button>
  </form>
</dialog>
```

```css
dialog {
  border: 0; border-radius: 16px; padding: 24px; max-width: min(480px, 100% - 32px);
  opacity: 0; translate: 0 12px; scale: .98;
  transition: opacity .2s, translate .2s, scale .2s,
              overlay .2s allow-discrete, display .2s allow-discrete;
}
dialog[open] { opacity: 1; translate: 0; scale: 1;
  transition-duration: .35s; transition-timing-function: cubic-bezier(.32,.72,0,1); }
@starting-style { dialog[open] { opacity: 0; translate: 0 12px; scale: .98; } }
dialog::backdrop { background: rgb(10 10 20 / 0); backdrop-filter: blur(0);
  transition: background .3s, backdrop-filter .3s, overlay .3s allow-discrete, display .3s allow-discrete; }
dialog[open]::backdrop { background: rgb(10 10 20 / .45); backdrop-filter: blur(6px); }
@starting-style { dialog[open]::backdrop { background: rgb(10 10 20 / 0); backdrop-filter: blur(0); } }
html:has(dialog:modal) { overflow: hidden; scrollbar-gutter: stable; }

/* Mobile: same element becomes a bottom sheet */
@media (max-width: 640px) {
  dialog { margin: auto 0 0; width: 100%; max-width: none; max-height: 90dvh;
    border-radius: 20px 20px 0 0; translate: 0 100%; scale: 1;
    padding-bottom: max(24px, env(safe-area-inset-bottom)); overscroll-behavior: contain; }
  dialog[open] { translate: 0; }
  @starting-style { dialog[open] { translate: 0 100%; } }
}
@media (prefers-reduced-motion: reduce) { dialog, dialog::backdrop { translate: 0 !important; scale: 1 !important; } }
```

```js
// Safari lacks closedby (cited): fallback backdrop-click close
const d = document.getElementById('confirm');
if (!('closedBy' in HTMLDialogElement.prototype)) {
  d.addEventListener('click', e => { if (e.target === d) d.close('backdrop'); });
}
d.addEventListener('close', () => { if (d.returnValue === 'delete') {/* act */} });
```

**Bottom-sheet drag (Vaul-inspired, pointer events)** [untested snippet]:

```js
const sheet = document.querySelector('dialog.sheet'), handle = sheet.querySelector('.grabber');
let y0 = 0, t0 = 0, dy = 0, dragging = false;
handle.addEventListener('pointerdown', e => {
  if (dragging) return;                         // ignore 2nd finger (Vaul)
  dragging = true; y0 = e.clientY; t0 = performance.now();
  handle.setPointerCapture(e.pointerId);        // keep tracking outside (Sonner)
  sheet.style.transition = 'none';
});
handle.addEventListener('pointermove', e => {
  if (!dragging) return;
  dy = e.clientY - y0;
  const v = dy < 0 ? dy * 0.2 : dy;             // damped overdrag upward
  sheet.style.transform = `translateY(${v}px)`; // write transform directly (Vaul perf note)
});
handle.addEventListener('pointerup', () => {
  dragging = false; sheet.style.transition = '';
  const velocity = Math.abs(dy) / (performance.now() - t0);
  if (dy > sheet.offsetHeight * 0.35 || (dy > 0 && velocity > 0.11)) sheet.close();
  sheet.style.transform = ''; dy = 0;
});
```

The 0.11 velocity threshold is borrowed from Sonner's tuned value; the 0.2 damping and 35% distance are illustrative.

### Libraries & tools

- **Native `<dialog>`** + invoker commands + `@starting-style` (see primer). First choice.
- **Vaul** (React drawer / bottom sheet, drag + snap points) — reference for mobile sheets. https://vaul.emilkowal.ski (URL not visited). **Maintenance status not checked:** the researcher recalls Vaul was marked unmaintained by its author around 2025 — unverified; check https://github.com/emilkowalski/vaul before adopting.
- **Radix Dialog** — [radix-ui.com](https://www.radix-ui.com/primitives) *[prior knowledge]*.
- Do **not** install `dialog-closedby-polyfill` without auditing (Shai-Hulud warning above).
- More options (shadcn `sheet`/`drawer`, Base UI): see [component-libraries.md](component-libraries.md).

### Inspiration links

- [Emil Kowalski, "Building a drawer component" [visited]](https://emilkowal.ski/ui/building-a-drawer-component)
- https://mobbin.com — searchable real-app screens ("bottom sheet") (not visited; verify)
- https://www.pageflows.com (not visited; verify)
- https://tympanus.net/codrops (not visited; verify)

### Caveats & verification status

- NN/g, APG and Vaul internals: **[visited]**. Variant catalogue, craft criteria, snippets: **[synthesis] / [untested snippet]**.
- No numeric velocity threshold or damping coefficient is published for Vaul.
- `closedby` has no Safari support; the snippet's fallback handles it.
- Native `<dialog>` returning focus automatically is **[prior knowledge]**.

---

## 32. Toasts, snackbars and notifications

### What & when

- Transient, low-severity confirmations ("Saved", "Link copied", undo). Errors that need action → inline or banner. Never the only carrier of critical info [synthesis].
- Design-system guidance:
  - [PatternFly toasts [search]](https://pf3.patternfly.org/v3/pattern-library/communication/toast-notifications): low-severity, unobtrusive; top-right; ~8 s; persist on hover; icon per type.
  - [Deliveroo toasts [search]](https://design.deliveroo.net/components/tds/toasts): avoid toasts for errors; use a system banner.
  - [Grommet notification [search]](https://grommet.io/notification): one toast at a time.
  - [LogRocket [search]](https://blog.logrocket.com/?p=182293): form errors in context.
  - Placement guidance conflicts across systems (bottom-left vs bottom-right vs top-right).
- Material 3 snackbar rules *[prior knowledge]*: bottom, one at a time, 4–10 s, at most one text action, no icons in standard snackbar. Apple: no native toast *[prior knowledge]*.

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Sonner stack | Collapsed depth stack (−14px / 0.95 scale per level), expands on hover, 3 visible |
| 2 | Promise toast | A single toast morphs loading → success/error (icon crossfade, width animates) |
| 3 | Undo snackbar | Bottom-center, one action ("Undo"), countdown bar along the bottom edge, pause on hover |
| 4 | Dynamic-island pill | Top-center black pill that expands from a dot into a capsule with icon + text (spring), collapses back |
| 5 | Rich notification card | Avatar, title, body, timestamp, inline Reply/View; inbox-style for apps |
| 6 | Progress toast | Upload with determinate bar and cancel; becomes a success toast |
| 7 | Inline anchored toast | Appears next to the triggering button (anchor positioning), e.g. a "Copied!" bubble; vanishes after 1.5s |
| 8 | Edge ribbon | Full-width thin bar at top, for connectivity ("You're offline" / "Back online") |
| 9 | Toast with countdown ring | Circular conic-gradient ring around the close icon showing remaining time |
| 10 | Swipe-stack mobile | Top of screen like iOS notifications, swipe up to dismiss, stacked |
| 11 | Terminal/log toasts | Monospace, for dev tools, stacking upward with timestamps |
| 12 | Haptic-feel spring toast | Overshoot scale 0.9 → 1.02 → 1 (use `linear()` easing for springs) |

**Sonner internals (motion and interaction)** — all from [Emil Kowalski, "Building a toast component" [visited]](https://emilkowal.ski/ui/building-a-toast-component):
- Enter animation uses **CSS transitions, not keyframes**, because transitions are interruptible/retargetable; rapidly added toasts therefore don't "jump" into place.
- Base rule: `transition: transform 400ms ease;` on `.sonner-toast`. A `useEffect` flips a `mounted` state after first render; a `data-mounted` attribute toggles the toast from `translateY(100%)` to `translateY(0)`. The author notes `@starting-style` could now replace this mount trick.
- **Stacking:** every toast is `position:absolute`; each one behind the front is offset by gap × index and scaled down 0.05 per index — index 1: `translateY(-14px) scale(0.95)`, index 2: `translateY(-28px) scale(0.9)`, front: `translateY(0) scale(1)`. Driven by CSS custom properties `--toasts-before`, `--lift-amount`, `--scale`, `--y`.
- In collapsed/stacked mode **all toasts take the front toast's height**, so the peeking edges line up even when content heights differ.
- **Expand on hover:** expanded offset = `heightIndex * GAP` + sum of heights of all preceding toasts, passed to CSS as `--offset`. An `expand` prop keeps them always expanded.
- An **`:after` pseudo-element fills the gaps** between expanded toasts so hover isn't lost when the pointer crosses a gap.
- **Swipe to dismiss:** pointer delta written to `--swipe-amount` → `translateY`. Dismissal is **momentum-based**: velocity = `|swipeAmount| / timeElapsed`; dismiss if distance > `SWIPE_THRESHOLD` **or velocity > 0.11** (tuned by trial and error). **Pointer capture** is set on drag start so dragging continues outside the toast. Dragging in the disallowed direction applies **friction** (slows and stops) instead of a hard stop. Works for mouse + touch.
- **Timing:** default lifetime 4 s; **hover pauses** the timer; a `useIsDocumentHidden` hook listens to `visibilitychange` / `document.hidden` and **pauses timers while the tab is inactive**.
- Architecture: an **observable store (not React Context)** so `toast()` can be called from anywhere; `<Toaster/>` subscribes. API inspired by react-hot-toast; `toast.promise` handles loading → success/error.
- The author attributes Sonner's success mainly to low-friction DX plus polished defaults and animation: "many small, nearly invisible details".

**Sonner `<Toaster/>` API defaults** — [Sonner docs, Toaster [visited]](https://sonner.emilkowal.ski/toaster):

| Prop | Default |
|---|---|
| `theme` | `light` |
| `richColors` | `false` |
| `expand` | `false` |
| `visibleToasts` | `3` |
| `position` | `bottom-right` |
| `closeButton` | `false` |
| `offset` | `32px` |
| `mobileOffset` | `16px` (applies below 600px width) |
| `swipeDirections` | based on position |
| `dir` | `ltr` |
| `hotkey` | `⌥/Alt + T` (jumps focus to the toast region) |
| `invert` | `false` |
| `gap` | `14` |
| `icons` | — |
| `toastOptions` | table shows `4000`, apparently the default duration |

The docs page does not describe aria-live behaviour (gap).

### Crafted vs generic

- **Crafted:** interruptible transitions; consistent heights in the stack; pause on hover and on hidden tab; swipe with friction + momentum; gap-bridging hover area; keyboard hotkey to reach the region (Alt+T / F8); `richColors` used sparingly; icon + concise verb-first copy; undo instead of "Are you sure?".
- **Generic:** top-right coloured boxes with drop shadow and slide-in keyframes; stacking that pushes toasts abruptly; 3-second timeout on error messages; no way to reach with keyboard; emoji-laden copy.

### Desktop vs mobile

- Desktop: bottom-right (Sonner default) or bottom-center; offset 32px.
- Mobile <600px: offset 16px (Sonner); full-width minus gutters; top-center or bottom-center above bottom nav/FAB; add `env(safe-area-inset-bottom/top)`; swipe direction matches position (down for bottom, up for top).

### Accessibility

- A persistent live region must be present in the DOM *before* messages are injected: `role="status"` (`aria-live="polite"`) for success/info; `role="alert"` (assertive) only for urgent errors; label the region (`aria-label="Notifications"`).
- Don't move focus to toasts.
- Actions must also be reachable another way, or the toast must not auto-dismiss while focused/hovered (WCAG 2.2.1 timing *[prior knowledge]*). Give ≥ 5s for text + action toasts.
- Reduced motion → fade only.
- Radix Toast *[prior knowledge, not re-verified]*: unstyled primitives; the viewport is an `<ol>` in a labelled region; default hotkey F8; built-in swipe with `swipeDirection` / `swipeThreshold`; foreground vs background toast types (assertive vs polite announcement).

### Code

**Native toaster that sits above modals (top layer via `popover=manual`)** [untested snippet]:

```html
<section id="toaster" popover="manual" aria-label="Notifications (Alt+T)">
  <ol role="status" aria-live="polite" class="toasts"></ol>
</section>
```

```css
#toaster { inset: auto 32px 32px auto; margin:0; padding:0; border:0; background:none; overflow:visible; }
@media (max-width: 600px){ #toaster{ inset: auto 16px max(16px, env(safe-area-inset-bottom)) 16px; } }
.toast { position:absolute; right:0; bottom:0; width:356px; max-width:100%;
  --i: 0; --offset: 0px; translate: 0 calc(var(--i) * -14px); scale: calc(1 - var(--i) * .05);
  transition: translate .4s ease, scale .4s ease, opacity .4s ease; }
.toast:nth-child(n+4) { opacity: 0; pointer-events: none; }   /* 3 visible; newest is first child */
@starting-style { .toast { translate: 0 100%; opacity: 0; } }
.toasts:hover .toast { translate: 0 calc(var(--offset) * -1); scale: 1; }
@media (prefers-reduced-motion: reduce){ .toast{ transition: opacity .2s; translate:none; } }
```

```js
const tl = document.getElementById('toaster'); tl.showPopover();
// re-call tl.hidePopover(); tl.showPopover(); after a dialog opens so the toaster is re-stacked above it
const list = tl.querySelector('ol'), GAP = 14;
function restack() {   // --i drives the collapsed stack; --offset = heights of newer toasts + 14px gaps (expanded on hover)
  let offset = 0;
  [...list.children].forEach((t, i) => {
    t.style.setProperty('--i', i); t.style.setProperty('--offset', `${offset}px`);
    offset += t.offsetHeight + GAP;
  });
}
function toast(msg, {duration=4000}={}) {
  const li = Object.assign(document.createElement('li'), {className:'toast', textContent: msg});
  list.prepend(li); restack();
  let left = duration, start = Date.now(), timer;
  const run = () => { start = Date.now(); timer = setTimeout(() => { li.remove(); restack(); }, left); };
  const pause = () => { clearTimeout(timer); left -= Date.now() - start; };
  li.addEventListener('pointerenter', pause); li.addEventListener('pointerleave', run);
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : run()); // Sonner
  run();
}
document.addEventListener('keydown', e => { if (e.altKey && e.code === 'KeyT') tl.querySelector('.toast')?.focus(); });
```

Editor's note: corrected from the research-notes version (was: invalid `opacity: calc(var(--i) < 3)` and an `--offset` that was never set).

### Libraries & tools

- **Sonner** (React) — [docs [visited]](https://sonner.emilkowal.ski/toaster); repo https://github.com/emilkowalski/sonner (not visited).
- **Radix Toast** — https://www.radix-ui.com/primitives/docs/components/toast (not visited; details *[prior knowledge]*).
- **react-hot-toast** *[prior knowledge]*: headless `useToaster` hook, promise API, ~5KB — https://react-hot-toast.com (not visited).
- **Notyf** *[prior knowledge]*: framework-free vanilla JS toaster with ripple-style entrance, good for non-React sites — https://carlosroso.com/notyf/ (not visited).
- Native: `popover="manual"` + live region (snippet above).

### Inspiration links

- [Emil Kowalski, "Building a toast component" [visited]](https://emilkowal.ski/ui/building-a-toast-component)
- https://mobbin.com — search "toast" (not visited)
- Design-system pages listed under What & when.

### Caveats & verification status

- Sonner internals and Toaster defaults: **[visited]**. Design-system toast guidance: **[search]**. Radix, react-hot-toast, Notyf: **[prior knowledge]**; their exact props and accessibility behaviour (e.g. Sonner's live-region implementation, Radix F8 default) are unverified.
- WCAG 2.2.1 reference is prior knowledge, not fetched.

---

## 33. Tooltips and popovers

### What & when

- **Tooltip** = short, non-essential label/description on hover/focus (icon buttons, truncated text).
- **Popover** = interactive, click-triggered content (menus, pickers, mini-forms, info cards).
- Never hide essential info in tooltips; touch users can't hover.

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Label tooltip | Dark 12–13px pill, 6px offset, 150–200ms delay, no arrow or a tiny 6px arrow |
| 2 | Keyboard-hint tooltip | Label + `<kbd>` chips ("Bold ⌘B") |
| 3 | Rich hover card | Profile/link preview card (avatar, bio, stats) opened via interest after ~500ms; interactive → `aria-details` |
| 4 | Delay-group tooltips | Once one is open, neighbours open instantly (toolbar scrubbing) |
| 5 | Follow-cursor tooltip | For charts/heatmaps; positioned with pointer coords |
| 6 | Inline definition popover | Dotted-underlined term opens a glossary card |
| 7 | Dropdown menu popover | `popover="auto"` + anchor; roving focus, arrow keys |
| 8 | Toggletip | "i" button click to show/hide; announced via live region (works on touch) |
| 9 | Coach-mark / onboarding spotlight | Popover with step counter + backdrop cut-out (`box-shadow: 0 0 0 9999px rgb(0 0 0/.5)` around target) |
| 10 | Color/emoji/date picker popover | With flip fallbacks |
| 11 | Arrowed speech bubble | `clip-path` tail that flips with `position-try` |
| 12 | Long-press mobile popover / context menu | Replaces hover on touch |

### Crafted vs generic

- **Crafted:** origin-aware scale (`transform-origin` toward the anchor); 100–150ms in / instant out; delay groups; viewport-aware flipping; consistent offset; hoverable (WCAG 1.4.13); Esc dismiss.
- **Generic:** native `title`; tooltip on disabled buttons (unreachable); tooltips duplicating visible labels; flicker when moving to the tooltip.

### Desktop vs mobile

Desktop: hover/focus. Mobile: toggletip on tap, long-press menu, or a bottom sheet for big popovers.

### Accessibility

From [Chrome for Developers, interest-triggered tooltips [visited]](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interest-triggered-tooltips):
- The trigger is an **implicit anchor** (no `anchor-name` needed): `[popover]{ position-area: top; position-try-fallbacks: flip-block; margin: unset; }`.
- Delays via `interest-delay-start` / `interest-delay-end` (e.g. 0.2s / 0.1s). Pseudo-classes `:interest-source` / `:interest-target`.
- **Don't add `role="tooltip"` / `aria-describedby` manually**: `popover="hint"` targets get an implicit `tooltip` role, and the association switches to `aria-details` if the target contains interactive content.
- WCAG 1.4.13 (dismissible via Esc, hoverable, persistent) still applies.
- `@oddbird/popover-polyfill` does **not** polyfill hint behaviour; the `@oddbird/css-anchor-positioning` polyfill doesn't support implicit anchors or `position-area` on popovers.
- Feature detections: `HTMLButtonElement.prototype.hasOwnProperty("interestForElement")`, `"popover" in HTMLElement.prototype`, `"anchorName" in document.documentElement.style`.

Synthesis: native `popover="hint"` + `interestfor` gives an implicit tooltip role and description wiring; polyfill hover behaviour elsewhere. Popovers with `popover="auto"` provide Esc + light dismiss. Menus still need APG menu-button keyboard handling.

### Code

**Native-first tooltip and menu** [untested snippet]:

```html
<button interestfor="tt-save" aria-label="Save"><svg aria-hidden="true">…</svg></button>
<div id="tt-save" popover="hint" class="tip">Save <kbd>⌘S</kbd></div>

<button popovertarget="menu" style="anchor-name:--m">Options</button>
<div id="menu" popover class="menu" style="position-anchor:--m">…</div>
```

```css
.tip, .menu { margin: unset; position-area: block-start; position-try-fallbacks: flip-block, flip-inline;
  opacity:0; scale:.96; transition: opacity .12s, scale .12s, overlay .12s allow-discrete, display .12s allow-discrete; }
.menu { position-area: block-end span-inline-end; }
.tip:popover-open, .menu:popover-open { opacity:1; scale:1; }
@starting-style { .tip:popover-open, .menu:popover-open { opacity:0; scale:.96; } }
[interestfor] { interest-delay-start: .2s; interest-delay-end: .1s; }
@supports not (anchor-name: --a) { /* load @oddbird/css-anchor-positioning or Floating UI */ }
```

### Libraries & tools

- Native: Popover API, `popover="hint"`, `interestfor`, CSS anchor positioning (support in the [primer](#platform-primer-the-native-first-overlay-stack-nov-2026)).
- Polyfills: `interestfor` npm package (Chrome's guide prescribes it conditionally); `@oddbird/popover-polyfill`; `@oddbird/css-anchor-positioning` (limits above).
- **Floating UI** *[prior knowledge, not re-verified]*: successor of Popper; middleware `offset`, `flip`, `shift`, `arrow`, `size`, `hide`, `autoPlacement`, plus `autoUpdate` for scroll/resize. Still the pragmatic choice where CSS anchor positioning isn't sufficient (virtual elements, text-selection anchors, cross-iframe, older-browser support). https://floating-ui.com (not visited).
- Popper.js v2: outdated.

### Inspiration links

- [Chrome for Developers, interest-triggered tooltips [visited]](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interest-triggered-tooltips)
- [Una Kravets, "What is popover=hint?" [search]](https://www.una.im/popover-hint)

### Caveats & verification status

- `popover="hint"` / `interestfor` are Chromium-led; Safari/Firefox status in Nov 2026 unconfirmed.
- WCAG 1.4.13 reference is via the Chrome guide [visited]; Floating UI details are prior knowledge.

---

## 34. Alerts, banners and cookie consent

### What & when

- **Alert** = contextual, inline message tied to a region (form, card).
- **Banner** = page/system-wide persistent message (outage, trial ending, consent).
- Errors → alert/banner rather than toast (see [severity map](#choosing-a-feedback-component-severity-and-timing)).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Inline callout | Left 3–4px accent bar + icon + title + body |
| 2 | Subtle tinted | Tone-on-tone background, no border |
| 3 | Outlined with icon chip | Outline border, icon in a chip |
| 4 | Top system banner | Full-width, dismissible, pushes content (not an overlay) |
| 5 | Sticky announcement bar | Marquee/rotating messages; pause on hover; static under reduced motion |
| 6 | Countdown / trial banner | With progress |
| 7 | Form error summary | At top, listing anchor links to fields |
| 8 | Offline / reconnecting bar | With live status |
| 9 | Cookie consent — bottom bar | Equal-weight Accept / Reject / Customize |
| 10 | Cookie consent — corner card | Bottom-left 360px card, non-blocking |
| 11 | Cookie preferences dialog | Category toggles (necessary locked on) |
| 12 | Playful consent | Illustrated cookie, but the same equal-weight buttons |
| 13 | Inline "banner in card" | Feature announcements with dismiss-forever |

### Crafted vs generic

- **Crafted:** consistent severity semantics (colour + icon + word, never colour alone); concise action-oriented copy; banner reserves its height (no CLS); dismissal remembered; dark-mode-tuned tints.
- **Generic:** four rainbow alert boxes; all-caps "ERROR!"; cookie walls with a giant "Accept all" and buried "Reject" (a dark pattern and, in the EU, a regulatory risk *[prior knowledge]*).

### Desktop vs mobile

- Banners stack under the header on mobile, max 2 lines + "More".
- Cookie consent on mobile as a bottom card with `env(safe-area-inset-bottom)`, never covering the whole viewport on first load.

### Accessibility

- `role="alert"` only for messages injected in response to an event that need immediate attention.
- Static page banners are just a labelled `<section aria-label="Announcement">` / `role="region"`.
- Dynamic status → `role="status"`.
- Cookie banner: non-modal region, reachable early in tab order, buttons with explicit labels; the preference dialog uses `<dialog>` (see [31](#31-modals-dialogs-and-bottom-sheets)).

### Code

No alert/banner snippet in the research notes. Editor's note: build the preferences dialog from the [31](#31-modals-dialogs-and-bottom-sheets) modal snippet and the marquee announcement bar from the CSS marquee in [content-display.md](content-display.md).

### Libraries & tools

None named in the notes for alerts, banners or consent.

### Inspiration links

None cited in the notes.

### Caveats & verification status

- Entire section is **[synthesis]**.
- The GDPR consent-banner equal-weight requirement is from prior knowledge, not fetched.

---

## 35. Loaders and spinners

### What & when

Per [NN/g [visited]](https://www.nngroup.com/articles/skeleton-screens/): nothing under 1s; a spinner for a single module under 10s; over 10s needs determinate progress with an estimate (see [37](#37-progress-bars-steppers-and-rings)).

### Variants

css-loaders.com families give the vocabulary. **css-loaders.com** (by **Temani Afif**): "Over 600+ CSS-only loaders made using a single element"; click a loader to copy its CSS; markup is just `<div class="loader"></div>` — [css-loaders.com [visited]](https://css-loaders.com/). Its 44 named families (counts in brackets) are a ready-made variant taxonomy:

> Classic (40), Dots (50), Bars (30), Dots vs Bars (20), Spinner (30), Shapes (40), Polygons (12), 3D (12), Progress (20), Wobbling (20), Infinity (20), Zig-Zag (20), Wavy (16), Mechanic (12), Filling (20), Bouncing (12), Squishy (12), Glowing (12), Rolling (10), Flipping (20), Growing, Continuous, Pulsing, Arcade (10 each), Hypnotic (20), Square (11), Circle (11), Square vs Circle (10), Colorful (20), Nature (16), Time (10), Hungry (8), Shuriken (10), Dancers (10), Moving (10), Eyes (10), Line (20), Thin (10), Cut (10), Clones (20), Arrow (10), Blob (20), Maze (10), Factory (8)

Named build variants [synthesis]:
- Classic ring with gap
- Conic-gradient sweep (snippet below)
- Three-dot bounce / typing indicator (snippet below)
- Bars equalizer
- Morphing polygon (M3 Expressive style)
- Infinity / lemniscate path
- Orbiting dots
- Pulsing blob (`border-radius` keyframes)
- Squishy square
- 3D flipping cube
- Hourglass / time
- "Hungry" pac-man
- Wavy line
- Brand-logo stroke-draw (SVG `stroke-dashoffset`)
- Text shimmer ("Thinking…" gradient sweep across text)
- Skeleton-to-content morph
- Button inline spinner replacing the label (width locked)

**Material 3 Expressive** loading indicator — described via Flutter ports [expressive_m3 [search]](https://pub.dev/packages/expressive_m3), [material3_expressive_loading_indicator [search]](https://pub.dev/packages/material3_expressive_loading_indicator): a "shape-morphing" indicator that morphs between rounded polygons, with an optional "contained" variant on a tonal disc. The Android reference is `LoadingIndicator.kt`. These ports honour platform reduce-motion.

### Crafted vs generic

- **Crafted:** loader matches brand geometry; uses `currentColor` so it inherits context; single element / mask-based; delayed appearance (~300–500ms) to avoid flashes; minimum display time (~500ms) to avoid flicker; inline in the button that triggered it.
- **Generic:** a generic blue ring centered on a white page; GIF spinners; full-page blocking overlays for module loads.

### Desktop vs mobile

Not specifically covered in the notes.

### Accessibility

- Wrap in `role="status"` with a visually hidden "Loading…".
- Set `aria-busy="true"` on the updating region.
- `prefers-reduced-motion` → slow it down drastically or switch to a static/opacity pulse (don't remove all feedback).

### Code

**Single-element conic spinner + dots + reduced motion** [untested snippet]:

```css
.spinner { width: 28px; aspect-ratio: 1; border-radius: 50%;
  background: conic-gradient(from 0deg, #0000 10%, currentColor);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 calc(100% - 3px));
  animation: spin 0.8s linear infinite; }
@keyframes spin { to { rotate: 1turn; } }
.dots { width: 44px; aspect-ratio: 4; --d: no-repeat radial-gradient(circle closest-side, currentColor 90%, #0000);
  background: var(--d) 0 50%, var(--d) 50% 50%, var(--d) 100% 50%; background-size: calc(100%/3) 100%;
  animation: dots 1s infinite linear; }
@keyframes dots { 33%{background-size:calc(100%/3) 0%,calc(100%/3) 100%,calc(100%/3) 100%}
  50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%,calc(100%/3) 100%}
  66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%} }
@media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 3s; } .dots { animation: none; opacity: .6; } }
.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip-path: inset(50%); white-space:nowrap; }
```

```html
<div role="status"><span class="spinner" aria-hidden="true"></span><span class="sr-only">Loading results…</span></div>
```

### Libraries & tools

- [css-loaders.com [visited]](https://css-loaders.com/) — copy-paste single-element CSS loaders.
- Flutter M3 Expressive ports: [expressive_m3](https://pub.dev/packages/expressive_m3), [material3_expressive_loading_indicator](https://pub.dev/packages/material3_expressive_loading_indicator) [search].

### Inspiration links

Not visited this session; verify before relying on them:
- https://cssloaders.github.io (Vineeth T.K., copy-paste loaders)
- https://uiverse.io/loaders (community HTML/CSS loaders, toggles, cards)
- https://loading.io (SVG/GIF/CSS loader generator; also https://loading.io/css/)
- https://codepen.io/tag/loader
- https://tympanus.net/codrops (Codrops demos for page transitions/preloaders)

### Caveats & verification status

- css-loaders.com catalogue: **[visited]**. M3 Expressive: **[search]** via Flutter ports only; the official M3 progress page was JS-rendered and not extracted.
- Uiverse, loading.io, cssloaders.github.io, CodePen and Codrops pages were not fetched, so no specific named pens/authors are cited.
- Editor's note: for branded full-screen intro loaders (counters, curtains) see [signature-experiential.md, 43](signature-experiential.md#43-preloaders-intro-screens-and-splash-counters).

---

## 36. Skeleton screens and shimmer

### What & when

- Full-page / list loads of 1–10s ([NN/g [visited]](https://www.nngroup.com/articles/skeleton-screens/)). Mirror the real layout.
- NN/g skeleton types:
  - **Static** content/image placeholders: most common; mirror hierarchy.
  - **Animated** (pulse/shimmer): use carefully; motion can distract or cause a11y issues.
  - **Frame-display** (header/footer only): **avoid**; looks broken and drives abandonment.
- Skeletons are not a substitute for performance work (NN/g).
- Skeletons don't fit uploads/downloads/conversions; use a progress bar there (NN/g).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Static grey blocks | Plain placeholders |
| 2 | Linear shimmer sweep | Gradient moving across each block |
| 3 | **Synchronized shimmer** | One wave across all blocks via `background-attachment: fixed` (snippet) |
| 4 | Pulse | Opacity 1 → .5 |
| 5 | Wave-from-top staggered rows | `animation-delay: calc(var(--i)*80ms)` |
| 6 | Blurred low-quality image placeholder | LQIP / BlurHash / ThumbHash for media |
| 7 | Dominant-colour placeholder | Single colour from the image |
| 8 | Content-aware text skeleton | Line widths 100 / 92 / 60% |
| 9 | Progressive skeleton | Header real, body skeleton (streaming SSR) |
| 10 | Skeleton-to-content crossfade | No layout jump |
| 11 | Tinted brand skeleton | Blocks tinted with brand hue at 6–8% alpha; works in dark mode |

### Crafted vs generic

- **Crafted:** exact dimensions of the final content (zero CLS); rounded to match final radii; subtle shimmer (≤ 8% contrast); 1.5–2s cycle; shown only after ~300ms.
- **Generic:** three equal grey bars for everything; high-contrast shimmer; skeleton that doesn't match the final layout; skeleton for a 200ms request.

### Desktop vs mobile

Not specifically covered in the notes.

### Accessibility

- Container `aria-busy="true"`; skeleton blocks `aria-hidden="true"`; one `role="status"` ("Loading articles").
- Reduced motion → static.
- NN/g anti-pattern: never show "No records" while still loading (see [39](#39-empty-states-error-pages-and-404)).

### Code

**Synchronized shimmer skeleton** [untested snippet]:

```css
.sk { --base: color-mix(in oklab, CanvasText 7%, Canvas); --hi: color-mix(in oklab, CanvasText 13%, Canvas);
  background: linear-gradient(100deg, var(--base) 40%, var(--hi) 50%, var(--base) 60%) var(--base);
  background-size: 200vw 100%; background-attachment: fixed; /* synced wave */
  border-radius: 8px; animation: shimmer 1.6s linear infinite; }
@keyframes shimmer { from { background-position: 100vw 0 } to { background-position: -100vw 0 } }
@media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
```

### Libraries & tools

None named in the notes (CSS only). LQIP / BlurHash / ThumbHash are named as techniques.

### Inspiration links

None cited in the notes.

### Caveats & verification status

NN/g thresholds and types: **[visited]**. Variants, craft criteria and snippet: **[synthesis] / [untested snippet]**.

---

## 37. Progress bars, steppers and rings

### What & when

- Determinate when measurable (uploads, onboarding completion). Operations over 10s need a progress bar + time estimate ([NN/g [visited]](https://www.nngroup.com/articles/skeleton-screens/)).
- Steppers for multi-step flows (NN/g wizard guidance; see [31](#31-modals-dialogs-and-bottom-sheets), variant 10).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Thin top-of-page route bar | NProgress-style, 2–3px, trickle easing |
| 2 | Segmented bar | Stories-style (Instagram) |
| 3 | Gradient / striped animated bar | Animated fill |
| 4 | Wavy linear bar | M3 Expressive |
| 5 | Determinate ring | `@property`-animated conic-gradient (snippet) |
| 6 | Wavy ring | M3 Expressive circular |
| 7 | Gauge / semi-circle meter | Use `<meter>` for values-in-range, not progress |
| 8 | Horizontal stepper | Connectors fill between steps |
| 9 | Vertical timeline stepper | Mobile |
| 10 | Dot stepper | Carousel / onboarding |
| 11 | "x of y" compact stepper | Mobile headers |
| 12 | Progress-in-button | Button background fills as upload proceeds |
| 13 | Scroll-progress bar | Scroll-driven animations (`animation-timeline: scroll()`) |

M3 Expressive **wavy** linear/circular progress: sinusoidal stroke, configurable amplitude/speed, stop indicator — via Flutter ports [expressive_m3 [search]](https://pub.dev/packages/expressive_m3), [material3_expressive_loading_indicator [search]](https://pub.dev/packages/material3_expressive_loading_indicator).

Editor's note: reading-progress rails and section indicators are covered in [navigation-structure.md](navigation-structure.md) and [signature-experiential.md, 42](signature-experiential.md#42-custom-scrollbars-and-smooth-scrolling).

### Crafted vs generic

- **Crafted:** eased value changes (never jumps backward); stop indicator / track gap (M3); honest estimates; label with percentage in `tabular-nums`; completion micro-celebration (check morph).
- **Generic:** bar that sits at 99%; fake linear progress unrelated to the work; steppers with 9 tiny labels on mobile.

### Desktop vs mobile

Mobile: vertical timeline stepper, "x of y" compact stepper (variants 9 and 11); avoid many tiny labels.

### Accessibility

- Use `<progress value max>` (implicit `progressbar` role) with a label; indeterminate = `<progress>` without `value`.
- Ring: `role="progressbar" aria-valuenow aria-valuemin aria-valuemax aria-label`.
- Steppers: `<ol>` with `aria-current="step"` on the current item and visually hidden "Completed" on done steps.

### Code

**Ring with `@property`, stepper markup and styled `<progress>`** [untested snippet]:

```css
@property --p { syntax: '<number>'; inherits: false; initial-value: 0; }
.ring { --p: 0; width: 56px; aspect-ratio:1; border-radius:50%;
  background: conic-gradient(var(--accent) calc(var(--p)*1%), color-mix(in oklab, var(--accent) 15%, transparent) 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 6px), #000 calc(100% - 5px));
  transition: --p .6s cubic-bezier(.32,.72,0,1); }
```

```html
<div class="ring" role="progressbar" aria-label="Upload" aria-valuemin="0" aria-valuemax="100" aria-valuenow="64" style="--p:64"></div>
<ol class="stepper"><li>Account</li><li aria-current="step">Billing</li><li>Review</li></ol>
```

```css
progress { appearance:none; height:6px; border-radius:99px; overflow:hidden; background: var(--track); border:0; }
progress::-webkit-progress-bar { background: var(--track); }
progress::-webkit-progress-value { background: var(--accent); border-radius:99px; transition: inline-size .3s; }
progress::-moz-progress-bar { background: var(--accent); }
```

### Libraries & tools

NProgress named as the style reference for route bars (no URL in notes). M3 Expressive Flutter ports above.

### Inspiration links

None beyond the M3 Expressive ports.

### Caveats & verification status

- Official M3 progress-indicator page returned no extractable content (JS-rendered), so M3 numbers (thickness, gap, stop-indicator size) are unverified.
- `@property` support (Baseline 2024) is prior knowledge.

---

## 38. Badges, chips, tags and pills

### What & when

Definitions:
- **Badge** = non-interactive status/count indicator.
- **Chip** = interactive (filter, input/removable, suggestion, assist).
- **Tag** = categorisation label (may link).
- **Pill** = a shape, not a component.

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Notification dot | 8px, ring cut-out against avatar/icon |
| 2 | Count badge | `99+` cap, `tabular-nums`, scale-pop on increment |
| 3 | Status badge with leading dot | Live / Draft / Failed |
| 4 | Soft-tinted tone badges | Background 12% / text 80% of hue, OKLCH |
| 5 | Outline badge | Border only |
| 6 | "New" shimmer badge | Subtle animated gradient |
| 7 | Filter chips | Toggle; check icon slides in; `aria-pressed` |
| 8 | Input chips | In a tokenized text field; Backspace removes the last |
| 9 | Suggestion chips | Horizontally scrolling on mobile, scroll-snap |
| 10 | Avatar chip | Person + remove |
| 11 | Colour-coded tag | Hashing for consistent label colours |
| 12 | Keyboard `<kbd>` pills | Shortcut hints |
| 13 | Gradient-border premium badge | `border-image` / mask |
| 14 | Dismissible tag | `×` that grows its hit area to 24px+ |

### Crafted vs generic

- **Crafted:** optical vertical centering (cap-height aware, `text-box: trim-both cap alphabetic` where supported *[prior knowledge, Chromium/Safari]*); consistent radii scale; contrast-checked tints in light and dark; count animations; touch targets ≥ 24×24 (WCAG 2.5.8).
- **Generic:** saturated rainbow pills; badges used as buttons; 10px illegible text.

### Desktop vs mobile

Suggestion chips scroll horizontally with scroll-snap on mobile (variant 9); touch targets ≥ 24×24.

### Accessibility

- Count badges need a text alternative ("3 unread notifications") on the parent control.
- Status not by colour alone.
- Filter chips: `<button aria-pressed>`.
- Removable chip: `<button aria-label="Remove tag: Design">`.
- Chip groups can use `role="group"` with a label.

### Code

No badge/chip snippet in note 04. Editor's note: a radio/checkbox chip pattern (`.chip:has(input:checked)`) appears in [signature-experiential.md, 45](signature-experiential.md#45-contact-sections-and-contact-forms).

### Libraries & tools

None named in the notes.

### Inspiration links

None cited in the notes.

### Caveats & verification status

- Entire section **[synthesis]**. WCAG 2.5.8 and `text-box-trim` support are prior knowledge; confirm on caniuse.

---

## 39. Empty states, error pages and 404

### What & when

Situations: first use (no data yet), user-cleared (inbox zero), no results (search/filter), error (failed load / permissions / offline), and 404/500 pages.

NN/g roles — [NN/g, Designing Empty States in Complex Applications [visited]](https://www.nngroup.com/articles/empty-state-interface-design/):
1. **Communicate system status** ("There are no records to display for the selected date range").
2. **Provide learning cues** ("pull revelations", e.g. DataDog "Star your favorites to list them here"; Power BI recents explanation).
3. **Provide direct pathways** (Create button + Learn more; Loggly offers "add log sources" or "load demo data").
- Anti-patterns: showing "No records" *while still loading* (destroys trust); fully blank panels; an unexplained empty Alerts panel; vague instructions.

Business case for 404s: Kontent.ai cites a Google Merch Shop study where a single 404 dropped desktop conversion **57.5% (3.36% → 1.86%)** — [Kontent.ai [search]](https://kontent.ai/blog/best-404-page-examples) (secondary citation; original study not checked).

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Illustrated first-use | Primary CTA + "learn more" (NN/g pathway) |
| 2 | Demo-data / sample template offer | Loggly pattern |
| 3 | "Pull revelation" micro-hint | Inside an empty panel (DataDog star example) |
| 4 | Celebratory inbox-zero | Subtle confetti/illustration, no CTA needed |
| 5 | No-results | Query echo, spelling suggestion, "clear filters" button |
| 6 | Ghost / preview empty state | Faded example cards showing what will appear |
| 7 | Error state | Retry + expandable status details |
| 8 | Offline state | Queued-action count |
| 9 | Permission-denied | "Request access" path |
| 10 | 404 search-first | Search box + popular links |
| 11 | 404 interactive scene / mini-game | E.g. Chrome-dino-like |
| 12 | 404 kinetic typography | Large "404" with variable-font animation |
| 13 | Brand-story 404 | Marvel user-art gallery; Netflix "Lost in Space" |
| 14 | Terminal / glitch 404 | For developer brands |
| 15 | 500 page | Status-page link and incident ID |

Creative 404 archetypes seen across the galleries [synthesis]: illustrated "lost character" scenes; playable mini-game (e.g. Chrome-dino-like); interactive physics/parallax scene following the cursor; brand-pun copywriting; search-first 404 (search box + top links); user-content gallery (Marvel); glitch/terminal aesthetic for dev brands; large kinetic "404" typography with variable-font animation.

### Crafted vs generic

- **Crafted:** specific copy explaining *why* it's empty and *what to do*; one clear CTA; illustration in brand style and sized modestly; distinguishes "loading" from "empty" (NN/g anti-pattern); 404 keeps full site nav and returns the correct HTTP 404 status.
- **Generic:** stock "Oops! Nothing here" + sad face; blank panels; "No records" flash during loading; 404 without navigation or search.

### Desktop vs mobile

- Mobile: illustration ≤ 160px; CTA full-width and thumb-reachable.
- Desktop: center within the panel (not the viewport).

### Accessibility

- Decorative illustration `alt=""` / `aria-hidden`.
- A heading announces the state.
- After filtering to zero results, announce via `role="status"` ("No results for 'xyz'").
- Interactive 404 games must not trap the keyboard and must honour reduced motion.

### Code

No snippet in the research notes.

### Libraries & tools

None named in the notes.

### Inspiration links

404 galleries:
- [Awwwards 404 pages [search]](https://www.awwwards.com/websites/404-pages/?page=5) — humor, animation, interactive features
- [Speckyboy [search]](https://speckyboy.com/creative-website-404-pages/) — 40+ examples, updated Jan 2026, illustration-led (Doctor Who, Stranger Things themes)
- [Search Engine Journal [search]](https://www.searchenginejournal.com/404-page-examples/211154/) — 40 examples incl. Marvel's user-artwork gallery
- [Webflow [search]](https://webflow.com/blog/best-404-pages) — 19 examples
- [Wix [search]](https://www.wix.com/blog/best-404-page-design) — 15 examples (Jan 2026)
- [Colorlib [search]](https://colorlib.com/wp/404-error-pages/) — 29 (2026)
- [Meetanshi [search]](https://meetanshi.com/blog/best-404-page-examples/) — 20+ incl. Netflix "Lost in Space"
- [IONOS [search]](https://www.ionos.com/digitalguide/websites/website-creation/cool-and-creative-404-pages-tips-and-examples)
- [Kontent.ai [search]](https://kontent.ai/blog/best-404-page-examples)

Empty-state and app-screen sources (not visited; verify):
- https://mobbin.com (search "empty state")
- https://dribbble.com/tags/empty_state
- https://www.pageflows.com
- https://emptystat.es (empty-state gallery; status unknown)
- https://codepen.io/tag/404

### Caveats & verification status

- NN/g empty-state roles: **[visited]**. All 404 galleries: **[search]**. The 57.5% statistic is a secondary citation.
- No dedicated, verified empty-state gallery surfaced in search; Mobbin/Dribbble were not fetched.

---

## 40. Avatars, avatar groups and presence

### What & when

Representing people (and orgs/bots) in UI: single avatars, overlapping groups/facepiles, and presence/status. Notes give variants and rules only [synthesis].

### Variants

| # | Variant | Rebuild spec |
|---|---|---|
| 1 | Image avatar with initials fallback | Colour hashed from user id; OKLCH with fixed L/C, varying hue |
| 2 | Squircle avatars | `border-radius` 30% or SVG superellipse mask, for orgs/bots; circles for people |
| 3 | Overlapping group with mask cut-out ring | Instead of a white border (works on any background; snippet) |
| 4 | Group with "+5" overflow chip | Opens a popover list |
| 5 | Hover-spread group | Avatars fan out on hover |
| 6 | Presence dot | Online green; away amber ring; busy red with bar; offline hollow; cut out of the avatar |
| 7 | Live / streaming ring | Animated gradient ring (Instagram stories) |
| 8 | Typing / speaking indicator ring | Pulses with audio level |
| 9 | Status emoji badge | Slack |
| 10 | Stacked facepile in comments | "and 12 others" |
| 11 | Editable avatar | Camera overlay on hover |
| 12 | Skeleton avatar | Shimmer |
| 13 | Multiplayer cursors/avatars in header | Figma-like, "follow" on click |

### Crafted vs generic

- **Crafted:** mask-based cut-outs; consistent size scale (20 / 24 / 32 / 40 / 56 / 80); image `object-fit: cover` with a subtle inner 1px stroke (`box-shadow: inset 0 0 0 1px rgb(0 0 0/.08)`); deterministic fallback colours; presence not colour-only (shape differs).
- **Generic:** white-border stacks that break on dark backgrounds; random colours on each render; pixelated images.

### Desktop vs mobile

Not specifically covered in the notes.

### Accessibility

- Avatar `alt` = the person's name when it's the only identifier; `alt=""` when the name is adjacent.
- Presence conveyed in text ("Ana, online").
- Group overflow button labelled "Show 5 more people".

### Code

**Overlapping group with cut-out ring and presence** [untested snippet]:

```css
.group { display:flex; }
.group img { width:40px; aspect-ratio:1; border-radius:50%; object-fit:cover; }
.group img + img { margin-inline-start:-10px;
  /* cut a 3px ring where the previous avatar overlaps, background-agnostic */
  mask: radial-gradient(circle 23px at -10px 50%, #0000 99%, #000); }
.avatar { position:relative; width:40px; }
.avatar img { border-radius:50%;
  mask: radial-gradient(circle 8px at calc(100% - 6px) calc(100% - 6px), #0000 99%, #000); }
.avatar .presence { position:absolute; right:1px; bottom:1px; width:10px; aspect-ratio:1; border-radius:50%; background:#22c55e; }
.avatar .presence[data-status="away"] { background:none; box-shadow: inset 0 0 0 2.5px #f59e0b; }
```

### Libraries & tools

None named in note 04. Editor's note: Magic UI "Avatar Circles" is listed under testimonials in [component-libraries.md](component-libraries.md).

### Inspiration links

None cited in the notes.

### Caveats & verification status

Entire section **[synthesis] / [untested snippet]**. Specific named CodePens/Dribbble shots per variant were not verified.

---

## Sources

Visited (fetched and read):
- Emil Kowalski, "Building a toast component" — https://emilkowal.ski/ui/building-a-toast-component
- Emil Kowalski, "Building a drawer component" — https://emilkowal.ski/ui/building-a-drawer-component
- Sonner docs, Toaster — https://sonner.emilkowal.ski/toaster
- css-loaders.com — https://css-loaders.com/
- NN/g, Modal & Nonmodal Dialogs — https://www.nngroup.com/articles/modal-nonmodal-dialog/
- NN/g, Skeleton Screens 101 — https://www.nngroup.com/articles/skeleton-screens/
- NN/g, Designing Empty States in Complex Applications — https://www.nngroup.com/articles/empty-state-interface-design/
- WAI-ARIA APG Modal Dialog Pattern — https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- web.dev, New to the web platform in January 2026 — https://web.dev/blog/web-platform-01-2026
- MDN @starting-style — https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
- Chrome for Developers, interest-triggered tooltips — https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interest-triggered-tooltips

Search results only:
- Paweł Grzybek, invoker commands — https://pawelgrzybek.com/more-invoker-commands-and-more-reasons-not-to-use-javascript-please
- InfoQ, HTML invoker commands (Jan 2026) — https://www.infoq.com/news/2026/01/html-invoker-commands
- OpenReplay, invoker commands guide — https://blog.openreplay.com/invoker-commands-api-guide/
- DEV, invoker commands — https://dev.to/grimicorn/invoker-commands-wiring-buttons-to-dialogs-and-popovers-without-javascript-5agk
- Refonte Learning, anchor positioning — https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline
- Syncfusion, anchor positioning — https://www.syncfusion.com/blogs/post/css-anchor-positioning
- State of CSS 2026 — https://2026.stateofcss.com/
- Una Kravets, popover=hint — https://www.una.im/popover-hint
- blink-dev, interestfor Intent to Ship — https://groups.google.com/a/chromium.org/g/blink-dev/c/bX1G_yDt6W4
- web-features explorer, dialog-closedby — https://web-platform-dx.github.io/web-features-explorer/features/dialog-closedby
- Chrome guide, platform controls dismiss dialog — https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/platform-controls-dismiss-dialog
- Socket, dialog-closedby-polyfill — https://socket.dev/npm/package/dialog-closedby-polyfill
- PatternFly toasts — https://pf3.patternfly.org/v3/pattern-library/communication/toast-notifications
- Deliveroo toasts — https://design.deliveroo.net/components/tds/toasts
- Grommet notification — https://grommet.io/notification
- LogRocket — https://blog.logrocket.com/?p=182293
- expressive_m3 — https://pub.dev/packages/expressive_m3
- material3_expressive_loading_indicator — https://pub.dev/packages/material3_expressive_loading_indicator
- 404 galleries: Awwwards, Speckyboy, SEJ, Webflow, Wix, Colorlib, Meetanshi, IONOS, Kontent.ai (URLs in [39](#39-empty-states-error-pages-and-404))

Named but not visited (verify before citing): https://vaul.emilkowal.ski, https://github.com/emilkowalski/vaul, https://github.com/emilkowalski/sonner, https://www.radix-ui.com/primitives/docs/components/toast, https://floating-ui.com, https://react-hot-toast.com, https://carlosroso.com/notyf/, https://cssloaders.github.io, https://uiverse.io/loaders, https://loading.io/css/, https://mobbin.com, https://www.pageflows.com, https://tympanus.net/codrops/, https://codepen.io/tag/404, https://codepen.io/tag/loader, https://dribbble.com/tags/empty_state, https://emptystat.es

Source note: `research_notes/UI components animations and assets/04_feedback_overlay_components.md`.
