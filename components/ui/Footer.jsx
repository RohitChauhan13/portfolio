import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{ 
        width: '100%', 
        borderTop: '1px solid var(--border-color)', 
        background: 'rgba(9, 9, 11, 0.7)', 
        backdropFilter: 'blur(16px)',
        padding: '1.75rem 2rem',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          gap: '1rem',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}
      >
        <div>
          &copy; {currentYear} Rohit Chouhan. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <span style={{ color: 'var(--border-color)' }}>&bull;</span>
          <Link href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
