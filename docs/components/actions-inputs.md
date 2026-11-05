# Action and Input Components (11–20)

This file is the build reference for everything a visitor clicks, types into or chooses with: buttons, links, text inputs, forms and wizards, checkboxes/radios/switches, selects and comboboxes, sliders/steppers/ratings, search, date/time pickers and file upload. In late 2026 most animated libraries are button-heavy and input-light. Their shared creative vocabulary is shimmer and shine sweeps, travelling border beams, magnetic pull, text scramble and marquee labels, ripple, neubrutalism and neumorphism, 3D press, and metal, texture and "halo" surfaces. Inputs come mostly from Aceternity ("vanish" placeholder, gooey search, grid file-drop) and Cult UI's "Halo" form-control family. Accessible, production-grade input sets come from coss ui (Origin UI's successor, built on Base UI) and shadcn/ui. Form UX research (Baymard, NN/g, Smashing, GOV.UK, W3C WAI, web.dev) agrees on persistent visible labels, late validation with early error clearing, positive validation, stepwise flows with progress in `<title>` and `<h1>`, and correct input types/`inputmode`/`autocomplete`.

**Verification markers used in this file (carried over from the research notes):**
- Facts with an inline link are **cited** from pages visited in the research.
- **Variant recipes, states, crafted/generic rules and all code snippets are the researcher's synthesis** built on the cited techniques. They are not sourced facts. The snippets were authored for the notes and **have not been run in browsers**; each is flagged "> ⚠ Untested reference snippet".
- **(unverified)** marks claims the research could not confirm this session; **(search only)** marks facts seen only in search results; **(third-party)** marks secondary sources.

Related docs: [components index](README.md) · [navigation and structure (1–10)](navigation-structure.md) · [content display (21–30)](content-display.md) · [feedback and overlays (31–40)](feedback-overlays.md) · [component libraries](component-libraries.md).

## Contents

