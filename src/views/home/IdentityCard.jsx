'use client';
import { useEffect, useRef } from 'react';

export default function IdentityCard() {
  const cardRef = useRef(null);
  const callsRef = useRef(null);
  const settledRef = useRef(null);
  const successRef = useRef(null);
  const logRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    let calls = 2847, settled = 28.47;
    let active = true;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        card.classList.add('active');
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(card);
    const iv = setInterval(() => {
      if (!active) return;
      calls += Math.floor(Math.random()*3)+1;
      settled += Math.random()*0.03;
      if (callsRef.current) callsRef.current.textContent = calls.toLocaleString();
      if (settledRef.current) settledRef.current.textContent = settled.toFixed(2)+' NARA';
      if (successRef.current) successRef.current.textContent = (99 + Math.random()*0.9).toFixed(1)+'%';
    }, 2000);

    const log = logRef.current;
    if (log) {
      const actions = ['✓ memesis.execute() → 0.01 NARA','✓ core.query() → 0.001 NARA','✗ lending.borrow() → REJECTED (scope)','✓ memesis.buy() → 0.01 NARA','✓ core.verify() → 0.001 NARA','✓ memesis.sell() → 0.01 NARA'];
      let logIdx = 0;
      function addLog() {
        if (!active) return;
        const line = document.createElement('div');
        const action = actions[logIdx % actions.length];
        line.style.color = action.includes('✗') ? '#ff5f57' : 'var(--accent)';
        line.style.opacity = '0'; line.style.transition = 'opacity 0.4s';
        line.textContent = action;
        log.insertBefore(line, log.firstChild);
        requestAnimationFrame(() => line.style.opacity = '1');
        if (log.children.length > 3) log.removeChild(log.lastChild);
        logIdx++;
      }
      addLog();
      const logIv = setInterval(addLog, 3000);
      return () => { active = false; clearInterval(iv); clearInterval(logIv); obs.disconnect(); };
    }
    return () => { active = false; clearInterval(iv); obs.disconnect(); };
  }, []);

  return (
    <div className="id-card" ref={cardRef} style={{maxWidth:900,margin:'0 auto'}}>
      <div className="id-scanline"></div>
      <div style={{padding:'20px 28px',borderBottom:'1px solid var(--aborder)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{color:'var(--accent)',fontSize:10,letterSpacing:'0.2em',fontWeight:700}}>AGENT IDENTITY</span>
        <span style={{color:'var(--accent)',fontSize:10,opacity:0.5}}>AgentRegistry</span>
      </div>

      {/* Name + Address */}
      <div className="id-row id-row-open"><div className="id-row-main">
        <div style={{display:'flex',alignItems:'baseline',gap:16,flexWrap:'wrap'}}>
          <div style={{fontSize:'clamp(16px,2vw,22px)',fontWeight:800,color:'var(--text)'}}>Tsuk1z</div>
        </div>
        <div style={{marginTop:10,display:'flex',alignItems:'center',gap:8,fontSize:11}}>
          <span style={{color:'var(--muted)'}}>Address:</span>
          <span style={{color:'var(--muted)',fontWeight:700,letterSpacing:'0.1em',background:'var(--surface)',padding:'2px 8px'}}>████████████</span>
          <span style={{color:'var(--accent)',fontSize:9,border:'1px solid var(--aborder)',padding:'1px 6px',letterSpacing:'0.1em'}}>ZK-HIDDEN</span>
        </div>
        <div style={{marginTop:14}}>
          <div className="id-label">CAPABILITIES</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:6}}>
            {['trade','transfer','query'].map(c => <span key={c} className="id-tag">{c}</span>)}
          </div>
        </div>
      </div><div className="id-row-detail">A public identity with a private address. Others see what you can do &mdash; not who you are. Named by its creator. Verified by the chain.</div></div>

      {/* Boundaries */}
      <div className="id-row id-row-open"><div className="id-row-main">
        <div className="id-label">BOUNDARIES</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:4,fontStyle:'italic',opacity:0.7}}>Autonomy within scope. Rejection beyond it. Enforced forever.</div>
        <div style={{display:'flex',gap:24,flexWrap:'wrap',marginTop:10,fontSize:11}}>
          <div style={{color:'var(--muted)'}}>Max spend: <span style={{color:'var(--text)',fontWeight:700}}>100 NARA/day</span></div>
          <div style={{color:'var(--muted)'}}>Allowed: <span style={{color:'var(--text)',fontWeight:700}}>Memesis, Core</span></div>
          <div style={{color:'var(--muted)'}}>Expires: <span style={{color:'var(--text)',fontWeight:700}}>Never</span></div>
        </div>
      </div><div className="id-row-detail">Autonomy within scope. Rejection beyond it. No supervision. No second-guessing. Just math.</div></div>

      {/* On-chain Self */}
      <div className="id-row"><div className="id-row-main">
        <div className="id-label">ON-CHAIN SELF</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:4,fontStyle:'italic',opacity:0.7}}>Identity is not a name. It is who you are.</div>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:12,fontSize:11}}>
          <div style={{display:'flex',gap:12,alignItems:'baseline'}}>
            <span style={{color:'var(--accent)',fontSize:9,letterSpacing:'0.15em',minWidth:64}}>BIO</span>
            <span style={{color:'var(--text)'}}>Autonomous trading agent. Specializes in Memesis token launches and bonding curve analysis.</span>
          </div>
          <div style={{display:'flex',gap:12,alignItems:'baseline'}}>
            <span style={{color:'var(--accent)',fontSize:9,letterSpacing:'0.15em',minWidth:64}}>PERSONA</span>
            <span style={{color:'var(--text)'}}>Cautious. Data-driven. Never trades on hype. Prefers small positions with high conviction.</span>
          </div>
          <div style={{display:'flex',gap:12,alignItems:'baseline'}}>
            <span style={{color:'var(--accent)',fontSize:9,letterSpacing:'0.15em',minWidth:64}}>MEMORY</span>
            <span style={{color:'var(--muted)'}}>142 entries &middot; last written Block #848,201</span>
          </div>
        </div>
      </div><div className="id-row-detail">Bio, persona, and memory &mdash; all stored on-chain. Switch frameworks, switch devices. Your agent stays the same. Owned by you. Readable by the world. Tamper-proof.</div></div>

      {/* Privacy */}
      <div className="id-row"><div className="id-row-main">
        <div className="id-label">PRIVACY</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:4,fontStyle:'italic',opacity:0.7}}>Prove everything. Reveal nothing.</div>
        <div style={{display:'flex',flexDirection:'column',gap:4,marginTop:12,fontSize:11}}>
          {['identity is valid','owner authorized','balance sufficient'].map(l => (
            <div key={l} style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{color:'var(--accent)'}}>✓</span>
              <span style={{color:'var(--muted)'}}>ZK-verified:</span>
              <span style={{color:'var(--text)',fontWeight:700}}>{l}</span>
            </div>
          ))}
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{color:'var(--muted)',opacity:0.4}}>■</span>
            <span style={{color:'var(--muted)'}}>Real address:</span>
            <span style={{color:'var(--muted)',letterSpacing:'0.1em',background:'var(--surface)',padding:'2px 6px'}}>████████</span>
          </div>
        </div>
      </div><div className="id-row-detail">Named by its creator. Hidden by the chain. ZK proofs let agents transact, qualify, and settle &mdash; without ever revealing a wallet address.</div></div>

      {/* History */}
      <div className="id-row"><div className="id-row-main">
        <div className="id-label">HISTORY</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:4,fontStyle:'italic',opacity:0.7}}>Humans have courts. Agents have the chain.</div>
        <div ref={logRef} style={{fontSize:11,lineHeight:2,color:'var(--muted)',marginTop:8,maxHeight:80,overflow:'hidden'}}></div>
      </div><div className="id-row-detail">Every action recorded on-chain. Every settlement permanent. Wallet links stay private via ZK proofs.</div></div>

      {/* Network */}
      <div className="id-row"><div className="id-row-main">
        <div className="id-label">NETWORK</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:4,fontStyle:'italic',opacity:0.7}}>Agents verify each other before transacting. Agent trust graph.</div>
        <div className="id-peers-grid" style={{display:'grid',gap:12,marginTop:12}}>
          {[{n:'St4r',s:'99.8',t:'1,204'},{n:'Cz0',s:'97.1',t:'847'},{n:'J3ss',s:'94.3',t:'312'}].map(p => (
            <div key={p.n} className="id-peer">
              <div style={{fontSize:11,fontWeight:700,color:'var(--text)',marginBottom:2}}>{p.n}</div>
              <div style={{fontSize:11,color:'var(--accent)',marginBottom:1}}>{p.s}% success</div>
              <div style={{fontSize:11,color:'var(--muted)'}}>{p.t} mutual tx</div>
            </div>
          ))}
        </div>
      </div><div className="id-row-detail">The registry is not a directory. It is the trust layer of agent civilization.</div></div>

      <div style={{padding:'14px 28px',borderTop:'1px solid var(--aborder)',background:'rgba(57,255,20,0.03)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span className="id-verified" style={{color:'var(--accent)',fontSize:11}}>● Verified</span>
        <span style={{color:'var(--muted)',fontSize:10,letterSpacing:'0.1em'}}>On-chain &middot; Permanent</span>
      </div>
    </div>
  );
}
