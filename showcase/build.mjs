// Builds dist/ from ../docs/components/*.md + demos/NN.html. Zero config: `node build.mjs`.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const DOCS = path.join(ROOT, '..', 'docs', 'components');
const DIST = path.join(ROOT, 'dist');
const SITE = process.env.SITE_URL || '';

const CATS = [
  { id: 'navigation', file: 'navigation-structure.md', name: 'Navigation & structure', blurb: 'Headers, menus, tabs, footers — how people move.' },
  { id: 'actions', file: 'actions-inputs.md', name: 'Actions & inputs', blurb: 'Buttons, forms, pickers — how people act.' },
  { id: 'content', file: 'content-display.md', name: 'Content & display', blurb: 'Heroes, cards, galleries, pricing — what people read.' },
  { id: 'feedback', file: 'feedback-overlays.md', name: 'Feedback & overlays', blurb: 'Modals, toasts, loaders — how the page answers back.' },
  { id: 'signature', file: 'signature-experiential.md', name: 'Signature & experiential', blurb: 'Cursors, preloaders, portfolios — the memorable bits.' },
];

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const slugify = (t) => {
  const s = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return s.length <= 44 ? s : s.slice(0, 44).replace(/-[^-]*$/, '');
};
// docs-only noise a model should not see
const clean = (md) => md
  .replace(/\[([^\]]+)\]\((?:https?:[^)]*|[^)]*\.md[^)]*|#[^)]*)\)/g, '$1')
  .replace(/\*\*\[synthesis\]\*\*|\[synthesis\]|\((?:unverified|search only|third-party)\)/gi, '')
  .replace(/[ \t]+$/gm, '').replace(/\n{3,}/g, '\n\n').trim();
const stripNotes = (md) => md.replace(/^> ⚠.*$/gm, '');

const LABELS = [
  ['what', /^What/], ['variants', /^Variants/], ['states', /^States/], ['crafted', /^Crafted/],
  ['mobile', /^Desktop vs mobile/], ['a11y', /^Accessibility/], ['code', /^Code/],
  ['libs', /^Libraries/], ['links', /^Inspiration/], ['caveats', /^Caveats/],
];

function parseSection(lines) {
  const blocks = {}; let cur = null; let fence = false;
  for (const line of lines) {
    if (line.startsWith('```')) fence = !fence;
    const m = !fence && line.match(/^\*\*(.+?)\*\*(.*)$/);
    const hit = m && LABELS.find(([, re]) => re.test(m[1]));
    if (hit) { cur = hit[0]; blocks[cur] = (m[2] || '').replace(/^[.:\s]+/, '') + '\n'; continue; }
    if (cur) blocks[cur] += line + '\n';
  }
  for (const k in blocks) blocks[k] = blocks[k].trim();
  return blocks;
}

// description column from the index table
const readme = fs.readFileSync(path.join(DOCS, 'README.md'), 'utf8');
const descs = {};
for (const m of readme.matchAll(/^\| (\d+) \| (.+?) \| (.+?) \| \[/gm)) descs[+m[1]] = m[3].replace(/`/g, '');

const parts = [];
for (const cat of CATS) {
  const lines = fs.readFileSync(path.join(DOCS, cat.file), 'utf8').split('\n');
  let start = null; let fence = false; const secs = [];
  lines.forEach((l, i) => {
    if (l.startsWith('```')) fence = !fence;
    if (!fence && /^## \d+\. /.test(l)) { if (start) secs.push([start, i]); start = i; }
    else if (!fence && /^## /.test(l) && start !== null) { secs.push([start, i]); start = null; }
  });
  if (start !== null) secs.push([start, lines.length]);
  for (const [a, b] of secs) {
    const [, n, title] = lines[a].match(/^## (\d+)\. (.+)$/);
    const blocks = parseSection(lines.slice(a + 1, b));
    parts.push({ n: +n, title, slug: slugify(title), cat: cat.id, catName: cat.name, desc: descs[+n] || '', blocks });
  }
}
parts.sort((x, y) => x.n - y.n);
if (parts.length !== 50) throw new Error(`expected 50 components, got ${parts.length}`);

const STACKS = [
  ['html', 'Plain HTML, CSS and vanilla JS (no build step)'],
  ['react', 'React + TypeScript with Tailwind CSS'],
  ['next', 'Next.js App Router + TypeScript + Tailwind CSS (add "use client" only where state or effects need it)'],
  ['vue', 'Vue 3 (script setup) with scoped CSS'],
  ['svelte', 'Svelte 5 with scoped CSS'],
];

function promptFor(p, demo) {
  const b = p.blocks; const sec = (h, t) => (t ? `\n## ${h}\n${clean(stripNotes(t))}\n` : '');
  return `# Build: ${p.title} (component ${p.n} of 50)

You are a senior front-end engineer. Implement the "${p.title}" UI component below in my project. ${p.desc}.

## Stack
{{STACK}}
${sec('When to use it', b.what)}${sec('Variants (default to the first unless I ask otherwise)', b.variants)}${sec('States to design', b.states)}${sec('Craft rules (avoid the generic look)', b.crafted)}${sec('Desktop vs mobile', b.mobile)}${sec('Accessibility (non-negotiable)', b.a11y)}
## Reference implementation
A working, self-contained demo (vanilla HTML/CSS/JS). Treat it as the behaviour and look to match, not as code to paste blindly.

\`\`\`html
${demo.trim()}
\`\`\`

## How to deliver
1. Port the reference to my stack; keep the semantics, ARIA, keyboard behaviour and \`prefers-reduced-motion\` handling.
2. Swap placeholder copy and colours for my design tokens; keep the spacing and motion timings unless they clash.
3. Make it work at 390px and 1280px wide; touch targets at least 44px.
4. Reply with the files to add or change (full paths), then two lines on how to use it.
`;
}

const mdHtml = (t) => marked.parse(clean(stripNotes(t || '')), { gfm: true });
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/[\u2028\u2029]/g, ' ');

const tpl = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'd'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'c'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'prompts'), { recursive: true });
fs.cpSync(path.join(ROOT, 'assets'), path.join(DIST, 'assets'), { recursive: true });