- [Shared foundations for actions and inputs](#shared-foundations-for-actions-and-inputs) (platform support, headless library choice, creative source catalogue, crafted vs slop rules, form UX consensus, outdated techniques)
- [11. Buttons](#11-buttons)
- [12. Links and text-link styles](#12-links-and-text-link-styles)
- [13. Text inputs and textareas](#13-text-inputs-and-textareas)
- [14. Forms and multi-step wizards](#14-forms-and-multi-step-wizards)
- [15. Checkboxes, radios and toggle switches](#15-checkboxes-radios-and-toggle-switches)
- [16. Selects, dropdowns, comboboxes and multiselect](#16-selects-dropdowns-comboboxes-and-multiselect)
- [17. Sliders, steppers and ratings](#17-sliders-steppers-and-ratings)
- [18. Search bars](#18-search-bars)
- [19. Date and time pickers](#19-date-and-time-pickers)
- [20. File upload and drop zones](#20-file-upload-and-drop-zones)
- [Research gaps](#research-gaps)
- [Sources](#sources)

---

## Shared foundations for actions and inputs

### Platform feature support (November 2026)

| Status | Features |
|---|---|
| Safe now | `:has()` (Baseline widely available), `:user-invalid`/`:user-valid` (widely available since Nov 2023), `accent-color` (about 97% global, though only partial until Safari 26.2), `inputmode`, popover (about 94%), `command`/`commandfor` invokers (about 87%) |
| Newly Baseline (June 2026) | `field-sizing: content` |
| Progressive enhancement only | Customizable `<select>` (`appearance: base-select`): Chrome/Edge 135+ and Safari 27, **no Firefox**, about 74% global. CSS anchor positioning: full only in Safari 27, partial in Chromium and Firefox. SVG filters in `backdrop-filter`: Chromium only. |

Details (all cited):
- **`field-sizing`** ([caniuse](https://caniuse.com/mdn-css_properties_field-sizing); [web.dev June 2026 Baseline digest](https://web.dev/blog/baseline-digest-jun-2026)): Chrome/Edge 123+, Firefox 152+, Safari/iOS 26.2+; about 87.9% global. Became **Baseline Newly available in June 2026**. The same digest moved `:has()`, `&` nesting, `<easing-function>` (incl. `linear()`), CSS `mask`, `:dir()` and `cap` units to **Widely available**.
- **`:user-invalid`** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid)): matches an `:invalid`, `:out-of-range` or blank-but-required element only after the user has interacted with it or tried to submit. Baseline widely available (since Nov 2023). Counterpart: `:user-valid`.
- **`accent-color`** ([caniuse](https://caniuse.com/mdn-css_properties_accent-color)): full support Chrome/Edge 93+, Firefox 92+, Safari/iOS 26.2+. Partial: Safari 15.4–26.1, Chrome Android 157, Samsung 17–31. About 97.2% global including partial.
- **`appearance`** ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/appearance)): values `none` (primitive look, native behaviour kept), `auto`, `base-select`, `textfield`, `menulist-button`. Avoid legacy prefixed values. The spec's `base` value is unsupported everywhere.
- **Customizable select**: see [16](#16-selects-dropdowns-comboboxes-and-multiselect).
- **Popover** ([caniuse](https://caniuse.com/mdn-api_htmlelement_popover)): Chrome 114+, Firefox 125+, Safari 17+, iOS full from 18.3; about 94% global.
- **Invoker commands** (`command`/`commandfor`) ([caniuse](https://caniuse.com/mdn-html_elements_button_command)): Chrome 135+, Firefox 144+, Safari 26.2+; about 87% global.
- **Anchor positioning** ([caniuse](https://caniuse.com/css-anchor-positioning)): Chromium partial from 125, Firefox partial from 147, Safari full from 27 (partial 26.x); about 88% global (85.2% full).
- **`inputmode`** ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode)): values `none`, `text`, `decimal`, `numeric`, `tel`, `search`, `email`, `url`. Affects only the keyboard, not validation. Baseline widely available since Dec 2021.
- **Liquid glass**: `backdrop-filter: url(#svgFilter)` is Chromium-only ([LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)).
- Feature-detect everything in the progressive-enhancement row (synthesis): `@supports (appearance: base-select)`, `@supports (field-sizing: content)`, `@supports (anchor-name: --a)`.
- Not re-verified this session: `@property`, `color-mix()`, `lh` units, `:focus-visible` (believed Baseline but uncited); caniuse data for `interestfor` (interest invokers) and `popover="hint"` could not be retrieved.

### Headless / accessible library choice

As of November 2026, **Base UI** (MUI; v1 stable, and the **default primitive layer in shadcn/ui since July 2026**) and **React Aria** (Adobe) are the strongest React choices for form controls. Base UI adds Combobox, Autocomplete and Number Field, which Radix never shipped. React Aria leads on i18n and date/time. Ark UI covers React, Solid, Vue and Svelte.

- **Base UI**: 1.0 stable with about 35 accessible unstyled components ([lavx.hu](https://news.lavx.hu/article/mui-releases-base-ui-1-with-35-accessible-components)). Package renamed from `@base-ui-components/react` to `@base-ui/react`; maintained by MUI with core contributors from Radix and Floating UI ([InfoQ, Feb 2026](https://infoq.com/news/2026/02/baseui-v1-accessible/)). Release-date reports conflict: Dec 2025 ([issoh.co.jp](https://www.issoh.co.jp/tech/details/10350/)) vs InfoQ's Feb 2026 coverage. MUI later shipped v1.1 ([mui.com/blog/2026-and-beyond](https://mui.com/blog/2026-and-beyond/)).
- **shadcn/ui**: July 2026, "Base UI is now the default library for new projects." `npx shadcn init` picks it; Radix stays supported via `shadcn init -b radix`. `asChild` becomes `render`; migration is optional ([changelog 2026-07](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)). The Radix-or-Base-UI choice arrived with `npx shadcn create` in Dec 2025, with full Base UI docs in Jan 2026 ([changelog 2026-01](https://ui.shadcn.com/docs/changelog/2026-01-base-ui)). A third-party blog says Base UI covers Combobox, Autocomplete, Number Field, Toast and Preview Card, which Radix never shipped ([hextaui](https://hextaui.com/blog/shadcn-base-ui-vs-radix)) (third-party; consistent with the coss ui list).
- **React Aria** ([react-aria.adobe.com](https://react-aria.adobe.com/), site moved there): press handling with "dragging off to cancel a press, long pressing to select"; DatePicker built from DateInput/DateSegment (segmented typing) plus Popover, Dialog and Calendar; Calendar with `visibleDuration`; Slider exposes a `data-dragging` state; ComboBox has entry and exit animation states; translations in 30+ languages, 13 calendar systems, 5 numbering systems, RTL, built-in form validation.
- **Ark UI** ([ark-ui.com](https://ark-ui.com/)): headless, 45+ components, React/Solid/Vue/Svelte, built on state machines.
- **coss ui** (Origin UI's successor): originui.com now 301-redirects to [coss.com/ui](https://coss.com/ui), "a new, modern UI component library built on top of Base UI." Form components: Input, Textarea, Field, Fieldset, Form, Label, Input Group, Checkbox, Checkbox Group, Radio Group, Switch, Select, Combobox, Autocomplete, Slider, Number Field (increment/decrement buttons and a scrub area), OTP Field, Calendar (range and multi-select), Date Picker (Calendar + Popover), Toggle, Toggle Group, Segmented Control, Command, and Composer (a chat input that grows). No file-upload component was seen listed.
- **Stack picks by project type (synthesis):** React marketing or app site → shadcn/ui on Base UI for most controls, React Aria for date/time and anything i18n-heavy. Vue, Svelte or Solid → Ark UI. Framework-free → native elements plus `appearance: base-select`, popover/`commandfor` and Cally.
- **Treat the Cult UI "Halo" families and Aceternity's inputs as style references, not accessible primitives** (synthesis). Rebuild their looks on top of Base UI, React Aria or Radix primitives.
- Not visited: Headless UI (Tailwind Labs), Melt UI, Bits UI docs (Bits UI and Melt UI are known Svelte options, unverified this session). Ark UI's DatePicker, FileUpload, RatingGroup, PinInput and TagsInput are unverified this session.

### Creative source catalogue (buttons and inputs)

- **Hover.dev** ([buttons](https://www.hover.dev/components/buttons)): Neu Follow, Wet Paint, Marquee ("Start your journey! •" scrolling ticker), Encrypt (label text scramble), Dot Expand, Load ("Click Me and Wait"), Hamburger, Magnet (circular button with text around the circle, pulled toward the cursor), Dotted, Gradient Shadow, Splash, Spotlight (light spot follows the cursor), Rounded Slide, Neumorphism, Shiny, Draw Outline, Neubrutalism, AI Button. Free ones are React + Tailwind + Motion. The page names but does not describe most of them, so animation descriptions are inferred from names. Also has categories for Inputs, Toggles, Links, Calendars, Dropdown Menus and Forms/Sign-in sections.
- **Aceternity UI** ([components](https://ui.aceternity.com/components)): Buttons: **Magnetic Button** (drifts toward the cursor and springs back), **Moving Border** (animated border travels around the container), **Hover Border Gradient** (gradient border spreads on hover), **Stateful Button** (loading on click, then success), a set of Tailwind CSS buttons. Inputs: **Placeholders and Vanish Input** (cycling placeholders; text "vanishes" on submit), **Gooey Input** (expands with an SVG gooey filter and shared-layout animation; effectively an expanding search), **File Upload** (background grid, drag-and-drop, micro-interactions), **Signup Form** (shadcn input and label with Framer Motion).
- **Magic UI** ([components](https://magicui.design/docs/components)): Rainbow Button, Shimmer Button, Ripple Button; community Shiny Button, Interactive Hover Button, Pulsating Button. Border effects that suit buttons and inputs: Border Beam, Shine Border, Glare Hover, Animated Theme Toggler, Cool Mode (particle burst on click), Confetti. No input or form category.
- **Animata** ([docs](https://animata.design/docs)): 13 buttons: AI Button, Algolia Blue/White, Animated Follow, Duolingo (3D chunky press), Get started, Ripple, Shining, Slide Arrow, Status, Swipe, Toggle Switch, Work Button. FAB: Flower Menu, Speed Dial. Link text effects: Underline hover text, Double Underline, Text Border Animation, Swap Text, Text Flip. Tabs: Fluid, Gooey, Shift. No input or form category.
- **Cult UI** ([docs](https://www.cult-ui.com/docs)): Buttons: Texture, Bg Animate, Border Beam, Neumorph, Metal (new), Cosmic, Organic (irregular shape, new), Halo (new), Copy. Form controls: new "Halo" family (Halo Input, Halo Field, Halo Select, Halo Switch, Halo Segmented, Halo Toggle Group, Halo Search, Halo Dropzone), plus Border Beam Input, Color Picker, Popover Form, Prompt Composer, Dynamic Island.
- **Codrops "Magnetic Buttons"**: by Manoela Ilic, 5 Aug 2020, inspired by Cuberto's button animation; buttons follow the pointer and have hover animations. Repo github.com/codrops/MagneticButtons (MIT), demo tympanus.net/Development/MagneticButtons/ ([Codrops search result](https://tympanus.net/codrops/2020/08/05/magnetic-buttons); article body returned 403). Codrops' hub lists newer GSAP magnetic/hover work, e.g. "Dynamic Tweens", Apr 3 2026 ([tag/magnetic](https://tympanus.net/codrops/hub/tag/magnetic/)).
- **21st.dev** community magnetic button: [21st.dev/bundui/magnetic-button](https://21st.dev/bundui/magnetic-button) (search only).
- Uiverse, Untitled UI, Dribbble, Mobbin: not verified; cite only as inspiration sources by name.

### Global crafted vs slop rules (apply to every component in this file)

Synthesis.
- **Generic / slop markers:** default Tailwind indigo-500 or purple-to-blue gradients; `rounded-lg` on everything; a uniform `transition-all 300ms ease`; glow shadows on every button; a shimmer on every CTA; placeholder-as-label; missing focus-visible, disabled and error states; spinner-only loading that collapses the button's width; emoji icons; identical motion for hover and press. The shared library vocabulary (shimmer, border beam, spotlight, magnetic, ripple, 3D press, text scramble, marquee label, slide-arrow, neubrutalism, neumorphism, metal/texture, organic blob) is itself the 2026 "template" look: build on it but don't copy it whole.
- **Crafted markers:**
  - **One signature effect** per site, used only on the primary CTA.
  - A deliberate radius scale (e.g. 2 px brutalist, or full pill), consistent across inputs and buttons.
  - Asymmetric timing: fast press (30–80 ms), slower release (250–600 ms) with overshoot (`cubic-bezier(.3,.7,.4,1.5)` or `linear()` springs), as in Comeau's numbers.
  - Optical details: tabular numbers in steppers and sliders; `text-box: trim-both cap alphabetic` for vertical centering (used in the MDN select example).
  - Brand-specific focus rings, e.g. 2 px offset ring in the accent colour plus an inner 1 px surface ring.
  - Every state designed: default, hover (pointer only, `@media (hover:hover)`), focus-visible, active/pressed, disabled (or `aria-disabled` with an explanation), loading (width locked), error, success.
  - `prefers-reduced-motion` respected.
  - `forced-colors` respected: `CanvasText`/`Highlight` system colours, borders kept instead of relying on backgrounds.

### Form UX consensus

Baymard, NN/g, Smashing and GOV.UK agree on five points:
1. Labels are persistent, visible and above the field. No placeholder-as-label. Floating labels only with caution.
2. Validate late (on blur) by default, but clear errors as the user types ("reward early, punish late"). Validate fixed-length fields when complete. Flag empty required fields only on submit.
3. Show positive validation.
4. One question per page or logical steps, with progress in both the `<title>` and the `<h1>`.
5. Right input types, `inputmode` and `autocomplete` values. Never auto-advance focus; accept every unambiguous format.

Touch targets: at least 44×44 px (W3C), about 48 px on Apple ([web.dev](https://web.dev/articles/sign-in-form-best-practices)).

### Outdated techniques to flag

Synthesis.
- JS select-replacement libraries for purely visual reasons → `base-select` with fallback.
- `pattern="[0-9]*"` for numeric keyboards → `inputmode`.
- `type="number"` for codes, cards or IDs.
- Placeholder-as-label.
- Blanket `outline:none` → `:focus-visible`.
- JS textarea auto-grow when `field-sizing` is available.
- `:invalid` styling on page load → `:user-invalid`.
- Prefixed `-webkit-appearance` values other than `none`.
- The names `selectmenu`/`selectlist`.

---

## 11. Buttons

**What & when.**
- Buttons perform actions; links navigate.
- One primary per view. Secondary for alternatives. Ghost/tertiary for low emphasis.
- Icon buttons need `aria-label`.
- FAB for the single main action on mobile.
- Split button when there is a default action plus variants.

**Variants** (recipes are synthesis; Comeau and LogRocket specs are cited)

| # | Variant | Rebuildable spec |
|---|---|---|
| 1 | **Primary solid** | Accent fill, 600-weight label, 44–48 px height. Hover darkens about 6% via `color-mix(in oklab, var(--accent), black 8%)`. Active `scale(.97)` in 60 ms. |
| 2 | **Secondary / outline** | 1.5 px border in ink. Hover fills to 6% tint. |
| 3 | **Ghost** | No border; hover reveals a pill background; underline variant for text-style. |
| 4 | **Icon button** | Square 44 px hit area even if the glyph is 20 px; tooltip on hover/focus (popover or `interestfor` where supported). |
| 5 | **FAB / speed dial** | 56 px circle bottom-right with `env(safe-area-inset-bottom)` padding. Expands into a radial or vertical speed dial (Animata "Flower Menu"/"Speed Dial"). Hide on scroll-down, show on scroll-up. |
| 6 | **Split button** | `role="group"` holding a main button and a chevron button (`aria-haspopup="menu" aria-expanded`), which opens a menu via `popovertarget` positioned with anchor positioning. Shared outer radius, 1 px divider. |
| 7 | **Magnetic** | Pulls 25–40% of the pointer offset within a radius. The label moves extra (parallax); elastic return about 500 ms. Fine pointers only. |
| 8 | **Gradient-border / border-beam** | `padding-box` plus `border-box` backgrounds, conic gradient rotated via `@property --angle`. Animation plays only on hover or focus. |
| 9 | **Spotlight** | Radial gradient follows `--mx`/`--my` set from pointermove. |
| 10 | **3D pressable** | Comeau's three layers (shadow, edge, front) at −4, −6 (hover) and −2 (active) px. Duolingo-style variant: `box-shadow: 0 4px 0 darker` and `translateY(4px)` on active. |
| 11 | **Neubrutalist** | 2.5 px solid #000 border, `box-shadow: 4px 4px 0 #000`, flat saturated fill, mono or grotesk uppercase. Hover `translate(-2px,-2px)` with shadow growing to 6 px. Active `translate(4px,4px)` with shadow at 0. |
| 12 | **Liquid / gooey** | SVG `feGaussianBlur` + `feColorMatrix` "goo" filter on blobs that merge on hover. Liquid-glass uses an SVG displacement filter in `backdrop-filter`, Chromium only, fallback `backdrop-filter: blur(12px) saturate(160%)` and a translucent fill. |
| 13 | **Text-scramble / encrypt** | Characters cycle through glyphs for about 400 ms on hover. Keep `aria-label` set to the real text so screen readers aren't spammed. |
| 14 | **Marquee label** | Label duplicates and scrolls on hover; stops under reduced motion. |
| 15 | **Stateful (idle → loading → success → idle)** | Fix width by stacking labels in one grid cell (`display:grid`, every child `grid-area:1/1`). Swap to a spinner, then a checkmark drawn via `stroke-dashoffset`. `aria-disabled="true"` during loading (focus stays), plus a polite live region: "Saving…" then "Saved". |
| 16 | **Hold-to-confirm** (destructive) | Fill progresses over about 1.2 s while pressed. Pressing Enter needs an alternative confirm. |
| 17 | **Metal / texture / noise** | Layered `linear-gradient` with an SVG noise `background-image` at 6–10% opacity and an inset highlight `box-shadow: inset 0 1px 0 rgb(255 255 255/.4)`. |

**Cited spec: Josh W. Comeau, 3D pushable button** ([joshwcomeau.com](https://www.joshwcomeau.com/animation/3d-button/)):
- Three layers: shadow, edge, front.
- At rest the front sits at `translateY(-4px)`. Hover lifts to `-6px` with overshoot `cubic-bezier(.3,.7,.4,1.5)` over **250ms**. `:active` drops to `-2px` in **34ms**. Release returns over **600ms** with `cubic-bezier(.3,.7,.4,1)`.
- Edge uses a horizontal gradient darker at the ends. Hover adds `filter: brightness(110%)`.
- Focus rule: `.pushable:focus:not(:focus-visible){outline:none}`.
- Recommends `-webkit-tap-highlight-color: transparent` and `user-select: none`.
- Notes that `linear()` can now approximate springs.

**Cited spec: liquid-glass buttons (Apple "Liquid Glass" trend)** ([LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)):
- Layers: a filter layer with `backdrop-filter: url(#filter) brightness(150%)`, then a content layer with a translucent background.
- SVG filter chain: `feGaussianBlur` → `feImage` (displacement PNG) → `feDisplacementMap` (scale ≈ 55, R/G channels) → saturate `feColorMatrix` → specular `feImage` rim composited and blended.
- **Only Chromium supports SVG filters inside `backdrop-filter`; Safari and Firefox don't**, so a fallback is needed.
- GPU-heavy: keep it to a few floating CTAs or toolbars. Each button size needs its own maps.
- Other tutorials: [Tuts+](https://webdesign.tutsplus.com/liquid-glass-effect-svg-filters--cms-109200t); a [Freefrontend demo](https://freefrontend.com/code/liquid-glass-effect-2026-02-05/) notes `backdrop-filter: blur(0)` is used to create the stacking context.

**States.**
- Disabled: avoid the native `disabled` attribute on submit buttons when users need to know why; web.dev advises not disabling the button while input is incomplete.
- Focus-visible ring: 2 px plus 2 px offset.
- Loading: `aria-busy` on the region, not only on the button.

**Crafted vs generic.** See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file). For buttons specifically: one signature effect only on the primary CTA; asymmetric press/release timing; width locked during loading; hover and press motion distinct.

**Desktop vs mobile.**
- No hover on touch: make the active state visible.
- Set `-webkit-tap-highlight-color: transparent` only if you provide your own `:active` style.
- Targets at least 44 px with at least 8 px gaps.
- Primary CTA in the thumb zone; it may be sticky at the bottom with the safe-area inset.
- Magnetic, spotlight and similar pointer effects only on `(hover:hover) and (pointer:fine)`.

**Accessibility.**
- Native `<button type="button">` for actions; icon buttons need `aria-label`.
- Text-scramble/marquee labels keep the real text in `aria-label`.
- Stateful buttons: `aria-disabled="true"` while loading (focus stays) plus a polite live region.
- web.dev ([sign-in best practices](https://web.dev/articles/sign-in-form-best-practices)): show-password is a `type="button"` with an updated `aria-label`; use specific button text ("Sign in", not "Submit"); disable submit after the first click to prevent duplicates, but don't disable it while input is incomplete.
- Hold-to-confirm needs a keyboard alternative.

**Code**

Magnetic button:

> ⚠ Untested reference snippet (authored for the notes, not run in browsers).

```html
<button class="magnetic" type="button"><span class="magnetic__label">Start a project</span></button>
<style>
.magnetic{--x:0px;--y:0px;padding:1rem 1.75rem;border-radius:999px;border:0;background:var(--ink,#111);color:var(--paper,#fff);
  transform:translate(var(--x),var(--y));transition:transform .55s cubic-bezier(.2,.9,.25,1.2)}
.magnetic__label{display:inline-block;transform:translate(calc(var(--x)*.4),calc(var(--y)*.4));transition:inherit}
.magnetic.is-near{transition-duration:.15s}
.magnetic:focus-visible{outline:2px solid var(--accent,#ff5a1f);outline-offset:3px}
@media (prefers-reduced-motion:reduce){.magnetic,.magnetic__label{transform:none}}
</style>
<script>
if (matchMedia('(hover:hover) and (pointer:fine)').matches &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    const strength = 0.3, radius = 70;
    const set = (x, y) => { btn.style.setProperty('--x', x + 'px'); btn.style.setProperty('--y', y + 'px'); };
    addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) < Math.max(r.width, r.height) / 2 + radius) {
        btn.classList.add('is-near'); set(dx * strength, dy * strength);
      } else if (btn.classList.contains('is-near')) { btn.classList.remove('is-near'); set(0, 0); }
    }, { passive: true });
  });
}
</script>
```

Note: `getBoundingClientRect` includes the current transform, so the pull is slightly self-reinforcing. Keep `strength` at or below 0.35, or measure a non-transformed wrapper.

Rotating gradient border (CSS only):

> ⚠ Untested reference snippet.

```css
@property --angle{syntax:'<angle>';inherits:false;initial-value:0deg}
.btn-beam{--bg:#0b0b0f;color:#fff;border:2px solid transparent;border-radius:999px;padding:.9rem 1.6rem;
  background:linear-gradient(var(--bg),var(--bg)) padding-box,
             conic-gradient(from var(--angle),#ff5a1f,#ffd23f,#3ddc97,#4cc9f0,#ff5a1f) border-box;
  animation:beam 3s linear infinite paused}
.btn-beam:is(:hover,:focus-visible){animation-play-state:running}
@keyframes beam{to{--angle:360deg}}
@media (prefers-reduced-motion:reduce){.btn-beam{animation:none}}
```

Neubrutalist:

> ⚠ Untested reference snippet.

```css
.btn-brutal{font:700 1rem/1 "Space Grotesk",system-ui;text-transform:uppercase;letter-spacing:.04em;
  padding:.9rem 1.4rem;background:#ffd23f;color:#000;border:2.5px solid #000;border-radius:4px;
  box-shadow:4px 4px 0 #000;transition:transform .12s,box-shadow .12s}
@media (hover:hover){.btn-brutal:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #000}}
.btn-brutal:active{transform:translate(4px,4px);box-shadow:0 0 0 #000;transition-duration:.04s}
.btn-brutal:focus-visible{outline:3px solid #000;outline-offset:4px}
```

**Libraries & tools.** Hover.dev, Aceternity (Magnetic Button, Moving Border, Hover Border Gradient, Stateful Button), Magic UI (Rainbow, Shimmer, Ripple, Shiny, Interactive Hover, Pulsating; Border Beam, Shine Border, Glare Hover, Cool Mode, Confetti), Animata (13 buttons; FAB Flower Menu, Speed Dial), Cult UI (Texture, Bg Animate, Border Beam, Neumorph, Metal, Cosmic, Organic, Halo, Copy), Codrops MagneticButtons (MIT). Full descriptions in [creative source catalogue](#creative-source-catalogue-buttons-and-inputs).

**Inspiration links.**
- [hover.dev/components/buttons](https://www.hover.dev/components/buttons)
- [ui.aceternity.com/components](https://ui.aceternity.com/components)
- [magicui.design/docs/components](https://magicui.design/docs/components)
- [animata.design/docs](https://animata.design/docs)
- [cult-ui.com/docs](https://www.cult-ui.com/docs)
- [joshwcomeau.com/animation/3d-button](https://www.joshwcomeau.com/animation/3d-button/)
- [Codrops Magnetic Buttons](https://tympanus.net/codrops/2020/08/05/magnetic-buttons)
- [LogRocket liquid glass](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/)
- [21st.dev bundui magnetic button](https://21st.dev/bundui/magnetic-button) (search only)

**Caveats & verification status.** Hover.dev, Magic UI, Animata and Cult UI list most components by name only, so their exact visual and motion specs are inferred from names unless stated. Codrops article body returned 403. No award-site case studies (Awwwards/FWA) for named button implementations were visited. Liquid glass is Chromium-only.

---

## 12. Links and text-link styles

**What & when.**
- Links navigate. Keep the native underline in body copy for accessibility; no colour-only links.
- In navigation, animated underlines are fine.
- External links get an icon and a visually hidden "(opens in new tab)".

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Offset-shift underline** | Thickness 1 px → 2 px and offset .15em → .3em. |
| 2 | **Fade-in underline** | `text-decoration-color: transparent` → `currentColor`. |
| 3 | **Grow from left** | `::after` with `scaleX(0→1)` and `transform-origin: left`. On leave, switch the origin to right so it exits rightward. |
| 4 | **Multi-line highlighter** | `background: linear-gradient(currentColor 0 0) 0 100%/0 2px no-repeat`, growing to `100% 2px`. Works on wrapped text; needs `display:inline`. |
| 5 | **Marker highlight** | Background-size grows to `100% 40%` behind the text in a semi-transparent accent. |
| 6 | **Double underline** | Animata. |
| 7 | **Wavy underline on hover** | `text-decoration-style: wavy`. |
| 8 | **Arrow nudge** | Trailing `→` moves 3 px on hover. |
| 9 | **Text swap / roll** | Label rolls up to reveal a duplicate (Animata "Swap Text"/"Roll text"). Duplicate text needs `aria-hidden`. |
| 10 | **Skip-ink-aware thick underline** | Brand colour, `text-decoration-skip-ink: auto`. |

**Crafted vs generic.** Crafted: underline animation via `text-decoration-*` properties rather than pseudo-element hacks where possible; underline kept in body copy. Generic: colour-only links. See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.** Hover effects only under `@media (hover:hover)`; on touch, the resting underline must already be clear.

**Accessibility.** Native underline in body copy; no colour-only links; visually hidden "(opens in new tab)" on external links; `aria-hidden` on duplicate roll text; animate on `:focus-visible` as well as `:hover`.

**Code**

> ⚠ Untested reference snippet.

```css
.link{color:inherit;text-decoration-line:underline;text-decoration-thickness:1px;
  text-underline-offset:.18em;text-decoration-color:color-mix(in oklab,currentColor 40%,transparent);
  transition:text-underline-offset .2s,text-decoration-thickness .2s,text-decoration-color .2s}
.link:is(:hover,:focus-visible){text-underline-offset:.32em;text-decoration-thickness:2px;text-decoration-color:var(--accent)}
/* multi-line grow */
.link-grow{text-decoration:none;background:linear-gradient(var(--accent) 0 0) left 100%/0 2px no-repeat;transition:background-size .35s cubic-bezier(.2,.8,.2,1)}
.link-grow:is(:hover,:focus-visible){background-size:100% 2px}
```

Thickness is declared separately because Safari ignores it in the shorthand ([search summary](https://css-tricks.com/?p=295935)). If offset transitions misbehave in a browser, use the `@property --offset` approach ([css-irl](https://css-irl.info/animating-underlines/)).

**Libraries & tools.** Animata link text effects: Underline hover text, Double Underline, Text Border Animation, Swap Text, Text Flip ([animata.design/docs](https://animata.design/docs)). Hover.dev "Links" category ([hover.dev](https://www.hover.dev/components/buttons)).

**Inspiration links.** [css-irl.info animating underlines](https://css-irl.info/animating-underlines/); [CSS-Tricks (search summary)](https://css-tricks.com/?p=295935).

**Caveats & verification status.** Underline animation techniques: transition `text-decoration-color` (from transparent), `text-underline-offset` and `text-decoration-thickness`. The older css-irl article says only Firefox transitioned `text-underline-offset` and suggests an `@property --offset` workaround for Chromium; newer guides say all three properties are animatable. **These sources conflict, so test.** Safari ignores thickness inside the `text-decoration` shorthand, so declare it separately.

---

## 13. Text inputs and textareas

**What & when.**
- One input per piece of data.
- Size the width to the expected length (postcode short, email long).
- Textarea for multi-line text.

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Classic top-label, bordered** (recommended default) | 48 px height, 1.5 px border, radius 8 px. Focus: accent border plus a 3 px outer ring at 25% accent. |
| 2 | **Filled / tonal** | Subtle tinted background with a 2 px bottom border that animates `scaleX` from the centre on focus. |
| 3 | **Underline-only editorial** | Large serif, 0 radius. |
| 4 | **Floating label** | With the caveats below. |
| 5 | **Inset label** ("label inside box, always small") | Label sits permanently small at the top inside the field. It doesn't move, so most float-label motion problems disappear. |
| 6 | **Input group with addons** | Prefix (`https://`, currency) and suffix (unit, clear button, show-password). See coss ui Input Group. |
| 7 | **Character-count textarea** | Counter turns amber at 90%, announced politely only at thresholds. |
| 8 | **Auto-grow textarea / composer** | `field-sizing: content`, min 3 lines, max about 12 lines (coss/Cult "Composer"). |
| 9 | **OTP / PIN field** | N boxes visually, ideally one real `<input autocomplete="one-time-code" inputmode="numeric" maxlength="6">` styled with letter-spacing or overlay boxes, so paste and autofill work. |
| 10 | **Password with strength meter and show toggle** | Baymard/web.dev. |
| 11 | **Masked or formatted** (card, phone) | Format on blur or with caret-safe formatting, accept pasted spaces and dashes, run a live Luhn check. |
| 12 | **Border-beam / halo input** | Animated focus glow (Cult UI). Single hero input only. |
| 13 | **"Vanish" input** | Cycling placeholder examples, particles on submit (Aceternity). Still needs a real label. |

**States.**
- default, hover (border darkens), focus-visible (ring), filled, disabled (dashed border plus muted text), read-only (no border, selectable).
- error: `:user-invalid` or `[aria-invalid=true]` → danger border, an icon and a message below, linked with `aria-describedby`.
- success: check icon (optional, positive validation).
- loading: async check (e.g. username availability) with an inline spinner in the suffix.

**Crafted vs generic.**
- Research on labels (cited):
  - NN/g: placeholders-as-labels strain memory, hinder checking and fixing errors, look like prefilled defaults, have poor contrast and are sometimes not announced. "The best solution is clear, visible labels that are placed outside empty form fields." Floating labels are better than label-as-placeholder but worse than an outside label; filled fields are less noticeable, and assistive technology may not read them reliably ([NN/g](https://www.nngroup.com/articles/form-design-placeholders/)).
  - Baymard (mobile): inline labels caused "severe flow and typing issues"; users deleted their input to see the label again. Floating labels are untested, and early adopters often had no error state ([Baymard](https://baymard.com/blog/mobile-forms-avoid-inline-labels)).
  - Adam Silver: float labels have small, low-contrast text; look like answers; crop long labels; animate (motion-sensitivity issue; can float off-screen when zoomed); don't work for checkboxes, radios or selects; leave no room for hints; push errors below the field where the keyboard or autocomplete covers them; don't actually save space. Recommends a static label above ([adamsilver.io](https://adamsilver.io/articles/float-labels-are-problematic/)).
  - Smashing: its own tests found floating labels "aren't a particularly great idea" ([Smashing](https://smashingmagazine.com/2021/02/material-design-text-fields)).
- **Floating labels are a compromise, not best practice** (synthesis). If the brand demands one: label stays at least 12–13 px with full contrast when floated; visible error state and a hint below the field; `prefers-reduced-motion` support; field tall enough that long labels never crop. Default recommendation: static top label.
- Sizing and styling (web.dev, cited): about 15 px input padding on mobile and 10 px on desktop; a finger-width gap between fields; mobile font about 20 px; input border `#ccc` or darker; style invalid fields with `:not(:placeholder-shown):invalid`.

**Desktop vs mobile.**
- Font size at least 16 px. The common rule is that iOS Safari zooms smaller fields on focus (**uncited this session**).
- Correct `type`, `inputmode`, `autocomplete` and `enterkeyhint`; e.g. `autocomplete="email"`, `"tel"`, `"postal-code"`, `"cc-number"`, `"one-time-code"`, `"street-address"`.
- `autocapitalize="none"` and `spellcheck="false"` for emails and usernames.
- web.dev: `type="email"` + `autocomplete="username"`; `current-password` vs `new-password`; `inputmode="numeric"` for PINs. Don't use `type="number"` for IDs or account numbers.

**Accessibility.**
- `<label for>`; hint and error via `aria-describedby`; `aria-invalid`.
- Mark required fields with text, not colour alone.
- Error summary on submit.
- Sync `aria-invalid` from JS on blur and submit too: CSS state isn't exposed to assistive technology, and `display:none` text referenced by `aria-describedby` is still read in many screen readers, so show and hide it carefully or set it via JS.

**Code**

Floating label plus `:user-invalid`:

> ⚠ Untested reference snippet.

```html
<div class="ff">
  <input id="email" name="email" type="email" autocomplete="email" placeholder=" " required aria-describedby="email-err">
  <label for="email">Email address</label>
  <p id="email-err" class="ff__err">Enter an email address like name@example.com</p>
</div>
<style>
.ff{position:relative;margin-block:1rem}
.ff input{inline-size:100%;font-size:1rem;padding:1.45rem .9rem .45rem;border:1.5px solid #8a8a8a;border-radius:.6rem;background:#fff}
.ff label{position:absolute;inset-inline-start:.9rem;top:.95rem;color:#555;pointer-events:none;
  transform-origin:0 0;transition:transform .16s ease,color .16s}
.ff input:focus + label,.ff input:not(:placeholder-shown) + label{transform:translateY(-.55rem) scale(.8);color:#111}
.ff input:focus-visible{outline:3px solid color-mix(in oklab,var(--accent,#2b59ff) 35%,transparent);border-color:var(--accent,#2b59ff)}
.ff__err{display:none;color:#b3261e;font-size:.875rem;margin:.35rem 0 0}
.ff input:user-invalid{border-color:#b3261e}
.ff:has(input:user-invalid) .ff__err{display:block}
@media (prefers-reduced-motion:reduce){.ff label{transition:none}}
</style>
```

Auto-grow textarea:

> ⚠ Untested reference snippet.

```css
textarea.grow{field-sizing:content;min-block-size:3lh;max-block-size:12lh;resize:none}
@supports not (field-sizing:content){textarea.grow{min-block-size:6rem;resize:vertical}}
```

**Libraries & tools.** coss ui Input, Textarea, Field, Input Group, OTP Field, Composer ([coss.com/ui](https://coss.com/ui)); Cult UI Halo Input, Halo Field, Border Beam Input, Prompt Composer ([cult-ui.com](https://www.cult-ui.com/docs)); Aceternity Placeholders and Vanish Input, Signup Form ([Aceternity](https://ui.aceternity.com/components)); Hover.dev Inputs category.

**Inspiration links.** [NN/g placeholders](https://www.nngroup.com/articles/form-design-placeholders/) · [Adam Silver float labels](https://adamsilver.io/articles/float-labels-are-problematic/) · [web.dev sign-in form best practices](https://web.dev/articles/sign-in-form-best-practices).

**Caveats & verification status.** iOS zoom-under-16px rule is uncited. `lh` units and `color-mix()` not re-verified this session. `field-sizing` Baseline Newly available June 2026 (cited).

---

## 14. Forms and multi-step wizards

**What & when.**
- A single page for 7 fields or fewer.
- A wizard for long or branching flows (Visa suggests a wizard for 4+ steps: [design.visa.com](https://design.visa.com/patterns/wizard/usage/)); "one thing per page" (GOV.UK style) for complex public services.
- Use progress indicators only when the step count is known, and don't add or remove steps mid-flow ([Australian Gov DS](https://design-system.agriculture.gov.au/pr-preview/pr-1506/components/progress-indicator)). Use step indicators for linear forms without conditional logic ([Ontario DS](https://designsystem.ontario.ca/components/detail/step-indicator.html)).

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Single-column classic** | Labels top, full-width on mobile. |
| 2 | **Conversational / one question per screen** (Typeform style) | Huge type, Enter to advance, progress bar. Must still support Back and Tab. |
| 3 | **Stepper with numbered dots** | Horizontal on desktop; compact "Step 2 of 5" plus a progress bar on mobile. |
| 4 | **Vertical timeline sidebar** | Completed steps link back. |
| 5 | **Accordion checkout** | Each section collapses into a summary with an "Edit" link. |
| 6 | **Split-screen** | Form left, live preview or illustration right; good for signup. |
| 7 | **Bottom-sheet form on mobile** | Short contextual tasks. |
| 8 | **Review / summary page** before submit | GOV.UK "check your answers" style. |

**Validation timing (cited).**
- **Baymard** ([inline form validation](https://baymard.com/blog/inline-form-validation)): 31% of benchmarked e-commerce sites give no inline validation (the video says 32%, so the article is inconsistent). Avoid premature validation: Etsy flagged an empty field on focus, Hayneedle flagged a phone number mid-typing. Remove errors as soon as the input is fixed: REI clears the CVC error on the 3rd digit, while L.L. Bean's mismatch error lingered. Default to validating on blur. Validate fixed-length fields (ZIP, phone, card, CVC) once the length is reached. Re-check already-invalid fields on every keystroke. Give positive validation (checkmarks, green borders), a password strength meter and a match check. Wayfair's live Luhn check caught a transposed card number.
- **Smashing** ([live validation, 2022](https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/)): late validation "almost always performs better." Show severe errors immediately (e.g. letters in a digits-only field). Flag empty required fields only on submit. "Reward early, punish late": if a field shows an error, validate as the user types; if it was valid, wait for blur. Consider a "Validate" button for complex input such as VAT numbers. Always give a way out or override. Don't disable paste; accept any unambiguous format.
- **Mapping to CSS/JS (synthesis):** `:user-invalid` covers "validate after interaction"; JS blur and input handlers cover "reward early, punish late"; `aria-invalid` plus `aria-describedby` point to the error text; on submit, show an error summary at the top linking to each field (GOV.UK pattern) and move focus to it.

**Crafted vs generic.**
- Crafted (synthesis): steps animate with direction-aware slide (forward slides left, back slides right). Progress persists to storage. The heading receives focus on step change. Errors show both inline and as a summary. Fields preserve data on Back.
- Generic: a fake progress bar with unknown step counts; steps change without focus management.

**Desktop vs mobile.**
- Sticky bottom action bar (Back/Continue) with the safe-area inset.
- `enterkeyhint="next"` on intermediate fields and `"done"`/`"send"` on the last.
- Avoid side-by-side fields under about 480 px, except short pairs (MM/YY, CVC).
- Stepper: horizontal dots on desktop → "Step 2 of 5" + progress bar on mobile.

**Accessibility.**
- W3C WAI multi-page forms ([tutorial](https://www.w3.org/WAI/tutorials/forms/multi-page/)): progress first in `<title>` ("Step 2 of 4 – Shipping") and repeated in the `<h1>`. Use `<progress>` when the step count varies, but stop its animation (WCAG 2.2.2). Ordered step list with visually hidden "Completed:"/"Current:" text and links back to completed steps. Save current-step data when the user navigates back. Avoid time limits, or make them extendable.
- Ordered step list or `aria-current="step"`.
- `fieldset`/`legend` for groups.
- Native `<form>` with `novalidate` plus your own validation, error summary focused on submit.
- web.dev: disable submit after first click to prevent duplicates, not while input is incomplete.

**Code.** Editor's note: the notes contain no dedicated wizard snippet; reuse the floating-label/`:user-invalid` snippet in [13](#13-text-inputs-and-textareas) for field validation.

**Libraries & tools.** coss ui Form, Field, Fieldset ([coss.com/ui](https://coss.com/ui)); React Aria built-in form validation ([react-aria.adobe.com](https://react-aria.adobe.com/)); Cult UI Popover Form; Hover.dev Forms/Sign-in sections.

**Inspiration links.** [W3C WAI multi-page forms](https://www.w3.org/WAI/tutorials/forms/multi-page/) · [Visa wizard](https://design.visa.com/patterns/wizard/usage/) · [Ontario step indicator](https://designsystem.ontario.ca/components/detail/step-indicator.html) · [Australian Gov progress indicator](https://design-system.agriculture.gov.au/pr-preview/pr-1506/components/progress-indicator).

**Caveats & verification status.** No NN/g article on wizard progress indicators was found. No specific Vitaly Friedman 2025–26 form guide was fetched; his Smashing author page lists "A Complete Guide To Live Validation UX" and "Designing Birthday Picker UX" ([search result](https://mobile.smashingmagazine.com/author/vitaly-friedman)). Baymard's stepper research not fetched.

---

## 15. Checkboxes, radios and toggle switches

**What & when.**
- Checkbox: independent options, or a single consent; supports indeterminate.
- Radio: one of 2–7 options. Above 7, use a select or combobox.
- Switch: an immediate-effect setting (NN/g).
- Segmented control: 2–5 mutually exclusive views.
- NN/g toggle guidance ([toggle switch guidelines](https://www.nngroup.com/articles/toggle-switch-guidelines/)): toggles must take immediate effect; if a Save step is needed, use a checkbox or radios instead. Don't mix toggles into submit-based forms. Labels are short, keyword first, not questions, and describe the ON state. Use a high-contrast "on" colour and mind cultural colour meanings. If showing descriptors, Off goes left and On goes right.

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Native plus `accent-color`** | Quickest themed option. About 97% support; full in Safari only from 26.2. |
| 2 | **Custom `appearance:none` checkbox** | Tick drawn with `clip-path` or an SVG path, pop-in scale with overshoot. |
| 3 | **Animated stroke tick** | SVG path `stroke-dashoffset` from length to 0 over 250 ms. |
| 4 | **Card / tile selection** | Whole label is a card. `:has(input:checked)` sets accent border and tinted background with a corner check badge. Good for plan pickers. |
| 5 | **Pill chips** | Multi-select filters as toggle chips; checkbox stays inside for semantics. |
| 6 | **Radio as segmented control** | Sliding indicator behind the checked option. Anchor positioning, or CSS grid with `:has(:nth-child(n) input:checked)` to translate the thumb. |
| 7 | **iOS-style switch** | 44×26 px track; thumb slides with overshoot. |
| 8 | **Icon switch** | Sun/moon thumb for themes; icon morphs. |
| 9 | **Labelled-track switch** | Tiny "ON/OFF" text inside the track. Off on the left, per NN/g. |
| 10 | **Brutalist square switch** | Square thumb, hard shadow. |
| 11 | **Squishy thumb** | On `:active` the thumb widens (e.g. 1.2 rem → 1.5 rem) and shifts toward the travel direction (Apple-style). |
| 12 | **Indeterminate parent checkbox** | "Select all" with a dash glyph. |

**States.** unchecked, checked, indeterminate, hover (halo circle behind the control at 8% accent), focus-visible, active (halo grows), disabled, error (group-level message on the `fieldset`).

**Crafted vs generic.** Crafted: overshoot pop-in, squishy thumb, `:has()` card selection, `forced-colors` support. See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.**
- Make the whole row the tap target (a wrapping label, at least 44 px tall).
- Switches sit at the trailing end of setting rows.

**Accessibility.**
- Native inputs inside a `<label>`.
- Visually hide only with an `.sr-only` clip, never `display:none`.
- `role="switch"` on a checkbox for switches.
- Radios in a `fieldset`/`legend`; arrow keys come free natively.
- APG Switch ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)): `role="switch"`; Space toggles, Enter optionally. On a native checkbox use `checked`, not `aria-checked`. The label must not change with state. Group switches with `fieldset`/`legend` or `role="group"`. Switches have no mixed state; checkboxes can.

**Code**

Custom checkbox and `:has` card:

> ⚠ Untested reference snippet.

```css
.check{appearance:none;margin:0;inline-size:1.25rem;block-size:1.25rem;border:2px solid currentColor;border-radius:.35rem;
  display:inline-grid;place-content:center;background:Canvas;cursor:pointer;transition:background-color .15s,border-color .15s}
.check::before{content:"";inline-size:.75rem;block-size:.75rem;background:#fff;
  clip-path:polygon(14% 44%,0 65%,50% 100%,100% 16%,80% 0,43% 62%);transform:scale(0);
  transition:transform .18s cubic-bezier(.3,1.6,.6,1)}
.check:is(:checked,:indeterminate){background:var(--accent,#2b59ff);border-color:var(--accent,#2b59ff)}
.check:checked::before{transform:scale(1)}
.check:indeterminate::before{clip-path:inset(42% 8%);transform:scale(1)}
.check:focus-visible{outline:2px solid var(--accent,#2b59ff);outline-offset:2px}
.check:disabled{opacity:.45;cursor:not-allowed}
@media (forced-colors:active){.check{forced-color-adjust:none;border-color:CanvasText}
  .check:is(:checked,:indeterminate){background:Highlight}.check::before{background:HighlightText}}
/* Selectable card */
.option{display:flex;gap:.75rem;padding:1rem;border:1.5px solid #d0d0d0;border-radius:12px;cursor:pointer}
.option:has(input:checked){border-color:var(--accent);background:color-mix(in oklab,var(--accent) 8%,white)}
.option:has(input:focus-visible){outline:2px solid var(--accent);outline-offset:2px}
.option:has(input:disabled){opacity:.5;cursor:not-allowed}
```

Switch on a native checkbox:

> ⚠ Untested reference snippet.

```html
<label class="switch"><span>Email notifications</span><input type="checkbox" role="switch" checked></label>
<style>
.switch{display:flex;justify-content:space-between;align-items:center;gap:1rem;min-block-size:44px}
.switch input{appearance:none;margin:0;inline-size:2.75rem;block-size:1.625rem;border-radius:999px;background:#9a9a9a;
  position:relative;cursor:pointer;transition:background-color .2s}
.switch input::before{content:"";position:absolute;inset-block-start:.1875rem;inset-inline-start:.1875rem;
  inline-size:1.25rem;block-size:1.25rem;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgb(0 0 0/.35);
  transition:translate .28s cubic-bezier(.3,1.5,.6,1),inline-size .15s}
.switch input:checked{background:var(--accent,#1a7f4b)}
.switch input:checked::before{translate:1.125rem 0}
.switch input:active::before{inline-size:1.55rem}            /* squish */
.switch input:checked:active::before{translate:.825rem 0}
.switch input:focus-visible{outline:2px solid var(--accent,#1a7f4b);outline-offset:2px}
.switch input:dir(rtl):checked::before{translate:-1.125rem 0}
@media (prefers-reduced-motion:reduce){.switch input::before{transition:none}}
</style>
```

**Libraries & tools.** coss ui Checkbox, Checkbox Group, Radio Group, Switch, Toggle, Toggle Group, Segmented Control ([coss.com/ui](https://coss.com/ui)); Cult UI Halo Switch, Halo Segmented, Halo Toggle Group; Animata Toggle Switch; Magic UI Animated Theme Toggler; Hover.dev Toggles category.

**Inspiration links.** [NN/g toggle switch guidelines](https://www.nngroup.com/articles/toggle-switch-guidelines/) · [APG Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) · [caniuse accent-color](https://caniuse.com/mdn-css_properties_accent-color).

**Caveats & verification status.** `accent-color` full in Safari only from 26.2 (partial 15.4–26.1). `:dir()` support in older Safari unverified (`:dir` now Baseline widely available per [web.dev](https://web.dev/blog/baseline-digest-jun-2026)). See also segmented controls in [navigation-structure.md](navigation-structure.md#6-tabs-and-segmented-controls).

---

## 16. Selects, dropdowns, comboboxes and multiselect

**What & when.**
- Native select: 7–15 known options, and on mobile when you want the OS picker.
- Combobox/autocomplete: long lists, such as countries or users.
- Multiselect: tags/chips in a combobox, or a checkbox list in a popover.
- Menu (not select): actions.
- Command palette (⌘K): power-user navigation (see [navigation-structure.md 2g](navigation-structure.md#2g-command-palette-cmdctrlk)).

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Native select + custom chevron** | `appearance:none` plus background SVG; keeps the native mobile picker. |
| 2 | **Customizable select (`base-select`)** | Options with icons, avatars and descriptions; animated picker; `::checkmark` restyled. Falls back to native. |
| 3 | **Rich combobox** (Base UI/React Aria/coss) | Typeahead, highlighted match substring in bold, grouped headings, empty state with "Create '…'". |
| 4 | **Multiselect chips** | Selected values become removable chips in the field (Backspace removes the last); "+3 more" overflow. |
| 5 | **Country / phone picker** | Flag, dial code and search. |
| 6 | **Async combobox** | Debounced fetch, skeleton row while loading, error row with retry. |
| 7 | **Mega dropdown / listbox with descriptions** | Two-line options. |
| 8 | **Segmented "select"** | For 2–4 options. |
| 9 | **Bottom-sheet select on mobile** | For custom pickers. |
| 10 | **Command palette** | Dialog plus combobox with sections and keyboard hints (`<kbd>`). |

**States.**
- Trigger: closed, open (chevron rotates 180°), hover, focus-visible, disabled, error, loading.
- Options: highlighted (keyboard or hover), selected (check), disabled (muted, skipped by arrow keys).

**Customizable select facts (cited).**
- [caniuse](https://caniuse.com/customizable-select): Chrome/Edge 135+ (flagged 97–134), Safari/iOS 27, Firefox unsupported (through 162), Chrome Android 157; **74.23% global**. Formerly proposed as `<selectlist>`/`<selectmenu>`; **those names are obsolete**.
- [Chrome blog](https://developer.chrome.com/blog/a-customizable-select): opt in both `select` and `::picker(select)`. With `base-select`: the native mobile OS picker goes away; the select is no longer sized to its widest option, so set a width; the picker renders in the top layer and is positioned with anchor positioning.
- [MDN guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select): parts `<button><selectedcontent></selectedcontent></button>`, `::picker-icon`, `:open`, `option:checked`, `::checkmark`. Animate with `transition: all .4s allow-discrete` plus `@starting-style`. Unsupported browsers fall back to a classic select and strip non-text option content. Some frameworks block it or cause SSR hydration failures. `::checkmark` and `::picker-icon` content is not announced.

**Crafted vs generic.** Crafted: `base-select` with rich options and animated picker over a native fallback, instead of a JS replacement library for purely visual reasons. `text-box: trim-both cap alphabetic` for vertical centering (MDN example). See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.**
- `base-select` drops the native OS picker (Chrome blog). For long lists on touch, consider keeping native, or present a full-screen or bottom-sheet list with a search field on top.
- Touch rows at least 44–48 px.

**Accessibility.**
- APG Combobox ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)): `role="combobox"` on the input, `aria-expanded`, `aria-controls`, `aria-activedescendant` (DOM focus stays in the input), `aria-autocomplete` = `none`/`list`/`both`, `aria-selected` on the option. Keys: Down opens; Esc closes (optionally clears); Enter accepts; Alt+Down/Up optional; the popup is not in the tab order. APG examples include select-only, list and inline autocomplete, grid popup and a date-picker combobox.
- Announce result counts politely ("5 results").
- Never rely on hover-only.
- `::checkmark`/`::picker-icon` content is not announced, so don't put meaning there.

**Code** — customizable select (from MDN/Chrome)

> ⚠ Untested reference snippet.

```html
<label for="plan">Plan</label>
<select id="plan" class="sel">
  <button><selectedcontent></selectedcontent></button>
  <option value="hobby"><span class="ic" aria-hidden="true">◐</span><span>Hobby</span></option>
  <option value="pro"><span class="ic" aria-hidden="true">◆</span><span>Pro</span></option>
  <option value="team"><span class="ic" aria-hidden="true">✶</span><span>Team</span></option>
</select>
<style>
@supports (appearance: base-select){
  .sel,.sel::picker(select){appearance:base-select}
  .sel{inline-size:16rem;padding:.7rem 1rem;border:1.5px solid #222;border-radius:12px;background:#fff}
  .sel::picker-icon{transition:rotate .25s}
  .sel:open::picker-icon{rotate:180deg}
  .sel::picker(select){border:1.5px solid #222;border-radius:14px;padding:.35rem;margin-block-start:.35rem;
    box-shadow:0 18px 40px -12px rgb(0 0 0/.35);opacity:0;translate:0 -6px;
    transition:opacity .2s,translate .2s,display .2s allow-discrete,overlay .2s allow-discrete}
  .sel:open::picker(select){opacity:1;translate:0 0}
  @starting-style{.sel:open::picker(select){opacity:0;translate:0 -6px}}
  .sel option{display:flex;gap:.6rem;padding:.6rem .75rem;border-radius:9px}
  .sel option:is(:hover,:focus-visible){background:#f1efe9}
  .sel option::checkmark{order:1;margin-inline-start:auto;content:"✓"}
  .sel selectedcontent .ic{display:none}
}
</style>
```

**Libraries & tools.** Base UI Combobox, Autocomplete; React Aria ComboBox (entry/exit animation states); coss ui Select, Combobox, Autocomplete, Command ([coss.com/ui](https://coss.com/ui)); Ark UI; Cult UI Halo Select; Hover.dev Dropdown Menus category.

**Inspiration links.** [Chrome: a customizable select](https://developer.chrome.com/blog/a-customizable-select) · [MDN customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) · [APG Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

**Caveats & verification status.** `base-select` is progressive enhancement only (no Firefox). Anchor positioning partial in Chromium and Firefox. SSR hydration issues in some frameworks (MDN).

---

## 17. Sliders, steppers and ratings

**What & when.**
- Slider: approximate values or exploration (price range, volume). Pair with a number input when precision matters.
- Stepper (NumberField): small precise integers such as quantity or guests.
- Rating: 1–5 stars or emoji scales; NPS uses 0–10 radios.

**Variants** (synthesis)

Slider:

| # | Variant | Spec |
|---|---|---|
| 1 | Filled track + value bubble | Bubble follows the thumb (`--p` custom property). |
| 2 | Dual-thumb range | Base UI/React Aria/coss Slider; filled segment between thumbs. |
| 3 | Ticks and labelled stops | `<datalist>` or custom. |
| 4 | Histogram slider | Tiny bars above the track, highlighted inside the range. |
| 5 | Vertical slider | `aria-orientation`. |
| 6 | Thick "pill" slider | iOS Control Center style: the fill is the control, value text inside. |
| 7 | Stepped / snapping slider | Haptic-like scale pulse on snap. |

Stepper:

| # | Variant | Spec |
|---|---|---|
| 1 | `[–] 2 [+]` pill | Tabular numbers; number rolls up or down on change. |
| 2 | Scrub field | Drag horizontally on the label to change the value (coss "scrub area", Figma-style). |
| 3 | Long-press auto-repeat | With acceleration. |
| 4 | Quantity chip | Expands from "Add" to the stepper (e-commerce). |

Rating:

| # | Variant | Spec |
|---|---|---|
| 1 | Stars with hover preview | |
| 2 | Half-stars | 10 radios, or a slider with `aria-valuetext`. |
| 3 | Emoji faces scale | |
| 4 | NPS 0–10 | Segmented radios. |
| 5 | Thumbs up/down | Toggle buttons (`aria-pressed`). |
| 6 | Heart burst | Animation on select. |

**States.**
- Slider: thumb hover grows; focus-visible ring on the thumb; active/dragging (`data-dragging`, exposed by React Aria) grows the thumb and shows the bubble; disabled.
- Stepper: − disabled at min, + disabled at max.

**Crafted vs generic.** Crafted: tabular numerals in steppers and sliders; rolling digits; scrub fields. See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.**
- Slider thumbs at least 28 px visually inside a 44 px hit area.
- APG warns that touch assistive technology may not support slider gestures, so always offer an alternative input.
- Stepper buttons at least 44 px. Use `inputmode="numeric"` for the number field, not `type=number` for codes.

**Accessibility.**
- APG Slider ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)): `role="slider"`, `aria-valuenow`/`min`/`max`, `aria-valuetext` (e.g. "Tuesday", "2 min 30 s"), `aria-orientation`. Keys: arrows step; Home/End jump to min/max; PageUp/Down make larger steps. Focus sits on the thumb. **Some touch assistive technologies may not support slider gestures; test on touch devices.**
- APG Rating ([radio rating example](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/)): `role="radiogroup"` + `aria-labelledby`; each star `role="radio"` with `aria-label` ("one star"); roving tabindex. Keys: arrows move and check (wrapping); Space checks. Styling: 2px focus ring with 2px gap; strokes use `currentcolor` for forced colours.
- Native radios keep arrow-key behaviour and the radiogroup semantics the APG describes. `.sr-only` clips content visually but keeps it in the accessibility tree.

**Code**

Styled native range with fill:

> ⚠ Untested reference snippet.

```html
<label for="vol">Volume <output id="vol-out" for="vol">40</output></label>
<input id="vol" type="range" min="0" max="100" value="40" class="range" style="--p:40%">
<style>
.range{appearance:none;background:transparent;inline-size:100%;block-size:44px;cursor:pointer;margin:0}
.range::-webkit-slider-runnable-track{block-size:.4rem;border-radius:999px;
  background:linear-gradient(to right,var(--accent,#ff5a1f) var(--p),#ddd var(--p))}
.range::-moz-range-track{block-size:.4rem;border-radius:999px;background:#ddd}
.range::-moz-range-progress{block-size:.4rem;border-radius:999px;background:var(--accent,#ff5a1f)}
.range::-webkit-slider-thumb{appearance:none;inline-size:1.4rem;block-size:1.4rem;border-radius:50%;background:#fff;
  border:2px solid var(--accent,#ff5a1f);margin-block-start:-.5rem;transition:scale .15s}
.range::-moz-range-thumb{inline-size:1.4rem;block-size:1.4rem;border-radius:50%;background:#fff;border:2px solid var(--accent,#ff5a1f)}
.range:active::-webkit-slider-thumb{scale:1.2}
.range:focus-visible{outline:none}
.range:focus-visible::-webkit-slider-thumb{outline:3px solid color-mix(in oklab,var(--accent,#ff5a1f) 40%,transparent);outline-offset:2px}
.range:focus-visible::-moz-range-thumb{outline:3px solid color-mix(in oklab,var(--accent,#ff5a1f) 40%,transparent);outline-offset:2px}
</style>
<script>
const r=document.getElementById('vol'),o=document.getElementById('vol-out');
r.addEventListener('input',()=>{r.style.setProperty('--p',(r.value-r.min)/(r.max-r.min)*100+'%');o.value=r.value;});
</script>
```

CSS-only star rating with native radios and `:has`:

> ⚠ Untested reference snippet.

```html
<fieldset class="rating"><legend>Rate this recipe</legend>
  <input type="radio" name="stars" id="s1" value="1"><label for="s1"><span class="sr-only">1 star</span></label>
  <input type="radio" name="stars" id="s2" value="2"><label for="s2"><span class="sr-only">2 stars</span></label>
  <input type="radio" name="stars" id="s3" value="3"><label for="s3"><span class="sr-only">3 stars</span></label>
  <input type="radio" name="stars" id="s4" value="4"><label for="s4"><span class="sr-only">4 stars</span></label>
  <input type="radio" name="stars" id="s5" value="5"><label for="s5"><span class="sr-only">5 stars</span></label>
</fieldset>
<style>
.rating{border:0;display:flex;gap:.25rem;padding:0}
.rating legend{inline-size:100%;margin-block-end:.4rem}
.rating input{position:absolute;opacity:0;inline-size:1px;block-size:1px}
.rating label{inline-size:44px;block-size:44px;cursor:pointer;background:#c9c9c9;
  mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z"/></svg>') center/70% no-repeat;
  transition:background-color .15s,scale .15s}
/* filled = its own input checked, or a later input checked */
.rating input:checked + label,.rating label:has(~ input:checked){background:#f5a623}
/* hover preview overrides */
.rating:hover label{background:#c9c9c9}
.rating label:hover,.rating label:has(~ label:hover){background:#f5a623}
.rating label:hover{scale:1.12}
.rating input:focus-visible + label{outline:2px solid #111;outline-offset:2px;border-radius:6px}
@media (forced-colors:active){.rating label{background:CanvasText}.rating input:checked + label,.rating label:has(~ input:checked){background:Highlight}}
</style>
```

**Libraries & tools.** Base UI / React Aria / coss Slider (dual thumb; React Aria `data-dragging`); coss ui Number Field (increment/decrement buttons and scrub area); Base UI Number Field. Ark UI RatingGroup (unverified this session).

**Inspiration links.** [APG Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) · [APG radio rating](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/) · [coss.com/ui](https://coss.com/ui).

**Caveats & verification status.** Baymard stepper research not fetched. Touch AT slider gesture support varies (APG). Snippets untested.

---

## 18. Search bars

**What & when.**
- A visible field on content-heavy sites (NN/g: not icon-only on the homepage).
- Expanding search only in tight headers.
- Instant search for small datasets.
- Suggestions/autocomplete (APG combobox) for catalogues.
- NN/g ([search visible and simple](https://www.nngroup.com/articles/search-visible-and-simple/)): on homepages, use a visible type-in field, not a link or icon; changing a link to a box raised search use by **91%**. Make it wide enough for typical queries. Place it top right (left is nearly as good) and on every page.

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Persistent wide field** | Leading magnifier, a `/` or `⌘K` shortcut hint chip on the right, clear button when filled. |
| 2 | **Expanding icon → field** | Width animates from 44 px to 20 rem on `:focus-within`, collapses when empty and blurred. |
| 3 | **Full-screen overlay search on mobile** | Large input, recent searches, popular chips. |
| 4 | **Command palette** | Dialog + combobox with grouped results and keyboard hints. |
| 5 | **Instant results with highlighted terms** | `<mark>`, plus a result count in a live region. |
| 6 | **Scoped search** | Pill with "in: Docs ▾" prefix or segmented filters. |
| 7 | **AI / "ask" search** | Toggle between keyword and answer modes; halo or border-beam focus (Cult UI "Halo Search"). |
| 8 | **Gooey expanding search** | Aceternity. |
| 9 | **Voice search button** | Web Speech API, progressive enhancement. |
| 10 | **Rotating placeholder examples** | "Try 'red sneakers'", paused on focus, never as the label. |

**States.** idle, focused, typing, loading (spinner replaces the magnifier), results, no results (suggest spelling or alternatives), error, offline.

**Crafted vs generic.** Crafted: a visible, wide field with a shortcut hint; highlighted terms; meaningful empty states. Generic: icon-only search on a content-heavy homepage. See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.**
- `type="search"` gives a search keyboard; add `enterkeyhint="search"`.
- `autocapitalize="none"`; `autocomplete="off"` only for custom suggestion lists.
- Make the overlay full screen so the keyboard doesn't hide suggestions.

**Accessibility.**
- `<form role="search">` (or the `<search>` element) with a labelled input.
- Suggestions per the APG combobox pattern (see [16](#16-selects-dropdowns-comboboxes-and-multiselect)). Announce counts politely; Esc clears and closes.

**Code** — expanding search

> ⚠ Untested reference snippet.

```html
<form class="xsearch" role="search" action="/search">
  <label for="q" class="sr-only">Search the site</label>
  <input id="q" name="q" type="search" placeholder="Search…" enterkeyhint="search" autocapitalize="none">
  <button type="submit" aria-label="Submit search">
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="2"/></svg>
  </button>
</form>
<style>
.xsearch{display:flex;align-items:center;border:1.5px solid #222;border-radius:999px;padding-inline-start:.25rem;background:#fff}
.xsearch input{inline-size:0;min-inline-size:0;padding:.65rem 0;border:0;background:none;font-size:1rem;outline:none;
  transition:inline-size .35s cubic-bezier(.2,.8,.2,1),padding .35s}
.xsearch:focus-within input,.xsearch input:not(:placeholder-shown){inline-size:min(20rem,60vw);padding-inline:.75rem}
.xsearch:focus-within{box-shadow:0 0 0 3px color-mix(in oklab,var(--accent,#2b59ff) 35%,transparent)}
.xsearch button{inline-size:44px;block-size:44px;border:0;background:none;border-radius:50%;cursor:pointer}
</style>
<script>addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();q.focus();}});</script>
```

Clicking the button while the field is collapsed should focus the field rather than submit an empty query. Add in JS: `if(!q.value){e.preventDefault();q.focus()}`.

**Libraries & tools.** Aceternity Gooey Input; Cult UI Halo Search; coss ui Command, Autocomplete; Base UI Autocomplete. Command palette libraries (cmdk etc.) in [navigation-structure.md](navigation-structure.md#2g-command-palette-cmdctrlk).

**Inspiration links.** [NN/g search visible and simple](https://www.nngroup.com/articles/search-visible-and-simple/) · [Aceternity](https://ui.aceternity.com/components) · [Cult UI](https://www.cult-ui.com/docs).

**Caveats & verification status.** `<search>` element support not re-verified this session. Snippet untested.

---

## 19. Date and time pickers

**What & when.**
- Memorable dates (birthdays, past events): three text fields (GOV.UK) or a segmented date field (React Aria DateField). **No calendar.**
- Near-future scheduling (bookings, flights): calendar popover or inline calendar, often a range.
- Mobile: native `<input type="date">`/`type="time"` is a strong default for simple cases (OS wheel or calendar).
- Time: segmented field, a time-slot grid for booking, or native `type="time"`.
- GOV.UK date input ([design system](https://design-system.service.gov.uk/components/date-input/)): use for dates users already know, not for dates they'd need a calendar to work out.

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **GOV.UK 3-field memorable date** | DD/MM/YYYY widths about 2, 2 and 4 characters; month names accepted. |
| 2 | **Segmented single field** | Each segment is a spinbutton; arrows increment; typing auto-advances inside the one control (React Aria). |
| 3 | **Calendar popover** | Input plus calendar button; grid has today ringed, selected filled, disabled days struck through. |
| 4 | **Range picker, two months side by side** | Hover previews the range band; start and end caps rounded (Cally `<calendar-range months="2">`). |
| 5 | **Inline booking calendar** | Price or availability per day: small subtext, colour-coded heat. |
| 6 | **Preset chips plus calendar** | "Today / Last 7 days / This month / Custom" for analytics. |
| 7 | **Natural-language date input** | "next fri 3pm" parsed and echoed back as a confirmed date. |
| 8 | **Time slots grid** | 30-min chips grouped Morning/Afternoon/Evening, time zone stated. |
| 9 | **Scroll-snap wheel picker** | iOS style, for mobile time and duration. |
| 10 | **Week strip** | Horizontally scrollable row of days, mobile-first. |

**States.**
- Days: today, selected, in-range, range-start/end, hover/preview, focused (keyboard), disabled/unavailable, out-of-month (muted).
- Field: invalid (impossible date) with a GOV.UK-style error.

**GOV.UK date input rules (cited).**
- Three text fields (day, month, year) in a `<fieldset>`/`<legend>`, `type="text" inputmode="numeric"`. **`pattern="[0-9]*"` was removed in Frontend v4.1.0.**
- Accept month names ("jan"); research showed this "reduced errors dramatically" and helps people with dyscalculia.
- **Never auto-advance focus.**
- `autocomplete="bday-day|bday-month|bday-year"`, which WCAG 2.2 SC 1.3.5 requires in production.
- Error priority: missing, then impossible, then other. Highlight only the faulty sub-field when that is clear.

**Crafted vs generic.** Crafted: choose the input by date type (memorable vs scheduling), not a calendar for everything; range band previews; availability heat. See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.**
- Native types bring up OS pickers.
- Custom calendars need cells at least 44 px, a full-width sheet, and swipe or prev/next for months.
- No auto-advance between separate fields (GOV.UK).

**Accessibility.**
- The APG date-picker combobox example is a dialog with a grid.
- Grid keys: arrows move by day or week; PageUp/Down change month; Home/End go to week start or end.
- Announce month changes. Labels include the format hint ("For example, 27 3 2007").
- React Aria DatePicker gives segmented typing plus a calendar popover ([react-aria.adobe.com](https://react-aria.adobe.com/)).

**Code.** Editor's note: the notes contain no date-picker snippet; use Cally's `<calendar-date>`, `<calendar-range>`, `<calendar-multi>` and `<calendar-month offset>` elements or React Aria DatePicker.

**Libraries & tools.**
- **React Aria DatePicker**: DateInput/DateSegment (segmented typing) + Popover, Dialog, Calendar; Calendar `visibleDuration`; 13 calendar systems ([react-aria.adobe.com](https://react-aria.adobe.com/)). Best for accessible segmented entry.
- **react-day-picker**: the common foundation; v10 published as `@daypicker/react` using native Date. shadcn's date picker is built on it. MUI X date ranges are a paid Pro feature ([LogRocket, updated Oct 2026](https://blog.logrocket.com/top-react-date-pickers)).
- **Cally** ([wicky.nillia.ms/cally](https://wicky.nillia.ms/cally/)): web-component calendars under **9 KB** min+gzip with one dependency. `<calendar-date>`, `<calendar-range>`, `<calendar-multi>`, `<calendar-month offset>` for multi-month views. Keyboard and screen-reader support, `Intl.DateTimeFormat`, RTL, CSS parts and custom properties for styling. For framework-free builds.
- coss ui Calendar (range and multi-select), Date Picker (Calendar + Popover) ([coss.com/ui](https://coss.com/ui)). Ark UI DatePicker (unverified this session). Hover.dev Calendars category.

**Inspiration links.** [GOV.UK date input](https://design-system.service.gov.uk/components/date-input/) · [Cally](https://wicky.nillia.ms/cally/) · [LogRocket top React date pickers](https://blog.logrocket.com/top-react-date-pickers).

**Caveats & verification status.** No source compared Cally with the React libraries. Baymard's date-picker research not fetched. Time-picker-specific usability (wheel vs slots) not researched.

---

## 20. File upload and drop zones

**What & when.**
- Only when needed: GOV.UK says only ask for uploads critical to the service.
- Single file: inline button. Multiple or large files: drop zone with a queue.
- Images: preview, crop and reorder. Mobile: camera capture.

**Variants** (synthesis)

| # | Variant | Spec |
|---|---|---|
| 1 | **Dashed drop zone** | Icon, "Drop files or browse", accepted types and size limit stated up front. |
| 2 | **Grid-backdrop zone** | Lights up on drag-over (Aceternity File Upload); the card "lifts" toward the cursor. |
| 3 | **Halo dropzone** | Glow on drag (Cult UI). |
| 4 | **Whole-page drop target** | Full-viewport overlay appears when files are dragged over the window (Slack/Linear style). |
| 5 | **Avatar uploader** | Circular preview, hover overlay "Change", crop modal. |
| 6 | **Image gallery uploader** | Thumbnails with drag-to-reorder and per-item progress rings. |
| 7 | **File list with per-file progress bars** | Cancel and retry; states queued/uploading/done/failed. |
| 8 | **Paste-to-upload** | Ctrl/⌘+V for screenshots. |
| 9 | **Remote sources** | Drive, URL, webcam via Uppy. |
| 10 | **Compact inline attach button** | Paperclip inside a composer. |

**States.**
- Zone: idle, drag-over (border solid accent, background tint, icon bounces), drag-reject (wrong type: red tint and message), disabled.
- Files: uploading (progress %), success (check), error (specific GOV.UK-style messages: too large, wrong type, virus, failed — retry).

**GOV.UK file upload (cited)** ([design system](https://design-system.service.gov.uk/components/file-upload/)):
- An improved version (Frontend **5.9.0, March 2025**) adds a bigger, always-visible drop zone and a secondary-style "Choose file" button. `multiple` supported since **5.13.0 (Oct 2025)**. Feb 2026 brought improved colours and interaction states.
- Specific error messages for: no file, wrong type (list accepted types), too large (state max), empty, virus, password-protected, upload failed, too many files, template not used.
- Research: Dragon speech users can't activate native file inputs. Screen readers don't announce `required` in the improved version. Keep button text short.

**Crafted vs generic.** Crafted: limits stated up front, specific error messages, per-file progress and retry, drag-over states that don't flicker. See [global rules](#global-crafted-vs-slop-rules-apply-to-every-component-in-this-file).

**Desktop vs mobile.**
- There is no drag and drop on mobile, so the zone must be a big tappable button that opens the picker.
- `accept="image/*"` with `capture="environment"` opens the camera directly; omit `capture` to let users choose the library.
- Show file sizes and allow cancel on slow networks.

**Accessibility.**
- Real `<input type="file">` (visually hidden but focusable) inside a `<label>`, so the zone is keyboard and voice operable.
- GOV.UK notes Dragon users struggle with native file inputs, so test.
- Announce added files and upload progress milestones politely; link errors to the input.

**Code** — progressive drop zone

> ⚠ Untested reference snippet.

```html
<label class="dz" for="files">
  <input id="files" name="files" type="file" multiple accept="image/png,image/jpeg,application/pdf" class="sr-only" aria-describedby="dz-hint">
  <strong>Drop files here</strong> or <span class="dz__browse">browse</span>
  <small id="dz-hint">PNG, JPG or PDF, up to 10 MB each</small>
</label>
<ul id="dz-list" aria-live="polite"></ul>
<style>
.dz{display:grid;place-items:center;gap:.35rem;padding:2.5rem 1rem;border:2px dashed #888;border-radius:16px;text-align:center;cursor:pointer;transition:background-color .15s,border-color .15s}
.dz:hover{border-color:#333}
.dz:has(input:focus-visible){outline:3px solid var(--accent,#2b59ff);outline-offset:3px}
.dz.is-over{border-style:solid;border-color:var(--accent,#2b59ff);background:color-mix(in oklab,var(--accent,#2b59ff) 8%,white)}
.dz__browse{text-decoration:underline;color:var(--accent,#2b59ff)}
</style>
<script>
const dz=document.querySelector('.dz'),inp=document.getElementById('files'),list=document.getElementById('dz-list');
let depth=0;
const render=files=>{list.innerHTML='';[...files].forEach(f=>{const li=document.createElement('li');
  li.textContent=`${f.name} (${(f.size/1048576).toFixed(1)} MB)`+(f.size>10*1048576?' — too large, maximum is 10 MB':'');list.append(li);});};
dz.addEventListener('dragenter',e=>{e.preventDefault();depth++;dz.classList.add('is-over');});
dz.addEventListener('dragover',e=>e.preventDefault());
dz.addEventListener('dragleave',()=>{if(--depth===0)dz.classList.remove('is-over');});
dz.addEventListener('drop',e=>{e.preventDefault();depth=0;dz.classList.remove('is-over');inp.files=e.dataTransfer.files;render(inp.files);});
inp.addEventListener('change',()=>render(inp.files));
</script>
```

The `depth` counter prevents drag-over flicker when the pointer crosses child elements. Assigning `input.files` from a drop keeps native form submission working.

**Libraries & tools** ([Upstash KB](https://upstash.com/kb/best-react-file-upload-libraries); [PkgPulse](https://www.pkgpulse.com/guides/uppy-vs-filepond-vs-react-dropzone-file-upload-2026); [Uppy comparison](https://uppy.io/docs/comparison/)):

| Library | Gzipped size (Upstash) | What it does |
|---|---|---|
| react-dropzone | 6.5 KB; 7.9M weekly downloads on Oct 12 2026 | Picks files only; you write the upload |
| Uppy | 23.5 KB core + S3 + hook; 82.9 KB with Dashboard | Modular; remote sources and webcam; tus resumable |
| FilePond | 42.7 KB | Polished widget; crop/resize image plugins; chunked uploads |
| Uploadcare | 110.2 KB | Includes an image editor |

- Download counts conflict across sources: PkgPulse lists react-dropzone at about 3.5M and about 5M weekly.
- Uppy cannot make an arbitrary multipart endpoint resumable; resumability depends on the server ([PkgPulse](https://www.pkgpulse.com/guides/uppy-vs-filepond-vs-react-dropzone-file-upload-2026)).
- **Pick (synthesis):** react-dropzone for hand-crafted drop zones; FilePond if image cropping is needed; Uppy for Google Drive, webcam or resumable uploads.
- Style references: Aceternity File Upload; Cult UI Halo Dropzone. coss ui has no file-upload component listed. Ark UI FileUpload unverified this session.

**Inspiration links.** [GOV.UK file upload](https://design-system.service.gov.uk/components/file-upload/) · [Aceternity](https://ui.aceternity.com/components) · [Cult UI](https://www.cult-ui.com/docs).

**Caveats & verification status.** `capture` behaviour across mobile browsers and `input.files = dataTransfer.files` assignment are unverified this session; test before relying on them. Snippet untested.

---

## Research gaps

- Pages that would not load: uiverse.io/elements (403); 21st.dev/community/components (ECONNRESET); the Codrops Magnetic Buttons article body (403). Untitled UI, Dribbble, Mobbin, CodePen collections and Awwwards SOTD pages were not fetched. No award-site case studies (Awwwards/FWA) for named button or input implementations.
- Hover.dev, Magic UI, Animata and Cult UI list most components by name only; visual/motion specs inferred from names unless stated.
- Headless UI, Melt UI and Bits UI docs not visited. Ark UI's homepage did not list its components (DatePicker, FileUpload, RatingGroup, PinInput, TagsInput unverified).
- No source compared Cally with the React libraries.
- No NN/g article on wizard progress indicators found; no Vitaly Friedman 2025–26 form guide fetched; Baymard date-picker and stepper research not fetched.
- caniuse data for `interestfor` and `popover="hint"` not retrieved. `@property`, `color-mix()`, `lh` units, `:focus-visible`, the `<search>` element, `:dir()` in older Safari, `capture` behaviour across mobile browsers, `input.files = dataTransfer.files`, and the iOS zoom-under-16px rule are unverified this session.
- Time-picker-specific usability (wheel vs slots) not researched.
- All code snippets were authored for the notes and have not been run in browsers.

---

## Sources

- Hover.dev buttons: https://www.hover.dev/components/buttons
- Aceternity UI components: https://ui.aceternity.com/components
- Magic UI components: https://magicui.design/docs/components
- Animata docs: https://animata.design/docs
- Cult UI docs: https://www.cult-ui.com/docs
- coss ui: https://coss.com/ui
- Codrops Magnetic Buttons: https://tympanus.net/codrops/2020/08/05/magnetic-buttons · https://tympanus.net/codrops/hub/tag/magnetic/
- 21st.dev magnetic button: https://21st.dev/bundui/magnetic-button
- Josh W. Comeau 3D button: https://www.joshwcomeau.com/animation/3d-button/
- LogRocket liquid glass: https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/
- Tuts+ liquid glass: https://webdesign.tutsplus.com/liquid-glass-effect-svg-filters--cms-109200t
- Freefrontend liquid glass: https://freefrontend.com/code/liquid-glass-effect-2026-02-05/
- Base UI: https://news.lavx.hu/article/mui-releases-base-ui-1-with-35-accessible-components · https://infoq.com/news/2026/02/baseui-v1-accessible/ · https://www.issoh.co.jp/tech/details/10350/ · https://mui.com/blog/2026-and-beyond/
- shadcn/ui changelog: https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default · https://ui.shadcn.com/docs/changelog/2026-01-base-ui
- hextaui Base UI vs Radix: https://hextaui.com/blog/shadcn-base-ui-vs-radix
- React Aria: https://react-aria.adobe.com/
- Ark UI: https://ark-ui.com/
- LogRocket React date pickers: https://blog.logrocket.com/top-react-date-pickers
- Cally: https://wicky.nillia.ms/cally/
- Upload libraries: https://upstash.com/kb/best-react-file-upload-libraries · https://www.pkgpulse.com/guides/uppy-vs-filepond-vs-react-dropzone-file-upload-2026 · https://uppy.io/docs/comparison/
- NN/g: https://www.nngroup.com/articles/form-design-placeholders/ · https://www.nngroup.com/articles/toggle-switch-guidelines/ · https://www.nngroup.com/articles/search-visible-and-simple/
- Baymard: https://baymard.com/blog/mobile-forms-avoid-inline-labels · https://baymard.com/blog/inline-form-validation
- Adam Silver float labels: https://adamsilver.io/articles/float-labels-are-problematic/
- Smashing: https://smashingmagazine.com/2021/02/material-design-text-fields · https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/ · https://mobile.smashingmagazine.com/author/vitaly-friedman
- GOV.UK Design System: https://design-system.service.gov.uk/components/date-input/ · https://design-system.service.gov.uk/components/file-upload/
- W3C WAI multi-page forms: https://www.w3.org/WAI/tutorials/forms/multi-page/
- Wizard guidance: https://design-system.agriculture.gov.au/pr-preview/pr-1506/components/progress-indicator · https://designsystem.ontario.ca/components/detail/step-indicator.html · https://design.visa.com/patterns/wizard/usage/
- web.dev: https://web.dev/articles/sign-in-form-best-practices · https://web.dev/blog/baseline-digest-jun-2026
- caniuse: https://caniuse.com/mdn-css_properties_field-sizing · https://caniuse.com/mdn-css_properties_accent-color · https://caniuse.com/customizable-select · https://caniuse.com/mdn-api_htmlelement_popover · https://caniuse.com/mdn-html_elements_button_command · https://caniuse.com/css-anchor-positioning
- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid · https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/appearance · https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select · https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inputmode
- Chrome customizable select: https://developer.chrome.com/blog/a-customizable-select
- Underline animation: https://css-irl.info/animating-underlines/ · https://css-tricks.com/?p=295935
- APG: https://www.w3.org/WAI/ARIA/apg/patterns/switch/ · https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ · https://www.w3.org/WAI/ARIA/apg/patterns/slider/ · https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/
