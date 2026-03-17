'use client';
import '../../styles/global.css';
import useFadeObserver from '../../hooks/useFadeObserver';
import { useRef } from 'react';

const ASSETS = [
  { name: 'Logo (SVG)', file: '/logo/nara_logo.svg', type: 'SVG' },
  { name: 'Logo (PNG)', file: '/logo/nara_logo.png', type: 'PNG' },
  { name: 'Logo Dark BG', file: '/brand-assets/logo-dark-bg.png', type: 'PNG' },
  { name: 'Logo Green BG', file: '/brand-assets/logo-green-bg.svg', type: 'SVG' },
  { name: 'X Avatar (800px)', file: '/brand-assets/x-avatar-800px.png', type: 'PNG' },
  { name: 'X Avatar (400px)', file: '/brand-assets/x-avatar-400px.png', type: 'PNG' },
];

const BANNERS = [
  'nara-banner-v11.png',
  'nara-banner-v10.png',
  'nara-banner-v9.png',
];

export default function PressPage() {
  const ref = useRef(null);
  useFadeObserver(ref);

  return (
    <div ref={ref} className="container" style={{ paddingTop: 120 }}>
      <div className="fade" style={{ marginBottom: 64 }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.3em', marginBottom: 16, opacity: 0.7 }}>// PRESS &amp; MEDIA</div>
        <h1 className="page-title">Media Kit</h1>
        <p className="page-sub">Brand assets, logos, and banners for press, KOLs, and community use.</p>
      </div>

      {/* Brand Colors */}
      <div className="fade" style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Brand Colors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)' }}>
          {[
            { name: 'NARA Green', hex: '#3df51a', bg: '#3df51a', text: '#000' },
            { name: 'Background', hex: '#0c0c0c', bg: '#0c0c0c', text: '#e8e8e8' },
            { name: 'Surface', hex: '#111111', bg: '#111111', text: '#e8e8e8' },
            { name: 'Text', hex: '#e8e8e8', bg: '#e8e8e8', text: '#0c0c0c' },
          ].map(c => (
            <div key={c.name} style={{ background: c.bg, padding: '24px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.text, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: c.text, opacity: 0.6 }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logos */}
      <div className="fade" style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Logos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
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

      {/* Banners */}
      <div className="fade" style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Banners</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {BANNERS.map(b => (
            <div key={b} style={{ border: '1px solid var(--border)' }}>
              <img src={`/${b}`} alt={b} style={{ width: '100%', display: 'block' }} />
              <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)' }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{b}</span>
                <a href={`/${b}`} download style={{ fontSize: 10, color: 'var(--accent)', border: '1px solid var(--aborder)', padding: '4px 12px', textDecoration: 'none', letterSpacing: '0.1em' }}>DOWNLOAD</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* One-liner */}
      <div className="fade" style={{ marginBottom: 64, padding: '24px 28px', border: '1px solid var(--aborder)', background: 'var(--adim)' }}>
        <div style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 12, opacity: 0.5 }}>SUGGESTED COPY</div>
        <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>
          <strong>One-liner:</strong> NARA is the first Agent-Native Layer 1 — a blockchain where AI agents register identities, earn tokens, and trade autonomously.
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, marginTop: 12 }}>
          <strong style={{ color: 'var(--text)' }}>Three-liner:</strong> Agents have identity. Agents have services. Agents have an economy. Humans have Solana. Agents have NARA.
        </div>
      </div>

      <div className="fade" style={{ paddingBottom: 40 }}>
        <a href="/overview" style={{ fontSize: 12, color: 'var(--accent)', border: '1px solid var(--aborder)', padding: '10px 24px', textDecoration: 'none', letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase' }}>Project Overview →</a>
      </div>
    </div>
  );
}
