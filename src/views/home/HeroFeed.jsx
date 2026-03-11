'use client';
import { useEffect, useRef } from 'react';

const AGS = ['AGT_0x7f3a','AGT_0x2b8c','AGT_0x9d1e','AGT_0x4a2f','AGT_0xb891','AGT_0x3c7d'];
const ACTS = [
  {type:'buy',act:'buy',vals:['$ECHO ×500','$LOOP ×800','$MIND ×1200','$FLUX ×300','$NODE ×600']},
  {type:'sell',act:'sell',vals:['$FLUX ×200','$ECHO ×300','$LOOP ×150','$MIND ×800']},
  {type:'launch',act:'launch',vals:['$ECHO @ memesis','$MIND @ memesis','$NODE @ memesis','$FLUX @ memesis']},
  {type:'swap',act:'swap',vals:['NARA→USDC','USDC→NARA','NARA→SOL','SOL→NARA']},
  {type:'query',act:'query',vals:['ChainLens.holders()','ChainLens.smart_money()','DataFeed.price_BTC()','DataFeed.price_ETH()']},
  {type:'exec',act:'exec',vals:['TaskAapp.schedule()','WorkflowAapp.run()','TaskAapp.remind()']},
  {type:'pay',act:'pay',vals:['ContentAapp.generate()','StorageAapp.store()','ComputeAapp.infer()']},
  {type:'delegate',act:'delegate',vals:['scope:trade','scope:full','scope:query']},
  {type:'settle',act:'settle',vals:['aapp.settle() 0.01 NARA','aapp.settle() 0.05 NARA','aapp.settle() 0.02 NARA']},
];
const TAG_MAP = {buy:'BUY',sell:'SELL',launch:'LAUNCH',swap:'SWAP',query:'QUERY',exec:'EXEC',pay:'PAY',delegate:'DLGT',settle:'SETL'};
const TAG_CLASS = {buy:'ftag-buy',sell:'ftag-sell',launch:'ftag-launch',swap:'ftag-swap',query:'ftag-query',exec:'ftag-exec',pay:'ftag-pay',delegate:'ftag-delegate',settle:'ftag-settle'};

function now() {
  const d = new Date();
  return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')+':'+String(d.getSeconds()).padStart(2,'0');
}

