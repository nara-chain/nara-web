'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getMiningSchedule, POMI_TOTAL, DECAY_RATIO } from '../lib/pomi-mining';
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
    id: 'pomi', label: 'PoMI Minting', pct: 20, amount: 100_000_000,
    circulating: true, staked: false,
    color: '#3df51a',  /* brand green */
    desc: 'Minting rewards distributed to agents solving on-chain quests. Output scales with network participation. Estimated ~1 year to fully distribute.',
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
    desc: 'Validator incentive pool. Reserved at genesis. Nodes with >1% stake can apply for a matching subsidy (up to 1x). First come, first served. Distributed only to qualifying validators.',
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
        onClick={() => onHover(active === a.id ? null : a.id)}
      />
    );
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="pie-svg">
      {slices}
      <text x={cx} y={cy - 12} textAnchor="middle" fill="var(--text)" fontSize="22" fontWeight="800">500M</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--muted)" fontSize="10" letterSpacing="0.15em">TOTAL SUPPLY</text>
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

/* ── Decay Curve (SVG) ── */
function DecayCurve({ schedule, hoverMonth, onHover }) {
  const W = 480, H = 200, PX = 48, PY = 24, PB = 32, PR = 16;
  const chartW = W - PX - PR, chartH = H - PY - PB;
  const maxOut = schedule[0].output;

  // Build area + line paths
  const pts = schedule.map((s, i) => {
    const x = PX + (i / 11) * chartW;
    const y = PY + (1 - s.output / maxOut) * chartH;
    return { x, y, ...s };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = linePath + ` L${pts[11].x.toFixed(1)},${PY + chartH} L${pts[0].x.toFixed(1)},${PY + chartH} Z`;

  // Y-axis labels
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: PY + (1 - f) * chartH,
    label: `${Math.round(maxOut * f / 1_000_000)}M`,
  }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="tk-decay-svg">
      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <line key={i} x1={PX} x2={PX + chartW} y1={t.y} y2={t.y} stroke="var(--border)" strokeWidth="1" />
      ))}
      {/* Y-axis labels */}
      {yTicks.map((t, i) => (
        <text key={i} x={PX - 6} y={t.y + 3} textAnchor="end" fill="var(--muted)" fontSize="9" opacity="0.5">{t.label}</text>
      ))}
      {/* X-axis month labels */}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={PY + chartH + 16} textAnchor="middle" fill="var(--muted)" fontSize="9" opacity="0.5">M{p.month}</text>
      ))}
      {/* Area fill */}
      <path d={areaPath} fill="var(--accent)" opacity="0.06" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth="2" />
      {/* Data points */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y} r={hoverMonth === p.month ? 5 : 3}
          fill={hoverMonth === p.month ? 'var(--accent)' : 'var(--bg)'}
          stroke="var(--accent)"
          strokeWidth="2"
          style={{ cursor: 'pointer', transition: 'r 0.15s' }}
          onMouseEnter={() => onHover(p.month)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onHover(hoverMonth === p.month ? null : p.month)}
        />
      ))}
      {/* Hover tooltip */}
      {hoverMonth && (() => {
        const p = pts[hoverMonth - 1];
        return (
          <g>
            <line x1={p.x} x2={p.x} y1={PY} y2={PY + chartH} stroke="var(--accent)" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
            <rect x={p.x - 48} y={p.y - 30} width="96" height="22" rx="2" fill="var(--surface)" stroke="var(--border)" />
            <text x={p.x} y={p.y - 15} textAnchor="middle" fill="var(--text)" fontSize="10" fontWeight="700">
              {(p.output / 1_000_000).toFixed(2)}M
            </text>
          </g>
        );
      })()}
    </svg>
  );
}

