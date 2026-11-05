# Feedback, Overlay & Status UI Components (Web, Desktop + Mobile) — Research Notes, Nov 2026

> Sourcing convention used in these notes:
> - **[visited]** = page fetched and read during this research session.
> - **[search]** = URL surfaced in a search result (title/snippet seen), page not fetched in full.
> - Items under **Inferences** that are marked *(prior knowledge, not re-verified)* come from the researcher's background knowledge of the platform/libraries and were NOT re-checked against a live source in this session. Code snippets under Inferences are researcher-synthesized patterns built from the cited primitives; they have not been browser-tested here.

---

## Q1. Which libraries are best in class (Sonner, Vaul, Radix Dialog/Toast, Floating UI, React Hot Toast, Notyf) and what makes their design/motion feel crafted?

### Takeaway
Sonner (toasts) and Vaul (drawers/bottom sheets), both by Emil Kowalski, are the reference implementations for "crafted" overlay motion: they win on dozens of near-invisible details (interruptible CSS transitions instead of keyframes, depth-stacking via scale, momentum-based swipe/drag dismissal, pausing timers on hidden tabs, iOS-matched easing `cubic-bezier(0.32, 0.72, 0, 1)` at 500ms, keyboard-aware sheet sizing via `visualViewport`). Their design lesson transfers to any stack, including native `<dialog>`/Popover builds.

### Cited Findings

