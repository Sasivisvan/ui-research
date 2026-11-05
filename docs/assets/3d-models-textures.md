# 3D Models, Textures and HDRIs

This page covers sources of 3D models, PBR textures and HDRI environment maps for web 3D (Three.js, R3F, model-viewer, Spline), with licences and status as of 5 Nov 2026. It explains the **Sketchfab → Fab migration**, which removed free download licensing for many models, and documents the glTF/GLB optimisation pipeline: glTF-Transform, Draco, Meshopt and KTX2. The safest sources are CC0: Poly Haven, ambientCG, Kenney, Quaternius and Smithsonian Open Access 3D. Per-model sources (Poly Pizza, Sketchfab/Fab) need checking for every asset. 3D icons and render packs are on [3d-and-animated-icons.md](3d-and-animated-icons.md).

## Contents

- [1. Model, texture and HDRI sources](#1-model-texture-and-hdri-sources)
- [2. Sketchfab → Fab migration rules](#2-sketchfab--fab-migration-rules)
- [3. Licence-safety tiers](#3-licence-safety-tiers)
- [4. Optimising glTF/GLB for the web](#4-optimising-gltfglb-for-the-web)
- [5. Desktop vs mobile 3D recipe](#5-desktop-vs-mobile-3d-recipe)
- [6. Gaps](#6-gaps)
- [Sources](#sources)

## 1. Model, texture and HDRI sources

| Source | What it offers | Licence (exact) | Attr | Commercial | Restrictions | Status |
|---|---|---|---|---|---|---|
| [Poly Haven](https://polyhaven.com/license) | HDRIs, textures, models | **CC0** ("CC0 1.0 Universal", "effectively Public Domain") for all HDRIs, textures and models | No | Yes, for any purpose, including redistribution in products you sell | Site content (logos, renders, text) is **not** CC0. The Terms prohibit **"Web scraping or data mining without express permission"** | Live |
| [ambientCG](https://docs.ambientcg.com/license/) | PBR materials, HDRIs, models | **"Creative Commons CC0 1.0 Universal License"** for asset files **and** preview renders | Optional | Yes. Raw files may be included in projects | None | Live |
| [Sketchfab](https://sketchfab.com/licenses) | 3D viewer and model library ("Sketchfab - The best 3D viewer on the web") | /licenses now describes only **Standard** (no sublicensing, no standalone resale) and **Editorial** (no commercial or promotional use) | Per model | Standard: yes. **Editorial: no** | Free licences are being removed under the Fab migration (see [§2](#2-sketchfab--fab-migration-rules)) | Live |
| Fab (Epic) | Unified Epic marketplace | **Creative Commons Attribution (CC-BY) (Free)** and **Standard (Free or For Sale)**. Standard has **Personal** and **Professional** tiers, with thresholds in the Fab EULA ([Fab docs](https://dev.epicgames.com/documentation/en-us/fab/licenses-and-pricing-in-fab)) | CC-BY: yes | Standard permits use in any engine or tool. Epic's free bi-weekly assets are under Standard, which allows commercial use ([CG Channel](https://www.cgchannel.com/2024/11/epic-games-to-share-new-free-assets-on-fab-every-two-weeks); [Digital Production](https://digitalproduction.com/2025/05/22/free-fab-epics-giving-away-a-back-alley/)) | Redistribution barred under Standard. **Conflict:** Engadget's launch coverage said CC-BY content is "only allowed to be used on Unreal Engine", which contradicts the CC BY licence's own terms. Verify against the Fab EULA ([Engadget](https://www.engadget.com/gaming/epic-games-launches-a-new-unified-game-development-assets-marketplace-fab-135335228.html)) | Bot-blocked (403) from the research environment |
| Kenney (kenney.nl) | 2D/3D game assets and audio | **CC0** (per asset pages; note that the cited Kenney asset page is the audio pack, [UI Audio](https://kenney.nl/assets/ui-audio)) | No | Yes | None | **Timed out from the research environment** (not evidence of shutdown) |
| Quaternius (quaternius.com) | Low-poly models. E.g. LowPoly Bundle with 250+ models | **"Creative Commons Zero"** (CC0) ([itch.io](https://quaternius.itch.io/quaternius-lowpoly-bundle)) | No | Yes | None | **quaternius.com timed out from the research environment** |
| [Poly Pizza](https://poly.pizza/) | "Poly Pizza: Free 3D models for everyone". Hosts the archived Google Poly models (~2,294) | **Per model**, mostly **CC-BY** with some CC0. Google Poly archive: CC-BY. Quaternius models on Poly Pizza: CC0 ([flat.social credits](https://flat.social/ja/credits); [Cinevva (secondary)](https://app.cinevva.com/es/guides/free-3d-model-sites)) | CC-BY models: **yes** | Yes | Check each model | Live |
| [Spline](https://spline.design/) library | Spline community and library | **Per-model terms not fetched** | n/a | n/a | Tool pricing is in [3d-and-animated-icons.md](3d-and-animated-icons.md#2-3d-creation-and-embedding-tools) | Live |
| [Mixamo](https://www.mixamo.com/) | Adobe character rigging and animations | **Adobe terms not fetched** | n/a | n/a | n/a | Live |
| [NASA 3D Resources](https://science.nasa.gov/3d-resources/) | Space-related 3D models | **Per-model terms not fetched.** NASA material is generally not copyrighted, with insignia and endorsement rules (see [photos.md](photos.md#3-museum-archive-and-public-domain-sources)) | n/a | n/a | n/a | Live |
| Smithsonian 3D (3d.si.edu) | 3D scans | **CC0** for open-access items, under the Smithsonian Open Access programme ([The History Blog](https://www.thehistoryblog.com/?p=57989)) | No | Yes | Open-access items only | **Bot check** from the research environment |
| TurboSquid free | Free models on a commercial marketplace | **Not verified** | n/a | n/a | n/a | Returned 403 |
| CGTrader free | Free models on a commercial marketplace | **Not verified** | n/a | n/a | n/a | Returned 202 |
| [OpenGameArt](https://opengameart.org/content/interface-sounds) | Game assets | **Per asset:** CC0, CC BY, CC BY-SA, GPL and others | Per asset | Per asset | Per asset | Homepage timed out from the research environment |

## 2. Sketchfab → Fab migration rules

Sources: [Epic: Migrating assets to Fab](https://dev.epicgames.com/documentation/fab/migrating-assets-to-fab), [80.lv](https://80.lv/articles/historians-are-concerned-about-epic-games-sketchfab-to-fab-migration/), [Fabbaloo](https://www.fabbaloo.com/news/epic-games-phases-out-sketchfab-in-2025-launches-unified-fab-marketplace).

| Sketchfab licence | Migrates to Fab? |
|---|---|
| Free **CC BY** | Yes, maps to Fab's CC licence |
| **Standard** | Yes, maps to Fab's Standard licence |
| **Editorial** | **No** |
| **CC BY-SA** | **No** |
| **CC BY-NC** | **No** |
| **CC BY-ND** | **No** |
| **CC0** | **Unclear** |

Further rules:

- Non-migrated models **remain viewable but become non-downloadable** once licensing is removed. Sketchfab planned to remove free licensing in 2025.
- **Collada (.dae) cannot be ported.**

> Editor's note: if a project depends on a free Sketchfab model, download and archive it along with its licence text and author credit now. Don't rely on the download link persisting.

## 3. Licence-safety tiers

These are inferences in the notes.

| Tier | Sources |
|---|---|
| **A: CC0, no strings** | Poly Haven, ambientCG, Kenney, Quaternius, Smithsonian open-access CC0 items |
| **C: per-file, check every asset** | Poly Pizza, Sketchfab/Fab, OpenGameArt |
| **Avoid for commercial use** | **Sketchfab "Editorial"** |

## 4. Optimising glTF/GLB for the web

### 4.1 glTF-Transform CLI

Source: [glTF Transform CLI](https://gltf-transform.dev/cli).

```bash
npm install --global @gltf-transform/cli        # uses sharp for textures

gltf-transform inspect input.glb                 # run first: find geometry-heavy,
                                                 # texture-heavy, or draw-call-heavy scenes

gltf-transform optimize input.glb output.glb \
  --compress draco --texture-compress webp       # runs all methods
```

The defaults may not suit every scene; see `optimize -h`. The CLI page does not document the `optimize` defaults.

**Individual commands:**

| Group | Commands |
|---|---|
| Geometry | `draco`, `meshopt`, `simplify`, `weld`, `quantize` |
| Scene | `instance`, `join`, `flatten`, `center` |
| Package | `dedup`, `prune`, `gzip` |
| Texture | `resize`, `webp`, `avif`, `png`, `jpeg`, `etc1s` ("KTX + Basis ETC1S"), `uastc` ("KTX + Basis UASTC"), `ktxdecompress`, `ktxfix` |

### 4.2 Related tools

All confirmed live.

| Tool | Purpose |
|---|---|
| [glTF Transform repo](https://github.com/donmccurdy/glTF-Transform) | Library and CLI source |
| [glTF Report](https://gltf.report/) | In-browser inspector and optimiser |
| [glTF Viewer](https://gltf-viewer.donmccurdy.com/) | Quick model preview |
| [KTX-Software](https://github.com/KhronosGroup/KTX-Software) | KTX2 / Basis texture tooling |
| [meshoptimizer](https://meshoptimizer.org/) | Meshopt geometry compression |
| [Draco](https://google.github.io/draco/) | Draco geometry compression |

## 5. Desktop vs mobile 3D recipe

This recipe is an inference in the notes, and the size budgets are editorial, not cited.

| Decision | Guidance |
|---|---|
| Container | Prefer **GLB** |
| Geometry compression | **Meshopt** (fast decode, works well with animation) or **Draco** (smallest static geometry) |
| Textures | **KTX2 UASTC** for normal maps and high-quality textures. **ETC1S** for colour maps. **WebP** if KTX2 decoders are unavailable |
| Cleanup | `dedup`, `prune` |
| Mobile budget | Keep hero models under about **2–5 MB** on mobile |
| Environment lighting | HDRIs at **1k–2k** from Poly Haven |

Cross-asset delivery is in [optimization.md](optimization.md#3d).

## 6. Gaps

- The revenue thresholds for Fab Personal vs Professional, and whether Fab CC-BY assets are restricted to Unreal Engine (the Engadget claim), are unverified.
- The Spline library, Mixamo (Adobe terms), NASA 3D and Smithsonian 3D per-model licence terms were not fetched. Only liveness was checked.
- TurboSquid and CGTrader free licences were not verified (403/202).
- kenney.nl, quaternius.com and opengameart.org timed out from the research environment. This is likely a network or sandbox issue and needs verification in a browser.
- The glTF Transform CLI page does not document `optimize` defaults. The exact default compression and texture settings need `gltf-transform optimize -h`.
- No authoritative page was found on KTX2 ETC1S vs UASTC trade-offs (the Khronos glTF-Compressor URL returned 404).

## Sources

- Poly Haven License: https://polyhaven.com/license
- ambientCG License: https://docs.ambientcg.com/license/
- Epic, Migrating assets to Fab: https://dev.epicgames.com/documentation/fab/migrating-assets-to-fab
- 80.lv: https://80.lv/articles/historians-are-concerned-about-epic-games-sketchfab-to-fab-migration/
- Fabbaloo: https://www.fabbaloo.com/news/epic-games-phases-out-sketchfab-in-2025-launches-unified-fab-marketplace
- Sketchfab Licenses: https://sketchfab.com/licenses
- Fab docs, Licenses and pricing: https://dev.epicgames.com/documentation/en-us/fab/licenses-and-pricing-in-fab
- CG Channel: https://www.cgchannel.com/2024/11/epic-games-to-share-new-free-assets-on-fab-every-two-weeks · Digital Production: https://digitalproduction.com/2025/05/22/free-fab-epics-giving-away-a-back-alley/ · Engadget: https://www.engadget.com/gaming/epic-games-launches-a-new-unified-game-development-assets-marketplace-fab-135335228.html
- Kenney UI Audio: https://kenney.nl/assets/ui-audio
- Quaternius LowPoly Bundle: https://quaternius.itch.io/quaternius-lowpoly-bundle
- Poly Pizza: https://poly.pizza/ · flat.social credits: https://flat.social/ja/credits · Cinevva: https://app.cinevva.com/es/guides/free-3d-model-sites
- Spline: https://spline.design/ · Mixamo: https://www.mixamo.com/ · NASA 3D Resources: https://science.nasa.gov/3d-resources/
- Smithsonian Open Access: https://www.thehistoryblog.com/?p=57989
- glTF Transform CLI: https://gltf-transform.dev/cli · repo: https://github.com/donmccurdy/glTF-Transform
- glTF Report: https://gltf.report/ · glTF Viewer: https://gltf-viewer.donmccurdy.com/
- KTX-Software: https://github.com/KhronosGroup/KTX-Software · meshoptimizer: https://meshoptimizer.org/ · Draco: https://google.github.io/draco/
