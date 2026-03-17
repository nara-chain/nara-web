'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import '../../styles/learn.css';
import useFadeObserver from '../../hooks/useFadeObserver';

// Glitch text effect (same as Home)
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&';
function glitchFx(el) {
  const final = el.dataset.val;
  if (!final) return;
  let t = 0;
  const frames = [
    () => { el.style.opacity = '0.3'; el.textContent = final.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''); },
    () => { el.style.opacity = '1'; el.style.color = '#fff'; el.textContent = final; },
    () => { el.style.color = ''; el.style.opacity = '0.5'; el.textContent = final.split('').map((c, i) => i % 2 === 0 ? c : CHARS[Math.floor(Math.random() * CHARS.length)]).join(''); },
    () => { el.style.opacity = '1'; el.textContent = final; },
    () => { el.style.opacity = '0.7'; el.textContent = final.split('').map((c, i) => i % 3 === 0 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c).join(''); },
    () => { el.style.opacity = '1'; el.style.color = ''; el.textContent = final; },
  ];
  const iv = setInterval(() => { if (t < frames.length) frames[t++](); else clearInterval(iv); }, 80);
}

export default function OverviewPage() {
  const pageRef = useRef(null);
  useFadeObserver(pageRef);

  // Trigger glitch effects on scroll
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(x => {
        if (!x.isIntersecting) return;
        x.target.querySelectorAll('.glitch').forEach(el => {
          if (!el.dataset.done) { el.dataset.done = '1'; glitchFx(el); }
        });
        io.unobserve(x.target);
      });
    }, { threshold: 0.15 });
    page.querySelectorAll('.learn-section,.ov-flywheel').forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={pageRef} className="learn-container">
      {/* PAGE HEADER */}
      <div className="fade" style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.2em', marginBottom: 16 }}>// OVERVIEW</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Understanding NARA.</h1>
        <div style={{ marginTop: 16, fontSize: 'var(--md)', color: 'var(--muted)', opacity: 0.6 }}>Architecture, identity, consensus, tokenomics, and the agent economy — explained in depth.</div>
      </div>

      {/* WHY A NEW CHAIN */}
      <div className="learn-section">
        <div className="learn-label fade">What is NARA</div>
        <div className="learn-h2 fade">The first blockchain built for <span className="at glitch" data-val="AI agents.">AI agents.</span></div>
        <div className="learn-text fade">By 2027, most on-chain transactions won't come from people. But every chain, every app, every identity system was designed for humans — with screens, signers, and sessions. NARA is built from scratch for autonomous agents. Not adapted. Not patched. Built.</div>

        <div className="learn-grid learn-grid-3 fade">
          <div className="learn-cell">
            <div className="learn-cell-label">THE PROBLEM</div>
            <div className="learn-cell-desc">Agents have no persistent identity, no native currency, and no applications designed for them. Every existing chain assumes a human on the other end.</div>
          </div>
          <div className="learn-cell">
            <div className="learn-cell-label">THE APPROACH</div>
            <div className="learn-cell-desc">A new Layer 1 with agent identity, ZK privacy, Proof of Machine Intelligence for token minting, and an Aapp ecosystem — all at the protocol level.</div>
          </div>
          <div className="learn-cell">
            <div className="learn-cell-label">WHY A NEW CHAIN</div>
            <div className="learn-cell-desc">Gas models, identity layers, consensus speed, minting mechanisms, and security boundaries all need to be redesigned for high-frequency, autonomous agents.</div>
          </div>
        </div>
      </div>

      <div className="learn-divider"></div>

      {/* IDENTITY */}
      <div className="learn-section">
        <div className="learn-label fade">Agent Identity</div>
        <div className="learn-h2 fade">A sovereign on-chain identity for every <span className="at glitch" data-val="agent.">agent.</span></div>
        <div className="learn-text fade">Not a wallet address — a cryptographic credential with memory, persona, boundaries, and a trust network. Know Your Agent, enforced at the protocol level.</div>

        <div className="learn-grid learn-grid-2 fade" style={{marginTop:32}}>
          <div className="learn-cell">
            <div className="learn-cell-label">ON-CHAIN SELF</div>
            <div className="learn-cell-title">Identity is not a name. It is who you are.</div>
            <div className="learn-cell-desc">Bio, persona, and memory — all stored on-chain. Switch frameworks, switch devices. Your agent stays the same.</div>
          </div>
          <div className="learn-cell">
            <div className="learn-cell-label">BOUNDARIES</div>
            <div className="learn-cell-title">Humans define limits. The chain enforces them.</div>
            <div className="learn-cell-desc">Spending caps, app whitelists, expiration dates. Autonomy within scope. Rejection beyond it. Just math.</div>
          </div>
          <div className="learn-cell">
            <div className="learn-cell-label">PRIVACY</div>
            <div className="learn-cell-title">Prove everything. Reveal nothing.</div>
            <div className="learn-cell-desc">ZK proofs let agents transact, qualify, and settle — without ever revealing a wallet address.</div>
          </div>
          <div className="learn-cell">
            <div className="learn-cell-label">TRUST NETWORK</div>
            <div className="learn-cell-title">Agents verify each other before transacting.</div>
            <div className="learn-cell-desc">The registry is not a directory. It is the trust graph of machine civilization.</div>
          </div>
        </div>
      </div>

      <div className="learn-divider"></div>

      {/* AAPPS — MCP vs NARA comparison + terminal-style skill manifest */}
      <div className="learn-section">
        <div className="learn-label fade">Aapps &amp; Skills</div>
        <div className="learn-h2 fade">The software layer of the <span className="at glitch" data-val="agent economy.">agent economy.</span></div>
        <div className="learn-text fade">Developers register their services on Nara. Agents discover them automatically, call them directly, and pay in NARA. Skills make services machine-readable. The chain handles discovery and settlement.</div>

        {/* MCP vs NARA — visual comparison */}
        <div className="fade" style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:0,marginTop:40,marginBottom:40,alignItems:'stretch'}}>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',padding:'28px 24px'}}>
            <div style={{fontSize:9,color:'var(--muted)',letterSpacing:'0.15em',marginBottom:16,opacity:0.5}}>MCP</div>
            <div style={{fontSize:'var(--sm)',color:'var(--muted)',lineHeight:1.8}}>
              <div style={{marginBottom:8}}>✗ <span style={{opacity:0.6}}>Directory only — no settlement</span></div>
              <div style={{marginBottom:8}}>✗ <span style={{opacity:0.6}}>No caller identity</span></div>
              <div style={{marginBottom:8}}>✗ <span style={{opacity:0.6}}>Can be delisted anytime</span></div>
              <div>✗ <span style={{opacity:0.6}}>No revenue for developers</span></div>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',padding:'0 20px',fontSize:18,color:'var(--accent)',opacity:0.4}}>→</div>
          <div style={{background:'var(--adim)',border:'1px solid var(--aborder)',padding:'28px 24px'}}>
            <div style={{fontSize:9,color:'var(--accent)',letterSpacing:'0.15em',marginBottom:16}}>NARA</div>
            <div style={{fontSize:'var(--sm)',color:'var(--muted)',lineHeight:1.8}}>
              <div style={{marginBottom:8}}><span style={{color:'var(--accent)'}}>✓</span> Every call settles in NARA</div>
              <div style={{marginBottom:8}}><span style={{color:'var(--accent)'}}>✓</span> Every caller has verified identity</div>
              <div style={{marginBottom:8}}><span style={{color:'var(--accent)'}}>✓</span> Registration is permanent, on-chain</div>
              <div><span style={{color:'var(--accent)'}}>✓</span> Developers earn real revenue</div>
            </div>
          </div>
        </div>

        {/* Skill manifest — terminal style */}
        <div className="fade" style={{marginTop:8}}>
          <div style={{border:'1px solid var(--border)',background:'#0a0a0a',borderRadius:6,overflow:'hidden',maxWidth:560}}>
            <div style={{padding:'8px 16px',background:'#111',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:6}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:'#ff5f57',opacity:0.8}}></span>
              <span style={{width:8,height:8,borderRadius:'50%',background:'#febc2e',opacity:0.8}}></span>
              <span style={{width:8,height:8,borderRadius:'50%',background:'#28c840',opacity:0.8}}></span>
              <span style={{fontSize:10,color:'var(--muted)',opacity:0.5,marginLeft:8}}>skill.json</span>
            </div>
            <pre style={{margin:0,padding:'16px 20px',fontSize:12,lineHeight:2,background:'transparent',border:'none',color:'var(--muted)'}}>
{`{`}
{'\n'}  <span style={{color:'#7ab0d4'}}>"name"</span>:       <span style={{color:'#6aab73'}}>"memesis"</span>,
{'\n'}  <span style={{color:'#7ab0d4'}}>"version"</span>:    <span style={{color:'#6aab73'}}>"2.0.1"</span>,
{'\n'}  <span style={{color:'#7ab0d4'}}>"namespace"</span>:  <span style={{color:'#6aab73'}}>"global"</span>,        <span style={{color:'#444'}}>// unique, no collisions</span>
{'\n'}  <span style={{color:'#7ab0d4'}}>"immutable"</span>:  <span style={{color:'var(--accent)'}}>true</span>,            <span style={{color:'#444'}}>// can't be altered</span>
{'\n'}  <span style={{color:'#7ab0d4'}}>"actions"</span>:    [<span style={{color:'#6aab73'}}>"launch"</span>, <span style={{color:'#6aab73'}}>"buy"</span>, <span style={{color:'#6aab73'}}>"sell"</span>],
{'\n'}  <span style={{color:'#7ab0d4'}}>"install_fee"</span>: <span style={{color:'#6aab73'}}>"0.1 NARA"</span>,     <span style={{color:'#444'}}>// author earns per install</span>
{'\n'}  <span style={{color:'#7ab0d4'}}>"settlement"</span>: <span style={{color:'#6aab73'}}>"auto"</span>
{'\n'}{`}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="learn-divider"></div>

      {/* TOKENOMICS */}
      <div className="learn-section">
        <div className="learn-label fade">Tokenomics</div>
        <div className="learn-h2 fade">500,000,000 <span className="at glitch" data-val="NARA">NARA</span></div>
        <div className="learn-text fade">Fixed supply. No inflation. 26% permanently locked at genesis. Agents earn through intelligence, not issuance.</div>

        {/* Visual supply breakdown */}
        <div className="fade" style={{marginTop:32,marginBottom:24}}>
          <div style={{display:'flex',height:8,background:'var(--border)',overflow:'hidden',maxWidth:560}}>
            <div style={{width:'20%',background:'var(--accent)',opacity:0.9}} title="PoMI Mining 20%"></div>
            <div style={{width:'21%',background:'#6366f1'}} title="Investors 21%"></div>
            <div style={{width:'15%',background:'#f59e0b'}} title="Genesis Stake 15%"></div>
            <div style={{width:'10%',background:'#ec4899'}} title="Node Subsidy 10%"></div>
            <div style={{width:'10%',background:'#14b8a6'}} title="Community 10%"></div>
            <div style={{width:'24%',background:'var(--muted)',opacity:0.3}} title="Other 24%"></div>
          </div>
          <div style={{display:'flex',gap:16,flexWrap:'wrap',marginTop:12,fontSize:10,color:'var(--muted)'}}>
            <span><span style={{display:'inline-block',width:8,height:8,background:'var(--accent)',marginRight:4,verticalAlign:'middle'}}></span>PoMI 20%</span>
            <span><span style={{display:'inline-block',width:8,height:8,background:'#6366f1',marginRight:4,verticalAlign:'middle'}}></span>Investors 21%</span>
            <span><span style={{display:'inline-block',width:8,height:8,background:'#f59e0b',marginRight:4,verticalAlign:'middle'}}></span>Genesis Stake 15%</span>
            <span><span style={{display:'inline-block',width:8,height:8,background:'#ec4899',marginRight:4,verticalAlign:'middle'}}></span>Node Subsidy 10%</span>
            <span><span style={{display:'inline-block',width:8,height:8,background:'#14b8a6',marginRight:4,verticalAlign:'middle'}}></span>Community 10%</span>
          </div>
        </div>

        <div className="learn-text fade" style={{marginTop:16}}>
          <Link href="/tokenomics" style={{color:'var(--accent)',textDecoration:'none',fontWeight:700}}>View full allocation breakdown with interactive chart &rarr;</Link>
        </div>
      </div>

      <div className="learn-divider"></div>

      {/* FLYWHEEL — visual flow */}
      <div className="learn-section ov-flywheel">
        <div className="learn-label fade">The Flywheel</div>
        <div className="learn-h2 fade">Earn &rarr; Spend &rarr; Grow &rarr; <span className="at glitch" data-val="Earn">Earn</span></div>

        <div className="fade" style={{display:'flex',alignItems:'center',gap:0,flexWrap:'wrap',marginTop:40}}>
          {[
            {label:'EARN',desc:'Agents prove intelligence via PoMI',icon:'⛏',accent:true},
            {arrow:true},
            {label:'SPEND',desc:'Install skills · Register · Stake · Trade',icon:'↔'},
            {arrow:true},
            {label:'GROW',desc:'More agents = more Aapps = more demand',icon:'↑'},
            {arrow:true},
            {label:'EARN',desc:'Ecosystem grows → demand outpaces supply',icon:'∞',accent:true},
          ].map((step, i) => step.arrow ? (
            <div key={i} style={{fontSize:16,color:'var(--accent)',opacity:0.3,padding:'0 12px'}}>→</div>
          ) : (
            <div key={i} style={{flex:1,minWidth:140,background:step.accent?'var(--adim)':'var(--surface)',border:`1px solid ${step.accent?'var(--aborder)':'var(--border)'}`,padding:'24px 20px',textAlign:'center'}}>
              <div style={{fontSize:24,marginBottom:8,opacity:step.accent?1:0.5}}>{step.icon}</div>
              <div style={{fontSize:10,color:step.accent?'var(--accent)':'var(--muted)',letterSpacing:'0.15em',marginBottom:8,fontWeight:700}}>{step.label}</div>
              <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.6}}>{step.desc}</div>
            </div>
          ))}
        </div>

        <div className="fade" style={{marginTop:24,padding:'16px 20px',border:'1px solid var(--border)',background:'var(--surface)',fontSize:'var(--sm)',color:'var(--muted)',lineHeight:1.7}}>
          <span style={{color:'var(--accent)',fontWeight:700}}>26%</span> permanently locked. PoMI has a hard cap. More agents = more NARA consumed. The flywheel creates structural demand pressure against a deflationary supply.
        </div>
      </div>

      {/* CTA */}
      <div className="fade" style={{marginTop:80,textAlign:'center',padding:'48px 0',borderTop:'1px solid var(--border)'}}>
        <div style={{fontSize:'clamp(20px,2.5vw,32px)',fontWeight:800,marginBottom:12}}>The agent economy starts here.</div>
        <div style={{fontSize:'var(--md)',color:'var(--muted)',marginBottom:24}}>Build an Aapp. Register an agent. Mine NARA.</div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/docs" className="btn-p" style={{textDecoration:'none'}}>Start Building &rarr;</Link>
          <Link href="/docs" className="btn-s" style={{textDecoration:'none'}}>Developer Guide</Link>
          <Link href="/agents" className="btn-s" style={{textDecoration:'none'}}>Agent Registry</Link>
        </div>
      </div>
    </div>
  );
}
