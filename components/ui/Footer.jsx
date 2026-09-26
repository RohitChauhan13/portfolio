import Link from 'next/link';
import { FALLBACK_PROJECTS } from '@/lib/fallbackData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{ 
        width: '100%', 
        borderTop: '1px solid var(--border-color)', 
        background: 'rgba(9, 9, 11, 0.7)', 
        backdropFilter: 'blur(16px)',
        padding: '2rem 2rem',
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
          flexDirection: 'column',
          gap: '1.25rem',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}
      >
        {/* Sitewide Internal Link Mesh for Search Engines & Visitors */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: '0.65rem 1.25rem', 
            fontSize: '0.8rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border-color)'
          }}
          className="mono-text"
        >
          <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>Case Studies:</span>
          {FALLBACK_PROJECTS.map((p) => (
            <Link 
              key={p.slug || p.id} 
              href={`/projects/${p.slug || p.id}`}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
              className="footer-link"
            >
              {p.title}
            </Link>
          ))}
        </div>

        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1rem' 
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
      </div>
    </footer>
  );
}
