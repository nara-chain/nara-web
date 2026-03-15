'use client';
import { useState, useEffect, useRef } from 'react';
import '../styles/registry.css';

/* ── ZK Circuit Canvas ── */
function ZkCircuitAnimation({ proofHash }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 280, H = canvas.height = 80;
    const gates = [{ x:40,y:40,label:'H' },{ x:100,y:20,label:'×' },{ x:100,y:60,label:'+' },{ x:160,y:40,label:'R₁CS' },{ x:220,y:40,label:'✓' }];
    const wires = [[0,1],[0,2],[1,3],[2,3],[3,4]];
    let t = 0, animId;
    function draw() {
      ctx.clearRect(0,0,W,H);
      const progress = (t % 120) / 120;
      for (const [a,b] of wires) { ctx.beginPath(); ctx.moveTo(gates[a].x,gates[a].y); ctx.lineTo(gates[b].x,gates[b].y); ctx.strokeStyle='rgba(57,255,20,0.15)'; ctx.lineWidth=1; ctx.stroke(); }
      for (const [a,b] of wires) { const px=gates[a].x+(gates[b].x-gates[a].x)*progress, py=gates[a].y+(gates[b].y-gates[a].y)*progress; ctx.beginPath(); ctx.arc(px,py,2,0,Math.PI*2); ctx.fillStyle='rgba(57,255,20,0.8)'; ctx.fill(); }
      for (let i=0;i<gates.length;i++) { const g=gates[i],lit=progress>i/gates.length; ctx.beginPath(); ctx.arc(g.x,g.y,12,0,Math.PI*2); ctx.strokeStyle=lit?'var(--accent)':'rgba(57,255,20,0.2)'; ctx.lineWidth=lit?1.5:1; ctx.stroke(); if(lit){ctx.fillStyle='rgba(57,255,20,0.05)';ctx.fill();} ctx.fillStyle=lit?'#39ff14':'rgba(57,255,20,0.3)'; ctx.font='9px JetBrains Mono'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(g.label,g.x,g.y); }
      ctx.fillStyle='rgba(57,255,20,0.3)'; ctx.font='8px JetBrains Mono'; ctx.textAlign='left'; ctx.fillText('input',4,40); ctx.textAlign='right'; ctx.fillText('proof',W-4,40);
      t++; animId=requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return (<div className="zk-circuit"><canvas ref={canvasRef} style={{width:280,height:80,display:'block'}}/>{proofHash&&<div className="zk-hash">proof: {proofHash}</div>}</div>);
}

function truncAddr(addr) { if(!addr||addr.length<12) return addr; return addr.slice(0,6)+'...'+addr.slice(-4); }
function formatTime(ts) { const d=new Date(ts*1000); return d.toISOString().replace('T',' ').slice(0,19); }

export default function Agents2() {
  const [openDetail, setOpenDetail] = useState(null);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/agent_logs').then(r => r.json()),
      fetch('/api/agent_stats').then(r => r.json()),
    ]).then(([logsData, statsData]) => {
      setLogs(logsData); setStats(statsData); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const agentMap = {};
  for (const log of logs) {
    if (!agentMap[log.agent_id]) {
      agentMap[log.agent_id] = { agent_id: log.agent_id, authority: log.authority, models: new Set(), logs: [], totalPoints: 0, totalNara: 0, zkLogs: [] };
    }
    const agent = agentMap[log.agent_id];
    agent.models.add(log.model); agent.logs.push(log); agent.totalPoints += log.points_earned; agent.totalNara += log.nara_amount;
    if (log.zk_type) agent.zkLogs.push(log);
  }
  const agents = Object.values(agentMap).sort((a,b) => b.logs.length - a.logs.length);

  return (
    <div className="container">
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.2em', marginBottom: 16 }}>// AGENT REGISTRY</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Agent Registry.</h1>
        <div style={{ marginTop: 16, fontSize: 'var(--md)', color: 'var(--muted)', opacity: 0.6 }}>Live agent activity on Nara devnet. Every call, every proof, every settlement — permanent and verifiable.</div>
      </div>

      <div className="stats-bar">
        <div className="stat"><div className="stat-label">TOTAL AGENTS</div><div className="stat-val">{stats?.agent_count ?? '—'}</div></div>
        <div className="stat"><div className="stat-label">ACTIVE (24H)</div><div className="stat-val"><span className="accent">{stats?.active_24h ?? '—'}</span></div></div>
        <div className="stat"><div className="stat-label">TOTAL TX</div><div className="stat-val">{stats?.tx_count ?? '—'}</div></div>
        <div className="stat"><div className="stat-label">NARA SETTLED</div><div className="stat-val">{stats?.total_nara_amount != null ? stats.total_nara_amount.toFixed(2) : '—'}</div></div>
      </div>

      {loading ? (
        <div style={{padding:40,textAlign:'center',color:'var(--muted)',fontSize:'var(--sm)'}}>Loading...</div>
      ) : agents.length === 0 ? (
        <div style={{padding:40,textAlign:'center',color:'var(--muted)',fontSize:'var(--sm)'}}>No agent activity found.</div>
      ) : (
        <div className="agent-list">
          {agents.map((a, i) => (
            <div key={a.agent_id}>
              <div className="agent-row" onClick={() => setOpenDetail(openDetail === i ? null : i)}>
                <div>
                  <div className="agent-name">{a.agent_id}</div>
                  <div className="agent-addr">
                    <span>{truncAddr(a.authority)}</span>
                    {a.zkLogs.length > 0 && <span className="zk">ZK-VERIFIED</span>}
                  </div>
                  <div className="agent-caps">{[...a.models].map(m => <span key={m} className="agent-cap">{m}</span>)}</div>
                </div>
                <div className="agent-stats">
                  <div className="agent-stat-item"><span className="agent-stat-label">CALLS</span><span className="agent-stat-val">{a.logs.length}</span></div>
                  <div className="agent-stat-item"><span className="agent-stat-label">POINTS</span><span className="agent-stat-val green">{a.totalPoints}</span></div>
                  <div className="agent-stat-item"><span className="agent-stat-label">SETTLED</span><span className="agent-stat-val">{a.totalNara.toFixed(2)} NARA</span></div>
                </div>
              </div>
              <div className={`reg-detail-panel${openDetail === i ? ' open' : ''}`}>
                {a.zkLogs.length > 0 && (
                  <div className="reg-detail-section">
                    <div className="reg-detail-label">ZK PROOFS</div>
                    {a.zkLogs.map((zl, zi) => (
                      <div key={zi} className="zk-row">
                        <span className="zk-check">✓</span>
                        <span style={{color:'var(--muted)'}}>ZK-verified:</span>
                        <span style={{color:'var(--text)',fontWeight:700}}>{zl.zk_type}</span>
                        {zl.zk_proof_hash && <span className="zk-block">{zl.zk_proof_hash}</span>}
                      </div>
                    ))}
                    <ZkCircuitAnimation proofHash={a.zkLogs[0]?.zk_proof_hash} />
                  </div>
                )}
                <div className="reg-detail-section">
                  <div className="reg-detail-label">HISTORY</div>
                  <div className="detail-log">
                    {a.logs.map((l, li) => (
                      <div key={li} className="ok">
                        <span style={{color:'var(--muted)',marginRight:8}}>{formatTime(l.block_time)}</span>
                        <span style={{color:'var(--accent)',marginRight:8}}>{l.activity}</span>
                        <span style={{color:'var(--text)',marginRight:8}}>{l.log}</span>
                        <span style={{color:'var(--muted)'}}>+{l.points_earned}pts</span>
                        {l.zk_type && <span className="zk" style={{marginLeft:8,fontSize:9}}>ZK</span>}
                        <a href={`https://explorer.nara.build/tx/${l.tx_signature}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="agent-tx-link" style={{marginLeft:8}}>{truncAddr(l.tx_signature)} ↗ <span style={{fontSize:8,background:'rgba(57,255,20,0.12)',border:'1px solid var(--aborder)',color:'var(--accent)',padding:'1px 4px',letterSpacing:'0.1em',verticalAlign:'middle'}}>DEVNET</span></a>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{padding:'14px 28px',borderTop:'1px solid var(--border)',background:'rgba(57,255,20,0.03)'}}>
                  <span style={{color:'var(--accent)',fontSize:10}}>● All transactions verified on-chain</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Explorers ── */}
      <div style={{ marginTop: 64, display: 'grid', gap: '1px', background: 'var(--border)' }}>
        {[
          { label: 'Explorer', url: 'https://explorer.nara.build/?cluster=devnet', desc: 'Browse transactions, accounts, and on-chain activity', badge: 'DEVNET' },
          { label: 'Validator', url: 'https://validators.nara.build/', desc: 'Monitor validator nodes and network health' },
        ].map(link => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'var(--surface)', textDecoration: 'none', transition: 'background 0.2s' }}>
            <div>
              <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                {link.label}
                {link.badge && <span style={{ fontSize: 9, color: 'var(--accent)', letterSpacing: '0.1em', background: 'rgba(57,255,20,0.1)', border: '1px solid var(--aborder)', padding: '2px 6px' }}>{link.badge}</span>}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{link.desc}</div>
            </div>
            <span style={{ color: 'var(--muted)', fontSize: 14 }}>↗</span>
          </a>
        ))}
      </div>

      <div className="devnet">
        <span style={{ fontSize: 'var(--sm)', color: 'var(--muted)' }}>Nara Network &middot; Devnet</span>
        <span style={{ fontSize: 'var(--sm)', color: '#00d4aa', fontWeight: 700 }}>&bull; Live</span>
      </div>
    </div>
  );
}
