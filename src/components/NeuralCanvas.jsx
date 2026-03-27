'use client';
import { useEffect, useRef } from 'react';

export default function NeuralCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const IS_MOBILE = window.innerWidth < 768;
    const COUNT = IS_MOBILE ? 35 : 85;
    let W, H;
    const pts = [];
    let mx = -999, my = -999;
    let scrollY = 0;
    let active = true;

    function rsz() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    rsz();
    window.addEventListener('resize', rsz);
    for (let i = 0; i < COUNT; i++) {
      const ox = Math.random()*W, oy = Math.random()*H;
      pts.push({
      x: ox, y: oy, ox, oy,
      vx: (Math.random()-.5)*.7,
      vy: (Math.random()-.5)*.7,
      pulse: Math.random() * Math.PI * 2, // phase offset for pulsing
    });
    }
    if (!IS_MOBILE) document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const CELL = 160;
    function buildGrid() {
      const g = {};
      pts.forEach((p, i) => { const k = `${Math.floor(p.x/CELL)},${Math.floor(p.y/CELL)}`; if(!g[k])g[k]=[]; g[k].push(i); });
      return g;
    }
    function neighbors(grid, p) {
      const res = [], gx = Math.floor(p.x/CELL), gy = Math.floor(p.y/CELL);
      for (let dx=-1;dx<=1;dx++) for (let dy=-1;dy<=1;dy++) { const k=`${gx+dx},${gy+dy}`; if(grid[k])grid[k].forEach(i=>res.push(i)); }
      return res;
    }

    const FPS = IS_MOBILE ? 24 : 30;
    const INTERVAL = 1000/FPS;
    let lastFrame = 0;
    let rafId = 0;
    function draw(ts) {
      if (!active) return;
      if (ts - lastFrame < INTERVAL) { rafId = requestAnimationFrame(draw); return; }
      lastFrame = ts;
      cx.clearRect(0,0,W,H);
      cx.save();
      cx.translate(0, -scrollY*0.15);
      const grid = buildGrid();
      const time = ts * 0.001;
      const connCount = new Uint8Array(COUNT); // track connections per node
      const MAX_CONN = 5;
      // Update positions
      pts.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>W) p.vx *= -1; if (p.y<0||p.y>H) p.vy *= -1;
        // Repulsion between nearby nodes
        neighbors(grid, p).forEach(j => {
          if (j <= idx) return;
          const b = pts[j], rdx = p.x - b.x, rdy = p.y - b.y;
          const dist = Math.sqrt(rdx*rdx + rdy*rdy);
          if (dist < 80 && dist > 0) {
            const force = 0.5 * (1 - dist/80);
            p.x += (rdx/dist) * force;
            p.y += (rdy/dist) * force;
            b.x -= (rdx/dist) * force;
            b.y -= (rdy/dist) * force;
          }
        });
        // Gentle pull back toward origin to prevent clustering
        p.vx += (p.ox - p.x) * 0.0003;
        p.vy += (p.oy - p.y) * 0.0003;
        // Mouse attraction — stronger
        const ddx=mx-p.x, ddy=my-p.y, dd=Math.sqrt(ddx*ddx+ddy*ddy);
        if (dd<200) { p.x += ddx*.008; p.y += ddy*.008; }
      });
      // Draw dots
      pts.forEach((p, idx) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.5 + p.pulse);
        const alpha = 0.4 + pulse * 0.6;
        cx.beginPath(); cx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
        cx.fillStyle = `rgba(57,255,20,${alpha})`;
        cx.shadowColor = 'rgba(57,255,20,0.4)';
        cx.shadowBlur = 3;
        cx.fill();
        cx.shadowBlur = 0;
      });
      // Draw connections (max 5 per node)
      pts.forEach((p, idx) => {
        if (connCount[idx] >= MAX_CONN) return;
        neighbors(grid,p).forEach(j => {
          if (j<=idx) return;
          if (connCount[idx] >= MAX_CONN || connCount[j] >= MAX_CONN) return;
          const b=pts[j], dx=p.x-b.x, dy=p.y-b.y, d=Math.sqrt(dx*dx+dy*dy);
          if (d<180) {
            connCount[idx]++; connCount[j]++;
            const lineAlpha = 0.25 * (1 - d/180);
            cx.beginPath();
            cx.strokeStyle = `rgba(57,255,20,${lineAlpha})`;
            cx.lineWidth = 0.8;
            cx.moveTo(p.x, p.y); cx.lineTo(b.x, b.y);
            cx.stroke();
          }
        });
      });
      cx.restore();
      rafId = requestAnimationFrame(draw);
    }
    function startLoop() { rafId = requestAnimationFrame(draw); }
    function stopLoop() { cancelAnimationFrame(rafId); rafId = 0; }
    function onVisChange() {
      if (!active) return;
      if (document.hidden) stopLoop(); else startLoop();
    }
    document.addEventListener('visibilitychange', onVisChange);
    startLoop();
    return () => { active = false; stopLoop(); document.removeEventListener('visibilitychange', onVisChange); window.removeEventListener('resize', rsz); window.removeEventListener('scroll', onScroll); };
  }, []);

  return <canvas id="neural" ref={ref} style={{willChange:'transform'}}></canvas>;
}