const head = (title, desc, rel) => `<!doctype html>
<html lang="en" data-theme="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#f2eee4">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23ff4a1c'/%3E%3Cpath d='M8 24V8h8a5 5 0 010 10H8' fill='none' stroke='%23fff' stroke-width='3'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Martian+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&display=swap">
<link rel="stylesheet" href="${rel}assets/site.css">
<script>try{var t=localStorage.getItem('ip-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>`;

// ---- animations: anim/*.html carry a <!--meta {...}--> comment
const ACATS = [
  { id: 'ease', name: 'Easing & timing', blurb: 'Curves, springs and stagger — the feel of motion.' },
  { id: 'hover', name: 'Hover effects', blurb: 'Reveals, rolls, tilts and glows for pointers.' },
  { id: 'micro', name: 'Micro-interactions', blurb: 'Press, like, confirm, error — tiny feedback.' },
  { id: 'text', name: 'Text animation', blurb: 'Split, scramble, variable weight, odometers.' },
  { id: 'scroll', name: 'Scroll', blurb: 'Progress, reveal, parallax, pinned, stacked.' },
  { id: 'page', name: 'Page transitions', blurb: 'View Transitions, wipes and curtains.' },
  { id: 'layout', name: 'Layout & state', blurb: 'FLIP, auto-height and enter/exit without libraries.' },
  { id: 'svg', name: 'SVG & drawing', blurb: 'Line draw, morph, gooey, turbulence.' },
  { id: 'bg', name: 'Backgrounds', blurb: 'Grain, aurora, dot grids, halftone.' },
  { id: 'three', name: '3D & shaders', blurb: 'CSS 3D, depth layers, raw WebGL.' },
];
const ANIMS = [];
for (const f of fs.readdirSync(path.join(ROOT, 'anim')).sort()) {
  const src = fs.readFileSync(path.join(ROOT, 'anim', f), 'utf8');
  const m = src.match(/<!--meta (\{.*?\}) -->/s);
  if (!m) throw new Error(`no meta in anim/${f}`);
  const meta = JSON.parse(m[1]);
  const cat = ACATS.find((c) => c.id === meta.cat);
  if (!cat) throw new Error(`bad cat in ${f}`);
  ANIMS.push({ ...meta, id: f.replace('.html', ''), slug: f.replace('.html', ''), catName: cat.name, src });
}
ANIMS.sort((a, b) => ACATS.findIndex((c) => c.id === a.cat) - ACATS.findIndex((c) => c.id === b.cat) || a.id.localeCompare(b.id));
ANIMS.forEach((a, i) => (a.n = i + 1));