**Sonner (toast) — motion & interaction internals** — all from [Emil Kowalski, "Building a toast component" [visited]](https://emilkowal.ski/ui/building-a-toast-component)
- Enter animation uses **CSS transitions, not keyframes**, because transitions are interruptible/retargetable; rapidly added toasts therefore don't "jump" into place.
- Base rule: `transition: transform 400ms ease;` on `.sonner-toast`. A `useEffect` flips a `mounted` state after first render; a `data-mounted` attribute toggles the toast from `translateY(100%)` to `translateY(0)`. The author notes `@starting-style` could now replace this mount trick.
- **Stacking:** every toast is `position:absolute`; each one behind the front is offset by gap × index and scaled down 0.05 per index — index 1: `translateY(-14px) scale(0.95)`, index 2: `translateY(-28px) scale(0.9)`, front: `translateY(0) scale(1)`. Driven by CSS custom properties `--toasts-before`, `--lift-amount`, `--scale`, `--y`.
- In collapsed/stacked mode **all toasts take the front toast's height** so the peeking edges line up even when content heights differ.
- **Expand on hover:** expanded offset = `heightIndex * GAP` + sum of heights of all preceding toasts, passed to CSS as `--offset`. An `expand` prop keeps them always expanded.
- A **`:after` pseudo-element fills the gaps** between expanded toasts so hover isn't lost when the pointer crosses a gap.
- **Swipe to dismiss:** pointer delta written to `--swipe-amount` → `translateY`. Dismissal is **momentum-based**: velocity = `|swipeAmount| / timeElapsed`; dismiss if distance > `SWIPE_THRESHOLD` **or velocity > 0.11** (tuned by trial and error). **Pointer capture** is set on drag start so dragging continues outside the toast. Dragging in the disallowed direction applies **friction** (slows and stops) instead of a hard stop. Works for mouse + touch.
- **Timing:** default lifetime 4 s; **hover pauses** the timer; a `useIsDocumentHidden` hook listens to `visibilitychange` / `document.hidden` and **pauses timers while the tab is inactive**.
- Architecture: an **observable store (not React Context)** so `toast()` can be called from anywhere; `<Toaster/>` subscribes. API inspired by react-hot-toast; `toast.promise` handles loading → success/error.
- Author attributes success mainly to low-friction DX plus polished defaults and animation — "many small, nearly invisible details".

**Sonner `<Toaster/>` API defaults** — [Sonner docs, Toaster [visited]](https://sonner.emilkowal.ski/toaster)
- `theme: light`, `richColors: false`, `expand: false`, `visibleToasts: 3`, `position: bottom-right`, `closeButton: false`, `offset: 32px`, **`mobileOffset: 16px` (applies below 600px width)**, `swipeDirections` (based on position), `dir: ltr`, **`hotkey: ⌥/Alt + T`** (jumps focus to the toast region), `invert: false`, `gap: 14`, `icons`, `toastOptions` (the table shows `4000`, apparently the default duration).
- The docs page does not describe aria-live behaviour (gap — see below).

**Vaul (drawer / bottom sheet) — internals** — all from [Emil Kowalski, "Building a drawer component" [visited]](https://emilkowal.ski/ui/building-a-drawer-component)
- During drag, Vaul writes `transform: translateY()` **directly on the element rather than via a CSS variable**: changing an inherited variable forced style recalculation on all descendants and made drags laggy with >~20 list items. No React re-renders during drag.
- **Flick/momentum closes** the drawer without crossing a distance threshold (no numeric value given).
- **Overdrag damping:** pulling up past the top moves the sheet progressively less.
- **Scroll vs drag:** `shouldDrag` only allows drag when inner content is scrolled to top (like native iOS); after scrolling back to top, **drag is blocked for 100 ms** to stop an overshooting fast scroll from closing the drawer.
- **`scaleBackground`:** the page wrapper (`[vaul-drawer-wrapper]`) is transformed and its border-radius changed so the page looks like a sheet behind a sheet (iOS card stack); values are driven by drag progress (e.g. 40% drag → radius at 60% of max).
- **Easing `cubic-bezier(0.32, 0.72, 0, 1)` borrowed from Ionic, matched to iOS sheets; duration 500ms**: `.drawer { transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1); }`
- **Snap points** may be viewport fractions or fixed px (fixed px keeps an input at the same visible height across devices); release snaps to nearest; momentum can skip points or close.
- **Virtual keyboard:** browser auto scroll-into-view is disabled; a `visualViewport` `resize` listener sets drawer height = visual viewport height − offset and `bottom = max(window.innerHeight − visualViewport.height, 0)`, keeping the sheet above the keyboard. Limitation: slight lag because `resize` fires after the keyboard finishes animating.
- **Multi-touch:** ignore extra touches while dragging (`if (isDragging) return;`).
- **Safari theme-color sync (experimental, not shipped in Vaul):** compute the opaque equivalent of the overlay (`channel = a·overlay + (1−a)·bg`; `rgba(0,0,0,.5)` on white → `rgb(128,128,128)`), pre-generate 50 interpolated colours and update `<meta name="theme-color">` every 10ms across the 500ms open.
- Test on a real phone via cable + Safari devtools, or Xcode Simulator.

**Floating UI / Radix / react-hot-toast / Notyf** — not fetched this session (see Gaps / Inferences).

### Inferences
- The transferable "crafted" recipe from Sonner/Vaul: (1) interruptible transitions; (2) physical metaphors (depth scale, friction, momentum); (3) respect the user's attention (pause on hover/hidden tab, hotkey to reach toasts); (4) iOS-grade easing curves rather than `ease-in-out`; (5) performance discipline (write transforms on the moving element only).
- Radix Toast *(prior knowledge, not re-verified)*: unstyled primitives; viewport is an `<ol>` in a labelled region, default hotkey F8, built-in swipe with `swipeDirection`/`swipeThreshold`, foreground vs background toast types (assertive vs polite announcement). Radix Dialog: focus trap, scroll lock, `aria-hidden` on siblings, portal; good when you need React composition but now largely replaceable by native `<dialog>`.
- Floating UI *(prior knowledge, not re-verified)*: successor of Popper; middleware `offset`, `flip`, `shift`, `arrow`, `size`, `hide`, `autoPlacement`, plus `autoUpdate` for scroll/resize; still the pragmatic choice where CSS anchor positioning isn't sufficient (virtual elements, text-selection anchors, cross-iframe, older-browser support).
- react-hot-toast *(prior knowledge)*: headless `useToaster` hook, promise API, ~5KB; Notyf *(prior knowledge)*: framework-free vanilla JS toaster with ripple-style entrance, good for non-React sites.

### Gaps
- Did not fetch Radix, Floating UI, react-hot-toast or Notyf docs in this session; their exact current props/accessibility behaviour (e.g. Sonner's live-region implementation, Radix F8 default) are unverified here.
- No numeric velocity threshold or damping coefficient is published for Vaul.
- Maintenance status of Vaul in 2026 was not checked (the researcher recalls it was marked unmaintained by its author around 2025 — unverified; check https://github.com/emilkowalski/vaul before adopting).

---

## Q2. What creative loader, skeleton, 404 and empty-state designs exist on CodePen, Uiverse, Dribbble, Codrops, Mobbin, and 404 / empty-state galleries?

### Takeaway
For loaders, Temani Afif's css-loaders.com is the deepest single-element CSS catalogue (600+ loaders in 44 named families) and doubles as a taxonomy of creative variants. 404 inspiration is abundant in curated roundups (Awwwards, Speckyboy, SEJ, Webflow, Wix, Colorlib, Kontent.ai); dedicated empty-state galleries did not surface in search, so Mobbin/Dribbble-style app-screen libraries remain the practical source.

### Cited Findings
- **css-loaders.com** (by **Temani Afif**): "Over 600+ CSS-only loaders made using a single element"; click a loader to copy its CSS; markup is just `<div class="loader"></div>` — [css-loaders.com [visited]](https://css-loaders.com/)
- Its 44 named families (counts in brackets) — a ready-made variant taxonomy: Classic (40), Dots (50), Bars (30), Dots vs Bars (20), Spinner (30), Shapes (40), Polygons (12), 3D (12), Progress (20), Wobbling (20), Infinity (20), Zig-Zag (20), Wavy (16), Mechanic (12), Filling (20), Bouncing (12), Squishy (12), Glowing (12), Rolling (10), Flipping (20), Growing, Continuous, Pulsing, Arcade (10 each), Hypnotic (20), Square (11), Circle (11), Square vs Circle (10), Colorful (20), Nature (16), Time (10), Hungry (8), Shuriken (10), Dancers (10), Moving (10), Eyes (10), Line (20), Thin (10), Cut (10), Clones (20), Arrow (10), Blob (20), Maze (10), Factory (8) — [css-loaders.com [visited]](https://css-loaders.com/)
- 404 galleries: Awwwards collection (humor, animation, interactive features) — [Awwwards 404 pages [search]](https://www.awwwards.com/websites/404-pages/?page=5); Speckyboy 40+ examples, updated Jan 2026, illustration-led (Doctor Who, Stranger Things themes) — [Speckyboy [search]](https://speckyboy.com/creative-website-404-pages/); Search Engine Journal 40 examples incl. Marvel's user-artwork gallery — [SEJ [search]](https://www.searchenginejournal.com/404-page-examples/211154/); Webflow 19 examples — [Webflow [search]](https://webflow.com/blog/best-404-pages); Wix 15 examples (Jan 2026) — [Wix [search]](https://www.wix.com/blog/best-404-page-design); Colorlib 29 (2026) — [Colorlib [search]](https://colorlib.com/wp/404-error-pages/); Meetanshi 20+ incl. Netflix "Lost in Space" — [Meetanshi [search]](https://meetanshi.com/blog/best-404-page-examples/); IONOS — [IONOS [search]](https://www.ionos.com/digitalguide/websites/website-creation/cool-and-creative-404-pages-tips-and-examples).
- Business case: Kontent.ai cites a Google Merch Shop study where a single 404 dropped desktop conversion **57.5% (3.36% → 1.86%)** — [Kontent.ai [search]](https://kontent.ai/blog/best-404-page-examples) (secondary citation; original study not checked).
- Material 3 Expressive "shape-morphing" loading indicator (morphs between rounded polygons, optional "contained" variant on a tonal disc) and **wavy** linear/circular progress (sinusoidal stroke, configurable amplitude/speed, stop indicator) — described via Flutter ports [expressive_m3 [search]](https://pub.dev/packages/expressive_m3), [material3_expressive_loading_indicator [search]](https://pub.dev/packages/material3_expressive_loading_indicator); the Android reference is `LoadingIndicator.kt`. These ports honour platform reduce-motion.

### Inferences
- Other well-known inspiration sources (NOT visited this session — verify links): https://cssloaders.github.io (Vineeth T.K., copy-paste loaders), https://uiverse.io/loaders (community HTML/CSS loaders, toggles, cards), https://loading.io (SVG/GIF/CSS loader generator; also `loading.io/css`), https://codepen.io/tag/loader and /tag/404, https://tympanus.net/codrops (Codrops demos for page transitions/preloaders), https://mobbin.com (searchable real-app screens: "empty state", "bottom sheet", "toast"), https://dribbble.com/tags/empty_state, https://www.pageflows.com, https://emptystat.es (empty-state gallery; status unknown), https://www.awwwards.com/websites/404-pages/.
- Creative 404 archetypes seen across the galleries (synthesis): illustrated "lost character" scenes; playable mini-game (e.g. Chrome-dino-like); interactive physics/parallax scene following the cursor; brand-pun copywriting; search-first 404 (search box + top links); user-content gallery (Marvel); glitch/terminal aesthetic for dev brands; large kinetic "404" typography with variable-font animation.

### Gaps
- No dedicated, verified empty-state gallery surfaced in search; Mobbin/Dribbble were not fetched.
- Uiverse, loading.io, cssloaders.github.io, CodePen and Codrops pages were not fetched, so specific named pens/authors cannot be cited here.
- Official M3 progress-indicator page returned no extractable content (JS-rendered), so M3 numbers (thickness, gap, stop-indicator size) are unverified.

---

## Q3. What do NN/g, Material Design 3 and Apple HIG say about modals, toasts, progress indicators and empty states?

### Takeaway
NN/g: interrupt only when it's worth the cost (critical warnings, critical missing info, workflow steps, one valuable profiling question) and never for newsletters, checkout or comparisons; skeletons for full-page loads under ~10 s, spinners for single modules, progress bars with time estimate for >10 s, nothing at all under 1 s; empty states must communicate status, teach, and offer a direct action. Design systems broadly reserve toasts for low-severity, non-blocking messages and send errors to inline/banners.

### Cited Findings
**Modals (NN/g)** — [NN/g, Modal & Nonmodal Dialogs [visited]](https://www.nngroup.com/articles/modal-nonmodal-dialog/)
- Modal = disables main content and requires explicit interaction; nonmodal leaves main content active.
- Costs: interrupts workflow, loses context, adds a "dismiss" goal, can hide content the dialog depends on.
- Use for: (1) critical warnings preventing irreversible harm (overwrite/quit without saving) — but form errors belong inline; (2) critical missing info needed to continue a user-initiated action (log in to save a favourite); (3) workflow fragmentation/wizards (show progress; use a full page if many steps); (4) one low-commitment, high-value profiling question (Zillow "do you have an agent?").
- Avoid for: nonessential content (newsletter sign-ups train users to ignore modals), high-stakes processes like checkout, and complex decisions needing background info.
- Nonmodal alternative for noncritical tasks; a nonmodal desktop dialog may become a full-screen modal on mobile; Gmail compose is the canonical nonmodal example.
- Closing line: "no one likes to be interrupted, but if you must, make sure it's worth the cost."

**Loading indicators (NN/g)** — [NN/g, Skeleton Screens 101 [visited]](https://www.nngroup.com/articles/skeleton-screens/)
- **<1 s:** show no skeleton or spinner (feels jittery). **<10 s:** skeleton or spinner. **>10 s:** progress bar with explicit time estimate.
- Skeleton for **full-page** loads; spinner for a **single module** (video, dashboard card); progress bar for uploads/downloads/conversions (skeletons don't fit).
- Skeleton types: static content/image placeholders (most common, mirror hierarchy); animated (pulse/shimmer — use carefully, motion can distract/cause a11y issues); **frame-display (header/footer only) — avoid**, looks broken and drives abandonment.
- Skeletons are not a substitute for performance work.

**Empty states (NN/g)** — [NN/g, Designing Empty States in Complex Applications [visited]](https://www.nngroup.com/articles/empty-state-interface-design/)
- Three roles: **communicate system status** ("There are no records to display for the selected date range"); **provide learning cues** ("pull revelations", e.g. DataDog "Star your favorites to list them here"; Power BI recents explanation); **provide direct pathways** (Create button + Learn more; Loggly offers "add log sources" or "load demo data").
- Anti-patterns: showing "No records" *while still loading* (destroys trust); fully blank panels; unexplained empty Alerts panel; vague instructions.

**Toasts (design systems)** — [PatternFly toasts [search]](https://pf3.patternfly.org/v3/pattern-library/communication/toast-notifications) (low-severity, unobtrusive; top-right; ~8 s; persist on hover; icon per type); [Deliveroo toasts [search]](https://design.deliveroo.net/components/tds/toasts) (avoid toasts for errors — use a system banner); [Grommet notification [search]](https://grommet.io/notification) (one toast at a time); [LogRocket [search]](https://blog.logrocket.com/?p=182293) (form errors in context). Placement guidance conflicts across systems (bottom-left vs bottom-right vs top-right).

**Dialogs (WAI-ARIA APG)** — [APG Modal Dialog Pattern [visited]](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- Tab/Shift+Tab cycle within the dialog; Escape closes; focus moves inside on open.
- Initial focus: usually first focusable; for long/structured content focus a static element at the top (`tabindex="-1"` title); for irreversible actions focus the **least destructive** button; for info dialogs focus the likely action (OK/Continue).
- On close return focus to the invoker (or a logical alternative if it's gone, e.g. first new row after "Add rows").
- Always include a visible close control in tab order. `role="dialog"`, `aria-modal="true"` only when the background truly is blocked and visually obscured; label via `aria-labelledby` (or `aria-label`); `aria-describedby` optional, omit for structured content. `alertdialog` for brief, urgent confirmations (irreversible actions).

### Inferences
- Apple HIG *(prior knowledge, not re-verified)*: prefers sheets over alerts for tasks; alerts only for critical info with ≤ 3 buttons, destructive action styled red and not default; sheets have detents (medium/large) and a grabber; progress indicators: determinate when quantifiable, keep moving so the app never looks frozen; don't use toasts (iOS has no native toast — HUD-style transient confirmations only).
- Material 3 *(prior knowledge, not re-verified)*: snackbars appear at the bottom, one at a time, 4–10 s, at most one text action, no icons in standard snackbar; on mobile they sit above FABs/bottom nav; M3 Expressive (2025) adds wavy progress and shape-morphing loading indicator (corroborated by Flutter ports in Q2).
- Synthesis: map severity → component: *transient success* → toast; *action-needed but non-blocking* → inline alert/banner; *blocking/irreversible* → alertdialog; *system-wide/persistent* → top banner; *errors in forms* → inline, never toast-only.

### Gaps
- Apple HIG and Material 3 pages are JS-rendered and were not successfully extracted; their specific numbers are unverified in this session.
- No NN/g toast-specific article surfaced in search.

---

## Q4. What native-HTML-first approaches are available in 2026 that replace JS libraries? (with browser support)

### Takeaway
By late 2026 a library-free overlay stack is realistic: `<dialog>` + `showModal()` (top layer, inert background, Esc) + **invoker commands** (`command`/`commandfor`, Baseline since Safari 26.2, Dec 2025) + **Popover API** + **CSS anchor positioning** (Baseline Newly available since Firefox 147, Jan 2026) + `@starting-style`/`transition-behavior: allow-discrete` (Baseline 2024) for enter/exit animation. Still Chromium-led/not Baseline: `popover="hint"`, `interestfor` (interest invokers) and `<dialog closedby>` (no Safari) — ship these with feature detection/polyfills.

### Cited Findings
**Support status (as found)**
- **Invoker commands** (`commandfor` + `command`): Chrome/Edge 135 (Apr 2025), Firefox 144 (14 Oct 2025), Safari 26.2 (12 Dec 2025) → Baseline across all majors — [Paweł Grzybek [search]](https://pawelgrzybek.com/more-invoker-commands-and-more-reasons-not-to-use-javascript-please); [InfoQ, Jan 2026 [search]](https://www.infoq.com/news/2026/01/html-invoker-commands). Built-in commands: `show-modal`, `close`, `request-close`, `toggle-popover`, `show-popover`, `hide-popover`; custom commands must start with `--` ([InfoQ](https://www.infoq.com/news/2026/01/html-invoker-commands)); only `<button>` can be an invoker ([OpenReplay [search]](https://blog.openreplay.com/invoker-commands-api-guide/)); the `command` event does not bubble — listen on the target ([DEV [search]](https://dev.to/grimicorn/invoker-commands-wiring-buttons-to-dialogs-and-popovers-without-javascript-5agk)); unsupported browsers see a plain button. *(Note: `request-close` is from prior knowledge, not in the snippets.)*
- **CSS anchor positioning:** Chrome/Edge 125 (May 2024); Firefox 147 (Jan 2026) made it "Baseline Newly available" — [web.dev, New to the web platform in January 2026 [visited]](https://web.dev/blog/web-platform-01-2026). Safari version conflicts across sources (Safari 26 per one timeline; "18.2 core / 18.4 fallbacks" per another blog) — [Refonte Learning [search]](https://www.refontelearning.com/blog/css-anchor-positioning-reaches-baseline), [Syncfusion [search]](https://www.syncfusion.com/blogs/post/css-anchor-positioning). The web.dev page's own badges were inconsistent with its text. State of CSS 2026 ranked anchor positioning top among features developers want but avoid due to support gaps — [State of CSS 2026 [search]](https://2026.stateofcss.com/).
- Same web.dev Jan 2026 post: Navigation API Baseline Newly available (Firefox 147; Safari 26.2); View Transition types in Firefox 147 (same-document only) — [web.dev [visited]](https://web.dev/blog/web-platform-01-2026).
- **`@starting-style`:** Baseline 2024 (Newly available since Aug 2024) — [MDN @starting-style [visited]](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style). Must be declared **after** the `:popover-open` rule (same specificity); `display` and `overlay` must be in the transition list with `allow-discrete` so exit animations play and top-layer removal is deferred; `::backdrop` needs its own standalone `@starting-style` block (nesting not supported for pseudo-elements) — [MDN [visited]](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style).
- **`popover="hint"`:** landed in Chrome 133 (Jan 2025); opening a hint doesn't close other open (auto) popovers — [Una Kravets, "What is popover=hint?" [search]](https://www.una.im/popover-hint).
- **Interest invokers (`interestfor`)**: Chromium Intent to Ship, Sept 2025, fires `InterestEvent` on the target — [blink-dev [search]](https://groups.google.com/a/chromium.org/g/blink-dev/c/bX1G_yDt6W4). Chrome's guide still prescribes a conditional polyfill (`interestfor` npm package), i.e. not cross-browser — [Chrome for Developers, interest-triggered tooltips [visited]](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interest-triggered-tooltips).
- From the same Chrome guide [visited]: trigger is an **implicit anchor** (no `anchor-name` needed): `[popover]{ position-area: top; position-try-fallbacks: flip-block; margin: unset; }`; delays via `interest-delay-start` / `interest-delay-end` (e.g. 0.2s / 0.1s); pseudo-classes `:interest-source` / `:interest-target`; **don't add `role="tooltip"`/`aria-describedby` manually** — `popover="hint"` targets get an implicit `tooltip` role and the association switches to `aria-details` if the target contains interactive content; WCAG 1.4.13 (dismissible via Esc, hoverable, persistent) still applies; `@oddbird/popover-polyfill` does **not** polyfill hint behaviour; `@oddbird/css-anchor-positioning` polyfill doesn't support implicit anchors or `position-area` on popovers. Feature detections: `HTMLButtonElement.prototype.hasOwnProperty("interestForElement")`, `"popover" in HTMLElement.prototype`, `"anchorName" in document.documentElement.style`.
- **`<dialog closedby>`** (`any` | `closerequest` | `none` — light-dismiss control): Chrome/Edge 134, Firefox 141 (Jul 2025); **Safari not supported** (webkit.org/b/284592, vendor position "support"); not Baseline — [web-features explorer [search]](https://web-platform-dx.github.io/web-features-explorer/features/dialog-closedby); Chrome guide [search](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/platform-controls-dismiss-dialog). ⚠ The npm `dialog-closedby-polyfill` appeared in Socket's "Shai-Hulud" compromised-packages analysis — [Socket [search]](https://socket.dev/npm/package/dialog-closedby-polyfill); audit before installing.

### Inferences
**Support matrix (combine cited + prior knowledge; verify on caniuse/webstatus.dev before shipping)**

| Feature | Status Nov 2026 | Notes |
|---|---|---|
| `<dialog>`, `showModal()`, `::backdrop`, top layer | Baseline widely *(prior knowledge, since 2022)* | Replaces focus-trap libs for modals; background is inert automatically |
| `inert` attribute | Baseline *(prior knowledge, 2023)* | For custom non-dialog overlays / side panels |
| Popover API (`popover`, `popovertarget`) | Baseline *(prior knowledge, 2024)* | `auto` = light-dismiss + Esc, `manual` = you control |
| `popover="hint"` | Chromium 133+; others unverified | Gap |
| Invoker commands | **Baseline (Dec 2025)** | cited |
| `interestfor` | Chromium; polyfill elsewhere | cited |
| CSS anchor positioning | **Baseline newly (Jan 2026)** | cited, Safari version conflicting |
| `@starting-style`, `transition-behavior` | **Baseline 2024** | cited |
| `dialog closedby` | Chrome 134, Firefox 141, **no Safari** | cited |
| `@property` (animate custom props, e.g. progress rings) | Baseline *(prior knowledge, 2024)* | |
| `interpolate-size: allow-keywords` / `calc-size()` | Chromium-only *(prior knowledge)* | progressive enhancement for height:auto animation |
| View Transitions (same-document) | Chrome, Safari 18+, Firefox 147 *(cited for Firefox types)* | toast/dialog morphs |
| `env(safe-area-inset-*)`, `dvh/svh/lvh` | Baseline *(prior knowledge)* | bottom sheets, toasts on iOS |
| `interactive-widget=resizes-content` viewport meta | Chromium/Firefox; not Safari *(prior knowledge)* | keyboard + sheets |

- Outdated techniques to flag: hand-rolled focus traps + `aria-hidden` sibling toggling (replaced by `showModal()`/`inert`); Popper.js v2 (superseded by Floating UI and now CSS anchors); JS `setTimeout` mount tricks for enter animations (replaced by `@starting-style`); `body{position:fixed}` scroll-lock hacks (prefer `overflow:hidden` on `html` + `scrollbar-gutter: stable`, or `overscroll-behavior: contain` in sheets); `title=""` tooltips (not keyboard/touch accessible); GIF spinners; `100vh` on mobile (use `dvh`).

### Gaps
- Exact Safari/Firefox status of `popover="hint"` and `interestfor` in Nov 2026 not confirmed (third-party tool site claims a Chrome 142 command-based variant; unverified and conflicts with Chrome's own guide).
- Interop 2026 focus areas not fetched.

---

## Q5. Component-by-component build reference (objective: the 10 components)

### Takeaway
Each component below has: purpose/when to use, named variant catalogue, crafted-vs-generic markers, desktop vs mobile, accessibility, and native-first snippets. Facts are cited where sourced; variant catalogues and snippets are researcher synthesis built on the cited primitives (Q1–Q4).

### Cited Findings
- Sonner stacking/swipe/timer details and Vaul drag/easing/keyboard details — [toast [visited]](https://emilkowal.ski/ui/building-a-toast-component), [drawer [visited]](https://emilkowal.ski/ui/building-a-drawer-component)
- Sonner mobile offset switches to 16px below 600px; desktop offset 32px; gap 14; 3 visible toasts; Alt+T hotkey — [Sonner docs [visited]](https://sonner.emilkowal.ski/toaster)
- APG dialog focus rules — [APG [visited]](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- Tooltip native pattern + WCAG 1.4.13 — [Chrome guide [visited]](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interest-triggered-tooltips)
- Popover/backdrop animation recipe — [MDN @starting-style [visited]](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- Loading-time thresholds & skeleton types — [NN/g [visited]](https://www.nngroup.com/articles/skeleton-screens/)
- Empty-state roles — [NN/g [visited]](https://www.nngroup.com/articles/empty-state-interface-design/)
- Modal appropriateness — [NN/g [visited]](https://www.nngroup.com/articles/modal-nonmodal-dialog/)
- 600+ single-element loader families — [css-loaders.com [visited]](https://css-loaders.com/)

### Inferences

#### 1. Modals / dialogs (centered, fullscreen, side sheet, mobile bottom sheet)
**When:** only for the NN/g-justified cases (critical warning, missing info, wizard step, single profiling question). Otherwise use inline disclosure, nonmodal panel, or a page.

**Variants (rebuildable):**
1. *Centered confirm (alertdialog)* — 400–480px, title + one sentence + two buttons; destructive button right-aligned, red, **not** autofocused (focus Cancel per APG).
2. *Command palette* — top-third anchored (≈ 15vh from top), search input autofocused, results list with `aria-activedescendant`; opens with ⌘K; backdrop blur 4–8px.
3. *Fullscreen takeover* — `width:100dvw;height:100dvh;max-*:none`, slides up 24px + fades; sticky header with close and title; used for editors/media.
4. *Side sheet / drawer (desktop)* — right edge, 400–560px, full height, slides `translateX(100%)→0`; nonmodal variant (no backdrop, `show()` instead of `showModal()`) for inspector panels.
5. *Bottom sheet with drag (mobile)* — Vaul-style: grabber pill 36×5px, rounded top 16–24px, snap points (e.g. 40%, 90%), velocity flick close, background scale (page scales to ~0.94 with rounded corners).
6. *Morphing dialog* — button expands into the dialog via View Transitions (`view-transition-name` shared between trigger and dialog surface).
7. *Lightbox/media viewer* — black 90% backdrop, image `object-fit:contain`, swipe between, pinch-zoom; close on backdrop tap.
8. *Stacked/nested sheets* — second sheet pushes first back (scale 0.95, translateY −10px), iOS card stack.
9. *Inline-expanding "popover dialog"* — anchored to trigger (anchor positioning) with `popover="auto"` for lightweight forms (rename, share).
10. *Wizard modal* — stepper header + fixed-height body + sticky footer; progress shown (NN/g).
11. *Responsive hybrid* — centered on ≥640px, bottom sheet below (same `<dialog>`, media-query styles).

**Crafted vs generic:** crafted = enter from the trigger's direction, exit faster than enter (e.g. 200ms vs 300ms), iOS easing `cubic-bezier(.32,.72,0,1)`, backdrop fades independently, no layout shift when scrollbar disappears (`scrollbar-gutter: stable`), focus lands deliberately (APG rules), Esc/backdrop/swipe all close, sticky footer actions on long content, content scrolls inside with `overscroll-behavior: contain`. Generic/"slop" = fade-in centered box for everything, giant X only, purple gradient header, backdrop not dismissible, body scroll leaks, focus lost to `<body>` on close, newsletter modal on page load.

**Desktop vs mobile:** desktop → centered or side sheet; mobile → bottom sheet or fullscreen (NN/g notes nonmodal desktop dialogs may become fullscreen modals on mobile). Mobile sheets need `padding-bottom: max(16px, env(safe-area-inset-bottom))`, `max-height: 90dvh`, keyboard handling via `visualViewport` (Vaul), and drag disabled unless scroll is at top.

**A11y:** `showModal()` gives top layer, inert background, Esc → `cancel` event. Label with `aria-labelledby`. Use `role="alertdialog"` for destructive confirms. Return focus to invoker (native `<dialog>` does this automatically in modern engines *(prior knowledge)*). Respect `prefers-reduced-motion` (crossfade only).

**Snippet — native modal with invoker commands, animation, scroll lock, light dismiss:**
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
**Snippet — bottom-sheet drag (Vaul-inspired, pointer events):**
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
(0.11 velocity threshold borrowed from Sonner's tuned value; 0.2 damping and 35% distance are illustrative.)

#### 2. Toasts / snackbars / notifications
**When:** transient, low-severity confirmations ("Saved", "Link copied", undo). Errors that need action → inline or banner (Deliveroo, LogRocket). Never the only carrier of critical info.

**Variants:**
1. *Sonner stack* — collapsed depth stack (−14px / 0.95 per level), expands on hover, 3 visible.
2. *Promise toast* — single toast morphs loading → success/error (icon crossfade, width animates).
3. *Undo snackbar* — bottom-center, one action ("Undo"), countdown bar along the bottom edge, pause on hover.
4. *Dynamic-island pill* — top-center black pill that expands from a dot into a capsule with icon + text (spring), collapses back.
5. *Rich notification card* — avatar, title, body, timestamp, inline Reply/View; inbox-style for apps.
6. *Progress toast* — upload with determinate bar and cancel, becomes success toast.
7. *Inline anchored toast* — appears next to the triggering button (anchor positioning) e.g. "Copied!" bubble; vanishes after 1.5s.
8. *Edge ribbon* — full-width thin bar at top, used for connectivity ("You're offline" / "Back online").
9. *Toast with countdown ring* — circular conic-gradient ring around close icon showing remaining time.
10. *Swipe-stack mobile* — top-of-screen like iOS notifications, swipe up to dismiss, stacked.
11. *Terminal/log toasts* — monospace, for dev tools, stacking upward with timestamps.
12. *Haptic-feel spring toast* — overshoot scale 0.9→1.02→1 (use `linear()` easing for springs).

**Crafted vs generic:** crafted = interruptible transitions, consistent heights in stack, pause on hover and hidden tab, swipe with friction + momentum, gap-bridging hover area, keyboard hotkey to reach region (Alt+T / F8), richColors used sparingly, icon + concise verb-first copy, undo instead of "Are you sure?". Generic = top-right coloured boxes with drop shadow and slide-in keyframes, stacking pushing each other abruptly, 3-second timeout on error messages, no way to reach with keyboard, emoji-laden copy.

**Desktop vs mobile:** desktop bottom-right (Sonner default) or bottom-center; offset 32px. Mobile <600px: offset 16px (Sonner), full-width minus gutters, top-center or bottom-center above bottom nav/FAB; add `env(safe-area-inset-bottom/top)`; swipe direction matches position (down for bottom, up for top).

**A11y:** persistent live region present in DOM *before* messages are injected: `role="status"` (`aria-live="polite"`) for success/info, `role="alert"` (assertive) only for urgent errors; region labelled (`aria-label="Notifications"`); don't move focus to toasts; actions must also be reachable another way or toast must not auto-dismiss while focused/hovered (WCAG 2.2.1 timing); give ≥ 5s for text + action toasts; reduced motion → fade only.

**Snippet — native toaster that sits above modals (top layer via popover=manual):**
```html
<section id="toaster" popover="manual" aria-label="Notifications (Alt+T)">
  <ol role="status" aria-live="polite" class="toasts"></ol>
</section>
```
```css
#toaster { inset: auto 32px 32px auto; margin:0; padding:0; border:0; background:none; overflow:visible; }
@media (max-width: 600px){ #toaster{ inset: auto 16px max(16px, env(safe-area-inset-bottom)) 16px; } }
.toast { position:absolute; right:0; bottom:0; width:356px; max-width:100%;
  --i: 0; translate: 0 calc(var(--i) * -14px); scale: calc(1 - var(--i) * .05);
  opacity: calc(var(--i) < 3); transition: translate .4s, scale .4s, opacity .4s; }
@starting-style { .toast { translate: 0 100%; opacity: 0; } }
.toasts:hover .toast { translate: 0 calc(var(--offset) * -1); scale: 1; }
@media (prefers-reduced-motion: reduce){ .toast{ transition: opacity .2s; translate:none; } }
```
```js
const tl = document.getElementById('toaster'); tl.showPopover();
// re-call tl.hidePopover(); tl.showPopover(); after a dialog opens so the toaster is re-stacked above it
function toast(msg, {duration=4000}={}) {
  const li = Object.assign(document.createElement('li'), {className:'toast', textContent: msg});
  const list = tl.querySelector('ol'); list.prepend(li);
  [...list.children].forEach((t,i)=> t.style.setProperty('--i', i));
  let left = duration, start = Date.now(), timer;
  const run = () => { start = Date.now(); timer = setTimeout(() => li.remove(), left); };
  const pause = () => { clearTimeout(timer); left -= Date.now() - start; };
  li.addEventListener('pointerenter', pause); li.addEventListener('pointerleave', run);
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : run()); // Sonner
  run();
}
document.addEventListener('keydown', e => { if (e.altKey && e.code === 'KeyT') tl.querySelector('.toast')?.focus(); });
```

#### 3. Tooltips & popovers
**When:** tooltip = short, non-essential label/description on hover/focus (icon buttons, truncated text). Popover = interactive, click-triggered content (menus, pickers, mini-forms, info cards). Never hide essential info in tooltips; touch users can't hover.

**Variants:**
1. *Label tooltip* — dark 12–13px pill, 6px offset, 150–200ms delay, no arrow or tiny 6px arrow.
2. *Keyboard-hint tooltip* — label + `<kbd>` chips ("Bold ⌘B").
3. *Rich hover card* — profile/link preview card (avatar, bio, stats) opened via interest after ~500ms; interactive → `aria-details`.
4. *Delay-group tooltips* — once one is open, neighbours open instantly (toolbar scrubbing).
5. *Follow-cursor tooltip* — for charts/heatmaps; positioned with pointer coords.
6. *Inline definition popover* — dotted-underlined term opens glossary card.
7. *Dropdown menu popover* — `popover="auto"` + anchor; roving focus, arrow keys.
8. *Toggletip* — "i" button click to show/hide; announced via live region (works on touch).
9. *Coach-mark / onboarding spotlight* — popover with step counter + backdrop cut-out (`box-shadow: 0 0 0 9999px rgb(0 0 0/.5)` around target).
10. *Color/emoji/date picker popover* with flip fallbacks.
11. *Arrowed speech-bubble* with `clip-path` tail that flips with `position-try`.
12. *Long-press mobile popover / context menu* — replaces hover on touch.

**Crafted vs generic:** crafted = origin-aware scale (transform-origin toward anchor), 100–150ms in / instant out, delay groups, viewport-aware flipping, consistent offset, hoverable (WCAG 1.4.13), Esc dismiss. Generic = native `title`, tooltip on disabled buttons (unreachable), tooltips duplicating visible labels, flicker when moving to tooltip.

**Desktop vs mobile:** desktop hover/focus; mobile → toggletip on tap, long-press menu, or a bottom sheet for big popovers.

**A11y:** native `popover="hint"` + `interestfor` gives implicit tooltip role and description wiring (Chrome guide); polyfill hover behaviour elsewhere; popovers with `popover="auto"` provide Esc + light dismiss; menus still need APG menu-button keyboard handling.

**Snippet (native-first):**
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

#### 4. Alerts & banners (incl. cookie consent)
**When:** alert = contextual, inline message tied to a region (form, card); banner = page/system-wide persistent message (outage, trial ending, consent). Errors → alert/banner rather than toast.

**Variants:** (1) *Inline callout* with left 3–4px accent bar + icon + title + body; (2) *Subtle tinted* (tone-on-tone background, no border); (3) *Outlined with icon chip*; (4) *Top system banner* full-width, dismissible, pushes content (not overlay); (5) *Sticky announcement bar* with marquee/rotating messages (pause on hover, reduced-motion static); (6) *Countdown/trial banner* with progress; (7) *Form error summary* at top listing anchor links to fields; (8) *Offline/reconnecting bar* with live status; (9) *Cookie consent — bottom bar* (equal-weight Accept / Reject / Customize); (10) *Cookie consent — corner card* (bottom-left 360px card, non-blocking); (11) *Cookie preferences dialog* with category toggles (necessary locked on); (12) *Playful consent* (illustrated cookie, but same equal-weight buttons); (13) *Inline "banner in card"* for feature announcements with dismiss-forever.

**Crafted vs generic:** crafted = severity semantics consistent (colour + icon + word, never colour alone), concise action-oriented copy, banner reserves its height (no CLS), dismissal remembered, dark-mode-tuned tints. Generic = four rainbow alert boxes, all-caps "ERROR!", cookie walls with giant "Accept all" and buried "Reject" (dark pattern and, in the EU, regulatory risk *(prior knowledge)*).

**Desktop vs mobile:** banners stack under header on mobile, max 2 lines + "More"; cookie consent on mobile as bottom card with `env(safe-area-inset-bottom)`, never covering the whole viewport on first load.

**A11y:** `role="alert"` only for messages injected in response to an event that need immediate attention; static page banners are just a labelled `<section aria-label="Announcement">` / `role="region"`; dynamic status → `role="status"`. Cookie banner: non-modal region, reachable early in tab order, buttons with explicit labels; preference dialog uses `<dialog>`.

#### 5. Loaders & spinners
**When:** per NN/g — nothing <1s; spinner for a single module <10s; >10s needs determinate progress with an estimate.

**Variants** (css-loaders.com families as vocabulary): classic ring with gap; conic-gradient sweep; three-dot bounce/typing indicator; bars equalizer; morphing polygon (M3 Expressive style); infinity/lemniscate path; orbiting dots; pulsing blob (`border-radius` keyframes); squishy square; 3D flipping cube; hourglass/time; "hungry" pac-man; wavy line; brand-logo stroke-draw (SVG `stroke-dashoffset`); text shimmer ("Thinking…" gradient sweep across text); skeleton-to-content morph; button inline spinner replacing label (width locked).

**Crafted vs generic:** crafted = loader matches brand geometry, uses `currentColor` so it inherits context, single element/mask-based, delayed appearance (~300–500ms) to avoid flashes, min display time (~500ms) to avoid flicker, inline in the button that triggered it. Generic = generic blue ring centered on a white page, GIF spinners, full-page blocking overlays for module loads.

**A11y:** wrap in `role="status"` with visually hidden "Loading…"; set `aria-busy="true"` on the updating region; `prefers-reduced-motion` → slow it down drastically or switch to a static/opacity pulse (don't remove all feedback).

**Snippet — single-element conic spinner + reduced motion:**
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

#### 6. Skeleton screens & shimmer
**When:** full-page/list loads 1–10s (NN/g). Mirror real layout; avoid frame-only skeletons.

**Variants:** (1) static grey blocks; (2) linear shimmer sweep; (3) **synchronized shimmer** across all blocks (`background-attachment: fixed` so one wave passes over the whole page); (4) pulse (opacity 1→.5); (5) wave-from-top staggered rows (`animation-delay: calc(var(--i)*80ms)`); (6) blurred low-quality image placeholder (LQIP/BlurHash/ThumbHash) for media; (7) dominant-colour placeholder; (8) content-aware text skeleton (line widths 100/92/60%); (9) progressive skeleton (header real, body skeleton — streaming SSR); (10) skeleton-to-content crossfade (no layout jump); (11) tinted brand skeleton (blocks tinted with brand hue at 6–8% alpha, works in dark mode).

**Crafted vs generic:** crafted = exact dimensions of final content (zero CLS), rounded to match final radii, subtle shimmer (≤ 8% contrast), 1.5–2s cycle, shown only after ~300ms. Generic = three equal grey bars for everything, high-contrast shimmer, skeleton that doesn't match final layout, skeleton for a 200ms request.

**A11y:** container `aria-busy="true"`, skeleton blocks `aria-hidden="true"`, one `role="status"` "Loading articles"; reduced motion → static.

**Snippet:**
```css
.sk { --base: color-mix(in oklab, CanvasText 7%, Canvas); --hi: color-mix(in oklab, CanvasText 13%, Canvas);
  background: linear-gradient(100deg, var(--base) 40%, var(--hi) 50%, var(--base) 60%) var(--base);
  background-size: 200vw 100%; background-attachment: fixed; /* synced wave */
  border-radius: 8px; animation: shimmer 1.6s linear infinite; }
@keyframes shimmer { from { background-position: 100vw 0 } to { background-position: -100vw 0 } }
@media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
```

#### 7. Progress bars / steppers / rings
**When:** determinate when measurable (uploads, onboarding completion); >10s operations need a progress bar + time estimate (NN/g). Steppers for multi-step flows (NN/g wizard guidance).

**Variants:** (1) thin top-of-page route bar (NProgress-style, 2–3px, trickle easing); (2) segmented bar (stories-style, Instagram); (3) gradient/striped animated bar; (4) wavy linear bar (M3 Expressive); (5) determinate ring with `@property` animated conic-gradient; (6) wavy ring; (7) gauge/semi-circle meter (use `<meter>` for values-in-range, not progress); (8) stepper horizontal with connectors filling; (9) vertical timeline stepper (mobile); (10) dot stepper (carousel/onboarding); (11) "x of y" compact stepper for mobile headers; (12) progress-in-button (button background fills as upload proceeds); (13) scroll-progress bar via scroll-driven animations (`animation-timeline: scroll()`).

**Crafted vs generic:** crafted = eased value changes (never jumps backward), stop indicator/track gap (M3), honest estimates, label with percentage in `tabular-nums`, completion micro-celebration (check morph). Generic = bar that sits at 99%, fake linear progress unrelated to work, steppers with 9 tiny labels on mobile.

**A11y:** use `<progress value max>` (implicit `progressbar` role) with a label; indeterminate = `<progress>` without value; ring: `role="progressbar" aria-valuenow aria-valuemin aria-valuemax aria-label`; steppers: `<ol>` with `aria-current="step"` on current item and visually hidden "Completed" on done steps.

**Snippet — ring with @property:**
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

#### 8. Badges, chips, tags & pills
**Definitions:** badge = non-interactive status/count indicator; chip = interactive (filter, input/removable, suggestion, assist); tag = categorisation label (may link); pill = shape.

**Variants:** (1) notification dot (8px, ring cut-out against avatar/icon); (2) count badge with `99+` cap, `tabular-nums`, scale-pop on increment; (3) status badge with leading dot (Live/Draft/Failed); (4) soft-tinted tone badges (bg 12% / text 80% of hue, OKLCH); (5) outline badge; (6) "New" shimmer badge (subtle animated gradient); (7) filter chips (toggle, check icon slides in, `aria-pressed`); (8) input chips in a tokenized text field (backspace removes last); (9) suggestion chips (horizontally scrolling on mobile, scroll-snap); (10) avatar chip (person + remove); (11) colour-coded tag with hashing for consistent label colours; (12) keyboard `<kbd>` pills; (13) gradient-border premium badge (`border-image`/mask); (14) dismissible tag with `×` that grows hit area to 24px+.

**Crafted vs generic:** crafted = optical vertical centering (cap-height aware, `text-box: trim-both cap alphabetic` where supported *(prior knowledge, Chromium/Safari)*), consistent radii scale, contrast-checked tints in light/dark, count animations, touch targets ≥ 24×24 (WCAG 2.5.8). Generic = saturated rainbow pills, badges used as buttons, 10px illegible text.

**A11y:** count badges need text alternative ("3 unread notifications") on the parent control; status not by colour alone; filter chips `<button aria-pressed>`; removable chip: `<button aria-label="Remove tag: Design">`; chip groups can use `role="group"` with label.

#### 9. Empty states, error pages & 404
**When:** first-use (no data yet), user-cleared (inbox zero), no results (search/filter), error (failed load / permissions / offline), and 404/500 pages.

**Variants:** (1) illustrated first-use with primary CTA + "learn more" (NN/g pathway); (2) demo-data/sample template offer (Loggly pattern); (3) "pull revelation" micro-hint inside an empty panel (DataDog star example); (4) celebratory inbox-zero (subtle confetti/illustration, no CTA needed); (5) no-results with query echo, spelling suggestion, "clear filters" button; (6) ghost/preview empty state (faded example cards showing what will appear); (7) error state with retry + status details expandable; (8) offline state with queued-action count; (9) permission-denied with "request access" path; (10) 404 search-first (search box + popular links); (11) 404 interactive scene/mini-game; (12) 404 kinetic typography; (13) brand-story 404 (Marvel user-art gallery, Netflix Lost in Space); (14) terminal/glitch 404 for developer brands; (15) 500 page with status-page link and incident ID.

**Crafted vs generic:** crafted = specific copy explaining *why* it's empty and *what to do*, one clear CTA, illustration in brand style and sized modestly, distinguishes "loading" from "empty" (NN/g anti-pattern), 404 keeps full site nav and returns correct HTTP 404 status. Generic = stock "Oops! Nothing here" + sad-face, blank panels, "No records" flash during loading, 404 without navigation or search.

**Desktop vs mobile:** illustration ≤ 160px on mobile, CTA full-width thumb-reachable; desktop center within the panel (not the viewport).

**A11y:** decorative illustration `alt=""`/`aria-hidden`; heading announces the state; after filtering to zero results announce via `role="status"` ("No results for 'xyz'"); interactive 404 games must not trap keyboard and must honour reduced motion.

#### 10. Avatars, avatar groups & presence
**Variants:** (1) image avatar with initials fallback (colour hashed from user id, OKLCH fixed L/C, varying hue); (2) squircle avatars (`border-radius` 30% or SVG superellipse mask) for orgs/bots vs circles for people; (3) overlapping group with **mask cut-out ring** instead of white border (works on any background); (4) group with "+5" overflow chip opening a popover list; (5) hover-spread group (avatars fan out on hover); (6) presence dot (online green, away amber ring, busy red with bar, offline hollow) cut out of the avatar; (7) live/streaming ring (animated gradient ring, Instagram stories); (8) typing/speaking indicator ring pulsing with audio level; (9) status emoji badge (Slack); (10) stacked facepile in comments with "and 12 others"; (11) editable avatar with camera overlay on hover; (12) skeleton avatar shimmer; (13) multiplayer cursors/avatars in header (Figma-like) with "follow" on click.

**Crafted vs generic:** crafted = mask-based cut-outs, consistent size scale (20/24/32/40/56/80), image `object-fit: cover` with subtle inner 1px stroke (`box-shadow: inset 0 0 0 1px rgb(0 0 0/.08)`), deterministic fallback colours, presence not colour-only (shape differs). Generic = white-border stacks that break on dark backgrounds, random colours on each render, pixelated images.

**A11y:** avatar `alt` = person's name when it's the only identifier, `alt=""` when name is adjacent; presence conveyed in text ("Ana, online"); group overflow button labelled "Show 5 more people".

**Snippet — overlapping group with cut-out ring and presence:**
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

### Gaps
- Variant catalogues and snippets above are researcher synthesis; specific named CodePens/Dribbble shots per variant were not verified in this session.
- WCAG references (1.4.13, 2.2.1, 2.5.8) and GDPR consent-banner equal-weight requirement are from prior knowledge, not fetched.
- `text-box-trim`, `interpolate-size`, `@property` and View Transition support levels are prior knowledge; confirm on caniuse.
- Inspiration URLs not visited (verify before citing in final report): https://vaul.emilkowal.ski, https://github.com/emilkowalski/sonner, https://www.radix-ui.com/primitives/docs/components/toast, https://floating-ui.com, https://react-hot-toast.com, https://carlosroso.com/notyf/, https://cssloaders.github.io, https://uiverse.io/loaders, https://loading.io/css/, https://mobbin.com, https://www.pageflows.com, https://tympanus.net/codrops/, https://codepen.io/tag/404.
