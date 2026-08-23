'use client';

import { useState, useEffect } from 'react';
import { submitContact } from '@/lib/api';
import { Send, CheckCircle, XCircle, Loader2, Mail, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const PLACEHOLDERS = [
  "Freelance Project",
  "Full-time Opportunity",
  "Web App Development",
  "Just saying hi!",
];

export default function Contact({ personal }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  // Typing Effect State
  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && displayedPlaceholder === PLACEHOLDERS[currentPlaceholderIdx]) {
      setTimeout(() => setIsDeleting(true), 2500);
      return;
    } else if (isDeleting && displayedPlaceholder === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDeleting(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPlaceholderIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedPlaceholder((prev) => {
        if (isDeleting) return prev.slice(0, -1);
        return PLACEHOLDERS[currentPlaceholderIdx].slice(0, prev.length + 1);
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedPlaceholder, isDeleting, currentPlaceholderIdx]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.message.trim()) newErrors.message = 'Message cannot be empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    setErrors({});
    
    try {
      const result = await submitContact(form);
      
      if (result) {
        setStatus('success');
        // Redirect to thank you page
        router.push('/thank-you');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
      const msg = err.response?.data?.message;
      if (msg) {
        // If it's a validation error, we could show it
        // For simplicity, we can alert it or let the user know
        alert(msg);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div style={{ width: '100%' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '4rem' }}>
        
        {/* Contact Info Column */}
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Let&apos;s build something <span className="gradient-text">amazing</span> together.
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: 'clamp(1rem, 2vw, 1.1rem)', lineHeight: '1.6' }}>
            Whether you have a specific project in mind, need technical consultation, or just want to connect &mdash; I&apos;m always open to discussing new opportunities.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {personal?.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <MapPin size={24} color="var(--accent-color)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Location</div>
                  <div>{personal.location}</div>
                </div>
              </div>
            )}
            
            {personal?.email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <Mail size={24} color="var(--accent-color)" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Email</div>
                  <div>{personal.email}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Column */}
        <form onSubmit={handleSubmit} className="contact-form-card" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.5rem',
          background: 'var(--card-bg)',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(16px)',
          position: 'relative',
          zIndex: 10,
          width: '100%'
        }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: errors.name ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.name}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: errors.email ? '1px solid #ef4444' : '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.email}</span>}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="subject" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>Subject (Optional)</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={displayedPlaceholder}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="message" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '1.5rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: errors.message ? '1px solid #ef4444' : '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.2s',
                fontFamily: 'inherit',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            {errors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{errors.message}</span>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            style={{
              padding: '1.25rem',
              borderRadius: '12px',
              border: 'none',
              background: status === 'success' ? '#10b981' : 'var(--text-primary)',
              color: 'var(--bg-color)',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: (status === 'loading' || status === 'success') ? 'default' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              marginTop: '1rem'
            }}
          >
            {status === 'idle' && (
              <>
                Send Message
                <Send size={20} />
              </>
            )}
            {status === 'loading' && (
              <>
                Sending...
                <Loader2 size={20} className="animate-spin" />
              </>
            )}
            {status === 'success' && (
              <>
                Sent Successfully!
                <CheckCircle size={20} />
              </>
            )}
            {status === 'error' && (
              <>
                Failed. Try Again.
                <XCircle size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
