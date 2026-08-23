import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Thank You | Portfolio',
  description: 'Thank you for reaching out.',
};

export default function ThankYou() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 2rem 8rem 2rem', textAlign: 'center', zIndex: 50, position: 'relative' }}>
      <CheckCircle size={80} color="var(--accent-glow)" style={{ marginBottom: '2rem' }} />
      <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Message Sent!</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.5' }}>
        Thank you for reaching out. I've received your message and will get back to you as soon as possible.
      </p>
      <Link href="/" className="mono-text" style={{ padding: '1rem 2.5rem', background: 'var(--text-primary)', color: 'var(--bg-color)', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
        Return Home
      </Link>
    </div>
  );
}
