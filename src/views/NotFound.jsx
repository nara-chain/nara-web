import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: 160 }}>
      <div style={{ fontSize: 'clamp(48px,8vw,96px)', fontWeight: 800, color: 'var(--accent)', opacity: 0.3, marginBottom: 16 }}>404</div>
      <div style={{ fontSize: 'clamp(20px,3vw,32px)', fontWeight: 800, marginBottom: 16 }}>Page not found.</div>
      <div style={{ fontSize: 'var(--sm)', color: 'var(--muted)', marginBottom: 48 }}>This route doesn't exist on the chain.</div>
      <Link href="/" className="btn-p">Back to Home →</Link>
    </div>
  );
}
