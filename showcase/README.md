# Interface Parts: the showcase site

Static site generated from `../docs`. Zero framework; one build dependency (`marked`).

```bash
cd showcase
npm ci
node build.mjs        # writes dist/
python3 -m http.server 4173 -d dist
```

- `demos/NN.html`: 50 component demos (self-contained, copied into prompts)
- `anim/*.html`: 40 animation demos; the first `<!--meta {...}-->` comment sets category, title, description and motion note
- `labs/*.html`: fonts, icons and sound labs (fragments wrapped by the build)
- `assets/site.css|js`: site chrome (header, palette ⌘K, tabs, toast, filters)
- `expand.mjs`: dev helper that replaces `@@P@@` in new demo files with the shared preamble
- Prompts for models are emitted to `dist/prompts/<slug>.md` and indexed in `dist/llms.txt`

The assets directory is parsed from the tables in `../docs/assets/*.md`, so editing those docs and rebuilding updates the site.

## Deploy

`vercel.json` at the repo root points Vercel at this folder. Import the GitHub repo in Vercel (framework preset: Other) and every push to `main` deploys.
