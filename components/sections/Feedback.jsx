'use client';

import { useState } from 'react';
import { submitFeedback } from '@/lib/api';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    setStatus('loading');
    try {
      await submitFeedback({ rating, comment });
      setStatus('success');
      setRating(0);
      setComment('');
    } catch (err) {
      setStatus('error');
      const msg = err.response?.data?.message;
      if (msg) alert(msg);
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--accent-color)' }}>
        <CheckCircle size={40} style={{ margin: '0 auto 1rem auto' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Thank you for your feedback!</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Your thoughts help me improve this system.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '2rem', borderTop: '2px solid rgba(16, 185, 129, 0.2)' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        System Feedback
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', minHeight: '60px', alignItems: 'center' }}>
          {[
            { star: 1, code: 'ERR', hex: '#ef4444', label: 'System Error', prompt: "> CRITICAL: Experience failure detected. Please provide error logs (feedback) for a hotfix." },
            { star: 2, code: 'WRN', hex: '#f97316', label: 'Warning', prompt: "> WARNING: Degraded performance. What processes should I optimize?" },
            { star: 3, code: 'INF', hex: '#3b82f6', label: 'Nominal', prompt: "> INFO: System running normally. Feel free to submit feature requests." },
            { star: 4, code: 'OPT', hex: '#10b981', label: 'Optimal', prompt: "> SUCCESS: High efficiency achieved. Which module performed best?" },
            { star: 5, code: 'GOD', hex: '#a855f7', label: 'God Mode', prompt: "> ROOT_ACCESS: Flawless execution. Welcome to the mainframe." }
          ].map(({ star, code, hex, label }) => {
            const isHovered = hoverRating === star;
            const isSelected = rating === star;
            const isActive = hoverRating ? isHovered : isSelected;
            
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="mono-text"
                style={{
                  position: 'relative',
                  background: isActive ? `${hex}15` : 'transparent',
                  border: `1px solid ${isActive ? hex : 'var(--border-color)'}`,
                  color: isActive ? hex : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  padding: '0.6rem 0.5rem',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                  boxShadow: isActive ? `0 4px 12px ${hex}33` : 'none',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '70px',
                  letterSpacing: '1px',
                  whiteSpace: 'nowrap'
                }}
              >
                {/* Custom Tooltip */}
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: `translate(-50%, ${isHovered ? '-10px' : '0px'})`,
                  opacity: isHovered ? 1 : 0,
                  visibility: isHovered ? 'visible' : 'hidden',
                  background: hex,
                  color: '#fff',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: `0 4px 12px ${hex}66`,
                  zIndex: 20,
                  letterSpacing: 'normal',
                  fontFamily: 'var(--font-sans)'
                }}>
                  {label}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: `4px solid ${hex}`
                  }}></div>
                </div>

                {isActive ? `> ${code}_` : `[ ${code} ]`}
              </button>
            );
          })}
        </div>

        {/* Dynamic Prompt Message (Collapsible) */}
        <div className="mono-text" style={{ 
          maxHeight: rating ? '100px' : '0px', 
          overflow: 'hidden',
          textAlign: 'center', 
          color: rating ? [null, '#ef4444', '#f97316', '#3b82f6', '#10b981', '#a855f7'][rating] : 'var(--accent-color)', 
          fontSize: '0.85rem',
          marginBottom: rating ? '0.5rem' : '0',
          opacity: rating ? 1 : 0,
          transform: rating ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.3s ease-in-out'
        }}>
          {rating > 0 && [
            "> CRITICAL: Experience failure detected. Please provide error logs (feedback) for a hotfix.",
            "> WARNING: Degraded performance. What processes should I optimize?",
            "> INFO: System running normally. Feel free to submit feature requests.",
            "> SUCCESS: High efficiency achieved. Which module performed best?",
            "> ROOT_ACCESS: Flawless execution. Welcome to the mainframe."
          ][rating - 1]}
        </div>

        <textarea 
          placeholder="Optional comments or suggestions..." 
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            outline: 'none',
            resize: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}
        />

        <button 
          type="submit" 
          disabled={status === 'loading' || rating === 0}
          style={{
            background: 'var(--card-bg)',
            color: rating === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: status === 'loading' || rating === 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease',
            opacity: status === 'loading' || rating === 0 ? 0.6 : 1
          }}
          onMouseEnter={(e) => {
            if (rating > 0 && status !== 'loading') {
              e.currentTarget.style.borderColor = 'var(--accent-color)';
              e.currentTarget.style.color = 'var(--accent-color)';
            }
          }}
          onMouseLeave={(e) => {
            if (status !== 'loading') {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }
          }}
        >
          {status === 'loading' ? <Loader2 className="spinner" size={18} /> : <Send size={18} />}
          Submit Rating
        </button>
      </form>
      <style jsx>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
