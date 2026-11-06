(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const safe = (fn) => { try { return fn(); } catch (e) { return null; } };

  /* toast */
  const toastEl = $('#toast'); let tt;
  const toast = (msg) => { toastEl.textContent = msg; toastEl.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('is-on'), 2400); };
  const copy = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); }
    catch { const t = Object.assign(document.createElement('textarea'), { value: text }); document.body.append(t); t.select(); document.execCommand('copy'); t.remove(); }
    toast(msg);
  };

  /* theme: auto -> light -> dark */
  $('#theme').addEventListener('click', () => {
    const cur = root.dataset.theme; const order = ['auto', 'light', 'dark'];
    const next = order[(order.indexOf(cur) + 1) % 3]; root.dataset.theme = next;
    safe(() => localStorage.setItem('ip-theme', next)); toast(`Theme: ${next}`);
  });

  /* header hides on scroll down */
  const top = $('#top'); let ly = scrollY;
  addEventListener('scroll', () => { const y = scrollY; top.classList.toggle('is-hidden', y > ly && y > 160); ly = y; }, { passive: true });

  /* command palette */
  const pal = $('#palette'); const inp = $('#pal-input'); const list = $('#pal-list');
  const base = $('link[href$="site.css"]').getAttribute('href').replace('assets/site.css', '');
  let parts = null; let sel = 0; let shown = [];
  const url = (p) => (p.ext ? p.href : base + p.href);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const render = () => {
    const q = inp.value.trim().toLowerCase();
    shown = parts.filter((p) => !q || `${p.title} ${p.desc} ${p.cat} ${p.t}`.toLowerCase().includes(q)).slice(0, 24);
    sel = 0;
    list.innerHTML = shown.map((p, i) => `<li role="option" aria-selected="${i === 0}"><a href="${esc(url(p))}"${p.ext ? ' target="_blank" rel="noopener noreferrer"' : ''}><span class="mono">${p.n ? String(p.n).padStart(2, '0') : '··'}</span><span>${esc(p.title)}</span><small>${esc(p.t)}</small></a></li>`).join('') || '<li style="padding:1rem;color:var(--ink-2)">No match</li>';
  };
  const mark = (i) => { $$('li', list).forEach((li, k) => li.setAttribute('aria-selected', k === i)); $$('li', list)[i]?.scrollIntoView({ block: 'nearest' }); };
  const open = async () => {
    if (!parts) parts = await fetch(`${base}assets/parts.json`).then((r) => r.json());
    pal.showModal(); inp.value = ''; render(); inp.focus();
  };
  $('#open-search').addEventListener('click', open);
  $('#hero-search')?.addEventListener('click', open);
  $('#open-search-m')?.addEventListener('click', open);
  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    else if (e.key === '/' && !/input|textarea|select/i.test(e.target.tagName) && !pal.open) { e.preventDefault(); open(); }
  });
  inp.addEventListener('input', render);
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(sel + 1, shown.length - 1); mark(sel); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(sel - 1, 0); mark(sel); }
    else if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); { const p = shown[sel]; p.ext ? window.open(p.href, '_blank', 'noopener') : (location.href = url(p)); } }
  });
  pal.addEventListener('click', (e) => { if (e.target === pal) pal.close(); });

  /* ---------- home ---------- */
  const grid = $('#grid');
  if (grid) {
    const cards = $$('li', grid); const chips = $$('.chip');
    const apply = (cat) => {
      chips.forEach((c) => c.setAttribute('aria-pressed', c.dataset.filter === cat));
      let n = 0; cards.forEach((li) => { const on = cat === 'all' || li.dataset.cat === cat; li.hidden = !on; n += on; });
      $('#empty').hidden = n > 0;
    };
    chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter)));
    $$('.tile[data-cat]').forEach((t) => t.addEventListener('click', () => apply(t.dataset.cat)));
    // scale iframe thumbnails to their box
    const fit = () => $$('.thumb').forEach((t) => t.style.setProperty('--s', t.clientWidth / 1280));
    fit(); new ResizeObserver(fit).observe(grid);
    // cursor spotlight
    grid.addEventListener('pointermove', (e) => {
      const c = e.target.closest('.card'); if (!c) return; const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }

  /* ---------- assets directory ---------- */
  const rg = $('#rg');
  if (rg) {
    const items = $$('.rcard', rg); const kc = $$('.chip[data-kind]');
    let kind = 'all';
    const f = () => {
      const q = $('#dq').value.trim().toLowerCase(); const open = $('#dopen').checked; let n = 0;
      items.forEach((li) => { const on = (kind === 'all' || li.dataset.kind === kind) && (!open || li.dataset.open === '1') && (!q || li.textContent.toLowerCase().includes(q)); li.hidden = !on; n += on; });
      $('#dempty').hidden = n > 0;
    };
    kc.forEach((b) => b.addEventListener('click', () => { kind = b.dataset.kind; kc.forEach((x) => x.setAttribute('aria-pressed', x === b)); f(); }));
    $('#dq').addEventListener('input', f); $('#dopen').addEventListener('change', f);
    if (location.hash) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); t?.classList.add('flash'); t?.scrollIntoView({ block: 'center' }); }
  }

  /* ---------- component page ---------- */
  const dataEl = $('#part-data'); if (!dataEl) return;
  const D = JSON.parse(dataEl.textContent);
  const stackSel = $('#stack'); const promptPre = $('#prompt-pre');
  const promptText = () => D.prompt.replace('{{STACK}}', D.stacks.find(([k]) => k === stackSel.value)[1]);
  const paint = () => { promptPre.textContent = promptText(); safe(() => localStorage.setItem('ip-stack', stackSel.value)); };
  stackSel.value = safe(() => localStorage.getItem('ip-stack')) || 'html'; if (!stackSel.value) stackSel.value = 'html';
  stackSel.addEventListener('change', paint); paint();
  $('#code-pre').textContent = D.code;

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-copy]'); if (!b) return;
    const k = b.dataset.copy;
    if (k === 'prompt') copy(promptText(), 'Prompt copied — paste it into your AI');
    else if (k === 'code') copy(D.code, 'Code copied');
    else copy(`Implement the UI component described at ${location.origin}/prompts/${D.slug}.md in my project. Fetch that file, follow it exactly, and adapt it to my stack.`, 'Link prompt copied');
  });

  /* tabs: roving tabindex + sliding indicator */
  const tl = $('[data-tabs]'); const tabs = $$('[role=tab]', tl); const ind = $('.tab-ind', tl);
  const place = () => { const t = tabs.find((x) => x.getAttribute('aria-selected') === 'true'); ind.style.setProperty('--x', `${t.offsetLeft}px`); ind.style.setProperty('--w', `${t.offsetWidth}px`); };
  const show = (t, focus) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
    place(); if (focus) t.focus(); history.replaceState(null, '', '#' + t.id.slice(2));
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => show(t));
    t.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (k) { e.preventDefault(); show(tabs[(i + k + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); show(tabs[0], true); } if (e.key === 'End') { e.preventDefault(); show(tabs.at(-1), true); }
    });
  });
  const hash = location.hash.slice(1); show(tabs.find((t) => t.id === 't-' + hash) || tabs[0]);
  addEventListener('resize', place); document.fonts?.ready.then(place);

  /* viewport switcher */
  const frame = $('#frame'); const out = $('#vp-out');
  $$('input[name=vp]').forEach((r) => r.addEventListener('change', () => { frame.style.width = r.value; out.textContent = r.value === '100%' ? 'fluid' : r.value; }));
})();
