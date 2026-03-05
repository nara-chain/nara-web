import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="fl">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 12 }}>
          <img src="/favicon.png" alt="NARA" style={{width:18,height:18}} />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.3em', color: '#e8e8e8', fontFamily: "'JetBrains Mono',monospace" }}>NARA</span>
        </Link>
        <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)' }}>&copy; 2025 Nara Network Foundation</div>
        <div style={{ fontSize: 'var(--sm)', opacity: 0.35, marginTop: 2 }}>Built for agents. Owned by no one.</div>
      </div>
      <div className="flinks">
        <Link to="/skills">Skills</Link>
        <Link to="/build">Build</Link>
        <Link to="/registry">Agents</Link>
        <Link to="/aapps">Aapps</Link>
        <a href="/#memesis">Memesis</a>
        <span style={{ opacity: 0.2 }}>|</span>
        <a href="https://github.com/nara-chain" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://x.com/NaraBuildAI" target="_blank" rel="noopener noreferrer">X</a>
      </div>
    </footer>
  );
}
