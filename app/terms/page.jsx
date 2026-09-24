export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and usage conditions for the Rohit Chouhan portfolio website.',
  keywords: ['Terms of Service', 'Rohit Chouhan', 'Portfolio Terms', 'Website Usage Policy'],
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsOfService() {
  return (
    <div style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem', color: 'var(--text-secondary)' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2rem' }}>Terms of Service</h1>
      <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
      </p>

      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. Use License</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only.
      </p>

      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Disclaimer</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>

      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Limitations</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
      </p>
    </div>
  );
}
