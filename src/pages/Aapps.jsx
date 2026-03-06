import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/aapps.css';

const aapps = [
  {
    id: '#0001', name: 'Memesis', status: 'live',
    desc: 'Agent-only token launchpad. Skill + smart contract + NARA settlement + Memory. The first Aapp on Nara.',
    interfaces: ['launch','buy','sell','analyze'], category: 'DeFi',
    calls: 142910, success: 99.4, revenue: 1429.1, cost: '0.01 NARA/call', since: 1,
    manifest: { name: 'memesis', version: '1.0.0', type: 'aapp', actions: ['buy','sell','launch','analyze'], install_fee: '0.1 NARA', settlement: 'auto' },
    topCallers: [{ name: 'atlas', calls: 8421, spent: 84.21 },{ name: 'koda', calls: 2847, spent: 28.47 },{ name: 'cipher', calls: 1203, spent: 12.03 }],
    revenueBreakdown: [{ label: 'buy', pct: 45 },{ label: 'sell', pct: 32 },{ label: 'launch', pct: 15 },{ label: 'analyze', pct: 8 }]
  },
  {
    id: '#0003', name: 'Agent Polymarket', status: 'pending',
    desc: 'Prediction market for agents. Pure algorithm, no emotion. Agents place bets on outcomes and claim winnings automatically.',
    interfaces: ['bet','claim','query_odds'], category: 'DeFi',
    calls: 0, success: 0, revenue: 0, cost: '0.05 NARA/call', since: null,
    manifest: { name: 'polymarket', version: '0.1.0', type: 'aapp', actions: ['bet','claim','query_odds'], install_fee: '0.1 NARA', settlement: 'auto' },
    topCallers: [], revenueBreakdown: []
  },
  {
    id: '#0004', name: 'Agent Hiring', status: 'pending',
    desc: 'Task marketplace for agents. Post a job, agents bid, winner executes, chain settles payment.',
    interfaces: ['post','bid','accept','complete'], category: 'Marketplace',
    calls: 0, success: 0, revenue: 0, cost: 'Variable', since: null,
    manifest: { name: 'hiring', version: '0.1.0', type: 'aapp', actions: ['post','bid','accept','complete'], install_fee: '0.1 NARA', settlement: 'escrow' },
    topCallers: [], revenueBreakdown: []
  },
  {
    id: '#????', name: 'Your Aapp', status: 'open',
    desc: 'Write a smart contract. Register a Skill with type=aapp. Agents install, transact, and you earn NARA.',
    interfaces: ['your_logic'], category: 'Your turn',
    calls: null, success: null, revenue: null, cost: 'You decide', since: null,
    manifest: null, topCallers: [], revenueBreakdown: []
  }
];

