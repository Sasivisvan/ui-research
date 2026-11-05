# Media, 3D, Sound, Mockup, Design-Utility and Inspiration Resources for Websites (status as of 5 Nov 2026)

Method note for the report writer: I checked liveness and redirects for about 170 URLs with `curl -L` on 5 Nov 2026, and they are cited as the URL itself. I read licence terms from official licence pages wherever a fetch succeeded. Some official pages blocked automated access, returning 403/429 bot checks: Unsplash home, Pexels, Pixabay home, Openverse, Met, Smithsonian, Adobe Stock, Stocksy, Fab, TurboSquid, Behance, Coolors, SVG Backgrounds and tints.dev. Some others timed out from this environment: kenney.nl, quaternius.com, opengameart.org, uisounds.prototypr.io, lifeofvids.com, realtimecolors.com and ui.glass. A blocked or timed-out site is **not** evidence that it shut down, and these cases are flagged. "Quality note" lines are my editorial judgement, not cited facts. They are labelled "(editorial)".

---

## Q1. Which sources are high-quality and licence-safe for commercial websites, and what are the gotchas?

### Takeaway
For commercial sites the safest no-attribution sources are true CC0 libraries: Poly Haven, ambientCG, StockSnap, ISO Republic, Nappy, Kenney, Quaternius, and Met/Smithsonian Open Access. Next come "custom free" licences such as the Unsplash License, Pexels, Pixabay Content License, Mixkit, Barnimages, Gratisography, Kaboompics Standard and Burst. These allow commercial use without credit but ban standalone resale, redistribution to competing stock sites, and sometimes AI or template use. The big 2025–26 changes:
- **Reshot** retired in Jan 2026.
- **Videvo and Mazwai** now 301-redirect to Freepik Videos.
- **Burst** moved to shopify.com/stock-photos.
- **Coverr** dropped CC0 and now bans AI training.
- **Godly** redirects to recent.design.
- **Anthony Boyd Graphics** became Minimal Mockups.
- **Screely** shows a parked "Domain Default page".
- **Sonniss** skipped its GDC 2025 bundle.
- **Sketchfab** free licences other than CC BY did not migrate to Fab.

