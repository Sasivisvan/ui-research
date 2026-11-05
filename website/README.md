# Interface Parts Manual (website)

A static reference site for the Markdown set in `../docs/` and the master report in
`../reports/`. It has no server and no build dependencies.

## Rebuild

Run this from the project root (`/home/sasi/Ui_Research`) whenever the docs change:

```sh
node website/build.mjs
```

The script walks `docs/` recursively, adds `reports/UI components animations and assets.md`,
and writes two files:

- `website/content.js` sets `window.UIFG_DOCS = [{ id, section, title, path, md }]`.
  - `id` is the hash route, derived from the path: `docs/components/navigation-structure.md` becomes
    `components-navigation-structure`, `docs/README.md` becomes `overview`, a folder README becomes
    `<folder>-index`, `00-start-here.md` becomes `start-here`, and the report becomes `master-report`.
    Reserved ids (`settings`, `sidebar`, `customize`, `upgrade`, `downloads`, `comment-*`) are never produced.
  - `section` is one of Start, Foundations, Components, Animations, Assets or Report.
  - Order within a section: the folder README first, then the curated list in `PREFERRED` (in
    `build.mjs`), then the order in which the folder README links files, then alphabetical.
- `website/index.html` is `src/page.html` wrapped in a full HTML document (doctype, charset,
  viewport with `viewport-fit=cover`, and a small reset). You can open it straight from disk.

New Markdown files appear in the site automatically on the next build.

## Host

Upload the folder with `index.html` and `content.js` side by side to any static host (GitHub
Pages, Netlify, Vercel, S3, nginx). Nothing else is needed. The page loads marked 12.0.2,
DOMPurify 3.1.6 and highlight.js 11.9.0 from cdnjs, and fonts from Google Fonts.

To publish as a Claude Artifact, publish `src/page.html` as the page and `content.js` as a
supporting file at the same relative path. `src/page.html` follows the artifact page contract:
no doctype, html, head or body tags; title and meta at the top.

## Structure

```
website/
  build.mjs       Node build script, no dependencies
  src/page.html   The page: CSS tokens (light and dark), markup, app script, Motion lab demos
  content.js      Generated docs bundle
  index.html      Generated standalone page
  README.md       This file
```

## What the page does

- Hash routes: `#<doc-id>` for a document, `#motion-lab` for the live demos, and no hash for the
  cover page. Heading anchors never change the hash. Links inside docs scroll to the heading
  after render, using GitHub-style heading slugs with a tolerant fallback.
- Relative `.md` links are rewritten to `#doc-id`. Folder links go to that folder's README, or to
  the folder's first doc if it has no README. Links to files that are not in the set show as
  dashed text with a tooltip.
- Search (`/` or Ctrl/Cmd+K) scores titles, headings and body text per section and shows snippets.
- Each code block gets a language label and a copy button. Tables and code scroll sideways inside
  their own containers.
- Verification markers such as `[Cited]`, `(unverified)`, `[Synthesis]`, `[Reference build]`,
  "Editor's note:" and "Untested reference snippet" are rendered as labelled chips.
- The theme toggle and the last visited doc are stored in localStorage. This is a convenience
  only, and the page works without it.
