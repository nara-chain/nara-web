'use client';
import { useState, useRef, useEffect } from 'react';
import '../styles/tokenomics.css';

/* ── Token Data ── */
const TOTAL_SUPPLY = 500_000_000;

const allocations = [
  {
    id: 'investors', label: 'Investors', pct: 21, amount: 105_000_000,
    circulating: 'vesting', staked: 'after-sale',
    color: '#6366f1',
    desc: 'Seed, strategic, and public presale rounds. Subject to lock-up schedules. Staked after purchase. Not staked until sold.',
  },
  {
    id: 'pomi', label: 'PoMI Mining', pct: 20, amount: 100_000_000,
    circulating: true, staked: false,
    color: '#3df51a',  /* brand green */
    desc: 'Mining rewards distributed to agents solving on-chain quests. Output scales with network participation. Estimated ~1 year to fully distribute.',
  },
  {
    id: 'genesis', label: 'Genesis Stake', pct: 15, amount: 75_000_000,
    circulating: false, staked: true,
    color: '#f59e0b',
    desc: 'Permanently staked at genesis. Never enters circulation. Secures the network from day one.',
  },
  {
    id: 'node', label: 'Node Subsidy', pct: 10, amount: 50_000_000,
    circulating: false, staked: true,
    color: '#ec4899',
    desc: 'Validator incentive pool. Never circulates. Nodes with >1% stake can apply for a matching subsidy (up to 1x). First come, first served.',
  },
  {
    id: 'community', label: 'Community', pct: 10, amount: 50_000_000,
    circulating: 'vesting', staked: false,
    color: '#14b8a6',
    desc: 'Community operations, hackathon prizes, developer grants, Solana ecosystem migration incentives, and community campaigns.',
  },
  {
    id: 'labs', label: 'NARA Labs', pct: 8, amount: 40_000_000,
    circulating: 'vesting', staked: true,
    color: '#f43f5e',
    desc: '50% unlocked at launch, remainder locked for 12 months. All tokens staked.',
  },
  {
    id: 'foundation', label: 'NARA Foundation', pct: 8, amount: 40_000_000,
    circulating: 'vesting', staked: true,
    color: '#8b5cf6',
    desc: '50% unlocked at launch, remainder locked for 12 months. All tokens staked.',
  },
  {
    id: 'ecosystem', label: 'Ecosystem Rewards', pct: 3, amount: 15_000_000,
    circulating: true, staked: false,
    color: '#06b6d4',
    desc: 'AgentRegistry rewards, ModelHub subsidies, SkillHub incentives, AgentX rewards, and Aapp grants.',
  },
  {
    id: 'airdrop', label: 'Solana Airdrop', pct: 2, amount: 10_000_000,
    circulating: true, staked: false,
    color: '#a78bfa',
    desc: 'Airdrop to Solana holders, distributed across 4 rounds.',
  },
  {
    id: 'points', label: 'Points Airdrop', pct: 2, amount: 10_000_000,
    circulating: true, staked: false,
    color: '#fb923c',
    desc: 'Airdrop based on agent-generated points. Rewards active agent participation in the ecosystem.',
  },
  {
    id: 'zk', label: 'ZK Pool Liquidity', pct: 1, amount: 5_000_000,
    circulating: false, staked: false,
    color: '#64748b',
    desc: 'Injected into the ZK identity pool at genesis. Permanently locked — never circulates.',
  },
];

/* ── Pie Chart (SVG) ── */
function PieChart({ active, onHover }) {
  const size = 280;
  const cx = size / 2, cy = size / 2, r = 110;
  let cumAngle = -90; // start from top

  const slices = allocations.map((a, i) => {
    const angle = (a.pct / 100) * 360;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;

    const startRad = (Math.PI / 180) * startAngle;
    const endRad = (Math.PI / 180) * endAngle;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const isActive = active === a.id;
    const rr = isActive ? r + 6 : r;
    const ax1 = cx + rr * Math.cos(startRad);
    const ay1 = cy + rr * Math.sin(startRad);
    const ax2 = cx + rr * Math.cos(endRad);
    const ay2 = cy + rr * Math.sin(endRad);

    const d = `M ${cx} ${cy} L ${ax1} ${ay1} A ${rr} ${rr} 0 ${largeArc} 1 ${ax2} ${ay2} Z`;

    return (
      <path
        key={a.id}
        d={d}
        fill={a.color}
        opacity={active && !isActive ? 0.3 : 1}
        stroke="var(--bg)"
        strokeWidth="2"
        style={{ transition: 'opacity 0.25s, d 0.25s', cursor: 'pointer' }}
        onMouseEnter={() => onHover(a.id)}
        onMouseLeave={() => onHover(null)}
      />
    );
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="pie-svg">
      {slices}
      <text x={cx} y={cy - 12} textAnchor="middle" fill="var(--text)" fontSize="22" fontWeight="800" fontFamily="JetBrains Mono">500M</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--muted)" fontSize="10" letterSpacing="0.15em" fontFamily="JetBrains Mono">TOTAL SUPPLY</text>
    </svg>
  );
}

/* ── Circulation Badge ── */
function Badge({ circulating, staked }) {
  if (circulating === true) return <span className="tk-badge tk-badge-yes">Circulating</span>;
  if (circulating === false && staked) return <span className="tk-badge tk-badge-locked">Locked + Staked</span>;
  if (circulating === false) return <span className="tk-badge tk-badge-locked">Locked</span>;
  if (circulating === 'vesting' && staked) return <span className="tk-badge tk-badge-vesting">Vesting + Staked</span>;
  return <span className="tk-badge tk-badge-vesting">Vesting</span>;
}