Per-file licences (Freesound, Sketchfab, Poly Pizza, Wikimedia Commons, Openverse, SoundBible, Mazwai's CC 3.0 clips) are the main source of accidental CC-BY-NC or attribution violations.

### Cited Findings

#### (1) Photos: free

- **Unsplash** (https://unsplash.com/license). The licence page is titled "License", commonly called the Unsplash License.
  - Free for commercial and non-commercial use, with no permission needed.
  - Attribution is not required but is appreciated.
  - Selling images is not permitted unless they are significantly modified.
  - The licence "does not include the right to compile images from Unsplash to replicate a similar or competing service".
  - The page does not mention AI training, trademarks or model releases. — [Unsplash License](https://unsplash.com/license)
  - **Unsplash+** has a separate "Unsplash+ License". It is subscription-based: download once, then unlimited perpetual use, commercial use allowed, no credit needed.
  - Unsplash+ bans compiling images into a competing service and reselling them in original form.
  - It bans sensitive-topic use unless you add a disclaimer such as "image shows a model".
  - It forbids use "in digital templates, machine learning, AI, or biometric tracking".
  - Unsplash+ offers a legal guarantee of up to US$10,000 per photo. **Gotcha:** Unsplash+ images appear inside normal Unsplash search, so check which licence applies before you use one in a template or AI pipeline. — [Unsplash+ License](https://unsplash.com/plus/license)
- **Pexels** (https://www.pexels.com). Homepage title on 5 Nov 2026: "Free Stock Photos, Royalty Free Stock Images & Copyright Free Pictures · Pexels" ([pexels.com](https://www.pexels.com/)). The official licence page (pexels.com/license) returned HTTP 403 to my fetch, so I could not quote it directly.
  - Pexels' help centre says that using its API to collect photos, videos or metadata at scale for ML/AI training or dataset building requires explicit permission from Pexels. — [Pexels Help Center (search result)](https://help.pexels.com/hc/de-de/articles/27292485713945)
  - The 2024 terms update covers Pexels' own right to redistribute uploaded content, including via API. — [Pexels Terms Policy Update 2024](https://help.pexels.com/hc/en-us/articles/22114560160409-Terms-Policy-Update-2024)
  - Third-party summaries say you cannot sell unmodified copies or redistribute them on competing stock platforms. This is secondary: [licenseorg.com comparison](https://licenseorg.com/compare/pexels-vs-shutterstock).
- **Pixabay** (https://pixabay.com/service/license-summary/). The page is titled "Content License Summary" and refers to "our Content License". Only the full licence in the Terms of Service is binding.
  - Allowed: free use, no attribution, modification.
  - Prohibited: selling or distributing Content "on a Standalone basis", digitally or physically.
  - Prohibited: using Content with recognisable trademarks or brands commercially in relation to goods and services, or printing it on merchandise for sale.
  - Prohibited: using Content as part of a trade mark, design mark, trade name, business name or service mark.
  - Prohibited: immoral, illegal, misleading or deceptive use, especially with recognisable people.
  - The Content License covers "video, audio and other media", including Pixabay sound effects and music.
  - The summary does not mention AI training. — [Pixabay Content License Summary](https://pixabay.com/service/license-summary/)
- **Burst (Shopify).** burst.shopify.com now 301-redirects to https://www.shopify.com/stock-photos/, titled "20,000+ Free Stock Photos and Royalty-Free Images" (curl, 5 Nov 2026).
  - "All our photos are free for commercial use with no attribution required."
  - Allowed: crop, add text or filters, use on products such as t-shirts and mugs, use in offline marketing. The page refers to "Free Photo Terms" for full conditions. — [Shopify Stock Photos (Burst)](https://www.shopify.com/stock-photos/)
  - A third-party listing says Burst is in "maintenance mode" with no new submissions. This is secondary: [FitGap](https://us.fitgap.com/products/burst-by-shopify).
- **StockSnap.io**: "StockSnap's CC0 License". Every image is "governed exclusively by the generous terms of the Creative Commons CC0 license". — [StockSnap License](https://stocksnap.io/license)
- **Kaboompics** has two licence types: **Standard License**, which is worldwide, irrevocable, non-exclusive, commercial and needs no credit, and **"Editorial Use Only"**, for images with recognisable trademarks or branded products, which must not be used in advertising, packaging or brand marketing.
  - You may not redistribute unmodified photos on other stock or wallpaper platforms. — [Kaboompics Terms of Use](https://kaboompics.com/page/terms-of-use); [Kaboompics blog](https://blog.kaboompics.com/free-stock-photos-with-no-attribution-required/). kaboompics.com/license returned 404; the current page is /page/license-and-faq.
- **Reshot: RETIRED.** reshot.com 301-redirects to Envato's "Reshot retiring" page (curl, 5 Nov 2026).
  - Reshot was scheduled to retire in January 2026, after which assets are no longer downloadable.
  - Assets downloaded before shutdown keep the free commercial licence originally granted.
  - Envato points users to an Envato subscription or Envato GraphicsGen (AI). — [Envato: Reshot retiring](https://elements.envato.com/learn/reshot-retiring)
- **Gratisography** has a custom licence.
  - Allowed: personal and commercial projects, modification, advertising, and merchandise "as long as the picture itself is not the merchandise".
  - Not allowed: redistributing the images, including on other stock sites or apps, claiming them as your own, or implying endorsement.
  - Gratisography makes no warranty on third-party rights.
  - The site now has an "AI Generated" collection alongside its photos. — [Gratisography License](https://gratisography.com/license/)
- **Picjumbo** is live ([picjumbo.com](https://picjumbo.com/)) and includes "picjumbo AI Pics" / "AI Images" categories. picjumbo.com/license/ returned 404, so I could not verify current licence wording (see Gaps).
- **ISO Republic** uses a CC0 licence: "All photo and video downloads on ISORepublic.com are free for both personal and commercial use and come with a CC0 license". It covers photos **and video**. — [ISO Republic License](https://isorepublic.com/license/)
- **Life of Pix** is live ([lifeofpix.com](https://www.lifeofpix.com/)). Its licence page is rendered by JavaScript and I could not read it (see Gaps).
- **Barnimages** is explicitly **not** CC0. It uses its own licence: "a worldwide, perpetual, non-exclusive, non-transferable license", free, no attribution, commercial use allowed, copyright stays with the photographer. Some uses are restricted and need contact for terms. — [Barnimages License](https://barnimages.com/license/)
- **Nappy** (by SHADE) uses CC0: "All photos posted on Nappy are licensed under the Creative Commons Zero (CC0) license". Its terms ask that photos not be used to "degrade or insult its subjects". It focuses on photos of Black and Brown people. — [Nappy License](https://nappy.co/license)
- **Wikimedia Commons** is live ([commons.wikimedia.org](https://commons.wikimedia.org/wiki/Main_Page)). Licences are per file (CC0, PD, CC BY, CC BY-SA and others). I did not fetch the licensing policy page (see Gaps).
- **Openverse** (openverse.org) returned a bot check. Its UI lets you filter to commercial-use-allowed and modification-allowed content. License codes include cc0, pdm, by, by-sa, by-nc, by-nd, by-nc-sa and by-nc-nd. It covers images and audio, and audio can be filtered by category, including sound effects. — [Smart Copying guide](https://smartcopying.edu.au/?p=852); [Apify Openverse scraper docs (secondary)](https://apify.com/logiover/openverse-scraper)
- **Rawpixel Public Domain** is live ([rawpixel.com/category/53/public-domain](https://www.rawpixel.com/category/53/public-domain)). Its licence page returned 403, so its exact licence terms are unverified (see Gaps).
- **The Met Open Access**: since February 2017 the Met has released 375,000+ images of public-domain works, marked with a CC0 icon, with no permission needed, including for commercial use. In-copyright works are excluded. — [Met Image and Data Resources](https://www.metmuseum.org/en/policies/image-resources); [Hyperallergic](https://hyperallergic.com/357004/metropolitan-museum-gives-unrestricted-access-to-375000-images/)
- **Smithsonian Open Access** releases nearly 3 million (some sources say 2.8 million) 2D/3D assets under CC0, reusable commercially without permission or attribution. — [The History Blog](https://www.thehistoryblog.com/?p=57989)
- **Rijksmuseum**: the data page says services are "guided by the Rijksmuseum's progressive Open Data policy". It links to data.rijksmuseum.nl and its "Information and Data Policy". — [Rijksmuseum Data](https://www.rijksmuseum.nl/en/research/conduct-research/data)
- **NASA Images** (https://images.nasa.gov, live).
  - NASA material is generally not copyrighted unless noted.
  - The insignia, logotype and seal are protected by law and need prior written approval.
  - Uses may not "explicitly or implicitly convey NASA's endorsement of commercial goods or services".
  - Identifiable people may raise publicity rights issues.
  - Merchandise falls under separate Merchandise Guidelines. — [NASA Brand Center – Images and Media](https://nasa.gov/nasa-brand-center/images-and-media); [JPL copyrights](https://jpl.nasa.gov/copyrights.php)
- **EyeEm** is shutting down on 16 Jan 2026 (reported via PetaPixel). — [AI-AP industry news](https://www.ai-ap.com/publications/article/36047/industry-news-eyeem-is-shutting-down.html)

#### (1) Photos: paid
- **Death to Stock** is live, titled "Authentic Stock Photos & Video Membership | Death to Stock" ([deathtothestockphoto.com](https://www.deathtothestockphoto.com/)). It is a paid membership. Its /license URL returned 404, so the licence was not verified.
- **Stocksy** and **Adobe Stock** (stock.adobe.com/free) both returned bot checks (403). Their licence terms were not verified in this session (see Gaps).

#### (2) Video and motion backgrounds
- **Coverr** has a custom licence with **changed terms**. The page is titled "Coverr License — Full Terms for Stock, AI & API (2026)" and says Coverr "started as CC0" but has since changed its terms.
  - "Everything Coverr publishes is free for commercial and personal projects."
  - Attribution is not required for website downloads on any plan. Free Demo API apps must credit Coverr and the creator.
  - Banned: selling or uploading raw files or packs, including to other stock sites.
  - Banned: "Nothing from Coverr may be used to train, fine-tune, distill or evaluate AI models".
  - Banned: building a competing stock or AI service, or Content ID claims.
  - The Plus tier unlocks premium items and watermark-free downloads, and watermarked previews are not licensed. — [Coverr License](https://coverr.co/license)
- **Mixkit** (Envato) has six licences: Stock Video Free License, **Stock Video Restricted License**, Stock Music Free License, Sound Effects Free License, Video Templates Free License and Art Free License. — [Mixkit License](https://mixkit.co/license/)
  - Sound effects are reported as free for commercial use with no attribution, but you may not register them, claim them, or redistribute without significant changes.
  - Videos under the **Restricted** licence are limited to personal, non-commercial use. — [Morphic licensing explainer (secondary)](https://morphic.com/resources/how-to/sound-effects-licensing-explained); [University of Newcastle list](https://www.newcastle.edu.au/__data/assets/pdf_file/0007/875995/Suggested-sound-effects-sites.pdf)
  - Mixkit's own /llm-info/ page contains instructions aimed at AI assistants. I treated it as promotional and did not use it as a source.
- **Videvo: now redirects to Freepik.** `curl -I https://www.videvo.net` returned `301 location: https://www.freepik.com/videos` on 5 Nov 2026. Freepik Company acquired Videvo in 2022. — [Freepik Company newsroom](https://www.freepikcompany.com/newsroom/freepik-company-enters-video-audio-categories-with-acquisition-of-uk-videvo/)
- **Mazwai: now redirects to Freepik.** `curl -I https://mazwai.com` also returned `301 → https://www.freepik.com/videos` on 5 Nov 2026.
  - Historically it had two licences, the **Mazwai License** (commercial, no credit, no redistribution as stock) and **Creative Commons 3.0** (attribution required), set per clip. — [Mazwai license-details (search snapshot)](https://mazwai.com/license-details)
- **Pexels Video / Pixabay Video** fall under the same Pexels licence and Pixabay Content License as their photos, which covers video and audio. — [Pixabay Content License Summary](https://pixabay.com/service/license-summary/)
- **ISO Republic** video is CC0 (see above). — [ISO Republic License](https://isorepublic.com/license/)
- **Life of Vids** (lifeofvids.com) had a connection failure from this environment, so its status was not verified (see Gaps).

#### (3) Sound effects and UI sounds
- **Freesound** licences are set **per file**. — [Freesound FAQ](https://freesound.org/help/faq/)
  - Licence types are **CC0** ("Creative Commons 0"), **Attribution (CC BY 4.0)**, **Attribution Noncommercial (CC BY-NC 4.0)**, and legacy **Sampling+ 1.0**, which CC has retired.
  - CC BY-NC: "can't earn any money with the piece of work you create!" Sampling+ cannot be used in commercial advertising.
  - Attribution format: `"sound1" by user1 (http://freesound.org/s/soundID/) licensed under CC BY-NC 4.0`. For long lists, link to a credits page. Your downloaded sounds appear on your "attribution list" page.
  - Remix restrictions follow the original licence.
- **Zapsplat**: Basic (free) users must credit "ZapSplat" wherever reasonably possible.
  - Gold/Premium (donation-style subscription) removes the attribution requirement for life for sounds downloaded while subscribed.
  - Some sounds are CC0 1.0 for all members. — [Zapsplat Standard License page (search result)](https://zapsplat.com/license-type/standard-license/); [Zapsplat FAQ](https://www.zapsplat.com/faq-category/license-and-usage/). Direct fetch returned 403.
- **BBC Sound Effects** (https://sound-effects.bbcrewind.co.uk, live) uses the **RemArc licence** ("Reminiscence Archive").
  - Free for personal, educational and research use only. Commercial use requires a separate paid licence; historically the whole BBC library has been licensable via Pro Sound Effects.
  - The RemArc sounds cannot be used in music you plan to sell. Research reportedly excludes AI training and data mining.
  - These are secondary sources because the official licensing page could not be fetched. — [MusicTech](https://musictech.com/news/music/the-bbc-sound-effects-archive-over-33000-free-samples); [DIYPhotography](https://www.diyphotography.net/the-bbc-sound-effects-archive-is-now-free-to-download-with-over-33000-files/)
- **Sonniss #GameAudioGDC**: yearly giveaway bundles from 2015–2024, about 207 GB across 73 zip parts. — [Sonniss GameAudioGDC](https://sonniss.com/gameaudiogdc/)
  - "There was no GDC 2025 bundle". Its content went into the GDC 2026 bundle at gdc.sonniss.com.
  - Royalty-free and commercial, with **no attribution required**, for lifetime and unlimited projects.
  - No resale or redistribution of the files themselves, edited or not.
  - Use is for media production (games, film, TV, apps).
  - **AI/ML training "strictly prohibited"**.
- **Kenney audio** (CC0). The UI Audio page lists 50 files under "Creative Commons CC0". — [Kenney UI Audio](https://kenney.nl/assets/ui-audio); [Calinou/kenney-ui-audio GitHub (CC0 1.0 Universal)](https://gh.r-mj.com/Calinou/kenney-ui-audio); [OpenGameArt Interface Sounds (CC0, uploader Kenney)](https://opengameart.org/content/interface-sounds). kenney.nl itself timed out from my environment.
- **SoundBible** has mixed licences. Sounds can be used commercially only if they are under "Creative Commons Attribution, or Public Domain License". It also has a paid "Royalty Free Premium Sounds" section. — [SoundBible About](https://soundbible.com/about.php)
- **Mixkit SFX**: Sound Effects Free License (see above).
- **Pixabay Sound Effects** fall under the Pixabay Content License (see above).
- **Material Design sound resources**: the URL now redirects to m2.material.io/design/sound/sound-resources.html and loads (200), but its content is JS-rendered and I could not read it. I found no confirmed licence (see Gaps). — [m2.material.io sound resources](https://m2.material.io/design/sound/sound-resources.html)
- **UI Sounds (uisounds.prototypr.io)** timed out from my environment (see Gaps).
- **OpenGameArt**: licences are per asset (CC0, CC BY, CC BY-SA, GPL and others). Example: Kenney's "Interface Sounds" is listed "License(s): CC0". — [OpenGameArt Interface Sounds](https://opengameart.org/content/interface-sounds). The homepage timed out from my environment.
- **itch.io UI packs** often use **CC BY 4.0**, which requires credit. Example: "Crisp UI Sounds Free by Anipixels". — [Godot Asset Library: Crisp UI Sounds](https://godotengine.org/asset-library/asset/5549)

#### (4) 3D models, textures, HDRIs
- **Poly Haven** uses CC0 ("CC0 1.0 Universal", "effectively Public Domain") for all HDRIs, textures and models.
  - Any purpose, including commercial and redistribution in products you sell. No attribution needed.
  - Site content (logos, renders, text) is not CC0.
  - The Terms prohibit "Web scraping or data mining without express permission". — [Poly Haven License](https://polyhaven.com/license)
- **ambientCG** uses the "Creative Commons CC0 1.0 Universal License" for asset files **and** preview renders. Raw files may be included in projects, and credit is optional. — [ambientCG License](https://docs.ambientcg.com/license/)
- **Sketchfab and the Fab migration**: Epic's documentation says free **CC BY** models map to Fab's CC licence and **Standard** maps to Fab's Standard licence. **Editorial** licences don't migrate. **CC BY-SA, CC BY-NC and CC BY-ND are not migrated**, and CC0 handling is unclear.
  - Non-migrated models remain viewable but become non-downloadable once licensing is removed. Sketchfab planned to remove free licensing in 2025.
  - Collada (.dae) cannot be ported. — [Epic: Migrating assets to Fab](https://dev.epicgames.com/documentation/fab/migrating-assets-to-fab); [80.lv](https://80.lv/articles/historians-are-concerned-about-epic-games-sketchfab-to-fab-migration/); [Fabbaloo](https://www.fabbaloo.com/news/epic-games-phases-out-sketchfab-in-2025-launches-unified-fab-marketplace)
  - Sketchfab's /licenses page currently describes only **Standard** (no sublicensing, no standalone resale) and **Editorial** (no commercial or promotional use). — [Sketchfab Licenses](https://sketchfab.com/licenses)
  - sketchfab.com itself is live: "Sketchfab - The best 3D viewer on the web" (curl).
- **Fab (Epic)** licence types are **Creative Commons Attribution (CC-BY) (Free)** and **Standard (Free or For Sale)**. Standard has **Personal** and **Professional** tiers, with thresholds in the Fab EULA. — [Fab docs: Licenses and pricing](https://dev.epicgames.com/documentation/en-us/fab/licenses-and-pricing-in-fab)
  - Fab Standard permits use in any engine or tool. Epic's free bi-weekly assets are under Standard, which allows commercial use, but redistribution is barred. — [CG Channel](https://www.cgchannel.com/2024/11/epic-games-to-share-new-free-assets-on-fab-every-two-weeks); [Digital Production](https://digitalproduction.com/2025/05/22/free-fab-epics-giving-away-a-back-alley/)
  - **Conflict:** Engadget's launch coverage said CC-BY content is "only allowed to be used on Unreal Engine". That contradicts the CC BY licence's own terms and should be verified against the Fab EULA. — [Engadget](https://www.engadget.com/gaming/epic-games-launches-a-new-unified-game-development-assets-marketplace-fab-135335228.html)
- **Kenney** (3D and 2D) is CC0, per the asset pages above. Note that the cited Kenney asset page is the audio pack.
- **Quaternius** is CC0. For example, the LowPoly Bundle has 250+ models under "Creative Commons Zero". — [Quaternius LowPoly Bundle (itch.io)](https://quaternius.itch.io/quaternius-lowpoly-bundle)
- **Poly Pizza** is live, "Poly Pizza: Free 3D models for everyone" ([poly.pizza](https://poly.pizza/)).
  - Licence is per model, mostly CC-BY with some CC0.
  - It hosts the archived Google Poly models (about 2,294) under CC-BY, which needs attribution. Quaternius models on Poly Pizza are CC0. — [flat.social credits](https://flat.social/ja/credits); [Cinevva guide (secondary)](https://app.cinevva.com/es/guides/free-3d-model-sites)
- **Spline** ([spline.design](https://spline.design/), live), **Mixamo** ([mixamo.com](https://www.mixamo.com/), live), **NASA 3D Resources** ([science.nasa.gov/3d-resources](https://science.nasa.gov/3d-resources/), live) and **Smithsonian 3D** (3d.si.edu, returned a bot check). Smithsonian 3D is covered by the Smithsonian Open Access CC0 programme for open-access items. — [The History Blog](https://www.thehistoryblog.com/?p=57989)
- **TurboSquid free** and **CGTrader free** returned 403 and 202 to my checks, so their licences were not verified (see Gaps).

#### (5) Mockups (live status, 5 Nov 2026 curl)
- **Mockups Design**: live, "Free Premium Mockups - Instant Download" ([mockups-design.com](https://mockups-design.com/)).
- **Anthony Boyd Graphics: rebranded.** anthonyboyd.graphics now redirects to **Minimal Mockups**, "Free Device Mockups — Minimal Mockups" ([minimalmockups.com](https://www.minimalmockups.com/)).
- **Ls.graphics**: live, "300+ Free Mockups — PSD, Figma & Free Generator" ([ls.graphics/free-mockups](https://www.ls.graphics/free-mockups)).
- **Rotato**: live, "3D Mockup Generator & Animator" ([rotato.app](https://rotato.app/)).
- **Shots.so**: live, "Create Amazing Mockups" ([shots.so](https://shots.so/)).
- **Mockuuups Studio**: live, "Free Mockup Generator — 5,200+ Mockups" ([mockuuups.studio](https://mockuuups.studio/)).
- **Screely: appears defunct.** screely.com returns 200 with the title "Domain Default page", which is a hosting placeholder ([screely.com](https://www.screely.com/)).
- **Artboard Studio**: live, "Online Mockup Generator & Editor for Designers" ([artboard.studio](https://artboard.studio/)).

#### (7) Inspiration galleries (live status, 5 Nov 2026 curl)
- **Awwwards** ([awwwards.com](https://www.awwwards.com/)): live.
- **Godly: rebranded.** godly.website redirects to **https://recent.design/?ref=godly**, titled "Recent — Design Inspiration". It curates Websites, Launch Videos, OG Images, App Screenshots, App Icons, Branding, Motion and more, and has a jobs board. — [Recent](https://recent.design/?ref=godly)
  - Third-party pages describe it as "Recent (previously Godly)". — [UI/UX Showcase](https://uiuxshowcase.com/resources/recent-design-best-web-design-inspiration/)
- **Land-book** ([land-book.com](https://land-book.com/)): live.
- **Lapa Ninja** ([lapa.ninja](https://www.lapa.ninja/)): live, "7,300+ Best Landing Pages".
- **SiteInspire** ([siteinspire.com](https://www.siteinspire.com/)): returned a Vercel security checkpoint (429), status uncertain.
- **Httpster** ([httpster.net](https://httpster.net/)): live.
- **One Page Love** ([onepagelove.com](https://onepagelove.com/)): live.
- **Minimal Gallery** ([minimal.gallery](https://minimal.gallery/)): live.
- **MaxiBestOf** ([maxibestof.one](https://maxibestof.one/)): live, "Web Design Inspiration, Sections & Fonts".
- **Mobbin** ([mobbin.com](https://mobbin.com/)): live.
- **Refero** ([refero.design](https://refero.design/)): live.
- **Page Flows** ([pageflows.com](https://pageflows.com/)): live. **Screenlane now redirects to Page Flows** ([screenlane.com](https://screenlane.com) → pageflows.com).
- **Savee**: savee.it redirects to **savee.com** ([savee.com](https://savee.com/)).
- **Cosmos** ([cosmos.so](https://www.cosmos.so/)): live.
- **Are.na** ([are.na](https://www.are.na/)): live.
- **Dribbble** ([dribbble.com](https://dribbble.com/)): live (202).
- **Behance**: bot-blocked (403).
- **Curated** ([curated.design](https://curated.design/)): live, "Web design inspiration from real, live websites".
- **Dark Mode Design** ([darkmodedesign.com](https://www.darkmodedesign.com/)): live.
- **Brutalist Websites** ([brutalistwebsites.com](https://brutalistwebsites.com/)): live.
- **Hover States** ([hoverstat.es](https://www.hoverstat.es/)): live, "The home of alternative web-design".
- **Codrops** ([tympanus.net/codrops](https://tympanus.net/codrops/)): live, "Fueling web creativity since 2009".
- **Made in Webflow** ([webflow.com/made-in-webflow](https://webflow.com/made-in-webflow)): live.
- **Framer Gallery**: framer.com/gallery redirects to [framer.com/community/gallery](https://www.framer.com/community/gallery/).
- Extra galleries confirmed live:
  - CSS Design Awards ([cssdesignawards.com](https://www.cssdesignawards.com/))
  - The FWA ([thefwa.com](https://thefwa.com/))
  - GSAP Showcase ([gsap.com/showcase](https://gsap.com/showcase/))
  - Best Website Gallery ([bestwebsite.gallery](https://bestwebsite.gallery/))
  - Admire The Web ([admiretheweb.com](https://admiretheweb.com/))
  - Supahero, a hero-section library ([supahero.io](https://supahero.io/))
  - Footer gallery ([footer.design](https://www.footer.design/))
  - Navbar Gallery ([navbar.gallery](https://www.navbar.gallery/))
  - Landingfolio ([landingfolio.com](https://www.landingfolio.com/))
  - SaaSFrame ([saasframe.io](https://www.saasframe.io/))
  - Typewolf Site of the Day ([typewolf.com/site-of-the-day](https://www.typewolf.com/site-of-the-day))
  - Uiland ([uiland.design](https://uiland.design/))
  - Muzli ([muzli.com](https://www.muzli.com/))
- hyperframe.io now resolves to a parked domain (ww38.hyperframe.io).

### Inferences
- A practical licence-safety tiering for commercial sites:
  - **Tier A** (CC0, no strings): Poly Haven, ambientCG, Kenney, Quaternius, StockSnap, ISO Republic, Nappy, Met/Smithsonian open-access CC0 items.
  - **Tier B** (custom free licence, no credit, but no resale/redistribution or AI clauses): Unsplash, Pexels, Pixabay, Burst, Barnimages, Gratisography, Kaboompics Standard, Coverr, Mixkit free licences, Sonniss.
  - **Tier C** (per-file, must check every asset): Freesound, Wikimedia Commons, Openverse, Poly Pizza, Sketchfab/Fab, OpenGameArt, SoundBible.
  - **Avoid for commercial use**: BBC RemArc sounds, Mixkit "Restricted" video, Freesound CC BY-NC and Sampling+, Kaboompics "Editorial Use Only", Sketchfab "Editorial".
- "Free for commercial use" ≠ CC0. Unsplash, Pexels, Pixabay, Barnimages, Gratisography and Coverr all forbid redistribution as stock. Unsplash+ and Coverr explicitly ban AI/ML use. This matters if a site ships downloadable templates, themes or AI products. A theme or template that bundles stock images is a redistribution risk, so use placeholders or CC0 in templates.
- Many of the old "free stock" names have consolidated or disappeared in 2025–26: Reshot retired; Videvo and Mazwai were absorbed into Freepik; Burst moved under shopify.com; EyeEm shut down. Curated lists from 2023–24 (Muzli, Toptal and others) are likely to contain dead links.
- (editorial) Quality and aesthetic. **Generic-stock risk is highest** on Pixabay, Pexels, Burst and Picjumbo, and Picjumbo and Gratisography now mix in AI images. **More distinctive** are Kaboompics (consistent, colour-coordinated interiors and lifestyle with palette metadata), Nappy (representation), Gratisography (quirky and whimsical), museum open-access collections (art and archival textures, very non-generic), NASA (space imagery), and paid Stocksy and Death to Stock (art-directed, "authentic").
- Getting non-generic, art-directed imagery:
  - Build moodboards in Are.na, Cosmos or Savee before searching.
  - Search by colour or palette and treat images consistently: duotone, grain, a single crop ratio, colour-grading LUTs.
  - Use public-domain archival or museum art and NASA imagery as texture.
  - Prefer one photographer's series (Unsplash and Pexels profiles) over mixed results.
  - Commission or shoot product imagery.
  - Generate abstract backgrounds with Haikei or fffuel instead of using stock photos.
  - These suggestions are my inference and not directly cited.

### Gaps
- Unsplash's own homepage and the Pexels licence page were behind bot checks. I quoted the Unsplash licence from unsplash.com/license, which loaded, but the Pexels licence wording comes from help-centre and secondary sources, not the licence page.
- I could not read licence pages for Picjumbo (404 at /license/), Life of Pix (JS-rendered), Rawpixel public domain (403), Death to Stock (404 at /license), Stocksy and Adobe Stock (403), Wikimedia Commons licensing policy (not fetched), Openverse (bot check), TurboSquid and CGTrader free licences (403/202), and Pexels Video and Pixabay Video specifics.
- BBC RemArc licence text was not directly accessible; findings rely on press coverage. The claim that research excludes AI training comes from a single secondary report.
- Mixkit per-licence full text: the /license/ page lists names only. Terms come from secondary sources.
- Material Design sound resources licence: the page is JS-rendered and no official licence was found in search. Do not assert CC BY 4.0 without checking.
- kenney.nl, quaternius.com, opengameart.org, uisounds.prototypr.io and lifeofvids.com timed out from my environment. This is likely a network or sandbox issue, not a confirmed shutdown, and needs verification in a browser.
- Fab Personal vs Professional revenue thresholds, and whether Fab CC-BY assets are restricted to Unreal Engine (Engadget claim), are unverified.
- Spline library, Mixamo (Adobe terms), NASA 3D, and Smithsonian 3D per-model licence terms were not fetched. Only liveness was checked.
- Pricing for Zapsplat, Death to Stock, Stocksy, Rotato, Shots, Mockuuups and Artboard Studio was not verified.

---

## Q2. What tools do professional designers actually use to create non-generic colour systems, gradients and textures?

### Takeaway
The current professional workflow is perceptual-colour-first. Designers pick and convert in OKLCH (oklch.com, oklch.fyi), generate contrast-targeted scales (Adobe Leonardo, Radix Colors, uicolors.app, ColorBox), preview palettes on a real UI (Huemint, Realtime Colors), and verify contrast with WCAG 2 checkers (WebAIM) plus APCA (apcacontrast.com). Textures and gradients come from SVG generators (Haikei, fffuel, Hero Patterns, Pattern Monster, Blobmaker, Get Waves), mesh-gradient tools (CSS Hero Mesher, meshgradient.com), and HDR/OKLCH-aware CSS gradient tools (gradient.style). Shadows come from layered-shadow generators (Philipp Brumm's Smooth Shadow, Josh Comeau's Shadow Palette).

### Cited Findings
All entries below were verified live via curl on 5 Nov 2026. The page title is quoted.

**Colour palettes and systems**
- **Coolors**: coolors.co returned a Cloudflare bot check (403), so status could not be confirmed. Likely live.
- **Realtime Colors** (realtimecolors.com): timed out from my environment (see Gaps).
- **Huemint**: "Huemint - AI color palette generator" ([huemint.com](https://huemint.com/)).
- **Adobe Color**: now branded "Color Palettes & Themes | Adobe Express" ([color.adobe.com](https://color.adobe.com/)).
- **Khroma**: "Khroma - AI Color Tool for Designers" ([khroma.co](https://www.khroma.co/)).
- **Color Hunt** ([colorhunt.co](https://colorhunt.co/)).
- **Radix Colors** ([radix-ui.com/colors](https://www.radix-ui.com/colors)).
- **Tailwind palette** ([tailwindcss.com/docs/colors](https://tailwindcss.com/docs/colors)).
- **OKLCH Color Picker & Converter** ([oklch.com](https://oklch.com/)).
- **oklch.fyi**: "Pick, convert and generate OKLCH colors" ([oklch.fyi](https://oklch.fyi/)).
- **Leonardo**: Adobe's contrast-based colour generator ([leonardocolor.io](https://leonardocolor.io/)).
- **ColorBox** ([colorbox.io](https://colorbox.io/)).
- **UI Colors**: "Tailwind CSS Colors - All colors + Custom color generator" ([uicolors.app](https://uicolors.app/generate)).
- **Learn UI Design Data Viz Color Palette Generator** ([learnui.design](https://www.learnui.design/tools/data-color-picker.html)).
- **Palettte.app** now redirects to a BairesDev "Color Palette App" ([palettte.app](https://www.bairesdev.com/tools/color-palette-app/editor/)), a change of ownership.
- tints.dev returned a bot check (403).

**Contrast**
- **APCA Contrast Calculator** ([apcacontrast.com](https://apcacontrast.com/)).
- **WebAIM Contrast Checker** ([webaim.org](https://webaim.org/resources/contrastchecker/)).
- myndex.com/APCA timed out from my environment.

**Gradients**
- **CSS Hero Mesher**: "CSS mesh gradients generator" ([csshero.org/mesher](https://csshero.org/mesher/)).
- **Mesh**: "Create beautiful mesh gradients" ([meshgradient.com](https://meshgradient.com/)).
- **uiGradients** ([uigradients.com](https://uigradients.com/)).
- **gradient.style**: page title "CSS HDR Gradients" ([gradient.style](https://gradient.style/)).
- **CSS Gradient** ([cssgradient.io](https://cssgradient.io/)).
- **Grainy Gradients playground** (grainy-gradients.vercel.app) returned **HTTP 402**, a Vercel deployment-disabled or payment-required response, so it is currently unavailable ([grainy-gradients.vercel.app](https://grainy-gradients.vercel.app/)).

**Patterns, textures and shapes**
- **Hero Patterns**: "Free repeatable SVG background patterns" ([heropatterns.com](https://heropatterns.com/)).
- **Haikei**: "Generate unique SVG design assets" ([haikei.app](https://haikei.app/)).
- **Pattern Monster**: "SVG Pattern Generator" ([pattern.monster](https://pattern.monster/)).
- **fffuel**: "Free SVG generators, color tools & web design tools" ([fffuel.co](https://www.fffuel.co/)).
- **Blobmaker** ([blobmaker.app](https://www.blobmaker.app/)).
- **Get Waves** ([getwaves.io](https://getwaves.io/)).
- **Noise Texture Generator v2.1** ([noisetexturegenerator.com](https://www.noisetexturegenerator.com/)).
- **SVG Backgrounds** (svgbackgrounds.com) returned a bot check (403).

**Shadows and glass**
- **Smooth Shadow** at shadows.brumm.af, page title "brumm.af" ([shadows.brumm.af](https://shadows.brumm.af/)).
- **Tobias Ahlin's article "Layered smooth box shadows"** ([tobiasahlin.com](https://tobiasahlin.com/blog/layered-smooth-box-shadows/)). This is the technique article, not a generator.
- **Josh W. Comeau CSS Shadow Palette Generator** ([joshwcomeau.com/shadow-palette](https://www.joshwcomeau.com/shadow-palette/)).
- **Glassmorphism CSS Generator** (SquarePlanet / Hype4) ([hype4.academy](https://hype4.academy/tools/glassmorphism-generator)).
- ui.glass/generator and smoothshadows.com timed out.

**CSS generators**
- **Clippy**: "CSS clip-path maker", by Bennett Feely ([bennettfeely.com/clippy](https://bennettfeely.com/clippy/)).
- **cubic-bezier.com** ([cubic-bezier.com](https://cubic-bezier.com/)).
- **Easing Functions Cheat Sheet** ([easings.net](https://easings.net/)).
- **Easing Graphs** ([easing.dev](https://www.easing.dev/)).
- **Utopia**: "Fluid Responsive Design" ([utopia.fyi](https://utopia.fyi/)).
- **Type Scale** ([typescale.com](https://typescale.com/)).
- **Fontjoy**: font pairing ([fontjoy.com](https://fontjoy.com/)).

**Image optimisation and favicons**
- **Squoosh** ([squoosh.app](https://squoosh.app/)).
- **TinyPNG**: "Compress WebP, PNG and JPEG images intelligently" ([tinypng.com](https://tinypng.com/)).
- **SVGOMG**: "SVGO's Missing GUI for minifying SVGs" ([jakearchibald.github.io/svgomg](https://jakearchibald.github.io/svgomg/)).
- **sharp**: "High performance Node.js image processing" ([sharp.pixelplumbing.com](https://sharp.pixelplumbing.com/)).
- **RealFaviconGenerator** ([realfavicongenerator.net](https://realfavicongenerator.net/)).

### Inferences
- (editorial) What makes colour systems non-generic:
  - Start from a brand hue in OKLCH so lightness stays perceptually even across hues.
  - Generate 11–12 step scales with target contrast ratios (Leonardo's model), or use Radix's semantic 12-step scale for UI states.
  - Test the whole palette on a live UI mock (Huemint or Realtime Colors) instead of on swatches.
  - Check both WCAG 2.x (legal baseline) and APCA (better perceptual guidance for dark mode and large text). WCAG 2.x remains the compliance standard; APCA is advisory.
- (editorial) Grain and noise overlays from Noise Texture Generator or fffuel's noise tools, plus SVG feTurbulence filters, are the main tool for avoiding "flat AI gradient" looks. Mesh gradients plus grain, Haikei blob or layered-wave scenes, and HDR OKLCH gradients from gradient.style are the current premium-looking defaults. uiGradients and Color Hunt presets are the most likely to look generic.
- (editorial) The brief attributes "Smooth Shadow" to Tobias Ahlin. As far as I know, the Smooth Shadow generator is Philipp Brumm's tool at shadows.brumm.af, and Ahlin wrote the influential layered-shadow article. I verified both URLs live but did not fetch the authorship text, so confirm the attribution before publishing.
- Ownership changes (Palettte → BairesDev, Godly → Recent) suggest tool directories should be re-verified at publish time.

### Gaps
- I did not fetch feature pages for each tool, so details such as Huemint's ML model, Leonardo's contrast targets, or fffuel's individual tools are unverified. Only liveness and titles were confirmed.
- I found no survey data on which tools professional designers "actually use"; the evidence is liveness plus my editorial judgement. Usage statistics would require surveys such as the State of CSS or UX Tools surveys, which I did not consult.
- Coolors, Realtime Colors and SVG Backgrounds liveness could not be confirmed from this environment.
- The licence of patterns and SVGs exported from Haikei, Hero Patterns (historically CC BY 4.0) and Pattern Monster was not verified.

---

## Q3. How should each asset type be optimised for desktop and mobile delivery?

### Takeaway
- **Images:** serve AVIF or WebP with fallbacks via `<picture>`, sized responsively.
- **Video:** use `<video>` with WebM (and AV1 where you encode it) listed before an MP4 fallback, always with `type` attributes, an optimised `poster`, and `preload` hints. Mobile Chrome buffers nothing by default. Use `autoplay muted loop playsinline` for GIF replacements.
- **Sound:** muted-first and gesture-gated, because of autoplay policy and AudioContext suspension, with a global mute (use-sound's `soundEnabled`). Lazy-load the audio library.
- **3D:** ship GLB optimised with glTF-Transform: Draco or Meshopt geometry, KTX2 (ETC1S/UASTC) or WebP textures, plus dedup and prune.

### Cited Findings

**Images**
- AVIF is based on AV1 and aims for better perceptual quality at smaller sizes than JPEG or WebP. Netflix testing showed "significant reductions in file sizes". — [web.dev Learn Images: AVIF](https://web.dev/learn/images/avif)
- AVIF support: Chrome and Opera since 2020, Firefox since 2021, Safari since 2022.
- JPEG XL is "not supported in any browser" and JPEG 2000 is Safari-only, per web.dev at time of fetch.
- Serving AVIF alone risks broken images, so provide fallbacks. web.dev recommends Squoosh for experimenting with AVIF. — [web.dev Learn Images: AVIF](https://web.dev/learn/images/avif)
- Tools: Squoosh ([squoosh.app](https://squoosh.app/)), sharp for build pipelines ([sharp.pixelplumbing.com](https://sharp.pixelplumbing.com/)), TinyPNG ([tinypng.com](https://tinypng.com/)), SVGOMG for SVG ([SVGOMG](https://jakearchibald.github.io/svgomg/)).

**Video**
- Use multiple `<source>` children in preference order. The browser plays the **first** format it supports and does not pick the most efficient one.
- Always include `type`, so the browser can skip unsupported files without partially downloading them. The server must send correct MIME types. — [web.dev: video and source tags](https://web.dev/articles/video-and-source-tags)
- Add an optimised `poster`, which costs an extra request.
- `preload` (`none`/`metadata`/`auto`) is only a hint. Chrome buffers about 25 s on desktop but **none on iOS or Android**, so mobile start may be slower.
- Media fragments (`#t=start,end`) need range requests (`Accept-Ranges: bytes`).
- Consider data cost, CPU and intrusiveness before autoplay.
- Use `max-width: 100%`, preserve aspect ratio, and use responsive wrappers for iframes. — [web.dev: video and source tags](https://web.dev/articles/video-and-source-tags)
- GIF → video: an example 3.7 MB GIF became a 551 KB MP4 or a 341 KB WebM. — [web.dev: Replace GIFs with videos](https://web.dev/articles/replace-gifs-with-videos)
  - MP4: `ffmpeg -i in.gif -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p out.mp4`. Add `-vf "crop=trunc(iw/2)*2:trunc(ih/2)*2"` for odd dimensions.
  - WebM: `ffmpeg -i in.gif -c vp9 -b:v 0 -crf 41 out.webm`.
  - Use `<video autoplay loop muted playsinline>` and list WebM first.

**Autoplay and sound policy**
- Muted autoplay is always allowed in Chrome. — [Chrome autoplay policy](https://developer.chrome.com/blog/autoplay)
- Autoplay with sound is allowed only when one of these holds:
  - the user has interacted with the site;
  - the desktop Media Engagement Index threshold is met (more than 7 s of unmuted playback in an active tab, video larger than 200×140);
  - on mobile, the site was added to the home screen, or on desktop the PWA is installed;
  - a top-level frame delegated autoplay permission to an iframe.
- Since Chrome 71, an AudioContext created before a gesture starts **suspended**. Call `resume()` after a click, and check `AudioContext.state`.

**UI sound libraries**
- **use-sound** is a React hook wrapping Howler.js. It is MIT-licensed and "semi-maintained". — [use-sound GitHub](https://github.com/joshwcomeau/use-sound)
  - It adds under 1 kB gzipped to the bundle, plus about 10 kB (around 9 kB gzipped) of Howler loaded asynchronously after load.
  - Options: `volume` (0–1), `playbackRate` (0.5–4, which changes pitch), `interrupt`, `soundEnabled` (global mute, overridable with `forceSoundEnabled`), and audio `sprite` support.
  - Sounds triggered before the library loads are silently skipped.
- Other live references: Howler.js, "JavaScript audio library for the modern web" ([howlerjs.com](https://howlerjs.com/)); the MDN Web Audio API reference ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)); Tone.js ([tonejs.github.io](https://tonejs.github.io/)).
- An npm package **snd-lib** (SND UI sound kit) exists ([npm snd-lib](https://www.npmjs.com/package/snd-lib)), but snd.dev timed out.

**3D (glTF/GLB)**
- Install the CLI with `npm install --global @gltf-transform/cli`. It uses sharp for textures. — [glTF Transform CLI](https://gltf-transform.dev/cli)
- Run `gltf-transform inspect input.glb` first to find geometry-heavy scenes, texture-heavy scenes, or excess draw calls.
- `gltf-transform optimize input.glb output.glb --compress draco --texture-compress webp` runs all methods. Defaults may not suit every scene; see `optimize -h`.
- Individual commands:
  - geometry: `draco`, `meshopt`, `simplify`, `weld`, `quantize`;
  - scene: `instance`, `join`, `flatten`, `center`;
  - package: `dedup`, `prune`, `gzip`;
  - texture: `resize`, `webp`, `avif`, `png`, `jpeg`, `etc1s` ("KTX + Basis ETC1S"), `uastc` ("KTX + Basis UASTC"), `ktxdecompress`, `ktxfix`.
- Related live tools: glTF Transform repo ([GitHub](https://github.com/donmccurdy/glTF-Transform)), glTF Report, an in-browser inspector and optimiser ([gltf.report](https://gltf.report/)), glTF Viewer ([gltf-viewer.donmccurdy.com](https://gltf-viewer.donmccurdy.com/)), KTX-Software ([KhronosGroup/KTX-Software](https://github.com/KhronosGroup/KTX-Software)), meshoptimizer ([meshoptimizer.org](https://meshoptimizer.org/)), and Draco ([google.github.io/draco](https://google.github.io/draco/)).

### Inferences
- Image recipe for desktop vs mobile:
  - Generate AVIF, then WebP, then JPEG/PNG with sharp or Squoosh.
  - Wrap them in `<picture>`, with `srcset` widths of roughly 400–2400 px and accurate `sizes`.
  - Use `loading="lazy"` below the fold and `fetchpriority="high"` on the LCP hero.
  - Use SVG (SVGOMG-minified) for patterns, blobs and waves instead of raster. Haikei and Hero Patterns output SVG, which is tiny on mobile.
  - This recipe is my synthesis; I did not fetch web.dev's responsive-images module.
- Background and hero video recipe:
  - Keep it short (5–15 s), muted, 720p for mobile, 1080p for desktop. Use AV1 or VP9 WebM first and H.264 MP4 as the fallback, with a poster.
  - Use `preload="none"` or `metadata`, and consider swapping in a static poster for `prefers-reduced-motion`, `Save-Data`, or small screens via `<source media>` or JS.
  - The AV1 ordering and the Save-Data/reduced-motion advice are inference, not from the fetched pages.
- UI sound UX and accessibility:
  - Sound should be opt-in or easily mutable.
  - Persist the user's mute choice.
  - Never convey information by sound alone.
  - Keep sounds short and quiet (volume around 0.25–0.5).
  - Respect autoplay rules by only playing after a gesture.
  - Lazy-load the audio library and sprite (use-sound already does this).
  - These points are inferred from the autoplay policy and the use-sound design. No WCAG-specific source was fetched.
- 3D recipe:
  - Prefer GLB.
  - Use Meshopt (fast decode, works well with animation) or Draco (smallest static geometry).
  - Use KTX2 UASTC for normal maps and high-quality textures, ETC1S for colour maps, or WebP if KTX2 decoders are unavailable.
  - Keep hero models under about 2–5 MB on mobile, and use HDRIs at 1k–2k from Poly Haven for environment lighting.
  - The size budgets are editorial, not cited.

### Gaps
- I did not fetch web.dev's responsive-images or `<picture>` guidance, or MDN's `<video>`/autoplay pages. AV1 video browser-support specifics (caniuse) were not verified this session.
- I did not consult a cited source on Save-Data or prefers-reduced-motion handling for video and sound, or on WCAG guidance for audio (SC 1.4.2 Audio Control). Add these if the report needs authoritative backing.
- The glTF Transform CLI page does not document `optimize` defaults. Exact default compression and texture settings need `gltf-transform optimize -h`.
- I found no authoritative page on KTX2 ETC1S vs UASTC trade-offs (the Khronos glTF-Compressor URL returned 404).
