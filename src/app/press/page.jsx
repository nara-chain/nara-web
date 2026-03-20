'use client';
import '../../styles/global.css';
import useFadeObserver from '../../hooks/useFadeObserver';
import { useRef, useState } from 'react';

const ASSETS = [
  { name: 'Favicon (PNG)', file: '/favicon.png', type: 'PNG' },
  { name: 'Favicon (SVG)', file: '/favicon-v3.svg', type: 'SVG' },
];

export default function PressPage() {
  const ref = useRef(null);
  const [copiedHex, setCopiedHex] = useState(null);
  useFadeObserver(ref);

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    });
  };

  return (
    <div ref={ref} className="container" style={{ paddingTop: 120 }}>
      <div className="fade" style={{ marginBottom: 96 }}>
        <div className="label">PRESS &amp; MEDIA</div>
        <h1 className="page-title">Media Kit</h1>
        <p className="page-sub">Brand assets, logos, and banners for press, KOLs, and community use.</p>
      </div>

      {/* Brand Colors */}
      <div className="fade" style={{ marginBottom: 96 }}>
        <h2 className="sec-title" style={{ marginBottom: 20 }}>Brand Colors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { name: 'NARA Green', hex: '#3df51a', bg: '#3df51a', text: '#000' },
            { name: 'Background', hex: '#0c0c0c', bg: '#0c0c0c', text: '#e8e8e8' },
            { name: 'Surface', hex: '#111111', bg: '#111111', text: '#e8e8e8' },
            { name: 'Text', hex: '#e8e8e8', bg: '#e8e8e8', text: '#0c0c0c' },
          ].map(c => (
            <div key={c.name} style={{ background: c.bg, padding: '24px 16px', cursor: 'pointer' }} onClick={() => copyHex(c.hex)}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: c.text, opacity: 0.6 }}>{copiedHex === c.hex ? 'Copied!' : c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logos */}
      <div className="fade" style={{ marginBottom: 96 }}>
        <h2 className="sec-title" style={{ marginBottom: 20 }}>Logos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--border)' }}>
          {ASSETS.map(a => (
            <div key={a.name} style={{ background: 'var(--surface)', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={a.file} alt={a.name} style={{ maxWidth: 80, maxHeight: 80 }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text)', fontWeight: 700 }}>{a.name}</div>
              <div style={{ fontSize: 9, color: 'var(--accent)', letterSpacing: '0.1em' }}>{a.type}</div>
              <a href={a.file} download style={{ fontSize: 10, color: 'var(--accent)', border: '1px solid var(--aborder)', padding: '4px 12px', textDecoration: 'none', letterSpacing: '0.1em' }}>DOWNLOAD</a>
            </div>
          ))}
        </div>
      </div>

      {/* Full Brand Kit */}
      <div className="fade" style={{ marginBottom: 96, padding: '24px 28px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 12, opacity: 0.5 }}>FULL BRAND KIT</div>
        <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)', lineHeight: 1.8 }}>
          High-resolution logos, banners, and social assets available on request.<br />
          Contact <a href="mailto:press@nara.build" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>press@nara.build</a> for the complete brand package.
        </div>
      </div>

      {/* One-liner */}
      <div className="fade" style={{ marginBottom: 96, padding: '24px 28px', border: '1px solid var(--aborder)', background: 'var(--adim)' }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 12, opacity: 0.5 }}>SUGGESTED COPY</div>
        <div style={{ fontSize: 'var(--sm)', color: 'var(--text)', lineHeight: 1.8 }}>
          <strong>One-liner:</strong> NARA is the first Agent-Native Layer 1 — a blockchain where AI agents register identities, earn tokens, and trade autonomously.
        </div>
        <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)', lineHeight: 1.8, marginTop: 12 }}>
          <strong style={{ color: 'var(--text)' }}>Three-liner:</strong> Agents have identity. Agents have services. Agents have an economy. Humans have Solana. Agents have NARA.
        </div>
      </div>

      {/* Media Contact */}
      <div className="fade" style={{ marginBottom: 96, padding: '24px 28px', border: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 12, opacity: 0.5 }}>MEDIA CONTACT</div>
        <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)', lineHeight: 1.8 }}>
          For press inquiries, interviews, and partnership requests:<br />
          <a href="mailto:press@nara.build" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 700 }}>press@nara.build</a>
        </div>
      </div>

      <div className="fade" style={{ paddingBottom: 40 }}>
        <a href="/overview" className="btn-sm accent">Project Overview →</a>
      </div>

      <div style={{fontSize:11,color:'var(--muted)',opacity:0.5,letterSpacing:'0.1em',textAlign:'center',paddingBottom:40}}>NEXT: <a href="/overview" style={{color:'var(--accent)',textDecoration:'none'}}>Learn about NARA →</a></div>
    </div>
  );
}
