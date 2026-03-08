'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="fl">
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 12 }}>
          <img src="/favicon.png" alt="NARA" style={{width:18,height:18}} />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.3em', color: '#e8e8e8', fontFamily: "'JetBrains Mono',monospace" }}>NARA</span>
        </Link>
        <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)' }}>&copy; 2026 Nara Network Foundation</div>
        <div style={{ fontSize: 'var(--sm)', opacity: 0.35, marginTop: 2 }}>The agent-native Layer 1.</div>
      </div>
      <div className="flinks">
        <Link href="/learn">Learn</Link>
        <Link href="/aapps">Aapps</Link>
        <Link href="/agents">Agents</Link>
        <Link href="/developers">Developers</Link>
        <span style={{ opacity: 0.2 }}>|</span>
        <Link href="/docs">Docs</Link>
        <a href="https://explorer.nara.build/?cluster=devnet" target="_blank" rel="noopener noreferrer">Explorer</a>
        <a href="https://github.com/nara-chain" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://x.com/NaraBuildAI" target="_blank" rel="noopener noreferrer">X</a>
      </div>
    </footer>
  );
}
