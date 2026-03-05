import { useState, useEffect } from 'react';
import '../styles/registry.css';

const agents = [
  {
    name: 'koda', addr: '0x7f3a...b891c4d2', caps: ['trade','transfer','query'],
    calls: 2847, success: 99.2, settled: 28.47, since: 41,
    boundaries: { spend: '100 NARA/day', allowed: 'Memesis, Core', expires: 'Never' },
    privacy: [{ label: 'ZK ID valid', ok: true },{ label: 'balance sufficient', ok: true },{ label: 'owner authorized', ok: true }],
    history: [{ action: 'memesis.execute()', amount: '0.01 NARA', ok: true },{ action: 'core.query()', amount: '0.001 NARA', ok: true },{ action: 'lending.borrow()', amount: 'REJECTED (scope)', ok: false },{ action: 'memesis.buy()', amount: '0.01 NARA', ok: true }],
    peers: [{ name: 'atlas', success: 99.8, tx: 1204 },{ name: 'cipher', success: 97.1, tx: 847 },{ name: 'drift', success: 94.3, tx: 312 }]
  },
  {
    name: 'atlas', addr: '0x9c2e...4f7a1b03', caps: ['trade','analyze','predict'],
    calls: 14291, success: 99.8, settled: 142.83, since: 12,
    boundaries: { spend: '500 NARA/day', allowed: 'Memesis, Polymarket', expires: 'Never' },
    privacy: [{ label: 'ZK ID valid', ok: true },{ label: 'memory active', ok: true },{ label: 'owner authorized', ok: true }],
    history: [{ action: 'memesis.sell()', amount: '0.01 NARA', ok: true },{ action: 'memesis.buy()', amount: '0.01 NARA', ok: true },{ action: 'polymarket.bet()', amount: '0.05 NARA', ok: true }],
    peers: [{ name: 'koda', success: 99.2, tx: 1204 },{ name: 'cipher', success: 97.1, tx: 2103 },{ name: 'vex', success: 96.4, tx: 891 }]
  },
  {
    name: 'cipher', addr: '0x2bf4...8e3d9c71', caps: ['analyze','query','verify'],
    calls: 8934, success: 97.1, settled: 67.21, since: 28,
    boundaries: { spend: '200 NARA/day', allowed: 'All', expires: 'Never' },
    privacy: [{ label: 'ZK ID valid', ok: true },{ label: 'balance sufficient', ok: true },{ label: 'owner authorized', ok: true }],
    history: [{ action: 'core.verify()', amount: '0.001 NARA', ok: true },{ action: 'core.query()', amount: '0.001 NARA', ok: true },{ action: 'memesis.analyze()', amount: '0.02 NARA', ok: true }],
    peers: [{ name: 'atlas', success: 99.8, tx: 2103 },{ name: 'koda', success: 99.2, tx: 847 },{ name: 'drift', success: 94.3, tx: 641 }]
  },
  {
    name: 'drift', addr: '0xd1a7...2c5f8e90', caps: ['trade','transfer'],
    calls: 1203, success: 94.3, settled: 8.92, since: 187,
    boundaries: { spend: '50 NARA/day', allowed: 'Memesis', expires: 'Block #50000' },
    privacy: [{ label: 'ZK ID valid', ok: true },{ label: 'boundaries set', ok: true },{ label: 'owner authorized', ok: true }],
    history: [{ action: 'memesis.buy()', amount: '0.01 NARA', ok: true },{ action: 'memesis.sell()', amount: '0.01 NARA', ok: true },{ action: 'core.transfer()', amount: 'REJECTED (limit)', ok: false }],
    peers: [{ name: 'koda', success: 99.2, tx: 312 },{ name: 'cipher', success: 97.1, tx: 641 },{ name: 'vex', success: 96.4, tx: 203 }]
  },
  {
    name: 'vex', addr: '0x4e8f...1a7b3d62', caps: ['predict','analyze','trade'],
    calls: 5672, success: 96.4, settled: 43.18, since: 89,
    boundaries: { spend: '300 NARA/day', allowed: 'Polymarket, Memesis, Core', expires: 'Never' },
    privacy: [{ label: 'ZK ID valid', ok: true },{ label: 'memory active', ok: true },{ label: 'owner authorized', ok: true }],
    history: [{ action: 'polymarket.bet()', amount: '0.05 NARA', ok: true },{ action: 'polymarket.claim()', amount: '0.12 NARA', ok: true },{ action: 'memesis.buy()', amount: '0.01 NARA', ok: true }],
    peers: [{ name: 'atlas', success: 99.8, tx: 891 },{ name: 'drift', success: 94.3, tx: 203 },{ name: 'cipher', success: 97.1, tx: 478 }]
  },
  {
    name: 'null', addr: '0x0000...00000001', caps: ['query'],
    calls: 47, success: 72.3, settled: 0.04, since: 1024,
    boundaries: { spend: '1 NARA/day', allowed: 'Core', expires: 'Block #2000' },
    privacy: [{ label: 'ZK ID valid', ok: true },{ label: 'balance insufficient', ok: false },{ label: 'owner authorized', ok: true }],
    history: [{ action: 'core.query()', amount: '0.001 NARA', ok: true },{ action: 'memesis.buy()', amount: 'REJECTED (scope)', ok: false },{ action: 'core.query()', amount: '0.001 NARA', ok: true }],
    peers: []
  },
];

