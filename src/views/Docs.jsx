'use client';
import { useState } from 'react';

export default function Docs() {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{
      position: 'fixed',
      top: 56,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0c0c0c',
      zIndex: 10,
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted)',
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: '0.1em',
        }}>
          Loading docs...
        </div>
      )}
      <iframe
        src="https://docs.nara.build"
        title="NARA Documentation"
        onLoad={() => setLoading(false)}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}