// ---- assets: every sources/tools table in docs/assets becomes a directory entry
const ADOCS = path.join(ROOT, '..', 'docs', 'assets');
const AKIND = { icons: 'Icons', fonts: 'Fonts', photos: 'Photos', illustrations: 'Illustrations', '3d-models-textures': '3D models', '3d-and-animated-icons': '3D & animated icons', sound: 'Sound', video: 'Video', 'design-tools': 'Design tools', 'inspiration-galleries': 'Inspiration', mockups: 'Mockups' };
const SKIPHEAD = /^(tier|option|concern|group|risk|setting|sketchfab licence|issue|aesthetic|command|effect|source type|licence|license|what|use|topic|rule|metric|format|check)$/i;
const plain = (t) => t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*|`|\\/g, '').replace(/\s+/g, ' ').trim();
const firstLink = (t) => (t.match(/\]\((https?:[^)\s]+)\)/) || [])[1] || '';
const ASSETS = [];
const seen = new Set();
for (const [file, kind] of Object.entries(AKIND)) {
  const lines = fs.readFileSync(path.join(ADOCS, `${file}.md`), 'utf8').split('\n');
  let section = '';
  for (let i = 0; i < lines.length; i++) {
    if (/^#{2,3} /.test(lines[i])) section = plain(lines[i].replace(/^#+\s*(\d+(\.\d+)*\.?\s*)?/, ''));
    if (!/^\|.*\|$/.test(lines[i]) || !/^\|[\s:|-]+\|$/.test(lines[i + 1] || '')) continue;
    const split = (l) => l.slice(1, -1).split(/(?<!\\)\|/).map((c) => c.trim());
    const hdr = split(lines[i]).map((h) => plain(h).toLowerCase());
    let j = i + 2; const rows = [];
    while (j < lines.length && /^\|.*\|$/.test(lines[j])) rows.push(split(lines[j++]));
    i = j - 1;
    if (SKIPHEAD.test(hdr[0]) || hdr.length < 2) continue;
    const li = hdr.findIndex((h) => /licen/.test(h)); const si = hdr.findIndex((h) => /status/.test(h));
    for (const r of rows) {
      const name = plain(r[0]); if (!name || name.length > 60 || /^n\/a$/i.test(name)) continue;
      const status = si >= 0 ? plain(r[si] || '') : '';
      if (/shutting down|\bdead\b|parked|redirect|\bdown\b/i.test(status)) continue;
      const lic = li >= 0 ? plain(r[li] || '') : (hdr.some((h) => /licen/.test(h)) ? '' : '');
      const desc = plain(r[1] || '');
      const key = `${kind}|${name.toLowerCase()}`; if (seen.has(key)) continue; seen.add(key);
      const url = firstLink(r[0]) || r.map(firstLink).find(Boolean) || '';
      const open = /CC0|\bMIT\b|Apache|\bOFL\b|\bISC\b|public domain|\bPDM\b|Unsplash|Pexels|Pixabay|BSD|CC BY|MPL|GPL|Open Font|ITF|free/i.test(lic);
      ASSETS.push({ name, kind, section, desc: desc.length > 170 ? desc.slice(0, 167) + '…' : desc, lic: lic.length > 90 ? lic.slice(0, 87) + '…' : lic, open, url: url || `https://www.google.com/search?q=${encodeURIComponent(name + ' ' + kind.toLowerCase())}`, direct: !!url });
    }
  }
}

const NAV = [['components', 'Components'], ['animations', 'Animations'], ['assets', 'Assets']];
const header = (rel, active = '') => `<a class="skip" href="#main">Skip to content</a>
<header class="top" id="top">
  <a class="brand" href="${rel || './'}" aria-label="Interface Parts home"><span class="brand-mark" aria-hidden="true">IP</span><span class="brand-name">Interface Parts</span></a>
  <nav class="top-nav" aria-label="Primary">${NAV.map(([k, n]) => `<a href="${rel}${k}/"${active === k ? ' aria-current="page"' : ''}>${n}</a>`).join('')}</nav>
  <div class="top-tools">
    <button class="btn btn-ghost" id="open-search" type="button" aria-label="Search everything" aria-keyshortcuts="Control+K Meta+K"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3.5 3.5"/></svg><span class="hide-sm">Search</span><kbd class="hide-sm">⌘K</kbd></button>
    <button class="btn btn-icon" id="theme" type="button" aria-label="Toggle theme"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="9" cy="9" r="3.5"/><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4"/></svg></button>
  </div>
</header>
<nav class="tabbar" aria-label="Primary mobile">${NAV.map(([k, n]) => `<a href="${rel}${k}/"${active === k ? ' aria-current="page"' : ''}>${n}</a>`).join('')}<button type="button" id="open-search-m">Search</button></nav>
<dialog class="palette" id="palette" aria-label="Search everything">
  <form method="dialog"><div class="pal-field"><input id="pal-input" type="search" placeholder="Search components, animations, assets…" autocomplete="off" spellcheck="false" aria-controls="pal-list"><button class="btn btn-ghost" value="x" aria-label="Close search">Esc</button></div></form>
  <ul id="pal-list" role="listbox" aria-label="Results"></ul>
</dialog>`;

const footer = (rel) => `<footer class="foot">
  <div class="foot-inner">
    <p class="foot-big" aria-label="Pick. Copy. Ship.">Pick.<br><em>Copy.</em> Ship.</p>
    <div class="foot-row">
      <p class="mono">${parts.length} components · ${ANIMS.length} animations · ${ASSETS.length}+ assets · every one with a demo or a licence note.</p>
      <p class="mono"><a href="${rel}components/">Components</a> · <a href="${rel}animations/">Animations</a> · <a href="${rel}assets/">Assets</a> · <a href="${rel}llms.txt">llms.txt</a> · <a href="#top">Top ↑</a></p>
    </div>
  </div>
</footer>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="${rel}assets/site.js" defer></script>`;