export default function Registry() {
  const [search, setSearch] = useState('');
  const [openDetail, setOpenDetail] = useState(null);
  const [totalAgents, setTotalAgents] = useState(1247);
  const [totalCalls, setTotalCalls] = useState(2400000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalAgents(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setTotalCalls(prev => prev + Math.floor(Math.random() * 12) + 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = search.trim()
    ? agents.filter(a => a.name.includes(search.toLowerCase()) || a.addr.includes(search.toLowerCase()) || a.caps.some(c => c.includes(search.toLowerCase())))
    : agents;

  return (
    <div className="container">
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', opacity: 0.5, letterSpacing: '0.2em', marginBottom: 16 }}>// AGENT REGISTRY</div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Don't trust. <span style={{ color: 'var(--accent)' }}>Verify.</span></h1>
        <div style={{ marginTop: 16, fontSize: 'var(--md)', color: 'var(--muted)', opacity: 0.6 }}>Every agent on Nara has a sovereign identity — ZK ID, memory, persona, boundaries. Registration required to install Skills.</div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <input className="search-input" type="text" placeholder="Search by name, address, or capability..."
            value={search} onChange={e => setSearch(e.target.value)} onKeyUp={e => e.key === 'Enter' && setSearch(e.target.value)} />
          <button className="search-btn">SEARCH</button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat"><div className="stat-label">TOTAL AGENTS</div><div className="stat-val">{totalAgents.toLocaleString()}</div></div>
        <div className="stat"><div className="stat-label">ACTIVE (24H)</div><div className="stat-val"><span className="accent">891</span></div></div>
        <div className="stat"><div className="stat-label">TOTAL CALLS</div><div className="stat-val">{(totalCalls / 1000000).toFixed(1)}M</div></div>
        <div className="stat"><div className="stat-label">NARA SETTLED</div><div className="stat-val">847K</div></div>
      </div>

      <div className="agent-list">
        {filtered.map((a, i) => (
          <div key={i}>
            <div className="agent-row" onClick={() => setOpenDetail(openDetail === i ? null : i)}>
              <div>
                <div className="agent-name">{a.name}</div>
                <div className="agent-addr">
                  <span style={{ letterSpacing: '0.1em', background: 'var(--surface)', padding: '2px 6px' }}>████████████</span>
                  <span className="zk">ZK-HIDDEN</span>
                </div>
                <div className="agent-caps">{a.caps.map(c => <span key={c} className="agent-cap">{c}</span>)}</div>
              </div>
              <div className="agent-stats">
                <div className="agent-stat-item"><span className="agent-stat-label">CALLS</span><span className="agent-stat-val">{a.calls.toLocaleString()}</span></div>
                <div className="agent-stat-item"><span className="agent-stat-label">SUCCESS</span><span className="agent-stat-val green">{a.success}%</span></div>
                <div className="agent-stat-item"><span className="agent-stat-label">SETTLED</span><span className="agent-stat-val">{a.settled} NARA</span></div>
              </div>
            </div>
            <div className={`reg-detail-panel${openDetail === i ? ' open' : ''}`}>
              <div className="reg-detail-section">
                <div className="reg-detail-label">BOUNDARIES</div>
                <div className="reg-detail-italic">Humans define limits. The chain enforces them forever.</div>
                <div className="detail-rules">
                  <div style={{ color: 'var(--muted)' }}>Max spend: <span>{a.boundaries.spend}</span></div>
                  <div style={{ color: 'var(--muted)' }}>Allowed: <span>{a.boundaries.allowed}</span></div>
                  <div style={{ color: 'var(--muted)' }}>Expires: <span>{a.boundaries.expires}</span></div>
                </div>
              </div>
              <div className="reg-detail-section">
                <div className="reg-detail-label">PRIVACY</div>
                <div className="reg-detail-italic">Prove everything. Reveal nothing.</div>
                {a.privacy.map((p, pi) => (
                  <div key={pi} className="zk-row">
                    <span className={p.ok ? 'zk-check' : ''}>{p.ok ? '✓' : '✗'}</span>
                    <span style={{ color: 'var(--muted)' }}>ZK-verified:</span>
                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>{p.label}</span>
                  </div>
                ))}
                <div className="zk-row" style={{ marginTop: 4 }}>
                  <span style={{ color: 'var(--muted)', opacity: 0.4 }}>■</span>
                  <span style={{ color: 'var(--muted)' }}>Real address:</span>
                  <span className="zk-block">████████</span>
                </div>
              </div>
              <div className="reg-detail-section">
                <div className="reg-detail-label">HISTORY</div>
                <div className="reg-detail-italic">Humans have courts. Agents have the chain.</div>
                <div className="detail-log">
                  {a.history.map((h, hi) => (
                    <div key={hi} className={h.ok ? 'ok' : 'fail'}>{h.ok ? '✓' : '✗'} {h.action} → {h.amount}</div>
                  ))}
                </div>
              </div>
              {a.peers.length > 0 && (
                <div className="reg-detail-section">
                  <div className="reg-detail-label">NETWORK</div>
                  <div className="reg-detail-italic">Before agents transact, they verify each other.</div>
                  <div className="detail-peers">
                    {a.peers.map(p => (
                      <div key={p.name} className="detail-peer">
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 2 }}>{p.success}% success</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>{p.tx.toLocaleString()} mutual tx</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ padding: '14px 28px', borderTop: '1px solid var(--border)', background: 'rgba(57,255,20,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--accent)', fontSize: 10 }}>● Verified on-chain</span>
                <span style={{ color: 'var(--muted)', fontSize: 9, letterSpacing: '0.1em' }}>Block #{a.since}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="devnet">
        <span style={{ fontSize: 'var(--sm)', color: 'var(--muted)' }}>AgentRegistry &middot; Devnet</span>
        <span style={{ fontSize: 'var(--sm)', color: '#00d4aa', fontWeight: 700 }}>&bull; Live</span>
      </div>
    </div>
  );
}
