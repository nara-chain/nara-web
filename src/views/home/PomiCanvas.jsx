'use client';
import { useEffect, useRef } from 'react';

export default function PomiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const pc = canvasRef.current;
    if (!pc) return;
    const px = pc.getContext('2d');
    const PH = 220;
    const PDPR = Math.min(window.devicePixelRatio||1, 2);
    const NR = 28;

    function getW() { return pc.parentElement.offsetWidth || 520; }
    function rsz() {
      const w = getW();
      pc.width = w*PDPR; pc.height = PH*PDPR;
      pc.style.width = w+'px'; pc.style.height = PH+'px';
      px.setTransform(PDPR,0,0,PDPR,0,0);
    }
    rsz();
    window.addEventListener('resize', rsz);

    function sx(i) {
      const W = pc.width/PDPR, pad = W*0.12, span = W-pad*2;
      return pad + i*(span/3);
    }
    const SY = PH*0.52;
    const NODES = [
      {label:'QUESTION', sub:'on-chain', color:'#39ff14'},
      {label:'AGENT', sub:'compute', color:'#39ff14'},
      {label:'ZK PROOF', sub:'groth16', color:'#39ff14'},
      {label:'NARA', sub:'rewarded', color:'#00d4aa'},
    ];

    let step = 0, stepT = 0, zkP = 0;
    let burst = [];
    let active = true;
    const LINE_DUR = 0.6;
    const STEP_DUR = [0.8, LINE_DUR, 0.8, LINE_DUR, 2.0, LINE_DUR, 2.0];

    function spawnBurst(x, y) {
      burst = [];
      for (let i=0; i<18; i++) {
        const a = Math.random()*Math.PI*2, sp = 1.5+Math.random()*3;
        burst.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,color:i%3===0?'#00ff88':'#39ff14'});
      }
    }

    function nodeLit(nodeIdx) {
      if (nodeIdx === 0) return step >= 0;
      if (nodeIdx === 1) return step >= 2;
      if (nodeIdx === 2) return step >= 4;
      if (nodeIdx === 3) return step >= 6;
      return false;
    }

    function edgeProgress(edgeIdx) {
      const edgeStep = edgeIdx * 2 + 1;
      if (step < edgeStep) return 0;
      if (step === edgeStep) return Math.min(1, stepT / LINE_DUR);
      return 1;
    }

    function drawNode(i, isActive) {
      const x = sx(i), y = SY, n = NODES[i];
      if (isActive) {
        const g = px.createRadialGradient(x,y,NR*0.8,x,y,NR*2.4);
        g.addColorStop(0,'rgba(57,255,20,0.22)'); g.addColorStop(1,'rgba(57,255,20,0)');
        px.beginPath(); px.arc(x,y,NR*2.4,0,Math.PI*2); px.fillStyle=g; px.fill();
      }
      px.beginPath(); px.arc(x,y,NR,0,Math.PI*2);
      px.fillStyle = isActive ? 'rgba(57,255,20,0.12)' : 'rgba(57,255,20,0.04)'; px.fill();
      px.beginPath(); px.arc(x,y,NR,0,Math.PI*2);
      px.strokeStyle = isActive ? (i===3?'rgba(0,212,170,0.9)':'rgba(57,255,20,0.85)') : 'rgba(57,255,20,0.2)';
      px.lineWidth = isActive?1.5:1; px.stroke();
      px.textAlign='center'; px.textBaseline='middle';
      px.fillStyle = isActive ? (i===3?'#00d4aa':'#e8e8e8') : 'rgba(85,85,85,0.4)';
      px.font = `800 ${i===2?8:9}px JetBrains Mono,monospace`;
      px.fillText(n.label, x, y);
      px.fillStyle = isActive ? 'rgba(255,255,255,0.75)' : 'rgba(85,85,85,0.25)';
      px.font = '700 9px JetBrains Mono,monospace';
      px.fillText(n.label, x, y-NR-14);
      px.fillStyle = isActive ? (i===3?'rgba(0,212,170,0.6)':'rgba(57,255,20,0.5)') : 'rgba(85,85,85,0.2)';
      px.font = '600 8px JetBrains Mono,monospace';
      px.fillText(n.sub, x, y+NR+12);
      if (i===2 && zkP>0) {
        px.beginPath(); px.arc(x,y,NR+6,-Math.PI/2,-Math.PI/2+Math.PI*2*zkP);
        px.strokeStyle='rgba(57,255,20,0.8)'; px.lineWidth=2; px.stroke();
      }
      if (i===3 && isActive && step===6) {
        px.beginPath(); px.arc(x,y,NR+6,0,Math.PI*2);
        px.strokeStyle=`rgba(0,212,170,${0.6+0.4*Math.sin(stepT*8)})`; px.lineWidth=2; px.stroke();
      }
    }

    function drawEdge(i) {
      const x1=sx(i)+NR+4, x2=sx(i+1)-NR-4, y=SY;
      const p = edgeProgress(i);
      px.beginPath(); px.strokeStyle='rgba(57,255,20,0.06)';
      px.lineWidth=1; px.setLineDash([]); px.moveTo(x1,y); px.lineTo(x2,y); px.stroke();
      if (p > 0) {
        const xEnd = x1 + (x2-x1)*p;
        px.beginPath(); px.strokeStyle='rgba(57,255,20,0.25)';
        px.lineWidth=1; px.moveTo(x1,y); px.lineTo(xEnd,y); px.stroke();
        if (p < 1) {
          const glow = px.createRadialGradient(xEnd,y,0,xEnd,y,12);
          glow.addColorStop(0,'rgba(57,255,20,0.7)'); glow.addColorStop(1,'rgba(57,255,20,0)');
          px.beginPath(); px.arc(xEnd,y,12,0,Math.PI*2); px.fillStyle=glow; px.fill();
          px.beginPath(); px.arc(xEnd,y,3,0,Math.PI*2); px.fillStyle='rgba(57,255,20,0.9)'; px.fill();
        }
      }
    }

    let lastT = 0;

    function draw(ts) {
      if (!active) return;
      if (document.hidden) { requestAnimationFrame(draw); return; }
      const dt = Math.min((ts-lastT)/1000, 0.05); lastT = ts;
      stepT += dt;

      if (step === 4) zkP = Math.min(1, stepT / (STEP_DUR[4]*0.8));
      if (stepT > STEP_DUR[step]) {
        stepT = 0;
        step++;
        if (step === 6) spawnBurst(sx(3), SY);
        if (step > 6) { step = 0; zkP = 0; burst = []; }
      }

      px.clearRect(0, 0, pc.width/PDPR, PH);
      for (let i=0; i<3; i++) drawEdge(i);
      for (let i=0; i<4; i++) drawNode(i, nodeLit(i));

      burst.forEach(b => {
        b.x += b.vx; b.y += b.vy; b.life -= dt*0.7;
        if (b.life > 0) {
          px.beginPath(); px.arc(b.x, b.y, 2*b.life, 0, Math.PI*2);
          px.fillStyle = b.color.replace(')', `,${b.life})`).replace('rgb','rgba');
          px.globalAlpha = b.life; px.fill(); px.globalAlpha = 1;
        }
      });
      burst = burst.filter(b => b.life > 0);

      requestAnimationFrame(draw);
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && active) requestAnimationFrame(draw);
    }, { threshold: 0.2 });
    obs.observe(pc);

    return () => { active = false; window.removeEventListener('resize', rsz); obs.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} width="1072" height="260" aria-label="PoMI computation flow animation" style={{width:'100%',border:'1px solid var(--border)',background:'#0c0c0c',display:'block'}} />
  );
}