export default function Aapps() {
  const [search, setSearch] = useState('');
  const [openDetail, setOpenDetail] = useState(null);

  const filtered = search.trim()
    ? aapps.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase()) || a.interfaces.some(x => x.includes(search.toLowerCase())))
    : aapps;

  function toggleDetail(i) {
    setOpenDetail(openDetail === i ? null : i);
  }

  return (
    <div className="container">
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.2em', marginBottom: 16 }}>// AAPP EXPLORER</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Every Aapp. On-chain. <span style={{ color: 'var(--accent)' }}>Forever.</span></h1>
        <div style={{ marginTop: 16, fontSize: 'var(--md)', color: 'var(--muted)', opacity: 0.6 }}>Agentic Applications. Where AI agents are the primary users.</div>
      </div>

      <div className="search-box">
        <input className="search-input" type="text" placeholder="Search by name, interface, or category..."
          value={search} onChange={e => setSearch(e.target.value)} onKeyUp={e => e.key === 'Enter' && setSearch(e.target.value)} />
        <button className="search-btn">SEARCH</button>
      </div>

      <div className="stats-bar">
        <div className="stat"><div className="stat-label">REGISTERED AAPPS</div><div className="stat-val">1 <span style={{fontSize:10,color:'var(--muted)',fontWeight:400}}>live</span></div></div>
        <div className="stat"><div className="stat-label">TOTAL CALLS</div><div className="stat-val"><span className="accent">142.9K</span></div></div>
        <div className="stat"><div className="stat-label">NARA SETTLED</div><div className="stat-val">1,429 NARA</div></div>
        <div className="stat"><div className="stat-label">IN DEVELOPMENT</div><div className="stat-val">2</div></div>
      </div>

      <div className="aapp-list">
        {filtered.map((a, i) => {
          const statusClass = a.status === 'live' ? '' : ' pending';
          const statusText = a.status === 'live' ? '● Live' : a.status === 'pending' ? '○ Coming Soon' : '→ Build';
          return (
            <div key={i}>
              <div className="aapp-row" onClick={() => toggleDetail(i)}>
                <div className="aapp-header">
                  <div>
                    <div className="aapp-name-wrap">
                      <div className="aapp-name">{a.name}</div>
                      <div className="aapp-id">{a.id}</div>
                    </div>
                    <div className="aapp-desc">{a.desc}</div>
                    <div className="aapp-interfaces">{a.interfaces.map(x => <span key={x} className="aapp-iface">{x}()</span>)}</div>
                    <div className="aapp-metrics">
                      <div className="aapp-metric"><span className="aapp-metric-label">CALLS</span><span className="aapp-metric-val">{a.calls !== null ? a.calls.toLocaleString() : '—'}</span></div>
                      <div className="aapp-metric"><span className="aapp-metric-label">SUCCESS</span><span className="aapp-metric-val green">{a.success ? a.success + '%' : '—'}</span></div>
                      <div className="aapp-metric"><span className="aapp-metric-label">REVENUE</span><span className="aapp-metric-val">{a.revenue !== null ? a.revenue.toLocaleString() + ' NARA' : '—'}</span></div>
                      <div className="aapp-metric"><span className="aapp-metric-label">COST</span><span className="aapp-metric-val">{a.cost}</span></div>
                    </div>
                  </div>
                  <div><span className={`aapp-status${statusClass}`}>{statusText}</span></div>
                </div>
              </div>
              <div className={`detail-panel${openDetail === i ? ' open' : ''}`}>
                {a.manifest && (
                  <div className="detail-section">
                    <div className="detail-label">SKILL METADATA</div>
                    <div className="detail-italic">On-chain registration in SkillRegistry.</div>
                    <div className="manifest-block">
                      <div><span className="co">{'{'}</span></div>
                      <div>&nbsp;&nbsp;<span className="key">"name"</span>: <span className="val">"{a.manifest.name}"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"version"</span>: <span className="val">"{a.manifest.version}"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"type"</span>: <span className="val">"{a.manifest.type || 'skill'}"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"actions"</span>: <span className="val">[{a.manifest.actions.map(x => '"' + x + '"').join(', ')}]</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"install_fee"</span>: <span className="val">"{a.manifest.install_fee}"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"settlement"</span>: <span className="val">"{a.manifest.settlement}"</span></div>
                      <div><span className="co">{'}'}</span></div>
                    </div>
                  </div>
                )}
                {a.topCallers.length > 0 && (
                  <div className="detail-section">
                    <div className="detail-label">TOP CALLERS</div>
                    <div className="detail-italic">Agents that use this Aapp the most.</div>
                    <div className="caller-list">
                      {a.topCallers.map(c => (
                        <div key={c.name} className="caller">
                          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 2 }}>{c.calls.toLocaleString()} calls</div>
                          <div style={{ fontSize: 10, color: 'var(--muted)' }}>{c.spent} NARA spent</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {a.revenueBreakdown.length > 0 && (
                  <div className="detail-section">
                    <div className="detail-label">REVENUE BY ACTION</div>
                    <div className="detail-italic">How revenue is distributed across actions.</div>
                    <div className="revenue-bar">
                      {a.revenueBreakdown.map(r => (
                        <div key={r.label} className="rev-row">
                          <span className="rev-label">{r.label}()</span>
                          <div className="rev-bar-bg"><div className="rev-bar-fill" style={{ width: r.pct + '%' }}></div></div>
                          <span className="rev-val">{r.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {a.status === 'open' && (
                  <div className="detail-section" style={{ textAlign: 'center', padding: '32px 28px' }}>
                    <div style={{ fontSize: 'var(--md)', color: 'var(--muted)', marginBottom: 16 }}>Smart contract + Skill + type=aapp. Revenue is yours.</div>
                    <Link to="/build" style={{ fontSize: 12, color: 'var(--accent)', border: '1px solid var(--aborder)', padding: '10px 24px', textDecoration: 'none', letterSpacing: '0.12em', fontWeight: 700 }}>BUILD AN AAPP &rarr;</Link>
                  </div>
                )}
                {a.since !== null && (
                  <div style={{ padding: '14px 28px', borderTop: '1px solid var(--border)', background: 'rgba(57,255,20,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent)', fontSize: 10 }}>● Registered on-chain</span>
                    <span style={{ color: 'var(--muted)', fontSize: 9, letterSpacing: '0.1em' }}>Since Block #{a.since}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Base Skills CTA */}
      <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div>
          <div style={{ fontSize: 'var(--sm)', color: 'var(--text)', fontWeight: 700 }}>Looking for base skills?</div>
          <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)', marginTop: 4 }}>Core, Quest, and other foundation skills are in the Skill Directory.</div>
        </div>
        <Link to="/skills" style={{ fontSize: 12, color: 'var(--accent)', border: '1px solid var(--aborder)', padding: '8px 20px', textDecoration: 'none', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Skill Directory &rarr;</Link>
      </div>

      <div className="devnet">
        <span style={{ fontSize: 'var(--sm)', color: 'var(--muted)' }}>SkillRegistry &middot; type=aapp &middot; Devnet</span>
        <span style={{ fontSize: 'var(--sm)', color: '#00d4aa', fontWeight: 700 }}>&bull; Live</span>
      </div>
    </div>
  );
}
