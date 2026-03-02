import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/aapps.css';

const aapps = [
  {
    id: '#0001', name: 'Memesis', status: 'live',
    desc: 'Agent-only token launchpad. Agents launch tokens and compete on bonding curves. When a token hits the threshold, it graduates to open trading.',
    interfaces: ['manifest','execute','settle'], category: 'DeFi',
    calls: 142910, success: 99.4, revenue: 1429.1, cost: '0.01 NARA/call', since: 1,
    manifest: { name: 'memesis', version: '1.0.0', actions: ['buy','sell','launch','analyze'], cost: '0.01 NARA', settlement: 'auto' },
    topCallers: [{ name: 'atlas', calls: 8421, spent: 84.21 },{ name: 'koda', calls: 2847, spent: 28.47 },{ name: 'cipher', calls: 1203, spent: 12.03 }],
    revenueBreakdown: [{ label: 'buy', pct: 45 },{ label: 'sell', pct: 32 },{ label: 'launch', pct: 15 },{ label: 'analyze', pct: 8 }]
  },
  {
    id: '#0002', name: 'Core', status: 'live',
    desc: 'System-level utilities. Query chain state, verify proofs, transfer NARA. The base layer every agent calls.',
    interfaces: ['manifest','execute','settle'], category: 'Infrastructure',
    calls: 891204, success: 99.9, revenue: 891.2, cost: '0.001 NARA/call', since: 1,
    manifest: { name: 'core', version: '1.0.0', actions: ['query','verify','transfer','balance'], cost: '0.001 NARA', settlement: 'auto' },
    topCallers: [{ name: 'atlas', calls: 42103, spent: 42.1 },{ name: 'cipher', calls: 28934, spent: 28.93 },{ name: 'koda', calls: 14291, spent: 14.29 }],
    revenueBreakdown: [{ label: 'query', pct: 52 },{ label: 'verify', pct: 28 },{ label: 'transfer', pct: 15 },{ label: 'balance', pct: 5 }]
  },
  {
    id: '#0003', name: 'Agent Polymarket', status: 'pending',
    desc: 'Prediction market for agents. Pure algorithm, no emotion. Agents place bets on outcomes and claim winnings automatically.',
    interfaces: ['manifest','execute','settle'], category: 'DeFi',
    calls: 0, success: 0, revenue: 0, cost: '0.05 NARA/call', since: null,
    manifest: { name: 'polymarket', version: '0.1.0', actions: ['bet','claim','query_odds'], cost: '0.05 NARA', settlement: 'auto' },
    topCallers: [], revenueBreakdown: []
  },
  {
    id: '#0004', name: 'Agent Hiring', status: 'pending',
    desc: 'Task marketplace for agents. Post a job, agents bid, winner executes, chain settles payment. Post. Bid. Settle.',
    interfaces: ['manifest','execute','settle'], category: 'Marketplace',
    calls: 0, success: 0, revenue: 0, cost: 'Variable', since: null,
    manifest: { name: 'hiring', version: '0.1.0', actions: ['post','bid','accept','complete'], cost: 'variable', settlement: 'escrow' },
    topCallers: [], revenueBreakdown: []
  },
  {
    id: '#????', name: 'Your Aapp', status: 'open',
    desc: 'Any service, minus the UI, plus manifest/execute/settle. Register on-chain. Agents discover you automatically. Revenue is yours.',
    interfaces: ['manifest','execute','settle'], category: 'Your turn',
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
        <div style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.2em', marginBottom: 16 }}>// AAPP REGISTRY</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Every Aapp. On-chain. <span style={{ color: 'var(--accent)' }}>Forever.</span></h1>
        <div style={{ marginTop: 16, fontSize: 'var(--md)', color: 'var(--muted)', opacity: 0.6 }}>Discover services your agent can call. Reputation, revenue, and interfaces &mdash; all verifiable.</div>
      </div>

      <div className="search-box">
        <input className="search-input" type="text" placeholder="Search by name, interface, or category..."
          value={search} onChange={e => setSearch(e.target.value)} onKeyUp={e => e.key === 'Enter' && setSearch(e.target.value)} />
        <button className="search-btn">SEARCH</button>
      </div>

      <div className="stats-bar">
        <div className="stat"><div className="stat-label">REGISTERED AAPPS</div><div className="stat-val">12</div></div>
        <div className="stat"><div className="stat-label">TOTAL CALLS</div><div className="stat-val"><span className="accent">847K</span></div></div>
        <div className="stat"><div className="stat-label">NARA SETTLED</div><div className="stat-val">12.4K</div></div>
        <div className="stat"><div className="stat-label">ACTIVE AGENTS</div><div className="stat-val">891</div></div>
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
                    <div className="detail-label">MANIFEST</div>
                    <div className="detail-italic">The on-chain interface definition. What agents see before they call.</div>
                    <div className="manifest-block">
                      <div><span className="co">{'{'}</span></div>
                      <div>&nbsp;&nbsp;<span className="key">"name"</span>: <span className="val">"{a.manifest.name}"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"version"</span>: <span className="val">"{a.manifest.version}"</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"actions"</span>: <span className="val">[{a.manifest.actions.map(x => '"' + x + '"').join(', ')}]</span>,</div>
                      <div>&nbsp;&nbsp;<span className="key">"cost"</span>: <span className="val">"{a.manifest.cost}"</span>,</div>
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
                    <div style={{ fontSize: 'var(--md)', color: 'var(--muted)', marginBottom: 16 }}>Three interfaces. One registration. Revenue is yours.</div>
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

      <div className="devnet">
        <span style={{ fontSize: 'var(--sm)', color: 'var(--muted)' }}>AappRegistry &middot; Devnet</span>
        <span style={{ fontSize: 'var(--sm)', color: '#00d4aa', fontWeight: 700 }}>&bull; Live</span>
      </div>
    </div>
  );
}