// ---- shared item pages (components at /c/, animations at /a/)
const genericMotion = `- Animate transform and opacity only; never width, height, top or left.
- Respect prefers-reduced-motion: swap the motion for an instant or very short change.
- Keep durations short: 150–300ms for UI, up to ~700ms for large/expressive moves.
- Pointer-only effects must be gated with @media (hover:hover) and (pointer:fine); touch needs an equivalent.`;
const animPrompt = (a, demo) => `# Build: ${a.title} (animation ${a.n} of ${ANIMS.length})

You are a senior front-end engineer. Implement this animation effect in my project: ${a.desc}

## Stack
{{STACK}}

## Motion rules
${a.note}
${genericMotion}

## Reference implementation
A working, self-contained demo (vanilla HTML/CSS/JS). Match the behaviour and timing; port the code to my stack.

\`\`\`html
${demo.trim()}
\`\`\`

## How to deliver
1. Port it to my stack and attach it to the element(s) I name, keeping the easing and durations.
2. Keep the reduced-motion and keyboard behaviour; add cleanup (remove listeners, cancel rAF) on unmount.
3. Test at 390px and 1280px. Reply with the files to add or change (full paths) and two lines on usage.
`;

const pad = (n) => String(n).padStart(2, '0');
const missing = [];

function itemPage(it, list, i) {
  const isC = it.type === 'c'; const base = isC ? 'c' : 'a'; const dir = isC ? 'd' : 'e';
  const prev = list[i - 1]; const next = list[i + 1];
  const prompt = it.prompt;
  const variants = isC ? (it.blocks.variants?.match(/^\| \d+ \|/gm) || []).length : 0;
  const specHtml = isC
    ? [['what', 'When to use it'], ['variants', 'Variants'], ['states', 'States'], ['crafted', 'Crafted vs generic'], ['mobile', 'Desktop vs mobile'], ['a11y', 'Accessibility'], ['libs', 'Libraries and tools'], ['caveats', 'Caveats']]
        .filter(([k]) => it.blocks[k]).map(([k, h]) => `<h2>${h}</h2>${k === 'variants' ? `<div class="table-wrap">${mdHtml(it.blocks[k])}</div>` : mdHtml(it.blocks[k])}`).join('\n')
    : `<h2>What it does</h2><p>${esc(it.desc)}</p><h2>Rules that make it feel crafted</h2><p>${esc(it.note)}</p><h2>Always</h2>${mdHtml(genericMotion)}`;
  const dirName = isC ? 'components' : 'animations';
  const html = `${head(`${it.title} — Interface Parts`, `${it.desc}`, '../../')}
<body class="page-part">
${header('../../', dirName)}
<main id="main">
  <section class="part-head">
    <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="../../${dirName}/">${isC ? 'Components' : 'Animations'}</a></li><li><a href="../../${dirName}/#cat-${it.cat}">${esc(it.catName)}</a></li><li aria-current="page">${esc(it.title)}</li></ol></nav>
    <p class="mono part-no">${isC ? 'Component' : 'Animation'} Nº ${pad(it.n)} <span aria-hidden="true">/</span> ${list.length}</p>
    <h1 class="part-title">${esc(it.title)}</h1>
    <p class="part-desc">${esc(it.desc.replace(/\.$/, ''))}.</p>
    <div class="part-actions">
      <button class="btn btn-primary" data-copy="prompt" type="button">Copy prompt for AI</button>
      <button class="btn" data-copy="code" type="button">Copy code</button>
      <button class="btn" data-copy="link" type="button" title="Copies a one-line instruction with the prompt URL, for models that can fetch links">Copy link for AI</button>
      <a class="btn btn-ghost" href="../../${dir}/${isC ? pad(it.n) : it.id}.html" target="_blank" rel="noopener">Open full screen ↗</a>
    </div>
  </section>
  <section class="workbench" aria-label="Workbench">
    <div class="tabs" role="tablist" aria-label="Views" data-tabs>
      <button role="tab" id="t-preview" aria-controls="p-preview" aria-selected="true" type="button">Preview</button>
      <button role="tab" id="t-prompt" aria-controls="p-prompt" aria-selected="false" tabindex="-1" type="button">Prompt</button>
      <button role="tab" id="t-code" aria-controls="p-code" aria-selected="false" tabindex="-1" type="button">Code</button>
      <button role="tab" id="t-spec" aria-controls="p-spec" aria-selected="false" tabindex="-1" type="button">${isC ? 'Spec' : 'Notes'}${variants ? ` <span class="count">${variants}</span>` : ''}</button>
      <span class="tab-ind" aria-hidden="true"></span>
    </div>
    <div class="panel" role="tabpanel" id="p-preview" aria-labelledby="t-preview">
      <div class="vp-bar">
        <fieldset class="seg" aria-label="Preview width"><legend class="sr">Preview width</legend>
          <label><input type="radio" name="vp" value="100%" checked><span>Desktop</span></label>
          <label><input type="radio" name="vp" value="768px"><span>Tablet</span></label>
          <label><input type="radio" name="vp" value="390px"><span>Mobile</span></label>
        </fieldset>
        <p class="mono vp-note"><output id="vp-out">fluid</output></p>
      </div>
      <div class="stage"><div class="frame" id="frame"><iframe title="${esc(it.title)} demo" src="../../${dir}/${isC ? pad(it.n) : it.id}.html" loading="eager"></iframe></div></div>
    </div>
    <div class="panel" role="tabpanel" id="p-prompt" aria-labelledby="t-prompt" hidden>
      <div class="code-bar"><label class="sel"><span class="mono">Stack</span><select id="stack">${STACKS.map(([k, v]) => `<option value="${k}">${esc(v.split(' (')[0])}</option>`).join('')}</select></label><button class="btn btn-primary" data-copy="prompt" type="button">Copy prompt</button></div>
      <pre class="code" id="prompt-pre" tabindex="0"></pre>
      <p class="hint">Paste into Claude, ChatGPT, Cursor or any coding agent. The reference demo is already inside.</p>
    </div>
    <div class="panel" role="tabpanel" id="p-code" aria-labelledby="t-code" hidden>
      <div class="code-bar"><span class="mono">${isC ? pad(it.n) : it.id}.html · self-contained</span><button class="btn" data-copy="code" type="button">Copy code</button></div>
      <pre class="code" id="code-pre" tabindex="0"></pre>
    </div>
    <div class="panel prose" role="tabpanel" id="p-spec" aria-labelledby="t-spec" hidden>${specHtml}</div>
  </section>
  <nav class="pager" aria-label="More">
    ${prev ? `<a href="../${prev.slug}/" rel="prev"><span class="mono">← Nº ${pad(prev.n)}</span><strong>${esc(prev.title)}</strong></a>` : '<span></span>'}
    ${next ? `<a href="../${next.slug}/" rel="next"><span class="mono">Nº ${pad(next.n)} →</span><strong>${esc(next.title)}</strong></a>` : '<span></span>'}
  </nav>
</main>
${footer('../../')}
<script type="application/json" id="part-data">${json({ n: it.n, slug: it.slug, title: it.title, prompt, stacks: STACKS, code: it.code })}</script>
</body>
</html>`;
  fs.mkdirSync(path.join(DIST, base, it.slug), { recursive: true });
  fs.writeFileSync(path.join(DIST, base, it.slug, 'index.html'), html);
  fs.writeFileSync(path.join(DIST, 'prompts', `${it.slug}.md`), prompt.replace('{{STACK}}', 'Match my existing project stack and conventions. If there is none, use plain HTML, CSS and vanilla JS.'));
}