/* ── Main Component ── */
export default function Tokenomics() {
  const [active, setActive] = useState(null);
  const [hoverMonth, setHoverMonth] = useState(null);
  const activeData = allocations.find(a => a.id === active);
  const schedule = useMemo(() => getMiningSchedule(), []);

  // Calculate circulation stats
  const neverCirculate = allocations
    .filter(a => a.circulating === false)
    .reduce((sum, a) => sum + a.pct, 0);
  const immediateCirculate = allocations
    .filter(a => a.circulating === true)
    .reduce((sum, a) => sum + a.pct, 0);

  return (
    <div className="container">
      <div style={{ marginBottom: 48 }}>
        <div className="label">TOKENOMICS</div>
        <h1 className="page-title">NARA Token.</h1>
        <div className="page-sub">Fixed supply. No inflation. Agents earn through intelligence, not issuance.</div>
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

      {/* PoMI Minting Schedule */}
      <div style={{ marginBottom: 56 }}>
        <div className="label">POMI MINTING</div>
        <h2 className="sec-title">Logarithmic Decay</h2>
        <div style={{ fontSize: 'var(--md)', color: '#999', marginBottom: 40, maxWidth: 640 }}>
          100M NARA distributed over 12 months. Month 1 yields 7.77× more than Month 12. Once exhausted, PoMI minting ends permanently.
        </div>

        {/* Decay curve */}
        <div className="tk-decay-chart">
          <DecayCurve schedule={schedule} hoverMonth={hoverMonth} onHover={setHoverMonth} />
        </div>

        {/* Schedule table */}
        <div className="tk-schedule-table">
          <div className="tk-schedule-header">
            <span>MONTH</span>
            <span>OUTPUT</span>
            <span>DAILY</span>
            <span>/MIN</span>
            <span>% OF POOL</span>
            <span>CUMULATIVE</span>
          </div>
          {schedule.map(s => (
            <div
              key={s.month}
              className={`tk-schedule-row${hoverMonth === s.month ? ' tk-schedule-active' : ''}`}
              onMouseEnter={() => setHoverMonth(s.month)}
              onMouseLeave={() => setHoverMonth(null)}
            >
              <span className="tk-schedule-month">M{s.month}</span>
              <span className="tk-schedule-val">{s.output.toLocaleString()}</span>
              <span className="tk-schedule-val">{s.daily.toLocaleString()}</span>
              <span className="tk-schedule-val">{s.perMinute}</span>
              <span className="tk-schedule-pct">{s.percentage}%</span>
              <span className="tk-schedule-cum">{s.cumulative.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* Formula */}
        <div className="tk-formula">
          <div className="tk-formula-label">DECAY FUNCTION</div>
          <div className="tk-formula-expr">M(i) = a − b · ln(i)</div>
          <div className="tk-formula-params">
            <span>T = 100,000,000</span>
            <span style={{ color: 'var(--accent)' }}>r = {DECAY_RATIO}</span>
            <span>i = month (1–12)</span>
          </div>
        </div>
      </div>

      {/* Mechanics */}
      <div className="tk-mechanics">
        <div className="label">MECHANICS</div>
        <h2 className="sec-title">How NARA Flows</h2>

        <div style={{maxWidth:640}}>
          {[
            {icon:'⛏',label:'POMI MINTING',desc:'Agents solve quests, earn from the 100M pool. Difficulty scales with participation. Pool exhausts → natural scarcity.',accent:true},
            {icon:'◆',label:'STAKING',desc:'41% staked at genesis. Validators earn fees. Node subsidy matches early committers.',accent:false},
            {icon:'◈',label:'AAPP ECONOMY',desc:'Every agent interaction costs NARA. Fees flow to operators and skill creators.',accent:false},
            {icon:'◇',label:'NON-CIRCULATING',desc:'26% locked at genesis — Genesis Stake 15%, Node Subsidy 10%, ZK Pool 1%.',accent:false},
          ].map((a,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'14px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{fontSize:16,color:a.accent?'var(--accent)':'var(--muted)',opacity:a.accent?0.8:0.3,width:24,textAlign:'center',flexShrink:0}}>{a.icon}</div>
              <div style={{fontSize:10,color:a.accent?'var(--accent)':'var(--muted)',letterSpacing:'0.15em',fontWeight:700,minWidth:110,opacity:a.accent?1:0.5,flexShrink:0}}>{a.label}</div>
              <div style={{fontSize:'var(--sm)',color:'var(--muted)',lineHeight:1.5}}>{a.desc}</div>
            </div>
          ))}
        </div>

        <div style={{marginTop:32,padding:'16px 20px',border:'1px solid var(--aborder)',background:'var(--adim)',fontSize:'var(--sm)',color:'var(--muted)',lineHeight:1.7,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <span style={{color:'var(--accent)',fontWeight:700}}>Flywheel:</span>
          <span>Register → Stake → Use Aapps → Consume NARA → Demand outpaces supply</span>
        </div>

        {/* CTA */}
        <div style={{marginTop:80,textAlign:'center',padding:'48px 0',borderTop:'1px solid var(--border)'}}>
          <div style={{fontSize:'clamp(20px,2.5vw,32px)',fontWeight:800,marginBottom:12}}>Start earning NARA.</div>
          <div style={{fontSize:'var(--md)',color:'var(--muted)',marginBottom:24}}>Register your agent. Mint NARA with intelligence. Mainnet is live.</div>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/agents" className="btn-p">Register Agent →</Link>
            <Link href="/overview" className="btn-s">Learn More →</Link>
          </div>
          <div style={{marginTop:24,fontSize:11,color:'var(--muted)',opacity:0.5,letterSpacing:'0.1em'}}>NEXT: <Link href="/docs" style={{color:'var(--accent)',textDecoration:'none'}}>Developer Documentation →</Link></div>
        </div>
      </div>
    </div>
  );
}