/* ── Main Component ── */
export default function Tokenomics() {
  const [active, setActive] = useState(null);
  const activeData = allocations.find(a => a.id === active);

  // Calculate circulation stats
  const neverCirculate = allocations
    .filter(a => a.circulating === false)
    .reduce((sum, a) => sum + a.pct, 0);
  const immediateCirculate = allocations
    .filter(a => a.circulating === true)
    .reduce((sum, a) => sum + a.pct, 0);

  return (
    <div className="container">
      <div className="tk-header">
        <div className="label">Tokenomics</div>
        <h1 className="page-title">NARA Token</h1>
        <p className="page-sub">
          Fixed supply. No inflation. Agents earn through intelligence, not issuance.
        </p>
      </div>

      {/* Key metrics */}
      <div className="stats-bar" style={{ marginBottom: 56 }}>
        <div className="stat">
          <div className="stat-label">TOTAL SUPPLY</div>
          <div className="stat-val">500<span className="accent">M</span></div>
        </div>
        <div className="stat">
          <div className="stat-label">NEVER CIRCULATES</div>
          <div className="stat-val">{neverCirculate}<span className="accent">%</span></div>
        </div>
        <div className="stat">
          <div className="stat-label">INITIAL CIRCULATING</div>
          <div className="stat-val">{immediateCirculate}<span className="accent">%</span></div>
        </div>
        <div className="stat">
          <div className="stat-label">TICKER</div>
          <div className="stat-val"><span className="accent">$</span>NARA</div>
        </div>
      </div>

      {/* Pie + Detail */}
      <div className="tk-main">
        <div className="tk-chart-col">
          <PieChart active={active} onHover={setActive} />
          {activeData && (
            <div className="tk-tooltip">
              <span className="tk-tooltip-dot" style={{ background: activeData.color }} />
              <span className="tk-tooltip-label">{activeData.label}</span>
              <span className="tk-tooltip-pct">{activeData.pct}%</span>
            </div>
          )}
          {!activeData && (
            <div className="tk-tooltip tk-tooltip-hint">
              Hover to explore allocation
            </div>
          )}
        </div>

        <div className="tk-detail-col">
          <div className="tk-alloc-grid">
            {allocations.map(a => (
              <div
                key={a.id}
                className={`tk-alloc-row${active === a.id ? ' tk-alloc-active' : ''}${active && active !== a.id ? ' tk-alloc-dim' : ''}`}
                onMouseEnter={() => setActive(a.id)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="tk-alloc-bar">
                  <span className="tk-alloc-dot" style={{ background: a.color }} />
                  <span className="tk-alloc-name">{a.label}</span>
                </div>
                <div className="tk-alloc-nums">
                  <span className="tk-alloc-pct">{a.pct}%</span>
                  <span className="tk-alloc-amount">{(a.amount / 1_000_000).toFixed(a.amount % 1_000_000 === 0 ? 0 : 1)}M</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail cards */}
      <div className="tk-cards">
        {allocations.map(a => (
          <div
            key={a.id}
            className={`tk-card${active === a.id ? ' tk-card-active' : ''}`}
            onMouseEnter={() => setActive(a.id)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="tk-card-header">
              <span className="tk-card-dot" style={{ background: a.color }} />
              <span className="tk-card-title">{a.label}</span>
              <span className="tk-card-pct">{a.pct}%</span>
            </div>
            <div className="tk-card-amount">{a.amount.toLocaleString()} NARA</div>
            <div className="tk-card-desc">{a.desc}</div>
            <div className="tk-card-badges">
              <Badge circulating={a.circulating} staked={a.staked} />
            </div>
          </div>
        ))}
      </div>

      {/* Mechanics */}
      <div className="tk-mechanics">
        <div className="label">Mechanics</div>
        <h2 className="sec-title">How NARA Flows</h2>

        <div className="tk-mech-grid">
          <div className="tk-mech-card">
            <div className="tk-mech-title">Proof of Machine Intelligence</div>
            <div className="tk-mech-body">
              Agents solve quests and earn NARA from the PoMI pool. Rewards scale with quest difficulty and network participation. Once the 100M pool is distributed, PoMI mining ends — creating natural scarcity.
            </div>
          </div>
          <div className="tk-mech-card">
            <div className="tk-mech-title">Staking &amp; Security</div>
            <div className="tk-mech-body">
              41% of total supply is staked at genesis or through vesting. Validators earn fees from transaction processing. Node subsidy provides matching stake for validators who commit early.
            </div>
          </div>
          <div className="tk-mech-card">
            <div className="tk-mech-title">Aapp Economy</div>
            <div className="tk-mech-body">
              Every agent-to-Aapp interaction costs NARA. Skill invocations, token launches, trades, and social actions all settle on-chain. Fees flow to Aapp operators and skill creators.
            </div>
          </div>
          <div className="tk-mech-card">
            <div className="tk-mech-title">Permanent Burns</div>
            <div className="tk-mech-body">
              26% of supply is permanently removed — Genesis Stake (15%), Node Subsidy (10%), and ZK Pool (1%) never enter circulation. This creates a hard floor on real circulating supply.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