fs.mkdirSync(path.join(DIST, 'e'), { recursive: true });
for (const d of ['components', 'animations', 'assets']) fs.mkdirSync(path.join(DIST, d), { recursive: true });
for (const p of parts) {
  const df = path.join(ROOT, 'demos', `${pad(p.n)}.html`);
  let demo; if (fs.existsSync(df)) demo = fs.readFileSync(df, 'utf8'); else { demo = '<!doctype html><title>todo</title><p>Demo coming.</p>'; missing.push(p.n); }
  fs.writeFileSync(path.join(DIST, 'd', `${pad(p.n)}.html`), demo);
  Object.assign(p, { type: 'c', code: demo, prompt: promptFor(p, demo) });
}
for (const a of ANIMS) {
  fs.writeFileSync(path.join(DIST, 'e', `${a.id}.html`), a.src);
  Object.assign(a, { type: 'a', code: a.src, prompt: animPrompt(a, a.src) });
}
parts.forEach((p, i) => itemPage(p, parts, i));
ANIMS.forEach((a, i) => itemPage(a, ANIMS, i));

// global search index
fs.writeFileSync(path.join(DIST, 'assets', 'parts.json'), JSON.stringify([
  ...parts.map((p) => ({ t: 'Component', n: p.n, href: `c/${p.slug}/`, title: p.title, desc: p.desc, cat: p.catName })),
  ...ANIMS.map((a) => ({ t: 'Animation', n: a.n, href: `a/${a.slug}/`, title: a.title, desc: a.desc, cat: a.catName })),
  ...['fonts', 'icons', 'sound'].map((k) => ({ t: 'Lab', n: 0, href: `assets/${k}/`, title: `${k[0].toUpperCase() + k.slice(1)} lab`, desc: { fonts: 'Type specimens, pairings by aesthetic, copy CSS', icons: 'Search 200k+ open-licence icons across sets', sound: 'Synthesised UI sounds you can copy' }[k], cat: 'Assets' })),
  ...ASSETS.map((x) => ({ t: 'Asset', n: 0, href: x.direct ? x.url : `assets/#${encodeURIComponent(x.name)}`, ext: x.direct, title: x.name, desc: `${x.kind} · ${x.desc}`, cat: x.kind })),
]));

