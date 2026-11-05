# Accessibility

What to build and test against in 2026: WCAG 2.2 AA essentials (contrast, focus, keyboard, landmarks, target size, motion, reflow), the real status of WCAG 3 and APCA, reduced-motion technique, and a testing stack. Facts are as of 5 Nov 2026. Cited facts carry inline links. WCAG criterion numbers and the essentials checklist are standard requirements recorded from background knowledge **(bg)**; items the research could not confirm are marked **(unverified)**. Snippets are untested.

## Contents

1. [Which standard to target](#1-which-standard-to-target)
2. [WCAG 3 and APCA status](#2-wcag-3-and-apca-status)
3. [Contrast](#contrast)
4. [Focus](#4-focus)
5. [Keyboard](#5-keyboard)
6. [Landmarks, semantics and forms](#6-landmarks-semantics-and-forms)
7. [Target size and pointer](#7-target-size-and-pointer)
8. [WCAG 2.2 additions](#8-wcag-22-additions)
9. [Reduced motion](#reduced-motion)
10. [Reflow, zoom and text spacing](#10-reflow-zoom-and-text-spacing)
11. [Generated components need QA](#11-generated-components-need-qa)
12. [Front-End Checklist accessibility rules](#12-front-end-checklist-accessibility-rules)
13. [Testing stack](#13-testing-stack)
14. [Legal context](#14-legal-context)
15. [Gaps](#15-gaps)
16. [Sources](#sources)

---

## 1. Which standard to target

- **WCAG 2.2 AA** is the target to build and test against in 2026. Legal obligations still reference **WCAG 2.x**.
- Meet WCAG 2 contrast ratios, optionally check with APCA as well, and **document any deviation**.

---

## 2. WCAG 3 and APCA status

- **WCAG 3** is a **Working Draft**, published **3 March 2026** for review. — [W3C WAI news](https://www.w3.org/WAI/news/2026-03-03/wcag3). Not expected before about **2028–2030**.
- **APCA is not in the current WCAG 3 draft** — [Adrian Roselli: WCAG3 Contrast as of April 2026](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html):
  - The **April 2026 WCAG 3 Editor's Draft** lists the contrast test as **"Exploratory"**: "The contrast algorithm used in WCAG 3 is yet to be determined."
  - APCA was **marked for removal in early 2023** and **pulled from the July 2023 draft**.
  - WCAG 3 is "probably years away, perhaps 2030 at the earliest."
  - Advice: meet WCAG 2 contrast; if you use APCA and fail WCAG 2, document the decision.
  - An APCA developer (Inclusive Reading Technologies) says in the comments that APCA is draft guidance, should **not be called "WCAG 3"**, and points to **BridgePCA**, which passes WCAG 2 while adding APCA guidance.
- Secondary blogs that still describe APCA as "in WCAG 3" are **outdated**.

---

## Contrast

(bg) WCAG 1.4.3 / 1.4.11:
- **4.5:1** for body text.
- **3:1** for large text (**≥24px, or ≥18.66px bold**).
- **3:1** for UI component boundaries, focus indicators and meaningful graphics.
- Check **every theme**: light, dark, over images and over glass.
- Neumorphism has notoriously poor contrast and affordance; glassmorphism on text-heavy surfaces is a contrast risk (synthesis; see [00-start-here](../00-start-here.md#named-aesthetics)).

Editor's note: contrast checkers (WebAIM, apcacontrast.com) are listed in [assets/design-tools.md](../assets/design-tools.md).

---

## 4. Focus

(bg) WCAG 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured:

```css
:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
```

- Never `outline: none` without a replacement.
- Sticky headers must not cover focused elements: set **`scroll-padding-top`** to the header height.
- `--focus-ring` is a semantic token (see [design-tokens-color-type.md](design-tokens-color-type.md#3-semantic-tokens-and-naming)).

Editor's note: combined form (untested), header height as a placeholder:

```css
:root { --header-h: 4rem; scroll-padding-top: var(--header-h); }
```

---

## 5. Keyboard

(bg) WCAG 2.1.1:
- Everything reachable and operable, **no traps**, logical order.
- Add a **skip link**.
- Use native `<button>`, `<a href>`, `<dialog>`, `popover` and `<details>` before ARIA widgets.
- Full-screen menus: `<dialog>` or popover with a focus trap and Esc to close.
- Don't animate keyboard-initiated actions that users repeat often. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)

Editor's note: a common skip-link shape (untested):

```html
<a class="skip-link" href="#main">Skip to content</a>
…
<main id="main">…</main>
```

---

## 6. Landmarks, semantics and forms

(bg)
- One `<h1>`, a sequential heading outline.
- `<header>`, `<nav aria-label>`, `<main>`, `<footer>`.
- `lang` on `<html>`.
- Alt text; empty `alt=""` for decorative images.
- Labelled form fields, with errors tied to inputs via `aria-describedby`.

Editor's note: form UX (labels above fields, validate on blur, "reward early, punish late") and ARIA patterns per component are in [components/actions-inputs.md](../components/actions-inputs.md) and [components/navigation-structure.md](../components/navigation-structure.md).

---

## 7. Target size and pointer

- **WCAG 2.2 SC 2.5.8 (AA):** at least **24×24 CSS px**, with a spacing exception (24px-diameter circles must not intersect). Exceptions: Spacing, Equivalent, Inline, User-agent control, Essential. Consider **2.5.5 Target Size (Enhanced)** for important controls. — [W3C 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Comfort sizes 44–48px (Apple HIG 44px, Material 48dp: bg, unverified). Details in [layout-responsive-mobile.md](layout-responsive-mobile.md#8-touch-targets-wcag-258).

---

## 8. WCAG 2.2 additions

(bg)
- **2.5.7 Dragging Movements:** provide a non-drag alternative.
- **2.5.8 Target Size (Minimum).**
- **3.3.7 Redundant Entry.**
- **3.3.8 Accessible Authentication:** no cognitive puzzles; allow paste and password managers.
- **3.2.6 Consistent Help.**

---

## Reduced motion

- Wrap motion in `@media (prefers-reduced-motion: reduce)` and **swap it for a gentler effect** (e.g. a **0.2s fade instead of a bounce**) rather than removing all feedback. In React, **`useReducedMotion`** lets you zero the x-offset while keeping opacity. — [Emil Kowalski](https://emilkowal.ski/ui/great-animations)
- (bg) Auto-playing motion longer than **5s** needs pause, stop or hide (**2.2.2**). No more than **3 flashes per second** (**2.3.1**). Parallax and scroll-jacking need a reduced-motion path.
- No seizure-inducing flashing is a **Critical** Front-End Checklist rule.

Editor's note: a swap-not-remove pattern assembled from the guidance above (class names and values are placeholders; untested):

```css
.reveal { animation: rise 400ms var(--ease-out) both; }
@keyframes rise { from { opacity: 0; translate: 0 16px; } }
@keyframes fade { from { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .reveal { animation: fade 200ms ease both; }   /* keep feedback, drop movement */
}
```

The blunt global reset (zero all durations) is in [layout-responsive-mobile.md](layout-responsive-mobile.md#mobile-starter-snippet). Animation-specific guidance is in [animations/performance-accessibility.md](../animations/performance-accessibility.md).

---

## 10. Reflow, zoom and text spacing

(bg)
- **1.4.10 Reflow:** no horizontal scroll at **320 CSS px** wide (400% zoom).
- **1.4.12 Text Spacing:** overrides must not break the layout.
- **1.4.4 Resize:** keep a `rem` term in fluid `clamp()` type; pure-`vw` can fail (see [design-tokens-color-type.md](design-tokens-color-type.md#6-fluid-type-and-space-with-clamp-and-utopia)).
- Don't disable zoom (`maximum-scale=1` / `user-scalable=no`): High priority in the Front-End Checklist.

---

## 11. Generated components need QA

- AI-generated sites typically lack **ARIA labels, keyboard navigation, validation and error states**. This makes accessibility QA mandatory for generated components. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Never ship an effect component (Aceternity, Magic UI, etc.) without checking its keyboard and ARIA behaviour (note 01 takeaway; see [components/component-libraries.md](../components/component-libraries.md)).

---

## 12. Front-End Checklist accessibility rules

Source: [Front-End Checklist](https://github.com/thedaviddias/Front-End-Checklist) (**95** accessibility rules).
- **Critical:** label form controls; keyboard navigation works; never put `aria-hidden` on `<body>`; buttons have accessible names; no seizure-inducing flashing.
- **High:** visible focus indicators; don't disable zoom.

---

## 13. Testing stack

(bg; tool pages not fetched)
- **Automated:** axe DevTools or **`@axe-core/playwright`** in CI; Lighthouse accessibility audit; **WAVE** for visual overlays. Automated tools catch roughly **30–40%** of issues (commonly cited estimate, unverified).
- **Manual:** keyboard-only pass; screen readers (**VoiceOver** on iOS/macOS, **NVDA** on Windows, **TalkBack** on Android); **200% / 400% zoom**; **forced colours** (Windows High Contrast); checking with **reduced motion enabled**.
- **Checklists:** The A11y Project checklist (a11yproject.com/checklist) and the WebAIM WCAG 2 checklist.
- Launch gate: axe in CI with **zero criticals** (see [launch-checklist.md](launch-checklist.md)).

Editor's note: a minimal CI check with `@axe-core/playwright` (untested; adapt to your test runner):

```js
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home has no critical a11y violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => v.impact === 'critical')).toEqual([]);
});
```

---

## 14. Legal context

Relevant but **not verified** in the research:
- **European Accessibility Act** enforcement from **28 June 2025** (EN 301 549 → WCAG 2.1 AA).
- **US DOJ ADA Title II** rule (WCAG 2.1 AA, with 2026–2027 deadlines).

---

## 15. Gaps

- The A11y Project checklist, WebAIM, axe, WAVE and Lighthouse pages were not fetched.
- EAA and ADA Title II details unverified.
- WCAG criterion numbers are from background knowledge.
- The 30–40% automated-coverage figure is unverified.

## Sources

- [W3C WAI news: WCAG 3 Working Draft, March 2026](https://www.w3.org/WAI/news/2026-03-03/wcag3)
- [Adrian Roselli: WCAG3 Contrast as of April 2026](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html)
- [W3C: Understanding SC 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [Front-End Checklist (thedaviddias)](https://github.com/thedaviddias/Front-End-Checklist)
- [Emil Kowalski: Great animations](https://emilkowal.ski/ui/great-animations)
- [prg.sh: Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Not fetched, for manual follow-up: a11yproject.com/checklist, WebAIM WCAG 2 checklist
- Research note: `research_notes/UI components animations and assets/10_craft_responsive_performance_a11y.md` (Q4, Q6)
