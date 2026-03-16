'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path ? 'nav-active' : '';

  return (
    <nav>
      <Link className="nav-logo" href="/">
        <img src="/favicon.png" alt="NARA" style={{width:20,height:20}} />
        <span>NARA</span>
      </Link>
      <button
        className="nav-burger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? '✕' : '≡'}
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li><Link href="/learn" className={isActive('/learn')} onClick={() => setMenuOpen(false)}>Learn</Link></li>
        <li><Link href="/aapps" className={isActive('/aapps')} onClick={() => setMenuOpen(false)}>Aapps</Link></li>
        <li><Link href="/tokenomics" className={isActive('/tokenomics')} onClick={() => setMenuOpen(false)}>Token</Link></li>
        <li><Link href="/agents" className={isActive('/agents')} onClick={() => setMenuOpen(false)}>Agents</Link></li>
        <li><Link href="/docs" className={isActive('/docs')} onClick={() => setMenuOpen(false)}>Docs</Link></li>
        <li className="nav-dropdown">
          <button className="nav-dropdown-toggle">Network <span className="nav-arrow">↓</span></button>
          <ul className="nav-dropdown-menu">
            <li><a href="https://explorer.nara.build/?cluster=devnet" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Explorer</a></li>
            <li><a href="https://validators.nara.build/" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Validator</a></li>
          </ul>
        </li>
      </ul>
      <div className="status">
        <a href="https://github.com/nara-chain" target="_blank" rel="noopener noreferrer" className="nav-github" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href="https://explorer.nara.build/?cluster=devnet" target="_blank" rel="noopener noreferrer" className="nav-devnet" aria-label="Explorer">
          <div className="dot" role="status" aria-label="Devnet is live"></div>
          <span>Devnet Live</span>
        </a>
      </div>
    </nav>
  );
}