// ---- list pages
const thumb = (href, src, title) => `<span class="thumb" aria-hidden="true"><iframe src="${src}" loading="lazy" tabindex="-1" title=""></iframe></span>`;
const card = (it, rel) => `<li data-cat="${it.cat}"><a class="card" href="${rel}${it.type}/${it.slug}/">${thumb('', `${rel}${it.type === 'c' ? 'd' : 'e'}/${it.type === 'c' ? pad(it.n) : it.id}.html`)}<span class="card-meta"><span class="mono">Nº ${pad(it.n)}</span><span class="mono card-cat">${esc(it.catName.split(' & ')[0])}</span></span><strong>${esc(it.title)}</strong><span class="card-desc">${esc(it.desc)}</span></a></li>`;
const chips = (cats, items) => `<div class="filters" role="group" aria-label="Filter by shelf"><button class="chip" type="button" aria-pressed="true" data-filter="all">All <span>${items.length}</span></button>${cats.map((c) => `<button class="chip" type="button" aria-pressed="false" data-filter="${c.id}">${esc(c.name.split(' & ')[0])} <span>${items.filter((p) => p.cat === c.id).length}</span></button>`).join('')}</div>`;

function listPage({ dirName, active, title, kicker, h1, lede, cats, items, blurbs }) {
  return `${head(`${title} — Interface Parts`, lede, '../')}
<body class="page-list">
${header('../', active)}
<main id="main">
  <section class="list-head"><p class="mono eyebrow">${kicker}</p><h1 class="part-title">${h1}</h1><p class="part-desc">${lede}</p></section>
  <section class="cats" aria-label="Shelves"><div class="bento ${cats.length > 6 ? 'b10' : 'b5'}">${cats.map((c) => `<a class="tile tile-s" id="cat-${c.id}" href="#grid" data-cat="${c.id}"><span class="mono">${String(items.filter((p) => p.cat === c.id).length).padStart(2, '0')} items</span><strong>${esc(c.name)}</strong><span class="tile-blurb">${esc(c.blurb)}</span></a>`).join('')}</div></section>
  <section class="browse"><div class="browse-head"><h2 class="sec-title"><span class="mono">Everything</span>The full index.</h2>${chips(cats, items)}</div>
    <ul class="grid" id="grid">${items.map((it) => card(it, '../')).join('')}</ul><p class="empty" id="empty" hidden>Nothing matches.</p></section>
</main>
${footer('../')}
</body>
</html>`;
}
const CPAGE_CATS = CATS.map((c) => ({ ...c }));
fs.writeFileSync(path.join(DIST, 'components', 'index.html'), listPage({ dirName: 'components', active: 'components', title: 'Components', kicker: `${parts.length} components · live demos · copy-ready prompts`, h1: 'Components', lede: 'Fifty interface parts across five shelves. Open one, poke the demo at any width, copy the prompt, hand it to your model.', cats: CPAGE_CATS, items: parts }));
fs.writeFileSync(path.join(DIST, 'animations', 'index.html'), listPage({ dirName: 'animations', active: 'animations', title: 'Animations', kicker: `${ANIMS.length} effects · easing to WebGL`, h1: 'Animations', lede: 'Working motion you can steal: hover, scroll, text, transitions, SVG, backgrounds and 3D. Each one respects reduced motion and ships as a self-contained snippet.', cats: ACATS, items: ANIMS }));

