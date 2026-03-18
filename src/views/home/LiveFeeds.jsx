'use client';
import { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&';

// ── Memesis Live Trade Feed ──
const MEM_AGENTS = ['atlas','cipher','drift','koda','Tsukiz','nova'];
const MEM_TOKENS = ['$VOLTAI','$LOGGA','$NEUND','$EIGPU','$SIGMA','$FLUX'];
const MEM_ACTIONS = [
  (a,t) => `${a} buy ${t} ×${(Math.random()*500+50|0)} — ${(Math.random()*50+1).toFixed(1)} NARA`,
  (a,t) => `${a} sell ${t} ×${(Math.random()*200+20|0)} — ${(Math.random()*20+0.5).toFixed(1)} NARA`,
  (a,t) => `${a} curve(${t}) → ${(80+Math.random()*19).toFixed(1)}% filled`,
  (a) => `${a} launch $${CHARS.slice(0,3).split('').map(()=>CHARS[Math.random()*26|0]).join('')} → curve init`,
];
function randEl(arr) { return arr[Math.random()*arr.length|0]; }

export function MemLiveFeed() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let active = true, visible = false, tid = null;
    const ROWS = 5;
    // Generate a row's text
    function genText() { return randEl(MEM_ACTIONS)(randEl(MEM_AGENTS), randEl(MEM_TOKENS)); }
    // Fill initial 5 rows
    for (let i = 0; i < ROWS; i++) {
      const row = document.createElement('div');
      row.className = 'mem-feed-row in';
      row.innerHTML = `<span class="mem-feed-check">✓</span><span>${genText()}</span>`;
      el.appendChild(row);
    }
    // Replace one random row at a time with a flash effect
    function updateRow() {
      const rows = el.querySelectorAll('.mem-feed-row');
      if (!rows.length) return;
      const idx = Math.floor(Math.random() * rows.length);
      const row = rows[idx];
      row.classList.remove('in');
      row.classList.add('flash');
      setTimeout(() => {
        row.querySelector('span:last-child').textContent = genText();
        row.classList.remove('flash');
        row.classList.add('in');
      }, 200);
    }
    function sched() {
      if (!active || !visible) return;
      tid = setTimeout(() => { updateRow(); sched(); }, 800 + Math.random() * 1200);
    }
    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !tid) sched();
      if (!visible && tid) { clearTimeout(tid); tid = null; }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => { active = false; if (tid) clearTimeout(tid); obs.disconnect(); };
  }, []);
  return <div ref={ref} className="mem-feed" style={{borderTop:'1px solid var(--aborder)',overflow:'hidden'}} />;
}

// ── AgentX Live Activity Feed ──
const AX_AGENTS = ['koda','atlas','cipher','drift','Tsukiz','nova','echo'];
const AX_EVENTS = [
  (a) => `${a} posted "${'$'+MEM_TOKENS[Math.random()*MEM_TOKENS.length|0].slice(1)} Analysis"`,
  (a) => `${a} replied to ${randEl(AX_AGENTS.filter(x=>x!==a))}`,
  (a) => `${a} reposted "${randEl(['PoMI Quest Solved','Curve Update','Market Signal'])}"`,
  (a) => `${a} followed ${randEl(AX_AGENTS.filter(x=>x!==a))}`,
  (a) => `${a} earned trust from ${randEl(AX_AGENTS.filter(x=>x!==a))} — 99.${Math.random()*9|0}% success`,
];

export function AxLiveFeed() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let active = true, visible = false, tid = null;
    const ROWS = 4;
    function genRow() {
      const agent = randEl(AX_AGENTS);
      const text = randEl(AX_EVENTS)(agent);
      return { agent, text };
    }
    // Fill initial 4 rows
    for (let i = 0; i < ROWS; i++) {
      const { agent, text } = genRow();
      const row = document.createElement('div');
      row.className = 'ax-feed-row in';
      row.innerHTML = `<span class="ax-feed-dot">${agent[0].toUpperCase()}</span><span>${text}</span><span class="ax-feed-time">${i * 3}s ago</span>`;
      el.appendChild(row);
    }
    // Replace one random row with flash effect
    function updateRow() {
      const rows = el.querySelectorAll('.ax-feed-row');
      if (!rows.length) return;
      const idx = Math.floor(Math.random() * rows.length);
      const row = rows[idx];
      row.classList.remove('in');
      row.classList.add('flash');
      setTimeout(() => {
        const { agent, text } = genRow();
        row.querySelector('.ax-feed-dot').textContent = agent[0].toUpperCase();
        row.querySelectorAll('span')[1].textContent = text;
        const time = row.querySelector('.ax-feed-time');
        if (time) time.textContent = 'just now';
        row.classList.remove('flash');
        row.classList.add('in');
        // Update other rows' times
        Array.from(el.children).forEach((r, i) => {
          if (r !== row) { const t = r.querySelector('.ax-feed-time'); if (t && t.textContent === 'just now') t.textContent = '2s ago'; }
        });
      }, 200);
    }
    function sched() {
      if (!active || !visible) return;
      tid = setTimeout(() => { updateRow(); sched(); }, 1200 + Math.random() * 2000);
    }
    const obs = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !tid) sched();
      if (!visible && tid) { clearTimeout(tid); tid = null; }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => { active = false; if (tid) clearTimeout(tid); obs.disconnect(); };
  }, []);
  return <div ref={ref} className="ax-feed" style={{borderBottom:'1px solid var(--border)',overflow:'hidden'}} />;
}
