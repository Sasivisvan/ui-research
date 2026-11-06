// Dev helper: demos are authored with @@P@@ (shared preamble) and expanded in place so each file ships self-contained.
import fs from 'node:fs';
const P = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">
<style>
:root{--ink:#15130e;--paper:#f2eee4;--p2:#e6e0d0;--accent:#ff4a1c;--line:rgba(21,19,14,.22);--serif:Georgia,"Times New Roman",serif;--mono:ui-monospace,Menlo,monospace;color-scheme:light}
*{box-sizing:border-box}body{margin:0;min-height:100svh;background:var(--paper);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px}
button,input,select,textarea{font:inherit;color:inherit}
a{color:inherit}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.c{min-height:calc(100svh - 48px);display:grid;place-items:center;align-content:center;gap:16px}
@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}}
</style>`;
for (const dir of ['demos','anim']) for (const f of fs.readdirSync(dir)) {
  const p = `${dir}/${f}`; const s = fs.readFileSync(p, 'utf8');
  if (s.includes('@@P@@')) fs.writeFileSync(p, s.replace('@@P@@', P));
}
