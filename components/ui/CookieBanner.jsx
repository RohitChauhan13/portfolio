'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted or declined
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '600px',
      background: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 9999,
      backdropFilter: 'blur(16px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: 0, marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>Cookie Preferences</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            We use cookies to improve your experience and analyze site traffic. 
            By clicking "Accept", you agree to our <a href="/privacy" style={{ color: 'var(--accent-color)', textDecoration: 'underline', fontWeight: 500 }}>Privacy Policy</a>.
          </p>
        </div>
        <button onClick={handleDecline} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleDecline}
          style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer' }}>
          Decline
        </button>
        <button 
          onClick={handleAccept}
          style={{ padding: '0.5rem 1rem', background: 'var(--text-primary)', border: 'none', color: 'var(--bg-color)', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
          Accept
        </button>
      </div>
    </div>
  );
}
