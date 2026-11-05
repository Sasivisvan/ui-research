# Sound: SFX and UI Sound Sources, Libraries, Autoplay and UX

This page covers sound for websites. It lists sound-effect and UI-sound sources with their licences, as of 5 Nov 2026, flagging the per-file licence traps that most often cause accidental CC BY-NC or attribution violations. It also covers the libraries for playing UI sounds (use-sound, Howler.js, the Web Audio API, Tone.js), browser autoplay and AudioContext rules, and UX and accessibility guidance. Key traps:

- **Freesound** licences are per file (CC0 / CC BY / CC BY-NC / Sampling+).
- **BBC Sound Effects (RemArc)** is non-commercial.
- **Sonniss** bans AI/ML training.
- **Zapsplat free** requires credit.

## Contents

- [1. Sound sources](#1-sound-sources)
- [2. Per-file licence gotchas](#2-per-file-licence-gotchas)
- [3. Playback libraries](#3-playback-libraries)
- [4. Autoplay and AudioContext policy](#4-autoplay-and-audiocontext-policy)
- [5. UI sound UX and accessibility](#5-ui-sound-ux-and-accessibility)
- [6. Gaps](#6-gaps)
- [Sources](#sources)

## 1. Sound sources

| Source | What it offers | Licence (exact) | Attr | Commercial | Restrictions | Status |
|---|---|---|---|---|---|---|
| [Freesound](https://freesound.org/help/faq/) | Community sound library | **Per file:** **CC0** ("Creative Commons 0"), **Attribution (CC BY 4.0)**, **Attribution Noncommercial (CC BY-NC 4.0)**, legacy **Sampling+ 1.0** (retired by CC) | CC BY and CC BY-NC: yes | CC0 / CC BY: yes. **CC BY-NC: "can't earn any money with the piece of work you create!"** **Sampling+: not in commercial advertising** | Remix restrictions follow the original licence | Live |
| [Zapsplat](https://www.zapsplat.com/faq-category/license-and-usage/) | Large SFX library | Standard License ([search result](https://zapsplat.com/license-type/standard-license/)). **Some sounds are CC0 1.0** for all members | **Basic (free) users must credit "ZapSplat"** wherever reasonably possible. Gold/Premium (a donation-style subscription) removes attribution **for life** for sounds downloaded while subscribed | Yes | n/a | Live. **Direct fetch returned 403**; terms from search snippets |
| [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk) | BBC archive SFX (33,000+ per the press coverage cited) | **RemArc licence** ("Reminiscence Archive") | n/a | **No.** Free for personal, educational and research use only. Commercial use needs a separate paid licence; historically the whole BBC library has been licensable via Pro Sound Effects | Cannot be used in music you plan to sell. Research use reportedly **excludes AI training and data mining** (single secondary report) | Live. **Official licensing page not fetched; secondary sources** ([MusicTech](https://musictech.com/news/music/the-bbc-sound-effects-archive-over-33000-free-samples); [DIYPhotography](https://www.diyphotography.net/the-bbc-sound-effects-archive-is-now-free-to-download-with-over-33000-files/)) |
| [Sonniss #GameAudioGDC](https://sonniss.com/gameaudiogdc/) | Yearly giveaway bundles 2015–2024, ~**207 GB across 73 zip parts** | Royalty-free | **No attribution required** | Yes, for lifetime and unlimited projects, for media production (games, film, TV, apps) | No resale or redistribution of the files themselves, edited or not. **AI/ML training "strictly prohibited"**. **"There was no GDC 2025 bundle"**; its content went into the GDC 2026 bundle at gdc.sonniss.com | Live |
| [Kenney UI Audio](https://kenney.nl/assets/ui-audio) | UI audio pack, **50 files** | **"Creative Commons CC0"** (also [Calinou/kenney-ui-audio GitHub, CC0 1.0 Universal](https://gh.r-mj.com/Calinou/kenney-ui-audio); [OpenGameArt Interface Sounds](https://opengameart.org/content/interface-sounds), CC0, uploader Kenney) | No | Yes | None | **kenney.nl timed out from the research environment** (likely a sandbox issue, not a shutdown) |
| [SoundBible](https://soundbible.com/about.php) | Free and premium sounds | **Mixed.** Commercial use only if under "Creative Commons Attribution, or Public Domain License". Paid "Royalty Free Premium Sounds" section | CC BY items: yes | Only CC BY / Public Domain items | Per sound | Live |
| [Mixkit SFX](https://mixkit.co/license/) | Sound effects | **Sound Effects Free License** | No (secondary) | Yes (secondary) | You may not register them, claim them, or redistribute without significant changes ([Morphic, secondary](https://morphic.com/resources/how-to/sound-effects-licensing-explained)) | Live |
| [Pixabay Sound Effects](https://pixabay.com/service/license-summary/) | SFX and music | **Pixabay Content License** | No | Yes | No standalone sale or distribution. Trademark and deceptive-use bans (see [photos.md](photos.md)) | Live |
| [Material Design sound resources](https://m2.material.io/design/sound/sound-resources.html) | Google UI sounds | **No confirmed licence found. Do not assert CC BY 4.0 without checking** | Unknown | Unknown | Unknown | The URL redirects to m2.material.io and loads (200), but the content is JS-rendered and could not be read |
| UI Sounds (uisounds.prototypr.io) | UI sound collection | Not verified | n/a | n/a | n/a | **Timed out from the research environment** |
| [OpenGameArt](https://opengameart.org/content/interface-sounds) | Game assets including audio | **Per asset:** CC0, CC BY, CC BY-SA, GPL and others. Example: Kenney's "Interface Sounds" is "License(s): CC0" | Per asset | Per asset | Per asset | **Homepage timed out from the research environment** |
| itch.io UI packs | Indie UI sound packs | **Often CC BY 4.0.** Example: "Crisp UI Sounds Free by Anipixels" ([Godot Asset Library](https://godotengine.org/asset-library/asset/5549)) | **Yes** (CC BY) | Yes | Per pack | Live |
| Openverse audio | Audio search, filterable by category including sound effects | **Per item:** cc0, pdm, by, by-sa, by-nc, by-nd, by-nc-sa, by-nc-nd ([Smart Copying](https://smartcopying.edu.au/?p=852)) | Per item | Filterable | Per item | Bot check from the research environment |
| [snd-lib](https://www.npmjs.com/package/snd-lib) (SND UI sound kit) | npm UI sound kit | Not verified | n/a | n/a | n/a | npm package exists; **snd.dev timed out** |

## 2. Per-file licence gotchas

**Tiering (inference in notes):**

| Tier | Sources |
|---|---|
| **CC0, no strings** | Kenney audio |
| **Custom free, no credit (with no-resale or AI clauses)** | Mixkit SFX free licence, Pixabay SFX, **Sonniss (no AI training)** |
| **Per file, check every asset** | Freesound, SoundBible, OpenGameArt, Openverse |
| **Credit required** | Zapsplat Basic (free), itch.io CC BY packs, Freesound CC BY files |
| **Avoid for commercial use** | **BBC RemArc sounds**, **Freesound CC BY-NC and Sampling+** |

**Freesound attribution format** ([FAQ](https://freesound.org/help/faq/)):

```
"sound1" by user1 (http://freesound.org/s/soundID/) licensed under CC BY-NC 4.0
```

- For long lists, link to a credits page.
- Your downloaded sounds appear on your Freesound "attribution list" page, which helps you build the credits.

## 3. Playback libraries

| Library | What it is | Size / behaviour | Licence | Status |
|---|---|---|---|---|
| [use-sound](https://github.com/joshwcomeau/use-sound) | React hook wrapping Howler.js. "Semi-maintained" | Adds **under 1 kB gzipped** to the bundle, plus about **10 kB (around 9 kB gzipped)** of Howler loaded asynchronously after load. **Sounds triggered before the library loads are silently skipped** | MIT | Live |
| [Howler.js](https://howlerjs.com/) | "JavaScript audio library for the modern web" | n/a | n/a | Live |
| [Web Audio API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | Native browser audio API | n/a | n/a | Live |
| [Tone.js](https://tonejs.github.io/) | Web Audio framework for interactive music | n/a | n/a | Live |
| [snd-lib](https://www.npmjs.com/package/snd-lib) | SND UI sound kit | n/a | n/a | npm exists; snd.dev timed out |

**use-sound options:**

| Option | Effect |
|---|---|
| `volume` | 0–1 |
| `playbackRate` | 0.5–4; changes pitch |
| `interrupt` | Stops the previous play when re-triggered |
| `soundEnabled` | Global mute. Can be overridden per call with `forceSoundEnabled` |
| `sprite` | Audio sprite support: many sounds in one file |

> Editor's note: a typical wiring using only the options above.
> ```tsx
> import useSound from "use-sound";
> const [play] = useSound("/sfx/ui-sprite.mp3", {
>   volume: 0.35,
>   soundEnabled,                    // from a persisted user setting
>   sprite: { click: [0, 120], success: [200, 450] },
> });
> <button onClick={() => play({ id: "click" })}>Save</button>
> ```

## 4. Autoplay and AudioContext policy

Source: [Chrome autoplay policy](https://developer.chrome.com/blog/autoplay).

- **Muted autoplay is always allowed** in Chrome.
- Autoplay with sound is allowed only when one of these holds:
  - the user has interacted with the site;
  - on desktop, the Media Engagement Index threshold is met (more than 7 s of unmuted playback in an active tab, video larger than 200×140);
  - on mobile, the site was added to the home screen, or on desktop, the PWA is installed;
  - a top-level frame delegated autoplay permission to an iframe.
- **Since Chrome 71, an AudioContext created before a user gesture starts `suspended`.** Call `resume()` after a click, and check `AudioContext.state`.

## 5. UI sound UX and accessibility

These points are inferred in the notes from the autoplay policy and the use-sound design. No WCAG-specific source was fetched.

- Sound should be **opt-in or easily mutable**, with a global mute (use-sound's `soundEnabled`).
- **Persist** the user's mute choice.
- **Never convey information by sound alone.**
- Keep sounds **short and quiet** (volume around **0.25–0.5**).
- Respect autoplay rules by **only playing after a gesture**.
- **Lazy-load** the audio library and sprite (use-sound already does this).

Delivery notes for audio on desktop and mobile are in [optimization.md](optimization.md#audio).

## 6. Gaps

- The BBC RemArc licence text was not directly accessible, so the findings rely on press coverage. The claim that research use excludes AI training comes from a single secondary report.
- Mixkit per-licence full text: the /license/ page lists names only, and the terms come from secondary sources.
- The Material Design sound resources page is JS-rendered, and no official licence was found in search. Do not assert CC BY 4.0 without checking.
- kenney.nl, opengameart.org and uisounds.prototypr.io timed out from the research environment. This is likely a network or sandbox issue, not a confirmed shutdown, and needs verification in a browser.
- Zapsplat pricing was not verified.
- WCAG guidance for audio (SC 1.4.2 Audio Control) was not consulted. Add it if authoritative backing is needed.

## Sources

- Freesound FAQ: https://freesound.org/help/faq/
- Zapsplat Standard License: https://zapsplat.com/license-type/standard-license/ · FAQ: https://www.zapsplat.com/faq-category/license-and-usage/
- BBC Sound Effects: https://sound-effects.bbcrewind.co.uk · MusicTech: https://musictech.com/news/music/the-bbc-sound-effects-archive-over-33000-free-samples · DIYPhotography: https://www.diyphotography.net/the-bbc-sound-effects-archive-is-now-free-to-download-with-over-33000-files/
- Sonniss GameAudioGDC: https://sonniss.com/gameaudiogdc/
- Kenney UI Audio: https://kenney.nl/assets/ui-audio · Calinou/kenney-ui-audio: https://gh.r-mj.com/Calinou/kenney-ui-audio · OpenGameArt Interface Sounds: https://opengameart.org/content/interface-sounds
- SoundBible About: https://soundbible.com/about.php
- Mixkit License: https://mixkit.co/license/ · Morphic explainer: https://morphic.com/resources/how-to/sound-effects-licensing-explained
- Pixabay Content License Summary: https://pixabay.com/service/license-summary/
- Material Design sound resources: https://m2.material.io/design/sound/sound-resources.html
- Godot Asset Library, Crisp UI Sounds: https://godotengine.org/asset-library/asset/5549
- Openverse (Smart Copying): https://smartcopying.edu.au/?p=852
- snd-lib: https://www.npmjs.com/package/snd-lib
- use-sound: https://github.com/joshwcomeau/use-sound
- Howler.js: https://howlerjs.com/ · MDN Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API · Tone.js: https://tonejs.github.io/
- Chrome autoplay policy: https://developer.chrome.com/blog/autoplay
