# Start Here: From Concept to Launch

This file covers the process for building a distinctive website from these docs. It walks from concept through moodboard, wireframe, design system, build and polish to launch. It shows what generic "AI slop" design looks like and how to avoid it, including the trap of swapping one cliché for another. It includes a table of named aesthetics with when each fits, and a recipe for combining the other docs. Facts are as of 5 Nov 2026. Cited facts carry inline links. **(synthesis)** marks practitioner guidance the research did not verify against one source, and **(bg, unverified)** marks background knowledge.

## Contents

1. [The process at a glance](#the-process-at-a-glance)
2. [Step-by-step process](#step-by-step-process)
3. [What generic "AI slop" design looks like](#what-generic-ai-slop-design-looks-like)
4. [The new cliché trap](#the-new-cliche-trap)
5. [Techniques for distinctive work](#techniques-for-distinctive-work)
6. [Invisible details: interaction craft](#invisible-details-interaction-craft)
7. [Named aesthetics](#named-aesthetics)
8. [Recipe: combining the docs](#recipe-combining-the-docs)
9. [Gaps](#gaps)
10. [Sources](#sources)

---

## The process at a glance

```
Concept → Moodboard → Wireframe → Design system → Build → Polish → QA & launch
  1          2           3             4            5        6          7
```

The concept, a one-sentence idea of what the brand is like, comes first. It drives every later choice. A strong concept is the main antidote to slop (synthesis of the cited sources).

---

## Step-by-step process

The process is synthesis from note 10 (Q7), with links to the docs that hold each step's detail.

### 1. Brief and concept
- Define the audience, the **one job** of the site, **3 brand adjectives**, and a **one-sentence concept** (e.g. "a field notebook", "a 1970s ski lodge").
- **Write the real copy early**, because copy drives layout.
- Copy is part of design. Say concretely what the product does (Stripe: "Financial infrastructure for the internet."). Rewrite each line in the founder's voice and ask "would the CEO actually say it?" A polished layout full of boilerplate text still reads as slop. — [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide)

### 2. Moodboard
- Collect **3–5 references** and write down why each works, covering type, colour, grid, imagery, motion and texture.
- Pick **one named aesthetic** ([table below](#named-aesthetics)) that fits the concept.
- Collect real photography or commission illustration.
- Sources: [assets/inspiration-galleries.md](assets/inspiration-galleries.md), [assets/photos.md](assets/photos.md), [assets/illustrations.md](assets/illustrations.md).

### 3. Wireframe (mobile and desktop together)
- Map the content hierarchy per page.
- Place primary actions in the thumb zone.
- Choose a navigation pattern.
- Decide where the single **"signature moment"** happens: one hero interaction, not ten.
- Detail: [foundations/layout-responsive-mobile.md](foundations/layout-responsive-mobile.md), [components/navigation-structure.md](components/navigation-structure.md).

### 4. Design system
- DTCG tokens: OKLCH primitives → semantic → component.
- Utopia fluid type and space.
- **2–3 radii.**
- A shadow and elevation scale with **one light source**.
- Motion tokens: **150 / 240 / 400ms, ease-out**.
- Grid: **12-col plus breakout**.
- Light and dark themes via `color-scheme` + `light-dark()`.
- Components follow atomic tiers (atoms, molecules, organisms, templates, pages; Brad Frost, bg).
- Detail: [foundations/design-tokens-color-type.md](foundations/design-tokens-color-type.md), [animations/motion-principles-easing.md](animations/motion-principles-easing.md).

### 5. Build
- Write semantic HTML first.
- Organise CSS in layers and build container-queried components.
- Use progressive enhancement: `@supports` for anchor positioning, `@scope` and style queries.
- Add interactivity as islands.
- Serve images from an image CDN, and self-host subset fonts.
- Add Speculation Rules and keep the setup bfcache-safe.
- Detail: [foundations/tech-stacks.md](foundations/tech-stacks.md), [foundations/browser-support-2026.md](foundations/browser-support-2026.md), [foundations/performance.md](foundations/performance.md), [components/README.md](components/README.md).

### 6. Polish ("invisible details")
- Keep animations interruptible and **under 300ms**.
- Don't animate **high-frequency actions**.
- Apply hover only within `(hover:hover)`, and give every focusable element a `:focus-visible` ring.
- Use `text-wrap: balance` on headings and `pretty` on paragraphs.
- Use `font-variant-numeric: tabular-nums` for figures, and turn on optical sizing.
- Tint shadows with the background hue.
- Add a custom `::selection` and set scrollbar colour per theme.
- Keep empty, error and loading states consistent.
- Ship OG images and a favicon set.
- Detail: [animations/micro-interactions.md](animations/micro-interactions.md), [components/feedback-overlays.md](components/feedback-overlays.md).

### 7. QA and launch
- Check CWV in the field: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75 on mobile.
- Run Lighthouse and WebPageTest on a mid-range Android over 4G.
- Run axe in CI with zero criticals, then a keyboard-only pass, VoiceOver and NVDA smoke tests, a 400% zoom reflow check, a reduced-motion pass, and a contrast check in every theme.
- Test on real iOS Safari and Android Chrome devices.
- Check meta and OG tags, `lang`, sitemap, robots, canonical URLs, the 404 page and analytics with consent.
- Set CSP and HSTS headers, and run the Front-End Checklist's Critical and High rules.
- Run the bfcache test and confirm there are no `unload` handlers.
- Full checklist: [foundations/launch-checklist.md](foundations/launch-checklist.md).

### Reference-driven loop for AI-assisted builds (cited)
1. Collect 3–5 references (Dribbble, Mobbin, Awwwards).
2. Write down *why* each works: layout, type, colour.
3. Give that analysis to the builder or LLM.
4. Iterate on named elements, fixing one dimension at a time (e.g. only the typography).

Also request **several design directions**, so the first, most generic one is not the only option. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)

---

## What generic "AI slop" design looks like

"AI slop" is a recognisable **bundle**, not any single choice.

| Area | Tells | Source |
|---|---|---|
| Type | Inter, Roboto or Arial | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) |
| Colour | Purple/indigo accents and gradients on white. Traced to Tailwind's `bg-indigo-500` default; Adam Wathan apologised for it. The gradient is "the safest choice" and appears with no semantic meaning. | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); search summary |
| Layout | A centred hero with one CTA and a three-feature-box icon grid | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) |
| Surfaces | Rounded corners on everything, faint shadows. Uniform sizing: the same radius (**16px**), padding (**24px**) and card height on every element. | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Imagery | Stock or AI illustrations that look "too smooth, too symmetrical, plastic" | [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Copy | Vague headlines ("Build the future of work") and hedging superlatives ("best-in-class", "cutting-edge") | [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Motion | Hover states that do nothing, buttons that snap, and the same fade-in on every element | [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Function | No validation, no error states, weak ARIA and keyboard support | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) |

- **Why it happens:** partly framework defaults, and partly models regressing to the statistical centre of their training data. The "statistical average" explanation is widely repeated but **not independently verified**.
- **Caveat:** these sources are mostly vendor blogs with a commercial interest. None of these choices is bad on its own, and purple can be right for a brand that owns purple. — summarised from search results incl. [925 Studios: AI slop design tells](https://www.925studios.co/blog/ai-slop-design-tells), [capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/), [superdesign.dev](https://www.superdesign.dev/blog/why-ai-design-looks-generic)
- Motion-specific slop, according to note 06, is one fade-up-on-scroll with one ease applied to everything, `transition: all`, `scale(0)` entrances, `ease-in` on UI, and motion that ignores reduced motion. See [animations/motion-principles-easing.md](animations/motion-principles-easing.md).

---

<a id="the-new-cliche-trap"></a>

## The new cliché trap

- When asked to look "less AI", agents tend to produce **warm cream with a terracotta accent**, or **near-black with one acid-green highlight**. Watch for these as a new cliché. — search-results summary ([925 Studios](https://www.925studios.co/blog/ai-slop-design-tells), [capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/), [superdesign.dev](https://www.superdesign.dev/blog/why-ai-design-looks-generic))
- Even with anti-slop prompts (e.g. Anthropic's "frontend aesthetics" cookbook prompt), models re-converge on **second-tier defaults such as Space Grotesk**. The prompt therefore has to ask explicitly for *unexpected* choices. — [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- Note 08 adds that the 2024–25 "escape" fonts (Instrument Serif, Bricolage Grotesque, Geist, Space Grotesk) are now top-100 on Google Fonts. See [assets/fonts.md](assets/fonts.md).
- Note 03 warns that the component registries (Aceternity, Magic UI, 21st.dev) are now on thousands of sites, which makes them the main source of the "template look". Restyle their effects before you ship them.

Editor's note: the defence is to derive each choice from the concept and write down why, rather than from a list of "non-AI" options. If a choice would suit any brand, it is probably a default. The example token skeleton in [design-tokens-color-type.md](foundations/design-tokens-color-type.md) uses a terracotta-ish hue as a placeholder. Replace it.

---

## Techniques for distinctive work

The fix is a **deliberate point of view**: one committed display typeface, a dominant colour with sharp accents, an asymmetric or editorial layout, real imagery, specific copy in a brand voice, and motion that tells the user what changed.

| Area | Technique | Source |
|---|---|---|
| Typography | Avoid Inter, Roboto, Open Sans, Lato and system fonts as the brand voice. Candidates by register: **Editorial** Playfair Display, Crimson Pro, Fraunces, Newsreader. **Startup** Clash Display, Satoshi, Cabinet Grotesk. **Technical** IBM Plex, Source Sans 3, JetBrains Mono, Fira Code. **Warm or modern** Bricolage Grotesque, Obviously. Pair contrasting styles (display + mono, serif + geometric sans). Use extreme weight contrast (100/200 vs 800/900) and big size jumps (3x+). "Pick one distinctive font and use it decisively." | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website) |
| Colour | Use a dominant colour with sharp accents, not "an evenly spread, timid palette". Draw from cultural references (a 1970s ski lodge: burnt orange, avocado, warm browns) or IDE themes. Name tokens semantically (`--color-action-primary`, `--color-feedback-success`), not decoratively (`--color-gradient-start`). | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Layout | Break the centred hero + 3 boxes with asymmetric layouts, split screens, generous negative space, and references such as Japanese print design. Vary radius, padding and card sizes deliberately to build hierarchy, and codify those rules in the design system. | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Backgrounds | Avoid flat solids. Layer gradients, geometric patterns or contextual textures that fit the concept. One guide allows at most one restrained gradient, and never on body headings. | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/) |
| Motion | One well-orchestrated page load with staggered `animation-delay` reveals beats scattered micro-interactions. Prefer CSS-only effects. Put micro-interactions on primary CTAs and form inputs first, and make motion signal state changes. Limit scroll-triggered animation to navigation or storytelling. Match motion character to the brand (precise or playful). | [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website); [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Imagery | Replace stock or AI art with real product screenshots, real team photos, or custom illustration. | [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Copy | Make it concrete and in the founder's voice (see step 1). | [925 Studios](https://www.925studios.co/blog/ai-slop-web-design-guide) |
| Shadows | Use one light source, hue-tinted layered shadows, and a `--shadow-color` token. | [Josh W. Comeau](https://www.joshwcomeau.com/css/designing-shadows/); see [design-tokens-color-type.md](foundations/design-tokens-color-type.md#8-shadows-and-elevation) |

**Refactoring UI heuristics** (Wathan/Schoger; bg, not re-fetched):
- Start with too much whitespace and remove some.
- Build hierarchy with weight and colour, not only size.
- Use fewer borders: separate with spacing and background shifts.
- Define spacing and type scales up front.
- Use greys that are tinted, not pure.
- Offset shadows vertically.
- Labels are a last resort.

Editor's note: a staggered page-load reveal following the motion row above. Values come from the motion tokens; untested. See [animations/motion-principles-easing.md](animations/motion-principles-easing.md) for the full token set.

```css
.reveal { animation: rise 400ms var(--ease-out) both; animation-delay: calc(var(--i, 0) * 60ms); }
@keyframes rise { from { opacity: 0; translate: 0 12px; } }
@media (prefers-reduced-motion: reduce) { .reveal { animation-name: fade; translate: none; } }
@keyframes fade { from { opacity: 0; } }
```
```html
<h1 class="reveal" style="--i:0">…</h1>
<p class="reveal" style="--i:1">…</p>
<a class="reveal btn" style="--i:2" href="#">…</a>
```

---

## Invisible details: interaction craft

**Rauno Freiberg, *Invisible Details of Interaction Design*** — [rauno.me/craft/interaction-design](https://rauno.me/craft/interaction-design)
- Reuse familiar metaphors: a horizontal swipe turns book pages.
- Model physics. Keep momentum and velocity on dismiss, and make motion interruptible (a page flip can be stopped midway). Let material weight vary: a "light" card bounces less.
- Match the trigger to intent. Lightweight actions can fire mid-gesture, destructive ones wait for the gesture to end, and "peek" can snap in but commits only on release.
- Respond immediately. Apply the gesture's scale or movement from the first pixel instead of waiting for a threshold.
- Keep spatial consistency: things open from where they came from, as an app launches from its icon.
- **Animate by frequency and novelty.** Frequent, low-novelty actions (command menus, context menus) are often better without animation. Rauno removed motion from his bookmarking tool after daily use made it feel sluggish.
- Keep obscured content visible: a loupe over the caret, enlarged keys, and a drag that stays active after the finger leaves a small slider.
- Fitts's law: corners and edges act as near-infinite targets, and radial menus put every option at an equal distance.
- Scroll the element under the pointer, and add scroll landmarks or minimaps for orientation.
- Use context as implicit input. Wallet raises brightness to scan a pass, and apps blur sensitive snapshots in the app switcher.

**Emil Kowalski, animation craft** — [emilkowal.ski/ui/great-animations](https://emilkowal.ski/ui/great-animations)
- Keep most UI animations **under 300ms**. A 500ms entrance on a tool opened many times a day feels sluggish.
- Use **ease-out** for snappy feedback and `ease` for a more deliberate, elegant feel (as in the Sonner toasts). Tune by trial and re-check the next day. Springs are defined by stiffness, damping and mass.
- Make animations interruptible. CSS transitions can retarget mid-flight, and Framer Motion supports interruption.
- Don't animate keyboard-initiated actions that users repeat often. Weigh how often an animation will be seen.
- Animate only `transform` and `opacity`. CSS and WAAPI can be hardware-accelerated under main-thread load, but Framer Motion's rAF-driven animations cannot, so they may stutter.
- For reduced motion, swap movement for a gentler effect, such as a 0.2s fade instead of a bounce. In React, `useReducedMotion` lets you zero the x-offset while keeping opacity.

---

## Named aesthetics

Choose an aesthetic from the **concept**, not from a trend list. Then apply it consistently to type, grid, colour, motion and copy. The table is **practitioner synthesis**: the research verified no single source for the list.

| Style | Signature | Fits | Avoid when |
|---|---|---|---|
| Swiss / International | strict grid, flush-left sans (e.g. Neue Haas, Söhne), big numerals, asymmetric whitespace, few colours | agencies, architecture, finance, docs, portfolios | you need warmth or playfulness |
| Editorial / magazine | serif display, multi-column grids, pull quotes, drop caps, captions, real photography | media, long-form, luxury, culture, brand storytelling | dense app UI |
| Brutalism | raw HTML feel, system or mono fonts, visible borders, no polish | art, music, counter-culture, dev tools | trust-critical commerce |
| Neo-brutalism | flat saturated fills, thick black 2–4px borders, hard offset shadows (`4px 4px 0 #000`) | indie SaaS, creator tools, Gen-Z brands | already a trend cliché (Gumroad era); needs a real concept |
| Bento | modular tiles of varied size (Apple keynote style) | feature overviews, dashboards, personal sites | every section; uniform bento is just slop with extra steps |
| Glassmorphism | `backdrop-filter: blur()`, translucency, over vivid backgrounds | sparing overlays and nav on media | text-heavy surfaces; contrast and performance risk on mobile |
| Claymorphism / neumorphism | soft inflated 3D or extruded soft shadows | playful kids or wellness apps, illustration | controls (neumorphism has notoriously poor contrast and affordance) |
| Y2K / retro-futurism | chrome, gradients, pixel and bitmap type, early-web motifs | fashion, music, events, nostalgia campaigns | B2B trust |
| Minimalism | few elements, generous space, one accent | premium products, portfolios | content-heavy sites that need wayfinding |
| Maximalism / anti-design | clashing type, collage, layered motion | culture, fashion, festivals, art | accessibility-critical flows |
| Dark luxury | near-black, warm off-white type, gold or one accent, fine serif, slow fades | hospitality, watches, automotive, fashion | low-light readability or long-form copy |
| Kinetic typography | type as the hero: variable-font axes animated, scroll-linked | launches, agencies, events | it must honour reduced motion and not hide LCP text |
| Organic | blobs, hand-drawn lines, natural textures, earthy palette | food, wellness, sustainability | "meaningless 3D blobs" with no concept are a slop tell |

---

## Recipe: combining the docs

Editor's note: this is the order in which to use the docs for a new site. Each step names the files to read and the decision to record.

| Step | Decide | Read |
|---|---|---|
| 1. Pick aesthetic | Concept sentence, 3 adjectives, one named aesthetic, 3–5 references with reasons | this file; [assets/inspiration-galleries.md](assets/inspiration-galleries.md) |
| 2. Tokens | OKLCH ramp from the concept hue, semantic roles, light/dark, radii, shadow colour, motion tokens | [foundations/design-tokens-color-type.md](foundations/design-tokens-color-type.md) |
| 3. Fonts | One distinctive display face plus a quieter text face, licence checked, loading plan | [assets/fonts.md](assets/fonts.md); [foundations/performance.md](foundations/performance.md#fonts) |
| 4. Layout | Grid (12-col + breakout), breakpoints, mobile nav, thumb zone | [foundations/layout-responsive-mobile.md](foundations/layout-responsive-mobile.md) |
| 5. Stack | Framework and CSS approach | [foundations/tech-stacks.md](foundations/tech-stacks.md) |
| 6. Components | Pick variants per section; one signature component | [components/README.md](components/README.md); [components/component-libraries.md](components/component-libraries.md) |
| 7. Animations | Motion tokens, one orchestrated load, one signature moment, reduced-motion path | [animations/README.md](animations/README.md); [animations/motion-principles-easing.md](animations/motion-principles-easing.md) |
| 8. Assets | Icons, illustration, photos, video, 3D, sound; licences recorded; optimised | [assets/README.md](assets/README.md); [assets/licensing-cheatsheet.md](assets/licensing-cheatsheet.md); [assets/optimization.md](assets/optimization.md) |
| 9. Support check | Fallbacks for newly Baseline or Chromium-only features | [foundations/browser-support-2026.md](foundations/browser-support-2026.md); [animations/browser-support.md](animations/browser-support.md) |
| 10. QA | Performance, a11y, responsive, SEO, motion, licences, cross-browser | [foundations/accessibility.md](foundations/accessibility.md); [foundations/launch-checklist.md](foundations/launch-checklist.md) |

**Worked example (Editor's note, illustrative only):** the concept is "a field notebook" for an outdoor-gear repair shop.
- Aesthetic: editorial with organic texture.
- Tokens: a moss-green hue as the dominant colour with one sharp signal-orange accent, and paper-tinted neutrals. This avoids the cream + terracotta default because the hue comes from the concept.
- Fonts: a serif display face (Fraunces or Newsreader, from the editorial register) used decisively, plus a mono for specs.
- Layout: an asymmetric breakout grid with margin-note captions.
- Components: a typographic repair-log index with image reveal.
- Motion: one staggered page-load reveal, with sketch-line SVG strokes drawing in once.
- Assets: real workshop photography instead of stock.
- QA: run the launch checklist.

---

## Gaps

- No primary, non-vendor academic or industry source quantifies how common the slop pattern is. The evidence is anecdotal or from vendor blogs.
- Refactoring UI, Brad Frost (atomic design), Ahmad Shadeed, Vitaly Friedman, Adam Argyle and Jen Simmons pages were not fetched. Their positions come from background knowledge and should be verified before being quoted.
- The named-aesthetics table is synthesis.
- Award galleries could not be browsed automatically, so collect references manually (see [README](README.md#known-gaps)).

## Sources

- [prg.sh: Why Your AI Keeps Building the Same Purple Gradient Website](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [925 Studios: AI Slop Web Design guide (2026)](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [925 Studios: AI slop design tells](https://www.925studios.co/blog/ai-slop-design-tells) (search result)
- [capitalandcompute.net: Fix AI slop tell by tell](https://capitalandcompute.net/blog/fix-ai-slop-design/) (search result)
- [superdesign.dev: Why AI design looks generic](https://www.superdesign.dev/blog/why-ai-design-looks-generic) (search result)
- [Rauno Freiberg: Invisible Details of Interaction Design](https://rauno.me/craft/interaction-design)
- [Emil Kowalski: Great animations](https://emilkowal.ski/ui/great-animations)
- [Josh W. Comeau: Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- Research notes: `10_craft_responsive_performance_a11y.md` (Q1, Q7). Cross-references come from the takeaways of notes 03, 06 and 08.