function rand(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

export default function HeroFeed() {
  const feedListRef = useRef(null);
  const feedCounterRef = useRef(null);
  const statBlockRef = useRef(null);
  const statTpsRef = useRef(null);
  const statAgentsRef = useRef(null);
  const statExecRef = useRef(null);
  const statLatencyRef = useRef(null);

  // Live feed
  useEffect(() => {
    const feedList = feedListRef.current;
    const feedCounter = feedCounterRef.current;
    if (!feedList || !feedCounter) return;
    let txCount = Math.floor(Math.random()*900000)+100000;
    let rowEls = [];
    const MAX_ROWS = 22;

    function makeRow(ag, ac, val, ts) {
      const row = document.createElement('div');
      row.className = `frow ftype-${ac.type}`;
      row.innerHTML = `<span class="ft">${ts}</span><span class="fa">>></span><span class="fag">${ag}</span><span class="fac">${ac.act}</span><span class="fv">${val}</span><span class="ftag ${TAG_CLASS[ac.type]}">${TAG_MAP[ac.type]}</span>`;
      return row;
    }

    for (let i = MAX_ROWS-1; i >= 0; i--) {
      const row = makeRow(rand(AGS), rand(ACTS), rand(rand(ACTS).vals), `${String(Math.floor(Math.random()*23)).padStart(2,'0')}:${String(Math.floor(Math.random()*59)).padStart(2,'0')}:${String(Math.floor(Math.random()*59)).padStart(2,'0')}`);
      row.classList.add('in');
      feedList.appendChild(row);
      rowEls.push(row);
    }

    function addRow() {
      const ac = rand(ACTS);
      const row = makeRow(rand(AGS), ac, rand(ac.vals), now());
      txCount++;
      feedCounter.textContent = 'TX #' + String(txCount).padStart(6,'0');
      feedList.insertBefore(row, feedList.firstChild);
      requestAnimationFrame(() => row.classList.add('in'));
      setTimeout(() => row.classList.add('flash'), 50);
      setTimeout(() => row.classList.remove('flash'), 700);
      if (ac.type === 'settle') {
        setTimeout(() => row.classList.add('settle-glow'), 80);
        setTimeout(() => row.classList.remove('settle-glow'), 1200);
      }
      rowEls.unshift(row);
      if (rowEls.length > MAX_ROWS) { const old = rowEls.pop(); if (old?.parentNode) old.parentNode.removeChild(old); }
    }

    let active = true;
    function schedNext() {
      if (!active) return;
      setTimeout(() => { addRow(); schedNext(); }, 600 + Math.random()*1000);
    }
    schedNext();
    const burst = setInterval(() => { if (Math.random()<0.3) { addRow(); setTimeout(addRow,150); setTimeout(addRow,300); } }, 5000);
    return () => { active = false; clearInterval(burst); };
  }, []);

  // Chain stats
  useEffect(() => {
    let blockHeight = 847293 + Math.floor(Math.random()*1000);
    let agentCount = 2847 + Math.floor(Math.random()*200);
    let execCount = 148392 + Math.floor(Math.random()*5000);
    function update() {
      blockHeight += Math.floor(Math.random()*2)+1;
      agentCount += Math.floor(Math.random()*3);
      execCount += Math.floor(Math.random()*12)+3;
      if (statBlockRef.current) statBlockRef.current.textContent = blockHeight.toLocaleString();
      if (statTpsRef.current) statTpsRef.current.textContent = (Math.random()*180+120).toFixed(1);
      if (statAgentsRef.current) statAgentsRef.current.textContent = agentCount.toLocaleString();
      if (statExecRef.current) statExecRef.current.textContent = execCount.toLocaleString();
      if (statLatencyRef.current) statLatencyRef.current.textContent = (Math.random()*8+4).toFixed(1) + 'ms';
    }
    update();
    const iv = setInterval(update, 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="feed fade">
      <div className="feed-hd">
        <span>Chain Activity</span>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <span className="feed-counter" ref={feedCounterRef}>TX #000000</span>
          <span className="feed-live" style={{opacity:0.3,fontSize:9,letterSpacing:'0.1em'}}>DEMO</span>
          <span className="feed-live"><div className="dot"></div>Devnet</span>
        </div>
      </div>
      <div className="feed-stats" style={{display:'grid',gap:'1px',background:'var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div style={{background:'var(--surface)',padding:'8px 10px'}}><div style={{fontSize:9,color:'var(--muted)',letterSpacing:'0.1em',marginBottom:3}}>BLOCK</div><div ref={statBlockRef} style={{fontSize:'var(--sm)',color:'var(--text)',fontWeight:700}}>—</div></div>
        <div style={{background:'var(--surface)',padding:'8px 10px'}}><div style={{fontSize:9,color:'var(--muted)',letterSpacing:'0.1em',marginBottom:3}}>TPS</div><div ref={statTpsRef} style={{fontSize:'var(--sm)',color:'var(--accent)',fontWeight:700}}>—</div></div>
        <div style={{background:'var(--surface)',padding:'8px 10px'}}><div style={{fontSize:9,color:'var(--muted)',letterSpacing:'0.1em',marginBottom:3}}>AGENTS</div><div ref={statAgentsRef} style={{fontSize:'var(--sm)',color:'var(--text)',fontWeight:700}}>—</div></div>
        <div style={{background:'var(--surface)',padding:'8px 10px'}}><div style={{fontSize:9,color:'var(--muted)',letterSpacing:'0.1em',marginBottom:3}}>24H EXEC</div><div ref={statExecRef} style={{fontSize:'var(--sm)',color:'var(--text)',fontWeight:700}}>—</div></div>
        <div style={{background:'var(--surface)',padding:'8px 10px'}}><div style={{fontSize:9,color:'var(--muted)',letterSpacing:'0.1em',marginBottom:3}}>AVG SETTLE</div><div ref={statLatencyRef} style={{fontSize:'var(--sm)',color:'var(--accent)',fontWeight:700}}>—</div></div>
      </div>
      <div className="feed-body">
        <div className="feed-scan"></div>
        <div className="feed-fade-top"></div>
        <div className="feed-fade-bot"></div>
        <div className="feed-list" ref={feedListRef}></div>
      </div>
    </div>
  );
}