// ---- assets directory + labs
const kinds = [...new Set(ASSETS.map((a) => a.kind))];
const rcard = (a) => `<li class="rcard" data-kind="${esc(a.kind)}" data-open="${a.open ? 1 : 0}" id="${encodeURIComponent(a.name)}"><div class="rtop"><span class="mono">${esc(a.kind)}</span>${a.open ? '<span class="lic">Open licence</span>' : ''}</div><h3><a href="${esc(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.name)}<span aria-hidden="true"> ↗</span></a></h3><p>${esc(a.desc)}</p>${a.lic ? `<p class="rlic mono">${esc(a.lic)}</p>` : ''}${a.direct ? '' : '<p class="rlic mono">No link in research — web search</p>'}</li>`;
const labs = [['fonts', 'Fonts lab', 'Type specimens, pairings by aesthetic, copy CSS or a prompt.'], ['icons', 'Icons lab', 'Search 200,000+ open-licence icons across the best sets, copy SVG.'], ['sound', 'Sound lab', 'Eight UI sounds synthesised in your browser — copy the code.']];
fs.writeFileSync(path.join(DIST, 'assets', 'index.html'), `${head('Assets — Interface Parts', 'A licence-checked directory of icons, fonts, photos, illustrations, 3D, sound, video, design tools and inspiration galleries — plus fonts, icons and sound labs.', '../')}
<body class="page-assets">
${header('../', 'assets')}
<main id="main">
  <section class="list-head"><p class="mono eyebrow">${ASSETS.length} sources · licence-checked 5 Nov 2026</p><h1 class="part-title">Assets</h1><p class="part-desc">Where to get type, icons, images, sound, 3D and inspiration — with the licence read for you. Try the labs, or search the directory.</p></section>
  <section class="cats" aria-label="Labs"><div class="bento b3">${labs.map(([k, n, d]) => `<a class="tile tile-lab" href="${k}/"><span class="mono">Live lab</span><strong>${n}</strong><span class="tile-blurb">${d}</span><span class="tile-n">→</span></a>`).join('')}</div></section>
  <section class="browse" aria-labelledby="dir-h"><div class="browse-head"><h2 id="dir-h" class="sec-title"><span class="mono">Directory</span>Every source we vetted.</h2></div>
    <div class="dir-tools"><label class="sel"><span class="mono">Search</span><input id="dq" type="search" placeholder="unsplash, lucide, CC0…" autocomplete="off"></label><label class="chk"><input type="checkbox" id="dopen"> Open licences only</label></div>
    <div class="filters" role="group" aria-label="Filter by kind"><button class="chip" type="button" aria-pressed="true" data-kind="all">All <span>${ASSETS.length}</span></button>${kinds.map((k) => `<button class="chip" type="button" aria-pressed="false" data-kind="${esc(k)}">${esc(k)} <span>${ASSETS.filter((a) => a.kind === k).length}</span></button>`).join('')}</div>
    <ul class="rgrid" id="rg">${ASSETS.map(rcard).join('')}</ul><p class="empty" id="dempty" hidden>No sources match.</p></section>
</main>
${footer('../')}
</body></html>`);
for (const [k, n, d] of labs) {
  fs.mkdirSync(path.join(DIST, 'assets', k), { recursive: true });
  fs.writeFileSync(path.join(DIST, 'assets', k, 'index.html'), `${head(`${n} — Interface Parts`, d, '../../')}
<body class="page-lab">
${header('../../', 'assets')}
<main id="main">
  <section class="list-head"><nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="../">Assets</a></li><li aria-current="page">${n}</li></ol></nav><h1 class="part-title">${n}</h1><p class="part-desc">${d}</p></section>
  ${fs.readFileSync(path.join(ROOT, 'labs', `${k}.html`), 'utf8')}
</main>
${footer('../../')}
</body></html>`);
}

