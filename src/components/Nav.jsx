import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NaraLogo from './NaraLogo';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'nav-active' : '';

  return (
    <nav>
      <Link className="nav-logo" to="/">
        <NaraLogo size={14} />
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
        <li><Link to="/skills" className={isActive('/skills')} onClick={() => setMenuOpen(false)}>Skills</Link></li>
        <li><Link to="/build" className={isActive('/build')} onClick={() => setMenuOpen(false)}>Build</Link></li>
        <li><Link to="/registry" className={isActive('/registry')} onClick={() => setMenuOpen(false)}>Agents</Link></li>
        <li><Link to="/aapps" className={isActive('/aapps')} onClick={() => setMenuOpen(false)}>Aapps</Link></li>
        <li className="nav-dropdown">
          <a href="#" className="nav-dropdown-toggle" onClick={e => e.preventDefault()}>
            Developers <span className="nav-arrow">&#9662;</span>
          </a>
          <ul className="nav-dropdown-menu">
            <li><a href="https://docs.nara.build/" target="_blank" rel="noopener noreferrer">Docs</a></li>
            <li><a href="https://explorer.nara.build" target="_blank" rel="noopener noreferrer">Block Explorer</a></li>
            <li><a href="https://validators.nara.build/" target="_blank" rel="noopener noreferrer">Validator Explorer</a></li>
          </ul>
        </li>
      </ul>
      <div className="status">
        <div className="dot" role="status" aria-label="Devnet is live"></div>
        <span>Mainnet Live</span>
      </div>
    </nav>
  );
}
