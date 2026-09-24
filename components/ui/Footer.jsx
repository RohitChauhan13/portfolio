import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      style={{ 
        width: '100%', 
        borderTop: '1px solid var(--border-color)', 
        background: 'rgba(9, 9, 11, 0.8)', 
        backdropFilter: 'blur(16px)',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '4rem 2rem 2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem'
        }}
      >
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '2.5rem' 
          }}
        >
          {/* Identity Column */}
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Rohit <span className="gradient-text">Chouhan</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Software Engineer &amp; React Native Developer at GTT Data Solutions in Sangli, Maharashtra, India. Specializing in high-performance Android architectures, offline-first mobile apps, and scalable full-stack Node.js backends.
            </p>
            <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.8 }}>
              Natural variant: Rohit Chauhan
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link href="/#about" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  About &amp; Overview
                </Link>
              </li>
              <li>
                <Link href="/#experience" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Work Experience
                </Link>
              </li>
              <li>
                <Link href="/#projects" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/#skills" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link href="/#education" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Education
                </Link>
              </li>
              <li>
                <Link href="/#contact" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', transition: 'color 0.2s' }}>
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* Authoritative Profiles */}
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect &amp; Verify
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a 
                  href="https://github.com/RohitChauhan13" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  GitHub @RohitChauhan13 ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/rohitchauhan13" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  LinkedIn @rohitchauhan13 ↗
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/RohitChauhan13" 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  X / Twitter @RohitChauhan13 ↗
                </a>
              </li>
              <li>
                <a 
                  href="mailto:rohitchauhan6232@gmail.com" 
                  style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                >
                  rohitchauhan6232@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Machine-Readable & Policies */}
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Machine Data &amp; Legal
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <a href="/llms.txt" style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  /llms.txt (AI Context)
                </a>
              </li>
              <li>
                <a href="/llms-full.txt" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  /llms-full.txt (Full Knowledge)
                </a>
              </li>
              <li>
                <a href="/sitemap.xml" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  /sitemap.xml
                </a>
              </li>
              <li>
                <Link href="/privacy" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ 
            borderTop: '1px solid var(--border-color)', 
            paddingTop: '2rem',
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
          <div className="mono-text" style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            Engineered with Next.js App Router &bull; Sangli &bull; Maharashtra &bull; India
          </div>
        </div>
      </div>
    </footer>
  );
}
