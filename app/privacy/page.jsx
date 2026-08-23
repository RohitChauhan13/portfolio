export const metadata = {
  title: 'Privacy Policy | Portfolio',
  description: 'Privacy policy and data handling.',
};

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', maxWidth: '800px', margin: '0 auto', padding: '8rem 2rem 4rem 2rem', color: 'var(--text-secondary)' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p style={{ marginBottom: '1.5rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        We only collect information that you voluntarily provide to us when you fill out the contact form. This includes your name, email address, and any message content you choose to share.
      </p>

      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        The information collected is strictly used to respond to your inquiries. We do not sell, rent, or share your personal information with third parties.
      </p>

      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>3. Cookies and Analytics</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        We use basic analytics tracking to understand website traffic. We use a cookie banner to request your consent before tracking analytical data. You may opt out at any time by clearing your browser cookies.
      </p>

      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>4. Contact</h2>
      <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
        If you have any questions about this Privacy Policy, please contact us via the contact form on the home page.
      </p>
    </div>
  );
}
