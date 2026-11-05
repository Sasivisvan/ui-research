#!/usr/bin/env node
// Build script for the Interface Parts Manual site. No dependencies.
// Run from the project root:  node website/build.mjs
// Reads docs/ (recursively) and the master report, writes:
//   website/content.js  -> window.UIFG_DOCS = [{ id, section, title, path, md }]
//   website/index.html  -> standalone page (src/page.html wrapped in a full document)

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, basename, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(SITE, '..');
const DOCS = join(ROOT, 'docs');
const REPORT = join(ROOT, 'reports', 'UI components animations and assets.md');

const RESERVED = new Set(['settings', 'sidebar', 'customize', 'upgrade', 'downloads', 'home', 'motion-lab', 'search']);

const SECTIONS = ['Start', 'Foundations', 'Components', 'Animations', 'Assets', 'Report'];
const FOLDER_SECTION = { foundations: 'Foundations', components: 'Components', animations: 'Animations', assets: 'Assets' };

// Fallback reading order when a folder README does not link a file.
const PREFERRED = {
  Start: ['README.md', '00-start-here.md'],
  Foundations: ['design-tokens-color-type', 'layout-responsive-mobile', 'accessibility', 'performance',
    'browser-support-2026', 'tech-stacks', 'launch-checklist'],
  Components: ['navigation-structure', 'actions-inputs', 'content-display', 'feedback-overlays',
    'signature-experiential', 'component-libraries'],
  Animations: ['motion-principles-easing', 'micro-interactions', 'hover-effects', 'scroll-animations',
    'text-animations', 'page-transitions', 'layout-state-animation', 'svg-lottie-rive', '3d-webgl-shaders',
    'backgrounds-effects', 'libraries', 'performance-accessibility', 'browser-support'],
  Assets: ['licensing-cheatsheet', 'fonts', 'icons', '3d-and-animated-icons', 'illustrations', 'photos', 'video',
    'sound', '3d-models-textures', 'mockups', 'design-tools', 'inspiration-galleries', 'optimization'],
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith('.')) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (name.toLowerCase().endsWith('.md')) out.push(p);
  }
  return out;
}

function slugPart(s) {
  return s.toLowerCase().replace(/\.md$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function makeId(relPath) {
  // relPath is relative to docs/, posix separators
  const parts = relPath.split('/');
  const file = parts.pop();
  const stem = file.replace(/\.md$/i, '');
  let id;
  if (/^readme$/i.test(stem)) {
    id = parts.length ? slugPart(parts.join('-')) + '-index' : 'overview';
  } else {
    const s = slugPart(stem).replace(/^\d+-/, '') || slugPart(stem);
    id = [...parts.map(slugPart), s].filter(Boolean).join('-');
  }
  if (!id || RESERVED.has(id) || id.startsWith('comment-') || id === 'master-report') id = 'doc-' + id;
  return id;
}

function titleOf(md, fallback) {
  const m = md.match(/^#\s+(.+?)\s*#*\s*$/m);
  if (!m) return fallback;
  return m[1].replace(/\*\*|__|`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').trim();
}

function sectionOf(relPath) {
  const parts = relPath.split('/');
  if (parts.length === 1) return 'Start';
  return FOLDER_SECTION[parts[0]] || 'Start';
}

// Order of .md links inside a folder README (first appearance wins).
function readmeOrder(folderAbs) {
  const readme = readdirSync(folderAbs).find((n) => /^readme\.md$/i.test(n));
  if (!readme) return [];
  const md = readFileSync(join(folderAbs, readme), 'utf8');
  const order = [];
  for (const m of md.matchAll(/\]\(([^)#\s]+\.md)(?:#[^)]*)?\)/g)) {
    const target = posix.normalize(m[1]);
    if (target.includes('/')) continue; // only same-folder links
    if (!order.includes(target)) order.push(target);
  }
  return order;
}

const files = existsSync(DOCS) ? walk(DOCS) : [];
const docs = files.map((abs) => {
  const rel = relative(DOCS, abs).split(/[\\/]/).join('/');
  const md = readFileSync(abs, 'utf8').replace(/\r\n?/g, '\n');
  return {
    id: makeId(rel),
    section: sectionOf(rel),
    title: titleOf(md, basename(rel, '.md')),
    path: 'docs/' + rel,
    md,
    _rel: rel,
    _abs: abs,
  };
});

function rank(doc) {
  const file = basename(doc._rel);
  if (/^readme\.md$/i.test(file)) return [-1, 0];
  // Curated order first, then the order the folder README links files, then alphabetical.
  const pref = PREFERRED[doc.section] || [];
  const iP = pref.findIndex((p) => p === file || p === file.replace(/\.md$/i, ''));
  if (iP >= 0) return [0, iP];
  const iR = readmeOrder(dirname(doc._abs)).indexOf(file);
  if (iR >= 0) return [1, iR];
  return [2, 0];
}

docs.sort((a, b) => {
  const s = SECTIONS.indexOf(a.section) - SECTIONS.indexOf(b.section);
  if (s) return s;
  // Start section: top-level files before nested ones
  const ra = rank(a), rb = rank(b);
  return ra[0] - rb[0] || ra[1] - rb[1] || a._rel.localeCompare(b._rel);
});

if (existsSync(REPORT)) {
  const md = readFileSync(REPORT, 'utf8').replace(/\r\n?/g, '\n');
  docs.push({ id: 'master-report', section: 'Report', title: titleOf(md, 'Master report'),
    path: 'reports/' + basename(REPORT), md });
}

// Unique ids
const seen = new Map();
for (const d of docs) {
  let id = d.id, n = 2;
  while (seen.has(id)) id = d.id + '-' + n++;
  d.id = id;
  seen.set(id, true);
}

const out = docs.map(({ id, section, title, path, md }) => ({ id, section, title, path, md }));
const js = '/* Generated by website/build.mjs on ' + new Date().toISOString() + ' - do not edit. */\n' +
  'window.UIFG_DOCS = ' + JSON.stringify(out).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029') + ';\n';
writeFileSync(join(SITE, 'content.js'), js);

const page = readFileSync(join(SITE, 'src', 'page.html'), 'utf8');
// Head part = everything up to the end of the first <style> block (title, meta, fonts, CSS).
// The rest (markup + scripts) goes into <body>.
const cut = page.search(/<\/style>/i);
const headPart = cut >= 0 ? page.slice(0, cut + 8) : '';
const bodyPart = cut >= 0 ? page.slice(cut + 8) : page;
const doc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>
/* Mirrors the reset that the artifact publish skeleton adds. */
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif}
img{max-width:100%}
[hidden]{display:none!important}
</style>
${headPart.trim()}
</head>
<body>
${bodyPart.trim()}
</body>
</html>
`;
writeFileSync(join(SITE, 'index.html'), doc);

const bySection = SECTIONS.map((s) => `${s}: ${docs.filter((d) => d.section === s).length}`).join(', ');
console.log(`content.js: ${docs.length} docs (${bySection}), ${(Buffer.byteLength(js) / 1024).toFixed(0)} KB`);
console.log('index.html written');