// ---- home hub
const marqItems = [...parts.slice(0, 18).map((p) => [`c/${p.slug}/`, p.title.split(/,| and /)[0]]), ...ANIMS.slice(0, 14).map((a) => [`a/${a.slug}/`, a.title]), ['assets/fonts/', 'Fonts lab'], ['assets/icons/', 'Icons lab'], ['assets/sound/', 'Sound lab']];
const marq = marqItems.map(([h, t]) => `<a href="${h}" tabindex="-1">${esc(t)}</a>`).join('<i aria-hidden="true">✦</i>');
const feat = [parts[10], parts[31], parts[40], ANIMS.find((a) => a.id === 'tilt-glare'), ANIMS.find((a) => a.id === 'three-webgl-shader'), ANIMS.find((a) => a.id === 'bg-aurora')].filter(Boolean);
const home = `${head('Interface Parts — inspiration for web UI: components, animations, assets you can copy into any AI prompt', 'Pick a component, animation or asset from a curated, licence-checked library. Live demos, mobile and desktop previews, and prompts a coding model can follow.', '')}
<body class="page-home">
${header('', '')}
<main id="main">
  <section class="hero">
    <p class="mono eyebrow">Inspiration you can ship · desktop + mobile</p>
    <h1 class="hero-title"><span>Pick it.</span> <span><em>Copy</em> it.</span> <span>Ask the model.</span></h1>
    <div class="hero-row">
      <p class="lede">A pattern book for websites that aren’t the default template: ${parts.length} components, ${ANIMS.length} animations and ${ASSETS.length}+ licence-checked assets. Each one has a live demo and a prompt a coding model can follow without guessing.</p>
      <div class="hero-cta"><a class="btn btn-primary btn-lg" href="components/">Browse components</a><button class="btn btn-lg" id="hero-search" type="button">Search everything <kbd>⌘K</kbd></button></div>
    </div>
  </section>
  <div class="marquee" aria-hidden="true"><div class="marquee-track">${marq}<i>✦</i>${marq}</div></div>
  <section class="cats" aria-labelledby="dom-h">
    <h2 id="dom-h" class="sec-title"><span class="mono">Three shelves</span>Start where the idea starts.</h2>
    <div class="bento b3">
      <a class="tile tile-big" href="components/"><span class="mono">Nº 01–${parts.length}</span><strong>Components</strong><span class="tile-blurb">Headers to heroes to toasts. Variants with exact specs, accessibility and mobile rules.</span><span class="tile-list mono">${CATS.map((c) => c.name.split(' & ')[0]).join(' · ')}</span><span class="tile-n">${parts.length}</span></a>
      <a class="tile tile-big" href="animations/"><span class="mono">Nº 01–${ANIMS.length}</span><strong>Animations</strong><span class="tile-blurb">Easing, hover, scroll, text, transitions, SVG, backgrounds and WebGL — as live snippets.</span><span class="tile-list mono">${ACATS.slice(0, 6).map((c) => c.name.split(' & ')[0]).join(' · ')} …</span><span class="tile-n">${ANIMS.length}</span></a>
      <a class="tile tile-big" href="assets/"><span class="mono">${ASSETS.length} sources</span><strong>Assets</strong><span class="tile-blurb">Fonts, icons, photos, illustrations, 3D, sound, video, tools — licences read for you, plus live labs.</span><span class="tile-list mono">Fonts lab · Icons lab · Sound lab</span><span class="tile-n">${ASSETS.length}</span></a>
    </div>
  </section>
  <section class="browse" aria-labelledby="ft-h"><div class="browse-head"><h2 id="ft-h" class="sec-title"><span class="mono">Fresh picks</span>A few to start with.</h2></div><ul class="grid" id="grid">${feat.map((it) => card(it, '')).join('')}</ul></section>
  <section class="steps" id="how" aria-labelledby="how-h">
    <h2 id="how-h" class="sec-title"><span class="mono">How it works</span>Three moves, no guesswork.</h2>
    <ol>
      <li><span class="num">1</span><h3>Pick</h3><p>Preview at desktop, tablet and phone width. Poke it — the demos are real.</p></li>
      <li><span class="num">2</span><h3>Copy the prompt</h3><p>Spec, accessibility rules, craft notes and a working reference — one block.</p></li>
      <li><span class="num">3</span><h3>Paste to your model</h3><p>Claude, ChatGPT, Cursor, any agent. Choose your stack first; it adapts the code.</p></li>
    </ol>
  </section>
  <section class="prompt-demo" aria-labelledby="pd-h">
    <h2 id="pd-h" class="sec-title"><span class="mono">What you paste</span>A prompt a model can’t misread.</h2>
    <pre class="code sample" tabindex="0"># Build: Buttons (component 11 of 50)
You are a senior front-end engineer…

## Stack            → your choice: HTML · React · Next.js · Vue · Svelte
## When to use it   → one primary per view, icon buttons need aria-label…
## Variants         → 3D-press, magnetic, split, ghost… with exact specs
## Craft rules      → one signature effect, asymmetric press/release timing
## Accessibility    → focus-visible, 44px targets, reduced motion
## Reference implementation → working HTML/CSS/JS, tested in the preview
## How to deliver   → files + paths, 390px and 1280px, brand tokens</pre>
  </section>
</main>
${footer('')}
</body>
</html>`;
fs.writeFileSync(path.join(DIST, 'index.html'), home);

fs.writeFileSync(path.join(DIST, 'llms.txt'), `# Interface Parts
> ${parts.length} UI components and ${ANIMS.length} animations, each with a plain-markdown prompt you can follow to implement it.

${CATS.map((c) => `## ${c.name}\n${parts.filter((p) => p.cat === c.id).map((p) => `- [${p.title}](${SITE}/prompts/${p.slug}.md): ${p.desc}`).join('\n')}`).join('\n\n')}

## Animations
${ANIMS.map((a) => `- [${a.title}](${SITE}/prompts/${a.slug}.md): ${a.desc}`).join('\n')}
`);
fs.writeFileSync(path.join(DIST, '404.html'), head('Not found — Interface Parts', 'Page not found', '/') + `<body class="page-404">${header('/')}<main id="main" class="nf"><p class="mono">404</p><h1 class="part-title">Not on the shelf.</h1><p class="part-desc">That page doesn’t exist.</p><a class="btn btn-primary" href="/">Back to the index</a></main>${footer('/')}</body></html>`);
console.log(`built ${parts.length} components, ${ANIMS.length} animations, ${ASSETS.length} assets${missing.length ? `; demos missing: ${missing.join(',')}` : ''}`);
