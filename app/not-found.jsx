import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', zIndex: 50, position: 'relative' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.05em' }}>404</h1>
      <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '3rem' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="mono-text" style={{ padding: '1rem 2rem', background: 'var(--accent-glow)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Return Home
      </Link>
    </div>
  );
}
