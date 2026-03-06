import { useEffect, useRef } from 'react';

export default function NeuralCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const cx = cv.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const IS_MOBILE = window.innerWidth < 768;
    const COUNT = IS_MOBILE ? 35 : 90;
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
    for (let i = 0; i < COUNT; i++) pts.push({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.32, vy:(Math.random()-.5)*.32 });
    if (!IS_MOBILE) document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const CELL = 140;
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

    const FPS = IS_MOBILE ? 18 : 24;
    const INTERVAL = 1000/FPS;
    let lastFrame = 0;
    function draw(ts) {
      if (!active) return;
      if (document.hidden) { requestAnimationFrame(draw); return; }
      if (ts - lastFrame < INTERVAL) { requestAnimationFrame(draw); return; }
      lastFrame = ts;
      cx.clearRect(0,0,W,H);
      cx.save();
      cx.translate(0, -scrollY*0.2);
      const grid = buildGrid();
      pts.forEach((p, idx) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x<0||p.x>W) p.vx *= -1; if (p.y<0||p.y>H) p.vy *= -1;
        const ddx=mx-p.x, ddy=my-p.y, dd=Math.sqrt(ddx*ddx+ddy*ddy);
        if (dd<150) { p.x += ddx*.003; p.y += ddy*.003; }
        cx.beginPath(); cx.arc(p.x,p.y,1.5,0,Math.PI*2);
        cx.fillStyle='rgba(57,255,20,0.6)'; cx.fill();
        neighbors(grid,p).forEach(j => {
          if (j<=idx) return;
          const b=pts[j], dx=p.x-b.x, dy=p.y-b.y, d=Math.sqrt(dx*dx+dy*dy);
          if (d<140) { cx.beginPath(); cx.strokeStyle=`rgba(57,255,20,${0.15*(1-d/140)})`; cx.lineWidth=0.6; cx.moveTo(p.x,p.y); cx.lineTo(b.x,b.y); cx.stroke(); }
        });
      });
      cx.restore();
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
    return () => { active = false; window.removeEventListener('resize', rsz); window.removeEventListener('scroll', onScroll); };
  }, []);

  return <canvas id="neural" ref={ref}></canvas>;
}
