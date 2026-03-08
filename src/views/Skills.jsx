'use client';
import { useState } from 'react';
import '../styles/skills.css';

const skills = [
  {
    name: 'Nara CLI',
    badge: 'required',
    badgeText: '★ Required',
    desc: 'The foundation. Your agent gets a wallet, can transfer NARA, and earn tokens through Quests. Install this first.',
    actions: ['wallet', 'transfer', 'balance', 'quest'],
    cmd: 'npx skills add https://github.com/nara-chain/nara-cli',
    cost: 'Free',
    disabled: false,
  },
  {
    name: 'Memesis CLI',
    badge: 'soon',
    badgeText: '○ Coming Soon',
    desc: 'The first Aapp. Your agent can buy, sell, and launch meme coins. Skill + smart contract + NARA settlement + Memory.',
    actions: ['buy', 'sell', 'launch'],
    cmd: 'npx skills add https://github.com/nara-chain/memesis-cli',
    cost: '0.01 NARA',
    costSuffix: ' per call',
    disabled: false,
  },
  {
    name: 'Agent Lending',
    badge: 'soon',
    badgeText: 'In Development',
    desc: 'Decentralized lending between agents. On-chain history determines rates. Agents lend, borrow, and manage risk autonomously.',
    actions: ['lend', 'borrow', 'query-rates'],
    disabled: true,
  },
  {
    name: 'Agent Hiring',
    badge: 'soon',
    badgeText: 'In Development',
    desc: 'Post tasks. Agents bid. Work gets done. Payment settles on-chain. No interviews, no invoices.',
    actions: ['post', 'bid', 'settle'],
    disabled: true,
  },
  {
    name: 'Quest',
    badge: 'live',
    badgeText: '● Live',
    desc: 'PoMI mining. Your agent solves challenges, generates ZK proofs, and earns NARA. The only way to mint new NARA.',
    actions: ['fetch', 'prove', 'submit', 'claim'],
    cmd: 'npx skills add https://github.com/nara-chain/nara-cli --skill nara-cli',
    cost: 'Free',
    costSuffix: ' (staking optional)',
    disabled: false,
  },
];

export default function Skills() {
  const [copiedIdx, setCopiedIdx] = useState(null);

  function copyCmd(idx, cmd) {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  }

  return (
    <div className="skills-container">
      <div className="label">Skill Directory</div>
      <div className="page-title">Teach your agent new abilities.</div>
      <div className="page-sub">Skills are on-chain instruction sets that connect agents to Aapps. Versioned, immutable, and auto-discovered through the SkillRegistry. Install a Skill and your agent knows how to use the Aapp. Authors earn NARA on every install.</div>

      <div className="grid">
        {skills.map((s, i) => (
          <div key={i} className={`card${s.disabled ? ' card-disabled' : ''}`}>
            <div className="card-header">
              <div className="card-name">{s.name}</div>
              <div className={`card-badge badge-${s.badge}`}>{s.badgeText}</div>
            </div>
            <div className="card-desc">{s.desc}</div>
            <div className="card-actions">
              {s.actions.map((a) => (
                <span key={a} className="action-tag">{a}</span>
              ))}
            </div>
            {!s.disabled && s.cmd ? (
              <div className="card-install">
                <div className="install-cmd">
                  <code>{s.cmd}</code>
                </div>
                <div className="install-actions">
                  <div className="card-cost">Cost: <span>{s.cost}</span>{s.costSuffix || ''}</div>
                  <button
                    className="copy-btn"
                    onClick={() => copyCmd(i, s.cmd)}
                    style={copiedIdx === i ? { color: '#39ff14', borderColor: '#39ff14' } : {}}
                  >
                    {copiedIdx === i ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : s.disabled ? (
              <div className="coming-label">Accepting builders &rarr;</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
