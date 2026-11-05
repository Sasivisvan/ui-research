# Video and Motion Backgrounds

This page lists the stock video and motion-background sources from the research notes, with licences and live/redirect status as of 5 Nov 2026. It then covers how to deliver video efficiently on the web: format ordering, `type` attributes, `poster`, `preload`, autoplay rules, and replacing GIFs with video using ffmpeg. The biggest licence change is that **Coverr dropped CC0 and now bans AI training**. Videvo and Mazwai both now redirect to Freepik Videos. A consolidated desktop vs mobile summary is in [optimization.md](optimization.md).

## Contents

- [1. Video sources](#1-video-sources)
- [2. Delivering video on the web](#2-delivering-video-on-the-web)
- [3. Replacing GIFs with video](#3-replacing-gifs-with-video)
- [4. Autoplay policy](#4-autoplay-policy)
- [5. Background and hero video recipe](#5-background-and-hero-video-recipe)
- [6. Gaps](#6-gaps)
- [Sources](#sources)

## 1. Video sources

| Source | What it offers | Licence (exact name) | Attr | Commercial | Restrictions | Status |
|---|---|---|---|---|---|---|
| [Coverr](https://coverr.co/license) | Stock video, AI and API. "Everything Coverr publishes is free for commercial and personal projects." | Custom Coverr licence, page titled **"Coverr License — Full Terms for Stock, AI & API (2026)"**. **"Started as CC0" but has since changed its terms** | **Not required for website downloads** on any plan. **Free Demo API apps must credit Coverr and the creator** | Yes | Banned: selling or uploading raw files or packs, including to other stock sites. **"Nothing from Coverr may be used to train, fine-tune, distill or evaluate AI models".** Banned: building a competing stock or AI service, or Content ID claims. The **Plus** tier unlocks premium items and watermark-free downloads. **Watermarked previews are not licensed** | Live. **Licence changed** |
| [Mixkit](https://mixkit.co/license/) (Envato) | Stock video, music, SFX, video templates, art | Six licences: **Stock Video Free License**, **Stock Video Restricted License**, **Stock Music Free License**, **Sound Effects Free License**, **Video Templates Free License**, **Art Free License** | Free licences: no (secondary) | Free licences: yes. **Restricted licence videos: personal, non-commercial use only** | The /license/ page lists names only. Terms come from secondary sources ([Morphic explainer](https://morphic.com/resources/how-to/sound-effects-licensing-explained); [University of Newcastle list](https://www.newcastle.edu.au/__data/assets/pdf_file/0007/875995/Suggested-sound-effects-sites.pdf)). Mixkit's /llm-info/ page contains instructions aimed at AI assistants; it was treated as promotional and not used as a source | Live |
| Videvo | Was a free and premium stock video site | n/a (now Freepik terms) | n/a | n/a | Freepik Company acquired Videvo in 2022 ([Freepik newsroom](https://www.freepikcompany.com/newsroom/freepik-company-enters-video-audio-categories-with-acquisition-of-uk-videvo/)) | **Redirected:** `curl -I https://www.videvo.net` → `301 location: https://www.freepik.com/videos` (5 Nov 2026) |
| Mazwai | Was free art-house video clips | Historically two licences, set per clip: the **Mazwai License** (commercial, no credit, no redistribution as stock) and **Creative Commons 3.0** (attribution required) ([license-details (search snapshot)](https://mazwai.com/license-details)) | Per clip (CC 3.0 clips: yes) | Per clip | Per clip | **Redirected:** `curl -I https://mazwai.com` → `301 → https://www.freepik.com/videos` (5 Nov 2026) |
| Pexels Video | Free stock video | Same Pexels licence as photos (licence page 403; see [photos.md](photos.md)) | No (secondary) | Yes | AI/ML dataset collection via the API needs explicit permission. No selling unmodified copies (secondary) | Live; licence page unverified |
| Pixabay Video | Free stock video | **Pixabay Content License** (covers "video, audio and other media") ([summary](https://pixabay.com/service/license-summary/)) | No | Yes | No standalone sale or distribution. Trademark, merchandise and deceptive-use bans (see [photos.md](photos.md)) | Live |
| [ISO Republic](https://isorepublic.com/license/) | Photos and video | **CC0** | No | Yes | None | Live |
| Life of Vids (lifeofvids.com) | Free video | Not verified | n/a | n/a | n/a | **Connection failure from the research environment.** Status not verified |
| [Death to Stock](https://www.deathtothestockphoto.com/) | "Authentic Stock Photos & Video Membership". Paid | Not verified (/license 404) | n/a | n/a | n/a | Live |

**Tiering (inference in notes):**

- **CC0:** ISO Republic.
- **Custom free, no credit:** Coverr, Mixkit free licences, Pexels, Pixabay.
- **Per clip:** Mazwai's CC 3.0 clips (historic).
- **Avoid for commercial use:** **Mixkit "Restricted" video**.

## 2. Delivering video on the web

Source: [web.dev: video and source tags](https://web.dev/articles/video-and-source-tags).

- **Format order.** Use multiple `<source>` children in preference order. The browser plays the **first** format it supports; it does not pick the most efficient one.
- **`type` attributes.** Always include `type`, so the browser can skip unsupported files without partially downloading them. The server must send correct MIME types.
- **Poster.** Add an optimised `poster`, which costs an extra request.
- **`preload`.** The values are `none`, `metadata` and `auto`, and the attribute is only a hint. **Chrome buffers about 25 s on desktop but none on iOS or Android**, so mobile start may be slower.
- **Media fragments.** `#t=start,end` needs range requests (`Accept-Ranges: bytes`).
- **Autoplay cost.** Consider data cost, CPU and intrusiveness before autoplaying.
- **Layout.** Use `max-width: 100%`, preserve the aspect ratio, and use responsive wrappers for iframes.

| Concern | Desktop | Mobile |
|---|---|---|
| `preload` buffering (Chrome) | About 25 s buffered | **None** on iOS/Android, so start can be slower |
| Poster | Optimised poster image | Optimised poster image. It is also the fallback for reduced motion and data saving (inference, §5) |

## 3. Replacing GIFs with video

Source: [web.dev: Replace GIFs with videos](https://web.dev/articles/replace-gifs-with-videos). An example **3.7 MB GIF became a 551 KB MP4 or a 341 KB WebM**.

```bash
# MP4 (H.264)
ffmpeg -i in.gif -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p out.mp4
# add for odd dimensions:
#   -vf "crop=trunc(iw/2)*2:trunc(ih/2)*2"

# WebM (VP9)
ffmpeg -i in.gif -c vp9 -b:v 0 -crf 41 out.webm
```

Markup: use `<video autoplay loop muted playsinline>` and list **WebM first**.

```html
<video autoplay loop muted playsinline poster="clip-poster.jpg">
  <source src="clip.webm" type="video/webm">
  <source src="clip.mp4"  type="video/mp4">
</video>
```

## 4. Autoplay policy

Source: [Chrome autoplay policy](https://developer.chrome.com/blog/autoplay).

**Muted autoplay is always allowed in Chrome.** Autoplay with sound is allowed only when one of these holds:

- the user has interacted with the site;
- on desktop, the Media Engagement Index threshold is met (more than 7 s of unmuted playback in an active tab, video larger than 200×140);
- on mobile, the site was added to the home screen, or on desktop, the PWA is installed;
- a top-level frame delegated autoplay permission to an iframe.

The audio-side rules (AudioContext suspension) are in [sound.md](sound.md).

## 5. Background and hero video recipe

This recipe is an inference in the notes. The AV1 ordering and the Save-Data/reduced-motion advice are inference, not from the fetched pages.

| Setting | Desktop | Mobile |
|---|---|---|
| Length | 5–15 s | 5–15 s |
| Audio | Muted | Muted |
| Resolution | 1080p | 720p |
| Formats (in order) | AV1 or VP9 WebM, then H.264 MP4 fallback | Same |
| Poster | Yes | Yes |
| `preload` | `none` or `metadata` | `none` or `metadata` |
| Reduced motion / Save-Data / small screens | Consider swapping in a static poster | Swap to a static poster via `<source media>` or JS |

## 6. Gaps

- Life of Vids had a connection failure from the research environment, so its status was not verified.
- Pexels Video and Pixabay Video licence specifics were not fetched.
- Mixkit per-licence full text: the /license/ page lists names only, and the terms come from secondary sources.
- MDN's `<video>`/autoplay pages were not fetched. AV1 video browser support (caniuse) was not verified this session.
- No cited source was consulted on Save-Data or `prefers-reduced-motion` handling for video.

## Sources

- Coverr License: https://coverr.co/license
- Mixkit License: https://mixkit.co/license/ · Morphic explainer: https://morphic.com/resources/how-to/sound-effects-licensing-explained · University of Newcastle list: https://www.newcastle.edu.au/__data/assets/pdf_file/0007/875995/Suggested-sound-effects-sites.pdf
- Freepik Company newsroom (Videvo acquisition): https://www.freepikcompany.com/newsroom/freepik-company-enters-video-audio-categories-with-acquisition-of-uk-videvo/
- Mazwai license-details: https://mazwai.com/license-details
- Pixabay Content License Summary: https://pixabay.com/service/license-summary/
- ISO Republic License: https://isorepublic.com/license/
- Death to Stock: https://www.deathtothestockphoto.com/
- web.dev, video and source tags: https://web.dev/articles/video-and-source-tags
- web.dev, Replace GIFs with videos: https://web.dev/articles/replace-gifs-with-videos
- Chrome autoplay policy: https://developer.chrome.com/blog/autoplay
