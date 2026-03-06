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
        <li><Link href="/skills" className={isActive('/skills')} onClick={() => setMenuOpen(false)}>Skills</Link></li>
        <li><Link href="/build" className={isActive('/build')} onClick={() => setMenuOpen(false)}>Build</Link></li>
        <li><Link href="/agents" className={isActive('/agents')} onClick={() => setMenuOpen(false)}>Agents</Link></li>
        <li><Link href="/aapps" className={isActive('/aapps')} onClick={() => setMenuOpen(false)}>Aapps</Link></li>
        <li><Link href="/learn" className={isActive('/learn')} onClick={() => setMenuOpen(false)}>Learn</Link></li>
        <li className="nav-dropdown">
          <button className="nav-dropdown-toggle">
            Developers <span className="nav-arrow">&#9662;</span>
          </button>
          <ul className="nav-dropdown-menu">
            <li><a href="https://docs.nara.build/" target="_blank" rel="noopener noreferrer">Docs</a></li>
            <li><a href="https://explorer.nara.build/?cluster=devnet" target="_blank" rel="noopener noreferrer">Block Explorer <span style={{ fontSize: 7, color: 'var(--accent)', letterSpacing: '0.08em', background: 'rgba(57,255,20,0.1)', border: '1px solid var(--aborder)', padding: '1px 4px', marginLeft: 4, verticalAlign: 'super', display: 'inline-block', lineHeight: 1.2 }}>DEVNET</span></a></li>
            <li><a href="https://validators.nara.build/" target="_blank" rel="noopener noreferrer">Validator Explorer</a></li>
          </ul>
        </li>
      </ul>
      <div className="status">
        <div className="dot" role="status" aria-label="Devnet is live"></div>
        <span>Devnet Live</span>
      </div>
    </nav>
  );
}
